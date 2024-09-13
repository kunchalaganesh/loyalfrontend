class ProductCalculator {
  static calculateAll(
    purchaseProduct,
    allDiamondSizeWeightRate,
    allPurities,
    allVendorTounche,
    selectedCustomer,
    selectedSku,
    selectedSkuName,
    finePure,
    convertAmount,
    gstType
  ) {
    const updatedProduct = { ...purchaseProduct };

    // Purity and Vendor Tounche Calculations
    this.calculatePurityAndVendorTounche(
      updatedProduct,
      allPurities,
      allVendorTounche,
      selectedCustomer
    );

    // Diamond Calculations
    this.calculateDiamonds(updatedProduct, allDiamondSizeWeightRate);

    // Net Weight Calculations
    this.calculateNetWeight(updatedProduct, selectedSku);

    // Wastage and Fine Calculations
    this.calculateWastageAndFine(updatedProduct, finePure);

    // Total Price Calculations
    this.calculateTotalPrice(updatedProduct, convertAmount, gstType);

    return updatedProduct;
  }

  static calculateDiamonds(updatedProduct, allDiamondSizeWeightRate) {
    const newDiamond = updatedProduct.Diamonds;

    const totalDiamondAmount = newDiamond.reduce(
      (acc, diamond) => acc + (parseFloat(diamond.DiamondRate) || 0),
      0
    );

    // Calculate total DiamondPurchaseAmount
    const totalDiamondPurchaseAmount = newDiamond.reduce(
      (acc, diamond) => acc + (parseFloat(diamond.DiamondPurchaseAmt) || 0),
      0
    );

    // Calculate total DiamondWeight
    const totalDiamondWeight = newDiamond.reduce(
      (acc, diamond) => acc + (parseFloat(diamond.DiamondTotalWeight) || 0),
      0
    );

    // Calculate total DiamondPieces
    const totalDiamondPieces = newDiamond.reduce(
      (acc, diamond) => acc + (parseInt(diamond.DiamondPieces, 10) || 0),
      0
    );

    // Calculate total StoneWeight
    const totalStoneWeight = newDiamond.reduce(
      (acc, diamond) => acc + (parseFloat(diamond.StoneWeight) || 0),
      0
    );

    // Calculate NetWt
    const netwt = parseFloat(
      parseFloat(updatedProduct.GrossWt) -
        parseFloat(updatedProduct.StoneWt) -
        parseFloat(
          parseFloat(updatedProduct.ClipWeight) *
            parseFloat(updatedProduct.ClipQuantity)
        ) -
        parseFloat(totalDiamondWeight / 5)
    ).toFixed(3);

    const totalDiamondQty = newDiamond.length;

    // Update the product with the calculated values
    // updatedProduct.Diamonds = newDiamond;
    updatedProduct.TotalDiamondWeight = totalDiamondWeight || 0;
    updatedProduct.TotalDiamondQty = totalDiamondQty || 0;
    updatedProduct.TotalDiamondAmount = totalDiamondPurchaseAmount || 0;
    updatedProduct.NetWt = netwt;

    console.log("Total diamond weight: ", totalDiamondWeight);
    console.log("Total diamond pieces: ", totalDiamondPieces);
    console.log("Total diamond amount: ", totalDiamondPurchaseAmount);
    console.log("Total stone weight: ", totalStoneWeight);
  }

  static calculateNetWeight(updatedProduct, selectedSku) {
    if (
      updatedProduct.GrossWt ||
      updatedProduct.StoneWt ||
      updatedProduct.ClipWeight ||
      updatedProduct.ClipQuantity
    ) {
      const totalDiamondWeight = updatedProduct.Diamonds.reduce(
        (acc, diamond) => acc + (parseFloat(diamond.DiamondTotalWeight) || 0),
        0
      );

      // Calculate totalStoneWeight considering null or empty values as 0
      const totalStoneWeight = updatedProduct.Stones.reduce((acc, stone) => {
        const stoneWeight = parseFloat(stone.TotalStoneWt) || 0;
        return acc + stoneWeight;
      }, 0);

      const totalStonepieces = updatedProduct.Stones.reduce((acc, stone) => {
        const stoneWeight = parseFloat(stone.TotalStonePcs) || 0;
        return acc + stoneWeight;
      }, 0);

      const skuPieces = parseFloat(selectedSku?.Pieces) || 1;

      // Calculate StoneWt
      const tweight = totalStoneWeight;

      const tpieces = totalStonepieces;

      let value = updatedProduct.StoneWt;
      if (tweight > 0) {
        updatedProduct.StoneWt = tweight.toFixed(3);
      } else {
        updatedProduct.StoneWt = value;
      }

      updatedProduct.StonePieces = tpieces;

      updatedProduct.NetWt = parseFloat(
        parseFloat(updatedProduct.GrossWt || 0) -
          parseFloat(updatedProduct.StoneWt || 0) -
          parseFloat(
            parseFloat(updatedProduct.ClipWeight || 0) *
              parseFloat(updatedProduct.ClipQuantity || 1)
          ) -
          parseFloat(totalDiamondWeight / 5)
      ).toFixed(3);
    }

    let fineWeight =
      (parseFloat(updatedProduct.NetWt) *
        parseFloat(updatedProduct.FinePercent)) /
      100;
    updatedProduct.FineWt = fineWeight;
  }

  static calculatePurityAndVendorTounche(
    updatedProduct,
    allPurities,
    allVendorTounche,
    selectedCustomer
  ) {
    console.log("checking fine ", updatedProduct);
    if (updatedProduct.FinePercent) {
      if (updatedProduct.FinePercent !== "") {
        let matchingPurity = allPurities.find(
          (purity) =>
            Math.abs(
              parseFloat(purity.FinePercentage) -
                parseFloat(updatedProduct.FinePercent)
            ) <= 0.5
        );
        updatedProduct.PurityId = matchingPurity ? matchingPurity.Id : 0;
      } else {
        updatedProduct.PurityId = 0;
      }

      // console.log('checking vendor ',allVendorTounche )
      // console.log('checking product ',updatedProduct )
      // console.log('checking selectedcustomer  ',selectedCustomer )

      // const matchingVendorTounche = allVendorTounche.filter(
      //   (tounches) =>
      //     tounches.CategoryId === updatedProduct.CategoryId &&
      //     tounches.ProductId === updatedProduct.ProductId &&
      //     tounches.VendorId === selectedCustomer.Id &&
      //     tounches.PurityId === updatedProduct.PurityId

      //     // && tounches.StockKeepingUnit === updatedProduct.StockKeepingUnit
      // );

      const categoryId = parseInt(updatedProduct.CategoryId, 10);
      const productId = parseInt(updatedProduct.ProductId, 10);
      const vendorId = parseInt(selectedCustomer.Id, 10);
      const purityId = parseInt(updatedProduct.PurityId, 10);

      const matchingVendorTounche = allVendorTounche.filter((tounches) => {
        console.log(
          `Comparing: tounches.CategoryId=${tounches.CategoryId} === ${categoryId}, 
        tounches.ProductId=${tounches.ProductId} === ${productId}, 
        tounches.VendorId=${tounches.VendorId} === ${vendorId}, 
        tounches.PurityId=${tounches.PurityId} === ${purityId}`
        );

        return (
          tounches.CategoryId === categoryId &&
          tounches.ProductId === productId &&
          tounches.VendorId === vendorId &&
          tounches.PurityId === purityId
        );
      });

      console.log("Matching Vendor Tounche: ", matchingVendorTounche);

      let wastagewt = updatedProduct.WastageWt;
      let MakingPercentage = updatedProduct.MakingPercentage;
      let MakingFixedAmt = updatedProduct.MakingFixedAmt;
      let MakingFixedWastage = updatedProduct.MakingFixedWastage;
      let MakingPerGram = updatedProduct.MakingPerGram;

      if (selectedCustomer && matchingVendorTounche.length > 0) {
        updatedProduct.WastageWt = matchingVendorTounche[0].WastageWt || 0;
        updatedProduct.MakingPercentage =
          matchingVendorTounche[0].wastagewt || 0;
        updatedProduct.MakingFixedAmt =
          matchingVendorTounche[0].MakingFixedAmt || 0;
        updatedProduct.MakingFixedWastage = parseFloat(
          matchingVendorTounche[0].MakingFixedWastage
        );
        updatedProduct.MakingPerGram =
          matchingVendorTounche[0].MakingPerGram || 0;
      } else {
        updatedProduct.WastageWt = wastagewt;
        updatedProduct.MakingFixedAmt = MakingFixedAmt;
        updatedProduct.MakingPerGram = MakingPerGram;
        updatedProduct.MakingPercentage = wastagewt;
        updatedProduct.MakingFixedWastage = MakingFixedWastage;
        //   updatedProduct.WastagePercent = WastagePercent;
      }

      console.log("check updateproduct1 ", updatedProduct);
      console.log("check updateproduct ", updatedProduct.MakingFixedWastage);
    }
  }

  static calculateWastageAndFine(updatedProduct, finePure) {
    // Calculate fineWeight based on FineWt if provided, otherwise 0

    let fineWeight = parseFloat(updatedProduct.FineWt || 0);

    // Calculate wastageWeight based on finePure condition
    let wastageWeight = !finePure
      ? (parseFloat(updatedProduct.WastageWt || 0) *
          parseFloat(updatedProduct.NetWt || 0)) /
        100
      : (parseFloat(updatedProduct.WastageWt || 0) * fineWeight) / 100;

    // Calculate total fine + wastage weight
    let totalFineWastageWt = parseFloat(fineWeight) + parseFloat(wastageWeight);

    // Update the product properties
    updatedProduct.FineWt = parseFloat(fineWeight).toFixed(3);
    updatedProduct.FineWastageWt = parseFloat(totalFineWastageWt).toFixed(3);
    // updatedProduct.TotalItemAmt = parseFloat(totalFineWastageWt).toFixed(3);

    // Handle MakingFixedWastage with null check for selectedSku
    updatedProduct.MakingFixedWastage =
      updatedProduct.selectedSku && updatedProduct.selectedSkuName !== ""
        ? parseFloat(
            updatedProduct.selectedSku.MakingFixedWastage || 0
          ).toFixed(3)
        : "0";
  }

  static calculateTotalPrice(updatedProduct, convertAmount, gstType) {
    // Calculate total making charges
    let totalMakingCharges = this.calculateMakingCharges(updatedProduct);
    console.log("Total Making Charges:", totalMakingCharges);

    const totalDiamondamount = updatedProduct.Diamonds.reduce(
      (acc, diamond) => acc + (parseFloat(diamond.DiamondTotalWeight) || 0),
      0
    );

    // Calculate the fine rate

    let nnet = 0;
    if (gstType) {
      nnet = updatedProduct.NetWt;
    } else {
      nnet = updatedProduct.FineWastageWt;
    }

    console.log("checking gst  ", gstType, " v", nnet);

    let fineRate =
      (parseFloat(nnet) * parseFloat(updatedProduct.MetalRate)) / 10;

    // Calculate other rates (stone amount, diamond purchase amount, hallmark amount)
    let stoneAmount = parseFloat(updatedProduct.StoneAmount || 0);
    let totalDiamondPurchaseAmount = parseFloat(
      updatedProduct.TotalDiamondAmount || 0
    );
    let hallmarkAmt = parseFloat(updatedProduct.HallmarkAmt || 0);
    let otherrate = stoneAmount + totalDiamondPurchaseAmount + hallmarkAmt;

    let totalRate =
      parseFloat(fineRate || 0) +
      parseFloat(totalMakingCharges || 0) +
      parseFloat(otherrate || 0);

    // Calculate GST on the total rate and on the making charges
    let allItemGstRate = totalRate * 0.03;
    let gstRateOnMaking =
      parseFloat(otherrate + parseFloat(totalMakingCharges || 0)) * 0.03;
    console.log(
      "Other Rate:",
      totalRate,
      "  ",
      otherrate,
      "  ",
      stoneAmount,
      "  ",
      totalDiamondPurchaseAmount,
      "  ",
      hallmarkAmt,
      "  ",
      totalMakingCharges
    );

    // Calculate TotalItemAmt
    updatedProduct.TotalItemAmt = convertAmount
      ? totalRate + otherrate
      : totalMakingCharges + otherrate;

    // Set updated product values
    updatedProduct.Making = totalMakingCharges;

    console.log(
      "checking rates :",
      parseFloat(totalMakingCharges + otherrate),
      "  ",
      convertAmount
    );
    updatedProduct.ConvertAmount = convertAmount;
    updatedProduct.FinalPrice = convertAmount
      ? `${totalRate}`
      : parseInt(totalMakingCharges + otherrate) !== 0
      ? `${parseFloat(totalMakingCharges + otherrate).toFixed(3)}`
      : `${0}`;

    console.log("checking rates 1:", updatedProduct.FinalPrice);

    updatedProduct.TotalGstAmount = convertAmount
      ? `${allItemGstRate}`
      : parseInt(totalMakingCharges + otherrate) !== 0
      ? `${parseFloat(gstRateOnMaking).toFixed(3)}`
      : `${0}`;

    // Calculate BalanceGold, BalanceSilver, FineGold, and FineSilver
    updatedProduct.BalanceGold =
      !convertAmount &&
      updatedProduct.MetalName !== "" &&
      updatedProduct.MetalName &&
      updatedProduct.MetalName.toLowerCase().includes("gold")
        ? updatedProduct.FineWastageWt
        : 0;

    updatedProduct.BalanceSilver =
      !convertAmount &&
      updatedProduct.MetalName &&
      updatedProduct.MetalName !== "" &&
      updatedProduct.MetalName.toLowerCase().includes("silver")
        ? updatedProduct.FineWastageWt
        : 0;

    updatedProduct.FineGold =
      updatedProduct.MetalName &&
      updatedProduct.MetalName !== "" &&
      updatedProduct.MetalName.toLowerCase().includes("gold")
        ? updatedProduct.FineWastageWt
        : "0";

    updatedProduct.FineSilver =
      updatedProduct.MetalName &&
      updatedProduct.MetalName !== "" &&
      updatedProduct.MetalName.toLowerCase().includes("silver")
        ? updatedProduct.FineWastageWt
        : "0";

    console.log("TotalItemAmt:", updatedProduct.TotalItemAmt);
    console.log("FinalPrice:", updatedProduct.FinalPrice);
    console.log("TotalGstAmount:", updatedProduct.TotalGstAmount);
  }

  static calculateMakingCharges(updatedProduct) {
    let netWt = parseFloat(updatedProduct.NetWt) || 0;
    let makingPerGram = parseFloat(updatedProduct.MakingPerGram) || 0;
    let makingPercentage = parseFloat(updatedProduct.MakingPercentage) || 0;
    let makingFixedAmt = parseFloat(updatedProduct.MakingFixedAmt) || 0;
    let makingFixedWastage = parseFloat(updatedProduct.MakingFixedWastage) || 0;
    let metalRate = parseFloat(updatedProduct.MetalRate) || 0;

    let makingCharges1 = netWt * makingPerGram;
    let makingCharges2 = (netWt * makingPercentage) / 1000;
    let makingCharges3 = makingFixedAmt;
    let makingCharges4 = (metalRate * makingFixedWastage) / 10;

    let stoneAmount = parseFloat(updatedProduct.StoneAmount || 0);
    let totalDiamondPurchaseAmount = parseFloat(
      updatedProduct.totalDiamondPurchaseAmount || 0
    );
    let hallmarkAmt = parseFloat(updatedProduct.HallmarkAmt || 0);

    return makingCharges1 + makingCharges2 + makingCharges3 + makingCharges4;
    //  +
    //        stoneAmount + totalDiamondPurchaseAmount + hallmarkAmt;
  }


  static calculatePrice(purchaseProduct, convertAmount) {
    let FineRate =
        (parseFloat(purchaseProduct.FineWastageWt) *
            parseFloat(purchaseProduct.MetalRate)) /
        10;
    let netRate = parseFloat(
        parseFloat(FineRate) * parseFloat(purchaseProduct.NetWt)
    ).toFixed(3);

    let makingCharges1 =
        parseFloat(purchaseProduct.NetWt) *
        parseFloat(purchaseProduct.MakingPerGram);
    let makingCharges2 =
        (parseFloat(netRate) * parseFloat(purchaseProduct.MakingPercentage)) /
        1000;
    let makingCharges3 = parseFloat(purchaseProduct.MakingFixedAmt);
    let makingCharges4 =
        (parseFloat(purchaseProduct.MetalRate) *
            parseFloat(purchaseProduct.MakingFixedWastage)) /
        10;

    let totalMakingCharges =
        parseFloat(makingCharges1) +
        parseFloat(makingCharges2) +
        parseFloat(makingCharges3) +
        parseFloat(makingCharges4) +
        parseFloat(purchaseProduct.StoneAmount) +
        parseFloat(purchaseProduct.DiamondPurchaseAmount) +
        parseFloat(purchaseProduct.HallmarkAmt);

    let allItemGstRate =
        (parseFloat(FineRate) + parseFloat(totalMakingCharges)) * 0.03;

    let totalRate = parseFloat(
        parseFloat(FineRate) + parseFloat(totalMakingCharges)
    );

    if (convertAmount) {
        purchaseProduct.Making = totalMakingCharges;
        purchaseProduct.TotalItemAmt = convertAmount ? totalRate : totalMakingCharges;
        purchaseProduct.NetAmt = netRate;
        purchaseProduct.GSTAmount = allItemGstRate;
        purchaseProduct.TotalAmt = totalRate;
        purchaseProduct.PurchaseAmount = totalRate;
        purchaseProduct.FinalPrice = `${totalRate}`;
        purchaseProduct.TotalGstAmount = `${allItemGstRate}`;
    } else {
        purchaseProduct.Making = totalMakingCharges;
        purchaseProduct.TotalItemAmt = totalMakingCharges;
        purchaseProduct.NetAmt = 0;
        purchaseProduct.GSTAmount = 0;
        purchaseProduct.TotalAmt = 0;
        purchaseProduct.PurchaseAmount = 0;
        purchaseProduct.FinalPrice = `${totalMakingCharges.toFixed(3)}`;
        purchaseProduct.TotalGstAmount = `${totalMakingCharges.toFixed(3)}`;
    }

    return purchaseProduct;
}



}

export default ProductCalculator;
