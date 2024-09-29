import React, { useEffect, useState } from "react";
import Navbar from "../components/pages/Navbar";
import Footer from "../components/pages/Footer";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../components/redux/product.slice";

function DisplayCart() {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.product.cart);
  //   console.log(result);
  const [totalprice, setTotalPrice] = useState(0);

  function handleRemove(id) {
    dispatch(removeItem(id));
  }

  useEffect(() => {
    let total = result.reduce((acc, cur) => acc + cur.price, 0);
    setTotalPrice(total.toFixed(2));
  }, [result]);

  return (
    <div>
      <Navbar />
      <div className=" flex flex-wrap gap-5 pt-20">
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
                  <div className="badge badge-outline">
                    Rating: {res.rating}
                  </div>
                  <div className="badge badge-outline">price: ${res.price}</div>
                </div>

                <div className="btn btn-error mt-4">
                  <button onClick={() => handleRemove(res.id)}>
                    remove item
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
      </div>

      <h1 className="text-center p-20">${totalprice}</h1>
      <Footer />
    </div>
  );
}

export default DisplayCart;
