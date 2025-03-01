import React, { useEffect} from "react";
import { useEcom } from "../context/EcomProvider";
import Loader from "./Loader";
import DisplayProduct from "./DisplayProduct";

function HotDeals() {
  const { fetchHotDeals, discount , loading} = useEcom();

 useEffect(()=>{
   fetchHotDeals()
 },[])

  return (
    <>
    <div className="bg-amber-200 text-amber-950 mt-2.5 mb-2.5 text-center h-10">
      <h1 >Hotdeals</h1>
    </div>
    {loading ? <Loader/> : <DisplayProduct product={discount}/>}
    </> )
  
}

export default HotDeals;
