import React, {useEffect, useState} from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import {TbCircleNumber1} from "react-icons/tb";
import {
    a100,
    a104,
    a107,
    a108,
    a109,
    a110,
    a111,
    a112,
    a119,
    a120,
    a121,
    a122,
    a123,
    a124,
    a125,
    a126,
    a127,
    a128,
    a129,
    a130,
    a131,
    a132,
    a133,
    a137,
    a138,
    a139, a149,
    a18, a226,
    a35,
    a7,
    a95,
    a96,
    a97,
    a98,
    a99,
} from "../../../Api/RootApiPath";
import {useSelector} from "react-redux";
import {RiListUnordered, RiPlayListAddLine} from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";

export default function AdminAddBox() {
    const [active, setActive] = useState("List");
    const [showError, setShowError] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [messageToShow, setMessageToShow] = useState("");
    const [loading, setLoading] = useState(false);

    const [allCategories, setAllCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        CategoryId: "",
        BoxName: "",
        EmptyWeight: "",
        ProductId: "",
        CompanyId: "",
        BranchId: "",
        Description: "",
        Status: "",

        OldEntry: false,
    });
    const [allCompaniesList, setAllCompaniesList] = useState([]);
    const [allBranchesList, setAllBranchesList] = useState([]);
    const [allDepartmentsList, setAllDepartmentsList] = useState([]);
    const [allRolesList, setAllRolesList] = useState([]);
    const [allCategoriesList, setAllCategoriesList] = useState([]);
    const [allProductsList, setAllProductsList] = useState([]);
    const allStates = useSelector((state) => state);
    const adminLoggedIn = allStates.reducer1;
    //   let Entryby_Staff_id = parseInt(adminLoggedIn);
    const clientCode = adminLoggedIn.ClientCode;
    const employeeCode = adminLoggedIn.EmployeeCode;
    const [selectedPacketMaster, setSelectedPacketMaster] = useState([]);
    const [inputPacketMaster, setInputPacketMaster] = useState("");
    const [PacketMasterData, setPacketMasterData] = useState([]);
    const handleAddVendor = () => {
        if (inputPacketMaster && !selectedPacketMaster.includes(inputPacketMaster)) {
            setSelectedPacketMaster([...selectedPacketMaster, inputPacketMaster]);
            setInputPacketMaster("");
        }
    };

    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a226, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => setPacketMasterData(data));
    }, []);

    const handleRemoveVendor = (index) => {
        const newVendors = selectedPacketMaster.filter((_, i) => i !== index);
        setSelectedPacketMaster(newVendors);
    };

    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    const fetchAllCategory = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a137, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data, "data,");
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
        console.log(data, "data,");
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
        console.log(data, "data,");
        try {
            if (data.length > 0) {
                setAllBranchesList(data);
            } else {
                // alert("Please Add Branch First");
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
        console.log(data, "data,");
        try {
            if (data.length > 0) {
                setAllDepartmentsList(data);
            } else {
                // alert("Please Add Departments First");
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
        console.log(data, "data,");
        try {
            if (data.length > 0) {
                setAllRolesList(data);
            } else {
                // alert("Please Add Roles First");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchAllRoles();
    }, []);

    const fetchAllCategoriesList = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a125, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data, "data,");
        try {
            if (data.length > 0) {
                setAllCategoriesList(data);
            } else {
                // alert("Please Add Category First");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchAllCategoriesList();
    }, []);

    const fetchAllProductsList = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a128, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data, "data,");
        try {
            if (data.length > 0) {
                setAllProductsList(data);
            } else {
                // alert("Please Add Product First");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchAllProductsList();
    }, []);


    const handleNewCategoryChange = (e) => {
        const {name, value} = e.target;
        // Update the edited data in the state
        setNewCategory({...newCategory, [name]: value});
    };

        console.log("selectedPacketMasterselectedPacketMaster : ",selectedPacketMaster)
    const addNewCategory = async (e) => {
        e.preventDefault();
        const trasformData = selectedPacketMaster.map((item) => item.split(" - ")[1]).join(',');
        setLoading(true);
        const formData = {
            ClientCode: clientCode,
            CategoryId: newCategory.CategoryId,
            BoxName: newCategory.BoxName,
            EmptyWeight: newCategory.EmptyWeight,
            ProductId: newCategory.ProductId,
            CompanyId: newCategory.CompanyId,
            BranchId: newCategory.BranchId,
            Description: newCategory.Description,
            Status: newCategory.Status,
            EmployeeCode: employeeCode,
            PacketIds: trasformData,
            ...(newCategory.OldEntry ? {Id: newCategory.Id} : {}),
        };
        try {
            const response = await fetch(
                !newCategory.OldEntry ? a139 : a138,
                // a96,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();
            fetchAllCategory();
            setActive("List");
            setNewCategory({
                CategoryId: "",
                BoxName: "",
                EmptyWeight: "",
                ProductId: "",
                CompanyId: "",
                BranchId: "",
                Description: "",
                Status: "",
                OldEntry: false,
            });
            if (data.message) {
                // alert(data.message);
                setMessageType("error");
                setMessageToShow(data.message);
                setShowError(true);
                setActive("AddNew");
            } else {
                setMessageType("success");
                setMessageToShow("Box Added Successfully");
                setShowError(true);
            }
            setLoading(false);
            setSelectedPacketMaster([]);
            console.log(data);
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
        // console.log(data.PacketIds.split(","), "data");
        setNewCategory({...data, OldEntry: true});
        if (data.PacketIds && data.PacketIds.split(",").length > 0) {
            setSelectedPacketMaster(data.PacketIds.split(","))
        }
        setActive("AddNew");
    };
    return (
        <div>
            <AdminHeading/>
            <div className="adminMainBodyBox">
                {showError ? (
                    <AlertMessage message={messageToShow} type={messageType}/>
                ) : null}
                <AdminBreadCrump
                    title={"Add Box"}
                    companyName={"Loyalstring"}
                    module={"Product Masters"}
                    page={"Box"}
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
                                <p>All Boxes</p>
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
                                <p>Add Box</p>
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
                                    <th>Edit</th>
                                    <th>Sr.No</th>
                                    {/* <th>Category Name</th> */}
                                    <th>Box Name</th>
                                    <th>Packets</th>
                                    <th>Empty Weight</th>
                                    {/* <th>Product Id</th>
                    <th>Company Id</th>
                    <th>Branch Id</th> */}
                                    <th>Description</th>
                                    {/* <th>Status</th> */}
                                </tr>
                                </thead>
                                <tbody>
                                {allCategories.map((x, index) => (
                                    <tr key={x.id}>
                                        <td>
                                            <button
                                                className="adminAddCategoryEditButton"
                                                // onClick={() => handleEditClick(x.id)}
                                                onClick={() => handleEditData(x)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td>{index + 1}</td>
                                        {/* <td>{x.CategoryId}</td> */}
                                        <td>{x.BoxName}</td>
                                        <td>
                                            {x.PacketIds && x.PacketIds.split(',').length > 0 ? (
                                                x.PacketIds.split(',').map((item, index) => (
                                                    <div key={index}>{item.split("-")[1]}</div>
                                                ))
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td>{x.EmptyWeight}</td>
                                        {/* <td>{x.ProductId}</td>
                      <td>{x.CompanyId}</td>
                      <td>{x.BranchId}</td> */}
                                        <td>{x.Description}</td>
                                        {/* <td>{x.Status}</td> */}
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
                            <p>Add New Box</p>
                            <form onSubmit={addNewCategory}>
                                <div
                                    style={{
                                        gridTemplateColumns: "repeat(4,1fr)",
                                        columnGap: "40px",
                                    }}
                                    className="adminCategoryAddCategoryInnerBox"
                                >
                                    <label>
                                        Company <sup>*</sup>
                                    </label>
                                    <select
                                        name="CompanyId"
                                        value={newCategory.CompanyId}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required="required"
                                    >
                                        <option value={""}>Select an option</option>
                                        ;
                                        {allCompaniesList.map((x) => {
                                            return (
                                                <>
                                                    <option value={x.Id}>{x.CompName}</option>
                                                    ;
                                                </>
                                            );
                                        })}
                                    </select>{" "}
                                    <label>
                                        Branch <sup>*</sup>{" "}
                                    </label>
                                    <select
                                        name="BranchId"
                                        value={newCategory.BranchId}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required="required"
                                    >
                                        <option value={""}>Select an option</option>
                                        ;
                                        {allBranchesList.map((x) => {
                                            return (
                                                <>
                                                    <option value={x.Id}>{x.BranchName}</option>
                                                    ;
                                                </>
                                            );
                                        })}
                                    </select>{" "}
                                    <label>
                                        Category <sup>*</sup>
                                    </label>
                                    <select
                                        name="CategoryId"
                                        value={newCategory.CategoryId}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required="required"
                                    >
                                        <option value={""}>Select an option</option>
                                        ;
                                        {allCategoriesList.map((x) => {
                                            return (
                                                <>
                                                    <option value={x.Id}>{x.CategoryName}</option>
                                                    ;
                                                </>
                                            );
                                        })}
                                    </select>{" "}
                                    <label>
                                        Product<sup>*</sup>
                                    </label>
                                    <select
                                        name="ProductId"
                                        value={newCategory.ProductId}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required="required"
                                    >
                                        <option value={""}>Select an option</option>
                                        ;
                                        {allProductsList.map((x) => {
                                            return (
                                                <>
                                                    <option value={x.Id}>{x.ProductName}</option>
                                                    ;
                                                </>
                                            );
                                        })}
                                    </select>{" "}
                                    <label>
                                        Box Name<sup>*</sup>
                                    </label>
                                    <input
                                        name="BoxName"
                                        value={newCategory.BoxName}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required="required"
                                    />
                                    <label>
                                        Empty Weight<sup>*</sup>
                                    </label>
                                    <input
                                        name="EmptyWeight"
                                        value={newCategory.EmptyWeight}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required="required"
                                    />
                                    <label>Description</label>
                                    <input
                                        name="Description"
                                        value={newCategory.Description}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
                                    <label htmlFor="Status">
                                        Status <sup>*</sup>
                                    </label>
                                    <select
                                        name="Status"
                                        required="required"
                                        value={newCategory.Status}
                                        onChange={handleNewCategoryChange}
                                    >
                                        <option value={""}>Select Status</option>
                                        <option value={"Active"}>Active</option>
                                        <option value={"InActive"}>InActive</option>
                                    </select>
                                    <div className="adminSkuAddSkuInnerItemsBox">
                                        <label htmlFor="netWt" style={{margin: "10px 0px"}}>Select Packet Master</label>

                                        <select
                                            type="number"
                                            // required="required"
                                            // name="VendorId"
                                            value={inputPacketMaster}
                                            onChange={(e) => setInputPacketMaster(e.target.value)}
                                        >
                                            <option value={0}>Select Packet</option>
                                            {PacketMasterData.map((x) => (
                                                <option value={`${x.PacketName} - ${x.Id}`}>
                                                    {`${x.PacketName} - ${x.Id}`}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            style={{marginBottom: "25px", margin: "0px 20px"}}
                                            type="button"
                                            onClick={handleAddVendor}
                                        >
                                            Add Packet
                                        </button>

                                    </div>
                                    <div
                                        style={{gridColumn: "span 2"}}
                                        className="adminSkuAddSkuInnerItemsBox"
                                        id="adminSkuAddSkuSelectVendor"
                                    >
                                        <label htmlFor="netWt">
                                            Total {selectedPacketMaster.length} Packets
                                        </label>
                                        <div
                                            style={{
                                                display: "flex",
                                                overflowX: "auto",
                                                gap: "10px",
                                                marginTop: "10px",
                                            }}
                                        >
                                            {selectedPacketMaster?.map((item, index) => (
                                                <div
                                                    key={index}
                                                    style={{
                                                        padding: "5px 10px",
                                                        borderRadius: "5px",
                                                        backgroundColor: "#f0f0f0",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        width: "auto",
                                                    }}
                                                >
                                                        <span style={{whiteSpace: "nowrap"}}>
                                                            {item}
                                                        </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveVendor(index)}
                                                        style={{
                                                            width: "25px",
                                                            height: "25px",
                                                            margin: "0px",
                                                            padding: "0px",
                                                            color: "red",
                                                            border: "none",
                                                            background: "transparent",
                                                        }}
                                                    >
                                                        &#10005; {/* Unicode cross symbol */}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                                {!loading ? <button type="submit">Submit</button> : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
