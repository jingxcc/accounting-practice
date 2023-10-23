export default function List({ transactions, total = 0, onDeleteTransaction }) {
  function handleDeleteTransaction(dataId) {
    onDeleteTransaction(dataId);
  }
  return (
    <>
      <table>
        {console.log(transactions)}
        {transactions.map((data) => (
          <tr key={data.id}>
            <td>{data.amount}</td>
            <td>{data.item}</td>
            <td>
              <button onClick={() => handleDeleteTransaction(data.id)}>
                刪除
              </button>
            </td>
          </tr>
        ))}
      </table>
      <p>小計：{total}</p>
    </>
  );
}
