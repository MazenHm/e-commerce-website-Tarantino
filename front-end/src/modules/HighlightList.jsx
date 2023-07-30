import React from "react";
import HighlightCard from "../components/HighlightCard";


const HighlightList = () => {
  return (
    <div className="container-view">
      <div className="highlight-cards">
        <HighlightCard
          image={"/assets/img/diamond.png"}
          name="Unique art"
          description="We collaborate with some of today’s most exciting global creators to offer a curated store of bold and expressive artworks"
        />
        <HighlightCard
          image={"/assets/img/location.webp"}
          name="Delivered globally"
          description="We’ll deliver your artworks to your door, anywhere in the world. If you’re not 100% happy, tell us within 14 days and we’ll sort it"
        />
        <HighlightCard
          image={"/assets/img/return.webp"}
          name="Strong ethics"
          description="We’ve ensured fair artist commissions and sustainability is at the heart of what we do. We’re run by creatives, for creatives"
        />
      </div>
    </div>
  );
};

export default HighlightList;
