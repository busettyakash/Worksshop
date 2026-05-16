// Route path constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  BILLING: '/billing',
  CUSTOMERS: '/customers',
  CATEGORIES: '/categories',
  REPORTS: '/reports',
  HISTORY: '/history',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
}

// Navigation items for sidebar
export const MAIN_NAV = [
  { label: 'Home',          icon: 'Home',         path: ROUTES.DASHBOARD },
  { label: 'Notifications', icon: 'Bell',         path: ROUTES.NOTIFICATIONS, badge: 3 },
  { label: 'Tasks',         icon: 'ClipboardList',path: null },
  { label: 'Notes',         icon: 'FileText',     path: null },
  { label: 'Emails',        icon: 'Mail',         path: null },
  { label: 'Reports',       icon: 'BarChart3',    path: ROUTES.REPORTS },
  { label: 'Automations',   icon: 'Workflow',     path: null },
]

export const RECORDS_NAV = [
  { label: 'Products',    icon: 'Package',  path: ROUTES.PRODUCTS },
  { label: 'Billing',     icon: 'Receipt',  path: ROUTES.BILLING },
  { label: 'Customers',   icon: 'Users',    path: ROUTES.CUSTOMERS },
  { label: 'Categories',  icon: 'Tag',      path: ROUTES.CATEGORIES },
  { label: 'Bill History',icon: 'History',  path: ROUTES.HISTORY },
]

export const SETTINGS_NAV = [
  { label: 'Shop Profile', icon: 'Building2',  path: null },
  { label: 'Preferences',  icon: 'Settings',   path: ROUTES.SETTINGS },
]

// Onboarding steps
export const ONBOARDING_STEPS = [
  { step: 1, title: 'Create your workspace',    description: 'Set up your shop profile' },
  { step: 2, title: 'Add your products',        description: 'Import or add products' },
  { step: 3, title: 'Set up billing',           description: 'Configure GST & invoicing' },
  { step: 4, title: 'Invite your team',         description: 'Bring collaborators aboard' },
  { step: 5, title: 'Connect integrations',     description: 'Link payment & data sources' },
]

// Demo data
export const DEMO_STATS = [
  { label: "Today's Sales",  value: '₹0',    change: '0%',   up: true  },
  { label: 'Orders Today',   value: '0',     change: '0',    up: true  },
  { label: 'Products',       value: '0',     change: 'No data', up: false },
  { label: 'Customers',      value: '0',     change: '0 new',   up: true  },
]

export const DEMO_PRODUCTS = []

export const DEMO_CUSTOMERS = [
  { id: 1, name: 'Rahul Sharma',    email: 'rahul@example.com', phone: '9876543210', orders: 12, total: '₹34,500', lastOrder: '2d ago' },
  { id: 2, name: 'Priya Mehta',     email: 'priya@example.com', phone: '9876543211', orders: 8,  total: '₹18,200', lastOrder: '5d ago' },
  { id: 3, name: 'Amit Kumar',      email: 'amit@example.com',  phone: '9876543212', orders: 22, total: '₹67,800', lastOrder: 'Today'  },
  { id: 4, name: 'Sunita Patel',    email: 'sunita@example.com',phone: '9876543213', orders: 5,  total: '₹9,400',  lastOrder: '1w ago' },
  { id: 5, name: 'Vikram Singh',    email: 'vikram@example.com',phone: '9876543214', orders: 18, total: '₹52,100', lastOrder: 'Today'  },
]

export const STATUS_COLORS = {
  'In Stock':    { bg: '#dcfce7', text: '#166534' },
  'Low Stock':   { bg: '#fef3c7', text: '#92400e' },
  'Out of Stock':{ bg: '#fee2e2', text: '#991b1b' },
  'Paid':        { bg: '#dcfce7', text: '#166534' },
  'Pending':     { bg: '#fef3c7', text: '#92400e' },
  'Cancelled':   { bg: '#fee2e2', text: '#991b1b' },
}
