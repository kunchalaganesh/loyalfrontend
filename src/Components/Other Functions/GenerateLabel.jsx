import React from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";



export const GenerateLabel = async (products, labelFormat) => {
  console.log("checking labelformate12 ", labelFormat);
 
  // generatelabel11(products);
 
  if (labelFormat === 1) {
    // Thashna Label Below
    generateLabel1(products);
  } else if (labelFormat === 2) {
    // Nice Label Below
    generateLabeltashna(products);
  } else if (labelFormat === 3) {
    generateLabel3(products);
  } else if (labelFormat === 4) {
    generateLabel2(products);
  } else if (labelFormat === 5) {
    generateAndDownloadPrn(products);
  } else if (labelFormat == 6) {
    console.log("check formate  ", labelFormat);
    generatelabel6(products);
  }else if(labelFormat == 7){
    generatelabel7(products);
  }else if(labelFormat == 8){
    generatelabel8(products);
  }else if(labelFormat == 9){
    generatelabel9(products);
  }else if(labelFormat == 10){
    generatelabel10(products);
  }else if(labelFormat == 11){
    generatelabel11(products);
  }
};

const predefinedValues = {
  rfwtag16: "*1C00*",
  rfwtag48: "*5450313234*",
  qrCode: '"TP124"',
  weight: "10.000",
  pieces: "32",
  anotherWeight: "0.59",
  anotherQrCode: '"01GK6"',
};

const stringToHex = (str) => {
  return str
    .split("")
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
};

const generateAndDownloadPrn = async (products) => {


  const combinedContent = products
    .map((product) => generateLabelContent2(product))
    .join("\n"); // Add a newline between labels

  // const encoder = new TextEncoder();
  // const data = encoder.encode(combinedContent);

  const blob = new Blob([combinedContent], { type: "text/plain" });
  let fileName = "default.prn";
  if (products.length === 1) {
    fileName = `${products[0].ItemCode}.prn`; // Single product, use its ItemCode
  } else {
    const firstItemCode = products[0].ItemCode;
    const lastItemCode = products[products.length - 1].ItemCode;
    fileName = `${firstItemCode}_${lastItemCode}.prn`; // Multiple products, use first and last ItemCode
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; // Single file for all labels
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Create a blob and download the PRN files
  // prnContentArray.forEach((content, index) => {
  //   const blob = new Blob([content], { type: 'text/plain' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `label_${index + 1}.prn`;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // });
};

const printToDevice = async (device, products) => {
  const combinedContent = products
    .map((product) => generateLabelContent2(product))
    .join("\n"); // Add a newline between labels
  const encoder = new TextEncoder();
  const data = encoder.encode(combinedContent);

  try {
    await device.open();
    console.log("Device opened");
    await device.selectConfiguration(1);
    console.log("Configuration selected");
    await device.claimInterface(0);
    console.log("Interface claimed");
    await device.transferOut(1, data);
    console.log("Print job sent to printer");
    await device.close();
    console.log("Device closed");
  } catch (error) {
    console.error("Error printing to USB device:", error);
  }
};


const generateLabelContent2 = (product) => {
  const hexEPC = stringToHex(product.ItemCode).replace(/[^0-9A-F]/g, ""); // Ensure only valid hex characters are included
  const grossWt = parseFloat(product.GrossWt).toFixed(3) || 0;
  const pieces = parseInt(product.Pieces) || 1; // Ensure at least 1 to avoid division by zero
  const weightPerPiece = (grossWt / pieces).toFixed(3); // Format to 3 decimal places

  // Dynamically set RFWTAG length based on the actual byte size of hexEPC (1 byte = 2 hex chars)
  const epcBytes = hexEPC.length / 2; // Calculate how many bytes the EPC is
  const rfwtTagLength = epcBytes <= 6 ? 48 : epcBytes <= 8 ? 64 : 80; // 6 bytes = 48 bits, 8 bytes = 64 bits, 10 bytes = 80 bits

  console.log('checking prn  ', epcBytes, '  ',hexEPC )


  let pcValue = "";

  if (rfwtTagLength === 48) {
    pcValue = "*1C00*";
  } else if (rfwtTagLength === 64) {
    pcValue = "*2400*";
  } else if (rfwtTagLength === 80) {
    pcValue = "*3800*"; // Assuming this for 80 bits, you can adjust based on your needs.
  }
  return `!PTX_SETUP
ENGINE-WIDTH;454:LENGTH;1262:MIRROR;0.
PTX_END
~PAPER;ROTATE 0
~CONFIG
UPC DESCENDERS;0
END
~PAPER;LABELS 2;MEDIA 1
~PAPER;FEED SHIFT 0;INTENSITY 8;SPEED IPS 3;SLEW IPS 6;TYPE 0
~PAPER;CUT 0;PAUSE 0;TEAR 0
~CONFIG
CHECK DYNAMIC BCD;0
SLASH ZERO;0
UPPERCASE;0
AUTO WRAP;0
HOST FORM LENGTH;1
END
~CREATE;FORM-0;90
SCALE;DOT;203;203
ISET;'UTF8'
RFWTAG;16;PC
16;H;${pcValue}
STOP
RFWTAG;${rfwtTagLength};EPC
${rfwtTagLength};H;*${hexEPC}*
STOP
BARCODE
QRCODE;CCW;XD2;T2;E0;M0;I0;172;21
"${product.ItemCode}"
STOP
FONT;NAME CALIBRIB.ttf
ALPHA
CCW;POINT;154;33;7;9;"G:"
CCW;POINT;106;82;7;12;"P:"
CCW;POINT;124;33;7;10;"${grossWt}"
CCW;POINT;75;82;7;10;"${pieces}"
CCW;POINT;154;57;7;7;"W:"
CCW;POINT;119;57;7;11;"${weightPerPiece}"
CCW;POINT;237;82;7;9;"${product.ItemCode}"
STOP
END
~EXECUTE;FORM-0;1

~NORMAL
~DELETE FORM;FORM-0`;
  };




//   return `!PTX_SETUP
// ENGINE-WIDTH;1183:LENGTH;2207:MIRROR;0.
// PTX_END
// ~PAPER;ROTATE 0
// ~CONFIG
// UPC DESCENDERS;0
// END
// ~PAPER;LABELS 2;MEDIA 1
// ~PAPER;FEED SHIFT 0;INTENSITY 8;SPEED IPS 3;SLEW IPS 6;TYPE 0
// ~PAPER;CUT 0;PAUSE 0;TEAR 0
// ~CONFIG
// CHECK DYNAMIC BCD;0
// SLASH ZERO;0
// UPPERCASE;0
// AUTO WRAP;0
// HOST FORM LENGTH;1
// END
// ~CREATE;FORM-0;158
// SCALE;DOT;203;203
// ISET;'UTF8'
// RFWTAG;16;PC
// 16;H;*1C00*
// STOP
// RFWTAG;48;EPC
// 48;H;*${hexEPC}*
// STOP
// BARCODE
// QRCODE;CCW;XD3;T2;E0;M0;I0;372;140
// "${product.ItemCode}"
// STOP
// FONT;NAME CALIBRIB.ttf
// ALPHA
// CCW;POINT;363;163;9;9;"G:"
// CCW;POINT;328;225;9;9;"P:"
// CCW;POINT;337;163;9;9;"${grossWt}"
// CCW;POINT;304;225;9;9;"${pieces}"
// CCW;POINT;328;195;9;9;"W:"
// CCW;POINT;293;195;9;9;"${weightPerPiece}"
// CCW;POINT;436;227;9;11;"${product.ItemCode}"
// STOP
// END
// ~EXECUTE;FORM-0;1

// ~NORMAL
// ~DELETE FORM;FORM-0`;
// };

//     return `!PTX_SETUP
// ENGINE-WIDTH;1183:LENGTH;2207:MIRROR;0.
// PTX_END
// ~PAPER;ROTATE 0
// ~CONFIG
// UPC DESCENDERS;0
// END
// ~PAPER;LABELS 2;MEDIA 1
// ~PAPER;FEED SHIFT 0;INTENSITY 8;SPEED IPS 3;SLEW IPS 6;TYPE 0
// ~PAPER;CUT 0;PAUSE 0;TEAR 0
// ~CONFIG
// CHECK DYNAMIC BCD;0
// SLASH ZERO;0
// UPPERCASE;0
// AUTO WRAP;0
// HOST FORM LENGTH;1
// END
// ~CREATE;FORM-0;158
// SCALE;DOT;203;203
// ISET;'UTF8'
// RFWTAG;16;PC
// 16;H;*1C00*  ; // Update with actual RFW tag if needed
// STOP
// RFWTAG;48;EPC
// 48;H;*${hexEPC}*  ; // Assuming ItemCode can be used here
// STOP
// BARCODE
// QRCODE;CCW;XD3;T2;E0;M0;I0;372;140
// "${product.ItemCode}"  ; // Assuming you want to display Product Title
// STOP
// FONT;NAME CALIBRIB.ttf
// ALPHA
// CCW;POINT;363;163;9;9;"G:"
// CCW;POINT;363;195;9;9;"P:"
// CCW;POINT;337;163;9;9;"${product.GrossWt}"
// CCW;POINT;337;195;9;9;"${product.Pieces}"
// CCW;POINT;308;195;9;9;"W:"
// CCW;POINT;273;195;9;9;"${weightPerPiece}"
// CCW;POINT;436;227;9;11;"${product.ItemCode}"
// STOP
// END
// ~EXECUTE;FORM-0;1

// ~NORMAL
// ~DELETE FORM;FORM-0`;
// };

const generateLabelContent1 = (values) => {
  return `!PTX_SETUP
ENGINE-WIDTH;1183:LENGTH;2207:MIRROR;0.
PTX_END
~PAPER;ROTATE 0
~CONFIG
UPC DESCENDERS;0
END
~PAPER;LABELS 2;MEDIA 1
~PAPER;FEED SHIFT 0;INTENSITY 8;SPEED IPS 3;SLEW IPS 6;TYPE 0
~PAPER;CUT 0;PAUSE 0;TEAR 0
~CONFIG
CHECK DYNAMIC BCD;0
SLASH ZERO;0
UPPERCASE;0
AUTO WRAP;0
HOST FORM LENGTH;1
END
~CREATE;FORM-0;158
SCALE;DOT;203;203
ISET;'UTF8'
RFWTAG;16;PC
16;H;${values.rfwtag16}
STOP
RFWTAG;48;EPC
48;H;${values.rfwtag48}
STOP
BARCODE
QRCODE;CCW;XD3;T2;E0;M0;I0;372;140
${values.qrCode}
STOP
FONT;NAME CALIBRIB.ttf
ALPHA
CCW;POINT;363;163;9;9;"G:"
CCW;POINT;363;195;9;9;"P:"
CCW;POINT;337;163;9;9;"${values.weight}"
CCW;POINT;337;195;9;9;"${values.pieces}"
CCW;POINT;308;195;9;9;"W:"
CCW;POINT;273;195;9;9;"${values.anotherWeight}"
CCW;POINT;436;227;9;11;"${values.anotherQrCode}"
STOP
END
~EXECUTE;FORM-0;1

~NORMAL
~DELETE FORM;FORM-0`;
};

const convertToHex = (str) => {
  return str
    .split("")
    .map((char) => char.charCodeAt(0).toString(16))
    .join("");
};

const generateLabelContent = (product) => {
  const itemCodeHex = convertToHex(product.ItemCode);
  const grossWt = parseFloat(product.GrossWt);
  const pieces = parseInt(product.Pieces, 10);
  const weightPerPiece = pieces > 0 ? (grossWt / pieces).toFixed(2) : "0.00";

  const content = [
    "!PTX_SETUP",
    "ENGINE-WIDTH;1183:LENGTH;2207:MIRROR;0.",
    "PTX_END",
    "~PAPER;ROTATE 0",
    "~CONFIG",
    "UPC DESCENDERS;0",
    "END",
    "~PAPER;LABELS 2;MEDIA 1",
    "~PAPER;FEED SHIFT 0;INTENSITY 8;SPEED IPS 3;SLEW IPS 6;TYPE 0",
    "~PAPER;CUT 0;PAUSE 0;TEAR 0",
    "~CONFIG",
    "CHECK DYNAMIC BCD;0",
    "SLASH ZERO;0",
    "UPPERCASE;0",
    "AUTO WRAP;0",
    "HOST FORM LENGTH;1",
    "END",
    "~CREATE;FORM-0;158",
    "SCALE;DOT;203;203",
    "ISET;'UTF8'",
    "RFWTAG;16;PC",
    `16;H;*${itemCodeHex}*`,
    "STOP",
    "RFWTAG;48;EPC",
    `48;H;*${product.RFIDCode || "No RFID"}*`,
    "STOP",
    "BARCODE",
    "QRCODE;CCW;XD3;T2;E0;M0;I0;372;140",
    `"${product.ItemCode}"`,
    "STOP",
    "FONT;NAME CALIBRIB.ttf",
    "ALPHA",
    `CCW;POINT;363;163;9;9;"G:"`,
    `CCW;POINT;363;195;9;9;"P:"`,
    `CCW;POINT;337;163;9;9;"${weightPerPiece}"`,
    `CCW;POINT;337;195;9;9;"${pieces}"`,
    `CCW;POINT;308;195;9;9;"W:"`,
    `CCW;POINT;273;195;9;9;"${weightPerPiece}"`,
    `CCW;POINT;436;227;9;11;"${product.ItemCode}"`,
    "STOP",
    "END",
    "~EXECUTE;FORM-0;1",
    "",
    "~NORMAL",
    "~DELETE FORM;FORM-0",
  ];

  const finalContent = content.join("\n"); // Join with newline

  // Optional: Log the generated content to check for leading spaces
  console.log("Final content:", finalContent);

  return finalContent;
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

  const itemCodeX = 18; // X position for ItemCode
  const itemCodeY = 5; // Y position for ItemCode
  const rfidX = 18; // X position for RFID
  const rfidY = 6; // Y position for RFID

  const grossWtX = 1; // X position for GrossWt
  const grossWtY = 5; // Y position for GrossWt
  const netWtX = 1; // X position for NetWt
  const netWtY = 20; // Y position for NetWt

  const stoneWtX = 1; // X position for StoneWeight
  const stoneWtY = 9; // Y position for StoneWeight
  const piecesX = 16; // X position for Pieces
  const piecesY = 9; // Y position for Pieces

  const weightX = 1; // X position for Weight
  const weightY = 12; // Y position for Weight
  const despX = 18; // X position for Description
  const despY = 12; // Y position for Description

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
      const stoneY = stoneWtY + index * lineHeight;
      doc.text(`${stone.StoneName}: ${stone.StoneWeight}`, stoneWtX, stoneY);
    });

    if (ItemCode) {
      try {
        const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
        doc.addImage(
          qrCodeDataUrl,
          "JPEG",
          rfidX,
          rfidY,
          imageWidth,
          imageHeight
        );
      } catch (error) {
        console.error(error);
      }
    }

    // Bottom Section
    doc.text(`NT  : ${parseFloat(NetWt).toFixed(3)}`, netWtX, netWtY);
    doc.text("checking", despX, netWtY);
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

  const itemCodeX = 22; // X position for ItemCode
  const itemCodeY = 5; // Y position for ItemCode
  const rfidX = 22; // X position for RFID
  const rfidY = 5.5; // Y position for RFID

  const grossWtX = 1; // X position for GrossWt
  const grossWtY = 5; // Initial Y position for GrossWt

  const stoneWtX = 1; // X position for StoneWeight
  const stoneWtY = grossWtY + lineHeight * 2; // Initial Y position for StoneWeight

  const netWtX = 1; // X position for NetWt

  const despX = 19; // X position for Description
  const despY = 12; // Y position for Description

  for (let i = 0; i < products.length; i++) {
    const { GrossWt, NetWt, ItemCode, Stones } = products[i];

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
      const stoneY = stoneWtY + index * lineHeight;
      const stoneName =
        stone.StoneName.length > 5
          ? stone.StoneName.substring(0, 5)
          : stone.StoneName.padEnd(5, " ");
      doc.text(`${stoneName} : ${stone.StoneWeight}`, stoneWtX, stoneY);
    });

    // Calculate the Y position for NetWt based on the number of stones
    const stonesCount = Math.min(Stones.length, maxStonesToShow);
    const netWtY = stoneWtY + stonesCount * lineHeight + lineHeight;

    if (ItemCode) {
      try {
        const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
        doc.addImage(
          qrCodeDataUrl,
          "JPEG",
          rfidX,
          rfidY,
          imageWidth,
          imageHeight
        );
      } catch (error) {
        console.error(error);
      }
    }

    // Bottom Section
    doc.text(`N Wt : ${parseFloat(NetWt).toFixed(3)}`, netWtX, netWtY);
    doc.text("checking", despX, 20);
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

  const itemCodeX = 1; // X position for ItemCode
  const itemCodeY = 3; // Y position for ItemCode
  const rfidX = 16; // X position for RFID
  const rfidY = 3; // Y position for RFID

  const grossWtX = 1; // X position for GrossWt
  const grossWtY = 6; // Y position for GrossWt
  const netWtX = 16; // X position for NetWt
  const netWtY = 6; // Y position for NetWt

  const stoneWtX = 1; // X position for StoneWeight
  const stoneWtY = 9; // Y position for StoneWeight
  const piecesX = 16; // X position for Pieces
  const piecesY = 9; // Y position for Pieces

  const weightX = 1; // X position for Weight
  const weightY = 12; // Y position for Weight
  const despX = 16; // X position for Description
  const despY = 12; // Y position for Description

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

      doc.text(
        `ST: ${parseFloat(TotalStoneWeight).toFixed(4)}`,
        stoneWtX,
        stoneWtY
      );
      doc.text(`MOP: ${Pieces}`, piecesX, piecesY);

      doc.text(`WD: ${parseFloat(GrossWt).toFixed(3)}`, weightX, weightY);
      doc.text(`PC: ${Description}`, despX, despY);
    }

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
      doc.addImage(
        qrCodeDataUrl,
        "JPEG",
        rfidX,
        rfidY,
        imageWidth,
        imageHeight
      );
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

  const itemCodeX = 3; // X position for ItemCode
  const itemCodeY = 3; // Y position for ItemCode
  const rfidX = 16; // X position for RFID
  const rfidY = 3; // Y position for RFID

  const grossWtX = 3; // X position for GrossWt
  const grossWtY = 6; // Y position for GrossWt
  const netWtX = 3; // X position for NetWt
  const netWtY = 9; // Y position for NetWt

  const stoneWtX = 15.2; // X position for StoneWeight
  const stoneWtY = 6; // Y position for StoneWeight
  const piecesX = 16; // X position for Pieces
  const piecesY = 9; // Y position for Pieces

  const weightX = 1; // X position for Weight
  const weightY = 12; // Y position for Weight
  const despX = 3; // X position for Description
  const despY = 12; // Y position for Description

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

    const stWeight = Stones.reduce((total, stone) => {
      // if (stone.StoneName === "S.ST" || stone.StoneName === "B.ST") {
      if (
        stone.StoneName.includes("S.ST") ||
        stone.StoneName.includes("B.ST")
      ) {
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
      if (stone.StoneName === "WD") {
        return total + parseFloat(stone.StoneWeight);
      }
      return total;
    }, 0);

    console.log(
      "checking labelformate13",
      stWeight,
      "   ",
      mopWeight,
      "   ",
      wdWeight
    );

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
        doc.text(`WD: ${wdWeight.toFixed(2)}`, stoneWtX, stoneWtY + 3);
      }

      if (mopWeight > 0) {
        doc.text(`MOP: ${mopWeight.toFixed(2)}`, stoneWtX, stoneWtY + 6);
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



const generateLabeltashna = async (products) =>{
  const doc = new jsPDF({
    format: [27, 14],
    // format: [81, 12],
    orientation: "landscape",
  });

  const fontSize = 7;
  const imageHeight = 8;
  const imageWidth = 8;

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
      BoxName,
      DesignName
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
      doc.text(`${ItemCode}`, 2, 4);
      // doc.text(`${DesignName}`, 2, 3);
      doc.text(`${SKU}`, 16, 4);
      doc.text(`Size : ${Size}`, 2, 10.5);

      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 2, 7);
      doc.text(`${BoxName}`, 16, 7);
      doc.text(`${RFIDCode}`, 16, 10.5);
     
    } else {

      let yCoordinate = 4; // Starting Y-coordinate
      doc.text(`${ItemCode}`, 2, 3);
      // doc.text(`${DesignName}`, 2, 3);
      doc.text(`${SKU}`, 16, 3);
      doc.text(`Size : ${Size}`, 2, 9.5);

      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 2, 6);
      doc.text(`${BoxName}`, 16, 6);
      doc.text(`${RFIDCode}`, 16, 9.5);
      
    }

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
      // doc.addImage(qrCodeDataUrl, "JPEG", 16, 1, imageWidth, imageHeight);
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
}


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

const generatelabel6 = async (products) => {
  const doc = new jsPDF({
    format: [27, 14],
    // format: [81, 12],
    orientation: "landscape",
  });

  const fontSize = 7;
  // const imageHeight = 12;
  // const imageWidth = 12;

  const imageHeight = 2.5; // Adjust height of rupee symbol
  const imageWidth = 2.5;  // Adjust width of rupee symbol

  const rupeeSymbolBase64 = "iVBORw0KGgoAAAANSUhEUgAAABEAAAAZBAMAAAAlENikAAAAMFBMVEUAAAD///8fHx/39/cqKipiYmI9PT2VlZVwcHBXV1eBgYHLy8uqqqrm5ubr6+vf398JfM5GAAAAEHRSTlP/AP//////////////////0XJbHgAAAAlwSFlzAAAdhwAAHYcBj+XxZQAAAHhJREFUCNddzrENwgAMAMEPgoCo/ESR0gQYASQGCCuwARuQteiyAaNR2FVcXfO2ObGeQJ3YaaBeQINOuw+zQayDTaAazFl4416a2tryoNFg+L7Yam5pl9LT7Hv2Ja8spaApnak7+uNd6jmWsgk0m0Ad83vNJjVwMP6bZRHNoykkkgAAAABJRU5ErkJggg==";


  for (let i = 0; i < products.length; i++) {
    const {
      GrossWt,
      ItemCode,
      PurityName,
      MRP,
      RFIDCode,
      CategoryName,
      Size,
      SKU,
      ProductTitle,
      OccassionName,
      Description,
      MakingPerGram
    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");

    let amount = parseInt(`${GrossWt*MakingPerGram}`)


    if (MRP == 0 || MRP === "") {
      // doc.text(`${itemCode}`, 2, 3);

      doc.text(`${ItemCode}`, 1.2, 4);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 1.2, 7.5);
      doc.addImage(rupeeSymbolBase64, 'PNG', 1.2, 10, imageWidth, imageHeight);

      // Write the MRP next to the rupee symbol image
      doc.text(`${amount}`, 5.3, 12);
      doc.text(`${RFIDCode}`, 15.3,4);
      doc.text(`${Description}`, 15.3, 7.5);
      doc.text(`${OccassionName}`, 15.3, 12);


      // doc.text(`Size: ${Size ? Size : ""}`, 10, 12);
       
      
     
      // doc.text(`${ItemCode}`, 3, 4);
      // doc.text(`${PurityName}`, 19, 8);
      
      
    } else {

      doc.text(`${ItemCode}`, 1.2, 4);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 1.2, 7.5);
      doc.addImage(rupeeSymbolBase64, 'PNG', 1.2, 9, imageWidth, imageHeight);

      // Write the MRP next to the rupee symbol image
      doc.text(`${GrossWt*MakingPerGram}`, 5.3, 12);
      doc.text(`${RFIDCode}`, 15.3,4);
      doc.text(`${OccassionName}`, 15.3, 12);
      
      
      doc.text(`${Description}`, 15.3, 7.5);

      // doc.text(`${ItemCode}`, 3, 4);
      // // doc.text(`Size: ${Size ? Size : ""}`, 10, 12);
       
      // doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 3, 8);
      // doc.text(`MRP`, 3, 10);
      // // doc.text(`${ItemCode}`, 3, 4);
      // doc.text(`${PurityName}`, 19, 8);
      // doc.text(`${RFIDCode}`, 16,11);
      

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


const generatelabel7 = async (products) => {
  const doc = new jsPDF({
    format: [27, 14],
    // format: [81, 12],
    orientation: "landscape",
  });

  const fontSize = 5.5;
  const imageHeight = 12;
  const imageWidth = 12;

  for (let i = 0; i < products.length; i++) {
    const {
      GrossWt,
      ItemCode,
      PurityName,
      MRP,
      RFIDCode,
      CategoryName,
      Size,
      SKU,
      ProductTitle,
      OccassionName,
      NetWt,
      TotalStoneWeight,
      TotalStoneAmount,
      MakingPerGram,
      MakingPercentage
    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");

    if (MRP == 0 || MRP === "") {
      // doc.text(`${itemCode}`, 2, 3);

      doc.text(`${ItemCode}`, 1.5, 3.7);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 1.5, 5.8);
      doc.text(`St W: ${parseFloat(TotalStoneWeight).toFixed(3)}`, 1.5, 7.8);
      doc.text(`Nt W: ${parseFloat(NetWt).toFixed(3)}`, 1.5, 9.8);
     
      doc.text(`${RFIDCode}`, 14.5,9.8);
      doc.text(`MKG: ${parseInt(MakingPercentage)} %`, 14.5, 5.8);
      doc.text(`St A: ${parseFloat(TotalStoneAmount).toFixed(3)}`, 14.5, 7.8);
      // doc.text(`MRP`, 17, 10);
      // doc.text(`${ItemCode}`, 3, 4);
      doc.text(`${PurityName}`, 14.5, 3.7);
      doc.text(`Size ${Size}`, 14.5, 12);
      
      
    } else {
      doc.text(`${ItemCode}`, 1.5, 3.7);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 1.5, 5.8);
      doc.text(`St W: ${parseFloat(TotalStoneWeight).toFixed(3)}`, 1.5, 7.8);
      doc.text(`Nt W: ${parseFloat(NetWt).toFixed(3)}`, 1.5, 9.8);
     
      doc.text(`${RFIDCode}`, 14.5,9.8);
      doc.text(`MKG: ${parseInt(MakingPercentage)} %`, 14.5, 5.8);
      doc.text(`St A: ${parseFloat(TotalStoneAmount).toFixed(3)}`, 14.5, 7.8);
      // doc.text(`MRP`, 17, 10);
      // doc.text(`${ItemCode}`, 3, 4);
      doc.text(`${PurityName}`, 14.5, 3.7);
      doc.text(`Size ${Size}`, 14.5, 12);

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

const generatelabel8 = async (products) => {
  const doc = new jsPDF({
    format: [85, 15],
    // format: [81, 12],
    orientation: "landscape",
  });

  const fontSize = 7;
  const imageHeight = 8;
  const imageWidth = 8;

  for (let i = 0; i < products.length; i++) {
    const {
      ProductName,
      GrossWt,
      ItemCode,
      PurityName,
      MRP,
      RFIDCode,
      CategoryName,
      Size,
      SKU,
      ProductTitle,
      OccassionName,
      NetWt,
      TotalStoneWeight,
      TotalStoneAmount,
      MakingPerGram,
      Pieces,
      Stones,
      DesignName,
      VendorName
    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");

    if (MRP == 0 || MRP === "") {
      // doc.text(`${itemCode}`, 2, 3);

      //ashtalaxmi
      doc.text(`ASHTALAXMI`, 2, 2.8);

      
      doc.text(`G Wt: ${parseFloat(GrossWt).toFixed(3)}`, 2, 5.8);
      // doc.text(`St W: ${parseFloat(TotalStoneWeight).toFixed(3)}`, 2, 7.8);
      doc.text(`N Wt: ${parseFloat(NetWt).toFixed(3)}`, 2, 8);
      // doc.text(`MKG: ${parseFloat(MakingPerGram).toFixed(3)}`, 5,12);

      let yCoordinate = 3;
      if (Stones && Stones.length > 0) {
        Stones.forEach((stone) => {
          const shortStoneName = stone.StoneName.substring(0, 2);
          const formattedWeight = parseFloat(stone.StoneWeight).toFixed(3);

          // Print stone details at an appropriate X and Y position
          doc.text(`${shortStoneName} ${formattedWeight}`, 32, yCoordinate);
          yCoordinate += 2.5; // Spacing between stone entries
        });
      }

      doc.text(`${PurityName}`, 44, 5);
      doc.text(`${VendorName}`, 44, 10);
      
      doc.text(`${Size}`, 44, 7.5);
      
      doc.text(`${DesignName}-${ItemCode}`, 2, 10.2);

      //  const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
      // doc.addImage(qrCodeDataUrl, "JPEG", 17, 3.9, imageWidth, imageHeight);

      
      
      
    } else {
      doc.text(`ASHTALAXMI`, 5, 5.8);
      doc.text(`${ProductName}`, 2, 3.7);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 2, 5.8);
      doc.text(`St W: ${parseFloat(TotalStoneWeight).toFixed(3)}`, 2, 7.8);
      doc.text(`Nt W: ${parseFloat(NetWt).toFixed(3)}`, 2, 9.8);
      // doc.text(`MKG: ${parseFloat(MakingPerGram).toFixed(3)}`, 2,12);
     
      doc.text(`${ItemCode}`, 18, 3.7);
      

       
      doc.text(`${PurityName}`, 28, 3.7);
      doc.text(`${Pieces}`, 28, 5.7);
    }

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
      doc.addImage(qrCodeDataUrl, "JPEG", 18, 3.9, imageWidth, imageHeight);
      

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


const generatelabel9 = async (products) => {
  const doc = new jsPDF({
    // format: [27, 14],
    format: [81, 12],
    orientation: "landscape",
  });

  const fontSize = 5.5;
  const imageHeight = 7;
  const imageWidth = 7;

  for (let i = 0; i < products.length; i++) {
    const {
      GrossWt,
      ItemCode,
      PurityName,
      MRP,
      RFIDCode,
      CategoryName,
      Size,
      SKU,
      ProductTitle,
      OccassionName,
      NetWt,
      TotalStoneWeight,
      TotalStoneAmount,
      MakingPerGram,
      MakingPercentage,
      ProductName,
      Description
    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");

    if (MRP == 0 || MRP === "") {
      // doc.text(`${itemCode}`, 2, 3);

      doc.text(`${ProductName}`, 2, 3.7);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 2, 5.8);
      doc.text(`St W: ${parseFloat(TotalStoneWeight).toFixed(3)}`, 2, 7.8);
      doc.text(`Nt W: ${parseFloat(NetWt).toFixed(3)}`, 2, 9.8);
     
      doc.text(`${ItemCode}`, 30,10);
      doc.text(`${Description}`, 30,12);
      doc.text(`${TotalStoneAmount}`, 38,5);

      
      
    } else {
      doc.text(`${ProductName}`, 2, 3.7);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 2, 5.8);
      doc.text(`St W: ${parseFloat(TotalStoneWeight).toFixed(3)}`, 2, 7.8);
      doc.text(`Nt W: ${parseFloat(NetWt).toFixed(3)}`, 2, 9.8);
     
      doc.text(`${ItemCode}`, 30,10);
      doc.text(`${Description}`, 30,12);
      doc.text(`${TotalStoneAmount}`, 38,5);
    }

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
      doc.addImage(qrCodeDataUrl, "JPEG", 30, 1, imageWidth, imageHeight);
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


const generatelabel10 = async (products) => {
  const doc = new jsPDF({
    // format: [27, 14],
    format: [81, 12],
    orientation: "landscape",
  });

  const fontSize = 5.5;
  const imageHeight = 7;
  const imageWidth = 7;

  for (let i = 0; i < products.length; i++) {
    const {
      GrossWt,
      ItemCode,
      PurityName,
      MRP,
      RFIDCode,
      CategoryName,
      Size,
      SKU,
      ProductTitle,
      OccassionName,
      NetWt,
      TotalStoneWeight,
      TotalStoneAmount,
      MakingPerGram,
      MakingPercentage,
      ProductName,
      Description
    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");

    if (MRP == 0 || MRP === "") {
      // doc.text(`${itemCode}`, 2, 3);

      doc.text(`${ProductName}`, 2, 3.7);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 2, 5.8);
      doc.text(`St W: ${parseFloat(TotalStoneWeight).toFixed(3)}`, 2, 7.8);
      doc.text(`Nt W: ${parseFloat(NetWt).toFixed(3)}`, 2, 9.8);
     
      doc.text(`${ItemCode}`, 30,10);
      doc.text(`${Description}`, 30,12);
      doc.text(`${TotalStoneAmount}`, 38,5);

      
      
    } else {
      doc.text(`${ProductName}`, 2, 3.7);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 2, 5.8);
      doc.text(`St W: ${parseFloat(TotalStoneWeight).toFixed(3)}`, 2, 7.8);
      doc.text(`Nt W: ${parseFloat(NetWt).toFixed(3)}`, 2, 9.8);
     
      doc.text(`${ItemCode}`, 30,10);
      doc.text(`${Description}`, 30,12);
      doc.text(`${TotalStoneAmount}`, 38,5);
    }

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
      doc.addImage(qrCodeDataUrl, "JPEG", 30, 1, imageWidth, imageHeight);
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


const generatelabel11 = async (products) => {
  const doc = new jsPDF({
    // format: [27, 14],
    format: [85, 15],
    orientation: "landscape",
  });

  const fontSize = 5.5;
  const imageHeight = 7;
  const imageWidth = 7;


  const leftx = 15;
  const lefty = 2;
  const middlex = 45;
  const middley = 1.5;

  const rightx = 33;
  const righty = 2;

   // Dummy stone array
   const Stones = [
    { StoneName: "Diamond", StoneWeight: 0.5 },
    { StoneName: "Ruby", StoneWeight: 1.0 },
    { StoneName: "Sapphire", StoneWeight: 0.75 },
    { StoneName: "Emerald", StoneWeight: 0.4 },
    { StoneName: "Opal", StoneWeight: 0.6 },
    { StoneName: "Topaz", StoneWeight: 0.9 },
    { StoneName: "Topaz", StoneWeight: 0.9 },
    { StoneName: "Topaz", StoneWeight: 0.9 },
    { StoneName: "Topaz", StoneWeight: 0.9 },
    { StoneName: "Topaz", StoneWeight: 0.9 },
    { StoneName: "Topaz", StoneWeight: 0.9 },
    // You can add more stones as needed
  ];


  for (let i = 0; i < products.length; i++) {
    const {
      GrossWt,
      ItemCode,
      PurityName,
      MRP,
      RFIDCode,
      CategoryName,
      Size,
      SKU,
      ProductTitle,
      OccassionName,
      NetWt,
      TotalStoneWeight,
      TotalStoneAmount,
      MakingPerGram,
      MakingPercentage,
      ProductName,
      Description,
      // Stones
    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");

    if (MRP == 0 || MRP === "") {


       // Adding stones array (first fill 5 stones, then wrap around)
       let stoneX = leftx; // Starting point for stones
       let stoneY = lefty;
       const stoneWrapOffset = 12; // Offset for wrapping stones to the left of the previous
 
       for (let j = 0; j < Stones.length; j++) {
         if (j < 5) {
           // Place the first 5 stones in a row
           doc.text(
 `${Stones[j].StoneName.substring(0, 4)}: ${Stones[j].StoneWeight}`,
             stoneX,
             stoneY + j * 2.5
           );
         } else {
           // Wrap remaining stones to the left side of the previous ones
           doc.text(
 `${Stones[j].StoneName.substring(0, 4)}: ${Stones[j].StoneWeight}`,
             stoneX - stoneWrapOffset, // Move left
             stoneY + (j - 5) * 2.5
           );
         }
       }


      doc.text(`G :  ${GrossWt}`, rightx, righty)
      doc.text(`L :  ${TotalStoneWeight}`, rightx, righty+2.5)
      doc.text(`N :  ${NetWt}`, rightx, righty+5)
      doc.text(`R :  ${TotalStoneAmount}`, rightx, righty+7.5)
      doc.text(`${SKU}`, rightx, righty+10)


      doc.text(`${ItemCode}`, middlex, middley+8.5)
      doc.text(`${RFIDCode||''}`, middlex, middley+10.5)


       




      // doc.text(`${itemCode}`, 2, 3);

      // doc.text(`${ProductName}`, 2, 3.7);
      // doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 2, 5.8);
      // doc.text(`St W: ${parseFloat(TotalStoneWeight).toFixed(3)}`, 2, 7.8);
      // doc.text(`Nt W: ${parseFloat(NetWt).toFixed(3)}`, 2, 9.8);
     
      // doc.text(`${ItemCode}`, 30,10);
      // doc.text(`${Description}`, 30,12);
      // doc.text(`${TotalStoneAmount}`, 38,5);

      
      
    } else {
      doc.text(`G :  ${GrossWt}`, leftx, lefty)
      doc.text(`L :  ${TotalStoneWeight}`, leftx, lefty+2.5)
      doc.text(`N :  ${NetWt}`, leftx, lefty+5)
      doc.text(`R :  ${TotalStoneAmount}`, leftx, lefty+7.5)
      doc.text(`${SKU}`, leftx, lefty+10)


      doc.text(`${ItemCode}`, middlex, middley+8.5)
      doc.text(`${RFIDCode||''}`, middlex, middley+10.5)


        // Adding stones array (first fill 5 stones, then wrap around)
        let stoneX = rightx; // Starting point for stones
        let stoneY = righty;
        const stoneWrapOffset = 18; // Offset for wrapping stones to the left of the previous
  
        for (let j = 0; j < Stones.length; j++) {
          if (j < 5) {
            // Place the first 5 stones in a row
            doc.text(
  `${Stones[j].StoneName.substring(0, 4)}: ${Stones[j].StoneWeight}`,
              stoneX,
              stoneY + j * 2.5
            );
          } else {
            // Wrap remaining stones to the left side of the previous ones
            doc.text(
  `${Stones[j].StoneName.substring(0, 4)}: ${Stones[j].StoneWeight}`,
              stoneX - stoneWrapOffset, // Move left
              stoneY + (j - 5) * 2.5
            );
          }
        }
    }

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
      doc.addImage(qrCodeDataUrl, "JPEG", middlex, middley, imageWidth, imageHeight);
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