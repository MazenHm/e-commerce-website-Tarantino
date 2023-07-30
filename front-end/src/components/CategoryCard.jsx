import React from 'react'
const CategoryCard = (props) => {
  return (
      <figure className='category-figure'>
        <img src={props.image} alt='card' height="587" width="469"/>
        <p>{props.name}</p>
      </figure>
  )
}

export default CategoryCard
