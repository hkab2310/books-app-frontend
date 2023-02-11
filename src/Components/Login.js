import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link}from "react-router-dom";


export default function Login() {
    let [userName, setUserName] = useState("");
    let [pass, setPass] = useState("");
    let [err, setErr] = useState("");

    function onClickHandler(e) {
        // e.preventdefault();
        setErr("");
        // console.log(`onClick`);
        // console.log(userName,pass);
        if (userName && pass) {
            // console.log('in if cond');
            axios.post("https://booklistapi.onrender.com/login",{userName:userName,password:pass},{
                headers : {
                    "Content-Type" : "application/json"
                }
            }).then(res=>{
                console.log(res);
                if(res.status === 201){
                    const token = res.data.token;
                    const userName = res.data.userName;
                    // console.log(token,userName);
                    localStorage.setItem('token',token);
                    localStorage.setItem("userName",userName);
                    setErr("Success");
                }
            }).catch(err=>{
                setErr(err.response.data.message);
                // setErr(err.data.message)
            })
        }

        if (!userName || !pass) {
            setErr("both fields are required")
        }
    }

    return (
        <div className="login-cont">
            <h3>Member Login</h3>
            <div className="login-form-cont">
                <form>
                    <input type="text" value={userName} placeholder="Username" id="username__input" onChange={(e) => {
                        setUserName(e.target.value);
                    }} required={true}></input>
                    <input type="password" value={pass} placeholder="........." id="pass__input" onChange={(e) => {
                        setPass(e.target.value);
                    }} required={true}></input>
                    <button type="button" onClick={onClickHandler}>Login</button>
                </form>
                {err && <div className="err-con">{err}</div>}
            </div>
            <div className="register-btn-cont">
                <Link to="/register">Register</Link>
            </div>
            <div>
                {err==="Success"&&<div className="books-btn">
                    <Link to='/books'>Books</Link>
                    </div>}
            </div>
        </div>
    )
}
