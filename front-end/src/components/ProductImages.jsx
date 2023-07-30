import React from "react";
import { baseUrlImage } from "../services/config";

const ProductImages = ({ images }) => {
  return (
    <div>
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
  {images.map((image, index) => (
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} class="active" aria-current="true" aria-label={"Slide " +index}></button>
    ))}
  </div>
  <div class="carousel-inner">
  {images.map((image, index) => (
            <div className={index==0 ? "carousel-item active":"carousel-item "}>
              <img
                className="d-block w-100"
                src={baseUrlImage + image.url}
                alt="First slide"
              />
            </div>
          ))}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
  );
};

export default ProductImages;
