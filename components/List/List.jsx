import styles from "./List.module.css";

export default function List({ transactions, total = 0, onDeleteTransaction }) {
  function handleDeleteTransaction(dataId) {
    onDeleteTransaction(dataId);
  }
  return (
    <>
      <div className={styles.list}>
        <table>
          {transactions.map((data) => (
            <tr key={data.id}>
              {data.amount >= 0 ? (
                <td className={styles["amount--green"]}>{data.amount}</td>
              ) : (
                <td className={styles["amount--red"]}>{data.amount}</td>
              )}
              <td>{data.item}</td>
              <td>
                <button onClick={() => handleDeleteTransaction(data.id)}>
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </table>
        <p className={styles.total}>小計：{total}</p>
      </div>
    </>
  );
}
