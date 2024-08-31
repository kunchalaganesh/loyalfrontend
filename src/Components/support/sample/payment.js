<div className="adminInviceAddedProductsTotalAmountOuterBox">
                <div className="adminInviceAddedProductsTotalItemBoxPaymentType">
                  <div
                    onClick={() => {
                      setPaymentType("Receive"),
                        setPaymentOptions("Cash"),
                        setPaymentAmount(Math.abs(paymentAmount));
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
                    ref={button2Ref}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        button3Ref.current.focus();
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
                      <>
                        <option value={"Advance Amount"}>Advance Amount</option>
                      </>
                    ) : null}
                    <option value={"Metal"}>Metal</option>
                    <option value={"Metal to Cash"}>Metal to Cash</option>
                    <option value={"Cash to Metal"}>Cash to Metal</option>
                  </select>
                  {paymentOptions !== "Advance Amount" &&
                    paymentOptions !== "Cash to Metal" &&
                    paymentOptions !== "Metal to Cash" &&
                    paymentOptions !== "Metal" ? (
                    <>
                      <label style={{ whiteSpace: "nowrap" }}>
                        Description
                      </label>
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
                          tabindex="4"
                          ref={button3Ref}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              button4Ref.current.focus();
                            }
                          }}
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                        />
                        <button
                          tabindex="5"
                          ref={button4Ref}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              button5Ref.current.focus();
                            }
                          }}
                          onClick={() => {
                            if (
                              paymentOptions == "Cash" &&
                              totalPaidCashAmount + parseInt(paymentAmount) >
                              200000
                            ) {
                              alert("Could Not Take more than 200000 in Cash");
                            } else if (
                              paymentAmount > 200000 &&
                              paymentOptions == "Cash"
                            ) {
                              alert("Could'nt Take more than 200000 in Cash");
                            } else {
                              addPayment();
                            }
                          }}
                        >
                          <GiCheckMark />
                        </button>
                        <button
                          tabindex="6"
                          ref={button5Ref}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              button6Ref.current.focus();
                            }
                          }}
                          onClick={() => {
                            setPaymentAmount(0), setPaymentOptions("Cash");
                          }}
                        >
                          <RxCross2 />
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
                {paymentOptions === "Metal to Cash" ? (
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
                      <label>Fine Paid</label>
                      <input
                        type="number"
                        value={metalPaymentOption.fineWt}
                        onChange={(e) => {
                          handleMetalPaymentOption("fineWt", e);
                        }}
                      //     onChange={(e) =>
                      //       setMetalPaymentOption({
                      //         ...metalPaymentOption,
                      //         fineWt: e.target.value,
                      //     })
                      // }
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
                      // onChange={(e) =>
                      //   setMetalPaymentOption({
                      //     ...metalPaymentOption,
                      //     fineRate: e.target.value,
                      //   })
                      // }
                      />
                    </div>
                    <div>
                      <label>Total amount</label>
                      <input
                        type="number"
                        value={metalPaymentOption.totalAmount}
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
                      <button onClick={addPayment}>Add</button>
                    </div>
                  </div>
                ) : paymentOptions === "Cash to Metal" ? (
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
                      // onChange={(e) =>
                      //   setMetalPaymentOption({
                      //     ...metalPaymentOption,
                      //     fineRate: e.target.value,
                      //   })
                      // }
                      />
                    </div>

                    <div>
                      <label>Fine Paid</label>
                      <input
                        type="number"
                        value={metalPaymentOption.fineWt}
                        readOnly
                      //     onChange={(e) =>
                      //       setMetalPaymentOption({
                      //         ...metalPaymentOption,
                      //         fineWt: e.target.value,
                      //     })
                      // }
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
                      <button onClick={addPayment}>Add</button>
                    </div>
                  </div>
                ) : paymentOptions === "Metal" ? (
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
                      // onChange={(e) =>
                      //   setMetalPaymentOption({
                      //     ...metalPaymentOption,
                      //     fineRate: e.target.value,
                      //   })
                      // }
                      />
                    </div>

                    <div>
                      <label>Fine Paid</label>
                      <input
                        type="number"
                        value={metalPaymentOption.fineWt}
                        readOnly
                      //     onChange={(e) =>
                      //       setMetalPaymentOption({
                      //         ...metalPaymentOption,
                      //         fineWt: e.target.value,
                      //     })
                      // }
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
                      <button onClick={addPayment}>Add</button>
                    </div>
                  </div>
                ) : null}

                {paymentOptions === "Advance Amount" ? (
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
                        <label style={{ whiteSpace: "nowrap" }}>
                          Description
                        </label>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          value={paymentDescription}
                          onChange={(e) =>
                            setPaymentDescription(e.target.value)
                          }
                        />
                        <label>Amount</label>
                        <div className="adminInviceAddedProductsAmountInputBox">
                          <input
                            style={{
                              color:
                                paymentType === "Paid" && paymentAmount !== 0
                                  ? "red"
                                  : paymentType === "Receive" &&
                                    paymentAmount > 0
                                    ? "green"
                                    : "black",
                            }}
                            tabindex="4"
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
                            tabindex="5"
                            ref={button4Ref}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                button5Ref.current.focus();
                              }
                            }}
                            onClick={() => {
                              if (
                                paymentOptions == "Cash" &&
                                totalPaidCashAmount + parseInt(paymentAmount) >
                                200000
                              ) {
                                alert(
                                  "Could Not Take more than 200000 in Cash"
                                );
                              } else if (
                                paymentAmount > 200000 &&
                                paymentOptions == "Cash"
                              ) {
                                alert("Could'nt Take more than 200000 in Cash");
                              } else {
                                addPayment();
                              }
                            }}
                          >
                            <GiCheckMark />
                          </button>
                          <button
                            tabindex="6"
                            ref={button5Ref}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                button6Ref.current.focus();
                              }
                            }}
                            onClick={() => {
                              setPaymentAmount(0), setPaymentOptions("Cash");
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
                        <label style={{ whiteSpace: "nowrap" }}>
                          Description
                        </label>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          value={paymentDescription}
                          onChange={(e) =>
                            setPaymentDescription(e.target.value)
                          }
                        />
                        <label>Amount Available</label>
                        {/* <div className="adminInviceAddedProductsAmountInputBox"> */}
                        <input
                          type="text"
                          value={
                            selectedCustomer ? selectedCustomer.advanceAmt : "0"
                          }
                          readOnly
                        />
                        {/* </div> */}
                        <label>Deduct Amount</label>
                        <div className="adminInviceAddedProductsAmountInputBox">
                          <input
                            style={{
                              color:
                                paymentType === "Paid" && paymentAmount !== 0
                                  ? "red"
                                  : paymentType === "Receive" &&
                                    paymentAmount > 0
                                    ? "green"
                                    : "black",
                            }}
                            tabindex="4"
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
                                parseFloat(e.target.value) >=
                                0
                              ) {
                                setAdvanceAmount(e.target.value);
                              } else {
                                null;
                              }
                            }}
                          />
                          <button
                            tabindex="5"
                            ref={button4Ref}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                button5Ref.current.focus();
                              }
                            }}
                            onClick={() => {
                              if (
                                paymentOptions == "Cash" &&
                                totalPaidCashAmount + parseInt(paymentAmount) >
                                200000
                              ) {
                                alert(
                                  "Could Not Take more than 200000 in Cash"
                                );
                              } else if (
                                paymentAmount > 200000 &&
                                paymentOptions == "Cash"
                              ) {
                                alert("Could'nt Take more than 200000 in Cash");
                              } else {
                                addPayment();
                              }
                            }}
                          >
                            <GiCheckMark />
                          </button>
                          <button
                            tabindex="6"
                            ref={button5Ref}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                button6Ref.current.focus();
                              }
                            }}
                            onClick={() => {
                              setPaymentAmount(0), setPaymentOptions("Cash");
                            }}
                          >
                            <RxCross2 />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
                <div className="adminInviceAddedProductsTotalAmountBox">
                  <table>
                    <thead>
                      <tr>
                        <th>Mode</th>
                        <th>Amount</th>
                        <th>Gold</th>
                        <th>Silver</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment, index) => (
                        <tr key={index}>
                          <td>{payment.mode}</td>
                          <td>{payment.amount}</td>
                          <td>{payment.fineGold}</td>
                          <td>{payment.fineSilver}</td>
                          {/* Button to delete the payment */}
                          <td onClick={() => deletePayment(index)}>
                            <button
                              tabIndex="7"
                              ref={button6Ref}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  button7Ref.current.focus();
                                }
                              }}
                              className="adminInviceAddedProductsTotalAmountDeleteOption"
                              onClick={() => deletePayment(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>



const addPayment = () => {
    // Check if both payment mode and amount are provided
    if (
      (paymentOptions !== "Cash to Metal" &&
        paymentOptions !== "Metal" &&
        paymentAmount !== "" &&
        parseInt(paymentAmount) !== 0) ||
      ((paymentOptions === "Cash to Metal" || paymentOptions === "Metal") &&
        (parseFloat(paymentGold) !== 0.0 || parseFloat(paymentSilver) !== 0.0))
    ) {
      if (paymentOptions && paymentAmount >= 0 && paymentType === "Paid") {
        // Update the payments array with new payment mode and amount
        if (
          paymentOptions === "Metal to Cash" ||
          paymentOptions === "Cash to Metal" ||
          paymentOptions === "Metal"
        ) {
          setPayments([
            ...payments,
            {
              mode: paymentOptions,
              amount: paymentAmount,
              fineGold: parseFloat(paymentGold),
              fineSilver: parseFloat(paymentSilver),
              deductGold: deductGold,
              deductSilver: deductSilver,
              paymentType: paymentType,
              goldRate: metalPaymentOption.optionSelected
                .toLowerCase()
                .includes("gold")
                ? metalPaymentOption.fineRate
                : 0,
              silverRate: !metalPaymentOption.optionSelected
                .toLowerCase()
                .includes("gold")
                ? metalPaymentOption.fineRate
                : 0,
              goldAmount: metalPaymentOption.optionSelected
                .toLowerCase()
                .includes("gold")
                ? metalPaymentOption.totalAmount
                : 0,
              silverAmount: !metalPaymentOption.optionSelected
                .toLowerCase()
                .includes("gold")
                ? metalPaymentOption.totalAmount
                : 0,
              paymentDescription: paymentDescription,
            },
          ]);
        } else {
          setPayments([
            ...payments,
            {
              mode: !paymentOptions.toLowerCase().includes("advance")
                ? paymentOptions
                : advanceType,
              amount: !paymentOptions.toLowerCase().includes("advance")
                ? paymentAmount
                : advanceAmount,
              fineGold: 0,
              fineSilver: 0,
              finePurity: 0,
              totalWt: 0,
              deductGold: 0,
              deductSilver: 0,
              paymentType: paymentType,
              goldRate: 0,
              silverRate: 0,
              goldAmount: 0,
              silverAmount: 0,
              paymentDescription: paymentDescription,
            },
          ]);
        }
        if (!paymentOptions.toLowerCase().includes("advance")) {
          setGrandTotal(parseInt(grandTotal) - parseInt(paymentAmount));
          setPaymentAmount(parseInt(grandTotal) - parseInt(paymentAmount));
        } else if (
          paymentOptions.toLowerCase().includes("advance") &&
          advanceType === "Deduct Advance"
        ) {
          setSelectedCustomer({
            ...selectedCustomer,
            advanceAmt:
              parseFloat(selectedCustomer.advanceAmt) -
              parseFloat(advanceAmount),
          });
          setGrandTotal(parseInt(grandTotal) - parseInt(advanceAmount));
          setPaymentAmount(parseInt(grandTotal) - parseInt(advanceAmount));
          setAdvanceAmount(0);
        } else {
          setGrandTotal(parseInt(grandTotal));
          setPaymentAmount(parseInt(grandTotal));
          setAdvanceAmount(0);
        }
        // Clear the input fields
        // setPaymentOptions("Cash");
      } else if (
        paymentOptions &&
        paymentAmount > 0 &&
        paymentType === "Receive"
      ) {
        // Update the payments array with new payment mode and amount
        if (
          paymentOptions === "Metal to Cash" ||
          paymentOptions === "Cash to Metal" ||
          paymentOptions === "Metal"
        ) {
          setPayments([
            ...payments,
            {
              mode: paymentOptions,
              amount: -paymentAmount,
              fineGold: parseFloat(-paymentGold),
              totalWt: 0,
              fineSilver: parseFloat(-paymentSilver),
              deductGold: parseFloat(-deductGold),
              deductSilver: parseFloat(-deductSilver),
              paymentType: paymentType,
              goldRate: metalPaymentOption.optionSelected
                .toLowerCase()
                .includes("gold")
                ? -metalPaymentOption.fineRate
                : 0,
              silverRate: !metalPaymentOption.optionSelected
                .toLowerCase()
                .includes("gold")
                ? -metalPaymentOption.fineRate
                : 0,
              goldAmount: metalPaymentOption.optionSelected
                .toLowerCase()
                .includes("gold")
                ? -metalPaymentOption.totalAmount
                : 0,
              silverAmount: !metalPaymentOption.optionSelected
                .toLowerCase()
                .includes("gold")
                ? -metalPaymentOption.totalAmount
                : 0,
              paymentDescription: paymentDescription,
            },
          ]);
        } else {
          setPayments([
            ...payments,
            {
              mode: paymentOptions,
              amount: -paymentAmount,
              fineGold: 0,
              fineSilver: 0,
              finePurity: 0,
              totalWt: 0,
              deductGold: 0,
              deductSilver: 0,
              paymentType: paymentType,
              goldRate: 0,
              silverRate: 0,
              goldAmount: 0,
              silverAmount: 0,
              paymentDescription: paymentDescription,
            },
          ]);
        }
        setGrandTotal(parseInt(grandTotal) - parseInt(-paymentAmount));
        // Clear the input fields
        // setPaymentOptions("Cash");
        setPaymentAmount(
          Math.abs(parseInt(grandTotal) - parseInt(-paymentAmount))
        );
      } else if (
        paymentOptions &&
        paymentAmount < 0 &&
        paymentType === "Receive"
      ) {
        // Update the payments array with new payment mode and amount
        if (
          paymentOptions === "Cash to Metal" ||
          paymentOptions === "Metal to Cash" ||
          paymentOptions === "Metal"
        ) {
          setPayments([
            ...payments,
            {
              mode: paymentOptions,
              amount: -paymentAmount,
              fineGold: parseFloat(-paymentGold),
              fineSilver: parseFloat(-paymentSilver),
              totalWt: 0,
              deductGold: parseFloat(-deductGold),
              deductSilver: parseFloat(-deductSilver),
              paymentType: paymentType,
              goldRate: metalPaymentOption.optionSelected
                .toLowerCase()
                .includes("gold")
                ? -metalPaymentOption.fineRate
                : 0,
              silverRate: !metalPaymentOption.optionSelected
                .toLowerCase()
                .includes("gold")
                ? -metalPaymentOption.fineRate
                : 0,
              goldAmount: metalPaymentOption.optionSelected
                .toLowerCase()
                .includes("gold")
                ? -metalPaymentOption.totalAmount
                : 0,
              silverAmount: metalPaymentOption.optionSelected
                .toLowerCase()
                .includes("gold")
                ? -metalPaymentOption.totalAmount
                : 0,
              paymentDescription: paymentDescription,
            },
          ]);
        } else {
          setPayments([
            ...payments,
            {
              mode: paymentOptions,
              amount: -paymentAmount,
              fineGold: 0,
              fineSilver: 0,
              finePurity: 0,
              totalWt: 0,
              deductGold: 0,
              deductSilver: 0,
              paymentType: paymentType,
              goldRate: 0,
              silverRate: 0,
              goldAmount: 0,
              silverAmount: 0,
              paymentDescription: paymentDescription,
            },
          ]);
        }
        setGrandTotal(parseInt(grandTotal) - parseInt(paymentAmount));
        // Clear the input fields
        // setPaymentOptions("Cash");
        setPaymentAmount(parseInt(grandTotal) - parseInt(paymentAmount));
      }
      setTotalPayableGold(totalPayableGold - deductGold);
      setTotalPayableSilver(totalPayableSilver - deductSilver);
      setPaymentDescription("");
      // setMetalPaymentOption({
      //   optionSelected: "Gold",
      //   fineRate: 0,
      //   fineWt: 0,
      //   totalAmount: 0,
      //   deductGold: 0,
      //   deductSilver: 0,
      //   goldRate: 0,
      //   silverRate: 0,
      //   goldAmount: 0,
      //   silverAmount: 0,
      // });
      // setPaymentOptions("Cash");
      setMetalPaymentOption({
        optionSelected: "GOLD",
        fineRate: 0,
        fineWt: 0,
        finePurity: 0,
        totalAmount: 0,
        totalWt: 0,
        deductGold: 0,
        deductSilver: 0,
        goldRate: 0,
        silverRate: 0,
        goldAmount: 0,
        silverAmount: 0,
      });
      setPaymentGold(0);
      setPaymentSilver(0);
      setDeductGold(0);
      setDeductSilver(0);
    } else {
      setMessageType("error");
      setMessageToShow("Payment Amount and Metal Both could not be zero");
      setShowError(true);
    }
  };
  console.log(payments, "payments");
  console.log(payments, "payments");
  console.log(payments, "payments");
  console.log(metalPaymentOption, "metalPaymentOption");
  console.log(metalPaymentOption, "metalPaymentOption");
  const deletePayment = (index) => {
    // Get the amount of the payment to be deleted
    setPaymentOptions(payments[index].mode);
    const deletedAmount = parseFloat(payments[index].amount);
    const deletedGoldWeight = parseFloat(payments[index].deductGold);
    const deletedSilverWeight = parseFloat(payments[index].deductSilver);

    const updatedPayments = [...payments];
    updatedPayments.splice(index, 1);
    setPayments(updatedPayments);
    const newGrandTotal = grandTotal + deletedAmount;
    if (payments[index].mode === "Advance Received") {
      null;
    } else if (payments[index].mode === "Deduct Advance") {
      setSelectedCustomer({
        ...selectedCustomer,
        advanceAmt:
          parseFloat(selectedCustomer.advanceAmt) +
          parseFloat(payments[index].amount),
      });
      setGrandTotal(newGrandTotal);
      const remainingGoldWeight = totalPayableGold + deletedGoldWeight;
      const remainingSilverWeight = totalPayableSilver + deletedSilverWeight;
      setTotalPayableGold(remainingGoldWeight);
      setTotalPayableSilver(remainingSilverWeight);
      setPaymentAmount(Math.abs(parseInt(newGrandTotal)));
    } else {
      setGrandTotal(newGrandTotal);
      const remainingGoldWeight = totalPayableGold + deletedGoldWeight;
      const remainingSilverWeight = totalPayableSilver + deletedSilverWeight;
      setTotalPayableGold(remainingGoldWeight);
      setTotalPayableSilver(remainingSilverWeight);
      setPaymentAmount(Math.abs(parseInt(newGrandTotal)));
    }
  };
