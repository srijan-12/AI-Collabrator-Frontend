import { useState } from "react"
import axios from '../config/axios'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { adduser } from "../store/userSlice"
import appStore from "../store/appStore"
export const Login = () => {
    const navigate = useNavigate()
    const[email, setEmail] = useState('text@gmail.com')
    const[password, setPassword] = useState('k8dfh8c@Pfv0gB2')
    const[showToastLogin, setShowToastLogin] = useState(false)
    const[showToastError, setShowToastError] = useState(false)
    const[Errorr, setErrorr] = useState(null)

    const user = useSelector(appStore=> appStore?.user?.payload)
    console.log(user)
    const dispatch = useDispatch() 
    const submitHandler = async() =>{
        try{
            const result = await axios.post("/user/login", {email: email, password : password}, {withCredentials:true})
            if(result?.data?.result != null && result?.data?.user != null){
                dispatch(adduser(result?.data?.user))
                setShowToastLogin(true)
                setTimeout(()=>setShowToastLogin(false),1500)
                setTimeout(()=>navigate("/"),1800)
            }else{
                throw new Error('...')
            }
        }catch(err){
            const serverError = err.response?.data?.error || "Unknown server error";
            setErrorr(serverError); 
            setShowToastError(true);
            setTimeout(() => setShowToastError(false), 1500);
        }
    }
        return (
            <>
            {<div className="toast toast-center toast-top">
                {showToastLogin&&<div className="alert alert-info">
                    <span>Logging you in</span>
                </div>}
                {showToastError&&<div className="alert alert-error">
                    <span>{Errorr}</span>
                </div>}
            </div>}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Login to your account
                    </h2>
                </div>
            
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                    <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 mt-6 text-xl">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-xl"
                        />
                    </div>
                    </div>
            
                    <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="imageUrl" className="block text-sm/6 font-medium text-gray-900 mt-6 text-xl">
                        Password
                        </label>
                        <div className="text-sm"></div>
                    </div>
                    <div className="mt-2">
                        <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="profilePic"
                        name="profilePic"
                        type="password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-xl"
                        />
                    </div>
                    </div>
            
                    <div>
                    <button
                        onClick={submitHandler}
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6 text-xl"
                    >
                        Login
                    </button>
                    </div>
                </div>
                </div>
            </>
          )
    }
    
