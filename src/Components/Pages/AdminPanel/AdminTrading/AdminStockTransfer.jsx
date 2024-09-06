import React, {useEffect, useState} from 'react';
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import SaveIcon from "@mui/icons-material/Save";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
    Box, Button,
    FormControl,
    FormControlLabel, FormLabel, Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {
    a110,
    a125,
    a131,
    a134,
    a181,
    a185,
    a20,
    a226,
    a232,
    a233,
    a234,
    a235,
    a30,
    a98
} from "../../../Api/RootApiPath";
import AlertMessage from "../../../Other Functions/AlertMessage";
import {useNavigate} from 'react-router-dom';
import {InfinitySpin} from "react-loader-spinner";

function AdminStockTransfer() {
    const [checkdata, setCheckdata] = useState([])
    const [selectedValue, setSelectedValue] = useState('labelled');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [allCategories, setAllCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [allDesign, setAllDesign] = useState([]);
    const [allPurity, setAllPurity] = useState([]);
    const allStates = useSelector((state) => state);
    const adminLoggedIn = allStates.reducer1;
    const clientCode = adminLoggedIn.ClientCode;
    const [selectedRows, setSelectedRows] = useState([]);
    const [packetsOption, setPacketsOption] = useState([]);
    const [boxOption, setBoxOption] = useState([]);
    const [branchOption, setBranchOption] = useState([]);
    const [salesmanOption, setSalesmanOption] = useState([]);
    const [transferType, setTransferType] = useState([]);
    const [fromOption, setFromOption] = useState([]);
    const [fromOptionKey, setFromOptionKey] = useState('');
    const [toOption, setToOption] = useState([]);
    const [toOptionKey, setToOptionKey] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const [removeAll, setRemoveAll] = useState(false);
    const [data, setData] = useState([]);
    const [allEmployee, setAllEmployee] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [showError, setShowError] = useState(false);
    const [messageType, setMessageType] = useState("");
    // const [fromId, setFromId] = useState("");
    const [messageToShow, setMessageToShow] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [filterData, setFilterData] = useState({
        CategoryName: '',
        ProductName: '',
        DesignName: '',
        PurityName: '',
    });
    const [formData, setFormData] = useState({
        TransferByEmployee: "",
        TransferedToBranch: "",
        ReceivedByEmployee: "",
        ReceivedBy: "",
        Remarks: "",
        Source: "",
        Destination: "",
        TotalGrossWT: 0,
        TotalNetWT: 0,
        StockTransferTypeName: "",
        StockTransferItems: []
    })
    const fetchAllLabelledStock = async () => {
        setIsLoading(true);
        const formData = {
            ClientCode: clientCode,
        };
        try {
            const response = await fetch(a181, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setTableData(data)
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchAllUnlabelledStock = async () => {
        setIsLoading(true);
        const formData = {
            ClientCode: clientCode,
        };
        try {
            const response = await fetch(a185, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setTableData(data)
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        setTimeout(() => {
            setShowError(false);
        }, 2000);
    }, [showError]);
    // useEffect(() => {
    //     if (selectedValue === "labelled") {
    //         fetchAllLabelledStock();
    //     } else {
    //         fetchAllUnlabelledStock();
    //     }
    // }, [selectedValue]);
    useEffect(() => {
        let fromId;
        if (fromOptionKey === "PacketName" && formData.Source) {
            const oneItem = packetsOption.find((item) => item.PacketName === formData.Source);
            if (oneItem) fromId = oneItem.Id;
        }
        if (fromOptionKey === "BoxName" && formData.Source) {
            const oneItem = boxOption.find((item) => item.BoxName === formData.Source);
            if (oneItem) fromId = oneItem.Id;
        }
        if (fromOptionKey === "BranchName" && formData.Source) {
            const oneItem = branchOption.find((item) => item.BranchName === formData.Source);
            if (oneItem) fromId = oneItem.Id;
        }
        const getFilteredData = async () => {
            const categoryId = allCategories.find((item, _) => item.CategoryName === filterData.CategoryName)?.Id || 0;
            const designId = allDesign.find((item, _) => item.DesignName === filterData.DesignName)?.Id || 0;
            const productId = allProducts.find((item, _) => item.ProductName === filterData.ProductName)?.Id || 0;
            const purityId = allPurity.find((item, _) => item.PurityName === filterData.PurityName)?.Id || 0;

            const payload = {
                ClientCode: clientCode,
                CategoryId: categoryId,
                DesignId: designId,
                ProductId: productId,
                PurityId: purityId,
            };

            try {
                const response = await fetch(selectedValue === 'labelled' ? a233 : a234, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                const resData = await response.json();
                let resultdata = resData;
                let idKey;

                if (fromOptionKey) {
                    if (fromOptionKey === 'PacketName') {
                        idKey = 'PacketId';
                    } else if (fromOptionKey === 'BoxName') {
                        idKey = 'BoxId';
                    } else if (fromOptionKey === 'BranchName') {
                        idKey = 'BranchId';
                    }

                    if (idKey) {
                        resultdata = resData.filter((item) => item[idKey] !== 0);
                        if (fromId) {
                            resultdata = resultdata.filter((item) => item[idKey] == fromId);
                        }
                    }

                    if (['DisplayName', 'FirstName'].includes(fromOptionKey)) {
                        resultdata = resData.filter((item) => item.PacketId === 0 && item.BoxId === 0);
                    }

                    if (data.length > 0) {
                        resultdata = resultdata.filter((item2) => !data.some((item) => item.Id === item2.Id));
                    }

                    setTableData(resultdata);
                } else {
                    if (data.length > 0) {
                        const filterRes = resData.filter((item2) => !data.some((item) => item.Id === item2.Id));
                        setTableData(filterRes);
                    } else {
                        setTableData(resultdata);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        getFilteredData();
    }, [filterData, formData, selectedValue]);
    const fetchAllCategories = async () => {
        const formData = {ClientCode: clientCode};
        try {
            const response = await fetch(a125, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setAllCategories(data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchAllProducts = async () => {
        const payload = {ClientCode: clientCode};
        try {
            const response = await fetch(a20, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setAllProducts(data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchAllDesign = async () => {
        const payload = {ClientCode: clientCode};
        try {
            const response = await fetch(a131, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setAllDesign(data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchAllPurity = async () => {
        const payload = {ClientCode: clientCode};
        try {
            const response = await fetch(a134, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setAllPurity(data);
        } catch (error) {
            console.log(error);
        }
    };
    const getPacket = async () => {
        const payload = {ClientCode: clientCode};
        try {
            const response = await fetch(a226, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setPacketsOption(data);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllBox = async () => {
        const payload = {ClientCode: clientCode};
        try {
            const response = await fetch(a30, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setBoxOption(data);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllBranch = async () => {
        const payload = {ClientCode: clientCode};
        try {
            const response = await fetch(a98, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setBranchOption(data);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllTransferTypes = async () => {
        const payload = {ClientCode: clientCode};
        try {
            const response = await fetch(a232, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setTransferType(data);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllEmployee = async () => {
        const payload = {ClientCode: clientCode};
        try {
            const response = await fetch(a110, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setAllEmployee(data);
            setSalesmanOption(data.filter((item, _) => (item.Designation == 'Salesman')))
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCategories();
        fetchAllProducts();
        fetchAllDesign();
        fetchAllPurity();
        getPacket();
        getAllBox();
        getAllBranch();
        getAllTransferTypes();
        getAllEmployee();
    }, []);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setFilterData({
            CategoryName: '',
            ProductName: '',
            DesignName: '',
            PurityName: '',
        });
        setFormData((prev) => ({
            ...prev,
            StockTransferTypeName: '',
            Source: '',
            Destination: ''
        }));
        setFromOptionKey('');
        setToOptionKey('');
        setCheckdata([]);
        setSelectedRows([]);
        setSelectAll(false);
    };
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    const handleSelectAllChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        setSelectedRows(isChecked ? tableData.map(row => row.Id) : []);
    };
    useEffect(() => {

        const totalgrosswt = data.reduce(
            (total, product) =>
                total + parseFloat(selectedValue === "labelled" ? product.GrossWt : product.TotalGrossWt),
            0
        );
        const totalnetwt = data.reduce(
            (total, product) =>
                total + parseFloat(selectedValue === "labelled" ? product.NetWt : product.TotalNetWt),
            0
        );
        setFormData({
            ...formData,
            TotalGrossWT: totalgrosswt,
            TotalNetWT: totalnetwt
        });
    }, [data])
    const handleRowCheckboxChange = (e, id) => {
        const isChecked = e.target.checked;
        setSelectedRows(prevState =>
            isChecked
                ? [...prevState, id]
                : prevState.filter(rowId => rowId !== id)
        );

        setCheckdata(prevCheckData => {
            const selectedRow = tableData.find((row) => row.Id === id);
            const updatedCheckData = isChecked
                ? [...(prevCheckData || []), selectedRow]
                : (prevCheckData || []).filter(row => row.Id !== id);

            return updatedCheckData;
        });

    };
    const isRowSelected = (id) => selectedRows.includes(id);
    const removeSelectedRows = () => {
        setTableData(prevTableData => [...prevTableData, ...data]);
        setData([]);
        setRemoveAll(false)
    };
    const removeRow = (id) => {
        const rowToRemove = data.find(item => item.Id === id);
        if (rowToRemove) {
            setTableData(prevTableData => [...prevTableData, rowToRemove]);
            setData(prevData => prevData.filter(item => item.Id !== id));
        }
    };
    const handleChangeFilter = async (e) => {
        const {value, name} = e.target;
        setFilterData((list) => ({...list, [name]: value}));
    };
    const transferStock = () => {
        const selectedData = tableData?.filter(row => selectedRows.includes(row.Id));
        setData(prevData => [...prevData, ...selectedData]);
        setTableData(prevData => prevData.filter(row => !selectedRows.includes(row.Id)));
        setSelectedRows([]);
        setFormData({
            ...formData,
            TotalGrossWT: 0,
            TotalNetWT: 0
        });
        setSelectAll(false);
    };
    const handleInputChangePurchase = (e) => {
        const {name, value} = e.target;

        if (value.split(' ') && name === 'StockTransferTypeName') {
            if (e.target.value.split(' ')[0] === 'Packet') {
                setFromOptionKey('PacketName');
                setFromOption(packetsOption);
            }
            if (e.target.value.split(' ')[0] === 'Box') {
                setFromOptionKey('BoxName');
                setFromOption(boxOption);
            }
            if (e.target.value.split(' ')[0] === 'Branch') {
                setFromOptionKey('BranchName');
                setFromOption(branchOption);
            }
            if (e.target.value.split(' ')[0] === 'Salesman') {
                setFromOptionKey('FirstName');
                setFromOption(salesmanOption);
            }
            if (e.target.value.split(' ')[0] === 'Display') {
                setFromOptionKey('DisplayName');
                setFromOption([]);
            }
            if (e.target.value.split(' ')[2] === 'Packet') {
                setToOptionKey('PacketName');
                setToOption(packetsOption);
            }
            if (e.target.value.split(' ')[2] === 'Box') {
                setToOptionKey('BoxName');
                setToOption(boxOption);
            }
            if (e.target.value.split(' ')[2] === 'Branch') {
                setToOptionKey('BranchName');
                setToOption(branchOption);
            }
            if (e.target.value.split(' ')[2] === 'Salesman') {
                setToOptionKey('FirstName');
                setToOption(salesmanOption);
            }
            if (e.target.value.split(' ')[2] === 'Display') {
                setToOptionKey('DisplayName');
                setToOption([]);
            }
        }
        if (name == "Source" && formData.StockTransferTypeName.split(" ")[2] === "Packet" && formData.StockTransferTypeName.split(" ")[0] === "Packet") {
            // setFromOptionKey('PacketName');
            // setToOptionKey('PacketName');
            const filterTo = packetsOption.filter((item) => item.PacketName !== value)
            setToOption(filterTo);
        }
        if (name == "Source" && formData.StockTransferTypeName.split(" ")[2] === "Box" && formData.StockTransferTypeName.split(" ")[0] === "Box") {
            // setFromOptionKey('BoxName');
            // setToOptionKey('BoxName');
            const filterTo = boxOption.filter((item) => item.BoxName !== value)
            setToOption(filterTo);
        }
        if (name == "Source" && formData.StockTransferTypeName.split(" ")[2] === "Branch" && formData.StockTransferTypeName.split(" ")[0] === "Branch") {
            // setFromOptionKey('BranchName');
            // setToOptionKey('BranchName');
            const filterTo = branchOption.filter((item) => item.BranchName !== value)
            setToOption(filterTo);
        }
        setFormData((list) => ({...list, [name]: value}));
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const transferData = data.map(item => ({stockId: item.Id}));
        const sourceItem = fromOption.find((item, _) => item[`${fromOptionKey}`] === formData.Source);
        const destinationItem = toOption.find((item, _) => item[`${toOptionKey}`] === formData.Destination);
        console.log(formData.StockTransferTypeName)
        const payload = {
            ClientCode: clientCode,
            StockTransferItems: transferData,
            StockType: selectedValue,
            StockTransferTypeName: formData.TransferType,
            TransferTypeId: (transferType.find((item, _) => item.TransferType === formData.StockTransferTypeName)).Id,
            TransferByEmployee: formData.TransferByEmployee,
            TransferedToBranch: formData.TransferedToBranch,
            Source: sourceItem ? sourceItem.Id : 0,
            Destination: destinationItem ? destinationItem.Id : 0,
            Remarks: formData.Remarks,
            ReceivedByEmployee: formData.ReceivedBy === 'Other' ? formData.ReceivedByEmployee : formData.ReceivedBy,
        }
        try {
            const response = await fetch(a235, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setFormData({
                TransferByEmployee: "",
                TransferedToBranch: "",
                ReceivedByEmployee: "",
                ReceivedBy: "",
                Remarks: "",
                Source: "",
                Destination: "",
                StockTransferTypeName: "",
                StockTransferItems: []
            });
            setFilterData({
                CategoryName: '',
                ProductName: '',
                DesignName: '',
                PurityName: '',
            });
            setData([]);
            setCheckdata([]);
            setSelectedRows([]);
            setSelectAll(false);
            setMessageType("success");
            setMessageToShow("Stock Transfer Successfully");
            setShowError(true);
            navigate("/stock_transfer_list");
        } catch (error) {
            console.log(error);
            setMessageType("error");
            setMessageToShow("Failed to Transfer Stock");
            setShowError(true);
        }

    }
    return (
        <>
            <AdminHeading/>
            <Box className="adminMainBodyBox">
                {showError ? (
                    <AlertMessage message={messageToShow} type={messageType}/>
                ) : null}
                <AdminBreadCrump
                    title={"Stock Transfer"}
                    companyName={"Loyalstring"}
                    module={"Trading"}
                    page={"Stock Transfer"}
                />
            </Box>
            <Box className="adminAddCategoryMainBox">
                <Box className="adminAddCategoryInnerBox">
                    <form onSubmit={handleSubmit}>
                    <Box id="adminInvoiceAddedCustomerEdit" className="adminInvoiceAddTitles">
                        <Grid container sx={{
                            display: {xs: "block", md: "flex"},
                            justifyContent: {md: "space-between"},
                            alignItems: "center"
                        }}>
                            <Grid item sm={12} md={8}>
                                <Grid container sx={{display: "flex", alignItems: "center"}}>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{display: "flex", alignItems: "center",justifyContent: "left"}}>
                                            <label style={{width: "160px"}}>Transfer Type<sup>*</sup> : </label>
                                            <select className={"input-select"} name={"StockTransferTypeName"}
                                                    onChange={handleInputChangePurchase}
                                                    value={formData.StockTransferTypeName} required={"required"}>
                                                <option value="">
                                                    Choose a Transfer Type
                                                </option>
                                                {transferType?.map((x, y) => (
                                                    <option
                                                        key={y}
                                                        value={x.TransferType}
                                                    >
                                                        {x.TransferType}
                                                    </option>
                                                ))}
                                            </select>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                    <Box sx={{display: "flex", justifyContent: "left", alignItems: "center",my: {xs:"10px",sm:"0px"}}}>
                                        <Box sx={{display: "flex", alignItems: "center"}} mx={1}>
                                            <label style={{textAlign: "right", marginRight: "5px", marginLeft: "10px"}}>From<sup>*</sup>
                                                : </label>
                                            <select style={{width: "111px"}} className={"input-select"} name={"Source"}
                                                    onChange={handleInputChangePurchase} value={formData.Source} required={"required"}>
                                                <option value="">
                                                    From
                                                </option>
                                                {fromOptionKey === 'DisplayName' ? (
                                                    <option selected value={"Display"}>
                                                        Display
                                                    </option>
                                                ) : fromOption.map((x, y) => (
                                                    <option
                                                        key={y}
                                                        value={x[`${fromOptionKey}`]}
                                                    >
                                                        {x[`${fromOptionKey}`]}
                                                    </option>
                                                ))}
                                            </select>
                                        </Box>

                                        <Box sx={{display: "flex", alignItems: "center"}} mx={1}>
                                            <label style={{textAlign: "right",  marginRight: "5px",marginLeft: "10px"}}>To<sup>*</sup> : </label>
                                            <select style={{width: "111px"}} className={"input-select"} name={"Destination"}
                                                    onChange={handleInputChangePurchase} value={formData.Destination} required={"required"}>
                                                <option value="">
                                                    To
                                                </option>
                                                {toOptionKey === 'DisplayName' ? (
                                                    <option selected value={"Display"}>
                                                        Display
                                                    </option>
                                                ) : toOption.map((x, y) => (
                                                    <option

                                                        key={y}
                                                        value={x[`${toOptionKey}`]}
                                                    >
                                                        {x[`${toOptionKey}`]}
                                                    </option>
                                                ))}
                                            </select>
                                        </Box>
                                    </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <Box sx={{display: "flex", justifyContent: {md: "right"}}}>
                                    <Box display="flex" alignItems="center">
                                        <InputLabel htmlFor="datePicker" sx={{margin: "0px 5px"}}>Date : </InputLabel>
                                        <TextField
                                            type="date"
                                            id="datePicker"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            variant="outlined"
                                            size="small"
                                            InputLabelProps={{shrink: true}}
                                            sx={{backgroundColor: "#fff", '& input': {height: "0.7em"}}}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mt={2} sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <RadioGroup
                                row
                                value={selectedValue}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="labelled"
                                    control={<Radio sx={{transform: 'scale(0.7)', marginRight: -1}}/>}
                                    label="Labelled Stock"
                                    sx={{' span': {fontSize: "0.9rem"}}}
                                />
                                <FormControlLabel
                                    value="unlabelled"
                                    control={<Radio sx={{transform: 'scale(0.7)', marginRight: -1}}/>}
                                    label="Unlabelled Stock"
                                    sx={{' span': {fontSize: "0.9rem"}}}
                                />
                            </RadioGroup>
                        </Box>


                    </Box>
                    <Grid container mt={2} spacing={2}>
                        <Grid item xs={4}>
                            <Grid container
                                  spacing={2}
                                  sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Grid item xs={12} sm={6} lg={3}>
                                    <Box sx={{textAlign: "start"}}>
                                        <label style={{marginBottom: "8px", display: "block"}}>Category</label>
                                        <select className={"input-select"} name={"CategoryName"}
                                                onChange={handleChangeFilter} value={filterData.CategoryName}>
                                            <option value="">
                                                Choose a Category
                                            </option>
                                            {allCategories.map((x, y) => (
                                                <option
                                                    key={y}
                                                    value={x.CategoryName}
                                                >
                                                    {x.CategoryName}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} lg={3}>
                                    <Box sx={{textAlign: "start"}}>
                                        <label style={{marginBottom: "8px", display: "block"}}>Product</label>
                                        <select className={"input-select"} name={"ProductName"}
                                                onChange={handleChangeFilter} value={filterData.ProductName}>
                                            <option value="">
                                                Choose a Product
                                            </option>
                                            {filterData.CategoryName && allProducts.filter((item) => item.CategoryName === filterData.CategoryName).map((x, y) => (
                                                <option
                                                    key={y}
                                                    value={x.ProductName}
                                                >
                                                    {x.ProductName}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} lg={3}>
                                    <Box sx={{textAlign: "start"}}>
                                        <label style={{marginBottom: "8px", display: "block"}}>Design</label>
                                        <select className={"input-select"} name={"DesignName"}
                                                onChange={handleChangeFilter} value={filterData.DesignName}>
                                            <option value="">
                                                Choose a Design
                                            </option>
                                            {(filterData.ProductName && filterData.CategoryName) && allDesign.filter((item) => item.ProductName === filterData.ProductName).map((x, y) => (
                                                <option
                                                    key={y}
                                                    value={x.DesignName}
                                                >
                                                    {x.DesignName}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} lg={3}>
                                    <Box sx={{textAlign: "start"}}>
                                        <label style={{marginBottom: "8px", display: "block"}}>Purity</label>
                                        <select className={"input-select"} name={"PurityName"}
                                                onChange={handleChangeFilter} value={filterData.PurityName}>
                                            <option value="">
                                                Choose a Purity
                                            </option>
                                            {filterData.CategoryName && allPurity.filter((item) => item.CategoryName === filterData.CategoryName).map((x, y) => (
                                                <option
                                                    key={y}
                                                    value={x.PurityName}
                                                >
                                                    {x.PurityName}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                height: "100%"
                            }}>
                                <Box sx={{display: "flex", alignItems: "center", height: "100%", marginLeft: "70px"}}>
                                    <input type="checkbox"
                                           className="select-all-checkbox"
                                           id="selectAll"
                                           checked={selectAll}
                                           onChange={handleSelectAllChange}/>
                                    <label style={{marginLeft: "5px"}}>Select All</label>
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center", height: "100%"}}>
                                    <input type="checkbox" checked={removeAll} onClick={removeSelectedRows}/>
                                    <label style={{marginLeft: "5px"}}>Remove All</label>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="start" justifyContent="space-around" sx={{my: 2}} spacing={2}>
                        <Grid item xs>
                            {isLoading ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <InfinitySpin width="200" color="#4fa94d"/>
                                </Box>
                            ) : (
                                <TableContainer
                                    sx={{
                                        height: "50vh",
                                        overflowY: "auto",
                                        ' th, td': {border: '1px solid #ccc'}
                                    }}
                                >
                                    <Table
                                        size="small"
                                        aria-label="first table"
                                        sx={{borderRadius: '4px', borderCollapse: 'collapse'}}
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" sx={{fontWeight: "600"}}>Sr</TableCell>
                                                <TableCell align="center" sx={{fontWeight: "600"}}>Product
                                                    Name</TableCell>
                                                <TableCell align="center" sx={{fontWeight: "600"}}>Label</TableCell>
                                                <TableCell align="center" sx={{fontWeight: "600"}}>Gross WT</TableCell>
                                                <TableCell align="center" sx={{fontWeight: "600"}}>Net WT</TableCell>
                                                <TableCell align="center" sx={{fontWeight: "600"}}>Transfer</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(tableData && fromOptionKey) && tableData.map((item, index) => (
                                                <TableRow key={item.id}>
                                                    <TableCell align="center">{index + 1}</TableCell>
                                                    <TableCell align="center">
                                                        {selectedValue === "labelled" ? item.ProductName : item.DesignName}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {selectedValue === "labelled" ? item.ItemCode : item.ItemCode}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {selectedValue === "labelled" ? item.GrossWt : item.TotalGrossWt}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {selectedValue === "labelled" ? item.NetWt : item.TotalNetWt}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <input
                                                            type="checkbox"
                                                            checked={isRowSelected(item.Id)}
                                                            onChange={(e) => handleRowCheckboxChange(e, item.Id)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Grid>
                        <Grid item xs={1} container justifyContent="center" alignItems="center">
                            <button
                                style={{
                                    backgroundColor: "grey",
                                    color: "white",
                                    border: "none",
                                    padding: "10px",
                                    borderRadius: "5px",
                                }}
                                onClick={transferStock}
                            >
                                Transfer Stock to Another Box &gt;&gt;
                            </button>
                        </Grid>
                        <Grid item xs>
                            <TableContainer
                                sx={{
                                    height: "50vh",
                                    overflowY: "auto",
                                    ' th, td': {border: '1px solid #ccc'}
                                }}
                            >
                                <Table
                                    size="small"
                                    aria-label="second table"
                                    sx={{borderRadius: '4px', borderCollapse: 'collapse'}}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" sx={{fontWeight: "600"}}>Sr</TableCell>
                                            <TableCell align="center" sx={{fontWeight: "600"}}>Product Name</TableCell>
                                            <TableCell align="center" sx={{fontWeight: "600"}}>Label</TableCell>
                                            <TableCell align="center" sx={{fontWeight: "600"}}>Gross WT</TableCell>
                                            <TableCell align="center" sx={{fontWeight: "600"}}>Net WT</TableCell>
                                            <TableCell align="center" sx={{fontWeight: "600"}}>Remove</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell
                                                    align="center">{selectedValue === "labelled" ? item.ProductName : item.DesignName}</TableCell>
                                                <TableCell align="center">{item.ItemCode}</TableCell>
                                                <TableCell
                                                    align="center">{selectedValue === "labelled" ? item.GrossWt : item.TotalGrossWt}</TableCell>
                                                <TableCell
                                                    align="center">{selectedValue === "labelled" ? item.NetWt : item.TotalNetWt}</TableCell>
                                                <TableCell align="center">
                                                    <Typography
                                                        variant="body2"
                                                        color="error"
                                                        onClick={() => removeRow(item.Id)}
                                                        sx={{cursor: 'pointer'}}
                                                    >
                                                        X
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item
                              sx={{border: "1px solid #ced4da", p: 2, color: "text.secondary"}}>
                            <Grid container spacing={3} wrap="nowrap">
                                <Grid item>
                                    <Box sx={{width: "100%"}}>
                                        <label style={{
                                            display: "block",
                                            textAlign: "start",
                                            marginBottom: "5px",
                                            fontSize: "15px"
                                        }}>Transferred By<sup>*</sup></label>
                                        <select style={{width: "100%",height: "30px"}}
                                            className={"input-select"}
                                            name={"TransferByEmployee"}
                                            onChange={handleInputChangePurchase}
                                            value={formData.TransferByEmployee || allEmployee?.[0]?.Id || ""}
                                            disabled
                                            required={"required"}
                                        >
                                            <option value="">
                                                Select Transferred By
                                            </option>
                                            {allEmployee?.map((x, y) => (
                                                <option
                                                    key={y}
                                                    value={x.Id}
                                                >
                                                    {x.FirstName} {x.LastName}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{width: "100%"}}>
                                        <label style={{
                                            display: "block",
                                            textAlign: "start",
                                            marginBottom: "5px",
                                            fontSize: "15px"
                                        }}>Transferred To<sup>*</sup></label>
                                        <select style={{width: "100%",height: "30px"}} className={"input-select"} name={"TransferedToBranch"}
                                                onChange={handleInputChangePurchase}
                                                value={formData.TransferedToBranch} required={"required"}>
                                            <option value="">
                                                Select Transferred To
                                            </option>
                                            {(
                                                formData.StockTransferTypeName.includes("Salesman") ||
                                                formData.StockTransferTypeName === "Branch To Branch"
                                                    ? allEmployee.filter((item) => item.Id !== allEmployee?.[0]?.Id) // Apply filter
                                                    : allEmployee // No filter
                                            ).map((x, y) => (
                                                <option key={y} value={x.Id}>
                                                    {x.FirstName} {x.LastName}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{width: "100%",marginTop: "3px"}}>
                                        <label style={{
                                            display: "block",
                                            textAlign: "start",
                                            marginBottom: "5px",
                                            fontSize: "15px"
                                        }}>Total Gross WT</label>
                                        <input
                                            style={{width: "100%",height: "30px"}}
                                            type="text"
                                            className={"input-select"}
                                            name={"TotalGrossWT"}
                                            value={formData.TotalGrossWT}
                                            readOnly
                                            onChange={handleInputChangePurchase}/>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{width: "100%",marginTop: "3px"}}>
                                        <label style={{
                                            display: "block",
                                            textAlign: "start",
                                            marginBottom: "5px",
                                            fontSize: "15px"
                                        }}>Total Net WT</label>
                                        <input
                                            style={{width: "100%",height: "30px"}}
                                            type="text"
                                            className={"input-select"}
                                            name={"TotalNetWT"}
                                            value={formData.TotalNetWT}
                                            readOnly
                                            onChange={handleInputChangePurchase}/>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{width: "100%"}}>
                                        <label style={{
                                            display: "block",
                                            textAlign: "start",
                                            marginBottom: "5px",
                                            fontSize: "15px"
                                        }}>Received By<sup>{(formData.StockTransferTypeName.includes("Salesman") || formData.StockTransferTypeName === "Branch To Branch") ? "*" : null}</sup></label>
                                        <select
                                            style={{width: "100%",height: "30px"}}
                                            className={"input-select"}
                                            name={"ReceivedBy"}
                                            required={(formData.StockTransferTypeName.includes("Salesman") || formData.StockTransferTypeName === "Branch To Branch") ? true : false}
                                            onChange={handleInputChangePurchase}
                                            value={formData.ReceivedBy}>
                                            <option value="">
                                                Select an option
                                            </option>
                                            {allEmployee.map((x, y) => (
                                                <option
                                                    key={y}
                                                    value={x.Id}
                                                >
                                                    {x.FirstName} {x.LastName}
                                                </option>
                                            ))}
                                            <option value="Other">Other</option>
                                        </select>
                                    </Box>
                                </Grid>
                                {formData.ReceivedBy === "Other" && (
                                    <>
                                        <Grid item>
                                            <Box sx={{width: "100%",height: "30px"}}>
                                                <label
                                                    style={{
                                                        display: "block",
                                                        textAlign: "start",
                                                        marginBottom: "5px",
                                                        fontSize: "15px"
                                                    }}
                                                >
                                                    Received By <sup>{(formData.StockTransferTypeName.includes("Salesman") || formData.StockTransferTypeName === "Branch To Branch") ? "*" : null}</sup>
                                                </label>
                                                <input style={{width: "100%"}} type="text"   className={"input-select"} required={(formData.StockTransferTypeName.includes("Salesman") || formData.StockTransferTypeName === "Branch To Branch") ? true : false} name={"ReceivedByEmployee"}
                                                       onChange={handleInputChangePurchase}
                                                       value={formData.ReceivedByEmployee}/>
                                            </Box>
                                        </Grid>
                                    </>
                                )}
                                <Grid item>
                                    <Box sx={{width: "100%"}}>
                                        <label
                                            style={{
                                                display: "block",
                                                textAlign: "start",
                                                marginBottom: "5px",
                                                fontSize: "15px"
                                            }}
                                        >
                                            Remark
                                        </label>
                                        <input style={{width: "100%",height: "30px",marginTop: "3px"}} type="text"  className={"input-select"} name={"Remarks"}
                                               onChange={handleInputChangePurchase} value={formData.Remarks}/>
                                    </Box>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{display: "flex", justifyContent: "end", my: "15px", gap: 2}}
                         className={"adminInvoiceAddProductsOptionsMainPurchaseItems"}>
                        <Box>
                            <button type={"submit"}>
                                Save
                            </button>
                        </Box>
                        <Box>
                            <button onClick={() => navigate('/stock_transfer_list')}>
                                List
                            </button>
                        </Box>
                    </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
}

export default AdminStockTransfer;
