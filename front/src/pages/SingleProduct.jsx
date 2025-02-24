import { useState, useEffect } from "react";
import instance from "../axiosConfig";
import { useParams } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useEcom } from "../context/EcomProvider";
import Loader from "../Components/Loader.jsx";
import DisplayProduct from "../Components/DisplayProduct.jsx";

function SingleProduct() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { addToCart, removeFromCart, existInCart, existInWishlist, removeFromWishlist, addToWishlist, filterByCategory, productsByCat } = useEcom();

  let { id } = useParams(); // It retrieves the 'id' parameter from the URL.

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
    if(product.category){
        filterByCategory(product.category)
    }
  }, [id, product.category]);

  async function fetchProduct(id) {
    try {
      setLoading(true);
      const response = await instance.get(`/product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <>
      <div className="product flex gap-8 px-12 py-4">
        <div className="left w-1/4">
          <img
            src={product.url}
            alt={product.name}
            className="w-[15rem] h-[15rem] object-contain"
          />
        </div>
        <div className="right w-3/4 mt-3">
          <h2 className="text-3xl font-bold py-4">{product.name}</h2>

          {product.ratings && product.ratings.length > 0 ? (
            <div className="flex my-2 text-xl">
              <p>{product.totalRating}</p>
              <p>{product.ratings.length} ratings</p>
            </div>
          ) : (
            ""
          )}

          <div className="flex items-center  leading-none">
            <span className="text-lg font-medium">
              <MdOutlineCurrencyRupee />
            </span>
            <span className="text-xl font-bold">{product.price}</span>
          </div>
          <h2 className="my-2">
            <strong>Brand:- </strong> {product.brand}
          </h2>
          <h2>
            <strong>Category:- </strong> {product.category}{" "}
          </h2>
          <div className="flex my-2">
            <strong>Description:- </strong>
            <p>{product.description}</p>
          </div>

          <div className="my-3 flex gap-2">
          {
            existInWishlist(product._id)?(

                <button className="bg-red-500 text-white  px-3 py-1 font-bold cursor-pointer rounded"
                onClick={() => removeFromWishlist(product._id)}>
                Remove From Wishlist
              </button>
            ):(
            <button className="bg-amber-300 text-black  px-2 py-1 font-bold cursor-pointer rounded" onClick={()=>addToWishlist(product)}>
              Add to Wishlist
            </button>

            )
          }
            {
                existInCart(product._id)?(

                    <button className="bg-red-500 text-white  px-3 py-1 font-bold cursor-pointer rounded"
                    onClick={() => removeFromCart(product._id)}>
                    Remove From Cart
                  </button>
                ):(
                <button className="bg-blue-500 text-white  px-3 py-1 font-bold cursor-pointer rounded"
                onClick={() => addToCart(product)}>
                Add to Cart
              </button>
                )      
            }
          </div>
        </div>
      </div>
      <div>
        <h1>Similar Products</h1>
        <DisplayProduct product={productsByCat.filter((item)=>item._id!==product._id)}></DisplayProduct>
      </div>
    </>
  );
}

export default SingleProduct;