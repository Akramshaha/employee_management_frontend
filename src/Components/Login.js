import { useState } from "react";
import { useLocalState } from "../Utils/useLocalStorage";
import axios from "axios";
import './Login.css';
import { POSTURL } from '../Utils/Constants';


export default function Login() {
    const [jwt, setJwt]  = useLocalState("", "jwt");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function sendSubmitRequest(){
        console.log("Request Send");
        const resBody = {
            "email":email,
            "password":password
        };

        console.log(resBody);
        
        axios.post(
            POSTURL+"/login",
            {
                email:email,
                password:password
            }
            ).then((response) => {
                if(response.status === 200){
                    console.log(response);
                    setJwt(response.data.token);
                    window.location = "dashboard";
                }
                
                
            })
            .catch ((message) => {
                alert(message);
            });
    }

    return ( 
            <>
            <div className="wrapper fadeInDown">
                <div id="formContent" className="p-5 mt-5">

                    <form>
                        <input type="text" id="email" className="fadeIn second" value={email} onChange={(event) => setEmail(event.target.value)}  placeholder="login" />
                        <input type="text" id="password" className="fadeIn third" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="password" />
                        
                    

                    <div id="formFooter" className="p-1 bg-white border-0">
                        
                        <a className="btn btn-primary" onClick={() => sendSubmitRequest()}>Login</a>
                    </div>
                    </form>

                </div>
            </div>
            </>
     );
}
