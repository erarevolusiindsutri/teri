import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import GlobeVisualization from '../components/GlobeVisualization';

const mockData = {
  dailyChats: [
    { name: 'Mon', chats: 45 },
    { name: 'Tue', chats: 52 },
    { name: 'Wed', chats: 38 },
    { name: 'Thu', chats: 65 },
    { name: 'Fri', chats: 48 },
    { name: 'Sat', chats: 25 },
    { name: 'Sun', chats: 32 },
  ],
  stats: {
    totalUsers: 1248,
    activeChats: 26,
    avgResponseTime: '1.8s',
    satisfaction: '94%',
  },
};

export default function Admin() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={mockData.stats.totalUsers}
            icon={Users}
            trend="+12%"
          />
          <StatCard
            title="Active Chats"
            value={mockData.stats.activeChats}
            icon={MessageSquare}
            trend="+5%"
          />
          <StatCard
            title="Avg Response Time"
            value={mockData.stats.avgResponseTime}
            icon={Clock}
            trend="-8%"
          />
          <StatCard
            title="User Satisfaction"
            value={mockData.stats.satisfaction}
            icon={TrendingUp}
            trend="+2%"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-6">Global User Activity</h2>
            <GlobeVisualization />
          </div>

          <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-6">Chat Activity</h2>
            <div className="h-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.dailyChats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      background: '#18181b',
                      border: '1px solid #27272a',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="chats" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  trend: string;
}

function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
        </div>
        <div className="p-3 bg-zinc-800/50 rounded-xl">
          <Icon className="w-5 h-5 text-primary-500" />
        </div>
      </div>
      <div className={`mt-4 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {trend} from last week
      </div>
    </div>
  );
}