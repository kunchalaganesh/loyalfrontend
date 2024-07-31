import React, {useEffect, useState } from 'react';
import AdminHeading from "../Heading/AdminHeading";
import {useSelector} from "react-redux";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import {useNavigate, useParams} from 'react-router-dom';

function AdminDiamondSizeWeightRateTemplate(props) {
    const navigate = useNavigate()
    const [active, setActive] = useState("List");
    const allStates = useSelector((state) => state);
    const adminLoggedIn = allStates.reducer1;
    const [allTableData,setAllTableData] = useState([]);
    const clientCode = adminLoggedIn.ClientCode;
    const [diamondShapes, setDiamondShapes] = useState([]);
    const [diamondClarities, setDiamondClarities] = useState([]);
    const [diamondColours, setDiamondColours] = useState([]);
    const [diamondCuts, setDiamondCuts] = useState([]);
    const [settingTypes, setSettingTypes] = useState([]);
    const {templateId} = useParams();

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    useEffect(() => {
        async function fetchData() {
            const payload = {
                Id:templateId,
                ClientCode: clientCode
            }
            const response = await fetch('https://testing.loyalstring.co.in/api/ProductMaster/GetDiamondSizeWeightRateTemplate', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwMzc1MDA4NTksImlzcyI6Ijk4Nzk4ODc2NzU3NjU2NjU0NjU0IiwiYXVkIjoiSW5mb0Bsb3lhbHN0cmluZy5jb20ifQ.nOtc537wlSYm_97ljruCyOcG7wjXOrNUtxZy206OfOQ",
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            console.log("DATA chhe ",data)
            setAllTableData(data[0].DiamondSizeWeightRates);
        }
        fetchData();
        const fetchDiamondAttributes = async () => {
            const response = await fetch('https://testing.loyalstring.co.in/api/ProductMaster/GetAllDiamondAttributes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ClientCode: clientCode,
                }),
            });
            const data = await response.json();
            const shapes = data.filter(item => item.DiamondAttribute === 'DiamondShape');
            const clarities = data.filter(item => item.DiamondAttribute === 'DiamondClarity');
            const colours = data.filter(item => item.DiamondAttribute === 'DiamondColour');
            const cuts = data.filter(item => item.DiamondAttribute === 'DiamondCut');
            const settings = data.filter(item => item.DiamondAttribute === 'SettingType');

            setDiamondShapes(shapes);
            setDiamondClarities(clarities);
            setDiamondColours(colours);
            setDiamondCuts(cuts);
            setSettingTypes(settings);
        };

        fetchDiamondAttributes();
    }, []);

    function getShapeValue(id,shape) {
        if(id){
            const shapeValue = diamondShapes?.find((item) => item.Id == id);
            return id ? shapeValue?.DiamondValue : '';
        }
        if(shape){
            const shapeValue = diamondShapes?.find((item) => item.DiamondValue == shape);
            return shape ? shapeValue?.Id : '';
        }
    }


    console.log("ALL :: ",allTableData);

    return (
        <div>
            <AdminHeading/>
            <div className="adminMainBodyBox">
                <AdminBreadCrump
                    title={"Diamond Size/Weight/Rate/Template"}
                    companyName={"Loyalstring"}
                    module={"Product Masters"}
                    module={"Diamond Size/Weight/Rate/Template"}
                    page={"Single Diamond Template"}
                />
                <div className="adminAddCategoryMainBox">
                    <div className="adminAddCategoryInnerBox">
                            <div style={{textAlign: 'left'}}>
                        <button className="adminAddCategoryEditButton" onClick={() => navigate('/add_diamond_size_weight_rate')}>Back</button>
                            </div>
                        <div
                            className={
                                active === "List" ? "adminCategoryListMainBox" : "none"
                            }
                        >
                            <table className={'table table-bordered text-center w-100 align-middle'}>
                                <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Diamond Shape</th>
                                    <th>Diamond Size</th>
                                    <th>SIEVE</th>
                                    <th>Diamond Weight</th>
                                    <th>Diamond Purchase Rate</th>
                                    <th>Diamond Margin</th>
                                    <th>Diamond Sell Rate</th>
                                </tr>
                                </thead>
                                <tbody className={'w-100'}>
                                {allTableData && allTableData.map((x, index) => (
                                    console.log(x),
                                    <tr key={x.id}>
                                        <td>{index + 1}</td>
                                        <td>{getShapeValue(x.DiamondShape)}</td>
                                        <td>{x.DiamondSize}</td>
                                        <td>{x.Sleve}</td>
                                        <td>{x.DiamondWeight}</td>
                                        <td>{x.DiamondPurchaseRate}</td>
                                        <td>{x.DiamondMargin}</td>
                                        <td>{x.DiamondSellRate}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDiamondSizeWeightRateTemplate