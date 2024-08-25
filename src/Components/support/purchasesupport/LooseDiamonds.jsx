import React from 'react';

const LooseDiamonds = ({ purchaseProduct, handleInputChangePurchase, allDiamondSizeWeightRate, allDiamondAttributes }) => {
  return (
    <>
      <div>
        <th>DIAMOND SIZE</th>
        <input
          name="DiamondSize"
          onChange={handleInputChangePurchase}
          type="text"
          value={purchaseProduct.DiamondSize}
          list="diamondSizeList"
        />
        <datalist id="diamondSizeList">
          {allDiamondSizeWeightRate.map((x, index) => (
            <option key={index}>{x.DiamondSize}</option>
          ))}
        </datalist>
      </div>
      <div>
        <th>D.WEIGHT</th>
        <input
          name="DiamondWeight"
          onChange={handleInputChangePurchase}
          type="text"
          value={purchaseProduct.DiamondWeight}
        />
      </div>
      <div>
        <th>D.PURCHASE RATE</th>
        <input
          name="DiamondPurchaseRate"
          onChange={handleInputChangePurchase}
          type="text"
          value={purchaseProduct.DiamondPurchaseRate}
        />
      </div>
      <div>
        <th>D.CLARITY</th>
        <input
          name="DiamondClarity"
          onChange={handleInputChangePurchase}
          type="text"
          value={purchaseProduct.DiamondClarity}
          list="diamondAttributesClarityList"
        />
        <datalist id="diamondAttributesClarityList">
          {allDiamondAttributes
            .filter(x => x.DiamondAttribute === "DiamondClarity")
            .map(attribute => (
              <option key={attribute.DiamondValue} value={attribute.DiamondValue}>
                {attribute.DiamondValue}
              </option>
            ))}
        </datalist>
      </div>
      <div>
        <th>D.COLOUR</th>
        <input
          name="DiamondColour"
          onChange={handleInputChangePurchase}
          type="text"
          value={purchaseProduct.DiamondColour}
          list="diamondAttributesColourList"
        />
        <datalist id="diamondAttributesColourList">
          {allDiamondAttributes
            .filter(x => x.DiamondAttribute === "DiamondColour")
            .map(attribute => (
              <option key={attribute.DiamondValue} value={attribute.DiamondValue}>
                {attribute.DiamondValue}
              </option>
            ))}
        </datalist>
      </div>
      <div>
        <th>D.SHAPE</th>
        <input
          name="DiamondShape"
          onChange={handleInputChangePurchase}
          type="text"
          value={purchaseProduct.DiamondShape}
          list="diamondAttributesShapeList"
        />
        <datalist id="diamondAttributesShapeList">
          {allDiamondAttributes
            .filter(x => x.DiamondAttribute === "DiamondShape")
            .map(attribute => (
              <option key={attribute.DiamondValue} value={attribute.DiamondValue}>
                {attribute.DiamondValue}
              </option>
            ))}
        </datalist>
      </div>
      <div>
        <th>D.CUT</th>
        <input
          name="DiamondCut"
          onChange={handleInputChangePurchase}
          type="text"
          value={purchaseProduct.DiamondCut}
          list="diamondAttributesCutList"
        />
        <datalist id="diamondAttributesCutList">
          {allDiamondAttributes
            .filter(x => x.DiamondAttribute === "DiamondCut")
            .map(attribute => (
              <option key={attribute.DiamondValue} value={attribute.DiamondValue}>
                {attribute.DiamondValue}
              </option>
            ))}
        </datalist>
      </div>
      <div>
        <th>D.SETTINGTYPE</th>
        <input
          name="DiamondSettingType"
          onChange={handleInputChangePurchase}
          type="text"
          value={purchaseProduct.DiamondSettingType}
          list="diamondAttributesSettingTypeList"
        />
        <datalist id="diamondAttributesSettingTypeList">
          {allDiamondAttributes
            .filter(x => x.DiamondAttribute === "DiamondSettingType")
            .map(attribute => (
              <option key={attribute.DiamondValue} value={attribute.DiamondValue}>
                {attribute.DiamondValue}
              </option>
            ))}
        </datalist>
      </div>
      <div>
        <th>D.CERTIFICATE</th>
        <input
          name="DiamondCertificate"
          onChange={handleInputChangePurchase}
          type="text"
          value={purchaseProduct.DiamondCertificate}
        />
      </div>
      <div>
        <th>D.PIECES</th>
        <input
          name="DiamondPieces"
          onChange={handleInputChangePurchase}
          type="text"
          value={purchaseProduct.DiamondPieces}
        />
      </div>
      <div>
        <th>D.PURCHASEAMT</th>
        <input
          name="DiamondPurchaseAmount"
          onChange={handleInputChangePurchase}
          type="text"
          value={purchaseProduct.DiamondPurchaseAmount}
        />
      </div>
      <div>
        <th>D.DESCRIPTION</th>
        <input
          name="DiamondDescription"
          onChange={handleInputChangePurchase}
          type="text"
          value={purchaseProduct.DiamondDescription}
        />
      </div>
    </>
  );
};

export default LooseDiamonds;
