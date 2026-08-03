import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getCurrentUser, logoutUser, updateUserProfile, changeUserPassword, getUserSettings, saveUserSettings, requestDataDeletion, getMyDeletionRequests } from "@/server-fns/auth";
import { useLocale } from "@/i18n/useLocale";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import {
  getUserSubscriptions,
  getUserPendingSubscriptions,
  requestProductAccess,
  cancelUserSubscription,
  getProductVisibilities,
  getAllProducts,
  getServicesList,
  getUserNotifications,
  markNotificationAsRead,
  checkAndGenerateReminders,
  createCheckoutOrder,
  getUserOrders,
  getUserPayments,
  getUserFullSubscriptions,
} from "@/server-fns/admin";
import {
  getSupportTickets,
  raiseSupportTicket,
  assignSupportTicket,
  updateSupportTicketStatus,
  getSupportExecutives,
} from "@/server-fns/tickets";
import { AdminPanel } from "@/components/AdminPanel";
import { RAGChatbot } from "@/components/RAGChatbot";
import { EmployeeModule } from "@/components/EmployeeModule";
import { ManagerModule } from "@/components/ManagerModule";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { getCached, setCache, clearAllCache, CACHE_KEYS, CACHE_TTL } from "@/lib/cache";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Cpu,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Compass,
  FileCode2,
  LifeBuoy,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Sliders,
  ServerCrash,
  Chrome,
  CreditCard,
  Users,
  UserCheck,
  Layers,
  Brain,
  Shield,
  Database,
  Terminal,
  Network,
  Radio,
  Key,
  Activity,
  HelpCircle,
  Lock,
  Package,
  Globe,
  Box,
  Search,
  MessageSquare,
  FileText,
  Laptop,
  Maximize2,
  ExternalLink,
  Plus,
  Play,
  RotateCw,
  Loader2,
  Bell,
  DollarSign,
  Star,
  Calendar,
  History,
  FileSpreadsheet
} from "lucide-react";

export const Route = createFileRoute("/{-$locale}/dashboard")({
  component: DashboardPage,
  validateSearch: (search: Record<string, unknown>): { app?: string; tab?: string } => {
    return {
      app: (search.app as string) || undefined,
      tab: (search.tab as string) || undefined,
    };
  },
});

interface UserData {
  id: number;
  name: string;
  email: string;
  role?: string;
  mobile: string;
  address: string;
  profession: string;
  company_name: string;
  google_id?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  icon: any;
  icon_name?: string;
  type: string;
  desc: string;
  price: number;
}

// Icon name → component mapping for dynamic products from DB
const ICON_MAP: Record<string, any> = {
  CreditCard, Users, UserCheck, Layers, Brain, Shield, Database, Terminal,
  Network, Radio, Key, Activity, Lock, Package, Globe, Box, Search,
  MessageSquare, FileText, Laptop, Cpu, Compass, Settings, Mail,
};

export function resolveIcon(iconName: string): any {
  return ICON_MAP[iconName] || Package;
}

/** Convert DB product row to a ProductItem with resolved icon component */
function dbProductToItem(row: any): ProductItem {
  return {
    id: row.id,
    name: row.name,
    icon: resolveIcon(row.icon_name || "Package"),
    icon_name: row.icon_name,
    type: row.type,
    desc: row.description,
    price: Number(row.price),
  };
}

type UserProfileTabProps = {
  user: UserData;
  onProfileUpdated: (nextUser: UserData) => void;
};

function UserProfileTab({ user, onProfileUpdated }: UserProfileTabProps) {
  const [profileName, setProfileName] = useState(user.name || "");
  const [profileMobile, setProfileMobile] = useState(user.mobile || "");
  const [profileAddress, setProfileAddress] = useState(user.address || "");
  const [profileProfession, setProfileProfession] = useState(user.profession || "");
  const [profileCompany, setProfileCompany] = useState(user.company_name || "");
  const [submittingProfile, setSubmittingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    setProfileName(user.name || "");
    setProfileMobile(user.mobile || "");
    setProfileAddress(user.address || "");
    setProfileProfession(user.profession || "");
    setProfileCompany(user.company_name || "");
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) {
      setProfileError("Name cannot be empty.");
      return;
    }

    setSubmittingProfile(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      const res = await updateUserProfile({
        data: {
          name: profileName,
          mobile: profileMobile,
          address: profileAddress,
          profession: profileProfession,
          companyName: profileCompany
        }
      });

      if (res.success) {
        const nextUser = {
          ...user,
          name: profileName,
          mobile: profileMobile,
          address: profileAddress,
          profession: profileProfession,
          company_name: profileCompany
        };

        setProfileSuccess("Your profile details have been saved successfully!");
        onProfileUpdated(nextUser);
      } else {
        setProfileError("Could not update profile details.");
      }
    } catch (err: any) {
      setProfileError(err.message || "Failed to update profile.");
    } finally {
      setSubmittingProfile(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto rounded-xl border border-border bg-card shadow-lg overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary/30 to-cyan-500/20 relative" />

      <div className="p-6 md:p-8 relative -mt-16 space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="h-24 w-24 rounded-full border-4 border-card bg-muted flex items-center justify-center text-muted-foreground text-3xl font-black uppercase shadow-md select-none">
              {profileName ? profileName.slice(0, 2) : "ME"}
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{profileName || "System Developer"}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
              <span className="inline-block mt-2 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {user.role} License
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-4 pt-4 border-t border-border/50">
          {profileSuccess && (
            <div className="p-3 text-xs rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-500 font-medium">
              {profileSuccess}
            </div>
          )}
          {profileError && (
            <div className="p-3 text-xs rounded-lg border border-destructive/25 bg-destructive/10 text-destructive font-medium">
              {profileError}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Full Name</label>
              <input
                type="text"
                required
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs border border-border bg-card/50 rounded-lg text-foreground focus:outline-none focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Registered Email</label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full mt-1 px-3 py-2 text-xs border border-border bg-muted/30 rounded-lg text-muted-foreground cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Mobile Number</label>
              <input
                type="text"
                value={profileMobile}
                onChange={(e) => setProfileMobile(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full mt-1 px-3 py-2 text-xs border border-border bg-card/50 rounded-lg text-foreground focus:outline-none focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Profession</label>
              <input
                type="text"
                value={profileProfession}
                onChange={(e) => setProfileProfession(e.target.value)}
                placeholder="Software Engineer"
                className="w-full mt-1 px-3 py-2 text-xs border border-border bg-card/50 rounded-lg text-foreground focus:outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Company Name</label>
              <input
                type="text"
                value={profileCompany}
                onChange={(e) => setProfileCompany(e.target.value)}
                placeholder="Enterprise Inc."
                className="w-full mt-1 px-3 py-2 text-xs border border-border bg-card/50 rounded-lg text-foreground focus:outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Billing Address</label>
              <textarea
                rows={2.5}
                value={profileAddress}
                onChange={(e) => setProfileAddress(e.target.value)}
                placeholder="Suite 100, 123 Dev Lane"
                className="w-full mt-1 px-3 py-2 text-xs border border-border bg-card/50 rounded-lg text-foreground focus:outline-none focus:border-primary transition-all resize-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={submittingProfile}
              className="bg-primary text-primary-foreground font-bold px-6 py-2 rounded-lg text-xs hover:bg-primary/95 transition-all shadow flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {submittingProfile && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Save Profile Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PortalSettingsTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPass, setUpdatingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [portalTheme, setPortalTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";

    const savedTheme = window.localStorage.getItem("portal-theme");
    if (savedTheme) return savedTheme;

    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  const [deletionReason, setDeletionReason] = useState("");
  const [submittingDeletion, setSubmittingDeletion] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState<string | null>(null);
  const [deletionError, setDeletionError] = useState<string | null>(null);
  const [myDeletionRequests, setMyDeletionRequests] = useState<any[]>([]);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const fetchDeletionRequests = async () => {
    try {
      const res = await getMyDeletionRequests();
      setMyDeletionRequests(res);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitDeletion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deletionReason.trim()) {
      setDeletionError("Please provide a reason for the data deletion request.");
      return;
    }

    setSubmittingDeletion(true);
    setDeletionError(null);
    setDeletionSuccess(null);

    try {
      const res = await requestDataDeletion({ data: { reason: deletionReason } });
      if (res.success) {
        setDeletionSuccess("Your deletion request has been submitted to the admin.");
        setDeletionReason("");
        fetchDeletionRequests();
      } else {
        setDeletionError("Failed to submit request.");
      }
    } catch (err: any) {
      setDeletionError(err.message || "Failed to submit request.");
    } finally {
      setSubmittingDeletion(false);
    }
  };


  useEffect(() => {
    const resolvedTheme =
      portalTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : portalTheme;

    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.dataset.portalTheme = portalTheme;
    window.localStorage.setItem("portal-theme", portalTheme);
  }, [portalTheme]);

  useEffect(() => {
    let isActive = true;

    fetchDeletionRequests();

    getUserSettings()
      .then((s) => {
        if (!isActive) return;

        setEmailAlerts(s.emailAlerts);
        setSmsAlerts(s.smsAlerts);
        setSecurityAlerts(s.securityAlerts);
        const savedTheme = window.localStorage.getItem("portal-theme") || s.portalTheme;
        setPortalTheme(savedTheme);
        setLoadingSettings(false);
      })
      .catch(() => {
        if (!isActive) return;

        setSettingsError("Failed to load settings.");
        setLoadingSettings(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const handleSavePrefs = async (
    emailVal = emailAlerts,
    smsVal = smsAlerts,
    secVal = securityAlerts,
    themeVal = portalTheme
  ) => {
    setSavingSettings(true);
    setSettingsSuccess(null);
    setSettingsError(null);

    try {
      const res = await saveUserSettings({
        data: {
          emailAlerts: emailVal,
          smsAlerts: smsVal,
          securityAlerts: secVal,
          portalTheme: themeVal
        }
      });

      if (res.success) {
        setSettingsSuccess("Your preferences have been saved successfully!");
      } else {
        setSettingsError("Could not save preferences.");
      }
    } catch (err: any) {
      setSettingsError(err.message || "Failed to save preferences.");
    } finally {
      setSavingSettings(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPassError("Current password is required.");
      return;
    }
    if (newPassword.length < 6) {
      setPassError("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassError("New passwords do not match.");
      return;
    }

    setUpdatingPass(true);
    setPassError(null);
    setPassSuccess(null);

    try {
      const res = await changeUserPassword({
        data: {
          current: currentPassword,
          new: newPassword
        }
      });

      if (res.success) {
        setPassSuccess("Password has been changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPassError("Failed to update password.");
      }
    } catch (err: any) {
      setPassError(err.message || "Failed to change password.");
    } finally {
      setUpdatingPass(false);
    }
  };

  if (loadingSettings) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {settingsSuccess && (
        <div className="p-3 text-xs rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-500 font-medium">
          {settingsSuccess}
        </div>
      )}
      {settingsError && (
        <div className="p-3 text-xs rounded-lg border border-destructive/25 bg-destructive/10 text-destructive font-medium">
          {settingsError}
        </div>
      )}

      <div className="rounded-xl border border-border bg-card p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Security Settings</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-6">
          Update your login credentials securely. Password changes take effect immediately on subsequent sessions.
        </p>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          {passSuccess && (
            <div className="p-3 text-xs rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-500 font-medium">
              {passSuccess}
            </div>
          )}
          {passError && (
            <div className="p-3 text-xs rounded-lg border border-destructive/25 bg-destructive/10 text-destructive font-medium">
              {passError}
            </div>
          )}

          <div className="grid gap-4">
            <div>
              <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs border border-border bg-card/50 rounded-lg text-foreground focus:outline-none focus:border-primary transition-all"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs border border-border bg-card/50 rounded-lg text-foreground focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs border border-border bg-card/50 rounded-lg text-foreground focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={updatingPass}
              className="bg-primary text-primary-foreground font-bold px-6 py-2 rounded-lg text-xs hover:bg-primary/95 transition-all shadow flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {updatingPass && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Update Password
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Notification Preferences</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-6">
          Configure which alerts you receive and via which delivery channels.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-card/30">
            <div>
              <span className="text-xs font-bold text-foreground block">Email Notifications</span>
              <span className="text-[10px] text-muted-foreground mt-0.5 block">Receive renewal invoice logs, order confirmations, and security alerts.</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              disabled={savingSettings}
              onChange={(e) => {
                const val = e.target.checked;
                setEmailAlerts(val);
                handleSavePrefs(val, smsAlerts, securityAlerts, portalTheme);
              }}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer disabled:opacity-50"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-card/30">
            <div>
              <span className="text-xs font-bold text-foreground block">SMS Subscriptions Reminders</span>
              <span className="text-[10px] text-muted-foreground mt-0.5 block">Receive billing alerts on your registered mobile number 7 days prior to expiry.</span>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              disabled={savingSettings}
              onChange={(e) => {
                const val = e.target.checked;
                setSmsAlerts(val);
                handleSavePrefs(emailAlerts, val, securityAlerts, portalTheme);
              }}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer disabled:opacity-50"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-card/30">
            <div>
              <span className="text-xs font-bold text-foreground block">Critical Security Alerts</span>
              <span className="text-[10px] text-muted-foreground mt-0.5 block">Immediate notifications for account metadata changes and password modifications.</span>
            </div>
            <input
              type="checkbox"
              checked={securityAlerts}
              disabled={savingSettings}
              onChange={(e) => {
                const val = e.target.checked;
                setSecurityAlerts(val);
                handleSavePrefs(emailAlerts, smsAlerts, val, portalTheme);
              }}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Portal Appearance</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Select your preferred layout theme style for the developer sandbox environment.
        </p>

        <div className="grid grid-cols-3 gap-3">
          {["light", "dark", "system"].map((themeOption) => (
            <button
              key={themeOption}
              type="button"
              disabled={savingSettings}
              onClick={() => {
                setPortalTheme(themeOption);
                handleSavePrefs(emailAlerts, smsAlerts, securityAlerts, themeOption);
              }}
              className={`p-3 rounded-lg border text-xs font-bold uppercase transition-all text-center disabled:opacity-50 ${
                portalTheme === themeOption
                  ? "border-primary bg-primary/10 text-primary shadow"
                  : "border-border bg-card/45 hover:bg-muted text-muted-foreground"
              }`}
            >
              {themeOption}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Privacy & Data Control</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-6">
          Manage your personal data, view our privacy practices, or request permanent account deletion.
        </p>

        <div className="space-y-4">
          {/* Privacy Policy Accordion Button */}
          <div className="border border-border rounded-lg overflow-hidden bg-card/30">
            <button
              type="button"
              onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}
              className="w-full flex items-center justify-between p-3 text-xs font-bold text-foreground hover:bg-muted/50 transition-colors"
            >
              <span>View Privacy Policy & Compliance Terms</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showPrivacyPolicy ? "rotate-180" : ""}`} />
            </button>
            
            {showPrivacyPolicy && (
              <div className="p-4 border-t border-border bg-card/10 text-xs text-muted-foreground space-y-3 max-h-60 overflow-y-auto leading-relaxed">
                <p className="font-semibold text-foreground">Last Updated: July 2026</p>
                <p>
                  At MHTECHIN, we prioritize your data security and privacy. This Privacy Policy details how we collect, process, and protect your enterprise and personal data when using the partner developer sandbox.
                </p>
                <h4 className="font-bold text-foreground mt-2">1. Data Collection</h4>
                <p>
                  We collect account identifiers (email, name, mobile), subscription telemetry, developer settings, database preferences, and access logs to maintain security audits and ensure policy compliance.
                </p>
                <h4 className="font-bold text-foreground mt-2">2. Processing & Usage</h4>
                <p>
                  Your information is processed to manage product access, deliver billing updates via email/SMS, enforce security protocols, and display appropriate layout options in the sandbox.
                </p>
                <h4 className="font-bold text-foreground mt-2">3. User Rights & Data Deletion</h4>
                <p>
                  Under regional regulatory frameworks, you maintain the right to view, download, or delete your account records. Requesting data deletion initiates a purge request reviewed by administrative compliance officers.
                </p>
              </div>
            )}
          </div>

          {/* Delete Data Request Form */}
          <div className="border border-destructive/20 rounded-lg p-4 bg-destructive/5 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-destructive block">Request Account & Data Deletion</h4>
              <p className="text-[10px] text-muted-foreground mt-1">
                Submitting this request will flag your account for removal. An administrator will review and execute the deletion, permanently wiping your profile, active plans, and billing configurations.
              </p>
            </div>

            {deletionSuccess && (
              <div className="p-3 text-xs rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-500 font-medium">
                {deletionSuccess}
              </div>
            )}
            {deletionError && (
              <div className="p-3 text-xs rounded-lg border border-destructive/25 bg-destructive/10 text-destructive font-medium">
                {deletionError}
              </div>
            )}

            <form onSubmit={handleSubmitDeletion} className="space-y-3">
              <div>
                <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Reason for Deletion Request</label>
                <textarea
                  required
                  rows={3}
                  value={deletionReason}
                  onChange={(e) => setDeletionReason(e.target.value)}
                  placeholder="Tell us why you would like your account and data to be deleted..."
                  className="w-full mt-1 px-3 py-2 text-xs border border-border bg-card/50 rounded-lg text-foreground focus:outline-none focus:border-destructive transition-all"
                />
              </div>

              <div className="flex justify-between items-center pt-1">
                {/* Deletion Request Status List */}
                <div className="text-[10px]">
                  {myDeletionRequests.length > 0 ? (
                    myDeletionRequests[0].status === "pending" ? (
                      <span className="text-amber-500 font-semibold flex items-center gap-1">
                        ⚠️ Deletion Request Pending Review
                      </span>
                    ) : (
                      <span className="text-emerald-500 font-semibold">
                        ✓ Request status: {myDeletionRequests[0].status}
                      </span>
                    )
                  ) : (
                    <span className="text-muted-foreground">No active deletion requests</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submittingDeletion}
                  className="bg-destructive text-destructive-foreground font-bold px-4 py-2 rounded-lg text-xs hover:bg-destructive/90 transition-all shadow flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {submittingDeletion && <Loader2 className="h-3 w-3 animate-spin" />}
                  Submit Deletion Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const { lp } = useLocale();
  const { app, tab } = Route.useSearch();

  const clearAppSearch = () => {
    navigate({
      from: Route.fullPath,
      to: ".",
      search: (prev: any) => ({ ...prev, app: undefined })
    }).catch(console.error);
  };

  const switchTab = (tabName: string, clearApp: boolean = true) => {
    setActiveSubTab(tabName);
    navigate({
      from: Route.fullPath,
      to: ".",
      search: (prev: any) => ({
        ...prev,
        tab: tabName,
        app: clearApp ? undefined : prev.app
      })
    }).catch(console.error);
  };

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<string>(tab || "overview");

  useEffect(() => {
    if (tab) {
      setActiveSubTab(tab);
    }
  }, [tab]);

  // Dynamic products from DB
  const [PRODUCTS, setProducts] = useState<ProductItem[]>([]);

  // Subscribed & pending products state
  const [purchasedApps, setPurchasedApps] = useState<string[]>([]);
  const [pendingApps, setPendingApps] = useState<string[]>([]);
  const [productVisibilities, setProductVisibilities] = useState<any[]>([]);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Selected app modal state (Popup webview)
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  // Billing interactive lists
  const [invoices, setInvoices] = useState([
    { id: "INV-8972", date: "2026-07-01", amount: 3344.00, status: "Paid" },
    { id: "INV-8411", date: "2026-06-01", amount: 3344.00, status: "Paid" },
  ]);

  // AI Inference console input / output
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiRunning, setAiRunning] = useState(false);

  // Billing dynamic demo invoice creation
  const [billingInvoices, setBillingInvoices] = useState([
    { id: "INV-902", desc: "Monthly Portal Sync", amt: 120.00, status: "Paid" },
    { id: "INV-901", desc: "Cloud OS Node Reservation", amt: 379.00, status: "Paid" }
  ]);

  // HRM mock staff
  const [hrmStaff, setHrmStaff] = useState([
    { name: "Sarah Connor", role: "SRE Lead", dept: "Ops" },
    { name: "John Connor", role: "DevOps Engineer", dept: "Ops" },
    { name: "Miles Dyson", role: "AI Specialist", dept: "R&D" }
  ]);
  const [payrollSuccess, setPayrollSuccess] = useState(false);

  // Generic diagnostic logs
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);
  const [diagnosticRunning, setDiagnosticRunning] = useState(false);

  // Services catalog from DB
  const [servicesList, setServicesList] = useState<any[]>([]);

  // User notifications & reminders
  const [notificationsList, setNotificationsList] = useState<any[]>([]);

  // User orders and payments history
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [paymentsList, setPaymentsList] = useState<any[]>([]);
  const [fullSubsList, setFullSubsList] = useState<any[]>([]);

  // Support Tickets States
  const [ticketsList, setTicketsList] = useState<any[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketDescription, setNewTicketDescription] = useState("");
  const [newTicketCategory, setNewTicketCategory] = useState("General");
  const [raisingTicket, setRaisingTicket] = useState(false);
  const [executivesList, setExecutivesList] = useState<any[]>([]);

  // Selected item to purchase (in checkout flow)
  const [checkoutItem, setCheckoutItem] = useState<{
    id: string;
    name: string;
    price: number;
    type: "product" | "service";
    icon_name?: string;
  } | null>(null);

  // Selected invoice to view/print
  const [activeInvoice, setActiveInvoice] = useState<any | null>(null);

  // Service search/filter states
  const [serviceSearch, setServiceSearch] = useState("");
  const [serviceCategory, setServiceCategory] = useState("All");
  const [serviceMaxPrice, setServiceMaxPrice] = useState(5000);

  // Checkout states
  const [paymentMethod, setPaymentMethod] = useState("gpay");
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [checkoutSubmitting, setCheckoutSubmitting] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<any | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Billing address form
  const [billingName, setBillingName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [billingMobile, setBillingMobile] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCompany, setBillingCompany] = useState("");
  const [billingProfession, setBillingProfession] = useState("");

  useEffect(() => {
    if (user) {
      setBillingName(user.name || "");
      setBillingEmail(user.email || "");
      setBillingMobile(user.mobile || "");
      setBillingAddress(user.address || "");
      setBillingCompany(user.company_name || "");
      setBillingProfession(user.profession || "");
    }
  }, [user]);

  const refreshUserData = () => {
    getUserSubscriptions().then((subs) => setPurchasedApps(subs)).catch(console.error);
    getUserPendingSubscriptions().then((pending) => setPendingApps(pending)).catch(console.error);
    getUserNotifications().then((notes) => setNotificationsList(notes)).catch(console.error);
    getUserOrders().then((ords) => setOrdersList(ords)).catch(console.error);
    getUserPayments().then((pyms) => setPaymentsList(pyms)).catch(console.error);
    getUserFullSubscriptions().then((fsubs) => setFullSubsList(fsubs)).catch(console.error);
    
    // Support Tickets
    setTicketsLoading(true);
    getSupportTickets()
      .then((tkts) => setTicketsList(tkts))
      .catch(console.error)
      .finally(() => setTicketsLoading(false));

    if (user && user.role?.trim().toLowerCase() === "admin") {
      getSupportExecutives()
        .then((execs) => setExecutivesList(execs))
        .catch(console.error);
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutItem) return;
    
    // Validations
    if (!billingName.trim() || !billingEmail.trim()) {
      setCheckoutError("Billing Name and Email are required.");
      return;
    }
    if (paymentMethod === "card" || paymentMethod === "debit") {
      if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        setCheckoutError("Please provide all card details.");
        return;
      }
    }

    setCheckoutSubmitting(true);
    setCheckoutError(null);
    setCheckoutResult(null);

    try {
      const res = await createCheckoutOrder({
        data: {
          itemId: checkoutItem.id,
          itemType: checkoutItem.type,
          quantity: 1,
          paymentMethod,
          simulateFailure,
          billingDetails: {
            name: billingName,
            email: billingEmail,
            mobile: billingMobile,
            address: billingAddress,
            company: billingCompany,
            profession: billingProfession
          }
        }
      });

      if (res.success) {
        setCheckoutResult(res);
        refreshUserData(); // Refresh subscriptions, orders, payments
      } else {
        setCheckoutError("Payment simulation failed. Transaction was logged as failed.");
      }
    } catch (err: any) {
      setCheckoutError(err.message || "Failed to process order.");
    } finally {
      setCheckoutSubmitting(false);
    }
  };

  const handleRaiseTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketDescription.trim()) {
      toast.error("Subject and Description are required.");
      return;
    }
    setRaisingTicket(true);
    try {
      const res = await raiseSupportTicket({
        data: {
          subject: newTicketSubject,
          description: newTicketDescription,
          category: newTicketCategory
        }
      });
      if (res.success) {
        toast.success(`Support Ticket #${res.ticketId} raised successfully!`);
        setNewTicketSubject("");
        setNewTicketDescription("");
        setNewTicketCategory("General");
        getSupportTickets().then((tkts) => setTicketsList(tkts)).catch(console.error);
      } else {
        toast.error("Failed to raise ticket.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to raise ticket.");
    } finally {
      setRaisingTicket(false);
    }
  };

  const handleUpdateTicketStatus = async (ticketId: number, status: string) => {
    try {
      const res = await updateSupportTicketStatus({ data: { ticketId, status } });
      if (res.success) {
        toast.success(`Ticket status updated to ${status}`);
        getSupportTickets().then((tkts) => setTicketsList(tkts)).catch(console.error);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const handleAssignTicket = async (ticketId: number, assignedTo: number | null) => {
    try {
      const res = await assignSupportTicket({ data: { ticketId, assignedTo } });
      if (res.success) {
        toast.success("Ticket assignment updated");
        getSupportTickets().then((tkts) => setTicketsList(tkts)).catch(console.error);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to assign ticket");
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markNotificationAsRead({ data: { id } });
      setNotificationsList(notificationsList.map(n => n.id === id ? { ...n, is_read: 1 } : n));
    } catch (err: any) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  useEffect(() => {
    // 1. Load cached data immediately for fast render
    const cachedUser = getCached<UserData>(CACHE_KEYS.USER);
    const cachedSubs = getCached<string[]>(CACHE_KEYS.SUBSCRIPTIONS);
    const cachedPending = getCached<string[]>(CACHE_KEYS.PENDING_SUBS);
    const cachedProducts = getCached<any[]>(CACHE_KEYS.PRODUCTS);
    const cachedVis = getCached<any[]>(CACHE_KEYS.VISIBILITIES);

    if (cachedUser) setUser(cachedUser);
    if (cachedSubs) setPurchasedApps(cachedSubs);
    if (cachedPending) setPendingApps(cachedPending);
    if (cachedProducts) setProducts(cachedProducts.map(dbProductToItem));
    if (cachedVis) setProductVisibilities(cachedVis);

    // 2. Then refresh from server parallelly
    getCurrentUser()
      .then((u) => {
        if (!u) {
          navigate({ to: lp("/auth") });
        } else {
          setUser(u as UserData);
          setCache(CACHE_KEYS.USER, u, CACHE_TTL.SHORT);

          Promise.all([
            getUserSubscriptions(),
            getUserPendingSubscriptions(),
            getProductVisibilities(),
            getAllProducts(),
            getServicesList(),
            getUserOrders(),
            getUserPayments(),
            getUserFullSubscriptions(),
            checkAndGenerateReminders()
          ]).then(([subs, pending, vis, prods, svcs, ords, pyms, fsubs]) => {
            setPurchasedApps(subs);
            setCache(CACHE_KEYS.SUBSCRIPTIONS, subs, CACHE_TTL.SHORT);

            setPendingApps(pending);
            setCache(CACHE_KEYS.PENDING_SUBS, pending, CACHE_TTL.SHORT);

            setProductVisibilities(vis);
            setCache(CACHE_KEYS.VISIBILITIES, vis, CACHE_TTL.MEDIUM);

            setProducts(prods.map(dbProductToItem));
            setCache(CACHE_KEYS.PRODUCTS, prods, CACHE_TTL.LONG);

            setServicesList(svcs);
            setOrdersList(ords);
            setPaymentsList(pyms);
            setFullSubsList(fsubs);

            getUserNotifications()
              .then((notes) => setNotificationsList(notes))
              .catch(console.error);

            getSupportTickets()
              .then((tkts) => setTicketsList(tkts))
              .catch(console.error);

            if (u.role?.trim().toLowerCase() === "admin") {
              getSupportExecutives()
                .then((execs) => setExecutivesList(execs))
                .catch(console.error);
            }
          }).catch(console.error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Sync active tab with search parameter if present
  useEffect(() => {
    if (app) {
      setActiveSubTab("services");
    }
  }, [app]);

  // Real-time telemetry state for live updating Overview cards
  const [telemetry, setTelemetry] = useState({
    cpuUsage: 34,
    vramUsage: 42,
    networkRate: 2.4,
    latencyMs: 12,
    requestsPerMin: 2840,
    activeConnections: 142,
    lastUpdated: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const cpuDiff = Math.floor(Math.random() * 7) - 3;
        const vramDiff = Math.floor(Math.random() * 5) - 2;
        const netDiff = Number((Math.random() * 0.4 - 0.2).toFixed(1));
        const latencyDiff = Math.floor(Math.random() * 5) - 2;
        const reqDiff = Math.floor(Math.random() * 40) - 20;
        const connDiff = Math.floor(Math.random() * 7) - 3;

        return {
          cpuUsage: Math.min(85, Math.max(18, prev.cpuUsage + cpuDiff)),
          vramUsage: Math.min(90, Math.max(25, prev.vramUsage + vramDiff)),
          networkRate: Number(Math.min(5.0, Math.max(1.2, prev.networkRate + netDiff)).toFixed(1)),
          latencyMs: Math.min(35, Math.max(6, prev.latencyMs + latencyDiff)),
          requestsPerMin: Math.min(5000, Math.max(1500, prev.requestsPerMin + reqDiff)),
          activeConnections: Math.min(300, Math.max(80, prev.activeConnections + connDiff)),
          lastUpdated: new Date().toLocaleTimeString(),
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    clearAllCache();
    await logoutUser();
    navigate({ to: lp("/auth") });
  };

  // Request access (creates pending subscription)
  const requestAccess = async (prodId: string) => {
    setActionLoadingId(prodId);
    try {
      await requestProductAccess({ data: { productId: prodId } });
      setPendingApps([...pendingApps, prodId]);
      setCache(CACHE_KEYS.PENDING_SUBS, [...pendingApps, prodId], CACHE_TTL.SHORT);

      import("sonner").then(({ toast }) => {
        toast.success("Access request sent! Waiting for admin approval.");
      });
    } catch (e: any) {
      import("sonner").then(({ toast }) => {
        toast.error(e.message || "Failed to request access");
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Cancel approved subscription
  const cancelSubscription = async (prodId: string) => {
    setActionLoadingId(prodId);
    try {
      await cancelUserSubscription({ data: { productId: prodId } });
      setPurchasedApps(purchasedApps.filter((id) => id !== prodId));
      setPendingApps(pendingApps.filter((id) => id !== prodId));
      setCache(CACHE_KEYS.SUBSCRIPTIONS, purchasedApps.filter((id) => id !== prodId), CACHE_TTL.SHORT);
      setCache(CACHE_KEYS.PENDING_SUBS, pendingApps.filter((id) => id !== prodId), CACHE_TTL.SHORT);

      import("sonner").then(({ toast }) => {
        toast.success("Subscription canceled successfully!");
      });
    } catch (e: any) {
      import("sonner").then(({ toast }) => {
        toast.error(e.message || "Failed to cancel subscription");
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleAiInference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setAiRunning(true);
    setAiResponse("");
    
    // Simulate streaming inference
    const fullText = `[Inference complete using MHTech-LLM-v2]\n\nProcessing prompt: "${aiPrompt}"\n\nResult:\nEnterprise clusters evaluated successfully. The vector coordinates align with target mTLS endpoints. No bottlenecks detected. CPU cores stable.`;
    let i = 0;
    const interval = setInterval(() => {
      setAiResponse((prev) => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setAiRunning(false);
      }
    }, 15);
  };

  const handleRunDiagnostics = () => {
    setDiagnosticRunning(true);
    setDiagnosticLogs([]);
    const logLines = [
      "Initializing connection sandbox...",
      "Resolving DNS cluster endpoints...",
      "Validating JWT keys and permission trees...",
      "System check complete. Nodes are healthy."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setDiagnosticLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${logLines[i]}`]);
      i++;
      if (i >= logLines.length) {
        clearInterval(interval);
        setDiagnosticRunning(false);
      }
    }, 600);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex bg-background text-foreground animate-pulse">
        {/* Sidebar Skeleton */}
        <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/60 p-6 space-y-6">
          <div className="h-7 w-32 bg-muted rounded" />
          <div className="space-y-3.5 pt-6">
            <div className="h-9 w-full bg-muted rounded" />
            <div className="h-9 w-full bg-muted rounded" />
            <div className="h-9 w-full bg-muted rounded" />
            <div className="h-9 w-full bg-muted rounded" />
            <div className="h-9 w-full bg-muted rounded" />
          </div>
          <div className="mt-auto h-12 w-full bg-muted rounded" />
        </aside>

        {/* Main Body Skeleton */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/80">
            <div className="h-6 w-24 bg-muted rounded" />
            <div className="h-8 w-24 bg-muted rounded-full" />
          </header>
          
          <main className="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
            {/* Banner Skeleton */}
            <div className="h-32 w-full border border-border bg-card/40 rounded-2xl p-6 flex flex-col justify-center space-y-3">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-7 w-64 bg-muted rounded" />
              <div className="h-4 w-96 bg-muted rounded" />
            </div>

            {/* Grid Cards Skeleton */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="h-28 border border-border bg-card/40 rounded-xl p-5" />
              <div className="h-28 border border-border bg-card/40 rounded-xl p-5" />
              <div className="h-28 border border-border bg-card/40 rounded-xl p-5" />
              <div className="h-28 border border-border bg-card/40 rounded-xl p-5" />
            </div>

            {/* Sub-body row Skeleton */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 h-64 border border-border bg-card/40 rounded-xl p-6" />
              <div className="h-64 border border-border bg-card/40 rounded-xl p-6" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
        <p className="text-sm font-semibold text-foreground mb-1">Authenticating session...</p>
        <p className="text-xs text-muted-foreground mb-4">If you are not redirected automatically, please click below.</p>
        <button
          onClick={() => navigate({ to: lp("/auth") })}
          className="px-4 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors"
        >
          Return to Login
        </button>
      </div>
    );
  }

  // Active fullscreen sandbox application
  const activeApp = PRODUCTS.find((p) => p.id === app);

  // Visibility controls mapping
  const visibleProducts = PRODUCTS.filter((item) => {
    const vis = productVisibilities.find((v) => v.product_id === item.id);
    return vis ? Boolean(vis.is_visible) : true;
  });

  const billingProducts = PRODUCTS.filter((item) => {
    const isSubscribed = purchasedApps.includes(item.id);
    const vis = productVisibilities.find((v) => v.product_id === item.id);
    const isVisible = vis ? Boolean(vis.is_visible) : true;
    return isVisible || isSubscribed;
  });

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* MOBILE SIDEBAR TOGGLE OVERLAY */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* LEFT-SIDE NAVIGATION PANEL */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card/60 backdrop-blur-xl transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <div className="flex items-center">
            <img src={logo} alt="MHTECHIN" className="h-7 w-auto" style={{ filter: "invert(1)" }} />
          </div>
          <button className="md:hidden text-foreground p-1" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto max-h-[calc(100vh-160px)]">
          <button
            onClick={() => { switchTab("overview"); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
              activeSubTab === "overview" && !app ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </button>

          <button
            onClick={() => { switchTab("products"); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
              activeSubTab === "products" && !app ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Cpu className="h-4 w-4" />
            Products
          </button>

          <button
            onClick={() => { switchTab("services"); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
              activeSubTab === "services" && !app ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Compass className="h-4 w-4" />
            Services
          </button>

          <button
            onClick={() => { switchTab("orders"); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
              activeSubTab === "orders" && !app ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <FileText className="h-4 w-4" />
            Orders
          </button>

          <button
            onClick={() => { switchTab("tickets"); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
              activeSubTab === "tickets" && !app ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <LifeBuoy className="h-4 w-4" />
            Support Tickets
          </button>

          <button
            onClick={() => { switchTab("payments"); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
              activeSubTab === "payments" && !app ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <CreditCard className="h-4 w-4" />
            Payments
          </button>

          <button
            onClick={() => { switchTab("subscriptions"); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
              activeSubTab === "subscriptions" && !app ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <RotateCw className="h-4 w-4" />
            Subscriptions
          </button>

          <button
            onClick={() => { switchTab("notifications"); setSidebarOpen(false); }}
            className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
              activeSubTab === "notifications" && !app ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4" />
              Notifications
            </div>
            {notificationsList.filter(n => !n.is_read).length > 0 && (
              <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                {notificationsList.filter(n => !n.is_read).length}
              </span>
            )}
          </button>

          {user.role === "admin" && (
            <>
              <button
                onClick={() => { switchTab("user-management"); setSidebarOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
                  activeSubTab === "user-management" && !app ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Users className="h-4 w-4" />
                User Management
              </button>

              <button
                onClick={() => { switchTab("analytics"); setSidebarOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
                  activeSubTab === "analytics" && !app ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                Analytics
              </button>
            </>
          )}

          <button
            onClick={() => { switchTab("profile"); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
              activeSubTab === "profile" && !app ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <User className="h-4 w-4" />
            My Profile
          </button>

          <button
            onClick={() => { switchTab("settings"); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
              activeSubTab === "settings" && !app ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </nav>

        {/* Sidebar Footer User Card */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
              {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate leading-none">{user?.name || user?.email || "User"}</p>
              <p className="text-[10px] text-muted-foreground truncate mt-1">{user?.email || ""}</p>
            </div>
            <button onClick={handleLogout} className="text-muted-foreground hover:text-destructive p-1.5" title="Log Out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN LAYOUT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP PANEL NAVIGATION */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-foreground p-1" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-bold tracking-tight capitalize">
              {app ? `${activeApp?.name} Sandbox` : activeSubTab === "products" ? "Products" : activeSubTab === "user-management" ? "User Management" : activeSubTab === "tickets" ? "Support Tickets" : activeSubTab}
            </h1>
          </div>

          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-full border border-border bg-card/60 pl-2 pr-3 py-1 hover:bg-muted transition-colors text-sm font-semibold"
            >
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[100px] truncate hidden sm:inline">{(user?.name || user?.email || "User").split(" ")[0]}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-card p-1 shadow-2xl z-50">
                <button 
                  onClick={() => { switchTab("profile"); setProfileOpen(false); }}
                  className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
                >
                  <User className="h-4 w-4" />
                  My Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* PORTAL BODY CONTENT */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
          
          {/* SANDBOX APP VIEW (FULL SCREEN CONTENT PRESENTS DIRECTLY) */}
          {app && activeApp ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <activeApp.icon className="h-5 w-5 text-primary animate-pulse" />
                    {activeApp.name} Console
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">Live client sandbox fitted to portal. Top navigation and sidebar controls are preserved.</p>
                </div>
                <button 
                  onClick={() => clearAppSearch()}
                  className="text-xs font-semibold px-3 py-1.5 border border-border bg-transparent hover:bg-muted rounded"
                >
                  ← Exit Sandbox
                </button>
              </div>

              {/* MOCK APPLICATION SANDBOX FRAMES */}
              <div className="rounded-xl border border-border bg-card p-6 min-h-[500px]">
                
                {/* 1. BILLING SYSTEM SANDBOX */}
                {activeApp.id === "billing-system" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded border bg-muted/30">
                        <span className="text-xs text-muted-foreground font-semibold">Total Revenue (MRR)</span>
                        <h4 className="text-xl font-extrabold mt-2 text-emerald-500">$12,450.00</h4>
                      </div>
                      <div className="p-4 rounded border bg-muted/30">
                        <span className="text-xs text-muted-foreground font-semibold">Active Subscriptions</span>
                        <h4 className="text-xl font-extrabold mt-2">18 clients</h4>
                      </div>
                      <div className="p-4 rounded border bg-muted/30">
                        <span className="text-xs text-muted-foreground font-semibold">Gateway Status</span>
                        <h4 className="text-xl font-extrabold mt-2 text-emerald-500">Online</h4>
                      </div>
                    </div>

                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="bg-muted/40 px-4 py-3 flex justify-between items-center border-b border-border">
                        <h4 className="text-sm font-bold">Ledger Transactions</h4>
                        <button 
                          onClick={() => {
                            const newBill = {
                              id: `INV-${Math.floor(Math.random() * 800) + 100}`,
                              desc: "Test Webhook Ingestion API charge",
                              amt: (Math.random() * 200 + 40).toFixed(2) as any,
                              status: "Paid"
                            };
                            setBillingInvoices([newBill, ...billingInvoices]);
                          }}
                          className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded flex items-center gap-1 font-semibold hover:bg-primary/95"
                        >
                          <Plus className="h-3 w-3" /> Simulate Transaction
                        </button>
                      </div>
                      <div className="divide-y divide-border bg-card px-4">
                        {billingInvoices.map((b) => (
                          <div key={b.id} className="py-3 flex justify-between text-xs items-center">
                            <div>
                              <span className="font-mono text-primary font-bold mr-2">{b.id}</span>
                              <span className="text-foreground">{b.desc}</span>
                            </div>
                            <div className="flex gap-4 items-center">
                              <span className="font-bold text-foreground">${b.amt}</span>
                              <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{b.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CRM PORTAL SANDBOX */}
                {activeApp.id === "crm-portal" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-4">
                      {["New Leads", "Contacted", "Proposal Sent", "Closed Won"].map((stage, idx) => (
                        <div key={stage} className="p-4 rounded border bg-muted/20 flex flex-col justify-between min-h-[220px]">
                          <div>
                            <div className="flex justify-between items-center border-b border-border pb-2 mb-3">
                              <span className="text-xs font-bold text-foreground">{stage}</span>
                              <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded">{idx * 2 + 1}</span>
                            </div>
                            <div className="space-y-2">
                              {idx === 0 && (
                                <div className="p-2 border rounded bg-card text-xs">
                                  <p className="font-semibold">Bruce Wayne</p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">Wayne Enterprises</p>
                                </div>
                              )}
                              {idx === 1 && (
                                <div className="p-2 border rounded bg-card text-xs">
                                  <p className="font-semibold">Clark Kent</p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">Daily Planet</p>
                                </div>
                              )}
                              {idx === 2 && (
                                <div className="p-2 border rounded bg-card text-xs">
                                  <p className="font-semibold">Diana Prince</p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">Themyscira Corp</p>
                                </div>
                              )}
                              {idx === 3 && (
                                <div className="p-2 border rounded bg-card text-xs border-emerald-500/30">
                                  <p className="font-semibold">Tony Stark</p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">Stark Industries</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <button className="text-[10px] font-semibold text-primary text-left mt-4 hover:underline">+ Add Lead</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. HRM MANAGEMENT SUITE */}
                {activeApp.id === "hrm-suite" && (
                  <div className="space-y-8">
                    <EmployeeModule />
                    <ManagerModule />
                  </div>
                )}

                {/* 4. RAG AI CHATBOT STUDIO */}
                {activeApp.id === "ai-studio" && (
                  <div className="space-y-4">
                    <RAGChatbot />
                  </div>
                )}

                {/* 5. GENERIC APP DIAGNOSTIC SANDBOX */}
                {activeApp.id !== "billing-system" && activeApp.id !== "crm-portal" && activeApp.id !== "hrm-suite" && activeApp.id !== "ai-studio" && (
                  <div className="space-y-6">
                    <div className="p-4 rounded border bg-muted/10 flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-bold">Diagnostics Console</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">Stream pipeline testing logs and confirm service availability.</p>
                      </div>
                      <button
                        onClick={handleRunDiagnostics}
                        disabled={diagnosticRunning}
                        className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded flex items-center gap-1.5 hover:bg-primary/95 disabled:opacity-50"
                      >
                        <RotateCw className={`h-3 w-3 ${diagnosticRunning ? 'animate-spin' : ''}`} />
                        {diagnosticRunning ? "Testing..." : "Test Connection"}
                      </button>
                    </div>

                    <div className="rounded border border-border bg-black/90 p-4 font-mono text-[10px] text-emerald-400 min-h-[200px] overflow-y-auto space-y-1 select-none">
                      <p className="text-muted-foreground">// Click "Test Connection" to stream logs...</p>
                      {diagnosticLogs.map((log, idx) => (
                        <p key={idx}>{log}</p>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeSubTab === "overview" && (
                <div className="space-y-6">
                  {/* Top Real-time Welcome Banner */}
                  <div className="rounded-2xl border border-border bg-gradient-to-r from-card via-card/80 to-primary/10 p-6 md:p-8 relative overflow-hidden shadow-sm">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500 border border-emerald-500/20">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                            REALTIME LIVE TELEMETRY
                          </span>
                          <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
                            Updated {telemetry.lastUpdated}
                          </span>
                        </div>
                        <h2 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                          Welcome, {user?.name || user?.email || "User"}!
                        </h2>
                        <p className="mt-1.5 text-xs md:text-sm text-muted-foreground leading-relaxed">
                          Real-time system telemetry and client portal overview for <strong className="text-foreground">{user?.company_name || "MHTECHIN"}</strong>. Monitors live infrastructure nodes, active subscriptions, and support desk data.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2.5 shrink-0">
                        <button
                          onClick={() => setActiveSubTab("subscriptions")}
                          className="px-3.5 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
                        >
                          <Compass className="h-3.5 w-3.5" />
                          Subscriptions ({purchasedApps.length})
                        </button>
                        <button
                          onClick={() => setActiveSubTab("tickets")}
                          className="px-3.5 py-2 text-xs font-bold border border-border bg-card hover:bg-muted text-foreground rounded-lg transition-all flex items-center gap-1.5"
                        >
                          <LifeBuoy className="h-3.5 w-3.5 text-primary" />
                          Support ({ticketsList.filter(t => t.status === "open").length} open)
                        </button>
                      </div>
                    </div>
                    <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-primary/10 rounded-full filter blur-2xl pointer-events-none" />
                  </div>

                  {/* REAL-TIME OVERVIEW METRIC CARDS (ROW 1) */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    {/* CARD 1: Subscribed Apps & Data */}
                    <div 
                      onClick={() => setActiveSubTab("subscriptions")}
                      className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-500 group-hover:scale-110 transition-transform">
                          <Compass className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      </div>
                      <div className="mt-4">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subscribed Apps</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <h3 className="text-3xl font-black text-foreground">{purchasedApps.length}</h3>
                          <span className="text-xs text-muted-foreground font-semibold">of {visibleProducts.length} apps</span>
                        </div>
                        <p className="text-xs text-emerald-500 mt-2 font-semibold flex items-center gap-1">
                          ● {pendingApps.length} pending request{pendingApps.length === 1 ? "" : "s"}
                        </p>
                      </div>
                    </div>

                    {/* CARD 2: Real-time Compute Node Telemetry */}
                    <div className="rounded-xl border border-border bg-card p-5 hover:shadow-lg transition-all group relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-500 group-hover:scale-110 transition-transform">
                          <Cpu className="h-5 w-5 animate-pulse" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping" />
                          Live Node
                        </span>
                      </div>
                      <div className="mt-4">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">GPU / CPU Compute</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <h3 className="text-3xl font-black text-foreground">{telemetry.cpuUsage}%</h3>
                          <span className="text-xs text-cyan-500 font-bold">VRAM: {telemetry.vramUsage}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="mt-3 w-full bg-muted rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-cyan-500 h-1.5 rounded-full transition-all duration-500" 
                            style={{ width: `${telemetry.cpuUsage}%` }} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* CARD 3: Real-time Network Throughput */}
                    <div className="rounded-xl border border-border bg-card p-5 hover:shadow-lg transition-all group relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-500 group-hover:scale-110 transition-transform">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                          Live Rate
                        </span>
                      </div>
                      <div className="mt-4">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Network Bandwidth</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <h3 className="text-3xl font-black text-foreground">{telemetry.networkRate} Gbps</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 font-mono truncate">
                          {telemetry.requestsPerMin.toLocaleString()} req/m • {telemetry.activeConnections} sockets
                        </p>
                      </div>
                    </div>

                    {/* CARD 4: Real-time System Latency & Uptime */}
                    <div className="rounded-xl border border-border bg-card p-5 hover:shadow-lg transition-all group relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-500 group-hover:scale-110 transition-transform">
                          <Activity className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          99.99% Uptime
                        </span>
                      </div>
                      <div className="mt-4">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">API Ping Latency</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <h3 className="text-3xl font-black text-emerald-500">{telemetry.latencyMs} ms</h3>
                          <span className="text-xs text-emerald-500 font-bold">Optimal</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 font-semibold">
                          ✓ Database & edge caches synchronized
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* SECONDARY DETAILED CARDS & REAL DATA (ROW 2) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* CARD 5: User Profile & Account Data */}
                    <div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            Account Profile
                          </h3>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {user?.role || "User"}
                          </span>
                        </div>
                        <div className="space-y-3 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground font-medium">Name:</span>
                            <span className="font-bold text-foreground truncate max-w-[140px]">{user?.name || "User"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground font-medium">Company:</span>
                            <span className="font-bold text-foreground truncate max-w-[140px]">{user?.company_name || "MHTECHIN"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground font-medium">Profession:</span>
                            <span className="font-bold text-foreground truncate max-w-[140px]">{user?.profession || "Client Partner"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground font-medium">Email:</span>
                            <span className="font-mono text-muted-foreground truncate max-w-[140px]">{user?.email || ""}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 pt-4 border-t border-border">
                        <button
                          onClick={() => switchTab("profile")}
                          className="w-full text-xs font-semibold py-2 bg-muted hover:bg-muted/80 rounded-lg text-foreground transition-colors"
                        >
                          Edit Profile Details
                        </button>
                      </div>
                    </div>

                    {/* CARD 6: Support Tickets & Helpdesk Real Data */}
                    <div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                            <LifeBuoy className="h-4 w-4 text-indigo-500" />
                            Support Tickets
                          </h3>
                          <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                            {ticketsList.length} Total
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-center">
                            <span className="text-xl font-extrabold text-amber-500">
                              {ticketsList.filter(t => t.status === "open").length}
                            </span>
                            <p className="text-[10px] font-bold text-amber-500 uppercase mt-0.5">Open Tickets</p>
                          </div>
                          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
                            <span className="text-xl font-extrabold text-emerald-500">
                              {ticketsList.filter(t => t.status === "resolved" || t.status === "closed").length}
                            </span>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase mt-0.5">Resolved</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {ticketsList.length > 0
                            ? `Latest Ticket: "${ticketsList[0].subject}"`
                            : "No active support issues pending. Contact helpdesk anytime."}
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-border">
                        <button
                          onClick={() => setActiveSubTab("tickets")}
                          className="w-full text-xs font-semibold py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Raise Support Ticket
                        </button>
                      </div>
                    </div>

                    {/* CARD 7: Real-time System Log Activity Feed Stream */}
                    <div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                            <Terminal className="h-4 w-4 text-cyan-500 animate-pulse" />
                            Live Activity Stream
                          </h3>
                          <span className="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                            Streaming
                          </span>
                        </div>
                        <div className="space-y-2.5 font-mono text-[11px]">
                          <div className="p-2 rounded bg-muted/40 border border-border/50 text-emerald-500 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 animate-ping" />
                            <span className="truncate">Node check OK • {telemetry.latencyMs}ms ping</span>
                          </div>
                          <div className="p-2 rounded bg-muted/40 border border-border/50 text-foreground flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                            <span className="truncate">Traffic rate: {telemetry.networkRate} Gbps</span>
                          </div>
                          <div className="p-2 rounded bg-muted/40 border border-border/50 text-muted-foreground flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                            <span className="truncate">Active sockets: {telemetry.activeConnections} connections</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 pt-4 border-t border-border flex justify-between items-center text-[10px] text-muted-foreground">
                        <span>Cluster: AWS US-East</span>
                        <span>Auto-scale: Active</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* PRODUCTS TAB */}
              {activeSubTab === "products" && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-bold mb-2">Available Product Subscriptions</h3>
                  <p className="text-sm text-muted-foreground mb-6">Explore enterprise product suites. Subscribed items are unlocked in the developer sandbox.</p>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {visibleProducts.map((item) => {
                      const Icon = item.icon;
                      const isSubscribed = purchasedApps.includes(item.id);
                      const isPending = pendingApps.includes(item.id);

                      return (
                        <div 
                          key={item.id} 
                          className="p-5 rounded-xl border border-border bg-card/60 hover:bg-card hover:shadow-lg transition-all flex flex-col justify-between min-h-[200px] group"
                        >
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <div className="p-2 bg-primary/10 rounded-lg text-primary h-9 w-9 flex items-center justify-center shrink-0">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                {isSubscribed ? (
                                  <span className="text-[8px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Subscribed</span>
                                ) : isPending ? (
                                  <span className="text-[8px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Pending</span>
                                ) : (
                                  <span className="text-[8px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full uppercase tracking-wider">Locked</span>
                                )}
                              </div>
                            </div>
                            <h4 className="text-sm font-bold mt-4 text-foreground">{item.name}</h4>
                            <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">{item.desc}</p>
                          </div>

                          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                            <span className="text-xs font-black text-foreground">${item.price}/mo</span>
                            {isSubscribed ? (
                              <button
                                onClick={() => setActiveModalProduct(item)}
                                className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                              >
                                <Play className="h-3 w-3" />
                                Launch Sandbox
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setCheckoutItem({
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    type: "product",
                                    icon_name: item.icon_name
                                  });
                                  setCheckoutResult(null);
                                  setCheckoutError(null);
                                  setPaymentMethod("gpay");
                                  setActiveSubTab("payment");
                                }}
                                className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-3.5 py-1.5 rounded-lg transition-all"
                              >
                                Buy Now
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SERVICES TAB */}
              {activeSubTab === "services" && (() => {
                const filteredServices = servicesList.filter(s => {
                  const matchesSearch = s.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
                                        s.description.toLowerCase().includes(serviceSearch.toLowerCase());
                  const matchesCategory = serviceCategory === "All" || s.category === serviceCategory;
                  const matchesPrice = Number(s.price) <= serviceMaxPrice;
                  return matchesSearch && matchesCategory && matchesPrice;
                });

                return (
                  <div className="space-y-6">
                    {/* Search & filters row */}
                    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:max-w-xs">
                          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search developer services..."
                            value={serviceSearch}
                            onChange={(e) => setServiceSearch(e.target.value)}
                            className="w-full bg-card/50 border border-border pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        {/* Price range selector */}
                        <div className="flex items-center gap-3 w-full md:max-w-xs">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">Max Price:</span>
                          <input
                            type="range"
                            min="50"
                            max="5000"
                            step="50"
                            value={serviceMaxPrice}
                            onChange={(e) => setServiceMaxPrice(Number(e.target.value))}
                            className="w-full accent-primary bg-muted rounded-lg appearance-none h-1.5"
                          />
                          <span className="text-xs font-bold text-foreground whitespace-nowrap">${serviceMaxPrice}</span>
                        </div>
                      </div>

                      {/* Categories filters */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
                        {["All", "Cloud", "AI/ML", "Security", "DevOps", "Database", "Consulting"].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setServiceCategory(cat)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                              serviceCategory === cat
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card/50 text-muted-foreground border-border hover:bg-muted"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Services catalog grid */}
                    {filteredServices.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card/10">
                        <Compass className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground font-semibold">No services found matching the active filters.</p>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((svc) => (
                          <div 
                            key={svc.id} 
                            className="p-5 rounded-xl border border-border bg-card/60 flex flex-col justify-between hover:shadow-lg transition-all"
                          >
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-primary/10 text-primary border border-primary/25">
                                  {svc.category}
                                </span>
                                <div className="flex items-center gap-1 text-amber-500">
                                  <Star className="h-3 w-3 fill-current" />
                                  <span className="text-xs font-bold">{svc.rating || "4.8"}</span>
                                </div>
                              </div>

                              <h4 className="text-sm font-bold text-foreground mt-3 leading-snug">{svc.name}</h4>
                              <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">{svc.description}</p>
                              
                              <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  Duration: {svc.duration || "N/A"}
                                </span>
                              </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                              <div>
                                <span className="text-[10px] text-muted-foreground block leading-none">Investment</span>
                                <span className="text-sm font-black text-foreground mt-1 block">${svc.price}</span>
                              </div>
                              <button
                                onClick={() => {
                                  setCheckoutItem({
                                    id: String(svc.id),
                                    name: svc.name,
                                    price: Number(svc.price),
                                    type: "service"
                                  });
                                  setCheckoutResult(null);
                                  setCheckoutError(null);
                                  setPaymentMethod("gpay");
                                  setActiveSubTab("payment");
                                }}
                                className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* ORDERS TAB */}
              {activeSubTab === "orders" && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-bold mb-2">My Orders</h3>
                  <p className="text-sm text-muted-foreground mb-6">Review your order history, invoices, and payment statuses.</p>

                  {ordersList.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card/10">
                      <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground font-semibold">No orders found. Check out our catalog to place your first order!</p>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-border bg-card/30 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs md:text-sm">
                          <thead>
                            <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                              <th className="p-4">Invoice</th>
                              <th className="p-4">Item Details</th>
                              <th className="p-4 text-center">Qty</th>
                              <th className="p-4">Price</th>
                              <th className="p-4">Tax (10%)</th>
                              <th className="p-4 font-bold">Total</th>
                              <th className="p-4">Method</th>
                              <th className="p-4">Payment</th>
                              <th className="p-4">Order Status</th>
                              <th className="p-4">Order Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {ordersList.map((ord) => {
                              const prod = PRODUCTS.find(p => p.id === ord.item_id);
                              const service = servicesList.find(s => s.id === ord.item_id);
                              const isPaid = ord.payment_status === "success" || ord.payment_status === "Paid";
                              const orderStatus = isPaid ? "Completed" : "Cancelled";
                              
                              return (
                                <tr key={ord.id} className="hover:bg-muted/10 transition-colors">
                                  <td className="p-4 font-mono font-bold text-primary">
                                    {ord.invoice_number}
                                  </td>
                                  <td className="p-4 font-bold text-foreground">
                                    {prod ? prod.name : (service ? service.name : ord.item_id)}{" "}
                                    <span className="text-[10px] text-muted-foreground capitalize font-normal">({ord.item_type})</span>
                                  </td>
                                  <td className="p-4 text-center">
                                    {ord.quantity}
                                  </td>
                                  <td className="p-4 font-mono">
                                    ${Number(ord.price).toFixed(2)}
                                  </td>
                                  <td className="p-4 font-mono">
                                    ${Number(ord.tax).toFixed(2)}
                                  </td>
                                  <td className="p-4 font-mono font-bold text-foreground">
                                    ${Number(ord.total_amount).toFixed(2)}
                                  </td>
                                  <td className="p-4 font-mono uppercase">
                                    {ord.payment_method}
                                  </td>
                                  <td className="p-4">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                      isPaid
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : "bg-destructive/10 text-destructive"
                                    }`}>
                                      {ord.payment_status}
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                      isPaid
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : "bg-destructive/10 text-destructive"
                                    }`}>
                                      {orderStatus}
                                    </span>
                                  </td>
                                  <td className="p-4 text-xs text-muted-foreground whitespace-nowrap">
                                    {new Date(ord.order_date).toLocaleString()}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PAYMENTS TAB */}
              {activeSubTab === "payments" && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-bold mb-2">Payment Transactions</h3>
                  <p className="text-sm text-muted-foreground mb-6">Track and download invoices for all transactional operations.</p>

                  {paymentsList.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card/10">
                      <CreditCard className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground font-semibold">No payment history recorded.</p>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-border bg-card/30 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs md:text-sm">
                          <thead>
                            <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                              <th className="p-4">Transaction ID</th>
                              <th className="p-4 font-bold">Amount Paid</th>
                              <th className="p-4">Method</th>
                              <th className="p-4">Status</th>
                              <th className="p-4">Date</th>
                              <th className="p-4 text-right">Invoice</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {paymentsList.map((pay) => {
                              const relatedOrder = ordersList.find(o => o.id === pay.order_id);
                              return (
                                <tr key={pay.id} className="hover:bg-muted/10 transition-colors">
                                  <td className="p-4 font-mono text-muted-foreground">
                                    {pay.transaction_id}
                                  </td>
                                  <td className="p-4 font-mono font-bold text-foreground">
                                    ${Number(pay.amount).toFixed(2)}
                                  </td>
                                  <td className="p-4 font-mono uppercase">
                                    {pay.payment_method}
                                  </td>
                                  <td className="p-4">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                      pay.status === "success" || pay.status === "Paid"
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : "bg-destructive/10 text-destructive"
                                    }`}>
                                      {pay.status}
                                    </span>
                                  </td>
                                  <td className="p-4 text-xs text-muted-foreground">
                                    {new Date(pay.created_at).toLocaleString()}
                                  </td>
                                  <td className="p-4 text-right">
                                    <button
                                      onClick={() => {
                                        setActiveInvoice({
                                          invoice_number: relatedOrder?.invoice_number || `INV-MOCK-${pay.id}`,
                                          created_at: pay.created_at,
                                          billing_details: relatedOrder?.billing_details 
                                            ? JSON.parse(relatedOrder.billing_details) 
                                            : { name: user.name, email: user.email, address: user.address || "N/A" },
                                          item_id: relatedOrder?.item_id || "Enterprise Support Pack",
                                          item_type: relatedOrder?.item_type || "product",
                                          price: Number(pay.amount) / 1.1,
                                          tax: Number(pay.amount) - (Number(pay.amount) / 1.1),
                                          amount: Number(pay.amount),
                                          payment_method: pay.payment_method,
                                          transaction_id: pay.transaction_id,
                                          status: pay.status
                                        });
                                      }}
                                      className="text-xs bg-muted/80 hover:bg-muted border border-border px-2.5 py-1 rounded transition-all text-foreground inline-flex items-center gap-1"
                                    >
                                      <FileText className="h-3 w-3" />
                                      View Invoice
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SUBSCRIPTIONS TAB */}
              {activeSubTab === "subscriptions" && (() => {
                const getRemainingDaysText = (expiryDateStr: string | null) => {
                  if (!expiryDateStr) return { label: "Unlimited", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
                  const expiry = new Date(expiryDateStr);
                  const diffTime = expiry.getTime() - new Date().getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  if (diffDays <= 0) return { label: "Expired", color: "text-muted-foreground bg-muted border-border" };
                  if (diffDays === 1) return { label: "Expires Today", color: "text-destructive bg-destructive/10 border-destructive/20 font-bold" };
                  if (diffDays <= 3) return { label: `${diffDays} days left`, color: "text-destructive bg-destructive/10 border-destructive/20 font-semibold" };
                  if (diffDays <= 7) return { label: `${diffDays} days left`, color: "text-amber-500 bg-amber-500/10 border-amber-500/20 font-semibold" };
                  return { label: `${diffDays} days left`, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
                };

                const activeSubscriptions = fullSubsList.filter(s => {
                  if (s.status !== "approved" && s.status !== "active") return false;
                  if (!s.expiry_date) return true;
                  return new Date(s.expiry_date).getTime() > Date.now();
                });

                const expiredSubscriptions = fullSubsList.filter(s => {
                  if (s.status === "expired") return true;
                  if (s.expiry_date && new Date(s.expiry_date).getTime() <= Date.now()) return true;
                  return false;
                });

                const subscribedProdIds = activeSubscriptions.map(s => s.product_id);
                const availablePlans = PRODUCTS.filter(p => {
                  const isSubscribed = subscribedProdIds.includes(p.id);
                  const vis = productVisibilities.find((v) => v.product_id === p.id);
                  const isVisible = vis ? Boolean(vis.is_visible) : true;
                  return !isSubscribed && isVisible;
                });

                return (
                  <div className="space-y-8">
                    
                    {/* Header */}
                    <div>
                      <h3 className="text-xl font-extrabold text-foreground tracking-tight">Subscriptions Panel</h3>
                      <p className="text-sm text-muted-foreground mt-1.5">Manage your active instances, review expired plans, and explore new workspace licenses.</p>
                    </div>

                    {/* Active Subscriptions Section */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Active Subscriptions ({activeSubscriptions.length})
                      </h4>
                      {activeSubscriptions.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border p-8 text-center bg-card/20">
                          <RotateCw className="h-8 w-8 text-muted-foreground/60 mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">You have no active subscription plans right now.</p>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                          {activeSubscriptions.map((sub) => {
                            const prod: ProductItem = PRODUCTS.find(p => p.id === sub.product_id) || {
                              id: sub.product_id,
                              name: sub.product_id,
                              price: Number(sub.price),
                              icon: RotateCw,
                              type: "custom",
                              desc: "Custom Enterprise Plan Instance"
                            };
                            const startDate = new Date(sub.start_date || sub.created_at);
                            const expiryDate = sub.expiry_date ? new Date(sub.expiry_date) : null;
                            const remainingInfo = getRemainingDaysText(sub.expiry_date);

                            return (
                              <div key={sub.id} className="rounded-xl border border-border p-5 bg-card/60 hover:bg-card/90 transition-all flex flex-col justify-between shadow-sm hover:shadow-md">
                                <div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                      <prod.icon className="h-5 w-5 text-primary" />
                                      <span className="font-bold text-foreground text-sm">{prod.name}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase ${remainingInfo.color}`}>
                                      {remainingInfo.label}
                                    </span>
                                  </div>

                                  <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-muted-foreground border-t border-border/40 pt-4">
                                    <div>
                                      <span className="text-[10px] text-muted-foreground/75 block">Start Date</span>
                                      <span className="font-semibold text-foreground mt-0.5 block">{startDate.toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                      <span className="text-[10px] text-muted-foreground/75 block">Expiry Date</span>
                                      <span className="font-semibold text-foreground mt-0.5 block">{expiryDate ? expiryDate.toLocaleDateString() : "Unlimited"}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between gap-3">
                                  <button
                                    onClick={() => {
                                      setCheckoutItem({
                                        id: prod.id,
                                        name: prod.name,
                                        price: prod.price,
                                        type: "product"
                                      });
                                      setCheckoutResult(null);
                                      setCheckoutError(null);
                                      setPaymentMethod("gpay");
                                      setActiveSubTab("payment");
                                    }}
                                    className="flex-1 py-2 border border-border bg-card/85 hover:bg-muted text-xs font-bold text-foreground rounded-lg transition-colors text-center shadow-sm"
                                  >
                                    Renew Subscription
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Expired Subscriptions Section */}
                    {expiredSubscriptions.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                          Expired Subscriptions ({expiredSubscriptions.length})
                        </h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          {expiredSubscriptions.map((sub) => {
                            const prod: ProductItem = PRODUCTS.find(p => p.id === sub.product_id) || {
                              id: sub.product_id,
                              name: sub.product_id,
                              price: Number(sub.price),
                              icon: RotateCw,
                              type: "custom",
                              desc: "Custom Enterprise Plan Instance"
                            };
                            const startDate = new Date(sub.start_date || sub.created_at);
                            const expiryDate = sub.expiry_date ? new Date(sub.expiry_date) : null;

                            return (
                              <div key={sub.id} className="rounded-xl border border-border/70 p-5 bg-card/30 opacity-75 flex flex-col justify-between shadow-sm">
                                <div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                      <prod.icon className="h-5 w-5 text-muted-foreground" />
                                      <span className="font-bold text-muted-foreground text-sm">{prod.name}</span>
                                    </div>
                                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase text-muted-foreground bg-muted border-border">
                                      Expired
                                    </span>
                                  </div>

                                  <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-muted-foreground border-t border-border/40 pt-4">
                                    <div>
                                      <span className="text-[10px] text-muted-foreground/75 block">Start Date</span>
                                      <span className="font-semibold text-foreground mt-0.5 block">{startDate.toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                      <span className="text-[10px] text-muted-foreground/75 block">Expired Date</span>
                                      <span className="font-semibold text-foreground mt-0.5 block">{expiryDate ? expiryDate.toLocaleDateString() : "N/A"}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between gap-3">
                                  <button
                                    onClick={() => {
                                      setCheckoutItem({
                                        id: prod.id,
                                        name: prod.name,
                                        price: prod.price,
                                        type: "product"
                                      });
                                      setCheckoutResult(null);
                                      setCheckoutError(null);
                                      setPaymentMethod("gpay");
                                      setActiveSubTab("payment");
                                    }}
                                    className="flex-1 py-2 bg-primary hover:bg-primary/95 text-xs font-bold text-primary-foreground rounded-lg transition-colors text-center shadow-sm"
                                  >
                                    Re-Subscribe
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Available Plans Section */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Available Subscription Plans ({availablePlans.length})
                      </h4>
                      {availablePlans.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border p-8 text-center bg-card/20">
                          <p className="text-sm text-muted-foreground">You are subscribed to all available packages!</p>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-3 gap-6">
                          {availablePlans.map((prod) => (
                            <div key={prod.id} className="rounded-xl border border-border p-5 bg-card/65 flex flex-col justify-between shadow-sm hover:shadow-md transition-all hover:bg-card/90">
                              <div>
                                <div className="flex items-center gap-2.5">
                                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <prod.icon className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <span className="font-extrabold text-foreground text-sm block">{prod.name}</span>
                                    <span className="text-xs font-semibold text-emerald-500 font-mono mt-0.5 block">${prod.price}/mo</span>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-3.5 leading-relaxed">{prod.desc}</p>
                              </div>

                              <div className="mt-6 pt-4 border-t border-border/40">
                                <button
                                  onClick={() => {
                                    setCheckoutItem({
                                      id: prod.id,
                                      name: prod.name,
                                      price: prod.price,
                                      type: "product"
                                    });
                                    setCheckoutResult(null);
                                    setCheckoutError(null);
                                    setPaymentMethod("gpay");
                                    setActiveSubTab("payment");
                                  }}
                                  className="w-full py-2 bg-primary hover:bg-primary/95 text-xs font-bold text-primary-foreground rounded-lg transition-colors text-center shadow-sm"
                                >
                                  Subscribe Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                );
              })()}

              {/* NOTIFICATIONS TAB */}
              {activeSubTab === "notifications" && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-bold mb-2">Notification Center</h3>
                  <p className="text-sm text-muted-foreground mb-6">Review system alerts, automatic reminders, and billing receipts.</p>

                  {notificationsList.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card/10">
                      <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-4 animate-pulse" />
                      <p className="text-sm text-muted-foreground font-semibold">Your notification tray is empty.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notificationsList.map((note) => (
                        <div 
                          key={note.id} 
                          className={`p-4 rounded-xl border flex justify-between items-start gap-4 transition-all ${
                            note.is_read 
                              ? "bg-card/30 border-border/60 text-muted-foreground/90" 
                              : "bg-primary/5 border-primary/20 text-foreground"
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                              note.is_read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                            }`}>
                              <Bell className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-bold text-sm flex items-center gap-2">
                                {note.title}
                                {!note.is_read && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                )}
                              </div>
                              <p className="text-xs mt-1 text-muted-foreground leading-relaxed">{note.message}</p>
                              <span className="text-[10px] text-muted-foreground/60 mt-2 block font-mono">
                                {new Date(note.created_at).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {!note.is_read && (
                            <button
                              onClick={() => handleMarkAsRead(note.id)}
                              className="text-[10px] font-bold bg-muted hover:bg-muted/80 text-foreground px-2.5 py-1 rounded border border-border transition-colors whitespace-nowrap"
                            >
                              Mark Read
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* MY PROFILE TAB */}
              {activeSubTab === "profile" && user && (
                <UserProfileTab
                  user={user}
                  onProfileUpdated={setUser}
                />
              )}

              {/* PORTAL SETTINGS TAB */}
              {activeSubTab === "settings" && user && (
                <PortalSettingsTab />
              )}

              {/* SUPPORT TICKETS TAB */}
              {activeSubTab === "tickets" && user && (() => {
                const role = user.role?.trim().toLowerCase();
                const isPrivileged = role === "admin" || role === "executive";

                return (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                          <LifeBuoy className="h-5 w-5 text-primary" />
                          Support & Ticket Resolution Center
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          {isPrivileged 
                            ? "Review and resolve support tickets raised by portal partners."
                            : "Raise support tickets and track their status in real-time."}
                        </p>
                      </div>
                    </div>

                    {isPrivileged ? (
                      /* Privileged View (Admin / Executive) */
                      <div className="space-y-4">
                        {ticketsLoading ? (
                          <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          </div>
                        ) : ticketsList.length === 0 ? (
                          <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card/10">
                            <LifeBuoy className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                            <p className="text-sm text-muted-foreground font-semibold">No support tickets found.</p>
                          </div>
                        ) : (
                          <div className="rounded-xl border border-border bg-card/40 overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-muted/40 text-muted-foreground border-b border-border">
                                  <tr>
                                    <th className="px-4 py-3">Ticket</th>
                                    <th className="px-4 py-3">Partner / User</th>
                                    <th className="px-4 py-3">Subject</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Assigned To</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border/60">
                                  {ticketsList.map((t) => (
                                    <tr key={t.id} className="hover:bg-muted/10 transition-colors">
                                      <td className="px-4 py-3.5 font-bold text-foreground">#{t.id}</td>
                                      <td className="px-4 py-3.5">
                                        <div className="font-semibold text-foreground">{t.creator_name || "Unknown"}</div>
                                        <div className="text-[10px] text-muted-foreground">{t.creator_email}</div>
                                      </td>
                                      <td className="px-4 py-3.5 max-w-[200px] truncate">
                                        <span className="font-medium text-foreground block">{t.subject}</span>
                                        <span className="text-[11px] text-muted-foreground block truncate mt-0.5">{t.description}</span>
                                      </td>
                                      <td className="px-4 py-3.5 text-xs">
                                        <span className="bg-muted px-2 py-0.5 rounded border border-border">{t.category}</span>
                                      </td>
                                      <td className="px-4 py-3.5 text-xs">
                                        {role === "admin" ? (
                                          <select
                                            value={t.assigned_to || ""}
                                            onChange={(e) => handleAssignTicket(t.id, e.target.value ? Number(e.target.value) : null)}
                                            className="bg-card border border-border rounded px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                          >
                                            <option value="">Unassigned</option>
                                            {executivesList.map((ex) => (
                                              <option key={ex.id} value={ex.id}>
                                                {ex.name} ({ex.role})
                                              </option>
                                            ))}
                                          </select>
                                        ) : (
                                          <div className="flex items-center gap-1.5">
                                            <span className="font-semibold">{t.executive_name || "Unassigned"}</span>
                                            {!t.assigned_to && (
                                              <button
                                                onClick={() => handleAssignTicket(t.id, user.id)}
                                                className="px-2 py-0.5 bg-primary/10 text-primary hover:bg-primary/20 text-[10px] font-bold rounded"
                                              >
                                                Assign to Me
                                              </button>
                                            )}
                                          </div>
                                        )}
                                      </td>
                                      <td className="px-4 py-3.5">
                                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                                          t.status === "open" ? "bg-destructive/10 text-destructive border border-destructive/20" :
                                          t.status === "in_progress" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                                          t.status === "resolved" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                                          "bg-muted text-muted-foreground border border-border"
                                        }`}>
                                          {t.status.replace("_", " ")}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3.5 text-right">
                                        <select
                                          value={t.status}
                                          onChange={(e) => handleUpdateTicketStatus(t.id, e.target.value)}
                                          className="bg-card border border-border rounded px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                        >
                                          <option value="open">Open</option>
                                          <option value="in_progress">In Progress</option>
                                          <option value="resolved">Resolved</option>
                                          <option value="closed">Closed</option>
                                        </select>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Standard Partner View (List + Form) */
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Ticket History */}
                        <div className="lg:col-span-2 space-y-4">
                          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Ticket History</h3>
                          {ticketsLoading ? (
                            <div className="flex justify-center items-center py-12">
                              <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                          ) : ticketsList.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card/10">
                              <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                              <p className="text-sm text-muted-foreground font-semibold">You have no active support tickets.</p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {ticketsList.map((t) => (
                                <div key={t.id} className="p-4 rounded-xl border border-border bg-card/30 space-y-3">
                                  <div className="flex justify-between items-start gap-4">
                                    <div>
                                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Ticket #{t.id} • {t.category}</span>
                                      <h4 className="text-sm font-bold text-foreground mt-0.5">{t.subject}</h4>
                                    </div>
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                                      t.status === "open" ? "bg-destructive/10 text-destructive border border-destructive/20" :
                                      t.status === "in_progress" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                                      t.status === "resolved" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                                      "bg-muted text-muted-foreground border border-border"
                                    }`}>
                                      {t.status.replace("_", " ")}
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">{t.description}</p>
                                  <div className="text-[10px] text-muted-foreground flex justify-between pt-1 border-t border-border/40">
                                    <span>Raised on: {new Date(t.created_at).toLocaleDateString()}</span>
                                    <span>Assigned To: <b className="text-foreground">{t.executive_name || "Pending Assignment"}</b></span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Raise Ticket Form */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Raise New Ticket</h3>
                          <form onSubmit={handleRaiseTicketSubmit} className="p-5 rounded-xl border border-border bg-card/50 space-y-4">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-muted-foreground block">Subject / Issue Title</label>
                              <input
                                type="text"
                                required
                                placeholder="e.g., Unable to access AI Studio Sandbox"
                                value={newTicketSubject}
                                onChange={(e) => setNewTicketSubject(e.target.value)}
                                className="w-full bg-card border border-border rounded-lg p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-muted-foreground block">Category</label>
                              <select
                                value={newTicketCategory}
                                onChange={(e) => setNewTicketCategory(e.target.value)}
                                className="w-full bg-card border border-border rounded-lg p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                              >
                                <option value="General">General Inquiry</option>
                                <option value="Technical">Technical Issue</option>
                                <option value="Billing">Billing & Subscription</option>
                                <option value="Product Access">Product Access Request</option>
                                <option value="Feature Request">Feature Request</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-muted-foreground block">Elaborate Description</label>
                              <textarea
                                required
                                rows={4}
                                placeholder="Describe your issue in detail so our support executives can assist you quickly..."
                                value={newTicketDescription}
                                onChange={(e) => setNewTicketDescription(e.target.value)}
                                className="w-full bg-card border border-border rounded-lg p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={raisingTicket}
                              className="w-full py-2 bg-primary text-primary-foreground font-bold text-xs rounded-lg hover:bg-primary/95 transition-all flex items-center justify-center gap-1.5"
                            >
                              {raisingTicket && <Loader2 className="h-3 w-3 animate-spin" />}
                              Submit Support Ticket
                            </button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* PAYMENT CHECKOUT TAB */}
              {activeSubTab === "payment" && (() => {
                if (!checkoutItem) {
                  return (
                    <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card/10">
                      <CreditCard className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground font-semibold">No item selected for purchase. Go to Products or Services to check out.</p>
                      <button 
                        onClick={() => setActiveSubTab("products")}
                        className="mt-4 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg"
                      >
                        Browse Products
                      </button>
                    </div>
                  );
                }

                const price = checkoutItem.price;
                const tax = price * 0.1;
                const total = price + tax;

                if (checkoutResult) {
                  return (
                    <div className="max-w-xl mx-auto rounded-xl border border-border bg-card p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
                      <div className="h-16 w-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto">
                        <UserCheck className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-foreground">Order Confirmed!</h3>
                        <p className="text-sm text-muted-foreground mt-2">Thank you for your purchase. Your subscription/service has been successfully provisioned.</p>
                      </div>

                      <div className="bg-muted/20 p-5 rounded-xl border border-border/80 text-left space-y-3 text-sm">
                        <div className="flex justify-between border-b border-border/40 pb-2">
                          <span className="text-muted-foreground">Order ID:</span>
                          <span className="font-mono font-bold text-foreground">{checkoutResult.orderId}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/40 pb-2">
                          <span className="text-muted-foreground">Invoice Number:</span>
                          <span className="font-mono font-bold text-primary">{checkoutResult.invoiceNumber}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/40 pb-2">
                          <span className="text-muted-foreground">Transaction Ref:</span>
                          <span className="font-mono font-bold text-foreground">{checkoutResult.transactionId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Paid:</span>
                          <span className="font-black text-emerald-500">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={() => {
                            setActiveInvoice({
                              invoice_number: checkoutResult.invoiceNumber,
                              created_at: new Date(),
                              billing_details: {
                                name: billingName,
                                email: billingEmail,
                                mobile: billingMobile,
                                address: billingAddress,
                                company: billingCompany,
                                profession: billingProfession
                              },
                              item_id: checkoutItem.name,
                              item_type: checkoutItem.type,
                              price: price,
                              tax: tax,
                              amount: total,
                              payment_method: paymentMethod,
                              transaction_id: checkoutResult.transactionId,
                              status: "success"
                            });
                          }}
                          className="flex-1 py-2.5 border border-border bg-card hover:bg-muted text-xs font-bold text-foreground rounded-lg flex justify-center items-center gap-1.5"
                        >
                          <FileText className="h-4 w-4" />
                          View/Print Invoice
                        </button>
                        <button
                          onClick={() => {
                            setCheckoutItem(null);
                            setCheckoutResult(null);
                            setActiveSubTab("overview");
                          }}
                          className="flex-1 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 transition-all"
                        >
                          Return to Dashboard
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <form onSubmit={handleCheckoutSubmit} className="grid md:grid-cols-3 gap-6">
                    {/* Billing address Details */}
                    <div className="md:col-span-2 rounded-xl border border-border bg-card p-6 space-y-4">
                      <h3 className="text-base font-black border-b border-border pb-3 flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        Billing Details
                      </h3>

                      {checkoutError && (
                        <div className="p-3 bg-destructive/10 text-destructive border border-destructive/20 text-xs rounded-lg font-semibold">
                          {checkoutError}
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-muted-foreground font-semibold">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={billingName}
                            onChange={(e) => setBillingName(e.target.value)}
                            className="w-full bg-card border border-border rounded-lg p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-muted-foreground font-semibold">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={billingEmail}
                            onChange={(e) => setBillingEmail(e.target.value)}
                            className="w-full bg-card border border-border rounded-lg p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-muted-foreground font-semibold">Mobile Number</label>
                          <input
                            type="tel"
                            value={billingMobile}
                            onChange={(e) => setBillingMobile(e.target.value)}
                            className="w-full bg-card border border-border rounded-lg p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-muted-foreground font-semibold">Company Name</label>
                          <input
                            type="text"
                            value={billingCompany}
                            onChange={(e) => setBillingCompany(e.target.value)}
                            className="w-full bg-card border border-border rounded-lg p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground font-semibold">Physical Address</label>
                        <input
                          type="text"
                          value={billingAddress}
                          onChange={(e) => setBillingAddress(e.target.value)}
                          className="w-full bg-card border border-border rounded-lg p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      {/* Payment Method Selector */}
                      <h3 className="text-base font-black border-b border-border pb-3 pt-4 flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        Choose Payment Method
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { id: "gpay", name: "Google Pay (GPay)" },
                          { id: "phonepe", name: "PhonePe" },
                          { id: "paytm", name: "Paytm" },
                          { id: "upi", name: "UPI Direct Transfer" },
                          { id: "card", name: "Credit Card (Visa/Master)" },
                          { id: "debit", name: "Debit Card" },
                          { id: "netbanking", name: "Net Banking" }
                        ].map((m) => (
                          <label 
                            key={m.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/30 transition-all ${
                              paymentMethod === m.id 
                                ? "border-primary bg-primary/5" 
                                : "border-border bg-card/40"
                            }`}
                          >
                            <input
                              type="radio"
                              name="payment_method"
                              checked={paymentMethod === m.id}
                              onChange={() => setPaymentMethod(m.id)}
                              className="accent-primary h-4 w-4"
                            />
                            <span className="text-xs font-semibold text-foreground">{m.name}</span>
                          </label>
                        ))}
                      </div>

                      {/* Credit Card inputs */}
                      {(paymentMethod === "card" || paymentMethod === "debit") && (
                        <div className="p-4 rounded-lg border border-border bg-muted/20 space-y-3 max-w-md animate-in slide-in-from-top-2 duration-200">
                          <div className="space-y-1">
                            <label className="text-[10px] text-muted-foreground uppercase font-bold">Card Number</label>
                            <input
                              type="text"
                              maxLength={16}
                              placeholder="4111 2222 3333 4444"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full bg-card border border-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] text-muted-foreground uppercase font-bold">Expiry Date</label>
                              <input
                                type="text"
                                maxLength={5}
                                placeholder="MM/YY"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="w-full bg-card border border-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-muted-foreground uppercase font-bold">Security CVV</label>
                              <input
                                type="password"
                                maxLength={3}
                                placeholder="123"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                className="w-full bg-card border border-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Order summary sidebar */}
                    <div className="rounded-xl border border-border bg-card p-6 space-y-6 self-start">
                      <h3 className="text-base font-black border-b border-border pb-3">Checkout Summary</h3>
                      
                      <div className="bg-muted/10 p-4 rounded-xl border border-border text-xs space-y-3">
                        <div className="flex justify-between font-bold">
                          <span className="text-muted-foreground">Item:</span>
                          <span className="text-foreground max-w-[120px] truncate">{checkoutItem.name}</span>
                        </div>
                        <div className="flex justify-between capitalize">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{checkoutItem.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-mono">${price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax (10% GST):</span>
                          <span className="font-mono">${tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-border/60 pt-2.5 flex justify-between font-bold text-sm">
                          <span className="text-foreground">Total Due:</span>
                          <span className="font-black text-emerald-500 font-mono">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Test simulation switches */}
                      <div className="space-y-2.5 bg-muted/5 p-3.5 rounded-xl border border-border/80 text-xs">
                        <span className="text-[10px] font-black uppercase text-primary tracking-wider block mb-1">Developer Controls</span>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={simulateFailure}
                            onChange={(e) => setSimulateFailure(e.target.checked)}
                            className="accent-primary h-3.5 w-3.5"
                          />
                          <span>Simulate payment failure</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={checkoutSubmitting}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50 transition-colors"
                      >
                        {checkoutSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Lock className="h-3.5 w-3.5" />
                        )}
                        Confirm & Secure Pay
                      </button>
                    </div>
                  </form>
                );
              })()}

              {/* ADMIN USER MANAGEMENT PANEL TAB */}
              {activeSubTab === "user-management" && user.role === "admin" && (
                <AdminPanel 
                  products={PRODUCTS} 
                  initialTab="users"
                  onRefreshSubscriptions={refreshUserData}
                />
              )}

              {/* ADMIN SYSTEM ANALYTICS PANEL TAB */}
              {activeSubTab === "analytics" && user.role === "admin" && (
                <AdminPanel 
                  products={PRODUCTS} 
                  initialTab="overview"
                  onRefreshSubscriptions={refreshUserData}
                />
              )}
            </>
          )}

        </main>
      </div>

      {/* POPUP WEBVIEW MODAL DIALOG */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal header with webview browser chrome look */}
            <div className="bg-muted/80 px-4 py-3 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <div className="h-3 w-3 rounded-full bg-warning" />
                  <div className="h-3 w-3 rounded-full bg-success" />
                </div>
                <span className="text-xs font-mono bg-background/50 px-3 py-1 border border-border rounded text-muted-foreground flex items-center gap-1.5 select-none truncate max-w-[300px] sm:max-w-md">
                  <Lock className="h-3 w-3" /> https://mhtechin.com/sandbox/{activeModalProduct.id}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {purchasedApps.includes(activeModalProduct.id) ? (
                  <>
                    <button 
                      onClick={() => {
                        setActiveModalProduct(null);
                        navigate({ from: Route.fullPath, to: ".", search: { app: activeModalProduct.id } });
                      }}
                      className="text-xs bg-primary text-primary-foreground font-semibold px-3 py-1.5 rounded hover:bg-primary/95 flex items-center gap-1"
                    >
                      <Maximize2 className="h-3 w-3" /> Fit to screen
                    </button>

                    <a 
                      href={lp(`/dashboard?app=${activeModalProduct.id}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs border border-border bg-transparent font-semibold px-3 py-1.5 rounded hover:bg-muted text-foreground flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" /> Open in new tab
                    </a>
                  </>
                ) : pendingApps.includes(activeModalProduct.id) ? (
                  <button
                    disabled
                    className="text-xs bg-amber-500/20 text-amber-500 border border-amber-500/30 font-semibold px-4 py-1.5 rounded flex items-center gap-1 cursor-not-allowed"
                  >
                    Awaiting Approval
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      requestAccess(activeModalProduct.id);
                    }}
                    disabled={actionLoadingId !== null}
                    className="text-xs bg-primary text-primary-foreground font-semibold px-4 py-1.5 rounded hover:bg-primary/95 flex items-center gap-1 disabled:opacity-50"
                  >
                    {actionLoadingId === activeModalProduct.id && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    Subscribe to Launch
                  </button>
                )}
                
                <button 
                  onClick={() => setActiveModalProduct(null)} 
                  className="text-muted-foreground hover:text-foreground p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Webview Client area (Mock simulation) */}
            <div className="flex-1 overflow-y-auto p-6 bg-background/50">
              {purchasedApps.includes(activeModalProduct.id) ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span className="font-semibold text-emerald-500">● Sandbox Active</span>
                    <span>Mock browser rendering frame</span>
                  </div>

                  {/* Webview product console mockup */}
                  <div className="p-8 border border-border border-dashed rounded-lg bg-card text-center space-y-4">
                    <div className="p-3.5 bg-primary/10 rounded-full text-primary h-14 w-14 mx-auto flex items-center justify-center">
                      <activeModalProduct.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{activeModalProduct.name} Sandbox</h3>
                      <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto">
                        This popup simulates a live webview container. Press **Fit to screen** to launch the full-page sandbox inside the dashboard panel, or **Open in new tab** to launch it independently.
                      </p>
                    </div>
                  </div>
                </div>
              ) : pendingApps.includes(activeModalProduct.id) ? (
                <div className="p-12 text-center space-y-4">
                  <div className="p-4 bg-amber-500/10 rounded-full text-amber-500 h-16 w-16 mx-auto flex items-center justify-center">
                    <Lock className="h-8 w-8 animate-pulse text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-amber-500">Access Request Pending</h3>
                    <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                      Your access request for **{activeModalProduct.name}** is currently awaiting administrator approval. You will receive sandbox access once it is authorized.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      cancelSubscription(activeModalProduct.id);
                    }}
                    disabled={actionLoadingId !== null}
                    className="mt-6 bg-destructive text-white font-semibold px-4 py-2 rounded text-xs hover:bg-destructive/90 flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {actionLoadingId === activeModalProduct.id && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    Cancel Access Request
                  </button>
                </div>
              ) : (
                <div className="p-12 text-center space-y-4">
                  <div className="p-4 bg-muted/40 rounded-full text-muted-foreground h-16 w-16 mx-auto flex items-center justify-center">
                    <Lock className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Product Subscription Required</h3>
                    <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                      You are not currently subscribed to **{activeModalProduct.name}**. Please subscribe above or head to the **Billing & Subscriptions** section of your portal to manage active products.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      requestAccess(activeModalProduct.id);
                    }}
                    disabled={actionLoadingId !== null}
                    className="mt-6 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded text-xs hover:bg-primary/95 flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {actionLoadingId === activeModalProduct.id && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    Activate Subscriptions
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* PRINTABLE INVOICE MODAL OVERLAY */}
      {activeInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm print:p-0 print:bg-white print:backdrop-blur-none">
          <div className="w-full max-w-2xl rounded-xl border border-border bg-card shadow-2xl p-6 md:p-8 flex flex-col justify-between max-h-[90vh] overflow-y-auto print:border-none print:shadow-none print:max-h-full print:bg-white print:text-black">
            
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b border-border/80 pb-6 print:border-black/20">
              <div>
                <h2 className="text-xl font-black text-foreground flex items-center gap-2 print:text-black">
                  <FileText className="h-5 w-5 text-primary print:text-black" />
                  TAX INVOICE / RECEIPT
                </h2>
                <p className="text-xs text-muted-foreground mt-1 print:text-black">MH TECHIN Enterprise Portal</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-500 print:text-black font-extrabold uppercase">PAID</span>
                <span className="text-[10px] text-muted-foreground block mt-1 print:text-black font-mono">Invoice #: {activeInvoice.invoice_number}</span>
              </div>
            </div>

            {/* Billed To vs Transaction Info */}
            <div className="grid sm:grid-cols-2 gap-6 py-6 text-xs border-b border-border/45 print:border-black/20">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block print:text-black">Billed To</span>
                <div className="mt-2 font-semibold text-foreground print:text-black">{activeInvoice.billing_details?.name || user.name}</div>
                <div className="text-muted-foreground mt-0.5 print:text-black">{activeInvoice.billing_details?.email || user.email}</div>
                {activeInvoice.billing_details?.mobile && <div className="text-muted-foreground mt-0.5 print:text-black font-mono">{activeInvoice.billing_details.mobile}</div>}
                {activeInvoice.billing_details?.address && <div className="text-muted-foreground mt-0.5 print:text-black leading-relaxed">{activeInvoice.billing_details.address}</div>}
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block print:text-black">Transaction Info</span>
                <div className="mt-2">
                  <span className="text-muted-foreground print:text-black">Payment Date:</span>
                  <span className="font-semibold text-foreground ml-1.5 print:text-black">{new Date(activeInvoice.created_at).toLocaleString()}</span>
                </div>
                <div className="mt-1">
                  <span className="text-muted-foreground print:text-black">Payment Method:</span>
                  <span className="font-semibold text-foreground uppercase ml-1.5 print:text-black font-mono">{activeInvoice.payment_method}</span>
                </div>
                <div className="mt-1">
                  <span className="text-muted-foreground print:text-black">Transaction ID:</span>
                  <span className="font-semibold text-foreground ml-1.5 print:text-black font-mono">{activeInvoice.transaction_id}</span>
                </div>
              </div>
            </div>

            {/* Invoice Line Items */}
            <div className="py-6 border-b border-border/45 print:border-black/20">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground font-bold print:text-black print:border-black/20 uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Description</th>
                    <th className="pb-3 text-center">Qty</th>
                    <th className="pb-3 text-right">Price</th>
                    <th className="pb-3 text-right">Tax (10%)</th>
                    <th className="pb-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-xs">
                  <tr>
                    <td className="py-3 font-semibold text-foreground print:text-black">
                      {activeInvoice.item_id} <span className="text-[10px] text-muted-foreground font-normal capitalize">({activeInvoice.item_type})</span>
                    </td>
                    <td className="py-3 text-center">1</td>
                    <td className="py-3 text-right font-mono">${Number(activeInvoice.price).toFixed(2)}</td>
                    <td className="py-3 text-right font-mono">${Number(activeInvoice.tax).toFixed(2)}</td>
                    <td className="py-3 text-right font-mono font-bold text-foreground print:text-black">${Number(activeInvoice.amount).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Row */}
            <div className="flex justify-between items-center py-6">
              <span className="text-xs text-muted-foreground print:text-black">Total Paid (Inclusive of all taxes)</span>
              <div className="text-right">
                <span className="text-xl font-black text-emerald-500 font-mono">${Number(activeInvoice.amount).toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-border pt-6 flex justify-between gap-4 print:hidden">
              <button
                onClick={() => setActiveInvoice(null)}
                className="flex-1 py-2 text-xs font-semibold border border-border rounded-lg bg-transparent hover:bg-muted/50 transition-colors"
              >
                Close Receipt
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/95 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <FileText className="h-4 w-4" />
                Print Invoice
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
