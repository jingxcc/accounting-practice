import Link from "next/link";
import { useState } from "react";
import Layout from "../../components/Layout";
import styles from "./accounting.module.css";
import Form from "../../components/Form/Form";
import List from "../../components/List/List";

const transactionTypes = [
  { id: 1, type: "收入", positive: true },
  { id: 2, type: "支出", positive: false },
];
const initialTransactions = [
  { id: 1, item: "吃夜宵", amount: -1200 },
  { id: 2, item: "咖啡+甜點", amount: -500 },
  { id: 3, item: "生活用品", amount: -200 },
  { id: 4, item: "十月份薪資", amount: 50000 },
];

const initialTotal = initialTransactions.reduce(
  (acc, data) => (acc += data.amount),
  0
);

export default function Accounting() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [total, setTotal] = useState(initialTotal);
  function handleAddTransaction(data) {
    data.id = transactions.length + 1;
    setTransactions((transactions) => [...transactions, data]);
    setTotal(total + data.amount);
  }
  function handleDeleteTransaction(dataId) {
    const newTransactions = transactions.filter((data) => data.id !== dataId);
    setTransactions(newTransactions);
    setTotal(newTransactions.reduce((acc, data) => (acc += data.amount), 0));
  }
  return (
    <Layout className={styles.container}>
      <Form
        transactionTypes={transactionTypes}
        onAddTransaction={handleAddTransaction}
      ></Form>
      <List
        total={total}
        transactions={transactions}
        onDeleteTransaction={handleDeleteTransaction}
      ></List>
      <button className={styles.button}>
        <Link href="/">回到首頁</Link>
      </button>
    </Layout>
  );
}
