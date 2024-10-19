import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generateBillPDF = (
  invoiceItems,
  csData,
  invoiceformate,
  mainitem
) => {
  console.log("labelformatee ", invoiceformate);

  // generateinvoicepdf3(invoiceItems, csData, mainitem);

  // generateinvoicepdf6(invoiceItems, csData, mainitem);

  // generateinvoicepdf7(invoiceItems, csData, mainitem);

  if (invoiceformate === 1) {
    generateinvoicepdf1(invoiceItems, csData, mainitem);
    return;
  } else if (invoiceformate === 2) {
    generateinvoicepdf2(invoiceItems, csData, mainitem);
    return;
  } else if (invoiceformate === 3) {
    generateinvoicepdf3(invoiceItems, csData, mainitem);
    return;
  } else if (invoiceformate === 4) {
    generateinvoicepdf4(invoiceItems, csData, mainitem);
    return;
  } else if (invoiceformate === 5) {
    // generateinvoicepdf5(invoiceItems, csData, mainitem);
    return;
  } else if (invoiceformate === 6) {
    generateinvoicepdf6(invoiceItems, csData, mainitem);
    return;
  } else if (invoiceformate === 7) {
    generateinvoicepdf7(invoiceItems, csData, mainitem);
    return;
  }
}


//   const doc = new jsPDF({
//     orientation: "portrait",
//     unit: "mm",
//     format: "a4",
//   });

//   // GSTIN & Invoice Header
//   doc.setFontSize(10);
//   doc.text("GSTIN: 24AYPB4952C1ZA", 160, 10);
//   doc.setFontSize(14);
//   doc.text("TAX INVOICE", 90, 20);

//   // Invoice Details
//   doc.setFontSize(10);
//   doc.text("Invoice No.: 95", 14, 30);
//   doc.text("Invoice Dt.: 21-Feb-2020", 14, 35);
//   doc.text("Invoice Time: 10:40:24AM", 14, 40);
//   doc.text("Place of Supply: Gujarat", 150, 30);
//   doc.text("Terms of Delivery:", 150, 35);

//   // Customer Information
//   doc.text("Invoice To:", 14, 50);
//   doc.text("Rohit Mishra", 14, 55);
//   doc.text("Address Line No. 1, Address Line No. 2, Vadodara", 14, 60);
//   doc.text("State: Gujarat", 14, 65);
//   doc.text("Mobile No.: 9898098980", 150, 60);
//   doc.text("PAN No.: AKQPQ5486N", 150, 65);

//   // Draw Table Headers
//   doc.setFontSize(10);
//   doc.text("Sr.", 14, 80);
//   doc.text("Product Details", 24, 80);
//   doc.text("Pcs", 54, 80); // Adjusted width
//   doc.text("Purity", 64, 80);
//   doc.text("Gross Wt", 84, 80); // Adjusted for text width
//   doc.text("Net Wt", 104, 80); // Adjusted for text width
//   doc.text("Rate / gm", 124, 80); // Adjusted for text width
//   doc.text("Amount", 144, 80);
//   doc.text("Labour Rate", 164, 80); // Adjusted for header width
//   doc.text("Labour Amt", 184, 80); // Adjusted for header width
//   doc.text("Total", 204, 80);

//   // Draw Table Borders
//   doc.line(10, 85, 200, 85); // Top line
//   doc.line(10, 90, 200, 90); // Table header bottom line

//   // Draw Column Separators
//   doc.line(10, 85, 10, 150); // Left border, extended for half-page height
//   doc.line(20, 85, 20, 150); // After Sr
//   doc.line(50, 85, 50, 150); // After Product Details
//   doc.line(60, 85, 60, 150); // After Pcs
//   doc.line(80, 85, 80, 150); // After Purity
//   doc.line(100, 85, 100, 150); // After Gross Wt
//   doc.line(120, 85, 120, 150); // After Net Wt
//   doc.line(140, 85, 140, 150); // After Rate / gm
//   doc.line(160, 85, 160, 150); // After Amount
//   doc.line(180, 85, 180, 150); // After Labour Rate
//   doc.line(200, 85, 200, 150); // After Labour Amt
//   doc.line(210, 85, 210, 150); // Right border, extended for half-page height

//   // Insert Product Row
//   doc.text("1", 14, 95);
//   doc.text("Gold Ring", 24, 95);
//   doc.text("1", 54, 95);
//   doc.text("22K", 64, 95);
//   doc.text("11.35", 84, 95);
//   doc.text("10.67", 104, 95);
//   doc.text("3980", 124, 95);
//   doc.text("42466.60", 144, 95);
//   doc.text("500.00", 164, 95);
//   doc.text("5335.00", 184, 95);
//   doc.text("47801.60", 204, 95);

//   // Draw Row Bottom Line
//   doc.line(10, 100, 200, 100); // Row bottom line

//   // Summary Section
//   doc.text("HSN/SAC: 7108", 14, 110);
//   doc.text("Taxable Amount: 47801.60", 14, 115);
//   doc.text("CGST @ 1.50%: 717.02", 14, 120);
//   doc.text("SGST @ 1.50%: 717.02", 14, 125);
//   doc.text("IGST: 0.00", 14, 130);
//   doc.text("Round Off: 0.36", 14, 135);

//   // Total Amount
//   doc.setFontSize(12);
//   doc.text("Grand Total: 49236.00", 160, 135);

//   // Footer
//   doc.setFontSize(10);
//   doc.text("Rupees Forty Nine Thousand Two Hundred Thirty Six Only", 14, 145);
//   doc.text("For Manan Softwares", 160, 155);
//   doc.text("Authorised Signatory", 160, 160);

//   // Save the PDF
//   // doc.save("invoice.pdf");

//   const pdfData = doc.output("datauristring");
//   const newWindow = window.open();
//   newWindow.document.write(
//     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
//   );
// };

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
      design: `Design ${i}`,
      productdetail: `Product ${i}`,
      grosswt: (Math.random() * (100 - 50) + 50).toFixed(2), // Random gross weight between 50 and 100
      Stones: generateRandomStones(),
      netwt: (Math.random() * (90 - 40) + 40).toFixed(2), // Random net weight between 40 and 90
    });
  }

  return dummyData;
};





const generateinvoicepdf3old1 = async (items1, customer, mainitem) => {
  const items = generateDummyData();
  console.log('checking original items ', items1);
  console.log("checking items", items);
  console.log("checking customer", customer);

  const doc = new jsPDF({
      orientation: "landscape", // Change orientation to landscape
      unit: "mm",
      format: "a4",
  });

  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const marginTop = 15;

  let tableHeight = 170; // Fixed table height
  let currentY = marginTop;

  // Check for maximum stones, handling empty stones array
  const maxStones = Math.max(0, ...items.map((item) => item.Stones.length));

  console.log("chek maxstones ", maxStones);

  doc.setFontSize(12);
  doc.setFont('sanserif', 'bold');
  doc.text('Customer Name: ', 10, 10);

  // Adjusted column positions for a landscape layout and wider stones columns
  const columnPositions = {
      sr: 10, // Start from 10mm
      Design: 20,
      productDetails: 40,
      Gwt: 75,
      stones: 95, // Widen the "stones" column
      nwt: 178,
      stoneamt: 198, // Widen the "stoneamt" column
  };

  // Draw the table structure dynamically
  const drawTableStructure = () => {
      Object.values(columnPositions).forEach((pos) => {
          doc.line(pos, marginTop, pos, marginTop + tableHeight); // Column separators
      });
      doc.line(
          pageWidth - 10,
          marginTop,
          pageWidth - 10,
          marginTop + tableHeight
      ); // Right border
  };

  const stoneWeightSpace = columnPositions.nwt - columnPositions.stones;
  const stoneAmountSpace = pageWidth - columnPositions.stoneamt - 10;

  // Dynamic cell width for stones, ensuring we don't divide by zero
  const stoneWeightCellWidth = maxStones > 0 ? stoneWeightSpace / maxStones : 0;
  const stoneAmountCellWidth = maxStones > 0 ? stoneAmountSpace / maxStones : 0;

  const drawTableHeader = () => {
      doc.setFontSize(10);
      doc.line(columnPositions.sr, currentY, pageWidth - 10, currentY); // Table header top line
      currentY += 5;

      // Draw the header text
      doc.text("Sr", columnPositions.sr + 2, currentY);
      doc.text("Design", columnPositions.Design + 2, currentY);
      doc.text("Product Details", columnPositions.productDetails + 2, currentY);
      doc.text("G Wt", columnPositions.Gwt + 2, currentY);
      doc.text("Stones Wt", columnPositions.stones + 2, currentY); // Adjusted position for Stones Wt
      doc.text("N Wt", columnPositions.nwt + 2, currentY);
      doc.text("Stones Amount", columnPositions.stoneamt + 2, currentY); // Adjusted position for Stones Amount

      currentY += 1;
      doc.line(columnPositions.sr, currentY + 5, pageWidth - 10, currentY + 5); // Table header bottom line

      // Print dynamic stone names for "Stones Wt" sub-columns
      for (let i = 0; i < maxStones; i++) {
          const stoneWeightX = columnPositions.stones + i * stoneWeightCellWidth;
          doc.line(
              stoneWeightX,
              currentY + 5,
              stoneWeightX,
              marginTop + tableHeight
          );
      }

      // Print dynamic stone names for "Stones Amount" sub-columns
      for (let i = 0; i < maxStones; i++) {
          const stoneAmountX =
              columnPositions.stoneamt + i * stoneAmountCellWidth;
          doc.line(
              stoneAmountX,
              currentY + 5,
              stoneAmountX,
              marginTop + tableHeight
          );
      }

      // Print dynamic stone names for "Stones Wt" and "Stones Amount" sub-columns
      items.forEach((item) => {
          for (let i = 0; i < item.Stones.length; i++) {
              const stoneName = item.Stones[i].stonename.slice(0, 3); // Get the stone name from the item data

              // Position stone names under "Stones Wt" column
              const stoneWeightX =
                  columnPositions.stones + i * stoneWeightCellWidth;
              doc.text(stoneName, stoneWeightX + 2, currentY + 10);

              // Position stone names under "Stones Amount" column
              const stoneAmountX =
                  columnPositions.stoneamt + i * stoneAmountCellWidth;
              doc.text(stoneName, stoneAmountX + 2, currentY + 10);
          }
      });

      // Final lines for the last stone sub-columns, only if there are stones
      if (maxStones > 0) {
          const finalStoneWeightX =
              columnPositions.stones + maxStones * stoneWeightCellWidth;
          const finalStoneAmountX =
              columnPositions.stoneamt + maxStones * stoneAmountCellWidth;

          console.log("maxStones:", maxStones);
          console.log("stoneWeightCellWidth:", stoneWeightCellWidth);
          console.log("finalStoneWeightX:", finalStoneWeightX);

          doc.line(
              finalStoneWeightX,
              currentY,
              finalStoneWeightX,
              marginTop + tableHeight
          );
          doc.line(
              finalStoneAmountX,
              currentY,
              finalStoneAmountX,
              marginTop + tableHeight
          );
      }

      currentY += 10;
      doc.line(columnPositions.sr, currentY + 5, pageWidth - 10, currentY + 5); // Table header bottom line
      currentY += 5;

      doc.line(
          columnPositions.sr,
          marginTop + tableHeight,
          pageWidth - 10,
          marginTop + tableHeight
      ); // Bottom line
  };

  const drawTableRow = (item, rowIndex) => {
      const rowHeight = 10;
      const startY = currentY + 10;

      // Print row number (Sr)
      doc.text(`${rowIndex + 1}`, columnPositions.sr + 2, startY);

      // Print Design (assuming the item has a design property)
      doc.text(item.design || "", columnPositions.Design + 2, startY);

      // Print Product Details
      doc.text(
          item.productdetail || "",
          columnPositions.productDetails + 2,
          startY
      );

      // Print G Wt (Gross Weight)
      doc.text(item.grosswt || "0.00", columnPositions.Gwt + 2, startY);

      // Print Stones Wt (for each stone in item), handle empty stones array
      item.Stones.forEach((stone, index) => {
          const stoneWeightX =
              columnPositions.stones + index * stoneWeightCellWidth;
          doc.text(stone.stoneweight || "0.00", stoneWeightX + 2, startY);
      });

      // Print N Wt (Net Weight)
      doc.text(item.netwt || "0.00", columnPositions.nwt + 2, startY);

      // Print Stones Amount (for each stone in item), handle empty stones array
      item.Stones.forEach((stone, index) => {
          const stoneAmountX =
              columnPositions.stoneamt + index * stoneAmountCellWidth;
          doc.text(stone.stoneamount || "0.00", stoneAmountX + 2, startY);
      });

      currentY += rowHeight; // Move to the next row position
  };

  const drawTableContent = () => {
      const rowHeight = 10; // Set row height here for consistency
      const maxRowsPerPage = 14; // Maximum rows per page

      let currentPageItems = []; // To store items for the current page
      let pageIndex = 0; // To track the current page index
      let globalRowIndex = 0; // To track the overall row index (for Sr number)

      let grandTotalGrossWt = 0;
      let grandTotalNetWt = 0;
      let grandTotalStonesWt = Array(maxStones).fill(0); // Array for each stone's total weight
      let grandTotalStonesAmt = Array(maxStones).fill(0); // Array for each stone's total amount

      // Split items into groups of 7 per page
      for (let i = 0; i < items.length; i += maxRowsPerPage) {
          currentPageItems = items.slice(i, i + maxRowsPerPage); // Get 7 items for the current page

          // If it's not the first page, add a new page and re-draw header and structure
          if (pageIndex > 0) {
              doc.addPage();
              tableHeight = 180; // Adjust the table height for subsequent pages
              drawTableStructure();
              drawTableHeader();
          }

          currentPageItems.forEach((item, index) => {
              drawTableRow(item, globalRowIndex);
              globalRowIndex++; // Increment overall row index
              grandTotalGrossWt += parseFloat(item.grosswt) || 0;
              grandTotalNetWt += parseFloat(item.netwt) || 0;

              // Accumulate total stone weights and amounts
              item.Stones.forEach((stone, stoneIndex) => {
                  grandTotalStonesWt[stoneIndex] +=
                      parseFloat(stone.stoneweight) || 0;
                  grandTotalStonesAmt[stoneIndex] +=
                      parseFloat(stone.stoneamount) || 0;
              });
          });

          pageIndex++; // Increment page index
      }

      // Draw grand total at the end
      currentY += 10; // Leave space for total
      doc.setFontSize(12);
      doc.setFont('sanserif', 'bold');
      doc.text("Grand Total", columnPositions.sr + 2, currentY);
      doc.text(grandTotalGrossWt.toFixed(2), columnPositions.Gwt + 2, currentY);
      doc.text(grandTotalNetWt.toFixed(2), columnPositions.nwt + 2, currentY);

      // Print totals for stones weights and amounts
      grandTotalStonesWt.forEach((weight, index) => {
          const stoneTotalX =
              columnPositions.stones + index * stoneWeightCellWidth;
          doc.text(weight.toFixed(2), stoneTotalX + 2, currentY);
      });

      grandTotalStonesAmt.forEach((amount, index) => {
          const stoneAmountTotalX =
              columnPositions.stoneamt + index * stoneAmountCellWidth;
          doc.text(amount.toFixed(2), stoneAmountTotalX + 2, currentY);
      });
  };

  drawTableStructure(); // Draw the initial table structure
  drawTableHeader(); // Draw the table header
  drawTableContent(); // Draw the table content


  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );

  // doc.save("invoice.pdf");
};



  const generateinvoicepdf3 = async (items, customer, mainitem) => {


    const items1 = generateDummyData();
    console.log('checking original items ', items1);
    console.log("checking items", items);
    console.log("checking customer", customer);

    const doc = new jsPDF({
      orientation: "landscape", // Change orientation to landscape
      unit: "mm",
      format: "a4",
    });

    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const marginTop = 15;

    let tableHeight = 170; // Fixed table height
    let currentY = marginTop;

    const maxStones = Math.max(...items.map((item) => item.Stones.length));

    console.log("chek maxstones ", maxStones);

    doc.setFontSize(12)
doc.setFont('sanserif', 'bold');
doc.text(`Customer Name: ${customer.FirstName}`, 10, 10)


    // Adjusted column positions for a landscape layout and wider stones columns
    const columnPositions = {
      sr: 10, // Start from 10mm
      Design: 20,
      productDetails: 40,
      Gwt: 75,
      stones: 95, // Widen the "stones" column
      nwt: 178,
      stoneamt: 198, // Widen the "stoneamt" column
    };

    // Draw the table structure dynamically
    const drawTableStructure = () => {
      Object.values(columnPositions).forEach((pos) => {
        doc.line(pos, marginTop, pos, marginTop + tableHeight); // Column separators
      });
      doc.line(
        pageWidth - 10,
        marginTop,
        pageWidth - 10,
        marginTop + tableHeight
      ); // Right border
    };

    const stoneWeightSpace = columnPositions.nwt - columnPositions.stones;
    const stoneAmountSpace = pageWidth - columnPositions.stoneamt - 10;

    // Dynamic cell width for stones
    const stoneWeightCellWidth = stoneWeightSpace / maxStones;
    const stoneAmountCellWidth = stoneAmountSpace / maxStones;

    const drawTableHeader = () => {
      doc.setFontSize(10);
      doc.line(columnPositions.sr, currentY, pageWidth - 10, currentY); // Table header top line
      currentY += 5;

      // Draw the header text
      doc.text("Sr", columnPositions.sr + 2, currentY);
      doc.text("Design", columnPositions.Design + 2, currentY);
      doc.text("Product Details", columnPositions.productDetails + 2, currentY);
      doc.text("G Wt", columnPositions.Gwt + 2, currentY);
      doc.text("Stones Wt", columnPositions.stones + 2, currentY); // Adjusted position for Stones Wt
      doc.text("N Wt", columnPositions.nwt + 2, currentY);
      doc.text("Stones Amount", columnPositions.stoneamt + 2, currentY); // Adjusted position for Stones Amount

      currentY += 1;
      doc.line(columnPositions.sr, currentY + 5, pageWidth - 10, currentY + 5); // Table header bottom line

      // Print dynamic stone names for "Stones Wt" sub-columns
      for (let i = 0; i < maxStones; i++) {
        const stoneWeightX = columnPositions.stones + i * stoneWeightCellWidth;
        doc.line(
          stoneWeightX,
          currentY + 5,
          stoneWeightX,
          marginTop + tableHeight
        );
      }

      // Print dynamic stone names for "Stones Amount" sub-columns
      for (let i = 0; i < maxStones; i++) {
        const stoneAmountX =
          columnPositions.stoneamt + i * stoneAmountCellWidth;
        doc.line(
          stoneAmountX,
          currentY + 5,
          stoneAmountX,
          marginTop + tableHeight
        );
      }

      // Print dynamic stone names for "Stones Wt" and "Stones Amount" sub-columns
      items.forEach((item) => {
        for (let i = 0; i < item.Stones.length; i++) {
          const stoneName = item.Stones[i].StoneName.slice(0, 3); // Get the stone name from the item data

          // Position stone names under "Stones Wt" column
          const stoneWeightX =
            columnPositions.stones + i * stoneWeightCellWidth;
          doc.text(stoneName, stoneWeightX + 2, currentY + 10);

          // Position stone names under "Stones Amount" column
          const stoneAmountX =
            columnPositions.stoneamt + i * stoneAmountCellWidth;
          doc.text(stoneName, stoneAmountX + 2, currentY + 10);
        }
      });
      if (maxStones > 0) {

      // // Final lines for the last stone sub-columns
      const finalStoneWeightX =
        columnPositions.stones + maxStones * stoneWeightCellWidth;
      const finalStoneAmountX =
        columnPositions.stoneamt + maxStones * stoneAmountCellWidth;

        console.log("maxStones:", maxStones);
console.log("stoneWeightCellWidth:", stoneWeightCellWidth);
console.log("finalStoneWeightX:", finalStoneWeightX);

      doc.line(
        finalStoneWeightX,
        currentY,
        finalStoneWeightX,
        marginTop + tableHeight
      );
      doc.line(
        finalStoneAmountX,
        currentY,
        finalStoneAmountX,
        marginTop + tableHeight
      );

      currentY += 10;
      doc.line(columnPositions.sr, currentY + 5, pageWidth - 10, currentY + 5); // Table header bottom line
      currentY += 5;

      doc.line(
        columnPositions.sr,
        marginTop + tableHeight,
        pageWidth - 10,
        marginTop + tableHeight
      ); // Bottom line
    }

    };

    const drawTableRow = (item, rowIndex) => {
      const rowHeight = 10;
      const startY = currentY + 10;

      // Print row number (Sr)
      doc.text(`${rowIndex + 1}`, columnPositions.sr + 2, startY);

      // Print Design (assuming the item has a design property)
      doc.text(item.ItemCode || "", columnPositions.Design + 2, startY);

      // Print Product Details
      doc.text(
        item.ProductName || "",
        columnPositions.productDetails + 2,
        startY
      );

      // Print G Wt (Gross Weight)
      doc.text(item.GrossWt || "0.00", columnPositions.Gwt + 2, startY);

      // Print Stones Wt (for each stone in item)
      item.Stones.forEach((stone, index) => {
        const stoneWeightX =
          columnPositions.stones + index * stoneWeightCellWidth;
        doc.text(stone.StoneWeight, stoneWeightX + 2, startY);
      });

      // Print N Wt (Net Weight)
      doc.text(item.NetWt || "0.00", columnPositions.nwt + 2, startY);

      // Print Stones Amount (for each stone in item)
      item.Stones.forEach((stone, index) => {
        const stoneAmountX =
          columnPositions.stoneamt + index * stoneAmountCellWidth;
        doc.text(stone.StoneAmount, stoneAmountX + 2, startY);
      });

      currentY += rowHeight; // Move to the next row position
    };

  

    const drawTableContent = () => {
        const rowHeight = 10; // Set row height here for consistency
        const maxRowsPerPage = 14; // Maximum rows per page
      
        let currentPageItems = []; // To store items for the current page
        let pageIndex = 0; // To track the current page index
        let globalRowIndex = 0; // To track the overall row index (for Sr number)
      
        let grandTotalGrossWt = 0;
        let grandTotalNetWt = 0;
        let grandTotalStonesWt = Array(maxStones).fill(0); // Array for each stone's total weight
        let grandTotalStonesAmt = Array(maxStones).fill(0); // Array for each stone's total amount
      
        // Split items into groups of 7 per page
        for (let i = 0; i < items.length; i += maxRowsPerPage) {
          currentPageItems = items.slice(i, i + maxRowsPerPage); // Get 7 items for the current page
      
          // If it's not the first page, add a new page and re-draw header and structure
          if (pageIndex > 0) {
            doc.addPage();
            tableHeight = 100;
            currentY = marginTop; // Reset Y position on new page
            drawTableHeader(); // Re-draw the header on the new page
            drawTableStructure(); // Re-draw the table structure on the new page
          }
      
          // Draw the rows for the current page
          currentPageItems.forEach((item, index) => {
            drawTableRow(item, globalRowIndex); // Pass the global index for Sr number
            grandTotalGrossWt += parseFloat(item.GrossWt);
            grandTotalNetWt += parseFloat(item.NetWt);
      
            // Add up stone weights and amounts for each item
            item.Stones.forEach((stone, index) => {
              grandTotalStonesWt[index] += parseFloat(stone.StoneWeight);
              grandTotalStonesAmt[index] += parseFloat(stone.StoneAmount); // Sum up the stone amounts
            });
      
            globalRowIndex++; // Increment the global index after each row
          });
      
          pageIndex++; // Move to the next page
        }
      
        // Draw the Grand Total row at the bottom
        if (currentY + rowHeight > pageHeight - 30) {
          doc.addPage();
          currentY = marginTop; // Reset Y position on new page
          drawTableHeader(); // Re-draw the header on the new page
          drawTableStructure(); // Re-draw the table structure on the new page
        }
      
        // Print the "Grand Total" row
        doc.setFont("sanserif", "bold");
        currentY += rowHeight;
        doc.text("Grand ", columnPositions.sr + 15, currentY);
        doc.text("Total ", columnPositions.sr + 15, currentY + 5);
      
        // Print Gross Total
        doc.text(grandTotalGrossWt.toFixed(2), columnPositions.Gwt + 2, currentY);
      
        // Print Stones Total (for each stone column)
        for (let i = 0; i < maxStones; i++) {
          const stoneWeightX = columnPositions.stones + i * stoneWeightCellWidth;
          doc.text(grandTotalStonesWt[i].toFixed(2), stoneWeightX + 2, currentY); // Stone weight total
      
          const stoneAmountX = columnPositions.stoneamt + i * stoneAmountCellWidth;
          doc.text(grandTotalStonesAmt[i].toFixed(2), stoneAmountX, currentY); // Stone amount total
        }
      
        // Print Net Total
        doc.text(grandTotalNetWt.toFixed(2), columnPositions.nwt + 3, currentY);
      
        currentY += rowHeight; // Move down to the next row after Grand Total
      
        doc.line(10, currentY - 17, 287, currentY - 17);
      };
      
      
  
    drawTableHeader();
    drawTableStructure();
    drawTableContent();


    const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );

    // const pdfData = doc.output("dataurlnewwindow");
    // const newWindow = window.open();
    // newWindow.document.write(
    //   `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
    // );

}

const generateinvoicepdf3old = async (items1, customer, mainitem) => {

  const items = generateDummyData();
  console.log(items);
  console.log("checking items", items);
  console.log("checking customer", customer);

  const doc = new jsPDF({
    orientation: "landscape", // Change orientation to landscape
    unit: "mm",
    format: "a4",
  });

  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const marginTop = 80;
  const tableHeight = 100; // Fixed table height
  let currentY = marginTop;

  const maxStones = Math.max(...items.map(item => item.stones.length));

  console.log('chek maxstones ', maxStones)

  // Adjusted column positions for a landscape layout and wider stones columns
  const columnPositions = {
    sr: 10, // Start from 10mm
    Design: 20,
    productDetails: 40,
    Gwt: 75,
    stones: 95, // Widen the "stones" column
    nwt: 178,
    stoneamt: 198, // Widen the "stoneamt" column
  };

  // Draw the table structure dynamically
  const drawTableStructure = () => {
    Object.values(columnPositions).forEach((pos) => {
      doc.line(pos, marginTop, pos, marginTop + tableHeight); // Column separators
    });
    doc.line(pageWidth - 10, marginTop, pageWidth - 10, marginTop + tableHeight); // Right border
  };

  const stoneWeightSpace = columnPositions.nwt - columnPositions.stones;
  const stoneAmountSpace = pageWidth - columnPositions.stoneamt - 10;

  // Dynamic cell width for stones
  const stoneWeightCellWidth = stoneWeightSpace / maxStones;
  const stoneAmountCellWidth = stoneAmountSpace / maxStones;
  const drawTableHeader = () => {
    doc.setFontSize(10);
    doc.line(columnPositions.sr, currentY, pageWidth - 10, currentY); // Table header top line
    currentY += 5;

    // Draw the header text
    doc.text("Sr", columnPositions.sr + 2, currentY);
    doc.text("Design", columnPositions.Design + 2, currentY);
    doc.text("Product Details", columnPositions.productDetails + 2, currentY);
    doc.text("G Wt", columnPositions.Gwt + 2, currentY);
    doc.text("Stones Wt", columnPositions.stones + 2, currentY); // Adjusted position for Stones Wt
    doc.text("N Wt", columnPositions.nwt + 2, currentY);
    doc.text("Stones Amount", columnPositions.stoneamt + 2, currentY); // Adjusted position for Stones Amount


    currentY += 1;
    doc.line(columnPositions.sr, currentY + 5, pageWidth - 10, currentY + 5); // Table header bottom line


    // Print dynamic stone names for "Stones Wt" sub-columns
    for (let i = 0; i < maxStones; i++) {
      const stoneWeightX = columnPositions.stones + i * stoneWeightCellWidth;
      // doc.text(`Stone ${i + 1}`, stoneWeightX + 2, currentY); // Replace with stone names as needed
      doc.line(stoneWeightX, currentY + 5, stoneWeightX, marginTop + tableHeight);
    }

    // Print dynamic stone names for "Stones Amount" sub-columns
    for (let i = 0; i < maxStones; i++) {
      const stoneAmountX = columnPositions.stoneamt + i * stoneAmountCellWidth;
      // doc.text(`Stone ${i + 1}`, stoneAmountX + 2, currentY); // Replace with stone names as needed
      doc.line(stoneAmountX, currentY + 5, stoneAmountX, marginTop + tableHeight);
    }

    // Print dynamic stone names for "Stones Wt" and "Stones Amount" sub-columns
    items.forEach((item) => {
      for (let i = 0; i < item.stones.length; i++) {
        const stoneName = item.stones[i].stonename.slice(0, 3);; // Get the stone name from the item data

        // Position stone names under "Stones Wt" column
        const stoneWeightX = columnPositions.stones + i * stoneWeightCellWidth;
        doc.text(stoneName, stoneWeightX + 2, currentY + 10);

        // Position stone names under "Stones Amount" column
        const stoneAmountX = columnPositions.stoneamt + i * stoneAmountCellWidth;
        doc.text(stoneName, stoneAmountX + 2, currentY + 10);
      }

    });

    // Final lines for the last stone sub-columns
    const finalStoneWeightX = columnPositions.stones + maxStones * stoneWeightCellWidth;
    const finalStoneAmountX = columnPositions.stoneamt + maxStones * stoneAmountCellWidth;

    doc.line(finalStoneWeightX, currentY, finalStoneWeightX, marginTop + tableHeight);
    doc.line(finalStoneAmountX, currentY, finalStoneAmountX, marginTop + tableHeight);


    currentY += 10;
    doc.line(columnPositions.sr, currentY + 5, pageWidth - 10, currentY + 5); // Table header bottom line
    currentY += 5;

    doc.line(columnPositions.sr, marginTop + tableHeight, pageWidth - 10, marginTop + tableHeight); // Bottom line
  };

  const drawTableRow = (item, rowIndex) => {
    const rowHeight = 10;
    const startY = currentY+10;

    // Print row number (Sr)
    doc.text(`${rowIndex + 1}`, columnPositions.sr + 2, startY);

    // Print Design (assuming the item has a design property)
    doc.text(item.design || '', columnPositions.Design + 2, startY);

    // Print Product Details
    doc.text(item.productdetail || '', columnPositions.productDetails + 2, startY);

    // Print G Wt (Gross Weight)
    doc.text(item.grosswt || '0.00', columnPositions.Gwt + 2, startY);

    // Print Stones Wt (for each stone in item)
    item.stones.forEach((stone, index) => {
      const stoneWeightX = columnPositions.stones + index * stoneWeightCellWidth;
      doc.text(stone.stoneweight, stoneWeightX + 2, startY);
    });

    // Print N Wt (Net Weight)
    doc.text(item.netwt || '0.00', columnPositions.nwt + 2, startY);

    // Print Stones Amount (for each stone in item)
    item.stones.forEach((stone, index) => {
      const stoneAmountX = columnPositions.stoneamt + index * stoneAmountCellWidth;
      doc.text(stone.stoneweight, stoneAmountX + 2, startY);
    });

    currentY += rowHeight; // Move to the next row position
  };

  const drawTableContent = () => {
    const rowHeight = 10; // Set row height here for consistency
  
  items.forEach((item, index) => {
    if (currentY + rowHeight > pageHeight - 30) {
      // If current Y position + rowHeight will exceed pageHeight, add a new page
      doc.addPage();
      currentY = marginTop; // Reset Y position on new page
      drawTableHeader(); // Re-draw the header on the new page
      drawTableStructure(); // Re-draw the table structure on the new page
    }

    drawTableRow(item, index); // Draw the row after ensuring no overflow
  });
  };

  drawTableHeader();
  drawTableStructure();
  drawTableContent();
  

  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );

}




const generateinvoicepdf6 = async (items, customer, mainitem) => {
  console.log("checking items", items);
  console.log("checking customer", customer);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  const dummyData = generateDummyData();
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const marginTop = 80;
  const marginBottom = 40;
  const rowHeight = 10; // Initial row height
  const tableHeight = 100; // Fixed table height
  let currentY = marginTop;
  const invoicex = pageWidth - 60;
  const invoicey = 60;
  const customerx = pageWidth - 200;
  const customery = 60;
  const fotertotalx = pageWidth - 70;
  const fotertotaly = 180;

  const despx = pageWidth - 70;
  const despy = 250;

  const invoicenumber = `${mainitem.InvoiceNo}`;
  const invoicedate = `${mainitem.InvoiceDate}`
  const firstname = `${customer.FirstName}`;
  const lastname = `${customer.LastName}`;
  const mobile = `${customer.Mobile}`;
  const address = `${customer.CurrAddStreet} ${customer.CurrAddTown} ${customer.CurrAddState}`;

  console.log("checkpagewidth  ", pageWidth);

  // Define the column positions
  const columnPositions = {
    sr: pageWidth - 200,
    productDetails: pageWidth - 185,
    // pcs: pageWidth-150,
    hsnCode: pageWidth - 125,
    purity: pageWidth - 100,
    // price: pageWidth - 90,
    qty: pageWidth - 60,
    amount: pageWidth - 40,
  };

  // Draw the table structure dynamically
  const drawTableStructure = () => {
    // Vertical Lines (for column separators)
    // doc.line(10, marginTop, 10, marginTop + tableHeight); // Left border
    Object.values(columnPositions).forEach((pos) => {
      doc.line(pos, marginTop, pos, marginTop + tableHeight); // Column separators
    });
    doc.line(
      pageWidth - 10,
      marginTop,
      pageWidth - 10,
      marginTop + tableHeight
    ); // Right border
  };



  const drawTableHeader = () => {
    doc.setFontSize(10);
    doc.line(columnPositions.sr, currentY, pageWidth - 10, currentY); // Table header top line
    currentY += 5;

    // Draw the header text
    doc.text("Sr.", columnPositions.sr + 2, currentY);
    doc.text("Product Details", columnPositions.productDetails + 2, currentY);
    // doc.text('Pcs', columnPositions.pcs+2, currentY);
    doc.text("HSN Code", columnPositions.hsnCode + 2, currentY);
    doc.text("Purity", columnPositions.purity + 2, currentY);
    // doc.text('Gross Wt', columnPositions.grossWt+2, currentY);
    // doc.text('Net Wt', columnPositions.netWt+2, currentY);
    // doc.text("Metal Amt", columnPositions.price + 2, currentY);
    doc.text("Qty", columnPositions.qty + 2, currentY);
    // doc.text('Rate / gm', columnPositions.rate+2, currentY);
    doc.text("Total Amt", columnPositions.amount + 2, currentY);

    currentY += 5;
    doc.line(columnPositions.sr, currentY, pageWidth - 10, currentY); // Table header bottom line
    currentY += 5;

    doc.line(
      columnPositions.sr,
      marginTop + tableHeight,
      pageWidth - 10,
      marginTop + tableHeight
    ); // Table header top line
  };

  const totalAmount = Number(mainitem.TotalAmount) || 0;
  const gstAmount = Number(mainitem.GST) || 0;
  const receivedAmount = Number(mainitem.ReceivedAmount) || 0;

  // Calculate CGST, SGST, total invoice amount, and balance amount
  const cgst = (totalAmount * 1.5) / 100; // CGST @1.5%
  const total = totalAmount + gstAmount; // Total Invoice Amount
  const bal = total - receivedAmount; // Balance Amount

  // Format amounts to two decimal places for better precision
  const formatAmount = (amount) => amount.toFixed(2);

  const drawFooter = () => {
    // Taxable Amount
    doc.text(
      `Taxable Amount : ${formatAmount(totalAmount)}`,
      fotertotalx,
      fotertotaly + 10
    );

    // CGST and SGST (assuming both are calculated similarly)
    doc.text(
      `CGST @ 1.5% : ${formatAmount(cgst)}`,
      fotertotalx,
      fotertotaly + 15
    );
    doc.text(
      `SGST @ 1.5% : ${formatAmount(cgst)}`,
      fotertotalx,
      fotertotaly + 20
    );

    // IGST (3% assumed)
    // doc.text(
    //   `IGST @ 3% : ${formatAmount(gstAmount)}`,
    //   fotertotalx,
    //   fotertotaly + 25
    // );

    // Total Invoice Amount
    doc.text(
      `Total Invoice Amount : ${formatAmount(total)}`,
      fotertotalx,
      fotertotaly + 30
    );

    // Amount Received
    doc.text(
      `Amount Received : ${formatAmount(receivedAmount)}`,
      fotertotalx,
      fotertotaly + 35
    );

    // Balance Amount (Handle negative balance if any)
    const balanceText =
      bal >= 0 ? formatAmount(bal) : `-${formatAmount(Math.abs(bal))}`;
    doc.text(`Balance Amount : ${balanceText}`, fotertotalx, fotertotaly + 40);

    const thankYouText = "Thank You For Your Business, God Bless Keep Buying";
    doc.setFontSize(15);

    // Calculate the text width to center it
    const textWidth = doc.getTextWidth(thankYouText);
    const centerX = (pageWidth - textWidth) / 2; // Calculate the x position for center alignment

    // Draw the centered text
    doc.text(thankYouText, centerX, fotertotaly + 50);
    doc.setFontSize(10);
    doc.text("Declaration :", customerx, fotertotaly + 55);
    const declarationText =
      "I declare that this invoice shows the actual price of the goods described and that all particulars are true and correct. I received ornament in good condition";
    const splitText = doc.splitTextToSize(declarationText, 80); // Adjust 180 to the width you want
    doc.setFontSize(10);
    doc.text(splitText, customerx, fotertotaly + 60);

    doc.setFontSize(10);
    doc.text(
      "For Mewar Jewellery House Pvt Ltd",
      fotertotalx,
      fotertotaly + 60
    );

    doc.text("Authorised Signature", fotertotalx, fotertotaly + 86);
    doc.text("Customer Signatory", customerx, fotertotaly + 86);

    doc.line(customerx, fotertotaly + 90, fotertotalx + 60, fotertotaly + 90);

    const ctext = "1st Floor, 1/1, 2nd cross Vasanthappa Thota Ganganagar Banglore-560032"
    const splitText1 = doc.splitTextToSize(ctext, 80); // Adjust 180 to the width you want
    doc.text(splitText1, customerx, fotertotaly + 95);
    const stext = "Contact Us : 080 23333409/080 41515409"
    const s1text = "Email: jewels@kevali.in"
    const s2text = "Instagram: kevali.in"
    const splitText2 = doc.splitTextToSize(stext, 80); // Adjust 180 to the width you want
    doc.text(stext, fotertotalx-6, fotertotaly + 95);
    doc.text(s1text, fotertotalx-6, fotertotaly + 100);
    doc.text(s2text, fotertotalx-6, fotertotaly + 105);


  };

  const drawTableRows = () => {
    items.forEach((item, index) => {
      // Determine text lines and adjust currentY for each row
      const productDetailsLines = doc.splitTextToSize(
        item.ProductName,
        columnPositions.amount - columnPositions.productDetails - 5
      ); // Adjust width as needed
      const rowCount = Math.max(
        productDetailsLines.length,
        1 // To ensure there's at least one row
      );

      if (currentY + (rowCount + rowHeight) > pageHeight - marginBottom) {
        doc.addPage(); // Add a new page if needed
        currentY = marginTop;
        drawTableHeader();
        drawTableStructure();
      }

      // Draw row data
      doc.text(`${index + 1}`, columnPositions.sr + 2, currentY);
      productDetailsLines.forEach((line, lineIndex) => {
        doc.text(
          line,
          columnPositions.productDetails + 2,
          currentY + lineIndex * rowHeight
        );
      });
      // doc.text(item.Quantity || '1', columnPositions.pcs+2, currentY);
      doc.text("7113", columnPositions.hsnCode + 2, currentY);
      doc.text(item.Purity || "NA", columnPositions.purity + 2, currentY);
      // doc.text( item.Price || "NA", columnPositions.price + 2, currentY);
      doc.text(item.Quantity || "NA", columnPositions.qty + 2, currentY);
      doc.text(item.Price || "NA", columnPositions.amount + 2, currentY);

      // Update currentY based on the row count
      currentY += rowCount * rowHeight; // Adjust currentY based on the number of lines
    });
  };



  const getImageBase64 = (imagePath) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imagePath; // This path should point to the public folder image
      img.crossOrigin = "Anonymous";  // Ensure CORS issues don't block loading
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg');  // Convert to Base64
        resolve(dataURL);
      };
      img.onerror = (err) => reject(err);
    });
  };

  try {
    // Get the Base64 string of the image
    const imageBase64 = await getImageBase64('/images/pdfimages/7.png'); // Adjust path accordingly

    // Add the image to the PDF at specified coordinates (x, y, width, height)
    // const x = (pageWidth - 40) / 2;

    // doc.addImage(imageBase64, 'JPEG', x, 2, 40, 40);
    const imageWidth = 40;
    const imageX = (pageWidth - imageWidth) / 2; // Center horizontally
    const imageY = 5; // Adjust the y-coordinate as needed

    // Add the image to the PDF
    doc.addImage(imageBase64, 'JPEG', imageX, imageY, imageWidth, 40);

  } catch (error) {
    console.error("Error loading image:", error);
  }

  const text = "TAX INVOICE";
  const textWidth = doc.getTextWidth(text); // Get the width of the text
  const textX = (pageWidth - textWidth) / 2; // Center horizontally
  const textY = 50; // Adjust the Y position as needed (below the image)

  // Add centered "TAX INVOICE" text
  doc.text(text, textX, textY);

  // Start generating the PDF
  // doc.text("TAX INVOICE", 90, 49);
  doc.setFontSize(10);
  doc.text("GSTIN :- 29AASCM4571D1Z2", invoicex, invoicey);
  doc.text("Invoice No :-", invoicex, invoicey+5);
  doc.text(invoicenumber, invoicex + 20, invoicey+5);
  // doc.text("Date :-", invoicex, invoicey + 5);
  doc.text(`Date :- ${invoicedate}`, invoicex, invoicey + 9);

  doc.text("Invoice To", customerx, customery);

  doc.text(`Customer Name : ${firstname} ${lastname}`, customerx, customery + 5);
  // doc.text(``, customerx + 28, customery + 5);
  doc.text(`Mobile No     : ${mobile}`, customerx, customery + 10);
  // doc.text(``, customerx + 28, customery + 10);
  doc.text(`Address       : ${address}`, customerx, customery + 15);
  // doc.text(``, customerx + 28, customery + 15);

  drawTableHeader();
  drawTableStructure();
  drawTableRows();

  // Add the footer to the last page
  drawFooter();

  // Open the PDF
  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );
};




const generateinvoicepdf7 = (items, customer, mainitem) => {

  const {
    InvoiceNo,
    InvoiceDate,
    ProductName,
    HSNCode,
    Purity,
    Qty,
    GrossWt,
    StoneWt,
    NetWt,
    StoneAmount,
    MakingPerGram,
    TotalAmount,
    GST } = mainitem

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.width; // Get the page width

  const startx = 2
  const starty = 54.5
  const boxTopMargin = starty + 10; // Top margin for the box
  const boxPadding = 5; // Padding on both sides
  const boxWidth = pageWidth - 2 * boxPadding; // Calculate box width with padding
  const boxHeight = 40;


  doc.line(0, starty, 210, starty); // From (10, 50) to (200, 50)

  // doc.setFont("sanserif", "bold");
  // doc.setFontSize(16);
  // doc.setTextColor(0, 0, 0);
  // doc.text("GOLD SALE", 90, 43);

  const pan = customer.PanNo || "NA";
  const adhar = customer.AadharNo || "NA";
  const mobile = customer.Mobile || "NA";
  const address = customer.CurrAddStreet || "NA";

  // First column data
  const firstColumn = [
    { label: "Name      : ", value: `${customer.FirstName}` },
    { label: "Address   : ", value: `${address}` },
    { label: "Mobile    : ", value: `${mobile}` },
    { label: "Pan/Adhar : ", value: `${pan} / ${adhar}` },
  ];

  // Second column data
  const secondColumn = [
    { label: "Invoice No  : ", value: `${InvoiceNo}` },
    { label: "Date        : ", value: `${InvoiceDate}` },
    { label: "GSTIN No    : ", value: "27ABXPM4841M1ZS" },
    { label: "GSTIN Type  : ", value: "CGST + SGST + IGST" },
  ];




  doc.setLineWidth(0.3);
  doc.rect(boxPadding, boxTopMargin, boxWidth, boxHeight); // Create a box with the calculated width and height of 40
// Draw content inside the box
doc.setFont("sanserif", "bold");
doc.setFontSize(16);
doc.text("GOLD SALE", boxPadding + (boxWidth / 2) - 20, boxTopMargin-3); // Centered "GOLD SALE" text

// Set Font for content
// doc.setFontSize(12);
doc.setFontSize(10);
doc.setFont("sanserif", "bold");
// Draw first column data
let columnY = boxTopMargin + 8;
firstColumn.forEach((item) => {
  doc.text(`${item.label}${item.value}`, boxPadding + 2, columnY);
  columnY += 6;
});

// Draw second column data
columnY = boxTopMargin + 8;
secondColumn.forEach((item) => {
  doc.text(`${item.label}${item.value}`, boxPadding + boxWidth / 2 + 25, columnY);
  columnY += 6;
});

 
//main tbale
// Now creating the attached table box for items
const tableStartY = starty + boxHeight + 10; // Start below the first box
const tableHeight = 80;

doc.rect(boxPadding, tableStartY, boxWidth, tableHeight); // Draw the outer box for the table

// Column widths and labels
const columnWidths = {
  Item: 36.18,
  HSN: 16.18,
  Purity: 13.18,
  Qty: 12.18,
  "G wt": 15.18,
  "Stone wt": 17.18,
  "Net wt": 15.18,
  "St amt": 15.18,
  "Rate/gm": 18.18,
  "Making": 21.18,
  Amount: 20.18,
};

const columnArray = [
  "Item",
  "HSN",
  "Purity",
  "Qty",
  "G wt",
  "Stone wt",
  "Net wt",
  "St amt",
  "Rate/gm",
  "Making",
  "Amount",
];


const cGst = (GST || 0) / 2;

  const cGstFX = cGst.toFixed(2)

  const sGst = (GST || 0) / 2;

  const sGstFx = sGst.toFixed(2)
const totalAmountNumber = Number(TotalAmount);
const GSTNumber = Number(GST);

const leftColumn = [
  { label: "Gross Amount", value: `${totalAmountNumber.toFixed(2)}` },
  { label: "CGST 1.5%", value: `${Number(cGst).toFixed(2)}` },
  { label: "SGST 1.5%", value: `${Number(cGst).toFixed(2)}` },
  { label: "IGST 3%", value: `${GSTNumber.toFixed(2)}` },
  { label: "Hallmarking Amount", value: "" },
  { label: "Purchase Amount (-)", value: `${(totalAmountNumber + GSTNumber).toFixed(2)}` },
  { label: "RO/Discount (-)", value: "" },
  { label: "Net Amount", value: `${(totalAmountNumber + GSTNumber).toFixed(2)}` },
];

 // Dummy values for the right column
 const rightColumnValues = [
  `${totalAmountNumber.toFixed(2)}`,
  `${Number(cGstFX).toFixed(2)}`,
  `${Number(sGstFx).toFixed(2)}`,
  `${GSTNumber.toFixed(2)}`,
  "",
  `${(totalAmountNumber + GSTNumber).toFixed(2)}`,
  "",
  `${(totalAmountNumber + GSTNumber).toFixed(2)}`
];


// Table Headers
let startX = boxPadding + 2; // Starting X position for table
let headerY = tableStartY + 7; // Starting Y position for the headers

doc.setFontSize(10);
columnArray.forEach((col) => {
  doc.text(col, startX, headerY);
  startX += columnWidths[col]; // Move X based on column width
});

// Draw vertical lines separating columns
let columnX =boxPadding;// startx + 2;
columnArray.forEach((col) => {
  doc.line(columnX, tableStartY, columnX, tableStartY + tableHeight); // Draw vertical lines
  columnX += columnWidths[col];
});

// Draw the right border for the table
doc.line(boxPadding, tableStartY, boxPadding, tableStartY + tableHeight);

doc.line(boxPadding, tableStartY+10, boxPadding + boxWidth, tableStartY+10);

// Render table content
let rowStartY = headerY + 10;
// startX = boxPadding+2;
items.forEach((item) => {

  if (item.ProductName.toLowerCase() === "old gold") {
    return; // Skip to the next item
  }
  let startX = boxPadding + 2; // Reset startX for each new row

  const itemData = [
    item.ProductName,
    item.HSNCode,
    item.Purity,
    "1",
    item.GrossWt,
    item.TotalStoneWeight,
    item.NetWt,
    item.TotalStoneAmount,
    item.MetalRate,
    item.MakingPercentage,
    item.Price,
  ];


  // Render each column's data for the current row
  itemData.forEach((data, index) => {
    doc.text(`${data}`, startX, rowStartY);
    startX += columnWidths[columnArray[index]]; // Move to the next column
  });

  rowStartY += 10; // Move to the next row
});



const startX4 = 135; // Starting X position for the table
const startY4 = 185; // Starting Y position for the table
const tableWidth4 = 70; // Table width
const tableHeight4 = 80; // Table height (adjust based on number of rows)
const cellHeight4 = 10; // Height for each cell row
const verticalLineX = startX4 + tableWidth4 / 2; // X position for the center vertical line

doc.setLineWidth(0.3);
doc.rect(startX4, startY4, tableWidth4, tableHeight4); // Outer table border

// Draw vertical line at the center
doc.line(verticalLineX, startY4, verticalLineX, startY4 + tableHeight4); // Vertical line splitting the table

// Fill in the left column labels and right column dummy values
leftColumn.forEach((row, index) => {
  const ypos = startY4 + (index + 1) * cellHeight4 - 3; // Y position for the text

  // Draw left side labels
  doc.setFontSize(10);
  doc.setFont("sanserif", "bold");
  doc.text(`${row.label}`, startX4 + 2, ypos);

  // Draw right side dummy values
  const rightValue = rightColumnValues[index];
  doc.setFont("sanserif", "normal");
  doc.text(`${rightValue}`, verticalLineX + 2, ypos); // Right side column values

  // Draw horizontal line after each cell
  doc.line(startX4, ypos + 3, startX4 + tableWidth4, ypos + 3); // Horizontal line across the row
});




// Draw bottom border for the table

  //draw cash table
  doc.setFont("sanserif", "bold");

  // Now create a second section with two columns: "Cash" and its amount
  const cashSectionX = 5; // Starting X position for the cash section
  const cashSectionY = 199;
  const cashCellWidth = 50; // Width of each column for the cash table

  // Draw the "Cash" label cell
  doc.setFontSize(10);
  doc.setFont("sanserif", "bold");
  doc.text(
    "Cash",
    cashSectionX + cashCellWidth / 2 - doc.getTextWidth("Cash") / 2,
    cashSectionY + 7
  ); // Center text in the first column

  // Draw the "Cash" amount cell
  doc.text(
    "",
    cashSectionX +
    cashCellWidth +
    cashCellWidth / 2 -
    doc.getTextWidth("1000") / 2,
    cashSectionY + 7
  ); // Center text in the second column

  // Draw the outer border of the cash and amount cells
  doc.rect(cashSectionX, cashSectionY, cashCellWidth, 10); // Border for "Cash" label
  doc.rect(cashSectionX + cashCellWidth, cashSectionY, cashCellWidth, 10); // Border for the amount

  doc.setFont("sanserif", "normal");
  doc.setFontSize(10);
  doc.text("Billng By - Admin", 100, 220);

  doc.setFont("sanserif", "normal");
  doc.setFontSize(10);
  doc.text(
    "note:- we declare that this invoice shows actual price of the good described ",
    5,
    240
  );

  doc.setFont("sanserif", "normal");
  doc.setFontSize(10);
  doc.text("and that all particulars are true and correct", 5, 245);

  doc.setFont("sanserif", "bold");
  doc.setFontSize(10);
  doc.text("Customer Sign", 10, 285);

  doc.setFont("sanserif", "bold");
  doc.setFontSize(10);
  doc.text("(Saturday Closed )", 70, 285);

  doc.setFont("sanserif", "bold");
  doc.setFontSize(10);
  doc.text("Thank You !", 70, 290);

  doc.setFont("sanserif", "bold");
  doc.setFontSize(10);
  doc.text("For Mundlik Jewellers", 150, 285);





  // Generate the PDF and open it in a new window
  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );


}

const generateinvoicepdf7old = (items, customer, mainitem) => {

  const {
    InvoiceNo,
    InvoiceDate,
    ProductName,
    HSNCode,
    Purity,
    Qty,
    GrossWt,
    StoneWt,
    NetWt,
    StoneAmount,
    MakingPerGram,
    TotalAmount,
    GST } = mainitem


  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Draw a horizontal line
  doc.line(0, 50, 210, 50); // From (10, 50) to (200, 50)

  doc.setFont("sanserif", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("GOLD SALE", 90, 53);

  let pan;
  let adhar;
  let mobile;
  let address;

  customer.PanNo;
  customer.AadharNo;

  if (customer.PanNo) {
    pan = customer.PanNo;
  } else {
    pan = "NA";
  }

  if (customer.AadharNo) {
    adhar = customer.AadharNo;
  } else {
    adhar = "NA";
  }

  if (customer.Mobile) {
    mobile = customer.Mobile;
  } else {
    mobile = "NA";
  }

  if (customer.CurrAddStreet) {
    address = customer.CurrAddStreet;
  } else {
    address = "NA";
  }

  // First column data
  const firstColumn = [
    { label: "Name", value: `${customer.FirstName}` },
    { label: "Address", value: `${address}` },
    { label: "Mobile", value: `${mobile}` },
    { label: "Pan/Adhar", value: `${pan} / ${adhar}` },
  ];

  // Second column data
  const secondColumn = [
    { label: "Invoice No:", value: `${InvoiceNo}` },
    { label: "Date:", value: `${InvoiceDate}` },
    { label: "GSTIN No:", value: "27ABXPM4841M1ZS" },
    { label: "GSTIN Type:", value: "CGST + SGST + IGST" },
  ];

  // Set table starting position and dimensions
  const startX = 5;
  const startY = 50.8;
  const cellWidth = 80;
  const cellHeight = 10;

  doc.setLineWidth(0.3);
  doc.rect(startX, startY, 200, 40);

  // Define custom widths for each column
  const columnWidths = {
    Item: 36.18,
    HSN: 16.18,
    Purity: 13.18,
    Qty: 12.18,
    "Gr wt": 15.18,
    "Stone wt": 17.18,
    "Net wt": 15.18,
    "St amt": 15.18,
    "Rate/gm": 18.18,
    "Making/gm": 21.18,
    Amount: 20.18,
  };

  const columnArray = [
    "Item",
    "HSN",
    "Purity",
    "Qty",
    "Gr wt",
    "Stone wt",
    "Net wt",
    "St amt",
    "Rate/gm",
    "Making/gm",
    "Amount",
  ];

  // Calculate the starting X position for each column
  let currentX = 5;
  const tableWidth = 200; // Total width for the table

  // Draw the table header and vertical lines, and center the text in each column
  columnArray.forEach((title, index) => {
    const columnWidth = columnWidths[title] || 20; // Default to 20mm if not specified

    // Calculate the position to center the text in the column
    // const textX = currentX + columnWidth / 2 - doc.getTextWidth(title) / 2;

    const textX = currentX + 1;
    const cellY = 90; // Adjusted Y position to place text within the cell

    // Draw the centered text inside the cells
    doc.setFontSize(11);
    doc.setFont("sanserif", "bold");
    doc.text(title, textX, cellY); // Centered text in the cell

    // Draw the vertical line for each column
    if (index !== 0) {
      doc.line(currentX, 85, currentX, 170); // Vertical line from header to the bottom of the table
    }

    currentX += columnWidth; // Move to the next column position
  });

  // Draw the bottom line of the header row
  doc.rect(5, 85, tableWidth, 10); // Header bottom line

  // Body (you can add data here as needed)
  firstColumn.forEach((row, index) => {
    const ypos = startY + (index + 0.7) * cellHeight;

    doc.setFontSize(10);
    doc.setFont("sanserif", "bold");
    doc.text(`${row.label} :`, startX + 2, ypos);
    doc.text(row.value, startX + cellWidth / 2, ypos); // Centered within the first column
  });

  secondColumn.forEach((row, index) => {
    const ypos = startY + (index + 0.7) * cellHeight;

    doc.setFontSize(10);
    doc.setFont("sanserif", "bold");
    doc.text(`${row.label}`, 60 + cellWidth + 2, ypos); // Left padding of 2 in the second column
    doc.text(row.value, startX + (cellWidth * 4) / 2, ypos); // Centered within the second column
  });

  // Draw the outer table border (adjust height to fit the table content)
  doc.rect(5, 85, tableWidth, 85);

  const overallStatsTable = ["Item", "Net wt", "Gross wt", "Amount"];

  let currentX2 = 5;
  const tableWidth2 = 100;

  const ColumnCount = overallStatsTable.length;
  const ColumnWidth = tableWidth2 / ColumnCount;

  // Draw the table header and vertical lines, and center the text in each column
  overallStatsTable.forEach((title, index) => {
    const textX = currentX2 + ColumnWidth / 2 - doc.getTextWidth(title) / 2;
    const cellY = startY; // Starting Y position for the table header

    // Draw the centered text inside the cells
    doc.setFontSize(10);
    doc.text(title, textX, cellY); // Centered text in the cell

    // // Draw vertical lines for the columns
    if (index !== 0) {
      doc.line(currentX2, 175, currentX2, 195); // Vertical line from header to bottom
    }

    // Move to the next column position
    currentX2 += ColumnWidth;
  });

  // Draw the outer border of the table (header + empty cells)
  doc.rect(5, 175, tableWidth2, 10 + cellHeight); // Table outer border

  // Draw the horizontal line between the header row and the empty cells for values
  doc.line(5, 177 + 10, 5 + tableWidth2, 177 + 10);




  const TableData = [
    {
      Item: `${ProductName}`,
      HSN: `${HSNCode}`,
      Purity: `${Purity}`,
      Qty: `${1}`,
      "Gr wt": `${GrossWt}`,
      "Stone wt": `${StoneWt}`,
      "Net wt": `${NetWt}`,
      "St amt": `${StoneAmount}`,
      "Rate/gm": `${0}`,
      "Making/gm": `${MakingPerGram}`,
      Amount: `${TotalAmount}`,
    },
  ];

  //draw table body
  let bodyY = 100;
  // Populate table body with items data
  items.forEach((rowData) => {
    currentX = 5;

    // Map response fields to table columns
    const row = {
      Item: rowData.ProductName || "N/A",
      HSN: rowData.HSNCode || "N/A",
      Purity: rowData.Purity || "N/A",
      Qty: "1",
      "Gr wt": rowData.GrossWt || "N/A",
      "Stone wt": rowData.TotalStoneWeight || "N/A",
      "Net wt": rowData.NetWt || "N/A",
      "St amt": rowData.TotalStoneAmount || "N/A",
      "Rate/gm": rowData.MetalRate || "N/A",
      "Making/gm": rowData.MakingPerGram || "N/A",
      Amount: rowData.TotalAmount || "N/A",
    };

    columnArray.forEach((col) => {
      const columnWidth = columnWidths[col] || 20;
      doc.setFontSize(10);
      doc.setFont("Sanserif", "normal");
      doc.text(`${row[col]}`, currentX + 1, bodyY);
      currentX += columnWidth;
    });

    bodyY += 10; // Move to the next row
  });

  //draw cash table
  doc.setFont("sanserif", "bold");

  // Now create a second section with two columns: "Cash" and its amount
  const cashSectionX = 5; // Starting X position for the cash section
  const cashSectionY = 199;
  const cashCellWidth = 50; // Width of each column for the cash table

  // Draw the "Cash" label cell
  doc.setFontSize(10);
  doc.setFont("sanserif", "bold");
  doc.text(
    "Cash",
    cashSectionX + cashCellWidth / 2 - doc.getTextWidth("Cash") / 2,
    cashSectionY + 7
  ); // Center text in the first column

  // Draw the "Cash" amount cell
  doc.text(
    "",
    cashSectionX +
    cashCellWidth +
    cashCellWidth / 2 -
    doc.getTextWidth("1000") / 2,
    cashSectionY + 7
  ); // Center text in the second column

  // Draw the outer border of the cash and amount cells
  doc.rect(cashSectionX, cashSectionY, cashCellWidth, 10); // Border for "Cash" label
  doc.rect(cashSectionX + cashCellWidth, cashSectionY, cashCellWidth, 10); // Border for the amount

  //detailed table

  const cGst = (GST || 0) / 2;

  const cGstFX = cGst.toFixed(2)

  const sGst = (GST || 0) / 2;

  const sGstFx = sGst.toFixed(2)





  const totalAmountNumber = Number(TotalAmount);
  const GSTNumber = Number(GST);

  // First column labels for gross amount, taxes, and discounts
  const leftColumn = [
    { label: "Gross Amount", value: `${totalAmountNumber.toFixed(2)}` },
    { label: "CGST 1.5%", value: `${Number(cGst).toFixed(2)}` },
    { label: "SGST 1.5%", value: `${Number(cGst).toFixed(2)}` },
    { label: "IGST 3%", value: `${GSTNumber.toFixed(2)}` },
    { label: "Hallmarking Amount", value: "" },
    { label: "Purchase Amount (-)", value: `${(totalAmountNumber + GSTNumber).toFixed(2)}` },
    { label: "RO/Discount (-)", value: "" },
    { label: "Net Amount", value: `${(totalAmountNumber + GSTNumber).toFixed(2)}` },
  ];

  // Dummy values for the right column
  const rightColumnValues = [
    `${totalAmountNumber.toFixed(2)}`,
    `${Number(cGstFX).toFixed(2)}`,
    `${Number(sGstFx).toFixed(2)}`,
    `${GSTNumber.toFixed(2)}`,
    "",
    `${(totalAmountNumber + GSTNumber).toFixed(2)}`,
    "",
    `${(totalAmountNumber + GSTNumber).toFixed(2)}`
  ];



  // Set table starting position and dimensions
  const startX4 = 135; // Starting X position for the table
  const startY4 = 175; // Starting Y position for the table
  const tableWidth4 = 70; // Table width
  const tableHeight4 = 80; // Table height (adjust based on number of rows)
  const cellHeight4 = 10; // Height for each cell row
  const verticalLineX = startX4 + tableWidth4 / 2; // X position for the center vertical line

  doc.setLineWidth(0.3);
  doc.rect(startX4, startY4, tableWidth4, tableHeight4); // Outer table border

  // Draw vertical line at the center
  doc.line(verticalLineX, startY4, verticalLineX, startY4 + tableHeight4); // Vertical line splitting the table

  // Fill in the left column labels and right column dummy values
  leftColumn.forEach((row, index) => {
    const ypos = startY4 + (index + 1) * cellHeight4 - 3; // Y position for the text

    // Draw left side labels
    doc.setFontSize(10);
    doc.setFont("sanserif", "bold");
    doc.text(`${row.label}`, startX4 + 2, ypos);

    // Draw right side dummy values
    const rightValue = rightColumnValues[index];
    doc.setFont("sanserif", "normal");
    doc.text(`${rightValue}`, verticalLineX + 2, ypos); // Right side column values

    // Draw horizontal line after each cell
    doc.line(startX4, ypos + 3, startX4 + tableWidth4, ypos + 3); // Horizontal line across the row
  });

  doc.setFont("sanserif", "normal");
  doc.setFontSize(10);
  doc.text("Billng By - Admin", 100, 220);

  doc.setFont("sanserif", "normal");
  doc.setFontSize(10);
  doc.text(
    "note:- we declare that this invoice shows actual price of the good described ",
    5,
    240
  );

  doc.setFont("sanserif", "normal");
  doc.setFontSize(10);
  doc.text("and that all particulars are true and correct", 5, 245);

  doc.setFont("sanserif", "bold");
  doc.setFontSize(10);
  doc.text("Customer Sign", 10, 285);

  doc.setFont("sanserif", "bold");
  doc.setFontSize(10);
  doc.text("(Saturday Closed )", 70, 285);

  doc.setFont("sanserif", "bold");
  doc.setFontSize(10);
  doc.text("Thank You !", 70, 290);

  doc.setFont("sanserif", "bold");
  doc.setFontSize(10);
  doc.text("For Mundlik Jewellers", 150, 285);

  // Generate the PDF and open it in a new window
  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );
};

const generateinvoicepdf71 = (items, customer, mainitem) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Draw a horizontal line
  doc.line(0, 35, 210, 35); // From (10, 50) to (200, 50)

  doc.setFont("sanserif", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("GOLD SALE", 90, 43);

  // First column data
  const firstColumn = [
    { label: "Name", value: "" },
    { label: "Address", value: "" },
    { label: "Mobile", value: "" },
    { label: "Pan/Adhar", value: "" },
  ];

  // Second column data
  const secondColumn = [
    { label: "Invoice No:", value: "" },
    { label: "Date:", value: "" },
    { label: "GSTIN No:", value: "" },
    { label: "GSTIN Type:", value: "" },
  ];

  // Set table starting position and dimensions
  const startX = 5;
  const startY = 45;
  const cellWidth = 80;
  const cellHeight = 10;

  doc.setLineWidth(0.3);
  doc.rect(startX, startY, 200, 40);

  // Define custom widths for each column
  const columnWidths = {
    Item: 18.18,
    HSN: 10.18,
    Purity: 15.18,
    Qty: 15.18,
    "Gr wt": 18.18,
    "Stone wt": 23.18,
    "Net wt": 18.18,
    "St amt": 18.18,
    "Rate/gm": 18.18,
    "Making/gm": 21.18,
    Amount: 24.18,
  };

  const columnArray = [
    "Item",
    "HSN",
    "Purity",
    "Qty",
    "Gr wt",
    "Stone wt",
    "Net wt",
    "St amt",
    "Rate/gm",
    "Making/gm",
    "Amount",
  ];

  // Calculate the starting X position for each column
  let currentX = 5;
  const tableWidth = 200; // Total width for the table

  // Draw the table header and vertical lines, and center the text in each column
  columnArray.forEach((title, index) => {
    const columnWidth = columnWidths[title] || 20; // Default to 20mm if not specified

    // Calculate the position to center the text in the column
    // const textX = currentX + columnWidth / 2 - doc.getTextWidth(title) / 2;

    const textX = currentX + 1;
    const cellY = 90; // Adjusted Y position to place text within the cell

    // Draw the centered text inside the cells
    doc.setFontSize(11);
    doc.setFont("sanserif", "bold");
    doc.text(title, textX, cellY); // Centered text in the cell

    // Draw the vertical line for each column
    if (index !== 0) {
      doc.line(currentX, 85, currentX, 170); // Vertical line from header to the bottom of the table
    }

    currentX += columnWidth; // Move to the next column position
  });

  // Draw the bottom line of the header row
  doc.rect(5, 85, tableWidth, 10); // Header bottom line

  // Body (you can add data here as needed)
  firstColumn.forEach((row, index) => {
    const ypos = startY + (index + 0.7) * cellHeight;

    doc.setFontSize(10);
    doc.setFont("sanserif", "bold");
    doc.text(`${row.label} :`, startX + 2, ypos);
    doc.text(row.value, startX + cellWidth / 2, ypos); // Centered within the first column
  });

  secondColumn.forEach((row, index) => {
    const ypos = startY + (index + 0.7) * cellHeight;

    doc.setFontSize(10);
    doc.setFont("sanserif", "bold");
    doc.text(`${row.label} `, 60 + cellWidth + 2, ypos); // Left padding of 2 in the second column
    doc.text(row.value, startX + (cellWidth * 4) / 2, ypos); // Centered within the second column
  });

  // Draw the outer table border (adjust height to fit the table content)
  doc.rect(5, 85, tableWidth, 85);

  const overallStatsTable = ["Item", "Net wt", "Gross wt", "Amount"];

  let currentX2 = 5;
  const tableWidth2 = 100;

  const ColumnCount = overallStatsTable.length;
  const ColumnWidth = tableWidth2 / ColumnCount;

  // Draw the table header and vertical lines, and center the text in each column
  overallStatsTable.forEach((title, index) => {
    const textX = currentX2 + ColumnWidth / 2 - doc.getTextWidth(title) / 2;
    const cellY = 180; // Starting Y position for the table header

    // Draw the centered text inside the cells
    doc.setFontSize(10);
    doc.text(title, textX, cellY); // Centered text in the cell

    // // Draw vertical lines for the columns
    if (index !== 0) {
      doc.line(currentX2, 175, currentX2, 195); // Vertical line from header to bottom
    }

    // Move to the next column position
    currentX2 += ColumnWidth;
  });

  // Draw the outer border of the table (header + empty cells)
  doc.rect(5, 175, tableWidth2, 10 + cellHeight); // Table outer border

  // Draw the horizontal line between the header row and the empty cells for values
  doc.line(5, 177 + 10, 5 + tableWidth2, 177 + 10);

  //draw cash table
  doc.setFont("sanserif", "bold");

  // Now create a second section with two columns: "Cash" and its amount
  const cashSectionX = 5; // Starting X position for the cash section
  const cashSectionY = 199;
  const cashCellWidth = 50; // Width of each column for the cash table

  // Draw the "Cash" label cell
  doc.setFontSize(10);
  doc.setFont("sanserif", "bold");
  doc.text(
    "Cash",
    cashSectionX + cashCellWidth / 2 - doc.getTextWidth("Cash") / 2,
    cashSectionY + 7
  ); // Center text in the first column

  // Draw the "Cash" amount cell
  doc.text(
    "",
    cashSectionX +
    cashCellWidth +
    cashCellWidth / 2 -
    doc.getTextWidth("1000") / 2,
    cashSectionY + 7
  ); // Center text in the second column

  // Draw the outer border of the cash and amount cells
  doc.rect(cashSectionX, cashSectionY, cashCellWidth, 10); // Border for "Cash" label
  doc.rect(cashSectionX + cashCellWidth, cashSectionY, cashCellWidth, 10); // Border for the amount

  //detailed table

  // First column labels for gross amount, taxes, and discounts
  const leftColumn = [
    { label: "Gross Amount", value: "" },
    { label: "CGST 1.5%", value: "" },
    { label: "SGST 1.5%", value: "" },
    { label: "IGST 3%", value: "" },
    { label: "Hallmarking Amount", value: "" },
    { label: "Purchase Amount (-)", value: "" },
    { label: "RO/Discount (-)", value: "" },
    { label: "Net Amount", value: "" },
  ];

  // Dummy values for the right column
  const rightColumnValues = ["", "", "", "", "", "", "", ""];

  // Set table starting position and dimensions
  const startX4 = 135; // Starting X position for the table
  const startY4 = 175; // Starting Y position for the table
  const tableWidth4 = 70; // Table width
  const tableHeight4 = 80; // Table height (adjust based on number of rows)
  const cellHeight4 = 10; // Height for each cell row
  const verticalLineX = startX4 + tableWidth4 / 2; // X position for the center vertical line

  doc.setLineWidth(0.3);
  doc.rect(startX4, startY4, tableWidth4, tableHeight4); // Outer table border

  // Draw vertical line at the center
  doc.line(verticalLineX, startY4, verticalLineX, startY4 + tableHeight4); // Vertical line splitting the table

  // Fill in the left column labels and right column dummy values
  leftColumn.forEach((row, index) => {
    const ypos = startY4 + (index + 1) * cellHeight4 - 3; // Y position for the text

    // Draw left side labels
    doc.setFontSize(10);
    doc.setFont("sanserif", "bold");
    doc.text(`${row.label}`, startX4 + 2, ypos);

    // Draw right side dummy values
    const rightValue = rightColumnValues[index];
    doc.setFont("sanserif", "normal");
    doc.text(`${rightValue}`, verticalLineX + 2, ypos); // Right side column values

    // Draw horizontal line after each cell
    doc.line(startX4, ypos + 3, startX4 + tableWidth4, ypos + 3); // Horizontal line across the row
  });

  doc.setFont("sanserif", "normal");
  doc.setFontSize(10);
  doc.text("Billng By - Admin", 100, 220);

  doc.setFont("sanserif", "normal");
  doc.setFontSize(10);
  doc.text(
    "note:- we declare that this invoice shows actual price of the good described ",
    5,
    240
  );

  doc.setFont("sanserif", "normal");
  doc.setFontSize(10);
  doc.text("and that all particulars are true and correct", 5, 245);

  doc.setFont("sanserif", "bold");
  doc.setFontSize(10);
  doc.text("Customer Sign", 10, 285);

  doc.setFont("sanserif", "bold");
  doc.setFontSize(10);
  doc.text("(Saturday Closed )", 70, 285);

  doc.setFont("sanserif", "bold");
  doc.setFontSize(10);
  doc.text("Thank You !", 70, 290);

  doc.setFont("sanserif", "bold");
  doc.setFontSize(10);
  doc.text("For Mundlik Jewellers", 150, 285);

  // Generate the PDF and open it in a new window
  // const pdfData = doc.output("datauristring");
  // const newWindow = window.open();
  // newWindow.document.write(
  //   <iframe width='100%' height='100%' src='${pdfData}'></iframe>
  // );

  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );
};

const generateinvoicepdf12 = (items, customer) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  const dummyData = generateDummyData();
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const marginTop = 100;
  const marginBottom = 40;
  const rowHeight = 10; // Initial row height
  const tableHeight = 130; // Fixed table height
  let currentY = marginTop;
  const invoicex = pageWidth - 50;
  const invoicey = 60;
  const customerx = pageWidth - page;
  const customery = 60;

  console.log("checkpagewidth  ", pageWidth);

  // Define the column positions
  const columnPositions = {
    sr: pageWidth - 200,
    productDetails: pageWidth - 190,
    pcs: pageWidth - 150,
    hsnCode: pageWidth - 140,
    grossWt: pageWidth - 120,
    netWt: pageWidth - 90,
    rate: pageWidth - 60,
    amount: pageWidth - 40,
  };

  // Draw the table structure dynamically
  const drawTableStructure = () => {
    // Vertical Lines (for column separators)
    // doc.line(10, marginTop, 10, marginTop + tableHeight); // Left border
    Object.values(columnPositions).forEach((pos) => {
      doc.line(pos, marginTop, pos, marginTop + tableHeight); // Column separators
    });
    doc.line(
      pageWidth - 10,
      marginTop,
      pageWidth - 10,
      marginTop + tableHeight
    ); // Right border
  };

  const drawTableHeader = () => {
    doc.setFontSize(10);
    doc.line(columnPositions.sr, currentY, pageWidth - 10, currentY); // Table header top line
    currentY += 5;

    // Draw the header text
    doc.text("Sr.", columnPositions.sr + 2, currentY);
    doc.text("Product Details", columnPositions.productDetails + 2, currentY);
    doc.text("Pcs", columnPositions.pcs + 2, currentY);
    doc.text("HSN Code", columnPositions.hsnCode + 2, currentY);
    doc.text("Gross Wt", columnPositions.grossWt + 2, currentY);
    doc.text("Net Wt", columnPositions.netWt + 2, currentY);
    doc.text("Rate / gm", columnPositions.rate + 2, currentY);
    doc.text("Amount", columnPositions.amount + 2, currentY);

    currentY += 5;
    doc.line(columnPositions.sr, currentY, pageWidth - 10, currentY); // Table header bottom line
    currentY += 5;

    doc.line(
      columnPositions.sr,
      marginTop + tableHeight,
      pageWidth - 10,
      marginTop + tableHeight
    ); // Table header top line
  };

  const drawFooter = () => {
    doc.text("Taxable Amount", fotertotalx, fotertotaly + 10);
    doc.text("CGST@1.5%", fotertotalx, fotertotaly + 15);
    doc.text("SGST@1.5%", fotertotalx, fotertotaly + 20);
    doc.text("IGST@  3%", fotertotalx, fotertotaly + 25);
    doc.text("Total Invoice Amount", fotertotalx, fotertotaly + 30);
    doc.text("Amount Received", fotertotalx, fotertotaly + 35);
    doc.text("Balance Amount", fotertotalx, fotertotaly + 40);
    doc.text("Taxable Amount", 2, fotertotaly + 45);

    // doc.text('HSN/SAC: 7108', 14, currentY + 10);
    // doc.text('Taxable Amount: 47801.60', 14, currentY + 15);
    // doc.text('CGST @ 1.50%: 717.02', 14, currentY + 20);
    // doc.text('SGST @ 1.50%: 717.02', 14, currentY + 25);
    // doc.text('IGST: 0.00', 14, currentY + 30);
    // doc.text('Round Off: 0.36', 14, currentY + 35);
    // doc.setFontSize(12);
    // doc.text('Grand Total: 49236.00', 160, currentY + 35);
    // doc.setFontSize(10);
    // doc.text('For Manan Softwares', 160, currentY + 45);
    // doc.text('Authorised Signatory', 160, currentY + 50);
  };

  const drawTableRows = () => {
    items.forEach((item, index) => {
      // Determine text lines and adjust currentY for each row
      const productDetailsLines = doc.splitTextToSize(
        item.ProductName,
        columnPositions.amount - columnPositions.productDetails - 5
      ); // Adjust width as needed
      const rowCount = Math.max(
        productDetailsLines.length,
        1 // To ensure there's at least one row
      );

      if (
        currentY + rowCount * rowHeight >
        pageHeight - marginBottom - tableHeight
      ) {
        doc.addPage(); // Add a new page if needed
        currentY = marginTop;
        drawTableHeader();
        drawTableStructure();
      }

      // Draw row data
      doc.text(`${index + 1}`, columnPositions.sr + 2, currentY);
      productDetailsLines.forEach((line, lineIndex) => {
        doc.text(
          line,
          columnPositions.productDetails + 2,
          currentY + lineIndex * rowHeight
        );
      });
      doc.text(item.Quantity || "1", columnPositions.pcs + 2, currentY);
      doc.text(item.HSNCode || "0", columnPositions.hsnCode + 2, currentY);
      doc.text(item.GrossWt, columnPositions.grossWt + 2, currentY);
      doc.text(item.NetWt, columnPositions.netWt + 2, currentY);
      doc.text(item.MetalRate || "0", columnPositions.rate + 2, currentY);
      doc.text(item.TotalAmount || "0", columnPositions.amount + 2, currentY);

      // Update currentY based on the row count
      currentY += rowCount * rowHeight; // Adjust currentY based on the number of lines
    });
  };

  // Start generating the PDF
  doc.text("TAX INVOICE", 90, 50);
  doc.setFontSize(10);
  doc.text("Invoice No :-", invoicex, invoicey);
  doc.text("Date :-", invoicex, invoicey + 5);

  doc.text("Customer Name :-", customerx, customery);
  doc.text("Mobile No :-", customerx, customery + 5);
  doc.text("Address :-", customerx, customery + 5);

  drawTableHeader();
  drawTableStructure();
  drawTableRows();

  // Add the footer to the last page
  drawFooter();

  // Open the PDF
  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );
};

const generatepdf2 = (csData, invoiceItems) => {
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
    doc.text(
      `${customer.FirstName || ""} ${customer.LastName || ""}`,
      6,
      y + 4
    );
    doc.setFont("times", "normal");
    doc.text(`${customer.CurrAddStreet || "Street"}`, 6, y + 8);
    doc.text(`${customer.CurrAddTown || "Town"}`, 6, y + 12);
    doc.text(`Gst No. - ${customer.GstNo || "Gst No."}`, 6, y + 16);
    doc.text(
      `${customer.CurrAddState || ""} ${customer.CurrAddPincode || "Pan No. "}`,
      6,
      y + 20
    );
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
    const productName =
      item.ProductName.length > 15
        ? `${item.ProductName.substring(0, 15)}...`
        : item.ProductName;
    doc.text(srNo.toString(), 6, y);
    doc.text(`${item.Purity || ""} ${productName || ""}`, 15, y);
    doc.text(`${item.HSNCode || "-"}`, 70, y);
    doc.text(`${item.Quantity !== "undefined" ? item.Quantity : "-"}`, 85, y);
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
      OtherCharges = Number(
        (parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt)
      );
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
    );
    doc.text(item.HallmarkAmount ? `${item.HallmarkAmount}` : "-", 175, y);
    HallmarkCharges += parseFloat(
      item.HallmarkAmount ? item.HallmarkAmount : 0
    );
    totalAmount =
      item.MRP !== 0 && item.MRP !== "" && item.MRP !== "0"
        ? parseFloat(item.MRP ? item.MRP : 0) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
        : parseFloat(
          parseFloat(parseFloat(item.MetalRate) / 10) *
          parseFloat(item.NetWt) +
          parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
          parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
        );
    Total += totalAmount;
    // doc.text(`${item.StoneAmount || "-"}`, 130, y);
    // doc.text(`${item.MetalRate || "-"}`, 145, y);
    // doc.text(`${item.Amount || "-"}`, 160, y);
    // doc.text(`${item.HallmarkAmount || "-"}`, 175, y);
    doc.text(`${totalAmount || "-"}`, 190, y);

    totalQuantity +=
      parseFloat(item.Quantity !== "undefined" ? item.Quantity : 0) || 0;
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
    doc.text(`${(Number(csData?.GST) / 2 || 0)?.toFixed(2)}`, 185, y + 15);
    doc.text(`SGST 1.5%:`, 155, y + 15);
    // doc.text(`${(payableGst / 2)?.toFixed(2)}`, 185, y + 15);
    doc.text(`${(Number(csData?.GST) / 2 || 0)?.toFixed(2)}`, 185, y + 15);
  } else {
    doc.text(`Sales Amount:`, 155, y);
    doc.text(`${totalSaleAmount?.toFixed(2)}`, 185, y);
    doc.text(`R.O./Discount:`, 155, y + 5);
    doc.text(`${csData?.offer || 0}`, 185, y + 5);
    doc.text(`IGST 3%:`, 155, y + 10);
    // doc.text(`${payableGst?.toFixed(2)}`, 185, y + 10);
    doc.text(`${Number(csData?.GST)?.toFixed(2)}`, 185, y + 10);
  }

  doc.text(`Purchase Amount (-):`, 155, y + 15);
  doc.text(
    `${parseFloat(csData?.UrdPurchaseAmt || 0)?.toFixed(2)}`,
    185,
    y + 15
  );
  doc.text(`Received Amount:`, 155, y + 20);
  doc.text(
    `${parseFloat(csData?.ReceivedAmount || 0)?.toFixed(2)}`,
    185,
    y + 20
  );
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
};

const generatepdf1 = (csData, invoiceItems) => {
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
    doc.text(
      `${customer.FirstName || ""} ${customer.LastName || ""}`,
      6,
      y + 4
    );
    doc.setFont("times", "normal");
    doc.text(`${customer.CurrAddStreet || "Street"}`, 6, y + 8);
    doc.text(`${customer.CurrAddTown || "Town"}`, 6, y + 12);
    doc.text(`Gst No. - ${customer.GstNo || "Gst No."}`, 6, y + 16);
    doc.text(
      `${customer.CurrAddState || ""} ${customer.CurrAddPincode || "Pan No. "}`,
      6,
      y + 20
    );
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
    const productName =
      item.ProductName.length > 15
        ? `${item.ProductName.substring(0, 15)}...`
        : item.ProductName;
    doc.text(srNo.toString(), 6, y);
    doc.text(`${item.Purity || ""} ${productName || ""}`, 15, y);
    doc.text(`${item.HSNCode || "-"}`, 70, y);
    doc.text(`${item.Quantity !== "undefined" ? item.Quantity : "-"}`, 85, y);
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
      OtherCharges = Number(
        (parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt)
      );
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
    );
    doc.text(item.HallmarkAmount ? `${item.HallmarkAmount}` : "-", 175, y);
    HallmarkCharges += parseFloat(
      item.HallmarkAmount ? item.HallmarkAmount : 0
    );
    totalAmount =
      item.MRP !== 0 && item.MRP !== "" && item.MRP !== "0"
        ? parseFloat(item.MRP ? item.MRP : 0) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
        : parseFloat(
          parseFloat(parseFloat(item.MetalRate) / 10) *
          parseFloat(item.NetWt) +
          parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
          parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
        );
    Total += totalAmount;
    // doc.text(`${item.StoneAmount || "-"}`, 130, y);
    // doc.text(`${item.MetalRate || "-"}`, 145, y);
    // doc.text(`${item.Amount || "-"}`, 160, y);
    // doc.text(`${item.HallmarkAmount || "-"}`, 175, y);
    doc.text(`${totalAmount || "-"}`, 190, y);

    totalQuantity +=
      parseFloat(item.Quantity !== "undefined" ? item.Quantity : 0) || 0;
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
    doc.text(`${(Number(csData?.GST) / 2 || 0)?.toFixed(2)}`, 185, y + 15);
    doc.text(`SGST 1.5%:`, 155, y + 15);
    // doc.text(`${(payableGst / 2)?.toFixed(2)}`, 185, y + 15);
    doc.text(`${(Number(csData?.GST) / 2 || 0)?.toFixed(2)}`, 185, y + 15);
  } else {
    doc.text(`Sales Amount:`, 155, y);
    doc.text(`${totalSaleAmount?.toFixed(2)}`, 185, y);
    doc.text(`R.O./Discount:`, 155, y + 5);
    doc.text(`${csData?.offer || 0}`, 185, y + 5);
    doc.text(`IGST 3%:`, 155, y + 10);
    // doc.text(`${payableGst?.toFixed(2)}`, 185, y + 10);
    doc.text(`${Number(csData?.GST)?.toFixed(2)}`, 185, y + 10);
  }

  doc.text(`Purchase Amount (-):`, 155, y + 15);
  doc.text(
    `${parseFloat(csData?.UrdPurchaseAmt || 0)?.toFixed(2)}`,
    185,
    y + 15
  );
  doc.text(`Received Amount:`, 155, y + 20);
  doc.text(
    `${parseFloat(csData?.ReceivedAmount || 0)?.toFixed(2)}`,
    185,
    y + 20
  );
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
};

const generatepdf = (csData, invoiceItems) => {
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
    doc.text(
      `${customer.FirstName || ""} ${customer.LastName || ""}`,
      6,
      y + 4
    );
    doc.setFont("times", "normal");
    doc.text(`${customer.CurrAddStreet || "Street"}`, 6, y + 8);
    doc.text(`${customer.CurrAddTown || "Town"}`, 6, y + 12);
    doc.text(`Gst No. - ${customer.GstNo || "Gst No."}`, 6, y + 16);
    doc.text(
      `${customer.CurrAddState || ""} ${customer.CurrAddPincode || "Pan No. "}`,
      6,
      y + 20
    );
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
    const productName =
      item.ProductName.length > 15
        ? `${item.ProductName.substring(0, 15)}...`
        : item.ProductName;
    doc.text(srNo.toString(), 6, y);
    doc.text(`${item.Purity || ""} ${productName || ""}`, 15, y);
    doc.text(`${item.HSNCode || "-"}`, 70, y);
    doc.text(`${item.Quantity !== "undefined" ? item.Quantity : "-"}`, 85, y);
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
      OtherCharges = Number(
        (parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt)
      );
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
    );
    doc.text(item.HallmarkAmount ? `${item.HallmarkAmount}` : "-", 175, y);
    HallmarkCharges += parseFloat(
      item.HallmarkAmount ? item.HallmarkAmount : 0
    );
    totalAmount =
      item.MRP !== 0 && item.MRP !== "" && item.MRP !== "0"
        ? parseFloat(item.MRP ? item.MRP : 0) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
        : parseFloat(
          parseFloat(parseFloat(item.MetalRate) / 10) *
          parseFloat(item.NetWt) +
          parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
          parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
        );
    Total += totalAmount;
    // doc.text(`${item.StoneAmount || "-"}`, 130, y);
    // doc.text(`${item.MetalRate || "-"}`, 145, y);
    // doc.text(`${item.Amount || "-"}`, 160, y);
    // doc.text(`${item.HallmarkAmount || "-"}`, 175, y);
    doc.text(`${totalAmount || "-"}`, 190, y);

    totalQuantity +=
      parseFloat(item.Quantity !== "undefined" ? item.Quantity : 0) || 0;
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
    doc.text(`${(Number(csData?.GST) / 2 || 0)?.toFixed(2)}`, 185, y + 15);
    doc.text(`SGST 1.5%:`, 155, y + 15);
    // doc.text(`${(payableGst / 2)?.toFixed(2)}`, 185, y + 15);
    doc.text(`${(Number(csData?.GST) / 2 || 0)?.toFixed(2)}`, 185, y + 15);
  } else {
    doc.text(`Sales Amount:`, 155, y);
    doc.text(`${totalSaleAmount?.toFixed(2)}`, 185, y);
    doc.text(`R.O./Discount:`, 155, y + 5);
    doc.text(`${csData?.offer || 0}`, 185, y + 5);
    doc.text(`IGST 3%:`, 155, y + 10);
    // doc.text(`${payableGst?.toFixed(2)}`, 185, y + 10);
    doc.text(`${Number(csData?.GST)?.toFixed(2)}`, 185, y + 10);
  }

  doc.text(`Purchase Amount (-):`, 155, y + 15);
  doc.text(
    `${parseFloat(csData?.UrdPurchaseAmt || 0)?.toFixed(2)}`,
    185,
    y + 15
  );
  doc.text(`Received Amount:`, 155, y + 20);
  doc.text(
    `${parseFloat(csData?.ReceivedAmount || 0)?.toFixed(2)}`,
    185,
    y + 20
  );
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
};

// export default generateBillPDF;

export const generateBillInvocePDF123 = (csData, invoiceItems) => {
  const doc = new jsPDF({
    orientation: "portrait",
    format: "a4",
  });
  console.log(csData, "sjdshjdhsjhdjs");
  console.log(invoiceItems, "sjdshjdhsjhdjs");
  let Total = 0;
  doc.setDrawColor(0, 0, 0, 0.3);
  doc.setFontSize(12);
  doc.setFont("times");

  doc.setFontSize(18);
  doc.setTextColor(0, 0, 139);
  doc.setFont("times", "bold");
  doc.text("TAX INVOICE", 105, 20, { align: "center" });
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
    doc.text(
      `${customer.FirstName || ""} ${customer.LastName || ""}`,
      6,
      y + 4
    );
    doc.setFont("times", "normal");
    doc.text(`${customer.CurrAddStreet || "add"}`, 6, y + 8);
    doc.text(
      `${customer.CurrAddState} & ${customer.CurrAddPincode}`,
      6,
      y + 22
    );
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
    const productName =
      item.ProductName.length > 15
        ? `${item.ProductName.substring(0, 15)}...`
        : item.ProductName;
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
      OtherCharges = Number(
        (parseFloat(item.MetalRate) / 10) * parseFloat(item.NetWt)
      );
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
    );
    // doc.text(item.HallmarkAmount ? `${item.HallmarkAmount}` : "-", 175, y);
    HallmarkCharges += parseFloat(
      item.HallmarkAmount ? item.HallmarkAmount : 0
    );
    totalAmount =
      item.MRP !== 0 && item.MRP !== "" && item.MRP !== "0"
        ? parseFloat(item.MRP ? item.MRP : 0) +
        parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
        parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
        : parseFloat(
          parseFloat(parseFloat(item.MetalRate) / 10) *
          parseFloat(item.NetWt) +
          parseFloat(item.HallmarkAmount ? item.HallmarkAmount : 0) +
          parseFloat(item.StoneAmount ? item.StoneAmount : 0) || 0
        );
    Total += totalAmount;
    // doc.text(`${item.StoneAmount || "-"}`, 130, y);
    // doc.text(`${item.MetalRate || "-"}`, 145, y);
    // doc.text(`${item.Amount || "-"}`, 160, y);
    // doc.text(`${item.HallmarkAmount || "-"}`, 175, y);
    doc.text(`${totalAmount || "-"}`, 190, y);

    totalQuantity +=
      parseFloat(item.Quantity !== "undefined" ? item.Quantity : 0) || 0;
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

  doc.text("CGST", 15, y + 52);
  doc.text("SGST", 15, y + 56);
  doc.setFont("times", "bold");
  doc.text("IGST", 90, y + 60);
  doc.text("3.0%", 130, y + 60);
  doc.text("DISCOUNT", 90, y + 64);
  doc.text("R / d", 90, y + 68);
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
    return (
      total + parseFloat((parseFloat(product.TotalAmount) * 100) / 103 || 0)
    );
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
  doc.text("TOTAL", 90, footerY - 56);
  doc.text(csData.TotalAmount, 182, footerY - 56);

  doc.line(5, footerY - 54, 205, footerY - 54);
  doc.text("Amount Chargeable (in words): ", 7, footerY - 50);
  doc.text("Rs.", 7, footerY - 46);
  doc.line(5, footerY - 44, 205, footerY - 44);
  doc.text("Company's Bank details", 140, footerY - 40);
  doc.text("Bank Name : Indusind bank", 140, footerY - 36);
  doc.text("Branch : BKC Branch", 140, footerY - 32);
  doc.text("A/c No: 255024002400", 140, footerY - 28);
  doc.text("IFSC CODE : INDB0000342", 140, footerY - 24);
  doc.text(
    "Corporate Office : DIAGLITER 1003, 10th Floor, D Square, Dadabhai Road, Vile Parle (West), Mumbai - 400056",
    10,
    footerY
  );
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

export const generateBillInvocePDF = (
  csData,
  invoiceItems,
  allStonesmasterList
) => {
  generatenicegold(csData, invoiceItems, allStonesmasterList);
};

const generatenicegold = (csData, invoiceItems, allStonesmasterList) => {
  console.log("checking all stones ", allStonesmasterList);

  const doc = new jsPDF({
    orientation: "portrait", // Can also try "landscape" for more horizontal space
    format: "a4",
  });

  doc.setFontSize(18);
  doc.setTextColor(0, 0, 139);
  doc.setFont("times", "bold");
  doc.text("INVOICE", 105, 20, { align: "center" });

  // Get unique stone names/types from the allStonesmasterList
  const stoneTypes = [
    ...new Set(allStonesmasterList.map((stone) => stone.StoneName)),
  ];

  // Main table header (first row)
  const mainHeader = [
    { title: "Design", dataKey: "design", rowSpan: 2 },
    { title: "Particular", dataKey: "particular", rowSpan: 2 },
    { title: "Gross Wt", dataKey: "grossWt", rowSpan: 2 },
    { title: "Net Wt", dataKey: "netWt", rowSpan: 2 },
    ...stoneTypes.map((stoneName) => ({ title: stoneName, colSpan: 1 })),
    ...stoneTypes.map((stoneName) => ({ title: stoneName, colSpan: 1 })),
    // { title: "Stone Wt", dataKey: "stoneWt", colSpan: stoneTypes.length }, // Subheader for stone weights
    // { title: "Stone Amt", dataKey: "stoneAmt", colSpan: stoneTypes.length }, // Subheader for stone amounts
  ];

  // Subheader for stones under "Stone Wt" and "Stone Amt"
  const subHeader = [
    { title: "", colSpan: 4 }, // Empty columns for first 4 headers
    ...stoneTypes.map((stoneName) => ({ title: stoneName, colSpan: 1 })), // Stone names under "Stone Wt"
    ...stoneTypes.map((stoneName) => ({ title: stoneName, colSpan: 1 })), // Stone names under "Stone Amt"
  ];

  // Map the invoice items into rows
  const rows = invoiceItems.map((item) => {
    let row = [
      item.ItemCode || "", // Design
      item.ProductName || "", // Particular
      item.GrossWt || "0", // Gross Wt
      item.NetWt || "0", // Net Wt
    ];

    // Add the stone weight for each stone type
    stoneTypes.forEach((stoneName) => {
      const matchingStone = allStonesmasterList.find(
        (stone) => stone.StoneName === stoneName
      );
      row.push(matchingStone ? matchingStone.StoneWeight : "0"); // Stone Weight
    });

    // Add the stone amount for each stone type
    stoneTypes.forEach((stoneName) => {
      const matchingStone = allStonesmasterList.find(
        (stone) => stone.StoneName === stoneName
      );
      row.push(matchingStone ? matchingStone.StoneAmount : "0"); // Stone Amount
    });

    return row;
  });

  console.log("check rows ", rows);

  // Add table with dynamic subheader
  autoTable(doc, {
    head: [
      mainHeader.map((col) => col.title), // First row (main header)
      subHeader.map((col) => col.title), // Second row (subheader for stone types)
    ],
    body: rows,
    columnStyles: {
      0: { cellWidth: 25 }, // Design column width
      1: { cellWidth: 30 }, // Particular column width
      2: { cellWidth: 20 }, // Gross Wt column width
      3: { cellWidth: 20 }, // Net Wt column width
      // Dynamic stone width columns
      ...stoneTypes.reduce((acc, _, index) => {
        acc[4 + index] = { cellWidth: 15 }; // Dynamic stone weight column
        acc[4 + stoneTypes.length + index] = { cellWidth: 15 }; // Dynamic stone amount column
        return acc;
      }, {}),
    },
    styles: {
      fontSize: 10, // Adjust font size for readability
      textColor: "#000",
    },
    margin: { top: 30 }, // Adjust margin to avoid overlap with the title
    theme: "grid", // Add grid lines for better alignment visibility
  });

  // Save the PDF with a dynamic invoice number if available
  doc.save(`Invoice-${csData?.invoiceNo || "Default"}.pdf`);
};
