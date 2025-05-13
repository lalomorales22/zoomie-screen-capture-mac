
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';

// Mock data
const categoryData = [
  { name: 'Tutorial', value: 42 },
  { name: 'Demo', value: 28 },
  { name: 'Bug', value: 15 },
  { name: 'Interview', value: 10 },
  { name: 'Notes', value: 5 },
];

const monthlyData = [
  { name: 'Jan', recordings: 5, duration: 25 },
  { name: 'Feb', recordings: 8, duration: 35 },
  { name: 'Mar', recordings: 12, duration: 50 },
  { name: 'Apr', recordings: 15, duration: 65 },
  { name: 'May', recordings: 10, duration: 45 },
];

const ratingData = [
  { name: '1 Star', value: 2 },
  { name: '2 Stars', value: 5 },
  { name: '3 Stars', value: 15 },
  { name: '4 Stars', value: 25 },
  { name: '5 Stars', value: 18 },
];

const keywords = [
  { text: "Tutorial", value: 42 },
  { text: "Bug", value: 15 },
  { text: "Feature", value: 23 },
  { text: "Demo", value: 28 },
  { text: "UI", value: 19 },
  { text: "UX", value: 17 },
  { text: "Product", value: 22 },
  { text: "Design", value: 18 },
  { text: "Meeting", value: 12 },
  { text: "Feedback", value: 9 },
];

const COLORS = ['#3b82f6', '#0ea5e9', '#38bdf8', '#2563eb', '#1d4ed8'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl blue-gradient-text">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Videos" value="65" description="+12% from last month" trend="up" />
        <StatCard title="Total Duration" value="5h 23m" description="+8% from last month" trend="up" />
        <StatCard title="Average Rating" value="4.2" description="-0.3 from last month" trend="down" />
        <StatCard title="Storage Used" value="1.2 GB" description="42% of quota" trend="neutral" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Recordings by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#0ea5e9" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="recordings" name="Recordings" fill="#3b82f6" />
                  <Bar yAxisId="right" dataKey="duration" name="Duration (min)" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ratingData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" scale="band" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Videos" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Popular Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex flex-wrap items-center justify-center gap-3">
              {keywords.map((keyword, index) => (
                <div 
                  key={index}
                  className="rounded-full px-3 py-1 text-sm"
                  style={{
                    backgroundColor: `${COLORS[index % COLORS.length]}20`,
                    color: COLORS[index % COLORS.length],
                    fontSize: `${Math.max(0.8, Math.min(1.5, keyword.value / 20))}rem`
                  }}
                >
                  {keyword.text}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, trend }) => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs mt-1 ${
          trend === 'up' ? 'text-green-500' : 
          trend === 'down' ? 'text-red-500' : 
          'text-gray-500'
        }`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
