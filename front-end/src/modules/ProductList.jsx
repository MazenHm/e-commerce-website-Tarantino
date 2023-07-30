import React, {  useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { baseUrlImage } from "../services/config";
import { getLastProduct } from "../services/ProductService";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getProducts() {
    setLoading(true);
    let data = await getLastProduct();
    setLoading(false);
    if (data) {
      setProducts(data);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  let productView;
  if (!loading && products && products.length > 0) {
    productView = products.map((product) => (
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

  //  }else if(loading){
  //   productView = <p className="text-center">Loading...</p>
  //  }else{
  //   productView = <p className="text-center">No product found!</p>
  //  }

  return (
    <div className="container-view">
      <div className="d-flex justify-content-between ">
        <p>SELECTED POSTERS</p>
        <Link to="/news">
          <p>VIEW ALL</p>
        </Link>
      </div>

      <div className="d-flex gap-1 ">{productView}</div>
    </div>
  );
};

export default ProductList;
