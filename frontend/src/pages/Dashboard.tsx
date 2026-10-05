import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Calendar,
  CircleCheck,
  Clock,
  IdCard,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Mail,
  Sparkles,
  User,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Shape of the Better Auth user as returned to the client.
 *
 * The base fields come from Better Auth; `userType` is an
 * additional field configured on the server (`backend/lib/auth.js`).
 */
interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  userType?: string;
}

function formatDate(value?: string | Date) {
  if (!value) {
    return "—";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name?: string) {
  if (!name) {
    return "?";
  }

  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "?";
}

function formatAccountType(userType?: string) {
  if (!userType) {
    return "—";
  }

  return userType.charAt(0).toUpperCase() + userType.slice(1);
}

function DetailRow({
  icon,
  label,
  children,
  mono,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-3.5">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>

        <p
          className={cn(
            "mt-0.5 text-sm font-medium break-words text-foreground",
            mono && "font-mono text-xs"
          )}
        >
          {children}
        </p>
      </div>
    </div>
  );
}

function VerifiedBadge({ verified }: { verified: boolean }) {
  if (verified) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <CircleCheck className="size-3" />
        Verified
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
      <Clock className="size-3" />
      Unverified
    </span>
  );
}

function CenteredState({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-10 text-center">
      {children}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const { data: session, isPending, error } = authClient.useSession();

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  const user = session?.user as AuthUser | undefined;

  const handleSignOut = async () => {
    setSignOutError("");
    setIsSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result?.error) {
        setSignOutError(
          result.error.message || "Could not sign out. Please try again."
        );
        return;
      }

      navigate("/");
    } catch {
      setSignOutError("Could not sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <CenteredState>
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <LoaderCircle className="size-6 animate-spin" />
          <p className="text-sm">Loading your dashboard…</p>
        </div>
      </CenteredState>
    );
  }

  if (error) {
    return (
      <CenteredState>
        <Card className="w-full max-w-md text-left">
          <CardHeader>
            <CardTitle>Something went wrong</CardTitle>
            <CardDescription>
              We couldn&apos;t load your session. Please try again.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              className="h-10 w-full"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </CenteredState>
    );
  }

  if (!user) {
    return (
      <CenteredState>
        <Card className="w-full max-w-md text-left">
          <CardHeader className="items-center text-center">
            <span className="mb-2 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <User className="size-5" />
            </span>

            <CardTitle>You&apos;re not signed in</CardTitle>

            <CardDescription>
              Sign in to view your dashboard, or create a new account to
              get started.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-10 flex-1"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>

            <Button
              variant="outline"
              className="h-10 flex-1"
              onClick={() => navigate("/register/customer")}
            >
              Create account
            </Button>
          </CardContent>
        </Card>
      </CenteredState>
    );
  }

  const firstName = user.name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen w-full bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="size-4" />
            </span>

            <span className="text-base font-semibold text-foreground">
              RoofToGround
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm leading-tight font-medium text-foreground">
                {user.name}
              </p>
              <p className="text-xs leading-tight text-muted-foreground">
                {user.email}
              </p>
            </div>

            <Button
              variant="outline"
              className="h-9 gap-2"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              {isSigningOut ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <LogOut className="size-4" />
              )}
              {isSigningOut ? "Signing out…" : "Logout"}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-8">
          <h1 className="m-0! text-3xl! font-bold! tracking-tight! text-foreground sm:text-4xl!">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-primary sm:text-base">
            Welcome back, {firstName}. Here&apos;s your account information.
          </p>
        </div>

        {signOutError && (
          <div className="mb-6 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            {signOutError}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Account details</CardTitle>
              <CardDescription>
                Your authenticated user data from Better Auth.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-4 border-b pb-5">
                <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    getInitials(user.name)
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-foreground">
                    {user.name || "Unnamed user"}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="divide-y">
                <DetailRow icon={<User className="size-4" />} label="Full name">
                  {user.name || "—"}
                </DetailRow>

                <DetailRow icon={<Mail className="size-4" />} label="Email">
                  <span className="inline-flex flex-wrap items-center gap-2">
                    {user.email}
                    <VerifiedBadge verified={user.emailVerified} />
                  </span>
                </DetailRow>

                <DetailRow
                  icon={<BadgeCheck className="size-4" />}
                  label="Account type"
                >
                  {formatAccountType(user.userType)}
                </DetailRow>

                <DetailRow
                  icon={<Calendar className="size-4" />}
                  label="Member since"
                >
                  {formatDate(user.createdAt)}
                </DetailRow>

                <DetailRow
                  icon={<Clock className="size-4" />}
                  label="Last updated"
                >
                  {formatDate(user.updatedAt)}
                </DetailRow>

                <DetailRow
                  icon={<IdCard className="size-4" />}
                  label="User ID"
                  mono
                >
                  {user.id}
                </DetailRow>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account status</CardTitle>
                <CardDescription>
                  A quick summary of your account.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">
                    Email status
                  </span>
                  <VerifiedBadge verified={user.emailVerified} />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Role</span>
                  <span className="font-medium text-foreground">
                    {formatAccountType(user.userType)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">
                    Member since
                  </span>
                  <span className="font-medium text-foreground">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  Next steps
                </CardTitle>
                <CardDescription>
                  This page is a boilerplate. Add your dashboard widgets
                  here.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex min-h-28 items-center justify-center rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  Nothing here yet — plug in your feature modules.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
