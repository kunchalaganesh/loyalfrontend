import React from "react";
import DateTime from "../../Other Functions/DateTime";
import { AiOutlineEdit, AiOutlinePlusSquare } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function AdminPurchaseHead({
  selectedDate,
  setSelectedDate,
  allCsData,
  setAllCsData,
  customerName,
  setCustomerName,
  handleNameInputChange,
  selectedCustomer,
  setSelectedCustomer,
  purchaseMainBox,
  setPurchaseMainBox,
  invoiceNumber,
  setInvoiceNumber,
  selectedCustomerEdit,
  setSelectedCustomerEdit,
  scrollToCenter,
  updateCustomerDetails,
  setGstType,
  gstType,
  from
}) {
  // Get today's date in 'YYYY-MM-DD' format
  const today = new Date().toISOString().split("T")[0];

  return (
    <>

      <div className="invoiceFormDateTimeBox">
        <DateTime dateRcvd={selectedDate ? selectedDate : null} />
        <div className="invoiceFormDateTimeSelectDateBox">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={today} // Restrict future dates
          />
        </div>
      </div>

      <div style={{ marginBottom: "0px" }} id="adminInvoiceAddCustomerTitle" className="adminInvoiceSelectLabelBox">
        <div className="adminInvoiceSelectItem">
          <label>Firm Name</label>
          <input
            style={{ width: "20vw" }}
            type="text"
            name="customerName"
            value={customerName}
            onInput={handleNameInputChange}
            list="customerNamesList"
          />
          <datalist id="customerNamesList">
            {allCsData.map((customer, index) => (
              <option key={index} value={`${customer.FirmName}`} />
            ))}
          </datalist>
          <button onClick={() => navigate("/add_supplier")} className="adminInvoiceAddCustomerOption">
            <AiOutlinePlusSquare size={"20px"} />
          </button>
          {selectedCustomer && (
            <div className="adminInvoiceAddedCustomerEditIconBox">
              <button
                onClick={() => {
                  setSelectedCustomerEdit(!selectedCustomerEdit);
                  scrollToCenter("adminInvoiceAddProductsOptionsTypeBox");
                }}
              >
                <AiOutlineEdit size={"20px"} />
              </button>
              <button
                onClick={() => {
                  setSelectedCustomer(null);
                  scrollToCenter("adminInvoiceAddCustomerTitle");
                }}
                id="adminInvoiceAddedCustomerRemoveIcon"
              >
                <RiDeleteBin2Line size={"20px"} />
              </button>
            </div>
          )}
        </div>

        <div className="adminInvoiceSelectItem">
          <label>Lot Number</label>
          <input
            type="text"
            readOnly
            value={from == 'purchaseentry' ? purchaseMainBox.length + 1 || 0 : parseInt(purchaseMainBox.LotNumber)}
          //   value={purchaseMainBox ? purchaseMainBox.InwardNo : selectedCustomer ? parseInt(selectedCustomer.InwardNo) + 1 : 0}
          />
        </div>

        <div className="adminInvoiceSelectItem">
          <label>Invoice Number</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => {
              setInvoiceNumber(e.target.value);
              setGstType(!!e.target.value);
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: "0px" }} className="adminInvoiceSelectLabelBox">
        <div className="adminInvoiceSelectItem">
          <label>Fine Gold:</label>
          <h4 className="adminInvoiceSelectItemBalanceMetal">
            {selectedCustomer ? selectedCustomer.FineGold : 0}
          </h4>
        </div>
        <div className="adminInvoiceSelectItem">
          <label>Fine Silver:</label>
          <h4 className="adminInvoiceSelectItemBalanceMetal">
            {selectedCustomer ? selectedCustomer.FineSilver : 0}
          </h4>
        </div>
        <div className="adminInvoiceSelectItem">
          <label>Advance Amount:</label>
          <h4>{selectedCustomer ? selectedCustomer.AdvanceAmt : 0}</h4>
        </div>
        <div className="adminInvoiceSelectItem">
          <label>Balance Amount:</label>
          <h4>{selectedCustomer ? selectedCustomer.BalanceAmt : 0}</h4>
        </div>
      </div>

      {/* <h4>{selectedCustomer ? selectedCustomer.BalanceAmt : 0}</h4> */}


      {selectedCustomer &&
        !selectedCustomerEdit ? null : selectedCustomer &&
          selectedCustomerEdit ? (
        <div className="adminInvoiceAddedCustomerEditMainBox">
          <p>Personal Details</p>
          <div className="adminInvoiceAddedCustomerEditBox">
            <div className="adminInvoiceAddedCustomerEditItems">
              <label>Supplier Code</label>
              <input
                readOnly
                value={selectedCustomer.supplier_code}
                type="text"
              />
            </div>
            <div className="adminInvoiceAddedCustomerEditItems">
              <label>Supplier Name</label>
              <input
                onChange={(e) =>
                  handleCustomerInputChange(e, "supplier_name")
                }
                value={selectedCustomer.supplier_name}
                type="text"
              />
            </div>
            <div className="adminInvoiceAddedCustomerEditItems">
              <label>Supplier Type</label>
              <select
                onChange={(e) =>
                  handleCustomerInputChange(e, "supplierType")
                }
                value={selectedCustomer.supplierType}
              >
                <option value={"Party"}>Party</option>
                <option value={"Karigar"}>Karigar</option>
                {" "}
              </select>
            </div>
            <div className="adminInvoiceAddedCustomerEditItems">
              <label>Firm Name</label>
              <input
                onChange={(e) =>
                  handleCustomerInputChange(e, "firm_name")
                }
                value={selectedCustomer.firm_name}
                type="text"
              />
            </div>

            <div className="adminInvoiceAddedCustomerEditItems">
              <label>Aadhar No.</label>
              <input
                onChange={(e) =>
                  handleCustomerInputChange(e, "party_adhar_no")
                }
                value={selectedCustomer.party_adhar_no}
                type="text"
              />
            </div>
            <div className="adminInvoiceAddedCustomerEditItems">
              <label>Pan No.</label>
              <input
                onChange={(e) =>
                  handleCustomerInputChange(e, "party_pan_no")
                }
                value={selectedCustomer.party_pan_no}
                type="text"
              />
            </div>
            <div className="adminInvoiceAddedCustomerEditItems">
              <label>GSTIN No.</label>
              <input
                onChange={(e) => handleCustomerInputChange(e, "gst_no")}
                value={selectedCustomer.gst_no}
                type="text"
              />
            </div>
            <div className="adminInvoiceAddedCustomerEditItems">
              <label>Central GST No.</label>
              <input
                onChange={(e) =>
                  handleCustomerInputChange(e, "central_gst_no")
                }
                value={selectedCustomer.central_gst_no}
                type="text"
              />
            </div>
          </div>
          <p>Contact Information</p>
          <div className="adminInvoiceAddedCustomerEditBox">
            <div className="adminInvoiceAddedCustomerEditItems">
              <label>Contact No</label>
              <input
                onChange={(e) =>
                  handleCustomerInputChange(e, "contact_no")
                }
                value={selectedCustomer.contact_no}
                type="text"
              />
            </div>
            <div className="adminInvoiceAddedCustomerEditItems">
              <label>Email Id</label>
              <input
                onChange={(e) => handleCustomerInputChange(e, "email_id")}
                value={selectedCustomer.email_id}
                type="text"
              />
            </div>

            <div className="adminInvoiceAddedCustomerEditItems">
              <label>Address</label>
              <input
                onChange={(e) => handleCustomerInputChange(e, "address")}
                value={selectedCustomer.address}
                type="text"
              />
            </div>
            <div className="adminInvoiceAddedCustomerEditItems">
              <label>City</label>
              <input
                onChange={(e) => handleCustomerInputChange(e, "city")}
                value={selectedCustomer.city}
                type="text"
              />
            </div>
            <div className="adminInvoiceAddedCustomerEditItems">
              <label>State</label>
              <input
                onChange={(e) => handleCustomerInputChange(e, "state")}
                value={selectedCustomer.state}
                type="text"
              />
            </div>
          </div>

          <div className="adminInvoiceAddedCustomerEditButtonBox">
            <button onClick={() => updateCustomerDetails()}>Save</button>
            <button
              onClick={() => {
                scrollToCenter("adminInvoiceAddCustomerTitle"),
                  setSelectedCustomerEdit(!selectedCustomerEdit);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

    </>
  );
}
