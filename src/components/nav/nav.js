import React from 'react';
import "../../styles/nav.css";

const Nav = props => {
    
    const { brandName = "Nav"} = props;
    return ( 
        <div className="nav-container">
            <div>
                <p>{brandName}</p>
            </div>
            <div className="">
                <button className="btn btn-primary">Add Product</button>
            </div>
        </div>
     );
}
 
export default Nav;