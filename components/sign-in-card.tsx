"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SignInCard() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black p-1">
      <div className="rounded-lg bg-black/50 p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400">Sign in to continue to your account</p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="border-gray-800 bg-gray-900 pl-10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="border-gray-800 bg-gray-900 pl-10 pr-10 text-white placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-600"
              />
              <label htmlFor="remember" className="text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
              Forgot password?
            </a>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign in</Button>
          <div className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
