import React from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Users,
  Building,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Command Center</h1>
          <p className="text-gray-600">
            You have{" "}
            <span className="font-bold text-red-600">5 urgent tasks</span>{" "}
            requiring attention today.
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors">
          + New Campaign
        </button>
      </header>

      {/* 1. URGENT ALERTS - Time sensitive roadblocks */}
      <section className="mb-8 space-y-3">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-red-800 font-medium">
              Brand campaigns Requests (2)
            </h4>
            <p className="text-red-600 text-sm mt-1">
              2 campaigns have pull requests nearing the 7-day minimum
              threshold. Action required.
            </p>
          </div>
          <button className="ml-auto text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 font-medium">
            Review Campaign
          </button>
        </div>
      </section>

      {/* 2. THE QUEUE - Actionable Workloads (What needs to be done) */}
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Your Action Queue
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Content Review Backlog */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Content Approvals
            </h3>
            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">
              Backlog growing
            </span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">16</p>
          <div className="text-sm text-gray-600 space-y-1 mb-6 flex-grow">
            <p>• 12 Initial submissions</p>
            <p className="font-medium text-orange-600">
              • 4 Resubmissions (Priority)
            </p>
          </div>
          <button className="w-full bg-gray-50 text-gray-700 border border-gray-200 py-2 rounded-md hover:bg-gray-100 transition-colors font-medium">
            Start Reviewing
          </button>
        </div>

        {/* Due Payroll */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Due Payroll
            </h3>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
              Action Needed
            </span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">$4,250</p>
          <div className="text-sm text-gray-600 space-y-1 mb-6 flex-grow">
            <p className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-gray-400" /> 15 Creators ready
              for payout
            </p>
            <p className="flex items-center gap-1 font-medium text-red-600">
              <AlertTriangle className="w-3 h-3 text-red-500" /> 2 payouts
              overdue
            </p>
          </div>
          <button className="w-full bg-blue-50 text-blue-700 border border-blue-200 py-2 rounded-md hover:bg-blue-100 transition-colors font-medium">
            Process Payouts
          </button>
        </div>

        {/* Campaign Monitoring */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Active Campaigns
            </h3>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
              All Healthy
            </span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">8</p>
          <div className="text-sm text-gray-600 space-y-1 mb-6 flex-grow">
            <p>• 3 Deliverable-based</p>
            <p>• 5 Views-based</p>
          </div>
          <button className="w-full bg-gray-50 text-gray-700 border border-gray-200 py-2 rounded-md hover:bg-gray-100 transition-colors font-medium">
            Manage Campaigns
          </button>
        </div>

        {/* Manage Creators */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Creators
            </h3>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
              12 Pending KYC
            </span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">450</p>
          <div className="text-sm text-gray-600 space-y-1 mb-6 flex-grow">
            <p className="flex items-center gap-1">
              <Users className="w-3 h-3 text-gray-400" /> Total active creators
            </p>
            <p>• 5 suspended accounts</p>
          </div>
          <button className="w-full bg-gray-50 text-gray-700 border border-gray-200 py-2 rounded-md hover:bg-gray-100 transition-colors font-medium">
            Review Applications
          </button>
        </div>

        {/* View Brands */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Brands
            </h3>
            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
              3 New Signups
            </span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">85</p>
          <div className="text-sm text-gray-600 space-y-1 mb-6 flex-grow">
            <p className="flex items-center gap-1">
              <Building className="w-3 h-3 text-gray-400" /> Total verified
              brands
            </p>
            <p>• 12 with active funds</p>
          </div>
          <button className="w-full bg-gray-50 text-gray-700 border border-gray-200 py-2 rounded-md hover:bg-gray-100 transition-colors font-medium">
            Manage Brands
          </button>
        </div>

        {/* Cap Warnings - Anticipating automated offline triggers */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Approaching Caps
            </h3>
            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
              Monitor
            </span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">2</p>
          <div className="text-sm text-gray-600 space-y-1 mb-6 flex-grow">
            <p className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-yellow-500" /> Nike UGC:
              92% of view cap
            </p>
            <p className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-yellow-500" /> Adidas: Ends in 48
              hours
            </p>
          </div>
          <button className="w-full bg-gray-50 text-gray-700 border border-gray-200 py-2 rounded-md hover:bg-gray-100 transition-colors font-medium">
            View Live Stats
          </button>
        </div>
      </div>

      {/* 3. RECENT ACTIVITY LOG */}
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        System Activity
      </h2>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-100">
        <div className="p-4 flex items-center gap-4 text-sm">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Creator @JohnDoe</span>{" "}
            hit minimum views threshold (1,200) for Pepsi Campaign.
          </p>
          <span className="ml-auto text-gray-400">10 mins ago</span>
        </div>
        <div className="p-4 flex items-center gap-4 text-sm bg-gray-50">
          <Clock className="w-5 h-5 text-blue-500" />
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">System</span>{" "}
            automatically took 'TechLaunch' offline (Post count cap reached).
          </p>
          <span className="ml-auto text-gray-400">1 hour ago</span>
        </div>
      </div>
    </div>
  );
}
