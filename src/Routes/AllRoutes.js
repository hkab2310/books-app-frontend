import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Books from "../Components/Books";
import Login from "../Components/Login";
import Register from "../Components/Register";

export default function AllRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/books" element={<Books/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}