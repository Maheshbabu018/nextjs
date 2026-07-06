"use client"
import Link from "next/link"
import React, { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
export default function SignupPage() {
     const router =useRouter()
     const [buttondisabled,setbuttondisabled]=React.useState(false)



    const [user,setuser]=React.useState({
        email :"",
        password :"",
        username : "",
        
    })
    const [loading,setloading]=useState(false)
    const onsignup=async ()=>{
    
        try {
       setloading(true)
       const response=await axios.post("/api/users/signup",user)
       console.log("signup success",response.data);
       router.push("/login")
       
        }
        catch (error:any){
        console.log("signup failed ", error.message);
        
            toast.error(error.message)

        }
        finally{
          setloading(false)
        }
    
    }
    useEffect(()=>{
     if(user.email.length>0 && user.password.length>0 && user.username.length>0){
        setbuttondisabled(false)
     }
     else{
        setbuttondisabled(true)
     }
    },[user])



       return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ?"loading" :"sign up"}</h1>
        <hr />
        <label htmlFor="username" >username</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 " type="text" id="username" 
        value={user.username}
        onChange={(e)=>setuser({...user,username:e.target.value})}
        placeholder="username" />


         <label htmlFor="email" >email</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
         type="email"
         id="email" 
        value={user.email}
        onChange={(e)=>setuser({...user,email:e.target.value})}
        placeholder="email" />
    

    <label htmlFor="password" >password</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" 
        type="password"
         id="password" 
        value={user.password}
        onChange={(e)=>setuser({...user,password:e.target.value})}
        placeholder="email" />

        <button onClick={onsignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" >{buttondisabled ? "no signup " :"signup"}</button>
    <Link  href="/login" >visit login page </ Link>
    </div>
    
    )
}