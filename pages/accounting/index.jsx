import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "./accounting.module.css";
import Form from "../../components/Form/Form";
import List from "../../components/List/List";
import firestore from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

function caculateTransactionTotal(transactions) {
  const total = transactions.reduce((acc, data) => (acc += data.amount), 0);
  return total;
}

export default function Accounting() {
  const [transactions, setTransactions] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [total, setTotal] = useState(0);
  const transactionsCollection = collection(firestore, "transactions");
  const transactionTypeCollection = collection(firestore, "transaction_type");

  useEffect(() => {
    const readTransactionTypes = async () => {
      let types = [];
      const readQuery = query(transactionTypeCollection, orderBy("id"));
      const querySnapShot = await getDocs(readQuery);
      querySnapShot.forEach((doc) => {
        types.push(doc.data());
        setTransactionTypes(types);
      });
    };

    const readTransactions = async () => {
      let records = [];
      const readQuery = query(transactionsCollection, orderBy("timestamp"));
      const querySnapShot = await getDocs(readQuery);
      querySnapShot.forEach((doc) => {
        records.push({ id: doc.id, ...doc.data() });
        setTransactions(records);
        setTotal(caculateTransactionTotal(records));
      });
    };

    readTransactionTypes();
    readTransactions();
  }, []);

  async function handleAddTransaction(data) {
    data.timestamp = Date.now();
    const newDoc = await addDoc(transactionsCollection, data);

    data = { id: newDoc.id, ...data };
    setTransactions((transactions) => [...transactions, data]);
    setTotal(total + data.amount);
  }

  async function handleDeleteTransaction(dataId) {
    await deleteDoc(doc(firestore, "transactions", dataId));

    const newTransactions = transactions.filter((data) => data.id !== dataId);
    setTransactions(newTransactions);
    setTotal(caculateTransactionTotal(newTransactions));
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
