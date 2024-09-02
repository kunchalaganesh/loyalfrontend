import React, { useState, useRef } from 'react';
import { FaRegDotCircle, FaRegCircle } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';

const AdvanceAmountPayment = ({
  paymentOptions,
  paymentAmount,
  setPaymentAmount,
  advanceType,
  setAdvanceType,
  paymentDescription,
  setPaymentDescription,
  advanceAmount,
  setAdvanceAmount,
  handleAddPayment,
  selectedCustomer,
  paymentType,
  totalPaidCashAmount,
  button3Ref,
  button4Ref,
  button5Ref,
  button6Ref
}) => {
  return (
    paymentOptions === "Advance Amount" && (
      <div style={{ marginTop: "20px" }}>
        <div
          style={{ gridAutoFlow: "row" }}
          className="adminInviceAddedProductsTotalItemBoxPaymentType"
        >
          <div
            onClick={() => {
              setPaymentAmount(Math.abs(paymentAmount));
              setAdvanceType("Advance Received");
            }}
          >
            {advanceType === "Advance Received" ? (
              <FaRegDotCircle style={{ marginRight: "5px" }} />
            ) : (
              <FaRegCircle style={{ marginRight: "5px" }} />
            )}
            Adv Rcvd
          </div>
          <div onClick={() => setAdvanceType("Deduct Advance")}>
            {advanceType === "Deduct Advance" ? (
              <FaRegDotCircle style={{ marginRight: "5px" }} />
            ) : (
              <FaRegCircle style={{ marginRight: "5px" }} />
            )}
            Deduct Adv
          </div>
        </div>

        {advanceType === "Advance Received" ? (
          <div
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              textAlign: "left",
            }}
            className="adminInviceAddedProductsTotalItemBox"
          >
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
                ref={button3Ref}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    button4Ref.current.focus();
                  }
                }}
                type="number"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
              />
              <button
                tabIndex="5"
                ref={button4Ref}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    button5Ref.current.focus();
                  }
                }}
                onClick={() => {
                  if (
                    paymentOptions === "Cash" &&
                    totalPaidCashAmount + parseInt(paymentAmount) > 200000
                  ) {
                    alert("Could Not Take more than 200000 in Cash");
                  } else if (paymentAmount > 200000 && paymentOptions === "Cash") {
                    alert("Couldn't Take more than 200000 in Cash");
                  } else {
                    handleAddPayment();
                  }
                }}
              >
                <GiCheckMark />
              </button>
              <button
                tabIndex="6"
                ref={button5Ref}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    button6Ref.current.focus();
                  }
                }}
                onClick={() => {
                  setPaymentAmount(0);
                  setPaymentOptions("Cash");
                }}
              >
                <RxCross2 />
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              textAlign: "left",
            }}
            className="adminInviceAddedProductsTotalItemBox"
          >
            <label style={{ whiteSpace: "nowrap" }}>Description</label>
            <input
              style={{ width: "100%" }}
              type="text"
              value={paymentDescription}
              onChange={(e) => setPaymentDescription(e.target.value)}
            />
            <label>Amount Available</label>
            <input
              type="text"
              value={selectedCustomer ? selectedCustomer.advanceAmt : "0"}
              readOnly
            />
            <label>Deduct Amount</label>
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
                ref={button3Ref}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    button4Ref.current.focus();
                  }
                }}
                type="number"
                value={advanceAmount}
                onChange={(e) => {
                  if (
                    selectedCustomer &&
                    parseFloat(selectedCustomer.advanceAmt) -
                      parseFloat(e.target.value) >= 0
                  ) {
                    setAdvanceAmount(e.target.value);
                  } else {
                    null;
                  }
                }}
              />
              <button
                tabIndex="5"
                ref={button4Ref}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    button5Ref.current.focus();
                  }
                }}
                onClick={() => {
                  if (
                    paymentOptions === "Cash" &&
                    totalPaidCashAmount + parseInt(paymentAmount) > 200000
                  ) {
                    alert("Could Not Take more than 200000 in Cash");
                  } else if (paymentAmount > 200000 && paymentOptions === "Cash") {
                    alert("Couldn't Take more than 200000 in Cash");
                  } else {
                    handleAddPayment();
                  }
                }}
              >
                <GiCheckMark />
              </button>
              <button
                tabIndex="6"
                ref={button5Ref}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    button6Ref.current.focus();
                  }
                }}
                onClick={() => {
                  setPaymentAmount(0);
                  setPaymentOptions("Cash");
                }}
              >
                <RxCross2 />
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default AdvanceAmountPayment;
