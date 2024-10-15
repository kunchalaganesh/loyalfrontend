import React, { useEffect, useRef, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import "../../PagesStyles/AdminTrading.css";
import {
  a154,
  a155,
  a156,
  a157,
  a158,
  a4,
  a53,
  a64,
  a194
} from "../../../Api/RootApiPath";
import { AiOutlineEdit, AiOutlinePlusSquare } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BsCardImage } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { LiaCartPlusSolid } from "react-icons/lia";
import { MdOutlineLabelOff } from "react-icons/md";
import DateTime from "../../../Other Functions/DateTime";
import { FaDollarSign } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { BsImages } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AlertMessage from "../../../Other Functions/AlertMessage";
import { IoMdAddCircleOutline } from "react-icons/io";
import GenerateRdPurchaseReceipt from "../../../Other Functions/GenerateRdPurchaseReceipt";
import DiamondEntryComponent from "../../../support/purchasesupport/Diamondpopup";
import ProductCalculator from "../../../support/calculations/ProductCalculator.jsx";
import StonePopup from "../../../support/purchasesupport/StonePopup.jsx";
import LooseDiamonds from "../../../support/purchasesupport/LooseDiamonds.jsx";
import GetApiService from "../../../Api/getapiService";
import { createOrder } from "../../../Api/postapiservice";
import {
  addPayment,
  deletePayment,
} from "../../../support/purchasesupport/usePayment1";
import ErrorModal from "../../../Other Functions/popup";
import { useAdminData } from "../AdminSettings/useAdminData.jsx";
import Adminpurchasehead from "../../../support/purchasecomponent/purchasehead.jsx";
import Adminpurchasepaymentbox from "../../../support/purchasecomponent/purchasepaymentbox.jsx";
import AdminPurchseitemview from "../../../support/purchasecomponent/PurchaseItemview.jsx";
import { ClipLoader } from "react-spinners";

export default function AdminPurchaseEntry() {
  const [loading, setLoading] = useState(true);
  const [allCsData, setAllCsData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCustomerEdit, setSelectedCustomerEdit] = useState(false);
  //   const [addNewCustomer, setAddNewCustomer] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [labelName, setLabelName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [barcode, setBarcode] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [purityType, setPurityType] = useState("");
  const [productQty, setProductQty] = useState("");
  const [allSelectedProducts, setAllSelectedProducts] = useState([]);
  const [showAllFields, setShowAllFields] = useState(false);
  const [allProdctsNetAmount, setAllProdctsNetAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalPayableGstAmount, setTotalPayableGstAmount] = useState(0);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [allProdctsGstAmount, setAllProdctsGstAmount] = useState(0);
  const [productsLoading, setProductsLoading] = useState(true);
  const [openEditBox, setOpenEditBox] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [orderItemsData, setOrderItemsData] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [orderCsData, setOrderCsData] = useState([]);
  const [oldGoldAmount, setOldGoldAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [totalPayableGold, setTotalPayableGold] = useState(0);
  const [totalPayableSilver, setTotalPayableSilver] = useState(0);
  const [paymentOptions, setPaymentOptions] = useState("Cash");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [payments, setPayments] = useState([]);
  const [active, setActive] = useState("Purchase");
  const [convertAmount, setConvertAmount] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allProductTypes, setAllProductTypes] = useState([]);
  const [allPurities, setAllPurities] = useState([]);
  const [allUnlabelList, setAllUnlabelList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedPurity, setSelectedPurity] = useState("");
  const [allSalesTeam, setAllSalesTeam] = useState([]);
  const [selectedSalesEmployee, setSelectedSalesEmployee] = useState("");
  const [selectedCashierEmployee, setSelectedCashierEmployee] = useState("");
  const [paymentType, setPaymentType] = useState("Paid");
  const [paymentGold, setPaymentGold] = useState(0);
  const [deductGold, setDeductGold] = useState(0);
  const [paymentSilver, setPaymentSilver] = useState(0);
  const [deductSilver, setDeductSilver] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [allSkuList, setAllSkuList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [paymentDescription, setPaymentDescription] = useState("");
  const [showAddStoneBox, setShowAddStoneBox] = useState(false);
  const [showAddDiamondBox, setShowAddDiamondBox] = useState(false);
  const [allStonesList, setAllStonesList] = useState([]);
  const [allStonesList1, setAllStonesList1] = useState([]);
  const [allDiamondsList, setAllDiamondsList] = useState([]);
  const [allDiamondSizeWeightRateData, setAllDiamondSizeWeightRateData] = useState([]);
  const [finePure, setFinePure] = useState(false);
  const [allVendorTounche, setAllVendorTounche] = useState([]);
  const [allRDPurchaseMainBox, setAllRDPurcaseMainBox] = useState([]);

  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");

  const [savingInvoice, setSavingInvoice] = useState(false);
  const [iscal, setIscal] = useState(false);
  const [userEditedFields, setUserEditedFields] = useState({});
  const [issubmit, setIssubmit] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [isitemedit, setIsitemedit] = useState(true);

  const getTodaysDateInHTMLFormat = () => {
    const today = new Date();
    const year = today.getFullYear();
    // Pad the month and day with a leading zero if they are less than 10
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [selectedDate, setSelectedDate] = useState(getTodaysDateInHTMLFormat());
  // const [selectedDate, setSelectedDate] = useState(getTodaysDateInHTMLFormat());

  const [gstType, setGstType] = useState(false);
  const [advanceType, setAdvanceType] = useState("Advance Received");
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [allDiamondSizeWeightRate, setAllDiamondSizeWeightRate] = useState([]);
  const [allDiamondAttributes, setAllDiamondAttributes] = useState([]);
  const [purchaseEntryOrder, setPurchaseEntryOrder] = useState({});

  const [diamondShapes, setDiamondShapes] = useState([]);
  const [diamondClarities, setDiamondClarities] = useState([]);
  const [diamondColors, setDiamondColors] = useState([]);
  const [diamondCuts, setDiamondCuts] = useState([]);
  const [settingTypes, setSettingTypes] = useState([]);
  const [diamondtampletid, setDiamondtampletid] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const [metalPaymentOption, setMetalPaymentOption] = useState({
    optionSelected: "GOLD",
    fineRate: 0,
    fineWt: 0,
    finePurity: 0,
    totalAmount: 0,
    totalWt: 0,
    deductGold: 0,
    deductSilver: 0,
    goldRate: 0,
    silverRate: 0,
    goldAmount: 0,
    silverAmount: 0,
  });
  //initial case
  const [purchaseProduct, setPurchaseProduct] = useState({
    StockKeepingUnit: "",
    ItemCode: "",
    MakingFixedAmt: 0,
    MakingPerGram: 0,
    MakingFixedWastage: 0,
    MakingPercentage: 0,
    MetalRate: 0,
    FinePercent: 0,
    WastagePercent: 0,
    Quantity: 1,
    PurityId: 0,
    CategoryId: 0,
    ProductId: 0,
    FineGoldWt: 0,
    FineSilverWt: 0,
    FineOtherMetalWt: 0,
    TotalStoneAmt: 0,
    TotalItemAmt: 0,
    FineWt: 0,
    WastageWt: 0,
    FineWastageWt: 0,
    RDPurchaseId: 0,
    CategoryName: "",
    ProductName: "",
    GrossWt: 0,
    NetWt: 0,
    StoneWt: 0,
    Status: "Active",
    CounterId: 0,
    BranchId: 0,
    CompanyId: 0,
    FinePure: false,
    ClientCode: 0,
    AddToUnlabelled: false,
    MetalId: 0,
    MetalName: "",
    StoneName: "",
    StoneWeight: 0,
    StonePieces: 0,
    StoneRate: 0,
    StoneAmount: 0,
    HallmarkAmt: 0,
    TagWeight: 0,
    FindingWeight: 0,
    LanyardWeight: 0,
    Testing: "0",
    Stones: [],
    Diamonds: [],
    ConvertAmount: true,
    MRP: "0",
    ClipWeight: "0",
    ClipQuantity: "0",
    DiamondName: "",
    DiamondWeight: 0,
    DiamondRate: 0,
    DiamondPieces: 0,
    DiamondAmount: 0,
    DiamondSize: "0",
    DiamondPurchaseRate: "0",
    DiamondSellRate: "0",
    DiamondClarity: "",
    DiamondColour: "",
    DiamondShape: "",
    DiamondCut: "",
    DiamondSettingType: "",
    DiamondCertificate: "",
    DiamondPurchaseAmount: "0",
    DiamondSellAmount: "0",
    DiamondDescription: "",
  });
  const [addStone, setAddStone] = useState({
    StoneName: "",
    StoneWeight: 0,
    StonePieces: 0,
    StoneRate: 0,
    StoneAmount: 0,
    Description: "",
    ClientCode: "",
    EmployeeCode: "",
    ProductId: 0,
  });
  const [addDiamond, setAddDiamond] = useState({
    DiamondName: "",
    DiamondWeight: 0,
    DiamondRate: 0,
    DiamondPieces: 0,
    DiamondClarity: "",
    DiamondColour: "",
    DiamondCut: "",
    DiamondShape: "",
    DiamondSize: 0,
    Certificate: "",
    SettingType: "",
    DiamondAmount: 0,
    DiamondPurchaseAmt: 0,
    Description: "",
  });

  const [purchaseProductList, setPurchaseProductList] = useState([]);
  const [newCustomerFields, setNewCustomerFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    currAddStreet: "",
    currAddTown: "",
    currAddState: "",
    currAddPinCode: "",
    perAddStreet: "",
    perAddTown: "",
    perAddState: "",
    perAddPinCode: "",
    aadharNo: "",
    panNo: "",
    gstNo: "",
  });

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;

  // console.log('checking all admindata at',adminLoggedIn)

  // //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  // const clientCode = adminLoggedIn.ClientCode;
  // const CompanyId = adminLoggedIn.CompanyId;
  // const CounterId = adminLoggedIn.CounterId;
  // const BranchId = adminLoggedIn.BranchId;
  // const EmployeId = adminLoggedIn.EmployeId;
  // const employeeCode = adminLoggedIn.EmployeeCode;

  // const rdPurchaseFormat = parseInt(adminLoggedIn.Clients.RDPurchaseFormat);

  const {
    clientCode,
    CompanyId,
    CounterId,
    BranchId,
    EmployeId,
    employeeCode,
    rdPurchaseFormat,
  } = useAdminData();

  console.log("checking logindata ", adminLoggedIn);

  const apiService = new GetApiService(clientCode);

  const loadData = async () => {
    setLoading(true);
    try {
      const apiCalls = [
        apiService.fetchAllSalesTeam(),
        apiService.fetchAllCustomers(),
        apiService.fetchAllSkuList(),
        apiService.fetchAllCategories(),
        apiService.fetchAllProductType(),
        apiService.fetchAllPurities(),
        apiService.fetchAllStonesList(),
        apiService.fetchAllDiamondsList(),
        apiService.fetchAllVendorTounche(),
        apiService.fetchAllDiamondSizeWeightRate(),
        apiService.fetchAllDiamondAttributes(),
        apiService.fetchAllRDPurchaseList(),
      ];

      const results = await Promise.allSettled(apiCalls);

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          // Handle successful response
          switch (index) {
            case 0:
              setAllSalesTeam(result.value.data);
              break;
            case 1:
              setAllCsData(result.value);
              setProductsLoading(false);
              break;
            case 2:
              if (Array.isArray(result.value)) {
                setAllSkuList(result.value.reverse()); // Ensure it's an array
              } else {
                setErrorMessage(
                  "Error: Unexpected response format for SKU List."
                );
              }
              break;
            case 3:
              if (Array.isArray(result.value)) {
                setAllCategories(result.value.reverse()); // Ensure it's an array
              } else {
                setErrorMessage(
                  "Error: Unexpected response format for Categories."
                );
              }
              break;
            case 4:
              setAllProductTypes(result.value);
              break;
            case 5:
              setAllPurities(result.value);
              break;
            case 6:
              setAllStonesList(result.value);
              setAllStonesList1(result.value)
              break;
            case 7:
              setAllDiamondsList(result.value);
              break;
            case 8:
              setAllVendorTounche(result.value);
              break;
            case 9:
              setAllDiamondSizeWeightRate(result.value);
              break;
            case 10:
              setAllDiamondAttributes(result.value);
              break;
            case 11:
              setAllRDPurcaseMainBox(result.value);
              break;
            default:
              break;
          }
        } else {
          if (index + 1 > 1) {
            console.error(
              `Error loading data for API ${index + 1}:`,
              result.reason
            );
            handleError(
              `Failed to load data for API ${index + 1}: ${result.reason}`
            );
          }
        }
      });
    } catch (error) {
      console.error("Error loading data:", error);
      handleError("Error loading data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [clientCode]);

  const handleError = (message) => {
    setErrorMessage(message);
    setShowModal(true); // Open the modal
  };

  const reloadData = () => {
    setShowModal(false); // Close the modal
    loadData(); // Reload data
  };

  const [selectedSku, setSelectedSku] = useState([]);
  const [selectedSkuName, setSelectedSkuName] = useState("");
  const handleSkuInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSelectedSkuName(value);
    if (value !== "") {
      let selectedSkuItem = [];
      selectedSkuItem = allSkuList.find((x) => x.StockKeepingUnit == value);
      console.log(selectedSkuItem, "selectedSkuItem");
      // if (selectedSkuItem) {
      if (selectedSkuItem) {
        setSelectedSku(selectedSkuItem);
        console.log(selectedSkuItem, "selectedSkuItem");
        console.log(selectedSkuItem, "selectedSkuItem");
      }
    }else{
      let selectedSkuItem = [];
      setSelectedSku(selectedSkuItem);
    }
    // setSelectedCategory(selectedSkuItem.category);
    // setSelectedProductType(selectedSkuItem.productType);
    // }
  };

  const navigate = useNavigate();

  //when sku selected
  useEffect(() => {
    console.log(selectedSku, " checking selectedsku");

    if(isitemedit){
    if (selectedSku && selectedSkuName) {
      
      // setAllStonesList(selectedSku.SKUStoneMain);

      if (selectedSku.SKUStoneMain && Array.isArray(selectedSku.SKUStoneMain)) {
        const normalizedStones = selectedSku.SKUStoneMain.map((stone) => ({
          StoneName: stone.StoneMainName,
          StoneWeight: stone.StoneMainWeight,
          StonePieces: stone.StoneMainPieces,
          StoneRate: stone.StoneMainRate,
          StoneAmount: stone.StoneMainAmount,
          Description: stone.StoneMainDescription,
          ClientCode: stone.ClientCode,
          CompanyId: stone.CompanyId,
          CounterId: stone.CounterId,
          BranchId: stone.BranchId,
          EmployeeId: stone.EmployeeId,
          StoneLessPercent: stone.StoneLessPercent,
          Id: stone.Id,
          CreatedOn: stone.CreatedOn,
          LastUpdated: stone.LastUpdated,
          StatusType: stone.StatusType,
        }));
        setAllStonesList(normalizedStones);
        console.log(
          "checking pro filter3",
          allStonesList,
          "  g   ",
          normalizedStones
        );
      }

      console.log("checking stoness", selectedSku.SKUStoneMain);

      setSelectedCategory(
        `${selectedSku.CategoryId},${selectedSku.CategoryName}`
      );
      setSelectedProductType(
        `${selectedSku.productTypeId},${selectedSku.productType}`
      );

      setPurchaseProduct({
        StockKeepingUnit: selectedSku.StockKeepingUnit,
        ItemCode: "",
        MakingFixedAmt:
          selectedSku.MakingFixedAmt !== "" ? selectedSku.MakingFixedAmt : "0",
        MakingPerGram:
          selectedSku.MakingPerGram !== "" ? selectedSku.MakingPerGram : "0",
        MakingFixedWastage:
          selectedSku.MakingFixedWastage !== ""
            ? selectedSku.MakingFixedWastage
            : "0",
        MakingPercentage:
          selectedSku.MakingPercentage !== ""
            ? selectedSku.MakingPercentage
            : "0",
        MetalRate: "0",
        FinePercent: 0,
        WastagePercent: 0,
        Quantity: selectedSku.Quantity,
        PurityId: selectedSku.PurityId,
        CategoryId: selectedSku.CategoryId,
        ProductId: selectedSku.ProductId,
        FineGoldWt: 0,
        FineSilverWt: 0,
        FineOtherMetalWt: 0,
        TotalStoneAmt: 0,
        TotalItemAmt: 0,
        FineWt: 0,
        WastageWt: 0,
        FineWastageWt: 0,
        RDPurchaseId: 0,
        CategoryName: selectedSku.CategoryName,
        ProductName: selectedSku.ProductName,
        GrossWt: selectedSku.GrossWt,
        NetWt: selectedSku.NetWt,
        StoneWt: selectedSku.TotalStoneWeight,
        Status: "Active",
        CounterId: 0,
        BranchId: 0,
        CompanyId: 0,
        FinePure: false,
        ClientCode: clientCode,
        AddToUnlabelled: false,
        DiamondName: "",
        DiamondWeight:
          selectedSku.TotalDiamondWeight !== ""
            ? selectedSku.TotalDiamondWeight
            : "0",
        DiamondRate: "0",
        DiamondPieces:
          selectedSku.TotalDiamondPieces !== ""
            ? selectedSku.TotalDiamondPieces
            : "0",
        DiamondAmount:
          selectedSku.TotalDiamondAmount !== ""
            ? selectedSku.TotalDiamondAmount
            : "0",
        MetalId: selectedSku.CategoryId,
        MetalName: selectedSku.CategoryName,
        StoneName: "",
        StoneWeight:
          selectedSku.TotalStoneWeight !== ""
            ? selectedSku.TotalStoneWeight
            : "0",
        StonePieces:
          selectedSku.TotalStonePieces !== ""
            ? selectedSku.TotalStonePieces
            : "0",
        StoneRate: 0,
        StoneAmount:
          selectedSku.TotalStoneAmount !== ""
            ? selectedSku.TotalStoneAmount
            : "0",
        HallmarkAmt:
          selectedSku.HallmarkAmount !== "" ? selectedSku.HallmarkAmount : "0",
        TagWeight: selectedSku.TagWeight !== "" ? selectedSku.TagWeight : "0",
        FindingWeight:
          selectedSku.FindingWeight !== "" ? selectedSku.FindingWeight : "0",
        LanyardWeight:
          selectedSku.LanyardWeight !== "" ? selectedSku.LanyardWeight : "0",
        Stones: [],
        Diamonds: [],
        ConvertAmount: true,
        MRP: selectedSku.MRP !== "" ? selectedSku.MRP : "0",
        ClipWeight: "0",
        ClipQuantity: "0",
        DiamondSize: "0",
        DiamondPurchaseRate: "0",
        DiamondSellRate: "0",
        DiamondClarity: "",
        DiamondColour: "",
        DiamondShape: "",
        DiamondCut: "",
        DiamondSettingType: "",
        DiamondCertificate: "",
        DiamondPurchaseAmount: "0",
        DiamondSellAmount: "0",
        DiamondDescription: "",
        SKUId: selectedSku.Id,
        Testing: "0",
      });

      // calculatePurchasePrice(purchaseProduct);
    } else {

      setAllStonesList(allStonesList1);

      setPurchaseProduct({
        StockKeepingUnit: "",
        ItemCode: "",
        MakingFixedAmt: 0,
        MakingPerGram: 0,
        MakingFixedWastage: 0,
        MakingPercentage: 0,
        MetalRate: 0,
        FinePercent: 0,
        WastagePercent: 0,
        Quantity: 1,
        PurityId: 0,
        CategoryId: 0,
        ProductId: 0,
        FineGoldWt: 0,
        FineSilverWt: 0,
        FineOtherMetalWt: 0,
        TotalStoneAmt: 0,
        TotalItemAmt: 0,
        FineWt: 0,
        WastageWt: 0,
        FineWastageWt: 0,
        RDPurchaseId: 0,
        CategoryName: "",
        ProductName: "",
        GrossWt: 0,
        NetWt: 0,
        StoneWt: 0,
        Status: "Active",
        CounterId: 0,
        BranchId: 0,
        CompanyId: 0,
        FinePure: false,
        ClientCode: 0,
        AddToUnlabelled: false,
        MetalId: 0,
        MetalName: "",
        StoneName: "",
        StoneWeight: 0,
        StonePieces: 0,
        StoneRate: 0,
        StoneAmount: 0,
        HallmarkAmt: 0,
        TagWeight: 0,
        FindingWeight: 0,
        LanyardWeight: 0,
        Testing: "0",
        Stones: [],
        Diamonds: [],
        ConvertAmount: true,
        MRP: "0",
        ClipWeight: "0",
        ClipQuantity: "0",
        DiamondName: "",
        DiamondWeight: 0,
        DiamondRate: 0,
        DiamondPieces: 0,
        DiamondAmount: 0,
        DiamondSize: "0",
        DiamondPurchaseRate: "0",
        DiamondSellRate: "0",
        DiamondClarity: "",
        DiamondColour: "",
        DiamondShape: "",
        DiamondCut: "",
        DiamondSettingType: "",
        DiamondCertificate: "",
        DiamondPurchaseAmount: "0",
        DiamondSellAmount: "0",
        DiamondDescription: "",
        SKUId: 0,
      });
    }
    setIscal(true);
  }
    
  }, [selectedSku, selectedSkuName, isitemedit]);

  // console.log(allPurities, "allPurities");

  // useEffect(() => {
  //   fetchAllProducts();
  // }, []);
  // console.log(allCsData, "allCsData");
  useEffect(() => {
    if (selectedCustomer) {
      setCustomerName(selectedCustomer.FirmName);
      setCustomerMobile(selectedCustomer.ContactNo);
      setCustomerId(selectedCustomer.Id);
      setCustomerEmail(selectedCustomer.Email);
      setCustomerAddress(selectedCustomer.Address);
      // handleToggleCustomTab();
    } else {
      setCustomerName("");
      setCustomerMobile("");
      setCustomerEmail("");
      setCustomerId("");
      setCustomerAddress("");
    }
  }, [selectedCustomer]);

  // const filteredCustomers = allCsData.filter((customer) => {
  //   const fullName = `${customer.firstName} ${customer.lastName}`;
  //   return fullName.toLowerCase().includes(customerName.toLowerCase());
  // });

  useEffect(() => {
    const fetchDiamondAttributes = async () => {
      const response = await fetch(
        a194,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ClientCode: clientCode,
          }),
        }
      );
      const data = await response.json();
      const shapes = data.filter(
        (item) => item.DiamondAttribute === "DiamondShape"
      );
      const clarities = data.filter(
        (item) => item.DiamondAttribute === "DiamondClarity"
      );
      const colors = data.filter(
        (item) => item.DiamondAttribute === "DiamondColour"
      );
      const cuts = data.filter(
        (item) => item.DiamondAttribute === "DiamondCut"
      );
      const settings = data.filter(
        (item) => item.DiamondAttribute === "DiamondSettingType"
      );
      setDiamondShapes(shapes);
      setDiamondClarities(clarities);
      setDiamondColors(colors);
      setDiamondCuts(cuts);
      setSettingTypes(settings);
    };
    // fetchDiamondAttributes();
  }, []);

  //diamond calculations
  function getShapeValue(id, shape, parameter) {
    console.log("check input values ", id, "  ", shape, "  ", parameter);
    if (id) {
      const shapeValue = allDiamondAttributes
        .filter((x) => x.DiamondAttribute == parameter)
        ?.find((item) => item.Id == id);
      return id ? shapeValue?.DiamondValue : "";
    }
    if (shape) {
      const shapeValue = allDiamondAttributes
        .filter((x) => x.DiamondAttribute == parameter)
        ?.find((item) => item.DiamondValue == shape);
      return shape ? shapeValue?.Id : "";
    }
  }

  function getDiamondClarity(id, clarity) {
    if (id) {
      const clarityValue = diamondClarities?.find((item) => item.Id == id);
      return id ? clarityValue?.DiamondValue : "";
    }
    if (clarity) {
      const clarityValue = diamondClarities?.find(
        (item) => item.DiamondValue == clarity
      );
      return clarityValue ? String(clarityValue?.Id) : "";
    }
  }

  function getDiamondColor(id, color) {
    if (id) {
      const colorValue = diamondColors?.find((item) => item.Id == id);
      return id ? colorValue?.DiamondValue : "";
    }
    if (color) {
      const shapeValue = diamondColors?.find(
        (item) => item.DiamondValue == color
      );
      return color ? String(shapeValue?.Id) : "";
    }
  }

  function getDiamondCut(id, cut) {
    if (id) {
      const cutValue = diamondCuts?.find((item) => item.Id == id);
      return id ? cutValue?.DiamondValue : "";
    }
    if (cut) {
      const cutValue = diamondCuts?.find((item) => item.DiamondValue == cut);
      return cut ? String(cutValue?.Id) : "";
    }
  }

  function getSettingType(id, settingType) {
    if (id) {
      const settingTypeValue = settingTypes?.find((item) => item.Id == id);
      return id ? settingTypeValue?.DiamondValue : "";
    }
    if (settingType) {
      const shapeValue = settingTypes?.find(
        (item) => item.DiamondValue == settingType
      );
      return settingType ? String(shapeValue?.Id) : "";
    }
  }

  const handleNameInputChange = (e) => {
    const { value } = e.target;
    setCustomerName(value); // Update the name input value

    const selected = allCsData.find((customer) => {
      const fullName = customer.FirmName;
      return fullName.toLowerCase() === value.toLowerCase();
    });

    if (selected) {
      setCustomerEmail(selected.Email);
      setCustomerId(selected.Id); // Update the email input value based on selected customer's email
      setDiamondtampletid(selected.DiamondSizeWeightRateTemplateId);
    }

    console.log("checking selected vendor ", selected);
    // setDiamondtampletid(0)
    setSelectedCustomerEdit(false);
    setSelectedCustomer(selected); // Update the selected customer based on name match
    setIscal(true);
  };

  useEffect(() => {
    if (selectedProduct) {
      setCategoryName(selectedProduct.category_Name);
      setProductName(selectedProduct.itemType);
      setCollectionName(selectedProduct.collection);
      setPurityType(selectedProduct.purity);
      setBarcode(selectedProduct.barcodeNumber);
      setLabelName(selectedProduct.itemCode);
    } else {
      setCustomerName("");
      setCustomerMobile("");
      setCustomerEmail("");
    }
  }, [selectedProduct]);

  const handleProductLabelChange = (e) => {
    const { value } = e.target;
    setLabelName(value.toUpperCase());
    setSelectedProduct([]);
    setCategoryName("");
    setProductName("");
    setCollectionName("");
    setPurityType("");
    setProductQty("");
    setBarcode("");
    setSelectedProductPrice(0);
    if (value) {
      const selected = allProducts.find(
        (product) =>
          product.itemCode === value || product.barcodeNumber === value
      );
      if (selected) {
        setSelectedProduct(selected);
        calculateFinalPrice(selected, false);

        // addProductToList(selected);
        // setSelectedProduct([]);
        // if (labelName) {
        // } else {
        //   alert("Label is missing");
        // } // Calculate the final price
      } else {
        // console.log("Not selected");
      }
    }
  };
  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (5 > files.length > 0) {
      const newFiles = Array.from(files).slice(0, 5 - selectedFiles.length);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };

  const calculateFinalPrice = (selectedProduct, adding) => {
    let netGoldRate =
      (parseFloat(selectedProduct.NetWt) *
        parseFloat(selectedProduct.MetalRate)) /
      10;
    let makingCharges1 =
      parseFloat(selectedProduct.NetWt) *
      parseFloat(selectedProduct.MakingPerGram);
    let makingCharges2 =
      (parseFloat(netGoldRate) * parseFloat(selectedProduct.MakingPercentage)) /
      100;
    let makingCharges3 = parseFloat(selectedProduct.MakingFixedAmt);
    let makingCharges4 =
      (parseFloat(selectedProduct.MetalRate) *
        parseFloat(selectedProduct.MakingFixedWastage)) /
      10;
    let HallmarkAmt = parseFloat(selectedProduct.HallmarkAmt);

    let GST = 0.03;

    let grossTotalRate =
      parseFloat(netGoldRate) +
      parseFloat(makingCharges1) +
      parseFloat(makingCharges2) +
      parseFloat(makingCharges3) +
      parseFloat(makingCharges4) +
      parseFloat(HallmarkAmt) +
      parseFloat(selectedProduct.StoneAmount) +
      parseFloat(selectedProduct.totalDiamondpurchaseAmount);
    let GSTAdded = parseFloat(GST) * parseFloat(grossTotalRate);

    console.log(GSTAdded, "GSTAdded");
    let finalPrice = parseFloat(grossTotalRate) + parseFloat(GSTAdded);
    if (selectedProduct.MRP !== "" && selectedProduct.MRP !== 0) {
      GSTAdded = GST * parseFloat(selectedProduct.MRP);
      finalPrice = parseFloat(selectedProduct.MRP) + parseFloat(GSTAdded);
    }

    // Calculate total making charges
    let totalMakingCharges =
      parseFloat(makingCharges1) +
      parseFloat(makingCharges2) +
      parseFloat(makingCharges3) +
      parseFloat(makingCharges4);

    let updatedProduct = {};
    // Update selectedProduct with additional properties and calculated price
    if (
      selectedProduct.MRP !== "" &&
      selectedProduct.MRP !== 0 &&
      selectedProduct.MRP !== "0"
    ) {
      updatedProduct = {
        ...selectedProduct,
        //   finalPrice: parseFloat(finalPrice).toFixed(3),
        Making: 0,
        TotalGstAmount: gstType
          ? parseFloat(selectedProduct.MRP).toFixed(3) * GST
          : 0,
        FinalPrice:
          parseFloat(selectedProduct.MRP) - gstType
            ? parseFloat(selectedProduct.MRP).toFixed(3) * GST
            : 0,
        // making: totalMakingCharges,
        // totalGstAmount: GSTAdded,
      };
      setSelectedProductPrice(parseFloat(selectedProduct.mrp).toFixed(3));
    } else {
      updatedProduct = {
        ...selectedProduct,
        FinalPrice: parseFloat(grossTotalRate).toFixed(3),
        //   finalPrice: parseFloat(finalPrice).toFixed(3),
        Making: totalMakingCharges,
        TotalGstAmount: GSTAdded,
      };
      setSelectedProductPrice(parseFloat(finalPrice).toFixed(3));
    }
    setSelectedProduct(updatedProduct); // Update the selected product
    if (adding) {
      // alert("");
      addProductToList(updatedProduct);
    } else if ((selectedProduct.length > 0, !adding)) {
      // alert("No Product Matched");
      // console.log("no product found");
      // alert("not");
    } else {
      null;
    }
    setDiscountAmount(0);
    // setAllSelectedProducts((prev) => [...prev, updatedProduct]);
    // Update the price input field
  };

  const addProductToList = (selectedProduct) => {
    if (!allSelectedProducts.some((x) => x.Id === selectedProduct.Id)) {
      setAllSelectedProducts((prevItems) => [...prevItems, selectedProduct]);
      setLabelName("");
      setSelectedProduct([]);
      setCategoryName("");
      setProductName("");
      setCollectionName("");
      setPurityType("");
      setProductQty("");
      setSelectedProductPrice(0);
      // scrollToCenter("adminInvoiceSelectLabelBox");
      scrollToCenter("adminInvoiceAddProductsOptionsInnerBox");
    } else {
      // alert("Product Already added");
      setSelectedProduct([]);
    }
  };
  console.log(allSelectedProducts, "allSelectedProductss ");
  console.log(allSelectedProducts, "allSelectedProducts ");
  console.log(allSelectedProducts, "allSelectedProducts ");
  useEffect(() => {
    if (selectedProduct.length > 0) {
      console.log("checking 795 finalprice", FinalPrice);
      const FinalPrice = calculateFinalPrice(
        selectedProduct.NetWt,
        selectedProduct.MakingPerGram,
        selectedProduct.MakingPercentage,
        selectedProduct.MakingFixedAmt,
        selectedProduct.MakingFixedWastage,
        selectedProduct.StoneAmount,
        selectedProduct.HallmarkAmt,
        selectedProduct.MRP,
        selectedProduct.MetalRate,
        selectedProduct.Id
      );

      setSelectedProductPrice(FinalPrice); // Set the calculated final price here
      setTotalPrice((x) => parseFloat(x) + FinalPrice);
    }
  }, [selectedProduct, gstType]);

  const calculateNetAmount = () => {
    if (allSelectedProducts.length > 0) {
      let totalNetAmount = allSelectedProducts.reduce(
        (total, product) => total + parseFloat(product.FinalPrice),
        0
      );
      let totalGstAmount = gstType
        ? allSelectedProducts.reduce(
            (total, product) => total + parseFloat(product.TotalGstAmount),
            0
          )
        : 0;
      let totalAmountPaying = allSelectedProducts.reduce(
        (total, product) =>
          total +
          parseFloat(product.FinalPrice) +
          (gstType ? parseFloat(product.TotalGstAmount) : 0),
        0
      );

      let totalGold = allSelectedProducts.reduce(
        (total, product) => total + parseFloat(product.BalanceGold),
        0
      );

      let totalSilver = allSelectedProducts.reduce(
        (total, product) => total + parseFloat(product.BalanceSilver),
        0
      );

      setTotalPayableGold(parseFloat(totalGold).toFixed(3));
      setTotalPayableSilver(parseFloat(totalSilver).toFixed(3));

      setAllProdctsNetAmount(parseFloat(totalNetAmount).toFixed(3));
      setAllProdctsGstAmount(
        gstType ? parseFloat(totalGstAmount).toFixed(3) : 0
      );
      setTotalPayableGstAmount(
        gstType ? parseFloat(totalGstAmount).toFixed(3) : 0
      );
      setTotalPayableAmount(parseFloat(totalAmountPaying).toFixed(3));
      setGrandTotal(parseFloat(totalAmountPaying).toFixed(3));
      setPaymentAmount(parseFloat(totalAmountPaying).toFixed(3));
    } else {
      setAllProdctsNetAmount(0); // Reset the total to 0 when there are no selected products
      setAllProdctsGstAmount(0); // Reset the total to 0 when there are no selected products
      setTotalPayableGstAmount(0);
      setTotalPayableAmount(0);
      setGrandTotal(0);
      setDiscountAmount(0);
      setPaymentAmount(0);
      setOldGoldAmount(0);
      setTotalPayableGold(0);
      setTotalPayableSilver(0);
    }
  };
  useEffect(() => {
    calculateNetAmount();
    setPayments([]);
  }, [selectedProduct, allSelectedProducts, gstType]);

  // console.log(deductGold, "deductGold");
  // console.log(deductGold, "deductGold");
  const changeTotalPrice = (e) => {
    const newTotalPayableAmount = parseInt(e.target.value);
    // console.log("TotalPayAmt", totalPayableAmount);
    // console.log("NewTotalPayAmt", newTotalPayableAmount);
    const perTotalPayableAmount = newTotalPayableAmount / 103;
    if (gstType) {
      setTotalPayableGstAmount((perTotalPayableAmount * 3).toFixed(3));
      setTotalPayableAmount(e.target.value);
      // setOldGoldAmount(0);
      setPaymentAmount(e.target.value);
      setPayments([]);
      setAllProdctsNetAmount((parseInt(e.target.value) * 100) / 103);

      let totalAmountPaying = allSelectedProducts.reduce(
        (total, product) =>
          total +
          parseFloat(product.FinalPrice) +
          parseFloat(product.TotalGstAmount),
        0
      );

      setDiscountAmount(parseInt(totalAmountPaying) - parseInt(e.target.value));
      setGrandTotal(e.target.value);
      setDeductGold(0);
      setDeductSilver(0);
      // calculateNetAmount();
    } else {
      setTotalPayableGstAmount(0);
      setTotalPayableAmount(e.target.value);
      // setOldGoldAmount(0);
      setPaymentAmount(e.target.value);
      setPayments([]);
      setAllProdctsNetAmount((parseInt(e.target.value) * 100) / 100);

      let totalAmountPaying = allSelectedProducts.reduce(
        (total, product) => total + parseFloat(product.FinalPrice),
        0
      );

      setDiscountAmount(parseInt(totalAmountPaying) - parseInt(e.target.value));

      setGrandTotal(e.target.value);
    }
    // setDiscountAmount(
    //   (
    //     parseInt(allProdctsNetAmount) +
    //     parseInt(perTotalPayableAmount * 3) -
    //     parseInt(newTotalPayableAmount)
    //   ).toFixed(3)
    // );

    // setTotalPayableAmount(parseFloat(e.target.value));
    // setTotalPayableGstAmount(
    //   parseFloat(newTotalPayableAmount) +
    //     parseFloat(discountAmount) -
    //     parseFloat(allProdctsNetAmount)
    // );
  };

  // CONTINUE FROM BELOW
  const addPurchaseOrderItems = async () => {
    try {
      const orderItemsList = purchaseProductList.map((product) => {
        return {
          CategoryName: `${product.CategoryName}`,
          productname: `${product.productname}`,
          grosswt: `${product.grosswt}`,
          netwt: `${product.netwt}`,
          stonewt: `${product.stonewt}`,
          GoldRate: `${product.GoldRate}`,
          Finepercent: `${product.Finepercent}`,
          NetAmt: `${product.NetAmt}`,
          GSTAmount: `${product.GSTAmount}`,
          TotalAmt: `${product.TotalAmt}`,
          Quantity: `${product.Quantity}`,
          PurchaseAmount: `${product.PurchaseAmount}`,
          // making_fixed_amt: `${product.making_Fixed_Amt}`,
          // making_fixed_wastage: `${product.making_Fixed_Wastage}`,
          // making_per_gram: `${product.making_per_gram}`,
          // making_percentage: `${product.making_Percentage}`,
          // hallmark_amt: "",
          // hallmark_no: "",
        };
      });
      // console.log(orderItemsList, "orderItemsList");
      const response = await fetch(a53, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItemsList),
      });
      // console.log(orderItemsList, "orderItemsList");

      const rcvdData = await response.json();
      const purchaseProductsData = rcvdData.data;
      // console.log(purchaseProductsData, "purchaseProductsData");
      // Set the state with order items
      if (rcvdData.status === "error") {
        alert(rcvdData.message);
      } else {
        purchaseProductList.forEach((product, index) => {
          product.id = purchaseProductsData[index].id;
          product.purchase_invoice_no =
            purchaseProductsData[index].purchase_invoice_no;
        });

        createOrder();
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const orderDetails = {
      allSelectedProducts,
      selectedCustomer,
      selectedDate,
      invoiceNumber,
      selectedFiles,
      clientCode,
      CompanyId,
      CounterId,
      BranchId,
      EmployeId,
      totalPayableGstAmount,
      totalPayableAmount,
      totalPayableGold,
      totalPayableSilver,
      discountAmount,
      grandTotal,
      selectedSkuName,
      a154,
      allProdctsNetAmount,
      payments,
      gstType,
    };

    try {
      const orderResponse = await createOrder(orderDetails);
      console.log("Order response:", orderResponse);

      sendProductData(orderResponse.Id);
      // setIssubmit(false)
      // const productResponse = await sendProductData(allSelectedProducts);
      console.log("Product response:", orderResponse);
    } catch (error) {
      setIssubmit(false);
      console.error("Error in submission:", error);
    }
  };

  const sendProductData = async (rcvdId) => {
    try {
      const payload = allSelectedProducts.map((product) => {
        // Compute the totals for stones and diamonds

        console.log("checing product", product);
        const totalStoneWeight = product.Stones.reduce(
          (acc, stone) => acc + parseFloat(stone.StoneWeight || 0),
          0
        );
        // const totalStonePieces = product.Stones.reduce(
        //   (acc, stone) => acc + parseFloat(stone.StonePieces || 0),
        //   0
        // );

        const clipQuantity = parseFloat(product.ClipQuantity) || 0;
        const totalStonepieces = product.Stones.reduce((acc, stone) => {
          const stoneWeight = parseFloat(stone.StonePieces) || 0;
          return acc + stoneWeight;
        }, 0);
        const skuPieces = parseFloat(selectedSku.Pieces) || 0;
        const totalStonePieces = clipQuantity * skuPieces * totalStonepieces;
        console.log("checking total stone", totalStonePieces);

        const totalStoneAmount = product.Stones.reduce(
          (acc, stone) => acc + parseFloat(stone.StoneAmount || 0),
          0
        );
        // const totalDiamondWeight = product.Diamonds.reduce(
        //   (acc, diamond) => acc + parseFloat(diamond.DiamondWeight || 0),
        //   0
        // );
        // const totalDiamondPieces = product.Diamonds.reduce(
        //   (acc, diamond) => acc + parseFloat(diamond.DiamondPieces || 0),
        //   0
        // );
        // const totalDiamondAmount = product.Diamonds.reduce(
        //   (acc, diamond) => acc + parseFloat(diamond.DiamondAmount || 0),
        //   0
        // );
        const stoneDetails = product.Stones.map((stone) => ({
          StoneName: `${stone.StoneName}`,
          StoneWeight: `${stone.StoneWeight}`,
          StoneRate: `${stone.StoneRate}`,
          StonePieces: `${stone.StonePieces}`,
          StoneAmount: `${stone.StoneAmount || "0"}`,
          Description: `${stone.Description || "0"}`,
        }));
        const diamondDetails = product.Diamonds.map((diamond) => ({
          DiamondName: `${diamond.DiamondName}`,
          DiamondWeight: `${diamond.DiamondWeight}`,
          DiamondRate: `${diamond.DiamondRate}`,
          DiamondPieces: `${diamond.DiamondPieces}`,
          DiamondAmount: `${diamond.DiamondAmount || "0"}`,
          DiamondClarity: `${diamond.DiamondClarity}`,
          DiamondColour: `${diamond.DiamondColour}`,
          DiamondCut: `${diamond.DiamondCut}`,
          DiamondShape: `${diamond.DiamondShape}`,
          DiamondSize: `${diamond.DiamondSize}`,
          Certificate: `${diamond.Certificate}`,
          SettingType: `${diamond.SettingType}`,
          DiamondPurchaseAmt: `${diamond.DiamondPurchaseAmt}`,
          Description: `${diamond.Description}`,
        }));

        // Construct the item payload including details for each stone and diamond
        return {
          StockKeepingUnit: product.StockKeepingUnit,
          ItemCode: product.ItemCode,
          MakingFixedAmt: `${product.MakingFixedAmt || 0}`,
          MakingPercentage: `${product.MakingPercentage || 0}`,
          MakingPerGram: `${product.MakingPerGram || 0}`,
          MakingFixedWastage: `${product.MakingFixedWastage || 0}`,
          MetalRate: `${product.MetalRate || 0}`,
          FinePercent: `${product.FinePercent || 0}`,
          WastageWt: `${product.WastageWt || 0}`,
          WastagePercent: `${product.WastagePercent || 0}`,
          Quantity: `${product.Quantity}`,
          CategoryId: parseInt(product.CategoryId),
          ProductId: parseInt(product.ProductId),
          PurchaseEntryNo: "",
          FineGoldWt: product.ConvertAmount ? "0" : `${product.FineGold}`,
          FineSilverWt: product.ConvertAmount ? "0" : `${product.FineSilver}`,
          FineOtherMetalWt: `${product.FineOtherMetalWt}`,
          TotalItemAmt: `${parseFloat(product.TotalItemAmt).toFixed(2)}`,
          FineWt: `${parseFloat(product.FineWt).toFixed(3)}`,
          FinePure: product.FinePure,
          ConvertAmount: product.ConvertAmount,
          // WastageWt: `${parseFloat(
          //   parseFloat(product.FineWastageWt) - parseFloat(product.FineWt)
          // ).toFixed(3)}`,
          AddToUnlabelled: `${product.AddToUnlabelled}`,
          FineWastageWt: `${parseFloat(product.FineWastageWt).toFixed(3)}`,
          RDPurchaseId: parseInt(rcvdId), // Ensure rcvdId is defined or passed to function
          CategoryName: product.CategoryName,
          ProductName: product.ProductName,
          GrossWt: `${product.GrossWt}`,
          NetWt: `${product.NetWt}`,
          StoneWt: `${product.StoneWt}`,
          Stones: stoneDetails, // Modified to include converted stone details
          Diamonds: diamondDetails, // Modified to include converted diamond details
          // DiamondWeight: `${totalDiamondWeight || 0}`,//diamonds need to update
          // DiamondPieces: `${totalDiamondPieces || 0}`,//diamonds need to update
          // DiamondAmount: `${totalDiamondAmount || 0}`,//diamonds need to update
          StoneWeight: `${totalStoneWeight || 0}`,
          StonePieces: `${product.StonePieces || 0}`,
          StoneAmount: `${totalStoneAmount || 0}`,
          MetalId: parseInt(product.CategoryId),
          HallmarkAmt: `${product.HallmarkAmt || 0}`,
          TagWeight: `${product.TagWeight || 0}`,
          FindingWeight: `${product.FindingWeight || 0}`,
          LanyardWeight: `${product.LanyardWeight || 0}`,

          // AssignedDiamondWeight: "0",
          // AssignedGoldWeight: "0",
          // AssignedOtherMetalWeight: "0",
          // AssignedSilverWeight: "0",
          UnlabelledGoldWeight:
            !product.AddToUnlabelled &&
            product.CategoryName.toLowerCase().includes("gold")
              ? `${product.GrossWt}`
              : // ? `${product.FineWastageWt}`
                "0",
          UnlabelledOtherMetalWeight:
            !product.AddToUnlabelled &&
            !(
              product.CategoryName.toLowerCase().includes("gold") &&
              !product.CategoryName.toLowerCase().includes("silver")
            )
              ? // ? `${product.FineWastageWt}`
                `${product.GrossWt}`
              : "0",
          UnlabelledSilverWeight:
            !product.AddToUnlabelled &&
            product.CategoryName.toLowerCase().includes("silver")
              ? // ? `${product.FineWastageWt}`
                `${product.GrossWt}`
              : "0",
          MRP: `0`,
          PurityId: parseInt(product.PurityId),
          VendorId: `${selectedCustomer.Id}`, // Ensure selectedCustomer is defined
          SKUId: product.SKUId ? product.SKUId : 0,
          ClipQuantity: `${product.ClipQuantity}`,
          ClipWeight: `${product.ClipWeight}`,
          Testing: `${product.Testing}`,
          ClientCode: clientCode,
          AssignedDiamondWeight: "0",
          AssignedGoldWeight: "0",
          AssignedOtherMetalWeight: "0",
          AssignedSilverWeight: "0",
          AvailableGrossWeight: !product.AddToUnlabelled
            ? // &&
              // product.CategoryName.toLowerCase().includes("gold")
              `${product.GrossWt}`
            : "0",
          AvailableNetWeight: !product.AddToUnlabelled
            ? // &&
              // !(
              //   product.CategoryName.toLowerCase().includes("gold") &&
              //   !product.CategoryName.toLowerCase().includes("silver")
              // )
              `${product.NetWt}`
            : "0",
          AvailableStoneWeight: !product.AddToUnlabelled
            ? // &&
              // product.CategoryName.toLowerCase().includes("silver")
              `${product.StoneWt}`
            : "0",

          TotalDiamondWeight: `${product.TotalDiamondWeight}`,
          TotalDiamondQty: `${product.TotalDiamondQty}`,
          TotalDiamondAmount: `${product.TotalDiamondAmount}`,
        };
      });

      console.log(payload, "payload checking");
      console.log(payload, "payload");
      console.log(payload, "payload");
      const response = await fetch(a155, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setIssubmit(false);
        setIsitemedit(true)
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      setIssubmit(false);
      setIsitemedit(true)
      if (payments.length > 0) {
        addAllSelectedPayments(rcvdId);
      } else {
        // const orderResponse = await createOrder(orderDetails);
        const orderResponse = await apiService.fetchPurchaseEntryForBill(
          rcvdId
        );

        GenerateRdPurchaseReceipt(orderResponse, rdPurchaseFormat);
        setIsitemedit(true)
        // fetchPurchaseEntryForBill(rcvdId);
        resetAllFields();
      }
    } catch (error) {
      setIssubmit(false);
      console.error("Error:", error);
    }
  };

  const createOrderItems = async (rcvdId) => {
    for (let product of allSelectedProducts) {
      const response = await addOrderItemAPI(product, rcvdId);
      console.log("Response from addOrderItemAPI:", response);
      if (response && product.Stones?.length) {
        try {
          await submitStonesAPI(product.Stones, response[0].Id, rcvdId);
        } catch (error) {
          console.error("Error processing stones for product:", product, error);
        }
      }
      if (response && product.Diamonds?.length) {
        try {
          await submitDiamondsAPI(product.Diamonds, response[0].Id, rcvdId);
        } catch (error) {
          console.error(
            "Error processing diamonds for product:",
            product,
            error
          );
        }
      }
    }
    if (payments.length > 0) {
      addAllSelectedPayments(rcvdId);
    } else {
      // resetAllFields();
      setMessageType("success");
      setMessageToShow("Entry Saved Successfullyy");
      setShowError(true);
    }
  };
  const calculateTotal = (items, field) => {
    return items.reduce((total, item) => {
      return total + parseFloat(item[field] || 0);
    }, 0);
  };
  const addOrderItemAPI = async (product, rcvdId) => {
    try {
      let totalStoneWeight = allSelectedProducts.reduce(
        (totalProductWeight, product) => {
          let productStoneWeight = product.Stones.reduce(
            (totalStoneWeight, stone) => {
              return totalStoneWeight + parseFloat(stone.StoneWeight || 0);
            },
            0
          );
          return totalProductWeight + productStoneWeight;
        },
        0
      );
      let totalStoneAmount = allSelectedProducts.reduce(
        (totalProductWeight, product) => {
          let productStoneWeight = product.Stones.reduce(
            (totalStoneWeight, stone) => {
              return totalStoneWeight + parseFloat(stone.StoneAmount || 0);
            },
            0
          );
          return totalProductWeight + productStoneWeight;
        },
        0
      );
      let totalStonePieces = allSelectedProducts.reduce(
        (totalProductWeight, product) => {
          let productStoneWeight = product.Stones.reduce(
            (totalStoneWeight, stone) => {
              return totalStoneWeight + parseFloat(stone.StonePieces || 0);
            },
            0
          );
          return totalProductWeight + productStoneWeight;
        },
        0
      );
      let totalDiamondWeight = allSelectedProducts.reduce(
        (totalProductWeight, product) => {
          // Calculate the total weight of stones for the current product
          let productStoneWeight = product.Diamonds.reduce(
            (totalStoneWeight, stone) => {
              return totalStoneWeight + parseFloat(stone.DiamondWeight || 0);
            },
            0
          );
          return totalProductWeight + productStoneWeight;
        },
        0
      );
      let totalDiamondPieces = allSelectedProducts.reduce(
        (totalProductWeight, product) => {
          // Calculate the total weight of stones for the current product
          let productStoneWeight = product.Diamonds.reduce(
            (totalStoneWeight, stone) => {
              return totalStoneWeight + parseFloat(stone.DiamondPieces || 0);
            },
            0
          );
          return totalProductWeight + productStoneWeight;
        },
        0
      );
      let totalDiamondAmount = allSelectedProducts.reduce(
        (totalProductWeight, product) => {
          //Calculate the total weight of stones for the current product
          let productStoneWeight = product.Diamonds.reduce(
            (totalStoneWeight, stone) => {
              return totalStoneWeight + parseFloat(stone.DiamondAmount || 0);
            },
            0
          );
          return totalProductWeight + productStoneWeight;
        },
        0
      );
      // const {
      //   totalStoneWeight,
      //   totalStonePieces,
      //   totalStoneAmount,
      //   totalDiamondWeight,
      //   totalDiamondPieces,
      //   totalDiamondAmount,
      // } = calculateTotal(product);
      // const orderItemsList = allSelectedProducts.map((product) => {
      let item = {
        StockKeepingUnit: product.StockKeepingUnit,
        ItemCode: product.ItemCode,
        MakingFixedAmt: `${product.MakingFixedAmt}`,
        MakingPercentage: `${product.MakingPercentage}`,
        MakingPerGram: `${product.MakingPerGram}`,
        MakingFixedWastage: `${product.MakingFixedWastage}`,
        MetalRate: `${product.MetalRate}`,
        FinePercent: `${product.FinePercent}`,
        WastageParcent: `${product.WastageParcent}`,
        Quantity: `${product.Quantity}`,
        CategoryId: parseInt(product.CategoryId),
        ProductId: parseInt(product.ProductId),
        PurchaseEntryNo: "",
        FineGoldWt: `${!product.ConvertAmount ? product.FineGold : 0}`,
        FineSilverWt: `${!product.ConvertAmount ? product.FineSilver : 0}`,
        FineOtherMetalWt: `${product.FineOtherMetalWt}`,
        TotalItemAmt: `${product.TotalItemAmt}`,
        FineWt: `${product.FineWt}`,
        Testing: `${product.Testing}`,
        WastageWt: `${product.WastageWt}`,
        FineWastageWt: `${product.FineWastageWt}`,
        RDPurchaseId: parseInt(rcvdId),
        CategoryName: product.CategoryName,
        ProductName: product.ProductName,
        GrossWt: `${product.GrossWt}`,
        NetWt: `${product.NetWt}`,
        StoneWt: `${product.StoneWt}`,
        Status: "Active",
        ClientCode: clientCode,
        CompanyId: CompanyId ? CompanyId : 0,
        CounterId: CounterId ? CounterId : 0,
        BranchId: BranchId ? BranchId : 0,
        EmployeId: EmployeId ? EmployeId : 0,
        FinePure: `${product.FinePure}`,
        AddToUnlabelled: `${product.AddToUnlabelled}`,
        // DiamondName: "",
        // DiamondRate: "",
        // DiamondWeight: `${totalDiamondWeight}`,
        // DiamondPieces: `${totalDiamondPieces}`,
        // DiamondAmount: `${totalDiamondAmount}`,
        StoneName: "",
        StoneRate: "",
        StoneWeight: `${totalStoneWeight}`,
        StonePieces: `${product.StonePieces}`,
        StoneAmount: `${totalStoneAmount}`,
        MetalId: parseInt(product.CategoryId),
        HallmarkAmt: `${product.HallmarkAmt}`,
        TagWeight: `${product.TagWeight}`,
        FindingWeight: `${product.FindingWeight}`,
        LanyardWeight: `${product.LanyardWeight}`,
        MRP: `${product.MRP}`,
        PurityId: parseInt(product.PurityId),
        VendorId: `${parseInt(selectedCustomer.Id)}`,
        SKUId: 0,
        ClipQuantity: `${product.ClipQuantity}`,
        ClipWeight: `${product.ClipWeight}`,
        DiamondSize: `${product.DiamondSize}`,
        DiamondWeight: `${product.DiamondWeight}`,
        DiamondPurchaseRate: `${product.DiamondPurchaseRate}`,
        DiamondSellRate: `${product.DiamondSellRate}`,
        DiamondClarity: `${product.DiamondClarity}`,
        DiamondColour: `${product.DiamondColour}`,
        DiamondShape: `${product.DiamondShape}`,
        DiamondCut: `${product.DiamondCut}`,
        DiamondSettingType: `${product.DiamondSettingType}`,
        DiamondCertificate: `${product.DiamondCertificate}`,
        DiamondPieces: `${product.DiamondPieces}`,
        DiamondPurchaseAmount: `${product.DiamondPurchaseAmount}`,
        DiamondSellAmount: `${product.DiamondSellAmount}`,
        DiamondDescription: `${product.DiamondDescription}`,
        // SupplierId: parseInt(customerId),

        // BalanceGold: `${product.BalanceGold}`,
        // BalanceSilver: `${product.BalanceSilver}`,
        // Wastage: `${product.Wastage}`,
        // GoldRate: `${product.GoldRate}`,
        // making: `${product.making}`,
        // NetAmt: `${product.NetAmt}`,
        // GSTAmount: `${product.GSTAmount}`,
        // TotalAmt: `${product.TotalAmt}`,
        // PurchaseAmount: `${product.PurchaseAmount}`,
        // purityRate: product.purityRate,
        // finalPrice: product.finalPrice,
        // totalGstAmount: product.totalGstAmount,
      };

      //   return item;
      // });
      // console.log(orderItemsList, "orderItemsList to send");
      console.log(item, "orderItemsList to send");
      const response = await fetch(a155, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(orderItemsList),
        body: JSON.stringify([item]),
      });

      const rcvdData = await response.json();
      const orderData = rcvdData;
      console.log(orderData, "2nd Hit OrderItems created");

      // // Set the state with order items
      // setOrderItemsData(orderData);
      // setOrderItems(orderData);

      // if (rcvdData.status === "error") {
      //   alert(rcvdData.message);
      // } else {
      //   // Generate bill PDF after setting the state
      //   // generateBillPDF(rcvdData.data, x);
      //   // resetAllFields();
      //   addAllSelectedPayments(rcvdId);
      //   window.scrollTo(0, 0);
      // }
      if (response.ok) {
        setOrderItems((prevItems) => [...prevItems, rcvdData]);
        return rcvdData;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const submitStonesAPI = async (stonesData, itemId, rcvdId) => {
    try {
      // Map stones data for API submission
      const stones = stonesData.map((stone) => ({
        StoneName: stone.StoneName,
        StoneWeight: stone.StoneWeight,
        StonePieces: stone.StonePieces,
        StoneRate: stone.StoneRate,
        StoneAmount: stone.StoneAmount,
        Description: stone.Description,
        ClientCode: clientCode,
        CompanyId: CompanyId || 0,
        CounterId: CounterId || 0,
        BranchId: BranchId || 0,
        EmployeeId: EmployeId || 0,
        RDPurchaseItemId: parseInt(itemId),
      }));

      console.log(
        "Submitting stones data to the server:",
        JSON.stringify(stones)
      );

      const response = await fetch(a157, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stones),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to submit stones data."
        );
      }

      console.log("Stones added successfully:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error submitting stones data:", error);
      alert("Failed to submit stones data: " + error.message);
    }
  };
  const submitDiamondsAPI = async (diamondsData, itemId, rcvdId) => {
    try {
      // const orderItemsList = allSelectedProducts.map((product) => {
      const diamonds = diamondsData.map((diamond) => ({
        DiamondName: diamond.DiamondName,
        DiamondWeight: diamond.DiamondWeight,
        DiamondPieces: diamond.DiamondPieces,
        DiamondRate: diamond.DiamondRate,
        DiamondAmount: diamond.DiamondAmount,
        Description: diamond.Description,
        DiamondClarity: diamond.DiamondClarity,
        DiamondColour: diamond.DiamondColour,
        DiamondCut: diamond.DiamondCut,
        DiamondShape: diamond.DiamondShape,
        DiamondSize: diamond.DiamondSize,
        Certificate: diamond.Certificate,
        SettingType: diamond.SettingType,
        DiaPurchaseAmt: diamond.DiaPurchaseAmt,
        ClientCode: clientCode,
        CompanyId: CompanyId ? CompanyId : 0,
        CounterId: CounterId ? CounterId : 0,
        BranchId: BranchId ? BranchId : 0,
        EmployeeId: EmployeId ? EmployeId : 0,
        PurchaseItemId: parseInt(itemId),
      }));

      //   return item;
      // });
      // console.log(orderItemsList, "orderItemsList to send");
      console.log(
        "Submitting diamonds data to the server:",
        JSON.stringify(diamonds)
      );
      const response = await fetch(a158, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(orderItemsList),
        body: JSON.stringify(diamonds),
      });

      const rcvdData = await response.json();
      const orderData = rcvdData;
      console.log(orderData, "Diamonds Added");
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  // console.log(payments, "payments");
  // console.log(payments, "payments");
  const currentYear = new Date().getFullYear();
  // console.log(currentYear, "current Year");
  const addAllSelectedPayments = async (rcvdId) => {
    try {
      const paymentsList = payments.map((payment) => {
        let item = {
          CustomerId: 0,
          PaymentModeType: `${payment.mode}`,
          PaymentSource: "Purchase Bill",
          CreditDebit: "Debit",
          Amount: `${payment.amount}`,
          TransactionType: `${payment.paymentType}`,
          InvoiceNumber: `${invoiceNumber}`,
          PaymentVisibility: "Active",
          FinancialYear: `${currentYear}`,
          Branch: "Home",
          FineGold: `${payment.fineGold}`,
          FineSilver: `${payment.fineSilver}`,
          FineOtherMetal: "0",
          GoldRate: `${payment.goldRate}`,
          SilverRate: `${payment.silverRate}`,
          OtherMetalRate: "0",
          GoldAmount: `${payment.goldAmount}`,
          SilverAmount: `${payment.silverAmount}`,
          OtherMetalAmount: "0",
          OldGoldGrosswt: `${payment.fineGold}`,
          OldSilverGrosswt: `${payment.fineSilver}`,
          OtherMetalGrossWt: "0",
          GoldPurity: "",
          SilverPurity: "",
          OtherMetalPurity: "",
          VendorId: parseInt(selectedCustomer.Id),
          InvoiceId: 0,
          InwardNo: `${parseInt(selectedCustomer.InwardNo) + 1}`,
          OrderId: 0,
          CustomerName: "",
          VendorName: `${selectedCustomer.FirmName}`,
          RDPurchaseId: parseInt(rcvdId),
          Status: "Purchased",
          Description: payment.paymentDescription,
          ClientCode: clientCode,
          CompanyId: CompanyId ? CompanyId : 0,
          CounterId: CounterId ? CounterId : 0,
          BranchId: BranchId ? BranchId : 0,
          EmployeId: EmployeId ? EmployeId : 0,
        };

        return item;
      });
      console.log(paymentsList, "paymentsList to send");
      const response = await fetch(a156, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentsList),
      });

      const rcvdData = await response.json();
      const paymentsData = rcvdData;
      console.log(paymentsData, "3rd Hit payment modes created");
      setSavingInvoice(false);
      if (rcvdData.status === "error") {
        // alert(data.message);
        setMessageType("error");
        setMessageToShow(data.Message);
        setShowError(true);
        setActive("AddNew");
      } else {
        setMessageType("success");
        setMessageToShow("Entry Saved Successfully");
        setShowError(true);
        // fetchPurchaseEntryForBill(rcvdId);
        const orderResponse = await apiService.fetchPurchaseEntryForBill(
          rcvdId
        );

        GenerateRdPurchaseReceipt(orderResponse, rdPurchaseFormat);
        // fetchPurchaseEntryForBill(rcvdId);
        setIsitemedit(true)
        resetAllFields();

        window.scrollTo(0, 0);
      }
      // if (rcvdData.status === "error") {
      //   alert(rcvdData.message);
      // } else {
      // Generate bill PDF after setting the state
      // generateBillPDF(rcvdData.data, x);

      // }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
      // resetAllFields();
    }, 2000);
  }, [showError]);
  // console.log(orderCsData, "orderCsData");

  const scrollToCenter = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const handleCustomerInputChange = (e, property) => {
    const updatedUserDetails = {
      ...selectedCustomer,
      [property]: e.target.value,
    };

    setSelectedCustomer(updatedUserDetails);
    // fetchAllCustomers();
    // console.log(selectedCustomer);
  };

  const updateCustomerDetails = async () => {
    let updatedUserDetails = [];
    try {
      const response = await fetch(a64, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedCustomer),
      });
      const data = await response.json();
      // console.log(data, "selected Cs");
      //   alert("updated cs");
      setSelectedCustomer(data.data);
      fetchAllCustomers();
      setSelectedCustomerEdit(false);
      scrollToCenter("adminInvoiceAddCustomerTitle");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const addNewCustomerData = async () => {
    // e.preventDefault();
    const formData = {
      firstName: customerName,
      lastName: "",
      email: customerEmail ? customerEmail : `${customerMobile}@example.com`,
      password: customerMobile,
      mobile: customerMobile,
      currAddStreet: customerAddress ? customerAddress : ``,
      currAddTown: "",
      currAddState: "",
      currAddPinCode: "",
      perAddStreet: customerAddress ? customerAddress : ``,
      perAddTown: "",
      perAddState: "",
      perAddPinCode: "",
    };
    try {
      const response = await fetch(a4, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.message === "email already exist") {
        alert("email already exist"); // setAlertType("Email Already Exists, Try Login or use another email");
      } else {
        // alert("added Successfully");
        setSelectedCustomerEdit(false);
        setSelectedCustomer(data.data);
        // console.log(data, "newCsData");
      }
    } catch (error) {
      console.error(error);
      alert("fail");
      alert();
    }
  };

  const editItem = (product) => {
    setOpenEditBox(true);
    setOpenEditProduct(product);
  };
  const closeEditItem = () => {
    setOpenEditBox(false);
  };
  const handleInputChange2 = (e, property) => {
    const { value } = e.target;
    if (selectedProduct) {
      const updatedProduct = {
        ...openEditProduct,
        [property]: e.target.value,
      };
      const GrossWt = parseFloat(updatedProduct.GrossWt) || 0;
      const StoneWt = parseFloat(updatedProduct.StoneWt) || 0;
      const NetWt = parseFloat(updatedProduct.NetWt) || 0;
      if (property === "GrossWt" && !isNaN(value)) {
        updatedProduct.NetWt = (parseFloat(value) - StoneWt).toFixed(3);
        // calculateFinalPrice(selectedProduct);
      }
      if (property === "StoneWt" && !isNaN(value)) {
        updatedProduct.NetWt = (GrossWt - parseFloat(value)).toFixed(3);
      }
      if (property === "NetWt" && !isNaN(value)) {
        updatedProduct.GrossWt = (
          parseFloat(StoneWt) + parseFloat(value)
        ).toFixed(3);
      }
      // console.log(updatedProduct, "updatedProduct");
      if (property === "MetalRate" && !isNaN(value)) {
        updatedProduct.MetalRate = parseFloat(value).toFixed(0);
      }

      if (
        property === "NetWt" ||
        property === "GrossWt" ||
        property === "StoneWt" ||
        property === "MakingPerGram" ||
        property === "MakingPercentage" ||
        property === "MakingFixedAmt" ||
        property === "MetalRate" ||
        property === "HallmarkAmt" ||
        property === "MakingFixedWastage"
      ) {
        let netGoldRate =
          (parseFloat(updatedProduct.NetWt) *
            parseFloat(updatedProduct.MetalRate)) /
          10;
        let makingCharges1 =
          parseFloat(updatedProduct.NetWt) *
          parseFloat(updatedProduct.MakingPerGram);
        let makingCharges2 =
          (parseFloat(netGoldRate) *
            parseFloat(updatedProduct.MakingPercentage)) /
          100;
        let makingCharges3 = parseFloat(updatedProduct.MakingFixedAmt);
        let makingCharges4 =
          (parseFloat(updatedProduct.MetalRate) *
            parseFloat(updatedProduct.MakingFixedWastage)) /
          10;
        let GST = 0.03;

        let grossTotalRate =
          parseFloat(netGoldRate) +
          parseFloat(makingCharges1) +
          parseFloat(makingCharges2) +
          parseFloat(makingCharges3) +
          parseFloat(makingCharges4) +
          parseFloat(updatedProduct.HallmarkAmt) +
          parseFloat(updatedProduct.StoneAmount) +
          parseFloat(updatedProduct.totalDiamondpurchaseAmount);
        let GSTAdded = parseFloat(GST) * parseFloat(grossTotalRate);
        let finalPrice = parseFloat(grossTotalRate) + parseFloat(GSTAdded);

        // Calculate total making charges
        let totalMakingCharges =
          parseFloat(makingCharges1) +
          parseFloat(makingCharges2) +
          parseFloat(makingCharges3) +
          parseFloat(makingCharges4);

        console.log("checking making1  ", totalMakingCharges);
        if (updatedProduct.MRP == 0 || updatedProduct.MRP == "") {
          updatedProduct.FinalPrice = parseFloat(grossTotalRate).toFixed(3);
          updatedProduct.Making = totalMakingCharges;
          updatedProduct.TotalGstAmount = GSTAdded;
        } else {
          // updatedProduct = {
          //   ...updatedProduct,
          //   finalPrice: parseFloat(grossTotalRate).toFixed(3),
          //   //   finalPrice: parseFloat(finalPrice).toFixed(3),
          //   making: totalMakingCharges,
          //   totalGstAmount: GSTAdded,
          // };

          updatedProduct.FinalPrice = 0;
          updatedProduct.Making = 0;
          updatedProduct.TotalGstAmount = 0;
          //   finalPrice: parseFloat(finalPrice).toFixed(3),
          // }
          setSelectedProductPrice(parseFloat(finalPrice).toFixed(3));
          setOpenEditProduct(updatedProduct);
        }
        // Update selectedProduct with additional properties and calculated price
        // if (updatedProduct.purchase) {
        // }
        calculatePurchasePrice(updatedProduct);
        setSelectedProduct(updatedProduct); // Update the selected product
        setOpenEditProduct(updatedProduct);
        // calculateFinalPrice(updatedProduct);

        setSelectedProductPrice(parseFloat(finalPrice).toFixed(3));
      }
      // Update the specific product in allSelectedProducts array without changing its position
      const updatedProducts = allSelectedProducts.map((product) =>
        product.Id === updatedProduct.Id ? updatedProduct : product
      );
      // Update the state with the modified products array
      setOpenEditProduct(updatedProduct);
      setAllSelectedProducts(updatedProducts);

      // Update the openEditProduct state
    }
  };

  // Convert payments array to a comma-separated string whenever you need it
  const paymentsString = payments
    .map((payment) => `${payment.mode}:${payment.amount}`)
    .join(",");
  // Function to calculate total payment amount
  const calculateTotalAmount = () => {
    // Use reduce to sum all payment amounts
    const totalPaidAmount = payments.reduce(
      (total, payment) =>
        total +
        (payment.mode !== "Advance Received" ? parseFloat(payment.amount) : 0),
      0
    );

    return totalPaidAmount;
  };

  // Render total payment amount
  const totalPaidAmount = calculateTotalAmount();

  const resetAllFields = () => {
    setSelectedCustomer(null);
    setSelectedProduct([]);
    setAllSelectedProducts([]);
    setPaymentAmount(0);
    setPayments([]);
    setSelectedSalesEmployee("");
    setSavingInvoice(false);
    window.scrollTo(0, 0);
  };
  const handleInputChangePurchase = (e) => {
    const { name, value } = e.target;
    const updatedProduct = { ...purchaseProduct };
    console.log("checking parameter atchange", name);
    // Handle specific cases

    // Set the edited field in userEditedFields
  setUserEditedFields((prev) => ({
    ...prev,
    [name]: true, // Mark this field as edited
  }));

    switch (name) {
      case "CategoryId":
        const [selectedCategoryId, selectedCategoryName] = value.split(",");
        updatedProduct.CategoryName = selectedCategoryName;
        updatedProduct.CategoryId = selectedCategoryId;
        updatedProduct.MetalId = selectedCategoryId;
        updatedProduct.MetalName = selectedCategoryName;
        break;
      case "MetalId":
        const [selectedMetalId, selectedMetalName] = value.split(",");
        updatedProduct.MetalId = selectedMetalId;
        updatedProduct.MetalName = selectedMetalName;
        break;
      case "DiamondPieces":
        updatedProduct.DiamondPieces = value;
        break;
      case "ProductName":
        const [selectedProductId, selectedProductName] = value.split(",");
        updatedProduct.ProductId = selectedProductId;
        updatedProduct.ProductName = selectedProductName;
        break;
      case "GrossWt":
        updatedProduct.GrossWt = value;
        break; // Add missing break
      case "StoneWt":
        updatedProduct.StoneWt = value;
        break; // Add missing break
      case "ClipWeight":
        updatedProduct.ClipWeight = value;
        break; // Add missing break
      case "ClipQuantity":
        updatedProduct.ClipQuantity = value;
        updatedProduct.Quantity = value;
        break; // Add missing break
      case "Quantity":
        updatedProduct.Quantity = value;
        updatedProduct.ClipQuantity = value;
        break; // Add missing break
      case "NetWt":
        updatedProduct.NetWt = value;
        break; // Add missing break
      case "FinePercent":
        updatedProduct.FinePercent = value;
        break; // Add missing break
      case "WastageWt":
        updatedProduct[name] = value;
        break;

        case "MakingFixedWastage":
        updatedProduct[name] = value;
        break;
        case "MakingPerGram":
        updatedProduct[name] = value;
        break;
        case "MakingFixedAmt":
        updatedProduct[name] = value;
        break;

      case "MetalRate":
        updatedProduct.MetalRate = parseFloat(value) || 0; // Ensure valid number
        break;
      case "purityRate":
        const [selectedPurityName, selectedPurityRate] = value.split(",");
        updatedProduct.Purity = selectedPurityName;
        updatedProduct.GoldRate = selectedPurityRate;
        updatedProduct.purityRate = selectedPurityRate;
        break;
      case "GoldRate":
        updatedProduct.GoldRate = parseFloat(value) || 0;
        updatedProduct.purityRate = parseFloat(value) || 0;
        break;
      case "DiamondSize":
        updatedProduct[name] = value;
        break;
      default:
        updatedProduct[name] = value;
    }

    setPurchaseProduct(updatedProduct);

    console.log("checking tagweight", updatedProduct);
    setIscal(true); // Trigger calculation
  };

  useEffect(() => {
    if (iscal) {
      console.log("checking calculationsss", purchaseProduct);
      const updatedProduct = ProductCalculator.calculateAll(
        purchaseProduct,
        allDiamondSizeWeightRate,
        allPurities,
        allVendorTounche,
        selectedCustomer,
        selectedSku,
        selectedSkuName,
        finePure,
        convertAmount,
        gstType,
        setConvertAmount,
        setFinePure,
        userEditedFields
      );
      setPurchaseProduct(updatedProduct);
      setIscal(false);
    }
  }, [iscal, purchaseProduct]);

  function findClosestHigherDiamondWeight(
    data,
    inputWeight,
    inputShape,
    inputClarity,
    color,
    size,
    cut
  ) {
    // Convert inputWeight to a number
    const positiveInputWeight = parseFloat(inputWeight);
    console.log(
      "checking diamond inputes  ",
      inputWeight,
      inputShape,
      inputClarity,
      color,
      size,
      cut
    );

    if (!inputWeight || parseFloat(inputWeight) === 0) {
      return null;
    }

    // Filter and sort the weights
    const higherWeights = data
      .map((item) => {
        // Convert DiamondWeight to a positive number
        const positiveWeight = Math.abs(parseFloat(item.DiamondWeight));
        return {
          ...item,
          DiamondWeight: positiveWeight,
        };
      })
      // Filter weights greater than input weight
      .filter((item) => item.DiamondShape === inputShape)
      .filter((item) => item.DiamondClarity === inputClarity)
      .filter((item) => item.DiamondColor === color)
      .filter((item) => item.DiamondCut === cut);
    // .filter(item => item.DiamondWeight == positiveInputWeight)

    // .filter(item => item.DiamondWeight >= positiveInputWeight)  // Filter weights greater than or equal to input weight

    const sortedDiamonds = higherWeights.sort(
      (a, b) => a.DiamondWeight - b.DiamondWeight
    );

    // Initialize variable to hold the closest diamond found
    let closestDiamond = null;

    // Iterate through the sorted diamonds to find the exact match or the next higher weight
    for (let i = 0; i < sortedDiamonds.length; i++) {
      if (sortedDiamonds[i].DiamondWeight === positiveInputWeight) {
        // Exact match found
        closestDiamond = sortedDiamonds[i];
        break;
      } else if (sortedDiamonds[i].DiamondWeight > positiveInputWeight) {
        // Next higher weight found
        closestDiamond = sortedDiamonds[i];
        break;
      }
    }

    // If no exact or higher weight was found, return the closest diamond found or null
    return closestDiamond || null;
    // Sort in ascending order
    //     .sort((a, b) => a.DiamondWeight - b.DiamondWeight);
    // // Get the closest higher weight
    // return higherWeights.length > 0 ? higherWeights[0] : null;
  }

  // useEffect(() => {
  //   const fineWeight = parseFloat(purchaseProduct.FineWt) || 0;
  //   const wastageWeight = !finePure
  //     ? (parseFloat(purchaseProduct.WastageWt) * (parseFloat(purchaseProduct.NetWt) || 0)) / 100
  //     : (parseFloat(purchaseProduct.WastageWt) * fineWeight) / 100;

  //   const totalFineWastageWt = parseFloat(fineWeight) + parseFloat(wastageWeight);
  //   const updatedProduct = { ...purchaseProduct, FineWastageWt: totalFineWastageWt.toFixed(3), FinePure: finePure, ConvertAmount: convertAmount };

  //   updatedProduct.TotalItemAmt = (parseFloat(purchaseProduct.MetalRate) / 10) * totalFineWastageWt;
  //   setPurchaseProduct(updatedProduct);
  //   calculatePurchasePrice(updatedProduct);
  // }, [convertAmount, finePure]);

  // const calculatePurchasePrice = (product) => {
  //   const FineRate = (parseFloat(product.FineWastageWt) * parseFloat(product.MetalRate)) / 10;
  //   const netRate = (FineRate * parseFloat(product.NetWt)).toFixed(3);

  //   // Calculate making charges once
  //   const makingCharges = [
  //     parseFloat(product.NetWt) * parseFloat(product.MakingPerGram),
  //     (FineRate * parseFloat(product.MakingPercentage)) / 1000,
  //     parseFloat(product.MakingFixedAmt),
  //     (parseFloat(product.MetalRate) * parseFloat(product.MakingFixedWastage)) / 10,
  //     parseFloat(product.StoneAmount),
  //     parseFloat(product.totalDiamondpurchaseAmount),
  //     parseFloat(product.HallmarkAmt),
  //   ].reduce((total, charge) => total + (charge || 0), 0);

  //   const totalRate = FineRate + makingCharges;
  //   const allItemGstRate = totalRate * 0.03;
  //   const totalItemAmt = convertAmount ? totalRate : makingCharges;

  //   setPurchaseProduct({
  //     ...product,
  //     Making: makingCharges,
  //     TotalItemAmt: totalItemAmt,
  //     NetAmt: netRate,
  //     GSTAmount: allItemGstRate,
  //     TotalAmt: totalRate,
  //     toAmount: convertAmount,
  //     PurchaseAmount: totalRate,
  //     FinalPrice: `${totalRate}`,
  //     TotalGstAmount: `${allItemGstRate}`,
  //     BalanceGold: (product.MetalName?.toLowerCase().includes("gold") ? product.FineWastageWt : 0),
  //     BalanceSilver: (product.MetalName?.toLowerCase().includes("silver") ? product.FineWastageWt : 0),
  //     FineGold: (product.MetalName?.toLowerCase().includes("gold") ? product.FineWastageWt : "0"),
  //     FineSilver: (product.MetalName?.toLowerCase().includes("silver") ? product.FineWastageWt : "0"),
  //   });
  // };

  const addPurchaseProductToList = (selectedProduct) => {
    setAllSelectedProducts((prevItems) => [...prevItems, selectedProduct]);
    // setIsitemedit(false);
    resetproduct()
  };


  const resetproduct = () =>{

    setSelectedSku([])
    setSelectedSkuName('')
    setLabelName("");
    setSelectedProduct([]);
    setCategoryName("");
    setProductName("");
    setCollectionName("");
    setPurityType("");
    setProductQty("");
    setSelectedProductPrice(0);
    setAllStonesList(allStonesList1);
    // scrollToCenter("adminInvoiceSelectLabelBox");
    setPurchaseProduct({
      StockKeepingUnit: "",
      ItemCode: "",
      MakingFixedAmt: 0,
      MakingPerGram: 0,
      MakingFixedWastage: 0,
      MakingPercentage: 0,
      MetalRate: 0,
      FinePercent: 0,
      WastagePercent: 0,
      Quantity: 1,
      PurityId: 0,
      CategoryId: 0,
      ProductId: 0,
      FineGoldWt: 0,
      FineSilverWt: 0,
      FineOtherMetalWt: 0,
      TotalStoneAmt: 0,
      TotalItemAmt: 0,
      FineWt: 0,
      WastageWt: 0,
      FineWastageWt: 0,
      RDPurchaseId: 0,
      CategoryName: "",
      ProductName: "",
      GrossWt: 0,
      NetWt: 0,
      StoneWt: 0,
      Status: "Active",
      CounterId: 0,
      BranchId: 0,
      CompanyId: 0,
      FinePure: false,
      ClientCode: 0,
      AddToUnlabelled: false,
      MetalId: 0,
      MetalName: "",
      StoneName: "",
      StoneWeight: 0,
      StonePieces: 0,
      StoneRate: 0,
      StoneAmount: 0,
      HallmarkAmt: 0,
      TagWeight: 0,
      FindingWeight: 0,
      LanyardWeight: 0,
      ConvertAmount: convertAmount,
      Stones: [],
      Diamonds: [],
      DiamondName: "",
      DiamondWeight: 0,
      DiamondRate: 0,
      DiamondPieces: 0,
      DiamondAmount: 0,
      DiamondSize: "0",
      DiamondPurchaseRate: "0",
      DiamondSellRate: "0",
      DiamondClarity: "",
      DiamondColour: "",
      DiamondShape: "",
      DiamondCut: "",
      DiamondSettingType: "",
      DiamondCertificate: "",
      DiamondPurchaseAmount: "0",
      DiamondSellAmount: "0",
      DiamondDescription: "",
      Testing: "0",
    });
    setActive("Sell");
    setSelectedProductType("");
    setSelectedCategory("");
    setSelectedProductType("");
    console.log("here");
    setConvertAmount(false);
    setFinePure(false);
    setIsitemedit(true)
    // setSelectedSkuName("");
    // setSelectedSku([]);

  }

  useEffect(() => {
    const totalPurchaseAmount = allSelectedProducts
      .filter((x) => x.purchase === true)
      .reduce(
        (total, product) => total + parseFloat(product.PurchaseAmount),
        0
      );
    setOldGoldAmount(totalPurchaseAmount);
    setPurchaseProductList(
      allSelectedProducts.filter((x) => x.purchase === true)
    );

    // console.log(purchaseProductList, "onlyPurchaseProducts");
  }, [allSelectedProducts]);
  const removePurchaseProductFromList = (index) => {
    const updatedProductList = allSelectedProducts.filter(
      (_, i) => i !== index
    );
    setAllSelectedProducts(updatedProductList);
  };
  // console.log(payments, "payments");
  // console.log(payments, "payments");
  const handleMetalPaymentOption = (a, b) => {
    const { value } = b.target;
    if (paymentOptions === "Metal to Cash") {
      let totalAmount = 0;
      if (
        metalPaymentOption.optionSelected !== "" &&
        metalPaymentOption.optionSelected.toLowerCase().includes("gold")
      ) {
        if (a == "Rate") {
          totalAmount = (value / 10) * metalPaymentOption.fineWt;
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineRate: value,
            totalAmount: totalAmount,
          });
          setPaymentGold(metalPaymentOption.fineWt);
          setPaymentAmount(totalAmount);
          setDeductGold(0);
        } else {
          totalAmount = (metalPaymentOption.fineRate / 10) * value;
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineWt: value,
            totalAmount: totalAmount,
          });
          setPaymentAmount(totalAmount);
          setPaymentGold(value);
          setDeductGold(0);
        }
      } else {
        if (a == "Rate") {
          totalAmount = (value / 10) * metalPaymentOption.fineWt;
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineRate: value,
            totalAmount: totalAmount,
          });
          setPaymentSilver(metalPaymentOption.fineWt);
          setPaymentAmount(totalAmount);
          setDeductSilver(0);
        } else {
          totalAmount = (metalPaymentOption.fineRate / 10) * value;
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineWt: value,
            totalAmount: totalAmount,
          });
          setPaymentAmount(totalAmount);
          setPaymentSilver(value);
          setDeductSilver(0);
        }
      }
    } else if (paymentOptions === "Metal") {
      let finePaid = 0;
      if (
        metalPaymentOption.optionSelected !== "" &&
        metalPaymentOption.optionSelected.toLowerCase().includes("gold")
      ) {
        if (a == "totalWt") {
          finePaid = parseFloat(
            (metalPaymentOption.finePurity / 100) * value
          ).toFixed(3);
          setMetalPaymentOption({
            ...metalPaymentOption,
            deductSilver: 0,
            deductGold: finePaid,
            totalWt: value,
            fineWt: finePaid || 0,
          });
          setPaymentGold(finePaid);
          setPaymentAmount(0);
          setDeductGold(finePaid);
        } else {
          finePaid = parseFloat(
            (value / 100) * metalPaymentOption.totalWt
          ).toFixed(3);
          setMetalPaymentOption({
            ...metalPaymentOption,
            deductSilver: 0,
            deductGold: finePaid,
            finePurity: value,
            fineWt: finePaid,
          });
          setPaymentGold(finePaid);
          setPaymentAmount(0);
          setDeductGold(finePaid);
        }
      } else {
        if (a == "totalWt") {
          finePaid = parseFloat(
            (metalPaymentOption.finePurity / 100) * value
          ).toFixed(3);
          setMetalPaymentOption({
            ...metalPaymentOption,
            deductGold: 0,
            deductSilver: finePaid,
            totalWt: value,
            fineWt: finePaid || 0,
          });
          setPaymentSilver(finePaid);
          setPaymentAmount(0);
          setDeductSilver(finePaid);
        } else {
          finePaid = parseFloat(
            (value / 100) * metalPaymentOption.totalWt
          ).toFixed(3);
          setMetalPaymentOption({
            ...metalPaymentOption,
            deductGold: 0,
            deductSilver: finePaid,
            finePurity: value,
            fineWt: finePaid,
          });
          setPaymentSilver(finePaid);
          setPaymentAmount(0);
          setDeductSilver(finePaid);
        }
      }
    } else if (paymentOptions === "Cash to Metal") {
      let fineWt = 0;
      if (
        metalPaymentOption.optionSelected !== "" &&
        metalPaymentOption.optionSelected.toLowerCase().includes("gold")
      ) {
        if (a == "Amount") {
          fineWt = parseFloat(
            (value * 10) / metalPaymentOption.fineRate
          ).toFixed(3);
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineWt: fineWt !== "" ? fineWt : 0,
            totalAmount: value,
            deductGold: fineWt !== "" ? fineWt : 0,
            deductSilver: 0,
          });
          setPaymentAmount(0);
          setDeductGold(fineWt !== "" ? fineWt : 0);
          setPaymentGold(fineWt !== "" ? fineWt : 0);
          setDeductSilver(0);
          // setPaymentMetal();
        } else {
          fineWt = parseFloat(
            (metalPaymentOption.totalAmount * 10) / value
          ).toFixed(3);
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineWt: fineWt !== "" ? fineWt : 0,
            fineRate: value,
            deductGold: fineWt !== "" ? fineWt : 0,
            deductSilver: 0,
          });
          // setPaymentAmount(totalAmount);
          setDeductGold(fineWt !== "" ? fineWt : 0);
          setPaymentGold(fineWt !== "" ? fineWt : 0);
          setDeductSilver(0);
        }
      } else {
        if (a == "Amount") {
          fineWt = (
            parseFloat(value * 10) / metalPaymentOption.fineRate
          ).toFixed(3);
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineWt: fineWt !== "" ? fineWt : 0,
            totalAmount: value,
            deductGold: 0,
            deductSilver: fineWt !== "" ? fineWt : 0,
          });
          setPaymentAmount(0);
          setDeductSilver(fineWt !== "" ? fineWt : 0);
          setPaymentSilver(fineWt !== "" ? fineWt : 0);
          setDeductGold(0);
          // setPaymentAmount(totalAmount);
        } else {
          fineWt = parseFloat(
            (metalPaymentOption.totalAmount * 10) / value
          ).toFixed(3);
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineWt: fineWt !== "" ? fineWt : 0,
            fineRate: value,
            deductGold: 0,
            deductSilver: fineWt !== "" ? fineWt : 0,
          });
          // setPaymentAmount(totalAmount);
          setDeductSilver(fineWt !== "" ? fineWt : 0);
          setPaymentSilver(fineWt !== "" ? fineWt : 0);
          setDeductGold(0);
        }
      }
    }
  };

  const filteredProducts = allProductTypes.filter(
    (product) => product.CategoryId == parseInt(purchaseProduct.MetalId)
  );
  const filteredPurities = allPurities.filter((product) => {
    if (purchaseProduct.CategoryName === "Old Gold") {
      return product.category == "Gold";
    } else {
      return product.CategoryId == parseInt(purchaseProduct.MetalId);
    }
  });

  const deleteStone = (index) => {
    if (index < 0 || index >= purchaseProduct.Stones.length) {
      console.warn("Index out of boundss");
      return;
    }

    const skuPieces = parseFloat(selectedSku?.Pieces) || 1;
    const stoneToDelete = purchaseProduct.Stones[index];

    // Update StoneWt after deleting the stone
    const updatedStoneWeight =
      purchaseProduct.StoneWt -
      stoneToDelete.StoneWeight * stoneToDelete.StonePieces * skuPieces;
    purchaseProduct.StoneWt = updatedStoneWeight;

    const updatedStones = purchaseProduct.Stones.filter((_, i) => i !== index);
    setPurchaseProduct({ ...purchaseProduct, Stones: updatedStones });
    setIscal(true);
  };

  const deleteStoneEdit = (index) => {
    const updatedStones = openEditProduct.Stones.filter((_, i) => i !== index);
    setOpenEditProduct({ ...openEditProduct, Stones: updatedStones });
  };

  const normalizeString = (str) => {
    return str.replace(/\s+/g, " ").trim().toLowerCase();
  };

  const handleStoneChange = (index, property, value) => {
    const newStones = [...purchaseProduct.Stones];
    // const selectedStone = allStonesList.find(
    //   (stone) => {
    //     console.log('checking newstones', '  ',allStonesList, '  ', stone.StoneMainName, '  ', value )
    //     stone.StoneMainName === value}

    // );

    const normalizedValue = normalizeString(value);
    console.log("Normalized value:", normalizedValue);

    let selectedStone;
    allStonesList.forEach((stone) => {
      const normalizedStoneName = normalizeString(
        stone.StoneName ? stone.StoneName : stone.StoneMainName
      );
      console.log(
        `Comparing "${normalizedStoneName}" with "${normalizedValue}"`
      );
      if (normalizedStoneName === normalizedValue) {
        selectedStone = stone;
        console.log("Match found :", stone);
      }
    });

    let StonePiecest = 0;
    

    if (selectedStone) {
      StonePiecest = 0;
    selectedStone.StonePieces !== null && selectedStone.StonePieces !== undefined
      ? selectedStone.StonePieces
      : selectedStone.StoneMainPieces !== null && selectedStone.StoneMainPieces !== undefined
      ? selectedStone.StoneMainPieces
      : 1;

      if(StonePiecest == 0){
        StonePiecest = 1;
      }
      newStones[index] = {
        ...newStones[index],
        StoneName: selectedStone.StoneName
          ? selectedStone.StoneName
          : selectedStone.StoneMainName,
        StoneWeight: selectedStone.StoneWeight
          ? selectedStone.StoneWeight
          : selectedStone.StoneMainWeight,
          StonePieces: StonePiecest,
        StoneRate: selectedStone.StoneRate
          ? selectedStone.StoneRate
          : selectedStone.StoneMainRate,
        StoneAmount: selectedStone.StoneAmount
          ? selectedStone.StoneAmount
          : selectedStone.StoneMainAmount,
        Description: selectedStone.Description
          ? selectedStone.Description
          : selectedStone.StoneMainDescription,
      };
    } else {
      newStones[index] = {
        ...newStones[index],
        [property]: value,
      };
    }

    const skuPieces = parseFloat(selectedSku?.Pieces) || 1;
    const qty = parseFloat(purchaseProduct.ClipQuantity) || 1;

    const rate = parseFloat(newStones[index].StoneWeight)*
    parseFloat(newStones[index].StoneRate);
  
    // Convert values to numbers to avoid calculation errors
    let totalwt =
      (parseFloat(newStones[index].StoneWeight) || 0) *
      // (parseFloat(newStones[index].StonePieces) || 0) *
      skuPieces *
      qty;
    let totalpcs =
      (parseFloat(newStones[index].StonePieces) || 1) * skuPieces * qty;
  
    // Assign calculated totals
    newStones[index].TotalStoneWt = totalwt;
    newStones[index].TotalStonePcs = totalpcs || 1;

    newStones[index].StoneAmount = rate;

    
    console.log("Check updated stones", StonePiecest);
    // StoneAmount

    setPurchaseProduct({ ...purchaseProduct, Stones: newStones });
    setIscal(true);
  };

  function getShapeValue(id, shape, parameter) {
    console.log("check input values  ", id, "  ", shape, "  ", parameter);
    if (id) {
      const shapeValue = allDiamondAttributes
        .filter((x) => x.DiamondAttribute == parameter)
        ?.find((item) => item.Id == id);
      return id ? shapeValue?.DiamondValue : "";
    }
    if (shape) {
      const shapeValue = allDiamondAttributes
        .filter((x) => x.DiamondAttribute == parameter)
        ?.find((item) => item.DiamondValue == shape);
      return shape ? shapeValue?.Id : "";
    }
  }

  function getDiamondClarity(id, clarity) {
    if (id) {
      const clarityValue = allDiamondAttributes
        .filter((x) => x.DiamondAttribute == "DiamondClarity")
        ?.find((item) => item.Id == id);
      return id ? clarityValue?.DiamondValue : "";
    }
    if (clarity) {
      const clarityValue = allDiamondAttributes
        .filter((x) => x.DiamondAttribute == "DiamondClarity")
        ?.find((item) => item.DiamondValue == clarity);
      return clarity ? clarityValue?.Id : "";
    }
  }

  const deleteDiamond = (index) => {
    // const updatedDiamonds = purchaseProduct.Diamonds.filter(
    //   (_, i) => i !== index
    // );

    // setPurchaseProduct({ ...purchaseProduct, Diamonds: updatedDiamonds });
    //   setPurchaseProduct((list) => ({
    //     ...list,
    //     TotalDiamondAmount: list.TotalDiamondAmount - x.DiamondPurchaseAmt,
    //     TotalDiamondQty: list.TotalDiamondQty - x.DiamondPieces,
    //     TotalDiamondWeight: list.TotalDiamondWeight - x.DiamondWeight
    // }));
    const diamondToRemove = purchaseProduct.Diamonds[index];

    // Filter out the diamond from the list
    const updatedDiamonds = purchaseProduct.Diamonds.filter(
      (_, i) => i !== index
    );

    // Update the purchase product with new diamond list and adjust totals
    setPurchaseProduct((prevState) => ({
      ...prevState,
      Diamonds: updatedDiamonds,
      TotalDiamondAmount:
        prevState.TotalDiamondAmount -
        parseFloat(diamondToRemove.DiamondPurchaseAmt || 0),
      TotalDiamondQty:
        prevState.TotalDiamondQty -
        parseInt(diamondToRemove.DiamondPieces || 0, 10),
      TotalDiamondWeight:
        prevState.TotalDiamondWeight -
        parseFloat(diamondToRemove.DiamondTotalWeight || 0),
    }));

    setIscal(true);
  };

  const handleDiamondChange = (index, property, value) => {
    const newDiamond = [...purchaseProduct.Diamonds];

    const oldproduct = { ...purchaseProduct }; //

    const selectedDiamond = allDiamondsList.find(
      (diamond) => diamond.DiamondName === value
    );
    let totalDiamondAmount = 0;
    let truncatedweight = 0;

    console.log("checkprefill  ", index, "  ", property, "  ", value);

    if (selectedDiamond) {
      newDiamond[index] = {
        ...newDiamond[index],
        DiamondName: selectedDiamond.DiamondName,
        DiamondWeight: selectedDiamond.DiamondWeight,
        DiamondRate: selectedDiamond.DiamondRate,
        DiamondPieces: selectedDiamond.DiamondPieces,
        DiamondClarity: selectedDiamond.DiamondClarity,
        DiamondColour: selectedDiamond.DiamondColour,
        DiamondCut: selectedDiamond.DiamondCut,
        DiamondShape: selectedDiamond.DiamondShape,
        DiamondSize: selectedDiamond.DiamondSize,
        Certificate: selectedDiamond.Certificate,
        SettingType: selectedDiamond.SettingType,
        DiamondAmount: selectedDiamond.DiamondAmount,
        // DiamondPurchaseAmt: selectedDiamond.DiamondPurchaseAmt,
        Description: selectedDiamond.Description, // Assuming a description field exists
      };
    } else {
      newDiamond[index] = {
        ...newDiamond[index],
        [property]: value,
      };

      if (
        property == "DiamondWeight" ||
        property == "DiamondShape" ||
        property == "DiamondClarity" ||
        property == "DiamondCut" ||
        property == "DiamondColour"
      ) {
        const diamondTemplate = allDiamondSizeWeightRate.find((template) => {
          return template.Id === diamondtampletid;
        });
        if (diamondTemplate) {
          // const shape = newDiamond[index].DiamondShape ? getShapeValue(null, newDiamond[index].DiamondShape) : null;
          // const clarity = newDiamond[index].DiamondClarity ? getDiamondClarity(null, newDiamond[index].DiamondClarity) : null;
          const shape = newDiamond[index].DiamondShape
            ? getShapeValue(
                null,
                newDiamond[index].DiamondShape,
                "DiamondShape"
              )
            : null;
          const clarity = newDiamond[index].DiamondClarity
            ? getShapeValue(
                null,
                newDiamond[index].DiamondClarity,
                "DiamondClarity"
              )
            : null;
          const color = newDiamond[index].DiamondColour
            ? getShapeValue(
                null,
                newDiamond[index].DiamondColour,
                "DiamondColour"
              )
            : null;
          const size = newDiamond[index].DiamondSize
            ? getShapeValue(null, newDiamond[index].DiamondSize, "DiamondSize")
            : null;
          const cut = newDiamond[index].DiamondCut
            ? getShapeValue(null, newDiamond[index].DiamondCut, "DiamondCut")
            : null;
          if (
            newDiamond[index].DiamondWeight &&
            newDiamond[index].DiamondWeight > 0
          ) {
            const foundData = findClosestHigherDiamondWeight(
              diamondTemplate.DiamondSizeWeightRates,
              newDiamond[index].DiamondWeight,
              shape,
              clarity,
              color,
              size,
              cut
            );

            if (foundData) {
              newDiamond[index] = {
                ...newDiamond[index],
                DiamondRate: foundData.DiamondPurchaseRate,
              };
            }
          } else {
            newDiamond[index] = {
              ...newDiamond[index],
              DiamondRate: "0",
            };
          }
        }
      }

      if (property == "DiamondPurchaseAmt") {
        const diamondTemplate = allDiamondSizeWeightRate.find((template) => {
          return template.Id === diamondtampletid;
        });
        console.log(
          "Found diamond template:",
          diamondTemplate,
          "for ID:",
          diamondtampletid
        );
        if (diamondTemplate) {
          const rates = diamondTemplate.DiamondSizeWeightRates;
          console.log("Available rates:", rates);

          const matchingRate = rates.find((rate) => {
            console.log("Checking rate:", rate);
            console.log("Comparing with:", {
              DiamondShape: newDiamond[index].DiamondShape,
              DiamondWeight: newDiamond[index].DiamondWeight,
              [property]: value,
            });

            const isMatch =
              rate.DiamondShape === newDiamond[index].DiamondShape &&
              // rate.DiamondWeight === newDiamond[index].DiamondWeight
              //  rate.DiamondCut === newDiamond[index].DiamondCut;

              console.log("Rate match result:", isMatch);
            return isMatch;
          });

          if (matchingRate) {
            newDiamond[index].DiamondRate = matchingRate.DiamondRate;
            console.log("Found matching rate:", matchingRate);
          } else {
            newDiamond[index].DiamondRate = 0; // Default value if no match found
            console.log("No matching rate found.");
          }
        } else {
          console.log("No diamond template found for IDD:", diamondtampletid);
        }
      }
      if (property == "DiamondRate") {
        newDiamond[index] = {
          ...newDiamond[index],
          DiamondRate: value,
        };
      }
      const tweight =
        newDiamond[index].DiamondWeight * newDiamond[index].DiamondPieces;

      const totalDiamondPurchaseAmount =
        tweight * newDiamond[index].DiamondRate;

      const truncatedAmount = (totalDiamondPurchaseAmount * 1000) / 1000;
      truncatedweight = (tweight * 1000) / 1000; // to get proper decimal

      newDiamond[index] = {
        ...newDiamond[index],
        DiamondPurchaseAmt: truncatedAmount,
        DiamondTotalWeight: truncatedweight,
      };
    }

    purchaseProduct.Diamonds = newDiamond;
    console.log("checkpost ", purchaseProduct.Diamonds);

    setIscal(true);
  };

  const handleAddPayment = () => {
    console.log("trigged payment ");
    addPayment({
      paymentOptions,
      paymentAmount,
      paymentGold,
      paymentSilver,
      deductGold,
      deductSilver,
      paymentType,
      metalPaymentOption,
      grandTotal,
      selectedCustomer,
      setPayments,
      setGrandTotal,
      setPaymentAmount,
      setTotalPayableGold,
      setTotalPayableSilver,
      setMessageType,
      setMessageToShow,
      setShowError,
      setPaymentDescription,
      setMetalPaymentOption,
      paymentDescription,
      payments,
      advanceType,
      advanceAmount,
      setSelectedCustomer
    });
  };

  const handleDeletePayment = (index) => {
    deletePayment({
      index,
      payments,
      setPayments,
      grandTotal,
      setGrandTotal,
      setTotalPayableGold,
      setTotalPayableSilver,
      setPaymentAmount,
      selectedCustomer,
      setSelectedCustomer
    });
  };

  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const button3Ref = useRef(null);
  const button4Ref = useRef(null);
  const button5Ref = useRef(null);
  const button6Ref = useRef(null);
  const button7Ref = useRef(null);
  const button8Ref = useRef(null);
  const button9Ref = useRef(null);
  const button10Ref = useRef(null);
  const button11Ref = useRef(null);
  const button12Ref = useRef(null);
  let totalPaidCashAmount = 0;
  useEffect(() => {
    totalPaidCashAmount = payments
      .filter((x) => x.mode == "Cash")
      .reduce((a, b) => parseInt(a) + parseInt(b.amount), 0);
  }, [payments, paymentAmount, paymentOptions]);

  console.log(allDiamondAttributes, "DiamondAttribute");

  return (
    <div>
      <AdminHeading />

      {loading ? (
        // Show spinner while loading
        <div className="spinner-container">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
          <p>Loading data...</p>
        </div>
      ) : (
        <div>
          <ErrorModal
            isOpen={showModal}
            onRequestClose={() => {
              setShowModal(false); // Close the modal
              navigate("/adminhome"); // Redirect to /adminhome
            }}
            onReload={reloadData} // Pass reload function
            message={errorMessage}
          />

          <div className="adminMainBodyBox">
            {/* <AdminBreadCrump
            title={"New Invoice"}
            companyName={"Loyalstring"}
            module={"Trading"}
            page={"Invoice"}
          /> */}
            {showError ? (
              <AlertMessage message={messageToShow} type={messageType} />
            ) : null}
            <div className="adminAddCategoryMainBox">
              <div
                style={{ marginBottom: "50px", paddingTop: "0px" }}
                className="adminAddCategoryInnerBox"
              >
                <Adminpurchasehead
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  allCsData={allCsData}
                  setAllCsData={setAllCsData}
                  customerName={customerName}
                  setCustomerName={setCustomerName}
                  handleNameInputChange={handleNameInputChange}
                  selectedCustomer={selectedCustomer}
                  setSelectedCustomer={setSelectedCustomer}
                  purchaseMainBox={allRDPurchaseMainBox}
                  invoiceNumber={invoiceNumber}
                  setInvoiceNumber={setInvoiceNumber}
                  selectedCustomerEdit={selectedCustomerEdit}
                  setSelectedCustomerEdit={setSelectedCustomerEdit}
                  scrollToCenter={scrollToCenter}
                  updateCustomerDetails={updateCustomerDetails}
                  setGstType={setGstType}
                  gstType={gstType}
                  from={"purchaseentry"}
                />

                <h4
                  id="adminInvoiceAddedCustomerEdit"
                  className="adminInvoiceAddTitles"
                >
                  Add Product
                </h4>

                <div className="adminInvoiceAddProductsOptionsTypeBox">
                  <div className="adminAddCategoryInnerBoxTitlesBox">
                    <button
                      onClick={() => {
                        resetproduct();  
                        setActive("Purchase");  // Set active state to "Purchase"
                      }}
                      style={{ height: "40px" }}
                      className={
                        active === "Purchase"
                          ? "adminAddCategoryInnerBoxTitle"
                          : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                      }
                    >
                      <div
                        style={{
                          height: "20px",
                          width: "20px",
                          padding: "3px",
                          marginInline: "3px",
                        }}
                        className={
                          active === "Purchase"
                            ? "adminAddCategoryInnerBoxTitleLogo"
                            : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                        }
                      >
                        {/* 02 */}

                        <LiaCartPlusSolid size={"30px"} />
                      </div>
                      <p style={{ fontSize: "12px" }}>Purchase</p>
                    </button>
                    <button
                      onClick={() => setActive("P Accounting")}
                      style={{ height: "40px" }}
                      className={
                        active === "P Accounting"
                          ? "adminAddCategoryInnerBoxTitle"
                          : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                      }
                    >
                      <div
                        style={{
                          height: "20px",
                          width: "20px",
                          padding: "3px",
                          marginInline: "3px",
                        }}
                        className={
                          active === "P Accounting"
                            ? "adminAddCategoryInnerBoxTitleLogo"
                            : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                        }
                      >
                        {/* 02 */}

                        <MdOutlineLabelOff size={"17px"} />
                      </div>
                      <p style={{ fontSize: "12px" }}>P Accounting</p>
                    </button>
                    <div className="bulkStockAddProductDetailsItem">
                      <label style={{ margin: 0, cursor: "pointer" }}>
                        {/* Images {`${selectedFiles.length}`} */}
                        <BsImages
                          className="bulkStockAddProductAddImagesIcon"
                          style={{ margin: "1.2rem", marginInline: "1rem" }}
                          size={"2.5rem"}
                        />
                        <input
                          id="images"
                          style={{ display: "none" }}
                          type="file"
                          multiple
                          onChange={handleFileInputChange}
                        />
                      </label>
                      <label> Images {`${selectedFiles.length}`}</label>
                    </div>
                  </div>
                </div>
                {active === "Sell" ? (
                  <AdminPurchseitemview
                    filteredPurities={filteredPurities}
                    productsLoading={productsLoading}
                    allSelectedProducts={allSelectedProducts}
                    labelName={labelName}
                    handleProductLabelChange={handleProductLabelChange}
                    selectedProduct={selectedProduct}
                    totalPayableAmount={totalPayableAmount}
                    openEditBox={openEditBox}
                    removePurchaseProductFromList={
                      removePurchaseProductFromList
                    }
                    setPurchaseProduct={setPurchaseProduct}
                    getShapeValue={getShapeValue}
                    getDiamondClarity={getDiamondClarity}
                    getDiamondColor={getDiamondColor}
                    getDiamondCut={getDiamondCut}
                    getSettingType={getSettingType}
                    setActive={setActive}
                    setConvertAmount={setConvertAmount}
                    setFinePure={setFinePure}
                    setSelectedSkuName={setSelectedSkuName}
                    selectedSkuName={selectedSkuName}
                    setIsitemedit= {setIsitemedit}
                  />
                ) : active === "Purchase" ? (
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
                                onInput={handleSkuInputChange}
                                list="skuList"
                                autoComplete="off"
                              />
                              <datalist id="skuList">
                                {(selectedCustomer
                                  ? allSkuList.filter((sku) =>
                                      sku.SKUVendor.some(
                                        (vendor) =>
                                          vendor.VendorId ===
                                          selectedCustomer.Id
                                      )
                                    )
                                  : allSkuList
                                ) // If no vendor is selected, show all SKUs
                                  .map((sku, index) => (
                                    <option
                                      key={index}
                                      value={`${sku.StockKeepingUnit}`}
                                    />
                                  ))}
                              </datalist>
                              {/* <datalist id="skuList">
                            {allSkuList.map((sku, index) => (
                              <option
                                key={index}
                                value={`${sku.StockKeepingUnit}`}
                              />
                            ))}
                          </datalist> */}
                            </div>
                            <div>
                              <th>CATEGORY</th>
                              <select
                                name="CategoryId"
                                // onChange={handleInputChangePurchase}
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
                                    <option
                                      key={y}
                                      value={`${x.Id},${x.CategoryName}`}
                                    >
                                      {x.CategoryName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            {purchaseProduct.CategoryName &&
                            purchaseProduct.CategoryName.toLowerCase() ==
                              "diamonds" ? (
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
                                  <option value={""}>
                                    Select an Base Metal
                                  </option>
                                  {allCategories.map((x, y) => {
                                    return (
                                      <option
                                        key={y}
                                        value={`${x.Id},${x.CategoryName}`}
                                      >
                                        {x.CategoryName}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            ) : null}

                            {purchaseProduct.CategoryName &&
                            purchaseProduct.CategoryName.toLowerCase() ==
                              "loose diamond" ? (
                              <LooseDiamonds
                                purchaseProduct={purchaseProduct}
                                handleInputChangePurchase={
                                  handleInputChangePurchase
                                }
                                allDiamondSizeWeightRate={
                                  allDiamondSizeWeightRate
                                }
                                allDiamondAttributes={allDiamondAttributes}
                              />
                            ) : (
                              <>
                                <div>
                                  <th>PRODUCT</th>
                                  <select
                                    name="ProductName"
                                    onChange={(e) => {
                                      setSelectedProductType(e.target.value),
                                        handleInputChangePurchase(e);
                                    }}
                                    // value={purchaseProduct.ProductNames}
                                    // value={purchaseProduct.ProductName}
                                    // value={selectedProductType}
                                    value={`${purchaseProduct.ProductId},${purchaseProduct.ProductName}`}
                                  >
                                    <option value={""}>
                                      Select an Product
                                    </option>
                                    {filteredProducts.map((x) => {
                                      return (
                                        <option
                                          value={`${x.Id},${x.ProductName}`}
                                        >
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
                                    disabled={purchaseProduct.Stones.length > 0}
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
                                    name="PurityId"
                                    onChange={handleInputChangePurchase}
                                    value={purchaseProduct.PurityId}
                                  >
                                    <option value=""> Select an Option</option>
                                    {filteredPurities.map((x) => {
                                      return (
                                        <option value={x.Id}>
                                          {" "}
                                          {x.PurityName}
                                        </option>
                                      );
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
                                {/* <div>
                              <th>WASTAGE%</th>
                              <div className="adminPurchaseEntryDollarSignBox">
                                <MdChangeCircle
                                  className="adminPurchaseEntryDollarSign"
                                  onClick={() => 
                                    {
                                      setFinePure(!finePure)
                                    
                                      setIscal(true)
                                    }}
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
                            </div> */}

                                <div>
                                  <th>WASTAGE%</th>
                                  <div className="adminPurchaseEntryDollarSignBox">
                                    <MdChangeCircle
                                      className="adminPurchaseEntryDollarSign"
                                      onClick={() => {
                                        setFinePure(!finePure);
                                        setIscal(true);
                                        setUserEditedFields((prev) => ({...prev,['finePure']: true, // Mark this field as edited
  }));
                                      }}
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
                                      value={
                                        adminLoggedIn.Designation ===
                                        "Branch Head"
                                          ? "*****" // Show '*****' or 'START' instead of the actual value
                                          : purchaseProduct.WastageWt
                                      }
                                      disabled={
                                        adminLoggedIn.Designation ===
                                        "Branch Head"
                                      } // Disable for 'Branch Head'
                                    />

                                    {/* Hidden field to retain functionality if required */}
                                    {adminLoggedIn.Designation ===
                                      "Branch Head" && (
                                      <input
                                        type="hidden"
                                        name="WastageWtHidden"
                                        value={purchaseProduct.WastageWt}
                                      />
                                    )}
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
                                      <th>FIXED WASTAGE WT</th>
                                      <input
                                        name="MakingFixedWastage"
                                        onChange={handleInputChangePurchase}
                                        type="text"
                                        value={
                                          purchaseProduct.MakingFixedWastage
                                        }
                                      />
                                    </div>
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
                                          onClick={() => {
                                            setIscal(true);
                                            setConvertAmount(!convertAmount);
                                          }}
                                          size={"15px"}
                                          style={{
                                            cursor: "pointer",
                                            color: convertAmount
                                              ? "green"
                                              : "grey",
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
                                        value={
                                          purchaseProduct.TotalDiamondAmount
                                        }
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
                                    style={{
                                      cursor: "not-allowed",
                                      color: "grey",
                                    }}
                                    name="FineWt"
                                    // onChange={handleInputChangePurchase}
                                    type="text"
                                    readOnly
                                    value={parseFloat(
                                      purchaseProduct.FineWt
                                    ).toFixed(3)}
                                  />
                                </div>

                                <div>
                                  <th>F WT + W WT</th>
                                  <input
                                    style={{
                                      cursor: "not-allowed",
                                      color: "grey",
                                    }}
                                    name="FineWastageWt"
                                    readOnly
                                    // onChange={handleInputChangePurchase}
                                    type="text"
                                    value={parseFloat(
                                      purchaseProduct.FineWastageWt
                                    ).toFixed(3)}
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
                                  <th>ADD TO UNLABEL</th>

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
                                        AddToUnlabelled:
                                          !purchaseProduct.AddToUnlabelled,
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
                                    onClick={() =>
                                      setShowAllFields(!showAllFields)
                                    }
                                  >
                                    {!showAllFields ? "Show All" : "Show Less"}
                                  </h5>
                                </div>
                                <div className="adminPurchaseEntryAddStoneDiamondOptionBox">
                                  <div className="adminPanelLoginFormRegisterBox">
                                    <th
                                      onClick={() => {
                                        setShowAddStoneBox(true);
                                        if (
                                          !purchaseProduct.Stones.length > 0
                                        ) {
                                          setPurchaseProduct(
                                            (previousState) => ({
                                              ...previousState,
                                              Stones: [
                                                ...previousState.Stones,
                                                addStone,
                                              ],
                                            })
                                          );
                                        }
                                      }}
                                    >
                                      <IoMdAddCircleOutline
                                        style={{
                                          marginRight: "5px",
                                          color: "#02a8b5",
                                        }}
                                        size={"18px"}
                                      />
                                      STONE - [{purchaseProduct.Stones.length}]{" "}
                                    </th>
                                  </div>
                                  <div className="adminPanelLoginFormRegisterBox">
                                    <th
                                      // onClick={() => customerName ? setShowAddDiamondBox(true) : null}
                                      onClick={() => {
                                        if (customerName) {
                                          setShowAddDiamondBox(true);
                                          if (
                                            !purchaseProduct.Diamonds.length > 0
                                          ) {
                                            setPurchaseProduct((prevState) => ({
                                              ...prevState,
                                              Diamonds: [
                                                ...prevState.Diamonds,
                                                addDiamond,
                                              ],
                                            }));
                                          }
                                        }
                                      }}
                                      style={{
                                        cursor: customerName
                                          ? "pointer"
                                          : "default",
                                        opacity: customerName ? "1" : "0.5",
                                      }}
                                    >
                                      <IoMdAddCircleOutline
                                        style={{
                                          marginRight: "5px",
                                          color: "#02a8b5",
                                        }}
                                        size={"18px"}
                                      />
                                      DIAMOND - [
                                      {purchaseProduct.Diamonds.length}]{" "}
                                    </th>
                                  </div>
                                  {/* <input
                                style={{
                                  backgroundColor: "#02a8b5",
                                  color: "white",
                                  cursor: "pointer",
                                }}
                                value={"Add"}
                                type="button"
                                onClick={() => setShowAddStoneBox(true)}
                              /> */}
                                  {/* <button>Add</button> */}
                                </div>
                                {/* <div>
                              <th>
                                DIAMOND - [{purchaseProduct.Diamonds.length}{" "}
                                added]
                              </th>
                              <input
                                style={{
                                  backgroundColor: "#02a8b5",
                                  color: "white",
                                  cursor: "pointer",
                                }}
                                value={"Add"}
                                type="button"
                                onClick={() => setShowAddDiamondBox(true)}
                              />
                            </div> */}
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
                                {/* <div style={{ gridColumn: "span 6" }}>
                                                            <h4 style={{ margin: "5px" }}>
                                                                Diamond {index + 1}
                                                            </h4>
                                                        </div> */}

                                <DiamondEntryComponent
                                  key={index}
                                  index={index}
                                  diamond={x}
                                  allDiamondAttributes={allDiamondAttributes}
                                  allDiamondSizeWeightRate={
                                    allDiamondSizeWeightRate
                                  }
                                  handleDiamondChange={handleDiamondChange}
                                  deleteDiamond={deleteDiamond}
                                  addDiamond={() =>
                                    setPurchaseProduct((prevState) => ({
                                      ...prevState,
                                      Diamonds: [
                                        ...prevState.Diamonds,
                                        addDiamond,
                                      ],
                                    }))
                                  }
                                  from={"purchase"}
                                />
                                {/* <button
                                                            id="bulkStockAddProductImportButton"
                                                            onClick={() =>
                                                                setPurchaseProduct((previousState) => ({
                                                                    ...previousState,
                                                                    Diamonds: [
                                                                        ...previousState.Diamonds,
                                                                        addDiamond,
                                                                    ],
                                                                }))
                                                            }
                                                            className="close-btn"
                                                        >
                                                            Add Diamond
                                                        </button> */}
                              </div>
                            ))}
                            {!purchaseProduct.Diamonds.length > 0 ? (
                              <button
                                id="bulkStockAddProductImportButton"
                                onClick={() =>
                                  setPurchaseProduct((previousState) => ({
                                    ...previousState,
                                    Diamonds: [
                                      ...previousState.Diamonds,
                                      addDiamond,
                                    ],
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
                      style={{
                        justifyContent: "flex-start",
                        margin: "20px 0px",
                      }}
                      className="adminInvoiceAddProductsOptionsMainPurchaseItems"
                    >
                      <button
                        onClick={() =>
                          addPurchaseProductToList(purchaseProduct)
                        }
                      >
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
                ) : (
                  <div>
                    <p>P Accounting</p>
                  </div>
                )}

                <Adminpurchasepaymentbox
                  paymentType={paymentType}
                  button2Ref={button2Ref}
                  paymentOptions={paymentOptions}
                  paymentDescription={paymentDescription}
                  paymentAmount={paymentAmount}
                  button3Ref={button3Ref}
                  button4Ref={button4Ref}
                  button5Ref={button5Ref}
                  payments={payments}
                  totalPayableGold={totalPayableGold}
                  totalPayableSilver={totalPayableSilver}
                  allProdctsNetAmount={allProdctsNetAmount}
                  discountAmount={discountAmount}
                  gstType={gstType}
                  totalPayableGstAmount={totalPayableGstAmount}
                  button1Ref={button1Ref}
                  totalPayableAmount={totalPayableAmount}
                  totalPaidAmount={totalPaidAmount}
                  grandTotal={grandTotal}
                  setPaymentAmount={setPaymentAmount}
                  totalPaidCashAmount={totalPaidCashAmount}
                  handleAddPayment={handleAddPayment}
                  handleDeletePayment={handleDeletePayment}
                  setPaymentType={setPaymentType}
                  setPaymentOptions={setPaymentOptions}
                  advanceType={advanceType}
                  advanceAmount={advanceAmount}
                  setAdvanceType={setAdvanceType}
                  selectedCustomer={selectedCustomer}
                  metalPaymentOption={metalPaymentOption}
                  setPaymentDescription={setPaymentDescription}
                  setGstType={setGstType}
                  handleMetalPaymentOption={handleMetalPaymentOption}
                  setAdvanceAmount={setAdvanceAmount}
                  setConvertAmount= {setConvertAmount}
                  convertAmount={convertAmount}
                  setIscal={setIscal}
                  setDiscountAmount={setDiscountAmount}
                  from={"purchaseentry"}
                />

                <div className="adminInvoiceMainSaveButtonBox">
                  {!savingInvoice ? (
                    <button
                      tabIndex="10"
                      ref={button9Ref}
                      style={{ marginInline: "10px" }}
                      disabled={issubmit}
                      onClick={() => {
                        if (
                          selectedCustomer &&
                          allSelectedProducts.length > 0
                        ) {
                          console.log("clicked");
                          // createOrder();
                          setIssubmit(true);
                          handleSubmit();
                        } else {
                          alert("Please add all details");
                        }
                      }}
                    >
                      Save
                    </button>
                  ) : null}
                  <button
                    tabIndex="11"
                    ref={button10Ref}
                    style={{ marginInline: "10px" }}
                    onClick={() => resetAllFields()}
                  >
                    Reset{" "}
                  </button>
                  <button
                    tabIndex="11"
                    ref={button10Ref}
                    style={{ marginInline: "10px" }}
                    onClick={() => navigate("/purchase")}
                  >
                    Purchase List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
