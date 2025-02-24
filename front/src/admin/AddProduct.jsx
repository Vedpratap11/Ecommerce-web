import { useState } from "react"
import instance from "../axiosConfig"

function AddProduct() {
   const[form, setForm] = useState({
    title:"",
    brand:"",
    category:"",
    usualPrice:"",
    discountedPrice:"",
    image:"",
   })

   function handleChange(e){
    if(e.target.name==="image"){
        setForm({...form, image: e.target.files[0]})
        
    }else{
      const { name , value} = e.target
      setForm({...form, [name]:value})}
   }
   

   async function handleSubmit(e){
    e.preventDefault()
    try{
        const frm = new FormData()
        frm.append("title", form.title)
        frm.append("brand", form.brand)
        frm.append("category", form.category)
        frm.append("usualPrice", form.usualPrice)
        frm.append("discountedPrice", form.discountedPrice)
        frm.append("image", form.image)

        const response = await instance.post("/product/add", frm)
        console.log(response)

    }
    catch(error){
        console.log(error)
    }

   }


  return (
    <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" placeholder="Enter Product Title"  name="title" value={form.title} onChange={handleChange}/>
        <input type="text" placeholder="Enter Product Brand"  name="brand" value={form.brand} onChange={handleChange}/>
        <input type="text" placeholder="Enter Product Category" name="category"  value={form.category} onChange={handleChange}/>
        <input type="text" placeholder="Enter Product Usual Price"  name="usualPrice" value={form.usualPrice} onChange={handleChange}/>
        <input type="text" placeholder="Enter Product Discounted Price" name="discountedPrice"  value={form.discountedPrice} onChange={handleChange}/>
        <input type="file" name="image" onChange={handleChange} />
        <button type="Submit">Add Product</button>
    </form>
  )
}

export default AddProduct
