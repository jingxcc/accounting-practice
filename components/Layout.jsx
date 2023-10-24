import Head from "next/head";

export default function Layout({ children, className }) {
  return (
    <>
      <Head>
        <title>我的記帳本</title>
        <link rel="icon" href="@/public/favicon.ico" />
      </Head>
      <main className={className}>{children}</main>
    </>
  );
}
