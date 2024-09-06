import React, {useEffect, useState} from 'react';
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Grid,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs, Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {a236, a237} from "../../../Api/RootApiPath";
import AlertMessage from "../../../Other Functions/AlertMessage";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import {InfinitySpin} from "react-loader-spinner";

function AdminApprovalStockTransfer() {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState([]); // New state for filtered data
    const [selectedRows, setSelectedRows] = useState([]); // Updated to hold multiple selected rows
    const [selectAll, setSelectAll] = useState(false); // State for Select All checkbox
    const [showError, setShowError] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [messageToShow, setMessageToShow] = useState("");
    const [selectedTab, setSelectedTab] = useState(0); // New state for selected tab
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(true);
    const allStates = useSelector((state) => state);
    const [isLoading, setIsLoading] = useState(false);
    const clientCode = allStates.reducer1.ClientCode;
    const [open, setOpen] = useState(false);
    const [actionType, setActionType] = useState("");
    const {id} = useParams();

    const fetchAllLabelledStock = async () => {
        setIsLoading(true);
        const formData = {ClientCode: clientCode};
        try {
            const response = await fetch(a236, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            const filterData = data.find((e) => e.Id == id);
            setTableData(filterData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchAllLabelledStock();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShowError(false);
        }, 2000);
    }, [showError]);

    useEffect(() => {
        let filtered;
        switch (selectedTab) {
            case 0:
                filtered = tableData?.LabelledStockItems?.filter(item => (item.RequestStatus === 0));
                break;
            case 1:
                filtered = tableData?.LabelledStockItems?.filter(item => item.RequestStatus === 1);
                break;
            case 2:
                filtered = tableData?.LabelledStockItems?.filter(item => item.RequestStatus === 2);
                break;
            case 3:
                filtered = tableData?.LabelledStockItems?.filter(item => item.RequestStatus === 3);
                break;
            default:
                filtered = tableData;
        }
        setFilteredData(filtered);
    }, [selectedTab, tableData]);

    const handleSelectAllChange = (event) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        if (checked) {
            const allIds = filteredData.map(item => item.TransferItemId);
            setSelectedRows(allIds);
        } else {
            setSelectedRows([]);
        }
        setAreButtonsDisabled(!checked);
    };

    const handleRowCheckboxChange = (id) => {
        let updatedSelectedRows;
        if (selectedRows.includes(id)) {
            updatedSelectedRows = selectedRows.filter(rowId => rowId !== id);
        } else {
            updatedSelectedRows = [...selectedRows, id];
        }
        setSelectedRows(updatedSelectedRows);
        setAreButtonsDisabled(updatedSelectedRows.length === 0);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleClickOpen = (type) => {
        setActionType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getStatusForActionType = (type) => {
        switch (type) {
            case "Approve":
                return "1";
            case "Reject":
                return "2";
            case "Lost":
                return "3";
            default:
                return 0;
        }
    };

    const handleConfirm = async () => {
        const payload = {
            StockTransferItems: selectedRows.map(id => ({
                Id: id,
                Status: getStatusForActionType(actionType)
            })),
            ClientCode: clientCode,
        };

        try {
            const response = await fetch(a237, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                const result = await response.json();
                setMessageType("success");
                setMessageToShow(`${actionType} action completed successfully.`);
            } else {
                setMessageType("error");
                setMessageToShow(`Failed to ${actionType.toLowerCase()} the items.`);
            }
        } catch (error) {
            setMessageType("error");
            setMessageToShow("An error occurred during the request.");
            console.error("Error during the confirm action:", error);
        } finally {
            setShowError(true);
            fetchAllLabelledStock();
            setOpen(false);
            setSelectedRows([]);
            setSelectAll(false);
        }
    };
    return (
        <>
            <AdminHeading/>
            <Box className="adminMainBodyBox" sx={{width: '100%'}}>
                {showError ? (
                    <AlertMessage message={messageToShow} type={messageType}/>
                ) : null}
                <div className="adminDesktopBreadCrumpMainBox">
                    <h4>Stock Transfer / Approval</h4>
                    <div className="adminDesktopBreadCrumpLinks">
                        <p onClick={() => navigate("/adminhome")}>Loyalstring</p>
                        <p>{` > `}</p>
                        <p onClick={() => navigate("/stock_transfer_list")}>Stock Transfer List</p>
                        <p>{` > `}</p>
                        <p style={{ textDecoration: "underline" }}>
                            <strong>Stock Transfer / Approval</strong>
                        </p>
                    </div>
                </div>
            </Box>
            <Box className="adminAddCategoryMainBox" sx={{width: '100%'}}>
                <Box className="adminAddCategoryInnerBox" sx={{width: '100%'}}>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} my={2}>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                            <Box display={"flex"} alignItems={"center"} mx={1}>
                                <Typography sx={{fontWeight: "600"}}>Transfer type :</Typography>
                                <Typography mx={1}>{tableData?.StockTransferTypeName}</Typography>
                            </Box>
                            <Box display={"flex"} alignItems={"center"} mx={1}>
                                <Typography sx={{fontWeight: "600"}}>Stock Type :</Typography>
                                <Typography mx={1}>{tableData?.StockType}</Typography>
                            </Box>
                            <Box display={"flex"} alignItems={"center"} mx={1}>
                                <Typography sx={{fontWeight: "600"}}>Transfer By :</Typography>
                                <Typography mx={1}>{tableData?.TransferByEmployee}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Box display={"flex"} alignItems={"center"}>
                                <Typography sx={{fontWeight: "600"}}>Date :</Typography>
                                <Typography mx={1}>{tableData?.Date}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            TabIndicatorProps={{
                                style: {backgroundColor: '#02a8b5'}
                            }}
                            sx={{
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    color: '#000',
                                    '&:hover': {
                                        color: '#02a8b5',
                                    },
                                },
                                '& .Mui-selected': {
                                    color: '#02a8b5',
                                }, '& .MuiTabs-indicator': {
                                    backgroundColor: '#02a8b5',
                                    color: '#02a8b5',
                                },
                            }}
                        >
                            <Tab label="Pending"/>
                            <Tab label="Approved"/>
                            <Tab label="Rejected"/>
                            <Tab label="Lost"/>
                        </Tabs>

                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Box
                                mx={1}
                                className="adminInvoiceAddProductsOptionsMainPurchaseItems"
                            >
                                <button
                                    onClick={() => handleClickOpen("Approve")}
                                >
                                    Approve
                                </button>
                            </Box>
                            <Box
                                mx={1}
                                className="adminInvoiceAddProductsOptionsMainPurchaseItems"
                            >
                                <button
                                    onClick={() => handleClickOpen("Reject")}
                                    disabled={areButtonsDisabled}
                                >
                                    Reject
                                </button>
                            </Box>
                            {(tableData?.TransferByEmployee !== tableData?.ReceivedByEmployee) && <Box
                                mx={1}
                                className="adminInvoiceAddProductsOptionsMainPurchaseItems"
                            >
                                <button
                                    onClick={() => handleClickOpen("Lost")}
                                    disabled={areButtonsDisabled}
                                >
                                    Lost
                                </button>

                            </Box>}
                            <Box mx={1} sx={{display: "flex", alignItems: "center",}}>
                                <input
                                    type="checkbox"
                                    className="select-all-checkbox"
                                    id="selectAll"
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                />
                                <label style={{width: "80px"}}>Select All</label>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{width: '100%'}}>
                        <Grid container alignItems="start" justifyContent="space-between" sx={{my: 2}} spacing={2}>
                            <Grid item xs sx={{width: '100%'}}>
                                {isLoading ? (<>
                                    <Box sx={{
                                        height: "30vh",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "100%"
                                    }}>
                                        <InfinitySpin width="200" color="#4fa94d"/>
                                    </Box>
                                </>) : (
                                    <TableContainer sx={{width: '100%', 'th, td': {border: '1px solid #ccc'}}}>
                                        <Table size="small" aria-label="stock transfer table"
                                               sx={{width: '100%', borderRadius: '4px', borderCollapse: 'collapse'}}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{fontWeight: "600"}} align="center">Sr</TableCell>
                                                    <TableCell sx={{fontWeight: "600"}} align="center">Category
                                                        Name</TableCell>
                                                    <TableCell sx={{fontWeight: "600"}} align="center">Item
                                                        Code</TableCell>
                                                    <TableCell sx={{fontWeight: "600"}} align="center">Branch
                                                        Name</TableCell>
                                                    <TableCell sx={{fontWeight: "600"}} align="center">Net Wt</TableCell>
                                                    <TableCell sx={{fontWeight: "600"}}
                                                               align="center">Gross Wt</TableCell>
                                                    <TableCell sx={{fontWeight: "600"}}
                                                               align="center">Status</TableCell>
                                                    <TableCell sx={{fontWeight: "600"}}
                                                               align="center">Created</TableCell>
                                                    <TableCell sx={{fontWeight: "600"}} align="center">

                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filteredData?.map((item, index) => (
                                                    <TableRow key={item.Id}>
                                                        <TableCell align="center">{index + 1}</TableCell>
                                                        <TableCell align="center">{item.MetalName}</TableCell>
                                                        <TableCell align="center">{item.ItemCode}</TableCell>
                                                        <TableCell align="center">{item.BranchName}</TableCell>
                                                        <TableCell align="center">{item.NetWt}</TableCell>
                                                        <TableCell align="center">{item.GrossWt}</TableCell>
                                                        <TableCell align="center">{item.Status}</TableCell>
                                                        <TableCell
                                                            align="center">{moment(item.CreatedOn).format('DD/MM/YY')}</TableCell>
                                                        <TableCell align="center">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedRows.includes(item.TransferItemId)}
                                                                onChange={() => handleRowCheckboxChange(item.TransferItemId)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>)}
                            </Grid>
                        </Grid>
                    </Box>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Confirm Action"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {`Are you sure you want to ${actionType.toLowerCase()} the selected items?`}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Box display={"flex"} justifyContent={"end"}>
                                <Box
                                    mx={1}
                                    className="adminInvoiceAddProductsOptionsMainPurchaseItems"
                                >
                                    <Button onClick={handleClose}>
                                        CANCEL
                                    </Button>
                                </Box>
                                <Box
                                    mx={1}
                                    className="adminInvoiceAddProductsOptionsMainPurchaseItems"
                                >
                                    <button
                                        onClick={handleConfirm}
                                    >
                                        OK
                                    </button>
                                </Box>
                            </Box>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </>
    );
}

export default AdminApprovalStockTransfer;
