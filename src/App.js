/* eslint-disable */
import React, {useState, useEffect} from "react";
// import { Routes, Route, useNavigate, Link } from "react-router-dom";
import {HashRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import "./App.css";
import {useSelector} from "react-redux";
import AdminHome from "./Components/Pages/AdminPanel/AdminHome/AdminHome";
import AdminPanelLogin from "./Components/Pages/AdminPanel/AdminPanelLogin/AdminPanelLogin";
import AdminAddCategory from "./Components/Pages/AdminPanel/AdminMasters/AdminAddCategory";
import AdminAddProductType from "./Components/Pages/AdminPanel/AdminMasters/AdminAddProductType";
import AdminAddCollection from "./Components/Pages/AdminPanel/AdminMasters/AdminAddCollection";
import AdminAddPurity from "./Components/Pages/AdminPanel/AdminMasters/AdminAddPurity";
import AdminAddBox from "./Components/Pages/AdminPanel/AdminMasters/AdminAddBox";
import AdminInventory from "./Components/Pages/AdminPanel/AdminEcommerce/AdminInventory";
import AdminAddBulkProducts from "./Components/Pages/AdminPanel/AdminEcommerce/AdminAddBulkProducts";
import AdminInvoice from "./Components/Pages/AdminPanel/AdminTrading/AdminInvoice";
import AdminAllCustomers from "./Components/Pages/AdminPanel/AdminEcommerce/AdminAllCustomers";
import AdminRates from "./Components/Pages/AdminPanel/AdminSettings/AdminRates";
import AdminAllOrders from "./Components/Pages/AdminPanel/AdminEcommerce/AdminAllOrders";
import ProductDetails from "./Components/Pages/AdminPanel/AdminEcommerce/ProductDetails";
import AdminAllUnlabelledList from "./Components/Pages/AdminPanel/AdminEcommerce/AdminAllUnlabelledList";
import AdminPurchase from "./Components/Pages/AdminPanel/AdminTrading/AdminPurchase";
import AdminInvoiceEdit from "./Components/Pages/AdminPanel/AdminTrading/AdminInvoiceEdit";
import AdminAddEmployee from "./Components/Pages/AdminPanel/AdminMasters/AdminAddEmployee";
import AdminSaleReport from "./Components/Pages/AdminPanel/AdminReports/AdminSaleReport";
import AdminCreditNote from "./Components/Pages/AdminPanel/AdminEcommerce/AdminCreditNote";
import AdminPurchaseEntry from "./Components/Pages/AdminPanel/AdminTrading/AdminPurchaseEntry";
import AdminPurchasePayments from "./Components/Pages/AdminPanel/AdminTrading/AdminPurchasePayments";
import AdminAddStone from "./Components/Pages/AdminPanel/AdminMasters/AdminAddStone";
import AdminAddSku from "./Components/Pages/AdminPanel/AdminMasters/AdminAddSku";
import AdminLedgerMain from "./Components/Pages/AdminPanel/AdminAccounts/AdminLedgerMain";
import AdminSupplierAllPayments from "./Components/Pages/AdminPanel/AdminAccounts/Extra Pages/AdminSupplierAllPayments";
import AdminInvoicePayments from "./Components/Pages/AdminPanel/AdminTrading/AdminInvoicePayments";
import AdminDebitNote from "./Components/Pages/AdminPanel/AdminEcommerce/AdminDebitNote";
import AdminStockReport from "./Components/Pages/AdminPanel/AdminReports/AdminStockReport";
import CategoryNew from "./Components/Pages/AdminPanel/AdminEcommerce/CategoryNew";
import AdminCashReport from "./Components/Pages/AdminPanel/AdminReports/AdminCashReport";
import ExcelImport from "./Components/Other Functions/ExcelImport";
import InvoiceCustomization from "./Components/Other Functions/InvoiceCustomization";
import GSHome from "./Components/Pages/GoldString/GSHome/GSHome";
import GSClientOnboarding from "./Components/Pages/GoldString/GSClientOnboarding/GSClientOnboarding";
import AdminAddCompany from "./Components/Pages/AdminPanel/AdminMasters/AdminAddCompany";
import AdminAddBranch from "./Components/Pages/AdminPanel/AdminMasters/AdminAddBranch";
import AdminAddCounter from "./Components/Pages/AdminPanel/AdminMasters/AdminAddCounter";
import AdminAddDepartment from "./Components/Pages/AdminPanel/AdminMasters/AdminAddDepartment";
import AdminAddRoles from "./Components/Pages/AdminPanel/AdminMasters/AdminAddRoles";
import AdminAddEmployees from "./Components/Pages/AdminPanel/AdminMasters/AdminAddEmployees";
import AdminAddBanks from "./Components/Pages/AdminPanel/AdminMasters/AdminAddBanks";
import AdminAddDevices from "./Components/Pages/AdminPanel/AdminMasters/AdminAddDevices";
import AdminAddTax from "./Components/Pages/AdminPanel/AdminMasters/AdminAddTax";
import AdminAddRateCoversion from "./Components/Pages/AdminPanel/AdminMasters/AdminAddRateConversion";
import AdminAddProduct from "./Components/Pages/AdminPanel/AdminMasters/AdminAddProduct";
import AdminAddDesign from "./Components/Pages/AdminPanel/AdminMasters/AdminAddDesign";
import AdminAddOccassion from "./Components/Pages/AdminPanel/AdminMasters/AdminAddOccassion";
import AdminAddVendor from "./Components/Pages/AdminPanel/AdminMasters/AdminAddVendor";
import AdminPurchaseEntryEdit from "./Components/Pages/AdminPanel/AdminTrading/AdminPurchaseEntryEdit";
import AdminCreatePacket from "./Components/Pages/AdminPanel/AdminTrading/AdminCreatePacket";
import AdminVendorTounche from "./Components/Pages/AdminPanel/AdminSettings/AdminVendorTounche";
import AdminAddDiamond from "./Components/Pages/AdminPanel/AdminMasters/AdminAddDiamond";
import AdminAddDiamondSizeWeightRate from "./Components/Pages/AdminPanel/AdminMasters/AdminAddDiamondSizeWeightRate";
import AdminDiamondSizeWeightRateTemplate
  from "./Components/Pages/AdminPanel/AdminMasters/AdminDiamondSizeWeightRateTemplate"
import AdminDiamondAttribtes from "./Components/Pages/AdminPanel/AdminSettings/AdminDiamondAttribtes";
import AdminPairCustomerVendor from "./Components/Pages/AdminPanel/AdminSettings/AdminPairCustomerVendor";
import AdminCustomerTounche from "./Components/Pages/AdminPanel/AdminSettings/AdminCustomerTounche";
import AdminAddSingleStock from "./Components/Pages/AdminPanel/AdminTrading/AdminAddSingleStock";
import AdminCustomerSlab from "./Components/Pages/AdminPanel/AdminSettings/AdminCustomerSlab";
import AdminCustomerRateOfInterest from "./Components/Pages/AdminPanel/AdminSettings/AdminCustomerRateOfInterest";
import AdminCreditPeriod from "./Components/Pages/AdminPanel/AdminSettings/AdminCreditPeriod";
import AdminOldStockReport from "./Components/Pages/AdminPanel/AdminReports/AdminOldStockReport";
import AdminAddBulkStockNew from "./Components/Pages/AdminPanel/AdminEcommerce/AdminAddBulkStockNew";
import AdminSkuKarigarWiseReport from "./Components/Pages/AdminPanel/AdminReports/AdminSkuKarigarWiseReport";
import AdminSkuReport from "./Components/Pages/AdminPanel/AdminReports/AdminSkuReport";
import AdminVendorLedger from "./Components/Pages/AdminPanel/AdminTrading/AdminVendorLedger";
import AdminCustomerLedger from "./Components/Pages/AdminPanel/AdminTrading/AdminCustomerLedger";
import AdminAddPacketMaster from "./Components/Pages/AdminPanel/AdminMasters/AdminAddPacketMaster";

function App() {
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  console.log(adminLoggedIn, "adminLoggedIn");
  let isAuthenticated = "";
  if (adminLoggedIn.Clients) {
    isAuthenticated = true;
    // if (adminLoggedIn.toString() === "1") {
    //   isAuthenticated = true;
  } else if (adminLoggedIn.toString() === "2") {
    isAuthenticated = true;
  } else if (adminLoggedIn.toString() === "3") {
    isAuthenticated = true;
  } else if (adminLoggedIn.toString() === "4") {
    isAuthenticated = true;
  } else if (adminLoggedIn.StatusType === true) {
    isAuthenticated = true;
  } else isAuthenticated = false;

  console.log(isAuthenticated, "isAuthenticated");
  console.log(isAuthenticated, "isAuthenticated");
  const userDetails = allStates.reducer1;

  const navigate = useNavigate();

  // Use useEffect to navigate to the '/' route when the component mounts
  // useEffect(() => {
  //   // navigate("/adminpanellogin");
  //   navigate("/gshome");
  // }, []);

  return (
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<AdminPanelLogin />}/>*/}
          <Route path="/" element={<GSHome/>}/>
          <Route path="/adminpanellogin" element={<AdminPanelLogin/>}/>
          <Route
              path="/adminhome"
              element={isAuthenticated ? <AdminHome/> : <AdminPanelLogin/>}
          />
          <Route
              path="/add_category"
              element={isAuthenticated ? <AdminAddCategory/> : <AdminPanelLogin/>}
          />
          <Route
              path="/add_employee"
              element={isAuthenticated ? <AdminAddEmployee/> : <AdminPanelLogin/>}
          />
          <Route
              path="/add_product_type"
              element={
                isAuthenticated ? <AdminAddProductType/> : <AdminPanelLogin/>
              }
          />
          <Route
              path="/add_collection"
              element={
                isAuthenticated ? <AdminAddCollection/> : <AdminPanelLogin/>
              }
          />
          <Route
              path="/add_purity"
              element={isAuthenticated ? <AdminAddPurity/> : <AdminPanelLogin/>}
          />
          <Route
              path="/add_box"
              element={isAuthenticated ? <AdminAddBox/> : <AdminPanelLogin/>}
          />

          <Route
              path="/add_customer"
              element={
                isAuthenticated ? <AdminAllCustomers/> : <AdminPanelLogin/>
              }
          />
          <Route
              path="/add_stone"
              element={isAuthenticated ? <AdminAddStone/> : <AdminPanelLogin/>}
          />
          <Route
              path="/add_sku"
              element={isAuthenticated ? <AdminAddSku/> : <AdminPanelLogin/>}
          />

          <Route
              path="/inventory"
              element={isAuthenticated ? <AdminInventory/> : <AdminPanelLogin/>}
          />
          <Route
              path="/purchase"
              element={isAuthenticated ? <AdminPurchase/> : <AdminPanelLogin/>}
          />
          <Route
              path="/purchase_entry"
              element={
                isAuthenticated ? <AdminPurchaseEntry/> : <AdminPanelLogin/>
              }
          />
          <Route
              path="/ledger_main"
              element={isAuthenticated ? <AdminLedgerMain/> : <AdminPanelLogin/>}
          />
          <Route
              path="/unlabelled_list"
              element={
                isAuthenticated ? <AdminAllUnlabelledList/> : <AdminPanelLogin/>
              }
          />
          <Route
              path="/add_bulk_product"
              element={
                isAuthenticated ? <AdminAddBulkProducts/> : <AdminPanelLogin/>
              }
          />
          <Route
              path="/add_rates"
              element={isAuthenticated ? <AdminRates/> : <AdminPanelLogin/>}
          />
          <Route
              path="/admin_invoice"
              element={isAuthenticated ? <AdminInvoice/> : <AdminPanelLogin/>}
          />
          <Route
              path="/admin_invoice_edit"
              element={isAuthenticated ? <AdminInvoiceEdit/> : <AdminPanelLogin/>}
          />
          <Route
              path="/admin_orders"
              element={isAuthenticated ? <AdminAllOrders/> : <AdminPanelLogin/>}
          />
          <Route
              path="/product_details"
              element={isAuthenticated ? <ProductDetails/> : <AdminPanelLogin/>}
          />
          <Route
              path="/admin_sale_report"
              element={isAuthenticated ? <AdminSaleReport/> : <AdminPanelLogin/>}
          />
          <Route
              path="/credit_note"
              element={isAuthenticated ? <AdminCreditNote/> : <AdminPanelLogin/>}
          />
          <Route
              path="/debit_note"
              element={isAuthenticated ? <AdminDebitNote/> : <AdminPanelLogin/>}
          />
          <Route
              path="/purchase_payments"
              element={
                isAuthenticated ? <AdminPurchasePayments/> : <AdminPanelLogin/>
              }
          />
          <Route
              path="/receive_payments"
              element={
                isAuthenticated ? <AdminInvoicePayments/> : <AdminPanelLogin/>
              }
          />
          <Route
              path="/supplier_allpayments"
              element={
                isAuthenticated ? <AdminSupplierAllPayments/> : <AdminPanelLogin/>
              }
          />
          <Route
              path="/stock_report"
              element={isAuthenticated ? <AdminStockReport/> : <AdminPanelLogin/>}
          />
          <Route
              path="/old_stock_report"
              element={
                isAuthenticated ? <AdminOldStockReport/> : <AdminPanelLogin/>
              }
          />
          <Route
              path="/cash_report"
              element={isAuthenticated ? <AdminCashReport/> : <AdminPanelLogin/>}
          />
          <Route
              path="/category_new"
              element={isAuthenticated ? <CategoryNew/> : <AdminPanelLogin/>}
          />
          <Route
              path="/import_excel"
              element={isAuthenticated ? <ExcelImport/> : <AdminPanelLogin/>}
          />
          <Route
              path="/invoice_customisation"
              element={
                isAuthenticated ? <InvoiceCustomization/> : <AdminPanelLogin/>
              }
          />
          <Route
              path="/gshome"
              element={isAuthenticated ? <GSHome/> : <GSHome/>}
          />
          <Route
              path="/client_onboarding"
              element={<GSClientOnboarding/>}
          />
          <Route path="/add_company" element={<AdminAddCompany/>}/>
          <Route path="/add_branch" element={<AdminAddBranch/>}/>
          <Route path="/add_counter" element={<AdminAddCounter/>}/>
          <Route path="/add_department" element={<AdminAddDepartment/>}/>
          <Route path="/add_roles" element={<AdminAddRoles/>}/>
          <Route path="/add_employees" element={<AdminAddEmployees/>}/>
          <Route path="/add_banks" element={<AdminAddBanks/>}/>
          <Route path="/add_devices" element={<AdminAddDevices/>}/>
          <Route path="/add_tax" element={<AdminAddTax/>}/>
          <Route path="/add_rate" element={<AdminAddRateCoversion/>}/>
          <Route path="/add_product" element={<AdminAddProduct/>}/>
          <Route path="/add_design" element={<AdminAddDesign/>}/>
          <Route path="/add_occassion" element={<AdminAddOccassion/>}/>
          <Route path="/add_vendor" element={<AdminAddVendor/>}/>
          <Route path="/add_diamond" element={<AdminAddDiamond/>}/>
          <Route
              path="/add_diamond_attributes"
              element={<AdminDiamondAttribtes/>}
          />
          <Route path="/create_packet" element={<AdminCreatePacket/>}/>
          <Route
              path="/add_diamond_size_weight_rate"
              element={<AdminAddDiamondSizeWeightRate/>}
          />
          <Route
              path="/diamond_size_weight_rate_Template/:templateId"
              element={<AdminDiamondSizeWeightRateTemplate/>}
          />
          <Route path="/add_packet" element={<AdminAddPacketMaster/>}/>
          <Route
              path="/purchase_entry_edit"
              element={<AdminPurchaseEntryEdit/>}
          />
          <Route path="/vendor_tounche" element={<AdminVendorTounche/>}/>
          <Route
              path="/customer_tounche"
              element={<AdminCustomerTounche/>}
          />
          <Route
              path="/pair_customer_vendor"
              element={<AdminPairCustomerVendor/>}
          />
          <Route
              path="/add_single_stock"
              element={<AdminAddSingleStock/>}
          />
          <Route path="/customer_slab" element={<AdminCustomerSlab/>}/>
          <Route
              path="/customer_rate_of_interest"
              element={<AdminCustomerRateOfInterest/>}
          />
          <Route
              path="/customer_credit_period"
              element={<AdminCreditPeriod/>}
          />
          <Route
              path="/add_bulk_stock_new"
              element={<AdminAddBulkStockNew/>}
          />
          <Route
              path="/admin_sku_karigar_wise_report"
              element={<AdminSkuKarigarWiseReport/>}
          />
          <Route path="/admin_sku_report" element={<AdminSkuReport/>}/>
          <Route
              path="/admin_vendor_ledger"
              element={<AdminVendorLedger/>}
          />
          <Route
              path="/admin_customer_ledger"
              element={<AdminCustomerLedger/>}
          />
        </Routes>
      </div>
  );
}

export default App;
