import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home, LogIn, UserPlus, LayoutDashboard, FileText, MapPin, 
  Shield, BarChart3, Bell, HelpCircle, Info, Menu, X,
  ChevronRight, AlertTriangle, Droplets, Heart, Building2,
  TrendingUp, Users, CheckCircle, Clock, Eye, Send,
  Mail, Phone, MessageSquare, Activity, Thermometer,
  Trash2, Settings, LogOut, Plus, Filter, Search,
  AlertCircle, MapPinned, Zap, ArrowRight, Star
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { GradientBackground } from './components/GradientBackground';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

// Mock Data
const incidentData = [
  { month: 'Jan', health: 45, sanitation: 32 },
  { month: 'Feb', health: 52, sanitation: 28 },
  { month: 'Mar', health: 38, sanitation: 41 },
  { month: 'Apr', health: 65, sanitation: 35 },
  { month: 'May', health: 48, sanitation: 29 },
  { month: 'Jun', health: 72, sanitation: 45 }
];

const diseaseData = [
  { name: 'Malaria', value: 35, color: '#ef4444' },
  { name: 'Cholera', value: 25, color: '#f97316' },
  { name: 'Typhoid', value: 20, color: '#eab308' },
  { name: 'Dengue', value: 15, color: '#22c55e' },
  { name: 'Others', value: 5, color: '#3b82f6' }
];

const recentReports = [
  { id: 1, type: 'Health', title: 'Fever Outbreak', location: 'Ward 5', status: 'In Progress', date: '2025-12-20', priority: 'High' },
  { id: 2, type: 'Sanitation', title: 'Blocked Drainage', location: 'Main Street', status: 'Pending', date: '2025-12-19', priority: 'Medium' },
  { id: 3, type: 'Health', title: 'Food Poisoning', location: 'Market Area', status: 'Resolved', date: '2025-12-18', priority: 'High' },
  { id: 4, type: 'Sanitation', title: 'Garbage Overflow', location: 'Block B', status: 'In Progress', date: '2025-12-17', priority: 'Low' },
  { id: 5, type: 'Health', title: 'Skin Infection', location: 'School Zone', status: 'Pending', date: '2025-12-16', priority: 'Medium' }
];

const facilities = [
  { id: 1, name: 'City General Hospital', type: 'Hospital', capacity: 500, available: 120, lat: 28.6139, lng: 77.2090 },
  { id: 2, name: 'Community Health Center', type: 'Clinic', capacity: 50, available: 15, lat: 28.6229, lng: 77.2190 },
  { id: 3, name: 'Mobile Health Unit', type: 'Mobile', capacity: 20, available: 8, lat: 28.6339, lng: 77.1990 }
];

export default function HealthSanitationApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const navigate = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    navigate(role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('home');
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated Gradient Background */}
      <GradientBackground />
      
      {/* Navigation */}
      <Navigation 
        currentPage={currentPage}
        navigate={navigate}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleLogout={handleLogout}
        notifications={notifications}
      />

      {/* Main Content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <HomePage key="home" navigate={navigate} />}
          {currentPage === 'login' && <LoginPage key="login" handleLogin={handleLogin} navigate={navigate} />}
          {currentPage === 'signup' && <SignUpPage key="signup" navigate={navigate} />}
          {currentPage === 'user-dashboard' && <UserDashboard key="user-dash" navigate={navigate} />}
          {currentPage === 'submit-report' && <SubmitReport key="submit" navigate={navigate} />}
          {currentPage === 'my-reports' && <MyReports key="reports" navigate={navigate} />}
          {currentPage === 'map' && <InteractiveMap key="map" />}
          {currentPage === 'admin-dashboard' && <AdminDashboard key="admin-dash" navigate={navigate} />}
          {currentPage === 'incident-monitoring' && <IncidentMonitoring key="monitoring" />}
          {currentPage === 'analytics' && <Analytics key="analytics" />}
          {currentPage === 'resources' && <ResourceManagement key="resources" />}
          {currentPage === 'alerts' && <AlertsNotifications key="alerts" />}
          {currentPage === 'about' && <AboutPage key="about" />}
          {currentPage === 'help' && <HelpSupport key="help" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}

// Navigation Component
function Navigation({ currentPage, navigate, isAuthenticated, userRole, mobileMenuOpen, setMobileMenuOpen, handleLogout, notifications }: any) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">HealthWatch</span>
              <p className="text-xs text-gray-500">Building Healthier Communities</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink active={currentPage === 'home'} onClick={() => navigate('home')}>Home</NavLink>
            {isAuthenticated && userRole === 'user' && (
              <>
                <NavLink active={currentPage === 'user-dashboard'} onClick={() => navigate('user-dashboard')}>Dashboard</NavLink>
                <NavLink active={currentPage === 'map'} onClick={() => navigate('map')}>Map</NavLink>
              </>
            )}
            {isAuthenticated && userRole === 'admin' && (
              <>
                <NavLink active={currentPage === 'admin-dashboard'} onClick={() => navigate('admin-dashboard')}>Dashboard</NavLink>
                <NavLink active={currentPage === 'analytics'} onClick={() => navigate('analytics')}>Analytics</NavLink>
              </>
            )}
            <NavLink active={currentPage === 'about'} onClick={() => navigate('about')}>About</NavLink>
            <NavLink active={currentPage === 'help'} onClick={() => navigate('help')}>Help</NavLink>
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 text-gray-600 hover:text-emerald-600 transition-colors bg-gray-50 rounded-xl"
                >
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-lg"
                    >
                      {notifications}
                    </motion.span>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 text-gray-600 hover:text-red-600 transition-colors bg-gray-50 rounded-xl font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </div>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('login')}
                  className="px-6 py-2.5 text-gray-700 hover:text-emerald-600 transition-colors font-medium"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('signup')}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all font-medium"
                >
                  Sign Up
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 text-gray-600 bg-gray-50 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-3">
              <MobileNavLink onClick={() => navigate('home')}>Home</MobileNavLink>
              {isAuthenticated && userRole === 'user' && (
                <>
                  <MobileNavLink onClick={() => navigate('user-dashboard')}>Dashboard</MobileNavLink>
                  <MobileNavLink onClick={() => navigate('submit-report')}>Submit Report</MobileNavLink>
                  <MobileNavLink onClick={() => navigate('my-reports')}>My Reports</MobileNavLink>
                  <MobileNavLink onClick={() => navigate('map')}>Interactive Map</MobileNavLink>
                </>
              )}
              {isAuthenticated && userRole === 'admin' && (
                <>
                  <MobileNavLink onClick={() => navigate('admin-dashboard')}>Dashboard</MobileNavLink>
                  <MobileNavLink onClick={() => navigate('incident-monitoring')}>Monitoring</MobileNavLink>
                  <MobileNavLink onClick={() => navigate('analytics')}>Analytics</MobileNavLink>
                  <MobileNavLink onClick={() => navigate('resources')}>Resources</MobileNavLink>
                  <MobileNavLink onClick={() => navigate('alerts')}>Alerts</MobileNavLink>
                </>
              )}
              <MobileNavLink onClick={() => navigate('about')}>About</MobileNavLink>
              <MobileNavLink onClick={() => navigate('help')}>Help & Support</MobileNavLink>
              <div className="pt-4 border-t border-gray-100">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 text-red-600 font-semibold bg-red-50 rounded-xl"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate('login')}
                      className="flex-1 py-3 border-2 border-emerald-500 text-emerald-600 rounded-xl font-semibold"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate('signup')}
                      className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ children, active, onClick }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`font-semibold transition-all relative ${
        active ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeNav"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
        />
      )}
    </motion.button>
  );
}

function MobileNavLink({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left py-3 px-4 text-gray-700 font-semibold hover:text-emerald-600 hover:bg-emerald-50 transition-all rounded-xl"
    >
      {children}
    </button>
  );
}

// Home Page
function HomePage({ navigate }: any) {
  const stats = [
    { icon: FileText, label: 'Reports Filed', value: '12,458', color: 'from-blue-500 to-blue-600' },
    { icon: CheckCircle, label: 'Issues Resolved', value: '10,234', color: 'from-emerald-500 to-emerald-600' },
    { icon: Users, label: 'Active Users', value: '5,678', color: 'from-purple-500 to-purple-600' },
    { icon: MapPin, label: 'Areas Covered', value: '156', color: 'from-orange-500 to-orange-600' }
  ];

  const features = [
    { icon: AlertTriangle, title: 'Incident Reporting', desc: 'Report health and sanitation issues in your area quickly and easily.' },
    { icon: MapPinned, title: 'Interactive Mapping', desc: 'View real-time incident locations and nearby health facilities.' },
    { icon: TrendingUp, title: 'Analytics Dashboard', desc: 'Track trends and patterns to prevent future outbreaks.' },
    { icon: Bell, title: 'Smart Alerts', desc: 'Receive timely notifications about incidents in your area.' },
    { icon: Shield, title: 'Authority Access', desc: 'Dedicated dashboard for authorities to manage and respond.' },
    { icon: Zap, title: 'Quick Response', desc: 'Streamlined workflow for faster issue resolution.' }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={fadeIn}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 rounded-full font-semibold mb-8 shadow-sm"
            >
              <Zap className="w-5 h-5" />
              Real-time Health & Sanitation Monitoring  in Buea
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Building Healthier{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 animate-gradient">
                Communities
              </span>{' '}
              Together
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Report health incidents, track sanitation issues, and collaborate with authorities 
              to create safer, cleaner neighborhoods for everyone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(16, 185, 129, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('signup')}
                className="px-10 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-bold rounded-2xl shadow-2xl flex items-center justify-center gap-3 text-lg"
              >
                Get Started Free
                <ArrowRight className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('about')}
                className="px-10 py-5 bg-white/80 backdrop-blur-sm text-gray-700 font-bold rounded-2xl shadow-xl border-2 border-gray-200 flex items-center justify-center gap-3 text-lg"
              >
                Learn More
                <Info className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Better Health
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides comprehensive tools for citizens living in Buea, Cameroon and authorities to work together
              in maintaining public health and sanitation.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}
                className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-white/50 cursor-pointer shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 rounded-[3rem] p-16 shadow-2xl"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-emerald-50 text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of citizens in Buea and authorities working together to create healthier communities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('signup')}
              className="px-10 py-5 bg-white text-emerald-600 font-bold rounded-2xl shadow-2xl inline-flex items-center gap-3 text-lg"
            >
              Create Free Account
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

// Login Page
function LoginPage({ handleLogin, navigate }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      handleLogin(role);
      setLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 sm:p-12 border border-white/50">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-3 text-lg">Sign in to continue to HealthWatch</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-3">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white/50"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-3">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white/50"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-3">Login as</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`py-5 rounded-2xl border-2 font-semibold transition-all ${
                    role === 'user'
                      ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 shadow-lg'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white/50'
                  }`}
                >
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  Citizen
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-5 rounded-2xl border-2 font-semibold transition-all ${
                    role === 'admin'
                      ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 shadow-lg'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white/50'
                  }`}
                >
                  <Shield className="w-6 h-6 mx-auto mb-2" />
                  Authority
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-bold rounded-2xl shadow-2xl disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign In</>
              )}
            </motion.button>
          </form>

          <p className="text-center text-gray-600 mt-8 text-lg">
            Don't have an account?{' '}
            <button onClick={() => navigate('signup')} className="text-emerald-600 font-bold hover:underline">
              Sign up
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Sign Up Page
function SignUpPage({ navigate }: any) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [step, setStep] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 sm:p-12 border border-white/50">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-3 text-lg">Join HealthWatch today</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 2 && <div className={`w-16 h-1 transition-all ${step > s ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block font-semibold text-gray-700 mb-3">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white/50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-3">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white/50"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-3">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white/50"
                    placeholder="+237 6xx xxx xxx"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(2)}
                  className="w-full py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-bold rounded-2xl shadow-2xl text-lg"
                >
                  Continue
                </motion.button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block font-semibold text-gray-700 mb-3">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white/50"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-3">Confirm Password</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white/50"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-3">Register as</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, role: 'user'})}
                      className={`py-5 rounded-2xl border-2 font-semibold transition-all ${
                        formData.role === 'user'
                          ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 shadow-lg'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white/50'
                      }`}
                    >
                      <Users className="w-6 h-6 mx-auto mb-2" />
                      Citizen
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, role: 'admin'})}
                      className={`py-5 rounded-2xl border-2 font-semibold transition-all ${
                        formData.role === 'admin'
                          ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 shadow-lg'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white/50'
                      }`}
                    >
                      <Shield className="w-6 h-6 mx-auto mb-2" />
                      Authority
                    </button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(1)}
                    className="flex-1 py-5 border-2 border-gray-200 text-gray-600 font-bold rounded-2xl bg-white/50"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('login')}
                    className="flex-1 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-bold rounded-2xl shadow-2xl"
                  >
                    Create Account
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-gray-600 mt-8 text-lg">
            Already have an account?{' '}
            <button onClick={() => navigate('login')} className="text-emerald-600 font-bold hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// User Dashboard
function UserDashboard({ navigate }: any) {
  const quickActions = [
    { icon: Plus, label: 'Submit Report', color: 'from-emerald-500 to-teal-600', page: 'submit-report' },
    { icon: FileText, label: 'My Reports', color: 'from-blue-500 to-blue-600', page: 'my-reports' },
    { icon: MapPin, label: 'View Map', color: 'from-purple-500 to-purple-600', page: 'map' },
    { icon: HelpCircle, label: 'Get Help', color: 'from-orange-500 to-orange-600', page: 'help' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 rounded-[2.5rem] p-10 text-white mb-10 shadow-2xl"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Welcome back, John! 👋</h1>
        <p className="text-emerald-50 text-lg">Track your reports and stay informed about your community's health.</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        {quickActions.map((action, index) => (
          <motion.button
            key={index}
            variants={fadeIn}
            whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(action.page)}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-left shadow-xl border border-white/50"
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
              <action.icon className="w-8 h-8 text-white" />
            </div>
            <p className="font-bold text-gray-800 text-lg">{action.label}</p>
          </motion.button>
        ))}
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
        >
          <div className="flex items-center justify-between mb-5">
            <span className="text-gray-600 font-semibold">Total Reports</span>
            <FileText className="w-6 h-6 text-emerald-500" />
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">12</p>
          <p className="text-emerald-600 font-semibold">+3 this month</p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
        >
          <div className="flex items-center justify-between mb-5">
            <span className="text-gray-600 font-semibold">Resolved</span>
            <CheckCircle className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">8</p>
          <p className="text-blue-600 font-semibold">67% resolution rate</p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
        >
          <div className="flex items-center justify-between mb-5">
            <span className="text-gray-600 font-semibold">Pending</span>
            <Clock className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">4</p>
          <p className="text-orange-600 font-semibold">Avg. 2 days wait</p>
        </motion.div>
      </div>

      {/* Recent Reports */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Recent Reports</h2>
            <button 
              onClick={() => navigate('my-reports')}
              className="text-emerald-600 font-bold hover:underline flex items-center gap-2"
            >
              View All <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {recentReports.slice(0, 3).map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="p-8 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    report.type === 'Health' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {report.type === 'Health' ? (
                      <Heart className="w-7 h-7 text-red-600" />
                    ) : (
                      <Droplets className="w-7 h-7 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{report.title}</p>
                    <p className="text-gray-500 mt-1">{report.location} • {report.date}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-xl font-semibold ${
                  report.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                  report.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {report.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Submit Report Page
function SubmitReport({ navigate }: any) {
  const [reportType, setReportType] = useState('health');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    severity: 'medium',
    category: ''
  });

  const healthCategories = ['Fever/Flu', 'Food Poisoning', 'Skin Infection', 'Water-borne Disease', 'Other'];
  const sanitationCategories = ['Blocked Drainage', 'Garbage Overflow', 'Water Contamination', 'Open Defecation', 'Other'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 border border-white/50"
      >
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Submit Incident Report</h1>
          <p className="text-gray-600 text-lg">Help us track and resolve health and sanitation issues in your area.</p>
        </div>

        {/* Report Type Selection */}
        <div className="mb-10">
          <label className="block font-bold text-gray-700 mb-4">Report Type</label>
          <div className="grid grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setReportType('health')}
              className={`p-8 rounded-3xl border-2 transition-all ${
                reportType === 'health'
                  ? 'border-red-500 bg-red-50 shadow-xl'
                  : 'border-gray-200 hover:border-gray-300 bg-white/50'
              }`}
            >
              <Heart className={`w-12 h-12 mx-auto mb-4 ${reportType === 'health' ? 'text-red-500' : 'text-gray-400'}`} />
              <p className={`font-bold text-lg mb-2 ${reportType === 'health' ? 'text-red-700' : 'text-gray-600'}`}>Health Incident</p>
              <p className={`text-sm ${reportType === 'health' ? 'text-red-600' : 'text-gray-400'}`}>Disease outbreaks, infections</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setReportType('sanitation')}
              className={`p-8 rounded-3xl border-2 transition-all ${
                reportType === 'sanitation'
                  ? 'border-blue-500 bg-blue-50 shadow-xl'
                  : 'border-gray-200 hover:border-gray-300 bg-white/50'
              }`}
            >
              <Droplets className={`w-12 h-12 mx-auto mb-4 ${reportType === 'sanitation' ? 'text-blue-500' : 'text-gray-400'}`} />
              <p className={`font-bold text-lg mb-2 ${reportType === 'sanitation' ? 'text-blue-700' : 'text-gray-600'}`}>Sanitation Issue</p>
              <p className={`text-sm ${reportType === 'sanitation' ? 'text-blue-600' : 'text-gray-400'}`}>Drainage, garbage, water</p>
            </motion.button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-7">
          <div>
            <label className="block font-bold text-gray-700 mb-3">Incident Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white/50"
              placeholder="Brief title of the incident"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-3">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(reportType === 'health' ? healthCategories : sanitationCategories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFormData({...formData, category: cat})}
                  className={`px-5 py-3 rounded-2xl font-semibold transition-all ${
                    formData.category === cat
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-3">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none bg-white/50"
              placeholder="Describe the incident in detail..."
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-3">Location</label>
            <div className="relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full pl-14 pr-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white/50"
                placeholder="Enter address or landmark"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-3">Severity Level</label>
            <div className="grid grid-cols-3 gap-4">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  onClick={() => setFormData({...formData, severity: level})}
                  className={`py-4 rounded-2xl font-bold capitalize transition-all ${
                    formData.severity === level
                      ? level === 'low' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' :
                        level === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' :
                        'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('user-dashboard')}
              className="flex-1 py-5 border-2 border-gray-200 text-gray-600 font-bold rounded-2xl bg-white/50"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('my-reports')}
              className="flex-1 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-bold rounded-2xl shadow-2xl flex items-center justify-center gap-3"
            >
              <Send className="w-6 h-6" />
              Submit Report
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// My Reports Page
function MyReports({ navigate }: any) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = recentReports.filter(report => {
    if (filter === 'all') return true;
    return report.status.toLowerCase().replace(' ', '-') === filter;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
          <p className="text-gray-600 text-lg mt-2">Track the status of your submitted reports</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('submit-report')}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-bold rounded-2xl shadow-2xl flex items-center gap-3"
        >
          <Plus className="w-6 h-6" />
          New Report
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-xl border border-white/50">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white/50"
              placeholder="Search reports..."
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0">
            {['all', 'pending', 'in-progress', 'resolved'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports List */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            variants={fadeIn}
            whileHover={{ y: -4, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl cursor-pointer border border-white/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  report.type === 'Health' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {report.type === 'Health' ? (
                    <Heart className="w-8 h-8 text-red-600" />
                  ) : (
                    <Droplets className="w-8 h-8 text-blue-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-gray-900 text-xl">{report.title}</h3>
                    <span className={`px-3 py-1 rounded-full font-semibold ${
                      report.priority === 'High' ? 'bg-red-100 text-red-700' :
                      report.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {report.priority}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {report.location}
                    <span className="mx-2">•</span>
                    {report.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-5 py-3 rounded-2xl font-bold ${
                  report.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                  report.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {report.status}
                </span>
                <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 rounded-2xl">
                  <Eye className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// Interactive Map Page
function InteractiveMap() {
  const [selectedType, setSelectedType] = useState('all');

  const mapPoints = [
    { id: 1, type: 'health', x: 30, y: 40, label: 'Fever Outbreak' },
    { id: 2, type: 'sanitation', x: 50, y: 30, label: 'Blocked Drain' },
    { id: 3, type: 'facility', x: 70, y: 50, label: 'City Hospital' },
    { id: 4, type: 'health', x: 25, y: 60, label: 'Food Poisoning' },
    { id: 5, type: 'sanitation', x: 60, y: 70, label: 'Garbage Issue' },
    { id: 6, type: 'facility', x: 40, y: 55, label: 'Health Center' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Map Area */}
        <div className="flex-1">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Interactive Map</h2>
              <p className="text-gray-600 mt-2">View incidents and resources in your area</p>
            </div>
            
            {/* Filter Buttons */}
            <div className="p-6 border-b border-gray-100 flex gap-3 overflow-x-auto">
              {[
                { key: 'all', label: 'All', color: 'emerald' },
                { key: 'health', label: 'Health', color: 'red' },
                { key: 'sanitation', label: 'Sanitation', color: 'blue' },
                { key: 'facility', label: 'Facilities', color: 'purple' }
              ].map((filterItem) => (
                <button
                  key={filterItem.key}
                  onClick={() => setSelectedType(filterItem.key)}
                  className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all shadow-lg ${
                    selectedType === filterItem.key
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: selectedType === filterItem.key
                      ? filterItem.color === 'emerald' ? '#10b981'
                        : filterItem.color === 'red' ? '#ef4444'
                        : filterItem.color === 'blue' ? '#3b82f6'
                        : '#8b5cf6'
                      : undefined
                  }}
                >
                  {filterItem.label}
                </button>
              ))}
            </div>

            {/* Mock Map */}
            <div className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 h-[600px]">
              {/* Grid Lines */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(10)].map((_, i) => (
                  <div key={`h-${i}`} className="absolute w-full h-px bg-gray-400" style={{ top: `${i * 10}%` }} />
                ))}
                {[...Array(10)].map((_, i) => (
                  <div key={`v-${i}`} className="absolute h-full w-px bg-gray-400" style={{ left: `${i * 10}%` }} />
                ))}
              </div>

              {/* Map Points */}
              {mapPoints
                .filter(point => selectedType === 'all' || point.type === selectedType)
                .map((point) => (
                <motion.div
                  key={point.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute group cursor-pointer"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl ${
                      point.type === 'health' ? 'bg-red-500' :
                      point.type === 'sanitation' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`}
                  >
                    {point.type === 'health' ? <Heart className="w-6 h-6 text-white" /> :
                     point.type === 'sanitation' ? <Droplets className="w-6 h-6 text-white" /> :
                     <Building2 className="w-6 h-6 text-white" />}
                  </motion.div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white px-4 py-2 rounded-xl whitespace-nowrap font-semibold shadow-xl">
                      {point.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-96 space-y-6">
          {/* Legend */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <h3 className="font-bold text-gray-900 text-xl mb-6">Legend</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-semibold">Health Incidents</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-semibold">Sanitation Issues</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-semibold">Health Facilities</span>
              </div>
            </div>
          </div>

          {/* Nearby Facilities */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <h3 className="font-bold text-gray-900 text-xl mb-6">Nearby Facilities</h3>
            <div className="space-y-4">
              {facilities.map((facility) => (
                <div key={facility.id} className="flex items-center gap-4 p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm">
                  <Building2 className="w-7 h-7 text-purple-500" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 truncate">{facility.name}</p>
                    <p className="text-emerald-600 font-semibold">{facility.available} beds available</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Admin Dashboard
function AdminDashboard({ navigate }: any) {
  const adminStats = [
    { icon: AlertTriangle, label: 'Active Incidents', value: '47', change: '+12%', color: 'from-red-500 to-red-600' },
    { icon: Clock, label: 'Pending Review', value: '23', change: '-5%', color: 'from-orange-500 to-orange-600' },
    { icon: CheckCircle, label: 'Resolved Today', value: '18', change: '+25%', color: 'from-emerald-500 to-emerald-600' },
    { icon: Users, label: 'Active Users', value: '1,234', change: '+8%', color: 'from-blue-500 to-blue-600' }
  ];

  const quickLinks = [
    { icon: Activity, label: 'Incident Monitoring', page: 'incident-monitoring' },
    { icon: BarChart3, label: 'Analytics & Trends', page: 'analytics' },
    { icon: Building2, label: 'Resource Management', page: 'resources' },
    { icon: Bell, label: 'Alerts & Notifications', page: 'alerts' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-[2.5rem] p-10 text-white mb-10 shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-5">
          <Shield className="w-10 h-10 text-emerald-400" />
          <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full font-bold border border-emerald-400/30">Authority Access</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Admin Dashboard</h1>
        <p className="text-slate-300 text-lg">Monitor, analyze, and manage health and sanitation across your jurisdiction.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        {adminStats.map((stat, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
              <stat.icon className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 font-semibold">{stat.label}</p>
              <span className={`font-bold ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {quickLinks.map((link, index) => (
          <motion.button
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(link.page)}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-left shadow-xl flex items-center gap-5 border border-white/50"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-lg">
              <link.icon className="w-8 h-8 text-slate-700" />
            </div>
            <span className="font-bold text-gray-800 text-lg">{link.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
        >
          <h3 className="font-bold text-gray-900 text-xl mb-6">Incident Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={incidentData}>
              <defs>
                <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSanitation" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={13} fontWeight={600} />
              <YAxis stroke="#9ca3af" fontSize={13} fontWeight={600} />
              <Tooltip />
              <Area type="monotone" dataKey="health" stroke="#ef4444" fill="url(#colorHealth)" strokeWidth={3} />
              <Area type="monotone" dataKey="sanitation" stroke="#3b82f6" fill="url(#colorSanitation)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="p-8 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-xl">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {recentReports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    report.type === 'Health' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {report.type === 'Health' ? (
                      <Heart className="w-6 h-6 text-red-600" />
                    ) : (
                      <Droplets className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 truncate">{report.title}</p>
                    <p className="text-gray-500 text-sm">{report.location} • {report.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-xl font-semibold text-sm ${
                    report.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                    report.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Incident Monitoring Page
function IncidentMonitoring() {
  const [view, setView] = useState('list');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Incident Monitoring</h1>
          <p className="text-gray-600 text-lg mt-2">Real-time tracking of health and sanitation incidents</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setView('list')}
            className={`p-4 rounded-2xl transition-all shadow-lg ${view === 'list' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : 'bg-white/80 backdrop-blur-sm text-gray-600 border border-white/50'}`}
          >
            <FileText className="w-6 h-6" />
          </button>
          <button
            onClick={() => setView('heatmap')}
            className={`p-4 rounded-2xl transition-all shadow-lg ${view === 'heatmap' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : 'bg-white/80 backdrop-blur-sm text-gray-600 border border-white/50'}`}
          >
            <MapPin className="w-6 h-6" />
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          {recentReports.map((report) => (
            <motion.div
              key={report.id}
              variants={fadeIn}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    report.type === 'Health' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {report.type === 'Health' ? (
                      <Heart className="w-8 h-8 text-red-600" />
                    ) : (
                      <Droplets className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl">{report.title}</h3>
                    <p className="text-gray-500 mt-1">{report.location} • {report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <select className="px-5 py-3 rounded-2xl border-2 border-gray-200 font-semibold focus:ring-4 focus:ring-emerald-500/20 outline-none bg-white/50">
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all">
                    Update
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl border border-white/50">
          <h3 className="font-bold text-gray-900 text-2xl mb-8">Incident Heatmap</h3>
          <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 rounded-3xl h-[500px] relative overflow-hidden">
            {/* Simulated heatmap spots */}
            <div className="absolute w-40 h-40 bg-red-500 opacity-40 rounded-full blur-3xl" style={{ top: '20%', left: '30%' }} />
            <div className="absolute w-32 h-32 bg-orange-500 opacity-40 rounded-full blur-3xl" style={{ top: '50%', left: '60%' }} />
            <div className="absolute w-28 h-28 bg-yellow-500 opacity-40 rounded-full blur-3xl" style={{ top: '70%', left: '25%' }} />
            <div className="absolute w-36 h-36 bg-red-600 opacity-50 rounded-full blur-3xl" style={{ top: '40%', left: '45%' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 text-lg font-semibold">Interactive heatmap visualization</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Analytics Page
function Analytics() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Trends</h1>
        <p className="text-gray-600 text-lg mt-2">Data-driven insights for better decision making</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Disease Trends */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
        >
          <h3 className="font-bold text-gray-900 text-xl mb-6">Disease Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={diseaseData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
              >
                {diseaseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Trends */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
        >
          <h3 className="font-bold text-gray-900 text-xl mb-6">Monthly Incident Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incidentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={13} fontWeight={600} />
              <YAxis stroke="#9ca3af" fontSize={13} fontWeight={600} />
              <Tooltip />
              <Legend />
              <Bar dataKey="health" fill="#ef4444" radius={[8, 8, 0, 0]} />
              <Bar dataKey="sanitation" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Trend Line */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
      >
        <h3 className="font-bold text-gray-900 text-xl mb-6">Resolution Rate Over Time</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={incidentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" fontSize={13} fontWeight={600} />
            <YAxis stroke="#9ca3af" fontSize={13} fontWeight={600} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="health" stroke="#10b981" strokeWidth={4} dot={{ fill: '#10b981', strokeWidth: 3, r: 7 }} />
            <Line type="monotone" dataKey="sanitation" stroke="#8b5cf6" strokeWidth={4} dot={{ fill: '#8b5cf6', strokeWidth: 3, r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}

// Resource Management Page
function ResourceManagement() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Resource Management</h1>
        <p className="text-gray-600 text-lg mt-2">Manage health facilities and sanitation resources</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Health Facilities */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-xl">Health Facilities</h3>
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg">
              <Plus className="w-5 h-5" /> Add New
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {facilities.map((facility) => (
              <div key={facility.id} className="p-8 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
                      <Building2 className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{facility.name}</h4>
                      <p className="text-gray-500">{facility.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-xl">{facility.available}/{facility.capacity}</p>
                    <p className="text-gray-500">beds available</p>
                  </div>
                </div>
                <div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                      style={{ width: `${(facility.available / facility.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sanitation Resources */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-xl">Sanitation Resources</h3>
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg">
              <Plus className="w-5 h-5" /> Add New
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { id: 1, name: 'Garbage Collection Trucks', count: 25, active: 20 },
              { id: 2, name: 'Drainage Cleaning Teams', count: 15, active: 12 },
              { id: 3, name: 'Water Testing Kits', count: 100, active: 45 },
              { id: 4, name: 'Sanitization Sprayers', count: 30, active: 28 }
            ].map((resource) => (
              <div key={resource.id} className="p-8 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
                      <Trash2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{resource.name}</h4>
                      <p className="text-gray-500">Total: {resource.count}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600 text-xl">{resource.active} Active</p>
                    <p className="text-gray-500">{resource.count - resource.active} Available</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Alerts & Notifications Page
function AlertsNotifications() {
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Alerts & Notifications</h1>
        <p className="text-gray-600 text-lg mt-2">Configure and send alerts to stakeholders</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* SMS Alerts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-xl">SMS Alerts</h3>
                <p className="text-gray-500">Send text message notifications</p>
              </div>
            </div>
            <button
              onClick={() => setSmsEnabled(!smsEnabled)}
              className={`w-16 h-8 rounded-full transition-colors ${smsEnabled ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gray-300'}`}
            >
              <div className={`w-7 h-7 bg-white rounded-full shadow-lg transition-transform ${smsEnabled ? 'translate-x-8' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className="space-y-5">
            <input
              type="text"
              placeholder="Phone numbers (comma separated)"
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white/50"
            />
            <textarea
              placeholder="Message content..."
              rows={3}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none resize-none bg-white/50"
            />
            <button className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all">
              Send SMS Alert
            </button>
          </div>
        </motion.div>

        {/* Email Alerts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-xl">Email Alerts</h3>
                <p className="text-gray-500">Send email notifications</p>
              </div>
            </div>
            <button
              onClick={() => setEmailEnabled(!emailEnabled)}
              className={`w-16 h-8 rounded-full transition-colors ${emailEnabled ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gray-300'}`}
            >
              <div className={`w-7 h-7 bg-white rounded-full shadow-lg transition-transform ${emailEnabled ? 'translate-x-8' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className="space-y-5">
            <input
              type="text"
              placeholder="Email addresses (comma separated)"
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white/50"
            />
            <input
              type="text"
              placeholder="Subject line"
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white/50"
            />
            <textarea
              placeholder="Email body..."
              rows={3}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none resize-none bg-white/50"
            />
            <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all">
              Send Email Alert
            </button>
          </div>
        </motion.div>
      </div>

      {/* Recent Alerts */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        <div className="p-8 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-xl">Recent Alerts Sent</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { type: 'SMS', title: 'Health Alert: Fever Outbreak', recipients: 245, time: '2 hours ago' },
            { type: 'Email', title: 'Weekly Report Summary', recipients: 50, time: '5 hours ago' },
            { type: 'SMS', title: 'Water Contamination Warning', recipients: 1200, time: '1 day ago' }
          ].map((alert, index) => (
            <div key={index} className="p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    alert.type === 'SMS' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {alert.type === 'SMS' ? (
                      <MessageSquare className="w-7 h-7 text-green-600" />
                    ) : (
                      <Mail className="w-7 h-7 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{alert.title}</p>
                    <p className="text-gray-500">Sent to {alert.recipients} recipients • {alert.time}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-2xl font-bold ${
                  alert.type === 'SMS' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {alert.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// About Page
function AboutPage() {
  const communityResources = [
    { name: 'Health Centers', count: '12', icon: '🏥', color: 'from-emerald-500 to-teal-600' },
    { name: 'Active Reports', count: '247', icon: '📋', color: 'from-blue-500 to-cyan-600' },
    { name: 'Resolved Cases', count: '189', icon: '✅', color: 'from-green-500 to-emerald-600' },
    { name: 'Response Teams', count: '8', icon: '👨‍⚕️', color: 'from-purple-500 to-indigo-600' },
    { name: 'Sanitation Units', count: '15', icon: '🧹', color: 'from-orange-500 to-red-600' },
    { name: 'Emergency Services', count: '24/7', icon: '🚑', color: 'from-red-500 to-pink-600' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* Project Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-20"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Activity className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">About HealthWatch</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          HealthWatch is a comprehensive health and sanitation monitoring platform designed to 
          bridge the gap between citizens and authorities, enabling faster response times and 
          better public health outcomes.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/50"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <Star className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            To empower communities with real-time health and sanitation monitoring tools, 
            enabling proactive responses to public health challenges and creating cleaner, 
            healthier living environments for all.
          </p>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/50"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            A world where every community has access to efficient health monitoring systems, 
            where disease outbreaks are detected early, and where sanitation issues are 
            resolved promptly for the benefit of all citizens.
          </p>
        </motion.div>
      </div>

      {/* Team Carousel Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-20"
      >
        <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">Our Impact Stories</h3>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Discover how HealthWatch has transformed communities and saved lives across different regions.
        </p>
        <div className="relative px-12">
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={4000}
            arrows={true}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              }
            ]}
          >
            {[
              {
                icon: '🏥',
                title: 'Quick Response',
                stat: '85%',
                description: 'Faster incident resolution time compared to traditional reporting methods',
                color: 'from-emerald-500 to-teal-600'
              },
              {
                icon: '🎯',
                title: 'Outbreak Prevention',
                stat: '12+',
                description: 'Disease outbreaks prevented through early detection and rapid response',
                color: 'from-blue-500 to-indigo-600'
              },
              {
                icon: '👥',
                title: 'Community Engagement',
                stat: '50K+',
                description: 'Active users contributing to healthier communities nationwide',
                color: 'from-purple-500 to-pink-600'
              },
              {
                icon: '📊',
                title: 'Data-Driven Decisions',
                stat: '95%',
                description: 'Of authorities report better decision-making with our analytics',
                color: 'from-orange-500 to-red-600'
              },
              {
                icon: '⚡',
                title: 'Real-Time Alerts',
                stat: '2M+',
                description: 'Notifications sent to keep communities informed and safe',
                color: 'from-yellow-500 to-orange-600'
              },
              {
                icon: '🌟',
                title: 'User Satisfaction',
                stat: '4.8/5',
                description: 'Average rating from citizens and health authorities',
                color: 'from-teal-500 to-cyan-600'
              }
            ].map((story, index) => (
              <div key={index} className="px-3">
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 h-full"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${story.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl text-4xl`}>
                    {story.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{story.title}</h4>
                  <div className={`text-5xl font-bold bg-gradient-to-r ${story.color} bg-clip-text text-transparent mb-4`}>
                    {story.stat}
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {story.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>

      {/* Buea Community Health Incident and Resource */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/50"
      >
        <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">Buea Community Health Incident and Resource</h3>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Real-time monitoring and resource allocation for the Buea community health infrastructure
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {communityResources.map((resource, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-lg"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${resource.color} rounded-2xl flex items-center justify-center shadow-xl mb-4 text-3xl`}>
                {resource.icon}
              </div>
              <div className="text-center">
                <p className={`text-4xl font-bold bg-gradient-to-r ${resource.color} bg-clip-text text-transparent mb-2`}>
                  {resource.count}
                </p>
                <p className="font-bold text-gray-900">{resource.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Awards & Recognition Carousel */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-20"
      >
        <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Awards & Recognition</h3>
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 rounded-[3rem] p-12 shadow-2xl">
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3500}
            arrows={false}
            fade={true}
          >
            {[
              {
                award: 'Best Health Tech Innovation',
                year: '2024',
                organization: 'Global Health Summit',
                description: 'Recognized for innovative approach to community health monitoring'
              },
              {
                award: 'Digital Transformation Award',
                year: '2024',
                organization: 'Tech Excellence Awards',
                description: 'Outstanding contribution to public health digitalization'
              },
              {
                award: 'Social Impact Award',
                year: '2023',
                organization: 'United Nations Initiative',
                description: 'Significant impact on community health and sanitation'
              },
              {
                award: 'Innovation in Public Health',
                year: '2023',
                organization: 'World Health Organization',
                description: 'Excellence in leveraging technology for disease prevention'
              }
            ].map((award, index) => (
              <div key={index} className="px-4">
                <div className="text-center text-white">
                  <Award className="w-20 h-20 mx-auto mb-6 opacity-90" />
                  <h4 className="text-3xl font-bold mb-3">{award.award}</h4>
                  <p className="text-2xl font-semibold text-emerald-100 mb-2">{award.organization}</p>
                  <p className="text-xl text-emerald-200 mb-4">{award.year}</p>
                  <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>
    </motion.div>
  );
}
// Help & Support Page
function HelpSupport() {
  const faqs = [
    { q: 'How do I submit a report?', a: 'Navigate to your dashboard and click "Submit Report". Fill in the required details about the incident and submit.' },
    { q: 'How long does it take to resolve an issue?', a: 'Resolution time depends on the severity and type of issue. Typically, high-priority issues are addressed within 24-48 hours.' },
    { q: 'Can I track my report status?', a: 'Yes, you can view all your reports and their current status in the "My Reports" section of your dashboard.' },
    { q: 'How do I become a verified authority?', a: 'Contact our support team with your official credentials. Once verified, you will be granted authority access.' }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
        <p className="text-xl text-gray-600">Find answers to common questions or get in touch with our team</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* FAQs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-5"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-7 text-left flex items-center justify-between"
              >
                <span className="font-bold text-gray-900 text-lg">{faq.q}</span>
                <ChevronRight className={`w-6 h-6 text-gray-400 transition-transform ${openFaq === index ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-100"
                  >
                    <p className="p-7 pt-5 text-gray-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Email</p>
                  <p className="font-bold text-gray-900 text-lg">supporthealthwatch@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Phone</p>
                  <p className="font-bold text-gray-900 text-lg">+237 6 54 94 03 65</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Address</p>
                  <p className="font-bold text-gray-900 text-lg">Long Street Quarter, near the District Hospital</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <h3 className="font-bold text-gray-900 text-xl mb-6">Send us a message</h3>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white/50"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white/50"
              />
              <textarea
                placeholder="Your message"
                rows={4}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none resize-none bg-white/50"
              />
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-bold rounded-2xl shadow-2xl"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Footer Component
function Footer({ navigate }: any) {
  return (
    <footer className="bg-slate-900 text-white mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <span className="font-bold text-2xl">HealthWatch</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Building healthier communities through real-time monitoring and collaboration in Buea.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3 text-slate-400">
              <li><button onClick={() => navigate('home')} className="hover:text-white transition-colors font-medium">Home</button></li>
              <li><button onClick={() => navigate('about')} className="hover:text-white transition-colors font-medium">About</button></li>
              <li><button onClick={() => navigate('help')} className="hover:text-white transition-colors font-medium">Help</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-5">Resources</h4>
            <ul className="space-y-3 text-slate-400">
              <li><button className="hover:text-white transition-colors font-medium">User Guide</button></li>
              <li><button className="hover:text-white transition-colors font-medium">API Docs</button></li>
              <li><button className="hover:text-white transition-colors font-medium">Privacy Policy</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-5">Contact</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="font-medium">supporthealthwatch@gmail.com</li>
              <li className="font-medium">+237 6 54 94 03 65</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-16 pt-10 text-center text-slate-400">
          <p className="font-medium">© 2025 HealthWatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
