import Link from "next/link";
import Layout from "../components/Layout";
import styles from "./home.module.css";

export default function Home() {
  return (
    <Layout className={styles.container}>
      <header className={styles.header}>React 練習專案</header>
      <main className={styles.main}>歡迎光臨</main>
      <button>
        <Link href="/accounting">點此開始</Link>
      </button>
    </Layout>
  );
}
