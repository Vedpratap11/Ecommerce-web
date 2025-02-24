import {createBrowserRouter, RouterProvider} from "react-router-dom"
import First from "./pages/First.jsx"
import Home from "./pages/Home.jsx"
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";
import ShopByCategory from "./pages/ShopByCategory.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import EcomProvider from "./context/EcomProvider.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AuthProvider from "./context/AuthProvider.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <First/>,
    children:[
      {
        index: true,
        element: <Home/>
      },
      {
        path:"/wishlist", // navigating to /wishlist renders the Wishlist component. same for rest of the components. 
        element:<Wishlist />
      },
      {
        path:"/cart",
        element:<Cart />
      },
      {
        path:"/category/:categoryId",
        element:<ShopByCategory />
      },
      {
        path:"/product/:id", // This is a dynamic route. when the user visits /product/ee3a34578abc, the SingleProduct component will be rendered with the parameter id set to ee3a34578abc. 
        element:<SingleProduct />
      },
      {
        path:"/admin/AddProduct",
        element:<AddProduct />
      },
      {
        path:"/user/register",
        element:<Register/>
      },
      {
        path:"/user/login",
        element:<Login/>
      }
    ],
    },
  ]);

function App() {

  

  // The App function renders the entire application inside the Ecom Procider. 

  return (
    <>
    {/* It is one of the most important part of routing. without it you won't be able to handle URL changes or render different pages based on routes. it manages routing, URL synchronization, and access to router hooks(useNavigate & useParams).*/}
     
     {/* EcomProvider provides access to shared state and functions (e.g., products, cart, and functions like fetchProduct and addToCart) across the entire app. 
     Any component wrapped by EcomProvider can use the custom hook useEcom to access this shared state.
     */}
     <AuthProvider>
     <EcomProvider> 
       {/* The RouterProvider is responsible for rendering different components based on the current URL.  
       It uses router object to determine which components to render for each route.
       And this makes RouterProvider and any components rendered by the router the children of EcomProvider.  
       */}
     <RouterProvider router={router} /> 
     </EcomProvider>
     </AuthProvider>
    </> 
     );
}

export default App
