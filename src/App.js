import React from 'react';
import Nav from "./components/nav/nav";
import Sidemenu from "./components/sidemenu/sidemenu";
import './App.css';
import BrandAction from './actions/brandAction';
import CategoryAction from './actions/categoryAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      showAddProduct: false,
      showAddCategory: false,
      showAddBrand: false,
      brands: ['Bosh', 'Nike', 'Jbl', 'Xiaomi'],
      categories: ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4'],
      showSettingSubmenu: false,
      showCategoriesSubmenu: false,
      brandName: "",
      categoryName: "",
      product: {}
    }
  }

  componentDidMount() {
    this.props.getAllBrandsAction();
    this.props.getAllCategoriesAction();
  }

  toggleAddProduct = () => this.setState({showAddProduct: !this.state.showAddProduct});
  toggleAddCategory = () => this.setState({showAddCategory: !this.state.showAddCategory});
  toggleAddBrand = () => this.setState({showAddBrand: !this.state.showAddBrand});
  toggleSubmenu = (e) => {
    e.stopPropagation();
    const value = e.currentTarget.getAttribute("name");
    if(value=='Settings') this.setState({showSettingSubmenu: !this.state.showSettingSubmenu});
    if(value=='Categories') this.setState({showCategoriesSubmenu: !this.state.showCategoriesSubmenu});
  }

  handleOnChange = (e, type) =>{
    const currentInput = e.currentTarget;
    if(type == "brand") this.setState({brandName: currentInput.value})
    if(type == "category") this.setState({categoryName: currentInput.value})
  }

  handleSubmit = (e, type) =>{
    if(type == "brand"){
      this.props.addNewBrand(this.state.brandName)
      this.setState({showAddBrand: false})
    }else if(type == "category"){
      this.props.addNewCategory(this.state.categoryName)
      this.setState({showAddCategory: false})
      this.showMessage();
    }
  }
  showMessage = () =>{

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
              categories= {this.props.categoryReducer.categories}//{this.props.categoryReducer.categories}
              toggleSubmenu={this.toggleSubmenu}
              showSettingSubmenu={this.state.showSettingSubmenu}
              showCategoriesSubmenu={this.state.showCategoriesSubmenu}
              onChange={(e, type) => this.handleOnChange(e, type)}
              onSubmit={(e, type)=>this.handleSubmit(e, type)}
              showMessage={this.showMessage}
              />
          </div>
          <div className="body-content-container p-10">
            <p>Body</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    brandReducer: state.brandReducer,
    categoryReducer: state.categoryReducer
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ 
    addNewBrand: BrandAction.addNewBrandAction,
    addNewCategory: CategoryAction.addNewCategory,
    getAllBrandsAction: BrandAction.getAllBrandsAction, 
    getAllCategoriesAction: CategoryAction.getAllCategoriesAction
  },
  dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
