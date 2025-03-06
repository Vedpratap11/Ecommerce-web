import cartModel from "../models/cartModel.js"

export async function addToCart(req,res) {
  try{
    const {user, items} = req.body
    await cartModel.save()
    res.send({message: "Added To Cart"})
  }catch(error){
     console.log(error)
     res.status(500).send({message: })
  }
}





// const addToCart = async (req, res) => {
//   try {
//       const { userId, productId, quantity, attributes } = req.body;

//       let cart = await cartModel.findOne({ user: userId });

//       if (!cart) {
//           cart = new cartModel({ user: userId, items: [] });
//       }

//       // Check if the product already exists in the cart
//       const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

//       if (itemIndex > -1) {
//           // Update quantity if product already exists
//           cart.items[itemIndex].quantity += quantity;
//       } else {                  
//           // Add new product
//           cart.items.push({ product: productId, quantity, attributes });
//       }

//       await cart.save();
//       res.json(cart);
//   } catch (error) {
//       res.status(500).json({ message: "Error updating cart", error });
//   }
// };
