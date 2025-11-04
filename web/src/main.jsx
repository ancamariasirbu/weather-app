import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from "./pages/Home";
import City from "./pages/City";
import Favorites from "./pages/Favorites.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import{createBrowserRouter, RouterProvider} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> }, // 👈 default route
      { path: "city/:cityName", element: <City /> },
      { path: "favorites", element: <Favorites /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

// const router = createBrowserRouter([
//   {path: "/", element: <Home />},
//   {path:"/city/:name", element: <City />},
//   {path:"/favorites", element: <Favorites />},
//   {path:"*", element: <NotFoundPage />},
// ]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
