// payments.js

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
    setMetalPaymentOption
  }) => {
    // Check if both payment mode and amount are provided
    if (
      (paymentOptions !== "Cash to Metal" &&
        paymentOptions !== "Metal" &&
        paymentAmount !== "" &&
        parseInt(paymentAmount) !== 0) ||
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
  
        setGrandTotal((prevTotal) => prevTotal - parseFloat(paymentAmount));
        setPaymentAmount((prevTotal) => prevTotal - parseFoat(paymentAmount));
  
      } else if (paymentType === "Receive") {
        const newReceivePayment = {
          ...newPayment,
          amount: -paymentAmount,
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
        setGrandTotal((prevTotal) => prevTotal + parseInt(paymentAmount));
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
    const newGrandTotal = grandTotal + deletedAmount;
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
      setPaymentAmount(Math.abs(newGrandTotal));
    } else {
      setGrandTotal(newGrandTotal);
      setTotalPayableGold((prevGold) => prevGold + deletedGoldWeight);
      setTotalPayableSilver((prevSilver) => prevSilver + deletedSilverWeight);
      setPaymentAmount(Math.abs(newGrandTotal));
    }
  };
  