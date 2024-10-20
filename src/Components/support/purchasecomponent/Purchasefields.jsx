import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FaDollarSign } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import StonePopup from "../../support/purchasesupport/StonePopup.jsx";
import DiamondEntryComponent from "../../support/purchasesupport/Diamondpopup";

export default function PurchaseFields({
  selectedSkuName,
  handleSkuInputChange,
  allSkuList,
  purchaseProduct,
  allCategories,
  filteredProducts,
  handleInputChangePurchase,
  filteredPurities,
  finePure,
  showAllFields,
  showAddStoneBox,
  showAddDiamondBox,
  setSelectedCategory,
  addPurchaseProductToList,
  setSelectedProductType,
  setShowAllFields,
  convertAmount,
  setFinePure,
  setConvertAmount,
  setShowAddStoneBox,
  setPurchaseProduct,
  addStone,
  handleStoneChange,
  deleteStone,
  allStonesList,
  setShowAddDiamondBox,
  addDiamond,
  allDiamondAttributes,
  allDiamondSizeWeightRate,
  handleDiamondChange,
  deleteDiamond
}) {
  return (
    <div className="adminPurchaseInvoiceAddProductsOptionsMainPurchaseBox">
      <div className="adminPurchaseInvoiceAddProductsOptionsMainPurchaseItems">
        {/* <div className="adminInvoiceAddProductsOptionsMainBox">
             <div
               id="adminInvoiceAddProductsOptionsInnerBox"
               className="adminInvoiceAddProductsOptionsInnerBox"
             > */}
        <table>
          <thead>
            <tr>
              <div>
                <th>SKU</th>
                <input
                  // style={{ width: "30vw" }}
                  type="text"
                  name="skuList"
                  placeholder="Enter SKU"
                  value={selectedSkuName}
                  onChange={handleSkuInputChange}
                   autoComplete="off"
                  list="skuList"
                />
                <datalist id="skuList">
                  {allSkuList.map((sku, index) => (
                    <option key={index} value={`${sku.StockKeepingUnit}`} />
                  ))}
                </datalist>
              </div>
              <div>
                <th>CATEGORY</th>
                <select
                  name="CategoryId"
                  // onChange={handleInputChangePurchase}
                  disabled={purchaseProduct.StockKeepingUnit}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value),
                      handleInputChangePurchase(e);
                  }}
                  // value={purchaseProduct.names}
                  // value={selectedCategory}
                  value={`${purchaseProduct.CategoryId},${purchaseProduct.CategoryName}`}
                  // value={purchaseProduct.CategoryName}
                >
                  <option value={""}>Select an Category</option>
                  {allCategories.map((x, y) => {
                    return (
                      <option key={y} value={`${x.Id},${x.CategoryName}`}>
                        {x.CategoryName}
                      </option>
                    );
                  })}
                </select>
              </div>
              {purchaseProduct.CategoryName &&
              purchaseProduct.CategoryName.toLowerCase() == "diamonds" ? (
                <div>
                  <th>METAL</th>
                  <select
                    name="MetalId"
                    // onChange={handleInputChangePurchase}
                    onChange={(e) => {
                      // setSelectedCategory(e.target.value),
                      handleInputChangePurchase(e);
                    }}
                    // value={purchaseProduct.names}
                    // value={selectedCategory}
                    value={`${purchaseProduct.MetalId},${purchaseProduct.MetalName}`}
                    // value={purchaseProduct.CategoryName}
                  >
                    <option value={""}>Select an Base Metal</option>
                    {allCategories.map((x, y) => {
                      return (
                        <option key={y} value={`${x.Id},${x.CategoryName}`}>
                          {x.CategoryName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : null}
              {purchaseProduct.CategoryName == "LOOSE DIAMOND" ? (
                <>
                  <div>
                    <th>DIAMOND SHAPE</th>
                    <input
                      name="DiamondShape"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.DiamondShape}
                      list="diamondAttributesShapeList"
                    />
                    <datalist id="diamondAttributesShapeList">
                      {diamondShapes.map((attribute) => (
                        <option value={attribute.DiamondValue}>
                          {attribute.DiamondValue}
                        </option>
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <th>DIAMOND CLARITY</th>
                    <input
                      name="DiamondClarity"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.DiamondClarity}
                      list="diamondAttributesClarityList"
                    />
                    <datalist id="diamondAttributesClarityList">
                      {diamondClarities.map((attribute) => (
                        <option value={attribute.DiamondValue}>
                          {attribute.DiamondValue}
                        </option>
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <th>DIAMOND COLOUR</th>
                    <input
                      name="DiamondColour"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.DiamondColour}
                      list="diamondAttributesColourList"
                    />
                    <datalist id="diamondAttributesColourList">
                      {diamondColors.map((attribute) => (
                        <option value={attribute.DiamondValue}>
                          {attribute.DiamondValue}
                        </option>
                      ))}
                    </datalist>
                  </div>
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
                    <th>DIAMOND SLEVE</th>
                    <input
                      name="DiamondSleve"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.DiamondSleve}
                    />
                  </div>
                  <div>
                    <th>DIAMOND WEIGHT</th>
                    <input
                      name="DiamondWeight"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.DiamondWeight}
                    />
                  </div>
                  <div>
                    <th>
                      DIAMOND <br /> PURCHASE RATE
                    </th>
                    <input
                      name="DiamondPurchaseRate"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.DiamondPurchaseRate}
                    />
                  </div>
                  <div>
                    <th>DIAMOND QTY</th>
                    <input
                      name="DiamondTotalQuantity"
                      onChange={(e) => {
                        const value = e.target.value;
                        setPurchaseProduct((prevProduct) => ({
                          ...prevProduct,
                          DiamondTotalQuantity: value,
                          DiamondTotalWeight: value * prevProduct.DiamondWeight,
                          DiamondAmount:
                            value * prevProduct.DiamondPurchaseRate,
                        }));
                      }}
                      type="text"
                      value={purchaseProduct.DiamondTotalQuantity}
                    />
                  </div>
                  <div>
                    <th>TOTAL WT</th>
                    <input
                      name="DiamondTotalWeight"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.DiamondTotalWeight}
                    />
                  </div>
                  <div>
                    <th>TOTAL AMT</th>
                    <input
                      name="DiamondAmount"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.DiamondAmount}
                    />
                  </div>
                  <div>
                    <th>DIAMOND CUT</th>
                    <input
                      name="DiamondCut"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.DiamondCut}
                      list="diamondAttributesCutList"
                    />
                    <datalist id="diamondAttributesCutList">
                      {diamondCuts.map((attribute) => (
                        <option value={attribute?.DiamondValue}>
                          {attribute?.DiamondValue}
                        </option>
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <th>
                      DIAMOND <br /> SETTINGTYPE
                    </th>
                    <input
                      name="DiamondSettingType"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.DiamondSettingType}
                      list="diamondAttributesSettingTypeList"
                    />
                    <datalist id="diamondAttributesSettingTypeList">
                      {settingTypes.map((attribute) => (
                        <option value={attribute.DiamondValue}>
                          {attribute.DiamondValue}
                        </option>
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <th>CERTIFICATE</th>
                    <input
                      name="DiamondCertificate"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.DiamondCertificate}
                    />
                  </div>
                  {/*<div>*/}
                  {/*    <th>D.PIECES</th>*/}
                  {/*    <input*/}
                  {/*        name="DiamondPieces"*/}
                  {/*        onChange={handleInputChangePurchase}*/}
                  {/*        type="text"*/}
                  {/*        value={purchaseProduct.DiamondPieces}*/}
                  {/*    />*/}
                  {/*</div>*/}
                  <div>
                    <th>DESCRIPTION</th>
                    <input
                      name="DiamondDescription"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.DiamondDescription}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <th>PRODUCT</th>
                    <select
                      disabled={purchaseProduct.StockKeepingUnit}
                      name="ProductName"
                      onChange={(e) => {
                        setSelectedProductType(e.target.value);
                        handleInputChangePurchase(e);
                      }}
                      // value={purchaseProduct.ProductNames}
                      // value={purchaseProduct.ProductName}
                      // value={selectedProductType}
                      value={`${purchaseProduct.ProductId},${purchaseProduct.ProductName}`}
                    >
                      <option value={""}>Select an Product</option>
                      {filteredProducts.map((x) => {
                        return (
                          <option value={`${x.Id},${x.ProductName}`}>
                            {x.ProductName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <th>GROSS WT</th>
                    <input
                      name="GrossWt"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.GrossWt}
                    />
                  </div>
                  <div>
                    <th>STONE WT</th>
                    <input
                      name="StoneWt"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.StoneWt}
                    />
                  </div>
                  <div>
                    <th>CLIP WT/Item</th>
                    <input
                      name="ClipWeight"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.ClipWeight}
                    />
                  </div>
                  <div>
                    <th>CLIP QUANTITY</th>
                    <input
                      name="ClipQuantity"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.ClipQuantity}
                    />
                  </div>
                  <div>
                    <th>NET WT</th>
                    <input
                      name="NetWt"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.NetWt}
                    />
                  </div>
                  <div>
                    <th>PURITY</th>
                    <select
                      disabled={purchaseProduct.StockKeepingUnit}
                      name="PurityId"
                      onChange={handleInputChangePurchase}
                      value={purchaseProduct.PurityId}
                    >
                      <option value=""> Select an Option</option>
                      {filteredPurities.map((x) => {
                        return <option value={x.Id}> {x.PurityName}</option>;
                      })}
                    </select>
                    {/* <input
                            name="PurityId"
                            onChange={handleInputChangePurchase}
                            type="text"
                            value={purchaseProduct.PurityId}
                          /> */}
                  </div>
                  <div>
                    <th>FINE PERCENT</th>
                    <input
                      name="FinePercent"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.FinePercent}
                    />
                  </div>
                  <div>
                    <th>WASTAGE%</th>
                    <div className="adminPurchaseEntryDollarSignBox">
                      <MdChangeCircle
                        className="adminPurchaseEntryDollarSign"
                        onClick={() => setFinePure(!finePure)}
                        size={"17px"}
                        style={{
                          cursor: "pointer",
                          color: finePure ? "green" : "grey",
                        }}
                      />

                      <input
                        name="WastageWt"
                        onChange={handleInputChangePurchase}
                        type="text"
                        value={purchaseProduct.WastageWt}
                      />
                    </div>
                  </div>

                  <div>
                    <th>STONE PIECES</th>
                    <input
                      name="StonePieces"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.StonePieces}
                    />
                  </div>

                  {showAllFields ? (
                    <>
                      <div>
                        <th>QUANTITY</th>
                        <input
                          name="Quantity"
                          onChange={handleInputChangePurchase}
                          type="text"
                          value={purchaseProduct.Quantity}
                        />
                      </div>
                      {/* <div>
                        <th>MAKING %</th>
                        <input
                          name="MakingPercentage"
                          onChange={handleInputChangePurchase}
                          type="text"
                          value={purchaseProduct.MakingPercentage}
                        />
                      </div> */}
                      <div>
                        <th>MAKING/GM</th>
                        <input
                          name="MakingPerGram"
                          onChange={handleInputChangePurchase}
                          type="text"
                          value={purchaseProduct.MakingPerGram}
                        />
                      </div>
                      <div>
                        <th>FIXED MAKING</th>
                        <input
                          name="MakingFixedAmt"
                          onChange={handleInputChangePurchase}
                          type="text"
                          value={purchaseProduct.MakingFixedAmt}
                        />
                      </div>

                      <div>
                        <th>RATE/10GM</th>
                        <div className="adminPurchaseEntryDollarSignBox">
                          <FaDollarSign
                            className="adminPurchaseEntryDollarSign"
                            onClick={() => setConvertAmount(!convertAmount)}
                            size={"15px"}
                            style={{
                              cursor: "pointer",
                              color: convertAmount ? "green" : "grey",
                            }}
                          />
                          <input
                            name="MetalRate"
                            onChange={handleInputChangePurchase}
                            type="text"
                            value={purchaseProduct.MetalRate}
                          />
                        </div>
                      </div>

                      <div>
                        <th>STONE AMOUNT</th>
                        <input
                          name="StoneAmount"
                          onChange={handleInputChangePurchase}
                          type="text"
                          value={purchaseProduct.StoneAmount}
                        />
                      </div>
                      <div>
                        <th>HALLMARK AMOUNT</th>
                        <input
                          name="HallmarkAmt"
                          onChange={handleInputChangePurchase}
                          type="text"
                          value={purchaseProduct.HallmarkAmt}
                        />
                      </div>
                      <div>
                        <th>TAG WEIGHT</th>
                        <input
                          name="TagWeight"
                          onChange={handleInputChangePurchase}
                          type="text"
                          value={purchaseProduct.TagWeight}
                        />
                      </div>
                      <div>
                        <th>FINDING WEIGHT</th>
                        <input
                          name="FindingWeight"
                          onChange={handleInputChangePurchase}
                          type="text"
                          value={purchaseProduct.FindingWeight}
                        />
                      </div>
                      <div>
                        <th>LANYARD WEIGHT</th>
                        <input
                          name="LanyardWeight"
                          onChange={handleInputChangePurchase}
                          type="text"
                          value={purchaseProduct.LanyardWeight}
                        />
                      </div>
                      <div>
                        <th>TOTAL ITEM AMT</th>
                        <input
                          style={{
                            cursor: "not-allowed",
                            color: "grey",
                          }}
                          name="TotalItemAmt"
                          // onChange={handleInputChangePurchase}
                          readOnly
                          type="text"
                          value={parseFloat(
                            purchaseProduct.TotalItemAmt
                          ).toFixed(3)}
                        />
                      </div>
                    </>
                  ) : null}

                  {purchaseProduct.CategoryName == "DIAMOND GOLD" ||
                  purchaseProduct.CategoryName == "DIAMOND SILVER" ||
                  purchaseProduct.CategoryName == "DIAMOND PLATINUM" ? (
                    <>
                      <div>
                        <th>T DIA AMOUNT</th>
                        <input
                          style={{
                            cursor: "not-allowed",
                            color: "grey",
                          }}
                          name="TotalItemAmt"
                          // onChange={handleInputChangePurchase}
                          readOnly
                          type="text"
                          value={purchaseProduct.TotalDiamondAmount}
                        />
                      </div>

                      <div>
                        <th>T DIA QTY</th>
                        <input
                          style={{
                            cursor: "not-allowed",
                            color: "grey",
                          }}
                          name="TotalItemAmt"
                          // onChange={handleInputChangePurchase}
                          readOnly
                          type="text"
                          value={purchaseProduct.TotalDiamondQty}
                        />
                      </div>

                      <div>
                        <th>T DIA WT(GRM)</th>
                        <input
                          style={{
                            cursor: "not-allowed",
                            color: "grey",
                          }}
                          name="TotalItemAmt"
                          // onChange={handleInputChangePurchase}
                          readOnly
                          type="text"
                          value={parseFloat(
                            purchaseProduct.TotalDiamondWeight / 5
                          ).toFixed(3)}
                        />
                      </div>
                    </>
                  ) : null}

                  <div>
                    <th>TESTING</th>
                    <input
                      name="Testing"
                      onChange={handleInputChangePurchase}
                      type="text"
                      value={purchaseProduct.Testing}
                    />
                  </div>

                  <div>
                    <th>FINE WT</th>
                    <input
                      style={{ cursor: "not-allowed", color: "grey" }}
                      name="FineWt"
                      // onChange={handleInputChangePurchase}
                      type="text"
                      readOnly
                      value={parseFloat(purchaseProduct.FineWt).toFixed(3)}
                    />
                  </div>

                  <div>
                    <th>F WT + W WT</th>
                    <input
                      style={{ cursor: "not-allowed", color: "grey" }}
                      name="FineWastageWt"
                      readOnly
                      // onChange={handleInputChangePurchase}
                      type="text"
                      value={parseFloat(purchaseProduct.FineWastageWt).toFixed(
                        3
                      )}
                    />
                  </div>
                  {/* <div>
                          <th>SHOW ALL FIELDS</th>
                          <input
                            name="FineWastageWt"
                            readOnly
                            // onChange={handleInputChangePurchase}
                            type="text"
                            value={parseFloat(
                              purchaseProduct.FineWastageWt
                            ).toFixed(3)}
                          />
                        </div> */}
                  <div>
                    <th>ADD TO STOCK</th>

                    <input
                      style={{
                        width: "15px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                      name="AddToUnlabelled"
                      type="checkbox"
                      checked={purchaseProduct.AddToUnlabelled}
                      onChange={() =>
                        setPurchaseProduct({
                          ...purchaseProduct,
                          AddToUnlabelled: !purchaseProduct.AddToUnlabelled,
                        })
                      }
                    />

                    {/* <button>Add</button> */}
                  </div>
                  <div
                    style={{ margin: "0px" }}
                    className="adminPanelLoginFormRegisterBox"
                  >
                    <h5
                      style={{ margin: "0px" }}
                      onClick={() => setShowAllFields(!showAllFields)}
                    >
                      {!showAllFields ? "Show All" : "Show Less"}
                    </h5>
                  </div>
                  <div>
                    <th>STONE - [{purchaseProduct.Stones.length} added]</th>
                    <input
                      style={{
                        backgroundColor: "#02a8b5",
                        color: "white",
                        cursor: "pointer",
                      }}
                      value={"Add"}
                      type="button"
                      onClick={() => {
                        setShowAddStoneBox(true);
                        if (!purchaseProduct.Stones.length > 0) {
                          setPurchaseProduct((previousState) => ({
                            ...previousState,
                            Stones: [...previousState.Stones, addStone],
                          }));
                        }
                      }}
                    />
                    {/* <button>Add</button> */}
                  </div>
                  <div>
                    <th>DIAMOND - [{purchaseProduct.Diamonds.length} added]</th>
                    <input
                      style={{
                        backgroundColor: "#02a8b5",
                        color: "white",
                        cursor: "pointer",
                      }}
                      value={"Add"}
                      type="button"
                      onClick={() => {
                        setShowAddDiamondBox(true);
                        if (purchaseProduct.Diamonds.length === 0) {
                          setPurchaseProduct((previousState) => ({
                            ...previousState,
                            Diamonds: [...previousState.Diamonds, addDiamond],
                          }));
                        }
                      }}
                    />
                    {/* <button>Add</button> */}
                  </div>
                </>
              )}
            </tr>
          </thead>
        </table>
      </div>
      {showAddStoneBox && (
        <div className="popup">
          <div
            style={{ maxHeight: "250px", overflowY: "auto" }}
            className="popup-inner"
          >
            <StonePopup
              purchaseProduct={purchaseProduct}
              handleStoneChange={handleStoneChange}
              deleteStone={deleteStone}
              addStone={addStone}
              setPurchaseProduct={setPurchaseProduct}
              closePopup={() => setShowAddStoneBox(false)} // Close function
              allStonesList={allStonesList}
            />
          </div>
        </div>
      )}

      {showAddDiamondBox ? (
        <div className="popup">
          <div
            style={{ maxHeight: "310px", overflowY: "auto" }}
            className="popup-inner"
          >
            <div className="adminAddProductsPopupInnerBox">
              {purchaseProduct.Diamonds.map((x, index) => (
                <div className="adminPurchaseEntryAddStonesMainBox">
                  <DiamondEntryComponent
                    key={index}
                    index={index}
                    diamond={x}
                    allDiamondAttributes={allDiamondAttributes}
                    allDiamondSizeWeightRate={allDiamondSizeWeightRate}
                    handleDiamondChange={handleDiamondChange}
                    deleteDiamond={deleteDiamond}
                    addDiamond={() =>
                      setPurchaseProduct((prevState) => ({
                        ...prevState,
                        Diamonds: [...prevState.Diamonds, addDiamond],
                      }))
                    }
                    from={"purchase"}
                  />
                </div>
              ))}
              {!purchaseProduct.Diamonds.length > 0 ? (
                <button
                  id="bulkStockAddProductImportButton"
                  onClick={() =>
                    setPurchaseProduct((previousState) => ({
                      ...previousState,
                      Diamonds: [...previousState.Diamonds, addDiamond],
                    }))
                  }
                  className="close-btn"
                >
                  Add Diamond
                </button>
              ) : null}
              <button
                onClick={() => setShowAddDiamondBox(false)}
                className="bulkProductAddDeleteButton close-btn"
              >
                Close
              </button>
            </div>
            {/* <p>This is a popup screen!</p> */}
          </div>
        </div>
      ) : null}

      <div className="adminInvoiceAddProductsOptionsMainPurchaseItems"></div>
      <div
        style={{ justifyContent: "flex-start", margin: "20px 0px" }}
        className="adminInvoiceAddProductsOptionsMainPurchaseItems"
      >
        <button onClick={() => addPurchaseProductToList(purchaseProduct)}>
          Add
        </button>
        <button
          style={{ marginLeft: "20px" }}
          onClick={() => setActive("Sell")}
        >
          Items
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}
