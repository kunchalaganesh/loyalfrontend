import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FaDollarSign } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import StonePopup from "../purchasesupport/StonePopup.jsx";
import DiamondEntryComponent from "../purchasesupport/Diamondpopup.jsx";

export default function InvoiceFields({ selectedSkuName,
    handleSkuInputChange, allSkuList, wholesaleProduct,
    allCategories, filteredProducts, handleInputChangeWholesale,
    filteredPurities, filteredWholesaleCollection, wholesaleProductLabelName,
    handleWholesaleProductLabelChange, allProducts, filteredProductsWholesale,
    filteredPuritiesWholesaleProduct,convertAmount,setConvertAmount,allSelectedProducts }) {

    return (
        <div className="adminPurchaseInvoiceAddProductsOptionsMainPurchaseBox">
            <div className="adminPurchaseInvoiceAddProductsOptionsMainPurchaseItems">

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
                                <th>Label</th>
                                <input
                                    // style={{ width: "30vw" }}
                                    type="text"
                                    placeholder="Type or click to select an item"
                                    name="productLabel"
                                    value={wholesaleProductLabelName}
                                    onInput={handleWholesaleProductLabelChange}
                                    onKeyPress={(e) => {
                                        if (e.key === "Ctrl") {
                                            e.preventDefault();
                                            // button1Ref.current.focus();
                                            alert("Space");
                                        } else if (e.key === "Enter") {
                                            // Call your function here
                                            if (selectedProduct.length !== 0) {
                                                let changeSelectedProduct = selectedProduct;

                                                return (
                                                    (changeSelectedProduct.sell = false),
                                                    (changeSelectedProduct.wholesale = true),
                                                    calculateWholesaleProductFinalPrice(
                                                        changeSelectedProduct,
                                                        true
                                                    ),
                                                    setActive("Wholesale")
                                                );
                                                // setOrderProductLabelName("");
                                            } else {
                                                // null;
                                                button1Ref.current.focus();
                                            }
                                        }
                                    }}
                                    list="productLabelList"
                                    autoComplete="off"
                                />
                                <datalist id="productLabelList">
    {allProducts
      .filter((product) => !allSelectedProducts.some((x) => x.ItemCode === product.ItemCode))
      .map((product) => (
        <option key={product.Id} value={product.ItemCode} />
      ))}
  </datalist>
                                {/* <datalist id="productLabelList">
                                    {allProducts.map((product) => (
                                        <option key={product.Id} value={product.ItemCode} />
                                    ))}
                                </datalist> */}
                            </div>
                            <div>
                                <th>CATEGORY</th>
                                <select
                                    name="CategoryId"
                                    // onChange={handleInputChangeWholesale}
                                    disabled={wholesaleProduct.StockKeepingUnit}
                                    onChange={handleInputChangeWholesale}
                                    value={`${wholesaleProduct.CategoryId},${wholesaleProduct.CategoryName}`}
                                >
                                    <option value={""}>Select an Category</option>
                                    {allCategories.map((x, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={`${x.Id},${x.CategoryName}`}
                                            >
                                                {x.CategoryName}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            {wholesaleProduct.CategoryName &&
                                wholesaleProduct.CategoryName.toLowerCase() == "diamonds" ? (
                                <div>
                                    <th>METAL</th>
                                    <select
                                        name="MetalId"
                                        // onChange={handleInputChangeWholesale}
                                        onChange={(e) => {
                                            // setSelectedCategory(e.target.value),
                                            handleInputChangeWholesale(e);
                                        }}
                                        // value={wholesaleProduct.names}
                                        // value={selectedCategory}
                                        value={`${wholesaleProduct.MetalId},${wholesaleProduct.MetalName}`}
                                    // value={wholesaleProduct.CategoryName}
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


                            {wholesaleProduct.CategoryName == "LOOSE DIAMOND" ? (
                                <>

                                </>
                            ) : (
                                <>
                                    <div>
                                        <th>PRODUCT</th>
                                        <select
                                            disabled={wholesaleProduct.StockKeepingUnit}
                                            name="ProductId"
                                            onChange={handleInputChangeWholesale}
                                            value={`${wholesaleProduct.ProductId},${wholesaleProduct.ProductName}`}
                                        >
                                            <option value={""}>Select an Product</option>
                                            {filteredProductsWholesale.map((x, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={`${x.Id},${x.ProductName}`}
                                                    >
                                                        {x.ProductName}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <div>
                                        <th>Design</th>
                                        <select
                                            disabled={wholesaleProduct.StockKeepingUnit}
                                            name="DesignId"
                                            onChange={handleInputChangeWholesale}
                                            // value={wholesaleProduct.ProductNames}
                                            // value={wholesaleProduct.ProductName}
                                            // value={selectedProductType}
                                            value={`${wholesaleProduct.DesignId},${wholesaleProduct.DesignName}`}
                                        >
                                            <option value={""}>Select an Product</option>
                                            {filteredWholesaleCollection.map((x, index) => {
                                                return (
                                                    <option key={index} value={`${x.Id},${x.DesignName}`}>
                                                        {x.DesignName}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>


                                    <div>
                                        <th>GROSS WT</th>
                                        <input
                                            name="GrossWt"
                                            onChange={handleInputChangeWholesale}
                                            type="text"
                                            value={wholesaleProduct.GrossWt}
                                        />
                                    </div>
                                    <div>
                                        <th>STONE WT</th>
                                        <input
                                            name="StoneWt"
                                            onChange={handleInputChangeWholesale}
                                            type="text"
                                            value={wholesaleProduct.StoneWt}
                                        />
                                    </div>

                                    <div>
                                        <th>NET WT</th>
                                        <input
                                            name="NetWt"
                                            onChange={handleInputChangeWholesale}
                                            type="text"
                                            value={wholesaleProduct.NetWt}
                                        />
                                    </div>
                                    <div>
                                        <th>PURITY</th>
                                        <select
                                            disabled={wholesaleProduct.StockKeepingUnit}
                                            name="PurityId"
                                            onChange={handleInputChangeWholesale}
                                            value={`${wholesaleProduct.PurityId},${wholesaleProduct.PurityName},${wholesaleProduct.PurityRate}`}
                                        >
                                             <option>Select an Purity</option>
                      {filteredPuritiesWholesaleProduct.map((x, index) => {
                        return (
                          <option
                            key={index}
                            value={`${x.Id},${x.PurityName},${x.TodaysRate}`}
                          >
                            {x.PurityName}
                          </option>
                        );
                      })}
                    </select>

                                    </div>
                                    <div>
                                        <th>FINE PERCENT</th>
                                        <input
                                            name="FinePercent"
                                            onChange={handleInputChangeWholesale}
                                            type="text"
                                            value={wholesaleProduct.FinePercent}
                                        />
                                    </div>
                                    <div>
                                        <th>WASTAGE%</th>
                                        <div className="adminPurchaseEntryDollarSignBox">


                                            <input
                                                name="WastagePercent"
                                                onChange={handleInputChangeWholesale}
                                                type="text"
                                                value={wholesaleProduct.WastageWt}
                                            />
                                        </div>
                                    </div>


                                    <div>
                                        <th>QUANTITY</th>
                                        <input
                                            name="Quantity"
                                            onChange={handleInputChangeWholesale}
                                            type="text"
                                            value={wholesaleProduct.Quantity}
                                        />
                                    </div>

                                    <div>
                                        <th>MAKING/GM</th>
                                        <input
                                            name="MakingPerGram"
                                            onChange={handleInputChangeWholesale}
                                            type="text"
                                            value={wholesaleProduct.MakingPerGram}
                                        />
                                    </div>
                                    <div>
                                        <th>FIXED MAKING</th>
                                        <input
                                            name="MakingFixedAmt"
                                            onChange={handleInputChangeWholesale}
                                            type="text"
                                            value={wholesaleProduct.MakingFixedAmt}
                                        />
                                    </div>

                                    <div>
                                        <th>RATE/10GM</th>
                                        <div
                      style={{ width: "auto" }}
                      className="adminPurchaseEntryDollarSignBox"
                    >
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
                        name="GoldRate"
                        onChange={handleInputChangeWholesale}
                        type="text"
                        value={wholesaleProduct.GoldRate}
                      />
                    </div>
                                    </div>

                                    <div>
                                        <th>STONE AMOUNT</th>
                                        <input
                                            name="StoneAmount"
                                            onChange={handleInputChangeWholesale}
                                            type="text"
                                            value={wholesaleProduct.StoneAmount}
                                        />
                                    </div>
                                    

                                    <div>
                                        <th>TOTAL ITEM AMT</th>
                                        <input
                      name="ItemAmount"
                      // onChange={handleInputChangeWholesale}
                      type="text"
                      readOnly
                      // value={wholesaleProduct.OrderAmount}
                      value={wholesaleProduct.TotalItemAmount}
                    />
                                    </div>



                                    {wholesaleProduct.CategoryName == "DIAMOND GOLD" ||
                                        wholesaleProduct.CategoryName == "DIAMOND SILVER" ||
                                        wholesaleProduct.CategoryName == "DIAMOND PLATINUM" ? (
                                        <>
                                            <div>
                                                <th>T DIA AMOUNT</th>
                                                <input
                                                    style={{
                                                        cursor: "not-allowed",
                                                        color: "grey",
                                                    }}
                                                    name="TotalItemAmt"
                                                    // onChange={handleInputChangeWholesale}
                                                    readOnly
                                                    type="text"
                                                    value={wholesaleProduct.TotalDiamondAmount}
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
                                                    // onChange={handleInputChangeWholesale}
                                                    readOnly
                                                    type="text"
                                                    value={wholesaleProduct.TotalDiamondQty}
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
                                                    // onChange={handleInputChangeWholesale}
                                                    readOnly
                                                    type="text"
                                                    value={parseFloat(
                                                        wholesaleProduct.TotalDiamondWeight / 5
                                                    ).toFixed(3)}
                                                />
                                            </div>
                                        </>
                                    ) : null}

                                    {/* <div>
                                        <th>TESTING</th>
                                        <input
                                            name="Testing"
                                            onChange={handleInputChangeWholesale}
                                            type="text"
                                            value={wholesaleProduct.Testing}
                                        />
                                    </div> */}

                                    {/* <div>
                                        <th>FINE WT</th>
                                        <input
                                            style={{ cursor: "not-allowed", color: "grey" }}
                                            name="FineWt"
                                            // onChange={handleInputChangeWholesale}
                                            type="text"
                                            readOnly
                                            value={parseFloat(wholesaleProduct.FineWt).toFixed(3)}
                                        />
                                    </div> */}

                                    <div>
                                        <th>F WT + W WT</th>
                                        <input
                                            style={{ cursor: "not-allowed", color: "grey" }}
                                            name="FineWastageWeight"
                                            readOnly
                                            // onChange={handleInputChangeWholesale}
                                            type="text"
                                            value={wholesaleProduct.FineWastageWeight}
                                        />
                                    </div>
                                    {/* <div>
                          <th>SHOW ALL FIELDS</th>
                          <input
                            name="FineWastageWt"
                            readOnly
                            // onChange={handleInputChangeWholesale}
                            type="text"
                            value={parseFloat(
                              wholesaleProduct.FineWastageWt
                            ).toFixed(3)}
                          />
                        </div> */}
                                   
                                    


                                </>
                            )}


                        </tr>
                    </thead>
                </table>
            </div>
        </div>


    )
}