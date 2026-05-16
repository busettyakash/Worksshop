import React from 'react'
import { Menu, ArrowUpDown, Sparkles, Plus } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toggleSidebar, selectActiveNav, toggleChat, selectChatOpen } from '../../redux/slices/uiSlice'
import { useAuth } from '../../hooks/useAuth'
import './Topbar.css'

export default function Topbar() {
  const dispatch  = useAppDispatch()
  const activeNav = useAppSelector(selectActiveNav)
  const chatOpen  = useAppSelector(selectChatOpen)
  const { initials, shopName } = useAuth()

  return (
    <header className="ws-topbar">
      <div className="ws-topbar-left">
        <button
          className="ws-topbar-menu-btn"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>
        <h1 className="ws-topbar-title">{activeNav}</h1>
      </div>

      <div className="ws-topbar-right">
        <button className="ws-topbar-action-btn">
          <ArrowUpDown size={13} />
          Sort
        </button>
        <button className="ws-topbar-action-btn">
          <Plus size={13} />
          New
        </button>
        <button className="ws-topbar-action-btn ws-topbar-invite-btn">
          <Plus size={13} style={{ color: 'var(--color-blue)' }} />
          Invite
        </button>
        <button
          className={`ws-topbar-chat-btn${chatOpen ? ' active' : ''}`}
          onClick={() => dispatch(toggleChat())}
          title="Toggle AI Assistant"
          aria-label="Toggle AI Chat"
        >
          <Sparkles size={14} />
          <span className="ws-topbar-chat-label">AI</span>
        </button>
        <div className="ws-topbar-avatar" title={shopName}>
          {initials}
        </div>
      </div>
    </header>
  )
}
