import React, { useEffect, useRef, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminTrading.css";
import {
  a154,
  a155,
  a156,
  a157,
  a158,
  a161,
  a163,
  a164,
  a165,
  a166,
  a167,
  a174,
  a18,
  a191,
  a194,
  a20,
  a22,
  a28,
  a4,
  a40,
  a41,
  a48,
  a49,
  a51,
  a53,
  a56,
  a57,
  a59,
  a61,
  a64,
  a65,
  a66,
  a71,
  a74
} from "../../../Api/RootApiPath";
import { AiOutlineEdit, AiOutlinePlusSquare } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BsCardImage } from "react-icons/bs";
import jsPDF from "jspdf";
import logoImage from "../../../Images/soniJewellersBillTitle.jpg";
import { GiCheckMark } from "react-icons/gi";
import { AiOutlineSend } from "react-icons/ai";
import { LiaCartPlusSolid } from "react-icons/lia";
import { MdOutlineLabelOff } from "react-icons/md";
import { numberToIndianWords } from "../../../Other Functions/numberToIndianWords";
import DateTime from "../../../Other Functions/DateTime";
import { FaDollarSign } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { BsImages } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AlertMessage from "../../../Other Functions/AlertMessage";
import DiamondEntryComponent from "../../../support/purchasesupport/Diamondpopup";
import ProductCalculator from "../../../support/calculations/ProductCalculator.jsx";
import StonePopup from "../../../support/purchasesupport/StonePopup.jsx";
import LooseDiamonds from "../../../support/purchasesupport/LooseDiamonds.jsx";
import GetApiService from "../../../Api/getapiService";
import { createOrder } from "../../../Api/postapiservice";
import {
  addPayment,
  deletePayment,
  handlePaymentOption,
} from "../../../support/purchasesupport/usePayment1";
import { handleallitemscal } from "../../../support/purchasesupport/Calculations";
import Adminpurchasehead from "../../../support/purchasecomponent/purchasehead.jsx";
import Adminopeneditbox from "../../../support/purchasecomponent/openeditbox.jsx";
import PurchaseFields from "../../../support/purchasecomponent/Purchasefields.jsx";
import AdminPurchseitemview from "../../../support/purchasecomponent/PurchaseItemview.jsx";
import Adminpurchasepaymentbox from "../../../support/purchasecomponent/purchasepaymentbox.jsx";
import { ClipLoader } from "react-spinners";
import purchase from "../../../../cssfiles/purchase.css"




export default function AdminPurchaseEntryEditn() {
    const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [purityType, setPurityType] = useState("");
  const [productQty, setProductQty] = useState("");
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [barcode, setBarcode] = useState("");
  const [allProdctsGstAmount, setAllProdctsGstAmount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [orderItemsData, setOrderItemsData] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [orderCsData, setOrderCsData] = useState([]);
  const [oldGoldAmount, setOldGoldAmount] = useState(0);

  const [allCsData, setAllCsData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCustomerEdit, setSelectedCustomerEdit] = useState(false);
  const [purchaseMainBox, setPurchaseMainBox] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");

  //   const [addNewCustomer, setAddNewCustomer] = useState(false);

  const [customerMobile, setCustomerMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [labelName, setLabelName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [allSelectedProducts, setAllSelectedProducts] = useState([]);
  const [showAllFields, setShowAllFields] = useState(false);
  const [allProdctsNetAmount, setAllProdctsNetAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalPayableGstAmount, setTotalPayableGstAmount] = useState(0);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [productsLoading, setProductsLoading] = useState(true);
  const [openEditBox, setOpenEditBox] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);

  const [totalPayableGold, setTotalPayableGold] = useState(0);
  const [totalPayableSilver, setTotalPayableSilver] = useState(0);
  const [paymentOptions, setPaymentOptions] = useState("Cash");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [payments, setPayments] = useState([]);
  const [opayments, setOPayments] = useState([]);
  const [active, setActive] = useState("Purchase");
  const [convertAmount, setConvertAmount] = useState(true);
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

  const [allSkuList, setAllSkuList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [paymentDescription, setPaymentDescription] = useState("");
  const [showAddStoneBox, setShowAddStoneBox] = useState(false);
  const [showAddDiamondBox, setShowAddDiamondBox] = useState(false);
  const [allStonesmasterList, setAllStonesmasterList] = useState([]);
  const [allStonesList, setAllStonesList] = useState([]);
  const [allDiamondsList, setAllDiamondsList] = useState([]);
  const [finePure, setFinePure] = useState(false);
  const [diamondShapes, setDiamondShapes] = useState([]);
  const [diamondClarities, setDiamondClarities] = useState([]);
  const [diamondColors, setDiamondColors] = useState([]);
  const [diamondCuts, setDiamondCuts] = useState([]);
  const [settingTypes, setSettingTypes] = useState([]);
  const [diamondtampletid, setDiamondtampletid] = useState(0);

  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [savingInvoice, setSavingInvoice] = useState(false);
  const [allDiamondAttributes, setAllDiamondAttributes] = useState([]);
  const [allDiamondSizeWeightRate, setAllDiamondSizeWeightRate] = useState([]);
  const [iscal, setIscal] = useState(false);
  const [allcal, setAllcall] = useState(false);
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

  const [gstType, setGstType] = useState(false);
  const [advanceType, setAdvanceType] = useState("Advance Received");
  const [advanceAmount, setAdvanceAmount] = useState(0);

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
    DiamondSleve: "",
    DiamondTotalQuantity: "",
    DiamondTotalWeight: "",
    DiamondSettingType: "",
    DiamondCertificate: "",
    DiamondPurchaseAmount: "0",
    DiamondSellAmount: "0",
    DiamondDescription: "",
    TotalDiamondQty: 0,
    TotalDiamondWeight: "",
    TotalDiamondAmount: 0,
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
  const [purchaseEntryNo, setPurchaseEntryNo] = useState(0);
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

  const [allVendorTounche, setAllVendorTounche] = useState([]);
  // console.log(allSelectedProducts, "allSelectedProduct");
  //   useEffect(() => {
  //     fetch(a1)
  //       .then((res) => res.json())
  //       .then((response) => {
  //         setAllCsData(response.data);
  //       });
  //   }, []);
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const CompanyId = adminLoggedIn.CompanyId;
  const CounterId = adminLoggedIn.CounterId;
  const BranchId = adminLoggedIn.BranchId;
  const EmployeId = adminLoggedIn.EmployeId;
  const employeeCode = adminLoggedIn.EmployeeCode;
  const [searchParams] = useSearchParams();

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
              setAllSkuList(result.value);
              break;
            case 3:
              setAllCategories(result.value);
              break;
            case 4:
              setAllProductTypes(result.value);
              break;
            case 5:
              setAllPurities(result.value);
              break;
            case 6:
                setAllStonesmasterList(result.value);
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
          // Handle error
          console.error(
            `Error loading data for API ${index + 1}:`,
            result.reason
          );
        }
      });
    } catch (error) {
      console.error("Error loading data:", error);
    }finally {
        setLoading(false); // Hide the progress bar once API calls are done
      }
  };

  useEffect(() => {
    loadData();
  }, [clientCode]);

  useEffect(() => {
    async function fetchData() {
      const entryNo = searchParams.get("purchaseEntryNo");
      setPurchaseEntryNo(entryNo);

      if (entryNo !== 0 && allCsData.length > 0) {
        await getRDPurchaseById(entryNo);
      }
    }

    fetchData();
  }, [searchParams, allCsData]);

  const getRDPurchaseById = async (id) => {
    const formData = {
      ClientCode: clientCode,
      Id: id,
    };
    try {
      const response = await fetch(a161, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPurchaseMainBox(data);

      const selectedVendor = allCsData.find((x) => x.Id === data.VendorId);
      setSelectedCustomer(selectedVendor);
      setDiamondtampletid(selectedVendor.DiamondSizeWeightRateTemplateId);
      if (data.GSTApplied == "true") {
        setGstType(true);
      } else {
        setGstType(false);
      }
      setSelectedDate(data.PurchaseDate);
      setInvoiceNumber(data.InvoiceNo ? data.InvoiceNo : "");
      // setGrandTotal(data.BalanceAmount);
      getAllPurchaseItemsById(id, data);
      console.log(data, "PurchaseMainBox at edit");
      console.log(selectedCustomer, "selectedCustomer at edit");
    } catch (error) {
      console.error("Failed to fetch purchase data:", error);
    }
  };

  useEffect(() => {
    if (allSelectedProducts && allSelectedProducts?.length !== 0) {
      allSelectedProducts.map((item) => {
        let selectedSkuItem = [];
        selectedSkuItem = allSkuList.find(
          (x) => x.StockKeepingUnit == item?.StockKeepingUnit
        );
        setSelectedSku(selectedSkuItem);
      });
    }

    // console.log("checking all items  ", allSelectedProducts);
  }, [allSelectedProducts, allSkuList]);

  const getAllPurchaseItemsById = async (id, mainBoxData) => {
    const formData = {
      ClientCode: clientCode,
      RDPurchaseId: id,
    };
    try {
      const response = await fetch(a164, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      const modifiedData = data.map((item) => {
        let newItem = { ...item };

        let tgst = newItem.TotalItemAmt * 0.03;
        console.log('checking itemsreterived ',newItem )

        newItem.TotalGstAmount = tgst;

        newItem.FinalPrice = parseFloat(newItem.TotalItemAmt);
        newItem.BalanceGold = parseFloat(newItem.FineGoldWt || 0);
        // newItem.FineGoldWt
        //   ? parseFloat(newItem.FineGoldWt)
        //   : 0;
        newItem.BalanceSilver = newItem.FineSilverWt
          ? parseFloat(newItem.FineSilverWt)
          : 0;
        newItem.toAmount =
          parseFloat(newItem.FineGoldWt).toFixed(2) == 0.0 &&
          parseFloat(newItem.FineSilverWt).toFixed(2) == 0.0 &&
          parseFloat(newItem.FineOtherMetalWt).toFixed(2) == 0.0
            ? true
            : false;

        newItem.Making =
          parseFloat(newItem.MakingFixedAmt || 0) +
          parseFloat(newItem.MakingFixedWastage || 0) +
          parseFloat(newItem.MakingPerGram || 0) +
          parseFloat(newItem.MakingPercentage || 0);

        // newItem.FinalPrice =
        // newItem.MRP && newItem.MRP !== "" && newItem.MRP !== "0"
        //   ? newItem.MRP
        //   : parseFloat(newItem.FineGoldWt).toFixed(3) === "0.00" &&
        //     parseFloat(newItem.FineSilverWt).toFixed(3) === "0.00" &&
        //     parseFloat(newItem.FineOtherMetalWt).toFixed(3) === "0.00"
        //     ? (parseFloat(tmaking) + parseFloat(tdiaamount) + parseFloat(tstone)).toFixed(3)
        //     : (parseFloat(fineRate) + parseFloat(tmaking) + parseFloat(tdiaamount) + parseFloat(tstone)).toFixed(3);

        console.log("checking newitemdata  ", newItem);
        return newItem;
      });

      // Set state with the modified data
      setAllSelectedProducts(modifiedData);
      setActive("Sell");

      console.log(data, "PurchaseItems at");
      getAllPaymentsById(id, mainBoxData);

      setIscal(true);
    } catch (error) {
      console.error("Failed to fetch purchase data:", error);
    }
  };
  const [allPaymentsList, setAllPaymentsList] = useState([]);
  const getAllPaymentsById = async (id, mainBoxData) => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a165, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      let filteredPaymentsList = data.filter((x) => x.RDPurchaseId == id);
      setAllPaymentsList(filteredPaymentsList);
      const modifiedData = filteredPaymentsList.map((item) => {
        // Destructure the properties you need from each item
        const {
          Amount,
          FineGold,
          FineSilver,
          GoldAmount,
          GoldRate,
          Description,
          TransactionType,
          SilverAmount,
          SilverRate,
          PaymentModeType,
          Id,
          CreatedOn,
        } = item;

        // Construct a new object for each item
        let newItem = {
          amount: Amount,
          deductGold: PaymentModeType === "Cash to Metal" ? FineGold : 0,
          deductSilver: PaymentModeType === "Cash to Metal" ? FineSilver : 0,
          fineGold: FineGold,
          fineSilver: FineSilver,
          goldAmount: GoldAmount,
          goldRate: GoldRate,
          paymentDescription: Description,
          paymentType: TransactionType,
          silverAmount: SilverAmount,
          silverRate: SilverRate,
          mode: PaymentModeType,
          Id: Id,
          CreatedOn: CreatedOn,
        };

        return newItem;
      });
      let totalPaidAmount = modifiedData.reduce((accumulator, current) => {
        // Parse the amount as a float; if it's NaN, use 0 instead.
        const parsedAmount = parseFloat(current.amount) || 0;
        return accumulator + parsedAmount;
      }, 0);
      // if (mainBoxData.GSTApplied == "true") {
      //   setGstType(true);
      // } else {
      //   setGstType(false);
      // }
      
      // calculateTotalAmount();
      setPayments(modifiedData);
      setOPayments(modifiedData);

      console.log("selectedpayments  ", payments);
      console.log(data, "allPaymentsList");
    } catch (error) {
      console.error("Failed to fetch purchase data:", error);
    }

    setTotalPayableGold(mainBoxData.BalanceGold);
      setTotalPayableSilver(mainBoxData.BalanceSilver);
      setTotalPayableGstAmount(mainBoxData.TotalGSTAmount);

      setAllProdctsNetAmount(mainBoxData.TotalNetAmount);
      setAllProdctsGstAmount(mainBoxData.TotalGSTAmount);
      setTotalPayableAmount(
        isNaN(mainBoxData.TotalPurchaseAmount) || mainBoxData.TotalPurchaseAmount === null 
          ? 0 
          : mainBoxData.TotalPurchaseAmount
      );

      setGrandTotal(mainBoxData.BalanceAmount);
      setPaymentAmount(mainBoxData.BalanceAmount);
      setDiscountAmount(mainBoxData.Discount);

  };
  // console.log(allPaymentsList, "paymentsList");
  // console.log(allPaymentsList, "paymentsList");
  // console.log(payments, "payments");
  // console.log(purchaseEntryNo, "purchaseEntryNo");
  console.log(purchaseMainBox, "purchaseMainBox");
  // console.log(selectedCustomer, "selectedCustomer");

  const [selectedSku, setSelectedSku] = useState([]);
  const [selectedSkuName, setSelectedSkuName] = useState("");

  

  const handleSkuInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSelectedSkuName(value);
    let selectedSkuItem = [];
    selectedSkuItem = allSkuList.find((x) => x.StockKeepingUnit == value);
    // if (selectedSkuItem) {
    setSelectedSku(selectedSkuItem);
    console.log(selectedSkuItem, "selectedSkuItem");
    console.log(selectedSkuItem, "selectedSkuItem");
    console.log(selectedSkuItem, "selectedSkuItem");
    // setSelectedCategory(selectedSkuItem.category);
    // setSelectedProductType(selectedSkuItem.productType);
    // }
  };
  // useEffect(() => {
  //   fetchAllProducts();
  // }, []);

//   useEffect(() => {
//     if (!selectedSkuName) {
//       apiService.fetchAllStonesList();
//     }
//   }, [selectedSkuName]);

  const navigate = useNavigate();
  console.log(selectedSku, "selectedSku");
  


   //when sku selected
   useEffect(() => {
    if(isitemedit){
    if (selectedSku && selectedSkuName) {
      console.log(selectedSku, " sdjsdbn jkds jhd jkds ddjsd ");
      // setAllStonesList(selectedSku.SKUStoneMain);
      if (selectedSku.SKUStoneMain && Array.isArray(selectedSku.SKUStoneMain)) {
        const normalizedStones = selectedSku.SKUStoneMain.map(stone => ({
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
        console.log('checking pro filter3', allStonesList, '  g   ', normalizedStones);
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

      setAllStonesList(allStonesmasterList);
    }
    setIscal(true);
  }
  }, [selectedSku, selectedSkuName, isitemedit]);

  console.log(allPurities, "allPurities");

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
      setDiamondtampletid(selectedCustomer.DiamondSizeWeightRateTemplateId);
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
    }
    setSelectedCustomerEdit(false);
    setSelectedCustomer(selected); // Update the selected customer based on name match
    setDiamondtampletid(selected.DiamondSizeWeightRateTemplateId);
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
      parseFloat(selectedProduct.DiamondAmount);
    let GSTAdded = parseFloat(GST) * parseFloat(grossTotalRate);
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

      console.log('checkpoint1 ', totalMakingCharges)

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

  useEffect(() => {
    if (selectedProduct.length > 0) {
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
    console.log("checking allproducts ", allSelectedProducts);
    if (allSelectedProducts.length > 0) {
      let totalpaid = payments.reduce(
        (total, payment) => total + parseFloat(payment.amount),
        0
      );
      console.log("checking allpayments  ", totalpaid);

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

      let totalAmountPaying =
        allSelectedProducts.at(0).CategoryName === "LOOSE DIAMOND"
          ? allSelectedProducts.reduce(
              (total, product) =>
                total +
                parseFloat(product.DiamondAmount) +
                (gstType ? parseFloat(product.TotalGstAmount) : 0),
              0
            )
          : allSelectedProducts.reduce(
              (total, product) =>
                total +
                parseFloat(product.FinalPrice) +
                (gstType ? parseFloat(product.TotalGstAmount) : 0),
              0
            );

      let totalGold = allSelectedProducts.reduce(
        (total, product) => total + parseFloat(product.BalanceGold||0),
        0
      );

      console.log('checkbalance 1  ',allSelectedProducts)

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
      setGrandTotal(parseFloat(totalAmountPaying - totalpaid).toFixed(3));
      setTotalPayableAmount(parseFloat(totalAmountPaying).toFixed(3));
      setPaymentAmount(
        Math.abs(parseFloat(totalAmountPaying - totalpaid).toFixed(3))
      );
    } else {
      setAllProdctsNetAmount(0); // Reset the total to 0 when there are no selected products
      setAllProdctsGstAmount(0); // Reset the total to 0 when there are no selected products
      setTotalPayableGstAmount(0);
      setGrandTotal(0);
      setDiscountAmount(0);
      setOldGoldAmount(0);
      setTotalPayableGold(0);
      setTotalPayableSilver(0);
      setTotalPayableAmount(0);
      setPaymentAmount(0);
    }
  };
  useEffect(() => {
    calculateNetAmount();
    // setPayments([]);
  }, [selectedProduct, allSelectedProducts, gstType]);

  console.log(deductGold, "deductGold");
  console.log(deductGold, "deductGold");

  const changeTotalPrice = (e) => {
    const newTotalPayableAmount = parseFloat(e.target.value);
    if (!isNaN(newTotalPayableAmount)) {
      // Calculate remaining balance after deducting paid amount
      const remainingAmount = newTotalPayableAmount - totalPaidAmount;

      if (gstType) {
        // Calculate the new taxable and GST amounts based on the remaining balance
        const perRemainingAmount = remainingAmount / 103;
        const gstAmount = (perRemainingAmount * 3).toFixed(2);
        const taxableAmount = (perRemainingAmount * 100).toFixed(2);
        setTotalPayableGstAmount(gstAmount);
        setAllProdctsNetAmount(taxableAmount);
      } else {
        setTotalPayableGstAmount(0);
        setAllProdctsNetAmount(remainingAmount.toFixed(2));
      }

      setTotalPayableAmount(newTotalPayableAmount.toFixed(2));
      setPaymentAmount(Math.abs(remainingAmount.toFixed(3)));
      setGrandTotal(newTotalPayableAmount.toFixed(2));

      let totalAmountPaying = allSelectedProducts.reduce(
        (total, product) =>
          total +
          parseFloat(product.FinalPrice) +
          (gstType ? parseFloat(product.TotalGstAmount) : 0),
        0
      );

      setDiscountAmount((totalAmountPaying - newTotalPayableAmount).toFixed(2));
      setDeductGold(0);
      setDeductSilver(0);
    } else {
      setTotalPayableAmount(0);
    }
  };

  const changeTotalPrice1 = (e) => {
    const totalPaymentAmount =
      payments.length > 0
        ? payments.reduce((a, b) => parseFloat(a) + parseFloat(b.amount), 0)
        : 0;
    const newTotalPayableAmount =
      parseFloat(e.target.value) - parseFloat(totalPaymentAmount) > 0
        ? parseInt(parseFloat(e.target.value) - parseFloat(totalPaymentAmount))
        : parseFloat(e.target.value);
    // console.log("TotalPayAmt", totalPayableAmount);
    // console.log("NewTotalPayAmt", newTotalPayableAmount);
    const perTotalPayableAmount = newTotalPayableAmount / 103;
    if (gstType) {
      setTotalPayableGstAmount((perTotalPayableAmount * 3).toFixed(3));

      setTotalPayableAmount(e.target.value);
      // setTotalPayableAmount(
      //   parseFloat(e.target.value) - parseFloat(totalPaidAmount)
      // );
      // setOldGoldAmount(0);
      setPaymentAmount(newTotalPayableAmount);
      // setPayments((currentPayments) =>
      //   currentPayments.filter((payment) => payment.Id !== undefined)
      // );
      setAllProdctsNetAmount((parseInt(newTotalPayableAmount) * 100) / 103);

      let totalAmountPaying = allSelectedProducts.reduce(
        (total, product) =>
          total +
          parseFloat(product.FinalPrice) +
          parseFloat(product.TotalGstAmount),
        0
      );

      setDiscountAmount(parseInt(totalAmountPaying) - parseInt(e.target.value));
      setGrandTotal(newTotalPayableAmount);
      setDeductGold(0);
      setDeductSilver(0);
      // calculateNetAmount();
    } else {
      setTotalPayableGstAmount(0);
      setTotalPayableAmount(e.target.value);
      // setOldGoldAmount(0);
      setPaymentAmount(newTotalPayableAmount);
      // setPayments((currentPayments) =>
      //   currentPayments.filter((payment) => payment.Id !== undefined)
      // );
      setAllProdctsNetAmount((parseInt(newTotalPayableAmount) * 100) / 100);

      let totalAmountPaying = allSelectedProducts.reduce(
        (total, product) => total + parseFloat(product.FinalPrice),
        0
      );

      setDiscountAmount(parseInt(totalAmountPaying) - parseInt(e.target.value));

      setGrandTotal(newTotalPayableAmount);
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

  const createOrder = async () => {
    console.log(allSelectedProducts, "allSelect");

    let totalGold = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.BalanceGold),
      0
    );

    let totalSilver = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.BalanceSilver),
      0
    );
    let totalQuantity = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.Quantity),
      0
    );
    let totalWtReceive = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.FineWt),
      0
    );
    let totalFineWithWstageWt = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.FineWastageWt),
      0
    );
    let totalHallmarkAmt = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.HallmarkAmt),
      0
    );
    let totalTagWeight = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.TagWeight),
      0
    );
    let totalFindingWeight = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.FindingWeight),
      0
    );
    let totalLanyardWeight = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.LanyardWeight),
      0
    );
    let unlabelledSilverWeight = allSelectedProducts
      .filter(
        (x) =>
          !x.AddToUnlabelled && x.CategoryName.toLowerCase().includes("silver")
      )
      .reduce((total, product) => total + parseFloat(product.FineWt), 0);
    let unlabelledGoldWeight = allSelectedProducts
      .filter(
        (x) =>
          !x.AddToUnlabelled && x.CategoryName.toLowerCase().includes("gold")
      )
      .reduce((total, product) => total + parseFloat(product.FineWt), 0);
    let unlabelledOtherMetalWeight = allSelectedProducts
      .filter(
        (x) =>
          !x.AddToUnlabelled &&
          !x.CategoryName.toLowerCase().includes("silver") &&
          !x.CategoryName.toLowerCase().includes("gold")
      )
      .reduce((total, product) => total + parseFloat(product.FineWt), 0);

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
        return totalProductWeight + Number(product.TotalDiamondWeight);
      },
      0
    );

    let TotalDiamondQty = allSelectedProducts.reduce(
      (TotalDiamondQty, product) => {
        return TotalDiamondQty + Number(product.TotalDiamondQty);
      },
      0
    );

    let totalDiamondAmount = allSelectedProducts.reduce(
      (totalProductAmount, product) => {
        return totalProductAmount + Number(product.TotalDiamondAmount);
      },
      0
    );
    // Determine the date to send
    const dateToSend = selectedDate || getTodaysDateInHTMLFormat();

    try {
      const formData = new FormData();

      formData.append(
        "TotalNetAmount",
        parseFloat(allProdctsNetAmount).toFixed(3)
      );
      formData.append(
        "TotalGSTAmount",
        parseFloat(totalPayableGstAmount).toFixed(3)
      );
      formData.append(
        "TotalPurchaseAmount",
        Math.ceil(totalPayableAmount).toFixed(3)
      );
      formData.append(
        "PurchaseStatus",
        parseFloat(grandTotal).toFixed(2) === "0.00" &&
          parseFloat(totalPayableGold).toFixed(3) === "0.000" &&
          parseFloat(totalPayableSilver).toFixed(3) === "0.000"
          ? "Paid"
          : payments.length > 0
          ? "Partial"
          : "None"
      );

      formData.append("Quantity", totalQuantity);
      formData.append(
        "PurchaseAmount",
        Math.ceil(totalPayableAmount).toFixed(3)
      );
      formData.append("VendorId", selectedCustomer.Id);
      formData.append("GSTApplied", gstType);
      formData.append("Branch", "Home");
      formData.append("PurchaseType", "Purchase");
      formData.append("Discount", parseFloat(discountAmount).toFixed(3));
      formData.append("Remark", "");
      formData.append("DebitGold", "0");
      formData.append("DebitSilver", "0");
      formData.append("DebitOtherMetal", "0");
      formData.append("DebitAmount", "0");
      formData.append("BalanceGold", parseFloat(totalPayableGold).toFixed(3));
      formData.append(
        "BalanceSilver",
        parseFloat(totalPayableSilver).toFixed(3)
      );
      formData.append("BalanceAmount", parseFloat(grandTotal).toFixed(3));
      formData.append("BalanceOtherMetal", "0");
      formData.append("DebitAmount", "0");
      formData.append("DebitGold", "0");
      formData.append("DebitSilver", "0");
      formData.append("DebitOtherMetal", "0");
      formData.append("TotalFineGold", parseFloat(totalGold).toFixed(3));
      formData.append("TotalFineSilver", parseFloat(totalSilver).toFixed(3));
      formData.append("TotalFineOtherMetal", "0");
      formData.append("InvoiceNo", invoiceNumber);
      formData.append("InvoiceNo", invoiceNumber);
      // formData.append("InvoiceFile", "");
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("InvoiceFile", file);
        });
        console.log("Images Selected");
      } else {
        formData.append("InvoiceFile", "");
        console.log(" No Images Selected");
      }
      formData.append("InwardNo", `${parseInt(selectedCustomer.InwardNo)}`);
      formData.append("PurchaseDate", `${dateToSend}`);
      formData.append("ClientCode", clientCode);
      formData.append("CompanyId", CompanyId ? CompanyId : 0);
      formData.append("CounterId", CounterId ? CounterId : 0);
      formData.append("BranchId", BranchId ? BranchId : 0);
      formData.append("EmployeId", EmployeId ? EmployeId : 0);
      formData.append("TotalWtReceive", totalWtReceive);
      formData.append("TotalFineWithWstageWt", totalFineWithWstageWt);
      formData.append("StockKeepingUnit", selectedSkuName);
      formData.append("LotNumber", "");
      formData.append("TotalHallmarkAmt", totalHallmarkAmt);
      formData.append("TotalTagWeight", totalTagWeight);
      formData.append("TotalFindingWeight", totalFindingWeight);
      formData.append("TotalLanyardWeight", totalLanyardWeight);
      formData.append("UnlabelledSilverWeight", unlabelledSilverWeight);
      formData.append("UnlabelledGoldWeight", unlabelledGoldWeight);
      formData.append("UnlabelledOtherMetalWeight", unlabelledOtherMetalWeight);
      formData.append("UnlabelledOtherMetalWeight", unlabelledOtherMetalWeight);
      formData.append("TotalStoneWeight", totalStoneWeight);
      formData.append("TotalStoneAmount", totalStoneAmount);
      formData.append("TotalStonePieces", totalStonePieces);
      formData.append("TotalDiamondWeight", totalDiamondWeight);
      formData.append("TotalDiamondQty", TotalDiamondQty);
      formData.append("TotalDiamondAmount", totalDiamondAmount);
      formData.append("AssignedGoldWeight", "0");
      formData.append("AssignedSilverWeight", "0");
      formData.append("AssignedOtherMetalWeight", "0");
      formData.append("AssignedDiamondWeight", "0");

      // console.log(formData, "FORMDATA FOR ORDER")
      // const formData = {
      //   NetAmount: `${parseFloat(allProdctsNetAmount).toFixed(3)}`,
      //   GSTAmount: `${parseFloat(totalPayableGstAmount).toFixed(3)}`,
      //   TotalAmount: `${Math.ceil(totalPayableAmount).toFixed(3)}`,
      //   Quantity: allSelectedProducts.length,
      //   PurchaseAmount: `${Math.ceil(totalPayableAmount).toFixed(3)}`,
      //   SupplierId: selectedCustomer.id,
      //   Branch: "Home",
      //   PurchaseType: "purchase",
      //   Discount: `${parseFloat(discountAmount).toFixed(3)}`,
      //   Remark: "",
      //   BalanceGold: `${parseFloat(totalPayableGold).toFixed(3)}`,
      //   BalanceSilver: `${parseFloat(totalPayableSilver).toFixed(3)}`,
      //   BalanceAmount: `${parseFloat(grandTotal).toFixed(3)}`,
      //   FineGold: `${parseFloat(totalGold).toFixed(3)}`,
      //   FineSilver: `${parseFloat(totalSilver).toFixed(3)}`,
      // };
      console.log(formData, "FORMDATA FOR ORDER");

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const response = await fetch(a154, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      });
      const rcvdData = await response.json();
      console.log(rcvdData, "1st hit");
      createOrderItems(rcvdData.Id);
    } catch (error) {
      alert(error);
      console.error(error);
      //   setLoading(false);
    }
  };
  const updateOrder = async () => {
    const modifiedData = allPaymentsList.map((item) => {
      const {
        Amount,
        FineGold,
        FineSilver,
        GoldAmount,
        GoldRate,
        Description,
        TransactionType,
        SilverAmount,
        SilverRate,
        PaymentModeType,
        Id,
        CreatedOn,
      } = item;

      let newItem = {
        amount: Amount,
        deductGold: PaymentModeType === "Cash to Metal" ? FineGold : 0,
        deductSilver: PaymentModeType === "Cash to Metal" ? FineSilver : 0,
        fineGold: FineGold,
        fineSilver: FineSilver,
        goldAmount: GoldAmount,
        goldRate: GoldRate,
        paymentDescription: Description,
        paymentType: TransactionType,
        silverAmount: SilverAmount,
        silverRate: SilverRate,
        mode: PaymentModeType,
        Id: Id,
        CreatedOn: CreatedOn,
      };

      return newItem;
    });

    // Adjust modifiedData to match the length of payments
    let adjustedModifiedData = payments.map((payment, index) => {
      if (index < modifiedData.length) {
        return { ...modifiedData[index], Id: payment.Id };
      } else {
        return { ...modifiedData[index], Id: 0 };
      }
    });
    setPayments(adjustedModifiedData);

    let totalGold = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.BalanceGold),
      0
    );

    let totalSilver = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.BalanceSilver),
      0
    );
    let totalQuantity = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.Quantity),
      0
    );
    let totalWtReceive = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.FineWt),
      0
    );
    let totalFineWithWstageWt = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.FineWastageWt),
      0
    );
    let totalHallmarkAmt = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.HallmarkAmt),
      0
    );
    let totalTagWeight = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.TagWeight),
      0
    );
    let totalFindingWeight = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.FindingWeight),
      0
    );
    let totalLanyardWeight = allSelectedProducts.reduce(
      (total, product) => total + parseFloat(product.LanyardWeight),
      0
    );
    let unlabelledSilverWeight = allSelectedProducts
      .filter(
        (x) =>
          !x.AddToUnlabelled && x.CategoryName.toLowerCase().includes("silver")
      )
      .reduce((total, product) => total + parseFloat(product.FineWt), 0);
    let unlabelledGoldWeight = allSelectedProducts
      .filter(
        (x) =>
          !x.AddToUnlabelled && x.CategoryName.toLowerCase().includes("gold")
      )
      .reduce((total, product) => total + parseFloat(product.FineWt), 0);
    let unlabelledOtherMetalWeight = allSelectedProducts
      .filter(
        (x) =>
          !x.AddToUnlabelled &&
          !x.CategoryName.toLowerCase().includes("silver") &&
          !x.CategoryName.toLowerCase().includes("gold")
      )
      .reduce((total, product) => total + parseFloat(product.FineWt), 0);

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
        return totalProductWeight + Number(product.TotalDiamondWeight);
      },
      0
    );
    let TotalDiamondQty = allSelectedProducts.reduce(
      (TotalDiamondQty, product) => {
        return TotalDiamondQty + Number(product.TotalDiamondQty);
      },
      0
    );
    let totalDiamondAmount = allSelectedProducts.reduce(
      (totalProductAmount, product) => {
        return totalProductAmount + Number(product.TotalDiamondAmount);
      },
      0
    );
    const dateToSend = selectedDate || getTodaysDateInHTMLFormat();
    try {
      const formData = new FormData();

      formData.append(
        "TotalNetAmount",
        parseFloat(allProdctsNetAmount).toFixed(3)
      );
      formData.append(
        "TotalGSTAmount",
        parseFloat(totalPayableGstAmount).toFixed(3)
      );
      formData.append(
        "TotalPurchaseAmount",
        Math.ceil(totalPayableAmount).toFixed(3)
      );
      formData.append(
        "PurchaseStatus",
        parseFloat(grandTotal).toFixed(2) === "0.00" &&
          parseFloat(totalPayableGold).toFixed(3) === "0.000" &&
          parseFloat(totalPayableSilver).toFixed(3) === "0.000"
          ? "Paid"
          : payments.length > 0
          ? "Partial"
          : "None"
      );

      formData.append("Quantity", totalQuantity);
      formData.append(
        "PurchaseAmount",
        Math.ceil(totalPayableAmount).toFixed(3)
      );
      formData.append("VendorId", selectedCustomer.Id);
      formData.append("GSTApplied", gstType);
      formData.append("Branch", "Home");
      formData.append("PurchaseType", "Purchase");
      formData.append("Discount", parseFloat(discountAmount).toFixed(3));
      formData.append("Remark", purchaseMainBox.Remark);
      formData.append(
        "DebitGold",
        `${purchaseMainBox.DebitGold ? purchaseMainBox.DebitGold : 0}`
      );
      formData.append(
        "DebitSilver",
        `${purchaseMainBox.DebitSilver ? purchaseMainBox.DebitSilver : 0}`
      );
      formData.append("DebitOtherMetal", "0");
      formData.append(
        "DebitAmount",
        `${purchaseMainBox.DebitAmount ? purchaseMainBox.DebitAmount : 0}`
      );
      formData.append("BalanceGold", parseFloat(totalPayableGold).toFixed(3));
      formData.append(
        "BalanceSilver",
        parseFloat(totalPayableSilver).toFixed(3)
      );
      formData.append("BalanceAmount", parseFloat(grandTotal).toFixed(3));
      formData.append("BalanceOtherMetal", "0");
      formData.append("DebitAmount", "0");
      formData.append("DebitGold", "0");
      formData.append("DebitSilver", "0");
      formData.append("DebitOtherMetal", "0");
      formData.append("TotalFineGold", parseFloat(totalGold).toFixed(3));
      formData.append("TotalFineSilver", parseFloat(totalSilver).toFixed(3));
      formData.append("TotalFineOtherMetal", "0");
      formData.append("InvoiceNo", invoiceNumber);
      // formData.append("InvoiceFile", "");
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("InvoiceFile", file);
        });
        console.log("Images Selected");
      } else {
        formData.append("InvoiceFile", purchaseMainBox.InvoiceFile);
        console.log(" No Images Selected");
      }
      formData.append("LotNumber", `${parseInt(purchaseMainBox.LotNumber)}`);
      formData.append("InwardNo", `${parseInt(purchaseMainBox.InwardNo)}`);
      formData.append("PurchaseDate", `${dateToSend}`);
      formData.append("ClientCode", clientCode);
      formData.append("CompanyId", CompanyId ? CompanyId : 0);
      formData.append("CounterId", CounterId ? CounterId : 0);
      formData.append("BranchId", BranchId ? BranchId : 0);
      formData.append("EmployeeId", EmployeId ? EmployeId : 0);
      formData.append("TotalWtReceive", totalWtReceive);
      formData.append("TotalFineWithWstageWt", totalFineWithWstageWt);
      formData.append("StockKeepingUnit", selectedSkuName);
      formData.append("LotNumber", "");
      formData.append("TotalHallmarkAmt", totalHallmarkAmt);
      formData.append("TotalTagWeight", totalTagWeight);
      formData.append("TotalFindingWeight", totalFindingWeight);
      formData.append("TotalLanyardWeight", totalLanyardWeight);
      formData.append("UnlabelledSilverWeight", unlabelledSilverWeight);
      formData.append("UnlabelledGoldWeight", unlabelledGoldWeight);
      formData.append("UnlabelledOtherMetalWeight", unlabelledOtherMetalWeight);
      formData.append("UnlabelledOtherMetalWeight", unlabelledOtherMetalWeight);
      formData.append("TotalStoneWeight", totalStoneWeight);
      formData.append("TotalStoneAmount", totalStoneAmount);
      formData.append("TotalStonePieces", totalStonePieces);
      formData.append("TotalDiamondWeight", totalDiamondWeight);
      formData.append("TotalDiamondQty", TotalDiamondQty);
      formData.append("TotalDiamondAmount", totalDiamondAmount);
      formData.append("Id", purchaseMainBox.Id);
      formData.append("AssignedGoldWeight", "0");
      formData.append("AssignedSilverWeight", "0");
      formData.append("AssignedOtherMetalWeight", "0");
      formData.append("AssignedDiamondWeight", "0");
      console.log(formData, "FORMDATA FOR ORDER");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}, ${typeof value}`);
      }
      const response = await fetch(a166, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      });
      const data = await response.json();
      // createOrderItems(purchaseMainBox.Id);
      console.log(data, "1st Hit Order Updated");
      console.log(data, "1st Hit Order Updated");
      sendProductData(purchaseMainBox.Id);
    } catch (error) {
      console.log(error);
    }
  };

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

  const sendProductData = async (rcvdId) => {
    try {
      const payload = allSelectedProducts.map((product) => {
        // Compute the totals for stones and diamonds
        const totalStoneWeight = product.Stones.reduce(
          (acc, stone) => acc + parseFloat(stone.StoneWeight || 0),
          0
        );
        const totalStonePieces = product.Stones.reduce(
          (acc, stone) => acc + parseFloat(stone.StonePieces || 0),
          0
        );
        const totalStoneAmount = product.Stones.reduce(
          (acc, stone) => acc + parseFloat(stone.StoneAmount || 0),
          0
        );
        const totalDiamondWeight = product.Diamonds.reduce(
          (acc, diamond) => acc + parseFloat(diamond.DiamondWeight || 0),
          0
        );
        const totalDiamondPieces = product.Diamonds.reduce(
          (acc, diamond) => acc + parseFloat(diamond.DiamondPieces || 0),
          0
        );
        const totalDiamondAmount = product.Diamonds.reduce(
          (acc, diamond) => acc + parseFloat(diamond.DiamondAmount || 0),
          0
        );
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
          MakingFixedAmt: `${product.MakingFixedAmt}`,
          MakingPercentage: `${product.MakingPercentage}`,
          MakingPerGram: `${product.MakingPerGram}`,
          MakingFixedWastage: `${product.MakingFixedWastage}`,
          MetalRate: `${product.MetalRate}`,
          FinePercent: `${product.FinePercent}`,
          WastageWt: `${product.WastageWt ?? 0}`,
          WastagePercent: `${product.WastagePercent ?? 0}`,
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
          StoneWeight: `${totalStoneWeight}`,
          StonePieces: `${totalStonePieces}`,
          StoneAmount: `${totalStoneAmount}`,
          MetalId: parseInt(product.CategoryId),
          HallmarkAmt: `${product.HallmarkAmt}`,
          TagWeight: `${product.TagWeight}`,
          FindingWeight: `${product.FindingWeight}`,
          LanyardWeight: `${product.LanyardWeight}`,

          AssignedDiamondWeight: "0",
          AssignedGoldWeight: "0",
          AssignedOtherMetalWeight: "0",
          AssignedSilverWeight: "0",
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
          DiamondSize: product.DiamondSize,
          DiamondPurchaseRate: String(product.DiamondPurchaseRate),
          DiamondSellRate: String(product.DiamondSellRate),
          DiamondClarity: getDiamondClarity(null, product.DiamondClarity),
          DiamondColour: getDiamondColor(null, product.DiamondColour),
          DiamondShape: getShapeValue(null, product.DiamondShape),
          DiamondCut: getDiamondCut(null, product.DiamondCut),
          DiamondSettingType: getSettingType(null, product.DiamondSettingType),
          DiamondCertificate: product.DiamondCertificate,
          DiamondPurchaseAmount: String(product.DiamondPurchaseAmount),
          DiamondSellAmount: product.DiamondSellAmount,
          DiamondDescription: product.DiamondDescription,
          DiamondWeight: String(product.DiamondWeight || 0),
          DiamondPieces: String(product.DiamondPieces || 0),
          DiamondAmount: String(product.DiamondAmount || 0),
          DiamondSleve: product.DiamondSleve,
          DiamondTotalWeight: String(product.DiamondTotalWeight || 0), // Add a fallback value of 0
          DiamondTotalQuantity: String(product.DiamondTotalQuantity || 0), // Add a fallback value of 0
          TotalDiamondWeight: String(product.TotalDiamondWeight || 0), // Add a fallback value of 0
          TotalDiamondAmount: String(product.TotalDiamondAmount || 0), // Add a fallback value of 0
          TotalDiamondQty: String(product.TotalDiamondQty || 0), // Add a fallback value of 0
        };
      });
      console.log(payload, "payload");
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
        setIsitemedit(true)
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      setIsitemedit(true)
      if (payments.length > 0) {
        addAllSelectedPayments(rcvdId);
      } else {
        setIsitemedit(true)
        resetAllFields();
      }
    } catch (error) {
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
      resetAllFields();
    }
  };
  const calculateTotal = (items, field) => {
    return items.reduce((total, item) => {
      return total + parseFloat(item[field] || 0);
    }, 0);
  };
  const addOrderItemAPI = async (product, rcvdId) => {
    console.log(product, "productt");
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
        WastageParcent: `${product.WastagePercent}`,
        Quantity: `${product.Quantity}`,
        CategoryId: parseInt(product.CategoryId),
        ProductId: parseInt(product.ProductId),
        PurchaseEntryNo: "",
        FineGoldWt: `${product.FineGoldWt}`,
        FineSilverWt: `${product.FineSilverWt}`,
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
        StonePieces: `${totalStonePieces}`,
        StoneAmount: `${totalStoneAmount}`,
        MetalId: parseInt(product.CategoryId),
        HallmarkAmt: `${product.HallmarkAmt}`,
        TagWeight: `${product.TagWeight}`,
        FindingWeight: `${product.FindingWeight}`,
        LanyardWeight: `${product.LanyardWeight}`,
        MRP: `${product.MRP}`,
        PurityId: parseInt(product.PurityId),
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
        TotalDiamondQty: `${product.TotalDiamondQty}`,
        TotalDiamondWeight: `${product.DiamondWeight}`,
        TotalDiamondAmount: `${product.DiamondAmount}`,
        DiamondSleve: `${product.DiamondSleve}`,
        DiamondTotalQuantity: `${product.DiamondTotalQuantity}`,
        DiamondTotalWeight: `${product.DiamondTotalWeight}`,
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
  console.log(payments, "payments");
  console.log(payments, "payments");
  const currentYear = new Date().getFullYear();
  console.log(currentYear, "current Year");
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
          Id: payment.Id ? payment.Id : 0,
        };

        return item;
      });
      console.log(paymentsList, "paymentsList to send");
      const response = await fetch(a167, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentsList),
      });

      const rcvdData = await response.json();
      const paymentsData = rcvdData;
      console.log(paymentsData, "3rd Hit payment modes created");

      if (rcvdData.status === "error") {
        alert(rcvdData.message);
      } else {
        // Generate bill PDF after setting the state
        // generateBillPDF(rcvdData.data, x);
        setIsitemedit(true)
        resetAllFields();
        // addAllSelectedPayments()

        window.scrollTo(0, 0);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  // console.log(orderCsData, "orderCsData");
  console.log(selectedCustomer, "selectedCustomer");

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
      apiService.fetchAllCustomers();
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
          parseFloat(updatedProduct.StoneAmount);
        let GSTAdded = parseFloat(GST) * parseFloat(grossTotalRate);
        let finalPrice = parseFloat(grossTotalRate) + parseFloat(GSTAdded);

        // Calculate total making charges
        let totalMakingCharges =
          parseFloat(makingCharges1) +
          parseFloat(makingCharges2) +
          parseFloat(makingCharges3) +
          parseFloat(makingCharges4);
          console.log('checkpoint2 ', totalMakingCharges)
        // console.log(netGoldRate, "netGoldRate");
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
        // calculatePurchasePrice(updatedProduct);
        const calculatedProduct = ProductCalculator.calculatePrice(
          updatedProduct,
          convertAmount
        );

        setPurchaseProduct(calculatedProduct);
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
    });
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

  // // Render total payment amount
  const totalPaidAmount = calculateTotalAmount();

  const resetAllFields = () => {
    setSelectedCustomer(null);
    setSelectedProduct([]);
    setAllSelectedProducts([]);
    setPaymentAmount(0);
    setPayments([]);
    setSelectedSalesEmployee("");
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
    window.scrollTo(0, 0);
  };

  const handleInputChangePurchase = (e) => {
    const { name, value } = e.target;
    const updatedProduct = { ...purchaseProduct };
    console.log("checking parameter atchange", name);
    // Handle specific cases
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
    setIscal(true); // Trigger calculation
  };

  useEffect(() => {
    if (iscal) {
      console.log("checking calculationsss", iscal);
      //   const updatedProduct = ProductCalculator.calculateAll(
      //     purchaseProduct,
      //     allDiamondSizeWeightRate,
      //     allPurities,
      //     allVendorTounche,
      //     selectedCustomer,
      //     selectedSku,
      //     selectedSkuName,
      //     finePure,
      //     convertAmount,
      //     gstType
      //   );
      //   setPurchaseProduct(updatedProduct);

      let updatedProduct = { ...purchaseProduct };

      // Conditionally call the calculatePurityAndVendorTounche function

      // Always call these
      ProductCalculator.calculateNetWeight(updatedProduct, selectedSku);
      ProductCalculator.calculateDiamonds(
        updatedProduct,
        allDiamondSizeWeightRate
      );
      ProductCalculator.calculateWastageAndFine(updatedProduct, finePure);
      ProductCalculator.calculateTotalPrice(
        updatedProduct,
        convertAmount,
        gstType
      );

      setPurchaseProduct(updatedProduct);

      setIscal(false);
    }
  }, [iscal, purchaseProduct]);

  useEffect(() => {
    const updatedProduct = purchaseProduct;
    // if (convertAmount === true) {
    let fineWeight = parseFloat(purchaseProduct.FineWt);
    let wastageWeight = !finePure
      ? (parseFloat(purchaseProduct.WastageWt) *
          parseFloat(purchaseProduct.NetWt)) /
        100
      : (parseFloat(purchaseProduct.WastageWt) * parseFloat(fineWeight)) / 100;
    let totalFineWastageWt = parseFloat(fineWeight) + parseFloat(wastageWeight);
    updatedProduct.FineWastageWt = parseFloat(totalFineWastageWt).toFixed(3);
    updatedProduct.FinePure = finePure;
    updatedProduct.ConvertAmount = convertAmount;

    updatedProduct.TotalItemAmt =
      (parseFloat(purchaseProduct.MetalRate) / 10) *
      parseFloat(purchaseProduct.FineWastageWt);
    // } else {
    // updatedProduct.TotalItemAmt = purchaseProduct.FineWastageWt;
    // }
    // setPurchaseProduct(updatedProduct);
    // calculatePurchasePrice(updatedProduct);

    const calculatedProduct = ProductCalculator.calculatePrice(
      updatedProduct,
      convertAmount
    );

    // setPurchaseProduct(calculatedProduct);
  }, [convertAmount, finePure]);

  const addPurchaseProductToList = (selectedProduct) => {
    console.log("checking added items    ", selectedProduct);
    if (
      purchaseProduct.CategoryName === "DIAMOND GOLD" ||
      purchaseProduct.CategoryName === "DIAMOND SILVER" ||
      purchaseProduct.CategoryName === "DIAMOND PLATINUM"
    ) {
      if (
        0 === selectedProduct.TotalDiamondAmount ||
        0 === selectedProduct.TotalDiamondQty ||
        "" === selectedProduct.TotalDiamondWeight
      ) {
        setShowError(true);
        setMessageType("error");
        setMessageToShow(
          "TOTAL DIAQTY/TOTAL DIAWEIGHT/TOTAL DIAAMOUNT is REQUIRED"
        );
      } else {
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
          DiamondSleve: "",
          DiamondTotalQuantity: "",
          DiamondTotalWeight: "",
          DiamondSettingType: "",
          DiamondCertificate: "",
          DiamondPurchaseAmount: "0",
          DiamondSellAmount: "0",
          DiamondDescription: "",
          Testing: "0",
          TotalDiamondQty: 0,
          TotalDiamondWeight: "",
          TotalDiamondAmount: 0,
        });
        setActive("Sell");
        setSelectedProductType("");
        setSelectedCategory("");
        setSelectedProductType("");
        console.log("here");
        setConvertAmount(false);
        // setSelectedSkuName("");
        // setSelectedSku([]);
      }
    } else {
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
        DiamondSleve: "",
        DiamondTotalQuantity: "",
        DiamondTotalWeight: "",
        DiamondSettingType: "",
        DiamondCertificate: "",
        DiamondPurchaseAmount: "0",
        DiamondSellAmount: "0",
        DiamondDescription: "",
        Testing: "0",
        TotalDiamondQty: 0,
        TotalDiamondWeight: "",
        TotalDiamondAmount: 0,
      });
      setActive("Sell");
      setSelectedProductType("");
      setSelectedCategory("");
      setSelectedProductType("");
      console.log("here");
      setConvertAmount(false);
      // setSelectedSkuName("");
      // setSelectedSku([]);
    }
  };

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

    const updatedMetalPaymentOption = handlePaymentOption(
      a,
      value,
      metalPaymentOption,
      paymentOptions
    );

    setMetalPaymentOption(updatedMetalPaymentOption);

    // Additional state updates can be done based on the logic you need
    if (paymentOptions === "Metal to Cash" || paymentOptions === "Metal") {
      if (updatedMetalPaymentOption.deductGold) {
        setPaymentGold(updatedMetalPaymentOption.deductGold);
      }
      if (updatedMetalPaymentOption.deductSilver) {
        setPaymentSilver(updatedMetalPaymentOption.deductSilver);
      }
      setPaymentAmount(updatedMetalPaymentOption.totalAmount);
    } else if (paymentOptions === "Cash to Metal") {
      // Similar handling as above based on your requirements
      if (updatedMetalPaymentOption.deductGold) {
        setDeductGold(updatedMetalPaymentOption.deductGold);
      }
      if (updatedMetalPaymentOption.deductSilver) {
        setDeductSilver(updatedMetalPaymentOption.deductSilver);
      }
    }
  };

  const handleMetalPaymentOption1 = (a, b) => {
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
  // console.log(purchaseProduct, "purchaseProduct");
  // console.log(allSelectedProducts, "allSelectedProducts");
  // console.log(purchaseProduct, "purchaseProduct");
  // console.log(metalPaymentOption, "metalPaymentOption");
  // console.log(metalPaymentOption, "metalPaymentOption");
  // console.log(purchaseProductList, "purchaseProductList");
  // console.log(selectedCustomer, "selectedCustomer");
  // console.log(selectedProduct);
  // console.log(openEditProduct, "openEditProduct");
  // console.log(paymentsString, "paymentsString");
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
    if (selectedStone) {
      newStones[index] = {
        ...newStones[index],
        StoneName: selectedStone.StoneName
          ? selectedStone.StoneName
          : selectedStone.StoneMainName,
        StoneWeight: selectedStone.StoneWeight
          ? selectedStone.StoneWeight
          : selectedStone.StoneMainWeight,
        StonePieces: selectedStone.StonePieces
          ? selectedStone.StonePieces
          : selectedStone.StoneMainPieces,
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

    let totalwt =
      newStones[index].StoneWeight * newStones[index].StonePieces * skuPieces;
    let totalpcs = newStones[index].StonePieces * skuPieces;

    // Correct the assignment
    newStones[index].TotalStoneWt = totalwt;
    newStones[index].TotalStonePcs = totalpcs;

    console.log("check updated stones", newStones);

    setPurchaseProduct({ ...purchaseProduct, Stones: newStones });
    setIscal(true);
  };

  const deleteDiamond = (index) => {
    // const updatedDiamonds = purchaseProduct.Diamonds.filter(
    //     (_, i) => i !== index
    // );
    // setPurchaseProduct({...purchaseProduct, Diamonds: updatedDiamonds,DiamondWeight: 0,
    //     DiamondAmount: 0,
    //     Diamondpurchseamount: 0});
    // setPurchaseProduct((list) => ({
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

    const oldproduct = { ...purchaseProduct };

    const selectedDiamond = allDiamondsList.find(
      (diamond) => diamond.DiamondName === value
    );
    let totalDiamondAmount = 0;
    let truncatedweight = 0;

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

            console.log("checking edit diamond ", foundData);

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
          console.log("No diamond template found for ID:", diamondtampletid);
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

      const truncatedAmount =
        Math.floor(totalDiamondPurchaseAmount * 1000) / 1000;
      truncatedweight = Math.floor(tweight * 1000) / 1000;

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
  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
      // resetAllFields();
    }, 2000);
  }, [showError]);

  const isWithinLast24Hours = (dateString) => {
    const pastDate = new Date(dateString); // Parse the date string into a Date object
    const currentDate = new Date(); // Get the current date and time

    // Calculate the difference in milliseconds
    const timeDifference = currentDate.getTime() - pastDate.getTime();

    // Convert milliseconds to hours and check if it's within 24 hours
    return timeDifference <= 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  };

  const preparePglDataWithRfid = (epcValue) => {
    // PGL or ZPL commands for the printer
    const data = `
    ^XA
    ^RS8,4       // Write to RFID memory bank (EPC)
    ^RFW,E^FN1   // RFID EPC field
    ^FD${epcValue}^FS  // EPC value from function parameter
    ^FO50,50     // Set print field position
    ^A0N,50,50   // Font settings
    ^FDHello World^FS  // Print a text
    ^XZ
    `;
    return data;
  };


  const generatePrnFile = (data) => {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'printfile.prn';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGeneratePrn = () => {
    const printData = preparePglDataWithRfid(epcValue);
    generatePrnFile(printData);
  };

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
{/* <button onClick={handleGeneratePrn}>Generate .prn File</button> */}
            
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
              purchaseMainBox={purchaseMainBox}
              setPurchaseMainBox={setPurchaseMainBox}
              invoiceNumber={invoiceNumber}
              setInvoiceNumber={setInvoiceNumber}
              selectedCustomerEdit={selectedCustomerEdit}
              setSelectedCustomerEdit={setSelectedCustomerEdit}
              scrollToCenter={scrollToCenter}
              updateCustomerDetails={updateCustomerDetails}
              setGstType={setGstType}
              gstType={gstType}
            />

            {/* <h4 className="adminInvoiceAddTitles">Add Customer</h4> */}

            <h4
              id="adminInvoiceAddedCustomerEdit"
              className="adminInvoiceAddTitles"
            >
              Add Product
            </h4>

            <div className="adminInvoiceAddProductsOptionsTypeBox">
              <div className="adminAddCategoryInnerBoxTitlesBox">
                <button
                  onClick={() => setActive("Purchase")}
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
              <PurchaseFields
                selectedSkuName={selectedSkuName}
                handleSkuInputChange={handleSkuInputChange}
                allSkuList={allSkuList}
                purchaseProduct={purchaseProduct}
                allCategories={allCategories}
                filteredProducts={filteredProducts}
                handleInputChangePurchase={handleInputChangePurchase}
                filteredPurities={filteredPurities}
                finePure={finePure}
                showAllFields={showAllFields}
                showAddStoneBox={showAddStoneBox}
                showAddDiamondBox={showAddDiamondBox}
                setSelectedCategory={setSelectedCategory}
                addPurchaseProductToList={addPurchaseProductToList}
                setSelectedProductType={setSelectedProductType}
                setShowAllFields={setShowAllFields}
                convertAmount={convertAmount}
                setFinePure={setFinePure}
                setConvertAmount={setConvertAmount}
                setShowAddStoneBox={setShowAddStoneBox}
                setPurchaseProduct={setPurchaseProduct}
                addStone={addStone}
                handleStoneChange={handleStoneChange}
                deleteStone={deleteStone}
                allStonesList={allStonesList}
                setShowAddDiamondBox={setShowAddDiamondBox}
                addDiamond={addDiamond}
                allDiamondAttributes={allDiamondAttributes}
                allDiamondSizeWeightRate={allDiamondSizeWeightRate}
                handleDiamondChange={handleDiamondChange}
                deleteDiamond={deleteDiamond}
              />
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
              isWithinLast24Hours={isWithinLast24Hours}
              setPaymentAmount={setPaymentAmount}
              totalPaidCashAmount={totalPaidCashAmount}
              handleAddPayment={handleAddPayment}
              handleDeletePayment={handleDeletePayment}
              setPaymentType= {setPaymentType}
              setPaymentOptions={setPaymentOptions}
              advanceType={advanceType}
              advanceAmount={advanceAmount}
              setAdvanceType={setAdvanceType}
              selectedCustomer={selectedCustomer}
              metalPaymentOption={metalPaymentOption}
              setPaymentDescription={setPaymentDescription}
              setGstType={setGstType}
              handleMetalPaymentOption={handleMetalPaymentOption}
setAdvanceAmount ={setAdvanceAmount}
  setConvertAmount={setConvertAmount}
  convertAmount={convertAmount}
  setIscal={setIscal}
  setDiscountAmount={setDiscountAmount}
              from={'purchaseentryedit'}
            />

            <div className="adminInvoiceMainSaveButtonBox">
              <button
                tabIndex="10"
                ref={button9Ref}
                style={{ marginInline: "10px" }}
                onClick={() => {
                  if (selectedCustomer && allSelectedProducts.length > 0) {
                    // createOrder();
                    updateOrder();
                  } else {
                    alert("Please add all details");
                  }
                }}
              >
                Save
              </button>
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
