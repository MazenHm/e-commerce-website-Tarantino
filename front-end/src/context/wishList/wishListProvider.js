import React, { useEffect, useState } from "react";
import { wishListContext } from "./wishListContext";

const WishListProvider = (props) => {
  const [wishListItems, setwishListItems] = useState([]);
  const [auto, setAuto] = useState(false);
  const [toggleWishList, setToggleWishList] = useState(false);

  useEffect(() => {
    let wishList = localStorage.getItem("wishList");
    if (wishList) {
      setwishListItems(JSON.parse(wishList));
    }
  }, []);

  function toggelList(closee = false) {
    if (closee) {
      setToggleWishList(false);
    } else {
      setToggleWishList(true);
    }
  }

  function addItem(item) {
    let items = wishListItems;
    console.log(item);

    if (items && items.length > 0) {
      let prod = items.find(i=> i.id == item.id)
    
      let index = items.indexOf(prod);
    
      if (index != -1) {
        items.splice(index, 1);
      }else{
        items.push(item);  
      }
    } else {
      items.push(item);
    }

    setwishListItems(items);
    localStorage.setItem("wishList", JSON.stringify(items));
    setAuto(!auto);
    toggelList();
  }

  function removeItem(el) {
    let items = wishListItems;

    let item = items.find((i) => i._id === el._id);
    let index = items.indexOf(item);
console.log(el, index)
if(index >= 0){

  items.splice(index  , 1);
}
   

    setwishListItems(items);
    localStorage.setItem("wishList", JSON.stringify(items));
    setAuto(!auto);
  }

  const wishList = {
    wishListItems,
    auto,
    addItem,
    removeItem,
    toggleWishList,
    toggelList,
  };

  return (
    <wishListContext.Provider value={wishList}>
      {props.children}
    </wishListContext.Provider>
  );
};

export default WishListProvider;
