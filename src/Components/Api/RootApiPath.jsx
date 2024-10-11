import { useNavigate } from "react-router-dom";



// Customer List All (GET)
export const a1 =
    // "https://sunshineteam.in/loyalstring/api_ls_customerall_data.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/CustomerDetails/GetAllCustomer";
    "https://dev.loyalstring.co.in/api/CustomerDetails/GetAllCustomer";

//   Customer List As per Customer Login Id (POST)
export const a2 =
    // "https://sunshineteam.in/loyalstring/api_ls_customerasperloginid_data.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/CustomerDetails/CustomerByLoginId";
    "https://dev.loyalstring.co.in/api/CustomerDetails/CustomerByLoginId";
//   Customer Details as per Customer id (POST)

export const a3 =
    // "https://sunshineteam.in/loyalstring/api_ls_customerasperuserid_data.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/CustomerDetails/GetCustomerById";
    "https://dev.loyalstring.co.in/api/CustomerDetails/GetCustomerById";

//   Add Customer (POST)
export const a4 =
    // "https://sunshineteam.in/loyalstring/api_ls_customer_insert.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/CustomerDetails/AddCustomer";
    "https://dev.loyalstring.co.in/api/CustomerDetails/AddCustomer";

//   Update Customer with AnyField except Customer_id and Data (POST)
export const a5 =
    // "https://sunshineteam.in/loyalstring/api_ls_customer_update.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/CustomerDetails/UpdateCustomer";
    "https://dev.loyalstring.co.in/api/CustomerDetails/UpdateCustomer";
//   Add Staff (POST)
export const a6 =
    // "https://sunshineteam.in/loyalstring/api_ls_staff_insert.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/Staff/AddStaff";
    "https://dev.loyalstring.co.in/api/Staff/AddStaff";
//   Add Category (POST)
export const a7 =
    // "https://sunshineteam.in/loyalstring/api_ls_category_insert.php  ";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/InsertCategory";
    "https://dev.loyalstring.co.in/api/ProductMaster/InsertCategory";
//   Add Product (POST)
export const a8 =
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/InsertProduct";
    // "https://sunshineteam.in/loyalstring/api_ls_product_insert.php";
    "https://dev.loyalstring.co.in/api/ProductMaster/InsertProduct";
// "https://dev.loyalstring.co.in/api/ProductMaster/InsertBulkProduct";

//   Add Wishlist (POST)
export const a9 =
    "https://sunshineteam.in/loyalstring/api_ls_wishlist_insert.php";

//   Add Order (POST)
export const a10 =
    // "https://sunshineteam.in/loyalstring/api_ls_order_insert.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/Orders/InsertOrders";
    "https://dev.loyalstring.co.in/api/Orders/InsertOrders";

export const a11 =
    "https://sunshineteam.in/loyalstring/api_ls_rating_insert.php";

// Add Rating (POST)

export const a12 =
    // "https://sunshineteam.in/loyalstring/api_ls_rates_insert.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/Orders/InsertRates";
    "https://dev.loyalstring.co.in/api/Orders/InsertRates";
// Add Rates to Category (POST)

export const a13 =
    // "https://sunshineteam.in/loyalstring/api_ls_ratestoday_data.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/Orders/ratestodaybycategory";
    "https://dev.loyalstring.co.in/api/Orders/ratestodaybycategory";

// Get Todays Rate as per Category (POST)
export const a14 =
    "https://sunshineteam.in/loyalstring/api_ls_ratesalldays_data.php";
// Get All Rates as per Category (POST)

export const a15 = "https://sunshineteam.in/loyalstring/api_ls_rating_data.php";
// Get Rating as per Product id (POST)

export const a16 =
    // "https://sunshineteam.in/loyalstring/api_ls_productall_data.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/GetfetchAllProduct";
    // "https://dev.loyalstring.co.in/api/ProductMaster/GetfetchAllProduct";
    "https://dev.loyalstring.co.in/api/ProductMaster/GetuniqiueAllProduct";
// Get All Product Information (GET)

export const a17 =
    // "https://sunshineteam.in/loyalstring/api_ls_productbyproductid_data.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/fetchProductById";
    "https://dev.loyalstring.co.in/api/ProductMaster/fetchProductById";
// Get Product Inforation as per Product Id (POST)

export const a18 =
    // "https://sunshineteam.in/loyalstring/api_ls_categoryall_data.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/fetchAllCategory";
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllCategory";
// Get All Categories (GET)

export const a19 =
    // "https://sunshineteam.in/loyalstring/api_ls_ratestodayallcategories_data.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/Orders/fetchTodayRates";
    "https://dev.loyalstring.co.in/api/Orders/fetchTodayRates";
// Get All Rates of today of all categories (GET)

export const a20 =
    // "https://sunshineteam.in/loyalstring/api_ls_producttypeall_data.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/fetchAllProductType";
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllProductMaster";
// Get All ProductTypes (GET)

export const a21 =
    // "https://sunshineteam.in/loyalstring/api_ls_producttype_insert.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/InsertProductType";
    "https://dev.loyalstring.co.in/api/ProductMaster/InsertProductType";
// Insert ProductType (POST)

export const a22 =
    // "https://sunshineteam.in/loyalstring/api_ls_purityall_data.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/fetchAllPurity";
    "https://dev.loyalstring.co.in/api/ProductMaster/fetchAllPurity";
// Get All Purity data (GET)

export const a23 =
    // "https://sunshineteam.in/loyalstring/api_ls_purity_insert.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/InsertPurity";
    "https://dev.loyalstring.co.in/api/ProductMaster/InsertPurity";
// Insert Purity data (POST)

export const a24 =
    // "https://sunshineteam.in/loyalstring/api_ls_product_update.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/UpdateProduct";
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateProduct";
// Update Product data (POST)

export const a25 =
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/CustomerDetails/UpdatePassword";
    "https://dev.loyalstring.co.in/api/CustomerDetails/UpdatePassword";
// Update Password

export const a26 =
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/UpdateImage";
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateImage";
// Update Images

export const a27 =
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/AddPartyMaster";
    "https://dev.loyalstring.co.in/api/ProductMaster/AddPartyMaster";
// Add Supplier Details

export const a28 =
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/GetAllPartyMaster";
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllPartyMaster";
// Get Supplier Details

export const a29 =
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/AddBoxMaster";
    "https://dev.loyalstring.co.in/api/ProductMaster/AddBoxMaster";
// Add Box Details

export const a30 =
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/GetAllBoxMaster";
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllBoxMaster";
// Get Box Details

export const a31 =
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/BulkUpdateProduct";
    "https://dev.loyalstring.co.in/api/ProductMaster/BulkUpdateProduct";
// "https://dev.loyalstring.co.in/api/ProductMaster/BulkEditProduct";
// Update Bulk Products

export const a32 =
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/AddCollection";
    "https://dev.loyalstring.co.in/api/ProductMaster/AddCollection";
// Insert Collection

export const a33 =
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/GetAllCollection";
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllCollection";
// Get Collection

export const a34 =
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/ProductMaster/UpdateCollection";
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateCollection";
// Update Collection

export const a35 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateCategory";
// Update Category

export const a36 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateProductType";
// Update ProductType

export const a37 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdatePurity";
// Update ProductType

export const a38 =
    "https://dev.loyalstring.co.in/api/Orders/fetchAllOrders";
// fetch all order

export const a39 =
    "https://dev.loyalstring.co.in/api/Orders/UpdateOrders";
// Update orders

export const a40 =
    // "https://sunshineteam.in/loyalstring/api_ls_customer_update.php";
    // "https://jewellerywebapplication20230518130808.azurewebsites.net/api/CustomerDetails/UpdateCustomer";
    "https://dev.loyalstring.co.in/api/CustomerDetails/UpdateCustomers";
// Update Customer all fields

export const a41 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetfetchAllProduct";
// Get All Products

export const a42 =
    "https://dev.loyalstring.co.in/api/CustomerDetails/GetOtp";
// Get All Products

export const a43 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllRFID";
// Get All Barcode and Tid

export const a44 =
    "https://dev.loyalstring.co.in/api/device/GetAllProduct";
// Get All Data from external

export const a45 =
    "https://dev.loyalstring.co.in/api/Orders/DownloadPDF";
// Download pdf with Img

export const a46 =
    "https://dev.loyalstring.co.in/api/Orders/PrintPDF";
//  Download pdf without Img

export const a47 =
    "https://dev.loyalstring.co.in/api/ProductMaster/deleteProduct";
// Delete Product with itemcode

export const a48 =
    "https://dev.loyalstring.co.in/api/Orders/CreateOrder";
// Create Order Multiple

export const a49 =
    "https://dev.loyalstring.co.in/api/Orders/CreateOrderItem";
// Create Order Items Multiple

export const a50 =
    "https://dev.loyalstring.co.in/api/Orders/AllOrderItemsByOrderId";
// Get Order Items By Order id

export const a51 =
    "https://dev.loyalstring.co.in/api/Orders/DownloadInvoice";
// Download Invoice

export const a52 =
    // "https://dev.loyalstring.co.in/api/Orders/AllOrderItemsByOrderId";
    "https://dev.loyalstring.co.in/api/orders/Getfetchordersbyid";
// Get All Order Items

export const a53 =
    "https://dev.loyalstring.co.in/api/Orders/CreateURDPurchase";
// Add Purchase Items

export const a54 =
    "https://dev.loyalstring.co.in/api/Orders/GetAllURDPurchase";
// Get All Purchase Items

export const a55 =
    "https://dev.loyalstring.co.in/api/ProductMaster/InsertUnlabledProducts";
// Add Unlabelled Items

export const a56 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllUnlabelledStock";
// Get All Unlabelled Items

export const a57 =
    "https://dev.loyalstring.co.in/api/ProductMaster/BulkUpdateUnLabeledProduct";
// Update Unlabelled Items

export const a58 =
    "https://dev.loyalstring.co.in/api/Staff/AddSalesTeam";
// Add New Employees

export const a59 =
    "https://dev.loyalstring.co.in/api/Staff/GetAllSaleTeam";
// Get All Employee

export const a60 =
    "https://dev.loyalstring.co.in/api/Staff/UpdateSalesTeam";
// Edit Employee

export const a61 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetActiveAllUnLabeledProducts";
// Get Active Unlabel Products

export const a62 =
    "https://dev.loyalstring.co.in/api/device/Login";
// Admin Panel Token Login

export const a63 =
    "https://dev.loyalstring.co.in/api/Orders/CreateCreditNote";
// Apply Credit Note

export const a64 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdatePartyMaster";
// Update Supplier

export const a65 =
    "https://dev.loyalstring.co.in/api/RDPurchase/CreateRDPurchase";
// Add Purchase Main Box

export const a66 =
    "https://dev.loyalstring.co.in/api/RDPurchase/CreateRDPurchaseItem";
// Add Purchase Items

export const a67 =
    "https://dev.loyalstring.co.in/api/RDPurchase/GetAllRDPurchase";
// Get All Rd Purchase

export const a68 =
    "https://dev.loyalstring.co.in/api/StyleMaster/GetAllStones";
// Get All Stones

export const a69 =
    "https://dev.loyalstring.co.in/api/StyleMaster/AddStone";
// Add New Stone

export const a70 =
    "https://dev.loyalstring.co.in/api/StyleMaster/UpdateStone";
// // Update Stone
//
export const a71 =
    "https://dev.loyalstring.co.in/api/StyleMaster/GetAllSkuList";
// Get ALL Sku

export const a72 =
    "https://dev.loyalstring.co.in/api/StyleMaster/AddSKUMaster";
// Add Sku

export const a73 =
    "https://dev.loyalstring.co.in/api/Orders/GetAllPaymentMode";
// Get All Payments

export const a74 =
    "https://dev.loyalstring.co.in/api/Orders/CreatePaymentMode";
// Add New Payment

export const a75 =
    "https://dev.loyalstring.co.in/api/RDPurchase/PartyLedgerBySupplierId";
// Get PartyLedger By SupplierId

export const a76 =
    "https://dev.loyalstring.co.in/api/Orders/UpdateOrder";
// Update Customer Order Main Box

export const a77 =
    "https://dev.loyalstring.co.in/api/RDPurchase/UpdateRDPurchase";
// Update RD Purchase Main Box

export const a78 =
    "https://dev.loyalstring.co.in/api/RDPurchase/UpdateRDPurchaseBalance";
// Update RD Purchase Main Box Balance

export const a79 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateBoxMaster";
// Update Box Master

export const a80 =
    "https://dev.loyalstring.co.in/api/Orders/CreateDebitNote";
// Create Debit Note

export const a81 =
    "https://dev.loyalstring.co.in/api/Orders/updateOrderItem";
// Update Order Items

export const a82 =
    "https://dev.loyalstring.co.in/api/Orders/LabeledStockReport";
// Get Labelled Stock Report

export const a83 =
    "https://dev.loyalstring.co.in/api/Orders/ExchangeOrderItem";
// Return Order Items

export const a84 =
    "https://dev.loyalstring.co.in/api/Orders/GetAllCreditNote";
// Get All Credit Note

export const a85 =
    "https://dev.loyalstring.co.in/api/Orders/GetAllDebitNote";
// Get All Debit Note

export const a86 =
    "https://dev.loyalstring.co.in/api/Orders/UpdateOrder";
// Update Order Main Box

export const a87 =
    "https://dev.loyalstring.co.in/api/Orders/GetAllOrderItems";
// Get All Order Items

export const a88 =
    "https://dev.loyalstring.co.in/api/RDPurchase/GetAllRDPurchaseItem";
// Get All RD Purchase Items

export const a89 =
    "https://dev.loyalstring.co.in/api/StyleMaster/UpdateSKUMaster";
// Update Sku

export const a90 =
    "https://dev.loyalstring.co.in/api/Orders/UploadExcel";
// Upload Excel

export const a91 =
    "https://dev.loyalstring.co.in/api/Orders/DeletePaymentMode";
// Delete Payment

export const a92 =
    "https://dev.loyalstring.co.in/api/Orders/ReturnAdvancePayment";
// Return Advance to customer

// GOLD STRING APIS BELOW
// GOLD STRING APIS BELOW
// GOLD STRING APIS BELOW

export const a93 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/AddClientOnboarding";
// Gold String Add New client

export const a94 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/ClientOnboardingLogin";
// Gold String Client Login

export const a95 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/GetAllCompanyDetails";
// Get ALL Company Details

export const a96 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/UpdateCompanyInfo";
// Update Company Details

export const a97 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/AddCompanyDetails";
// Add Company Details

export const a98 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/GetAllBranchMaster";
// Get ALL Branch Details

export const a99 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/UpdateBranchMaster";
// Update Branch Details

export const a100 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/AddBranchMaster";
// Add Branch Details

export const a101 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/GetAllCounters";
// Get ALL Counter Details

export const a102 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/UpdateCounter";
// Update Counter Details

export const a103 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/AddCounter";
// Add Counter Details

export const a104 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/GetAllDepartment";
// Get ALL Department Details

export const a105 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/UpdateDepartment";
// Update Department Details

export const a106 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/AddDepartment";
// Add Department Details

export const a107 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/GetAllRoles";
// Get ALL Roles Details

export const a108 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/UpdateRoles";
// Update Roles Details

export const a109 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/AddRoles";
// Add Roles Details

export const a110 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/GetAllEmployee";
// Get ALL Employees Details

export const a111 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/UpdateEmployee";
// Update Employees Details

export const a112 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/AddEmployee";
// Add Employees Details

export const a113 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/GetAllBankMaster";
// Get ALL Banks Details

export const a114 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/UpdateBankMaster";
// Update Banks Details

export const a115 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/AddBankMaster";
// Add Banks Details

// export const a116 =
//   "https://dev.loyalstring.co.in/api/ClientOnboarding/GetAllBankMaster";
// // Get ALL devices Details

// export const a117 =
//   "https://dev.loyalstring.co.in/api/ClientOnboarding/UpdateBankMaster";
// // Update devices Details

// export const a118 =
//   "https://dev.loyalstring.co.in/api/ClientOnboarding/AddBankMaster";
// // Add devices Details

export const a119 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/GetAllTaxMaster";
// Get ALL Tax Details

export const a120 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/UpdateTaxMaster";
// Update Tax Details

export const a121 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/AddTaxMaster";
// Add Tax Details

export const a122 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/GetAllRateConversion";
// Get ALL Rate Conversion Details

export const a123 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/UpdateRateConversion";
// Update Rate Conversion Details

export const a124 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/AddRateConversion";
// Add Rate Conversion Details

export const a125 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllCategory";
// Get ALL Category Details

export const a126 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateCategoryMaster";
// Update Category Details

export const a127 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddCategoryMaster";
// Add Category Details

export const a128 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllProductMaster";
// Get ALL Product Details

export const a129 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateProductMaster";
// Update Product Details

export const a130 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddProductMaster";
// Add Product Details

export const a131 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllDesign";
// Get ALL Design Details

export const a132 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateDesign";
// Update Design Details

export const a133 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddDesign";
// Add Design Details

export const a134 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllPurity";
// Get ALL Purity Details

export const a135 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdatePurityMaster";
// Update Purity Details

export const a136 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddPurityMaster";
// Add Purity Details

export const a137 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllBoxMaster";
// Get ALL Box Details

export const a138 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateBoxMaster";
// Update Box Details

export const a139 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddBoxMaster";
// Add Box Details

export const a140 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllCollection";
// Get ALL Collection Details

export const a141 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateCollection";
// Update Collection Details

export const a142 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddCollection";
// Add Collection Details

export const a143 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllOccassion";
// Get ALL Occassion Details

export const a144 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateOccassion";
// Update Occassion Details

export const a145 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddOccassion";
// Add Occassion Details

export const a146 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllStoneMaster";
// // Get ALL Stone Master

export const a147 =
"https://dev.loyalstring.co.in/api/ProductMaster/UpdateStoneMaster";
    // "https://dev.loyalstring.co.in/api/ProductMaster/UpdateStoneMaster";
// // Update Stone Master

export const a148 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddStoneMaster";
// // Add Stone Master
export const a149 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllPartyDetails";
// Get ALL Party Details

export const a150 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdatePartyDetails";
// Update Party Details

export const a151 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddPartyDetails";
// Add Party Details

export const a152 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllStoneDetails";
// Get All Stones Details

export const a153 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllDiamondMaster";
// Get All Diamonds Master

export const a154 =
    "https://dev.loyalstring.co.in/api/Invoice/AddRdPurchase";
// Add RD Purchase Main Box

export const a155 =
    "https://dev.loyalstring.co.in/api/Invoice/AddRdPurchaseItem";
// Add RD Purchase Items

export const a156 =
    "https://dev.loyalstring.co.in/api/Invoice/AddPaymentMode";
// Add Payment Mode

export const a157 =
    "https://dev.loyalstring.co.in/api/Invoice/AddPurchaseStoneDetails";
// Add Purchase Stone Details

export const a158 =
    "https://dev.loyalstring.co.in/api/Invoice/AddPurchaseDiamondDetails";
// Add Purchase Diamond Details

export const a159 =
    "https://dev.loyalstring.co.in/api/Invoice/GetAllRDPurchase";
// GET All RD Purchase Main Box
export const a160 =
    "https://dev.loyalstring.co.in/api/Invoice/GetAllURDPurchase";
// GET All URD_Purchase Main Box

export const a161 =
    "https://dev.loyalstring.co.in/api/Invoice/GetRDPurchaseById";
// GET RD Purchase Main Box by ID

export const a162 =
    "https://dev.loyalstring.co.in/api/Invoice/GetAllRDPurchaseItem";
// GET All RD Purchase Items

export const a163 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllSKU";
// GET All SKU List

export const a164 =
    "https://dev.loyalstring.co.in/api/Invoice/GetRDPurchaseItemByPurchaseId";
// GET All Purchase Items by id

export const a165 =
    "https://dev.loyalstring.co.in/api/Invoice/GetAllPaymentMode";
// GET All Payments

export const a166 =
    "https://dev.loyalstring.co.in/api/Invoice/UpdateRDPurchase";
// Update Rd Main Box

export const a167 =
    "https://dev.loyalstring.co.in/api/Invoice/UpdatePaymentMode";
// Update Payments

export const a168 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddSKU";
// Add Sku

export const a169 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateSKU";
// Update Sku

export const a170 =
    "https://dev.loyalstring.co.in/api/Invoice/GetAllPurchaseLot";
// Get All Purchase lot

export const a171 =
    "https://dev.loyalstring.co.in/api/Invoice/AddPurchaseLot";
// Add Purchase lot

export const a172 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/VerifyEmailAddress";
//Send Otp

export const a173 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/GetAllCustomer";
//Fetch All Customers

export const a174 =
    "https://dev.loyalstring.co.in/api/Invoice/GetAllVendorTounch";
//Fetch All Vendor Tounche

export const a175 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllRFID";
//Fetch All RFID Data

export const a176 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddLabeledStock";
//Add Labelled Stock

export const a177 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateLabeledStock";
//Update Labelled Stock

export const a178 =
    "https://dev.loyalstring.co.in/api/ProductMaster/DeleteLabeledStock";
//Delete Labelled Stock

export const a179 =
    "https://dev.loyalstring.co.in/api/Invoice/AddVendorTounch";
//Add Vendor Tounche

export const a180 =
    "https://dev.loyalstring.co.in/api/Invoice/UpdateVendorTounch";
//Update Vendor Tounche

export const a181 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllLabeledStock";
//Get All Labelled Stock

export const a182 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllDiamondDetails";
//Get All Diamond Master

export const a183 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddDiamondDetails";
//Add Diamond Master

export const a184 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateDiamondDetails";
//Update Diamond Master

export const a185 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllUnlabelledStock";
//Get All Unlabelled Stock

export const a186 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddUnlabelledStock";
//Add Unlabelled Stock

export const a187 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateUnlabelledStock";
//Update Unlabelled Stock

export const a188 =
    "https://dev.loyalstring.co.in/api/Invoice/GetAllInvoice";
//Get All Invoice

export const a189 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/AddCustomer";
//Add Customer

export const a190 =
    "https://dev.loyalstring.co.in/api/ClientOnboarding/UpdateCustomer";
//Update Customer

export const a191 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetDiamondSizeWeightRateTemplate";
//Get All Diamond Size Weight Rate
export const getAllSizeWeightRate =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllDiamondSizeWeightRate";

export const a192 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddDiamondSizeWeightRate";
//Add Diamond Size Weight Rate

export const a193 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateDiamondSizeWeightRate";
//Update Diamond Size Weight Rate

export const a194 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllDiamondAttributes";
//Get All Diamond Attributes

export const a195 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddDiamondAttributes";
//Add Diamond Attributes

export const a196 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateDiamondAttributes";
//Update Diamond Attributes

export const a197 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllUnlabelledStock";
//Get All Unlabelled Stock

export const a198 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddUnlabelledStock";
//Add Unlabelled Stock

export const a199 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateUnlabelledStock";
//Update Unlabelled Stock

export const a200 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetLabeledStockById";
//Get Labelled Stock By Id

export const a201 =
    "https://dev.loyalstring.co.in/api/Invoice/AddInvoice";
//Add Invoice

export const a202 =
    "https://dev.loyalstring.co.in/api/Invoice/GetInvoiceById";
//Get Invoice By Id

export const a203 =
    "https://dev.loyalstring.co.in/api/ProductMaster/PaireCustomerVendorId";
//Pair Customer VendorId

export const a204 =
    "https://dev.loyalstring.co.in/api/Invoice/GetAllCustomerTounch";
//Get All Customer Tounche

export const a205 =
    "https://dev.loyalstring.co.in/api/Invoice/AddCustomerTounch";
//Add Customer Tounche

export const a206 =
    "https://dev.loyalstring.co.in/api/Invoice/UpdateCustomerTounch";
//Update Customer Tounche

export const a207 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllCustomerSlab";
//Get All Customer Slab

export const a208 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddCustomerSlab";
//Add Customer Slab

export const a209 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateCustomerSlab";
//Update Customer Slab

export const a210 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllRateOfInterest";
//Get All Rate Of Interest

export const a211 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddRateOfInterest";
//Add Rate Of Interest

export const a212 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateRateOfInterest";
//Update Rate Of Interest

export const a213 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllCreditPeriod";
//Get All Credit Period

export const a214 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddCreditPeriod";
//Add Credit Period

export const a215 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateCreditPeriod";
//Update Credit Period

export const a216 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetStockReport";

export const a217 =
    "https://dev.loyalstring.co.in/api/ProductMaster/InsertLabelledStock";
//Add Bulk Stock New

export const a218 =
    "https://dev.loyalstring.co.in/api/Reports/StockReportByCategory";
//Get Stock Report Default

export const a219 =
    "https://dev.loyalstring.co.in/api/Reports/StockReportByProduct";
//Get Stock Report for Products

export const a220 =
    "https://dev.loyalstring.co.in/api/Reports/StockReportByDesign";
//Get Stock Report for Design

export const a221 =
    "https://dev.loyalstring.co.in/api/Reports/SKUVendorwiseReport";
//Get SKU Vendor wise Report

export const a222 =
    "https://dev.loyalstring.co.in/api/Reports/SKUStockReport";
//Get SKU Vendor wise Report

export const a223 =
    "https://dev.loyalstring.co.in/api/Invoice/MakePayment";
// Update RD Purchase Main Box Balance

export const a224 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddPacketMaster";
// Add Packet Master

export const a225 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdatePacketMaster";
// Update Packet Master

export const a226 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllPacketMaster";
// Get All Packet Master

export const a227 =
    "https://dev.loyalstring.co.in/api/RFIDdevice/GetAllRFIDdevice";
// Get All RFID device

export const a228 =
    "https://dev.loyalstring.co.in/api/Invoice/GetAllCreditNote";
// Get All Credit Note

export const a229 =
    "https://dev.loyalstring.co.in/api/Invoice/AddCreditNote";
// Add Credit Note

export const a230 =
    "https://dev.loyalstring.co.in/api/Invoice/GetAllDebitNote";
// Get All Debit Note

export const a231 =
    "https://dev.loyalstring.co.in/api/Invoice/AddDebitNote";


// Add Debit Note

// export const s1 = `http://localhost:3000/demo/Images/`;
// export const s1 = `https://mkgharejewellers.com/demo/Images/`;
export const s1 = `https://dev.loyalstring.co.in/images`;
// export const s1 = `https://goldkarizma.com/demo/Images/`;

//For Local Images
// export const navigates = useNavigate();
// export const s2 = `http://localhost:3000/contactdetails`;

export const s2 = `https://mkgharejewellers.com/contactdetails`;
// export const s2 = `https://mgharejewellers.com/demo/contactdetails`;
// export const s2 = `https://goldkarizma.com/demo/contactdetails`;
// export const s3 = "https://product123.blob.core.windows.net/images";

export const s3 =
    // "https://product123.blob.core.windows.net/images";
    "https://jewellerywebapplications.blob.core.windows.net/images";
// "https://dev.loyalstring.co.in/api/RDPurchase/GetAllRDPurchase";


export const paymentApi = "http://localhost:5000";
// export const paymentApi = "https://goldkarizma.com";
// export const paymentApi = "https://goldkarizma.com/nodjs";

// adminadddiamondsizeweightrate post api
export const postAdminadddiamondsizeweightrate = `https://dev.loyalstring.co.in/api/ProductMaster/SaveDiamondSizeWeightRateTemplate`;



//Get Stock Transfer Type
export const a232 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetStockTransferTypes";

// Filter labeled stock
export const a233 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllLabeledStockByFilter";

// Filter unlabeled stock
export const a234 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllUnlabelledStockByFilter";

// add stock transfer
export const a235 =
    "https://dev.loyalstring.co.in/api/ProductMaster/AddStockTransfer";

//get all stock transfers
export const a236 =
    "https://dev.loyalstring.co.in/api/ProductMaster/GetAllStockTransfers";

//add Approve Stock Transfer
export const a237 =
    "https://dev.loyalstring.co.in/api/ProductMaster/ApproveStockTransfer";
//add device
export const a238 =
    "https://dev.loyalstring.co.in/api/RFIDdevice/AddRFIDdevice";

//Update device
export const a239 =
    "https://dev.loyalstring.co.in/api/RFIDdevice/UpdateRFIDdevice";
//Update todays rates
export const a240 =
    "https://dev.loyalstring.co.in/api/ProductMaster/UpdateDailyRates";
//filter packets
export const a241 =
    "https://dev.loyalstring.co.in/api/Reports/StockReportByPacket";
//filter box
export const a242 =
    "https://dev.loyalstring.co.in/api/Reports/StockReportByBox";

