import React, { useEffect, useState } from "react";
// antd dropdown importation
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Select, Space, message } from "antd";
import ProductCard from "../components/ProductCard";
import { baseUrlImage } from "../services/config";
import { Option } from "antd/lib/mentions";
import { getAllFrames } from "../services/FrameService";
const Frames = () => {
  const [frames, setFrames] = useState([]);
  const [search, setSearch] = useState("");
  //   const sortOptions = [
  //     { label: "Price: Low to High", value: "priceLowToHigh" },
  //     { label: "Price: High to Low", value: "priceHighToLow" },
  //     { label: "Newest ", value: "newestFirst" },
  //     { label: "Oldest", value: "Oldest" },
  //   ];
  //   const [sortBy, setSortBy] = useState("priceLowToHigh");

  //   const handleSortChange = (sortMethod) => {
  //     setSortBy(sortMethod);
  //   };
  //   let sortedFrames = [...frames];
  //   switch (sortBy) {
  //     case "priceLowToHigh":
  //       sortedFrames.sort((a, b) => a.price - b.option.price);
  //       break;
  //     case "priceHighToLow":
  //       sortedFrames.sort((a, b) => b.option.price - a.option.price);
  //       break;
  //     case "newestFirst":
  //       sortedFrames.sort(
  //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //       );
  //       break;
  //     case "Oldest":
  //       sortedFrames.sort(
  //         (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  //       );
  //       break;
  //     default:
  //       break;
  //     // add more cases for other sorting methods as needed
  //   }
  async function getFrames() {
    let data = await getAllFrames();
    if (data) {
      setFrames(data);
    }
  }

  useEffect(() => {
    getFrames();
  }, []);

  let frameView;
  if (frames && frames.length > 0) {
    // frameView = sortedFrames
    //   .filter((item) => {
    //     return search.toLocaleLowerCase() === ""
    //       ? item
    //       : item.name.toLocaleLowerCase().includes(search) ||
    //           item.description.toLocaleLowerCase().includes(search);
    //   })
    frameView = frames.map((frames) => (
      <ProductCard
        id={frames._id}
        image={baseUrlImage + frames.image}
        name={frames.name}
        description={frames.type}
        price={frames.price}
      />
    ));
  }
  // antd Dropdown states

  // const handleMenuClick = (e) => {
  //   message.info("Click on menu item.");
  //   console.log("click", e);
  // };
  // const items = [
  //   {
  //     label: "1st menu item",
  //     key: "1",
  //     icon: <UserOutlined />,
  //   },
  //   {
  //     label: "2nd menu item",
  //     key: "2",
  //     icon: <UserOutlined />,
  //   },
  //   {
  //     label: "3rd menu item",
  //     key: "3",
  //     icon: <UserOutlined />,
  //     danger: true,
  //   },
  //   {
  //     label: "4rd menu item",
  //     key: "4",
  //     icon: <UserOutlined />,
  //     danger: true,
  //     disabled: true,
  //   },
  // ];
  // const menuProps = {
  //   items,
  //   onClick: handleMenuClick,
  // };

  // SEARCH FILTER

  return (
    <>
      <div className="category-top">
        <div className="category-top-content">
          <h1>Frames</h1>
        </div>
      </div>
      <div className="main-dash">
        <h1 className="">Frames</h1>
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
        {/* <div className="filters">
          <Space wrap>
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  Filter type
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  Filter type
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  Filter type
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  Filter type
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </div> */}
      </div>
      <div className="container-view">
        {/* <div className="sortedby">
          <Select defaultValue={sortBy} onChange={handleSortChange}>
            {sortOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div> */}
        <div className="d-flex justify-content-between gap-1 flex-wrap">
          {frameView}
        </div>
      </div>
    </>
  );
};

export default Frames;
