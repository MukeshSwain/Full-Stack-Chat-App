
import { Eye, EyeOff, Lock, Mail, MessageSquare} from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

function Login() {
  const {login} = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(formData)
  }
  return (
    <div className="flex-col items-center justify-center h-screen gap-5 sm:flex">
      <div className="flex flex-col items-center">
        <MessageSquare className="size-10" />
        <h1 className="text-2xl">Login</h1>
        <p className="text-sm">Get started with your free account</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[350px] gap-3">
        <div className="relative">
          <label>Email</label>
          <input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="border pl-8 outline-none  border-gray-900 rounded-md h-10 w-full px-2 placeholder:text-3xl pb-1"
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
          to="/signup"
          className="text-sm text-blue-600 hover:underline pl-4"
        >
          Don't have an account?signup
        </Link>
        <button
          className="w-full h-10 rounded-full text-white bg-blue-600 hover:bg-blue-800"
          type="submit"
        >
          Log in
        </button>
      </form>
    </div>
  );
  
}

export default Login
