import React, {useEffect, useState} from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import {
    a104,
    a107,
    a125,
    a128,
    a131,
    a134,
    a149,
    a163,
    a173,
    a174,
    a179,
    a180,
    a191,
    a204,
    a205,
    a206,
    a95,
    a98,
} from "../../../Api/RootApiPath";
import {useSelector} from "react-redux";
import {RiListUnordered, RiPlayListAddLine} from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";
import Stonetounch from "../../../support/customertounchsupport/stones.jsx"
import GetApiService from "../../../Api/getapiService.jsx"

// src\Components\Api\getapiService.jsx



export default function AdminCustomerTounche() {
    const [active, setActive] = useState("List");
    const [showError, setShowError] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [messageToShow, setMessageToShow] = useState("");
    const [loading, setLoading] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [designData, setDesignData] = useState([]);
    const [purityData, setPurityData] = useState([]);
    const [skuData, setSkuData] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allCustomers, setAllCustomers] = useState([]);
    const [newCategory, setNewCategory] = useState({
        CustomerId: 0,
        CategoryId: 0,
        ProductId: 0,
        DesignId: 0,
        ClientCode: "",
        PurityId: 0,
        StoneLessPercent: "0",
        MakingFixedAmt: "0",
        MakingPerGram: "0",
        MakingFixedWastage: "0",
        MakingPercentage: "0",
        StockKeepingUnit: "",
        CompanyId: 0,
        CounterId: 0,
        BranchId: 0,
        EmployeeId: 0,
        OldEntry: false,
        DiamondSizeWeightRateTemplateId: 0,
        Stones:[]
    });
    const [allCompaniesList, setAllCompaniesList] = useState([]);
    const [allBranchesList, setAllBranchesList] = useState([]);
    const [allDepartmentsList, setAllDepartmentsList] = useState([]);
    const [allRolesList, setAllRolesList] = useState([]);
    const [allSelectedTounche, setAllSelectedTounche] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const [templateData, setTemplateData] = useState([]);
    const allStates = useSelector((state) => state);
    const adminLoggedIn = allStates.reducer1;
    //   let Entryby_Staff_id = parseInt(adminLoggedIn);
    const clientCode = adminLoggedIn.ClientCode;
    const employeeCode = adminLoggedIn.EmployeeCode;
    const CompanyId = adminLoggedIn.CompanyId;
    const BranchId = adminLoggedIn.BranchId;
    const CounterId = adminLoggedIn.CounterId;
    const EmployeeId = adminLoggedIn.EmployeeId;
    const [allStonesList, setAllStonesList] = useState([]);
    const [allStonesList1, setAllStonesList1] = useState([]);
    const [showSKU, setShowSKU] = useState(true);


    const apiService = new GetApiService(clientCode);

    const loadData = async () => {
        setLoading(true);
        try {
          const apiCalls = [
            
            apiService.fetchAllStonesList()
            
          ];
    
          const results = await Promise.allSettled(apiCalls);
    
          results.forEach((result, index) => {
            if (result.status === "fulfilled") {
              // Handle successful response
              switch (index) {
                case 0:
                 
                  setAllStonesList(result.value);

                  console.log('check stones ',result.value )
                  setAllStonesList1(result.value)
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
    

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    useEffect(() => {
        async function getDiamondTemplates() {
            const formData = {
                ClientCode: clientCode,
            };
            const response = await fetch(a191, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwMzc1MDA4NTksImlzcyI6Ijk4Nzk4ODc2NzU3NjU2NjU0NjU0IiwiYXVkIjoiSW5mb0Bsb3lhbHN0cmluZy5jb20ifQ.nOtc537wlSYm_97ljruCyOcG7wjXOrNUtxZy206OfOQ",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            const processedData = data?.map((item) => ({
                templateID: item?.Id,
                templateName: item?.TemplateName || "default",
            }));
            setTemplateData(processedData);
        }

        getDiamondTemplates();
    }, []);

    const fetchAllCategory = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a204, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllCategories(data);
            } else {
                setActive("addNew");
                document
                    .getElementById("addCategoryListTitle")
                    .classList.add("activeCategoryTitle");
                document
                    .getElementById("addCategoryListLogo")
                    .classList.add("activeCategoryLogo");
                document.getElementById("addCategoryListTitle").click();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCategory();
    }, []);

    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a125, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => setCategoriesData(data));
    }, []);

    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a128, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((x) => x.json())
            .then((y) => setProductsData(y));
    }, []);

    const filtreredProducts = productsData.filter(
        (x) => x.CategoryId == newCategory.CategoryId
    );

    const filteredDesign = designData.filter(
        (x) => x.ProductId == newCategory.ProductId
    );

    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a134, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => setPurityData(data));
    }, []);

    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a131, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => setDesignData(data));
    }, []);

    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a163, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => setSkuData(data));
    }, []);

    const fetchAllCompanies = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a95, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllCompaniesList(data);
            } else {
                // alert("Please Add Company First");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCompanies();
    }, []);

    const fetchAllBranches = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a98, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllBranchesList(data);
            } else {
                // alert("Please Add Company First");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllBranches();
    }, []);

    const fetchAllDepartments = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a104, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllDepartmentsList(data);
            } else {
                // alert("Please Add Company First");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllDepartments();
    }, []);

    const fetchAllRoles = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a107, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllRolesList(data);
            } else {
                // alert("Please Add Company First");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllRoles();
    }, []);

    const fetchAllCustomers = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a173, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllCustomers(data);
            } else {
                // alert("Please Add Company First");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCustomers();
    }, []);

    const handleNewCategoryChange = (e) => {
        const {name, value} = e.target;
        let actualValue = value;
        if (name === "FinePure") {
            actualValue = value === "true";
        }
        if (name == "StockKeepingUnit") {
            let selectedSku = skuData.find((x) => x.StockKeepingUnit == value);
            if (selectedSku) {
                handleAllSelectedTounche(e, selectedSku);
            } else {
                setNewCategory({...newCategory, [name]: actualValue});
            }
        }
        setNewCategory({...newCategory, [name]: actualValue});
    };

    const handleAmountChange = (index, newAmount) => {
        const updatedStones = [...newCategory.Stones];
        updatedStones[index].StoneRate = newAmount;

        setNewCategory((prev) => ({ ...prev, Stones: updatedStones }));
    };



    const addNewCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            CustomerId: parseInt(newCategory.CustomerId),
            CategoryId: parseInt(newCategory.CategoryId),
            ProductId: parseInt(newCategory.ProductId),
            DesignId: parseInt(newCategory.DesignId),
            ClientCode: clientCode,
            PurityId: parseInt(newCategory.PurityId),
            StoneLessPercent: `${newCategory.StoneLessPercent}`,
            MakingFixedAmt: `${newCategory.MakingFixedAmt}`,
            MakingPerGram: `${newCategory.MakingPerGram}`,
            MakingFixedWastage: `${newCategory.MakingFixedWastage}`,
            MakingPercentage: `${newCategory.MakingPercentage}`,
            StockKeepingUnit: newCategory.StockKeepingUnit,
            CompanyId: CompanyId ? CompanyId : 0,
            CounterId: CounterId ? CounterId : 0,
            BranchId: BranchId ? BranchId : 0,
            EmployeeId: EmployeeId ? EmployeeId : 0,
            DiamondSizeWeightRateTemplateId: parseInt(newCategory.DiamondSizeWeightRateTemplateId),

            ...(newCategory.OldEntry ? {Id: newCategory.Id} : {}),
        };
        let newArray = allSelectedTounche.filter(
            (x) => x.StockKeepingUnit !== newCategory.StockKeepingUnit
        ).map((item) => {
            return {
                ...item,
                FinePure: newCategory.FinePure,
                CategoryId: parseInt(newCategory.CategoryId),
                ProductId: parseInt(newCategory.ProductId),
                ClientCode: clientCode,
                PurityId: parseInt(newCategory.PurityId),
                MakingFixedAmt: `${newCategory.MakingFixedAmt}`,
                MakingPerGram: `${newCategory.MakingPerGram}`,
                MakingFixedWastage: `${newCategory.MakingFixedWastage}`,
                MakingPercentage: `${newCategory.MakingPercentage}`,
                StockKeepingUnit: item.StockKeepingUnit,
                CompanyId: CompanyId ? CompanyId : 0,
                CounterId: CounterId ? CounterId : 0,
                BranchId: BranchId ? BranchId : 0,
                EmployeeId: EmployeeId ? EmployeeId : 0,
                DiamondSizeWeightRateTemplateId: parseInt(
                    newCategory.DiamondSizeWeightRateTemplateId
                ),
            };
        });
        // const newArrayData = [...newArray, formData];
        const newArrayData = newArray.length > 0 ? [...newArray] : [formData];
        
        
        console.log(newArrayData, "rkjhjigh hemnfadjkfyhadi mafbahidgfhe f")
        try {
            const response = await fetch(
                !newCategory.OldEntry ? a205 : a206,
                // a96,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newArrayData),
                }
            );
            const data = await response.json();
            fetchAllCategory();
            setActive("List");
            setAllSelectedTounche([]);
            setAllSelected(false);
            setNewCategory({
                CustomerId: 0,
                CategoryId: 0,
                ProductId: 0,
                DesignId: 0,
                ClientCode: "",
                PurityId: 0,
                StoneLessPercent: "0",
                MakingFixedAmt: "0",
                MakingPerGram: "0",
                MakingFixedWastage: "0",
                MakingPercentage: "0",
                StockKeepingUnit: "",
                CompanyId: 0,
                CounterId: 0,
                BranchId: 0,
                EmployeeId: 0,
                OldEntry: false,
                DiamondSizeWeightRateTemplateId: 0,
                Stones: []
            });
            if (data.message) {
                setMessageType("error");
                setMessageToShow(data.message);
                setShowError(true);
                setActive("AddNew");
            } else {
                setMessageType("success");
                setMessageToShow("Category Added Successfully");
                setShowError(true);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };


    const addNewCategoryold1 = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        // Prepare the main form data object for CustomerTounch
        const formData = {
            CustomerId: parseInt(newCategory.CustomerId),
            CategoryId: parseInt(newCategory.CategoryId),
            ProductId: parseInt(newCategory.ProductId),
            DesignId: parseInt(newCategory.DesignId),
            ClientCode: clientCode,
            PurityId: parseInt(newCategory.PurityId),
            StoneLessPercent: `${newCategory.StoneLessPercent}`,
            MakingFixedAmt: `${newCategory.MakingFixedAmt}`,
            MakingPerGram: `${newCategory.MakingPerGram}`,
            MakingFixedWastage: `${newCategory.MakingFixedWastage}`,
            MakingPercentage: `${newCategory.MakingPercentage}`,
            StockKeepingUnit: newCategory.StockKeepingUnit, // This will be filled in dynamically below
            CompanyId: CompanyId ? CompanyId : 0,
            CounterId: CounterId ? CounterId : 0,
            BranchId: BranchId ? BranchId : 0,
            EmployeeId: EmployeeId ? EmployeeId : 0,
            DiamondSizeWeightRateTemplateId: parseInt(newCategory.DiamondSizeWeightRateTemplateId),
            ...(newCategory.OldEntry ? { Id: newCategory.Id } : {}),
        };
    
        // Prepare the StockKeepingUnit array based on the filtered data
        // let newArray = allSelectedTounche
        //     .filter(x => x.StockKeepingUnit !== newCategory.StockKeepingUnit)
        //     .map(item => ({
        //         ...item,
        //         FinePure: newCategory.FinePure,
        //         CategoryId: parseInt(newCategory.CategoryId),
        //         ProductId: parseInt(newCategory.ProductId),
        //         ClientCode: clientCode,
        //         PurityId: parseInt(newCategory.PurityId),
        //         MakingFixedAmt: `${newCategory.MakingFixedAmt}`,
        //         MakingPerGram: `${newCategory.MakingPerGram}`,
        //         MakingFixedWastage: `${newCategory.MakingFixedWastage}`,
        //         MakingPercentage: `${newCategory.MakingPercentage}`,
        //         StockKeepingUnit: item.StockKeepingUnit,
        //         CompanyId: CompanyId ? CompanyId : 0,
        //         CounterId: CounterId ? CounterId : 0,
        //         BranchId: BranchId ? BranchId : 0,
        //         EmployeeId: EmployeeId ? EmployeeId : 0,
        //         DiamondSizeWeightRateTemplateId: parseInt(newCategory.DiamondSizeWeightRateTemplateId),
        //     }));

        let newArray = newCategory.Stones;
    
        // Merge formData into newArray, fallback to formData if no newArray items
        const newArrayData = newArray.length > 0 ? [...newArray] : [formData];
    
        // Prepare the CustVendStoneTounch array
        const CustVendStoneTounch = allStonesList.map(stone => ({
            CustomerId: parseInt(newCategory.CustomerId),
            VendorId: stone.VendorId || 0, // Default to 0 if not available
            StoneId: stone.Id,
            StoneName: stone.StoneName,
            StoneWeight: `${stone.StoneWeight}`,
            StonePieces: `${stone.StonePieces}`,
            StoneRate: `${stone.StoneRate}`,
            StoneAmount: `${stone.StoneAmount}`,
            StoneLessPercent: `${stone.StoneLessPercent}`,
        }));
    
        // Final payload that includes both CustomerTounch and CustVendStoneTounch
        const payload = {
            CustomerTounch: newArrayData,
            CustVendStoneTounch: CustVendStoneTounch,
        };
    
        // Log the final payload for debugging
        console.log(payload, "Final payload for API");
    
        try {
            // Send the API request
            const response = await fetch(
                !newCategory.OldEntry ? a205 : a206,//a205,//a206, // Conditionally choose the API endpoint
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
    
            const data = await response.json();
    
            // Handle the response and update the UI accordingly
            if (data.message) {
                setMessageType("error");
                setMessageToShow(data.message);
                setShowError(true);
                setActive("AddNew");
            } else {
                setMessageType("success");
                setMessageToShow("Category Added Successfully");
                setShowError(true);
                fetchAllCategory(); // Re-fetch the updated category list
                setActive("List");
                setAllSelectedTounche([]);
                setAllSelected(false);
            }
    
            // Reset form and state after successful operation
            setNewCategory({
                CustomerId: 0,
                CategoryId: 0,
                ProductId: 0,
                DesignId: 0,
                ClientCode: "",
                PurityId: 0,
                StoneLessPercent: "0",
                MakingFixedAmt: "0",
                MakingPerGram: "0",
                MakingFixedWastage: "0",
                MakingPercentage: "0",
                StockKeepingUnit: "",
                CompanyId: 0,
                CounterId: 0,
                BranchId: 0,
                EmployeeId: 0,
                OldEntry: false,
                DiamondSizeWeightRateTemplateId: 0,
                Stones: []
            });
    
            setLoading(false);
        } catch (error) {
            console.error("Error adding new category:", error);
            setLoading(false);
        }
    };
    



    useEffect(() => {
        setTimeout(() => {
            setShowError(false);
        }, 2000);
    }, [showError]);

    const handleEditData = (data) => {
        console.log(data, "djhfhdjhdfjfjhdfjhdjfhdjhfh")
        setNewCategory({...data, OldEntry: true});
        setActive("AddNew");
    };

    const handleDeleteData = async (e) => {
        const payload = {
            Id: e.Id,
            ClientCode: clientCode,
        };
        try {
            const response = await fetch(
                "https://testing.loyalstring.co.in/api/Invoice/DeleteCustomerTounch",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwMzc1MDA4NTksImlzcyI6Ijk4Nzk4ODc2NzU3NjU2NjU0NjU0IiwiYXVkIjoiSW5mb0Bsb3lhbHN0cmluZy5jb20ifQ.nOtc537wlSYm_97ljruCyOcG7wjXOrNUtxZy206OfOQ",
                    },
                    body: JSON.stringify(payload),
                }
            );
            const result = await response.json();
            fetchAllCategory();
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAllSelectedTounche = (e, x) => {
        const {value, checked} = e.target;
        if (checked) {
            const newTounche = {
                CustomerId: 0,
                CategoryId: 0,
                ProductId: 0,
                DesignId: 0,
                ClientCode: "",
                PurityId: 0,
                StoneLessPercent: "0",
                MakingFixedAmt: "0",
                MakingPerGram: "0",
                MakingFixedWastage: "0",
                MakingPercentage: "0",
                StockKeepingUnit: "",
                CompanyId: 0,
                CounterId: 0,
                BranchId: 0,
                EmployeeId: 0,
                OldEntry: false,
                DiamondSizeWeightRateTemplateId: 0,
            };
            newTounche.CustomerId = parseInt(newCategory.CustomerId);
            newTounche.CategoryId = parseInt(x.CategoryId);
            newTounche.ProductId = parseInt(x.ProductId);
            newTounche.DesignId = parseInt(x.DesignId);
            newTounche.PurityId = parseInt(x.PurityId);
            newTounche.ClientCode = clientCode;
            newTounche.StoneLessPercent = newCategory.StoneLessPercent;
            newTounche.MakingFixedAmt = newCategory.MakingFixedAmt;
            newTounche.MakingPerGram = newCategory.MakingPerGram;
            newTounche.MakingFixedWastage = newCategory.MakingFixedWastage;
            newTounche.MakingPercentage = newCategory.MakingPercentage;
            newTounche.StockKeepingUnit = x.StockKeepingUnit;
            newTounche.CompanyId = CompanyId ? CompanyId : 0;
            newTounche.CounterId = CounterId ? CounterId : 0;
            newTounche.BranchId = BranchId ? BranchId : 0;
            newTounche.EmployeeId = EmployeeId ? EmployeeId : 0;
            newTounche.DiamondSizeWeightRateTemplateId = parseInt(
                x.DiamondSizeWeightRateTemplateId
            );
            setAllSelectedTounche([...allSelectedTounche, newTounche]);
        } else {
            setAllSelectedTounche(
                allSelectedTounche.filter((item) => item.StockKeepingUnit !== value)
            );
        }
    };

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setAllSelected(checked);
        if (checked) {
            setAllSelectedTounche(
                skuData
                    .filter((sku) => {
                        const matchesCategory =
                            newCategory.CategoryId === 0 ||
                            newCategory.CategoryId === "" ||
                            newCategory.CategoryId === null
                                ? true
                                : sku.CategoryId ===
                                parseInt(newCategory.CategoryId);
                        const matchesProduct =
                            newCategory.ProductId === 0 ||
                            newCategory.ProductId === "" ||
                            newCategory.ProductId === null
                                ? true
                                : sku.ProductId ===
                                parseInt(newCategory.ProductId);
                        const matchesPurity =
                            newCategory.PurityId === 0 ||
                            newCategory.PurityId === "" ||
                            newCategory.PurityId === null
                                ? true
                                : sku.PurityId === parseInt(newCategory.PurityId);
                        const matchesDesign =
                            newCategory.DesignId === 0 ||
                            newCategory.DesignId === "" ||
                            newCategory.DesignId === null
                                ? true
                                : sku.DesignId === parseInt(newCategory.DesignId);
                        return (
                            // matchesVendor &&
                            matchesCategory &&
                            matchesProduct &&
                            matchesPurity &&
                            matchesDesign
                        );
                    }).map((x) => createTouncheObject(x))
            );
        } else {
            setAllSelectedTounche([]);
        }
    };

    const handleIndividualCheckboxChange = (e, item) => {
        const checked = e.target.checked;
        if (checked) {
            setAllSelectedTounche((prev) => [...prev, createTouncheObject(item)]);
        } else {
            setAllSelectedTounche((prev) =>
                prev.filter((x) => x.StockKeepingUnit !== item.StockKeepingUnit)
            );
            setAllSelected(false);
        }
    };

    const createTouncheObject = (x) => ({
        CustomerId: parseInt(newCategory.CustomerId),
        CategoryId: parseInt(x.CategoryId),
        ProductId: parseInt(x.ProductId),
        DesignId: parseInt(x.DesignId),
        PurityId: parseInt(x.PurityId),
        ClientCode: clientCode,
        StoneLessPercent: newCategory.StoneLessPercent,
        MakingFixedAmt: newCategory.MakingFixedAmt,
        MakingPerGram: newCategory.MakingPerGram,
        MakingFixedWastage: newCategory.MakingFixedWastage,
        MakingPercentage: newCategory.MakingPercentage,
        StockKeepingUnit: x.StockKeepingUnit,
        CompanyId: CompanyId ? CompanyId : 0,
        CounterId: CounterId ? CounterId : 0,
        BranchId: BranchId ? BranchId : 0,
        EmployeeId: EmployeeId ? EmployeeId : 0,
        DiamondSizeWeightRateTemplateId: parseInt(
            x.DiamondSizeWeightRateTemplateId
        ),
    });

    const getNameFunction = (e) => {
        const matchedObject = templateData?.find((item) => item?.templateID === e);
        return matchedObject ? matchedObject.templateName : null;
    };

    return (
        <div>
            <AdminHeading/>
            <div className="adminMainBodyBox">
                {showError ? (
                    <AlertMessage message={messageToShow} type={messageType}/>
                ) : null}
                <AdminBreadCrump
                    title={"Add Customer Tounche"}
                    companyName={"Loyalstring"}
                    module={"Settings"}
                    page={"Customer Tounche"}
                />
                <div className="adminAddCategoryMainBox">
                    <div className="adminAddCategoryInnerBox">
                        <div className="adminAddCategoryInnerBoxTitlesBox">
                            <div
                                onClick={() => {
                                    setActive("List");
                                    setNewCategory({
                                        CustomerId: 0,
                                        CategoryId: 0,
                                        ProductId: 0,
                                        DesignId: 0,
                                        ClientCode: "",
                                        PurityId: 0,
                                        StoneLessPercent: "0",
                                        MakingFixedAmt: "0",
                                        MakingPerGram: "0",
                                        MakingFixedWastage: "0",
                                        MakingPercentage: "0",
                                        StockKeepingUnit: "",
                                        CompanyId: 0,
                                        CounterId: 0,
                                        BranchId: 0,
                                        EmployeeId: 0,
                                        OldEntry: false,
                                        DiamondSizeWeightRateTemplateId: 0,
                                        Stones:[]
                                    });
                                }}
                                className={
                                    active === "List"
                                        ? "adminAddCategoryInnerBoxTitle"
                                        : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                                }
                            >
                                <div
                                    className={
                                        active === "List"
                                            ? "adminAddCategoryInnerBoxTitleLogo"
                                            : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                                    }
                                >
                                    {/* 01 */}
                                    <RiListUnordered/>
                                </div>
                                <p>All Customer Tounche</p>
                            </div>
                            <div
                                id="addCategoryListTitle"
                                onClick={() => setActive("AddNew")}
                                className={
                                    active === "AddNew"
                                        ? "adminAddCategoryInnerBoxTitle"
                                        : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                                }
                            >
                                <div
                                    id="addCategoryListLogo"
                                    className={
                                        active === "AddNew"
                                            ? "adminAddCategoryInnerBoxTitleLogo"
                                            : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                                    }
                                >
                                    {/* 02 */}
                                    <RiPlayListAddLine/>
                                </div>
                                <p>Add Customer Tounche</p>
                            </div>
                        </div>
                        <div
                            className={
                                active === "List" ? "adminCategoryListMainBox" : "none"
                            }
                        >
                            <table>
                                <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Customer</th>
                                    <th>Category</th>
                                    <th>Product</th>
                                    <th>Design</th>
                                    <th>Purity</th>
                                    <th>SKU</th>
                                    <th>Stone Less</th>
                                    <th>Making FixedAmt</th>
                                    <th>Making Percentage</th>
                                    <th>Making PerGram</th>
                                    <th>Making Fixed Wastage</th>
                                    <th>Template Name</th>
                                    <th>action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {allCategories.map((x, index) => (
                                    <tr key={x.Id}>
                                        <td>{index + 1}</td>
                                        <td>{`${x.FirstName} ${x.LastName}`}</td>
                                        {/* <td>{x.VendorName}</td> */}
                                        <td>{x.CategoryName}</td>
                                        <td>{x.ProductName}</td>
                                        <td>{x.DesignName}</td>
                                        <td>{x.PurityName}</td>
                                        <td>{x.StockKeepingUnit}</td>
                                        <td>{x.StoneLessPercent}</td>
                                        <td>{x.MakingFixedAmt}</td>
                                        <td>{x.MakingPercentage}</td>
                                        <td>{x.MakingPerGram}</td>
                                        <td>{x.MakingFixedWastage}</td>
                                        <td>
                                            {getNameFunction(x.DiamondSizeWeightRateTemplateId)}
                                        </td>
                                        <td>
                                            <button
                                                className="adminAddCategoryEditButton"
                                                // onClick={() => handleEditClick(x.id)}
                                                onClick={() => handleEditData(x)}
                                            >
                                                Edit
                                            </button>
                                            {/*<button*/}
                                            {/*    className="adminAddCategoryEditButton"*/}
                                            {/*    style={{*/}
                                            {/*        backgroundColor: 'rgba(255, 0, 0, 0.3)',*/}
                                            {/*        marginLeft: '10px',*/}
                                            {/*        borderColor: 'red',*/}
                                            {/*        color: 'red'*/}
                                            {/*    }}*/}
                                            {/*    onClick={() => handleDeleteData(x)}*/}
                                            {/*>*/}
                                            {/*    Delete*/}
                                            {/*</button>*/}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div
                            className={
                                active !== "List" ? "adminCategoryAddCategoryMainBox" : "none"
                            }
                        >
                            <p>Add New Customer Tounche</p>
                            <form onSubmit={addNewCategory}>
                                <div
                                    style={{
                                        gridTemplateColumns: "repeat(4,1fr)",
                                        columnGap: "40px",
                                    }}
                                    className="adminCategoryAddCategoryInnerBox"
                                >
                                    <label>
                                        Select Customer<sup>*</sup>
                                    </label>
                                    <select
                                        name="CustomerId"
                                        value={newCategory?.CustomerId}
                                        onChange={handleNewCategoryChange}
                                        required={"required"}
                                    >
                                        <option value={""}>Select an Option</option>
                                        {allCustomers?.map((x) => {
                                            return (
                                                <option value={x.Id}>
                                                    {/* {x.Id} - {x.VendorName} */}
                                                    {`${x?.FirstName} - ${x?.Id}`}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {/*<label>*/}
                                    {/*    Select SKU<sup>*</sup>*/}
                                    {/*</label>*/}
                                    {/*<input*/}
                                    {/*    type="text"*/}
                                    {/*    value={newCategory.StockKeepingUnit}*/}
                                    {/*    onChange={handleNewCategoryChange}*/}
                                    {/*    name="StockKeepingUnit"*/}
                                    {/*    list="SKUList"*/}
                                    {/*/>*/}
                                    {/*<datalist id="SKUList">*/}
                                    {/*    {skuData?.map((x) => {*/}
                                    {/*        return (*/}
                                    {/*            <option value={x.StockKeepingUnit}>*/}
                                    {/*                {x.StockKeepingUnit}*/}
                                    {/*            </option>*/}
                                    {/*        );*/}
                                    {/*    })}*/}
                                    {/*</datalist>*/}
                                    <label>
                                        Select Category<sup>*</sup>
                                    </label>
                                    <select
                                        name="CategoryId"
                                        value={newCategory.CategoryId}
                                        onChange={handleNewCategoryChange}
                                        required={"required"}
                                    >
                                        <option value={""}>Select an Option</option>
                                        {categoriesData?.map((x) => {
                                            return <option value={x.Id}>{x.CategoryName}</option>;
                                        })}
                                    </select>
                                    <label>
                                        Select Product<sup>*</sup>
                                    </label>
                                    <select
                                        name="ProductId"
                                        value={newCategory.ProductId}
                                        onChange={handleNewCategoryChange}
                                        required={"required"}
                                    >
                                        <option value={""}>Select an Option</option>
                                        {productsData
                                            .filter((pro) => {
                                                const matchesCategory =
                                                    newCategory.CategoryId === 0 ||
                                                    newCategory.CategoryId === "" ||
                                                    newCategory.CategoryId === null
                                                        ? true
                                                        : pro.CategoryId ===
                                                        parseInt(newCategory.CategoryId);
                                                return matchesCategory;
                                            }).map((x) => {
                                                return <option value={x.Id}>{x.ProductName}</option>;
                                            })}
                                    </select>
                                    <label>
                                        Select Design<sup>*</sup>
                                    </label>
                                    <select
                                        name="DesignId"
                                        value={newCategory.DesignId}
                                        onChange={handleNewCategoryChange}
                                        required={"required"}
                                    >
                                        <option value={""}>Select an Option</option>
                                        {designData
                                            .filter((pro) => {
                                                const matchesCategory =
                                                    newCategory.CategoryId === 0 ||
                                                    newCategory.CategoryId === "" ||
                                                    newCategory.CategoryId === null
                                                        ? true
                                                        : pro.CategoryId ===
                                                        parseInt(newCategory.CategoryId);
                                                return matchesCategory;
                                            })?.map((x) => {
                                                return <option value={x.Id}>{x.DesignName}</option>;
                                            })}
                                    </select>
                                    <label>
                                        Select Purity<sup>*</sup>
                                    </label>
                                    <select
                                        name="PurityId"
                                        value={newCategory.PurityId}
                                        onChange={handleNewCategoryChange}
                                        required={"required"}
                                    >
                                        <option value={""}>Select an Option</option>
                                        {purityData?.map((x) => {
                                            return <option value={x.Id}>{x.PurityName}</option>;
                                        })}
                                    </select>
                                    <label>Stone Less Percent</label>
                                    <input
                                        name="StoneLessPercent"
                                        value={newCategory.StoneLessPercent}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
                                    <label>Making Fixed Amt</label>
                                    <input
                                        name="MakingFixedAmt"
                                        value={newCategory.MakingFixedAmt}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
                                    <label>MakingPercentage</label>
                                    <input
                                        name="MakingPercentage"
                                        value={newCategory.MakingPercentage}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
                                    <label>MakingPerGram</label>
                                    <input
                                        name="MakingPerGram"
                                        value={newCategory.MakingPerGram}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
                                    <label>MakingFixedWastage</label>
                                    <input
                                        name="MakingFixedWastage"
                                        value={newCategory.MakingFixedWastage}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
                                    <label>
                                        Select Template
                                    </label>
                                    <select
                                        name="DiamondSizeWeightRateTemplateId"
                                        value={newCategory.DiamondSizeWeightRateTemplateId}
                                        onChange={handleNewCategoryChange}
                                    >
                                        <option value={""}>Select an Template</option>
                                        {templateData?.map((x) => {
                                            return (
                                                <option value={x?.templateID} key={x.templateID}>
                                                    {x.templateName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>


                                <div style={{ marginTop: "20px" }}>
    <button 
        type="button"  // Add this
        style={{ marginRight: "10px" }} 
        onClick={() => { setShowSKU(true); }}
    >
        SKU
    </button>
    <button 
        type="button"  // Add this
        onClick={() => { setShowSKU(false); }}
    >
        Stones
    </button>
</div>

{showSKU ? (

    <div
                                    style={{
                                        overflowX: "auto",
                                        borderTop: "1px solid rgba(0,0,0,0.2)",
                                        borderBottom: "1px solid rgba(0,0,0,0.2)",
                                        marginTop: "30px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <table
                                        className="adminInventoryMainTable"
                                        style={{
                                            width: "100%",
                                            marginTop: "30px",
                                            marginBottom: "20px",
                                            marginLeft: "1rem",
                                            boxSizing: "border-box",
                                        }}
                                    >
                                        <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {" "}
                                                <input
                                                    type="checkbox"
                                                    checked={allSelected}
                                                    onChange={handleSelectAll}
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                        marginRight: "10px",
                                                    }}
                                                />{" "}
                                                SELECT
                                            </th>
                                            <th>SKU</th>
                                            <th>Category</th>
                                            <th>Product</th>
                                            <th>Purity</th>
                                            <th>Pieces</th>
                                            <th>Sketch Number</th>
                                            <th>Weight Categories</th>
                                        </tr>
                                        </thead>
                                        <tbody style={{position: "relative"}}>
                                        {skuData
                                            .filter((sku) => {
                                                // const parsedVendorId = parseInt(newCategory.VendorId);
                                                // const matchesVendor =
                                                //     newCategory.VendorId !== null &&
                                                //     newCategory.VendorId !== "" &&
                                                //     sku.SKUVendor.some(
                                                //         (x) => x.VendorId === parsedVendorId
                                                //     );
                                                // {
                                                //     /* sku.SKUVendor[0].VendorId === parsedVendorId; */
                                                // }
                                                const matchesCategory =
                                                    newCategory.CategoryId === 0 ||
                                                    newCategory.CategoryId === "" ||
                                                    newCategory.CategoryId === null
                                                        ? true
                                                        : sku.CategoryId ===
                                                        parseInt(newCategory.CategoryId);
                                                const matchesProduct =
                                                    newCategory.ProductId === 0 ||
                                                    newCategory.ProductId === "" ||
                                                    newCategory.ProductId === null
                                                        ? true
                                                        : sku.ProductId ===
                                                        parseInt(newCategory.ProductId);
                                                const matchesPurity =
                                                    newCategory.PurityId === 0 ||
                                                    newCategory.PurityId === "" ||
                                                    newCategory.PurityId === null
                                                        ? true
                                                        : sku.PurityId === parseInt(newCategory.PurityId);
                                                const matchesDesign =
                                                    newCategory.DesignId === 0 ||
                                                    newCategory.DesignId === "" ||
                                                    newCategory.DesignId === null
                                                        ? true
                                                        : sku.DesignId === parseInt(newCategory.DesignId);
                                                return (
                                                    // matchesVendor &&
                                                    matchesCategory &&
                                                    matchesProduct &&
                                                    matchesPurity &&
                                                    matchesDesign
                                                );
                                            })
                                            .map((x, index) => (
                                                <tr key={x.Id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <input
                                                            style={{width: "20px", height: "20px"}}
                                                            type="checkbox"
                                                            checked={!newCategory.OldEntry ? allSelectedTounche.some(
                                                                (tounche) =>
                                                                    tounche.StockKeepingUnit ===
                                                                    x.StockKeepingUnit
                                                            ) : newCategory?.StockKeepingUnit === x.StockKeepingUnit
                                                            }
                                                            onChange={(e) =>
                                                                handleIndividualCheckboxChange(e, x)
                                                            }
                                                            value={x.StockKeepingUnit}
                                                        />
                                                    </td>

                                                    <td style={{whiteSpace: "nowrap"}}>
                                                        {x.StockKeepingUnit}
                                                    </td>
                                                    <td>{x.CategoryName}</td>
                                                    <td>{x.ProductName}</td>
                                                    <td>{x?.PurityName}</td>
                                                    <td>{x.Pieces !== "" ? x.Pieces : 0}</td>
                                                    <td>{x.SketchNo !== "" ? x.SketchNo : 0}</td>
                                                    <td>
                                                        {x.WeightCategories !== ""
                                                            ? x.WeightCategories
                                                            : 0}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

): (
                // Render alternate UI here
                <div>
                <Stonetounch stones={newCategory.Stones} onAmountChange={handleAmountChange} />
                </div>
            )
}


                                
                                {!loading ? <button type="submit">Submit</button> : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
