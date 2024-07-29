import React from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

// SK Khandre And Krishiv Label Below

// export const GenerateLabel = (products) => {
//   const doc = new jsPDF({
//     // format: [26, 12],
//     format: [28, 12],
//     orientation: "landscape",
//   });

//   const fontSize = 7;
//   const imageHeight = 7;
//   const imageWidth = 7;

//   for (let i = 0; i < products.length; i++) {
//     const {
//       collection,
//       grosswt,
//       stoneWeight,
//       netWt,
//       stoneAmount,
//       itemCode,
//       purity,
//       mrp,
//       product_No,
//       pieces,
//       description,
//       barcodeNumber,
//     } = products[i];

//     if (i > 0) {
//       doc.addPage(); // Add a new page for each product after the first one
//     }
//     doc.setFontSize(fontSize);
//     doc.setFont("helvetica", "bold");
//     // {
//     //   collection.length > 20
//     //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
//     //     : doc.text(`${collection}`, 1, 3);
//     // }

//     if (mrp == 0 || mrp === "") {
//       // doc.text(`${itemCode}`, 2, 3);
//       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 2, 3);
//       doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 2, 6);
//       doc.text(`N.Wt: ${parseFloat(netWt).toFixed(3)}`, 2, 9);
//       // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
//       // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
//       doc.text(`Pcs:${pieces}`, 19, 11.5);
//       // doc.text(`${product_No}`, 4, 11.5);
//       doc.text(`${itemCode}`, 18, 6);
//       doc.text(`${purity}`, 21, 3);
//       doc.setFontSize(7);
//       {
//         barcodeNumber
//           ? doc.text(`${barcodeNumber}`, 2, 11.5)
//           : doc.text("", 2, 11.5);
//       }
//       // doc.setFontSize(5);
//       // const maxLineLength = 27;
//       // const descriptionLine1 = description.substring(0, maxLineLength);
//       // const descriptionLine2 = description.substring(
//       //   maxLineLength,
//       //   maxLineLength * 2
//       // );

//       // doc.text(descriptionLine1, 4, 10);
//       // doc.text(descriptionLine2, 4, 11.5);
//     } else {
//       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 2, 3);
//       doc.text(`MRP: ${parseFloat(mrp)}`, 2, 6);
//       doc.text(`Pcs:${pieces}`, 19, 11.5);
//       doc.text(`${itemCode}`, 18, 6);
//       // doc.text(`${product_No}`, 4, 11.5);
//       // doc.text(`${product_No}`, 4, 11.5);
//       // doc.text(`${itemCode}`, 3, 3);
//       doc.text(`${purity}`, 21, 3);
//       {
//         barcodeNumber
//           ? doc.text(`${barcodeNumber}`, 2, 11.5)
//           : doc.text("", 2, 11.5);
//       }
//     }

//     try {
//       // const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
//       // doc.addImage(qrCodeDataUrl, "JPEG", 3, 3, imageWidth, imageHeight);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const pdfData = doc.output("datauristring");
//   const newWindow = window.open();
//   newWindow.document.write(
//     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
//   );
// };

// Kalamandir Label Below
// export const GenerateLabel = async (products) => {
//   const doc = new jsPDF({
//     // format: [26, 12],
//     format: [81, 12],
//     orientation: "landscape",
//   });

//   const fontSize = 6;
//   const imageHeight = 12;
//   const imageWidth = 12;

//   for (let i = 0; i < products.length; i++) {
//     const {
//       collection,
//       GrossWt,
//       TotalStoneWeight,
//       NetWt,
//       TotalStoneAmount,
//       ItemCode,
//       PurityName,
//       MRP,
//       product_No,
//       Pieces,
//       Description,
//       RFIDCode,
//       category_Name,
//       Size,
//       SKU,
//       ProductTitle,
//       OccassionName,
//     } = products[i];

//     if (i > 0) {
//       doc.addPage(); // Add a new page for each product after the first one
//     }
//     doc.setFontSize(fontSize);
//     doc.setFont("helvetica", "bold");
//     // doc.line(26, 0, 26, 12);
//     // {
//     //   collection.length > 20
//     //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
//     //     : doc.text(`${collection}`, 1, 3);
//     // }

//     if (MRP == 0 || MRP === "") {
//       // doc.text(`${itemCode}`, 2, 3);
//       doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 30, 3);
//       doc.text(`${OccassionName}`, 30, 6);
//       doc.text(`OW: ${parseFloat(TotalStoneWeight).toFixed(3)}`, 30, 9);
//       doc.text(`NW: ${parseFloat(NetWt).toFixed(3)}`, 43, 3);
//       doc.text(`${SKU}`, 30, 11.5);

//       // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
//       // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
//       doc.text(`PCS:${Pieces}`, 48, 11.5);
//       // doc.text(`NO MRP ITEM`, 48, 11.5);
//       // doc.text(`${product_No}`, 4, 11.5);
//       doc.text(`${ItemCode}`, 13, 3);
//       doc.text(`${PurityName}`, 23, 3);
//       // doc.text(`${ProductTitle}`, 13, 6);
//       // doc.text(`${Description}`, 20, 6);
//       doc.text(`${Size ? Size : ""}`, 13, 9);
//       doc.setFontSize(7);
//       {
//         RFIDCode ? doc.text(`${RFIDCode}`, 30, 10) : doc.text("", 30, 10);
//       }
//       // doc.setFontSize(5);
//       // const maxLineLength = 27;
//       // const descriptionLine1 = description.substring(0, maxLineLength);
//       // const descriptionLine2 = description.substring(
//       //   maxLineLength,
//       //   maxLineLength * 2
//       // );

//       // doc.text(descriptionLine1, 4, 10);
//       // doc.text(descriptionLine2, 4, 11.5);
//     } else {
//       doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 30, 4);
//       doc.text(`${SKU}`, 30, 7);
//       doc.text(`MRP: ${parseFloat(MRP).toFixed(0)}/-`, 30, 10);
//       doc.text(`NW: ${parseFloat(NetWt).toFixed(3)}`, 43, 4);
//       // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
//       // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
//       // doc.text(`PCS:${Pieces}`, 48, 10);
//       doc.text(`MRP ITEM`, 48, 10);
//       // doc.text(`${product_No}`, 4, 11.5);
//       doc.text(`${ItemCode}`, 13, 4);
//       doc.text(`${ProductTitle}`, 13, 7);
//       doc.text(`${Description}`, 20, 7);
//       doc.text(`${OccassionName}`, 23, 4);

//       //   doc.text(`${purity}`, 34, 4);
//       //   doc.text(`${category_Name}`, 12, 7);
//       //   doc.text(`${size ? size : ""}`, 12, 10);
//       doc.setFontSize(7);
//       {
//         barcodeNumber ? doc.text(`${RFIDCode}`, 30, 10) : doc.text("", 30, 10);
//       }
//     }

//     try {
//       const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
//       doc.addImage(qrCodeDataUrl, "JPEG", 1, 0, imageWidth, imageHeight);
//       console.log(qrCodeDataUrl, "qrCodeDataUrl");
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const pdfData = doc.output("datauristring");
//   const newWindow = window.open();
//   newWindow.document.write(
//     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
//   );
// };

export const GenerateLabel = async (products, labelFormat) => {
  console.log('checking labelformate12 ', products, 'checkid  ',labelFormat)
  if (labelFormat === 1) {
    // Thashna Label Below
    generateLabel1(products);
  } else if (labelFormat === 2) {
    // Nice Label Below
    generateLabel4(products);
  }else if (labelFormat === 3){
    generateLabel3(products);
  }else if(labelFormat === 4){
    generateLabel2(products);
  }
};

const generateLabel41 = async (products) => {
  const doc = new jsPDF({
    format: [38, 25],
    orientation: "landscape",
  });

  const fontSize = 5;
  const imageHeight = 13;
  const imageWidth = 13;
  const lineHeight = 2;

  const itemCodeX = 18;   // X position for ItemCode
  const itemCodeY = 5;   // Y position for ItemCode
  const rfidX = 18;       // X position for RFID
  const rfidY = 6;       // Y position for RFID

  const grossWtX = 1;    // X position for GrossWt
  const grossWtY = 5;    // Y position for GrossWt
  const netWtX = 1;      // X position for NetWt
  const netWtY = 20;     // Y position for NetWt

  const stoneWtX = 1;   // X position for StoneWeight
  const stoneWtY = 9;    // Y position for StoneWeight
  const piecesX = 16;    // X position for Pieces
  const piecesY = 9;    // Y position for Pieces

  const weightX = 1;     // X position for Weight
  const weightY = 12;    // Y position for Weight
  const despX = 18;      // X position for Description
  const despY = 12;      // Y position for Description

  for (let i = 0; i < products.length; i++) {
    const {
      GrossWt,
      TotalStoneWeight,
      NetWt,
      ItemCode,
      PurityName,
      Pieces,
      Description,
      RFIDCode,
      SKU,
      Stones,

    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");

    // Top Section
    doc.text(`GW  : ${parseFloat(GrossWt).toFixed(3)}`, grossWtX, grossWtY);
    doc.text(`${ItemCode}`, itemCodeX, itemCodeY);

    // Middle Section
    const maxStonesToShow = 5;
    Stones.slice(0, maxStonesToShow).forEach((stone, index) => {
      const stoneY = stoneWtY + (index * lineHeight);
      doc.text(`${stone.StoneName}: ${stone.StoneWeight}`, stoneWtX, stoneY);
    });

    if (ItemCode) {
      try {
        const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
        doc.addImage(qrCodeDataUrl, "JPEG", rfidX, rfidY, imageWidth, imageHeight);
      } catch (error) {
        console.error(error);
      }
    }

    // Bottom Section
    doc.text(`NT  : ${parseFloat(NetWt).toFixed(3)}`, netWtX, netWtY);
    doc.text('checking', despX, netWtY);
  }
  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );

  // doc.save("labels.pdf");
};


const generateLabel4 = async (products) => {
  const doc = new jsPDF({
    format: [38, 25],
    orientation: "landscape",
  });

  const fontSize = 5;
  const imageHeight = 14;
  const imageWidth = 14;
  const lineHeight = 2;

  const itemCodeX = 22;   // X position for ItemCode
  const itemCodeY = 5;    // Y position for ItemCode
  const rfidX = 22;       // X position for RFID
  const rfidY = 5.5;        // Y position for RFID

  const grossWtX = 1;     // X position for GrossWt
  const grossWtY = 5;     // Initial Y position for GrossWt

  const stoneWtX = 1;     // X position for StoneWeight
  const stoneWtY = grossWtY + lineHeight * 2;  // Initial Y position for StoneWeight

  const netWtX = 1;       // X position for NetWt

  const despX = 19;       // X position for Description
  const despY = 12;       // Y position for Description

  for (let i = 0; i < products.length; i++) {
    const {
      GrossWt,
      NetWt,
      ItemCode,
      Stones,
    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");

    // Top Section
    doc.text(`G Wt : ${parseFloat(GrossWt).toFixed(3)}`, grossWtX, grossWtY);
    doc.text(`${ItemCode}`, itemCodeX, itemCodeY);

    // Middle Section
    const maxStonesToShow = 5;
    Stones.slice(0, maxStonesToShow).forEach((stone, index) => {
      const stoneY = stoneWtY + (index * lineHeight);
      const stoneName = stone.StoneName.length > 5 ? stone.StoneName.substring(0, 5) : stone.StoneName.padEnd(5, ' ');
      doc.text(`${stoneName} : ${stone.StoneWeight}`, stoneWtX, stoneY);
    });

    // Calculate the Y position for NetWt based on the number of stones
    const stonesCount = Math.min(Stones.length, maxStonesToShow);
    const netWtY = stoneWtY + (stonesCount * lineHeight) + lineHeight;

    if (ItemCode) {
      try {
        const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
        doc.addImage(qrCodeDataUrl, "JPEG", rfidX, rfidY, imageWidth, imageHeight);
      } catch (error) {
        console.error(error);
      }
    }

    // Bottom Section
    doc.text(`N Wt : ${parseFloat(NetWt).toFixed(3)}`, netWtX, netWtY);
    doc.text('checking', despX, 20);
  }

  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );

  // doc.save("labels.pdf");
};





const generateLabel5 = async (products) => {
  const doc = new jsPDF({
    format: [38, 25],
    // format: [81, 12],
    orientation: "landscape",
  });

  const fontSize = 5;
  const imageHeight = 12;
  const imageWidth = 12;

  const itemCodeX = 1;   // X position for ItemCode
    const itemCodeY = 3;   // Y position for ItemCode
    const rfidX = 16;       // X position for RFID
    const rfidY = 3;       // Y position for RFID

    const grossWtX = 1;    // X position for GrossWt
    const grossWtY = 6;    // Y position for GrossWt
    const netWtX = 16;      // X position for NetWt
    const netWtY = 6;     // Y position for NetWt

    const stoneWtX = 1;   // X position for StoneWeight
    const stoneWtY = 9;    // Y position for StoneWeight
    const piecesX = 16;    // X position for Pieces
    const piecesY = 9;    // Y position for Pieces

    const weightX = 1;     // X position for Weight
    const weightY = 12;    // Y position for Weight
    const despX = 16;      // X position for Description
    const despY = 12;      // Y position for Description

  for (let i = 0; i < products.length; i++) {
    const {
      collection,
      GrossWt,
      TotalStoneWeight,
      NetWt,
      TotalStoneAmount,
      ItemCode,
      PurityName,
      MRP,
      ProductNo,
      Pieces,
      Description,
      RFIDCode,
      CategoryName,
      Size,
      SKU,
      ProductTitle,
      OccassionName,
    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");
    // doc.line(26, 0, 26, 12);
    // {
    //   collection.length > 20
    //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
    //     : doc.text(`${collection}`, 1, 3);
    // }

    if (MRP === 0 || MRP === "") {
      // doc.text(`${itemCode}`, 2, 3);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 3, 8);
      doc.text(`${SKU}`, 17, 4);
      doc.text(`${ItemCode}`, 3, 4);
      doc.text(`${PurityName}`, 19, 8);
      doc.text(`Size2: ${Size ? Size : ""}`, 3, 12);
      {
        RFIDCode ? doc.text(`testing`, 3, 4) : doc.text("test", 16, 12);
      }
      
    } else {
      doc.text(`${ItemCode}`, itemCodeX, itemCodeY);
    doc.text(`${RFIDCode ? RFIDCode : ""}`, rfidX, rfidY);

    doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, grossWtX, grossWtY);
    doc.text(`NT: ${parseFloat(NetWt).toFixed(3)}`, netWtX, netWtY);

    doc.text(`ST: ${parseFloat(TotalStoneWeight).toFixed(4)}`, stoneWtX, stoneWtY);
    doc.text(`MOP: ${Pieces}`, piecesX, piecesY);

    doc.text(`WD: ${parseFloat(GrossWt).toFixed(3)}`, weightX, weightY);
    doc.text(`PC: ${Description}`, despX, despY);

    }

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
      doc.addImage(qrCodeDataUrl, "JPEG", rfidX, rfidY, imageWidth, imageHeight);
      console.log(qrCodeDataUrl, "qrCodeDataUrl");
    } catch (error) {
      console.error(error);
    }
  }

  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );
};









const generateLabel3 = async (products) => {
  const doc = new jsPDF({
    format: [27, 14],
    // format: [81, 12],
    orientation: "landscape",
  });

  const fontSize = 6.5;
  const imageHeight = 12;
  const imageWidth = 12;

  const itemCodeX = 3;   // X position for ItemCode
    const itemCodeY = 3;   // Y position for ItemCode
    const rfidX = 16;       // X position for RFID
    const rfidY = 3;       // Y position for RFID

    const grossWtX = 3;    // X position for GrossWt
    const grossWtY = 6;    // Y position for GrossWt
    const netWtX = 3;      // X position for NetWt
    const netWtY = 9;     // Y position for NetWt

    const stoneWtX = 14.5;   // X position for StoneWeight
    const stoneWtY = 6;    // Y position for StoneWeight
    const piecesX = 16;    // X position for Pieces
    const piecesY = 9;    // Y position for Pieces

    const weightX = 1;     // X position for Weight
    const weightY = 12;    // Y position for Weight
    const despX = 3;      // X position for Description
    const despY = 12;      // Y position for Description

  for (let i = 0; i < products.length; i++) {
    const {
      collection,
      GrossWt,
      TotalStoneWeight,
      NetWt,
      TotalStoneAmount,
      ItemCode,
      PurityName,
      MRP,
      ProductNo,
      Pieces,
      Description,
      RFIDCode,
      CategoryName,
      Size,
      SKU,
      ProductTitle,
      OccassionName,
      Stones
    } = products[i];

    const stWeight = Stones.reduce((total, stone) => {
      if (stone.StoneName === "S.ST" || stone.StoneName === "B.ST") {
        return total + parseFloat(stone.StoneWeight);
      }
      return total;
    }, 0);

    const mopWeight = Stones.reduce((total, stone) => {
      if (stone.StoneName === "MOP") {
        return total + parseFloat(stone.StoneWeight);
      }
      return total;
    }, 0);

    const wdWeight = Stones.reduce((total, stone) => {
      if (stone.StoneName
        === "WD") {
        return total + parseFloat(stone.StoneWeight);
      }
      return total;
    }, 0);

    console.log('checking labelformate13', stWeight, '   ',mopWeight, '   ',wdWeight  )


    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");
    // doc.line(26, 0, 26, 12);
    // {
    //   collection.length > 20
    //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
    //     : doc.text(`${collection}`, 1, 3);
    // }

    if (MRP === 0 || MRP === "") {
      // doc.text(`${itemCode}`, 2, 3);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 3, 8);
      doc.text(`${SKU}`, 17, 4);
      doc.text(`${ItemCode}`, 3, 4);
      doc.text(`${PurityName}`, 19, 8);
      doc.text(`Size2: ${Size ? Size : ""}`, 3, 12);
      {
        RFIDCode ? doc.text(`testing`, 3, 4) : doc.text("test", 16, 12);
      }
      
    } else {
      doc.text(`${ItemCode}`, itemCodeX, itemCodeY);
    doc.text(`${RFIDCode ? RFIDCode : ""}`, stoneWtX, rfidY);

    doc.text(`GW: ${parseFloat(GrossWt).toFixed(2)}`, grossWtX, grossWtY);
    doc.text(`NT: ${parseFloat(NetWt).toFixed(2)}`, netWtX, netWtY);
    doc.text(`PC: ${Description}`, despX, despY);

    if (stWeight > 0) {
      doc.text(`ST: ${stWeight.toFixed(2)}`, stoneWtX, stoneWtY);
    }

    if (wdWeight > 0) {
      doc.text(`WD: ${wdWeight.toFixed(2)}`, stoneWtX, stoneWtY+3);
    }

    if (mopWeight > 0) {
      doc.text(`MOP: ${mopWeight.toFixed(2)}`, stoneWtX, stoneWtY+6);
    }

      //   doc.text(`${purity}`, 34, 4);
      //   doc.text(`${category_Name}`, 12, 7);
      //   doc.text(`${size ? size : ""}`, 12, 10);
    }

    try {
      // const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
      // doc.addImage(qrCodeDataUrl, "JPEG", 1, 0, imageWidth, imageHeight);
      // console.log(qrCodeDataUrl, "qrCodeDataUrl");
    } catch (error) {
      console.error(error);
    }
  }

  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );
};





const generateLabel1 = async (products) => {
  const doc = new jsPDF({
    format: [27, 14],
    // format: [81, 12],
    orientation: "landscape",
  });

  const fontSize = 7;
  const imageHeight = 12;
  const imageWidth = 12;

  for (let i = 0; i < products.length; i++) {
    const {
      collection,
      GrossWt,
      TotalStoneWeight,
      NetWt,
      TotalStoneAmount,
      ItemCode,
      PurityName,
      MRP,
      ProductNo,
      Pieces,
      Description,
      RFIDCode,
      CategoryName,
      Size,
      SKU,
      ProductTitle,
      OccassionName,
    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");
    // doc.line(26, 0, 26, 12);
    // {
    //   collection.length > 20
    //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
    //     : doc.text(`${collection}`, 1, 3);
    // }

    if (MRP == 0 || MRP === "") {
      // doc.text(`${itemCode}`, 2, 3);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 3, 8);
      doc.text(`${SKU}`, 17, 4);
      doc.text(`${ItemCode}`, 3, 4);
      doc.text(`${PurityName}`, 19, 8);
      doc.text(`Size: ${Size ? Size : ""}`, 3, 12);
      {
        RFIDCode ? doc.text(`${RFIDCode}`, 16, 12) : doc.text("", 16, 12);
      }
      // doc.text(`${occasion}`, 30, 6);
      // doc.text(`OW: ${parseFloat(stoneWeight).toFixed(3)}`, 30, 9);
      // doc.text(`NW: ${parseFloat(netWt).toFixed(3)}`, 43, 3);

      // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
      // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
      // doc.text(`PCS:${pieces}`, 48, 11.5);
      // doc.text(`${product_No}`, 4, 11.5);
      // doc.text(`${product_Name}`, 13, 6);
      // doc.text(`${description}`, 20, 6);
      // doc.setFontSize(7);
      // doc.setFontSize(5);
      // const maxLineLength = 27;
      // const descriptionLine1 = description.substring(0, maxLineLength);
      // const descriptionLine2 = description.substring(
      //   maxLineLength,
      //   maxLineLength * 2
      // );

      // doc.text(descriptionLine1, 4, 10);
      // doc.text(descriptionLine2, 4, 11.5);
    } else {
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 3, 8);
      doc.text(`${SKU}`, 17, 4);
      doc.text(`${ItemCode}`, 3, 4);
      doc.text(`${PurityName}`, 19, 8);
      doc.text(`Size: ${Size ? Size : ""}`, 3, 12);
      {
        RFIDCode ? doc.text(`${RFIDCode}`, 16, 12) : doc.text("", 16, 12);
      }

      //   doc.text(`${purity}`, 34, 4);
      //   doc.text(`${category_Name}`, 12, 7);
      //   doc.text(`${size ? size : ""}`, 12, 10);
    }

    try {
      // const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
      // doc.addImage(qrCodeDataUrl, "JPEG", 1, 0, imageWidth, imageHeight);
      // console.log(qrCodeDataUrl, "qrCodeDataUrl");
    } catch (error) {
      console.error(error);
    }
  }

  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );
};



const generateLabel2 = async (products) => {
  const doc = new jsPDF({
    format: [38, 25],
    // format: [81, 12],
    orientation: "landscape",
  });

  const fontSize = 7;
  const imageHeight = 12;
  const imageWidth = 12;

  for (let i = 0; i < products.length; i++) {
    const {
      collection,
      GrossWt,
      TotalStoneWeight,
      NetWt,
      TotalStoneAmount,
      ItemCode,
      PurityName,
      MRP,
      ProductNo,
      Pieces,
      Description,
      RFIDCode,
      CategoryName,
      Size,
      SKU,
      ProductTitle,
      OccassionName,
      Stones,
    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");
    // doc.line(26, 0, 26, 12);
    // {
    //   collection.length > 20
    //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
    //     : doc.text(`${collection}`, 1, 3);
    // }

    if (MRP == 0 || MRP === "" || MRP === "0.00") {
      // doc.text(`${itemCode}`, 2, 3);
      let yCoordinate = 4; // Starting Y-coordinate
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 3, yCoordinate);
      yCoordinate += 4;
      doc.setFontSize(5);
      if (Stones && Stones.length > 0) {
        Stones.forEach((stone) => {
          doc.text(
            `${stone.StoneName} ${parseFloat(stone.StoneWeight).toFixed(3)}`,
            3,
            yCoordinate
          );
          yCoordinate += 3; // Move to the next line
        });
      }
      doc.setFontSize(7);
      doc.text(`NWt: ${parseFloat(NetWt).toFixed(3)}`, 3, yCoordinate + 1);
      yCoordinate = 15;
      doc.setFontSize(5);
      if (Stones && Stones.length > 0) {
        Stones.forEach((stone) => {
          doc.text(`${stone.Description}`, 19, yCoordinate);
          yCoordinate += 3; // Move to the next line
        });
      }
    } else {
      let yCoordinate = 4; // Starting Y-coordinate
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 3, yCoordinate);
      yCoordinate += 4;
      doc.setFontSize(5);
      if (Stones && Stones.length > 0) {
        Stones.forEach((stone) => {
          doc.text(
            `${stone.StoneName} ${parseFloat(stone.StoneWeight).toFixed(3)}`,
            3,
            yCoordinate
          );
          yCoordinate += 3; // Move to the next line
        });
      }
      doc.setFontSize(7);
      doc.text(`NWt: ${parseFloat(NetWt).toFixed(3)}`, 3, yCoordinate + 1);
      yCoordinate = 15;
      doc.setFontSize(5);
      if (Stones && Stones.length > 0) {
        Stones.forEach((stone) => {
          doc.text(`${stone.Description}`, 19, yCoordinate);
          yCoordinate += 3; // Move to the next line
        });
      }
    }

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
      doc.addImage(qrCodeDataUrl, "JPEG", 25, 0, imageWidth, imageHeight);
      console.log(qrCodeDataUrl, "qrCodeDataUrl");
    } catch (error) {
      console.error(error);
    }
  }

  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );
};
