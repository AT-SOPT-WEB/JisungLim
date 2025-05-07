import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import PokemonDetail from "../pages/PokemonDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: '/pokemon/:name',
        element: <PokemonDetail />
    }
]);

export default router;