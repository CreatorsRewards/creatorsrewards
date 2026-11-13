import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogOut } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Icon Header */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50">
          <ShieldAlert className="h-10 w-10 text-red-600 dark:text-red-400" />
        </div>

        {/* Heading & Description */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Access Denied
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You don’t have the required permissions to view this page. If you believe this is a mistake, please contact your administrator or switch to an authorized account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          
          <Link
            href="/api/auth/logout" // Or your sign-out route handler
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </div>

        {/* Support Help Text */}
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Error Code: <span className="font-mono">403_FORBIDDEN_ROLE</span>
        </p>
      </div>
    </div>
  );
}