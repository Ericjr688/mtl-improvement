import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
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
    <RouterProvider router={router} />
  );
}

export default App;
