import React, {useState, useEffect} from "react";
import {a134, a135, a139, a189, a190, a239, a240} from "../../../Api/RootApiPath";
import {useSelector} from "react-redux";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminSettings.css";
import {RiListUnordered, RiPlayListAddLine} from "react-icons/ri";
import moment from "moment";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import AlertMessage from "../../../Other Functions/AlertMessage";

export default function AdminRates() {
    const [inputValues, setInputValues] = useState({});
    const [active, setActive] = useState("List");
    const [purityData, setPurityData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [messageToShow, setMessageToShow] = useState("");
    const allStates = useSelector((state) => state);
    const adminLoggedIn = allStates.reducer1;
    const clientCode = adminLoggedIn.ClientCode;

    useEffect(() => {
        fetchAllPurity();
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setShowError(false);
        }, 2000);
    }, [showError]);
    const fetchAllPurity = async () => {
        const formData = {ClientCode: clientCode};
        await fetch(a134, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => setPurityData(data));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const ratesWithTodayRate = purityData.map(item => {
            return {
                CategoryId : item.CategoryId,
                // EmployeeCode : item.EmployeeCode,
                EmployeeCode : item.ClientCode,
                Rate: inputValues[item.Id] || item.TodaysRate,
                PurityId: purityData.find((item2) => item2.PurityName === item.PurityName).Id,
                ClientCode : item.ClientCode
            }
        });

        try {
            const response = await fetch(a240, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ratesWithTodayRate),
            });
            const data = await response.json();
            if (data.Message) {
                setMessageType("error");
                setMessageToShow(data.Message);
                setShowError(true);
            } else {
                setMessageType("success");
                setMessageToShow("Rate Updated Successfully");
                setActive("List")
                setShowError(true)
            }
        } catch (error) {
            setMessageType("error");
            setMessageToShow(error);
            setShowError(true);
        }
        console.log("Items with today's rates:", ratesWithTodayRate);
    }

    return (
        <div>
            <AdminHeading/>
            <div className="adminMainBodyBox">
                {showError ? (
                    <AlertMessage message={messageToShow} type={messageType}/>
                ) : null}
                <AdminBreadCrump
                    title={"Add Daily Rates"}
                    companyName={"Loyalstring"}
                    module={"Settings"}
                    page={"Daily Rates"}
                />
                <div className="adminAddCategoryMainBox">
                    <div className="adminAddCategoryInnerBox">
                        <div className="adminAddCategoryInnerBoxTitlesBox">
                            <div
                                onClick={() => setActive("List")}
                                className={active === "List"
                                    ? "adminAddCategoryInnerBoxTitle"
                                    : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                                }
                            >
                                <div className={active === "List"
                                    ? "adminAddCategoryInnerBoxTitleLogo"
                                    : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                                }>
                                    <RiListUnordered/>
                                </div>
                                <p>All Rates</p>
                            </div>
                            <div
                                id="addCategoryListTitle"
                                onClick={() => setActive("AddNew")}
                                className={active === "AddNew"
                                    ? "adminAddCategoryInnerBoxTitle"
                                    : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                                }
                            >
                                <div
                                    id="addCategoryListLogo"
                                    className={active === "AddNew"
                                        ? "adminAddCategoryInnerBoxTitleLogo"
                                        : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                                    }
                                >
                                    <RiPlayListAddLine/>
                                </div>
                                <p>Add Rate</p>
                            </div>
                        </div>
                        <div
                            className={active === "List" ? "adminCategoryListMainBox" : "none"}
                        >
                            <table>
                                <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Date</th>
                                    <th>Category</th>
                                    <th>Purity</th>
                                    <th>Fine Percentage</th>
                                    <th>Todays Rate</th>
                                </tr>
                                </thead>
                                <tbody>
                                {purityData.map((x, index) => (
                                    <tr key={x.Id}>
                                        <td>{index + 1}</td>
                                        <td>{moment(x.CreatedOn).format('DD-MM-YYYY')}</td>
                                        <td>{x.CategoryName}</td>
                                        <td>{x.PurityName}</td>
                                        <td>{x.FinePercentage}</td>
                                        <td>{x.TodaysRate}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div
                            className={active !== "List" ? "adminCategoryAddCategoryMainBox" : "none"}
                        >
                            <p>Add Rate</p>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <TableContainer sx={{' th, td': {border: '1px solid #ccc'}}}>
                                        <Table sx={{
                                            " td": {padding: "4px"},
                                            " th": {padding: "10px"},
                                            " td > div": {width: "50%"}
                                        }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{fontWeight: '600'}}>Category</TableCell>
                                                    <TableCell sx={{fontWeight: '600'}}>Purity</TableCell>
                                                    <TableCell sx={{fontWeight: '600'}}>Fine Percentage</TableCell>
                                                    <TableCell sx={{fontWeight: '600'}}>Todays Rate</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {purityData.map((x) => (
                                                    <TableRow key={x.Id}>
                                                        <TableCell>{x.CategoryName}</TableCell>
                                                        <TableCell>{x.PurityName}</TableCell>
                                                        <TableCell>{x.FinePercentage}</TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                type="number"
                                                                value={inputValues[x.Id] || ''}
                                                                placeholder={x.TodaysRate.toString()}
                                                                onChange={(e) =>
                                                                    setInputValues({
                                                                        ...inputValues,
                                                                        [x.Id]: e.target.value,
                                                                    })
                                                                }
                                                                sx={{width: '80px', marginRight: '10px'}}
                                                                size="small"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <Box sx={{textAlign: "right"}}>
                                    {!loading ? <button type="submit">Submit</button> : null}
                                </Box>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
