import React from 'react';

const MetalPaymentForm = ({
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
        <label>Total Weight</label>
        <input
          type="number"
          value={metalPaymentOption.totalWt}
          onChange={(e) => {
            handleMetalPaymentOption("totalWt", e);
          }}
        />
      </div>
      <div>
        <label>Fine Percent</label>
        <input
          type="number"
          value={metalPaymentOption.finePurity}
          onChange={(e) => {
            handleMetalPaymentOption("finePurity", e);
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

export default MetalPaymentForm;
