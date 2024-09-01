/*eslint-disable*/
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
            <button onClick={
                // addPayment
                handleAddPayment()
                }>Add</button>
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
            <button onClick={
                // addPayment
                handleAddPayment()
                }>Add</button>
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
            <button onClick={
                // addPayment
                handleAddPayment()
                }>Add</button>
        </div>
    </div>
) : null}
{paymentOptions === "Advance Amount" ? (
    <div style={{marginTop: "20px"}}>
        <div
            style={{gridAutoFlow: "row"}}
            className="adminInviceAddedProductsTotalItemBoxPaymentType"
        >
            <div
                onClick={() => {
                    setPaymentAmount(Math.abs(paymentAmount));
                    setAdvanceType("Advance Received");
                }}
            >
                {advanceType === "Advance Received" ? (
                    <FaRegDotCircle style={{marginRight: "5px"}}/>
                ) : (
                    <FaRegCircle style={{marginRight: "5px"}}/>
                )}
                Adv Rcvd
            </div>
            <div onClick={() => setAdvanceType("Deduct Advance")}>
                {advanceType === "Deduct Advance" ? (
                    <FaRegDotCircle style={{marginRight: "5px"}}/>
                ) : (
                    <FaRegCircle style={{marginRight: "5px"}}/>
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
                <label style={{whiteSpace: "nowrap"}}>
                    Description
                </label>
                <input
                    style={{width: "100%"}}
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
                                // addPayment();
                                handleAddPayment()
                            }
                        }}
                    >
                        <GiCheckMark/>
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
                        <RxCross2/>
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
                <label style={{whiteSpace: "nowrap"}}>
                    Description
                </label>
                <input
                    style={{width: "100%"}}
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
                                // addPayment();
                                handleAddPayment()
                            }
                        }}
                    >
                        <GiCheckMark/>
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
                        <RxCross2/>
                    </button>
                </div>
            </div>
        )}
    </div>
) : null}