import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Produtos } from "../pages/Produtos";
import { Materiais } from "../pages/Materiais";
import { Pedidos } from "../pages/Pedidos";
import { Orcamentos } from "../pages/Orcamentos";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { Chatbot } from "../pages/Chatbot";
import { Perfil } from "../pages/Perfil";
import { ErrorPage } from "../pages/ErrorPage";
import { Cadastro } from "../pages/Cadastro";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/cadastro",
        element: <Cadastro/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/produtos",
        element: <Produtos/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/materiais",
        element: <Materiais/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/pedidos",
        element: <Pedidos/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/orcamentos",
        element: <Orcamentos/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/home",
        element: <Home/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/chatbot",
        element: <Chatbot/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/perfil",
        element: <Perfil/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "*",
        element: <ErrorPage/>,
        errorElement: <ErrorPage/>
    },
])