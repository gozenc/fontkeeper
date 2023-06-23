import Home from "./home";
import Contact from "./contact";
import Faq from "./faq";
import Layout from "../components/Layout";
import FontViewer from "../components/FontViewer";
import FontEditor from "../components/FontEditor";
import NotFound from "./404";
import React from "react";

// const Home =  React.lazy( () => import("./home"))
// const Category =  React.lazy( () => import("./category"))
// const Search =  React.lazy( () => import("./search"))
// const User =  React.lazy( () => import("./user"))
// const Contact =  React.lazy( () => import("./contact"))
// const Product =  React.lazy( () => import("./product"))
// const Login =  React.lazy( () => import("./login"))
// const Faq =  React.lazy( () => import("./faq"))
// const Checkout =  React.lazy( () => import("./checkout"))
// const Cart =  React.lazy( () => import("./cart"))
// const UserFavorites =  React.lazy( () => import("./user/favorites"))
// const UserOrders =  React.lazy( () => import("./user/orders"))
// const Layout =  React.lazy( () => import("../components/Layout"))
// const Map =  React.lazy( () => import("./map"))
// const NotFound =  React.lazy( () => import("./404"))

export default [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/font/:id",
        children: [
          {
            index: true,
            element: <FontViewer />,
          },
          {
            path: "/font/:id/edit",
            element: <FontEditor />,
          },
        ],
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
