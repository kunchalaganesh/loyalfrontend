import { useState } from 'react';

const useDiamondHandler = (purchaseProduct, allDiamondsList, allDiamondSizeWeightRate, allDiamondAttributes) => {
  const [isCal, setIsCal] = useState(false);

  const handleDiamondChangeup = (index, property, value, diamondTemplateId) => {
    const newDiamonds = [...purchaseProduct.Diamonds];
    const oldProduct = { ...purchaseProduct };
    
    const selectedDiamond = allDiamondsList.find(diamond => diamond.DiamondName === value);
    let totalDiamondAmount = 0;
    let truncatedWeight = 0;

    if (selectedDiamond) {
      newDiamonds[index] = {
        ...selectedDiamond,
      };
    } else {
      newDiamonds[index] = {
        ...newDiamonds[index],
        [property]: value,
      };

      if (['DiamondWeight', 'DiamondShape', 'DiamondClarity', 'DiamondCut', 'DiamondColour'].includes(property)) {
        const diamondTemplate = allDiamondSizeWeightRate.find(template => template.Id === diamondTemplateId);
        
        if (diamondTemplate) {
          const shape = getShapeValue(null, newDiamonds[index].DiamondShape, "DiamondShape");
          const clarity = getShapeValue(null, newDiamonds[index].DiamondClarity, "DiamondClarity");
          const color = getShapeValue(null, newDiamonds[index].DiamondColour, "DiamondColour");
          const size = getShapeValue(null, newDiamonds[index].DiamondSize, "DiamondSize");
          const cut = getShapeValue(null, newDiamonds[index].DiamondCut, "DiamondCut");
          
          if (newDiamonds[index].DiamondWeight > 0) {
            const foundData = findClosestHigherDiamondWeight(diamondTemplate.DiamondSizeWeightRates, newDiamonds[index].DiamondWeight, shape, clarity, color, size, cut);
            if (foundData) {
              newDiamonds[index].DiamondRate = foundData.DiamondPurchaseRate;
            } else {
              newDiamonds[index].DiamondRate = "0";
            }
          }
        }
      }

      if (property === "DiamondPurchaseAmt") {
        const diamondTemplate = allDiamondSizeWeightRate.find(template => template.Id === diamondTemplateId);
        if (diamondTemplate) {
          const rates = diamondTemplate.DiamondSizeWeightRates;
          const matchingRate = rates.find(rate => 
            rate.DiamondShape === newDiamonds[index].DiamondShape
          );

          if (matchingRate) {
            newDiamonds[index].DiamondRate = matchingRate.DiamondRate;
          } else {
            newDiamonds[index].DiamondRate = 0;
          }
        }
      }

      if (property === "DiamondRate") {
        newDiamonds[index].DiamondRate = value;
      }

      const tWeight = newDiamonds[index].DiamondWeight * newDiamonds[index].DiamondPieces;
      const totalDiamondPurchaseAmount = tWeight * newDiamonds[index].DiamondRate;
      const truncatedAmount = Math.floor(totalDiamondPurchaseAmount * 1000) / 1000;
      truncatedWeight = Math.floor(tWeight * 1000) / 1000;

      newDiamonds[index].DiamondPurchaseAmt = truncatedAmount;
      newDiamonds[index].DiamondTotalWeight = truncatedWeight;
    }

    const totalDiamondWeight = newDiamonds.reduce((acc, diamond) => acc + (parseFloat(diamond.DiamondTotalWeight) || 0), 0);
    const netWeight = parseFloat(
      parseFloat(oldProduct.GrossWt) -
      parseFloat(oldProduct.StoneWt) -
      parseFloat(oldProduct.ClipWeight * oldProduct.ClipQuantity) -
      parseFloat(totalDiamondWeight / 5)
    ).toFixed(3);

    setIsCal(true);
    return {
      ...purchaseProduct,
      Diamonds: newDiamonds,
      DiamondWeight: totalDiamondWeight,
      DiamondAmount: totalDiamondAmount,
      DiamondPurchaseAmount: totalDiamondPurchaseAmount,
      NetWt: netWeight,
    };
  };

  return {
    handleDiamondChange,
    isCal,
  };
};

function getShapeValue(id, shape, parameter) {
  if (id) {
    const shapeValue = allDiamondAttributes
      .filter(x => x.DiamondAttribute === parameter)
      .find(item => item.Id === id);
    return id ? shapeValue?.DiamondValue : "";
  }
  if (shape) {
    const shapeValue = allDiamondAttributes
      .filter(x => x.DiamondAttribute === parameter)
      .find(item => item.DiamondValue === shape);
    return shape ? shapeValue?.Id : "";
  }
}

function findClosestHigherDiamondWeight(data, inputWeight, inputShape, inputClarity, color, size, cut) {
  const positiveInputWeight = parseFloat(inputWeight);
  if (!inputWeight || positiveInputWeight === 0) {
    return null;
  }

  const higherWeights = data
    .filter(item => item.DiamondShape === inputShape)
    .filter(item => item.DiamondClarity === inputClarity)
    .filter(item => item.DiamondColor === color)
    .filter(item => item.DiamondCut === cut)
    .map(item => ({ ...item, DiamondWeight: Math.abs(parseFloat(item.DiamondWeight)) }))
    .sort((a, b) => a.DiamondWeight - b.DiamondWeight);

  return higherWeights.find(item => item.DiamondWeight >= positiveInputWeight) || null;
}

export default useDiamondHandler;
