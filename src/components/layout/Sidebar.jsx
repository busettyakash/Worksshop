import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Home, Bell, BarChart3, Settings,
  Package, BookOpen, Receipt, CheckCircle, XCircle,
  Users, UserCheck, GitBranch,
  Search, ChevronDown, LogOut, UserPlus, Zap, Menu, X
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setActiveNav, selectActiveNav, toggleSidebar, selectSidebarOpen, addToast } from '../../redux/slices/uiSlice'
import { logout } from '../../redux/slices/authSlice'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants'
import WorkshopLogo from '../WorkshopLogo'
import './Sidebar.css'

const ICON_MAP = {
  Home:        <Home size={14} />,
  Bell:        <Bell size={14} />,
  BarChart3:   <BarChart3 size={14} />,
  Settings:    <Settings size={14} />,
  Package:     <Package size={14} />,
  BookOpen:    <BookOpen size={14} />,
  Receipt:     <Receipt size={14} />,
  CheckCircle: <CheckCircle size={14} />,
  XCircle:     <XCircle size={14} />,
  Users:       <Users size={14} />,
  UserCheck:   <UserCheck size={14} />,
  GitBranch:   <GitBranch size={14} />,
}

const MAIN_NAV = [
  { label: 'Home',     icon: 'Home',      path: ROUTES.DASHBOARD },
  { label: 'Pipeline', icon: 'GitBranch', path: null },
  { label: 'Reports',  icon: 'BarChart3', path: ROUTES.REPORTS },
  { label: 'Settings', icon: 'Settings',  path: ROUTES.SETTINGS },
]

const RECORDS_NAV = [
  { label: 'Products',   icon: 'Package',   path: ROUTES.PRODUCTS },
  { label: 'Catalog',    icon: 'BookOpen',  path: null },
  { label: 'Customers',  icon: 'Users',     path: ROUTES.CUSTOMERS },
  { label: 'Contacts',   icon: 'UserCheck', path: null },
]

const BILLING_NAV = [
  { label: 'Billing',  icon: 'Receipt',     path: ROUTES.BILLING },
  { label: 'Paid',     icon: 'CheckCircle', path: null },
  { label: 'Unpaid',   icon: 'XCircle',     path: null },
]

function NavItem({ item, active, onClick }) {
  const content = (
    <button
      className={`ws-sb-nav-item ${active ? 'active' : ''}`}
      onClick={() => onClick(item.label)}
    >
      {ICON_MAP[item.icon]}
      <span>{item.label}</span>
      {item.badge ? <span className="ws-sb-badge">{item.badge}</span> : null}
    </button>
  )

  if (item.path) {
    return <Link to={item.path} style={{ display: 'block' }}>{content}</Link>
  }
  return content
}

export default function Sidebar() {
  const dispatch    = useAppDispatch()
  const navigate    = useNavigate()
  const activeNav   = useAppSelector(selectActiveNav)
  const sidebarOpen = useAppSelector(selectSidebarOpen)
  const { shopName, initials } = useAuth()

  const handleNav    = (label) => dispatch(setActiveNav(label))
  const handleLogout = () => { 
    dispatch(logout())
    dispatch(addToast({ message: 'Signed out successfully.', type: 'info' }))
    navigate(ROUTES.LOGIN) 
  }

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="ws-sb-overlay" onClick={() => dispatch(toggleSidebar())} />
      )}

      <aside className={`ws-sidebar${sidebarOpen ? ' ws-sidebar--open' : ''}`}>
        {/* Workspace Header */}
        <div className="ws-sb-header">
          <button className="ws-sb-workspace-btn">
            <div className="ws-sb-ws-icon">
              <WorkshopLogo size={18} color="#fff" />
            </div>
            <span className="ws-sb-ws-name">{shopName}</span>
            <ChevronDown size={13} className="ws-sb-chevron" />
          </button>
          <button
            className="ws-sb-close-btn"
            onClick={() => dispatch(toggleSidebar())}
            aria-label="Close sidebar"
          >
            <X size={15} />
          </button>
        </div>

        {/* Search */}
        <div className="ws-sb-search">
          <button className="ws-sb-searchbox">
            <Search size={13} />
            <span>Quick actions</span>
            <kbd className="ws-sb-kbd">⌘K</kbd>
          </button>
        </div>

        {/* Navigation */}
        <nav className="ws-sb-nav">
          <div className="ws-sb-nav-list">
            {MAIN_NAV.map(item => (
              <NavItem key={item.label} item={item} active={activeNav === item.label} onClick={handleNav} />
            ))}
          </div>

          <div className="ws-sb-section-label">Records</div>
          <div className="ws-sb-nav-list">
            {RECORDS_NAV.map(item => (
              <NavItem key={item.label} item={item} active={activeNav === item.label} onClick={handleNav} />
            ))}
          </div>

          <div className="ws-sb-section-label">Billing</div>
          <div className="ws-sb-nav-list">
            {BILLING_NAV.map(item => (
              <NavItem key={item.label} item={item} active={activeNav === item.label} onClick={handleNav} />
            ))}
          </div>
        </nav>

        {/* Bottom */}
        <div className="ws-sb-bottom">


          <div className="ws-sb-footer-actions">
            <button className="ws-sb-invite-btn">
              <UserPlus size={14} />
              Invite teammates
            </button>
            <button className="ws-sb-footer-item ws-sb-footer-item--danger" onClick={handleLogout}>
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
