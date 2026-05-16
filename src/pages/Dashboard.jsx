import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home, Package, BookOpen, Receipt, CheckCircle, XCircle,
  GitBranch, BarChart3, Settings, Users, UserCheck,
  ChevronDown, Bell, Search, Menu, LogOut, Send, Bot,
  Sparkles, X, Plus, Star, MoreHorizontal, TrendingUp,
  ShoppingCart, DollarSign, AlertCircle, RefreshCw
} from 'lucide-react'
import './Dashboard.css'

/* ── Demo Data ── */
const STATS = [
  { label: "Today's Sales", value: '₹18,420', change: '+12.4%', up: true, icon: DollarSign },
  { label: 'Orders Today',  value: '34',       change: '+6 vs yesterday', up: true, icon: ShoppingCart },
  { label: 'Products',      value: '248',      change: '7 low stock', up: false, icon: Package },
  { label: 'Customers',     value: '1,092',    change: '+3 new today', up: true, icon: Users },
]

const TABLE_DATA = [
  { name: 'Samsung 65" QLED TV', cat: 'Electronics', status: 'In Stock',    price: '₹84,990', sc: 'g' },
  { name: 'Apple AirPods Pro',   cat: 'Electronics', status: 'Low Stock',   price: '₹24,900', sc: 'o' },
  { name: "Levi's 511 Slim",     cat: 'Apparel',     status: 'In Stock',    price: '₹3,999',  sc: 'g' },
  { name: 'Nescafé Gold 200g',   cat: 'Grocery',     status: 'Out of Stock',price: '₹850',    sc: 'r' },
  { name: 'Bosch Mixer Grinder', cat: 'Appliances',  status: 'In Stock',    price: '₹5,499',  sc: 'g' },
]

/* ── AI Chat Messages ── */
const INITIAL_MESSAGES = [
  {
    id: 1, role: 'ai',
    text: "Hello! I'm your Workshop AI assistant. I can help you analyze sales, manage inventory, track billing, and more. What would you like to know?",
    time: '10:40 AM'
  }
]

const AI_RESPONSES = [
  "Based on your current data, today's sales are up **12.4%** compared to yesterday. Your top performer is the Samsung QLED TV category. 📈",
  "You have **7 products** with low stock levels. I'd recommend restocking Apple AirPods Pro and Nescafé Gold 200g urgently to avoid revenue loss.",
  "Your **paid invoices** this month: ₹2,34,890. Unpaid: ₹48,200 across 12 customers. Want me to send payment reminders?",
  "Pipeline summary: **8 deals** in negotiation worth ₹6.2L, 3 deals closing this week. Your win rate is at 67% — excellent!",
  "Top customers this month: Raj Electronics (₹84,990), Priya Stores (₹52,400), Metro Mart (₹41,200). Shall I generate a full report?",
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav]       = useState('Home')
  const [sidebarOpen, setSidebarOpen]   = useState(false)
  const [chatOpen, setChatOpen]         = useState(true)
  const [messages, setMessages]         = useState(INITIAL_MESSAGES)
  const [inputVal, setInputVal]         = useState('')
  const [isTyping, setIsTyping]         = useState(false)
  const [aiResponseIdx, setAiResponseIdx] = useState(0)
  const messagesEndRef                  = useRef(null)
  const inputRef                        = useRef(null)

  const userData = (() => {
    try { return JSON.parse(localStorage.getItem('ws_user') || '{}') } catch { return {} }
  })()
  const shopName = userData.shopName || 'My Shop'
  const initials = (userData.shopName || 'WS').slice(0, 2).toUpperCase()

  const handleLogout = () => {
    localStorage.removeItem('ws_token')
    localStorage.removeItem('ws_user')
    navigate('/login')
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = () => {
    const text = inputVal.trim()
    if (!text) return
    const userMsg = { id: Date.now(), role: 'user', text, time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setInputVal('')
    setIsTyping(true)
    setTimeout(() => {
      const aiText = AI_RESPONSES[aiResponseIdx % AI_RESPONSES.length]
      setAiResponseIdx(i => i + 1)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })
      }])
      setIsTyping(false)
    }, 1400)
  }

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  /* ── Navigation ── */
  const mainNav = [
    { label: 'Home',      icon: Home },
    { label: 'Pipeline',  icon: GitBranch },
    { label: 'Reports',   icon: BarChart3 },
    { label: 'Settings',  icon: Settings },
  ]
  const recordsNav = [
    { label: 'Products',  icon: Package },
    { label: 'Catalog',   icon: BookOpen },
    { label: 'Customers', icon: Users },
    { label: 'Contacts',  icon: UserCheck },
  ]
  const billingNav = [
    { label: 'Billing',   icon: Receipt },
    { label: 'Paid',      icon: CheckCircle },
    { label: 'Unpaid',    icon: XCircle },
  ]

  const NavItem = ({ item }) => {
    const Icon = item.icon
    const active = activeNav === item.label
    return (
      <button
        className={`ws-nav-item${active ? ' active' : ''}`}
        onClick={() => { setActiveNav(item.label); setSidebarOpen(false) }}
      >
        <Icon size={15} className="ws-nav-icon" />
        <span>{item.label}</span>
        {item.badge && <span className="ws-nav-badge">{item.badge}</span>}
      </button>
    )
  }

  /* ── Render bold markdown-lite ── */
  const renderText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((p, i) =>
      p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p
    )
  }

  return (
    <div className="ws-layout">

      {/* Mobile overlay */}
      {sidebarOpen && <div className="ws-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`ws-sidebar${sidebarOpen ? ' open' : ''}`}>
        {/* Workspace Header */}
        <div className="ws-sb-header">
          <button className="ws-ws-btn">
            <div className="ws-ws-icon">{initials}</div>
            <span className="ws-ws-name">{shopName}</span>
            <ChevronDown size={13} className="ws-chevron" />
          </button>
          <button className="ws-sb-close" onClick={() => setSidebarOpen(false)}><X size={16} /></button>
        </div>

        {/* Search */}
        <div className="ws-sb-search">
          <div className="ws-searchbox">
            <Search size={13} />
            <span>Quick actions</span>
            <kbd className="ws-kbd">⌘K</kbd>
          </div>
        </div>

        {/* Nav */}
        <nav className="ws-sb-nav">
          <div className="ws-nav-group">
            {mainNav.map(item => <NavItem key={item.label} item={item} />)}
          </div>

          <div className="ws-nav-section">Records</div>
          <div className="ws-nav-group">
            {recordsNav.map(item => <NavItem key={item.label} item={item} />)}
          </div>

          <div className="ws-nav-section">Billing</div>
          <div className="ws-nav-group">
            {billingNav.map(item => <NavItem key={item.label} item={item} />)}
          </div>
        </nav>

        {/* Bottom */}
        <div className="ws-sb-bottom">
          <div className="ws-sb-trial">
            <span><strong>14 days</strong> left on trial</span>
            <button className="ws-trial-btn">Upgrade</button>
          </div>
          <button className="ws-sb-footer-btn" onClick={handleLogout}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="ws-main">
        {/* Topbar */}
        <header className="ws-topbar">
          <button className="ws-menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={18} />
          </button>
          <div className="ws-page-title">{activeNav}</div>
          <div className="ws-topbar-right">
            <button className="ws-top-btn"><TrendingUp size={14} /> Sort</button>
            <button className="ws-top-btn"><Plus size={14} /> New</button>
            <button
              className={`ws-chat-toggle-btn${chatOpen ? ' active' : ''}`}
              onClick={() => setChatOpen(o => !o)}
              title="AI Assistant"
            >
              <Sparkles size={15} />
              <span className="ws-chat-toggle-label">AI</span>
            </button>
            <div className="ws-avatar" title={shopName}>{initials}</div>
          </div>
        </header>

        {/* Content + Chat split */}
        <div className="ws-content-row">
          {/* Body */}
          <div className="ws-body">
            <h1 className="ws-greeting">Good morning, {shopName.split(' ')[0]} 👋</h1>

            {/* Stats */}
            <div className="ws-stats">
              {STATS.map(s => {
                const Icon = s.icon
                return (
                  <div className="ws-stat-card" key={s.label}>
                    <div className="ws-stat-top">
                      <span className="ws-stat-lbl">{s.label}</span>
                      <div className="ws-stat-icon-wrap"><Icon size={14} /></div>
                    </div>
                    <div className="ws-stat-val">{s.value}</div>
                    <div className={`ws-stat-change ${s.up ? 'up' : 'down'}`}>
                      {s.up ? '↑' : '↓'} {s.change}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Table */}
            <div className="ws-table-wrap">
              <div className="ws-table-header">
                <span className="ws-table-title">Recent Products</span>
                <button className="ws-top-btn"><RefreshCw size={13} /> Refresh</button>
              </div>
              <div className="ws-table-scroll">
                <table className="ws-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_DATA.map(row => (
                      <tr key={row.name}>
                        <td className="ws-td-bold">{row.name}</td>
                        <td>{row.cat}</td>
                        <td><span className={`ws-pill ${row.sc}`}>{row.status}</span></td>
                        <td>{row.price}</td>
                        <td><button className="ws-row-more"><MoreHorizontal size={14} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── AI Chat Panel ── */}
          {chatOpen && (
            <div className="ws-chat-panel">
              <div className="ws-chat-header">
                <div className="ws-chat-header-left">
                  <div className="ws-chat-bot-avatar">
                    <Bot size={14} />
                  </div>
                  <div>
                    <div className="ws-chat-title">Workshop AI</div>
                    <div className="ws-chat-subtitle">
                      <span className="ws-chat-dot" />
                      Online
                    </div>
                  </div>
                </div>
                <button className="ws-chat-close" onClick={() => setChatOpen(false)}>
                  <X size={15} />
                </button>
              </div>

              <div className="ws-chat-messages">
                {messages.map((msg, i) => (
                  <div
                    key={msg.id}
                    className={`ws-msg ws-msg-${msg.role}`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {msg.role === 'ai' && (
                      <div className="ws-msg-avatar"><Bot size={12} /></div>
                    )}
                    <div className="ws-msg-content">
                      <div className="ws-msg-bubble">
                        {renderText(msg.text)}
                      </div>
                      <div className="ws-msg-time">{msg.time}</div>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="ws-msg ws-msg-ai ws-typing-row">
                    <div className="ws-msg-avatar"><Bot size={12} /></div>
                    <div className="ws-msg-content">
                      <div className="ws-msg-bubble ws-typing-bubble">
                        <span className="ws-dot" />
                        <span className="ws-dot" />
                        <span className="ws-dot" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick prompts */}
              <div className="ws-chat-prompts">
                {['Sales summary', 'Low stock alert', 'Unpaid invoices'].map(p => (
                  <button
                    key={p}
                    className="ws-prompt-chip"
                    onClick={() => { setInputVal(p); inputRef.current?.focus() }}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="ws-chat-input-row">
                <input
                  ref={inputRef}
                  className="ws-chat-input"
                  placeholder="Ask anything…"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={handleKey}
                />
                <button
                  className={`ws-chat-send${inputVal.trim() ? ' ready' : ''}`}
                  onClick={sendMessage}
                  disabled={!inputVal.trim()}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
