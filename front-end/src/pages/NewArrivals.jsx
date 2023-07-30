import React, { useEffect, useState } from "react";
// antd dropdown importation
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Select, Space, message } from "antd";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/ProductService";
import { baseUrlImage } from "../services/config";
import { Option } from "antd/lib/mentions";
import { getAllCategory } from "../services/CategoryService";
const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [filtredproducts, setfiltredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [categorySelected, setcategorySelected] = useState("");
  const sortOptions = [
    { label: "Price: Low to High", value: "priceLowToHigh" },
    { label: "Price: High to Low", value: "priceHighToLow" },
    { label: "Newest", value: "newestFirst" },
    { label: "Oldest", value: "Oldest" },
  ];
  const [sortBy, setSortBy] = useState("priceLowToHigh");

  const handleSortChange = (sortMethod) => {
    setSortBy(sortMethod);
  };

  async function getProducts() {
    let data = await getAllProducts();
    if (data) {
      setProducts(data);
      setfiltredProducts(data);
    }
  }

  async function getAllCategories() {
    let data = await getAllCategory();
    if (data) {
      setCategory(data);
    }
  }

  useEffect(() => {
    getProducts();
    getAllCategories();
  }, []);
  const getProductPrice = (options) => {

    if(options && options.length > 0){
      let productPrice = options[0].price;

      options?.map((option) => {
        if (productPrice > option.price) {
          productPrice = option.price;
        }
      });
      return productPrice;
    }
   
  };
  useEffect(() => {
    // Sort the filtredproducts array when sortBy changes
    switch (sortBy) {
      case "priceLowToHigh":
        setfiltredProducts(
          [...filtredproducts].sort((a, b) => getProductPrice(a.option) - getProductPrice(b.option) )
        );
        break;
      case "priceHighToLow":
        setfiltredProducts(
          [...filtredproducts].sort((a, b) => getProductPrice(b.option)  - getProductPrice(a.option))
        );
        break;
      case "newestFirst":
        setfiltredProducts(
          [...filtredproducts].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        break;
      case "Oldest":
        setfiltredProducts(
          [...filtredproducts].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        );
        break;
      default:
        break;
    }
  }, [sortBy]);

  let productView;
  if (filtredproducts && filtredproducts.length > 0) {
    productView = filtredproducts
      .filter((item) => {
        return (
          search.toLowerCase() === "" ||
          item.name.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search)
        );
      })
      .map((product) => (
        <ProductCard
          id={product._id}
          image={baseUrlImage + product.images[0].url}
          name={product.name}
          description={product.description}
          option={product.option}
          heart="/assets/icons/heart-icon.png"
        />
      ));
  }

  const filterByCategory = (item) => {
    setcategorySelected(item.name);
    const filtredproduct = products.filter(
      (product) => item.name === product.categoryId.name
    );
    setfiltredProducts(filtredproduct);
  };

  const deleteFilter = () => {
    setcategorySelected("");
    setfiltredProducts(products);
  };
  // SEARCH FILTER

  return (
    <>
      <div className="category-top">
        <div className="category-top-content">
          <h1>New Arrivals</h1>
        </div>
      </div>
      <div className="main-dash">
        <h1 className="">Unique art prints & posters</h1>
        <span>Created by emerging artists & curated by us</span>
        <form className="search-form">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search art by tapping artist name or art name..."
              className="search-input"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="search-button">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>
        <div className="filters">
          <Space wrap>
            <Button onClick={() => deleteFilter()}>
              <Space>All Posters</Space>
            </Button>
            {category.map((category) => (
              <Button onClick={() => filterByCategory(category)}>
                <Space>{category.name}</Space>
              </Button>
            ))}
          </Space>
        </div>
      </div>
      <div className="container-view">
        <div className="sortedby">
          <Select defaultValue={sortBy} onChange={handleSortChange}>
            {sortOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="d-flex justify-content-between gap-1 flex-wrap">
          {productView}
        </div>
      </div>
    </>
  );
};

export default NewArrivals;
