import React, { useEffect, useState } from "react";

import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { AiOutlineSend } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

export default function PaymentBox({ totalPayableGold, totalPayableSilver, allProdctsNetAmount, discountAmount, totalPayableGstAmount, totalPayableAmount, totalPaidAmount, grandTotal }) {
    const [paymentType, setPaymentType] = useState("Paid");
    const [paymentOptions, setPaymentOptions] = useState("Cash");
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [paymentDescription, setPaymentDescription] = useState("");
    const [metalPaymentOption, setMetalPaymentOption] = useState({
        optionSelected: "GOLD",
        fineRate: 0,
        fineWt: 0,
        totalAmount: 0,
        deductGold: 0,
        deductSilver: 0,
        goldRate: 0,
        silverRate: 0,
        goldAmount: 0,
        silverAmount: 0,
    });

    console.log({
        totalPayableGold,
        totalPayableSilver,
        allProdctsNetAmount,
        discountAmount,
        totalPayableGstAmount,
        totalPaidAmount,
        grandTotal,
    });
    

    const renderPaymentOptions = () => {
        let options = ["Cash", "Card", "UPI", "Cheque", "RTGS", "MDS"];

        if (paymentType === "Paid") {
            options.push("Advance Amount");
        }
        options.push("Metal", "Metal to Cash", "Cash to Metal");

        return options.map((option) => (
            <option value={option} key={option}>{option}</option>
        ));
    };

    const renderMetalDropdown = () => {
        const metalOptions = [
            "GOLD",
            "SILVER",
            "PLATINUM",
            "PURE GOLD",
            "PURE SILVER",
            "OLD GOLD",
            "OLD SILVER"
        ];

        return metalOptions.map((option) => (
            <option value={option} key={option}>{option}</option>
        ));
    };



    const addPayment = () => {
        // Logic to add payment
        console.log("Payment Added", { paymentOptions, paymentAmount, paymentDescription });
    };

    const handleMetalPaymentOption = (a, b) => {

    }

    const renderMetalToCashSection = () => {
        return (
            <div className="adminInviceAddedProductsMetaltoCashMainBox" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div>
                    <label>Metal</label>

                    <select onChange={(e) => setMetalPaymentOption({
                        ...metalPaymentOption,
                        optionSelected: `${e.target.value}`,
                    })} value={metalPaymentOption.optionSelected}>
                        {renderPaymentOptions()}
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
                    <label>Total Amount</label>
                    <input
                        type="number"
                        value={metalPaymentOption.totalAmount}
                        readOnly
                    />
                </div>
                {/* <div style={{ margin: "10px", width: "100px", marginLeft: "auto" }} className="adminInvoiceMainSaveButtonBox">
                    <button onClick={handleAddPayment}>
                        Add
                    </button>
                </div> */}
            </div>
        );
    };


    const renderCashToMetalSection = () => {
        return (
            <div className="adminInviceAddedProductsMetaltoCashMainBox" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div>
                    <label>Metal</label>

                    <select onChange={(e) => setMetalPaymentOption({
                        ...metalPaymentOption,
                        optionSelected: `${e.target.value}`,
                    })} value={metalPaymentOption.optionSelected}>
                        {renderPaymentOptions()}
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
                {/* <div style={{ margin: "10px", width: "100px", marginLeft: "auto" }} className="adminInvoiceMainSaveButtonBox">
                    <button onClick={handleAddPayment}>
                        Add
                    </button>
                </div> */}
            </div>
        );
    };

    const renderMetalSection = () => {
        return (
            <div className="adminInviceAddedProductsMetaltoCashMainBox" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div>
                    <label>Metal</label>

                    <select onChange={(e) => setMetalPaymentOption({
                        ...metalPaymentOption,
                        optionSelected: `${e.target.value}`,
                    })} value={metalPaymentOption.optionSelected}>
                        {renderPaymentOptions()}
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
                {/* <div style={{ margin: "10px", width: "100px", marginLeft: "auto" }} className="adminInvoiceMainSaveButtonBox">
                    <button onClick={handleAddPayment}>
                        Add
                    </button>
                </div> */}
            </div>
        );
    };

    const renderDescriptionAndAmountFields = () => {
        // Payment modes that require both description and amount fields
        const generalModes = ["Cash", "Card", "UPI", "Cheque", "RTGS", "MDS"];

        if (generalModes.includes(paymentOptions)) {
            return (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <label style={{ whiteSpace: "nowrap" }}>Description</label>
                        <input
                            style={{ width: "70%" }}
                            type="text"
                            value={paymentDescription}
                            onChange={(e) => setPaymentDescription(e.target.value)}
                            placeholder="Enter description"
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <label style={{ whiteSpace: "nowrap" }}>Amount</label>
                        <div style={{ display: "flex", alignItems: "center", width: "70%" }}>
                            <input
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                placeholder="Enter amount"
                                style={{ flex: 1 }}
                            />
                            <button
                                onClick={() => {
                                    if (
                                        paymentOptions === "Cash" &&
                                        paymentAmount > 200000
                                    ) {
                                        alert("Could not take more than 200000 in Cash");
                                    } else {
                                        addPayment();
                                    }
                                }}
                                style={{ marginLeft: "5px" }}
                            >
                                <GiCheckMark />
                            </button>
                            <button
                                onClick={() => {
                                    setPaymentAmount(0);
                                    setPaymentOptions("Cash");
                                    setPaymentDescription("");
                                }}
                                style={{ marginLeft: "5px" }}
                            >
                                <RxCross2 />
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else if (paymentOptions === "Metal to Cash") {
            return renderMetalToCashSection(); // Render the Metal to Cash section
        } else if (paymentOptions === "Cash to Metal") {
            return renderCashToMetalSection(); // Render the Metal to Cash section
        } else if (paymentOptions === "Metal") {
            return renderMetalSection(); // Render the Metal to Cash section
        }

        return null; // No additional fields for other payment modes
    };


    return (
        <>
            <div
                style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
                className="adminInviceAddedProductsTotalOuterBox"
            >
                <div className="adminInviceAddedProductsTotalAmountOuterBox">
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

                        <select onChange={(e) => setPaymentOptions(e.target.value)} value={paymentOptions}>
                            {renderPaymentOptions()}
                        </select>
                        {renderDescriptionAndAmountFields()}

                    </div>

                    <div className="adminInviceAddedProductsTotalItemBox">
                      <label>Balance Gold (F + W)</label>
                      <input
                        type="text"
                        value={parseFloat(totalPayableGold).toFixed(3)}
                        readOnly
                      />
                      <label>Balance Silver (F + W)</label>
                      <input
                        type="text"
                        value={parseFloat(totalPayableSilver).toFixed(3)}
                        readOnly
                      />
                      <label>Taxable Amount</label>
                      <input
                        type="text"
                        value={parseInt(allProdctsNetAmount).toLocaleString(
                          "en-IN"
                        )}
                        readOnly
                      />
                      <label>R.O./Discount(-)</label>
                      <input
                        type="text"
                        value={parseInt(discountAmount).toLocaleString("en-IN")}
                        readOnly
                      />
                      <label>GST 3%</label>
                      <input
                        type="text"
                        value={parseInt(totalPayableGstAmount).toLocaleString(
                          "en-IN"
                        )}
                        readOnly
                      />
                      <label>Total Amount</label>
                      <input
                        type="text"
                        style={{ backgroundColor: "wheat" }}
                        value={Math.ceil(totalPayableAmount)}
                        onChange={(e) => {
                          const newTotalPayableAmount = parseFloat(
                            e.target.value
                          );
                          if (!isNaN(newTotalPayableAmount)) {
                            // Check if the input value is a valid number
                            setTotalPayableGstAmount(
                              ((newTotalPayableAmount / 103) * 3).toFixed(2)
                            );
                            changeTotalPrice(e);

                            // setGrandTotal(0);
                            // setOldGoldAmount(0);
                          } else {
                            //   setTotalPayableAmount(allProdctsNetAmount);
                            setTotalPayableAmount(0);
                          }
                        }}
                      />
                     
                      <label>Paid Amount</label>
                      <input
                        type="text"
                        value={parseInt(totalPaidAmount)}
                        readOnly
                      />
                      <label>Balance Amount</label>
                      <input
                        type="text"
                        value={parseInt(grandTotal).toLocaleString("en-IN")}
                        readOnly
                      />
                    </div>



                    {/* <div
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
                                <label style={{ whiteSpace: "nowrap" }}>Description</label>
                                <input
                                    style={{ width: "100%" }}
                                    type="text"
                                    value={paymentDescription}
                                    onChange={(e) => setPaymentDescription(e.target.value)}
                                />
                                <label>Amount1</label>
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
                                            const isReceive = paymentType === "Receive";
                                            const isCash = paymentOptions === "Cash";
                                            const paymentAmt = parseFloat(paymentAmount);
                                            const balanceAmount = parseFloat(grandTotal);

                                            console.log(
                                                "checking payments  ",
                                                paymentAmount,
                                                "  ",
                                                balanceAmount
                                            );

                                            // Condition for "Receive" payments
                                            const isInvalidReceiveAmount =
                                                isReceive &&
                                                (paymentAmt > Math.abs(balanceAmount) ||
                                                    balanceAmount >= 0); // Payment amount must not exceed balance and balance should be negative

                                            // Condition for "Paid" payments
                                            const isInvalidPaidAmount =
                                                !isReceive &&
                                                (paymentAmt > balanceAmount || balanceAmount <= 0); // Payment amount must not exceed balance and balance should be positive

                                            // Condition to check if cash limit is exceeded
                                            const exceedsCashLimit = isCash && paymentAmt > 200000;

                                            if (isInvalidReceiveAmount) {
                                                alert(
                                                    "Cannot receive more than the balance amount, and the balance should be negative."
                                                );
                                            } else if (isInvalidPaidAmount) {
                                                alert(
                                                    "Cannot pay more than the balance amount, and the balance should be positive."
                                                );
                                            }
                                            else if (exceedsCashLimit) {
                                                alert("Cannot accept more than 200,000 in cash.");
                                            }
                                            else {
                                                handleAddPayment(); // Proceed with payment
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
                                <button
                                    onClick={() =>
                                        // addPayment
                                        handleAddPayment()
                                    }
                                >
                                    Add
                                </button>
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
                                <button
                                    onClick={() =>
                                        // addPayment
                                        handleAddPayment()
                                    }
                                >
                                    Add
                                </button>
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
                                <button
                                    onClick={() => {


                                        const isReceive = paymentType === "Receive";
                                        // Condition for "Receive" payments
                                        const isInvalidReceiveAmount =
                                            isReceive &&
                                            (totalPayableGold > 0);

                                        // Condition for "Paid" payments
                                        const isInvalidPaidAmount =
                                            !isReceive &&
                                            (totalPayableGold < 0); // Payment amount must not exceed balance and balance should be positive

                                        if (isInvalidReceiveAmount) {
                                            alert(
                                                "Cannot receive more than the balance amount, and the balance should be negative."
                                            );
                                        } else if (isInvalidPaidAmount) {
                                            alert(
                                                "Cannot pay more than the balance amount, and the balance should be positive."
                                            );
                                        } else {
                                            handleAddPayment(); // Proceed with payment
                                        }


                                        // Check if totalPayableGold is greater than metalPaymentOption.fineWt
                                        // if (metalPaymentOption.fineWt > totalPayableGold) {
                                        //   console.log("more then expected  ");
                                        //   return; // Exit early if the condition is true
                                        // }

                                        // Call the handleAddPayment function if the condition is not met
                                        // handleAddPayment();
                                    }}
                                >
                                    Add
                                </button>
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
                                    <label style={{ whiteSpace: "nowrap" }}>Description</label>
                                    <input
                                        style={{ width: "100%" }}
                                        type="text"
                                        value={paymentDescription}
                                        onChange={(e) => setPaymentDescription(e.target.value)}
                                    />
                                    <label>Amounttt</label>
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
                                            // value={paymentAmount}
                                            // onChange={(e) => setPaymentAmount(e.target.value)}
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
                                                console.log(
                                                    "check advance ",
                                                    paymentOptions,
                                                    "  ",
                                                    totalPaidCashAmount
                                                );
                                                if (
                                                    paymentOptions == "Advance Amount" &&
                                                    totalPaidCashAmount + parseInt(advanceAmount) <=
                                                    200000 && parseInt(advanceAmount) > 0
                                                ) {
                                                    handleAddPayment();
                                                } else {
                                                    alert("Could Not Take more less than 0 and than 200000 in Cash");
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
                                        value={selectedCustomer ? selectedCustomer.AdvanceAmt : "0"}
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
                                                    totalPaidCashAmount + parseInt(paymentAmount) > 200000 && parseInt(advanceAmount) <= 0
                                                ) {
                                                    alert("Could Not tak 0 or more than 200000 in Cash");
                                                } else if (
                                                    paymentAmount > 200000 &&
                                                    paymentOptions == "Cash"
                                                ) {
                                                    alert("Could'nt Take more than 200000 in Cash");
                                                } else {
                                                    // addPayment();
                                                    handleAddPayment();
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

                                        <td>
                                            {!payment.Id ||
                                                (payment.Id && isWithinLast24Hours(payment.CreatedOn)) ? (
                                                <button
                                                    tabIndex="7"
                                                    className="adminInviceAddedProductsTotalAmountDeleteOption"
                                                    onClick={() =>
                                                        // deletePayment(index)
                                                        handleDeletePayment(index)
                                                    }
                                                    onKeyPress={(e) => {
                                                        if (e.key === "Enter" && button7Ref.current) {
                                                            button7Ref.current.focus();
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                <button
                                                    style={{ color: "rgba(0,0,0,0.4)" }}
                                                    disabled
                                                    className="adminInviceAddedProductsTotalAmountDeleteOption"
                                                >
                                                    Delete (Disabled)
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}
                </div>
                {/* <div className="adminInviceAddedProductsTotalItemBox">
                    <label>Balance Gold (F + W)</label>
                    <input
                        type="text"
                        value={parseFloat(totalPayableGold).toFixed(3)}
                        readOnly
                    />
                    <label>Balance Silver (F + W)</label>
                    <input
                        type="text"
                        value={parseFloat(totalPayableSilver).toFixed(3)}
                        readOnly
                    />
                    <label>Taxable Amount</label>
                    <input type="text" value={allProdctsNetAmount} readOnly />
                    <label>R.O./Discount(-)</label>
                    <input type="text" value={discountAmount} readOnly />
                    <div className="invoiceGstCheckBox1">
                        <label>GST 3% </label>
                        <input
                            // className="invoiceGstCheckBox1"
                            style={{ marginLeft: "10px" }}
                            type="checkbox"
                            checked={gstType}
                            onChange={() => {
                                setGstType(!gstType),
                                    setConvertAmount(!convertAmount),
                                    setIscal(true),
                                    setDiscountAmount(0);
                                // setGstType(!gstType), setDiscountAmount(0);
                            }}
                        />
                    </div>
                    <input type="text" value={totalPayableGstAmount} readOnly />

                    <label>Total Amount</label>
                    <input
                        readOnly
                        tabIndex="2"
                        ref={button1Ref}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                button2Ref.current.focus();
                            }
                        }}
                        type="text"
                        style={{ backgroundColor: "wheat" }}
                        value={totalPayableAmount}
                        onChange={(e) => {
                            const newTotalPayableAmount = parseFloat(e.target.value);
                            if (!isNaN(newTotalPayableAmount)) {
                                // Check if the input value is a valid number
                                if (gstType) {
                                    setTotalPayableGstAmount(
                                        ((newTotalPayableAmount / 103) * 3).toFixed(2)
                                    );
                                } else {
                                    setTotalPayableGstAmount(0);
                                }
                                changeTotalPrice(e);

                                // setGrandTotal(0);
                                // setOldGoldAmount(0);
                            } else {
                                //   setTotalPayableAmount(allProdctsNetAmount);
                                setTotalPayableAmount(0);
                            }
                        }}
                    />

                    <label>Paid Amount</label>
                    <input type="text" value={totalPaidAmount} readOnly />
                    <label>Balance Amount</label>
                    <input type="text" value={grandTotal} readOnly />
                </div> */}
            </div>
        </>


    );

}