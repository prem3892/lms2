import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, productThunk } from "../components/redux/product.slice";

function DisplayProduct() {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.product.product);
  //   console.log(result);

  useEffect(() => {
    dispatch(productThunk());
  }, []);

  function handleAddToCart(e) {
    // console.log(e);
    dispatch(addToCart(e));
  }
  return (
    <>
      {result && result.length > 0 ? (
        result.map((res, index) => (
          <div
            className="card bg-base-100 w-[330px] shadow-md shadow-white"
            key={index}>
            <figure>
              <img
                src={`${res.thumbnail}`}
                alt="Shoes"
                style={{ height: "150px" }}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-sm">
                {res.title}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p style={{ height: "100px", overflow: "hidden" }}>
                {res.description}
              </p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Rating: {res.rating}</div>
                <div className="badge badge-outline">price: ${res.price}</div>
              </div>

              <div className="btn btn-info mt-4">
                <button onClick={() => handleAddToCart(res)}>
                  add To Cart
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h1>no product available</h1>
        </div>
      )}
    </>
  );
}

export default DisplayProduct;
