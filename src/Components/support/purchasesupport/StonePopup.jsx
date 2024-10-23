// import React from 'react';

// const StonePopup = ({
//   purchaseProduct,
//   handleStoneChange,
//   deleteStone,
//   addStone,
//   setPurchaseProduct,
//   closePopup,
//   allStonesList,
// }) => {
//   return (
//     <div className="adminAddProductsPopupInnerBox">
//       {purchaseProduct?.Stones?.map((x, index) => (
//         <div className="adminPurchaseEntryAddStonesMainBox" key={index}>
//           <div style={{ gridColumn: 'span 6' }}>
//             <h4 style={{ margin: '5px' }}>Stone {index + 1}</h4>
//           </div>
//           <label>Stone Name</label>
//           <input
//             value={x.StoneName}
//             onChange={(e) => handleStoneChange(index, 'StoneName', e.target.value)}
//             type="text"
//             list="allStonesList"
//           />
//           <datalist id="allStonesList">
//             {allStonesList?.map((stone, i) => (
//               <option key={i}>
//                 {stone.StoneName}
//               </option>
//             ))}
//           </datalist>
//           <label>Stone Weight</label>
//           <input
//             value={x.StoneWeight}
//             onChange={(e) => handleStoneChange(index, 'StoneWeight', e.target.value)}
//             type="text"
//           />
//           <label>Stone Pieces</label>
//           <input
//             value={x.StonePieces}
//             onChange={(e) => handleStoneChange(index, 'StonePieces', e.target.value)}
//             type="text"
//           />
//           <label>Stone Rate</label>
//           <input
//             value={x.StoneRate}
//             onChange={(e) => handleStoneChange(index, 'StoneRate', e.target.value)}
//             type="text"
//           />
//           <label>Stone Amount</label>
//           <input
//             value={x.StoneAmount}
//             onChange={(e) => handleStoneChange(index, 'StoneAmount', e.target.value)}
//             type="text"
//           />
//           <label>Stone Description</label>
//           <input
//             value={x.Description}
//             onChange={(e) => handleStoneChange(index, 'Description', e.target.value)}
//             type="text"
//           />
//           <button className="bulkProductAddDeleteButton close-btn" onClick={() => deleteStone(index)}>
//             Delete Stone
//           </button>
//         </div>
//       ))}
//       <button
//         id="bulkStockAddProductImportButton"
//         onClick={() =>
//           setPurchaseProduct((previousState) => ({
//             ...previousState,
//             Stones: [...previousState.Stones, addStone],
//           }))
//         }
//         className="close-btn"
//       >
//         Add Stone
//       </button>
//       <button onClick={closePopup} className="bulkProductAddDeleteButton close-btn">
//         Close
//       </button>
//     </div>
//   );
// };

// export default StonePopup;




// import React from 'react';

// const StonePopup = ({
//   purchaseProduct,
//   handleStoneChange,
//   deleteStone,
//   addStone,
//   setPurchaseProduct,
//   closePopup,
//   allStonesList,
// }) => {
//   const handleTabOnLastField = (index) => {
//     // Automatically add a new stone entry when the user presses tab on the last field
//     if (index === purchaseProduct.Stones.length - 1) {
//       setPurchaseProduct((prevState) => ({
//         ...prevState,
//         Stones: [...prevState.Stones, addStone],
//       }));
//     }
//   };

//   return (
//     <div className="adminAddProductsPopupInnerBox" style={{ maxWidth: '90vw', overflowX: 'hidden' }}>
//       {purchaseProduct?.Stones?.map((x, index) => (
//         <div
//           className="adminPurchaseEntryAddStonesMainBox"
//           key={index}
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap', // Allow wrapping on smaller screens
//             gap: '5px',
//             padding: '10px 0',
//           }}
//         >
//           <input
//             value={x.StoneName}
//             onChange={(e) => handleStoneChange(index, 'StoneName', e.target.value)}
//             type="text"
//             placeholder="Stone Name"
//             list="allStonesList"
//             style={{ flex: '1 1 90px', minWidth: '90px' }} // Web width
//           />
//           <datalist id="allStonesList">
//             {allStonesList?.map((stone, i) => (
//               <option key={i}>{stone.StoneName}</option>
//             ))}
//           </datalist>

//           <input
//             value={x.StoneWeight}
//             onChange={(e) => handleStoneChange(index, 'StoneWeight', e.target.value)}
//             type="text"
//             placeholder="Weight"
//             style={{ flex: '1 1 70px', minWidth: '70px' }}
//           />

//           <input
//             value={x.StonePieces}
//             onChange={(e) => handleStoneChange(index, 'StonePieces', e.target.value)}
//             type="text"
//             placeholder="Pieces"
//             style={{ flex: '1 1 70px', minWidth: '70px' }}
//           />

//           <input
//             value={x.StoneRate}
//             onChange={(e) => handleStoneChange(index, 'StoneRate', e.target.value)}
//             type="text"
//             placeholder="Rate"
//             style={{ flex: '1 1 70px', minWidth: '70px' }}
//           />

//           <input
//             value={x.StoneAmount}
//             onChange={(e) => handleStoneChange(index, 'StoneAmount', e.target.value)}
//             type="text"
//             placeholder="Amount"
//             style={{ flex: '1 1 90px', minWidth: '90px' }}
//           />

//           <input
//             value={x.Description}
//             onChange={(e) => handleStoneChange(index, 'Description', e.target.value)}
//             type="text"
//             placeholder="Description"
//             onKeyDown={(e) => {
//               if (e.key === 'Tab') {
//                 handleTabOnLastField(index); // Automatically add a new row on Tab
//               }
//             }}
//             style={{ flex: '2 1 120px', minWidth: '120px' }}
//           />

//           <button
//             className="bulkProductAddDeleteButton close-btn"
//             onClick={() => deleteStone(index)}
//             style={{
//               flex: '0 1 50px', // Fixed button size
//               minWidth: '50px',
//               padding: '6px',
//               fontSize: '14px',
//             }}
//           >
//             Delete
//           </button>
//         </div>
//       ))}

//       <button onClick={closePopup} className="bulkProductAddDeleteButton close-btn" style={{ marginTop: '10px' }}>
//         Close
//       </button>

//       {/* Inline styles for media queries */}
//       <style jsx>{`
//         @media (max-width: 768px) {
//           .adminPurchaseEntryAddStonesMainBox {
//             flex-direction: column; /* Stack fields vertically on mobile */
//           }

//           .adminPurchaseEntryAddStonesMainBox input,
//           .adminPurchaseEntryAddStonesMainBox button {
//             flex: 1 1 auto; /* Full width for inputs and buttons on mobile */
//             min-width: 100%; /* Ensure fields stretch to full width */
//             height: 30px; /* Fixed height for inputs on mobile */
//             padding: 4px; /* Smaller padding on mobile */
//             font-size: 12px; /* Smaller font size on mobile */
//             margin-bottom: 5px; /* Add bottom margin for spacing */
//           }

//           .bulkProductAddDeleteButton {
//             margin-top: 5px; /* Reduced margin for buttons on mobile */
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default StonePopup;


// import React from 'react';
// import { FaPlus, FaTrash } from 'react-icons/fa'; // Using icons for add/delete
// import { Slider, TextField, Box, Grid, Tab, Table, TableCell, TableContainer, TableBody, TableHead, TableRow, Tabs } from "@mui/material";


// const StonePopup = ({
//   purchaseProduct,
//   handleStoneChange,
//   addStone,
//   deleteStone,
//   setPurchaseProduct,
//   closePopup,
// }) => {
//   const handleAddRow = () => {
//     setPurchaseProduct((prevState) => ({
//       ...prevState,
//       Stones: [...prevState.Stones, addStone],
//     }));
//   };

//   return (
//     <div className="adminAddProductsPopupInnerBox" style={{ maxWidth: '90vw', overflowX: 'hidden' }}>
//       {/* <TableContainer sx={{ ' th, td': { border: '1px solid #ccc' } }}> */}
//       <TableContainer sx={{ borderSpacing: '0', borderCollapse: 'collapse' }}>

//         <table
//           size="small" sx={{ borderRadius: '4px', borderCollapse: 'collapse' , borderSpacing: '0' }}
//         >
//           <thead>
//             <tr>
//               <th style={thStyle}>Name</th>
//               <th style={thStyle}>Weight</th>
//               <th style={thStyle}>Pieces</th>
//               <th style={thStyle}>Rate</th>
//               <th style={thStyle}>Amount</th>
//               <th style={thStyle}>Description</th>
//               <th style={{ ...thStyle, width: '40px' }}>
//                 <FaPlus onClick={handleAddRow} style={{ cursor: 'pointer', color: 'green' }} />
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {purchaseProduct?.Stones?.map((x, index) => (
//               <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
//                 <td style={tdStyle}>
//                   <input
//                     value={x.StoneName}
//                     onChange={(e) => handleStoneChange(index, 'StoneName', e.target.value)}
//                     type="text"
//                     placeholder="Name"
//                     style={inputStyle}
//                   />
//                 </td>
//                 <td style={tdStyle}>
//                   <input
//                     value={x.StoneWeight}
//                     onChange={(e) => handleStoneChange(index, 'StoneWeight', e.target.value)}
//                     type="text"
//                     placeholder="Weight"
//                     style={inputStyle}
//                   />
//                 </td>
//                 <td style={tdStyle}>
//                   <input
//                     value={x.StonePieces}
//                     onChange={(e) => handleStoneChange(index, 'StonePieces', e.target.value)}
//                     type="text"
//                     placeholder="Pieces"
//                     style={inputStyle}
//                   />
//                 </td>
//                 <td style={tdStyle}>
//                   <input
//                     value={x.StoneRate}
//                     onChange={(e) => handleStoneChange(index, 'StoneRate', e.target.value)}
//                     type="text"
//                     placeholder="Rate"
//                     style={inputStyle}
//                   />
//                 </td>
//                 <td style={tdStyle}>
//                   <input
//                     value={x.StoneAmount}
//                     onChange={(e) => handleStoneChange(index, 'StoneAmount', e.target.value)}
//                     type="text"
//                     placeholder="Amount"
//                     style={inputStyle}
//                   />
//                 </td>
//                 <td style={tdStyle}>
//                   <input
//                     value={x.Description}
//                     onChange={(e) => handleStoneChange(index, 'Description', e.target.value)}
//                     type="text"
//                     placeholder="Description"
//                     style={inputStyle}
//                   />
//                 </td>
//                 <td style={{ ...tdStyle, textAlign: 'center', width: '40px' }}>
//                   <FaTrash
//                     onClick={() => deleteStone(index)}
//                     style={{ cursor: 'pointer', color: 'red' }}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <button
//           onClick={closePopup}
//           className="bulkProductAddDeleteButton close-btn"
//           style={{ marginTop: '1px' }}
//         >
//           Close
//         </button>

//         {/* Inline styles for responsiveness */}
//         <style jsx>{`
//         @media (max-width: 768px) {
//           th, td {
//             font-size: 12px;
//             padding: 1px;
//           }

//           input {
//             padding: 5px;
//           }
//         }
//       `}</style>
//       </TableContainer>
//     </div>
//   );
// };

// const thStyle = {
//   padding: '5px',  // Reduced padding
//   border: '1px solid #ccc',
//   textAlign: 'center',
//   fontWeight: '600',
// };

// const tdStyle = {
//   padding: '5px',  // Reduced padding
//   border: '1px solid #ccc',
//   textAlign: 'center',
// };

// const inputStyle = {
//   width: '100%',
//   padding: '3px',  // Reduced padding inside input fields
//   margin: '0',     // Ensure no extra margin
//   boxSizing: 'border-box',
//   borderRadius: '4px',
//   border: '1px solid #ccc',
// };

// // Usage in your component remains the same


// export default StonePopup;


import React, { useRef } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa'; 
import { TableContainer } from "@mui/material";

const StonePopup = ({
  purchaseProduct,
  handleStoneChange,
  addStone,
  deleteStone,
  setPurchaseProduct,
  closePopup,
  allStonesList,
}) => {
  const stoneNameRefs = useRef([]); // Refs to focus on new row inputs

  const handleAddRow = () => {
    setPurchaseProduct((prevState) => ({
      ...prevState,
      Stones: [...prevState.Stones, addStone],
    }));
  };

  // Navigate to next input on Enter key
  const handleEnterKey = (e, currentIndex, fieldName) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // Define the order of focus
      const fieldOrder = ['StoneName', 'StoneWeight', 'StonePieces', 'StoneRate', 'StoneAmount', 'Description'];
      const nextFieldIndex = fieldOrder.indexOf(fieldName) + 1;

      if (nextFieldIndex < fieldOrder.length) {
        // Move to the next field in the same row
        const nextField = fieldOrder[nextFieldIndex];
        document.getElementById(`${nextField}-${currentIndex}`).focus();
      } else {
        // Add a new row and focus StoneName of the new row
        handleAddRow();
        setTimeout(() => {
          const nextRowIndex = purchaseProduct?.Stones.length;
          stoneNameRefs.current[nextRowIndex]?.focus();
        }, 0);
      }
    }
  };

  return (
    <div className="adminAddProductsPopupInnerBox" style={{ maxWidth: '90vw', overflowX: 'hidden' }}>
      <TableContainer sx={{ borderSpacing: '0', borderCollapse: 'collapse' }}>
        <table size="small" sx={{ borderRadius: '4px', borderCollapse: 'collapse', borderSpacing: '0' }}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Weight</th>
              <th style={thStyle}>Pieces</th>
              <th style={thStyle}>Rate</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Description</th>
              <th style={{ ...thStyle, width: '40px' }}>
                <FaPlus onClick={handleAddRow} style={{ cursor: 'pointer', color: 'green' }} />
              </th>
            </tr>
          </thead>
          <tbody>
            {purchaseProduct?.Stones?.map((x, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tdStyle}>
                  <input
                    value={x.StoneName}
                    onChange={(e) => handleStoneChange(index, 'StoneName', e.target.value)}
                    onKeyDown={(e) => handleEnterKey(e, index, 'StoneName')}
                    type="text"
                    placeholder="Name"
                    list="allStonesList"
                    style={inputStyle}
                    id={`StoneName-${index}`} // Set ID for focus
                    ref={(el) => (stoneNameRefs.current[index] = el)} // Use ref for focusing
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    value={x.StoneWeight}
                    onChange={(e) => handleStoneChange(index, 'StoneWeight', e.target.value)}
                    onKeyDown={(e) => handleEnterKey(e, index, 'StoneWeight')}
                    type="text"
                    placeholder="Weight"
                    style={inputStyle}
                    id={`StoneWeight-${index}`}
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    value={x.StonePieces}
                    onChange={(e) => handleStoneChange(index, 'StonePieces', e.target.value)}
                    onKeyDown={(e) => handleEnterKey(e, index, 'StonePieces')}
                    type="text"
                    placeholder="Pieces"
                    style={inputStyle}
                    id={`StonePieces-${index}`}
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    value={x.StoneRate}
                    onChange={(e) => handleStoneChange(index, 'StoneRate', e.target.value)}
                    onKeyDown={(e) => handleEnterKey(e, index, 'StoneRate')}
                    type="text"
                    placeholder="Rate"
                    style={inputStyle}
                    id={`StoneRate-${index}`}
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    value={x.StoneAmount}
                    onChange={(e) => handleStoneChange(index, 'StoneAmount', e.target.value)}
                    onKeyDown={(e) => handleEnterKey(e, index, 'StoneAmount')}
                    type="text"
                    placeholder="Amount"
                    style={inputStyle}
                    id={`StoneAmount-${index}`}
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    value={x.Description}
                    onChange={(e) => handleStoneChange(index, 'Description', e.target.value)}
                    onKeyDown={(e) => handleEnterKey(e, index, 'Description')}
                    type="text"
                    placeholder="Description"
                    style={inputStyle}
                    id={`Description-${index}`}
                  />
                </td>
                <td style={{ ...tdStyle, textAlign: 'center', width: '40px' }}>
                  <FaTrash
                    onClick={() => deleteStone(index)}
                    style={{ cursor: 'pointer', color: 'red' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Datalist for StoneName dropdown */}
        <datalist id="allStonesList">
          {allStonesList?.map((stone, i) => (
            <option key={i} value={stone.StoneName} />
          ))}
        </datalist>

        <button
          onClick={closePopup}
          className="bulkProductAddDeleteButton close-btn"
          style={{ marginTop: '1px' }}
        >
          Close
        </button>

        <style jsx>{`
        @media (max-width: 768px) {
          th, td {
            font-size: 12px;
            padding: 1px;
          }

          input {
            padding: 5px;
          }
        }
      `}</style>
      </TableContainer>
    </div>
  );
};

const thStyle = {
  padding: '5px',
  border: '1px solid #ccc',
  textAlign: 'center',
  fontWeight: '600',
};

const tdStyle = {
  padding: '5px',
  border: '1px solid #ccc',
  textAlign: 'center',
};

const inputStyle = {
  width: '100%',
  padding: '3px',
  margin: '0',
  boxSizing: 'border-box',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

export default StonePopup;

