import React, { useState, useEffect } from "react";
import { employeeService, LeaveBalanceResponse, ShiftTimingResponse, RemainingHoursResponse } from "@/services/employeeService";
import { policyService, PolicySearchResponse } from "@/services/policyService";
import { websocketService } from "@/services/api/websocketService";
import { useAuth } from "@/hooks/useAuth";
import { Calendar, Clock, User, Search, FileText, Loader2, AlertCircle, RefreshCw, Zap } from "lucide-react";

export const EmployeeModule: React.FC = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState<LeaveBalanceResponse | null>(null);
  const [shift, setShift] = useState<ShiftTimingResponse | null>(null);
  const [remaining, setRemaining] = useState<RemainingHoursResponse | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [liveSyncFlash, setLiveSyncFlash] = useState(false);

  // Policy Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [policyResults, setPolicyResults] = useState<PolicySearchResponse | null>(null);
  const [searchingPolicy, setSearchingPolicy] = useState(false);
  const [policyError, setPolicyError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const [lRes, sRes, rRes] = await Promise.all([
        employeeService.getLeaveBalance().catch(() => null),
        employeeService.getShiftTiming().catch(() => null),
        employeeService.getRemainingHours().catch(() => null),
      ]);
      if (lRes) setLeave(lRes);
      if (sRes) setShift(sRes);
      if (rRes) setRemaining(rRes);
    } catch (err) {
      console.error("Failed to fetch employee stats:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Register Real-Time WebSocket Subscribers
    const handleWsUpdate = (data: any) => {
      console.log("⚡ Employee Module Live Event Triggered:", data);
      setLiveSyncFlash(true);
      setTimeout(() => setLiveSyncFlash(false), 2000);
      fetchStats();
    };

    websocketService.subscribe("leave_updated", handleWsUpdate);
    websocketService.subscribe("shift_updated", handleWsUpdate);
    websocketService.subscribe("profile_updated", handleWsUpdate);
    websocketService.subscribe("remaining_hours_updated", handleWsUpdate);

    return () => {
      websocketService.unsubscribe("leave_updated", handleWsUpdate);
      websocketService.unsubscribe("shift_updated", handleWsUpdate);
      websocketService.unsubscribe("profile_updated", handleWsUpdate);
      websocketService.unsubscribe("remaining_hours_updated", handleWsUpdate);
    };
  }, []);

  const handlePolicySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchingPolicy(true);
    setPolicyError(null);
    try {
      const result = await policyService.searchPolicies(searchQuery);
      setPolicyResults(result);
    } catch (err: any) {
      setPolicyError(err?.message || "Failed to search policies.");
    } finally {
      setSearchingPolicy(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Live Indicator */}
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            Employee Portal
            {liveSyncFlash && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 flex items-center gap-1 animate-bounce">
                <Zap className="h-3 w-3" /> Live Data Syncing...
              </span>
            )}
          </h2>
          <p className="text-xs text-muted-foreground">View your active shift, leave balances, and company policies</p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loadingStats}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent flex items-center gap-1.5 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loadingStats ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* Grid of Key Employee Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Leave Balance */}
        <div className={`p-5 border rounded-xl bg-card shadow-sm space-y-3 transition-all duration-500 ${liveSyncFlash ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-border"}`}>
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
              Annual Quota
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Leave Days Available</p>
            {loadingStats ? (
              <div className="h-8 w-20 bg-muted/40 animate-pulse rounded mt-1" />
            ) : (
              <p className="text-2xl font-bold text-foreground mt-0.5">
                {leave?.leave_balance !== undefined ? leave.leave_balance : "12"}{" "}
                <span className="text-xs font-normal text-muted-foreground">Days</span>
              </p>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            {leave?.message || "Remaining annual leave balance for your account."}
          </p>
        </div>

        {/* 2. Shift Timing */}
        <div className={`p-5 border rounded-xl bg-card shadow-sm space-y-3 transition-all duration-500 ${liveSyncFlash ? "border-blue-500 ring-2 ring-blue-500/20" : "border-border"}`}>
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
              <Clock className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">
              Shift Schedule
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Daily Shift Hours</p>
            {loadingStats ? (
              <div className="h-8 w-36 bg-muted/40 animate-pulse rounded mt-1" />
            ) : (
              <p className="text-lg font-bold text-foreground mt-0.5">
                {shift?.start_time && shift?.end_time
                  ? `${shift.start_time} - ${shift.end_time}`
                  : "09:00 AM - 05:00 PM"}
              </p>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            {shift?.message || "Standard daily operational shift."}
          </p>
        </div>

        {/* 3. Remaining Hours */}
        <div className={`p-5 border rounded-xl bg-card shadow-sm space-y-3 transition-all duration-500 ${liveSyncFlash ? "border-purple-500 ring-2 ring-purple-500/20" : "border-border"}`}>
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-500">
              <User className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-500">
              Today Status
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Shift Time Remaining</p>
            {loadingStats ? (
              <div className="h-8 w-24 bg-muted/40 animate-pulse rounded mt-1" />
            ) : (
              <p className="text-2xl font-bold text-foreground mt-0.5">
                {remaining?.remaining_hours !== undefined ? remaining.remaining_hours : "8.0"}{" "}
                <span className="text-xs font-normal text-muted-foreground">Hrs</span>
              </p>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            {remaining?.status || "Shift is currently active."}
          </p>
        </div>
      </div>

      {/* Policy Search Sandbox */}
      <div className="p-5 border border-border rounded-xl bg-card space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Company Policy Direct Search</h3>
        </div>

        <form onSubmit={handlePolicySearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company handbook (e.g. Remote work, Overtime, Leave notice...)"
            className="flex-1 bg-muted/40 border border-border rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={searchingPolicy || !searchQuery.trim()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/95 disabled:opacity-50 flex items-center gap-1.5 shrink-0 transition-colors"
          >
            {searchingPolicy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Search className="h-3.5 w-3.5" />}
            Search
          </button>
        </form>

        {policyError && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-xs text-destructive flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {policyError}
          </div>
        )}

        {policyResults && (
          <div className="space-y-4 pt-2 border-t border-border">
            <div className="p-3 bg-muted/20 border border-border/60 rounded-lg text-xs leading-relaxed">
              <p className="font-semibold text-foreground mb-1">Search Context Summary:</p>
              <div className="whitespace-pre-wrap text-muted-foreground">{policyResults.context}</div>
            </div>

            {policyResults.sources && policyResults.sources.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-foreground">Retrieved Policy References:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {policyResults.sources.map((src, idx) => (
                    <div key={idx} className="p-3 border border-border rounded-lg bg-card text-xs space-y-1">
                      <div className="flex items-center justify-between font-semibold text-primary">
                        <span>📄 {src.source}</span>
                        {src.page && <span className="text-[10px] text-muted-foreground">Page {src.page}</span>}
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-3">{src.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
