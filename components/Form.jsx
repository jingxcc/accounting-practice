import { useState } from "react";

export default function Form({ transactionTypes, onAddTransaction }) {
  const [type, setType] = useState(transactionTypes[0].type);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");

  function handleAddTransaction() {
    if (item !== "" && amount !== "") {
      const filterType = transactionTypes.filter((data) => data.type === type);
      const isPostive = filterType["0"]["positive"];
      const dataToAdd = {
        id: undefined,
        item: item,
        amount: isPostive ? amount : -amount,
      };
      onAddTransaction(dataToAdd);
      setItem("");
      setAmount("");
    }
  }
  return (
    <>
      <select onChange={(e) => setType(e.target.value)}>
        {transactionTypes.map((data) => (
          <option key={data.id} value={data.type}>
            {data.type}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button onClick={handleAddTransaction}>新增紀錄</button>
    </>
  );
}
