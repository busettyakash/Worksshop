import React from "react";
import {
  Globe,
  Building2,
  DollarSign,
  MapPin,
  Tag,
  BarChart3,
  Users,
  Search,
  Bot,
  Sparkles
} from "lucide-react";

export default function AskWorkshopSection() {
  const rows = [
    {
      icon: <Globe size={11} />,
      label: "Domain",
      value: <span style={{ color: "#2563eb", fontSize: "0.72rem" }}>rahulstore.com</span>,
    },
    {
      icon: <Building2 size={11} />,
      label: "Name",
      value: "Rahul's Store",
    },
    {
      icon: <DollarSign size={11} />,
      label: "Revenue",
      value: (
        <span style={{ background: "#dcfce7", color: "#166534", padding: "1px 7px", borderRadius: "999px", fontSize: "0.68rem", fontWeight: 500 }}>
          ₹2-5L
        </span>
      ),
    },
    {
      icon: <MapPin size={11} />,
      label: "Location",
      value: "Mumbai, India",
    },
    {
      icon: <Tag size={11} />,
      label: "Categories",
      value: (
        <span style={{ display: "flex", gap: "3px", justifyContent: "flex-end", flexWrap: "wrap" }}>
          <span style={{ background: "#ede9fe", color: "#6d28d9", padding: "1px 6px", borderRadius: "999px", fontSize: "0.65rem", fontWeight: 500 }}>Retail</span>
          <span style={{ background: "#ede9fe", color: "#6d28d9", padding: "1px 6px", borderRadius: "999px", fontSize: "0.65rem", fontWeight: 500 }}>Electronics</span>
        </span>
      ),
    },
    {
      icon: <BarChart3 size={11} />,
      label: "Total Sales",
      value: "₹28L this year",
    },
    {
      icon: <Users size={11} />,
      label: "Staff",
      value: <span style={{ color: "#9ca3af" }}>Rahul Sharma, ...</span>,
    },
  ];

  return (
    <div className="cds-split">

      {/* ── LEFT ── */}
      <div className="cds-left">
        <div className="cds-left-top">
          <h2 className="cds-heading">Deploy AI</h2>
          <p className="cds-sub">
            Search and create with Ask Workshop, connect your stack with
            integrations, or put agents to work on complex tasks like
            inventory scoring and customer analysis.
          </p>
        </div>
        <a href="#explore" className="cds-link">Explore AI →</a>
      </div>

      {/* ── CENTER ── */}
      <div className="cds-center" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="ws-ai-tree">
          <div className="ws-ai-trigger">
            <Search size={14} className="ws-ai-trigger-icon" />
            <span>New order found</span>
          </div>

          <div className="ws-ai-trunk">
            {[
              {
                title: "Activate loyalty check",
                question: "Does this customer qualify for loyalty rewards?",
                answer: <>Yes, they are a <span className="ws-ai-purple-text">Gold Tier</span> customer</>,
              },
              {
                title: "Evaluate purchase value",
                question: "What's the lifetime spend of this customer?",
                answer: <><span className="ws-ai-purple-text">₹2.4L</span> spent across <span className="ws-ai-purple-text">34 orders</span></>,
              },
              {
                title: "Identify key contacts",
                question: "Who are the frequent buyers at this shop?",
                answer: <span className="ws-ai-purple-text">Rahul Sharma, Manager; Priya Mehta, Owner</span>,
              },
            ].map(({ title, question, answer }) => (
              <div key={title} className="ws-ai-branch">
                <div className="ws-ai-branch-line" />
                <div className="ws-ai-node-content">
                  <div className="ws-ai-card">
                    <div className="ws-ai-card-top">
                      <div className="ws-ai-bot-icon"><Bot size={14} /></div>
                      <span className="ws-ai-card-title">{title}</span>
                      <span className="ws-ai-card-badge">AI</span>
                    </div>
                    <div className="ws-ai-card-question">{question}</div>
                  </div>
                  <div className="ws-ai-answer-pill">
                    <Sparkles size={12} className="ws-ai-sparkle-icon" />
                    <span>{answer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div
        className="cds-right"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "28px 16px",
          overflow: "hidden",
        }}
      >
        {/* Profile card — rebuilt with strict grid alignment */}
        <div
          style={{
            width: "100%",
            maxWidth: "244px",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {/* Card header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 14px",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: "#111827",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.6rem",
                fontWeight: 700,
                flexShrink: 0,
                letterSpacing: "0.02em",
              }}
            >
              RS
            </div>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111827" }}>
              Rahul's Store
            </span>
          </div>

          {/* Rows — strict 2-col grid: label | value */}
          <div style={{ padding: "8px 0" }}>
            {rows.map(({ icon, label, value }) => (
              <div
                key={label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "88px 1fr",
                  alignItems: "center",
                  columnGap: "6px",
                  padding: "5px 14px",
                }}
              >
                {/* Label col */}
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "0.69rem",
                    color: "#9ca3af",
                    whiteSpace: "nowrap",
                    minWidth: 0,
                  }}
                >
                  <span style={{ color: "#c0c4cc", flexShrink: 0 }}>{icon}</span>
                  {label}
                </span>

                {/* Value col — right-aligned */}
                <span
                  style={{
                    fontSize: "0.74rem",
                    fontWeight: 500,
                    color: "#111827",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    textAlign: "right",
                    minWidth: 0,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}