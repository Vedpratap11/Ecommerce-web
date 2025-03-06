import { useState } from "react";
import instance from "../axiosConfig";
import { useEcom } from "../context/EcomProvider";

function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    category: "",
    usualPrice: "",
    discountedPrice: "",
    discountType: "",
    discount: "",
    percentageDiscount: "",
    image: "",
  });
  const { categories } = useEcom();

  function handleChange(e) {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    }
  }

  function handleDiscountChange(e) {
    const a = form.discountType === "Percentage" ? form.usualPrice - (e.target.value * form.usualPrice)/100 : form.usualPrice - e.target.value
    
    setForm((form)=>({...form ,discountedPrice:a}))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const frm = new FormData();
      frm.append("title", form.title);
      frm.append("brand", form.brand);
      frm.append("category", form.category);
      frm.append("usualPrice", form.usualPrice);
      frm.append("discountedPrice", form.discountedPrice);
      frm.append("percentageDiscount", form.percentageDiscount);
      frm.append("image", form.image);

      const response = await instance.post("/product/add", frm, {
        withCredentials: true,
      });
      console.log(response);
      setForm({
        title: "",
        brand: "",
        category: "",
        usualPrice: "",
        discountedPrice: "",
        percentageDiscount: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        placeholder="Enter Product Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        placeholder="Enter Product Brand"
        name="brand"
        value={form.brand}
        onChange={handleChange}
        className="border-2"
      />
      <br />
      <select
        name="category"
        id=""
        value={form.category}
        onChange={handleChange}
      >
        <option value="" selected disabled>
          Select Category
        </option>
        {categories.map((category, index) => {
          return (
            <option value={category._id} key={index}>
              {category.name}
            </option>
          );
        })}
      </select>
      <br />
      <input
        type="number"
        placeholder="Enter Product Usual Price"
        name="usualPrice"
        value={form.usualPrice}
        onChange={handleChange}
        className="border-2"
      />
      <br />
      <select
        name="discountType"
        value={form.discountType}
        onChange={handleChange}
      >
        <option value="Percentage">Percentage</option>
        <option value="Rupees">Rupees</option>
      </select>
      <input
        type="number"
        name="discount"
        placeholder={form.discountType === "Percentage" ? "Discount Percent" : "Discount in rupee"}
        value={form.discount}
        onChange={handleChange}
        onBlur={handleDiscountChange}
      />
      <br />
      <input
        type="number"
        placeholder="Enter Product Discounted Price"
        name="discountedPrice"
        value={form.discountedPrice}
        onChange={handleChange}
        className="border-2"
      />
      <br />
      {/* <input
        type="number"
        placeholder="Enter Percentage Discount"
        name="percentageDiscount"
        value={form.percentageDiscount}
        onChange={handleChange}
        className="border-2"
      /> */}
      <input type="file" name="image" onChange={handleChange} />
      <button type="Submit">Add Product</button>
    </form>
  );
}

export default AddProduct;
