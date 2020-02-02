import React from 'react';
import Nav from "./components/nav/nav";
import Sidemenu from "./components/sidemenu/sidemenu";
import './App.css';
import BrandAction from './actions/brandAction';
import CategoryAction from './actions/categoryAction';
import ProductAction from './actions/productAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Products from './components/products/products';

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      showAddProduct: false,
      showAddCategory: false,
      showAddBrand: false,
      showProductDetails: false,
      brands: ['Bosh', 'Nike', 'Jbl', 'Xiaomi'],
      categories: ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4'],
      showSettingSubmenu: false,
      showCategoriesSubmenu: false,
      showBrandsubmenu: false,
      brandName: "",
      categoryName: "",
      product: {
        breadcrumb: "",
        specifications: [{ name: "", value:""}]
      },
      currentSelectedProduct: {},
      queryStr: "?"
    }
  }

  componentDidMount() {
    this.props.getAllBrandsAction();
    this.props.getAllCategoriesAction();
    this.props.getAllProductAction();
  }

  toggleAddProduct = () => this.setState({showAddProduct: !this.state.showAddProduct});
  toggleAddCategory = () => this.setState({showAddCategory: !this.state.showAddCategory});
  toggleAddBrand = () => this.setState({showAddBrand: !this.state.showAddBrand});
  toggleShowProduct = (e, product) => this.setState({showProductDetails: !this.state.showProductDetails, currentSelectedProduct: product});

  toggleSubmenu = (e) => {
    e.stopPropagation();
    const value = e.currentTarget.getAttribute("name");
    if(value=='Settings') this.setState({showSettingSubmenu: !this.state.showSettingSubmenu});
    if(value=='Categories') this.setState({showCategoriesSubmenu: !this.state.showCategoriesSubmenu});
    if(value=='Brands') this.setState({showBrandsubmenu: !this.state.showBrandsubmenu});
  }

  handleOnChange = (e, type, index) =>{
    const currentInput = e.currentTarget;
    if(type == "brand") this.setState({brandName: currentInput.value})
    if(type == "category") this.setState({categoryName: currentInput.value})
    if(type == "product") {
      const currentField = e.target; 
      const product = this.state.product;
      if(currentField.name == "productName") product['name'] = currentField.value;
      if(currentField.name == "subCategory") product['subCategory'] = currentField.value;
      if(currentField.name == "brand") product['brand'] = currentField.value;
      if(currentField.name == "parentCategory") product['parentCategory'] = currentField.value;
      if( product['parentCategory'] && product['subCategory'] ){
        let category = this.props.categoryReducer.categories;
        category = category.filter(cat => cat._id === product['parentCategory']);
        product['breadcrumb'] = category[0].name + "/" + product['subCategory']
      }
      if(currentField.name == "productSpecsName") product['specifications'][index] = {...product['specifications'][index], name: currentField.value}
      if(currentField.name == "productSpecsValue") product['specifications'][index] = {...product['specifications'][index], value: currentField.value}
      this.setState({product})
    }
    
  }

  handleSubmit = async (e, type) =>{
    if(type == "brand"){
      await this.props.addNewBrand(this.state.brandName);
      this.props.getAllBrandsAction();
      this.setState({showAddBrand: false})
    }else if(type == "category"){
      await this.props.addNewCategory(this.state.categoryName);
      this.props.getAllCategoriesAction();
      this.setState({showAddCategory: false})
      this.showMessage();
    }
    else if(type == "product"){
     await this.props.addNewProduct(this.state.product)
      this.setState({showAddProduct: false})
      this.props.getAllProductAction();

    }
  }
  showMessage = () =>{

  }

  handleAddProductSpecs = () => {
    const newSpecObj = {
      name: "", value: ""
    };
    let product = this.state.product;
    product.specifications = [...product.specifications, newSpecObj];
    this.setState({product})
  }
  handleSubItemClicked = async (e, item, submenu, onClick) =>{
    if(item.name == "Settings") onClick();
    else {
      let queryStr = this.state.queryStr;
      queryStr += `${item.name.toLowerCase()}=${submenu._id}`;
      await this.props.getAllProductAction(queryStr)
    }


  }
  render() {
    return (
      <div className="App">
        <div className="nav-container p-10">
          <Nav brandName="Catalogue Management Sysytem"/>
        </div>
        <div className="body-container">
          <div className="side-bar-container">
            <Sidemenu
              toggleAddProduct={this.toggleAddProduct}
              toggleAddCategory={this.toggleAddCategory}
              toggleAddBrand={this.toggleAddBrand}
              addProductShow={this.state.showAddProduct}
              addCategoryShow={this.state.showAddCategory}
              addBrandShow={this.state.showAddBrand}
              brands={this.props.brandReducer.brands}
              categories={this.props.categoryReducer.categories}
              toggleSubmenu={this.toggleSubmenu}
              showSettingSubmenu={this.state.showSettingSubmenu}
              showCategoriesSubmenu={this.state.showCategoriesSubmenu}
              showBrandsubmenu={this.state.showBrandsubmenu}
              onChange={(e, type, index) => this.handleOnChange(e, type, index)}
              onSubmit={(e, type)=>this.handleSubmit(e, type)}
              showMessage={this.showMessage}
              product={this.state.product}
              addProductSpecs={()=>this.handleAddProductSpecs()}
              handleSubItemClicked={(type, item, submenu, onClick)=>this.handleSubItemClicked(type, item, submenu, onClick)}
              />
          </div>
          {/* <div className="body-content-container"> */}
          {this.props.productReducer.products.length ? (<Products 
              data={this.props.productReducer.products}
              showProductDetails={this.state.showProductDetails}
              toggleShowProduct={(e, product) => this.toggleShowProduct(e, product)}
              currentproduct={this.state.currentSelectedProduct}/>): <p>There are no products. Go to settings to Add a new Product</p>}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    brandReducer: state.brandReducer,
    categoryReducer: state.categoryReducer,
    productReducer: state.productReducer
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ 
    addNewBrand: BrandAction.addNewBrandAction,
    addNewCategory: CategoryAction.addNewCategory,
    addNewProduct: ProductAction.addNewProduct,
    getAllBrandsAction: BrandAction.getAllBrandsAction, 
    getAllCategoriesAction: CategoryAction.getAllCategoriesAction,
    getAllProductAction: ProductAction.getAllProducts
  },
  dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
