import React, {useEffect, useState} from 'react';
import AdminHeading from "../Heading/AdminHeading";
import {Box, Grid, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs} from "@mui/material";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import {a232, a233, a234, a236, a98} from "../../../Api/RootApiPath";
import {useSelector} from "react-redux";
import DownloadIcon from '@mui/icons-material/Download';
import * as xlsx from "xlsx";
import EastIcon from '@mui/icons-material/East';
import {useNavigate} from 'react-router-dom';
import moment from "moment";
import {InfinitySpin} from "react-loader-spinner";

function AdminStockTransferList() {
    const allStates = useSelector((state) => state);
    const adminLoggedIn = allStates.reducer1;
    const clientCode = adminLoggedIn.ClientCode;
    const navigate = useNavigate();
    const [expandedRow, setExpandedRow] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [transferType, setTransferType] = useState([]);
    const [branchOption, setBranchOption] = useState([]);
    const [filterFormData, setFilterFormData] = useState({
        StockType: "",
        BranchName: "",
        StartDate: "",
        EndDate: "",
        TransferType: ""
    });

    const getAllStockTransfers = async () => {
        setIsLoading(true);
        const transferTypeId = transferType.find((item, _) => item.TransferType == filterFormData.TransferType);
        const branchNameId = branchOption.find((item, _) => item.Id == filterFormData.BranchName);
        const payload = {
            ClientCode: clientCode
        };

        if (transferTypeId && transferTypeId.Id) {
            payload.TransferType = transferTypeId.Id;
        }

        if (branchNameId && branchNameId.Id) {
            payload.BranchId = branchNameId.Id;
        }

        if (filterFormData.StockType) {
            payload.StockType = filterFormData.StockType;
        }
        if (filterFormData.StartDate) {
            payload.StartDate = filterFormData.StartDate;
        }
        if (filterFormData.EndDate) {
            payload.EndDate = filterFormData.EndDate;
        }
        try {
            const response = await fetch(a236, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (selectedTab === 0) {
                const inReqData = data.filter((item) => item.Direction === 2)
                setTableData(inReqData);
            } else {
                const outReqData = data.filter((item) => item.Direction === 1)
                console.log(outReqData,data)
                setTableData(outReqData);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching stock transfers:", error);
        }
    };


    useEffect(() => {
        getAllStockTransfers();
    }, [selectedTab, filterFormData]);

    const getAllBranch = async () => {
        const payload = {ClientCode: clientCode};
        try {
            const response = await fetch(a98, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
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
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setTransferType(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBranch();
        getAllTransferTypes();
    }, []);

    const handleRowExpandToggle = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };
    // useEffect(() => {
    //     const getFilteredData = async () => {
    //         const transferTypeId = transferType.find((item, _) => item.TransferType == filterFormData.TransferType);
    //         const branchNameId = branchOption.find((item, _) => item.Id == filterFormData.BranchName);
    //         // const productId = allProducts.find((item, _) => item.ProductName === filterData.ProductName);
    //         const payload = {
    //             TransferTypeId: transferTypeId ? transferTypeId.Id : 0,
    //             BranchNameId: branchNameId ? branchNameId.Id : 0,
    //             DesignId: designId ? designId.Id : 0,
    //         };
    //         console.log("SASASASAASSASASASASASASA ", payload)
    //         try {
    //             const response = await fetch(selectedValue === 'labelled' ? a233 : a234, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(payload),
    //             });
    //             const data = await response.json();
    //             setTableData(data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getFilteredData()
    // }, [filterFormData])
    const handleInputChangePurchase = (e) => {
        const {name, value} = e.target;
        setFilterFormData({
            ...filterFormData,
            [name]: value,
        });
    };

    const handleDownload = (item) => {
        const filteredData = item.LabelledStockItems.map(stockItem => ({
            MetalName: stockItem.MetalName,
            ItemCode: stockItem.ItemCode,
            BranchName: stockItem.BranchName,
            NetWt: stockItem.NetWt,
            GrossWt: stockItem.GrossWt,
            Status: stockItem.Status,
            CreatedOn: moment(item.CreatedOn).format('DD/MM/YY')
        }));
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(filteredData);
        xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        xlsx.writeFile(workbook, "stock.xlsx");
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <AdminHeading/>
            <Box className="adminMainBodyBox">
                <AdminBreadCrump
                    title={"Stock Transfer History"}
                    companyName={"Loyalstring"}
                    module={"Trading"}
                    page={"Stock Transfer History"}
                />
            </Box>
            <Box className="adminAddCategoryMainBox">
                <Box className="adminAddCategoryInnerBox">
                    <Grid container justifyContent={"space-between"} alignItems={"start"}>
                        <Grid item>
                            <Box mb={1}>
                                <Tabs
                                    value={selectedTab}
                                    onChange={handleTabChange}
                                    aria-label="stock transfer tabs"
                                    TabIndicatorProps={{style: {backgroundColor: '#02a8b5'}}}
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
                                    <Tab label="In Request"/>
                                    <Tab label="Out Request"/>
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item sx={{marginTop: "10px"}}>
                            <Grid container display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                <Grid item display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Box sx={{display: "flex", alignItems: "center"}} mx={1}>
                                        <label style={{width: "155px"}}>Start Date :</label>
                                        <input type="date" name={"StartDate"} onChange={handleInputChangePurchase}
                                               value={filterFormData.StartDate}
                                               style={{width: "100%", height: "25px"}}/>
                                    </Box>
                                    <Box sx={{display: "flex", alignItems: "center"}} mx={1}>
                                        <label style={{width: "145px"}}>End Date :</label>
                                        <input type="date" name={"EndDate"} onChange={handleInputChangePurchase}
                                               value={filterFormData.EndDate}
                                               style={{width: "100%", height: "25px"}}/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container mb={2} justifyContent={"space-between"} alignItems={"start"}>
                        <Grid item sx={{marginTop: "10px"}}>
                            <Grid container display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                <Grid item>
                                    <Box sx={{display: "flex", alignItems: "center"}}>
                                        <label style={{width: "160px"}}>Stock Type :</label>
                                        <select className={"input-select"} name={"StockType"}
                                                onChange={handleInputChangePurchase}
                                                value={filterFormData.StockType}>
                                            <option value="">Choose a Stock Type</option>
                                            <option value="labelled">Labelled Stock</option>
                                            <option value="unlabelled">Unlabelled Stock</option>
                                        </select>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{display: "flex", alignItems: "center"}}>
                                        <label style={{width: "135px"}}>Branch :</label>
                                        <select className={"input-select"} name={"BranchName"}
                                                onChange={handleInputChangePurchase}
                                                value={filterFormData.BranchName}>
                                            <option value="">Choose a Branch</option>
                                            {branchOption.map((x, y) => (
                                                <option key={y} value={x.Id}>{x.BranchName}</option>
                                            ))}
                                        </select>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{display: "flex", alignItems: "center"}}>
                                        <label style={{width: "200px"}}>Transfer Type :</label>
                                        <select className={"input-select"} name={"TransferType"}
                                                onChange={handleInputChangePurchase}
                                                value={filterFormData.TransferType}>
                                            <option value="">Choose a Transfer Type</option>
                                            {transferType.map((x, y) => (
                                                <option key={y} value={x.TransferType}>{x.TransferType}</option>
                                            ))}
                                        </select>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {isLoading ? (<>
                        <Box sx={{
                            height: "80vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <InfinitySpin width="200" color="#4fa94d"/>
                        </Box>
                    </>) : (
                        <TableContainer sx={{' th, td': {border: '1px solid #ccc'}}}>
                            <Table size="small" sx={{borderRadius: '4px', borderCollapse: 'collapse'}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Sr</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Stock Type</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Transfer Type</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">From</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">To</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Transfer By</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Transfer To</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Received By</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Approved</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Rejected</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Pending</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Remark</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Download</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center"/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        tableData && tableData.map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">{item.StockType}</TableCell>
                                                <TableCell
                                                    align="center" sx={{
                                                    backgroundColor: item.StockTransferTypeName === 'Branch To Branch' && '#f0f0f0',
                                                    color: item.StockTransferTypeName === 'Branch To Branch' && '#000',
                                                }}>{item.StockTransferTypeName}</TableCell>

                                                <TableCell
                                                    align="center">{item.SourceName ? item.SourceName : 'Display'}</TableCell>
                                                <TableCell
                                                    align="center">{item.DestinationName ? item.DestinationName : "Display"}</TableCell>
                                                <TableCell align="center">{item.TransferByEmployee}</TableCell>
                                                <TableCell align="center">{item.TransferedToBranch}</TableCell>
                                                <TableCell align="center">{item.ReceivedByEmployee}</TableCell>
                                                <TableCell
                                                    align="center">{item.Approved}</TableCell>
                                                <TableCell
                                                    align="center">{item.Rejected}</TableCell>
                                                <TableCell
                                                    align="center">{item.Pending}</TableCell>
                                                <TableCell
                                                    align="center">{item.Remarks ? item.Remarks : '-'}</TableCell>
                                                <TableCell align="center">
                                                    <Box onClick={() => handleDownload(item)} sx={{cursor: "pointer"}}>
                                                        <DownloadIcon/>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center" sx={{cursor: "pointer"}}
                                                           onClick={() => navigate(`/stock_transfer_approval/${item.Id}`)}>
                                                    <Box><EastIcon/></Box>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>)}
                </Box>
            </Box>
        </>
    );
}

export default AdminStockTransferList;
