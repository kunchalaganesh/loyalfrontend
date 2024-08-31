const handleInputChangePurchase = (e) => {
    const {name, value} = e.target;

    console.log(name, "name");
    console.log(value, "value");
    const updatedProduct = purchaseProduct; // Create a copy of the purchaseProduct object
    // Update the edited data in the updatedProduct object
    if (name === "CategoryId") {
        const [selectedCategoryId, selectedCategoryName] = value.split(",");
        updatedProduct.CategoryName = selectedCategoryName;
        updatedProduct.CategoryId = selectedCategoryId;

        if (
            selectedCategoryName &&
            !selectedCategoryName.toLowerCase() == "diamonds"
        ) {
            updatedProduct.MetalId = selectedCategoryId;
            updatedProduct.MetalName = selectedCategoryName;
        } else {
            updatedProduct.MetalId = selectedCategoryId;
            updatedProduct.MetalName = selectedCategoryName;
        }
        // (updatedProduct.CategoryName = selectedCategoryName);
    } else if (name === "MetalId") {
        const [selectedMetalId, selectedMetalName] = value.split(",");
        // setSelectedProductType(selectedProductName),
        updatedProduct.MetalId = selectedMetalId;
        updatedProduct.MetalName = selectedMetalName;
    } else if (name === "DiamondPieces") {
        // setSelectedProductType(selectedProductName),
        const selectedDiamondSizeWeightRate = allDiamondSizeWeightRate.filter(
            (x) => x.DiamondSize == purchaseProduct.DiamondSize
        );
        if (value !== "" && selectedDiamondSizeWeightRate.length > 0) {
            updatedProduct.DiamondPieces = value;
            updatedProduct.DiamondWeight = parseFloat(
                parseFloat(selectedDiamondSizeWeightRate[0].DiamondWeight) *
                parseInt(value)
            ).toFixed(3);
            updatedProduct.DiamondPurchaseAmount = parseFloat(
                parseFloat(selectedDiamondSizeWeightRate[0].DiamondPurchaseRate) *
                parseInt(value)
            ).toFixed(2);
            updatedProduct.DiamondSellAmount = parseFloat(
                parseFloat(selectedDiamondSizeWeightRate[0].DiamondSellRate) *
                parseInt(value)
            ).toFixed(2);
        } else {
            updatedProduct.DiamondPieces = value;
            updatedProduct.DiamondWeight = 0;
            updatedProduct.DiamondPurchaseAmount = 0;
            updatedProduct.DiamondSellAmount = 0;
        }
    } else if (name === "ProductName") {
        const [selectedProductId, selectedProductName] = value.split(",");
        // setSelectedProductType(selectedProductName),
        (updatedProduct.ProductId = selectedProductId),
            (updatedProduct.ProductName = selectedProductName);
    } else if (name === "GrossWt") {
        updatedProduct.NetWt = parseFloat(
            parseFloat(value) -
            parseFloat(updatedProduct.StoneWt) -
            parseFloat(
                parseFloat(updatedProduct.ClipWeight) *
                parseFloat(updatedProduct.ClipQuantity)
            )
        ).toFixed(3);
        updatedProduct.GrossWt = value;
    } else if (name === "StoneWt") {
        updatedProduct.NetWt = parseFloat(
            parseFloat(updatedProduct.GrossWt) -
            parseFloat(value) -
            parseFloat(
                parseFloat(updatedProduct.ClipWeight) *
                parseFloat(updatedProduct.ClipQuantity)
            )
        ).toFixed(3);
        updatedProduct.StoneWt = value;
    } else if (name === "ClipWeight") {
        updatedProduct.NetWt = parseFloat(
            parseFloat(updatedProduct.GrossWt) -
            parseFloat(updatedProduct.StoneWt) -
            parseFloat(
                parseFloat(value) * parseFloat(updatedProduct.ClipQuantity)
            )
        ).toFixed(3);
        // updatedProduct.StoneWt = value;
        updatedProduct.ClipWeight = value;
    } else if (name === "ClipQuantity") {
        updatedProduct.NetWt = parseFloat(
            parseFloat(updatedProduct.GrossWt) -
            parseFloat(updatedProduct.StoneWt) -
            parseFloat(parseFloat(updatedProduct.ClipWeight) * parseFloat(value))
        ).toFixed(3);
        // updatedProduct.StoneWt = value;
        updatedProduct.ClipQuantity = value;
    } else if (name === "NetWt") {
        updatedProduct.StoneWt = parseFloat(
            parseFloat(updatedProduct.GrossWt) -
            parseFloat(value) -
            parseFloat(
                parseFloat(updatedProduct.ClipWeight) *
                parseFloat(updatedProduct.ClipQuantity)
            )
        ).toFixed(3);
        updatedProduct.NetWt = value;
    } else if (name === "FinePercent") {
        // let fineWeight =
        //   (parseFloat(updatedProduct.NetWt) * parseFloat(value)) / 100;
        // let wastageWeight =
        //   (parseFloat(updatedProduct.WastageWt) *
        //     parseFloat(updatedProduct.NetWt)) /
        //   100;
        // let totalFineWastageWt =
        //   parseFloat(fineWeight) + parseFloat(wastageWeight);

        // // updatedProduct.PurityId = value !== "" ? value : 0;
        // updatedProduct.FinePercent = value !== "" ? value : 0;
        // updatedProduct.FineWt = parseFloat(fineWeight);
        // updatedProduct.FineWastageWt = parseFloat(totalFineWastageWt);
        // updatedProduct.TotalItemAmt = parseFloat(totalFineWastageWt);

        if (value !== "") {
            let matchingPurity = allPurities.find(
                (purity) =>
                    Math.abs(parseFloat(purity.FinePercentage) - parseFloat(value)) <=
                    0.5
            );
            console.log(matchingPurity, "matchingPurity");
            updatedProduct.PurityId = matchingPurity ? matchingPurity.Id : 0;
        } else {
            updatedProduct.PurityId = 0;
        }
        // logic for vendor Tounche below
        const mathchingVendorTounche = allVendorTounche.filter(
            (tounches) =>
                tounches.CategoryId == purchaseProduct.CategoryId &&
                tounches.ProductId == purchaseProduct.ProductId &&
                selectedCustomer &&
                tounches.PurityId == purchaseProduct.PurityId &&
                tounches.VendorId == selectedCustomer.Id
        );

        if (selectedCustomer && mathchingVendorTounche.length > 0) {
            updatedProduct.WastageWt = mathchingVendorTounche
                ? mathchingVendorTounche[0].WastageWt
                : 0;
            updatedProduct.WastagePercent = mathchingVendorTounche
                ? mathchingVendorTounche[0].WastageWt
                : 0;
            updatedProduct.MakingPercentage = mathchingVendorTounche
                ? mathchingVendorTounche[0].MakingPercentage
                : 0;
            updatedProduct.MakingFixedAmt = mathchingVendorTounche
                ? mathchingVendorTounche[0].MakingFixedAmt
                : 0;
            updatedProduct.MakingFixedWastage = mathchingVendorTounche
                ? mathchingVendorTounche[0].MakingFixedWastage
                : 0;
            updatedProduct.MakingPerGram = mathchingVendorTounche
                ? mathchingVendorTounche[0].MakingPerGram
                : 9;
            updatedProduct.FinePure = mathchingVendorTounche
                ? mathchingVendorTounche[0].FinePure
                : 0;
            setFinePure(mathchingVendorTounche[0].FinePure);
            console.log("TouncheMatched", mathchingVendorTounche);
            console.log("TouncheMatched", mathchingVendorTounche);
            console.log("TouncheMatched", mathchingVendorTounche);
            console.log("TouncheMatched", mathchingVendorTounche);
        } else {
            console.log("TouncheNotMatched", mathchingVendorTounche);
            updatedProduct.WastageWt = 0;
            updatedProduct.MakingFixedAmt = 0;
            updatedProduct.MakingPerGram = 0;
            updatedProduct.MakingPercentage = 0;
            updatedProduct.MakingFixedWastage = 0;
            updatedProduct.WastagePercent = 0;
        }
        let fineWeight =
            (parseFloat(updatedProduct.NetWt) * parseFloat(value)) / 100;
        let wastageWeight =
            (parseFloat(updatedProduct.WastageWt) *
                parseFloat(updatedProduct.NetWt)) /
            100;
        let totalFineWastageWt =
            parseFloat(fineWeight) + parseFloat(wastageWeight);

        // updatedProduct.PurityId = value !== "" ? value : 0;
        updatedProduct.FinePercent = value !== "" ? value : 0;
        updatedProduct.FineWt = parseFloat(fineWeight);
        updatedProduct.FineWastageWt = parseFloat(totalFineWastageWt);
        updatedProduct.TotalItemAmt = parseFloat(totalFineWastageWt);
        // calculatePurchasePrice(updatedProduct);
        // logic for vendor Tounche above
    } else if (name === "WastageWt") {
        let fineWeight = parseFloat(updatedProduct.FineWt);
        let wastageWeight = !finePure
            ? (parseFloat(value) * parseFloat(updatedProduct.NetWt)) / 100
            : (parseFloat(value) * parseFloat(fineWeight)) / 100;
        let totalFineWastageWt =
            parseFloat(fineWeight) + parseFloat(wastageWeight);
        //   updatedProduct.Purity = parseFloat(value);
        updatedProduct.WastageWt = value;
        updatedProduct.FineWt = parseFloat(fineWeight).toFixed(3);
        updatedProduct.FineWastageWt = parseFloat(totalFineWastageWt).toFixed(3);
        updatedProduct.TotalItemAmt = parseFloat(totalFineWastageWt).toFixed(3);
        updatedProduct.MakingFixedWastage =
            selectedSkuName !== ""
                ? parseFloat(selectedSku.MakingFixedWastage).toFixed(3)
                : "0";
    } else if (name === "MetalRate") {
        let fineWeight = parseFloat(updatedProduct.FineWt);
        let wastageWeight =
            parseFloat(updatedProduct.WastageWt) / parseFloat(updatedProduct.NetWt);
        let totalFineWastageWt =
            parseFloat(fineWeight) + parseFloat(wastageWeight);
        updatedProduct.MetalRate = parseFloat(value) !== 0 ? value : 0;
        if (convertAmount) {
            updatedProduct.TotalItemAmt = parseFloat(
                (parseFloat(updatedProduct.TotalItemAmt) * parseFloat(value)) / 10
            ).toFixed(3);
        } else {
            updatedProduct.TotalItemAmt = parseFloat(totalFineWastageWt).toFixed(3);
        }
    } else if (name === "purityRate") {
        const [selectedPurityName, selectedPurityRate] = value.split(",");
        setSelectedPurity(selectedPurityName);
        updatedProduct.Purity = selectedPurityName;
        updatedProduct.GoldRate = selectedPurityRate;
        updatedProduct.purityRate = selectedPurityRate;
    } else if (name === "GoldRate") {
        updatedProduct.GoldRate = parseFloat(value);
        updatedProduct.purityRate = parseFloat(value);
    } else if (name === "ProductName") {
        updatedProduct.ProductName = value;
    } else if (name == "DiamondSize") {
        updatedProduct[name] = value;
        const selectedDiamondSizeWeightRate = allDiamondSizeWeightRate.filter(
            (x) => x.DiamondSize == value
        );
        console.log(
            selectedDiamondSizeWeightRate,
            "selectedDiamondSizeWeightRate"
        );
        console.log(
            selectedDiamondSizeWeightRate,
            "selectedDiamondSizeWeightRate"
        );
        if (selectedDiamondSizeWeightRate.length > 0) {
            updatedProduct.DiamondWeight =
                selectedDiamondSizeWeightRate[0].DiamondWeight;
            updatedProduct.DiamondPurchaseRate =
                selectedDiamondSizeWeightRate[0].DiamondPurchaseRate;
            updatedProduct.DiamondPurchaseAmount =
                selectedDiamondSizeWeightRate[0].DiamondPurchaseRate;
            updatedProduct.DiamondSellRate =
                selectedDiamondSizeWeightRate[0].DiamondSellRate;
            updatedProduct.DiamondPieces = "1";
        } else {
            updatedProduct.DiamondWeight = 0;
            updatedProduct.DiamondSellRate = 0;
            updatedProduct.DiamondPurchaseRate = 0;
            updatedProduct.DiamondPurchaseAmount = 0;
            updatedProduct.DiamondPieces = "0";
        }
    } else {
        updatedProduct[name] = value;
    }
    if (
        name === "NetWt" ||
        name === "GrossWt" ||
        name === "StoneWt" ||
        name === "ClipWeight" ||
        name === "ClipQuantity"
    ) {
        let fineWeight = parseFloat(updatedProduct.FineWt);
        let wastageWeight = !finePure
            ? (parseFloat(updatedProduct.WastageWt) *
            parseFloat(updatedProduct.NetWt)) /
            100
            : (parseFloat(updatedProduct.WastageWt) * parseFloat(fineWeight)) / 100;
        let totalFineWastageWt =
            parseFloat(fineWeight) + parseFloat(wastageWeight);
        //   updatedProduct.Purity = parseFloat(updatedProduct.WastageWt);
        updatedProduct.WastageWt = 0;
        updatedProduct.FineWt = 0;
        updatedProduct.FinePercent = 0;
        updatedProduct.FineWastageWt = 0;
        updatedProduct.TotalItemAmt = 0;
        updatedProduct.MakingFixedWastage =
            selectedSkuName !== ""
                ? parseFloat(selectedSku.MakingFixedWastage).toFixed(3)
                : "0";
    }
    // Set the state of the purchaseProduct object with the updatedProduct object
    setPurchaseProduct(updatedProduct);

    // Calculate purchase price based on the updatedProduct object
    calculatePurchasePrice(updatedProduct);

    // Rest of the function logic...
};




const handleStoneChange = (index, property, value) => {
    const newStones = [...purchaseProduct.Stones];

    console.log( "stones found   ",allStonesList )
    const selectedStone = allStonesList?.find(
        (stone) => (stone.StoneName ? stone.StoneName : stone.StoneMainName) === value
    );
    if (selectedStone) {
        newStones[index] = {
            ...newStones[index],
            StoneName: selectedStone.StoneName ? selectedStone.StoneName : selectedStone.StoneMainName,
            StoneWeight: selectedStone.StoneWeight ? selectedStone.StoneWeight : selectedStone.StoneMainWeight,
            StonePieces: selectedStone.StonePieces ? selectedStone.StonePieces : selectedStone.StoneMainPieces,
            StoneRate: selectedStone.StoneRate ? selectedStone.StoneRate : selectedStone.StoneMainRate,
            StoneAmount: selectedStone.StoneAmount ? selectedStone.StoneAmount : selectedStone.StoneMainAmount,
            Description: selectedStone.Description ? selectedStone.Description : selectedStone.StoneMainDescription
        };
    } else {
        newStones[index] = {
            ...newStones[index],
            [property]: value,
        };
    }
    setPurchaseProduct({...purchaseProduct, Stones: newStones});
};


const updatestonewt = () => {
    // ClipQuantity ClipWeight StoneWt
    console.log("checking updatestone", purchaseProduct.Stones);

    const clipQuantity = parseFloat(purchaseProduct.ClipQuantity) || 0;

    // Calculate totalStoneWeight considering null or empty values as 0
    const totalStoneWeight = purchaseProduct.Stones.reduce((acc, stone) => {
      const stoneWeight = parseFloat(stone.StoneWeight) || 0;
      return acc + stoneWeight;
    }, 0);

    const totalStonepieces = purchaseProduct.Stones.reduce((acc, stone) => {
      const stoneWeight = parseFloat(stone.StonePieces) || 0;
      return acc + stoneWeight;
    }, 0);

    const skuPieces = parseFloat(selectedSku.Pieces) || 0;

    // Calculate StoneWt
    const tweight = clipQuantity * totalStoneWeight * skuPieces;

    const tpieces = clipQuantity * skuPieces * totalStonepieces;

    // Update StoneWt
    const updatedProduct = {
      ...purchaseProduct,
      StoneWt: tweight.toFixed(3),
      StonePieces: tpieces,
    };

    // Calculate and update NetWt
    updatedProduct.NetWt = parseFloat(
      parseFloat(updatedProduct.GrossWt || 0) -
      parseFloat(updatedProduct.WastageWt || 0) -
      parseFloat(updatedProduct.ClipWeight || 0) * clipQuantity -
      parseFloat(updatedProduct.StoneWt || 0)
    ).toFixed(3);

    // Update purchaseProduct state
    setPurchaseProduct(updatedProduct);

    console.log("checking updatestonewt", tpieces);
    console.log("checking updatestonewt1", purchaseProduct);

    // Hide the add stone box
    setShowAddStoneBox(false);
  };

  const updatestonewt = () => {
    // ClipQuantity ClipWeight StoneWt
    console.log("checking updatestone", purchaseProduct.Stones);

    const clipQuantity = parseFloat(purchaseProduct.ClipQuantity) || 0;

    // Calculate totalStoneWeight considering null or empty values as 0
    const totalStoneWeight = purchaseProduct.Stones.reduce((acc, stone) => {
      const stoneWeight = parseFloat(stone.StoneWeight) || 0;
      return acc + stoneWeight;
    }, 0);

    const totalStonepieces = purchaseProduct.Stones.reduce((acc, stone) => {
      const stoneWeight = parseFloat(stone.StonePieces) || 0;
      return acc + stoneWeight;
    }, 0);

    const skuPieces = parseFloat(selectedSku.Pieces) || 1;

    // Calculate StoneWt
    const tweight = clipQuantity * totalStoneWeight * skuPieces;

    const tpieces = clipQuantity * skuPieces * totalStonepieces;

    // Update StoneWt
    const updatedProduct = {
      ...purchaseProduct,
      StoneWt: tweight.toFixed(3),
      StonePieces: tpieces,
    };

    // Calculate and update NetWt
    updatedProduct.NetWt = parseFloat(
      parseFloat(updatedProduct.GrossWt || 0) -
      parseFloat(updatedProduct.WastageWt || 0) -
      parseFloat(updatedProduct.ClipWeight || 0) * clipQuantity -
      parseFloat(updatedProduct.StoneWt || 0)
    ).toFixed(3);

    // Update purchaseProduct state
    setPurchaseProduct(updatedProduct);

    console.log("checking updatestonewt", tpieces);
    console.log("checking updatestonewt1", purchaseProduct);

    // Hide the add stone box
    setShowAddStoneBox(false);
  };