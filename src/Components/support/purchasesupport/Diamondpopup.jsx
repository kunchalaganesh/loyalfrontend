import React from "react";

const DiamondEntryComponent = ({ index, diamond, allDiamondAttributes, allDiamondSizeWeightRate, handleDiamondChange, deleteDiamond, addDiamond }) => {
    return (
        <div className="adminPurchaseEntryAddStonesMainBox">
            <div style={{ gridColumn: "span 6" }}>
                <h4 style={{ margin: "5px" }}>Diamond {index + 1}</h4>
            </div>
            <label>Diamond Shape1</label>
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

            <label>Diamond Colour</label>
            <input
                value={diamond.DiamondColour}
                onChange={(e) =>
                    handleDiamondChange(
                        index,
                        "DiamondColour",
                        e.target.value
                    )
                }
                type="text"
                list="diamondAttributesColourList"
            />
            <datalist id="diamondAttributesColourList">
                {allDiamondAttributes
                    .filter(
                        (x) => x.DiamondAttribute == "DiamondColour"
                    )
                    .map((attribute) => (
                        <option value={attribute.DiamondValue}>
                            {attribute.DiamondValue}
                        </option>
                    ))}
            </datalist>




            <label>Diamond Size</label>
            <input
                value={diamond.DiamondSize}
                onChange={(e) =>
                    handleDiamondChange(
                        index,
                        "DiamondSize",
                        e.target.value
                    )
                }
                type="text"
                list="diamondSizeList"
            />
            <datalist id="diamondSizeList">
                {allDiamondSizeWeightRate.map((x, index) => (
                    <option key={index}>{x.DiamondSize}</option>
                ))}
            </datalist>

            <label>Diamond Weight</label>
            <input
                value={diamond.DiamondWeight}
                onChange={(e) =>
                    handleDiamondChange(
                        index,
                        "DiamondWeight",
                        e.target.value
                    )
                }
                type="text"
            />


            <label>Diamond Pieces</label>
            <input
                value={diamond.DiamondPieces}
                onChange={(e) =>
                    handleDiamondChange(
                        index,
                        "DiamondPieces",
                        e.target.value
                    )
                }
                type="text"
            />

            <label>Diamond Cut</label>
            <input
                value={diamond.DiamondCut}
                onChange={(e) =>
                    handleDiamondChange(
                        index,
                        "DiamondCut",
                        e.target.value
                    )
                }
                type="text"
                list="diamondAttributesCutList"
            />
            <datalist id="diamondAttributesCutList">
                {allDiamondAttributes
                    .filter(
                        (x) => x.DiamondAttribute == "DiamondCut"
                    )
                    .map((attribute) => (
                        <option value={attribute.DiamondValue}>
                            {attribute.DiamondValue}
                        </option>
                    ))}
            </datalist>
            <label>SettingType</label>
            <input
                value={diamond.SettingType}
                onChange={(e) =>
                    handleDiamondChange(
                        index,
                        "SettingType",
                        e.target.value
                    )
                }
                type="text"
                list="diamondAttributesSettingTypeList"
            />
            <datalist id="diamondAttributesSettingTypeList">
                {allDiamondAttributes
                    .filter(
                        (x) =>
                            x.DiamondAttribute == "DiamondSettingType"
                    )
                    .map((attribute) => (
                        <option value={attribute.DiamondValue}>
                            {attribute.DiamondValue}
                        </option>
                    ))}
            </datalist>
            <label>Certificate</label>
            <input
                value={diamond.Certificate}
                onChange={(e) =>
                    handleDiamondChange(
                        index,
                        "Certificate",
                        e.target.value
                    )
                }
                type="text"
            />
            <label>Diamond Rate</label>
            <input
                value={diamond.DiamondRate}
                onChange={(e) =>
                    handleDiamondChange(
                        index,
                        "DiamondRate",
                        e.target.value
                    )
                }
                type="text"
            />
            <label>Diamond PurchaseAmt</label>
            <input
                value={diamond.DiamondPurchaseAmt}
                onChange={(e) =>
                    handleDiamondChange(
                        index,
                        "DiamondPurchaseAmt",
                        e.target.value
                    )
                }
                type="text"
            />

            <label>Description</label>
            <input
                value={diamond.Description}
                onChange={(e) =>
                    handleDiamondChange(
                        index,
                        "Description",
                        e.target.value
                    )
                }
                type="text"
            />



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
