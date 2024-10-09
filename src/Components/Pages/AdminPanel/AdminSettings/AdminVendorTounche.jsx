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
    a174,
    a179,
    a180,
    a191,
    a95,
    a98,
} from "../../../Api/RootApiPath";
import {useSelector} from "react-redux";
import {RiListUnordered, RiPlayListAddLine} from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";
import GetApiService from "../../../Api/getapiService.jsx"
import Stonetounch from "../../../support/customertounchsupport/stones.jsx"

export default function AdminVendorTounche() {
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
    const [templateData, setTemplateData] = useState([]);

    const [filteredData, setFilteredData] = useState([]);
    const [fcat, setFcat] = useState("");
    const [fpro, setFpro] = useState("");

    const [allCategories, setAllCategories] = useState([]);
    const [allVendors, setAllVendors] = useState([]);
    const [newCategory, setNewCategory] = useState({
        VendorId: 0,
        CategoryId: 0,
        ProductId: 0,
        ClientCode: "",
        FinePure: false,
        PurityId: 0,
        WastageWt: "0",
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
    const [showSKU, setShowSKU] = useState(true);

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

    useEffect(() => {
        window.scroll(0, 0);
    }, []);


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
                 
                const fetchedStones = result.value;

                // Convert the fetched stones to the required structure
                const formattedStones = fetchedStones.map(stone => ({
                  CustomerId: 0,  // Keep CustomerId as 0
                  VendorId: 0,    // Keep VendorId as 0 for now, will change later
                  StoneId: stone.Id,
                  StoneName: stone.StoneName,
                  StoneWeight: stone.StoneWeight,
                  StonePieces: stone.StonePieces,
                  StoneRate: stone.StoneRate,
                  StoneAmount: stone.StoneAmount,
                  StoneLessPercent: stone.StoneLessPercent
                }));
    
                console.log('Converted stones:', formattedStones);
    
                // Set the new category with the converted stones
                setNewCategory(prevCategory => ({
                  ...prevCategory,
                  Stones: formattedStones,  // Set the converted stones here
                }));
    
                setAllStonesList(formattedStones);



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
                // handleError(
                //   `Failed to load data for API ${index + 1}: ${result.reason}`
                // );
              }
            }
          });
        } catch (error) {
          console.error("Error loading data:", error);
        //   handleError("Error loading data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        loadData();
      }, [clientCode]);
    





    const fetchAllCategory = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a174, {
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
            .then((y) => {
                setProductsData(y);
            });
    }, []);

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
            .then((data) => {
                console.log("checking products ", data);
                setPurityData(data);
            });
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
            .then((data) => {
                console.log("checking sku data 1", data);
                setSkuData(data);
            });
    }, []);

    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a191, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwMzc1MDA4NTksImlzcyI6Ijk4Nzk4ODc2NzU3NjU2NjU0NjU0IiwiYXVkIjoiSW5mb0Bsb3lhbHN0cmluZy5jb20ifQ.nOtc537wlSYm_97ljruCyOcG7wjXOrNUtxZy206OfOQ",
            },
            body: JSON.stringify(formData),
        }).then((res) => res.json())
            .then((data) => {
                const processedData = data?.map((item) => ({
                    templateID: item?.Id,
                    templateName: item?.TemplateName || "default",
                }));
                setTemplateData(processedData);
            });
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

    const fetchAllVendors = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a149, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllVendors(data);
            } else {
                // alert("Please Add Company First");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllVendors();
    }, []);

    const handleNewCategoryChange = (e) => {
        const {name, value, key} = e.target;
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

    const addNewCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            VendorId: parseInt(newCategory.VendorId),
            CategoryId: parseInt(newCategory.CategoryId),
            ProductId: parseInt(newCategory.ProductId),
            ClientCode: clientCode,
            PurityId: parseInt(newCategory.PurityId),
            WastageWt: `${newCategory.WastageWt}`,
            MakingFixedAmt: `${newCategory.MakingFixedAmt}`,
            MakingPerGram: `${newCategory.MakingPerGram}`,
            MakingFixedWastage: `${newCategory.MakingFixedWastage}`,
            MakingPercentage: `${newCategory.MakingPercentage}`,
            StockKeepingUnit: newCategory.StockKeepingUnit,
            CompanyId: CompanyId ? CompanyId : 0,
            CounterId: CounterId ? CounterId : 0,
            BranchId: BranchId ? BranchId : 0,
            EmployeeId: EmployeeId ? EmployeeId : 0,
            FinePure: newCategory.FinePure,
            DiamondSizeWeightRateTemplateId: parseInt(
                newCategory.DiamondSizeWeightRateTemplateId
            ),
            Stones: newCategory.Stones.map((stone) => ({
            ...stone,
            VendorId: parseInt(newCategory.VendorId) // Update VendorId for each stone
        })),
            ...(newCategory.OldEntry ? {Id: newCategory.Id} : {}),
        };
        let newArray = allSelectedTounche
            .filter((x) => x.StockKeepingUnit !== newCategory.StockKeepingUnit)
            .map((item) => {
                return {
                    ...item,
                    FinePure: newCategory.FinePure,
                    VendorId: parseInt(newCategory.VendorId),
                    CategoryId: parseInt(newCategory.CategoryId),
                    ProductId: parseInt(newCategory.ProductId),
                    ClientCode: clientCode,
                    PurityId: parseInt(newCategory.PurityId),
                    WastageWt: `${newCategory.WastageWt}`,
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
                    Stones: newCategory.Stones.map((stone) => ({
                        ...stone,
                        VendorId: parseInt(newCategory.VendorId), // Set VendorId for each stone
                    })),
                };
            });

        const newArrayData = newArray.length > 0 ? [...newArray] : [formData];
        try {
            const response = await fetch(
                !newCategory.OldEntry ? a179 : a180,
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
                VendorId: 0,
                CategoryId: 0,
                ProductId: 0,
                ClientCode: "",
                PurityId: 0,
                WastageWt: "0",
                MakingFixedAmt: "0",
                MakingPerGram: "0",
                MakingFixedWastage: "0",
                MakingPercentage: "0",
                StockKeepingUnit: "",
                CompanyId: 0,
                CounterId: 0,
                BranchId: 0,
                EmployeeId: 0,
                FinePure: false,
                OldEntry: false,
                DiamondSizeWeightRateTemplateId: 0,
                Stones:[]
            });
            if (data.message) {
                // alert(data.message);
                setMessageType("error");
                setMessageToShow(data.Message);
                setShowError(true);
                setActive("AddNew");
            } else {
                setMessageType("success");
                setMessageToShow("Vendor Tounche Added Successfully");
                setShowError(true);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setShowError(false);
        }, 2000);
    }, [showError]);

    const handleEditData = (data) => {
        console.log(data, "editData");
        setNewCategory({...data, OldEntry: true});
        setActive("AddNew");
    };

    const handleAllSelectedTounche = (e, x) => {
        const {value, checked} = e.target;
        if (checked) {
            const newTounche = {
                VendorId: parseInt(newCategory.VendorId),
                CategoryId: parseInt(x.CategoryId),
                ProductId: parseInt(x.ProductId),
                PurityId: parseInt(x.PurityId),
                ClientCode: clientCode,
                FinePure: newCategory.FinePure,
                WastageWt: newCategory.WastageWt,
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
            };
            setAllSelectedTounche([...allSelectedTounche, newTounche]);
        } else {
            setAllSelectedTounche(allSelectedTounche.filter((item) => item.StockKeepingUnit !== value));
        }
    };

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setAllSelected(checked);
        if (checked) {
            const selectedItems = skuData
                .filter((sku) => {
                    const parsedVendorId = parseInt(newCategory.VendorId);
                    const matchesVendor =
                        newCategory.VendorId !== null &&
                        newCategory.VendorId !== "" &&
                        sku.SKUVendor.some((x) => x.VendorId === parsedVendorId);

                    const matchesCategory =
                        newCategory.CategoryId === 0 ||
                        newCategory.CategoryId === "" ||
                        newCategory.CategoryId === null
                            ? true
                            : sku.CategoryId === parseInt(newCategory.CategoryId);

                    const matchesProduct =
                        newCategory.ProductId === 0 ||
                        newCategory.ProductId === "" ||
                        newCategory.ProductId === null
                            ? true
                            : sku.ProductId === parseInt(newCategory.ProductId);

                    const matchesPurity =
                        newCategory?.PurityId === 0 ||
                        newCategory?.PurityId === "" ||
                        newCategory?.PurityId === null
                            ? true
                            : sku?.PurityId === parseInt(newCategory?.PurityId);

                    return (
                        matchesVendor && matchesCategory && matchesProduct && matchesPurity
                    );
                })
                .map((x) => createTouncheObject(x));
            setAllSelectedTounche(selectedItems);
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
        VendorId: parseInt(newCategory.VendorId),
        CategoryId: parseInt(x.CategoryId),
        ProductId: parseInt(x.ProductId),
        PurityId: parseInt(x.PurityId),
        ClientCode: clientCode,
        FinePure: newCategory.FinePure,
        WastageWt: newCategory.WastageWt,
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

    const handleAmountChange = (index, newRate) => {
        // Update the stone rate at the specified index
        setNewCategory((prevCategory) => {
          const updatedStones = [...prevCategory.Stones];
          updatedStones[index].StoneRate = newRate;
          return {
            ...prevCategory,
            Stones: updatedStones,
          };
        });
      };

    return (
        <div>
            <AdminHeading/>
            <div className="adminMainBodyBox">
                {showError ? (
                    <AlertMessage message={messageToShow} type={messageType}/>
                ) : null}
                <AdminBreadCrump
                    title={"Add Vendor Tounche"}
                    companyName={"Loyalstring"}
                    module={"Settings"}
                    page={"Vendor Tounche"}
                />
                <div className="adminAddCategoryMainBox">
                    <div className="adminAddCategoryInnerBox">
                        <div className="adminAddCategoryInnerBoxTitlesBox">
                            <div
                                onClick={() => {
                                    setActive("List");
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
                                <p>All Vendor Tounche</p>
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
                                    <RiPlayListAddLine/>
                                </div>
                                <p>Add Vendor Tounche</p>
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
                                    <th>Vendor</th>
                                    <th>Template Name</th>
                                    <th>Category</th>
                                    <th>Product</th>
                                    <th>Purity</th>
                                    <th>SKU</th>
                                    <th>Wastage</th>
                                    <th>Making FixedAmt</th>
                                    <th>Making Percentage</th>
                                    <th>Making PerGram</th>
                                    <th>Making Fixed Wastage</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {allCategories.map((x, index) => (
                                    <tr key={x.Id}>
                                        <td>{index + 1}</td>
                                        <td style={{whiteSpace: "nowrap"}}>{x.VendorName}</td>
                                        <td>
                                            {getNameFunction(x.DiamondSizeWeightRateTemplateId)}
                                        </td>
                                        <td>{x.CategoryName}</td>
                                        <td>{x.ProductName}</td>
                                        <td>{x?.PurityDetails?.PurityName}</td>
                                        <td>{x.StockKeepingUnit}</td>
                                        <td>{x.WastageWt}</td>
                                        <td>{x.MakingFixedAmt}</td>
                                        <td>{x.MakingPercentage}</td>
                                        <td>{x.MakingPerGram}</td>
                                        <td>{x.MakingFixedWastage}</td>
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
                                            {/*    // onClick={() => handleDeleteDatalist(x)}*/}
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
                            <p>Add New Vendor Tounche</p>
                            <form onSubmit={addNewCategory}>
                                <div
                                    style={{
                                        gridTemplateColumns: "repeat(4,1fr)",
                                        columnGap: "40px",
                                    }}
                                    className="adminCategoryAddCategoryInnerBox"
                                >
                                    <label>
                                        Select Vendor<sup>*</sup>
                                    </label>
                                    <select
                                        name="VendorId"
                                        value={newCategory.VendorId}
                                        onChange={handleNewCategoryChange}
                                        required={"required"}
                                    >
                                        <option value={""}>Select an Option</option>
                                        {allVendors.map((x) => {
                                            return (
                                                <option value={x.Id}>
                                                    {/* {x.Id} - {x.VendorName} */}
                                                    {`${x.VendorName} - ${x.Id}`}
                                                </option>
                                            );
                                        })}
                                    </select>
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
                                            return (
                                                <option value={x.Id} key={x.CategoryName}>
                                                    {x.CategoryName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <label>
                                        Select Product<sup>*</sup>
                                    </label>
                                    <select
                                        required={"required"}
                                        name="ProductId"
                                        value={newCategory.ProductId}
                                        onChange={handleNewCategoryChange}
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
                                            })

                                            .map((x) => {
                                                return <option value={x.Id}>{x.ProductName}</option>;
                                            })}
                                    </select>
                                    <label>
                                        Select Purity<sup>*</sup>
                                    </label>
                                    <select
                                        required={"required"}
                                        name="PurityId"
                                        value={newCategory.PurityId}
                                        onChange={handleNewCategoryChange}
                                    >
                                        <option value={""}>Select an Option</option>
                                        {purityData
                                            .filter((pro) => {
                                                const matchesCategory =
                                                    newCategory.CategoryId === 0 ||
                                                    newCategory.CategoryId === "" ||
                                                    newCategory.CategoryId === null
                                                        ? true
                                                        : pro.CategoryId ===
                                                        parseInt(newCategory.CategoryId);
                                                return matchesCategory;
                                            })

                                            .map((x) => {
                                                return <option value={x.Id}>{x.PurityName}</option>;
                                            })}
                                    </select>

                                    <label>Gram/Fine</label>
                                    <select
                                        name="FinePure"
                                        value={newCategory.FinePure}
                                        onChange={handleNewCategoryChange}
                                    >
                                        <option value={true}>Gram</option>
                                        <option value={false}>Fine</option>
                                    </select>

                                    <label>Wastage</label>
                                    <input
                                        name="WastageWt"
                                        value={newCategory.WastageWt}
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
                                    <label>Making Per Gram</label>
                                    <input
                                        name="MakingPerGram"
                                        value={newCategory.MakingPerGram}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
                                    <label>Making Fixed Wastage</label>
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
                                        <option value={""}>Select an Option</option>
                                        {templateData?.map((x) => {
                                            return (
                                                <option value={x?.templateID} key={x.templateName}>
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
                                                const parsedVendorId = parseInt(newCategory.VendorId);
                                                const matchesVendor =
                                                    newCategory.VendorId !== null &&
                                                    newCategory.VendorId !== "" &&
                                                    sku.SKUVendor.some(
                                                        (x) => x.VendorId === parsedVendorId
                                                    );
                                                {
                                                    /* sku.SKUVendor[0].VendorId === parsedVendorId; */
                                                }
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
                                                return (
                                                    matchesVendor &&
                                                    matchesCategory &&
                                                    matchesProduct &&
                                                    matchesPurity
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
