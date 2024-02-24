import { getTranslateStr } from "@/utils";
import styles from "./page.module.css";

export const Core = async () => {
    try {
        const getData = await fetch(`${process.env.URL}/api/getimmgration/getTask`, {
            method: "POST"
        });

        return getData.json().then((res) => {
            let content = '';  
            if (res.nextMonth && res.nextMonth !== '') {
                content = res.nextMonth || '';
                const changeContent = getTranslateStr(content);
                if (changeContent) {
                    return <div className={styles.coreContent} dangerouslySetInnerHTML={{__html: changeContent}}></div>;
                }
            } else if (res.currentMonth  && res.currentMonth !== '') {
                content = res.currentMonth || '';
                const changeContent = getTranslateStr(content);
                if (changeContent) {
                    return <div className={styles.coreContent} dangerouslySetInnerHTML={{__html: changeContent}}></div>;
                }
            } else {
                return <div style={{textAlign: "center", marginTop: 20, fontSize: 25}}>今日数据暂无，正在拉取，请稍等</div>
            }
        });

    } catch(err) {
        return <div style={{textAlign: "center", marginTop: 20, fontSize: 25}}>今日数据暂无，正在拉取，请稍等</div>
    }
}