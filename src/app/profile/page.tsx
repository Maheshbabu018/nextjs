"use client"
import React from "react"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import Router, { useRouter } from "next/navigation"
import { link } from "fs"

export default function Profilepage() {
     const router=useRouter()
     const [data,setdata]=React.useState("noting")
    const logout= async ()=>{
        try{
           const response= await axios.get('api/users/logout')
          console.log(response.data)
          toast.success('logout successfully')
          router.push("/login")
          
        }
        catch(error :any){
            console.log(error.message);
            toast.error(error.message)

            
        }
     }
     const getUserDetails= async ()=>{
        const res=await axios.get("/api/users/me")
        console.log(res.data);
        setdata(res.data.data._id)
     }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                profile

            </h1>
            <h2 className="bg-green-50 p-1">{ data ==="nothing" ? "nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button onClick={logout} className="bg-blue-400 text-white py-2 px-4 rounded" >logout</button>
             <button onClick={getUserDetails} className="bg-blue-400 text-white py-2 px-4 rounded" >user details</button>
        </div>
    )
}