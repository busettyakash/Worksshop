import React, { useState, useEffect, useRef } from 'react'
import { Bot, Send, X } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Topbar from '../../components/layout/Topbar'
import StatsGrid from './StatsGrid'
import ProductsTable from './ProductsTable'
import { useAuth } from '../../hooks/useAuth'
import { getGreeting } from '../../utils/formatters'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { selectChatOpen, toggleChat, addToast } from '../../redux/slices/uiSlice'
import './Dashboard.css'

/* ── AI Chat Data ── */
const INITIAL_MESSAGES = [
  {
    id: 1, role: 'ai',
    text: "Hello! I'm your Workshop AI assistant. I can help you analyze sales, manage inventory, track billing, and more.",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
]

const AI_RESPONSES = [
  "Today's sales are up **12.4%** compared to yesterday. Your top performer is the Samsung QLED TV category. 📈",
  "You have **7 products** with low stock. I'd recommend restocking Apple AirPods Pro and Nescafé Gold urgently.",
  "Paid invoices this month: **₹2,34,890**. Unpaid: **₹48,200** across 12 customers. Want me to send reminders?",
  "Pipeline summary: **8 deals** in negotiation worth ₹6.2L, 3 deals closing this week. Win rate at **67%** — excellent!",
  "Top customers: Raj Electronics (₹84,990), Priya Stores (₹52,400), Metro Mart (₹41,200). Shall I generate a report?",
]

/* ── Render bold markdown-lite ── */
function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p
  )
}

export default function Dashboard() {
  const dispatch    = useAppDispatch()
  const chatOpen    = useAppSelector(selectChatOpen)
  const { shopName, user } = useAuth()
  const firstName   = shopName.split(' ')[0]

  useEffect(() => {
    // Check if we have a success message from auth
    const storedUser = JSON.parse(localStorage.getItem('ws_user') || '{}')
    if (storedUser.successMessage) {
      dispatch(addToast({ message: storedUser.successMessage, type: 'success' }))
      // Clear it from localStorage so it doesn't show again
      const updatedUser = { ...storedUser }
      delete updatedUser.successMessage
      localStorage.setItem('ws_user', JSON.stringify(updatedUser))
    }
  }, [dispatch])

  const [messages,     setMessages]     = useState(INITIAL_MESSAGES)
  const [inputVal,     setInputVal]     = useState('')
  const [isTyping,     setIsTyping]     = useState(false)
  const [aiIdx,        setAiIdx]        = useState(0)
  const messagesEndRef                  = useRef(null)
  const inputRef                        = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = () => {
    const text = inputVal.trim()
    if (!text) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text, time: now }])
    setInputVal('')
    setIsTyping(true)
    setTimeout(() => {
      const aiText = AI_RESPONSES[aiIdx % AI_RESPONSES.length]
      setAiIdx(i => i + 1)
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'ai', text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setIsTyping(false)
    }, 1400)
  }

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <div className="ws-dash-layout">
      <Sidebar />
      <div className="ws-dash-content">
        <Topbar />
        <div className="ws-dash-body-row">
          {/* Main content */}
          <main className="ws-dash-body">
            <div className="ws-dash-greeting">
              {getGreeting()}, {firstName} 👋
            </div>
            <StatsGrid />
            <ProductsTable />
          </main>

          {/* AI Chat Panel */}
          {chatOpen && (
            <aside className="ws-chat-panel">
              {/* Header */}
              <div className="ws-chat-header">
                <div className="ws-chat-header-left">
                  <div className="ws-chat-bot-avatar">
                    <Bot size={14} />
                  </div>
                  <div>
                    <div className="ws-chat-title">Workshop AI</div>
                    <div className="ws-chat-subtitle">
                      <span className="ws-chat-online-dot" />
                      Online
                    </div>
                  </div>
                </div>
                <button
                  className="ws-chat-close-btn"
                  onClick={() => dispatch(toggleChat())}
                  aria-label="Close chat"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Messages */}
              <div className="ws-chat-messages">
                {messages.map((msg) => (
                  <div key={msg.id} className={`ws-msg ws-msg--${msg.role}`}>
                    {msg.role === 'ai' && (
                      <div className="ws-msg-avatar"><Bot size={12} /></div>
                    )}
                    <div className="ws-msg-content">
                      <div className="ws-msg-bubble">{renderText(msg.text)}</div>
                      <div className="ws-msg-time">{msg.time}</div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="ws-msg ws-msg--ai">
                    <div className="ws-msg-avatar"><Bot size={12} /></div>
                    <div className="ws-msg-content">
                      <div className="ws-msg-bubble ws-msg-bubble--typing">
                        <span className="ws-typing-dot" />
                        <span className="ws-typing-dot" />
                        <span className="ws-typing-dot" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick prompts */}
              <div className="ws-chat-prompts">
                {['Sales summary', 'Low stock alert', 'Unpaid invoices', 'Pipeline status'].map(p => (
                  <button
                    key={p}
                    className="ws-prompt-chip"
                    onClick={() => { setInputVal(p); inputRef.current?.focus() }}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input */}
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
                  className={`ws-chat-send-btn${inputVal.trim() ? ' ws-chat-send-btn--ready' : ''}`}
                  onClick={sendMessage}
                  disabled={!inputVal.trim()}
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
