import {jsPDF} from "jspdf";

export const generateBillPDF = (csData, invoiceItems) => {



  generatepdf2(csData, invoiceItems);

  



};

const generatepdf2 = (csData, invoiceItems) =>{
  const doc = new jsPDF({
    orientation: "portrait",
    format: "a4",
  });
  console.log(csData, "csData44444");
  console.log(invoiceItems, "csData44444");
  let Total = 0;
  doc.setDrawColor(0, 0, 0, 0.3);
  doc.setFontSize(12);
  doc.setFont("times");
  // if (csData?.billType === "false") {
  //   doc.text(`${csData?.orderType}`, 90, 47.5);
  // } else {
  //   doc.text(`${`billType`}`, 90, 47.5);
  // }
  doc.setFontSize(10);
  doc.line(5, 44, 205, 44);
  doc.line(5, 290, 205, 290);
  doc.line(5, 44, 5, 290);
  doc.line(205, 44, 205, 290);
  doc.line(5, 48, 205, 48);
  doc.setFont("times");

  const startY = 47.5;
  const headerY = 51;
  const maxPageHeight = doc.internal.pageSize.height - 20;
  let y = headerY;

  const renderAddress = (label, customer, y) => {
    doc.line(5, y + 22, 115, y + 22);
    doc.text(label, 6, y);
    doc.setFont("times", "bold");
    doc.text(`${customer.FirstName || ""} ${customer.LastName || ""}`, 6, y + 4);
    doc.setFont("times", "normal");
    doc.text(`${customer.CurrAddStreet || "Street"}`, 6, y + 8);
    doc.text(`${customer.CurrAddTown || "Town"}`, 6, y + 12);
    doc.text(`Gst No. - ${customer.GstNo || "Gst No."}`, 6, y + 16);
    doc.text(`${customer.CurrAddState || ""} ${customer.CurrAddPincode || "Pan No. "}`, 6, y + 20);
  };

  if (csData) {
    // Invoice Header
    doc.text(`${csData?.orderType || ""}`, 90, startY);

    // Consignee (Ship to)
    renderAddress("Consignee (Ship to)", csData?.Customer, y);

    doc.text(`Invoice No - ${csData?.invoiceNo || ""}`, 120, y);
    // doc.text(`Invoice Date - ${new Date(csData?.createdOn).toLocaleDateString("en-GB")}`, 120, y + 4);
    doc.text(`Invoice Date - ${csData?.InvoiceDate || ""}`, 120, y + 4);


    y += 27; // Adjust y position

    // Buyer (Bill to)
    renderAddress("Buyer (Bill to)", csData?.Customer, y);
    doc.line(115, y - 30, 115, y + 21);
  }

  doc.line(5, y + 21, 205, y + 21);
  y += 26; // Adjust y position

  // Table Header
  doc.setFontSize(9);
  doc.text("S.No", 6, y);
  doc.text("Description Of Goods", 15, y);
  doc.text("HSN", 70, y);
  doc.text("Pcs", 85, y);
  doc.text("Purity", 95, y);
  doc.text("Gross", 105, y);
  doc.text("Wt", 105, y + 3);
  doc.text("Net", 117, y);
  doc.text("Wt", 117, y + 3);
  doc.text("Other", 130, y);
  doc.text("Charges", 130, y + 3);
  doc.text("Rate", 145, y);
  doc.text("Amount", 160, y);
  doc.text("Hallmark", 175, y);
  doc.text("Charges", 175, y + 3);
  doc.text("Total", 190, y);
  doc.text("Amount", 190, y + 3);
  doc.line(5, y + 5, 205, y + 5);

  y += 10;

  // Invoice Items
  let srNo = 1;
  let totalQuantity = 0;
  let totalGrossWt = 0;
  let totalNetWt = 0;
  let totalStoneAmount = 0;
  let totalNetAmount = 0;
  let totalHallmarkCharges = 0;
  let totalProductAmount = 0;

  doc.setFontSize(8);

  invoiceItems.forEach((item) => {
    let totalAmount = 0;
    if (y + 8 > maxPageHeight) {
      doc.addPage();
      y = 10;
    }
    let OtherCharges = 0;
    let NetCharges = 0;
    let HallmarkCharges = 0;
    const productName = item.ProductName.length > 15 ? `${item.ProductName.substring(0, 15)}...` : item.ProductName;
    doc.text(srNo.toString(), 6, y);
    doc.text(`${item.Purity || ""} ${productName || ""}`, 15, y);
    doc.text(`${item.HSNCode || "-"}`, 70, y);
    doc.text(`${item.Quantity !== 'undefined' ? item.Quantity : "-"}`, 85, y);
    doc.text(`${item.Purity || "-"}`, 95, y);
    doc.text(`${item.GrossWt || "-"}`, 105, y);
    doc.text(`${item.NetWt || "-"}`, 117, y);
    if (item.MRP !== 0 && item.MRP !== "" && item.MRP !== "0") {
      doc.text(`MRP -`, 130, y);
      doc.text(`${parseFloat(item.MRP)?.toFixed(2)}`, 145, y);
      OtherCharges = Number(item.MRP);
    } else {
      doc.text(item.MetalRate ? item.MetalRate : "-", 130, y);
      doc.text(
          parseFloat(
              (parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt)
          )?.toFixed(2),
          145,
          y
      );
      OtherCharges = Number((parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt));
    }

    doc.text(
        parseFloat(
            parseFloat(parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt) +
            parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
            parseFloat(item.StoneAmount ? item.StoneAmount : 0)
        )?.toFixed(2),
        160,
        y
    );
    NetCharges += parseFloat(
        parseFloat(parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0)
    )
    doc.text(item.HallmarkAmount ? `${item.HallmarkAmount}` : "-", 175, y);
    HallmarkCharges += parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0)
    totalAmount = (item.MRP !== 0 && item.MRP !== "" && item.MRP !== "0") ? (parseFloat(item.MRP ? item.MRP : 0) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
    ) : parseFloat(
        parseFloat(parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
    )
    Total += totalAmount
    // doc.text(`${item.StoneAmount || "-"}`, 130, y);
    // doc.text(`${item.MetalRate || "-"}`, 145, y);
    // doc.text(`${item.Amount || "-"}`, 160, y);
    // doc.text(`${item.HallmarkAmount || "-"}`, 175, y);
    doc.text(`${totalAmount || "-"}`, 190, y);

    totalQuantity += parseFloat(item.Quantity !== 'undefined' ? item.Quantity : 0) || 0;
    totalGrossWt += parseFloat(item.GrossWt) || 0;
    totalNetWt += parseFloat(item.NetWt) || 0;
    // totalStoneAmount += parseFloat(item.StoneAmount) || 0;
    totalStoneAmount += OtherCharges;
    // totalNetAmount += parseFloat(item.NetAmount) || 0;
    totalNetAmount += NetCharges;
    // totalHallmarkCharges += parseFloat(item.HallmarkAmount) || 0;
    totalHallmarkCharges += HallmarkCharges;
    totalProductAmount += parseFloat(totalAmount) || 0;

    srNo++;
    y += 8;
  });

  doc.line(5, y - 3, 205, y - 3);

  doc.setFont("times", "bold");
  doc.text("Total", 10, y);
  doc.text(totalQuantity.toFixed(0), 85, y);
  doc.text(totalGrossWt.toFixed(3), 105, y);
  doc.text(totalNetWt.toFixed(3), 117, y);
  doc.text(totalStoneAmount?.toFixed(2), 130, y);
  doc.text(totalNetAmount?.toFixed(2), 160, y);
  doc.text(totalHallmarkCharges?.toFixed(2), 175, y);
  doc.text(totalProductAmount?.toFixed(2), 190, y);

  y += 10;

  // Payment Modes
  if (csData?.paymentMode) {
    const paymentModes = csData?.paymentMode.split(",");
    doc.setFontSize(9);
    doc.text("Payment Mode", 10, y);
    let yPaymentModes = y + 5;
    paymentModes.forEach((paymentMode) => {
      if (yPaymentModes > maxPageHeight - 10) {
        doc.addPage();
        yPaymentModes = 5;
      }
      const [mode, amount] = paymentMode.split(":");
      doc.text(mode, 10, yPaymentModes);
      doc.text(amount, 40, yPaymentModes);
      yPaymentModes += 5;
    });
    y = yPaymentModes + 10;
  }

  // Summary
  const totalSaleAmount = invoiceItems.reduce((total, product) => {
    return total + parseFloat((parseFloat(product.Amount) * 100) / 103 || 0);
  }, 0);

  const payableGst = totalSaleAmount * 0.03;

  if (csData?.Customer.currAddState === "Maharashtra") {
    doc.text(`Sales Amount:`, 155, y);
    doc.text(`${totalSaleAmount?.toFixed(2)}`, 185, y);
    doc.text(`R.O./Discount:`, 155, y + 5);
    doc.text(`${csData?.offer || 0}`, 185, y + 5);
    doc.text(`CGST 1.5%:`, 155, y + 10);
    // doc.text(`${(payableGst / 2)?.toFixed(2)}`, 185, y + 10);
    doc.text(`${((Number(csData?.GST) / 2 || 0))?.toFixed(2)}`, 185, y + 15);
    doc.text(`SGST 1.5%:`, 155, y + 15);
    // doc.text(`${(payableGst / 2)?.toFixed(2)}`, 185, y + 15);
    doc.text(`${((Number(csData?.GST) / 2 || 0))?.toFixed(2)}`, 185, y + 15);
  } else {
    doc.text(`Sales Amount:`, 155, y);
    doc.text(`${totalSaleAmount?.toFixed(2)}`, 185, y);
    doc.text(`R.O./Discount:`, 155, y + 5);
    doc.text(`${csData?.offer || 0}`, 185, y + 5);
    doc.text(`IGST 3%:`, 155, y + 10);
    // doc.text(`${payableGst?.toFixed(2)}`, 185, y + 10);
    doc.text(`${(Number(csData?.GST))?.toFixed(2)}`, 185, y + 10);
  }

  doc.text(`Purchase Amount (-):`, 155, y + 15);
  doc.text(`${parseFloat(csData?.UrdPurchaseAmt || 0)?.toFixed(2)}`, 185, y + 15);
  doc.text(`Received Amount:`, 155, y + 20);
  doc.text(`${parseFloat(csData?.ReceivedAmount || 0)?.toFixed(2)}`, 185, y + 20);
  doc.text(`Balance Amount:`, 155, y + 25);
  // doc.text(
  //   `${(Number(csData?.TotalAmount||0) - Number(csData?.receivedAmt||0))?.toFixed(2)}`,
  //   185,
  //   y + 25
  // );
  doc.text(`${parseFloat(csData?.BalanceAmt || 0)?.toFixed(2)}`, 185, y + 25);
  doc.text(`Total:`, 155, y + 30);
  doc.text(`${Number(csData?.TotalAmount || 0).toFixed(2)}`, 185, y + 30);

  // Footer
  // doc.setFont("times", "bold");
  // doc.setFontSize(11);
  // doc.text("for TMJ Enterprises", 155, y + 45);
  // doc.setFont("times", "normal");
  // doc.setFontSize(10);
  // doc.text("Authorised Signatory", 160, y + 55);


  let footerY = doc.internal.pageSize.height - 50;
  doc.setFontSize(9);
  // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
  // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
  // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
  // doc.text("Customer Signature", 10, footerY);
  doc.setFont("times", "bold");
  doc.line(5, footerY - 4, 205, footerY - 4);
  doc.text("Terms And Conditions :- ", 10, footerY);
  doc.setFont("times", "normal");
  doc.text(
      `Note: - No Eway Bill is required to be Generated as the Goods covered under this Invoice are Exempted as per Serial No. 4/5 to the Annexure `,
      10,
      footerY + 5
  );
  doc.text(`to Rule 138(14) of the CGST Rules.`, 10, footerY + 9);
  doc.text(
      `Consumer can get the purity of the Hallmarked Jewellery / Artifacts verified from any of the BIS recognized A & H Center`,
      10,
      footerY + 13
  );
  doc.text(
      `List of BIS recognized A & H center along with address and contact details is available on the webiste "www.bis.gov.in"`,
      10,
      footerY + 17
  );
  doc.text(`Hallmark Charges is Rs 45 Per Piece`, 10, footerY + 21);
  doc.text(
      `This Bill includes Labour Charges, Hallmark Charges, Stone/Beads/Mina and other Charges `,
      10,
      footerY + 25
  );
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.text(`Receivers Signature`, 10, footerY + 42);
  doc.setFont("times", "normal");
  doc.setFontSize(7);
  doc.line(5, footerY + 27, 205, footerY + 27);

  // Save PDF
  doc.save(`Invoice-${csData?.invoiceNo}.pdf`);

}



const generatepdf1 = (csData, invoiceItems) =>{
  const doc = new jsPDF({
    orientation: "portrait",
    format: "a4",
  });
  console.log(csData, "csData44444");
  console.log(invoiceItems, "csData44444");
  let Total = 0;
  doc.setDrawColor(0, 0, 0, 0.3);
  doc.setFontSize(12);
  doc.setFont("times");
  // if (csData?.billType === "false") {
  //   doc.text(`${csData?.orderType}`, 90, 47.5);
  // } else {
  //   doc.text(`${`billType`}`, 90, 47.5);
  // }
  doc.setFontSize(10);
  doc.line(5, 44, 205, 44);
  doc.line(5, 290, 205, 290);
  doc.line(5, 44, 5, 290);
  doc.line(205, 44, 205, 290);
  doc.line(5, 48, 205, 48);
  doc.setFont("times");

  const startY = 47.5;
  const headerY = 51;
  const maxPageHeight = doc.internal.pageSize.height - 20;
  let y = headerY;

  const renderAddress = (label, customer, y) => {
    doc.line(5, y + 22, 115, y + 22);
    doc.text(label, 6, y);
    doc.setFont("times", "bold");
    doc.text(`${customer.FirstName || ""} ${customer.LastName || ""}`, 6, y + 4);
    doc.setFont("times", "normal");
    doc.text(`${customer.CurrAddStreet || "Street"}`, 6, y + 8);
    doc.text(`${customer.CurrAddTown || "Town"}`, 6, y + 12);
    doc.text(`Gst No. - ${customer.GstNo || "Gst No."}`, 6, y + 16);
    doc.text(`${customer.CurrAddState || ""} ${customer.CurrAddPincode || "Pan No. "}`, 6, y + 20);
  };

  if (csData) {
    // Invoice Header
    doc.text(`${csData?.orderType || ""}`, 90, startY);

    // Consignee (Ship to)
    renderAddress("Consignee (Ship to)", csData?.Customer, y);

    doc.text(`Invoice No - ${csData?.invoiceNo || ""}`, 120, y);
    // doc.text(`Invoice Date - ${new Date(csData?.createdOn).toLocaleDateString("en-GB")}`, 120, y + 4);
    doc.text(`Invoice Date - ${csData?.InvoiceDate || ""}`, 120, y + 4);


    y += 27; // Adjust y position

    // Buyer (Bill to)
    renderAddress("Buyer (Bill to)", csData?.Customer, y);
    doc.line(115, y - 30, 115, y + 21);
  }

  doc.line(5, y + 21, 205, y + 21);
  y += 26; // Adjust y position

  // Table Header
  doc.setFontSize(9);
  doc.text("S.No", 6, y);
  doc.text("Design", 15, y);
  doc.text("Particular", 30, y);
  doc.text("GrossWt", 70, y);
  doc.text("Pcs", 85, y);
  doc.text("Purity", 95, y);
  doc.text("Gross", 105, y);
  doc.text("Wt", 105, y + 3);
  doc.text("Net", 117, y);
  doc.text("Wt", 117, y + 3);
  doc.text("Other", 130, y);
  doc.text("Charges", 130, y + 3);
  doc.text("Rate", 145, y);
  doc.text("Amount", 160, y);
  doc.text("Hallmark", 175, y);
  doc.text("Charges", 175, y + 3);
  doc.text("Total", 190, y);
  doc.text("Amount", 190, y + 3);
  doc.line(5, y + 5, 205, y + 5);

  y += 10;

  // Invoice Items
  let srNo = 1;
  let totalQuantity = 0;
  let totalGrossWt = 0;
  let totalNetWt = 0;
  let totalStoneAmount = 0;
  let totalNetAmount = 0;
  let totalHallmarkCharges = 0;
  let totalProductAmount = 0;

  doc.setFontSize(8);

  invoiceItems.forEach((item) => {
    let totalAmount = 0;
    if (y + 8 > maxPageHeight) {
      doc.addPage();
      y = 10;
    }
    let OtherCharges = 0;
    let NetCharges = 0;
    let HallmarkCharges = 0;
    const productName = item.ProductName.length > 15 ? `${item.ProductName.substring(0, 15)}...` : item.ProductName;
    doc.text(srNo.toString(), 6, y);
    doc.text(`${item.Purity || ""} ${productName || ""}`, 15, y);
    doc.text(`${item.HSNCode || "-"}`, 70, y);
    doc.text(`${item.Quantity !== 'undefined' ? item.Quantity : "-"}`, 85, y);
    doc.text(`${item.Purity || "-"}`, 95, y);
    doc.text(`${item.GrossWt || "-"}`, 105, y);
    doc.text(`${item.NetWt || "-"}`, 117, y);
    if (item.MRP !== 0 && item.MRP !== "" && item.MRP !== "0") {
      doc.text(`MRP -`, 130, y);
      doc.text(`${parseFloat(item.MRP)?.toFixed(2)}`, 145, y);
      OtherCharges = Number(item.MRP);
    } else {
      doc.text(item.MetalRate ? item.MetalRate : "-", 130, y);
      doc.text(
          parseFloat(
              (parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt)
          )?.toFixed(2),
          145,
          y
      );
      OtherCharges = Number((parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt));
    }

    doc.text(
        parseFloat(
            parseFloat(parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt) +
            parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
            parseFloat(item.StoneAmount ? item.StoneAmount : 0)
        )?.toFixed(2),
        160,
        y
    );
    NetCharges += parseFloat(
        parseFloat(parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0)
    )
    doc.text(item.HallmarkAmount ? `${item.HallmarkAmount}` : "-", 175, y);
    HallmarkCharges += parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0)
    totalAmount = (item.MRP !== 0 && item.MRP !== "" && item.MRP !== "0") ? (parseFloat(item.MRP ? item.MRP : 0) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
    ) : parseFloat(
        parseFloat(parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
    )
    Total += totalAmount
    // doc.text(`${item.StoneAmount || "-"}`, 130, y);
    // doc.text(`${item.MetalRate || "-"}`, 145, y);
    // doc.text(`${item.Amount || "-"}`, 160, y);
    // doc.text(`${item.HallmarkAmount || "-"}`, 175, y);
    doc.text(`${totalAmount || "-"}`, 190, y);

    totalQuantity += parseFloat(item.Quantity !== 'undefined' ? item.Quantity : 0) || 0;
    totalGrossWt += parseFloat(item.GrossWt) || 0;
    totalNetWt += parseFloat(item.NetWt) || 0;
    // totalStoneAmount += parseFloat(item.StoneAmount) || 0;
    totalStoneAmount += OtherCharges;
    // totalNetAmount += parseFloat(item.NetAmount) || 0;
    totalNetAmount += NetCharges;
    // totalHallmarkCharges += parseFloat(item.HallmarkAmount) || 0;
    totalHallmarkCharges += HallmarkCharges;
    totalProductAmount += parseFloat(totalAmount) || 0;

    srNo++;
    y += 8;
  });

  doc.line(5, y - 3, 205, y - 3);

  doc.setFont("times", "bold");
  doc.text("Total", 10, y);
  doc.text(totalQuantity.toFixed(0), 85, y);
  doc.text(totalGrossWt.toFixed(3), 105, y);
  doc.text(totalNetWt.toFixed(3), 117, y);
  doc.text(totalStoneAmount?.toFixed(2), 130, y);
  doc.text(totalNetAmount?.toFixed(2), 160, y);
  doc.text(totalHallmarkCharges?.toFixed(2), 175, y);
  doc.text(totalProductAmount?.toFixed(2), 190, y);

  y += 10;

  // Payment Modes
  if (csData?.paymentMode) {
    const paymentModes = csData?.paymentMode.split(",");
    doc.setFontSize(9);
    doc.text("Payment Mode", 10, y);
    let yPaymentModes = y + 5;
    paymentModes.forEach((paymentMode) => {
      if (yPaymentModes > maxPageHeight - 10) {
        doc.addPage();
        yPaymentModes = 5;
      }
      const [mode, amount] = paymentMode.split(":");
      doc.text(mode, 10, yPaymentModes);
      doc.text(amount, 40, yPaymentModes);
      yPaymentModes += 5;
    });
    y = yPaymentModes + 10;
  }

  // Summary
  const totalSaleAmount = invoiceItems.reduce((total, product) => {
    return total + parseFloat((parseFloat(product.Amount) * 100) / 103 || 0);
  }, 0);

  const payableGst = totalSaleAmount * 0.03;

  if (csData?.Customer.currAddState === "Maharashtra") {
    doc.text(`Sales Amount:`, 155, y);
    doc.text(`${totalSaleAmount?.toFixed(2)}`, 185, y);
    doc.text(`R.O./Discount:`, 155, y + 5);
    doc.text(`${csData?.offer || 0}`, 185, y + 5);
    doc.text(`CGST 1.5%:`, 155, y + 10);
    // doc.text(`${(payableGst / 2)?.toFixed(2)}`, 185, y + 10);
    doc.text(`${((Number(csData?.GST) / 2 || 0))?.toFixed(2)}`, 185, y + 15);
    doc.text(`SGST 1.5%:`, 155, y + 15);
    // doc.text(`${(payableGst / 2)?.toFixed(2)}`, 185, y + 15);
    doc.text(`${((Number(csData?.GST) / 2 || 0))?.toFixed(2)}`, 185, y + 15);
  } else {
    doc.text(`Sales Amount:`, 155, y);
    doc.text(`${totalSaleAmount?.toFixed(2)}`, 185, y);
    doc.text(`R.O./Discount:`, 155, y + 5);
    doc.text(`${csData?.offer || 0}`, 185, y + 5);
    doc.text(`IGST 3%:`, 155, y + 10);
    // doc.text(`${payableGst?.toFixed(2)}`, 185, y + 10);
    doc.text(`${(Number(csData?.GST))?.toFixed(2)}`, 185, y + 10);
  }

  doc.text(`Purchase Amount (-):`, 155, y + 15);
  doc.text(`${parseFloat(csData?.UrdPurchaseAmt || 0)?.toFixed(2)}`, 185, y + 15);
  doc.text(`Received Amount:`, 155, y + 20);
  doc.text(`${parseFloat(csData?.ReceivedAmount || 0)?.toFixed(2)}`, 185, y + 20);
  doc.text(`Balance Amount:`, 155, y + 25);
  // doc.text(
  //   `${(Number(csData?.TotalAmount||0) - Number(csData?.receivedAmt||0))?.toFixed(2)}`,
  //   185,
  //   y + 25
  // );
  doc.text(`${parseFloat(csData?.BalanceAmt || 0)?.toFixed(2)}`, 185, y + 25);
  doc.text(`Total:`, 155, y + 30);
  doc.text(`${Number(csData?.TotalAmount || 0).toFixed(2)}`, 185, y + 30);

  // Footer
  // doc.setFont("times", "bold");
  // doc.setFontSize(11);
  // doc.text("for TMJ Enterprises", 155, y + 45);
  // doc.setFont("times", "normal");
  // doc.setFontSize(10);
  // doc.text("Authorised Signatory", 160, y + 55);


  let footerY = doc.internal.pageSize.height - 50;
  doc.setFontSize(9);
  // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
  // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
  // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
  // doc.text("Customer Signature", 10, footerY);
  doc.setFont("times", "bold");
  doc.line(5, footerY - 4, 205, footerY - 4);
  doc.text("Terms And Conditions :- ", 10, footerY);
  doc.setFont("times", "normal");
  doc.text(
      `Note: - No Eway Bill is required to be Generated as the Goods covered under this Invoice are Exempted as per Serial No. 4/5 to the Annexure `,
      10,
      footerY + 5
  );
  doc.text(`to Rule 138(14) of the CGST Rules.`, 10, footerY + 9);
  doc.text(
      `Consumer can get the purity of the Hallmarked Jewellery / Artifacts verified from any of the BIS recognized A & H Center`,
      10,
      footerY + 13
  );
  doc.text(
      `List of BIS recognized A & H center along with address and contact details is available on the webiste "www.bis.gov.in"`,
      10,
      footerY + 17
  );
  doc.text(`Hallmark Charges is Rs 45 Per Piece`, 10, footerY + 21);
  doc.text(
      `This Bill includes Labour Charges, Hallmark Charges, Stone/Beads/Mina and other Charges `,
      10,
      footerY + 25
  );
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.text(`Receivers Signature`, 10, footerY + 42);
  doc.setFont("times", "normal");
  doc.setFontSize(7);
  doc.line(5, footerY + 27, 205, footerY + 27);

  // Save PDF
  doc.save(`Invoice-${csData?.invoiceNo}.pdf`);

}



const generatepdf = (csData, invoiceItems) =>{
  const doc = new jsPDF({
    orientation: "portrait",
    format: "a4",
  });
  console.log(csData, "csData44444");
  console.log(invoiceItems, "csData44444");
  let Total = 0;
  doc.setDrawColor(0, 0, 0, 0.3);
  doc.setFontSize(12);
  doc.setFont("times");
  // if (csData?.billType === "false") {
  //   doc.text(`${csData?.orderType}`, 90, 47.5);
  // } else {
  //   doc.text(`${`billType`}`, 90, 47.5);
  // }
  doc.setFontSize(10);
  doc.line(5, 44, 205, 44);
  doc.line(5, 290, 205, 290);
  doc.line(5, 44, 5, 290);
  doc.line(205, 44, 205, 290);
  doc.line(5, 48, 205, 48);
  doc.setFont("times");

  const startY = 47.5;
  const headerY = 51;
  const maxPageHeight = doc.internal.pageSize.height - 20;
  let y = headerY;

  const renderAddress = (label, customer, y) => {
    doc.line(5, y + 22, 115, y + 22);
    doc.text(label, 6, y);
    doc.setFont("times", "bold");
    doc.text(`${customer.FirstName || ""} ${customer.LastName || ""}`, 6, y + 4);
    doc.setFont("times", "normal");
    doc.text(`${customer.CurrAddStreet || "Street"}`, 6, y + 8);
    doc.text(`${customer.CurrAddTown || "Town"}`, 6, y + 12);
    doc.text(`Gst No. - ${customer.GstNo || "Gst No."}`, 6, y + 16);
    doc.text(`${customer.CurrAddState || ""} ${customer.CurrAddPincode || "Pan No. "}`, 6, y + 20);
  };

  if (csData) {
    // Invoice Header
    doc.text(`${csData?.orderType || ""}`, 90, startY);

    // Consignee (Ship to)
    renderAddress("Consignee (Ship to)", csData?.Customer, y);

    doc.text(`Invoice No - ${csData?.invoiceNo || ""}`, 120, y);
    // doc.text(`Invoice Date - ${new Date(csData?.createdOn).toLocaleDateString("en-GB")}`, 120, y + 4);
    doc.text(`Invoice Date - ${csData?.InvoiceDate || ""}`, 120, y + 4);


    y += 27; // Adjust y position

    // Buyer (Bill to)
    renderAddress("Buyer (Bill to)", csData?.Customer, y);
    doc.line(115, y - 30, 115, y + 21);
  }

  doc.line(5, y + 21, 205, y + 21);
  y += 26; // Adjust y position

  // Table Header
  doc.setFontSize(9);
  doc.text("S.No", 6, y);
  doc.text("Description Of Goods", 15, y);
  doc.text("HSN", 70, y);
  doc.text("Pcs", 85, y);
  doc.text("Purity", 95, y);
  doc.text("Gross", 105, y);
  doc.text("Wt", 105, y + 3);
  doc.text("Net", 117, y);
  doc.text("Wt", 117, y + 3);
  doc.text("Other", 130, y);
  doc.text("Charges", 130, y + 3);
  doc.text("Rate", 145, y);
  doc.text("Amount", 160, y);
  doc.text("Hallmark", 175, y);
  doc.text("Charges", 175, y + 3);
  doc.text("Total", 190, y);
  doc.text("Amount", 190, y + 3);
  doc.line(5, y + 5, 205, y + 5);

  y += 10;

  // Invoice Items
  let srNo = 1;
  let totalQuantity = 0;
  let totalGrossWt = 0;
  let totalNetWt = 0;
  let totalStoneAmount = 0;
  let totalNetAmount = 0;
  let totalHallmarkCharges = 0;
  let totalProductAmount = 0;

  doc.setFontSize(8);

  invoiceItems.forEach((item) => {
    let totalAmount = 0;
    if (y + 8 > maxPageHeight) {
      doc.addPage();
      y = 10;
    }
    let OtherCharges = 0;
    let NetCharges = 0;
    let HallmarkCharges = 0;
    const productName = item.ProductName.length > 15 ? `${item.ProductName.substring(0, 15)}...` : item.ProductName;
    doc.text(srNo.toString(), 6, y);
    doc.text(`${item.Purity || ""} ${productName || ""}`, 15, y);
    doc.text(`${item.HSNCode || "-"}`, 70, y);
    doc.text(`${item.Quantity !== 'undefined' ? item.Quantity : "-"}`, 85, y);
    doc.text(`${item.Purity || "-"}`, 95, y);
    doc.text(`${item.GrossWt || "-"}`, 105, y);
    doc.text(`${item.NetWt || "-"}`, 117, y);
    if (item.MRP !== 0 && item.MRP !== "" && item.MRP !== "0") {
      doc.text(`MRP -`, 130, y);
      doc.text(`${parseFloat(item.MRP)?.toFixed(2)}`, 145, y);
      OtherCharges = Number(item.MRP);
    } else {
      doc.text(item.MetalRate ? item.MetalRate : "-", 130, y);
      doc.text(
          parseFloat(
              (parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt)
          )?.toFixed(2),
          145,
          y
      );
      OtherCharges = Number((parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt));
    }

    doc.text(
        parseFloat(
            parseFloat(parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt) +
            parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
            parseFloat(item.StoneAmount ? item.StoneAmount : 0)
        )?.toFixed(2),
        160,
        y
    );
    NetCharges += parseFloat(
        parseFloat(parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0)
    )
    doc.text(item.HallmarkAmount ? `${item.HallmarkAmount}` : "-", 175, y);
    HallmarkCharges += parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0)
    totalAmount = (item.MRP !== 0 && item.MRP !== "" && item.MRP !== "0") ? (parseFloat(item.MRP ? item.MRP : 0) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
    ) : parseFloat(
        parseFloat(parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
    )
    Total += totalAmount
    // doc.text(`${item.StoneAmount || "-"}`, 130, y);
    // doc.text(`${item.MetalRate || "-"}`, 145, y);
    // doc.text(`${item.Amount || "-"}`, 160, y);
    // doc.text(`${item.HallmarkAmount || "-"}`, 175, y);
    doc.text(`${totalAmount || "-"}`, 190, y);

    totalQuantity += parseFloat(item.Quantity !== 'undefined' ? item.Quantity : 0) || 0;
    totalGrossWt += parseFloat(item.GrossWt) || 0;
    totalNetWt += parseFloat(item.NetWt) || 0;
    // totalStoneAmount += parseFloat(item.StoneAmount) || 0;
    totalStoneAmount += OtherCharges;
    // totalNetAmount += parseFloat(item.NetAmount) || 0;
    totalNetAmount += NetCharges;
    // totalHallmarkCharges += parseFloat(item.HallmarkAmount) || 0;
    totalHallmarkCharges += HallmarkCharges;
    totalProductAmount += parseFloat(totalAmount) || 0;

    srNo++;
    y += 8;
  });

  doc.line(5, y - 3, 205, y - 3);

  doc.setFont("times", "bold");
  doc.text("Total", 10, y);
  doc.text(totalQuantity.toFixed(0), 85, y);
  doc.text(totalGrossWt.toFixed(3), 105, y);
  doc.text(totalNetWt.toFixed(3), 117, y);
  doc.text(totalStoneAmount?.toFixed(2), 130, y);
  doc.text(totalNetAmount?.toFixed(2), 160, y);
  doc.text(totalHallmarkCharges?.toFixed(2), 175, y);
  doc.text(totalProductAmount?.toFixed(2), 190, y);

  y += 10;

  // Payment Modes
  if (csData?.paymentMode) {
    const paymentModes = csData?.paymentMode.split(",");
    doc.setFontSize(9);
    doc.text("Payment Mode", 10, y);
    let yPaymentModes = y + 5;
    paymentModes.forEach((paymentMode) => {
      if (yPaymentModes > maxPageHeight - 10) {
        doc.addPage();
        yPaymentModes = 5;
      }
      const [mode, amount] = paymentMode.split(":");
      doc.text(mode, 10, yPaymentModes);
      doc.text(amount, 40, yPaymentModes);
      yPaymentModes += 5;
    });
    y = yPaymentModes + 10;
  }

  // Summary
  const totalSaleAmount = invoiceItems.reduce((total, product) => {
    return total + parseFloat((parseFloat(product.Amount) * 100) / 103 || 0);
  }, 0);

  const payableGst = totalSaleAmount * 0.03;

  if (csData?.Customer.currAddState === "Maharashtra") {
    doc.text(`Sales Amount:`, 155, y);
    doc.text(`${totalSaleAmount?.toFixed(2)}`, 185, y);
    doc.text(`R.O./Discount:`, 155, y + 5);
    doc.text(`${csData?.offer || 0}`, 185, y + 5);
    doc.text(`CGST 1.5%:`, 155, y + 10);
    // doc.text(`${(payableGst / 2)?.toFixed(2)}`, 185, y + 10);
    doc.text(`${((Number(csData?.GST) / 2 || 0))?.toFixed(2)}`, 185, y + 15);
    doc.text(`SGST 1.5%:`, 155, y + 15);
    // doc.text(`${(payableGst / 2)?.toFixed(2)}`, 185, y + 15);
    doc.text(`${((Number(csData?.GST) / 2 || 0))?.toFixed(2)}`, 185, y + 15);
  } else {
    doc.text(`Sales Amount:`, 155, y);
    doc.text(`${totalSaleAmount?.toFixed(2)}`, 185, y);
    doc.text(`R.O./Discount:`, 155, y + 5);
    doc.text(`${csData?.offer || 0}`, 185, y + 5);
    doc.text(`IGST 3%:`, 155, y + 10);
    // doc.text(`${payableGst?.toFixed(2)}`, 185, y + 10);
    doc.text(`${(Number(csData?.GST))?.toFixed(2)}`, 185, y + 10);
  }

  doc.text(`Purchase Amount (-):`, 155, y + 15);
  doc.text(`${parseFloat(csData?.UrdPurchaseAmt || 0)?.toFixed(2)}`, 185, y + 15);
  doc.text(`Received Amount:`, 155, y + 20);
  doc.text(`${parseFloat(csData?.ReceivedAmount || 0)?.toFixed(2)}`, 185, y + 20);
  doc.text(`Balance Amount:`, 155, y + 25);
  // doc.text(
  //   `${(Number(csData?.TotalAmount||0) - Number(csData?.receivedAmt||0))?.toFixed(2)}`,
  //   185,
  //   y + 25
  // );
  doc.text(`${parseFloat(csData?.BalanceAmt || 0)?.toFixed(2)}`, 185, y + 25);
  doc.text(`Total:`, 155, y + 30);
  doc.text(`${Number(csData?.TotalAmount || 0).toFixed(2)}`, 185, y + 30);

  // Footer
  // doc.setFont("times", "bold");
  // doc.setFontSize(11);
  // doc.text("for TMJ Enterprises", 155, y + 45);
  // doc.setFont("times", "normal");
  // doc.setFontSize(10);
  // doc.text("Authorised Signatory", 160, y + 55);


  let footerY = doc.internal.pageSize.height - 50;
  doc.setFontSize(9);
  // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
  // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
  // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
  // doc.text("Customer Signature", 10, footerY);
  doc.setFont("times", "bold");
  doc.line(5, footerY - 4, 205, footerY - 4);
  doc.text("Terms And Conditions :- ", 10, footerY);
  doc.setFont("times", "normal");
  doc.text(
      `Note: - No Eway Bill is required to be Generated as the Goods covered under this Invoice are Exempted as per Serial No. 4/5 to the Annexure `,
      10,
      footerY + 5
  );
  doc.text(`to Rule 138(14) of the CGST Rules.`, 10, footerY + 9);
  doc.text(
      `Consumer can get the purity of the Hallmarked Jewellery / Artifacts verified from any of the BIS recognized A & H Center`,
      10,
      footerY + 13
  );
  doc.text(
      `List of BIS recognized A & H center along with address and contact details is available on the webiste "www.bis.gov.in"`,
      10,
      footerY + 17
  );
  doc.text(`Hallmark Charges is Rs 45 Per Piece`, 10, footerY + 21);
  doc.text(
      `This Bill includes Labour Charges, Hallmark Charges, Stone/Beads/Mina and other Charges `,
      10,
      footerY + 25
  );
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.text(`Receivers Signature`, 10, footerY + 42);
  doc.setFont("times", "normal");
  doc.setFontSize(7);
  doc.line(5, footerY + 27, 205, footerY + 27);

  // Save PDF
  doc.save(`Invoice-${csData?.invoiceNo}.pdf`);

}


// export default generateBillPDF;


export const generateBillInvocePDF = (csData, invoiceItems) => {
  const doc = new jsPDF({
    orientation: "portrait",
    format: "a4",
  });
  console.log(csData, "sjdshjdhsjhdjs")
  console.log(invoiceItems, "sjdshjdhsjhdjs")
  let Total = 0;
  doc.setDrawColor(0, 0, 0, 0.3);
  doc.setFontSize(12);
  doc.setFont("times");

  doc.setFontSize(18);
  doc.setTextColor(0, 0, 139);
  doc.setFont("times", "bold");
  doc.text("TAX INVOICE", 105, 20, {align: "center"});
  // if (csData?.billType === "false") {
  //   doc.text(`${csData?.orderType}`, 90, 47.5);
  // } else {
  //   doc.text(`${`billType`}`, 90, 47.5);
  // }
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.line(5, 44, 205, 44);
  doc.line(5, 290, 205, 290);
  doc.line(5, 44, 5, 290);
  doc.line(14, 88, 14, 193);
  doc.line(105, 88, 105, 193);
  doc.line(140, 88, 140, 193);
  doc.line(175, 88, 175, 193);
  doc.line(205, 44, 205, 290);
  // doc.line(5, 48, 205, 48);
  doc.setFont("times");

  const startY = 47.5;
  const headerY = 51;
  const maxPageHeight = doc.internal.pageSize.height - 20;
  let y = headerY;

  const renderAddress = (label, customer, y) => {
    // doc.line(5, y + 22, 115, y + 22);
    doc.text(label, 6, y);
    doc.setFont("times", "bold");
    doc.text(`${customer.FirstName || ""} ${customer.LastName || ""}`, 6, y + 4);
    doc.setFont("times", "normal");
    doc.text(`${customer.CurrAddStreet || "add"}`, 6, y + 8);
    doc.text(`${customer.CurrAddState} & ${customer.CurrAddPincode}`, 6, y + 22);
    doc.text(`GST No. - ${customer.GstNo || ""}`, 6, y + 26);
    doc.text(`Pan No. - ${customer.PanNo || ""}`, 6, y + 30);
    doc.text(`Mob No. - ${customer.Mobile || ""}`, 6, y + 34);
  };

  if (csData) {
    // Invoice Header
    doc.text(`${csData?.orderType || ""}`, 90, startY);

    // Consignee (Ship to)
    renderAddress("To ", csData?.Customer, y);
    doc.setTextColor(0, 0, 139);
    // renderAddress("Name ", csData?.Customer, y + 8);
    doc.setTextColor(0, 0, 0);
    // renderAddress("add ", csData?.Customer, y + 12);


    doc.text(`Invoice No - ${csData?.InvoiceNo || ""}`, 109, y);
    // doc.text(`Invoice Date - ${new Date(csData?.createdOn).toLocaleDateString("en-GB")}`, 120, y + 4);
    doc.text(`Invoice Date - ${csData?.InvoiceDate || ""}`, 109, y + 6);
    doc.text(`Terms - C.O.D`, 109, y + 10);
    doc.text(`Our GST No. - 27BCPPV7154N1ZI`, 109, y + 30);
    doc.text(`Pan No. - BCPPV7154N`, 109, y + 34);


    y += 16; // Adjust y position
    // Buyer (Bill to)
    // renderAddress("Buyer (Bill to)", csData?.Customer, y);
    doc.line(105, y - 23, 105, y + 21);
  }

  doc.line(5, y + 21, 205, y + 21);
  y += 26; // Adjust y position

  // Table Header
  doc.setFontSize(9);
  doc.text("Sr", 6, y);
  doc.text("No.", 6, y + 4);
  doc.text("Description of Goods", 42, y);
  doc.text("HSN CODE - 71131930", 42, y + 4);
  doc.text("HSN / SAC", 114, y);
  // doc.text("Pcs", 85, y);
  // doc.text("Purity", 95, y);
  doc.text("Gross Wgt.", 150, y);
  doc.text("In Grms.", 152, y + 4);
  // doc.text("Wt", 105, y + 3);
  // doc.text("Net", 117, y);
  // doc.text("Wt", 117, y + 3);
  // doc.text("Other", 130, y);
  // doc.text("Charges", 130, y + 3);
  // doc.text("Rate", 145, y);
  // doc.text("Amount", 160, y);
  // doc.text("Hallmark", 175, y);
  // doc.text("Charges", 175, y + 3);
  // doc.text("Total", 190, y);
  doc.text("Sale Value", 182, y);
  doc.text("In Rs.", 186, y + 4);
  doc.line(5, y + 5, 205, y + 5);

  y += 10;

  // Invoice Items
  let srNo = 1;
  let totalQuantity = 0;
  let totalGrossWt = 0;
  let totalNetWt = 0;
  let totalStoneAmount = 0;
  let totalNetAmount = 0;
  let totalHallmarkCharges = 0;
  let totalProductAmount = 0;

  doc.setFontSize(8);

  invoiceItems.forEach((item) => {
    let totalAmount = 0;
    if (y + 8 > maxPageHeight) {
      doc.addPage();
      y = 10;
    }
    let OtherCharges = 0;
    let NetCharges = 0;
    let HallmarkCharges = 0;
    const productName = item.ProductName.length > 15 ? `${item.ProductName.substring(0, 15)}...` : item.ProductName;
    doc.text(srNo.toString(), 6, y);
    doc.text(`${productName || ""}`, 15, y);
    doc.text(`${item.HSNCode || "-"}`, 114, y);
    // doc.text(`${item.Quantity!=='undefined'?item.Quantity: "-"}`, 85, y);
    // doc.text(`${item.Purity || "-"}`, 95, y);
    doc.text(`${item.GrossWt || "-"}`, 150, y);
    // doc.text(`${item.NetWt || "-"}`, 117, y);
    if (item.MRP !== 0 && item.MRP !== "" && item.MRP !== "0") {
      // doc.text(`MRP -`, 130, y);
      // doc.text(`${parseFloat(item.MRP)?.toFixed(2)}`, 145, y);
      OtherCharges = Number(item.MRP);
    } else {
      // doc.text(item.MetalRate ? item.MetalRate : "-", 130, y);
      // doc.text(
      //     parseFloat(
      //         (parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt)
      //     )?.toFixed(2),
      //     145,
      //     y
      // );
      OtherCharges = Number((parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt));
    }

    // doc.text(
    //     parseFloat(
    //         parseFloat(parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt) +
    //         parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
    //         parseFloat(item.StoneAmount ? item.StoneAmount : 0)
    //     )?.toFixed(2),
    //     160,
    //     y
    // );
    NetCharges += parseFloat(
        parseFloat(parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0)
    )
    // doc.text(item.HallmarkAmount ? `${item.HallmarkAmount}` : "-", 175, y);
    HallmarkCharges += parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0)
    totalAmount = (item.MRP !== 0 && item.MRP !== "" && item.MRP !== "0") ? (parseFloat(item.MRP ? item.MRP : 0) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
    ) : parseFloat(
        parseFloat(parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
    )
    Total += totalAmount
    // doc.text(`${item.StoneAmount || "-"}`, 130, y);
    // doc.text(`${item.MetalRate || "-"}`, 145, y);
    // doc.text(`${item.Amount || "-"}`, 160, y);
    // doc.text(`${item.HallmarkAmount || "-"}`, 175, y);
    doc.text(`${totalAmount || "-"}`, 190, y);

    totalQuantity += parseFloat(item.Quantity !== 'undefined' ? item.Quantity : 0) || 0;
    totalGrossWt += parseFloat(item.GrossWt) || 0;
    totalNetWt += parseFloat(item.NetWt) || 0;
    // totalStoneAmount += parseFloat(item.StoneAmount) || 0;
    totalStoneAmount += OtherCharges;
    // totalNetAmount += parseFloat(item.NetAmount) || 0;
    totalNetAmount += NetCharges;
    // totalHallmarkCharges += parseFloat(item.HallmarkAmount) || 0;
    totalHallmarkCharges += HallmarkCharges;
    totalProductAmount += parseFloat(totalAmount) || 0;

    srNo++;
    y += 8;
  });

  doc.text("CGST", 15, y + 52)
  doc.text("SGST", 15, y + 56)
  doc.setFont("times", "bold");
  doc.text("IGST", 90, y + 60)
  doc.text("3.0%", 130, y + 60)
  doc.text("DISCOUNT", 90, y + 64)
  doc.text("R / d", 90, y + 68)
  // doc.line(5, y - 3, 205, y - 3);
  doc.setFont("times", "normal");


  // doc.setFont("times", "bold");
  // doc.text("Total", 10, y);
  // doc.text(totalQuantity.toFixed(0), 85, y);
  // doc.text(totalGrossWt.toFixed(3), 105, y);
  // doc.text(totalNetWt.toFixed(3), 117, y);
  // doc.text(totalStoneAmount?.toFixed(2), 130, y);
  // doc.text(totalNetAmount?.toFixed(2), 160, y);
  // doc.text(totalHallmarkCharges?.toFixed(2), 175, y);
  // doc.text(totalProductAmount?.toFixed(2), 190, y);

  y += 10;

  // Payment Modes
  if (csData?.paymentMode) {
    const paymentModes = csData?.paymentMode.split(",");
    doc.setFontSize(9);
    doc.text("Payment Mode", 10, y);
    let yPaymentModes = y + 5;
    paymentModes.forEach((paymentMode) => {
      if (yPaymentModes > maxPageHeight - 10) {
        doc.addPage();
        yPaymentModes = 5;
      }
      const [mode, amount] = paymentMode.split(":");
      doc.text(mode, 10, yPaymentModes);
      doc.text(amount, 40, yPaymentModes);
      yPaymentModes += 5;
    });
    y = yPaymentModes + 10;
  }

  // Summary
  const totalSaleAmount = invoiceItems.reduce((total, product) => {
    return total + parseFloat((parseFloat(product.TotalAmount) * 100) / 103 || 0);
  }, 0);

  const payableGst = totalSaleAmount * 0.03;

  // if (csData?.Customer.currAddState === "Maharashtra") {
  //   doc.text(`Sales Amount:`, 155, y);
  //   doc.text(`${totalSaleAmount?.toFixed(2)}`, 185, y);
  //   doc.text(`R.O./Discount:`, 155, y + 5);
  //   doc.text(`${csData?.offer || 0}`, 185, y + 5);
  //   doc.text(`CGST 1.5%:`, 155, y + 10);
  //   // doc.text(`${(payableGst / 2)?.toFixed(2)}`, 185, y + 10);
  //   doc.text(`${((Number(csData?.GST)/ 2||0))?.toFixed(2)}`, 185, y + 15);
  //   doc.text(`SGST 1.5%:`, 155, y + 15);
  //   // doc.text(`${(payableGst / 2)?.toFixed(2)}`, 185, y + 15);
  //   doc.text(`${((Number(csData?.GST)/ 2||0))?.toFixed(2)}`, 185, y + 15);
  // } else {
  //   doc.text(`Sales Amount:`, 155, y);
  //   doc.text(`${totalSaleAmount?.toFixed(2)}`, 185, y);
  //   doc.text(`R.O./Discount:`, 155, y + 5);
  //   doc.text(`${csData?.offer || 0}`, 185, y + 5);
  //   doc.text(`IGST 3%:`, 155, y + 10);
  //   // doc.text(`${payableGst?.toFixed(2)}`, 185, y + 10);
  //   doc.text(`${(Number(csData?.GST))?.toFixed(2)}`, 185, y + 10);
  // }

  // doc.text(`Purchase Amount (-):`, 155, y + 15);
  // doc.text(`${parseFloat(csData?.UrdPurchaseAmt || 0)?.toFixed(2)}`, 185, y + 15);
  // doc.text(`Received Amount:`, 155, y + 20);
  // doc.text(`${parseFloat(csData?.ReceivedAmount || 0)?.toFixed(2)}`, 185, y + 20);
  // doc.text(`Balance Amount:`, 155, y + 25);
  // // doc.text(
  // //   `${(Number(csData?.TotalAmount||0) - Number(csData?.receivedAmt||0))?.toFixed(2)}`,
  // //   185,
  // //   y + 25
  // // );
  // doc.text(`${parseFloat(csData?.BalanceAmt || 0)?.toFixed(2)}`, 185, y + 25);
  // doc.text(`Total:`, 155, y + 30);
  // doc.text(`${Number(csData?.TotalAmount||0).toFixed(2)}`, 185, y + 30);

  // Footer
  // doc.setFont("times", "bold");
  // doc.setFontSize(11);
  // doc.text("for TMJ Enterprises", 155, y + 45);
  // doc.setFont("times", "normal");
  // doc.setFontSize(10);
  // doc.text("Authorised Signatory", 160, y + 55);


  let footerY = doc.internal.pageSize.height - 50;
  doc.setFontSize(9);
  // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
  // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
  // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
  // doc.text("Customer Signature", 10, footerY);
  doc.setFont("times", "bold");
  doc.line(5, footerY - 60, 205, footerY - 60);
  doc.text("TOTAL", 90, footerY - 56)
  doc.text(csData.TotalAmount, 182, footerY - 56);

  doc.line(5, footerY - 54, 205, footerY - 54);
  doc.text("Amount Chargeable (in words): ", 7, footerY - 50)
  doc.text("Rs.", 7, footerY - 46)
  doc.line(5, footerY - 44, 205, footerY - 44);
  doc.text("Company's Bank details", 140, footerY - 40)
  doc.text("Bank Name : Indusind bank", 140, footerY - 36)
  doc.text("Branch : BKC Branch", 140, footerY - 32)
  doc.text("A/c No: 255024002400", 140, footerY - 28)
  doc.text("IFSC CODE : INDB0000342", 140, footerY - 24)
  doc.text("Corporate Office : DIAGLITER 1003, 10th Floor, D Square, Dadabhai Road, Vile Parle (West), Mumbai - 400056", 10, footerY);
  doc.text("Mo. No. 9152011005", 10, footerY + 4);
  doc.text("FOR DIAGLITER", 140, footerY + 18);
  doc.setFont("times", "normal");
  // doc.text(
  //     `Note: - No Eway Bill is required to be Generated as the Goods covered under this Invoice are Exempted as per Serial No. 4/5 to the Annexure `,
  //     10,
  //     footerY + 5
  // );
  // doc.text(`to Rule 138(14) of the CGST Rules.`, 10, footerY + 9);
  // doc.text(
  //     `Consumer can get the purity of the Hallmarked Jewellery / Artifacts verified from any of the BIS recognized A & H Center`,
  //     10,
  //     footerY + 13
  // );
  // doc.text(
  //     `List of BIS recognized A & H center along with address and contact details is available on the webiste "www.bis.gov.in"`,
  //     10,
  //     footerY + 17
  // );
  // doc.text(`Hallmark Charges is Rs 45 Per Piece`, 10, footerY + 21);
  // doc.text(
  //     `This Bill includes Labour Charges, Hallmark Charges, Stone/Beads/Mina and other Charges `,
  //     10,
  //     footerY + 25
  // );
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.text(`(SIGNATURE OF THE RECEIVER)`, 10, footerY + 40);
  doc.text(`PROPRIETOR / AUTHORISED SIGN`, 140, footerY + 40);
  doc.setFont("times", "normal");
  doc.setFontSize(7);
  // doc.line(5, footerY + 27, 205, footerY + 27);

  // Save PDF
  doc.save(`Invoice-${csData?.InvoiceNo}.pdf`);
};






// import React from "react";
// import { jsPDF } from "jspdf";
// import { numberToIndianWords } from "./numberToIndianWords";

// // SK Khandre Bill Below
// // export const generateBillPDF = (x, csData) => {
// //   const doc = new jsPDF({
// //     orientation: "portrait",
// //     // format: "a5",
// //     format: [180, 250],
// //   });

// //   doc.setDrawColor(0, 0, 0);
// //   doc.setFontSize(13);
// //   doc.setFont("times");
// //   if (csData.billType === "false") {
// //     doc.text("Estimate", 77, 42);
// //   } else {
// //     doc.text("Tax Invoice", 77, 42);
// //   }
// //   doc.setFontSize(10);
// //   doc.text("GST No : 27BBKPK5411K1ZI ", 5, 42);
// //   doc.line(5, 44, 175, 44);
// //   doc.setFont("times");
// //   // doc.text("GST-No-27BBKPK5411K1ZI", 100, 35);
// //   let y = 50; // Adjust starting Y position
// //   const columnWidth = 15; // Adjust column widths for A5
// //   const contentWidth = 120; // Adjust content width for A5
// //   let srNo = 1;
// //   let pGSrNo = 1;
// //   let pSSrNo = 1;
// //   let totalOldGoldAmount = 0;
// //   let totalOldNotGoldAmount = 0;
// //   const purchaseItems = x.filter((product) => product.billtype === "purchase");
// //   console.log(x, "x");
// //   if (csData) {
// //     doc.text(`Mobile - ${csData.Customer.mobile}`, 5, y);
// //     doc.text(
// //       `Name - ${csData.Customer.FirstName} ${csData.Customer.LastName}`,
// //       5,
// //       y + 5
// //     );
// //     doc.text(
// //       `Address - ${csData.Customer.currAddStreet} ${csData.Customer.currAddTown} ${csData.Customer.currAddState} ${csData.Customer.currAddPinCode}`,
// //       5,
// //       y + 10
// //     );
// //     doc.text(`Invoice No - ${csData.invoiceNo}`, 125, y);
// //     doc.text(
// //       `Date - ${new Date(csData.createdOn).toLocaleDateString("en-GB")}`,
// //       125,
// //       y + 5
// //     );
// //     doc.text(
// //       `Email - ${
// //         csData.Customer.email.includes("@example.com")
// //           ? ""
// //           : csData.Customer.email
// //       }`,
// //       125,
// //       y + 10
// //     );
// //     doc.text(`Pan Card - ${csData.Customer.panNo}`, 5, y + 15);
// //     doc.text(`Gst No - ${csData.Customer.gstNo}`, 125, y + 15);
// //   }

// //   doc.line(5, y + 20, 175, y + 20);
// //   y = 75;
// //   doc.setFontSize(9);
// //   doc.text("No", 6, y);
// //   doc.text("Items", 12, y);
// //   doc.text("HSN", 65, y);
// //   doc.text("Pc/Pr", 75, y);
// //   doc.text("Purity", 85, y);
// //   doc.text("Grs.Wt", 95, y);
// //   doc.text("Net.Wt", 107, y);
// //   doc.text("Rate", 119, y);
// //   doc.text("Orn Amt", 130, y);
// //   doc.text("Labour", 145, y);
// //   doc.text("Price", 160, y);
// //   doc.line(5, y + 3, 175, y + 3);

// //   const maxPageHeight = doc.internal.pageSize.height - 20;
// //   y += 10;
// //   doc.setFontSize(9);
// //   let soldProducts = x.filter((product) => product.billtype !== "purchase");

// //   soldProducts.forEach((item) => {
// //     if (y + 8 > doc.internal.pageSize.height - 10) {
// //       doc.addPage();
// //       y = 10; // Reset Y position for the new page
// //     }

// //     doc.text(srNo.toString(), 6, y);
// //     const productName =
// //       item.productName && item.productName.length > 15
// //         ? item.productName.substring(0, 12) + "..."
// //         : item.productName;

// //     doc.text(productName ? productName : "-", 12, y);
// //     doc.setFontSize(7);
// //     doc.setFont("times", "bold");
// //     doc.text(
// //       item.hallmark_amt ? `Hallmark amt-${item.hallmark_amt}` : "",
// //       12,
// //       y + 3
// //     );
// //     doc.setFont("times", "normal");
// //     doc.setFontSize(9);
// //     doc.text(
// //       item.hsnCode && item.hsnCode !== "null" && item.hsnCode !== "undefined"
// //         ? item.hsnCode
// //         : "-",
// //       65,
// //       y
// //     );
// //     doc.setFontSize(7);
// //     doc.setFont("times", "bold");
// //     doc.text(item.huidCode ? `UID-${item.huidCode}` : "", 70, y + 3);
// //     doc.setFontSize(9);
// //     doc.setFont("times", "normal");
// //     doc.text(item.quantity !== "null" ? item.quantity : "-", 75, y);
// //     doc.text(item.purity ? item.purity : "-", 85, y);
// //     doc.text(item.grosswt ? item.grosswt : "-", 95, y);
// //     doc.text(item.netWt ? item.netWt : "-", 107, y);
// //     if (item.mrp !== 0 && item.mrp !== "" && item.mrp !== "0") {
// //       doc.text(`MRP -`, 119, y);
// //       doc.text(`${parseFloat(item.mrp).toFixed(2)}`, 130, y);
// //     } else {
// //       doc.text(item.rate ? item.rate : "-", 119, y);
// //       doc.text(
// //         parseFloat(
// //           (parseFloat(item.rate) / 10) * parseFloat(item.netWt)
// //         ).toFixed(2),
// //         130,
// //         y
// //       );
// //     }
// //     const price =
// //       item.billtype !== "purchase"
// //         ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
// //         : parseFloat(item.price).toFixed(2);
// //     const makingCharges = [
// //       item.making_fixed_amt,
// //       item.making_fixed_wastage,
// //       item.making_per_gram,
// //       item.making_percentage,
// //     ];

// //     // Filter out null, empty, or zero making charges
// //     const validMakingCharges = makingCharges.filter(
// //       (charge) => charge !== null && parseInt(charge) !== 0
// //     );

// //     // Choose making charge(s) based on the number of valid charges
// //     let makingChargeText = "";
// //     if (validMakingCharges.length > 1) {
// //       makingChargeText = `${parseFloat(item.makingchrg).toFixed(0)}`;
// //     } else if (
// //       item.making_percentage !== null &&
// //       parseInt(item.making_percentage) !== 0
// //     ) {
// //       makingChargeText = `${parseFloat(item.making_percentage).toFixed(0)}%`;
// //     } else if (
// //       item.making_per_gram !== null &&
// //       parseInt(item.making_per_gram) !== 0
// //     ) {
// //       makingChargeText = `${parseFloat(item.making_per_gram).toFixed(0)}/Gm`;
// //     } else if (validMakingCharges.length === 1) {
// //       makingChargeText = `${parseFloat(validMakingCharges[0]).toFixed(0)}`;
// //     } else {
// //       makingChargeText = `${parseFloat(item.makingchrg).toFixed(0)}`;
// //     }

// //     // Add making charge to PDF
// //     doc.text(makingChargeText, 145, y);
// //     // doc.text("0.00", 115, y);
// //     doc.text(price, 160, y);
// //     srNo++;
// //     y += 8;
// //   });

// //   doc.line(5, y - 3, 175, y - 3);
// //   y += 10;
// //   doc.setFontSize(7);
// //   if (purchaseItems.length > 0) {
// //     doc.line(10, y - 4, 75, y - 4);
// //     y += 0;
// //     doc.text("Item", 11, y);
// //     doc.text("Inv No", 36, y);
// //     doc.text("Amount", 61, y);
// //     doc.line(10, y - 4, 10, y + 2);
// //     doc.line(35, y - 4, 35, y + 2);
// //     doc.line(60, y - 4, 60, y + 2);
// //     doc.line(75, y - 4, 75, y + 2);

// //     y += 4;
// //     doc.line(10, y - 3, 75, y - 3);

// //     purchaseItems.forEach((product) => {
// //       y += 4;
// //       doc.line(10, y - 6, 10, y + 2);
// //       doc.line(35, y - 6, 35, y + 2);
// //       doc.line(60, y - 6, 60, y + 2);
// //       doc.line(75, y - 6, 75, y + 2);
// //       doc.text(product.productName || "N/A", 11, y);
// //       // doc.text(parseFloat(product.netWt).toFixed(3) || "0", 41, y);
// //       doc.text(product.purchase_invoice_no || "0", 36, y);
// //       doc.text((parseFloat(product.price) * -1).toFixed(0) || "0", 61, y);
// //     });

// //     y += 5;
// //     doc.line(10, y - 3, 85, y - 3);
// //   }

// //   let paymentModes = csData.paymentMode ? csData.paymentMode.split(",") : [];
// //   doc.setFontSize(9);
// //   y += 10;
// //   doc.text(`Payment Mode`, 10, y);
// //   let yPaymentModes = y + 5;
// //   paymentModes.forEach((paymentMode) => {
// //     if (yPaymentModes > maxPageHeight - 10) {
// //       doc.addPage();
// //       yPaymentModes = 5;
// //     }
// //     const [mode, amount] = paymentMode.split(":");
// //     doc.text(`${mode}`, 10, yPaymentModes);
// //     doc.text(`${amount}`, 10 + columnWidth, yPaymentModes);
// //     yPaymentModes += 5;
// //   });

// //   let totalSaleAmount = soldProducts.reduce((total, product) => {
// //     return total + parseFloat((parseFloat(product.price) * 100) / 103 || 0);
// //   }, 0);

// //   let payableGst = parseFloat(totalSaleAmount) * 0.03;

// //   y += 10;
// //   if (csData.Customer.currAddState === "Maharashtra") {
// //     doc.text(`Sales Amount:`, 125, y);
// //     doc.text(`${parseFloat(totalSaleAmount).toFixed(2)}`, 155, y);
// //     doc.text(`R.O./Discount:`, 125, y + 5);
// //     doc.text(`${csData.offer}`, 155, y + 5);
// //     doc.text(`CGST 1.5%:`, 125, y + 10);
// //     doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 155, y + 10);
// //     doc.text(`SGST 1.5%:`, 125, y + 15);
// //     doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 155, y + 15);
// //   } else {
// //     doc.text(`Sales Amount:`, 125, y + 5);
// //     doc.text(`${parseFloat(totalSaleAmount).toFixed(2)}`, 155, y + 5);
// //     doc.text(`R.O./Discount:`, 125, y + 10);
// //     doc.text(`${csData.offer}`, 155, y + 10);
// //     doc.text(`IGST 3%:`, 125, y + 15);
// //     doc.text(`${parseFloat(payableGst).toFixed(2)}`, 155, y + 15);
// //   }

// //   doc.text(`Purchase Amount (-):`, 125, y + 20);
// //   doc.text(`${parseFloat(csData.purchaseAmt).toFixed(2)}`, 155, y + 20);
// //   doc.text(`Recieved Amount:`, 125, y + 25);
// //   doc.text(`${parseFloat(csData.receivedAmt).toFixed(2)}`, 155, y + 25);
// //   doc.text(`Balance Amount:`, 125, y + 30);
// //   doc.text(
// //     `${parseFloat(
// //       parseFloat(csData.price) - parseFloat(csData.receivedAmt)
// //     ).toFixed(2)}`,
// //     155,
// //     y + 30
// //   );
// //   doc.text(`Total:`, 125, y + 35);
// //   doc.text(`${parseFloat(csData.price).toFixed(2)}`, 155, y + 35);

// //   let totalAmountInWords = numberToIndianWords(
// //     parseFloat(csData.price).toFixed(0)
// //   );
// //   doc.text(`Total in Words: ${totalAmountInWords} Only`, 10, y + 40);

// //   let footerY = doc.internal.pageSize.height - 40;
// //   doc.setFontSize(9);
// //   // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
// //   // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
// //   // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
// //   doc.text("Customer Signature", 10, footerY);
// //   doc.text(`Bill By - ${csData.billedby} `, 60, footerY - 5);
// //   doc.text(`Salesman - ${csData.soldby} `, 60, footerY);
// //   doc.text("For S.K Khandre Jewellers", 135, footerY);

// //   const pdfBlob = doc.output("blob");
// //   const pdfUrl = URL.createObjectURL(pdfBlob);
// //   window.open(pdfUrl, "_blank");
// // };

// // Krishiv Bill Below
// export const generateBillPDF = (csData, x) => {
//   console.log("checking rcvdatat1", csData);
//   // console.log("checking rcvdatat2", x);
//   const doc = new jsPDF({
//     orientation: "portrait",
//     format: "a4",
//     // format: [180, 250],
//   });

//   doc.setDrawColor(0, 0, 0, 0.3);
//   doc.setFontSize(12);
//   // doc.line(5, 10, 205, 10);
//   doc.setFont("times");
//   if (csData.billType === "false") {
//     doc.text(`${csData.orderType}`, 90, 47.5);
//   } else {
//     doc.text(`${csData.orderType}`, 90, 47.5);
//   }
//   doc.setFontSize(10);
//   doc.line(5, 44, 205, 44);
//   doc.line(5, 290, 205, 290);
//   doc.line(5, 44, 5, 290);
//   doc.line(205, 44, 205, 290);
//   doc.line(5, 48, 205, 48);
//   doc.setFont("times");

//   // doc.text("GST-No-27BBKPK5411K1ZI", 100, 35);
//   let y = 51; // Adjust starting Y position
//   const columnWidth = 15; // Adjust column widths for A5
//   const contentWidth = 120; // Adjust content width for A5
//   let srNo = 1;
//   let pGSrNo = 1;
//   let pSSrNo = 1;
//   let totalOldGoldAmount = 0;
//   let totalOldNotGoldAmount = 0;
//   const purchaseItems = x.filter((product) => product.billtype === "purchase");
//   console.log(x, "x");
//   console.log(csData, "csData");
//   if (csData) {
//     // Ship to
//     doc.text("Consignee (Ship to)", 6, 51);
//     doc.setFont("times", "bold");
//     doc.text(
    
//       `${csData.Customer.FirstName} ${csData.Customer.LastName}`,
//       6,
//       y + 4
//     );
//     doc.setFont("times", "normal");
//     doc.text(
//       `${
//         csData.Customer.currAddStreet
//           ? csData.Customer.currAddStreet
//           : "Street"
//       }`,
//       6,
//       y + 8
//     );
//     doc.text(
//       `${
//         csData.Customer.currAddTown
//           ? csData.Customer.currAddTown
//           : "Town"
//       }`,
//       6,
//       y + 12
//     );
//     doc.text(
//       `${csData.Customer.currAddState} ${
//         csData.Customer.currAddPinCode
//           ? csData.Customer.currAddPinCode
//           : "Pincode"
//       }`,
//       6,
//       y + 16
//     );
//     doc.text(`Invoice No - ${csData.invoiceNo}`, 120, y);
//     doc.text(
//       `Invoice Date - ${new Date(csData.createdOn).toLocaleDateString(
//         "en-GB"
//       )}`,
//       120,
//       y + 4
//     );

//     // doc.text(`Pan Card - ${csData.Customer.panNo}`, 5, y + 15);
//     doc.text(`GSTIN/UIN - ${csData.Customer.gstNo}`, 6, y + 20);
//     doc.line(5, y + 22, 115, y + 22);

//     y = 78;
//     doc.text("Buyer (Bill to)", 6, y);
//     doc.setFont("times", "bold");
//     doc.text(
//       `${csData.Customer.FirstName} ${csData.Customer.LastName}`,
//       6,
//       y + 4
//     );
//     doc.setFont("times", "normal");
//     doc.text(
//       `${
//         csData.Customer.perAddStreet
//           ? csData.Customer.perAddStreet
//           : "Street"
//       }`,
//       6,
//       y + 8
//     );
//     doc.text(
//       `${
//         csData.Customer.perAddTown
//           ? csData.Customer.perAddTown
//           : "Town"
//       }`,
//       6,
//       y + 12
//     );
//     doc.text(
//       `${csData.Customer.perAddState} ${
//         csData.Customer.perAddPinCode
//           ? csData.Customer.perAddPinCode
//           : "Pincode"
//       }`,
//       6,
//       y + 16
//     );

//     // doc.text(`Pan Card - ${csData.Customer.panNo}`, 5, y + 15);
//     doc.text(`GSTIN/UIN - ${csData.Customer.gstNo}`, 6, y + 20);
//     doc.line(115, y - 30, 115, y + 21);
//   }
//   doc.line(5, y + 21, 205, y + 21);
//   y = 105;
//   doc.setFontSize(9);
//   doc.text("S.No", 6, y);
//   doc.text("Description Of Goods", 15, y);
//   doc.text("HSN", 70, y);
//   doc.text("Pcs", 85, y);
//   doc.text("Purity", 95, y);
//   doc.text("Gross", 105, y);
//   doc.text("Wt", 105, y + 3);
//   doc.text("Net", 117, y);
//   doc.text("Wt", 117, y + 3);
//   doc.text("Other", 130, y);
//   doc.text("Charges", 130, y + 3);
//   doc.text("Rate", 145, y);
//   doc.text("Amount", 160, y);
//   doc.text("Hallmark", 175, y);
//   doc.text("Charges", 175, y + 3);
//   doc.text("Total", 190, y);
//   doc.text("Amount", 190, y + 3);
//   doc.line(5, y + 5, 205, y + 5);

//   const maxPageHeight = doc.internal.pageSize.height - 20;
//   y += 10;
//   doc.setFontSize(9);
//   let soldProducts = x.filter((product) => product.billtype !== "purchase");

//   doc.setFontSize(8);
//   soldProducts.forEach((item) => {
//     if (y + 8 > doc.internal.pageSize.height - 10) {
//       doc.addPage();
//       y = 10; // Reset Y position for the new page
//     }

//     doc.text(srNo.toString(), 6, y);
//     const productName =
//       item.productName && item.productName.length > 15
//         ? item.productName.substring(0, 30) + "..."
//         : item.productName;
//     const purityName = item.purity ? item.purity : "-";

//     doc.text(productName ? `${purityName} ${productName}` : "-", 15, y);
//     // doc.setFontSize(7);
//     // doc.setFont("times", "bold");
//     // doc.text(
//     //   item.hallmark_amt ? `Hallmark amt-${item.hallmark_amt}` : "",
//     //   12,
//     //   y + 3
//     // );
//     // doc.setFont("times", "normal");
//     // doc.setFontSize(9);
//     doc.text(
//       item.hsnCode && item.hsnCode !== "null" && item.hsnCode !== "undefined"
//         ? item.hsnCode
//         : "-",
//       70,
//       y
//     );
//     // doc.setFontSize(7);
//     // doc.setFont("times", "bold");
//     // doc.text(item.huidCode ? `UID-${item.huidCode}` : "", 70, y + 3);
//     // doc.setFontSize(9);
//     // doc.setFont("times", "normal");
//     // doc.text(item.quantity !== "null" ? item.quantity : "-", 85, y);
//     doc.text(item.purity ? item.purity : "-", 95, y);
//     doc.text(item.grosswt ? item.grosswt : "-", 105, y);
//     doc.text(item.netWt ? item.netWt : "-", 117, y);
//     doc.text(item.stoneAmount ? item.stoneAmount : "-", 130, y);
//     if (item.mrp !== 0 && item.mrp !== "" && item.mrp !== "0") {
//       doc.text(`MRP -`, 130, y);
//       doc.text(`${parseFloat(item.mrp).toFixed(2)}`, 145, y);
//     } else {
//       doc.text(item.rate ? item.rate : "-", 145, y);
//       doc.text(
//         parseFloat(
//           (parseFloat(item.rate) / 10) * parseFloat(item.netWt)
//         ).toFixed(2),
//         160,
//         y
//       );
//       doc.text(
//         parseFloat(
//           parseFloat(parseFloat(item.rate) / 10) * parseFloat(item.netWt) +
//             parseFloat(item.hallmark_amt ? item.hallmark_amt : 0) +
//             parseFloat(item.stoneAmount ? item.stoneAmount : 0)
//         ).toFixed(2),
//         190,
//         y
//       );
//     }
//     doc.text(item.hallmark_amt ? `${item.hallmark_amt}` : "-", 175, y);

//     const price =
//       item.billtype !== "purchase"
//         ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
//         : parseFloat(item.price).toFixed(2);
//     const makingCharges = [
//       item.making_fixed_amt,
//       item.making_fixed_wastage,
//       item.making_per_gram,
//       item.making_percentage,
//     ];

//     // Filter out null, empty, or zero making charges
//     const validMakingCharges = makingCharges.filter(
//       (charge) => charge !== null && parseInt(charge) !== 0
//     );

//     // Choose making charge(s) based on the number of valid charges
//     let makingChargeText = "";
//     if (validMakingCharges.length > 1) {
//       makingChargeText = `${parseFloat(item.makingchrg).toFixed(0)}`;
//     } else if (
//       item.making_percentage !== null &&
//       parseInt(item.making_percentage) !== 0
//     ) {
//       makingChargeText = `${parseFloat(item.making_percentage).toFixed(0)}%`;
//     } else if (
//       item.making_per_gram !== null &&
//       parseInt(item.making_per_gram) !== 0
//     ) {
//       makingChargeText = `${parseFloat(item.making_per_gram).toFixed(0)}/Gm`;
//     } else if (validMakingCharges.length === 1) {
//       makingChargeText = `${parseFloat(validMakingCharges[0]).toFixed(0)}`;
//     } else {
//       makingChargeText = `${parseFloat(item.makingchrg).toFixed(0)}`;
//     }

//     // Add making charge to PDF
//     // doc.text(makingChargeText, 145, y);
//     // doc.text("0.00", 115, y);
//     // doc.text(price, 160, y);
//     srNo++;
//     y += 8;
//   });

//   doc.line(5, y - 3, 205, y - 3);
//   doc.setFont("times", "bold");
//   doc.text("Total", 10, y);

//   doc.setFont("times", "normal");
//   const totalQuantity = soldProducts.reduce(
//     (a, b) => a + parseFloat(b.quantity),
//     0
//   );
//   const totalGrossWt = soldProducts.reduce((a, b) => {
//     return parseFloat(a) + parseFloat(b.grosswt);
//   }, 0);
//   const totalNetWt = soldProducts.reduce((a, b) => {
//     return parseFloat(a) + parseFloat(b.netWt);
//   }, 0);
//   const totalNetAmount = soldProducts.reduce((a, b) => {
//     return (
//       parseFloat(a) +
//       parseFloat((parseFloat(b.rate) / 10) * parseFloat(b.netWt))
//     );
//   }, 0);
//   const totalStoneAmount = soldProducts.reduce((a, b) => {
//     return parseFloat(a) + parseFloat(b.stoneAmount);
//   }, 0);
//   const totalHallmarkCharges = soldProducts.reduce((a, b) => {
//     return parseFloat(a) + parseFloat(b.hallmark_amt ? b.hallmark_amt : 0);
//   }, 0);
//   const totalProductAmount = soldProducts.reduce((a, b) => {
//     return (
//       parseFloat(a) +
//       parseFloat(
//         parseFloat(parseFloat(b.rate) / 10) * parseFloat(b.netWt) +
//           parseFloat(b.hallmark_amt ? b.hallmark_amt : 0) +
//           parseFloat(b.stoneAmount ? b.stoneAmount : 0)
//       )
//     );
//   }, 0);

//   doc.text(totalQuantity.toFixed(0), 85, y);
//   doc.text(totalGrossWt.toFixed(3), 105, y);
//   doc.text(totalNetWt.toFixed(3), 117, y);
//   doc.text(totalStoneAmount.toFixed(2), 130, y);
//   doc.text(totalNetAmount.toFixed(2), 160, y);
//   doc.text(totalHallmarkCharges.toFixed(2), 175, y);
//   doc.text(totalProductAmount.toFixed(2), 190, y);
//   doc.line(5, y + 1, 205, y + 1);
//   y += 10;
//   // doc.setFontSize(7);
//   if (purchaseItems.length > 0) {
//     doc.line(10, y - 4, 75, y - 4);
//     y += 0;
//     doc.text("Item", 11, y);
//     doc.text("Inv No", 36, y);
//     doc.text("Amount", 61, y);
//     doc.line(10, y - 4, 10, y + 2);
//     doc.line(35, y - 4, 35, y + 2);
//     doc.line(60, y - 4, 60, y + 2);
//     doc.line(75, y - 4, 75, y + 2);

//     y += 4;
//     doc.line(10, y - 3, 75, y - 3);

//     purchaseItems.forEach((product) => {
//       y += 4;
//       doc.line(10, y - 6, 10, y + 2);
//       doc.line(35, y - 6, 35, y + 2);
//       doc.line(60, y - 6, 60, y + 2);
//       doc.line(75, y - 6, 75, y + 2);
//       doc.text(product.productName || "N/A", 11, y);
//       // doc.text(parseFloat(product.netWt).toFixed(3) || "0", 41, y);
//       doc.text(product.purchase_invoice_no || "0", 36, y);
//       doc.text((parseFloat(product.price) * -1).toFixed(0) || "0", 61, y);
//     });

//     y += 5;
//     doc.line(10, y - 3, 75, y - 3);
//   }

//   let paymentModes = csData.paymentMode ? csData.paymentMode.split(",") : [];
//   doc.setFontSize(9);
//   y += 10;
//   doc.text(`Payment Mode`, 10, y);
//   let yPaymentModes = y + 5;
//   paymentModes.forEach((paymentMode) => {
//     if (yPaymentModes > maxPageHeight - 10) {
//       doc.addPage();
//       yPaymentModes = 5;
//     }
//     const [mode, amount] = paymentMode.split(":");
//     doc.text(`${mode}`, 10, yPaymentModes);
//     doc.text(`${amount}`, 10 + columnWidth, yPaymentModes);
//     yPaymentModes += 5;
//   });

//   let totalSaleAmount = soldProducts.reduce((total, product) => {
//     return total + parseFloat((parseFloat(product.price) * 100) / 103 || 0);
//   }, 0);

//   let payableGst = parseFloat(totalSaleAmount) * 0.03;

//   y += 10;
//   if (csData.Customer.currAddState === "Maharashtra") {
//     doc.text(`Sales Amount:`, 155, y);
//     doc.text(`${parseFloat(totalSaleAmount).toFixed(2)}`, 185, y);
//     doc.text(`R.O./Discount:`, 155, y + 5);
//     doc.text(`${csData.offer}`, 185, y + 5);
//     doc.text(`CGST 1.5%:`, 155, y + 10);
//     doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 185, y + 10);
//     doc.text(`SGST 1.5%:`, 155, y + 15);
//     doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 185, y + 15);
//   } else {
//     doc.text(`Sales Amount:`, 155, y + 5);
//     doc.text(`${parseFloat(totalSaleAmount).toFixed(2)}`, 185, y + 5);
//     doc.text(`R.O./Discount:`, 155, y + 10);
//     doc.text(`${csData.offer}`, 185, y + 10);
//     doc.text(`IGST 3%:`, 155, y + 15);
//     doc.text(`${parseFloat(payableGst).toFixed(2)}`, 185, y + 15);
//   }
//   doc.text(`Purchase Amount (-):`, 155, y + 20);
//   doc.text(`${parseFloat(csData.purchaseAmt).toFixed(2)}`, 185, y + 20);
//   doc.text(`Recieved Amount:`, 155, y + 25);
//   doc.text(`${parseFloat(csData.receivedAmt).toFixed(2)}`, 185, y + 25);
//   doc.text(`Balance Amount:`, 155, y + 30);
//   doc.text(
//     `${parseFloat(
//       parseFloat(csData.price) - parseFloat(csData.receivedAmt)
//     ).toFixed(2)}`,
//     185,
//     y + 30
//   );
//   doc.text(`Total:`, 155, y + 35);
//   doc.text(`${parseFloat(csData.price).toFixed(2)}`, 185, y + 35);
//   let totalAmountInWords = numberToIndianWords(
//     parseFloat(csData.price).toFixed(0)
//   );
//   doc.text(`Total in Words: ${totalAmountInWords} Only`, 10, y + 40);

//   let footerY = doc.internal.pageSize.height - 50;
//   doc.setFontSize(9);
//   // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
//   // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
//   // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
//   // doc.text("Customer Signature", 10, footerY);
//   doc.setFont("times", "bold");
//   doc.line(5, footerY - 4, 205, footerY - 4);
//   doc.text("Terms And Conditions :- ", 10, footerY);
//   doc.setFont("times", "normal");
//   doc.text(
//     `Note: - No Eway Bill is required to be Generated as the Goods covered under this Invoice are Exempted as per Serial No. 4/5 to the Annexure `,
//     10,
//     footerY + 5
//   );
//   doc.text(`to Rule 138(14) of the CGST Rules.`, 10, footerY + 9);
//   doc.text(
//     `Consumer can get the purity of the Hallmarked Jewellery / Artifacts verified from any of the BIS recognized A & H Center`,
//     10,
//     footerY + 13
//   );
//   doc.text(
//     `List of BIS recognized A & H center along with address and contact details is available on the webiste "www.bis.gov.in"`,
//     10,
//     footerY + 17
//   );
//   doc.text(`Hallmark Charges is Rs 45 Per Piece`, 10, footerY + 21);
//   doc.text(
//     `This Bill includes Labour Charges, Hallmark Charges, Stone/Beads/Mina and other Charges `,
//     10,
//     footerY + 25
//   );
//   doc.setFont("times", "bold");
//   doc.setFontSize(10);
//   doc.text(`Receivers Signature`, 10, footerY + 42);
//   doc.setFont("times", "normal");
//   doc.setFontSize(7);
//   doc.line(5, footerY + 27, 205, footerY + 27);

//   const pdfBlob = doc.output("blob");
//   const pdfUrl = URL.createObjectURL(pdfBlob);
//   window.open(pdfUrl, "_blank");
// };
