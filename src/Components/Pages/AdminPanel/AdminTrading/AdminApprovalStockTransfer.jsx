import React, {useEffect, useState} from 'react';
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import {Box, Grid, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs} from "@mui/material";
import {useSelector} from "react-redux";
import {a236} from "../../../Api/RootApiPath";
import AlertMessage from "../../../Other Functions/AlertMessage";
import {useParams} from "react-router-dom";
import moment from "moment";

function AdminApprovalStockTransfer() {
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // New state for filtered data
    const [selectedRows, setSelectedRows] = useState([]); // Updated to hold multiple selected rows
    const [selectAll, setSelectAll] = useState(false); // State for Select All checkbox
    const [showError, setShowError] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [messageToShow, setMessageToShow] = useState("");
    const [selectedTab, setSelectedTab] = useState(0); // New state for selected tab
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(true);
    const allStates = useSelector((state) => state);
    const clientCode = allStates.reducer1.ClientCode;
    const {id} = useParams();

    const fetchAllLabelledStock = async () => {
        const formData = {ClientCode: clientCode};
        try {
            const response = await fetch(a236, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            const filterData = data.find((e) => e.Id == id);
            setTableData(filterData.LabelledStockItems);
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
                filtered = tableData?.filter(item => item.Status === 'InTransit');
                break;
            case 1:
                filtered = tableData?.filter(item => item.Status === 'Approved');
                break;
            case 2:
                filtered = tableData?.filter(item => item.Status === 'Rejected');
                break;
            case 3:
                filtered = tableData?.filter(item => item.Status === 'Lost');
                break;
            default:
                filtered = tableData;
        }
        setFilteredData(filtered);
    }, [selectedTab, tableData]);

    const handleRowCheckboxChange = (id) => {
        let updatedSelectedRows;
        if (selectedRows.includes(id)) {
            updatedSelectedRows = selectedRows.filter(rowId => rowId !== id);
        } else {
            updatedSelectedRows = [...selectedRows, id];
        }
        setSelectedRows(updatedSelectedRows);
        setSelectAll(updatedSelectedRows.length === filteredData.length);
        setAreButtonsDisabled(updatedSelectedRows.length === 0);
    };

    const handleSelectAllChange = (event) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        if (checked) {
            const allIds = filteredData.map(item => item.Id);
            setSelectedRows(allIds);
            setAreButtonsDisabled(allIds.length === 0); // Update button state
        } else {
            setSelectedRows([]);
            setAreButtonsDisabled(true); // Update button state
        }
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <AdminHeading/>
            <Box className="adminMainBodyBox" sx={{width: '100%'}}>
                {showError ? (
                    <AlertMessage message={messageToShow} type={messageType}/>
                ) : null}
                <AdminBreadCrump
                    title={"Stock Transfer / Approval"}
                    companyName={"Loyalstring"}
                    module={"Trading"}
                    page={"Stock Transfer / Approval"}
                />
            </Box>
            <Box className="adminAddCategoryMainBox" sx={{width: '100%'}}>
                <Box className="adminAddCategoryInnerBox" sx={{width: '100%'}}>
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
                                    // onClick={handleSubmit}
                                    disabled={areButtonsDisabled} // Disable based on selected rows
                                >
                                    Approve
                                </button>
                            </Box>
                            <Box
                                mx={1}
                                className="adminInvoiceAddProductsOptionsMainPurchaseItems"
                            >
                                <button
                                    // onClick={handleSubmit}
                                    disabled={areButtonsDisabled} // Disable based on selected rows
                                >
                                    Reject
                                </button>
                            </Box>
                            <Box
                                mx={1}
                                className="adminInvoiceAddProductsOptionsMainPurchaseItems"
                            >
                                <button
                                    // onClick={handleSubmit}
                                    disabled={areButtonsDisabled} // Disable based on selected rows
                                >
                                    Lost
                                </button>

                            </Box>
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
                                <TableContainer sx={{width: '100%', 'th, td': {border: '1px solid #ccc'}}}>
                                    <Table size="small" aria-label="stock transfer table"
                                           sx={{width: '100%', borderRadius: '4px', borderCollapse: 'collapse'}}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{fontWeight: "600"}} align="center">Sr</TableCell>
                                                <TableCell sx={{fontWeight: "600"}} align="center">Metal Name</TableCell>
                                                <TableCell sx={{fontWeight: "600"}} align="center">Item Code</TableCell>
                                                <TableCell sx={{fontWeight: "600"}} align="center">Branch Name</TableCell>
                                                <TableCell sx={{fontWeight: "600"}} align="center">NetWt</TableCell>
                                                <TableCell sx={{fontWeight: "600"}} align="center">GrossWt</TableCell>
                                                <TableCell sx={{fontWeight: "600"}} align="center">Status</TableCell>
                                                <TableCell sx={{fontWeight: "600"}} align="center">Created</TableCell>
                                                <TableCell sx={{fontWeight: "600"}} align="center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectAll}
                                                        onChange={handleSelectAllChange}
                                                    />
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
                                                            checked={selectedRows.includes(item.Id)}
                                                            onChange={() => handleRowCheckboxChange(item.Id)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default AdminApprovalStockTransfer;
