import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

function SignUp() {
  const {signUP,isSigningUp} = useAuthStore()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const validateForm = () => {
    if (formData.fullName.trim() === "") { 
      return toast.error("Full name is required");
      
    }
    if (formData.email.trim() === "") { 
      return toast.error("Email is required");
      
    }
    if(!formData.password){
      return toast.error("Password is required");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be atleast 6 characters");
      
    } 
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
      return toast.error("Invalid email format");
      
    }
    return true;
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = validateForm()
    if (success === true) {
      await signUP(formData)
    } else {
      return toast.error("Some thing went wrong.")
    }
  }
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex-col items-center justify-center h-screen gap-5 sm:flex">
      <div className="flex flex-col items-center">
        <MessageSquare className="size-10" />
        <h1 className="text-2xl">Create Account</h1>
        <p className="text-sm">Get started with your free account</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col w-[350px] gap-3">
        <div className="flex flex-col relative">
          <label>Full Name</label>
          <input
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="border pl-8 outline-none border-gray-900 h-10 w-full rounded-md px-2 "
            type="text"
            placeholder="John Doe"
          />
          <User size={24} className="absolute top-8 pl-1 left-1" />
        </div>
        <div className="relative">
          <label>Email</label>
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border pl-8 outline-none border-gray-900 rounded-md h-10 w-full px-2 "
            type="email"
            placeholder="you@example.com"
          />
          <Mail size={24} className="absolute top-8 pl-1 left-1" />
        </div>
        <div className="relative">
          <label>Password</label>
          <input
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="border pl-8 outline-none border-gray-900 rounded-md h-10 w-full px-2 placeholder:text-3xl pb-1 "
            type={showPassword ? "text" : "password"}
            placeholder="......"
          />
          <Lock size={24} className="absolute top-8 pl-1 left-1" />

          {!showPassword && (
            <Eye
              className="absolute top-8 right-3"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
          {showPassword && (
            <EyeOff
              className="absolute top-8 right-3"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>

        <Link
          to="/login"
          className="text-sm text-blue-600 hover:underline pl-4"
        >
          Already have an account? Login
        </Link>
        <button
          className="w-full h-10 rounded-full text-white bg-blue-600 hover:bg-blue-800"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUp
