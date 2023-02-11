import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,Link}from "react-router-dom";

export default function Register(){
    const [userName,setUserName] = useState("");
    const [pass,setPass] = useState("");
    const [confPass,setConfPass] = useState("");
    const [err,setErr] = useState("");
    const [move,setMove] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(move===true){
            navigate("/");
        }
    },[move])

    function onClickHandler(){
        setErr("");
        if(userName&&pass&&confPass){
            if(pass===confPass){
                axios.post("https://booklistapi.onrender.com/register",{userName:userName,password:pass},{
                    headers : {
                        "Content-Type" : "application/json"
                    }
                }).then(res=>{
                    console.log(res);
                    setErr("Success");
                    setMove('true');
                })
            }else{
                setErr("Password and confirm password should be same");
            }
        }else{
            setErr("All fields are manadatory");
        }
    }

    return (
        <div className="register-cont">
            <h3>Register</h3>
            <div className="register-form-cont">
                <form>
                    <input type="text" id="userName-input" placeholder="Username" value={userName} onChange={(e)=>setUserName(e.target.value)}></input>
                    <input type="password" placeholder="........" value={pass} onChange={(e)=>setPass(e.target.value)}></input>
                    <input type="password" placeholder="........" value={confPass} onChange={(e)=>setConfPass(e.target.value)}></input>
                    <button type="button" onClick={onClickHandler}>Register</button>
                </form>
                {err && <div className="err-con">{err}</div>}
            </div>
            <Link to="/">Login</Link>
        </div>
    )
}