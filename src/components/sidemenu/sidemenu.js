import React from 'react';
import { Modal, Button} from 'react-bootstrap';
import "../../styles/sidemenu.css";

const Sidemenu = props => {
    
    const { toggleAddProduct, toggleAddCategory, toggleAddBrand, addProductShow, addCategoryShow, addBrandShow, brands, categories, toggleSubmenu, showSettingSubmenu, showCategoriesSubmenu, showBrandsubmenu, onChange, onSubmit, product, addProductSpecs, handleSubItemClicked} = props;
    const sidemenuColumns = [
        {name: 'Categories', show: showCategoriesSubmenu, submenu: categories},
        {name: 'Brands', show: showBrandsubmenu, submenu: brands},
        {name: 'Settings', show: showSettingSubmenu, submenu:[
            {name: 'Add Product', onClick: toggleAddProduct }, 
            {name: 'Add Category', onClick: toggleAddCategory }, 
            {name: 'Add Brand', onClick: toggleAddBrand }]}
        ];
    
    return ( 
        <div className="sidemenu-container">
            {sidemenuColumns.map(item=>(
                item.hasOwnProperty('submenu')?(
                    <div className="single-side-item" name={item.name} onClick={toggleSubmenu} key={item.name}>
                        <p className="p-10">{item.name}</p>
                        {item.show?item.submenu.map(submenu=><div key={submenu.name} 
                        // onClick={submenu.onClick} 
                        onClick={(e)=>handleSubItemClicked(e, item, submenu, submenu.onClick)}
                        className="submenu-single-item p-10">{submenu.name}</div>):(null)}
                    </div>)
                :(<div className="single-side-item p-10" onClick={toggleSubmenu} key={item.name}>{item.name}</div>)
            ))}

            <Modal show={addProductShow} onHide={toggleAddProduct}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input placeholder="Product Name" onChange={(e)=>onChange(e, 'product')} name="productName" className="input-group form-control mb-2"></input>
                    <select className="form-control mb-2" onChange={(e)=>onChange(e, 'product')} name="brand">
                        <option disabled selected>Select Brand</option>
                        {brands.map(item=><option value={item._id} key={item._id}>{item.name}</option>)}
                    </select>
                    <select className="form-control mb-2" onChange={(e)=>onChange(e, 'product')} name="parentCategory">
                        <option disabled selected>Select Category</option>
                        {categories.map(item=><option value={item._id} key={item._id}>{item.name}</option>)}
                    </select>
                    <input placeholder="Product Sub Category" onChange={(e)=>onChange(e, 'product')} name="subCategory" className="input-group form-control mb-2"></input>
                    {product.specifications.map((spec, index )=> (
                        <div className="df" style={{display: 'flex'}} key={index}>
                            <input placeholder="Product Specs Name" className="input-group form-control m-2" name="productSpecsName" onChange={e=>onChange(e, 'product', index)} ></input>
                            <input placeholder="Product Specs value" className="input-group form-control m-2" name="productSpecsValue" onChange={e=>onChange(e, 'product', index)} ></input>
                            <button className="btn btn-primary m-2" onClick={(e) => addProductSpecs(e, 'product')} >+</button>
                        </div>
                    ))}
                </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={toggleAddProduct}>
                        Close
                    </Button>
                    <Button variant="primary"onClick={(e)=>onSubmit(e, 'product')} >
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={addBrandShow} onHide={toggleAddBrand}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input onChange={(e)=>onChange(e, 'brand')} name="brandName" placeholder="Enter Brand Name" className="input-group form-control"></input>
                </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={toggleAddBrand}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e)=>onSubmit(e, 'brand')}>
                        Add Brand
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={addCategoryShow} onHide={toggleAddCategory}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input placeholder="Enter Category Name" onChange={(e)=>onChange(e, 'category')} name="categoryName" className="input-group form-control"></input>
                </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={toggleAddCategory}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e)=>onSubmit(e, 'category')}>
                        Add Category
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

     );
}

export default Sidemenu;