import styles from "./page.module.css";
import { Core } from "./core";
import { getCurrentYearAndMonth } from "@/utils";

export default function Home() {

  const { currentYear, currentMonth, currentDay } = getCurrentYearAndMonth();
  
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <p style={{fontSize: 35}}>
          最新美国移民排期表
        </p>
        <p className={styles.text} style={{ fontSize: 20 }}>
          截止 {currentYear}-{currentMonth}-{currentDay} (只需关注标红处 )
        </p>
      </div>

      <div className={styles.coreWrap}>
        <Core/>
      </div>

      <div className={styles.footer}>
        <p>Developed By AlphaDu</p>
        <p>Data from US Department of State BUREAU of CONSULAR AFFARIS</p>
      </div>
    </main>
  );
}
