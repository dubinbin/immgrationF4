import { getCurrentYearAndMonth } from "@/utils";
import { redis } from "@/utils/redis";

export async function POST() {
    try {
        const { currentYear, currentMonth, currentDay, nextMonth } = getCurrentYearAndMonth();
        const nextMonthfileName = `${currentYear}-${nextMonth}-${currentDay}`;
        const currentMonthfileName = `${currentYear}-${currentMonth}-${currentDay}`;

        const task = [{
            fileName:currentMonthfileName,
        }, {
            fileName: nextMonthfileName,
        }];
        const result1 = await redis.get(task[0].fileName);
        const result2 = await redis.get(task[1].fileName);

        const resultData = {
            currentMonth: result1 || '',
            nextMonth: result2 || ''
        }

        return Response.json(resultData);
    } catch (err) {
        return Response.json({ msg: "error" });
    }
  }
  