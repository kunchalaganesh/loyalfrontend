import React from 'react';

const CashToMetalForm = ({
  metalPaymentOption,
  setMetalPaymentOption,
  handleMetalPaymentOption,
  handleAddPayment,
}) => {
  return (
    <div className="adminInviceAddedProductsMetaltoCashMainBox">
      <div>
        <label>Metal</label>
        <select
          onChange={(e) =>
            setMetalPaymentOption({
              ...metalPaymentOption,
              optionSelected: `${e.target.value}`,
            })
          }
          value={metalPaymentOption.optionSelected}
        >
          <option value={"GOLD"}>GOLD</option>
          <option value={"SILVER"}>SILVER</option>
          <option value={"PLATINUM"}>PLATINUM</option>
          <option value={"PURE GOLD"}>PURE GOLD</option>
          <option value={"PURE SILVER"}>PURE SILVER</option>
          <option value={"OLD GOLD"}>OLD GOLD</option>
          <option value={"OLD SILVER"}>OLD SILVER</option>
        </select>
      </div>
      <div>
        <label>Total amount</label>
        <input
          type="number"
          value={metalPaymentOption.totalAmount}
          onChange={(e) => {
            handleMetalPaymentOption("Amount", e);
          }}
        />
      </div>
      <div>
        <label>Rate 10/Gm</label>
        <input
          type="number"
          value={metalPaymentOption.fineRate}
          onChange={(e) => {
            handleMetalPaymentOption("Rate", e);
          }}
        />
      </div>
      <div>
        <label>Fine Paid</label>
        <input
          type="number"
          value={metalPaymentOption.fineWt}
          readOnly
        />
      </div>
      <div
        style={{
          margin: "10px",
          width: "100px",
          marginLeft: "auto",
          marginRight: "0px",
        }}
        className="adminInvoiceMainSaveButtonBox"
      >
        <button onClick={() => handleAddPayment()}>
          Add
        </button>
      </div>
    </div>
  );
};

export default CashToMetalForm;
