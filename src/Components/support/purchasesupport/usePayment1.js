

export const addPayment = ({
    paymentOptions,
    paymentAmount,
    paymentGold,
    paymentSilver,
    deductGold,
    deductSilver,
    paymentType,
    metalPaymentOption,
    grandTotal,
    selectedCustomer,
    setPayments,
    setGrandTotal,
    setPaymentAmount,
    setTotalPayableGold,
    setTotalPayableSilver,
    setMessageType,
    setMessageToShow,
    setShowError,
    setPaymentDescription,
    setMetalPaymentOption,
    paymentDescription
  }) => {
    // Check if both payment mode and amount are provided
    if (
      (paymentOptions !== "Cash to Metal" &&
        paymentOptions !== "Metal" &&
        paymentAmount !== "" &&
        paymentAmount !== 0) ||
      ((paymentOptions === "Cash to Metal" || paymentOptions === "Metal") &&
        (parseFloat(paymentGold) !== 0.0 || parseFloat(paymentSilver) !== 0.0))
    ) {
      const newPayment = {
        mode: paymentOptions,
        amount: paymentAmount,
        fineGold: parseFloat(paymentGold),
        fineSilver: parseFloat(paymentSilver),
        deductGold: deductGold,
        deductSilver: deductSilver,
        paymentType: paymentType,
        goldRate: metalPaymentOption.optionSelected
          .toLowerCase()
          .includes("gold") ? metalPaymentOption.fineRate : 0,
        silverRate: !metalPaymentOption.optionSelected
          .toLowerCase()
          .includes("gold") ? metalPaymentOption.fineRate : 0,
        goldAmount: metalPaymentOption.optionSelected
          .toLowerCase()
          .includes("gold") ? metalPaymentOption.totalAmount : 0,
        silverAmount: !metalPaymentOption.optionSelected
          .toLowerCase()
          .includes("gold") ? metalPaymentOption.totalAmount : 0,
        paymentDescription: paymentDescription,
      };
  
      // Determine if this is a "Paid" or "Receive" payment
      if (paymentType === "Paid") {
        if (
          paymentOptions === "Metal to Cash" ||
          paymentOptions === "Cash to Metal" ||
          paymentOptions === "Metal"
        ) {
          setPayments((prevPayments) => [...prevPayments, newPayment]);
        } else {
          // Handle other payment options if necessary
          setPayments((prevPayments) => [
            ...prevPayments,
            {
              mode: paymentOptions,
              amount: paymentAmount,
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
  
        // setGrandTotal((prevTotal) => prevTotal - paymentAmount);
        // setPaymentAmount((prevTotal) => prevTotal - paymentAmount);

        setGrandTotal(parseInt(grandTotal) - parseInt(-paymentAmount));
                // Clear the input fields
                // setPaymentOptions("Cash");
                setPaymentAmount(
                    Math.abs(parseInt(grandTotal) - parseInt(-paymentAmount))
                );
  
      } else if (paymentType === "Receive") {
        const newReceivePayment = {
          ...newPayment,
          amount: parseFloat(-paymentAmount),
          fineGold: parseFloat(-paymentGold),
          fineSilver: parseFloat(-paymentSilver),
          deductGold: parseFloat(-deductGold),
          deductSilver: parseFloat(-deductSilver),
          goldRate: metalPaymentOption.optionSelected
            .toLowerCase()
            .includes("gold") ? -metalPaymentOption.fineRate : 0,
          silverRate: !metalPaymentOption.optionSelected
            .toLowerCase()
            .includes("gold") ? -metalPaymentOption.fineRate : 0,
          goldAmount: metalPaymentOption.optionSelected
            .toLowerCase()
            .includes("gold") ? -metalPaymentOption.totalAmount : 0,
          silverAmount: !metalPaymentOption.optionSelected
            .toLowerCase()
            .includes("gold") ? -metalPaymentOption.totalAmount : 0,
        };
        setPayments((prevPayments) => [...prevPayments, newReceivePayment]);
        // setGrandTotal((prevTotal) => parseFloat(prevTotal) - parseFloat(paymentAmount));
        // setPaymentAmount((prevTotal) => parseFloat(prevTotal) - parseFloat(paymentAmount))
        // setGrandTotal('12000')


        setGrandTotal(parseInt(grandTotal) - parseInt(-paymentAmount));
                // Clear the input fields
                // setPaymentOptions("Cash");
                setPaymentAmount(
                    Math.abs(parseInt(grandTotal) - parseInt(-paymentAmount))
                );


        console.log('check paymentss',newReceivePayment )
      }
  
      // Update total payable amounts
      setTotalPayableGold((prevGold) => prevGold - deductGold);
      setTotalPayableSilver((prevSilver) => prevSilver - deductSilver);
      setPaymentDescription("");

     
  
      // Reset metal payment options and amounts
      setMetalPaymentOption({
        optionSelected: "GOLD",
        fineRate: 0,
        fineWt: 0,
        totalAmount: 0,
        totalWt: 0,
        deductGold: 0,
        deductSilver: 0,
        goldRate: 0,
        silverRate: 0,
        goldAmount: 0,
        silverAmount: 0,
      });
  
    } else {
      setMessageType("error");
      setMessageToShow("Payment Amount and Metal Both could not be zero");
      setShowError(true);
    }
  };
  
  export const deletePayment = ({
    index,
    payments,
    setPayments,
    grandTotal,
    setGrandTotal,
    setTotalPayableGold,
    setTotalPayableSilver,
    setPaymentAmount,
    selectedCustomer
  }) => {
    // Get the amount of the payment to be deleted
    const deletedAmount = parseFloat(payments[index].amount);
    const deletedGoldWeight = parseFloat(payments[index].deductGold);
    const deletedSilverWeight = parseFloat(payments[index].deductSilver);
  
    const updatedPayments = [...payments];
    updatedPayments.splice(index, 1);
    setPayments(updatedPayments);
    const newGrandTotal = parseFloat(grandTotal||0) + deletedAmount;
    if (payments[index].mode === "Advance Received") {
      // No additional actions needed


      
    } else if (payments[index].mode === "Deduct Advance") {
      setSelectedCustomer({
        ...selectedCustomer,
        advanceAmt: parseFloat(selectedCustomer.advanceAmt) + parseFloat(payments[index].amount),
      });
      setGrandTotal(newGrandTotal);
      setTotalPayableGold((prevGold) => prevGold + deletedGoldWeight);
      setTotalPayableSilver((prevSilver) => prevSilver + deletedSilverWeight);
      setPaymentAmount(newGrandTotal);
    } else {
      setGrandTotal(newGrandTotal);
      setTotalPayableGold((prevGold) => prevGold + deletedGoldWeight);
      setTotalPayableSilver((prevSilver) => prevSilver + deletedSilverWeight);
      setPaymentAmount(newGrandTotal);
    }
  };


  // File: ../../../support/purchasesupport/usePayment.js

export const handlePaymentOption = (type, value, metalPaymentOption, paymentOptions) => {
    let totalAmount = 0;
    let finePaid = 0;

    const isGold = metalPaymentOption.optionSelected !== "" && metalPaymentOption.optionSelected.toLowerCase().includes("gold");

    switch (paymentOptions) {
        case "Metal to Cash":
            if (isGold) {
                if (type === "Rate") {
                    totalAmount = (value / 10) * metalPaymentOption.fineWt;
                    return {
                        ...metalPaymentOption,
                        fineRate: value,
                        totalAmount,
                    };
                } else {
                    totalAmount = (metalPaymentOption.fineRate / 10) * value;
                    return {
                        ...metalPaymentOption,
                        fineWt: value,
                        totalAmount,
                    };
                }
            } else {
                if (type === "Rate") {
                    totalAmount = (value / 10) * metalPaymentOption.fineWt;
                    return {
                        ...metalPaymentOption,
                        fineRate: value,
                        totalAmount,
                    };
                } else {
                    totalAmount = (metalPaymentOption.fineRate / 10) * value;
                    return {
                        ...metalPaymentOption,
                        fineWt: value,
                        totalAmount,
                    };
                }
            }

        case "Metal":
            if (isGold) {
                if (type === "totalWt") {
                    finePaid = parseFloat((metalPaymentOption.finePurity / 100) * value).toFixed(3);
                    return {
                        ...metalPaymentOption,
                        deductSilver: 0,
                        deductGold: finePaid,
                        totalWt: value,
                        fineWt: finePaid || 0,
                    };
                } else {
                    finePaid = parseFloat((value / 100) * metalPaymentOption.totalWt).toFixed(3);
                    return {
                        ...metalPaymentOption,
                        deductSilver: 0,
                        deductGold: finePaid,
                        finePurity: value,
                        fineWt: finePaid,
                    };
                }
            } else {
                if (type === "totalWt") {
                    finePaid = parseFloat((metalPaymentOption.finePurity / 100) * value).toFixed(3);
                    return {
                        ...metalPaymentOption,
                        deductGold: 0,
                        deductSilver: finePaid,
                        totalWt: value,
                        fineWt: finePaid || 0,
                    };
                } else {
                    finePaid = parseFloat((value / 100) * metalPaymentOption.totalWt).toFixed(3);
                    return {
                        ...metalPaymentOption,
                        deductGold: 0,
                        deductSilver: finePaid,
                        finePurity: value,
                        fineWt: finePaid,
                    };
                }
            }

        case "Cash to Metal":
            let fineWt = 0;
            if (isGold) {
                if (type === "Amount") {
                    fineWt = parseFloat((value * 10) / metalPaymentOption.fineRate).toFixed(3);
                    return {
                        ...metalPaymentOption,
                        fineWt: fineWt || 0,
                        totalAmount: value,
                        deductGold: fineWt || 0,
                        deductSilver: 0,
                    };
                } else {
                    fineWt = parseFloat((metalPaymentOption.totalAmount * 10) / value).toFixed(3);
                    return {
                        ...metalPaymentOption,
                        fineWt: fineWt || 0,
                        fineRate: value,
                        deductGold: fineWt || 0,
                        deductSilver: 0,
                    };
                }
            } else {
                if (type === "Amount") {
                    fineWt = parseFloat((value * 10) / metalPaymentOption.fineRate).toFixed(3);
                    return {
                        ...metalPaymentOption,
                        fineWt: fineWt || 0,
                        totalAmount: value,
                        deductGold: 0,
                        deductSilver: fineWt || 0,
                    };
                } else {
                    fineWt = parseFloat((metalPaymentOption.totalAmount * 10) / value).toFixed(3);
                    return {
                        ...metalPaymentOption,
                        fineWt: fineWt || 0,
                        fineRate: value,
                        deductGold: 0,
                        deductSilver: fineWt || 0,
                    };
                }
            }
        default:
            return metalPaymentOption;
    }
};

  