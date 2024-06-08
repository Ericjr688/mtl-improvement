import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register"; 

import React from 'react'
import NavBar from "./components/common/Navbar"
import Footer from "./components/common/Footer";
import Series from "./pages/Series"


 const Layout = () => {
  return (
    <>
      <NavBar/>
      <div className="main-container">
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path:"/series",
        element:<Series/>
      },
      
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
])

function App() {
  return (
    <div className="app">
        <RouterProvider router={router} />      
    </div>
    
  );
}

export default App;
