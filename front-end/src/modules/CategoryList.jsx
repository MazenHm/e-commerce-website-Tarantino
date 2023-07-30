import React from "react";
import CategoryCard from "../components/CategoryCard";

const CategoryList = () => {
  return (
    <div className="container-view">
      <div className="d-flex gap-1 ">
        <CategoryCard image={"/assets/img/category.png"} name="BESTSELLERS" />
        <CategoryCard image={"/assets/matisse.webp"} name="COLLECTIONS" />
        <CategoryCard image={"/assets/frames.webp"} name="FRAMES" />
      </div>
    </div>
  );
};

export default CategoryList;
