import React from 'react';
import { Modal, Button} from 'react-bootstrap';
import "../../styles/products.css";

const Product = (props) => {
    const {data, toggleShowProduct, showProductDetails, currentproduct} = props;
    return ( 
        <div className="products-container">
            {data.map(product => (
                <div className="single-product-item" onClick={(e) => toggleShowProduct(e, product)}>
                    <div className="single-product-item-left">
                        <span>{product.name}</span>
                        <span>{product.parentCategory.name}</span>
                        <span>{product.subCategory}</span>
                    </div>
                    <div className="single-product-item-right">
                        <span>{product.brand.name}</span>
                    </div>
                </div>
            ))}
            {showProductDetails?(<Modal show={showProductDetails} onHide={toggleShowProduct}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="product-details-container" onClick={showProductDetails}>
                        <div className="product-basic">
                            <span className="b mb-5">{currentproduct.breadcrumb}</span>
                            <div><span className="b mb-2">Product Name </span><span>{currentproduct.name}</span></div>
                            <div><span className="b mb-2">Category </span><span>{currentproduct.parentCategory.name}</span></div>
                            <div><span className="b mb-2">Sub Category</span><span>{currentproduct.subCategory}</span></div>
                            <div><span className="b mb-2">Brand </span><span>{currentproduct.brand.name}</span></div>
                        </div>
                        {
                            currentproduct.specifications ? (<div className="product-specs">
                            <span className="b">Specifications</span>
                            <table border={0} cellPadding={10}>
                            { currentproduct.specifications.map(spec=>(
                                    <tr>
                                        <th>{spec.name}</th>
                                        <td>{spec.value}</td>
                                    </tr>
                            ))}
                            </table>
                        </div>):(null)
                        }
                    </div>
                </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={toggleShowProduct}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>):(null)}
             
        </div>
     );
}
 
export default Product;