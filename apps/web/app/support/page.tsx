export default function SupportDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">Welcome back, Support Agent!</h1>
      <p className="text-gray-600 mb-8">Here is a summary of your recent performance.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
          <p className="text-2xl font-bold mt-2">12,450</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Pending Approvals</h3>
          <p className="text-2xl font-bold mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Earnings</h3>
          <p className="text-2xl font-bold mt-2">$450.00</p>
        </div>
      </div>
    </div>
  );
}