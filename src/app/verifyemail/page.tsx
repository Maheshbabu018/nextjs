"use client"

import axios from "axios"
import Link from "next/link"
import React ,{useState,useEffect} from "react"
 export default function VerifyEmailPage(){
    const [token,settoken]=useState("")
    const[message,setmessage]=useState(false)
    const [error,seterror]=useState(false)

    const verifyuseremail= async ()=>{
        try{
       await  axios.post('api/users/verifyemail',{token})
       setmessage(true)

        }
        catch(error :any){
         seterror(true)
         console.log(error.response.data)
        }
    }

    useEffect(()=>{
        const urltoken=window.location.search.split("=")[1]
        settoken(urltoken ||"")
    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyuseremail()
        }
    },[token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl "> verify email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` :"no token"}</h2>
{message && (
  <div>
    <h2 className="text-2xl">Email Verified</h2>

    <Link href="/login">
      login
    </Link>
  </div>
)}
{error && (
  <div>
    <h2 className="text-2xl">Error</h2>

  </div>
)}

    </div>
    )
 }