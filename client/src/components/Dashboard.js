import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    };

    fetchUsers();
  }, [token]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterRole ? user.role === filterRole : true)
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-blue-700 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">🌐 User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Search & Filter */}
      <div className="p-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full md:w-1/3 p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users */}
      <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        {filteredUsers.map((user, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-blue-500 hover:scale-105 transition transform duration-200">
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-blue-700 mt-2 font-medium capitalize">
              Role: {user.role}
            </p>
          </div>
        ))}
        {filteredUsers.length === 0 && (
          <p className="text-center col-span-full text-gray-500 text-lg">No matching users.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
