import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
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
  a18,
  a35,
  a7,
  a95,
  a96,
  a97,
  a98,
  a99,
  a207,
} from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";

export default function AdminAddBox() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [loading, setLoading] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    CollectionId:"",
    CollectionName: "",
    CompanyId: "",
    BranchId: "",
    Status: "",
    Description: "",
    Slug: "",
    SlabCollectionList: [],
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

  const fetchAllCategory1 = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a207, {
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
        // setCustomerslab(data);

        const updatedData = data.map((item) => ({
          ...item,
          Wastage: "", // Ensure Wastage exists in each item
          SlabId: "",
          EmployeeId: "",
        }));
        setCustomerslab(updatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCategory1();
  }, []);

  const fetchAllCategory = async () => {
    const formData = {
      ClientCode: clientCode,
    };

    try {
      // Fetch collections (for reading a collection)
      const collectionResponse = await fetch(a140, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const collectionsData = await collectionResponse.json();

      // Fetch slabs
      const slabResponse = await fetch(a207, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const slabsData = await slabResponse.json();

      const newCategoryData = {
        CollectionId:"",
        CollectionName: "",
        CompanyId: "",
        BranchId: "",
        Status: "",
        Description: "",
        Slug: "",
        OldEntry: false, // Mark as a new entry
        SlabCollectionList: slabsData.map((slab) => ({
          SlabId: slab.Id,
          Wastage: "", // Default value for wastage, can be updated by the user
          EmployeeId: "", // Default employee ID
          CustomerSlabName: slab.CustomerSlabName,
        })),
      };

      
      setNewCategory(newCategoryData);

      if (collectionsData.length > 0 && slabsData.length > 0) {
        // Mapping slabs for each collection
        const updatedData = collectionsData.map((collection) => {
          console.log("checking edit slabs", collection);
          const collectionSlabs = collection.SlabCollectionList || [];

          // Merge slabResponse slabs with the collection's existing slabs
          const mergedSlabs = slabsData.map((slab) => {
            const existingSlab = collectionSlabs.find(
              (cSlab) => cSlab.SlabId === slab.Id
            );

            return existingSlab
              ? {
                  ...existingSlab,
                  CollectionWastage:
                    existingSlab.CollectionWastage ||
                    slab.CollectionWastage ||
                    "", // Use correct Wastage property
                  EmployeeId: existingSlab.EmployeeId || slab.EmployeeId || "", // Merge EmployeeId properly
                  ClientCode: clientCode, // Ensure ClientCode exists
                  StatusType: existingSlab.StatusType ?? true, // Handle boolean properties properly
                  CustomerSlabName: slab.CustomerSlabName
                }
              : {
                  CustomerSlabName: slab.CustomerSlabName || "", // Default value for new slab
                  SlabId: slab.Id,
                  CollectionWastage: slab.CollectionWastage || "", // Use slab's default Wastage if available
                  EmployeeId: slab.EmployeeId || "", // Default value for EmployeeId
                  ClientCode: clientCode, // Add ClientCode for new slabs
                  StatusType: true, // Default status
                  CollectionId: collection.Collection.Id, // Ensure CollectionId is linked
                };
          });

          return {
            CollectionId: collection.Collection.Id,
            CollectionName: collection.Collection.CollectionName,
            CompanyId: collection.Collection.CompanyId,
            BranchId: collection.Collection.BranchId,
            Status: collection.Collection.Status,
            Description: collection.Collection.Description,
            Slug: collection.Collection.Slug,
            OldEntry: collection.Id ? true : false, // Mark if it's an old entry
            SlabCollectionList: mergedSlabs,
          };
        });

        // Update state with all collections
        setAllCategories(updatedData);
      } else {
        // Handle empty data case
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
      console.error("Error fetching data", error);
    }
  };

  const fetchAllCategoryx = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a140, {
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

  console.log(allCategories, "allCategories");
  console.log(allCompaniesList, "allCompaniesList");
  console.log(allDepartmentsList, "allDepartmentsList");
  console.log(allBranchesList, "allBranchesList");
  console.log(allRolesList, "allRolesList");
  console.log(allCategoriesList, "allCategoriesList");

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setNewCategory({ ...newCategory, [name]: value });
  };
  console.log(newCategory, "newCategory");
  console.log(newCategory, "newCategory");

  const addNewCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const formData = {
    //   CollectionName: newCategory.CollectionName,
    //   CompanyId: newCategory.CompanyId,
    //   BranchId: newCategory.BranchId,
    //   Status: "Active",
    //   ClientCode: clientCode,
    //   EmployeeCode: employeeCode,
    //   Description: newCategory.Description,
    //   Slug: newCategory.Slug,

    //   ...(newCategory.OldEntry ? { Id: newCategory.Id } : {}),
    // };

    // const slabCollectionList = customerslab.map((customer) => ({
    //   SlabId: customer.SlabId || customer.Id, // Ensure the SlabId is used or fallback to Id
    //   CollectionWastage: customer.Wastage,    // Wastage value
    //   EmployeeId: 1
    // }));

    // const formData = {
    //   Collection: {
    //     CollectionName: newCategory.CollectionName,
    //     CompanyId: newCategory.CompanyId,
    //     BranchId: newCategory.BranchId,
    //     Status: "Active",
    //     ClientCode: clientCode,
    //     EmployeeCode: employeeCode,
    //     Description: newCategory.Description,
    //     Slug: newCategory.Slug,
    //     ...(newCategory.OldEntry ? { Id: newCategory.Id } : {})
    //   },
    //   SlabCollectionList: slabCollectionList
    // };

    const formData = {
      Collection: {
        Id:!newCategory.OldEntry ?0 :newCategory.CollectionId,
        CollectionName: newCategory.CollectionName,
        CompanyId: newCategory.CompanyId,
        BranchId: newCategory.BranchId,
        Status: newCategory.Status,
        ClientCode: clientCode, // Ensure you have the ClientCode available
        EmployeeCode: employeeCode, // Ensure you have the EmployeeCode available
        Description: newCategory.Description,
        Slug: newCategory.Slug,
      },
      SlabCollectionList: newCategory.SlabCollectionList.map((slab) => ({
        SlabId: slab.SlabId,
        CollectionWastage: slab.CollectionWastage, // Ensure you're using the correct property name
        EmployeeId: 1, // Fallback to employeeCode if not set
      })),
    };

    console.log(formData, "formData to send");
    try {
      const response = await fetch(
        !newCategory.OldEntry ? a142 : a141,
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
        CollectionId:"",
        CollectionName: "",
        CompanyId: "",
        BranchId: "",
        Status: "",
        Description: "",
        Slug: "",
        SlabCollectionList: [],
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
        setMessageToShow("Collection Added Successfully");
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
    
    setNewCategory({ ...data, OldEntry: true });
    setActive("AddNew");
    // console.log(newCategory, "edit dataa");
  };
  useEffect(() => {
    console.log(newCategory, "updated newCategory");
  }, [newCategory]);

  const handleCustomerValueChange1 = (index, event) => {
    const { value, name } = event.target;

    setCustomerslab((prev) => {
      const updatedCustomerslab = [...prev];
      if (name === "CustomerSlabName") {
        updatedCustomerslab[index].CustomerSlabName = value;
      } else if (name === "Wastage") {
        updatedCustomerslab[index].CollectionWastage = value;
        updatedCustomerslab[index].SlabId = updatedCustomerslab[index].Id;
        updatedCustomerslab[index].employeeCode = employeeCode;
      }
      return updatedCustomerslab;
    });
  };

  const handleCustomerValueChange = (index, event) => {
    const { value, name } = event.target;

    // Update the SlabCollectionList array inside newCategory
    setNewCategory((prevCategory) => {
      const updatedSlabList = [...prevCategory.SlabCollectionList];
      if (name === "CustomerSlabName") {
        updatedSlabList[index].CustomerSlabName = value;
      } else if (name === "Wastage") {
        updatedSlabList[index].CollectionWastage = value;
        updatedSlabList[index].SlabId = updatedSlabList[index].SlabId || ""; // Ensure SlabId is assigned
        updatedSlabList[index].EmployeeId =
          updatedSlabList[index].EmployeeId || ""; // Ensure EmployeeId is assigned
      }

      return {
        ...prevCategory,
        SlabCollectionList: updatedSlabList,
      };
    });
  };

  return (
    <div>
      <AdminHeading />
      <div className="adminMainBodyBox">
        {showError ? (
          <AlertMessage message={messageToShow} type={messageType} />
        ) : null}
        <AdminBreadCrump
          title={"Add Collection"}
          companyName={"Loyalstring"}
          module={"Product Masters"}
          page={"Collection"}
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
                  <RiListUnordered />
                </div>
                <p>All Collections</p>
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
                  <RiPlayListAddLine />
                </div>
                <p>Add Collection</p>
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
                    <th>Collection Name</th>
                    {/* <th>Company Id</th>
                    <th>Branch Id</th>
                    <th>Status</th> */}
                    <th>Description</th>
                    <th>Slug</th>
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
                      <td>{x.CollectionName}</td>
                      {/* <td>{x.CompanyId}</td>
                      <td>{x.BranchId}</td> */}
                      {/* <td>{x.Status}</td> */}
                      <td>{x.Description}</td>
                      <td>{x.Slug}</td>
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
              <p>Add New Collection</p>
              <form onSubmit={addNewCategory}>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <label>
                    Collection Name<sup>*</sup>
                  </label>
                  <input
                    name="CollectionName"
                    value={newCategory.CollectionName}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>
                    Company<sup>*</sup>{" "}
                  </label>
                  <select
                    name="CompanyId"
                    value={newCategory.CompanyId}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={""}>Select an option</option>;
                    {allCompaniesList.map((x) => {
                      return (
                        <>
                          <option value={x.Id}>{x.CompName}</option>;
                        </>
                      );
                    })}
                  </select>{" "}
                  <label>
                    Branch<sup>*</sup>{" "}
                  </label>
                  <select
                    name="BranchId"
                    value={newCategory.BranchId}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={""}>Select an option</option>;
                    {allBranchesList.map((x) => {
                      return (
                        <>
                          <option value={x.Id}>{x.BranchName}</option>;
                        </>
                      );
                    })}
                  </select>{" "}
                  <label htmlFor="Status">Status</label>
                  <input
                    name="Status"
                    value={newCategory.Status}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Description</label>
                  <input
                    name="Description"
                    value={newCategory.Description}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Slug</label>
                  <input
                    name="Slug"
                    value={newCategory.Slug}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                </div>

                <div>
                  <p>Customer-Specific Values</p>
                  <div className="scrollableTableContainer">
                    <table>
                      <thead>
                        <tr>
                          {newCategory.SlabCollectionList.map(
                            (customer, index) => (
                              <th key={index}>{customer.CustomerSlabName}</th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {newCategory.SlabCollectionList.map(
                            (customer, index) => (
                              <td key={index}>
                                <input
                                  type="number"
                                  name="Wastage"
                                  value={
                                    newCategory.SlabCollectionList[index]
                                      ?.CollectionWastage || ""
                                  } // Handle Wastage value
                                  onChange={(e) =>
                                    handleCustomerValueChange(index, e)
                                  }
                                  placeholder="Enter Wastage"
                                />
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
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
