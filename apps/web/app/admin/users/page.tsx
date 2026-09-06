"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  // Filter,
  Shield,
  Building,
  Users,
} from "lucide-react";

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("All");

  // Dummy data for visual scaffolding
  const users = [
    {
      id: 1,
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      role: "Creator",
      status: "Active",
      joinDate: "Oct 12, 2023",
    },
    {
      id: 2,
      name: "Nike Official",
      email: "partners@nike.com",
      role: "Brand",
      status: "Active",
      joinDate: "Nov 05, 2023",
    },
    {
      id: 3,
      name: "Mike Ross",
      email: "mike.r@example.com",
      role: "Creator",
      status: "Pending KYC",
      joinDate: "Jan 14, 2024",
    },
    {
      id: 4,
      name: "System Admin",
      email: "admin@platform.com",
      role: "Admin",
      status: "Active",
      joinDate: "Jan 01, 2023",
    },
    {
      id: 5,
      name: "TechGear",
      email: "hello@techgear.io",
      role: "Brand",
      status: "Suspended",
      joinDate: "Dec 22, 2023",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header & Create Action */}
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">User Management</h1>
          <p className="text-gray-600">
            View, edit, and manage system access for all accounts.
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New User
        </button>
      </header>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-t-lg border border-gray-200 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
          {["All", "Creators", "Brands", "Admins", "Waitlist"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search name or email..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Data Table */}
      {activeTab.toLowerCase() === "all" && (
        <div className="bg-white border border-gray-200 rounded-b-lg shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.role === "Creator" && (
                        <Users className="w-4 h-4 text-blue-500" />
                      )}
                      {user.role === "Brand" && (
                        <Building className="w-4 h-4 text-purple-500" />
                      )}
                      {user.role === "Admin" && (
                        <Shield className="w-4 h-4 text-gray-700" />
                      )}
                      <span>{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : user.status === "Pending KYC"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.joinDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit User"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete/Suspend"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-gray-400 hover:bg-gray-100 rounded"
                        title="More Options"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Placeholder */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <p>Showing 1 to 5 of 450 users</p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
