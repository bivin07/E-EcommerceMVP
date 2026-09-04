"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div
      className="w-full min-h-[80vh] flex items-center justify-center px-6 py-12"
      style={{
        background:
          "radial-gradient(ellipse at 70% 20%, rgba(95,72,198,0.1) 0%, transparent 55%), radial-gradient(ellipse at 30% 80%, rgba(136,51,207,0.06) 0%, transparent 50%), #F8F7FF",
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: "white",
          boxShadow:
            "0 24px 80px rgba(95,72,198,0.15), 0 8px 32px rgba(0,0,0,0.06)",
          border: "1px solid rgba(95,72,198,0.1)",
        }}
      >
        {/* Header */}
        <div
          className="px-8 py-6 text-center"
          style={{ background: "linear-gradient(135deg, #5f48c6, #8833cf)" }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">☀️</span>
            <p className="text-white font-bold text-xl tracking-tight">
              Solar<span style={{ color: "#fa6a19" }}> Tech</span>
            </p>
          </div>
          <p className="text-purple-200 text-sm">
            {currentView === "sign-in"
              ? "Welcome back! Sign in to your account."
              : "Create a new account to get started."}
          </p>
        </div>

        {/* Gradient line */}
        <div
          className="h-1 w-full"
          style={{
            background: "linear-gradient(90deg, #fa6a19, #5f48c6, #8833cf)",
          }}
        />

        {/* Form */}
        <div className="px-8 py-8">
          {currentView === "sign-in" ? (
            <Login setCurrentView={setCurrentView} />
          ) : (
            <Register setCurrentView={setCurrentView} />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
