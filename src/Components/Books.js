import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Books() {
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(()=>{
        axios.get("https://booklistapi.onrender.com/books",{
            headers : {
                Authorization : "Bearer "+ token,
            }
        }).then(res=>{
            console.log(res);
            setBooks(res.data.books);
        })
    },[])

    return (
        <div className="books-cont">
            <Link to="/" onClick={()=>{
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
            }}>Logout</Link>
            <h3>BooksList</h3>
            {books && books.map((e, i) => {
            return(  <div className="book" key={i}>
                    <h4>{e.Title}</h4>
                    <p>{e.Author}</p>
                    <p>{e.Description}</p>
                </div>)
            })
            }
            <Link to="/books/add">Add Book</Link>
        </div>
    )
}