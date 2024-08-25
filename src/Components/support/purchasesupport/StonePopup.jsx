import React from 'react';

const StonePopup = ({
  purchaseProduct,
  handleStoneChange,
  deleteStone,
  addStone,
  setPurchaseProduct,
  updatestonewt,
  closePopup,
  allStonesList,
}) => {
  return (
    <div className="adminAddProductsPopupInnerBox">
      {purchaseProduct?.Stones?.map((x, index) => (
        <div className="adminPurchaseEntryAddStonesMainBox" key={index}>
          <div style={{ gridColumn: 'span 6' }}>
            <h4 style={{ margin: '5px' }}>Stone {index + 1}</h4>
          </div>
          <label>Stone Name</label>
          <input
            value={x.StoneMainName || x.StoneName}
            onChange={(e) => handleStoneChange(index, 'StoneName', e.target.value)}
            type="text"
            list="allStonesList"
          />
          <datalist id="allStonesList">
            {allStonesList?.map((stone, i) => (
              <option key={i}>
                {stone.StoneMainName || stone.StoneName}
              </option>
            ))}
          </datalist>
          <label>Stone Weight</label>
          <input
            value={x.StoneWeight}
            onChange={(e) => handleStoneChange(index, 'StoneWeight', e.target.value)}
            type="text"
          />
          <label>Stone Pieces</label>
          <input
            value={x.StonePieces}
            onChange={(e) => handleStoneChange(index, 'StonePieces', e.target.value)}
            type="text"
          />
          <label>Stone Rate</label>
          <input
            value={x.StoneRate}
            onChange={(e) => handleStoneChange(index, 'StoneRate', e.target.value)}
            type="text"
          />
          <label>Stone Amount</label>
          <input
            value={x.StoneAmount}
            onChange={(e) => handleStoneChange(index, 'StoneAmount', e.target.value)}
            type="text"
          />
          <label>Stone Description</label>
          <input
            value={x.Description}
            onChange={(e) => handleStoneChange(index, 'Description', e.target.value)}
            type="text"
          />
          <button className="bulkProductAddDeleteButton close-btn" onClick={() => deleteStone(index)}>
            Delete Stone
          </button>
        </div>
      ))}
      <button
        id="bulkStockAddProductImportButton"
        onClick={() =>
          setPurchaseProduct((previousState) => ({
            ...previousState,
            Stones: [...previousState.Stones, addStone],
          }))
        }
        className="close-btn"
      >
        Add Stone
      </button>
      <button onClick={closePopup} className="bulkProductAddDeleteButton close-btn">
        Close
      </button>
    </div>
  );
};

export default StonePopup;
