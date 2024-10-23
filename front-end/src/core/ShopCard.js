import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem } from './cartHelpers';

const ShopCard = ({
  product,
  showAddToCartButton = true,
}) => {
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1 add-to-cart btn-primary">
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  return (
    <div className="card ">
      <div className="card-body d-flex justify-content-around single-product">
        {shouldRedirect(redirect)}
        <div className='col-5'>
            <ShowImage item={product} url="product" />
        </div>
        <div className='col-5'>
            <div className="fw-bold text-capitalize mb-2 fs-3">{product.name}</div>
            <p className="card-p black-10 mb-1 fs-4 fw-bold text-end">€ {product.price}</p>
            <p className="card-p mb-1 small-font">{product.description} </p>
            <p className="black-9 mb-1 fw-semibold small-font">Category: {product.category && product.category.name}</p>
            {showStock(product.quantity)}

            <div className='d-flex justify-content-end'>
                {showAddToCartBtn(showAddToCartButton)}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;