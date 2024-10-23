import React from "react";

export default function Stonetounch({ stones, onAmountChange }) {
  return (
    <div
      style={{
        overflowX: "auto",
        borderTop: "1px solid rgba(0,0,0,0.2)",
        borderBottom: "1px solid rgba(0,0,0,0.2)",
        marginTop: "30px",
        marginBottom: "20px",
      }}
    >
      <table
        className="adminInventoryMainTable"
        style={{
          width: "100%",
          marginTop: "30px",
          marginBottom: "20px",
          marginLeft: "1rem",
          boxSizing: "border-box",
        }}
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Stone Name</th>
            {/* <th>Weight</th>
            <th>Pieces</th> */}
            <th>Rate</th>
          </tr>
        </thead>
        <tbody style={{ position: "relative" }}>
          {stones.map((stone, index) => (
            <tr key={stone.Id}>
              <td>{index + 1}</td>
              <td>{stone.StoneName}</td>
              {/* <td>{stone.StoneWeight}</td>
              <td>{stone.StonePieces}</td> */}
              <td>
                <input
                  type="number"
                  value={stone.StoneRate}
                  onChange={(e) => onAmountChange(index, e.target.value)}
                  style={{
                    width: "100px",
                    textAlign: "right",
                    border: "1px solid #ccc",
                    padding: "5px",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
