import React, {useEffect, useState} from 'react';
import AdminHeading from "../Heading/AdminHeading";
import {
    Box,
    Button,
    Collapse, Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import AlertMessage from "../../../Other Functions/AlertMessage";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import {a110, a232, a236} from "../../../Api/RootApiPath";
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
    // const [expandedRow, setExpandedRow] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterFormData, setFilterFormData] = useState({
        StockType: "",
        BranchName: "",
        Date: ""
    })


    const getAllStockTransfers = async () => {
        setIsLoading(true);
        const formData = {
            ClientCode: clientCode,
        };
        try {
            const response = await fetch(a236, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json()
            setTableData(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    // const handleRowExpandToggle = (id) => {
    //     setExpandedRow(expandedRow === id ? null : id);
    // };

    useEffect(() => {
        getAllStockTransfers();
    }, []);
    const handleInputChangePurchase = (e) => {
        const {name, value} = e.target;
        setFilterFormData((list) => ({...list, [name]: value}));
        if(name === 'StockType'){
            // const filteredData = tableData.filter((item,_) )
        }
    }
    console.log("TABLEDATA : ",tableData)
    const handleDownload = (item) => {
        const filteredData = item.LabelledStockItems.map(stockItem => {
            return {
                MetalName: stockItem.MetalName,
                ItemCode: stockItem.ItemCode,
                BranchName: stockItem.BranchName,
                NetWt: stockItem.NetWt,
                GrossWt: stockItem.GrossWt,
                Status: stockItem.Status,
                CreatedOn: moment(item.CreatedOn).format('DD/MM/YY')
            };
        });
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(filteredData);
        xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        xlsx.writeFile(workbook, "stock.xlsx");
    };
    return (
        <>
            <AdminHeading/>
            <Box className="adminMainBodyBox">
                {/*{showError ? (*/}
                {/*    <AlertMessage message={messageToShow} type={messageType}/>*/}
                {/*) : null}*/}
                <AdminBreadCrump
                    title={"Stock Transfer History"}
                    companyName={"Loyalstring"}
                    module={"Trading"}
                    page={"Stock Transfer History"}
                />
            </Box>
            <Box className="adminAddCategoryMainBox">
                <Box className="adminAddCategoryInnerBox">
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
                        <>
                            <Grid container sx={{mb: "40px"}}>
                                <Grid item>
                                    <Box sx={{display: "flex", alignItems: "center"}}>
                                        <label style={{width: "160px"}}>Stock Type :</label>
                                        <select className={"input-select"} name={"StockType"}
                                                onChange={handleInputChangePurchase} value={filterFormData.StockType}>
                                            <option value="">Choose a Stock Type</option>
                                            <option value="labelled">Labelled Stock</option>
                                            <option value="unlabelled">Unlabelled Stock</option>

                                        </select>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{display: "flex", alignItems: "center"}}>
                                        <label style={{width: "160px"}}>Branch :</label>
                                        <select className={"input-select"} name={"BranchName"}
                                                onChange={handleInputChangePurchase} value={filterFormData.BranchName}>
                                            <option value="">Choose a Stock Type</option>
                                            <option value="labelled">Labelled Stock</option>
                                            <option value="unlabelled">Unlabelled Stock</option>

                                        </select>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{display: "flex", alignItems: "center"}}>
                                        <label style={{width: "160px"}}>Date :</label>
                                        <input type="date" name={"Date"} onChange={handleInputChangePurchase} value={filterFormData.Date} style={{width: "100%",height: "25px"}}/>
                                    </Box>
                                </Grid>
                            </Grid>
                            <TableContainer sx={{' th, td': {border: '1px solid #ccc'}}}>
                                <Table size="small" sx={{borderRadius: '4px', borderCollapse: 'collapse'}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{fontWeight: "600"}} align="center">Sr</TableCell>
                                            <TableCell sx={{fontWeight: "600"}} align="center">Transfer Type</TableCell>
                                            <TableCell sx={{fontWeight: "600"}} align="center">Stock Type</TableCell>
                                            <TableCell sx={{fontWeight: "600"}} align="center">From</TableCell>
                                            <TableCell sx={{fontWeight: "600"}} align="center">To</TableCell>
                                            <TableCell sx={{fontWeight: "600"}} align="center">Transfer By
                                                Employee</TableCell>
                                            <TableCell sx={{fontWeight: "600"}} align="center">Transfer To
                                                Branch</TableCell>
                                            <TableCell sx={{fontWeight: "600"}} align="center">Received By</TableCell>
                                            <TableCell sx={{fontWeight: "600"}} align="center">Remark</TableCell>
                                            <TableCell sx={{fontWeight: "600"}} align="center">Download</TableCell>
                                            <TableCell sx={{fontWeight: "600"}} align="center"/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tableData.map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell
                                                    align="center" sx={{
                                                    backgroundColor: item.StockTransferTypeName === 'Branch To Branch' && '#f0f0f0',
                                                    color: item.StockTransferTypeName === 'Branch To Branch' && '#000',
                                                }}>{item.StockTransferTypeName}</TableCell>
                                                <TableCell
                                                    align="center">{item.StockType}</TableCell>
                                                <TableCell
                                                    align="center">{item.SourceName ? item.SourceName : 'Display'}</TableCell>
                                                <TableCell
                                                    align="center">{item.DestinationName ? item.DestinationName : "Display"}</TableCell>
                                                <TableCell
                                                    align="center">{item.TransferByEmployee}</TableCell>
                                                <TableCell
                                                    align="center">{item.TransferedToBranch}</TableCell>
                                                <TableCell align="center">
                                                    {item.ReceivedByEmployee}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.Remarks ? item.Remarks : '-'}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box onClick={() => handleDownload(item)}
                                                         sx={{cursor: "pointer"}}><DownloadIcon/></Box>
                                                </TableCell>
                                                <TableCell align="center" sx={{cursor: "pointer"}}
                                                           onClick={() => navigate(`/stock_transfer_approval/${item.Id}`)}>
                                                    <Box><EastIcon/></Box>
                                                </TableCell>
                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default AdminStockTransferList;