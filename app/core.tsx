import { getCurrentYearAndMonth, getTranslateStr } from "@/utils";
import path from "path";
import fs from "fs";
import styles from "./page.module.css";

export const Core = async () => {
    const currentDirectory = process.cwd();
    const { currentYear , currentMonth, currentDay, nextMonth } = getCurrentYearAndMonth();
    const directory = './files';

    const nextMonthfileName = `${currentYear}-${nextMonth}-${currentDay}.txt`;
    const currentMonthfileName = `${currentYear}-${currentMonth}-${currentDay}.txt`;
    
    try {
        const currentMonthPath = path.join(currentDirectory,`${directory}/${currentMonthfileName}`);
        const nextMonthPath = path.join(currentDirectory,`${directory}/${nextMonthfileName}`);

        if (fs.existsSync(nextMonthPath)) {
            const content = fs.readFileSync(nextMonthPath, { encoding: "utf-8" });
            const changeContent = getTranslateStr(content);
            if (content) {
                return <div className={styles.coreContent} dangerouslySetInnerHTML={{__html: changeContent}}></div>;
            }
        } else if (fs.existsSync(currentMonthPath)) {
            const content = fs.readFileSync(currentMonthPath, { encoding: "utf-8" });
            const changeContent = getTranslateStr(content);
            if (content) {
                return <div className={styles.coreContent} dangerouslySetInnerHTML={{__html: changeContent}}></div>;
            }
        } else {
            return <div style={{textAlign: "center", marginTop: 20, fontSize: 25}}>今日数据暂无</div>
        }

    } catch(err) {
        return <div>今日数据暂无</div>
    }
}