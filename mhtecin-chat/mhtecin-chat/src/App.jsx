import React, { useState } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { WebSocketProvider, useWebSocket } from "@/context/WebSocketContext";
import { RAGChatbot } from "@/components/RAGChatbot";
import { EmployeeModule } from "@/components/EmployeeModule";
import { ManagerModule } from "@/components/ManagerModule";
import {
  Bot,
  User,
  LayoutDashboard,
  MessageSquare,
  LogOut,
  Sparkles,
  Shield,
  Briefcase,
  Lock,
  Mail,
  Key,
  Loader2,
  AlertCircle,
  Wifi,
  WifiOff,
} from "lucide-react";

function MainLayout() {
  const { user, logout, isAuthenticated, isManager, login } = useAuth();
  const { isConnected } = useWebSocket();
  const [activeTab, setActiveTab] = useState("chat");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("employee@company.com");
  const [loginPassword, setLoginPassword] = useState("password123");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      await login(loginEmail, loginPassword);
    } catch (err) {
      setLoginError(err?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // If not logged in, render Enterprise Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 text-slate-100 font-sans">
        <div className="max-w-md w-full p-8 bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
              <Bot className="h-8 w-8" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">AI Employee Assistant</h1>
            <p className="text-xs text-slate-400">Secure Internal Enterprise HR & Operations Portal</p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginFormSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" /> Employee Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="employee@company.com"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
                <Key className="h-3.5 w-3.5 text-slate-400" /> Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs disabled:opacity-50"
            >
              {loginLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {loginLoading ? "Authenticating..." : "Sign In to Employee Assistant"}
            </button>
          </form>

          {/* Demo Login Quick Selectors */}
          <div className="pt-4 border-t border-slate-700/60 text-[11px] space-y-2">
            <p className="text-slate-400 font-semibold text-center">Quick Demo Login Accounts:</p>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setLoginEmail("employee@company.com");
                  setLoginPassword("password123");
                }}
                className="p-1.5 rounded border border-slate-700 bg-slate-900/50 hover:bg-slate-700/50 text-slate-300 text-[10px] font-medium"
              >
                👤 Employee
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail("manager@company.com");
                  setLoginPassword("password123");
                }}
                className="p-1.5 rounded border border-slate-700 bg-slate-900/50 hover:bg-slate-700/50 text-slate-300 text-[10px] font-medium"
              >
                📊 Manager
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail("admin@company.com");
                  setLoginPassword("password123");
                }}
                className="p-1.5 rounded border border-slate-700 bg-slate-900/50 hover:bg-slate-700/50 text-slate-300 text-[10px] font-medium"
              >
                🛡️ Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                Internal Employee AI Assistant
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center gap-1">
                  {isConnected ? (
                    <>
                      <Wifi className="h-3 w-3 text-emerald-500 animate-pulse" /> Live WS Sync
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3 w-3 text-amber-500" /> Sync Standby
                    </>
                  )}
                </span>
              </h1>
              <p className="text-[11px] text-slate-500">Connected to FastAPI Backend & Vector DB</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === "chat"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" /> AI Chat
            </button>
            <button
              onClick={() => setActiveTab("portal")}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === "portal"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <User className="h-3.5 w-3.5" /> My Portal
            </button>
            {isManager && (
              <button
                onClick={() => setActiveTab("manager")}
                className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === "manager"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <LayoutDashboard className="h-3.5 w-3.5" /> Manager Dashboard
              </button>
            )}
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block text-xs">
              <p className="font-bold text-slate-900">{user?.name}</p>
              <p className="text-[10px] text-slate-500 font-mono">
                {user?.employee_code} • <span className="uppercase text-indigo-600 font-bold">{user?.role}</span>
              </p>
            </div>

            <button
              onClick={logout}
              title="Logout"
              className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {activeTab === "chat" && <RAGChatbot />}
        {activeTab === "portal" && <EmployeeModule />}
        {activeTab === "manager" && <ManagerModule />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <MainLayout />
      </WebSocketProvider>
    </AuthProvider>
  );
}
