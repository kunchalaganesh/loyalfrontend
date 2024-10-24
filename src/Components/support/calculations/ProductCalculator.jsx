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
    gstType,
    setConvertAmount,
    setFinePure,
    userEditedFields
  ) {
    const updatedProduct = { ...purchaseProduct };

    //check fine or gram
    this.checkfinegram(selectedCustomer, allVendorTounche, setFinePure, purchaseProduct, selectedSku, updatedProduct, allPurities,userEditedFields);



    // Purity and Vendor Tounche Calculations
    // this.calculatePurityAndVendorTounche(
    //   updatedProduct,
    //   allPurities,
    //   allVendorTounche,
    //   selectedCustomer
    // );

    // Diamond Calculations
    this.calculateDiamonds(updatedProduct, allDiamondSizeWeightRate);

    // Net Weight Calculations
    this.calculateNetWeight(updatedProduct, selectedSku);

    // Wastage and Fine Calculations
    this.calculateWastageAndFine(updatedProduct, finePure, convertAmount);

    // Total Price Calculations
    this.calculateTotalPrice(updatedProduct, convertAmount, gstType, finePure);

    return updatedProduct;
  }

  static checkfinegram(selectedCustomer, allVendorTounche, setFinePure, purchaseProduct, selectedSku, updatedProduct, allPurities,userEditedFields){

    console.log('check point1',  selectedCustomer)
   
   

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
    }

    // Extract VendorId, CategoryId, ProductId, and PurityId from purchaseProduct
    const { CategoryId: purchaseCategoryId, ProductId: purchaseProductId, PurityId: purchasePurityId } = updatedProduct;

    console.log('check point3',  updatedProduct)


    // Extract VendorId from selectedCustomer
    const vendorId = selectedCustomer?.Id || null;

    console.log('check point2',  vendorId)
    console.log('check point4',  allVendorTounche)

    // Find matching vendor in allVendorTounche based on VendorId, CategoryId, ProductId, and PurityId
    const matchingVendor = allVendorTounche.find(vendor => 
        vendor.VendorId == vendorId && 
        vendor.CategoryId == purchaseCategoryId && 
        vendor.ProductId == purchaseProductId &&
        vendor.PurityId == purchasePurityId
         &&
        (selectedSku ? vendor.StockKeepingUnit == selectedSku.StockKeepingUnit : true)
    );

    let wastagewt = updatedProduct.WastageWt;
        let MakingPercentage = updatedProduct.MakingPercentage;
        let MakingFixedAmt = updatedProduct.MakingFixedAmt;
        let MakingFixedWastage = updatedProduct.MakingFixedWastage;
        let MakingPerGram = updatedProduct.MakingPerGram;
        let finepercentage = updatedProduct.FinePercent;

    if (matchingVendor) {
        console.log('Match found:', matchingVendor);
        // Do something with the matching vendor
        // Example: setConvertAmount(matchingVendor.Amount);
        
        
          // updatedProduct.WastageWt = matchingVendor.WastageWt || 0;
          // updatedProduct.MakingPercentage = matchingVendor.wastagewt || 0;
          // updatedProduct.MakingFixedAmt = matchingVendor.MakingFixedAmt || 0;
          // updatedProduct.MakingFixedWastage = parseFloat(matchingVendor.MakingFixedWastage);
          // updatedProduct.MakingPerGram = matchingVendor.MakingPerGram || 0;
       
          if (!userEditedFields.FinePercent) {
            updatedProduct.FinePercent = matchingVendor.FinePercentage || 0;
            }

          if (!userEditedFields.finePure) {
          setFinePure(matchingVendor.FinePure)
          }
          if (!userEditedFields.WastageWt) {
            updatedProduct.WastageWt = matchingVendor.WastageWt || 0;
            updatedProduct.MakingPercentage = matchingVendor.wastagewt || 0;
          }else{

          }
          if (!userEditedFields.MakingPerGram) {
            updatedProduct.MakingPerGram = matchingVendor.MakingPerGram || 0;
          }else{

          }
          if (!userEditedFields.MakingFixedAmt) {
            updatedProduct.MakingFixedAmt = matchingVendor.MakingFixedAmt || 0;
          }else{

          }
          if (!userEditedFields.MakingFixedWastage) {
            updatedProduct.MakingFixedWastage = matchingVendor.MakingFixedAmt || 0;
          }else{

          }

    } else {
        console.log('No match found.');
        updatedProduct.WastageWt = wastagewt;
          updatedProduct.MakingFixedAmt = MakingFixedAmt;
          updatedProduct.MakingPerGram = MakingPerGram;
          updatedProduct.MakingPercentage = wastagewt;
          updatedProduct.MakingFixedWastage = MakingFixedWastage;
          updatedProduct.FinePercent = finepercentage || 0;
    }


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
      console.log('checking updateproduct ',updatedProduct )

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

  static calculateWastageAndFine(updatedProduct, finePure, convertAmount) {
    // Calculate fineWeight based on FineWt if provided, otherwise 0

    let fineWeight = parseFloat(updatedProduct.FineWt || 0);

    // Calculate wastageWeight based on finePure condition
    let wastageWeight = !finePure
      ? (parseFloat(updatedProduct.WastageWt || 0) *
          parseFloat(updatedProduct.NetWt || 0)) /
        100
      : (parseFloat(updatedProduct.WastageWt || 0) * fineWeight) / 100;
      let makingPercentage = parseFloat(updatedProduct.MakingFixedWastage) || 0;
let making2 = 0;
      if(!convertAmount){
        making2 = parseFloat(makingPercentage)
        console.log('check here ' );
      }else{
        making2 = 0
      }

    // Calculate total fine + wastage weight
    let totalFineWastageWt = parseFloat(fineWeight) + parseFloat(wastageWeight)+making2;

    // Update the product properties
    updatedProduct.FineWt = parseFloat(fineWeight).toFixed(3);
    updatedProduct.FineWastageWt = parseFloat(totalFineWastageWt).toFixed(3);
    // updatedProduct.TotalItemAmt = parseFloat(totalFineWastageWt).toFixed(3);

    // Handle MakingFixedWastage with null check for selectedSku
    // updatedProduct.MakingFixedWastage =
    //   updatedProduct.selectedSku && updatedProduct.selectedSkuName !== ""
    //     ? parseFloat(
    //         updatedProduct.selectedSku.MakingFixedWastage || 0
    //       ).toFixed(3)
    //     : "0";

    console.log('check itematedit ', updatedProduct)
  }

  static calculateTotalPrice(updatedProduct, convertAmount, gstType, finePure) {
    // Calculate total making charges
   
    const totalDiamondamount = updatedProduct.Diamonds.reduce(
      (acc, diamond) => acc + (parseFloat(diamond.DiamondTotalWeight) || 0),
      0
    );

    // Calculate the fine rate

    let nnet = 0;
    if (!gstType && !finePure) {
      nnet = updatedProduct.NetWt;
    } else if(!gstType && finePure) {
      nnet = updatedProduct.FineWt;
    }else if(gstType && !finePure){
      nnet = updatedProduct.NetWt;
    }else{
      nnet = updatedProduct.NetWt;
    }

    // let totalMakingCharges = this.calculateMakingCharges(updatedProduct, nnet);
    let makingPerGram = parseFloat(updatedProduct.MakingPerGram) || 0;
    let makingPercentage = parseFloat(updatedProduct.WastageWt) || 0;
    let makingFixedAmt = parseFloat(updatedProduct.MakingFixedAmt) || 0;
    let makingFixedWastage = parseFloat(updatedProduct.MakingFixedWastage) || 0;
    let metalRate = parseFloat(updatedProduct.MetalRate) || 0;

    let making1 = parseFloat(makingPerGram)*updatedProduct.NetWt;
    let making2 = 0;//(nnet/100)*parseFloat(makingPercentage)*metalRate/10
    if(convertAmount){
      making2 = (nnet/100)*parseFloat(makingPercentage)*metalRate/10
      console.log('check here ', making2, '  ', nnet, '  ', makingPercentage, '   ',metalRate );
    }else{
      making2 = 0
    }

    let totalMakingCharges = making1+making2+makingFixedAmt;

    console.log("Total Making Charges:", totalMakingCharges, '   ', convertAmount, '  ',making2);


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

    let totalRate = parseFloat(fineRate || 0) +
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
    // updatedProduct.TotalItemAmt = convertAmount
    //   ? totalRate + otherrate
    //   : totalMakingCharges + otherrate;

    // // Set updated product values
    // updatedProduct.Making = totalMakingCharges;

    // Ensure values are numeric, or default to 0 if they are not
const validTotalMakingCharges = isNaN(parseFloat(totalMakingCharges)) ? 0 : parseFloat(totalMakingCharges);
const validOtherRate = isNaN(parseFloat(otherrate)) ? 0 : parseFloat(otherrate);

// Calculate TotalItemAmt
updatedProduct.TotalItemAmt = convertAmount
  ? totalRate 
  : validTotalMakingCharges + validOtherRate;

// Set updated product values
updatedProduct.Making = validTotalMakingCharges;

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

  static calculateMakingCharges(updatedProduct, nnet) {
    
    // let netWt = parseFloat(updatedProduct.NetWt) || 0;

    console.log('checking netwt ', nnet)
    
    let makingPerGram = parseFloat(updatedProduct.MakingPerGram) || 0;
    let makingPercentage = parseFloat(updatedProduct.WastageWt) || 0;
    let makingFixedAmt = parseFloat(updatedProduct.MakingFixedAmt) || 0;
    let makingFixedWastage = parseFloat(updatedProduct.MakingFixedWastage) || 0;
    let metalRate = parseFloat(updatedProduct.MetalRate) || 0;

    let makingCharges1 = nnet * makingPerGram;
    // let makingCharges2 = (netWt * makingPercentage) / 1000;
    let makingCharges2 = ((nnet/100) * makingPercentage) *(metalRate/10);
    let makingCharges3 = makingFixedAmt;
    let makingCharges4 = 0;//(metalRate * makingFixedWastage) / 10;

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


    //only fine weight take

    // wastege for non invoice item 
    // finr% 




    let FineRate = (parseFloat(purchaseProduct.FineWt) *parseFloat(purchaseProduct.MetalRate)) /10;
    
    let netRate = (parseFloat(purchaseProduct.NetWt) *parseFloat(purchaseProduct.MetalRate)) /10;
    // parseFloat(parseFloat(FineRate) * parseFloat(purchaseProduct.NetWt)).toFixed(3);


    
    let makingCharges1 = parseFloat(purchaseProduct.NetWt) *
        parseFloat(purchaseProduct.MakingPerGram);

    let makingCharges2 =
        (parseFloat(FineRate) * parseFloat(purchaseProduct.MakingPercentage)) /
        1000;

    let makingCharges3 = parseFloat(purchaseProduct.MakingFixedAmt);
    
    let makingCharges4 =(parseFloat(purchaseProduct.MetalRate) *
            parseFloat(purchaseProduct.MakingFixedWastage)) /
        10;

    // let totalMakingCharges =
    //     parseFloat(makingCharges1) +
    //     parseFloat(makingCharges2) +
    //     parseFloat(makingCharges3) +
    //     parseFloat(makingCharges4) +
    //     parseFloat(purchaseProduct.StoneAmount) +
    //     parseFloat(purchaseProduct.DiamondPurchaseAmount) +
    //     parseFloat(purchaseProduct.HallmarkAmt);

    // let allItemGstRate =
    //     (parseFloat(FineRate) + parseFloat(totalMakingCharges)) * 0.03;

    // let totalRate = parseFloat(
    //     parseFloat(FineRate) + parseFloat(totalMakingCharges)
    // );

    // Ensure all values are numeric or default to 0 if they are not valid numbers
let validMakingCharges1 = isNaN(parseFloat(makingCharges1)) ? 0 : parseFloat(makingCharges1);
let validMakingCharges2 = isNaN(parseFloat(makingCharges2)) ? 0 : parseFloat(makingCharges2);
let validMakingCharges3 = isNaN(parseFloat(makingCharges3)) ? 0 : parseFloat(makingCharges3);
let validMakingCharges4 = isNaN(parseFloat(makingCharges4)) ? 0 : parseFloat(makingCharges4);
let validStoneAmount = isNaN(parseFloat(purchaseProduct.StoneAmount)) ? 0 : parseFloat(purchaseProduct.StoneAmount);
let validDiamondPurchaseAmount = isNaN(parseFloat(purchaseProduct.DiamondPurchaseAmount)) ? 0 : parseFloat(purchaseProduct.DiamondPurchaseAmount);
let validHallmarkAmt = isNaN(parseFloat(purchaseProduct.HallmarkAmt)) ? 0 : parseFloat(purchaseProduct.HallmarkAmt);
let validFineRate = isNaN(parseFloat(FineRate)) ? 0 : parseFloat(FineRate);

// Calculate total making charges
let totalMakingCharges =
    validMakingCharges1 +
    validMakingCharges2 +
    validMakingCharges3 +
    validMakingCharges4 +
    validStoneAmount +
    validDiamondPurchaseAmount +
    validHallmarkAmt;

// Calculate total GST rate and total rate
let allItemGstRate = (validFineRate + totalMakingCharges) * 0.03;

let totalRate = validFineRate + totalMakingCharges;

console.log('checking total ', totalRate, totalMakingCharges);


    console.log('checkingtotal ', totalRate, totalMakingCharges)

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
