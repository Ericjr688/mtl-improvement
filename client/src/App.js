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
// import ImproveTranslation from "./pages/ImproveTranslation"
import Novel from "./pages/Novel"
import Chapter from "./pages/Chapter";
import AccountInfo from "./pages/account/AccountInfo";
import AccountHeader from "./components/account/AccountHeader";
import Library from "./pages/account/Library";
import NovelReviews from "./pages/NovelReviews";


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

const AccountLayout = () => {
  return (
    <>
      <div className="page-wrapper account-page">
        <AccountHeader/>
        <Outlet/>  
      </div>
      
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
      {
        path:"/series/:id", 
        element:<Novel/>
      },
      {
        path:"/series/:novelId/reviews", 
        element:<NovelReviews/>
      },
      {
        path:"/chapters/:id", 
        element:<Chapter/>
      },
      {
        path:"/account",
        element:<AccountLayout/>,
        children: [
          {
            path:"/account",
            element:<AccountInfo/>
          },
          {
            path:"/account/library",
            element:<Library/>
          },

        ]
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
