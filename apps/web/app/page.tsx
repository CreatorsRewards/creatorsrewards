// import { Button } from "@repo/ui/button";
import Navbar from "./components/Navbar";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />

      <footer className={styles.footer}></footer>
    </div>
  );
}
