import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import "../styles/swiper.css";
import { getAllAnnounces } from "../services/AnnounceService";

const NavbarAnnonce = () => {
  const [announce, setAnnounce] = useState([]);

  async function getAnnounce() {
    let data = await getAllAnnounces();
    if (data) {
      setAnnounce(data);
    }
  }

  useEffect(() => {
    getAnnounce();
  }, []);

  
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "black", height: "36px" }}
      >
        <Swiper
          // cssMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {announce.map((announce) => (
            <SwiperSlide>
              <strong
                style={{
                  fontSize: "12px",
                  fontFamily: "poppins",
                  textTransform: "uppercase",
                  lineHeight: "2.2rem",
                  fontWeight: "400",
                }}
                className=" mx-auto  text-white"
              >
                {announce.description}
              </strong>
            </SwiperSlide>
          ))}
        </Swiper>
      </nav>
    </div>
  );
};

export default NavbarAnnonce;
