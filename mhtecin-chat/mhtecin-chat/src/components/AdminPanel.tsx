import { useState, useEffect } from "react";
import {
  Users,
  CreditCard,
  Mail,
  FileText,
  Check,
  X,
  Search,
  Trash2,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  UserCheck,
  Building,
  TrendingUp,
  FileSpreadsheet,
  AlertTriangle,
  ChevronRight,
  Shield,
  Layers,
  Inbox,
  Loader2,
  DollarSign
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Tooltip as RadixTooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  getAdminData,
  updateUserRole,
  updateUserSubscription,
  approveSubscription,
  rejectSubscription,
  updateProductVisibility,
  deleteUser,
  deleteContact,
  deleteNewsletter,
  toggleUserStatus,
  sendManualNotification,
  deleteDeleteRequest
} from "@/server-fns/admin";

interface ProductItem {
  id: string;
  name: string;
  icon: any;
  type: string;
  desc: string;
  price: number;
}

interface AdminPanelProps {
  products: ProductItem[];
  onRefreshSubscriptions?: () => void;
  initialTab?: "overview" | "users" | "visibility" | "contacts" | "newsletter" | "deletion";
}

export function AdminPanel({ products, onRefreshSubscriptions, initialTab }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "visibility" | "contacts" | "newsletter" | "deletion">("overview");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Raw Database Data
  const [usersList, setUsersList] = useState<any[]>([]);
  const [subscriptionsList, setSubscriptionsList] = useState<any[]>([]);
  const [visibilityList, setVisibilityList] = useState<any[]>([]);
  const [contactsList, setContactsList] = useState<any[]>([]);
  const [newslettersList, setNewslettersList] = useState<any[]>([]);
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [paymentsList, setPaymentsList] = useState<any[]>([]);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [deleteRequestsList, setDeleteRequestsList] = useState<any[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [adminActionLoading, setAdminActionLoading] = useState<string | null>(null);

  // Search Filters
  const [userSearch, setUserSearch] = useState("");
  const [contactSearch, setContactSearch] = useState("");
  const [newsletterSearch, setNewsletterSearch] = useState("");
  const [deletionSearch, setDeletionSearch] = useState("");
  const [userPage, setUserPage] = useState(1);

  // Selected Item Modals
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  // Custom Confirm Popup Dialog Configuration
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    description: string;
    onConfirm: () => void;
  } | null>(null);

  const triggerConfirm = (title: string, description: string, onConfirm: () => void) => {
    setConfirmConfig({ title, description, onConfirm });
    setConfirmOpen(true);
  };

  // Mock Email Reply State
  const [replySubject, setReplySubject] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // Manual Notification controls
  const [manualReminderText, setManualReminderText] = useState("");
  const [manualReminderTitle, setManualReminderTitle] = useState("Administrative Notification");
  const [sendingReminder, setSendingReminder] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const loadData = async (showToast = false) => {
    try {
      if (showToast) setRefreshing(true);
      const res = await getAdminData();
      setUsersList(res.users || []);
      setSubscriptionsList(res.subscriptions || []);
      setVisibilityList(res.productVisibility || []);
      setContactsList(res.contacts || []);
      setNewslettersList(res.newsletters || []);
      setOrdersList(res.orders || []);
      setPaymentsList(res.payments || []);
      setServicesList(res.services || []);
      setDeleteRequestsList(res.deleteRequests || []);
      setCurrentUserId(res.currentUserId);
      if (showToast) toast.success("Dashboard data synchronized!");
    } catch (e: any) {
      toast.error(e.message || "Failed to load admin panel data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Sync / refresh logic
  const handleManualRefresh = () => {
    loadData(true);
  };

  // Helper: check if a user is subscribed to a product (approved only)
  const isUserSubscribed = (userId: number, prodId: string) => {
    return subscriptionsList.some((s) => s.user_id === userId && s.product_id === prodId && s.status === "approved");
  };

  // Helper: check if a user's subscription to a product is pending
  const isUserPending = (userId: number, prodId: string) => {
    return subscriptionsList.some((s) => s.user_id === userId && s.product_id === prodId && s.status === "pending");
  };

  // Helper: check if product is marked visible
  const isProductVisible = (prodId: string) => {
    const item = visibilityList.find((v) => v.product_id === prodId);
    return item ? Boolean(item.is_visible) : true; // default to true
  };

  // Operations
  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      await updateUserRole({ data: { userId, role: newRole } });
      toast.success("User role updated successfully");
      
      // Update local state
      setUsersList(usersList.map(u => u.id === userId ? { ...u, role: newRole } : u));
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, role: newRole });
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to update role");
    }
  };

  const handleSubscriptionToggle = async (userId: number, productId: string, currentlyActive: boolean) => {
    try {
      const newStatus = !currentlyActive;
      await updateUserSubscription({ data: { userId, productId, active: newStatus } });
      
      if (newStatus) {
        setSubscriptionsList([...subscriptionsList, { user_id: userId, product_id: productId, status: "approved", created_at: new Date().toISOString() }]);
        toast.success(`Subscribed user to ${productId}`);
      } else {
        setSubscriptionsList(subscriptionsList.filter(s => !(s.user_id === userId && s.product_id === productId)));
        toast.success(`Unsubscribed user from ${productId}`);
      }
      
      if (onRefreshSubscriptions) {
        onRefreshSubscriptions();
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to update subscription");
    }
  };

  const handleApproveRequest = async (userId: number, productId: string) => {
    setAdminActionLoading(`${userId}-${productId}-approve`);
    try {
      await approveSubscription({ data: { userId, productId } });
      toast.success("Access request approved!");
      // Update local state: set status to approved
      setSubscriptionsList(subscriptionsList.map(s => 
        (s.user_id === userId && s.product_id === productId) ? { ...s, status: "approved" } : s
      ));
      if (onRefreshSubscriptions) {
        onRefreshSubscriptions();
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to approve request");
    } finally {
      setAdminActionLoading(null);
    }
  };

  const handleRejectRequest = async (userId: number, productId: string) => {
    setAdminActionLoading(`${userId}-${productId}-reject`);
    try {
      await rejectSubscription({ data: { userId, productId } });
      toast.success("Access request rejected.");
      // Update local state: set status to rejected
      setSubscriptionsList(subscriptionsList.map(s => 
        (s.user_id === userId && s.product_id === productId) ? { ...s, status: "rejected" } : s
      ));
      if (onRefreshSubscriptions) {
        onRefreshSubscriptions();
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to reject request");
    } finally {
      setAdminActionLoading(null);
    }
  };

  const handleVisibilityToggle = async (productId: string, currentlyVisible: boolean) => {
    try {
      const newStatus = !currentlyVisible;
      await updateProductVisibility({ data: { productId, isVisible: newStatus } });
      
      // Update local state
      const exists = visibilityList.some(v => v.product_id === productId);
      if (exists) {
        setVisibilityList(visibilityList.map(v => v.product_id === productId ? { ...v, is_visible: newStatus } : v));
      } else {
        setVisibilityList([...visibilityList, { product_id: productId, is_visible: newStatus }]);
      }
      
      toast.success(`Product ${productId} visibility set to ${newStatus ? 'Visible' : 'Hidden'}`);
    } catch (e: any) {
      toast.error(e.message || "Failed to update product visibility");
    }
  };

  const handleDeleteUser = (userId: number) => {
    triggerConfirm(
      "Are you absolutely sure?",
      "This will delete the user account permanently and cancel all active subscriptions. This action cannot be undone.",
      async () => {
        setAdminActionLoading(`delete-${userId}`);
        try {
          await deleteUser({ data: { userId } });
          toast.success("User deleted successfully");
          setUsersList(usersList.filter((u) => u.id !== userId));
          setSubscriptionsList(subscriptionsList.filter((s) => s.user_id !== userId));
          setSelectedUser(null);
        } catch (e: any) {
          toast.error(e.message || "Failed to delete user");
        } finally {
          setAdminActionLoading(null);
        }
      }
    );
  };

  const handleDismissDeleteRequest = (id: number) => {
    triggerConfirm(
      "Dismiss Deletion Request",
      "Are you sure you want to dismiss this deletion request without deleting the account? This will remove it from the requests queue.",
      async () => {
        setAdminActionLoading(`dismiss-del-${id}`);
        try {
          await deleteDeleteRequest({ data: { id } });
          toast.success("Deletion request dismissed");
          setDeleteRequestsList(deleteRequestsList.filter((r) => r.id !== id));
        } catch (e: any) {
          toast.error(e.message || "Failed to dismiss request");
        } finally {
          setAdminActionLoading(null);
        }
      }
    );
  };

  const handleDeleteContact = (id: number) => {
    triggerConfirm(
      "Delete Inquiry Log",
      "Are you sure you want to delete this contact submission log? This action is permanent.",
      async () => {
        try {
          await deleteContact({ data: { id } });
          toast.success("Inquiry log deleted");
          setContactsList(contactsList.filter((c) => c.id !== id));
          setSelectedContact(null);
        } catch (e: any) {
          toast.error(e.message || "Failed to delete inquiry");
        }
      }
    );
  };

  const handleDeleteNewsletter = (email: string) => {
    triggerConfirm(
      "Remove Newsletter Subscriber",
      `Are you sure you want to remove ${email} from the newsletter database?`,
      async () => {
        try {
          await deleteNewsletter({ data: { email } });
          toast.success("Newsletter subscriber removed");
          setNewslettersList(newslettersList.filter((n) => n.email !== email));
        } catch (e: any) {
          toast.error(e.message || "Failed to remove subscriber");
        }
      }
    );
  };

  const handleSendMockReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replySubject.trim() || !replyBody.trim()) {
      toast.error("Please fill in both subject and email body.");
      return;
    }

    setSendingReply(true);
    setTimeout(() => {
      toast.success(`Reply email dispatched successfully to ${selectedContact.email}!`);
      setReplySubject("");
      setReplyBody("");
      setSendingReply(false);
      setSelectedContact(null);
    }, 1500);
  };

  // CSV Export for Newsletters
  const handleExportNewsletters = () => {
    if (newslettersList.length === 0) {
      toast.error("No newsletter subscribers to export.");
      return;
    }

    const headers = ["Email", "Joined Date"];
    const rows = newslettersList.map((item) => [
      item.email,
      new Date(item.created_at).toLocaleString()
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `newsletter_subscribers_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV file downloaded successfully!");
  };

  // Filter lists
  const filteredUsers = usersList.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredContacts = contactsList.filter(
    (c) =>
      (c.name || "").toLowerCase().includes(contactSearch.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(contactSearch.toLowerCase()) ||
      (c.company || "").toLowerCase().includes(contactSearch.toLowerCase()) ||
      (c.message || "").toLowerCase().includes(contactSearch.toLowerCase())
  );

  const filteredNewsletters = newslettersList.filter((n) =>
    (n.email || "").toLowerCase().includes(newsletterSearch.toLowerCase())
  );

  const filteredDeleteRequests = deleteRequestsList.filter((r) =>
    (r.email || "").toLowerCase().includes(deletionSearch.toLowerCase()) ||
    (r.user_name || "").toLowerCase().includes(deletionSearch.toLowerCase()) ||
    (r.reason || "").toLowerCase().includes(deletionSearch.toLowerCase())
  );

  // Pagination slicing for users table
  const usersPerPage = 10;
  const totalUserPages = Math.ceil(filteredUsers.length / usersPerPage);
  const clampedUserPage = Math.min(Math.max(1, userPage), totalUserPages || 1);
  const paginatedUsers = filteredUsers.slice(
    (clampedUserPage - 1) * usersPerPage,
    clampedUserPage * usersPerPage
  );

  // Compute Aggregations for Analytics Dashboard
  const now = new Date();
  const totalUsers = usersList.length;
  
  // Active Plans: status is approved/active and expiry date has not passed
  const activeSubs = subscriptionsList.filter(s => {
    if (s.status !== 'approved' && s.status !== 'active') return false;
    if (!s.expiry_date) return true;
    return new Date(s.expiry_date) > now;
  }).length;

  // Expired Plans: status is expired or expiry date has passed
  const expiredSubs = subscriptionsList.filter(s => {
    if (s.status === 'expired') return true;
    if (!s.expiry_date) return false;
    return new Date(s.expiry_date) <= now;
  }).length;

  // Expiring Soon: within 7 days
  const expiringSoonCount = subscriptionsList.filter(s => {
    if (s.status !== 'approved' && s.status !== 'active') return false;
    if (!s.expiry_date) return false;
    const expiry = new Date(s.expiry_date);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
  }).length;

  // Total Revenue: sum of all payments with status Paid or success
  const totalRevenue = paymentsList
    .filter(p => p.status === 'success' || p.status === 'Paid')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  // Monthly Revenue: payments in current calendar month
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthlyRecurringRevenue = paymentsList
    .filter(p => {
      if (p.status !== 'success' && p.status !== 'Paid') return false;
      const date = new Date(p.created_at);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .reduce((sum, p) => sum + Number(p.amount), 0);

  // New Users: last 30 days
  const newUsersCount = usersList.filter(u => {
    const regDate = new Date(u.created_at);
    const diffDays = (now.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }).length;

  // Returning Users: registered > 30 days and have logged in or ordered
  const returningUsersCount = usersList.filter(u => {
    const regDate = new Date(u.created_at);
    const diffDays = (now.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays > 30 && (u.last_login !== null || ordersList.some(o => o.user_id === u.id));
  }).length;

  const totalContacts = contactsList.length;
  const totalNewsletters = newslettersList.length;

  // Export User data as CSV helper
  const handleExportUsers = () => {
    if (usersList.length === 0) {
      toast.error("No users to export.");
      return;
    }
    const headers = ["User ID", "Name", "Email", "Mobile", "Role", "Status", "Last Login", "Registration Date"];
    const rows = usersList.map((u) => [
      u.id,
      u.name,
      u.email,
      u.mobile || "",
      u.role,
      u.status || "Active",
      u.last_login ? new Date(u.last_login).toLocaleString() : "Never",
      new Date(u.created_at).toLocaleString()
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map((r) => r.map((val) => `"${val}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `portal_users_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Users CSV exported successfully!");
  };

  const handleToggleUserStatus = async (userId: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await toggleUserStatus({ data: { userId, status: newStatus } });
      setUsersList(usersList.map(u => u.id === userId ? { ...u, status: newStatus } : u));
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, status: newStatus });
      }
      toast.success(`User status updated to ${newStatus}`);
    } catch (e: any) {
      toast.error(e.message || "Failed to update status");
    }
  };

  const handleSendManualReminder = async (userId: number) => {
    if (!manualReminderText.trim()) {
      toast.error("Please enter a reminder message.");
      return;
    }
    setSendingReminder(true);
    try {
      await sendManualNotification({
        data: {
          userId,
          title: manualReminderTitle,
          message: manualReminderText
        }
      });
      toast.success("Manual reminder dispatched successfully!");
      setManualReminderText("");
    } catch (e: any) {
      toast.error(e.message || "Failed to dispatch reminder");
    } finally {
      setSendingReminder(false);
    }
  };

  // Chart Dataset 1: Subscriptions by Product Type
  const productSubscriptionsDataset = products.map((prod) => {
    const count = subscriptionsList.filter((s) => s.product_id === prod.id).length;
    return {
      name: prod.name,
      subscribers: count,
      mrr: count * prod.price
    };
  }).filter(item => item.subscribers > 0);

  // Chart Dataset 2: User Registrations growth over time (last 6 months / entries)
  const usersByDate = [...usersList]
    .reverse()
    .reduce((acc: any[], user) => {
      const date = new Date(user.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" });
      const last = acc[acc.length - 1];
      if (last && last.date === date) {
        last.registrations += 1;
      } else {
        acc.push({ date, registrations: 1 });
      }
      return acc;
    }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center border-b border-border pb-4">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-muted rounded" />
            <div className="h-3.5 w-96 bg-muted rounded" />
          </div>
          <div className="h-8 w-24 bg-muted rounded" />
        </div>

        {/* Metrics Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="h-20 bg-muted/40 rounded-xl border border-border" />
          <div className="h-20 bg-muted/40 rounded-xl border border-border" />
          <div className="h-20 bg-muted/40 rounded-xl border border-border" />
          <div className="h-20 bg-muted/40 rounded-xl border border-border" />
          <div className="h-20 bg-muted/40 rounded-xl border border-border" />
        </div>

        {/* Tabs Bar Skeleton */}
        <div className="h-10 bg-muted/20 border border-border rounded-lg" />

        {/* Content Skeleton */}
        <div className="border border-border bg-card/25 rounded-xl p-6 space-y-4">
          <div className="h-8 w-32 bg-muted rounded" />
          <div className="space-y-2">
            <div className="h-12 bg-muted/40 rounded" />
            <div className="h-12 bg-muted/40 rounded" />
            <div className="h-12 bg-muted/40 rounded" />
            <div className="h-12 bg-muted/40 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Administrative Intelligence Panel
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Global compliance authority dashboard. Manage system resources, subscriptions, visibilities, and contact leads.
          </p>
        </div>
        <button
          onClick={handleManualRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-1.5 border border-border bg-card/50 text-xs font-bold rounded hover:bg-muted/70 disabled:opacity-50 transition-all self-start"
        >
          <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
          Sync State
        </button>
      </div>

      {/* ANALYTICS HIGHLIGHT METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="rounded-xl border border-border bg-card/40 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[9px] font-bold uppercase tracking-wider">Total Users</span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-xl font-black mt-2 text-foreground">{totalUsers}</h3>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[9px] font-bold uppercase tracking-wider">Active Plans</span>
            <CreditCard className="h-4 w-4 text-emerald-500" />
          </div>
          <h3 className="text-xl font-black mt-2 text-emerald-500">{activeSubs}</h3>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[9px] font-bold uppercase tracking-wider">Expired Plans</span>
            <CreditCard className="h-4 w-4 text-destructive" />
          </div>
          <h3 className="text-xl font-black mt-2 text-destructive">{expiredSubs}</h3>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[9px] font-bold uppercase tracking-wider">Expiring 7d</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <h3 className="text-xl font-black mt-2 text-amber-500">{expiringSoonCount}</h3>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[9px] font-bold uppercase tracking-wider">Total Revenue</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <h3 className="text-xl font-black mt-2 text-emerald-500">${totalRevenue.toFixed(2)}</h3>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[9px] font-bold uppercase tracking-wider">Monthly Rev</span>
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-xl font-black mt-2 text-primary">${monthlyRecurringRevenue.toFixed(2)}</h3>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[9px] font-bold uppercase tracking-wider">New Users</span>
            <UserCheck className="h-4 w-4 text-cyan-500" />
          </div>
          <h3 className="text-xl font-black mt-2 text-cyan-500">{newUsersCount}</h3>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[9px] font-bold uppercase tracking-wider">Returning</span>
            <Users className="h-4 w-4 text-purple-500" />
          </div>
          <h3 className="text-xl font-black mt-2 text-purple-500">{returningUsersCount}</h3>
        </div>
      </div>

      {/* ADMIN LEVEL TABS SELECTOR */}
      <div className="flex border-b border-border bg-muted/20 p-1 rounded-lg w-full overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors shrink-0 ${
            activeTab === "overview"
              ? "bg-card text-foreground border border-border shadow-sm"
              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          System Overview
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors shrink-0 ${
            activeTab === "users"
              ? "bg-card text-foreground border border-border shadow-sm"
              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          Users & Subscriptions
        </button>

        <button
          onClick={() => setActiveTab("visibility")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors shrink-0 ${
            activeTab === "visibility"
              ? "bg-card text-foreground border border-border shadow-sm"
              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <Eye className="h-3.5 w-3.5" />
          Product Visibility
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors shrink-0 ${
            activeTab === "contacts"
              ? "bg-card text-foreground border border-border shadow-sm"
              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <Mail className="h-3.5 w-3.5" />
          Contact Inquiries
        </button>

        <button
          onClick={() => setActiveTab("newsletter")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors shrink-0 ${
            activeTab === "newsletter"
              ? "bg-card text-foreground border border-border shadow-sm"
              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <FileSpreadsheet className="h-3.5 w-3.5" />
          Newsletter Subscribers
        </button>

        <button
          onClick={() => setActiveTab("deletion")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors shrink-0 ${
            activeTab === "deletion"
              ? "bg-card text-foreground border border-border shadow-sm"
              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
          Deletion Requests
          {deleteRequestsList.filter(r => r.status === "pending").length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-destructive text-destructive-foreground animate-pulse">
              {deleteRequestsList.filter(r => r.status === "pending").length}
            </span>
          )}
        </button>
      </div>

      {/* TAB CONTENT AREAS */}
      
      {/* 1. OVERVIEW (CHARTS & DETAILED STATS) */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Analytics Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-border bg-card/30 p-4">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Total Users</span>
              <div className="flex justify-between items-center mt-2">
                <span className="text-2xl font-black text-foreground">{usersList.length}</span>
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card/30 p-4">
              <span className="text-[10px] text-muted-foreground/90 font-bold uppercase tracking-wider block">Total Products</span>
              <div className="flex justify-between items-center mt-2">
                <span className="text-2xl font-black text-foreground">{products.length}</span>
                <Building className="h-5 w-5 text-cyan-500" />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card/30 p-4">
              <span className="text-[10px] text-muted-foreground/90 font-bold uppercase tracking-wider block">Total Orders</span>
              <div className="flex justify-between items-center mt-2">
                <span className="text-2xl font-black text-foreground">{ordersList.length}</span>
                <FileSpreadsheet className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card/30 p-4">
              <span className="text-[10px] text-muted-foreground/90 font-bold uppercase tracking-wider block">Total Revenue</span>
              <div className="flex justify-between items-center mt-2">
                <span className="text-2xl font-black text-emerald-500">${totalRevenue.toFixed(2)}</span>
                <DollarSign className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Chart Card 1: Subscriptions distributed */}
            <div className="rounded-xl border border-border bg-card/25 p-5">
              <h3 className="text-sm font-bold text-foreground mb-4">Subscription Rates by Product</h3>
              {productSubscriptionsDataset.length === 0 ? (
                <div className="h-[250px] flex items-center justify-center border border-dashed border-border rounded-lg bg-muted/10">
                  <p className="text-xs text-muted-foreground">No active product subscriptions registered.</p>
                </div>
              ) : (
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productSubscriptionsDataset} margin={{ bottom: 10, left: -20 }}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ background: "var(--card)", borderColor: "var(--border)" }} 
                        labelStyle={{ color: "var(--foreground)" }} 
                      />
                      <Bar dataKey="subscribers" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Chart Card 2: Growth of core registrations */}
            <div className="rounded-xl border border-border bg-card/25 p-5">
              <h3 className="text-sm font-bold text-foreground mb-4">User Registration Growth</h3>
              {usersByDate.length === 0 ? (
                <div className="h-[250px] flex items-center justify-center border border-dashed border-border rounded-lg bg-muted/10">
                  <p className="text-xs text-muted-foreground">No recent registrations logged.</p>
                </div>
              ) : (
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usersByDate} margin={{ bottom: 10, left: -20 }}>
                      <defs>
                        <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={9} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip 
                        contentStyle={{ background: "var(--card)", borderColor: "var(--border)" }} 
                        labelStyle={{ color: "var(--foreground)" }} 
                      />
                      <Area type="monotone" dataKey="registrations" stroke="var(--primary)" fillOpacity={1} fill="url(#colorReg)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="rounded-xl border border-border bg-card/25 p-5">
            <h3 className="text-sm font-bold text-foreground mb-4">Recent Activity</h3>
            {ordersList.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">No recent transactions or log activities recorded.</p>
            ) : (
              <div className="space-y-3.5">
                {ordersList.slice(0, 5).map((order) => {
                  const activityUser = usersList.find(u => u.id === order.user_id);
                  const isPaid = order.payment_status === "success" || order.payment_status === "Paid";
                  return (
                    <div key={order.id} className="flex justify-between items-center text-xs p-3 border border-border/40 rounded-lg bg-card/30">
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${isPaid ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"}`}>
                          <CreditCard className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">
                            {activityUser ? activityUser.name : "System User"} purchased {order.item_id} ({order.item_type})
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">Invoice #: {order.invoice_number}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-foreground block font-mono">${Number(order.total_amount).toFixed(2)}</span>
                        <span className="text-[10px] text-muted-foreground block mt-0.5">{new Date(order.order_date).toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. USERS & SUBSCRIPTIONS */}
      {activeTab === "users" && (
        <div className="space-y-6">
          {/* Pending Access Requests Section */}
          {subscriptionsList.some(s => s.status === 'pending') && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 space-y-4">
              <h3 className="text-sm font-bold text-amber-500 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Pending Access Requests
              </h3>
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold uppercase tracking-wider">
                        <th className="p-3">User</th>
                        <th className="p-3">Product</th>
                        <th className="p-3">Request Date</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {subscriptionsList.filter(s => s.status === 'pending').map((sub) => {
                        const subUser = usersList.find(u => u.id === sub.user_id);
                        const prod = products.find(p => p.id === sub.product_id);
                        if (!subUser) return null;
                        return (
                          <tr key={sub.id} className="hover:bg-muted/10 transition-colors">
                            <td className="p-3">
                              <span className="font-semibold text-foreground text-sm">{subUser.name}</span>
                              <span className="text-muted-foreground block mt-0.5 text-xs">{subUser.email}</span>
                            </td>
                            <td className="p-3">
                              <span className="font-bold text-foreground text-sm">{prod ? prod.name : sub.product_id}</span>
                              <span className="text-muted-foreground block text-[10px] mt-0.5">${prod ? prod.price : 0}/mo</span>
                            </td>
                            <td className="p-3 text-muted-foreground text-xs">
                              {new Date(sub.created_at).toLocaleString()}
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => handleApproveRequest(sub.user_id, sub.product_id)}
                                disabled={adminActionLoading !== null}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded transition-all text-xs cursor-pointer shadow-sm flex inline-flex items-center gap-1 disabled:opacity-50"
                              >
                                {adminActionLoading === `${sub.user_id}-${sub.product_id}-approve` && <Loader2 className="h-3 w-3 animate-spin" />}
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectRequest(sub.user_id, sub.product_id)}
                                disabled={adminActionLoading !== null}
                                className="bg-destructive hover:bg-destructive/90 text-white font-bold px-3 py-1.5 rounded transition-all text-xs cursor-pointer shadow-sm flex inline-flex items-center gap-1 disabled:opacity-50"
                              >
                                {adminActionLoading === `${sub.user_id}-${sub.product_id}-reject` && <Loader2 className="h-3 w-3 animate-spin" />}
                                Reject
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* Filters row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search user logs by name or email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full bg-card/50 border border-border pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              onClick={handleExportUsers}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              Export Users CSV
            </button>
          </div>

          {/* Users Table */}
          <div className="rounded-xl border border-border bg-card/25 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                    <th className="p-4">User</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Last Login</th>
                    <th className="p-4">Active Subscriptions</th>
                    <th className="p-4">Registration Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-xs text-muted-foreground">
                        No registered users match search constraints.
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((u) => {
                      const userSubs = subscriptionsList.filter((s) => s.user_id === u.id);
                      return (
                        <tr key={u.id} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4">
                            <div className="font-semibold text-foreground">{u.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{u.email}</div>
                            {u.mobile && <div className="text-[10px] text-muted-foreground/80 font-mono mt-0.5">{u.mobile}</div>}
                          </td>
                          <td className="p-4">
                            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              u.role === "admin"
                                ? "bg-primary/20 text-primary border border-primary/20"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              u.status === "Inactive"
                                ? "bg-destructive/10 text-destructive border border-destructive/20"
                                : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            }`}>
                              {u.status || "Active"}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-muted-foreground font-mono">
                            {u.last_login ? new Date(u.last_login).toLocaleString() : "Never"}
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {userSubs.filter(s => s.status !== "rejected").length === 0 ? (
                                <span className="text-[10px] text-muted-foreground italic">None</span>
                              ) : (
                                userSubs.filter(s => s.status !== "rejected").map((sub) => {
                                  const prod = products.find((p) => p.id === sub.product_id);
                                  const isPending = sub.status === "pending";
                                  return (
                                    <span key={sub.product_id} className={`text-[9px] font-bold border px-1.5 py-0.5 rounded ${
                                      isPending 
                                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20" 
                                        : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                    }`}>
                                      {prod ? prod.name : sub.product_id}
                                      {isPending && " (Pending)"}
                                    </span>
                                  );
                                })
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-xs text-muted-foreground">
                            {new Date(u.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right space-x-1.5">
                            <button
                              onClick={() => setSelectedUser(u)}
                              className="text-xs font-bold bg-muted/65 hover:bg-muted border border-border px-3 py-1.5 rounded transition-all text-foreground"
                            >
                              Manage User
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalUserPages > 1 && (
              <div className="flex justify-between items-center p-4 bg-muted/30 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  Showing {((clampedUserPage - 1) * usersPerPage) + 1} to {Math.min(clampedUserPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={clampedUserPage === 1}
                    onClick={() => setUserPage(clampedUserPage - 1)}
                    className="px-3 py-1.5 rounded bg-muted hover:bg-muted/80 text-xs font-bold disabled:opacity-50 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    disabled={clampedUserPage === totalUserPages}
                    onClick={() => setUserPage(clampedUserPage + 1)}
                    className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-bold disabled:opacity-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}


      {/* 3. PRODUCT VISIBILITY */}
      {activeTab === "visibility" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card/25 p-5">
            <h3 className="text-sm font-bold text-foreground">Visibility Controller</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Toggle visibility of individual product cards. Hidden products will not be visible to standard users in the portal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((prod) => {
              const Icon = prod.icon;
              const isVisible = isProductVisible(prod.id);
              return (
                <div key={prod.id} className="rounded-xl border border-border bg-card/40 p-4 flex justify-between items-start gap-4 hover:shadow-sm transition-all duration-300">
                  <div className="flex gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground leading-snug">{prod.name}</h4>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">{prod.desc}</p>
                      <div className="mt-2 text-[10px] font-bold text-muted-foreground bg-muted w-max px-2 py-0.5 rounded">
                        ${prod.price}/mo
                      </div>
                    </div>
                  </div>

                  <RadixTooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleVisibilityToggle(prod.id, isVisible)}
                        className="shrink-0"
                      >
                        {isVisible ? (
                          <div className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/25">
                            <Eye className="h-3 w-3" />
                            VISIBLE
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-[10px] font-extrabold text-muted-foreground bg-muted px-2 py-1 rounded-full border border-border">
                            <EyeOff className="h-3 w-3" />
                            HIDDEN
                          </div>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isVisible ? "Visible to users. Click to hide." : "Hidden from users. Click to make visible."}</p>
                    </TooltipContent>
                  </RadixTooltip>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. CONTACT INQUIRIES */}
      {activeTab === "contacts" && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search contact logs by sender, company, message keywords..."
              value={contactSearch}
              onChange={(e) => setContactSearch(e.target.value)}
              className="w-full bg-card/50 border border-border pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="rounded-xl border border-border bg-card/25 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                    <th className="p-4">Sender</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Message Snapshot</th>
                    <th className="p-4">Date Submitted</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-xs text-muted-foreground">
                        No contact submissions matched filter constraints.
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((c) => (
                      <tr key={c.id} className="hover:bg-muted/10 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-foreground">{c.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{c.email}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-foreground">{c.company}</div>
                          {c.role && <div className="text-xs text-muted-foreground mt-0.5">{c.role}</div>}
                        </td>
                        <td className="p-4 text-xs text-muted-foreground max-w-xs truncate">
                          {c.message}
                        </td>
                        <td className="p-4 text-xs text-muted-foreground">
                          {new Date(c.created_at).toLocaleString()}
                        </td>
                        <td className="p-4 text-right space-x-1">
                          <button
                            onClick={() => setSelectedContact(c)}
                            className="text-xs bg-muted/65 hover:bg-muted border border-border px-2.5 py-1.5 rounded text-foreground font-bold transition-all"
                          >
                            Review
                          </button>
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="text-xs text-destructive bg-destructive/10 hover:bg-destructive/20 border border-destructive/20 p-1.5 rounded transition-all inline-flex items-center"
                            title="Delete inquiry log"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. NEWSLETTER SUBSCRIBERS */}
      {activeTab === "newsletter" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search newsletter subscriber list..."
                value={newsletterSearch}
                onChange={(e) => setNewsletterSearch(e.target.value)}
                className="w-full bg-card/50 border border-border pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <RadixTooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleExportNewsletters}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export CSV List
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download newsletter logs as a CSV spreadsheet</p>
              </TooltipContent>
            </RadixTooltip>
          </div>

          <div className="rounded-xl border border-border bg-card/25 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                    <th className="p-4">Subscriber Email</th>
                    <th className="p-4">Date Subscribed</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredNewsletters.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-xs text-muted-foreground">
                        No newsletter subscriber email matches search filters.
                      </td>
                    </tr>
                  ) : (
                    filteredNewsletters.map((n) => (
                      <tr key={n.email} className="hover:bg-muted/10 transition-colors">
                        <td className="p-4 font-semibold text-foreground">
                          {n.email}
                        </td>
                        <td className="p-4 text-xs text-muted-foreground">
                          {new Date(n.created_at).toLocaleString()}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteNewsletter(n.email)}
                            className="text-xs text-destructive bg-destructive/10 hover:bg-destructive/20 border border-destructive/20 p-1.5 rounded transition-all inline-flex items-center"
                            title="Remove subscriber"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. DATA DELETION REQUESTS */}
      {activeTab === "deletion" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search deletion requests by user, email, or reason..."
                value={deletionSearch}
                onChange={(e) => setDeletionSearch(e.target.value)}
                className="w-full bg-card/50 border border-border pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card/25 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                    <th className="p-4">User</th>
                    <th className="p-4">Reason for Deletion</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Requested At</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredDeleteRequests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-xs text-muted-foreground">
                        No pending or processed data deletion requests match search filters.
                      </td>
                    </tr>
                  ) : (
                    filteredDeleteRequests.map((r) => (
                      <tr key={r.id} className="hover:bg-muted/10 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-foreground">{r.user_name || "Unknown User"}</div>
                          <div className="text-xs text-muted-foreground">{r.email}</div>
                        </td>
                        <td className="p-4 text-xs text-foreground max-w-xs truncate" title={r.reason}>
                          {r.reason || <span className="text-muted-foreground italic">No reason provided</span>}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            r.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-muted-foreground">
                          {new Date(r.requested_at).toLocaleString()}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          {r.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleDeleteUser(r.user_id)}
                                className="text-xs text-white bg-destructive hover:bg-destructive/95 px-3 py-1.5 rounded font-bold shadow-sm transition-all"
                                title="Permanently delete user and data"
                              >
                                Approve & Delete User
                              </button>
                              <button
                                onClick={() => handleDismissDeleteRequest(r.id)}
                                className="text-xs text-muted-foreground bg-muted hover:bg-muted/70 hover:text-foreground border border-border px-3 py-1.5 rounded transition-all"
                                title="Dismiss request without deleting account"
                              >
                                Dismiss
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* USER MANAGEMENT SLIDING DRAWER / MODAL */}
      {selectedUser && (() => {
        const userOrders = ordersList.filter(o => o.user_id === selectedUser.id);
        const totalSpend = userOrders
          .filter(o => o.payment_status === 'success' || o.payment_status === 'Paid')
          .reduce((sum, o) => sum + Number(o.total_amount), 0);
        const totalOrders = userOrders.length;
        
        const getRemainingDaysText = (expiryDateStr: string | null) => {
          if (!expiryDateStr) return { text: "Unlimited", color: "text-emerald-500" };
          const expiry = new Date(expiryDateStr);
          const diffTime = expiry.getTime() - new Date().getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays <= 0) return { text: "Expired", color: "text-muted-foreground" };
          if (diffDays === 1) return { text: "Expires Today", color: "text-destructive font-bold" };
          if (diffDays <= 3) return { text: `${diffDays} days left`, color: "text-destructive font-semibold" };
          if (diffDays <= 7) return { text: `${diffDays} days left`, color: "text-amber-500 font-semibold" };
          return { text: `${diffDays} days left`, color: "text-emerald-500" };
        };

        const userSubscriptions = subscriptionsList.filter(s => s.user_id === selectedUser.id);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl p-6 h-full flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-border pb-4">
                  <div>
                    <h3 className="text-lg font-black text-foreground">Configure Portal User</h3>
                    <p className="text-xs text-muted-foreground mt-1">Direct account configuration and resource bindings.</p>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="p-1 hover:bg-muted border border-border rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Profile fields */}
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">User Information</div>
                    <div className="mt-2 grid grid-cols-2 gap-3 bg-muted/20 p-3 rounded-lg border border-border">
                      <div>
                        <span className="text-[10px] text-muted-foreground block">Full Name</span>
                        <span className="font-bold text-foreground truncate block">{selectedUser.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground block">Email ID</span>
                        <span className="font-bold text-foreground truncate block" title={selectedUser.email}>{selectedUser.email}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground block">Registration Date</span>
                        <span className="text-xs text-foreground block">
                          {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground block">Last Login</span>
                        <span className="text-xs text-foreground block">
                          {selectedUser.last_login ? new Date(selectedUser.last_login).toLocaleString() : "Never"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Account Status & Actions</div>
                    <div className="mt-2 bg-muted/10 p-3 rounded-lg border border-border flex items-center justify-between">
                      <div>
                        <span className="text-xs text-muted-foreground block">Status:</span>
                        <span className={`text-xs font-bold ${selectedUser.status === 'Inactive' ? 'text-destructive' : 'text-emerald-500'}`}>
                          {selectedUser.status || "Active"}
                        </span>
                      </div>
                      <button
                        onClick={() => handleToggleUserStatus(selectedUser.id, selectedUser.status || "Active")}
                        className={`text-xs font-bold px-3 py-1.5 rounded transition-all border ${
                          selectedUser.status === 'Inactive'
                            ? 'bg-emerald-600/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-600/20'
                            : 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20'
                        }`}
                      >
                        {selectedUser.status === 'Inactive' ? 'Activate Account' : 'Deactivate Account'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/10 p-3 rounded-lg border border-border text-center">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold block">Total Orders</span>
                      <span className="text-lg font-black text-foreground">{totalOrders}</span>
                    </div>
                    <div className="bg-muted/10 p-3 rounded-lg border border-border text-center">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold block">Total Spent</span>
                      <span className="text-lg font-black text-emerald-500">${totalSpend.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Profile details */}
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Profile Details</div>
                    <div className="mt-2 space-y-2 bg-muted/10 p-3 rounded-lg border border-border text-xs">
                      <div className="flex justify-between py-1 border-b border-border/40">
                        <span className="text-muted-foreground flex items-center gap-1">Profession:</span>
                        <span className="font-semibold text-foreground">{selectedUser.profession || "Not Set"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/40">
                        <span className="text-muted-foreground flex items-center gap-1">Company:</span>
                        <span className="font-semibold text-foreground">{selectedUser.company_name || "Not Set"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/40">
                        <span className="text-muted-foreground flex items-center gap-1">Mobile:</span>
                        <span className="font-semibold text-foreground">{selectedUser.mobile || "Not Set"}</span>
                      </div>
                      <div className="flex flex-col py-1">
                        <span className="text-muted-foreground">Address:</span>
                        <span className="font-semibold text-foreground mt-0.5 block leading-relaxed">{selectedUser.address || "Not Set"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Role Switcher */}
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-2">User Access Role</label>
                    <select
                      value={selectedUser.role}
                      disabled={selectedUser.id === currentUserId}
                      onChange={(e) => handleRoleChange(selectedUser.id, e.target.value)}
                      className="w-full bg-card border border-border rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                    >
                      <option value="user">Standard User (Portal access)</option>
                      <option value="executive">Support Executive (Solve tickets)</option>
                      <option value="admin">Administrator (Global access)</option>
                    </select>
                    {selectedUser.id === currentUserId && (
                      <p className="text-[10px] text-amber-500 mt-1 italic">You cannot change your own admin role.</p>
                    )}
                  </div>

                  {/* manual notifications dispatcher */}
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-2">Dispatch Manual Alert / Reminder</label>
                    <div className="space-y-2 bg-muted/10 p-3 rounded-lg border border-border">
                      <input
                        type="text"
                        placeholder="Alert Title (e.g. Account Review Required)"
                        value={manualReminderTitle}
                        onChange={(e) => setManualReminderTitle(e.target.value)}
                        className="w-full bg-card border border-border rounded p-1.5 text-xs text-foreground focus:ring-1 focus:ring-primary"
                      />
                      <textarea
                        rows={2}
                        placeholder="Enter the alert notification message for this user..."
                        value={manualReminderText}
                        onChange={(e) => setManualReminderText(e.target.value)}
                        className="w-full bg-card border border-border rounded p-1.5 text-xs text-foreground focus:ring-1 focus:ring-primary"
                      />
                      <button
                        onClick={() => handleSendManualReminder(selectedUser.id)}
                        disabled={sendingReminder}
                        className="w-full py-1.5 bg-primary text-primary-foreground font-bold text-xs rounded hover:bg-primary/95 transition-all flex items-center justify-center gap-1.5"
                      >
                        {sendingReminder && <Loader2 className="h-3 w-3 animate-spin" />}
                        Send Custom Notification
                      </button>
                    </div>
                  </div>

                  {/* Detailed subscriptions and plan dates list */}
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-2">Active Subscriptions & Plan Dates</label>
                    {userSubscriptions.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic p-2 bg-muted/10 rounded-lg border border-border">No active subscriptions for this user.</p>
                    ) : (
                      <div className="border border-border rounded-lg divide-y divide-border bg-card/50 max-h-[200px] overflow-y-auto">
                        {userSubscriptions.map((sub) => {
                          const remainingInfo = getRemainingDaysText(sub.expiry_date);
                          return (
                            <div key={sub.id} className="p-2.5 text-xs">
                              <div className="flex justify-between items-center font-bold">
                                <span>{sub.product_id}</span>
                                <span className={remainingInfo.color}>{remainingInfo.text}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-1.5 mt-1 text-[10px] text-muted-foreground">
                                <div>Start: {sub.start_date ? new Date(sub.start_date).toLocaleDateString() : "N/A"}</div>
                                <div>Expiry: {sub.expiry_date ? new Date(sub.expiry_date).toLocaleDateString() : "Lifetime"}</div>
                                <div>Method: {sub.payment_method || "N/A"}</div>
                                <div>Invoice: <span className="font-mono text-primary">{sub.invoice_number || "N/A"}</span></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Grant Product Subscriptions Checkboxes */}
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-2">Quick Grant Product Subscriptions</label>
                    <div className="border border-border rounded-lg max-h-[200px] overflow-y-auto divide-y divide-border bg-card/50">
                      {products.map((prod) => {
                        const sub = subscriptionsList.find((s) => s.user_id === selectedUser.id && s.product_id === prod.id);
                        const isApproved = sub && (sub.status === 'approved' || sub.status === 'active');
                        const isPending = sub && sub.status === 'pending';
                        const isRejected = sub && sub.status === 'rejected';

                        return (
                          <div key={prod.id} className="p-2 flex items-center justify-between hover:bg-muted/10 transition-colors">
                            <div className="flex items-center gap-2">
                              <prod.icon className="h-3.5 w-3.5 text-muted-foreground" />
                              <div>
                                <span className="text-xs font-semibold block text-foreground leading-none">{prod.name}</span>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <span className="text-[9px] text-muted-foreground">${prod.price}/mo</span>
                                  {isApproved && (
                                    <span className="text-[8px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.2 rounded uppercase">Approved</span>
                                  )}
                                  {isPending && (
                                    <span className="text-[8px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.2 rounded uppercase">Pending</span>
                                  )}
                                  {isRejected && (
                                    <span className="text-[8px] font-bold text-destructive bg-destructive/10 px-1.5 py-0.2 rounded uppercase">Rejected</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {isPending ? (
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => handleApproveRequest(selectedUser.id, prod.id)}
                                    disabled={adminActionLoading !== null}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-1 rounded text-[10px] shadow-sm cursor-pointer flex items-center gap-1 disabled:opacity-50"
                                  >
                                    {adminActionLoading === `${selectedUser.id}-${prod.id}-approve` && <Loader2 className="h-2.5 w-2.5 animate-spin" />}
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleRejectRequest(selectedUser.id, prod.id)}
                                    disabled={adminActionLoading !== null}
                                    className="bg-destructive hover:bg-destructive/90 text-white font-bold px-2 py-1 rounded text-[10px] shadow-sm cursor-pointer flex items-center gap-1 disabled:opacity-50"
                                  >
                                    {adminActionLoading === `${selectedUser.id}-${prod.id}-reject` && <Loader2 className="h-2.5 w-2.5 animate-spin" />}
                                    Reject
                                  </button>
                                </div>
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={isApproved}
                                  onChange={() => handleSubscriptionToggle(selectedUser.id, prod.id, isApproved)}
                                  disabled={adminActionLoading !== null}
                                  className="rounded border-border bg-transparent text-primary focus:ring-primary h-4 w-4 disabled:opacity-50"
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-border pt-4 mt-6 flex justify-between gap-3 shrink-0">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 py-2 text-xs font-semibold border border-border rounded-lg bg-transparent hover:bg-muted/50 transition-colors"
                >
                  Close Drawer
                </button>
                
                <button
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  disabled={selectedUser.id === currentUserId || adminActionLoading !== null}
                  className="flex-1 py-2 text-xs font-bold text-white bg-destructive hover:bg-destructive/90 disabled:opacity-50 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  {adminActionLoading === `delete-${selectedUser.id}` ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* CONTACT LOG DETAIL / REPLY MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl p-6 flex flex-col justify-between max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="space-y-5">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-border pb-4">
                <div>
                  <h3 className="text-lg font-black text-foreground flex items-center gap-1.5">
                    <Inbox className="h-5 w-5 text-primary" />
                    Review Inquiry
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Submitted at {new Date(selectedContact.created_at).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="p-1 hover:bg-muted border border-border rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Inquiry Metadata */}
              <div className="grid sm:grid-cols-3 gap-4 bg-muted/20 p-4 rounded-xl border border-border text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">Sender</span>
                  <span className="font-semibold text-foreground mt-1 block">{selectedContact.name}</span>
                  <span className="text-muted-foreground mt-0.5 block">{selectedContact.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">Company</span>
                  <span className="font-semibold text-foreground mt-1 block">{selectedContact.company}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">Role</span>
                  <span className="font-semibold text-foreground mt-1 block">{selectedContact.role || "Not Provided"}</span>
                </div>
              </div>

              {/* Message */}
              <div>
                <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider mb-2">Message Body</span>
                <div className="p-4 rounded-xl border border-border bg-muted/10 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>

              {/* Reply Section */}
              <div className="border-t border-border pt-4">
                <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider mb-3">Compose Reply (Simulated)</span>
                <form onSubmit={handleSendMockReply} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Subject of the email..."
                      value={replySubject}
                      onChange={(e) => setReplySubject(e.target.value)}
                      className="w-full bg-card border border-border px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Write your email response here..."
                      rows={4}
                      value={replyBody}
                      onChange={(e) => setReplyBody(e.target.value)}
                      className="w-full bg-card border border-border px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={sendingReply}
                      className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 disabled:opacity-50 transition-colors"
                    >
                      {sendingReply ? "Sending Dispatch..." : "Send Reply Email"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-border pt-4 mt-6 flex justify-between gap-3 shrink-0">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 text-xs font-semibold border border-border rounded-lg bg-transparent hover:bg-muted/50 transition-colors"
              >
                Close Review
              </button>

              <button
                onClick={() => handleDeleteContact(selectedContact.id)}
                className="px-4 py-2 text-xs font-bold text-white bg-destructive hover:bg-destructive/90 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Inquiry Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL CUSTOM CONFIRMATION DIALOG */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmConfig?.title}</AlertDialogTitle>
            <AlertDialogDescription>{confirmConfig?.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (confirmConfig?.onConfirm) confirmConfig.onConfirm();
              setConfirmOpen(false);
            }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
