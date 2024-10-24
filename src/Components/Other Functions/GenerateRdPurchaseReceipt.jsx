import React from "react";
import { jsPDF } from "jspdf";
import { numberToIndianWords } from "./numberToIndianWords";

export default function GenerateRdPurchaseReceipt(order, rdPurchaseFormat) {
  console.log("checking trigger", order, rdPurchaseFormat);
  // generateRdPurchaseReceipt8(order);

  if (rdPurchaseFormat == 2) {
    // Thashna Label Below
    generateRdPurchaseReceipt2(order);
  } else if (rdPurchaseFormat == 1) {
    // Nice Label Below
    generateRdPurchaseReceipt2(order);
  }else if (rdPurchaseFormat == 8) {
    generateRdPurchaseReceipt8(order);
  } 
  else if (rdPurchaseFormat == 10) {
    generateRdPurchaseReceipt2(order);
  }
  else if (rdPurchaseFormat == 11) {
    generateRdPurchaseReceipt2(order);
  }
}


const generateRdPurchaseReceipttashna = async (order) => {

  const doc = new jsPDF({
    orientation: "landscape",
    format: "a5",
    // format: [250, 180],
  });
  doc.setDrawColor(0, 0, 0);
  let y = 18; // Adjust starting Y position
  const columnWidth = 15; // Adjust column widths for A5
  const contentWidth = 120; // Adjust content width for A5
  let srNo = 1;
  let pGSrNo = 1;

  // console.log(x, "x");

  // doc.addPage();
  doc.setFontSize(16);
  doc.setFont("times");
  doc.text(`Purchase`, 90, 10);
  doc.setFontSize(9);
  doc.setFont("times");

}

const generateRdPurchaseReceipt1 = async (order) => {
  console.log(order);
  const doc = new jsPDF({
    orientation: "landscape",
    format: "a5",
    // format: [250, 180],
  });
  doc.setDrawColor(0, 0, 0);
  let y = 18; // Adjust starting Y position
  const columnWidth = 15; // Adjust column widths for A5
  const contentWidth = 120; // Adjust content width for A5
  let srNo = 1;
  let pGSrNo = 1;

  // console.log(x, "x");

  // doc.addPage();
  doc.setFontSize(16);
  doc.setFont("times");
  doc.text(`Purchase`, 90, 10);
  doc.setFontSize(9);
  doc.setFont("times");

  if (order) {
    doc.text(`Name - ${order.VendorName}`, 5, y);
    doc.text(`Vendor Code - ${order.VendorId}`, 5, y + 5);
    doc.text(`Date - ${order.PurchaseDate}`, 170, y);
    doc.text(`Invoice Noo - ${order.InvoiceNo}`, 170, y + 5);
    doc.text(`Lot No - ${order.LotNumber}`, 170, y + 10);
  }
  doc.line(5, y + 15, 200, y + 15);
  y = 40;
  doc.setFontSize(9);
  doc.text("SKU", 6, y);

  doc.text("Testing", 15, y);
  doc.text("Category", 28, y);
  doc.text("Product", 44, y);
  doc.text("Quantity", 60, y);
  doc.text("Gr.Wt", 75, y);
  doc.text("Stone.Wt", 88, y);
  doc.text("Net.wt", 103, y);
  doc.text("Fine %", 117, y);
  doc.text("Wastage", 129, y);
  doc.text("F+W Wt", 143, y);
  doc.text("Rate", 159, y);
  doc.text("Making", 170, y);
  doc.text("Amount", 184, y);
  doc.line(5, y + 3, 200, y + 3);

  const maxPageHeight = doc.internal.pageSize.height - 20;
  y += 10;
  // doc.setFontSize(9);

  order.purchaseItem.forEach((item) => {
    if (y + 8 > doc.internal.pageSize.height - 10) {
      doc.addPage();
      y = 10; // Reset Y position for the new page
    }

    doc.setFont("times", "normal");

    doc.text(item.StockKeepingUnit ? item.StockKeepingUnit : "-", 6, y);
    doc.text(item.Testing ? item.Testing : "-", 15, y);
    doc.text(item.CategoryName ? item.CategoryName : "-", 28, y);
    doc.text(item.ProductName ? item.ProductName : "-", 44, y);
    doc.text(item.Quantity ? item.Quantity : "-", 60, y);
    doc.text(item.GrossWt ? item.GrossWt : "-", 75, y);
    doc.text(item.StoneWeight ? item.StoneWeight : "-", 88, y);
    doc.text(item.NetWt ? item.NetWt : "-", 103, y);
    doc.text(item.FinePercent ? item.FinePercent : "-", 117, y);
    doc.text(item.WastagePercent ? item.WastagePercent : "-", 129, y);
    doc.text(
      item.TotalFineWithWstageWt ? item.TotalFineWithWstageWt : "-",
      143,
      y
    );

    doc.text(item.MetalRate ? item.MetalRate : "-", 159, y);
    doc.text(
      item.MakingFixedAmt &&
        item.MakingFixedWastage &&
        item.MakingPerGram &&
        item.MakingPercentage
        ? parseFloat(
          parseFloat(item.MakingFixedAmt) +
          parseFloat(item.MakingFixedWastage) +
          parseFloat(item.MakingPerGram) +
          parseFloat(item.MakingPercentage)
        ).toFixed(2)
        : "-",
      170,
      y
    );
    doc.text(item.TotalItemAmt ? item.TotalItemAmt : "-", 184, y);

    pGSrNo++;
    y += 8;
  });

  doc.line(5, y - 3, 200, y - 3);
  y += 10;

  doc.line(5, y - 4, 45, y - 4);
  doc.line(5, y - 4, 5, y + 11);
  doc.line(24, y - 4, 24, y + 11);
  doc.line(45, y - 4, 45, y + 11);
  doc.text(`Paid Gold`, 6, y);
  doc.line(5, y + 1, 45, y + 1);

  doc.text(`Paid Silver`, 6, y + 5);
  doc.line(5, y + 6, 45, y + 6);
  doc.text(`Paid Amount`, 6, y + 10);
  doc.line(5, y + 11, 45, y + 11);
  doc.text(
    `${parseFloat(
      parseFloat(order.TotalFineGold) - parseFloat(order.BalanceGold)
    ).toFixed(2)}`,
    25,
    y
  );
  doc.text(
    ` ${parseFloat(
      parseFloat(order.TotalFineSilver) - parseFloat(order.BalanceSilver)
    ).toFixed(2)}`,
    25,
    y + 5
  );
  doc.text(
    ` ${parseFloat(
      parseFloat(order.TotalPurchaseAmount) - parseFloat(order.BalanceAmount)
    ).toFixed(2)}`,
    25,
    y + 10
  );
  //Bottom Right Box
  doc.line(150, y - 4, 200, y - 4);
  doc.line(150, y - 4, 150, y + 21);
  doc.line(175, y - 4, 175, y + 21);
  doc.line(200, y - 4, 200, y + 21);
  doc.text(`Balance Gold`, 152, y);
  doc.line(150, y + 1, 200, y + 1);

  doc.text(`Balance Silver`, 152, y + 5);
  doc.line(150, y + 6, 200, y + 6);
  doc.text(`Taxable Amount`, 152, y + 10);
  doc.line(150, y + 11, 200, y + 11);
  doc.text(`GST Amount`, 152, y + 15);
  doc.line(150, y + 16, 200, y + 16);
  doc.text(`Total Amount`, 152, y + 20);
  doc.line(150, y + 21, 200, y + 21);
  doc.text(order.BalanceGold ? order.BalanceGold : "-", 177, y);
  doc.text(order.BalanceSilver ? order.BalanceSilver : "-", 177, y + 5);
  doc.text(order.TotalNetAmount ? order.TotalNetAmount : "-", 177, y + 10);
  doc.text(order.TotalGSTAmount ? order.TotalGSTAmount : "-", 177, y + 15);
  doc.text(
    order.TotalPurchaseAmount ? order.TotalPurchaseAmount : "-",
    177,
    y + 20
  );

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};

const generateRdPurchaseReceipt2 = async (order) => {
  console.log(order);
  const doc = new jsPDF({
    orientation: "portrait",
    format: "a5",
    // format: [180, 250],
  });
  doc.setDrawColor(0, 0, 0);
  // doc.setFontSize(13);
  // doc.setFont("times");
  // if (order.billType === "false") {
  //   doc.text("Estimate", 77, 42);
  // } else {
  //   doc.text("Tax Invoice", 77, 42);
  // }
  // doc.setFontSize(10);
  // doc.text("GST No : 27BBKPK5411K1ZI ", 5, 42);
  // doc.line(5, 44, 175, 44);
  // doc.setFont("times");
  // // doc.text("GST-No-27BBKPK5411K1ZI", 100, 35);
  let y = 18; // Adjust starting Y position
  const columnWidth = 15; // Adjust column widths for A5
  const contentWidth = 120; // Adjust content width for A5
  let srNo = 1;
  let pGSrNo = 1;

  let totalGrossWt = 0;
  let totalStoneWeight = 0;
  let totalStonePieces = 0;
  let totalClipWeight = 0;
  let totalQuantity = 0;

  // console.log(x, "x");

  // doc.addPage();
  doc.setFontSize(16);
  doc.setFont("times");
  doc.text(`Purchase`, 60, 10);
  doc.setFontSize(9);
  doc.setFont("times");

  if (order) {
    doc.text(`Name - ${order.VendorName}-${order.VendorId}`, 5, y);
    // doc.text(`Vendor Code - ${order.VendorId}`, 5, y + 5);
    doc.text(`Date - ${order.PurchaseDate}`, 119, y);
    doc.text(`Invoice No - ${order.InvoiceNo}`, 5, y + 5);
    doc.text(`Lot No - ${order.LotNumber}`, 119, y + 5);
    //   doc.text(`Name - ${order.firstName} ${order.lastName}`, 5, y + 5);
    //   doc.text(
    //     `Address - ${order.currAddStreet} ${order.currAddTown} ${order.currAddState} ${order.currAddPinCode}`,
    //     5,
    //     y + 10
    //   );
    //   doc.text(`Invoice No - ${order.purchase_invoice_no}`, 125, y);
    //   doc.text(
    //     `Date - ${new Date(order.createdOn).toLocaleDateString()}`,
    //     125,
    //     y + 5
    //   );
    //   doc.text(`Email - ${order.email}`, 125, y + 10);
    //   doc.text(`Pan Card - ${order.panNo}`, 5, y + 15);
    //   doc.text(`Gst No - ${order.gstNo}`, 125, y + 15);
  }
  doc.line(5, y + 8, 142, y + 8);
  y = 30;
  doc.setFontSize(9);
  doc.text("Sr.No", 6, y);
  // doc.text("SKU", 6, y);

  doc.text("SKU", 23, y);
  doc.text("Testing", 46, y);
  doc.text("Gr.Wt", 62, y);
  doc.text("Stone.Wt", 79, y);
  doc.text("S.Pcs", 96, y);
  doc.text("Tag.WT", 112, y);
  doc.text("Pair", 127, y);
  // doc.text("Fine %", 117, y);
  // doc.text("Wastage", 129, y);
  // doc.text("F+W Wt", 143, y);
  // doc.text("Rate", 159, y);
  // doc.text("Making", 170, y);
  // doc.text("Amount", 184, y);
  doc.line(5, y + 3, 142, y + 3);

  const maxPageHeight = doc.internal.pageSize.height - 20;
  y += 10;
  // doc.setFontSize(9);

  order.purchaseItem.forEach((item) => {
    if (y + 8 > doc.internal.pageSize.height - 10) {
      doc.addPage();
      y = 10; // Reset Y position for the new page
    }

    const clipDisplay = item.ClipQuantity && item.ClipWeight
      ? String((item.ClipQuantity * item.ClipWeight).toFixed(3))
      : '-';

    // item.ClipQuantity && item.ClipWeight
    //   ? `${item.ClipQuantity} * ${item.ClipWeight}`
    //   : "-";


    doc.setFont("times", "normal");

    doc.text(`${srNo}`, 10, y);
    doc.text(item.StockKeepingUnit ? item.StockKeepingUnit : "-", 23, y);
    doc.text(item.Testing ? item.Testing : "-", 46, y);
    doc.text(item.GrossWt ? item.GrossWt : "-", 62, y);
    doc.text(item.StoneWt ? item.StoneWt : "-", 79, y);
    doc.text(item.StonePieces ? item.StonePieces : "-", 96, y);
    doc.text(clipDisplay, 112, y);
    doc.text(item.Quantity ? item.Quantity : "-", 127, y);
    // doc.text(item.NetWt ? item.NetWt : "-", 103, y);
    // doc.text(item.CategoryName ? item.CategoryName : "-", 28, y);
    // doc.text(item.ProductName ? item.ProductName : "-", 44, y);
    // doc.text(
    //   item.TotalFineWithWstageWt ? item.TotalFineWithWstageWt : "-",
    //   143,
    //   y
    // );

    // doc.text(item.MetalRate ? item.MetalRate : "-", 159, y);
    // doc.text(
    //   item.MakingFixedAmt &&
    //     item.MakingFixedWastage &&
    //     item.MakingPerGram &&
    //     item.MakingPercentage
    //     ? parseFloat(
    //         parseFloat(item.MakingFixedAmt) +
    //           parseFloat(item.MakingFixedWastage) +
    //           parseFloat(item.MakingPerGram) +
    //           parseFloat(item.MakingPercentage)
    //       ).toFixed(2)
    //     : "-",
    //   170,
    //   y
    // );
    // doc.text(item.TotalItemAmt ? item.TotalItemAmt : "-", 184, y);
    // doc.text(item.netWt ? item.netWt : "-", 100, y);
    // doc.text(item.rate ? item.rate : "-", 115, y);
    // doc.text(item.fine_percentage ? item.fine_percentage : "-", 130, y);
    // const price =
    //   item.billtype !== "purchase"
    //     ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
    //     : parseFloat(item.price).toFixed(2);
    // doc.text("-", 145, y);

    // doc.text(`${parseFloat(price) * -1}`, 160, y);
    // totalOldGoldAmount += parseFloat(price) * -1;

    console.log(
      `ClipWeight for item ${srNo}: ${item.ClipWeight}${item.ClipQuantity}`
    );

    totalGrossWt += parseFloat(item.GrossWt) || 0;
    totalStoneWeight += parseFloat(item.StoneWt) || 0;
    totalStonePieces += parseInt(item.StonePieces) || 0;
    totalClipWeight += parseFloat(item.ClipWeight) * item.ClipQuantity || 0;
    totalQuantity += parseInt(item.Quantity) || 0;

    console.log(`Total ClipWeight so farr: ${totalClipWeight}`);

    srNo++;
    y += 8;
  });

  doc.line(5, y - 3, 142, y - 3);

  y += 5;
  doc.text("Totals:", 23, y);
  doc.text(totalGrossWt.toFixed(3), 62, y);
  doc.text(totalStoneWeight.toFixed(3), 79, y);
  doc.text(totalStonePieces.toString(), 96, y);
  doc.text(totalClipWeight.toFixed(3), 112, y);
  doc.text(totalQuantity.toString(), 127, y);

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};


const generateDummyData = () => {
  const stonesNames = ['stone1', 'stone2', 'stone3', 'stone4', 'stone5', 'stone6', 'stone7', 'stone8'];

  // Helper function to generate random stones array
  const generateRandomStones = () => {
    const numberOfStones = Math.floor(Math.random() * (8 - 3 + 1)) + 3; // Random number between 3 and 8
    const shuffledStones = stonesNames.sort(() => 0.5 - Math.random()).slice(0, numberOfStones);

    return shuffledStones.map(stone => ({
      stonename: stone,
      stoneweight: (Math.random() * (5 - 1) + 1).toFixed(2), // Random stone weight between 1 and 5
    }));
  };

  const dummyData = [];

  for (let i = 1; i <= 20; i++) {
    dummyData.push({
      sno: i,
      ProductName: `Product ${i}`,
      pcs:'2',
      grtg: '3',
      tag:'1',
      GrossWt: (Math.random() * (100 - 50) + 50).toFixed(2), // Random gross weight between 50 and 100
      StoneWt: generateRandomStones(),
      NetWt: (Math.random() * (90 - 40) + 40).toFixed(2), // Random net weight between 40 and 90
      tounch:'92',
      finewt:'100',
      samount:'100'

    });
  }

  return dummyData;
};

const generateRdPurchaseReceipt8 = async (product) => {
  const items = product.purchaseItem;
  console.log('checking original items ', items);

  const doc = new jsPDF({
    orientation: "landscape", // Change orientation to landscape
    unit: "mm",
    format: "a4",
  });

  const pageHeight = doc.internal.pageSize.height;
  const marginTop = 15;
  const marginLeft = 10;
  const marginRight = 10;

  let currentY = marginTop;
  const lineHeight = 10; // Height of each row
  const totalRowHeight = lineHeight + 5; // Height of the total row
  const pageBottomMargin = 20; // Space from bottom of the page

  const allStoneNames = items.flatMap(item => item.Stones.map(stone => stone.stonename));
  const uniqueStoneNames = [...new Set(allStoneNames)]; // Get unique stone names

  const maxStones = uniqueStoneNames.length; // Use unique stone count

  // Calculate dynamic widths based on available page width
  const availableWidth = doc.internal.pageSize.width - marginLeft - marginRight; // Space left for the table

  // Assign width to fixed columns
  const srnoWidth = 10;
  const productNameWidth = 30;
  const pcsWidth = 15;
  const grtgWidth = 15;
  const tagWidth = 15;
  const grossWtWidth = 20;
  const netWtWidth = 20;
  const tounchWidth = 20;
  const fineWtWidth = 20;
  const stoneAmountWidth = 20;

  let stoneColumnWidth = 0; // Initialize stone column width to 0
  if (maxStones > 0) {
    // Calculate remaining width for stone columns if there are stones
    const remainingWidth = availableWidth - (srnoWidth + productNameWidth + pcsWidth + grtgWidth + tagWidth + grossWtWidth + netWtWidth + tounchWidth + fineWtWidth + stoneAmountWidth);
    stoneColumnWidth = remainingWidth / maxStones; // Dynamically divide space for each stone column
  }

  // Set column positions
  let currentX = marginLeft;
  const columnPositions = {
    sr: currentX,
    ProductName: (currentX += srnoWidth),
    pcs: (currentX += productNameWidth),
    grtg: (currentX += pcsWidth),
    tag: (currentX += grtgWidth),
    GrossWt: (currentX += tagWidth),
  };

  currentX += grossWtWidth;

  // Dynamically calculate positions for stone columns if there are any stones
  for (let i = 0; i < maxStones; i++) {
    columnPositions[`stone${i + 1}`] = currentX;
    currentX += stoneColumnWidth;
  }

  // Add positions for remaining columns
  columnPositions.NetWt = currentX;
  columnPositions.Tounch = currentX + netWtWidth;
  columnPositions.FineWt = currentX + netWtWidth + tounchWidth;
  columnPositions.StoneAmount = currentX + netWtWidth + tounchWidth + fineWtWidth;

  // Draw header
  doc.setFontSize(12);
  doc.setFont('sanserif', 'bold');
  
  doc.text('S.No', columnPositions.sr, currentY);
  doc.text('Product', columnPositions.ProductName, currentY);
  doc.text('Pcs', columnPositions.pcs, currentY);
  doc.text('Grtg', columnPositions.grtg, currentY);
  doc.text('Tag', columnPositions.tag, currentY);
  doc.text('Gross WT', columnPositions.GrossWt, currentY);

  // Render stone column headers dynamically if there are stones
  if (maxStones > 0) {
    uniqueStoneNames.forEach((StoneName, index) => {
      const stone = StoneName.slice(0, 3);
      doc.text(stone, columnPositions[`stone${index + 1}`], currentY);
    });
  }

  doc.text('Net WT', columnPositions.NetWt, currentY);
  doc.text('Tounch', columnPositions.Tounch, currentY);
  doc.text('Fine WT', columnPositions.FineWt, currentY);
  doc.text('Stone Amount', columnPositions.StoneAmount, currentY);

  currentY += lineHeight; // Move below header

  let totalNetWt = 0; // Initialize total variables
  let totalTounch = 0;
  let totalFineWt = 0;
  let totalStoneAmount = 0;

  // Render item data
  items.forEach((item, index) => {
    // Check if currentY exceeds the page height limit
    if (currentY + totalRowHeight > pageHeight - pageBottomMargin) {
      // Add a total row for the current page
      addTotalRow(doc, columnPositions, currentY, totalNetWt, totalTounch, totalFineWt, totalStoneAmount);
      doc.addPage(); // Add a new page
      currentY = marginTop; // Reset Y position for the new page
      // Redraw the header on the new page
      drawHeader(doc, columnPositions, currentY, allStoneNames);
      currentY += lineHeight; // Move below header
    }

    let currentX = marginLeft;

    doc.text(`${index+1}`, columnPositions.sr, currentY);
    doc.text(`${item.ProductName}`, columnPositions.ProductName, currentY);
    doc.text(`${item.Quantity}`, columnPositions.pcs, currentY);

    let g = parseFloat(item.GrossWt) || 0; // Convert to float, default to 0 if NaN
let tag = parseFloat(item.TagWeight) || 0; // Convert to float, default to 0 if NaN
let tg = g + tag; // Perform the additionget

    doc.text(`${tg}`, columnPositions.grtg, currentY);
    doc.text(`${tag}`, columnPositions.tag, currentY);
    doc.text(`${g}`, columnPositions.GrossWt, currentY);

    // Render stones dynamically
    const stoneWeights = new Array(maxStones).fill(''); // Fill with empty strings

    // Fill in the weights based on unique stone names
    item.Stones.forEach(stone => {
      const index = uniqueStoneNames.indexOf(stone.StoneName);
      if (index >= 0) {
        stoneWeights[index] = stone.stoneweight; // Assign stone weight to the correct index
      }
    });

    // Render stone weights dynamically if there are stones
    if (maxStones > 0) {
      stoneWeights.forEach((weight, index) => {
        doc.text(weight, columnPositions[`stone${index + 1}`], currentY);
      });
    }

    doc.text(`${item.NetWt||0}`, columnPositions.NetWt, currentY);
    doc.text(`${item.FinePercent||0}`, columnPositions.Tounch, currentY);
    doc.text(`${item.FineWastageWt||0}`, columnPositions.FineWt, currentY);
    doc.text(`${item.TotalStoneAmt||0}`, columnPositions.StoneAmount, currentY);

    // Update total calculations
    totalNetWt += item.NetWt || 0;
    totalTounch += item.tounch || 0;
    totalFineWt += item.finewt || 0;
    totalStoneAmount += item.samount || 0;

    currentY += lineHeight; // Move to the next row
  });

  // Add the final total row after the last item
  addTotalRow(doc, columnPositions, currentY, totalNetWt, totalTounch, totalFineWt, totalStoneAmount, allStoneNames);

  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );
};

// Helper function to draw the header
const drawHeader = (doc, columnPositions, currentY,allStoneNames) => {
  doc.setFontSize(12);
  doc.setFont('sanserif', 'bold');
  
  doc.text('S.No', columnPositions.sr, currentY);
  doc.text('Product', columnPositions.ProductName, currentY);
  doc.text('Pcs', columnPositions.pcs, currentY);
  doc.text('Grtg', columnPositions.grtg, currentY);
  doc.text('Tag', columnPositions.tag, currentY);
  doc.text('Gross WT', columnPositions.GrossWt, currentY);

  // Render stone column headers dynamically if there are stones
  const uniqueStoneNames = [...new Set(allStoneNames)];
  if (uniqueStoneNames.length > 0) {
    uniqueStoneNames.forEach((stoneName, index) => {
      const stone = stoneName.slice(0, 3);
      doc.text(stone, columnPositions[`stone${index + 1}`], currentY);
    });
  }

  doc.text('Net WT', columnPositions.NetWt, currentY);
  doc.text('Tounch', columnPositions.Tounch, currentY);
  doc.text('Fine WT', columnPositions.FineWt, currentY);
  doc.text('Stone Amount', columnPositions.StoneAmount, currentY);
};

// Helper function to add total row
const addTotalRow = (doc, columnPositions, currentY, totalNetWt, totalTounch, totalFineWt, totalStoneAmount, allStoneNames) => {
  doc.setFontSize(12);
  doc.setFont('sanserif', 'bold');
  doc.text('Total', columnPositions.sr, currentY);

  doc.text('', columnPositions.ProductName, currentY); // Leave Product Name blank in total row
  doc.text('', columnPositions.pcs, currentY); // Leave Pcs blank in total row
  doc.text('', columnPositions.grtg, currentY); // Leave Grtg blank in total row
  doc.text('', columnPositions.tag, currentY); // Leave Tag blank in total row
  doc.text('', columnPositions.GrossWt, currentY); // Leave Gross WT blank in total row

  // Leave stone columns blank for total row
  const uniqueStoneNames = [...new Set(allStoneNames)];
  uniqueStoneNames.forEach((_, index) => {
    doc.text('', columnPositions[`stone${index + 1}`], currentY); // Leave stone weight blank
  });

  doc.text(totalNetWt.toString(), columnPositions.NetWt, currentY);
  doc.text(totalTounch.toString(), columnPositions.Tounch, currentY);
  doc.text(totalFineWt.toString(), columnPositions.FineWt, currentY);
  doc.text(totalStoneAmount.toString(), columnPositions.StoneAmount, currentY);

  // Move Y position down for next row
  currentY += 5; // Add spacing below the total row
};



const generateRdPurchaseReceipt8o= async (product) => {
  const items1 = generateDummyData();
  const items = product.purchaseItem;
  console.log('checking original items ', items);

  const doc = new jsPDF({
    orientation: "landscape", // Change orientation to landscape
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.width;
  const marginTop = 15;
  const marginLeft = 10;
  const marginRight = 10;

  let currentY = marginTop;

  const allStoneNames = items.flatMap(item => item.Stones.map(stone => stone.stonename));
  const uniqueStoneNames = [...new Set(allStoneNames)]; // Get unique stone names

  const maxStones = uniqueStoneNames.length; // Use unique stone count

  // Calculate dynamic widths based on available page width
  const availableWidth = pageWidth - marginLeft - marginRight; // Space left for the table

  // Assign width to fixed columns
  const srnoWidth = 10;
  const productNameWidth = 30;
  const pcsWidth = 15;
  const grtgWidth = 15;
  const tagWidth = 15;
  const grossWtWidth = 20;
  const netWtWidth = 20;
  const tounchWidth = 20;
  const fineWtWidth = 20;
  const stoneAmountWidth = 20;

  let stoneColumnWidth = 0; // Initialize stone column width to 0
  if (maxStones > 0) {
    // Calculate remaining width for stone columns if there are stones
    const remainingWidth = availableWidth - (srnoWidth + productNameWidth + pcsWidth + grtgWidth + tagWidth + grossWtWidth + netWtWidth + tounchWidth + fineWtWidth + stoneAmountWidth);
    stoneColumnWidth = remainingWidth / maxStones; // Dynamically divide space for each stone column
  }

  // Set column positions
  let currentX = marginLeft;
  const columnPositions = {
    sr: currentX,
    ProductName: (currentX += srnoWidth),
    pcs: (currentX += productNameWidth),
    grtg: (currentX += pcsWidth),
    tag: (currentX += grtgWidth),
    GrossWt: (currentX += tagWidth),
  };

  currentX += grossWtWidth;

  // Dynamically calculate positions for stone columns if there are any stones
  for (let i = 0; i < maxStones; i++) {
    columnPositions[`stone${i + 1}`] = currentX;
    currentX += stoneColumnWidth;
  }

  // Add positions for remaining columns
  columnPositions.NetWt = currentX;
  columnPositions.Tounch = currentX + netWtWidth;
  columnPositions.FineWt = currentX + netWtWidth + tounchWidth;
  columnPositions.StoneAmount = currentX + netWtWidth + tounchWidth + fineWtWidth;

  // Draw header
  doc.setFontSize(12);
  doc.setFont('sanserif', 'bold');
  
  doc.text('S.No', columnPositions.sr, currentY);
  doc.text('Product', columnPositions.ProductName, currentY);
  doc.text('Pcs', columnPositions.pcs, currentY);
  doc.text('Grtg', columnPositions.grtg, currentY);
  doc.text('Tag', columnPositions.tag, currentY);
  doc.text('Gross WT', columnPositions.GrossWt, currentY);

  // Render stone column headers dynamically if there are stones
  if (maxStones > 0) {
    uniqueStoneNames.forEach((stoneName, index) => {
      const stone = stoneName.slice(0, 3);
      doc.text(stone, columnPositions[`stone${index + 1}`], currentY);
    });
  }

  doc.text('Net WT', columnPositions.NetWt, currentY);
  doc.text('Tounch', columnPositions.Tounch, currentY);
  doc.text('Fine WT', columnPositions.FineWt, currentY);
  doc.text('Stone Amount', columnPositions.StoneAmount, currentY);

  currentY += 10;

  // Render item data
  items.forEach((item, index) => {
    let currentX = marginLeft;

    doc.text(`${index+1}`, columnPositions.sr, currentY);
    doc.text(`${item.ProductName}`, columnPositions.ProductName, currentY);
    doc.text(`${item.pcs}`, columnPositions.pcs, currentY);
    doc.text(`${item.grtg}`, columnPositions.grtg, currentY);
    doc.text(`${item.tag}`, columnPositions.tag, currentY);
    doc.text(`${item.GrossWt}`, columnPositions.GrossWt, currentY);

    // Render stones dynamically
    const stoneWeights = new Array(maxStones).fill(''); // Fill with empty strings

    // Fill in the weights based on unique stone names
    item.Stones.forEach(stone => {
      const index = uniqueStoneNames.indexOf(stone.stonename);
      if (index >= 0) {
        stoneWeights[index] = stone.stoneweight; // Assign stone weight to the correct index
      }
    });

    // Render stone weights dynamically if there are stones
    if (maxStones > 0) {
      stoneWeights.forEach((weight, index) => {
        doc.text(weight, columnPositions[`stone${index + 1}`], currentY);
      });
    }

    doc.text(`${item.NetWt}`, columnPositions.NetWt, currentY);
    doc.text(`${item.tounch}`, columnPositions.Tounch, currentY);
    doc.text(`${item.finewt}`, columnPositions.FineWt, currentY);
    doc.text(`${item.samount}`, columnPositions.StoneAmount, currentY);

    currentY += 10; // Move to the next row
  });

  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );
};
