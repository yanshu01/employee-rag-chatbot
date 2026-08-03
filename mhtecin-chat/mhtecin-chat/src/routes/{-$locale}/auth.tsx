import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site-layout";
import { getCaptcha, registerUser, loginUser, loginWithGoogleMock, completeGoogleProfile, getCurrentUser, verifyEmailCode, resendVerificationCode } from "@/server-fns/auth";
import { authService } from "@/services/authService";
import { Chrome, Lock, Mail, User, Phone, MapPin, Briefcase, Building2, RefreshCw, Loader2 } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { toast } from "sonner";
import { clearAllCache } from "@/lib/cache";

export const Route = createFileRoute("/{-$locale}/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { lp } = useLocale();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Captcha State
  const [captcha, setCaptcha] = useState({ question: "", token: "" });
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  // Google Login Flow
  const [googleUser, setGoogleUser] = useState<{ name: string; email: string } | null>(null);
  const [showGoogleDetailsForm, setShowGoogleDetailsForm] = useState(false);

  // Input States
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    profession: "",
    company_name: "",
  });

  const [googleDetails, setGoogleDetails] = useState({
    mobile: "",
    address: "",
    profession: "",
    company_name: "",
  });

  // Verification States
  const [showVerification, setShowVerification] = useState(false);
  const [verificationUserId, setVerificationUserId] = useState<number | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationResending, setVerificationResending] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        navigate({ to: lp("/dashboard") });
      }
    });
    fetchNewCaptcha();
  }, []);

  const fetchNewCaptcha = async () => {
    try {
      const res = await getCaptcha();
      setCaptcha(res);
      setCaptchaAnswer("");
    } catch (e) {
      console.error("Failed to load captcha", e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // First attempt FastAPI JWT authentication
      const result = await authService.login(loginData.email, loginData.password);
      if (result.token) {
        toast.success(`Welcome back, ${result.user.name}!`);
        clearAllCache();
        window.location.href = lp("/dashboard");
        return;
      }
    } catch (fastApiErr: any) {
      console.warn("[auth] FastAPI login failed, trying fallback:", fastApiErr);
      try {
        const res = await loginUser({ data: loginData });
        if (res.success) {
          if (res.needsVerification) {
            setVerificationUserId(res.userId);
            setShowVerification(true);
            toast.info("Verification code sent to your email!");
          } else {
            toast.success("Successfully logged in!");
            clearAllCache();
            window.location.href = lp("/dashboard");
          }
        } else {
          const errMsg = res.error || fastApiErr?.message || "Login failed";
          setError(errMsg);
          toast.error(errMsg);
        }
      } catch (err: any) {
        const errMsg = fastApiErr?.message || err?.message || "Login failed. Please check your credentials.";
        setError(errMsg);
        toast.error(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await registerUser({
        data: {
          ...registerData,
          captchaAnswer,
          captchaToken: captcha?.token || "",
        },
      });

      if (res.success) {
        if (res.needsVerification) {
          setVerificationUserId(res.userId);
          setShowVerification(true);
          toast.info("Verification code sent to your email!");
        } else {
          toast.success("Account created successfully!");
          clearAllCache();
          window.location.href = lp("/dashboard");
        }
      } else {
        const errMsg = res.error || "Registration failed";
        setError(errMsg);
        toast.error(errMsg);
        fetchNewCaptcha(); // Refresh captcha on failure
      }
    } catch (err: any) {
      console.error("[auth] handleRegister error:", err);
      const errMsg = err?.message || err?.error || "Registration failed. Please try again.";
      setError(errMsg);
      toast.error(errMsg);
      fetchNewCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationUserId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await verifyEmailCode({
        data: {
          userId: verificationUserId,
          code: verificationCode.trim(),
        },
      });
      if (res.success) {
        toast.success("Email verified successfully! Welcome to the portal.");
        clearAllCache();
        window.location.href = lp("/dashboard");
      } else {
        setError(res.error || "Incorrect verification code. Please try again.");
        toast.error(res.error || "Incorrect verification code.");
      }
    } catch (e: any) {
      setError(e.message || "Failed to verify code.");
      toast.error(e.message || "Failed to verify code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!verificationUserId) return;
    setVerificationResending(true);
    try {
      const res = await resendVerificationCode({
        data: { userId: verificationUserId },
      });
      if (res.success) {
        toast.success("Verification code resent successfully!");
      } else {
        toast.error("Failed to resend code.");
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to resend code.");
    } finally {
      setVerificationResending(false);
    }
  };

  // Google Login Simulation
  const handleGoogleLogin = () => {
    setError(null);
    // Open a mock window/popup style modal
    const mockGoogleProfile = {
      name: "Alex Johnson",
      email: "alex.johnson@mhtechin.com",
      googleId: "google_alex_987654",
    };

    setGoogleUser({ name: mockGoogleProfile.name, email: mockGoogleProfile.email });

    setLoading(true);
    loginWithGoogleMock({ data: mockGoogleProfile })
      .then((res) => {
        if (res.success) {
          if (res.needsDetails) {
            toast.info("Successfully authenticated with Google. Please complete profile details.");
            setShowGoogleDetailsForm(true);
          } else {
            toast.success("Successfully logged in with Google!");
            navigate({ to: lp("/dashboard") });
          }
        } else {
          setError(res.error || "Google sign-in failed.");
          toast.error(res.error || "Google sign-in failed.");
        }
      })
      .catch(() => {
        setError("Google Sign-In failed.");
        toast.error("Google Sign-In failed.");
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await completeGoogleProfile({ data: googleDetails });
      if (res.success) {
        toast.success("Google profile completed successfully!");
        navigate({ to: lp("/dashboard") });
      } else {
        const errMsg = res.error || "Failed to complete profile details";
        setError(errMsg);
        toast.error(errMsg);
      }
    } catch {
      setError("Failed to save profile details");
      toast.error("Failed to save profile details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout hideFooter>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)] w-full bg-background overflow-hidden">
        
        {/* Left Panel: Aesthetic Tech Banner */}
        <div className="hidden lg:flex relative flex-col justify-between p-12 bg-neutral-950 border-r border-border overflow-hidden">
          {/* Grid Background Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
          
          {/* Abstract Glowing Gradients */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[120px] pointer-events-none" />

          {/* Brand Header */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="p-2 bg-primary/10 rounded-xl border border-primary/25 text-primary">
              <Lock className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-sm tracking-widest text-neutral-300 uppercase">MHTECHIN</span>
          </div>

          {/* Features / Value Proposition */}
          <div className="relative z-10 my-auto max-w-sm space-y-5">
            <h1 className="text-3xl font-black tracking-tight leading-tight text-white">
              Enterprise Technology & Cloud OS Solutions.
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Access the MHTECHIN product ecosystem designed to automate operations and deploy enterprise-grade AI models at global scale.
            </p>

            <div className="space-y-2.5 pt-2 text-[11px] font-semibold text-neutral-300">
              <div className="flex items-center gap-2.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>AI Studio — LLM orchestration, model hosting, and agentic workflows</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>DevOps Suite — High-velocity CI/CD pipelines and infrastructure automation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Cloud Platform — Auto-scaling clusters optimized for machine learning</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Data Analytics — Real-time feature stores and predictive intelligence</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-[9px] text-neutral-600 font-bold uppercase tracking-wider flex items-center gap-3">
            <span>© 2026 MHTECHIN</span>
            <span className="h-1 w-1 rounded-full bg-neutral-700" />
            <span>SECURE LAYER ACTIVE</span>
          </div>
        </div>

        {/* Right Panel: Forms */}
        <div 
          className="relative flex items-center justify-center px-4 py-12 lg:px-12 bg-background/50 overflow-y-auto"
          style={{
            backgroundImage: "radial-gradient(circle at top right, rgba(99, 102, 241, 0.04), transparent 45%), radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.04), transparent 45%)"
          }}
        >
          {/* Small background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          <div className="relative w-full max-w-md z-10">
            <div className="rounded-2xl border border-border/70 bg-card/65 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {showVerification ? "Email Verification" : showGoogleDetailsForm ? "Complete Profile" : "Partner Portal"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {showVerification
                  ? "Confirm your email address using the code sent to you."
                  : showGoogleDetailsForm 
                    ? `Hi ${googleUser?.name}, please provide details to finalize your profile.`
                    : "Access your dashboard, manage cloud services, and launch models."}
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-md bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive text-center">
                {error}
              </div>
            )}

            {/* Complete details flow for Google Auth / Verification */}
            {showVerification ? (
              <form onSubmit={handleVerifyCode} className="space-y-5">
                <div className="text-center mb-2">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We sent a 6-digit verification code to your email. Please enter it below to confirm your identity and complete sign-in.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground block text-left">Verification Code</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="123456"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full rounded-md border border-input bg-transparent pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary text-center tracking-[0.5em] font-extrabold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/95 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    "Verify Code & Log In"
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    disabled={verificationResending}
                    onClick={handleResendCode}
                    className="text-xs text-primary hover:underline font-semibold disabled:opacity-50"
                  >
                    {verificationResending ? "Resending..." : "Resend Verification Code"}
                  </button>
                </div>
              </form>
            ) : showGoogleDetailsForm ? (
              <form onSubmit={handleGoogleDetailsSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Mobile No</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={googleDetails.mobile}
                      onChange={(e) => setGoogleDetails({ ...googleDetails, mobile: e.target.value })}
                      className="w-full rounded-md border border-input bg-transparent pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <textarea
                      required
                      placeholder="123 Science Park, San Francisco, CA"
                      value={googleDetails.address}
                      onChange={(e) => setGoogleDetails({ ...googleDetails, address: e.target.value })}
                      className="w-full rounded-md border border-input bg-transparent pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[60px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Profession</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        placeholder="Solutions Architect"
                        value={googleDetails.profession}
                        onChange={(e) => setGoogleDetails({ ...googleDetails, profession: e.target.value })}
                        className="w-full rounded-md border border-input bg-transparent pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        placeholder="Quantum Labs"
                        value={googleDetails.company_name}
                        onChange={(e) => setGoogleDetails({ ...googleDetails, company_name: e.target.value })}
                        className="w-full rounded-md border border-input bg-transparent pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/95 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving Details...
                    </span>
                  ) : (
                    "Complete Setup"
                  )}
                </button>
              </form>
            ) : (
              <>
                {/* Tabs */}
                <div className="flex border-b border-border/80 mb-6">
                  <button
                    onClick={() => {
                      setActiveTab("login");
                      setError(null);
                    }}
                    className={`flex-1 pb-3 text-center text-sm font-semibold border-b-2 transition-all ${
                      activeTab === "login"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("register");
                      setError(null);
                    }}
                    className={`flex-1 pb-3 text-center text-sm font-semibold border-b-2 transition-all ${
                      activeTab === "register"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Register
                  </button>
                </div>

                {/* Login Form */}
                {activeTab === "login" && (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          placeholder="johndoe@company.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="w-full rounded-md border border-input bg-transparent pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="w-full rounded-md border border-input bg-transparent pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-4 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/95 transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Signing In...
                        </span>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </form>
                )}

                {/* Register Form */}
                {activeTab === "register" && (
                  <form onSubmit={handleRegister} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground">Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={registerData.name}
                            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                            className="w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="email"
                            required
                            placeholder="john@company.com"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            className="w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            className="w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground">Mobile No</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 019-2834"
                            value={registerData.mobile}
                            onChange={(e) => setRegisterData({ ...registerData, mobile: e.target.value })}
                            className="w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground">Profession</label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            placeholder="CTO"
                            value={registerData.profession}
                            onChange={(e) => setRegisterData({ ...registerData, profession: e.target.value })}
                            className="w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground">Company Name</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            placeholder="SpaceX"
                            value={registerData.company_name}
                            onChange={(e) => setRegisterData({ ...registerData, company_name: e.target.value })}
                            className="w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <textarea
                          required
                          placeholder="Rocket Rd, Hawthorne, CA"
                          value={registerData.address}
                          onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                          className="w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[40px]"
                        />
                      </div>
                    </div>

                    {/* Captcha Section */}
                    <div className="space-y-1 pt-1">
                      <label className="text-xs font-semibold text-muted-foreground flex justify-between items-center">
                        <span>Security Check (Captcha)</span>
                        <button type="button" onClick={fetchNewCaptcha} className="text-primary flex items-center gap-1 hover:underline">
                          <RefreshCw className="h-3 w-3" /> Refresh
                        </button>
                      </label>
                      <div className="flex gap-3 items-center">
                        <div className="rounded border border-border bg-muted/30 px-4 py-2 font-mono text-sm tracking-wider select-none">
                          {captcha.question || "Loading..."}
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Answer"
                          value={captchaAnswer}
                          onChange={(e) => setCaptchaAnswer(e.target.value)}
                          className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-4 rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/95 transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Registering...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </form>
                )}

                {/* Google Sign-in Alternative */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/80" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-md border border-input bg-transparent hover:bg-muted py-2.5 text-sm font-medium text-foreground transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Chrome className="h-4 w-4" />}
                  Demo Account
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  </SiteLayout>
  );
}
