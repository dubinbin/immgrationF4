import puppeteer, { executablePath } from "puppeteer-core";
import { getCurrentYearAndMonth } from "@/utils";
import { redis } from "@/utils/redis";

export async function POST() {
    try {
        const { currentYear ,currentMonthEn, currentMonth, currentDay, nextMonth, nextMonthEn } = getCurrentYearAndMonth();

        const currentMonthfileName = `${currentYear}-${currentMonth}-${currentDay}`;
        const nextMonthfileName = `${currentYear}-${nextMonth}-${currentDay}`;
        
        const task = [{
            monthEn:currentMonthEn,
            fileName:currentMonthfileName,
        }, {
            monthEn: nextMonthEn,
            fileName: nextMonthfileName,
        }];

        task.forEach(async (item) => {
            const browser = await puppeteer.launch({
                 headless: true,
                 executablePath: executablePath("chrome"),
            });
            const url = `https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin/${currentYear}/visa-bulletin-for-${item.monthEn}-${currentYear}.html`;
            const page = await browser.newPage();
            await page.setExtraHTTPHeaders({
                "accept": `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7`,
            });
            const UserAgent = "Mozilla/5.0(WindowsNT10.0;Win64;x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/" + 59 + Math.round(Math.random() * 10) + ".0.3497." + Math.round(Math.random() * 100) + "Safari/537.36"
            await page.setUserAgent(UserAgent);

            await page.goto(url, {
                waitUntil: "domcontentloaded",
                timeout: 0
            });

            const elements = await page.evaluate(() => {
                // 获取指定class名称的DOM元素
                const nodes = document.getElementsByTagName('table');
    
                if (nodes) {
                    const nodesArray = Array.from(nodes);
                    return nodesArray?.[0]?.outerHTML;
                }
            });

            if (elements) {
                redis.set(item.fileName, elements);
            };
            await browser.close();
        });

        return Response.json({ msg: "ok" });
    } catch (err) {
        return Response.json({ msg: "error" });
    }
  }
  