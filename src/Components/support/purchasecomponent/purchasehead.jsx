import React, { useEffect, useRef, useState } from "react";
import DateTime

export default function Adminpurchasehead() {
  return (
    <div className="invoiceFormDateTimeBox">
      <DateTime
        dateRcvd={selectedDate ? selectedDate : null}
        // showInv={true}
        // gstType={gstType}
      />
      <div className="invoiceFormDateTimeSelectDateBox">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
    </div>
  );
}
