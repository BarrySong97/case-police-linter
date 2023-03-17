import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@douyinfe/semi-ui/dist/css/semi.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import About from "./pages/About";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "index",
        element: <Index />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
