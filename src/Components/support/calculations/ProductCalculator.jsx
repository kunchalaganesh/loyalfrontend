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
      this.calculatePurityAndVendorTounche(updatedProduct, allPurities, allVendorTounche, selectedCustomer);

      // Net Weight Calculations
      this.calculateNetWeight(updatedProduct, selectedSku);


      // Diamond Calculations
    //   this.calculateDiamonds(updatedProduct, allDiamondSizeWeightRate);

      

      

      // Wastage and Fine Calculations
      this.calculateWastageAndFine(updatedProduct, finePure);

      // Total Price Calculations
      this.calculateTotalPrice(updatedProduct, convertAmount, gstType);

      return updatedProduct;
    }

    static calculateDiamonds(updatedProduct, allDiamondSizeWeightRate) {
      if (updatedProduct.DiamondPieces) {
        const selectedDiamondSizeWeightRate = allDiamondSizeWeightRate.filter(
          (x) => x.DiamondSize === updatedProduct.DiamondSize
        );
        if (updatedProduct.DiamondPieces !== "" && selectedDiamondSizeWeightRate.length > 0) {
          updatedProduct.DiamondWeight = parseFloat(
            selectedDiamondSizeWeightRate[0].DiamondWeight * updatedProduct.DiamondPieces
          ).toFixed(3);
          updatedProduct.DiamondPurchaseAmount = parseFloat(
            selectedDiamondSizeWeightRate[0].DiamondPurchaseRate * updatedProduct.DiamondPieces
          ).toFixed(3);
          updatedProduct.DiamondSellAmount = parseFloat(
            selectedDiamondSizeWeightRate[0].DiamondSellRate * updatedProduct.DiamondPieces
          ).toFixed(3);
        } else {
          updatedProduct.DiamondWeight = 0;
          updatedProduct.DiamondPurchaseAmount = 0;
          updatedProduct.DiamondSellAmount = 0;
        }
      }
    }

    static calculateNetWeight(updatedProduct, selectedSku) {
      if (updatedProduct.GrossWt || updatedProduct.StoneWt || updatedProduct.ClipWeight || updatedProduct.ClipQuantity) {
        
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
    const tweight =  totalStoneWeight;

    const tpieces = totalStonepieces;

    let value = updatedProduct.StoneWt;
    if(tweight > 0){
      updatedProduct.StoneWt = tweight.toFixed(3)
    }else{
      updatedProduct.StoneWt = value
    }

    
    updatedProduct.StonePieces = tpieces
        
        updatedProduct.NetWt = parseFloat(
          parseFloat(updatedProduct.GrossWt || 0) -
          parseFloat(updatedProduct.StoneWt || 0) -
          parseFloat(
            (parseFloat(updatedProduct.ClipWeight || 0) * parseFloat(updatedProduct.ClipQuantity || 0))
          )-
          parseFloat(totalDiamondWeight / 5)
        ).toFixed(3);
      }

      let fineWeight =
      (parseFloat(updatedProduct.NetWt) * parseFloat(updatedProduct.FinePercent)) / 100;
      updatedProduct.FineWt = fineWeight;




    }

    static calculatePurityAndVendorTounche(updatedProduct, allPurities, allVendorTounche, selectedCustomer) {
      
        console.log('checking fine ', updatedProduct);
        if (updatedProduct.FinePercent) {
        if (updatedProduct.FinePercent !== "") {
          let matchingPurity = allPurities.find(
            (purity) =>
              Math.abs(parseFloat(purity.FinePercentage) - parseFloat(updatedProduct.FinePercent)) <= 0.5
          );
          updatedProduct.PurityId = matchingPurity ? matchingPurity.Id : 0;
        } else {
          updatedProduct.PurityId = 0;
        }

        const matchingVendorTounche = allVendorTounche.filter(
          (tounches) =>
            tounches.CategoryId === updatedProduct.CategoryId &&
            tounches.ProductId === updatedProduct.ProductId &&
            selectedCustomer &&
            tounches.PurityId === updatedProduct.PurityId &&
            tounches.VendorId === selectedCustomer.Id
            
            // && tounches.StockKeepingUnit === updatedProduct.StockKeepingUnit
        );
        let wastagewt = updatedProduct.WastageWt;
        let MakingPercentage = updatedProduct.MakingPercentage;
        let MakingFixedAmt = updatedProduct.MakingFixedAmt;
        let MakingFixedWastage = updatedProduct.MakingFixedWastage;
        let MakingPerGram = updatedProduct.MakingPerGram;
        let FinePure = updatedProduct.FinePure;

        console.log('checking matching vendor ',matchingVendorTounche )
        if (selectedCustomer && matchingVendorTounche.length > 0) {
          updatedProduct.WastageWt = matchingVendorTounche[0].WastageWt || wastagewt;
          updatedProduct.MakingPercentage = matchingVendorTounche[0].MakingPercentage || 0;
          updatedProduct.MakingFixedAmt = matchingVendorTounche[0].MakingFixedAmt || 0;
          updatedProduct.MakingFixedWastage = matchingVendorTounche[0].MakingFixedWastage || 0;
          updatedProduct.MakingPerGram = matchingVendorTounche[0].MakingPerGram || 9;
          updatedProduct.FinePure = matchingVendorTounche[0].FinePure || 0;
        } else {
          updatedProduct.WastageWt = wastagewt;
          updatedProduct.MakingFixedAmt = MakingFixedAmt;
          updatedProduct.MakingPerGram = MakingPerGram;
          updatedProduct.MakingPercentage = MakingPercentage;
          updatedProduct.MakingFixedWastage = MakingFixedWastage;
        //   updatedProduct.WastagePercent = WastagePercent;
        }
      }
      


    }

    static calculateWastageAndFine(updatedProduct, finePure) {
        // Calculate fineWeight based on FineWt if provided, otherwise 0
        
        let fineWeight = parseFloat(updatedProduct.FineWt || 0);
    
        // Calculate wastageWeight based on finePure condition
        let wastageWeight = !finePure
            ? (parseFloat(updatedProduct.WastageWt || 0) * parseFloat(updatedProduct.NetWt || 0)) / 100
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
                ? parseFloat(updatedProduct.selectedSku.MakingFixedWastage || 0).toFixed(3)
                : "0";
    }
    
      

    static calculateTotalPrice(updatedProduct, convertAmount, gstType) {
        // Calculate total making charges
        let totalMakingCharges = this.calculateMakingCharges(updatedProduct);
        console.log('Total Making Charges:', totalMakingCharges);
      

        const totalDiamondamount = updatedProduct.Diamonds.reduce(
            (acc, diamond) => acc + (parseFloat(diamond.DiamondTotalWeight) || 0),
            0
          );


        // Calculate the fine rate

        let nnet = 0;
        if(gstType){

        nnet = updatedProduct.NetWt;
        }else{
nnet = updatedProduct.FineWastageWt;
        }

        console.log('checking gst  ', gstType, ' v', nnet)

        let fineRate = (parseFloat(nnet) * parseFloat(updatedProduct.MetalRate)) / 10;
        let totalRate = parseFloat(fineRate) + parseFloat(totalMakingCharges);
      
        // Calculate GST on the total rate and on the making charges
        let allItemGstRate = totalRate * 0.03;
        let gstRateOnMaking = parseFloat(totalMakingCharges) * 0.03;
      
        // Calculate other rates (stone amount, diamond purchase amount, hallmark amount)
        let stoneAmount = parseFloat(updatedProduct.StoneAmount || 0);
        let totalDiamondPurchaseAmount = parseFloat(updatedProduct.Diamondpurchseamount || 0);
        let hallmarkAmt = parseFloat(updatedProduct.HallmarkAmt || 0);
        let otherrate = stoneAmount + totalDiamondPurchaseAmount + hallmarkAmt;
        console.log("Other Rate:", totalRate,'  ', otherrate, '  ',stoneAmount, '  ',  totalDiamondPurchaseAmount, '  ',hallmarkAmt );
      
        // Calculate TotalItemAmt
        updatedProduct.TotalItemAmt = convertAmount ? (totalRate + otherrate) : totalMakingCharges+otherrate;
      
        // Set updated product values
        updatedProduct.Making = totalMakingCharges;
      
        updatedProduct.FinalPrice = convertAmount
          ? `${totalRate}`
          : parseInt(totalMakingCharges+otherrate) !== 0
          ? `${parseFloat(totalMakingCharges+otherrate).toFixed(3)}`
          : `${0}`;
      
        updatedProduct.TotalGstAmount = convertAmount
          ? `${allItemGstRate}`
          : parseInt(totalMakingCharges) !== 0
          ? `${parseFloat(gstRateOnMaking).toFixed(3)}`
          : `${0}`;

          // Calculate BalanceGold, BalanceSilver, FineGold, and FineSilver
    updatedProduct.BalanceGold = !convertAmount &&
    updatedProduct.MetalName !== "" &&
    updatedProduct.MetalName &&
    updatedProduct.MetalName.toLowerCase().includes("gold")
    ? updatedProduct.FineWastageWt
    : 0;

updatedProduct.BalanceSilver = !convertAmount &&
    updatedProduct.MetalName &&
    updatedProduct.MetalName !== "" &&
    updatedProduct.MetalName.toLowerCase().includes("silver")
    ? updatedProduct.FineWastageWt
    : 0;

updatedProduct.FineGold = updatedProduct.MetalName &&
    updatedProduct.MetalName !== "" &&
    updatedProduct.MetalName.toLowerCase().includes("gold")
    ? updatedProduct.FineWastageWt
    : "0";

updatedProduct.FineSilver = updatedProduct.MetalName &&
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
        let totalDiamondPurchaseAmount = parseFloat(updatedProduct.totalDiamondPurchaseAmount || 0);
        let hallmarkAmt = parseFloat(updatedProduct.HallmarkAmt || 0);
      
        return makingCharges1 + makingCharges2 + makingCharges3 + makingCharges4;
        //  +
        //        stoneAmount + totalDiamondPurchaseAmount + hallmarkAmt;
      }
      
}

export default ProductCalculator;
