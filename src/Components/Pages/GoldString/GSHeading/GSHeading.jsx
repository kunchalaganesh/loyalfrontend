import React, { useState } from "react";
import "../GSPagesStyles/GSHeading.css";
import gsLogo from "../../../Images/GSHome/loyalStringLogoWide.png";
import { useNavigate } from "react-router-dom";

export default function GSHeading() {
  const navigate = useNavigate();
  const [isMenuActive, setIsMenuActive] = useState(false);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    };
  return (
    <div className="gsHeadingMainOuterBox">
      <div onClick={() => navigate("/gshome")} className="gsHeadingLogoBox">
        <img src={gsLogo} alt="LoyalString" />
      </div>
      <div className="gsHeadingNavBoxMain">
        <nav>
        <ul id="nav-links" className={isMenuActive ? 'active' : ''}>
          <li onClick={() => navigate("/gshome")}>Home</li>
          <li>About</li>
          <li>Products</li>
          <li>Services</li>
          <li onClick={() => navigate("/adminpanellogin")}>Login</li>
        </ul>
          {/* <li>Services</li> */}
        </nav>
        {/* <!-- ADD BUTTON TAG ONLY --> */}
            <button class="menu-toggle" onClick={toggleMenu}>☰</button>
        </div>
    </div>
  );
}

// import React from "react";
// import "../GSPagesStyles/GSHeading.css";
// import gsLogo from "../../../Images/GSHome/loyalStringLogoWide.png";
// import { useNavigate } from "react-router-dom";

// export default function GSHeading() {
//   const navigate = useNavigate();
//   return (
//     <div className="gsHeadingMainOuterBox">
//       <div onClick={() => navigate("/gshome")} className="gsHeadingLogoBox">
//         <img src={gsLogo} alt="LoyalString" />
//       </div>
//       <div className="gsHeadingNavBoxMain">
//         <nav>
//           <li onClick={() => navigate("/gshome")}>Home</li>
//           <li>About</li>
//           <li>Products</li>
//           <li>Services</li>
//           <li onClick={() => navigate("/adminpanellogin")}>Login</li>
//           {/* <li>Services</li> */}
//         </nav>
//       </div>
//     </div>
//   );
// }
