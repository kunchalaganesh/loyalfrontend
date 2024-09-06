import React, {useEffect, useState} from 'react';
import AdminHeading from "../Heading/AdminHeading";
import {Box, Grid, Tab, Table, TableCell, TableContainer, TableBody, TableHead, TableRow, Tabs} from "@mui/material";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import {
    a125,
    a128,
    a131,
    a134,
    a181,
    a218,
    a219, a220,
    a221,
    a222,
} from "../../../Api/RootApiPath";
import {useSelector} from "react-redux";
import {InfinitySpin} from "react-loader-spinner";
import jsPDF from "jspdf";

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
    let today = new Date();
    const [fromDate, setFromDate] = useState(today.toISOString().split("T")[0]);
    const [toDate, setToDate] = useState(today.toISOString().split("T")[0]);
    const [stockType, setStockType] = useState("");
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
            fetchAllCategory()
    }, [selectedTab == 0]);

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
        allStockReport
    ]);

    useEffect(() => {
        filterSKU();
    }, [
        categoryName,
        productName,
        collectionName,
        purityName,
        allSkuReport
    ]);

    useEffect(() => {
        filterSKU_karigar();
    }, [
        categoryName,
        productName,
        collectionName,
        purityName,
        allSkuKarigarReport
    ]);

    useEffect(() => {
        filterInventory();
    }, [
        categoryName,
        productName,
        collectionName,
        purityName,
        allInventory
    ]);

    const filteredCollection = allCollectionTypes?.filter(
        (product) => product?.ProductId == productTypeIdSelected
    );

    const filteredProductTypes = allProductTypes?.filter(
        (product) => product?.CategoryId == categoryId
    );

    const filteredPurities = allPurityTypes?.filter(
        (product) => product?.CategoryId == categoryId
    );

    const fetchDefaultStockReport = async () => {
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
            CategoryId: categoryId,
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
        if (selectedTab == 0) {
            fetchDefaultStockReport()
        }
        if (selectedTab == 1) {
            fetchAllSkuReport();
        }
        if (selectedTab == 2) {
            fetchAllSkuKarigarReport()
        }
        if (selectedTab == 3) {
            fetchAllInventory()
        }
    }, [selectedTab]);

    useEffect(() => {
        if (
            fromDate !== "" &&
            toDate !== "" &&
            categoryName == "" &&
            productName == ""
        ) {
            fetchDefaultStockReport();
        } else if (
            fromDate !== "" &&
            toDate !== "" &&
            categoryName !== "" &&
            productName == ""
        ) {
            fetchStockReportByProduct();
        } else if (
            fromDate !== "" &&
            toDate !== "" &&
            categoryName !== "" &&
            productName !== ""
        ) {
            fetchStockReportByDesign();
        }
    }, [fromDate, toDate, categoryName, productName, stockType, purityName]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const printStockList = () => {
        const selectedProductData = allProducts.filter((x) =>
            selectedProducts.includes(x.id)
        );
        printStockListAll(filteredStockReport);
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

        const generateHeader = () => {
            doc.text("Sr No", startX, startY); // Serial Number
            doc.text("Category", startX - 0.5 + columnWidth, startY);
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
                item.Category ? item.Category.substr(0, 8) : "N/A",
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
            doc.text("product", startX + 3 * columnWidth, startY);
            doc.text("design", startX + 4.2 * columnWidth, startY);
            doc.text("SKU", startX + 5.3 * columnWidth, startY);
            doc.text("Item Code", startX + 6.5 * columnWidth, startY);
            doc.text("RFID Code", startX + 6.5 * columnWidth, startY);
            doc.text("Gross wt", startX + 8 * columnWidth, startY);
            doc.text("stone wt", startX + 9.5 * columnWidth, startY);
            doc.text("clip wt", startX + 9.5 * columnWidth, startY);
            doc.text("net wt", startX + 9.5 * columnWidth, startY);
            doc.text("MRP", startX + 9.5 * columnWidth, startY);
            doc.text("packet name", startX + 9.5 * columnWidth, startY);
            doc.text("box name", startX + 9.5 * columnWidth, startY);
            doc.text("branch name", startX + 9.5 * columnWidth, startY);
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
                item.DesignName ? item.DesignName.toString().substr(0, 8) : "N/A",
                startX + columnWidth,
                y
            );
            doc.text(
                item.SKU ? item.SKU.toString() : "N/A",
                startX + 3 * columnWidth,
                y
            );
            doc.text(
                item.GrossWt ? item.GrossWt.toString() : "N/A",
                startX + 4.2 * columnWidth,
                y
            );
            doc.text(
                item.NetWt ? item.NetWt.toString() : "N/A",
                startX + 5.3 * columnWidth,
                y
            );
            doc.text(
                item.ItemCode ? item.ItemCode.toString() : "N/A",
                startX + 6.5 * columnWidth,
                y
            );
            doc.text(
                item.BranchName ? item.BranchName.toString() : "N/A",
                startX + 8 * columnWidth,
                y
            );
            doc.text(
                item.TIDNumber ? item.TIDNumber.toString() : "N/A",
                startX + 9.5 * columnWidth,
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
                                    <Tab label="Stock"/>
                                    <Tab label="SKU Report"/>
                                    <Tab label="SKU / Karigar Report"/>
                                    <Tab label="Inventory"/>
                                </Tabs>
                            </Box>
                        </Grid>
                    </Grid>
                    <div style={{margin: "20px 0px"}}>
                        {selectedTab === 0 && (<div
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
                                    <div className="adminAllLabelledListButtonBox" style={{margin: "10px 10px"}}>
                                        <button
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
                        {(selectedTab === 1 || selectedTab === 2 || selectedTab === 3) && (<div
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
                                    {selectedTab !== 3 && <select
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
                                    </select>}
                                </div>
                                <div className="adminAllProductsFilterDatesBox">
                                    <div className="adminAllLabelledListButtonBox" style={{margin: "10px 10px"}}>
                                        <button
                                            onClick={() => {
                                                setCategoryName(""),
                                                    setProductName(""),
                                                    setCollectionName(""),
                                                    setPurityName("");
                                            }}
                                        >
                                            Reset
                                        </button>
                                        {selectedTab === 0 && (
                                            <button onClick={() => printStockList()}>Print
                                                List</button>)}
                                        {selectedTab === 1 && (
                                            <button onClick={() => printSKUList()}>Print
                                                List</button>)}
                                        {selectedTab === 2 && (
                                            <button onClick={() => printSKU_karigarList()}>Print
                                                List</button>)}
                                        {selectedTab === 3 && (
                                            <button onClick={() => printInventoryList()}>Print List</button>)}
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
                            <Table size="small" sx={{borderRadius: '4px', borderCollapse: 'collapse'}}>
                                <TableHead>
                                    {selectedTab == 0 &&
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Sr No</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Category</TableCell>
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
                                    {selectedTab == 1 &&
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
                                        <TableCell sx={{fontWeight: "600"}} align="center">Fine Wt</TableCell>
                                    </TableRow>}
                                    {selectedTab == 2 &&
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Sr No</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">SKU</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Weight Categories</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Total Stone Wt</TableCell>
                                        <TableCell sx={{fontWeight: "600"}} align="center">Total Gross Wt</TableCell>
                                    </TableRow>}
                                    {selectedTab == 3 &&
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
                                        <TableCell sx={{fontWeight: "600"}} align="center">branch name</TableCell>
                                    </TableRow>}
                                </TableHead>
                                <TableBody>
                                    {
                                        selectedTab === 0 && (filteredStockReport.map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">{item.Category}</TableCell>
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
                                    selectedTab === 1 && (filteredSKUReport.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{item.SKU}</TableCell>
                                            <TableCell align="center">{item.ItemName}</TableCell>
                                            <TableCell align="center">-</TableCell>
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
                                    selectedTab === 2 && (filteredSkuKarigarReport.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{item.SKU}</TableCell>
                                            <TableCell
                                                align="center" >{<td>
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
                                                align="center">-</TableCell>
                                        </TableRow>
                                    )))
                                } {
                                    selectedTab === 3 && (filteredInventoryReport.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{item.CategoryId}</TableCell>
                                            <TableCell align="center">{item.ProductId}</TableCell>
                                            <TableCell align="center">{item.DesignId}</TableCell>
                                            <TableCell align="center">{item.SKUId}</TableCell>
                                            <TableCell align="center">{item.ItemCode}</TableCell>
                                            <TableCell align="center">{item.RFIDCode}</TableCell>
                                            <TableCell align="center">{item.GrossWt}</TableCell>
                                            <TableCell align="center">{item.TotalStoneWeight}</TableCell>
                                            <TableCell align="center">{item.ClipWeight}</TableCell>
                                            <TableCell align="center">{item.NetWt}</TableCell>
                                            <TableCell align="center">{item.MRP}</TableCell>
                                            <TableCell align="center">{item.PacketName}</TableCell>
                                            <TableCell align="center">{item.BoxName}</TableCell>
                                            <TableCell align="center">{item.BranchName}</TableCell>
                                        </TableRow>
                                    )))
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </Box>
            </Box>
        </>
    )
}

export default AllReport;
