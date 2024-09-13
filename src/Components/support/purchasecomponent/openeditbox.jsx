import React from "react";
import { RxCross2 } from "react-icons/rx";


export default function Adminopeneditbox(){

    return(

        <>
        <div className="adminInvoiceOpenEditMainBox">
                    <div className="adminInvoiceOpenEditInnerBox">
                      <div className="adminInvoiceOpenEditInnerTitleBox">
                        <p>Edit Item</p>
                        <button
                          onClick={closeEditItem}
                          className="adminAddInvoiceMainAddLabelOptionDeleteIcon"
                        >
                          <RxCross2 size={"25px"} />
                        </button>
                      </div>
                      <div className="adminInvoiceOpenEditOuterGridBox">
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Gross Wt</label>
                          <input
                            type="text"
                            placeholder={openEditProduct.GrossWt}
                            value={openEditProduct.GrossWt}
                            onChange={(e) => handleInputChange2(e, "GrossWt")}
                          />
                        </div>

                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Stone Wt</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.StoneWt}
                            value={openEditProduct.StoneWt}
                            onChange={(e) => handleInputChange2(e, "StoneWt")}
                          />
                        </div>

                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Net Wt</label>
                          <input
                            type="text"
                            placeholder={openEditProduct.NetWt}
                            value={openEditProduct.NetWt}
                            onChange={(e) => handleInputChange2(e, "NetWt")}
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Stone Amount</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.StoneAmount}
                            value={openEditProduct.StoneAmount}
                            onChange={(e) =>
                              handleInputChange2(e, "StoneAmount")
                            }
                          />
                        </div>
                        {/*    <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Product Name</label>
                          <input
                            type="text"
                            placeholder={openEditProduct.product_Name}
                            value={openEditProduct.product_Name}
                            onChange={(e) =>
                              handleInputChange2(e, "product_Name")
                            }
                          />
                        </div>
                          <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>HUID Code</label>
                          <input
                            type="text"
                            maxLength={6}
                            placeholder={openEditProduct.huidCode}
                            value={openEditProduct.huidCode}
                            onChange={(e) => handleInputChange2(e, "huidCode")}
                          />
                        </div> */}

                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Making PerGram</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.MakingPerGram}
                            value={openEditProduct.MakingPerGram}
                            onChange={(e) =>
                              handleInputChange2(e, "MakingPerGram")
                            }
                          />
                        </div>

                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Making Percentage</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.MakingPercentage}
                            value={openEditProduct.MakingPercentage}
                            onChange={(e) =>
                              handleInputChange2(e, "MakingPercentage")
                            }
                          />
                        </div>

                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Making Fixed Amount</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.MakingFixedAmt}
                            value={openEditProduct.MakingFixedAmt}
                            onChange={(e) =>
                              handleInputChange2(e, "MakingFixedAmt")
                            }
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Making Fixed Wastage</label>
                          <input
                            type="number"
                            placeholder={openEditProduct.MakingFixedWastage}
                            value={openEditProduct.MakingFixedWastage}
                            onChange={(e) =>
                              handleInputChange2(e, "MakingFixedWastage")
                            }
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Quantity</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.Quantity}
                            value={openEditProduct.Quantity}
                            onChange={(e) => handleInputChange2(e, "Quantity")}
                          />
                        </div>
                        {/* <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Size</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.size}
                            value={openEditProduct.size}
                            onChange={(e) => handleInputChange2(e, "size")}
                          />
                        </div> */}

                        {/* <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>MRP</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.MRP}
                            value={openEditProduct.MRP}
                            onChange={(e) => handleInputChange2(e, "MRP")}
                          />
                        </div> */}
                        {/* <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Description</label>{" "}
                          <input
                            type="text"
                            placeholder={openEditProduct.description}
                            value={openEditProduct.description}
                            onChange={(e) =>
                              handleInputChange2(e, "description")
                            }
                          />
                        </div> */}
                        {/* <div className="adminInvoiceOpenEditInnerGridItem">
                            <label>Occasion</label>{" "}
                            <input
                              type="text"
                              placeholder={openEditProduct.occasion}
                              value={openEditProduct.occasion}
                              onChange={(e) => handleInputChange2(e, "occasion")}
                            />
                          </div> */}
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Todays Rate</label>{" "}
                          <input
                            type="text"
                            placeholder={openEditProduct.MetalRate}
                            value={openEditProduct.MetalRate}
                            onChange={(e) => handleInputChange2(e, "MetalRate")}
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Hallmark Amount</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.HallmarkAmt}
                            value={openEditProduct.HallmarkAmt}
                            onChange={(e) =>
                              handleInputChange2(e, "HallmarkAmt")
                            }
                          />
                        </div>

                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Tag Weight</label>{" "}
                          <input
                            type="text"
                            placeholder={openEditProduct.TagWeight}
                            value={openEditProduct.TagWeight}
                            onChange={(e) => handleInputChange2(e, "TagWeight")}
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Finding Weight</label>{" "}
                          <input
                            type="text"
                            placeholder={openEditProduct.FindingWeight}
                            value={openEditProduct.FindingWeight}
                            onChange={(e) =>
                              handleInputChange2(e, "FindingWeight")
                            }
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Lanyard Weight</label>{" "}
                          <input
                            type="text"
                            placeholder={openEditProduct.LanyardWeight}
                            value={openEditProduct.LanyardWeight}
                            onChange={(e) =>
                              handleInputChange2(e, "LanyardWeight")
                            }
                          />
                        </div>

                        <div className="adminInvoiceOpenEditInnerGridItem">
                          {/* <label>Update</label>{" "} */}.{" "}
                          <button
                            onClick={() => {
                              setOpenEditBox(false),
                                setSelectedProduct([]),
                                setLabelName("");
                            }}
                            className="adminInvoiceEditProductSaveButton"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
        
        
        
        </>


    )




}