import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {
    a17,
    a24,
    s1,
    a26,
    s3,
    a43,
    a31,
    a200,
    a175,
    a177,
    a149,
    a125,
    a128,
    a131,
    a134,
    a137,
    a146,
    a163,
    a226
} from "../../../Api/RootApiPath";
import {AiOutlineClose} from "react-icons/ai";
import {useSelector} from "react-redux";
import {InfinitySpin} from "react-loader-spinner";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import {BsImages} from "react-icons/bs";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import AdminHeading from "../Heading/AdminHeading";
import {RxCross2} from "react-icons/rx";
import {AiOutlineEdit} from "react-icons/ai";
import {GenerateLabel} from "../../../Other Functions/GenerateLabel";
import {GiConsoleController} from "react-icons/gi";

export default function ProductDetails() {
    const [data, setData] = useState([]);
    const [popUp, setPopup] = useState(false);
    const [parameter, setParameter] = useState("");
    const [formValue, setFormValue] = useState("");
    const [placeHolder, setPlaceHolder] = useState("");
    const [loading, setLoading] = useState(false);
    const [qr, setQr] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [rfidData, setRfidData] = useState([]);
    const [barcodeChangeButton, setBarcodeChangeButton] = useState(false);
    const [openEditProduct, setOpenEditProduct] = useState([]);
    const [openEditBox, setOpenEditBox] = useState(false);
    const [showAddStoneBox, setShowAddStoneBox] = useState(false);
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);
    const [allStonesList, setAllStonesList] = useState([]);
    const [partyData, setPartyData] = useState([]);
    const [partyTypeId, setPartyTypeId] = useState("");
    const [allSku, setAllSku] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [category, setCategory] = useState("");
    const [productType, setProductType] = useState("");
    const [baseMetal, setBaseMetal] = useState("");
    const [productTypeData, setProductTypeData] = useState([]);
    const [collection, setCollection] = useState("");
    const [weightOptions, setWeightOptions] = useState([])
    const [collectionTypeData, setCollectionTypeData] = useState([]);
    const [purity, setPurity] = useState("");
    const [purityData, setPurityData] = useState([]);
    const [packetNumber, setPacketNumber] = useState(0);
    const [allPacketNumbers, setAllPacketNumbers] = useState([]);
    const [boxId, setBoxId] = useState(1);
    const [weightCategory, setWeightCategory] = useState('');
    const [boxData, setBoxData] = useState([]);
    const [productTypeId, setProductTypeId] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filteredCollection, setFilteredCollection] = useState([])
    const [filteredPurity, setFilteredPurity] = useState([])
    const [selectedSkuId, setSelectedSkuId] = useState('')
    const [selectedSku, setSelectedSku] = useState([]);
    const [selectedSkuName, setSelectedSkuName] = useState("");
    const [addStone, setAddStone] = useState({
        StoneName: "",
        StoneWeight: 0,
        StonePieces: 0,
        StoneRate: 0,
        StoneAmount: 0,
        Description: "",
        ClientCode: "",
        EmployeeCode: "",
        ProductId: 0,
    });

    const allStates = useSelector((state) => state);
    const adminLoggedIn = allStates.reducer1;
    let Entryby_Staff_id = parseInt(adminLoggedIn);
    //   let Entryby_Staff_id = parseInt(adminLoggedIn);
    const clientCode = adminLoggedIn.ClientCode;
    const employeeCode = adminLoggedIn.EmployeeCode;
    // const labelFormat = parseInt(adminLoggedIn.LabelFormat);
    const labelFormat = parseInt(adminLoggedIn.Clients.LabelFormat);

    // console.log(Entryby_Staff_id);
    const location = useLocation();
    let allImages = "";
    let params = "";
    params = new URLSearchParams(location.search);
    let productId = "NA";
    productId = params.get("productId");
    const searchProduct = async () => {
        // const formData = new FormData();
        // formData.append("Product_id", productId);
        const formData = {
            Id: productId,
            ClientCode: clientCode,
        };
        try {
            const response = await fetch(a200, {
                //   method: "POST",
                //   body: formData,
                // });
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            // if (data.status == "success") {
            //   setData(data.data);
            // } else {
            //   console.error(data.error);
            // }
            console.log("check passed item", data);

            setCategory(data.CategoryId)
            setProductType(data.ProductId)
            setBaseMetal(data.CategoryId)
            setCollection(data.DesignId)
            setPurity(data.PurityId)
            setPacketNumber(data.PacketName)
            setSelectedSkuName(data.SKU)
            setPartyTypeId(data.VendorId)
            setData(data);
            setSelectedSkuId(data.SKUId);
            setOpenEditProduct(data);
            setWeightCategory(data.WeightCategory);
            setOpenEditBox(false);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    //   searchProduct();
    // }, []);

    useEffect(() => {
        searchProduct();
    }, [popUp]);

    if (data != "" && data.Images) {
        allImages = data.Images.split(",");
    } else allImages = "No Data Found";
    const updatedetails = (entry) => {
        setPopup(true);
        if (entry === "image") {
            setPopup("imageRequested");
        }
    };

    useEffect(() => {
        fetchAllStonesList();
    }, []);

    const fetchAllStonesList = async () => {
        const formData = {ClientCode: clientCode};
        try {
            const response = await fetch(a146, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setAllStonesList(data);
            console.log(data, "allPurities");
        } catch (error) {
            console.log(error);
        }
    };

    const updatedetailsBox = async (parameter) => {
        const formData = {
            Id: productId,
            ClientCode: clientCode,
            [parameter]: formValue,
        };
        // const formData = new FormData();
        // formData.append("Product_id", productId);
        // formData.append("FieldName", parameter);
        // formData.append("FieldValue", formValue);
        try {
            const response = await fetch(a24, {
                //   method: "POST",
                //   body: formData,
                // });
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            // if (data.status == "success") {
            //   console.log(data);
            //   setPopup(false);
            //   alert(`${parameter} Changed Successfully`);
            // } else {
            //   console.error(data.error);
            // }
            // setLoading(false);
            // setPopup(false);
            // alert(`${parameter} Changed Successfully`);
            updateStaffId();
        } catch (error) {
            console.error(error);
        }
    };
    const updateStaffId = async () => {
        const formData = {
            Id: productId,
            Entryby_Staff_id: Entryby_Staff_id,
        };
        // const formData = new FormData();
        // formData.append("Product_id", productId);
        // formData.append("FieldName", parameter);
        // formData.append("FieldValue", formValue);
        try {
            const response = await fetch(a24, {
                //   method: "POST",
                //   body: formData,
                // });
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            // if (data.status == "success") {
            //   console.log(data);
            //   setPopup(false);
            //   alert(`${parameter} Changed Successfully`);
            // } else {
            //   console.error(data.error);
            // }
            setLoading(false);
            setPopup(false);
            alert(`${parameter} Changed Successfully`);
        } catch (error) {
            console.error(error);
        }
    };
    const updateImagesBox = async (parameter) => {
        // const formData = {
        //   [parameter]: formValue,
        // };
        const formData = new FormData();
        formData.append("Images", formValue);
        // formData.append("Product_id", productId);
        // formData.append("FieldName", parameter);
        // formData.append("FieldValue", formValue);
        try {
            const response = await fetch(`${a26}/${productId}`, {
                //   method: "POST",
                //   body: formData,
                // });
                method: "PUT",
                // headers: {
                //   "Content-Type": "application/json",
                // },
                // body: JSON.stringify(formData),
                body: formData,
            });
            const data = await response.json();
            // if (data.status == "success") {
            //   console.log(data);
            //   setPopup(false);
            //   alert(`${parameter} Changed Successfully`);
            // } else {
            //   console.error(data.error);
            // }
            setPopup(false);
            alert(`${parameter} Changed Successfully`);
        } catch (error) {
            console.error(error);
        }
    };
    let productData = [data];
    console.log(productData);
    // const handleFileInputChange = (event) => {
    //   const files = event.target.files;
    //   if (files.length > 5) {
    //     alert("You can select up to 5 files.");
    //     event.target.value = null; // Reset the file input
    //     return;
    //   }

    //   // Handle the selected files as desired
    //   else setFormValue(files);
    //   console.log(formValue);
    //   // updateImagesBox(parameter);
    // };
    const handleFileInputChange = (event) => {
        const files = event.target.files;
        if (5 > files.length > 0) {
            const newFiles = Array.from(files).slice(0, 5 - selectedFiles.length);
            setSelectedFiles([...selectedFiles, ...newFiles]);
        }
    };
    const handleFileSubmit = async () => {
        // event.preventDefault();

        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            formData.append(`file${index + 1}`, file);
        });
        console.log(formData, "formData", productId);
        try {
            const response = await fetch(`${a26}/${productId}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                // Files uploaded successfully
                // setLoading(false);
                // console.log("Files uploaded successfully.");
                // setPopup(false);
                // alert(`${parameter} Changed Successfully`);
                updateStaffId();
            } else {
                // Handle the error if the upload fails
                console.error("Failed to upload the files.");
            }
        } catch (error) {
            // Handle any network or fetch API errors
            console.error("An error occurred:", error);
        }
    };

    const getRfidData = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        try {
            fetch(a175, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((res) => res.json())
                .then((data) => setRfidData(data));
        } catch (error) {
            console.error(error);
        }
    };
    console.log(rfidData);

    useEffect(() => {
        getRfidData();
    }, [popUp]);

    // Skkhandre New design
    const openLabelInNew = async (products) => {
        GenerateLabel(products, labelFormat);
    };

    function getWeightOptions(sku) {
        console.log("I mam getting sku ", sku);
        console.log("I mam getting sku all ask i  ", allSku);

        // const weightOptions = allSku.find((x) => x.Id == sku)
        // console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",weightOptions)
        // setWeightOptions(weightOptions?.WeightCategories.split(',').map(Number))
    }

    useEffect(() => {
        if (allSku) {
            const weightOptions = allSku.find((x) => x.Id == selectedSkuId)
            setWeightOptions(weightOptions?.WeightCategories.split(',').map(Number))
            console.log();
            setWeightCategory(openEditProduct.WeightCategory);
        }
    }, [allSku])

    const setBarcode = (value) => {
        // Update the barcodeNumber property in the data object
        const barcodeValue = value.toUpperCase();
        setData((prevData) => ({
            ...prevData,
            barcodeNumber: barcodeValue,
        }));

        // Find a matching product in the rifdData array
        const matchingProduct = rfidData.find(
            (item) => item.barcodeNumber === barcodeValue
        );

        if (matchingProduct) {
            // Update the 'tid' property in the data object with the matching product's tid
            setData((prevData) => ({
                ...prevData,
                tid: matchingProduct.tid,
            })),
                setBarcodeChangeButton(true);
        } else {
            // If no matching product found, set 'tid' to null or some default value
            setData((prevData) => ({
                ...prevData,
                tid: null, // or any default value you want
            })),
                setBarcodeChangeButton(false);
            // setBarCodeAlert(true);
        }
        if (value === "" && matchingProduct === undefined) {
            setBarcodeChangeButton(true);
        }
    };

    const updateBarcodeNumber = async () => {
        setLoading(true);
        const data2 = [data];

        try {
            const response = await fetch(a31, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data2),
            });

            const rcvdData = await response.json();
            console.log("rcvdData", rcvdData);
            setData(rcvdData.data[0]);
            setLoading(false);
            setPopup(false);
            alert(`${parameter} Changed Successfully`);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
        console.log("selectedSkuselectedSku : ",selectedSku)
    useEffect(() => {
        if (selectedSku) {
            setAllStonesList(selectedSku.SKUStoneMain)
        }
    }, [selectedSku]);



    const handleSkuInputChange = (value) => {

        const uppercaseValue = value.toUpperCase();
        setSelectedSkuName(uppercaseValue);
        let selectedSkuItem = [];
        selectedSkuItem = allSku.find((x) => x.StockKeepingUnit == uppercaseValue);
        if(selectedSkuItem){
        setSelectedSku(selectedSkuItem);
        setSelectedSkuId(selectedSkuItem.Id);
        }
        const key = selectedSkuItem?.WeightCategories.split(',').map(Number)
        setWeightOptions(key);
        if (selectedSkuItem) {
            setOpenEditProduct({
                ...openEditProduct,
                GrossWt: selectedSkuItem.GrossWt,
                Gender: selectedSkuItem.Gender,
                OccassionName: selectedSkuItem.OccassionName,
                Description: selectedSkuItem.Description,
                Size: selectedSkuItem.Size,
                MakingFixedWastage: selectedSkuItem.MakingFixedWastage,
                MakingFixedAmt: selectedSkuItem.MakingFixedAmt,
                MakingPercentage: selectedSkuItem.MakingPercentage,
                MakingPerGram: selectedSkuItem.MakingPerGram,
                HSNCode: selectedSkuItem.HSNCode,
                TotalStoneAmount: selectedSkuItem.TotalStoneAmount,
                NetWt: selectedSkuItem.NetWt,
                TotalStoneWeight: selectedSkuItem.TotalStoneWeight,
                Pieces: selectedSkuItem.Pieces,
                BoxName: selectedSkuItem.BoxName,
                CategoryName: selectedSkuItem.CategoryName,
                DesignName: selectedSkuItem.DesignName
            });
            setProductType(`${selectedSkuItem.ProductId},${selectedSkuItem.ProductName}`);
            setCollection(`${selectedSkuItem.DesignId},${selectedSkuItem.DesignName}`);

            // setPurity('22CT');
            // setPacketNumber(selectedSkuItem.PacketName);
            // setBoxId(selectedSkuItem.BoxName);
            // setWeightCategory(selectedSkuItem.WeightCategory);

        }
    };

    const handleInputChange2 = (e, property) => {
        const {value} = e.target;
        if (openEditProduct) {
            const updatedProduct = {
                ...openEditProduct,
                [property]: e.target.value,
            };
            const grosswt = parseFloat(updatedProduct.GrossWt) || 0;
            const stoneWeight = parseFloat(updatedProduct.TotalStoneWeight) || 0;
            const netWt = parseFloat(updatedProduct.NetWt) || 0;
            if (property === "GrossWt" && !isNaN(value)) {
                updatedProduct.NetWt = (parseFloat(value) - stoneWeight).toFixed(3);
                // calculateFinalPrice(selectedProduct);
            }
            if (property === "TotalStoneWeight" && !isNaN(value)) {
                updatedProduct.NetWt = (grosswt - parseFloat(value)).toFixed(3);
            }
            if (property === "NetWt" && !isNaN(value)) {
                updatedProduct.GrossWt = (
                    parseFloat(stoneWeight) + parseFloat(value)
                ).toFixed(3);
            }
            if (property === "RFIDCode") {
                updatedProduct.TIDNumber = null;
                const barcodeValue = value.toUpperCase();
                updatedProduct.RFIDCode = barcodeValue;
                console.log("rfidDatarfidDatarfidDatarfidDatarfidData : ", rfidData);
                const matchingProduct = rfidData.find(
                    (item) => item.BarcodeNumber === barcodeValue
                );

                if (matchingProduct) {
                    updatedProduct.TIDNumber = matchingProduct.TidValue;
                } else {
                    // If no matching product found, set 'tid' to null or some default value
                    updatedProduct.TIDNumber = null; // or any default value you want
                    // setBarCodeAlert(true);
                }
            }

            setOpenEditProduct(updatedProduct);
        }
    };
    const editItem = (product) => {
        setOpenEditBox(true);
        // if (!allSelectedProducts.some((x) => x.id === selectedProduct.id)) {
        setOpenEditProduct(product);

        // } else {
        // alert("Product Already added");
        // }
    };
    const closeEditItem = () => {
        setOpenEditBox(false);
        // document.body.classList.add("body-no-scroll");
    };

    const handleUpdateProduct = async () => {
        const openEditProduct2 = [{
            ...openEditProduct,
            SKUId : selectedSkuId,
            SKU : selectedSkuName,
            WeightCategory: weightCategory,
            VendorId: partyTypeId,
            CategoryId: category,
            ProductId: productType.split(",")[0],
            DesignId: collection.split(",")[0],
            PurityId: purity.split(",")[0],
            ClientCode: clientCode
        }];
        const hasMissingBarcodeAndTid = openEditProduct2.some((product) => {
            if (product.RFIDCode && product.RFIDCode.length !== 0) {
                // Barcode is not empty or null, so check if tid is missing
                return product.TIDNumber === null || product.TIDNumber === "";
            }
            // Barcode is either empty or null, so no need to check tid
            return false;
        });
        if (hasMissingBarcodeAndTid) {
            setLoading(false);
            alert("Sorry, Please enter a correct Barcode");
        } else {
            setLoading(true);
            try {
                const response = await fetch(a177, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(openEditProduct2),
                });

                const rcvdData = await response.json();

                if (rcvdData.status === "error") {
                    setLoading(false);
                    // alert(rcvdData.message); // Show error message
                    // Assuming openEditProduct is a single object
                    setOpenEditProduct({...openEditProduct, hasError: true});
                } else {
                    alert("Updated Successfully");
                    console.log("updatedProduct", openEditProduct);
                    console.log("rcvdDataDat", rcvdData);
                    // Assuming you want to update the state with the response data
                    setOpenEditProduct(rcvdData);
                    searchProduct();
                    setLoading(true);
                }
            } catch (error) {
                alert(error);
                console.error(error);
                setLoading(false);
            }
        }
    };

    // const handleSelectedweights = (e) => {
    //   const value = e.target.value;

    //   if (value !== "") {
    //     setWeightCategory(parseFloat(value)); // Set the selected weight
    //   } else {
    //     setWeightCategory(0); // Set to default if empty value is selected
    //   }
    // };


    const handleStoneChange = (stoneIndex, field, value) => {

        setOpenEditProduct((prevProduct) => {
            const updatedStones = prevProduct.Stones.map((stone, sIndex) => {
                if (sIndex !== stoneIndex) return stone;

                if (field === "StoneName") {
                    const selectedStone = allStonesList.find(
                        (stone) => stone.StoneMainName === value
                    );
                    if (selectedStone) {
                        return {
                            ...stone,
                            StoneName: selectedStone.StoneMainName,
                            StoneWeight: selectedStone.StoneMainWeight,
                            StonePieces: selectedStone.StoneMainPieces,
                            StoneRate: selectedStone.StoneMainRate,
                            StoneAmount: selectedStone.StoneMainAmount,
                            Description: selectedStone.StoneMainDescription
                        };
                    }
                }
                return {...stone, [field]: value};
            });

            const productPieces = parseFloat(prevProduct.Pieces || 0);

            const totalStoneWeight = updatedStones
                .reduce(
                    (total, stone) =>
                        total + parseFloat(stone.StoneWeight || 0) * productPieces,
                    0
                )
                .toFixed(3);

            const totalStoneAmount = updatedStones
                .reduce(
                    (total, stone) =>
                        total + parseFloat(stone.StoneAmount || 0) * productPieces,
                    0
                )
                .toFixed(2);

            const totalNetWt = parseFloat(
                parseFloat(prevProduct.GrossWt) - parseFloat(totalStoneWeight)
            ).toFixed(3);

            const totalStonePieces = (
                updatedStones.length * productPieces
            ).toString();

            return {
                ...prevProduct,
                Stones: updatedStones,
                TotalStoneWeight: totalStoneWeight,
                TotalStoneAmount: totalStoneAmount,
                TotalStonePieces: totalStonePieces,
                NetWt: totalNetWt,
            };
        });


        // setAddedProducts((prevProducts) =>
        //   prevProducts.map((product, index) => {
        //     if (index !== selectedProductIndex) return product;

        //     const updatedStones = product.Stones.map((stone, sIndex) => {
        //       if (sIndex !== stoneIndex) return stone;

        //       if (field === "StoneName") {
        //         const selectedStone = allStonesList.find(
        //           (stone) => stone.StoneName === value
        //         );
        //         if (selectedStone) {
        //           return {
        //             ...stone,
        //             ...selectedStone,
        //           };
        //         }
        //       }
        //       return { ...stone, [field]: value };
        //     });

        //     const productPieces = parseFloat(product.Pieces || 0);

        //     const totalStoneWeight = updatedStones
        //       .reduce(
        //         (total, stone) =>
        //           total + parseFloat(stone.StoneWeight || 0) * productPieces,
        //         0
        //       )
        //       .toFixed(3);

        //     const totalStoneAmount = updatedStones
        //       .reduce(
        //         (total, stone) =>
        //           total + parseFloat(stone.StoneAmount || 0) * productPieces,
        //         0
        //       )
        //       .toFixed(2);
        //     const totalNetWt = parseFloat(
        //       parseFloat(product.GrossWt) - parseFloat(totalStoneWeight)
        //     ).toFixed(3);
        //     const totalStonePieces = (
        //       product.Stones.length * productPieces
        //     ).toString();

        //     return {
        //       ...product,
        //       Stones: updatedStones,
        //       TotalStoneWeight: totalStoneWeight,
        //       TotalStoneAmount: totalStoneAmount,
        //       TotalStonePieces: totalStonePieces,
        //       NetWt: totalNetWt,
        //     };
        //   })
        // );
    };
    const deleteStone = (stoneIndex) => {
        // setOpenEditProduct((prevProducts) =>
        //     prevProducts.map((product, index) =>
        //         index === selectedProductIndex
        //             ? {
        //               ...product,
        //               Stones: product.Stones.filter(
        //                   (_, sIndex) => sIndex !== stoneIndex
        //               ),
        //             }
        //             : product
        //     )
        // );
        setOpenEditProduct((prevProducts) => ({
            ...prevProducts,
            Stones: prevProducts.Stones.filter((_, sIndex) => sIndex !== stoneIndex)
        }));
        console.log("openEditProductopenEditProduct", openEditProduct);
    };
    const handleAddStone = () => {
        console.log('checking openedit  ', openEditProduct)

        setOpenEditProduct((prevProduct) => ({
            ...prevProduct,
            Stones: [...prevProduct.Stones, {}]
        }));

        // setAddedProducts((prevProducts) =>
        //   prevProducts.map((product, selectedProductIndex) =>
        //     selectedProductIndex === selectedProductIndex
        //       ? { ...product, Stones: [...product.Stones, {}] }
        //       : product
        //   )
        // );
    };

    const handleClose = () => {
        // openEditProduct((prevProducts) =>
        //   prevProducts.map((product, selectedProductIndex) => {
        //     if (selectedProductIndex !== selectedProductIndex) return product;

        //     const filteredStones = product.Stones.filter(
        //       (stone) =>
        //         stone.StoneName &&
        //         stone.StoneWeight &&
        //         stone.StonePieces &&
        //         stone.StoneRate &&
        //         stone.StoneAmount &&
        //         stone.Description
        //     );

        //     return { ...product, Stones: filteredStones };
        //   })
        // );
        setShowAddStoneBox(false);
    };

    //my codes

    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a149, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {


                setPartyData(data);

                console.log("check all party ", data);
            });
    }, []);

    useEffect(() => {
        fetchAllSku();
    }, []);
    // useEffect(() => {
    //     if(openEditProduct.SKU){
    //         handleSkuInputChange(openEditProduct.SKU);
    //     }
    // }, [openEditProduct.SKU]);

    const fetchAllSku = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        try {
            const response = await fetch(a163, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setAllSku(data);

            console.log(data, "allSkuData");
        } catch (error) {
            console.log(error);
        }
    };

    let categoryId = parseInt(category);

    let categoryName = categoriesData.filter((x) => x.Id == parseInt(category))[0]
        ?.CategoryName;
    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a125, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => setCategoriesData(data));
    }, []);

    const filterSkusByVendor = () => {
        const selectedVendor = partyData.find(
            (vendor) => vendor.Id === parseInt(partyTypeId)
        );
        console.log("checking filter  ", selectedVendor);
        if (!selectedVendor) return allSku;

        return allSku.filter((sku) =>
            sku.SKUVendor.some(
                (vendor) => vendor.VendorName === selectedVendor.VendorName
            )
        );
    };


    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a128, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((x) => x.json())
            .then((y) => {

                // setProductType(data.ProductId)

                y.forEach((item) => {

                    if (parseInt(item.Id) === parseInt(productType)) {
                        console.log('check filteredproduct 2  ', '    ', item.Id, item.ProductName)
                        setProductType(`${item.Id},${item.ProductName}`);
                        setProductTypeId(parseInt(item.Id));//parseInt(productType.split(",")[0]) || 0;

                    }
                });
                setProductTypeData(y)

            });
    }, [productType]);

    useEffect(() => {
        console.log('check filteredproduct 11   ', productType, '   ', baseMetal)
    }, [productType])

    useEffect(() => {

        const filteredProducts1 = productTypeData.filter(
            (product) => product.CategoryId == baseMetal
        );

        setFilteredProducts(filteredProducts1)
        console.log('check filteredproduct 3    ', '    ', baseMetal, '  f ', filteredProducts1)

    }, [baseMetal])


    // const filteredProducts = productTypeData.filter(
    //   (product) => product.CategoryId == baseMetal
    // );
    // useEffect(() => {
    //   if (openEditProduct) {
    //     // setPurity(openEditProduct.purity);
    //     // setPacketNumber(openEditProduct.PacketName);
    //     // setBoxId(openEditProduct.BoxName);
    //     // setWeightCategory(openEditProduct.WeightCategory);
    //     const weightOptions = allSku.find((x) => x.StockKeepingUnit == openEditProduct.SKU)
    //     // setWeightOptions(weightOptions?.WeightCategories.split(',').map(Number))
    //     setWeightCategory(openEditProduct.WeightCategory)
    //     console.log("00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 : ",weightCategory)
    //     // getWeightOptions(openEditProduct.SKU)
    //   }
    // }, [])


    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a131, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {

                data.forEach((item) => {

                    if (parseInt(item.Id) === parseInt(collection)) {
                        console.log('check filteredproduct 2c  ', collection, '   ', item)
                        setCollection(`${item.Id},${item.DesignName}`)
                        // setProductType(`${item.Id},${item.ProductName}`);
                        // setProductTypeId(parseInt(item.Id));//parseInt(productType.split(",")[0]) || 0;

                    }
                });

                setCollectionTypeData(data)
            });
    }, [collection]);


    // useEffect(()=>{
    //   productTypeId = parseInt(productType.split(",")[0]) || 0;

    // }, [productType])


    useEffect(() => {
        const filteredCollection1 = collectionTypeData.filter(
            (product) => product.ProductId == productTypeId
        );


        setFilteredCollection(filteredCollection1)
    }, [productTypeId])


    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a134, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {

                data.forEach((item) => {
                    if (item.Id == purity) {

                        setPurity(`${item.Id},${item.PurityName}`);
                    }
                })
                setPurityData(data)
            });
        // console.log(purityData);
    }, [purity]);

    useEffect(() => {
        const filteredPurity1 = purityData.filter(
            (product) => product.CategoryId == baseMetal
        );
        console.log('checking all purities  ', filteredPurity1);
        setFilteredPurity(filteredPurity1)
    }, [baseMetal])


    useEffect(() => {
        const fetchAllPacketNumbers = async () => {
            const formData = {
                ClientCode: clientCode,
            };
            try {
                const response = await fetch(a226, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                setAllPacketNumbers(data);

                console.log(data, "allEmployeesData");
            } catch (error) {
                console.log(error);
            }
        };


    })

    useEffect(() => {
        const formData = {
            ClientCode: clientCode,
        };
        fetch(a137, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => setBoxData(data));

    }, []);

    const filteredBoxes = boxData.filter(
        (product) => product.ProductId == productTypeId
    );
    useEffect(() => {
        if (openEditProduct) {
            let selectedSkuItem = allSku.find((x) => x.StockKeepingUnit == openEditProduct?.SKU);
            setSelectedSku(selectedSkuItem);
        }
    }, [allSku])

    return (
        <div>
            <AdminHeading/>
            <div style={{paddingTop: "130px"}}>
                <AdminBreadCrump
                    title={"Inventory"}
                    companyName={"Loyalstring"}
                    module={"E-commerce"}
                    page={"Inventory"}
                />

                <div className="adminAddCategoryMainBox">
                    <div className="adminAddCategoryInnerBox">
                        {/* <h2 style={{ margin: "10px 0" }}>Product details</h2> */}
                        {/* <h4 className="adminInvoiceAddTitles">Add Product</h4> */}
                        {/* <MyPDF
            name={data.product_Name}
            grossWt={data.grosswt}
            stoneWt={data.stoneWeight}
            netWt={data.netWt}
            itemCode={data.itemCode}
            purity={data.purity}
            pieces={data.pieces}
            mrp={data.mrp}
            product_No={data.product_No}
          /> */}
                        {/* <MyPDF data={data} /> */}
                        <div className="adminProductDetailsMainBox">
                            {/* <div className="adminProductDetailImageBox">
              <img
                style={{ width: "300px", cursor: "pointer" }}
                // src={`${s1}${data.ImageList1}`}
                // src={`${s1}${data.imageList1}`}
                // src={`${s3}${data.images}`}
                src={`${s3}/${allImages[0]}`}
                alt="images"
                onClick={() => {
                  setPlaceHolder("Add Image");
                  setParameter("Images");
                  updatedetails("image");
                }}
              />
            </div> */}
                            <div
                                className="adminProductDetailDetailsBox"
                                style={{width: "100%"}}
                            >
                                <h3 style={{marginLeft: "10px"}}>
                                    Last Modified By : {data.entryby_Staff_id}
                                </h3>
                                <h2
                                    // onClick={() => {
                                    //   setPlaceHolder(data.collection);
                                    //   setParameter("Collection Name");
                                    //   updatedetails();
                                    // }}
                                    style={{margin: "10px"}}
                                >
                                    {data.DesignName}
                                </h2>
                                <div style={{margin: "20px 10px"}}>
                                    {data.Images && data.Images.length > 0 ? (
                                        data.Images.split(",").map((image, index) => (
                                            <img
                                                key={index}
                                                style={{
                                                    height: "100px",
                                                    width: "100px",
                                                    marginRight: "10px",
                                                }}
                                                onClick={() => {
                                                    setPlaceHolder("Add Image");
                                                    setParameter("Images");
                                                    updatedetails("image");
                                                }}
                                                className="adminOrderDetailsItemsproductImage"
                                                src={`${s1}/${image.trim()}`}
                                                alt={`Product Image ${index + 1}`}
                                            />
                                        ))
                                    ) : (
                                        <div className="adminProductDetailsMainAddImageBox">
                                            <BsImages
                                                className="adminProductDetailsMainAddImageIcon"
                                                style={{cursor: "pointer"}}
                                                onClick={() => {
                                                    setPlaceHolder("Add Image");
                                                    setParameter("Images");
                                                    updatedetails("image");
                                                }}
                                                size={"30px"}
                                            />
                                            <h3 style={{marginLeft: "10px"}}>Image</h3>
                                            <button
                                                style={{marginLeft: "auto"}}
                                                onClick={() => {
                                                    editItem(openEditProduct);
                                                }}
                                                className="adminAddInvoiceMainAddLabelOptionEditIcon"
                                            >
                                                <AiOutlineEdit size={"25px"}/>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="adminProductDetailsInfoBox">
                                    <div>
                                        <p style={{margin: "10px 0"}}>
                                            Label: {data.imageHeighttemCode}
                                        </p>
                                        <p style={{margin: "10px 0"}}>
                                            Product Type: {data.ProductName}
                                        </p>
                                        <p style={{margin: "10px 0"}}>
                                            Purity: {data.PurityName}
                                        </p>
                                    </div>
                                    <div style={{textAlign: "end"}}>
                                        <p> .</p>
                                        <p style={{margin: "10px 0"}}>
                                            Barcode Number: {data.RFIDCode}
                                        </p>
                                        <p style={{margin: "10px 0"}}>
                                            Tid Number: {data.TIDNumber}
                                        </p>
                                    </div>
                                </div>
                                {/* <h2
                onClick={() => {
                  setPlaceHolder(data.product_Name);
                  setParameter("Product_Name");
                  updatedetails();
                }}
                style={{ margin: "1rem 0" }}
              >
                {data.product_Name}
              </h2> */}
                                <p
                                    // onClick={() => {
                                    //   setPlaceHolder(data.description);
                                    //   setParameter("description");
                                    //   updatedetails();
                                    // }}
                                    style={{
                                        color: "red",
                                        lineHeight: "1.5rem",
                                        margin: "1rem 0",
                                    }}
                                >
                                    {data.Description}
                                </p>
                                <div className="adminProductDetailDetailsBoxItems">
                                    {/* <p
                  className="adminProductDetailDetailsBoxEditItems"
                  onClick={() => {
                    setPlaceHolder(data.size);
                    setParameter("Size");
                    updatedetails();
                  }}
                >
                  Size: {data.size == "" ? "0" : data.size}
                </p> */}
                                    <p
                                        // className="adminProductDetailDetailsBoxEditItems"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.grosswt);
                                        //   setParameter("grosswt");
                                        //   updatedetails();
                                        // }}
                                    >
                                        Gross Wt: {data.GrossWt}gm
                                    </p>
                                    <p
                                        className="adminProductDetailDetailsBoxEditItems"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.stoneWeight);
                                        //   setParameter("stoneWeight");
                                        //   updatedetails();
                                        // }}
                                    >
                                        Stone Wt: {data.TotalStoneWeight}gm
                                    </p>
                                    <p
                                        className="adminProductDetailDetailsBoxEditItems"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.netWt);
                                        //   setParameter("NetWt");
                                        //   updatedetails();
                                        // }}
                                    >
                                        Net Wt: {data.NetWt}gm
                                    </p>
                                    <p
                                        className="adminProductDetailDetailsBoxEditItems"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.stoneAmount);
                                        //   setParameter("StoneAmount");
                                        //   updatedetails();
                                        // }}
                                    >
                                        Stone Amount: {data.TotalStoneAmount}
                                    </p>
                                </div>
                                <div className="adminProductDetailDetailsBoxItems">
                                    <p
                                        className="adminProductDetailDetailsBoxEditItems"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.making_per_gram);
                                        //   setParameter("making_per_gram");
                                        //   updatedetails();
                                        // }}
                                    >
                                        M.PerGram: ₹{data.MakingPerGram}
                                    </p>
                                    <p
                                        className="adminProductDetailDetailsBoxEditItems"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.making_Percentage);
                                        //   setParameter("making_Percentage");
                                        //   updatedetails();
                                        // }}
                                    >
                                        M.Percentage: {data.MakingPercentage}%
                                    </p>
                                    {/* <p
                // onClick={() => {
                //   setPlaceHolder(data.purity);
                //   setParameter("purity");
                //   updatedetails();
                // }}
                >
                  Purity: {data.purity}
                </p> */}
                                    <p
                                        className="adminProductDetailDetailsBoxEditItems"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.making_Fixed_Amt);
                                        //   setParameter("making_Fixed_Amt");
                                        //   updatedetails();
                                        // }}
                                    >
                                        M.Fixed.Amt: ₹{data.MakingFixedAmt}
                                    </p>
                                    <p
                                        className="adminProductDetailDetailsBoxEditItems"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.making_Fixed_Wastage);
                                        //   setParameter("making_Fixed_Wastage");
                                        //   updatedetails();
                                        // }}
                                    >
                                        M.Fixed.Wastage: {data.MakingFixedWastage}gm
                                    </p>
                                </div>
                                <div className="adminProductDetailDetailsBoxItems">
                                    <p
                                        className="adminProductDetailDetailsBoxEditItems"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.mrp);
                                        //   setParameter("mrp");
                                        //   updatedetails();
                                        // }}
                                    >
                                        MRP: ₹{data.MRP}
                                    </p>
                                    <p
                                        className="adminProductDetailDetailsBoxEditItems"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.occasion);
                                        //   setParameter("occasion");
                                        //   updatedetails();
                                        // }}
                                    >
                                        Occassion: {data.OccassionName}
                                    </p>
                                    <p
                                        className="adminProductDetailDetailsBoxEditItems"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.gender);
                                        //   setParameter("gender");
                                        //   updatedetails();
                                        // }}
                                    >
                                        Gender: {data.Gender}
                                    </p>
                                    <p
                                        className="adminProductDetailDetailsBoxEditItems"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.statusType);
                                        //   setParameter("StatusType");
                                        //   updatedetails();
                                        // }}
                                    >
                                        Status: {data.Status}
                                    </p>
                                    {/* <p
                // onClick={() => {
                  //   setPlaceHolder(data.itemType);
                  //   setParameter("itemType");
                  //   updatedetails();
                // }}
                >
                  ItemType: {data.itemType}
                </p> */}
                                    {/* <p
                  onClick={() => {
                    setPlaceHolder(data.collection);
                    setParameter("collection");
                    updatedetails();
                  }}
                >
                  Collection: {data.collection}
                </p> */}
                                </div>

                                <div className="adminProductDetailDetailsBoxItems">
                                    <p
                                        className="adminProductDetailDetailsBoxEditItems adminProductDetailDetailsBoxEditItemsBarcode"
                                        // onClick={() => {
                                        //   setPlaceHolder(data.barcodeNumber);
                                        //   setParameter("barcodeNumber");
                                        //   updatedetails();
                                        // }}
                                    >
                                        Barcode Number: {data.RFIDCode}
                                    </p>

                                    {/* <p
                  onClick={() => {
                    setPlaceHolder(data.pieces);
                    setParameter("Pieces");
                    updatedetails();
                  }}
                >
                Pieces: {data.pieces}
                </p> */}

                                    {/* <p>Item Code: {data.itemCode}</p> */}
                                    {/* <p>Item Code: {data.BarcodeNumber}</p> */}
                                </div>
                                {/* <img style={{ width: "120px" }} src={qr} /> */}
                                <button
                                    style={{margin: "20px 10px"}}
                                    onClick={() => openLabelInNew([data])}
                                    className="adminOrderDetailsPdfButton"
                                >
                                    Print Label
                                </button>
                            </div>
                            <div
                                style={{height: "auto", paddingBottom: "50px"}}
                                className={
                                    popUp == true ? "updateAccountDetailsPopupMainBox" : "none"
                                }
                            >
                                <div className="updateAccountDetailsPopupCloseBtn">
                                    <AiOutlineClose
                                        size={"3rem"}
                                        onClick={() => setPopup(false)}
                                    />
                                </div>
                                <h1 style={{color: "rgba(0,0,0,0.5)"}}>
                                    Change {parameter}{" "}
                                </h1>
                                {parameter === "barcodeNumber" ? (
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <input
                                            style={{marginBottom: "10px"}}
                                            placeholder={placeHolder}
                                            type="text"
                                            value={data.barcodeNumber}
                                            onChange={(e) => setBarcode(e.target.value)}
                                        />
                                        <input
                                            style={{cursor: "not-allowed", marginTop: "10px"}}
                                            type="text"
                                            placeholder={data.tid}
                                            // value={data.tid} // Set the value of the input to data.tid
                                            readOnly // Make the input read-only
                                        />
                                        <div
                                            style={{height: "70px", marginBottom: "1rem"}}
                                            className={loading == true ? "loading" : "none"}
                                        >
                                            <InfinitySpin width="150" color="#4fa94d"/>
                                        </div>
                                        {barcodeChangeButton ? (
                                            <button
                                                onClick={() => {
                                                    if (data.barcodeNumber === "" && data.tid === null) {
                                                        updateBarcodeNumber();
                                                        // Show an alert when barcodeNumber is empty and tid is null
                                                    } else {
                                                        // updatedetailsBox(parameter);
                                                        updateBarcodeNumber();
                                                        // setLoading(true);
                                                    }
                                                }}
                                            >
                                                {data.barcodeNumber === "" && data.tid === null
                                                    ? "Change Barcode Empty"
                                                    : `Change Barcode to - ${data.barcodeNumber}`}
                                            </button>
                                        ) : null}
                                    </div>
                                ) : (
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <input
                                            placeholder={placeHolder}
                                            type="text"
                                            onChange={(e) => setFormValue(e.target.value)}
                                        />
                                        <div
                                            style={{height: "70px", marginBottom: "1rem"}}
                                            className={loading == true ? "loading" : "none"}
                                        >
                                            <InfinitySpin width="150" color="#4fa94d"/>
                                        </div>
                                        <button
                                            onClick={() => {
                                                updatedetailsBox(parameter), setLoading(true);
                                            }}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                )}
                            </div>
                            {openEditBox ? (
                                <div
                                    style={{
                                        position: "fixed",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        background: "rgba(0, 0, 0, 0.5)",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        zIndex: 100000,
                                    }}
                                >
                                    <div
                                        style={{
                                            background: "#fff",
                                            width: "80%",
                                            height: "90%",
                                            overflowY: "auto", // Enable vertical scrolling when content exceeds max-height
                                            padding: "20px",
                                            borderRadius: "8px",
                                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                borderBottom: "1px solid rgba(128, 128, 128, 0.3)",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <p>Edit Item</p>
                                            <button
                                                onClick={closeEditItem}
                                                className="adminAddInvoiceMainAddLabelOptionDeleteIcon"
                                            >
                                                <RxCross2 size={"25px"}/>
                                            </button>
                                        </div>
                                        <div
                                            style={{
                                                width: "80%",
                                                marginTop: "40px",
                                                display: "grid",
                                                justifyItems: "flex-start",
                                                alignContent: "space-between",
                                                gridTemplateColumns: "repeat(2, 1fr)",
                                                gap: "20px",
                                                columnGap: "100px",
                                                padding: "20px",
                                                fontSize: "13px",
                                                color: "var(--fontTertiary)",
                                            }}
                                        >
                                            {showAddStoneBox && selectedProductIndex !== null ? (
                                                <div className="adminAddCategoryMainBox2">
                                                    <div className="popup">
                                                        <div
                                                            style={{maxHeight: "250px", overflowY: "auto"}}
                                                            className="popup-inner"
                                                        >
                                                            <div className="adminAddProductsPopupInnerBox">
                                                                {openEditProduct.Stones.map((x, index) => (
                                                                    <div
                                                                        className="adminPurchaseEntryAddStonesMainBox"

                                                                    >
                                                                        <div style={{gridColumn: "span 6"}}>
                                                                            <h4 style={{margin: "5px"}}>
                                                                                Stone {index + 1}
                                                                            </h4>
                                                                        </div>
                                                                        <label>Stone Name</label>
                                                                        <input
                                                                            value={x.StoneName || ""}
                                                                            onChange={(e) =>
                                                                                handleStoneChange(
                                                                                    index,
                                                                                    "StoneName",
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            type="text"
                                                                            list="allStonesList"
                                                                        />
                                                                        <datalist id="allStonesList">
                                                                            {allStonesList.map((stone) => (
                                                                                <option
                                                                                    key={stone.StoneMainName ? stone.StoneMainName : stone.StoneName}
                                                                                    value={stone.StoneMainName ? stone.StoneMainName : stone.StoneName}
                                                                                >
                                                                                    {stone.StoneMainName ? stone.StoneMainName : stone.StoneName}
                                                                                </option>
                                                                            ))}
                                                                        </datalist>
                                                                        <label>Stone Weight</label>
                                                                        <input
                                                                            value={x.StoneWeight || ""}
                                                                            onChange={(e) =>
                                                                                handleStoneChange(
                                                                                    index,
                                                                                    "StoneWeight",
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            type="text"
                                                                        />
                                                                        <label>Stone Pieces</label>
                                                                        <input
                                                                            value={x.StonePieces || ""}
                                                                            onChange={(e) =>
                                                                                handleStoneChange(
                                                                                    index,
                                                                                    "StonePieces",
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            type="text"
                                                                        />
                                                                        <label>Stone Rate</label>
                                                                        <input
                                                                            value={x.StoneRate || ""}
                                                                            onChange={(e) =>
                                                                                handleStoneChange(
                                                                                    index,
                                                                                    "StoneRate",
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            type="text"
                                                                        />
                                                                        <label>Stone Amount</label>
                                                                        <input
                                                                            value={x.StoneAmount || ""}
                                                                            onChange={(e) =>
                                                                                handleStoneChange(
                                                                                    index,
                                                                                    "StoneAmount",
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            type="text"
                                                                        />
                                                                        <label>Stone Description</label>
                                                                        <input
                                                                            value={x.Description || ""}
                                                                            onChange={(e) =>
                                                                                handleStoneChange(
                                                                                    index,
                                                                                    "Description",
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            type="text"
                                                                        />
                                                                        <button
                                                                            className="bulkProductAddDeleteButton close-btn"
                                                                            onClick={() => deleteStone(index)}
                                                                        >
                                                                            Delete Stone
                                                                        </button>
                                                                        <button
                                                                            id="bulkStockAddProductImportButton"
                                                                            onClick={handleAddStone}
                                                                            className="close-btn"
                                                                        >
                                                                            Add Stone
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                                {openEditProduct.Stones.length === 0 ? (
                                                                    <button
                                                                        id="bulkStockAddProductImportButton"
                                                                        onClick={handleAddStone}
                                                                        className="close-btn"
                                                                    >
                                                                        Add Stone
                                                                    </button>
                                                                ) : null}
                                                                <button
                                                                    onClick={handleClose}
                                                                    className="bulkProductAddDeleteButton close-btn"
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Supplierrr</label>
                                                <select
                                                    id="category"
                                                    required="required"
                                                    value={partyTypeId}
                                                    onChange={(e) => setPartyTypeId(e.target.value)}
                                                >
                                                    <option value="">Select Party / Karigar Name</option>
                                                    {partyData.map((x, y) => {
                                                        return (
                                                            <option key={y} value={parseInt(x.Id)}>
                                                                {x.VendorName}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label htmlFor="sku">
                                                    <strong>SKU</strong>
                                                </label>
                                                <input
                                                    // style={{ width: "30vw" }}
                                                    type="text"
                                                    name="skuList"
                                                    placeholder="Enter SKU"
                                                    value={selectedSkuName}
                                                    onInput={(e) => handleSkuInputChange(e.target.value)}
                                                    list="skuList"
                                                />
                                                <datalist id="skuList">
                                                    {allSku.map((sku, index) => (
                                                        <option
                                                            key={index}
                                                            value={`${sku.StockKeepingUnit}`}
                                                        />
                                                    ))}
                                                </datalist>
                                                {/*<select*/}
                                                {/*    id="skuList"*/}
                                                {/*    required="required"*/}
                                                {/*    name="skuList"*/}
                                                {/*    value={selectedSkuName}*/}
                                                {/*    onChange={handleSkuInputChange}*/}
                                                {/*>*/}
                                                {/*  <option value="">Enter SKU</option>*/}
                                                {/*  {filterSkusByVendor().map((x, y) => {*/}
                                                {/*    return (*/}
                                                {/*        <option*/}
                                                {/*            key={y}*/}
                                                {/*            value={`${x.StockKeepingUnit}`}*/}
                                                {/*        >*/}
                                                {/*          {x.StockKeepingUnit}*/}
                                                {/*        </option>*/}
                                                {/*    );*/}
                                                {/*  })}*/}
                                                {/*</select>*/}
                                            </div>
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Stock type</label>
                                                <input
                                                    type="text"
                                                    placeholder={openEditProduct.GrossWt}
                                                    value={openEditProduct.GrossWt}
                                                    onChange={(e) => handleInputChange2(e, "GrossWt")}
                                                />
                                            </div>
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Branch</label>
                                                <input
                                                    type="text"
                                                    placeholder={openEditProduct.BranchName}
                                                    value={openEditProduct.BranchName}
                                                    onChange={(e) => handleInputChange2(e, "BranchName")}
                                                />
                                            </div>
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Lot Number</label>
                                                <input
                                                    type="text"
                                                    placeholder={openEditProduct.LotNumber}
                                                    value={openEditProduct.LotNumber}
                                                    onChange={(e) => handleInputChange2(e, "LotNumber")}
                                                />
                                            </div>
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label style={{margin: 0}}>Category</label>
                                                <select
                                                    id="category"
                                                    required="required"
                                                    value={category}
                                                    onChange={(e) => {
                                                        if (
                                                            categoriesData &&
                                                            categoriesData
                                                                .filter((x) => x.Id == e.target.value)[0]
                                                                ?.CategoryName.toLowerCase() !== "diamonds"
                                                        ) {
                                                            setCategory(e.target.value),
                                                                setBaseMetal(e.target.value);
                                                        } else if (
                                                            categoriesData &&
                                                            categoriesData
                                                                .filter((x) => x.Id == e.target.value)[0]
                                                                ?.CategoryName.toLowerCase() !==
                                                            "loose diamonds"
                                                        ) {
                                                            setCategory(e.target.value),
                                                                setBaseMetal(0),
                                                                setProductType(""),
                                                                setCollection(""),
                                                                setPurity(""),
                                                                setWeightCategory(""),
                                                                setBoxId(""),
                                                                setDiamondSize(""),
                                                                setDiamondWeight("0"),
                                                                setDiamondPurchaseRate("0"),
                                                                setDiamondSellRate("0"),
                                                                setDiamondClarity(""),
                                                                setDiamondColour(""),
                                                                setDiamondShape(""),
                                                                setDiamondCut(""),
                                                                setDiamondSettingType(""),
                                                                setDiamondCertificate(""),
                                                                setDiamondPieces("0"),
                                                                setDiamondPurchaseAmount("0"),
                                                                setDiamondSellAmount("0"),
                                                                setDiamondDescription(""),
                                                                setStockType("Labelled");
                                                        } else {
                                                            setCategory(e.target.value), setBaseMetal(1);
                                                        }
                                                    }}
                                                >
                                                    <option value="">Category</option>
                                                    {categoriesData.map((x, y) => {
                                                        return (
                                                            <option key={y} value={x.Id}>
                                                                {x.CategoryName}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label htmlFor="productTypeId" style={{margin: 0}}>
                                                    Product
                                                </label>

                                                <select
                                                    id="productTypeId"
                                                    required="required"
                                                    value={productType}
                                                    onChange={(e) => setProductType(e.target.value)}
                                                >
                                                    <option value="">Product Type</option>
                                                    {filteredProducts.map((x, y) => {
                                                        return (
                                                            <option
                                                                key={y}
                                                                value={`${parseInt(x.Id)},${x.ProductName}`}
                                                            >
                                                                {x.ProductName}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            {console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMM : ", selectedSku)}
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label style={{margin: 0}}>Design</label>
                                                <select
                                                    id="collection"
                                                    required="required"
                                                    value={collection}
                                                    onChange={(e) => setCollection(e.target.value)}
                                                >
                                                    <option value="">Design</option>
                                                    {filteredCollection.map((x, y) => {
                                                        return (
                                                            <option
                                                                key={y}
                                                                value={`${parseInt(x.Id)},${x.DesignName}`}
                                                            >
                                                                {x.DesignName}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label style={{margin: 0}}>Purity</label>
                                                <select
                                                    id="purity"
                                                    required="required"
                                                    value={purity}
                                                    onChange={(e) => setPurity(e.target.value)}
                                                >
                                                    <option value="">Purity</option>

                                                    {filteredPurity.map((x, y) => {
                                                        return (
                                                            <option
                                                                key={y}
                                                                value={`${parseInt(x.Id)},${x.PurityName}`}
                                                            >
                                                                {x.PurityName}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label htmlFor="PacketId" style={{margin: 0}}>
                                                    Packet
                                                </label>
                                                <select
                                                    id="PacketId"
                                                    // required="required"
                                                    value={packetNumber}
                                                    onChange={(e) => setPacketNumber(e.target.value)}
                                                >
                                                    <option value="">Packet</option>
                                                    {allPacketNumbers.map((x, y) => {
                                                        return (
                                                            <option key={y} value={parseInt(x.Id)}>
                                                                {x.PacketName}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label htmlFor="boxId" style={{margin: 0}}>
                                                    Box
                                                </label>
                                                <select
                                                    id="boxId"
                                                    // required="required"
                                                    value={boxId}
                                                    onChange={(e) => setBoxId(e.target.value)}
                                                >
                                                    <option value="">Box</option>
                                                    {filteredBoxes.map((x, y) => {
                                                        return (
                                                            <option key={y} value={parseInt(x.Id)}>
                                                                {x.BoxName}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label htmlFor="boxId" style={{margin: 0}}>
                                                    Weight Category
                                                </label>
                                                <select
                                                    id="WeightCategory"
                                                    value={weightCategory}
                                                    onChange={(e) => setWeightCategory(e.target.value)}
                                                >
                                                    <option value="">Select category weight</option>
                                                    {weightOptions && weightOptions?.map((x, y) => {
                                                        return (
                                                            <option key={y} value={x}>
                                                                {x}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            {/* <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Category</label>
                        <input
                          type="text"
                          placeholder={openEditProduct.ProductTitle}
                          value={openEditProduct.ProductTitle}
                          onChange={(e) =>
                            handleInputChange2(e, "ProductTitle")
                          }
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Product Name</label>
                        <input
                          type="text"
                          placeholder={openEditProduct.ProductTitle}
                          value={openEditProduct.ProductTitle}
                          onChange={(e) =>
                            handleInputChange2(e, "ProductTitle")
                          }
                        />
                      </div> */}
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Pieces</label>{" "}
                                                <input
                                                    type="number"
                                                    placeholder={openEditProduct.Pieces}
                                                    value={openEditProduct.Pieces}
                                                    onChange={(e) => handleInputChange2(e, "Pieces")}
                                                />
                                            </div>
                                            {/* <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Purity</label>{" "}
                        <input
                          type="text"
                          placeholder={openEditProduct.PurityName}
                          value={openEditProduct.PurityName}
                          onChange={(e) => handleInputChange2(e, "PurityName")}
                        />
                      </div> */}
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Gross Wt</label>
                                                <input
                                                    type="text"
                                                    placeholder={openEditProduct.GrossWt}
                                                    value={openEditProduct.GrossWt}
                                                    onChange={(e) => handleInputChange2(e, "GrossWt")}
                                                />
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Stone Wt</label>{" "}
                                                <input
                                                    type="number"
                                                    placeholder={openEditProduct.TotalStoneWeight}
                                                    value={openEditProduct.TotalStoneWeight}
                                                    onChange={(e) =>
                                                        handleInputChange2(e, "TotalStoneWeight")
                                                    }
                                                />
                                            </div>
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Net Wt</label>
                                                <input
                                                    type="text"
                                                    placeholder={openEditProduct.NetWt}
                                                    value={openEditProduct.NetWt}
                                                    onChange={(e) => handleInputChange2(e, "NetWt")}
                                                />
                                            </div>
                                            {/* //keep stone popup */}

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <button
                                                    onClick={() => {
                                                        // setOpenEditProduct((prevProducts) =>
                                                        //   prevProducts.map((item, i) =>
                                                        //     i === index
                                                        //       ? {
                                                        //           ...item,
                                                        //           Stones: [
                                                        //             ...item.Stones,
                                                        //             addStone,
                                                        //           ],
                                                        //         }
                                                        //       : item
                                                        //   )
                                                        // )
                                                        setShowAddStoneBox(true);
                                                        setSelectedProductIndex(0);
                                                    }}
                                                >
                                                    stone{openEditProduct.Stones?.length}
                                                </button>
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Stone Amount</label>{" "}
                                                <input
                                                    type="number"
                                                    placeholder={openEditProduct.TotalStoneAmount}
                                                    value={openEditProduct.TotalStoneAmount}
                                                    onChange={(e) =>
                                                        handleInputChange2(e, "TotalStoneAmount")
                                                    }
                                                />
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>HSNCode </label>
                                                <input
                                                    type="text"
                                                    maxLength={6}
                                                    placeholder={openEditProduct.HSNCode}
                                                    value={openEditProduct.HSNCode}
                                                    onChange={(e) => handleInputChange2(e, "HSNCode")}
                                                />
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Making PerGram</label>{" "}
                                                <input
                                                    type="number"
                                                    placeholder={openEditProduct.MakingPerGram}
                                                    value={openEditProduct.MakingPerGram}
                                                    onChange={(e) =>
                                                        handleInputChange2(e, "MakingPerGram")
                                                    }
                                                />
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Making Percentage</label>{" "}
                                                <input
                                                    type="number"
                                                    placeholder={openEditProduct.MakingPercentage}
                                                    value={openEditProduct.MakingPercentage}
                                                    onChange={(e) =>
                                                        handleInputChange2(e, "MakingPercentage")
                                                    }
                                                />
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Making Fixed Amount</label>{" "}
                                                <input
                                                    type="number"
                                                    placeholder={openEditProduct.MakingFixedAmt}
                                                    value={openEditProduct.MakingFixedAmt}
                                                    onChange={(e) =>
                                                        handleInputChange2(e, "MakingFixedAmt")
                                                    }
                                                />
                                            </div>
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Making Fixed Wastage</label>
                                                <input
                                                    type="number"
                                                    placeholder={openEditProduct.MakingFixedWastage}
                                                    value={openEditProduct.MakingFixedWastage}
                                                    onChange={(e) =>
                                                        handleInputChange2(e, "MakingFixedWastage")
                                                    }
                                                />
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Size</label>{" "}
                                                <input
                                                    type="number"
                                                    placeholder={openEditProduct.Size}
                                                    value={openEditProduct.Size}
                                                    onChange={(e) => handleInputChange2(e, "Size")}
                                                />
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>MRP</label>{" "}
                                                <input
                                                    type="number"
                                                    placeholder={openEditProduct.MRP}
                                                    value={openEditProduct.MRP}
                                                    onChange={(e) => handleInputChange2(e, "MRP")}
                                                />
                                            </div>
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Description</label>{" "}
                                                <input
                                                    type="text"
                                                    placeholder={openEditProduct.Description}
                                                    value={openEditProduct.Description}
                                                    onChange={(e) => handleInputChange2(e, "Description")}
                                                />
                                            </div>
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Occasion</label>{" "}
                                                <input
                                                    type="text"
                                                    placeholder={openEditProduct.OccassionName}
                                                    value={openEditProduct.OccassionName}
                                                    onChange={(e) =>
                                                        handleInputChange2(e, "OccassionName")
                                                    }
                                                />
                                            </div>
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <label>Gender</label>{" "}
                                                <input
                                                    type="text"
                                                    placeholder={openEditProduct.Gender}
                                                    value={openEditProduct.Gender}
                                                    onChange={(e) => handleInputChange2(e, "Gender")}
                                                />
                                            </div>

                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                <input
                                                    type="text"
                                                    placeholder={
                                                        openEditProduct.RFIDCode
                                                            ? openEditProduct.RFIDCode
                                                            : "Enter Barcode"
                                                    }
                                                    value={openEditProduct.RFIDCode}
                                                    onChange={(e) => handleInputChange2(e, "RFIDCode")}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder={
                                                        openEditProduct.TIDNumber
                                                            ? openEditProduct.TIDNumber
                                                            : "TIDNumber"
                                                    }
                                                    value={openEditProduct.TIDNumber}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="adminInvoiceOpenEditInnerGridItem">
                                                {/* <label>Update</label>{" "} */}.{" "}
                                                <button
                                                    onClick={() => {
                                                        handleUpdateProduct();
                                                    }}
                                                    className="adminInvoiceEditProductSaveButton"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {/* Image requested */}
                            <div
                                style={{height: "auto"}}
                                className={
                                    popUp == "imageRequested"
                                        ? "updateAccountDetailsPopupMainBox"
                                        : "none"
                                }
                            >
                                <div
                                    style={{margin: "20px"}}
                                    className="updateAccountDetailsPopupCloseBtn"
                                >
                                    <AiOutlineClose
                                        size={"3rem"}
                                        onClick={() => {
                                            setPopup(false), setSelectedFiles([]);
                                        }}
                                    />
                                </div>
                                <h1 style={{color: "rgba(0,0,0,0.5)"}}>
                                    Change {parameter}{" "}
                                </h1>
                                <input
                                    placeholder={placeHolder}
                                    type="file"
                                    multiple
                                    max="5"
                                    // onChange={(e) => setFormValue(e.target.value)}
                                    // onChange={(e) => handleFileInputChange(e)}
                                    onChange={handleFileInputChange}
                                />
                                <div
                                    style={{height: "70px", marginBottom: "1rem"}}
                                    className={loading == true ? "loading" : "none"}
                                >
                                    <InfinitySpin width="150" color="#4fa94d"/>
                                </div>
                                <p>{selectedFiles.length} out of 5 images selected</p>
                                {/* <button onClick={() => updateImagesBox(parameter)}>Submit</button> */}
                                <button
                                    style={{margin: "20px"}}
                                    onClick={() => {
                                        handleFileSubmit(parameter), setLoading(true);
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>

                        {/* <div className="newBox2"> */}
                        {/* <ProductDetails images={fakeImages} /> */}
                        {/* </div> */}
                        <div className={popUp === true ? "new" : "new2"}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
