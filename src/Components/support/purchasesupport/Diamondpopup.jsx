import React from "react";

const DiamondEntryComponent = ({ index, diamond, allDiamondAttributes, allDiamondSizeWeightRate, handleDiamondChange, deleteDiamond, addDiamond }) => {
    return (
        <div className="adminPurchaseEntryAddStonesMainBox">
            <div style={{ gridColumn: "span 6" }}>
                <h4 style={{ margin: "5px" }}>Diamond {index + 1}</h4>
            </div>
            <label>Diamond Shape</label>
            <input
                value={diamond.DiamondShape}
                onChange={(e) => handleDiamondChange(index, "DiamondShape", e.target.value)}
                type="text"
                list="diamondAttributesShapeList"
            />
            <datalist id="diamondAttributesShapeList">
                {allDiamondAttributes
                    .filter((x) => x.DiamondAttribute === "DiamondShape")
                    .map((attribute, idx) => (
                        <option key={idx} value={attribute.DiamondValue}>
                            {attribute.DiamondValue}
                        </option>
                    ))}
            </datalist>

            {/* Repeat similar structure for other diamond properties */}
            {/* Example for Diamond Clarity */}
            <label>Diamond Clarity</label>
            <input
                value={diamond.DiamondClarity}
                onChange={(e) => handleDiamondChange(index, "DiamondClarity", e.target.value)}
                type="text"
                list="diamondAttributesClarityList"
            />
            <datalist id="diamondAttributesClarityList">
                {allDiamondAttributes
                    .filter((x) => x.DiamondAttribute === "DiamondClarity")
                    .map((attribute, idx) => (
                        <option key={idx} value={attribute.DiamondValue}>
                            {attribute.DiamondValue}
                        </option>
                    ))}
            </datalist>

            {/* Continue with other diamond fields */}

            <button
                className="bulkProductAddDeleteButton close-btn"
                onClick={() => deleteDiamond(index)}
            >
                Delete Diamond
            </button>
            <button
                id="bulkStockAddProductImportButton"
                onClick={addDiamond}
                className="close-btn"
            >
                Add Diamond
            </button>
        </div>
    );
};

export default DiamondEntryComponent;
