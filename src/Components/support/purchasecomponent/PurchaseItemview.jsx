import React from "react";
import { RxCross2 } from "react-icons/rx";
import { BsCardImage } from "react-icons/bs";
import Adminopeneditbox from "./openeditbox";
import { AiOutlineEdit, AiOutlinePlusSquare } from "react-icons/ai";

export default function AdminPurchseitemview({
  filteredPurities,
  productsLoading,
  allSelectedProducts,
  labelName,
  handleProductLabelChange,
  selectedProduct,
  totalPayableAmount,
  openEditBox,
  removePurchaseProductFromList,
  setPurchaseProduct,
  getShapeValue,
  getDiamondClarity,
  getDiamondColor,
  getDiamondCut,
  getSettingType,
  setActive,
  setConvertAmount,
  setFinePure,
  setSelectedSkuName,
  selectedSkuName
}) {


  console.log('purchase item view ', allSelectedProducts)

  return (
    <>
      <div className="adminInvoiceAddProductsOptionsMainSellBox">
        {!productsLoading ? (
          <div className="adminInvoiceAddProductsOptionsMainBox">
            <div
              id="adminInvoiceAddProductsOptionsInnerBox"
              className="adminInvoiceAddProductsOptionsInnerBox"
            >
              <table>
                <thead>
                  <tr>
                    <th>ITEM DETAILS</th>
                    <th>F WT + W WT/RATE</th>
                    <th>GROSS WT</th>
                    <th>NET WT</th>
                    <th>FINE%</th>
                    <th>WASTAGE%</th>
                    <th>MAKING</th>
                    <th>PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {allSelectedProducts.length > 0
                    ? allSelectedProducts.map((x, index) => (

                    
                        <tr
                          style={{
                            borderBottom: "1px solid  rgba(128, 128, 128, 0.3)",
                          }}
                        >
                          <td>
                            <div className="adminAddInvoiceMainAddLabelOption">
                              <div className="adminAddInvoiceMainAddLabelOptionImageBox">
                                <BsCardImage size={"30px"} />
                              </div>
                              <div className="adminAddInvoiceMainAddLabelOptionLabelBox">
                                <p
                                  style={{
                                    textAlign: "left",
                                    margin: "5px",
                                    padding: "5px",
                                    marginBottom: "0px",
                                    paddingBottom: "0px",
                                    color: "red",
                                  }}
                                >
                                  Purchase
                                </p>

                                <p
                                  style={{
                                    fontWeight: "bold",
                                    color: "red",
                                    fontSize: "10px",
                                    textAlign: "left",
                                    margin: "0px 5px",
                                    padding: "0px 5px",
                                  }}
                                >
                                  {`${x.CategoryName}, ${x.ProductName}, ${x.StockKeepingUnit}`}
                                </p>
                              </div>
                              <div className="adminAddInvoiceMainAddLabelOptionEditIconBox">
                                <button
                                  onClick={() => {
                                    // editItem(x);
                                    removePurchaseProductFromList(index),
                                      console.log("checking edit item ", x);
                                    setPurchaseProduct({
                                      ...x,
                                      DiamondShape: getShapeValue(
                                        x.DiamondShape
                                      ),
                                      DiamondClarity: getDiamondClarity(
                                        x.DiamondClarity
                                      ),
                                      DiamondColour: getDiamondColor(
                                        x.DiamondColour
                                      ),
                                      DiamondCut: getDiamondCut(x.DiamondCut),
                                      DiamondSettingType: getSettingType(
                                        x.DiamondSettingType
                                      ),
                                    });
                                    setActive("Purchase");
                                    console.log("Active state is now Purchase");
                                      setConvertAmount(x.ConvertAmount);
                                      setFinePure(x.FinePure);
                                    setSelectedSkuName(x.StockKeepingUnit);
                                  }}
                                  className="adminAddInvoiceMainAddLabelOptionEditIcon"
                                >
                                  <AiOutlineEdit />
                                </button>
                                <button
                                  style={{ marginBottom: "5px" }}
                                  onClick={() => {
                                    removePurchaseProductFromList(index);
                                  }}
                                  className="adminAddInvoiceMainAddLabelOptionDeleteIcon"
                                >
                                  <RxCross2 />
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* <td>₹{parseFloat(x.MetalRate).toFixed(0)}</td> */}

                          <td>
                          {parseFloat(x.FineWastageWt).toFixed(3)}/{parseFloat(x.MetalRate).toFixed(0)}
                          </td>
                          

                          <td>{parseFloat(x.GrossWt).toFixed(3)}</td>

                          <td> {parseFloat(x.NetWt).toFixed(3)}</td>

                          <td>{parseFloat(x.FinePercent).toFixed(3)}</td>
                          <td> {parseFloat(x.WastageWt).toFixed(3)}</td>

                          <td> ₹{parseFloat(x.Making).toFixed(3)}</td>
                          <td>
                            ₹
                            {parseFloat(
                              parseFloat(x.FinalPrice) +
                                parseFloat(x.TotalGstAmount)
                            ).toFixed(3)}
                          </td>
                        </tr>
                      ))
                    : null}

                  <tr style={{ height: "50px" }}>
                    <td>
                      <div>{/* Any content you want to display here */}</div>
                    </td>

                    <td>
                      {selectedProduct.length > 0
                        ? selectedProduct[0].MetalRate
                        : 0}
                    </td>
                    <td>
                      {selectedProduct.length > 0
                        ? selectedProduct[0].GrossWt
                        : 0}
                    </td>
                    <td>
                      {selectedProduct.length > 0
                        ? selectedProduct[0].NetWt
                        : 0}
                    </td>
                    <td>
                      {selectedProduct.length > 0
                        ? selectedProduct[0].Purity
                        : "N/A"}
                    </td>
                    <td>
                      {selectedProduct.length > 0
                        ? selectedProduct[0].Making
                        : 0}
                    </td>
                    <td>
                      {selectedProduct.length > 0
                        ? selectedProduct[0].Making
                        : 0}
                    </td>
                    <td>₹{totalPayableAmount || 0}</td>
                  </tr>

                  {/* <tr style={{height:'10px'}}>

                          <td>
                            <div>

                            </div>
                          </td>
                            
                            
                            <td>
                              <div className="adminAddInvoiceMainAddLabelOption">
                                <div className="adminAddInvoiceMainAddLabelOptionImageBox">
                                  <BsCardImage size={"30px"} />
                                </div>
                                <div className="adminAddInvoiceMainAddLabelOptionLabelBox">
                                  <input
                                    // tabIndex="1"
                                    type="text"
                                    placeholder="Type or click to select an item"
                                    name="productLabel"
                                    value={labelName}
                                    onInput={handleProductLabelChange}
                                    readOnly
                                    onKeyPress={(e) => {
                                      if (e.key === "Ctrl") {
                                        e.preventDefault();
                                        // button1Ref.current.focus();
                                        alert("Space");
                                      } else if (e.key === "Enter") {
                                        // Call your function here
                                        if (selectedProduct.length !== 0) {
                                          calculateFinalPrice(
                                            selectedProduct,
                                            true
                                          );
                                        } else {
                                          // null;
                                          button1Ref.current.focus();
                                        }
                                      }
                                    }}
                                    list="productLabelList"
                                  />
                                  <datalist id="productLabelList">
                                    {allProducts.map((product, index) => (
                                      <option
                                        key={index}
                                        value={product.itemCode}
                                      />
                                    ))}
                                  </datalist>
                                </div>
                              </div>
                            </td>

                            {selectedProduct.length > 0 ? (
                              <td>{selectedProduct.MetalRate}</td>
                            ) : (
                              <td>0</td>
                            )}
                            <td>{selectedProduct.GrossWt}</td>
                            <td> {selectedProduct.NetWt}</td>
                            <td> {selectedProduct.Purity}</td>
                            <td>{selectedProduct.Making}</td>

                            <td>₹{totalPayableAmount} </td>
                          </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <tr>
            <td>
              <div className="adminAddInvoiceMainAddLabelOption">
                <div className="adminAddInvoiceMainAddLabelOptionImageBox">
                  <BsCardImage size={"30px"} />
                </div>
                <div className="adminAddInvoiceMainAddLabelOptionLabelBox">
                  <input
                    type="text"
                    placeholder="Type or click to select an item"
                    name="productLabel"
                    value={labelName}
                    onInput={handleProductLabelChange}
                    list="productLabelList"
                  />
                  <datalist id="productLabelList">
                    {/* {allProducts.map((product, index) => (
                              <option key={index} value={product.itemCode} />
                            ))} */}
                  </datalist>
                </div>
              </div>
            </td>
            <td>{selectedProduct.GrossWt}</td>
            <td> {selectedProduct.NetWt}</td>
            <td> {selectedProduct.Purity}</td>
            <td> {selectedProduct.Making}</td>

            <td>
              {parseFloat(
                parseFloat(selectedProduct.FinalPrice) +
                  parseFloat(selectedProduct.TotalGstAmount)
              ).toFixed(3)}
            </td>
          </tr>
        )}

        {openEditBox ? <Adminopeneditbox /> : null}
      </div>
    </>
  );
}
