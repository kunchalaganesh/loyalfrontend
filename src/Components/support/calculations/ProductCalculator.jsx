class ProductCalculator {
    static updateProduct(purchaseProduct, allDiamondSizeWeightRate, allPurities, allVendorTounche, selectedCustomer, selectedSku, selectedSkuName, finePure, convertAmount) {
      const updatedProduct = { ...purchaseProduct };
  
      // Diamond Calculations
      if (updatedProduct.DiamondPieces) {
        const selectedDiamondSizeWeightRate = allDiamondSizeWeightRate.filter(
          (x) => x.DiamondSize === purchaseProduct.DiamondSize
        );
        if (updatedProduct.DiamondPieces !== "" && selectedDiamondSizeWeightRate.length > 0) {
          updatedProduct.DiamondWeight = parseFloat(
            parseFloat(selectedDiamondSizeWeightRate[0].DiamondWeight) *
            parseInt(updatedProduct.DiamondPieces)
          ).toFixed(3);
          updatedProduct.DiamondPurchaseAmount = parseFloat(
            parseFloat(selectedDiamondSizeWeightRate[0].DiamondPurchaseRate) *
            parseInt(updatedProduct.DiamondPieces)
          ).toFixed(2);
          updatedProduct.DiamondSellAmount = parseFloat(
            parseFloat(selectedDiamondSizeWeightRate[0].DiamondSellRate) *
            parseInt(updatedProduct.DiamondPieces)
          ).toFixed(2);
        } else {
          updatedProduct.DiamondWeight = 0;
          updatedProduct.DiamondPurchaseAmount = 0;
          updatedProduct.DiamondSellAmount = 0;
        }
      }
  
      // Net Weight Calculations
      if (updatedProduct.GrossWt || updatedProduct.StoneWt || updatedProduct.ClipWeight || updatedProduct.ClipQuantity) {
        updatedProduct.NetWt = parseFloat(
          parseFloat(updatedProduct.GrossWt || 0) -
          parseFloat(updatedProduct.StoneWt || 0) -
          parseFloat(
            (parseFloat(updatedProduct.ClipWeight || 0) * parseFloat(updatedProduct.ClipQuantity || 0))
          )
        ).toFixed(3);
      }
  
      // Purity and Vendor Tounche Calculations
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
            tounches.CategoryId === purchaseProduct.CategoryId &&
            tounches.ProductId === purchaseProduct.ProductId &&
            selectedCustomer &&
            tounches.PurityId === purchaseProduct.PurityId &&
            tounches.VendorId === selectedCustomer.Id &&
            tounches.StockKeepingUnit === purchaseProduct.StockKeepingUnit
        );
  
        if (selectedCustomer && matchingVendorTounche.length > 0) {
          updatedProduct.WastageWt = matchingVendorTounche[0].WastageWt || 0;
          updatedProduct.WastagePercent = matchingVendorTounche[0].WastageWt || 0;
          updatedProduct.MakingPercentage = matchingVendorTounche[0].MakingPercentage || 0;
          updatedProduct.MakingFixedAmt = matchingVendorTounche[0].MakingFixedAmt || 0;
          updatedProduct.MakingFixedWastage = matchingVendorTounche[0].MakingFixedWastage || 0;
          updatedProduct.MakingPerGram = matchingVendorTounche[0].MakingPerGram || 9;
          updatedProduct.FinePure = matchingVendorTounche[0].FinePure || 0;
        } else {
          updatedProduct.WastageWt = 0;
          updatedProduct.MakingFixedAmt = 0;
          updatedProduct.MakingPerGram = 0;
          updatedProduct.MakingPercentage = 0;
          updatedProduct.MakingFixedWastage = 0;
          updatedProduct.WastagePercent = 0;
        }
  
        let fineWeight = (parseFloat(updatedProduct.NetWt || 0) * parseFloat(updatedProduct.FinePercent || 0)) / 100;
        let wastageWeight = (parseFloat(updatedProduct.WastageWt || 0) * parseFloat(updatedProduct.NetWt || 0)) / 100;
        let totalFineWastageWt = parseFloat(fineWeight) + parseFloat(wastageWeight);
  
        updatedProduct.FineWt = parseFloat(fineWeight);
        updatedProduct.FineWastageWt = parseFloat(totalFineWastageWt);
        updatedProduct.TotalItemAmt = parseFloat(totalFineWastageWt);
      }
  
      // Additional Calculations
      if (updatedProduct.WastageWt) {
        let fineWeight = parseFloat(updatedProduct.FineWt || 0);
        let wastageWeight = !finePure
          ? (parseFloat(updatedProduct.WastageWt || 0) * parseFloat(updatedProduct.NetWt || 0)) / 100
          : (parseFloat(updatedProduct.WastageWt || 0) * parseFloat(fineWeight)) / 100;
        let totalFineWastageWt = parseFloat(fineWeight) + parseFloat(wastageWeight);
        updatedProduct.FineWt = parseFloat(fineWeight).toFixed(3);
        updatedProduct.FineWastageWt = parseFloat(totalFineWastageWt).toFixed(3);
        updatedProduct.TotalItemAmt = parseFloat(totalFineWastageWt).toFixed(3);
        updatedProduct.MakingFixedWastage =
          selectedSkuName !== ""
            ? parseFloat(selectedSku.MakingFixedWastage).toFixed(3)
            : "0";
      }
  
      // Metal Rate Calculations
      if (updatedProduct.MetalRate) {
        let fineWeight = parseFloat(updatedProduct.FineWt || 0);
        let wastageWeight = parseFloat(updatedProduct.WastageWt || 0) / parseFloat(updatedProduct.NetWt || 0);
        let totalFineWastageWt = parseFloat(fineWeight) + parseFloat(wastageWeight);
        if (convertAmount) {
          updatedProduct.TotalItemAmt = parseFloat(
            (parseFloat(updatedProduct.TotalItemAmt || 0) * parseFloat(updatedProduct.MetalRate || 0))
          ).toFixed(2);
        }
      }
  
      return updatedProduct;
    }
  }
  export default ProductCalculator;