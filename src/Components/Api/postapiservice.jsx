import {
    a1,
    a125,
    a128,
    a134,
    a136,
    a146,
    a149,
    a152,
    a153,
    a154,
    a155,
    a156,
    a157,
    a158,
    a159,
    a163,
    a174,
    a18,
    a191,
    a194,
    a20,
    a22,
    a28,
    a4,
    a40,
    a41,
    a48,
    a49,
    a51,
    a53,
    a56,
    a57,
    a59,
    a61,
    a64,
    a65,
    a66,
    a71,
    a74,
    getAllSizeWeightRate,
} from "../Api/RootApiPath";

// postApiService.jsx
// postApiServices.jsx
export const createOrder = async (orderDetails) => {
    const {
      allSelectedProducts,
      selectedCustomer,
      selectedDate,
      invoiceNumber,
      selectedFiles,
      clientCode,
      CompanyId,
      CounterId,
      BranchId,
      EmployeId,
      totalPayableGstAmount,
      totalPayableAmount,
      totalPayableGold,
      totalPayableSilver,
      discountAmount,
      grandTotal,
      selectedSkuName,
      a154,
      allProdctsNetAmount,
      payments,
      gstType
    } = orderDetails;
  
    let totalGold = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.BalanceGold),
      0
    );
  
    let totalSilver = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.BalanceSilver),
      0
    );
  
    let totalQuantity = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.Quantity),
      0
    );
  
    let totalWtReceive = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.FineWt),
      0
    );
  
    let totalFineWithWstageWt = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.FineWastageWt),
      0
    );
  
    let totalHallmarkAmt = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.HallmarkAmt),
      0
    );
  
    let totalTagWeight = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.TagWeight),
      0
    );
  
    let totalFindingWeight = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.FindingWeight),
      0
    );
  
    let totalLanyardWeight = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.LanyardWeight),
      0
    );
  
    let unlabelledSilverWeight = allSelectedProducts
      .filter(
        (x) =>
          !x.AddToUnlabelled && x.CategoryName.toLowerCase().includes("silver")
      )
      .reduce((total, product) => total + parseFloat(product.FineWt), 0);
  
    let unlabelledGoldWeight = allSelectedProducts
      .filter(
        (x) =>
          !x.AddToUnlabelled && x.CategoryName.toLowerCase().includes("gold")
      )
      .reduce((total, product) => total + parseFloat(product.FineWt), 0);
  
    let unlabelledOtherMetalWeight = allSelectedProducts
      .filter(
        (x) =>
          !x.AddToUnlabelled &&
          !x.CategoryName.toLowerCase().includes("silver") &&
          !x.CategoryName.toLowerCase().includes("gold")
      )
      .reduce((total, product) => total + parseFloat(product.FineWt), 0);
  
    let totalStoneWeight = allSelectedProducts.reduce(
      (totalProductWeight, product) => {
        let productStoneWeight = product.Stones.reduce(
          (totalStoneWeight, stone) => {
            return totalStoneWeight + parseFloat(stone.StoneWeight || 0);
          },
          0
        );
        return totalProductWeight + productStoneWeight;
      },
      0
    );
  
    let totalStoneAmount = allSelectedProducts.reduce(
      (totalProductWeight, product) => {
        let productStoneWeight = product.Stones.reduce(
          (totalStoneWeight, stone) => {
            return totalStoneWeight + parseFloat(stone.StoneAmount || 0);
          },
          0
        );
        return totalProductWeight + productStoneWeight;
      },
      0
    );
  
    let totalStonePieces = allSelectedProducts.reduce(
      (totalProductWeight, product) => {
        let productStoneWeight = product.Stones.reduce(
          (totalStoneWeight, stone) => {
            return totalStoneWeight + parseFloat(stone.StonePieces || 0);
          },
          0
        );
        return totalProductWeight + productStoneWeight;
      },
      0
    );
  
    let totalDiamondWeight = allSelectedProducts.reduce(
      (totalProductWeight, product) => {
        let productStoneWeight = product.Diamonds.reduce(
          (totalStoneWeight, stone) => {
            return totalStoneWeight + parseFloat(stone.DiamondWeight || 0);
          },
          0
        );
        return totalProductWeight + productStoneWeight;
      },
      0
    );
  
    let totalDiamondPieces = allSelectedProducts.reduce(
      (totalProductWeight, product) => {
        let productStoneWeight = product.Diamonds.reduce(
          (totalStoneWeight, stone) => {
            return totalStoneWeight + parseFloat(stone.DiamondPieces || 0);
          },
          0
        );
        return totalProductWeight + productStoneWeight;
      },
      0
    );
  
    let totalDiamondAmount = allSelectedProducts.reduce(
      (totalProductWeight, product) => {
        let productStoneWeight = product.Diamonds.reduce(
          (totalStoneWeight, stone) => {
            return totalStoneWeight + parseFloat(stone.DiamondAmount || 0);
          },
          0
        );
        return totalProductWeight + productStoneWeight;
      },
      0
    );
  
    const dateToSend = selectedDate || getTodaysDateInHTMLFormat();
    try {
      const formData = new FormData();
  
      formData.append("TotalNetAmount", parseFloat(allProdctsNetAmount).toFixed(3));
      formData.append("TotalGSTAmount", parseFloat(totalPayableGstAmount).toFixed(3));
      formData.append("TotalPurchaseAmount", parseFloat(totalPayableAmount).toFixed(3));
      formData.append("PurchaseStatus", payments.length > 0 ? "Partial" : "None");
      formData.append("Quantity", totalQuantity);
      formData.append("PurchaseAmount", parseFloat(totalPayableAmount).toFixed(3));
      formData.append("VendorId", selectedCustomer.Id);
      formData.append("GSTApplied", gstType);
      formData.append("Branch", "Home");
      formData.append("PurchaseType", "Purchase");
      formData.append("Discount", parseFloat(discountAmount).toFixed(3));
      formData.append("Remark", "");
      formData.append("BalanceGold", parseFloat(totalPayableGold).toFixed(3));
      formData.append("BalanceSilver", parseFloat(totalPayableSilver).toFixed(3));
      formData.append("BalanceAmount", parseFloat(grandTotal).toFixed(3));
      formData.append("BalanceOtherMetal", "0");
      formData.append("DebitAmount", "0");
      formData.append("DebitGold", "0");
      formData.append("DebitSilver", "0");
      formData.append("DebitOtherMetal", "0");
      formData.append("TotalFineGold", parseFloat(totalGold).toFixed(3));
      formData.append("TotalFineSilver", parseFloat(totalSilver).toFixed(3));
      formData.append("TotalFineOtherMetal", "0");
      formData.append("InvoiceNo", invoiceNumber);
  
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("InvoiceFile", file);
        });
      } else {
        formData.append("InvoiceFile", "");
      }
  
      formData.append("InwardNo", `${parseInt(selectedCustomer.InwardNo) + 1}`);
      formData.append("PurchaseDate", dateToSend);
      formData.append("ClientCode", clientCode);
      formData.append("CompanyId", CompanyId || 0);
      formData.append("CounterId", CounterId || 0);
      formData.append("BranchId", BranchId || 0);
      formData.append("EmployeeId", EmployeId || 0);
      formData.append("TotalWtReceive", totalWtReceive);
      formData.append("TotalFineWithWstageWt", totalFineWithWstageWt);
      formData.append("StockKeepingUnit", selectedSkuName);
      formData.append("LotNumber", "");
      formData.append("TotalHallmarkAmount", totalHallmarkAmt);
      formData.append("TotalTagWeight", totalTagWeight);
      formData.append("TotalFindingWeight", totalFindingWeight);
      formData.append("TotalLanyardWeight", totalLanyardWeight);
      formData.append("UnlabelledSilverWeight", unlabelledSilverWeight);
      formData.append("UnlabelledGoldWeight", unlabelledGoldWeight);
      formData.append("UnlabelledOtherMetalWeight", unlabelledOtherMetalWeight);
      formData.append("TotalStoneWeight", totalStoneWeight);
      formData.append("TotalStoneAmount", totalStoneAmount);
      formData.append("TotalStonePieces", totalStonePieces);
      formData.append("TotalDiamondWeight", totalDiamondWeight);
      formData.append("TotalDiamondPieces", totalDiamondPieces);
      formData.append("TotalDiamondAmount", totalDiamondAmount);
      formData.append("AssignedGoldWeight", "0");
      formData.append("AssignedSilverWeight", "0");
      formData.append("AssignedOtherMetalWeight", "0");
      formData.append("AssignedDiamondWeight", "0");
  
      const response = await fetch(a154, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };
  
  export const sendProductData = async (products) => {
    try {
      const response = await fetch("API_ENDPOINT_FOR_PRODUCT_DATA", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending product data:", error);
      throw error;
    }
  };
  