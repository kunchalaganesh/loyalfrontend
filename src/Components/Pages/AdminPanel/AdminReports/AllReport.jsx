import React, {useEffect, useState} from 'react';
import AdminHeading from "../Heading/AdminHeading";
import {Box, Grid, Tab, Table, TableCell, TableContainer, TableBody, TableHead, TableRow, Tabs} from "@mui/material";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import {
    a125,
    a128,
    a131,
    a134, a149, a163,
    a181, a216,
    a218,
    a219, a220,
    a221,
    a222, a241, a242,
} from "../../../Api/RootApiPath";
import {useSelector} from "react-redux";
import {InfinitySpin} from "react-loader-spinner";
import jsPDF from "jspdf";
import { ClipLoader } from "react-spinners";
import ErrorModal from "../../../Other Functions/popup";

function AllReport() {
    const allStates = useSelector((state) => state);
    const adminLoggedIn = allStates.reducer1;
    const clientCode = adminLoggedIn.ClientCode;
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [allStockReport, setAllStockReport] = useState([]);
    const [allSkuReport, setAllSkuReport] = useState([]);
    const [allSkuKarigarReport, setAllSkuKarigarReport] = useState([]);
    const [allInventory, setAllInventory] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allPurityTypes, setAllPurityTypes] = useState([]);
    const [allProductTypes, setAllProductTypes] = useState([]);
    const [allCollectionTypes, setAllCollectionTypes] = useState([]);
    const [allSku, setAllSku] = useState([]);
    const [allVendors, setAllVendors] = useState([]);
    let today = new Date();
    const [fromDate, setFromDate] = useState(today.toISOString().split("T")[0]);
    const [toDate, setToDate] = useState(today.toISOString().split("T")[0]);
    const [stockType, setStockType] = useState("");
    const [labelCode, setLabelCode] = useState("");
    const [barCode, setBarCode] = useState("");
    const [vendorName, setVendorName] = useState("");
    const [skuName, setSkuName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [purityName, setPurityName] = useState("");
    const [productName, setProductName] = useState("");
    const [collectionName, setCollectionName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredStockReport, setFilteredStockReport] = useState([]);
    const [filteredSKUReport, setFilteredSKUReport] = useState([]);
    const [filteredSkuKarigarReport, setFilteredSkuKarigarReport] = useState([]);
    const [filteredInventoryReport, setFilteredInventoryReport] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [allPackets, setAllPackets] = useState([]);
    const [allBoxes, setAllBoxes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [formData, setFormData] = useState({
        Category: 1,
        ProductType: 0,
        Design: "",
        Purity: 0,
        FromDate: "2024-09-06",
        ToDate: "2024-09-06",
    });


    const fetchAllCategory = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a125, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setAllCategories(data);
    };

    const fetchAllSkuData = async () => {
        const formData = {ClientCode: clientCode};
        await fetch(a163, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((response) => {
                setAllSku(response);
                fetchAllSkuKarigarReport();
            });
    };

    const fetchAllVendors = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a149, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setAllVendors(data);
    };

    const fetchProductTypes = async () => {
        const formData = {ClientCode: clientCode};
        await fetch(a128, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((response) => {
                setAllProductTypes(response);
            });
    };

    const fetchCollectonData = async () => {
        const formData = {ClientCode: clientCode};
        await fetch(a131, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((response) => {
                setAllCollectionTypes(response);
            });
    };

    const fetchPuritiesData = async () => {
        const formData = {ClientCode: clientCode};
        await fetch(a134, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((response) => {
                setAllPurityTypes(response);
            });
    };

    useEffect(() => {
        fetchPuritiesData(),
            fetchCollectonData(),
            fetchProductTypes(),
            fetchAllCategory(),
            fetchAllSkuData(),
            fetchAllVendors()
    }, [selectedTab]);

    let categoryId = parseInt(categoryName.split(",")[0]);
    let productTypeIdSelected = parseInt(productName.split(",")[0]);
    let collectionNameSelected = collectionName.split(",")[1];
    let purityTypeIdSelected = purityName.split(",")[0];

    const filterStock = () => {
        let filtered = allStockReport;
        if (stockType) {
            filtered = filtered.filter(
                (x) => x.StockType === stockType
            );
        }

        if (categoryName) {
            const categoryId = parseInt(categoryName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.CategoryId === categoryId
            );
        }

        if (productName) {
            const productTypeId = parseInt(productName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.ProductId === productTypeId
            );
        }

        if (collectionName) {
            const collectionId = collectionName.split(",")[1];
            filtered = filtered.filter(
                (x) => x.Design === collectionId
            );
        }

        if (purityName) {
            const purityId = parseInt(purityName.split(",")[0]);
            filtered = filtered.filter((x) => x.PurityId === purityId);
        }

        // if (fromDate && toDate) {
        //     filtered = filtered.filter((product) => {
        //         const productFromDate = new Date(product.FromDate);
        //         const productToDate = new Date(product.ToDate);
        //         const filterFromDate = new Date(fromDate);
        //         const filterToDate = new Date(toDate);
        //         return (
        //             productFromDate >= filterFromDate && productToDate <= filterToDate
        //         );
        //     });
        // }

        setFilteredStockReport(filtered);
        setCurrentPage(1);
    };

    const filterSKU = () => {
        let filtered = allSkuReport;

        if (categoryName) {
            const categoryId = parseInt(categoryName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.CategoryId === categoryId
            );
        }

        if (vendorName) {
            const vendorId = parseInt(vendorName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.VendorId === vendorId
            );
        }

        if (skuName) {
            const skuId = parseInt(skuName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.SKUId === skuId
            );
        }

        if (productName) {
            const productTypeId = parseInt(productName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.ProductId === productTypeId
            );
        }

        if (collectionName) {
            const collectionId = parseInt(collectionName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.DesignId === collectionId
            );
        }

        if (purityName) {
            const purityId = parseInt(purityName.split(",")[0]);
            filtered = filtered.filter((x) => x.PurityId === purityId);
        }
        setFilteredSKUReport(filtered);
        setCurrentPage(1);
    };

    const filterSKU_karigar = () => {
        let filtered = allSkuKarigarReport;

        if (categoryName) {
            const categoryId = parseInt(categoryName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.CategoryId === categoryId
            );
        }

        if (productName) {
            const productTypeId = parseInt(productName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.ProductId === productTypeId
            );
        }

        if (vendorName) {
            const vendorId = parseInt(vendorName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.VendorId === vendorId
            );
        }

        if (skuName) {
            const skuId = parseInt(skuName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.SKUId === skuId
            );
        }

        if (collectionName) {
            const collectionId = parseInt(collectionName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.DesignId === collectionId
            );
        }

        if (purityName) {
            const purityId = parseInt(purityName.split(",")[0]);
            filtered = filtered.filter((x) => x.PurityId === purityId);
        }
        setFilteredSkuKarigarReport(filtered);
        setCurrentPage(1);
    };

    const filterInventory = () => {
        let filtered = allInventory;

        if (categoryName) {
            const categoryId = parseInt(categoryName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.CategoryId === categoryId
            );
        }

        if (labelCode !== "") {
            filtered = filtered.filter(
                (product) => product.ItemCode && product.ItemCode.includes(labelCode)
            );
        }

        if (barCode !== "") {
            filtered = filtered.filter(
                (product) => product.RFIDCode && product.RFIDCode.includes(barCode)
            );
        }

        if (productName) {
            const productTypeId = parseInt(productName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.ProductId === productTypeId
            );
        }

        if (collectionName) {
            const collectionId = parseInt(collectionName.split(",")[0]);
            filtered = filtered.filter(
                (x) => x.DesignId === collectionId
            );
        }

        // if (fromDate !== "" && toDate !== "") {
        //     filtered = filtered.filter((product) => {
        //         const createdDate = new Date(product.CreatedOn);
        //         return (
        //             createdDate >= new Date(fromDate) && createdDate <= new Date(toDate)
        //         );
        //     });
        // }

        setFilteredInventoryReport(filtered);
        setCurrentPage(1);
    };

    useEffect(() => {
        filterStock();
    }, [
        categoryName,
        productName,
        collectionName,
        purityName,
        allStockReport,
        fromDate,
        toDate
    ]);

    useEffect(() => {
        filterSKU();
    }, [
        categoryName,
        productName,
        collectionName,
        purityName,
        allSkuReport,
        vendorName,
        skuName
    ]);

    useEffect(() => {
        filterSKU_karigar();
    }, [
        categoryName,
        productName,
        collectionName,
        purityName,
        allSkuKarigarReport,
        vendorName,
        skuName
    ]);

    useEffect(() => {
        filterInventory();
    }, [
        categoryName,
        productName,
        collectionName,
        purityName,
        allInventory,
        barCode,
        labelCode,
        fromDate,
        toDate
    ]);
    async function filterPackets() {

        const today = new Date();
const formattedDate = today.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'

        const payload = {
            CategoryId: Number(formData.Category),
            ProductId: Number(formData.ProductType),
            Design: formData.Design,
            PurityId: formData.Purity,
            ClientCode: clientCode,
            FromDate: formattedDate,
            ToDate: formattedDate,
        };
        await fetch(selectedTab === 6 ? a241 : a242, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((response) => {
                if (selectedTab === 6) {
                    setAllPackets(response);
                }
                else{
                    setAllBoxes(response);
                }
            });
    }
    useEffect(() => {
        filterPackets();
    }, [formData]);

    const filteredCollection = allCollectionTypes?.filter(
        (product) => product?.ProductId == productTypeIdSelected
    );

    const filteredProductTypes = allProductTypes?.filter(
        (product) => product?.CategoryId == categoryId
    );

    const filteredPurities = allPurityTypes?.filter(
        (product) => product?.CategoryId == categoryId
    );

    const fetchDefaultCategoryReport = async () => {
        const formData = {
            ClientCode: clientCode,
            FromDate: fromDate,
            ToDate: toDate,
            StockType: stockType,
        };
        const response = await fetch(a218, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setAllStockReport(data)
    };

    const fetchStockReportByProduct = async () => {
        const formData = {
            ClientCode: clientCode,
            FromDate: fromDate,
            ToDate: toDate,
            CategoryId: categoryId || 1,
            StockType: stockType,
            PurityId: purityTypeIdSelected ? parseInt(purityTypeIdSelected) : 0,
        };
        const response = await fetch(a219, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setAllStockReport(data)
    };

    const fetchStockReportByDesign = async () => {
        const formData = {
            ClientCode: clientCode,
            FromDate: fromDate,
            ToDate: toDate,
            StockType: stockType,
            ProductId: productTypeIdSelected ? parseInt(productTypeIdSelected) : 0,
            PurityId: purityTypeIdSelected ? parseInt(purityTypeIdSelected) : 0,
        };
        const response = await fetch(a220, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setAllStockReport(data)
    };

    const fetchAllSkuReport = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a222, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setAllSkuReport(data)
    };

    const fetchAllSkuKarigarReport = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a221, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setAllSkuKarigarReport(data);
    };

    const fetchAllInventory = async () => {
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
            setAllInventory(data)
        } catch (error) {
            console.error("Error fetching products:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true)
        if (selectedTab == 0) {
            fetchDefaultCategoryReport()
        }
        if (selectedTab == 1) {
            fetchStockReportByProduct();
        }
        if (selectedTab == 2) {
            fetchStockReportByDesign();
        }
        if (selectedTab == 3) {
            fetchAllSkuReport();
        }
        if (selectedTab == 4) {
            fetchAllSkuKarigarReport()
        }
        if (selectedTab == 5) {
            fetchAllInventory()
        }
        if (selectedTab == 6 || selectedTab == 7) {
            filterPackets();
        }
        setLoading(false)
    }, [selectedTab]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const printStockList = () => {
        const selectedProductData = allProducts.filter((x) =>
            selectedProducts.includes(x.id)
        );
        printStockListAll(filteredStockReport);
    };
    const printPacketList = () => {
        const selectedProductData = allProducts.filter((x) =>
            selectedProducts.includes(x.id)
        );
        printPacketListAll(selectedTab === 4 ? allPackets : allBoxes);
    };

    const printSKUList = () => {
        const selectedProductData = allProducts.filter((x) =>
            selectedProducts.includes(x.id)
        );
        printSKUListAll(filteredSKUReport);
    };

    const printSKU_karigarList = () => {
        const selectedProductData = allProducts.filter((x) =>
            selectedProducts.includes(x.id)
        );
        printSKU_karigarListAll(filteredSkuKarigarReport);
    };

    const printInventoryList = () => {
        const selectedProductData = allProducts.filter((x) =>
            selectedProducts.includes(x.id)
        );
        printInventoryListAll(filteredInventoryReport);
    };

    const printStockListAll = async (data) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const startX = 8;
        let startY = 20;
        const lineHeight = 5;
        const margin = 5;
        const serialNumberWidth = 20;
        const columnWidth =
            (pageWidth - startX - serialNumberWidth - 10 * margin) / 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        let label = '';
        if (selectedTab === 0) {
            label = 'Category';
        } else if (selectedTab === 1) {
            label = 'Product';
        } else if (selectedTab === 2) {
            label = 'Design';
        }

        doc.text(label, startX - 0.5 + columnWidth, startY);


        const generateHeader = () => {
            doc.text("Sr No", startX, startY); // Serial Number
            doc.text(label, startX - 0.5 + columnWidth, startY);
            doc.text("Op qty", startX + 2.1 * columnWidth, startY);
            doc.text("op gr wt", startX + 3 * columnWidth, startY);
            doc.text("ope net wt", startX + 4.2 * columnWidth, startY);
            doc.text("stock in qty", startX + 5.5 * columnWidth, startY);
            doc.text("stock in gr wt", startX + 6.9 * columnWidth, startY);
            doc.text("sale qty", startX + 8.5 * columnWidth, startY);
            doc.text("sale gr wt", startX + 9.6 * columnWidth, startY);
            doc.text("clo qty", startX + 10.8 * columnWidth, startY);
            doc.text("clo gross wt", startX + 11.7 * columnWidth, startY);
            doc.text("clo net wt", startX + 13 * columnWidth, startY);
        };
        const totalNetWt = data.reduce(
            (total, item) => total + (parseFloat(item.NetWt) || 0),
            0
        );
        const totalGrossWt = data.reduce(
            (total, item) => total + (parseFloat(item.GrossWt) || 0),
            0
        );
        generateHeader();

        let y = startY + lineHeight + margin;
        data.forEach((item, index) => {
            if (index > 0 && y + lineHeight > pageHeight - margin) {
                doc.addPage();
                startY = 20;
                generateHeader();
                y = startY + lineHeight + margin;
            }
            const serialNumber = index + 1;
            doc.text(serialNumber.toString(), startX, y);
            doc.text(
                (selectedTab === 0 && item.Category) ||
                (selectedTab === 1 && item.Product) ||
                (selectedTab === 2 && item.Design)
                    ? ((selectedTab === 0 && item.Category) ||
                    (selectedTab === 1 && item.Product) ||
                    (selectedTab === 2 && item.Design)).substr(0, 8)
                    : "N/A",
                startX - 0.5 + columnWidth,
                y
            );
            doc.text(
                item['OpeningQuantity'] || item['OpeningQuantity'] === 0 ? item['OpeningQuantity'].toString() : "N/A",
                startX + 2.1 * columnWidth,
                y
            );
            doc.text(
                item['OpeningGrossWeight'] || item['OpeningGrossWeight'] === 0 ? item['OpeningGrossWeight'].toString() : "N/A",
                startX + 3 * columnWidth,
                y
            );
            doc.text(
                item['OpeningNetWeight'] || item['OpeningNetWeight'] === 0 ? item['OpeningNetWeight'].toString() : "N/A",
                startX + 4.2 * columnWidth,
                y
            );
            doc.text(
                item['StockEntryQuantity'] || item['StockEntryQuantity'] === 0 ? item['StockEntryQuantity'].toString() : "N/A",
                startX + 5.5 * columnWidth,
                y
            );
            doc.text(
                item['StockEntryGrWt'] || item['StockEntryGrWt'] === 0 ? item['StockEntryGrWt'].toString() : "N/A",
                startX + 6.9 * columnWidth,
                y
            );
            doc.text(
                item['SaleQty'] || item['SaleQty'] === 0 ? item['SaleQty'].toString() : "N/A",
                startX + 8.5 * columnWidth,
                y
            );
            doc.text(
                item['SaleGrossWt'] || item['SaleGrossWt'] === 0 ? item['SaleGrossWt'].toString() : "N/A",
                startX + 9.6 * columnWidth,
                y
            );
            doc.text(
                item['ClosingQty'] || item['ClosingQty'] === 0 ? item['ClosingQty'].toString() : "N/A",
                startX + 10.8 * columnWidth,
                y
            );
            doc.text(
                item['ClosingGrossWeight'] || item['ClosingGrossWeight'] === 0 ? item['ClosingGrossWeight'].toString() : "N/A",
                startX + 11.7 * columnWidth,
                y
            );
            doc.text(
                item['ClosingNetWeight'] || item['ClosingNetWeight'] === 0 ? item['ClosingNetWeight'].toString() : "N/A",
                startX + 13 * columnWidth,
                y
            );
            y += lineHeight + margin;
        });
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.text(`Page ${i} of ${totalPages}`, pageWidth - 50, pageHeight - 10);
        }

        const pdfData = doc.output();
        const pdfBlob = new Blob([pdfData], {type: "application/pdf"});
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
    }
    const printPacketListAll = async (data) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const startX = 8;
        let startY = 20;
        const lineHeight = 5;
        const margin = 5;
        const serialNumberWidth = 20;
        const columnWidth =
            (pageWidth - startX - serialNumberWidth - 10 * margin) / 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);

        const generateHeader = () => {
            doc.text("Sr No", startX, startY); // Serial Number
            doc.text("Category", startX - 0.5 + columnWidth, startY);
            doc.text(selectedTab === 4 ? "Packet" : "Box", startX + 2.1 * columnWidth, startY);
            doc.text("Op qty", startX + 3.2 * columnWidth, startY);
            doc.text("op gr wt", startX + 4.2 * columnWidth, startY);
            doc.text("ope net wt", startX + 5.5 * columnWidth, startY);
            doc.text("stock in qty", startX + 6.9 * columnWidth, startY);
            doc.text("stock in gr wt", startX + 8.5 * columnWidth, startY);
            doc.text("sale qty", startX + 9.9 * columnWidth, startY);
            doc.text("sale gr wt", startX + 10.8 * columnWidth, startY);
            doc.text("clo qty", startX + 12 * columnWidth, startY);
            doc.text("clo gross wt", startX + 12.9 * columnWidth, startY);
            doc.text("clo net wt", startX + 14.2 * columnWidth, startY);
        };
        const totalNetWt = data.reduce(
            (total, item) => total + (parseFloat(item.NetWt) || 0),
            0
        );
        const totalGrossWt = data.reduce(
            (total, item) => total + (parseFloat(item.GrossWt) || 0),
            0
        );
        generateHeader();

        let y = startY + lineHeight + margin;
        data.forEach((item, index) => {
            if (index > 0 && y + lineHeight > pageHeight - margin) {
                doc.addPage();
                startY = 20;
                generateHeader();
                y = startY + lineHeight + margin;
            }
            const serialNumber = index + 1;
            doc.text(serialNumber.toString(), startX, y);
            doc.text(
                item.Category ? item.Category.substr(0, 8) : "N/A",
                startX - 0.5 + columnWidth,
                y
            );
            doc.text(
                (selectedTab === 4) ? item.PacketName ? item.PacketName : "N/A" : item.BoxName ? item.BoxName : "N/A",
                startX + 2.1 * columnWidth,
                y
            );
            doc.text(
                item['OpeningQuantity'] || item['OpeningQuantity'] === 0 ? item['OpeningQuantity'].toString() : "N/A",
                startX + 3.2 * columnWidth,
                y
            );
            doc.text(
                item['OpeningGrossWeight'] || item['OpeningGrossWeight'] === 0 ? item['OpeningGrossWeight'].toString() : "N/A",
                startX + 4.2 * columnWidth,
                y
            );
            doc.text(
                item['OpeningNetWeight'] || item['OpeningNetWeight'] === 0 ? item['OpeningNetWeight'].toString() : "N/A",
                startX + 5.5 * columnWidth,
                y
            );
            doc.text(
                item['StockEntryQuantity'] || item['StockEntryQuantity'] === 0 ? item['StockEntryQuantity'].toString() : "N/A",
                startX + 6.9 * columnWidth,
                y
            );
            doc.text(
                item['StockEntryGrWt'] || item['StockEntryGrWt'] === 0 ? item['StockEntryGrWt'].toString() : "N/A",
                startX + 8.5 * columnWidth,
                y
            );
            doc.text(
                item['SaleQty'] || item['SaleQty'] === 0 ? item['SaleQty'].toString() : "N/A",
                startX + 9.6 * columnWidth,
                y
            );
            doc.text(
                item['SaleGrossWt'] || item['SaleGrossWt'] === 0 ? item['SaleGrossWt'].toString() : "N/A",
                startX + 10.8 * columnWidth,
                y
            );
            doc.text(
                item['ClosingQty'] || item['ClosingQty'] === 0 ? item['ClosingQty'].toString() : "N/A",
                startX + 12 * columnWidth,
                y
            );
            doc.text(
                item['ClosingGrossWeight'] || item['ClosingGrossWeight'] === 0 ? item['ClosingGrossWeight'].toString() : "N/A",
                startX + 13 * columnWidth,
                y
            );
            doc.text(
                item['ClosingNetWeight'] || item['ClosingNetWeight'] === 0 ? item['ClosingNetWeight'].toString() : "N/A",
                startX + 14.3 * columnWidth,
                y
            );

            y += lineHeight + margin;
        });
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.text(`Page ${i} of ${totalPages}`, pageWidth - 50, pageHeight - 10);
        }

        const pdfData = doc.output();
        const pdfBlob = new Blob([pdfData], {type: "application/pdf"});
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
    }
    const printSKUListAll = async (data) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const startX = 10;
        let startY = 20;
        const lineHeight = 5;
        const margin = 5;
        const serialNumberWidth = 20;
        const columnWidth =
            (pageWidth - startX - serialNumberWidth - 10 * margin) / 10;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);

        const generateHeader = () => {
            doc.text("S. No.", startX, startY);
            doc.text("SKU", startX + columnWidth, startY);
            doc.text("Item Code", startX + 2 * columnWidth, startY);
            doc.text("QTY", startX + 3.4 * columnWidth, startY);
            doc.text("Total Wt", startX + 4.3 * columnWidth, startY);
            doc.text("Packing Wt", startX + 5.5 * columnWidth, startY);
            doc.text("Gross Wt", startX + 6.8 * columnWidth, startY);
            doc.text("Stone Pcs", startX + 8 * columnWidth, startY);
            doc.text("Stone Wt", startX + 9.3 * columnWidth, startY);
            doc.text("Net Wt", startX + 10.5 * columnWidth, startY);
            doc.text("Fine Wt", startX + 11.5 * columnWidth, startY);
        };
        const totalNetWt = data.reduce(
            (total, item) => total + (parseFloat(item.NetWt) || 0),
            0
        );
        const totalGrossWt = data.reduce(
            (total, item) => total + (parseFloat(item.GrossWt) || 0),
            0
        );
        generateHeader();

        let y = startY + lineHeight + margin;
        data.forEach((item, index) => {
            if (index > 0 && y + lineHeight > pageHeight - margin) {
                doc.addPage();
                startY = 20;
                generateHeader();
                y = startY + lineHeight + margin;
            }
            const serialNumber = index + 1;
            doc.text(serialNumber.toString(), startX, y);

            doc.text(
                item.SKU ? item.SKU.toString().substr(0, 8) : "N/A",
                startX + columnWidth,
                y
            );
            doc.text(
                item.ItemName ? item.ItemName.toString() : "N/A",
                startX + 2 * columnWidth,
                y
            );
            doc.text(
                item.Pc ? item.Pc.toString() : "N/A",
                startX + 3.4 * columnWidth,
                y
            );
            doc.text(
                item.TotalWeight ? item.TotalWeight.toString() : "N/A",
                startX + 4.3 * columnWidth,
                y
            );
            doc.text(
                item.PackingWeight ? item.PackingWeight.toString() : "N/A",
                startX + 5.5 * columnWidth,
                y
            );
            doc.text(
                item.GrossWeight ? item.GrossWeight.toString() : "N/A",
                startX + 6.8 * columnWidth,
                y
            );
            doc.text(
                item.StonePcs ? item.StonePcs.toString() : "N/A",
                startX + 8 * columnWidth,
                y
            );
            doc.text(
                item.StoneWeight ? item.StoneWeight.toString() : "N/A",
                startX + 9.3 * columnWidth,
                y
            );
            doc.text(
                item.NetWeight ? item.NetWeight.toString() : "N/A",
                startX + 10.5 * columnWidth,
                y
            );
            doc.text(
                item.FineWeight ? item.FineWeight.toString() : "N/A",
                startX + 11.5 * columnWidth,
                y
            );
            y += lineHeight + margin;
        });

        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.text(`Page ${i} of ${totalPages}`, pageWidth - 50, pageHeight - 10);
        }
        const pdfData = doc.output();
        const pdfBlob = new Blob([pdfData], {type: "application/pdf"});
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
    };
    const printSKU_karigarListAll = async (data) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const startX = 10;
        let startY = 20;
        const lineHeight = 5;
        const margin = 5;
        const serialNumberWidth = 20;
        const columnWidth =
            (pageWidth - startX - serialNumberWidth - 10 * margin) / 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);

        const generateHeader = () => {
            doc.text("SKU", startX, startY); // Serial Number
            doc.text("Weight Categories", startX + columnWidth, startY);
            doc.text("Design Name", startX + 9 * columnWidth, startY);
            doc.text("Total Stone Wt", startX + 11 * columnWidth, startY);
            doc.text("Total Gross Wt", startX + 13 * columnWidth, startY);
        };
        const totalNetWt = data.reduce(
            (total, item) => total + (parseFloat(item.NetWt) || 0),
            0
        );
        const totalGrossWt = data.reduce(
            (total, item) => total + (parseFloat(item.GrossWt) || 0),
            0
        );
        generateHeader();

        let y = startY + lineHeight + margin;
        data.forEach((item, index) => {
            if (index > 0 && y + lineHeight > pageHeight - margin) {
                doc.addPage();
                startY = 20;
                generateHeader();
                y = startY + lineHeight + margin;
            }

            let combinedContent;
            if (item.StoneCategories && item.StonePieces) {
                const categories = item.StoneCategories.split(",");
                const pieces = item.StonePieces.split(",");
                const maxLength = Math.min(categories.length, pieces.length);
                const pairs = [];
                for (let i = 0; i < maxLength; i++) {
                    pairs.push(`${categories[i]} GM = ${pieces[i]}`);
                }
                combinedContent = pairs.join(", ");
            } else if (item.StoneCategories) {
                combinedContent = item.StoneCategories
                    .split(",")
                    .map((category) => `${category} GM`)
                    .join(", ");
            } else if (item.StonePieces) {
                combinedContent = item.StonePieces
                    .split(",")
                    .map((piece) => piece)
                    .join(", ");
            } else {
                combinedContent = "N/A";
            }

            const serialNumber = index + 1;
            doc.text(
                item.SKU ? item.SKU.toString().substr(0, 8) : "N/A",
                startX,
                y
            );
            doc.text(combinedContent, startX + columnWidth, y);
            doc.text(
                item.DesignName ? item.DesignName.toString() : "N/A",
                startX + 9 * columnWidth,
                y
            );
            doc.text(
                item.TotalStoneWeight ? item.TotalStoneWeight.toString() : "N/A",
                startX + 11 * columnWidth,
                y
            );
            doc.text(
                item.TotalPlaneWeight
                    ? item.TotalPlaneWeight
                        .toString() : "N/A",
                startX + 13 * columnWidth,
                y
            );
            y += lineHeight + margin;
        });

        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.text(`Page ${i} of ${totalPages}`, pageWidth - 50, pageHeight - 10);
        }
        const pdfData = doc.output();
        const pdfBlob = new Blob([pdfData], {type: "application/pdf"});
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
    };
    const printInventoryListAll = async (data) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const startX = 10;
        let startY = 20;
        const lineHeight = 5;
        const margin = 5;
        const serialNumberWidth = 20;
        const columnWidth =
            (pageWidth - startX - serialNumberWidth - 10 * margin) / 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);

        const generateHeader = () => {
            doc.text("Sr No.", startX, startY);
            doc.text("Category", startX + columnWidth, startY);
            doc.text("product", startX + 2.4 * columnWidth, startY);
            doc.text("design", startX + 3.6 * columnWidth, startY);
            doc.text("SKU", startX + 4.6 * columnWidth, startY);
            doc.text("Item Code", startX + 5.6 * columnWidth, startY);
            doc.text("RFID Code", startX + 7.2 * columnWidth, startY);
            doc.text("Gross wt", startX + 8.8 * columnWidth, startY);
            doc.text("stone wt", startX + 10.1 * columnWidth, startY);
            doc.text("clip wt", startX + 11.2 * columnWidth, startY);
            doc.text("net wt", startX + 12.1 * columnWidth, startY);
            doc.text("MRP", startX + 13 * columnWidth, startY);
        };
        const totalNetWt = data.reduce(
            (total, item) => total + (parseFloat(item.netWt) || 0),
            0
        );
        const totalGrossWt = data.reduce(
            (total, item) => total + (parseFloat(item.grosswt) || 0),
            0
        );
        generateHeader();

        let y = startY + lineHeight + margin;
        data.forEach((item, index) => {
            if (index > 0 && y + lineHeight > pageHeight - margin) {
                doc.addPage();
                startY = 20;
                generateHeader();
                y = startY + lineHeight + margin;
            }

            const serialNumber = index + 1;
            doc.text(serialNumber.toString(), startX, y);
            doc.text(
                item.CategoryName ? item.CategoryName.toString().substr(0, 8) : "N/A",
                startX + columnWidth,
                y
            );
            doc.text(
                item.ProductName ? item.ProductName.toString() : "N/A",
                startX + 2.4 * columnWidth,
                y
            );
            doc.text(
                item.DesignName ? item.DesignName.toString() : "N/A",
                startX + 3.6 * columnWidth,
                y
            );
            doc.text(
                item.SKU ? item.SKU.toString() : "N/A",
                startX + 4.6 * columnWidth,
                y
            );
            doc.text(
                item.ItemCode ? item.ItemCode.toString() : "N/A",
                startX + 5.6 * columnWidth,
                y
            );
            doc.text(
                item.RFIDCode ? item.RFIDCode.toString() : "N/A",
                startX + 7.2 * columnWidth,
                y
            );
            doc.text(
                item.GrossWt ? item.GrossWt.toString() : "N/A",
                startX + 8.8 * columnWidth,
                y
            );
            doc.text(
                item.TotalStoneWeight ? item.TotalStoneWeight.toString() : "N/A",
                startX + 10.1 * columnWidth,
                y
            );
            doc.text(
                item.ClipWeight ? item.ClipWeight.toString() : "N/A",
                startX + 11.2 * columnWidth,
                y
            );
            doc.text(
                item.NetWt ? item.NetWt.toString() : "N/A",
                startX + 12.1 * columnWidth,
                y
            );
            doc.text(
                item.MRP ? item.MRP.toString() : "N/A",
                startX + 13 * columnWidth,
                y
            );
            y += lineHeight + margin;
        });

        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.text(`Page ${i} of ${totalPages}`, pageWidth - 50, pageHeight - 10);
        }
        const pdfData = doc.output();
        const pdfBlob = new Blob([pdfData], {type: "application/pdf"});
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
    };

    return (
        <>
            <AdminHeading/>


            {loading ? (
        // Show spinner while loading
        <div className="spinner-container">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
          <p>Loading data...</p>
        </div>
      ) : (

            <div>

            <ErrorModal
            isOpen={showModal}
            onRequestClose={() => {
              setShowModal(false); // Close the modal
              navigate("/adminhome"); // Redirect to /adminhome
            }}
            onReload={null} // Pass reload function
            message={errorMessage}
          />



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
                    <Grid
                        container
                        justifyContent={{ xs: "center", sm: "space-between" }}
                        alignItems={"start"}
                        sx={{ flexDirection: { xs: "column", sm: "row" } }}
                    >
                        <Grid item xs={12} sm={8}>
                            <Box mb={1} sx={{ textAlign: { xs: "center", sm: "left" } }}>
                                <Tabs
                                    value={selectedTab}
                                    onChange={handleTabChange}
                                    aria-label="stock transfer tabs"
                                    TabIndicatorProps={{ style: { backgroundColor: '#02a8b5' } }}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    allowScrollButtonsMobile
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
                                        },
                                        '& .MuiTabs-indicator': {
                                            backgroundColor: '#02a8b5',
                                            color: '#02a8b5',
                                        },
                                    }}
                                >
                                    <Tab label="Category" />
                                    <Tab label="Product" />
                                    <Tab label="Design" />
                                    <Tab label="SKU Report" />
                                    <Tab label="SKU / Karigar Report" />
                                    <Tab label="Labelled Stock" />
                                    <Tab label="Packets" />
                                    <Tab label="Boxes" />
                                </Tabs>
                            </Box>
                        </Grid>
                    </Grid>
                    <div style={{margin: "20px 0px"}}>
                        {(selectedTab === 0 || selectedTab === 1 || selectedTab === 2) && (<div
                            >
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <select
                                        style={{margin: "5px 5px 5px 0px"}}
                                        className={"input-select"}
                                        value={stockType}
                                        onChange={(e) => {
                                            setStockType(e.target.value);
                                        }}
                                    >
                                        <option value="">Stock Type</option>
                                        <option value="Labelled Stock">Labelled</option>
                                        <option value="Unlabelled Stock">Unlabelled</option>
                                    </select>
                                    <select
                                        style={{margin: "5px 5px"}}
                                        className={"input-select"}
                                        value={categoryName}
                                        onChange={(e) => {
                                            setCategoryName(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">Select Category</option>
                                        {allCategories.map((x) => {
                                            return (
                                                <option value={`${x.Id},${x.CategoryName}`}>
                                                    {x.CategoryName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {selectedTab !== 0 && (<select
                                        style={{margin: "5px 5px"}}
                                        className={"input-select"}
                                        value={productName}
                                        onChange={(e) => {
                                            setProductName(e.target.value);
                                            setCurrentPage(1);
                                            setCollectionName("");
                                        }}
                                    >
                                        <option value="">Select Product Type</option>
                                        {filteredProductTypes.map((x) => {
                                            return (
                                                <option value={`${parseInt(x.Id)},${x.ProductName}`}>
                                                    {x.ProductName}
                                                </option>
                                            );
                                        })}
                                    </select>)}
                                    {selectedTab !== 0 && selectedTab !== 1 && (<select
                                        style={{margin: "5px 5px"}}
                                        className={"input-select"} value={collectionName}
                                        onChange={(e) => {
                                            setCollectionName(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">Select Design</option>
                                        {filteredCollection.map((x) => {
                                            return (
                                                <option value={`${parseInt(x.Id)},${x.DesignName}`}>
                                                    {x.DesignName}
                                                </option>
                                            );
                                        })}
                                    </select>)}
                                    <select
                                        style={{margin: "5px 5px"}}
                                        className={"input-select"}
                                        value={purityName}
                                        onChange={(e) => {
                                            setPurityName(e.target.value);
                                        }}
                                    >
                                        <option value="0">Select Purity</option>
                                        {filteredPurities.map((x) => {
                                            return (
                                                <option value={`${x.Id},${x.PurityName}`}>
                                                    {x.PurityName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="adminAllProductsFilterDatesBox">
                                    <input
                                        style={{cursor: "pointer", margin: "10px 10px 10px 0px"}}
                                        type="date"
                                        placeholder="From Date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                    />
                                    <input
                                        style={{margin: "10px 10px"}}
                                        type="date"
                                        placeholder="To Date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                    />
                                    <div className="adminAllLabelledListButtonBox" style={{margin: "10px 10px",justifyContent: "right"}}>
                                        <button
                                            style={{margin:"0px 10px"}}
                                            onClick={() => {
                                                setCategoryName(""),
                                                    setProductName(""),
                                                    setCollectionName(""),
                                                    setPurityName("");
                                            }}
                                        >
                                            Reset
                                        </button>
                                        <button onClick={() => printStockList()}>Print List</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {(selectedTab === 3 || selectedTab === 4 || selectedTab === 5) && (<div
                            >
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <select
                                        style={{margin: "5px 5px"}}
                                        className={"input-select"}
                                        value={categoryName}
                                        onChange={(e) => {
                                            setCategoryName(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">Select Category</option>
                                        {allCategories.map((x) => {
                                            return (
                                                <option value={`${x.Id},${x.CategoryName}`}>
                                                    {x.CategoryName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        style={{margin: "5px 5px"}}
                                        className={"input-select"}
                                        value={productName}
                                        onChange={(e) => {
                                            setProductName(e.target.value);
                                            setCurrentPage(1);
                                            setCollectionName("");
                                        }}
                                    >
                                        <option value="">Select Product Type</option>
                                        {filteredProductTypes.map((x) => {
                                            return (
                                                <option value={`${parseInt(x.Id)},${x.ProductName}`}>
                                                    {x.ProductName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        style={{margin: "5px 5px"}}
                                        className={"input-select"} value={collectionName}
                                        onChange={(e) => {
                                            setCollectionName(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">Select Design</option>
                                        {filteredCollection.map((x) => {
                                            return (
                                                <option value={`${parseInt(x.Id)},${x.DesignName}`}>
                                                    {x.DesignName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {selectedTab !== 5 && <select
                                        style={{margin: "5px 5px"}}
                                        className={"input-select"}
                                        value={purityName}
                                        onChange={(e) => {
                                            setPurityName(e.target.value);
                                        }}
                                    >
                                        <option value="0">Select Purity</option>
                                        {filteredPurities.map((x) => {
                                            return (
                                                <option value={`${x.Id},${x.PurityName}`}>
                                                    {x.PurityName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    }
                                    {(selectedTab === 3 || selectedTab === 4) && (<>
                                        <select
                                            style={{margin: "5px 5px"}}
                                            className={"input-select"}
                                            value={vendorName}
                                            onChange={(e) => {
                                                setVendorName(e.target.value);
                                            }}
                                        >
                                            <option value="">Select Vendor</option>
                                            {allVendors.map((x) => {
                                                return (
                                                    <option value={`${x.Id},${x.VendorName}`}>
                                                        {x.VendorName}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <select
                                            style={{margin: "5px 5px"}}
                                            className={"input-select"}
                                            value={skuName}
                                            onChange={(e) => {
                                                setSkuName(e.target.value);
                                            }}
                                        >
                                            <option value="">Select Sku</option>
                                            {allSku.map((x) => {
                                                return (
                                                    <option
                                                        value={`${parseInt(x.Id)},${x.StockKeepingUnit}`}
                                                    >
                                                        {x.StockKeepingUnit}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </>)}
                                    {selectedTab === 5 && (<>
                                        <input
                                            className={"input-select"}
                                            style={{width: "100%", margin: "5px 5px"}}
                                            type="text"
                                            placeholder="Label..."
                                            value={labelCode}
                                            onChange={(e) => {
                                                setLabelCode(e.target.value.toUpperCase());
                                                setCurrentPage(1);
                                            }}
                                        />
                                        <input
                                            className={"input-select"}
                                            style={{width: "100%", margin: "5px 5px"}}
                                            type="text"
                                            placeholder="RFID Code"
                                            value={barCode}
                                            onChange={(e) => {
                                                setBarCode(e.target.value.toUpperCase());
                                                setCurrentPage(1);
                                            }}
                                        />
                                        <input
                                            style={{cursor: "pointer", margin: "5px 5px"}}
                                            type="date"
                                            placeholder="From Date"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                        />
                                        <input
                                            style={{cursor: "pointer", margin: "5px 5px"}}
                                            type="date"
                                            placeholder="To Date"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                    </>)
                                    }
                                </div>
                                <div className="adminAllProductsFilterDatesBox">
                                    <div className="adminAllLabelledListButtonBox" style={{margin: "10px 10px",justifyContent: "right"}}>
                                        <button
                                            style={{margin:"0px 10px"}}
                                            onClick={() => {
                                                setCategoryName(""),
                                                    setProductName(""),
                                                    setCollectionName(""),
                                                    setPurityName(""), setSkuName(''), setVendorName(''), setBarCode(''), setLabelCode(''), setStockType("")
                                            }}
                                        >
                                            Reset
                                        </button>
                                        {selectedTab === 0 && (
                                            <button onClick={() => printStockList()}>Print
                                                List</button>)}
                                        {selectedTab === 3 && (
                                            <button onClick={() => printSKUList()}>Print
                                                List</button>)}
                                        {selectedTab === 4 && (
                                            <button onClick={() => printSKU_karigarList()}>Print
                                                List</button>)}
                                        {selectedTab === 5 && (
                                            <button onClick={() => printInventoryList()}>Print List</button>)}
                                        {selectedTab === 6 && (
                                            <button onClick={() => printInventoryList()}>Print List</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {(selectedTab === 6 || selectedTab === 7) && (
                            <div>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <select
                                        style={{margin: "5px 5px"}}
                                        className={"input-select"}
                                        value={formData.Category}
                                        onChange={(e) => {
                                            setCategoryName(e.target.value);
                                            setFormData({
                                                ...formData,
                                                Category: e.target.value,
                                                ProductType: 0,
                                                Purity: 0,
                                                Design: ""
                                            });
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">Select Category</option>
                                        {allCategories.map((x) => {
                                            return (
                                                <option value={Number(x.Id)}>
                                                    {x.CategoryName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        style={{margin: "5px 5px"}}
                                        className={"input-select"}
                                        value={formData.ProductType}
                                        onChange={(e) => {
                                            setFormData({...formData, ProductType: e.target.value, Design: ""});
                                            setProductName(e.target.value);
                                            setCurrentPage(1);
                                            setCollectionName("");
                                        }}
                                    >
                                        <option value="">Select Product Type</option>
                                        {filteredProductTypes.map((x) => {
                                            return (
                                                <option value={`${parseInt(x.Id)}`}>
                                                    {x.ProductName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        style={{margin: "5px 5px"}}
                                        className={"input-select"} value={formData.Design}
                                        onChange={(e) => {
                                            setFormData({...formData, Design: e.target.value});
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">Select Design</option>
                                        {filteredCollection.map((x) => {
                                            return (
                                                <option value={`${x.DesignName}`}>
                                                    {x.DesignName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        style={{margin: "5px 5px"}}
                                        className={"input-select"}
                                        value={formData.Purity}
                                        onChange={(e) => {
                                            setFormData({...formData, Purity: e.target.value});
                                        }}
                                    >
                                        <option value="0">Select Purity</option>
                                        {filteredPurities.map((x) => {
                                            return (
                                                <option value={`${Number(x.Id)}`}>
                                                    {x.PurityName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                {/*<div style={{display:"flex"}}>*/}
                                {/*    <div>*/}
                                {/*        <input*/}
                                {/*            // style={{cursor: "pointer", margin: "10px 10px 10px 0px"}}*/}
                                {/*            style={{width: "200px"}}*/}
                                {/*            type="date"*/}
                                {/*            className={"input-select"}*/}
                                {/*            placeholder="From Date"*/}
                                {/*            value={fromDate}*/}
                                {/*            onChange={(e) => setFromDate(e.target.value)}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*    <div>*/}
                                {/*        <input*/}
                                {/*            // style={{margin: "10px 10px"}}*/}
                                {/*            style={{width: "200px",marginLeft: "20px"}}*/}
                                {/*            type="date"*/}
                                {/*            className={"input-select"}*/}
                                {/*            placeholder="To Date"*/}
                                {/*            value={toDate}*/}
                                {/*            onChange={(e) => setToDate(e.target.value)}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="adminAllLabelledListButtonBox" style={{margin: "10px 10px"}}>*/}
                                {/*    <button*/}
                                {/*        onClick={() => {*/}
                                {/*            setCategoryName(""),*/}
                                {/*                setProductName(""),*/}
                                {/*                setCollectionName(""),*/}
                                {/*                setPurityName("");*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        Reset*/}
                                {/*    </button>*/}
                                {/*    <button onClick={() => printStockList()}>Print List</button>*/}
                                {/*</div>*/}
                                <div className="adminAllProductsFilterDatesBox">
                                    <input
                                        style={{cursor: "pointer", margin: "10px 10px 10px 0px"}}
                                        type="date"
                                        placeholder="From Date"
                                        value={formData.FromDate}
                                        onChange={(e) => setFormData({...formData, FromDate: e.target.value})}
                                    />
                                    <input
                                        style={{margin: "10px 10px"}}
                                        type="date"
                                        placeholder="To Date"
                                        value={formData.ToDate}
                                        onChange={(e) => setFormData({...formData, ToDate: e.target.value})}
                                    />
                                    <div className="adminAllLabelledListButtonBox"
                                         style={{margin: "10px 10px", justifyContent: "right"}}>
                                        <button
                                            style={{marginRight: "15px"}}
                                            onClick={() => {
                                                setCategoryName(""),
                                                    setProductName(""),
                                                    setCollectionName(""),
                                                    setPurityName(""),
                                                    setCollectionName(''),
                                                    setSkuName(''),
                                                    setVendorName(''),
                                                    setFormData({
                                                        Category: 1,
                                                        ProductType: 0,
                                                        Design: "",
                                                        Purity: 0,
                                                        FromDate: "2024-09-06",
                                                        ToDate: "2024-09-06",
                                                    })
                                            }}
                                        >
                                            Reset
                                        </button>
                                        <button onClick={() => printPacketList()}>Print List</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
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
                        </>) :
                        <TableContainer sx={{' th, td': {border: '1px solid #ccc'}}}>

                        {selectedTab === 5 && (

                            <Box sx={{ padding: 2 }}>
                            <b>Total Total Items:</b> {filteredInventoryReport.length} <br />
<b>Total Total Grosswt:</b> {filteredInventoryReport.reduce((acc, item) => acc + parseFloat(item.GrossWt), 0).toFixed(3)} <br />
<b>Total Total Stone Wt:</b> {filteredInventoryReport.reduce((acc, item) => acc + parseFloat(item.TotalStoneWeight), 0).toFixed(3)} <br />

<b>Total Total Net Wt:</b> {filteredInventoryReport.reduce((acc, item) => acc + parseFloat(item.NetWt), 0).toFixed(3)} <br />
<b>Total Total Clip Wt:</b> {filteredInventoryReport.reduce((acc, item) => acc + parseFloat(item.ClipWeight), 0).toFixed(3)} <br />
<b>Total Total Tag Wt:</b> {filteredInventoryReport.reduce((acc, item) => acc + parseFloat(item.TagWeight), 0).toFixed(3)} <br />

      </Box>
    )}
    

                            <Table size="small" sx={{borderRadius: '4px', borderCollapse: 'collapse'}}>
                                <TableHead>
                                    {(selectedTab === 0 || selectedTab === 1 || selectedTab === 2) &&
                                    (<TableRow>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Sr No</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">
                                            {selectedTab === 0 && 'Category'}
                                            {selectedTab === 1 && 'Product'}
                                            {selectedTab === 2 && 'Design'}
                                        </TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Opening qty</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">opening gross wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">opening net wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">stock in qty</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">stock in gross wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">sale qty</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">sale gross wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">closing qty</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">closing gross wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">closing net wt</TableCell>
                                    </TableRow>)}
                                    {selectedTab == 3 &&
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Sr No</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">SKU</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Item Name</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">QTY</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Total Wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Packing Wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Gross Wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center"> Stone Pcs</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Stone Wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Net Wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Fine Wt+W WT</TableCell>
                                    </TableRow>}
                                    {selectedTab == 4 &&
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Sr No</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">SKU</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Weight Categories</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Total Stone Wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Total Gross Wt</TableCell>
                                    </TableRow>}
                                    {selectedTab == 5 &&


                                        
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Sr No</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Category</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">product</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">design</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">SKU</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Item code</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">RFID Code</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Gross wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">stone wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">clip wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">net wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">MRP</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">packet name</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">box name</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Vendor name</TableCell>
                                        {/* <TableCell sx={{fontWeight: "600"}} align="center">branch name</TableCell> */}
                                    </TableRow>}
                                    {(selectedTab == 6 || selectedTab == 7) &&
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Sr No</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Category</TableCell>
                                        <TableCell sx={{fontWeight: "600"}}
                                                   align="center">{selectedTab === 6 ? "Packet" : "Box"}</TableCell>
                                                   <TableCell sx={{fontWeight: "600"}} align="center">Total Wt</TableCell>
                                                   <TableCell sx={{fontWeight: "600"}}
                                                   align="center">{selectedTab === 6 ? "Packet Wt" : "Box Wt"}</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Opening qty</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">opening gross wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">opening net wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">stock in qty</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">stock in gross wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">sale qty</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">sale gross wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">closing qty</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">closing gross wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">closing net wt</TableCell>
                                    </TableRow>}
                                </TableHead>
                                <TableBody>
                                    {
                                        (selectedTab === 0 || selectedTab === 1 || selectedTab === 2) && (filteredStockReport.map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">  {selectedTab === 0 && item.Category}
                                                    {selectedTab === 1 && item.Product}
                                                    {selectedTab === 2 && item.Design}</TableCell>
                                                <TableCell
                                                    align="center">{item.OpeningQuantity}</TableCell>
                                                <TableCell
                                                    align="center">{item.OpeningGrossWeight}</TableCell>
                                                <TableCell
                                                    align="center">{item.OpeningNetWeight}</TableCell>
                                                <TableCell align="center">{item.StockEntryQuantity}</TableCell>
                                                <TableCell align="center">{item.StockEntryGrWt}</TableCell>
                                                <TableCell align="center">{item.SaleQty}</TableCell>
                                                <TableCell
                                                    align="center">{item.SaleGrossWt}</TableCell>
                                                <TableCell
                                                    align="center">{item.ClosingQty}</TableCell>
                                                <TableCell
                                                    align="center">{item.ClosingGrossWeight}</TableCell>
                                                <TableCell
                                                    align="center">{item.ClosingNetWeight}</TableCell>
                                            </TableRow>
                                        )))
                                    } {
                                    selectedTab === 3 && (filteredSKUReport.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{item.SKU}</TableCell>
                                            <TableCell align="center">{item.ItemName}</TableCell>
                                            <TableCell align="center">{item.Quantity}</TableCell>
                                            <TableCell align="center">{item.TotalWeight}</TableCell>
                                            <TableCell align="center">{item.PackingWeight}</TableCell>
                                            <TableCell align="center">{item.GrossWeight}</TableCell>
                                            <TableCell align="center">{item.StonePcs}</TableCell>
                                            <TableCell align="center">{item.StoneWeight}</TableCell>
                                            <TableCell align="center">{item.NetWeight}</TableCell>
                                            <TableCell align="center">{item.FineWeight}</TableCell>
                                        </TableRow>
                                    )))
                                } {
                                    selectedTab === 4 && (filteredSkuKarigarReport.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{item.SKU}</TableCell>
                                            <TableCell
                                                align="center">{<td>
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        {item.StoneCategories.split(",").map(
                                                            (category, idx) => (
                                                                <td
                                                                    key={idx}
                                                                    style={{
                                                                        backgroundColor: "#666",
                                                                        color: "white",
                                                                        minWidth: "50px",
                                                                        border: "1px solid #ddd",
                                                                    }}
                                                                >
                                                                    {`${category} GM`}
                                                                </td>
                                                            )
                                                        )}
                                                    </tr>
                                                    <tr>
                                                        {item.StonePieces.split(",").map((piece, idx) => (
                                                            <td
                                                                key={idx}
                                                                style={{
                                                                    backgroundColor: "white",
                                                                    color: "black",
                                                                    minWidth: "80px",
                                                                    border: "1px solid #ddd",
                                                                }}
                                                            >
                                                                {piece}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>}</TableCell>
                                            <TableCell
                                                align="center">{item.TotalStoneWeight}</TableCell>
                                            <TableCell
                                                align="center">{item.TotalPlaneWeight}</TableCell>
                                        </TableRow>
                                    )))
                                } {
                                    selectedTab === 5 && (filteredInventoryReport.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{item.CategoryName}</TableCell>
                                            <TableCell align="center">{item.ProductName}</TableCell>
                                            <TableCell align="center">{item.DesignName}</TableCell>
                                            <TableCell align="center">{item.SKU}</TableCell>
                                            <TableCell align="center">{item.ItemCode}</TableCell>
                                            <TableCell align="center">{item.RFIDCode}</TableCell>
                                            <TableCell align="center">{item.GrossWt}</TableCell>
                                            <TableCell align="center">{item.TotalStoneWeight}</TableCell>
                                            <TableCell align="center">{item.ClipWeight}</TableCell>
                                            <TableCell align="center">{item.NetWt}</TableCell>
                                            <TableCell align="center">{item.MRP}</TableCell>
                                            <TableCell align="center">{item.PacketName}</TableCell>
                                            <TableCell align="center">{item.BoxName}</TableCell>
                                            <TableCell align="center">{item.VendorName}</TableCell>
                                            
                                            {/* <TableCell align="center">{item.BranchName}</TableCell> */}
                                        </TableRow>
                                    )))
                                }
                                    {
                                        (selectedTab === 6 || selectedTab === 7) && ((selectedTab === 6 ? allPackets : allBoxes)?.map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">{item.Category}</TableCell>
                                                <TableCell
                                                    align="center">{selectedTab === 6 ? item.PacketName : item.BoxName}</TableCell>

<TableCell
                                                    align="center">{selectedTab === 6 ? item.TotalGrossWeight : item.TotalGrossWeight}</TableCell>
                                                
                                                <TableCell
                                                    align="center">{selectedTab === 6 ? item.PacketWeight : item.BoxWeight}</TableCell>

                                                <TableCell
                                                    align="center">{item.OpeningQuantity}</TableCell>

                                                <TableCell
                                                    align="center">{item.OpeningGrossWeight}</TableCell>
                                                <TableCell
                                                    align="center">{item.OpeningNetWeight}</TableCell>
                                                <TableCell align="center">{item.StockEntryQuantity}</TableCell>
                                                <TableCell align="center">{item.StockEntryGrWt}</TableCell>
                                                <TableCell align="center">{item.SaleQty}</TableCell>
                                                <TableCell
                                                    align="center">{item.SaleGrossWt}</TableCell>
                                                <TableCell
                                                    align="center">{item.ClosingQty}</TableCell>
                                                <TableCell
                                                    align="center">{item.ClosingGrossWeight}</TableCell>
                                                <TableCell
                                                    align="center">{item.ClosingNetWeight}</TableCell>
                                            </TableRow>
                                        )))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </Box>
            </Box>
            </div>

        )}
        </>
    )
}

export default AllReport;
