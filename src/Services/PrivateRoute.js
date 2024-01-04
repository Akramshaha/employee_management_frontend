import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "../Utils/useLocalStorage";
import axios from "axios";
import fetchCall from "./fetchService";
import { POSTURL } from '../Utils/Constants';

export default function PrivateRoute({children}) {
    const [jwt, setJwt]  = useLocalState("", "jwt");
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    
    if (jwt) {
        axios.get(`${POSTURL}/validateJWT?token=${jwt}`).then((isValid) =>{
          setIsValid(isValid.data);
          console.log("isValid :: "+isValid.data)
          setIsLoading(false);
        });
      }else{
        return <Navigate to={"/login"} />;
      }
      if(isValid === true){
        console.log("isValid === true :: "+isValid);
      }

      if(isValid === false){
        setJwt(null);
      }
  
      return isLoading ? (
        <div>Loding</div>
      ) : isValid === true ? (
        children
      ) : (
        <Navigate to={"/login"} />
      );

}