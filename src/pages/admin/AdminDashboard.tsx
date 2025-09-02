import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Download,
  Eye,
  MessageSquare
} from 'lucide-react';
import { dashboardAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import AdminLayout from '../../components/AdminLayout';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await dashboardAPI.getStats();
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  const stats = dashboardData ? [
    {
      title: 'Total Revenue',
      value: `$${dashboardData.stats.totalRevenue?.toLocaleString() || 0}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Sales',
      value: dashboardData.stats.totalSales?.toString() || '0',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Products',
      value: dashboardData.stats.activeProducts?.toString() || '0',
      change: '+2',
      changeType: 'positive',
      icon: Eye,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Total Downloads',
      value: dashboardData.stats.totalDownloads?.toLocaleString() || '0',
      change: '+15.3%',
      changeType: 'positive',
      icon: Download,
      color: 'from-orange-500 to-orange-600'
    }
  ] : [];

  const recentSales = dashboardData?.recentSales || [];
  const recentContacts = dashboardData?.recentContacts || [];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center text-sm ${stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                <TrendingUp className="h-4 w-4 mr-1" />
                {stat.change}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Sales */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Sales</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-white font-medium">{typeof sale.product === 'object' ? sale.product.name || 'Unknown Product' : sale.product}</h4>
                  <p className="text-gray-400 text-sm">{typeof sale.customer === 'object' ? sale.customer.name || 'Unknown Customer' : sale.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{sale.amount}</p>
                  <p className="text-gray-400 text-sm">{sale.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Contact Inquiries</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">
                    {typeof contact.name === 'object' ? `${contact.name.first || ''} ${contact.name.last || ''}`.trim() || 'Unknown' : contact.name}
                  </h4>
                  <span className="text-gray-400 text-sm">{contact.date}</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{contact.email}</p>
                <p className="text-gray-300 text-sm">{contact.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors text-left">
            <ShoppingBag className="h-8 w-8 text-blue-400 mr-3" />
            <div>
              {/* <h3 className="text-white font-medium">Add New Product</h3> */}
              <h3 className="text-white font-medium">
                <Link to="/admin/products" className="hover:underline">
                  Add New Products
                </Link>
              </h3>
              <p className="text-gray-400 text-sm">Upload a new app solution</p>
            </div>
          </button>

          <button className="flex items-center p-4 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors text-left">
            <BarChart3 className="h-8 w-8 text-green-400 mr-3" />
            <div>
              <h3 className="text-white font-medium">View Analytics</h3>
              <p className="text-gray-400 text-sm">Detailed performance metrics</p>
            </div>
          </button>

          <button className="flex items-center p-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors text-left">
            <MessageSquare className="h-8 w-8 text-purple-400 mr-3" />
            <div>
              <h3 className="text-white font-medium">Manage Support</h3>
              <p className="text-gray-400 text-sm">Handle customer inquiries</p>
            </div>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
