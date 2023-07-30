import React, { useEffect, useState } from "react";
import BestSellers from "../components/ProductCard";
import { getBestSellers } from "../services/ProductService";
import { baseUrlImage } from "../services/config";

const BestSellersList = () => {
  const [bestSellers, setBestSellers] = useState(null);

  async function getbestsell() {
    let data = await getBestSellers();
    if (data) {
      setBestSellers(data);
    }
  }
  const getProductPrice = (options) =>{
    let product = options[0];
  
    options?.map(option=> {
      if(product.price > option.price){
       
        product = option
      }
    } )
  return product.price
   }
  useEffect(() => {
    getbestsell();
  }, []);

  return (
    <div className="container-view">
      <div className="d-flex justify-content-between ">
        <p>BESTSELLERS</p>
        <p className="cursor">VIEW ALL</p>
      </div>
      <div className="d-flex gap-1 ">
        {bestSellers && bestSellers.map((b) => (
          <BestSellers
          id={b._id}
            image={baseUrlImage + b.images[0].url}
            name={b.name}
            description={b.description}
            option={(b.option)}
          
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellersList;
