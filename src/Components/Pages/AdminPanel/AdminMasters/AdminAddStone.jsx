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
    a139,
    a140,
    a141,
    a142,
    a143,
    a144,
    a145,
    a146,
    a147,
    a148,
    a18,
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

export default function AdminAddStone() {
    const [active, setActive] = useState("List");
    const [showError, setShowError] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [messageToShow, setMessageToShow] = useState("");
    const [loading, setLoading] = useState(false);

    const [allCategories, setAllCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        StoneName: "",
        StoneWeight: "0",
        StonePieces: "1",
        StoneRate: "0",
        StoneAmount: "0",
        Description: "",
        StoneLessPercent: "100",

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

    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    const fetchAllCategory = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a146, {
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
                // alert("Please Add Department First");
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
                // alert("Please Add Role First");
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
                // alert("Please Add Categories First");
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
        if (name === "StoneWeight" || name === "StoneRate") {
            newCategory.StoneAmount = (name === "StoneRate" ? value : newCategory.StoneRate) * (name == "StoneWeight" ? value : newCategory.StoneWeight);
        }
        setNewCategory({...newCategory, [name]: value});
    };
    console.log(newCategory, "newCategory");
    console.log(newCategory, "newCategory");

    const addNewCategory = async (e) => {
        e.preventDefault();

    const nameExists = allCategories.some(
      (category) => category.StoneName.toLowerCase() === newCategory.StoneName.toLowerCase()
    );
  
    // if (nameExists) {
    //   setMessageType("error");
    //   setMessageToShow("Stone name already exists.");
    //   setShowError(true);
    //   setLoading(false);
    //   return;
    // }

        setLoading(true);
        const formData = {
            StoneName: newCategory.StoneName,
            StoneWeight: newCategory.StoneWeight,
            StonePieces: newCategory.StonePieces,
            StoneRate: newCategory.StoneRate,
            StoneAmount: String(newCategory.StoneAmount),
            Description: newCategory.Description,
            StoneLessPercent: newCategory.StoneLessPercent ? newCategory.StoneLessPercent : "100",
            ClientCode: clientCode,
            EmployeeCode: newCategory.EmployeeCode ? newCategory.EmployeeCode : 0,

            ...(newCategory.OldEntry ? {Id: newCategory.Id} : {}),
        };
        console.log(formData, "formData to send");
        try {
            const response = await fetch(
                !newCategory.OldEntry ? a148 : a147,
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
                StoneName: "",
                StoneWeight: "0",
                StonePieces: "1",
                StoneRate: "0",
                StoneAmount: "0",
                Description: "",
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
                setMessageToShow("Stone Added Successfully");
                setShowError(true);
            }
            setLoading(false);
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
        console.log(data, "data");
        console.log(data, "data");
        console.log(data, "data");
        setNewCategory({...data, OldEntry: true});
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
                    title={"Add Stone"}
                    companyName={"Loyalstring"}
                    module={"Product Masters"}
                    page={"Stone"}
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
                                <p>All Stones</p>
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
                                <p>Add Stone</p>
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
                                    {/* <th>Product Id</th> */}
                                    <th>Edit</th>
                                    <th>Stone Name</th>
                                    <th>Stone Weight</th>
                                    <th>Stone Pieces</th>
                                    <th>Stone Rate</th>
                                    <th>Stone Amount</th>
                                    {/* <th>Stone Less Percent</th> */}
                                    <th>Description</th>
                                    {/* <th>Client Code</th>
                    <th>Employee Code</th> */}
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
                                        {/* <td>{x.ProductId}</td> */}
                                        <td>{x.StoneName}</td>
                                        <td>{x.StoneWeight}</td>
                                        <td>{x.StonePieces}</td>
                                        <td>{x.StoneRate}</td>
                                        <td>{x.StoneAmount}</td>
                                        {/* <td>{x.StoneLessPercent}</td> */}
                                        <td>{x.Description}</td>
                                        {/* <td>{x.ClientCode}</td>
                      <td>{x.EmployeeCode}</td> */}
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
                            <p>Add New Stone</p>
                            <form onSubmit={addNewCategory}>
                                <div
                                    style={{
                                        gridTemplateColumns: "repeat(4,1fr)",
                                        columnGap: "40px",
                                    }}
                                    className="adminCategoryAddCategoryInnerBox"
                                >
                                    <label>
                                        Stone Name<sup>*</sup>
                                    </label>
                                    <input
                                        name="StoneName"
                                        value={newCategory.StoneName}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required="required"
                                    />
                                    {/* <label>
                                        Stone Less Percent<sup>*</sup>
                                    </label>
                                    <input
                                        name="StoneLessPercent"
                                        value={newCategory.StoneLessPercent}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    /> */}

                                    <label>
                                        Stone Weight<sup>*</sup>
                                    </label>
                                    <input
                                        name="StoneWeight"
                                        value={newCategory.StoneWeight}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required="required"
                                    />

                                    <label>
                                        Stone Pieces<sup>*</sup>
                                    </label>
                                    <input
                                        name="StonePieces"
                                        value={newCategory.StonePieces}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required="required"
                                    />

                                    <label>Stone Rate</label>
                                    <input
                                        name="StoneRate"
                                        value={newCategory.StoneRate}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        // required="required"
                                    />

                                    <label>Stone Amount</label>
                                    <input
                                        name="StoneAmount"
                                        value={newCategory.StoneAmount}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        readOnly={true}
                                        // required="required"
                                    />

                                    <label>Description</label>
                                    <input
                                        name="Description"
                                        value={newCategory.Description}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
                                    {/*    <label htmlFor="ClientCode">
                    Client Code<sup>*</sup>
                  </label>
                  <input
                    name="ClientCode"
                    value={newCategory.ClientCode}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required
                  />

                  <label htmlFor="EmployeeCode">
                    Employee Code<sup>*</sup>
                  </label>
                  <input
                    name="EmployeeCode"
                    value={newCategory.EmployeeCode}
                    onChange={handleNewCategoryChange}
                    type="text"
                  required 
                  />*/}
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
