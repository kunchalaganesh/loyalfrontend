import React from 'react';
import { FaRegDotCircle, FaRegCircle } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import MetalToCashForm from '../Paymentmodes/MetalToCashForm';
import CashToMetalForm from '../Paymentmodes/CashToMetalForm';
import MetalPaymentForm from '../Paymentmodes/MetalForm';
import AdvanceAmountPayment from '../Paymentmodes/AdvanceForm';

const PaymentForm = ({
  paymentType,
  setPaymentType,
  paymentOptions,
  setPaymentOptions,
  paymentAmount,
  setPaymentAmount,
  paymentDescription,
  setPaymentDescription,
  buttonRefs,
  handleAddPayment,
  totalPaidCashAmount,
  metalPaymentOption,
  setMetalPaymentOption,
  handleMetalPaymentOption,
  advanceType,
  setAdvanceType
}) => {
  return (
    <>
      <div className="adminInviceAddedProductsTotalItemBoxPaymentType">
        <div
          onClick={() => {
            setPaymentType("Receive");
            setPaymentOptions("Cash");
            setPaymentAmount(paymentAmount);
          }}
        >
          {paymentType === "Receive" ? (
            <FaRegDotCircle style={{ marginRight: "5px" }} />
          ) : (
            <FaRegCircle style={{ marginRight: "5px" }} />
          )}
          Receive
        </div>
        <div onClick={() => setPaymentType("Paid")}>
          {paymentType === "Paid" ? (
            <FaRegDotCircle style={{ marginRight: "5px" }} />
          ) : (
            <FaRegCircle style={{ marginRight: "5px" }} />
          )}
          Paid
        </div>
      </div>

      <div
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          textAlign: "left",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
        className="adminInviceAddedProductsTotalItemBox"
      >
        <label>Payment Mode</label>
        <select
          tabIndex="3"
          ref={buttonRefs[1]}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              buttonRefs[2].current.focus();
            }
          }}
          style={{ width: "auto" }}
          onChange={(e) => setPaymentOptions(e.target.value)}
          value={paymentOptions}
        >
          <option value={"Cash"}>Cash</option>
          <option value={"Card"}>Card</option>
          <option value={"UPI"}>UPI</option>
          <option value={"Cheque"}>Cheque</option>
          <option value={"RTGS"}>RTGS</option>
          <option value={"MDS"}>MDS</option>
          {paymentType === "Paid" ? (
            <option value={"Advance Amount"}>Advance Amount</option>
          ) : null}
          <option value={"Metal"}>Metal</option>
          <option value={"Metal to Cash"}>Metal to Cash</option>
          <option value={"Cash to Metal"}>Cash to Metal</option>
        </select>

        {["Advance Amount", "Cash to Metal", "Metal to Cash", "Metal"].includes(paymentOptions) ? null : (
          <>
            <label style={{ whiteSpace: "nowrap" }}>Description</label>
            <input
              style={{ width: "100%" }}
              type="text"
              value={paymentDescription}
              onChange={(e) => setPaymentDescription(e.target.value)}
            />
            <label>Amount</label>
            <div className="adminInviceAddedProductsAmountInputBox">
              <input
                style={{
                  color:
                    paymentType === "Paid" && paymentAmount !== 0
                      ? "red"
                      : paymentType === "Receive" && paymentAmount > 0
                      ? "green"
                      : "black",
                }}
                tabIndex="4"
                ref={buttonRefs[2]}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    buttonRefs[3].current.focus();
                  }
                }}
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
              <button
                tabIndex="5"
                ref={buttonRefs[3]}
                onClick={() => {
                  if (
                    paymentOptions === "Cash" &&
                    totalPaidCashAmount + parseInt(paymentAmount) > 200000
                  ) {
                    alert("Could Not Take more than 200000 in Cash");
                  } else {
                    handleAddPayment();
                  }
                }}
              >
                <GiCheckMark />
              </button>
              <button
                tabIndex="6"
                ref={buttonRefs[4]}
                onClick={() => {
                  setPaymentAmount(0);
                  setPaymentOptions("Cash");
                }}
              >
                <RxCross2 />
              </button>
            </div>
          </>
        )}
      </div>

      {paymentOptions === "Metal to Cash" && (
        <MetalToCashForm
        metalPaymentOption={metalPaymentOption}
        setMetalPaymentOption={setMetalPaymentOption}
        handleMetalPaymentOption={handleMetalPaymentOption}
        handleAddPayment={handleAddPayment}
      />
      )}

      {paymentOptions === "Cash to Metal" && (
        <CashToMetalForm
        metalPaymentOption={metalPaymentOption}
        setMetalPaymentOption={setMetalPaymentOption}
        handleMetalPaymentOption={handleMetalPaymentOption}
        handleAddPayment={handleAddPayment}
      />
      )}

      {paymentOptions === "Metal" && (
         <MetalPaymentForm
         metalPaymentOption={metalPaymentOption}
         setMetalPaymentOption={setMetalPaymentOption}
         handleMetalPaymentOption={handleMetalPaymentOption}
         handleAddPayment={handleAddPayment}
       />
      )}

      {paymentOptions === "Advance Amount" && (
        <AdvanceAmountPayment
        paymentOptions={paymentOptions}
        paymentAmount={paymentAmount}
        setPaymentAmount={setPaymentAmount}
        advanceType={advanceType}
        setAdvanceType={setAdvanceType}
        paymentDescription={paymentDescription}
        setPaymentDescription={setPaymentDescription}
        advanceAmount={advanceAmount}
        setAdvanceAmount={setAdvanceAmount}
        handleAddPayment={handleAddPayment}
        selectedCustomer={selectedCustomer}
        paymentType={paymentType}
        totalPaidCashAmount={totalPaidCashAmount}
        button3Ref={button3Ref}
        button4Ref={button4Ref}
        button5Ref={button5Ref}
        button6Ref={button6Ref}
      />
      )}
    </>
  );
};

// Reusable sub-components for MetalToCashForm, CashToMetalForm, MetalForm, AdvanceForm would go here...

export default PaymentForm;
