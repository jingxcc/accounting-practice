import "../styles/globals.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>React 練習專案</header>
      <main>
        歡迎光臨
        <button>
          <Link href="/accouting">點此開始</Link>
        </button>
      </main>
    </>
  );
}
