import React, { useState, useEffect } from "react";
import { managerService, TeamMembersResponse, TeamLeaveSummaryResponse, TeamShiftSummaryResponse, EmployeeCreatePayload } from "@/services/managerService";
import { websocketService } from "@/services/api/websocketService";
import { useAuth } from "@/hooks/useAuth";
import { Users, Calendar, Clock, UserPlus, RefreshCw, AlertCircle, CheckCircle2, ShieldAlert, Zap } from "lucide-react";

export const ManagerModule: React.FC = () => {
  const { user, isManager, isAdmin, isHR } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMembersResponse | null>(null);
  const [teamLeave, setTeamLeave] = useState<TeamLeaveSummaryResponse | null>(null);
  const [teamShifts, setTeamShifts] = useState<TeamShiftSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [liveSyncFlash, setLiveSyncFlash] = useState(false);
  const [activeTab, setActiveTab] = useState<"members" | "leave" | "shifts" | "register">("members");

  // Registration Form State
  const [regForm, setRegForm] = useState<EmployeeCreatePayload>({
    employee_code: "",
    name: "",
    email: "",
    password: "",
    role: "employee",
    department: "",
    manager_code: user?.employee_code || "",
  });
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);
  const [regError, setRegError] = useState<string | null>(null);

  const fetchManagerData = async () => {
    setLoading(true);
    try {
      const [membersRes, leaveRes, shiftsRes] = await Promise.all([
        managerService.getTeamMembers().catch(() => null),
        managerService.getTeamLeaveSummary().catch(() => null),
        managerService.getTeamShiftSummary().catch(() => null),
      ]);
      if (membersRes) setTeamMembers(membersRes);
      if (leaveRes) setTeamLeave(leaveRes);
      if (shiftsRes) setTeamShifts(shiftsRes);
    } catch (err) {
      console.error("Failed to load manager data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isManager) {
      fetchManagerData();

      // Register Real-Time WebSocket Subscribers for Manager
      const handleTeamWsUpdate = (data: any) => {
        console.log("⚡ Manager Module Live Team Event Triggered:", data);
        setLiveSyncFlash(true);
        setTimeout(() => setLiveSyncFlash(false), 2000);
        fetchManagerData();
      };

      websocketService.subscribe("team_updated", handleTeamWsUpdate);
      websocketService.subscribe("team_leave_updated", handleTeamWsUpdate);
      websocketService.subscribe("team_shift_updated", handleTeamWsUpdate);

      return () => {
        websocketService.unsubscribe("team_updated", handleTeamWsUpdate);
        websocketService.unsubscribe("team_leave_updated", handleTeamWsUpdate);
        websocketService.unsubscribe("team_shift_updated", handleTeamWsUpdate);
      };
    }
  }, [isManager]);

  const handleRegisterEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    setRegSuccess(null);
    setRegError(null);

    try {
      const created = await managerService.createEmployee(regForm);
      setRegSuccess(`Employee ${created.name} (${created.employee_code}) successfully registered!`);
      setRegForm({
        employee_code: "",
        name: "",
        email: "",
        password: "",
        role: "employee",
        department: "",
        manager_code: user?.employee_code || "",
      });
      fetchManagerData();
    } catch (err: any) {
      setRegError(err?.message || "Failed to register employee.");
    } finally {
      setRegLoading(false);
    }
  };

  if (!isManager) {
    return (
      <div className="p-6 border border-border rounded-xl bg-card text-center space-y-3">
        <ShieldAlert className="h-8 w-8 text-amber-500 mx-auto" />
        <h3 className="text-sm font-bold text-foreground">Manager Authorization Required</h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          You are currently logged in as an <span className="font-semibold">{user?.role || "employee"}</span>. Team managerial details and direct report tools are reserved for Manager, HR, and Admin roles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            Manager Dashboard
            {liveSyncFlash && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 flex items-center gap-1 animate-bounce">
                <Zap className="h-3 w-3" /> Live Team Data Syncing...
              </span>
            )}
          </h2>
          <p className="text-xs text-muted-foreground">Manage your direct reports, team leaves, and shift allocations</p>
        </div>
        <button
          onClick={fetchManagerData}
          disabled={loading}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent flex items-center gap-1.5 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh Data
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-5 border rounded-xl bg-card shadow-sm space-y-2 transition-all duration-500 ${liveSyncFlash ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Total Team Members</span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {teamMembers?.team_count !== undefined ? teamMembers.team_count : 0}
          </p>
        </div>

        <div className="p-5 border border-border rounded-xl bg-card shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Manager In-Charge</span>
            <Users className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-sm font-bold text-foreground">{user?.name || "Test Manager"}</p>
          <p className="text-[10px] text-muted-foreground font-mono">Code: {user?.employee_code || "MGR001"}</p>
        </div>

        <div className="p-5 border border-border rounded-xl bg-card shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Active Role</span>
            <Users className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-sm font-bold text-foreground uppercase">{user?.role || "MANAGER"}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border text-xs gap-4 font-semibold">
        <button
          onClick={() => setActiveTab("members")}
          className={`pb-2 transition-colors flex items-center gap-1.5 border-b-2 ${
            activeTab === "members" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="h-3.5 w-3.5" /> Team Members ({teamMembers?.team_count || 0})
        </button>
        <button
          onClick={() => setActiveTab("leave")}
          className={`pb-2 transition-colors flex items-center gap-1.5 border-b-2 ${
            activeTab === "leave" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Calendar className="h-3.5 w-3.5" /> Team Leave Summary
        </button>
        <button
          onClick={() => setActiveTab("shifts")}
          className={`pb-2 transition-colors flex items-center gap-1.5 border-b-2 ${
            activeTab === "shifts" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock className="h-3.5 w-3.5" /> Shift Distributions
        </button>

        {(isAdmin || isHR) && (
          <button
            onClick={() => setActiveTab("register")}
            className={`pb-2 transition-colors flex items-center gap-1.5 border-b-2 ml-auto ${
              activeTab === "register" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserPlus className="h-3.5 w-3.5" /> Register Employee
          </button>
        )}
      </div>

      {/* Tab 1: Team Members Table */}
      {activeTab === "members" && (
        <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/40 uppercase font-mono tracking-wider border-b border-border text-muted-foreground">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Department</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {teamMembers?.employees && teamMembers.employees.length > 0 ? (
                teamMembers.employees.map((emp) => (
                  <tr key={emp.employee_code} className="hover:bg-muted/20">
                    <td className="p-3 font-mono text-primary font-semibold">{emp.employee_code}</td>
                    <td className="p-3 font-semibold text-foreground">{emp.name}</td>
                    <td className="p-3 text-muted-foreground">{emp.email}</td>
                    <td className="p-3 text-muted-foreground">{emp.department || "Engineering"}</td>
                    <td className="p-3 text-muted-foreground">{emp.designation || "Software Engineer"}</td>
                    <td className="p-3">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                        {emp.role}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-muted-foreground">
                    {loading ? "Loading team members..." : "No direct reports found for your manager account."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Team Leave Summary */}
      {activeTab === "leave" && (
        <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/40 uppercase font-mono tracking-wider border-b border-border text-muted-foreground">
              <tr>
                <th className="p-3">Employee Code</th>
                <th className="p-3">Staff Name</th>
                <th className="p-3">Leave Balance Days</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {teamLeave?.employees && teamLeave.employees.length > 0 ? (
                teamLeave.employees.map((emp) => (
                  <tr key={emp.employee_code} className="hover:bg-muted/20">
                    <td className="p-3 font-mono text-primary font-semibold">{emp.employee_code}</td>
                    <td className="p-3 font-semibold text-foreground">{emp.name}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">
                        {emp.leave_balance !== null ? `${emp.leave_balance} Days` : "12 Days"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-muted-foreground">
                    {loading ? "Loading leave summaries..." : "No leave summaries recorded for team members."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Shift Distribution */}
      {activeTab === "shifts" && (
        <div className="space-y-4">
          {teamShifts?.shift_distribution && (
            <div className="p-4 border border-border rounded-xl bg-card flex items-center gap-4 text-xs">
              <span className="font-bold text-foreground">Shift Breakdown:</span>
              {Object.entries(teamShifts.shift_distribution).map(([shiftName, count]) => (
                <span key={shiftName} className="px-2.5 py-1 rounded-lg bg-muted border border-border font-medium">
                  {shiftName}: <strong className="text-primary">{count}</strong>
                </span>
              ))}
            </div>
          )}

          <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/40 uppercase font-mono tracking-wider border-b border-border text-muted-foreground">
                <tr>
                  <th className="p-3">Employee Code</th>
                  <th className="p-3">Staff Name</th>
                  <th className="p-3">Shift Start</th>
                  <th className="p-3">Shift End</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {teamShifts?.employees && teamShifts.employees.length > 0 ? (
                  teamShifts.employees.map((emp) => (
                    <tr key={emp.employee_code} className="hover:bg-muted/20">
                      <td className="p-3 font-mono text-primary font-semibold">{emp.employee_code}</td>
                      <td className="p-3 font-semibold text-foreground">{emp.name}</td>
                      <td className="p-3 text-muted-foreground">{emp.shift_start || "09:00 AM"}</td>
                      <td className="p-3 text-muted-foreground">{emp.shift_end || "05:00 PM"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-muted-foreground">
                      {loading ? "Loading shift details..." : "No shift data recorded for team members."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Register Employee Form (Admin/HR) */}
      {activeTab === "register" && (isAdmin || isHR) && (
        <div className="p-6 border border-border rounded-xl bg-card space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-foreground">Register New Employee Account</h3>

          {regSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-500 font-bold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> {regSuccess}
            </div>
          )}

          {regError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-xs text-destructive flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> {regError}
            </div>
          )}

          <form onSubmit={handleRegisterEmployee} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Employee Code</label>
              <input
                type="text"
                required
                placeholder="EMP002"
                value={regForm.employee_code}
                onChange={(e) => setRegForm({ ...regForm, employee_code: e.target.value })}
                className="w-full bg-muted/40 border border-border rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={regForm.name}
                onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                className="w-full bg-muted/40 border border-border rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="jane.doe@company.com"
                value={regForm.email}
                onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                className="w-full bg-muted/40 border border-border rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={regForm.password}
                onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                className="w-full bg-muted/40 border border-border rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Role</label>
              <select
                value={regForm.role}
                onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
                className="w-full bg-muted/40 border border-border rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="hr">HR</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Department</label>
              <input
                type="text"
                placeholder="Engineering"
                value={regForm.department || ""}
                onChange={(e) => setRegForm({ ...regForm, department: e.target.value })}
                className="w-full bg-muted/40 border border-border rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={regLoading}
                className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/95 disabled:opacity-50 transition-colors"
              >
                {regLoading ? "Registering..." : "Submit Registration"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
