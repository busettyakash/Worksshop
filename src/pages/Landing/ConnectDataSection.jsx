import React from 'react';

/* ─── Integration logos — fully explicit fills, no inheritance ─── */
const ZapierLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="#FF4A00" />
    <path d="M14 6v4.5M14 17.5V22M6 14h4.5M17.5 14H22M8.1 8.1l3.18 3.18M16.72 16.72l3.18 3.18M19.9 8.1l-3.18 3.18M11.28 16.72L8.1 19.9"
      stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const SlackLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="#4A154B" />
    <path d="M10.5 7.5a1.5 1.5 0 100 3h1.5V9A1.5 1.5 0 0010.5 7.5z" fill="#E01E5A" />
    <path d="M10.5 12H7a1.5 1.5 0 100 3h3.5v-3z" fill="#E01E5A" />
    <path d="M17.5 13.5a1.5 1.5 0 100-3H16v1.5a1.5 1.5 0 001.5 1.5z" fill="#36C5F0" />
    <path d="M21 13.5h-3.5v3H21a1.5 1.5 0 100-3z" fill="#36C5F0" />
    <path d="M12 17.5a1.5 1.5 0 103 0V16h-1.5A1.5 1.5 0 0012 17.5z" fill="#2EB67D" />
    <path d="M15 21v-3.5h-3V21a1.5 1.5 0 103 0z" fill="#2EB67D" />
    <path d="M12 7v3.5h3V7a1.5 1.5 0 10-3 0z" fill="#ECB22E" />
  </svg>
);

const GmailLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
    <path d="M5 10v10a1 1 0 001 1h3V12l5 4 5-4v9h3a1 1 0 001-1V10L14 16 5 10z" fill="#EA4335" />
    <path d="M5 10L14 16l9-6A1 1 0 0022 8.5H6A1 1 0 005 10z" fill="#FBBC04" />
  </svg>
);

const OutlookLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="#0078D4" />
    <rect x="14" y="8" width="9" height="12" rx="1.5" fill="#50A8E8" />
    <path d="M14 10h9v3L18.5 16 14 13v-3z" fill="#28A8E8" />
    <rect x="5" y="7" width="11" height="14" rx="2" fill="#ffffff" />
    <ellipse cx="10.5" cy="14" rx="2.8" ry="3.5" fill="#0078D4" />
  </svg>
);

const SegmentLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="#52BD94" />
    <circle cx="14" cy="8" r="2.5" fill="#ffffff" />
    <circle cx="7" cy="19" r="2.5" fill="#ffffff" />
    <circle cx="21" cy="19" r="2.5" fill="#ffffff" />
    <line x1="14" y1="10.5" x2="7" y2="16.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="10.5" x2="21" y2="16.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="7" y1="19" x2="21" y2="19" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const NotionLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
    <path d="M8 7h9l5 5v10H8V7z" fill="#ffffff" stroke="#111111" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M17 7v5h5" stroke="#111111" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    <line x1="10" y1="14" x2="18" y2="14" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="10" y1="17" x2="16" y2="17" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
    <text x="10.5" y="12.5" fontSize="5" fill="#111111" fontWeight="bold" fontFamily="sans-serif">N</text>
  </svg>
);

const HubspotLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
    <circle cx="20" cy="8.5" r="3" fill="#FF7A59" />
    <line x1="17" y1="8.5" x2="14" y2="14" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round" />
    <circle cx="14" cy="14" r="4.5" fill="#FF7A59" />
    <line x1="10.5" y1="17" x2="9" y2="19" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8.5" cy="20" r="2.5" fill="#FF7A59" />
  </svg>
);

const MixpanelLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="#7856FF" />
    <path d="M6 21L10 13l4 5 4-8 4 11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const INTEGRATIONS = [
  { logo: <ZapierLogo />, label: 'Zapier' },
  { logo: <SlackLogo />, label: 'Slack' },
  { logo: <GmailLogo />, label: 'Gmail' },
  { logo: <OutlookLogo />, label: 'Outlook' },
  { logo: <SegmentLogo />, label: 'Segment' },
  { logo: <NotionLogo />, label: 'Notion' },
  { logo: <HubspotLogo />, label: 'HubSpot' },
  { logo: <MixpanelLogo />, label: 'Mixpanel' },
];

/* ─── Card icons — all explicit, no fill inheritance ─── */
const WorkspaceIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
    <rect width="26" height="26" rx="7" fill="#3B82F6" />
    <rect x="6" y="6" width="6" height="6" rx="1.5" fill="#ffffff" />
    <rect x="14" y="6" width="6" height="6" rx="1.5" fill="#ffffff" />
    <rect x="6" y="14" width="6" height="6" rx="1.5" fill="#ffffff" />
    <rect x="14" y="14" width="6" height="6" rx="1.5" fill="#ffffff" />
  </svg>
);

const CompanyIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
    <rect width="26" height="26" rx="7" fill="#3B82F6" />
    <circle cx="13" cy="9.5" r="3.5" fill="#ffffff" />
    <path d="M5.5 23c0-4.5 3.5-7 7.5-7s7.5 2.5 7.5 7" fill="#ffffff" />
  </svg>
);

const DealIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
    <rect width="26" height="26" rx="7" fill="#F97316" />
    <rect x="6" y="5" width="14" height="16" rx="2" fill="#ffffff" />
    <rect x="8.5" y="8.5" width="9" height="1.5" rx="0.75" fill="#F97316" />
    <rect x="8.5" y="11.5" width="9" height="1.5" rx="0.75" fill="#F97316" />
    <rect x="8.5" y="14.5" width="6" height="1.5" rx="0.75" fill="#F97316" />
  </svg>
);

/* ─── Workshop logo ─── */
const WorkshopLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="9" width="6" height="18" rx="3" fill="#111111" />
    <rect x="15" y="14" width="6" height="13" rx="3" fill="#111111" />
    <rect x="28" y="9" width="6" height="18" rx="3" fill="#111111" />
  </svg>
);

/* ─── Label icons ─── */
const SalesIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" rx="2.5" stroke="#6b7280" strokeWidth="1.3" />
    <path d="M4 11l2.5-3L9 10l2-2.5L13 5" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const EmailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="3" width="14" height="10" rx="2" stroke="#6b7280" strokeWidth="1.3" />
    <path d="M1 6l7 4.5L15 6" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const DataIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <ellipse cx="8" cy="4" rx="6" ry="2" stroke="#6b7280" strokeWidth="1.3" />
    <path d="M2 4v4c0 1.1 2.69 2 6 2s6-.9 6-2V4" stroke="#6b7280" strokeWidth="1.3" />
    <path d="M2 8v4c0 1.1 2.69 2 6 2s6-.9 6-2V8" stroke="#6b7280" strokeWidth="1.3" />
  </svg>
);
const SupportIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <circle cx="6" cy="5.5" r="2.5" stroke="#6b7280" strokeWidth="1.3" />
    <path d="M1.5 14c0-3 2.46-4.5 4.5-4.5s4.5 1.5 4.5 4.5" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="12.5" cy="5" r="1.8" stroke="#6b7280" strokeWidth="1.1" />
  </svg>
);
const BillingIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="#6b7280" strokeWidth="1.3" />
    <path d="M8 4.5v1M8 10v1.5M6.5 9.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1-1.5-1.2C7.17 8.1 6.5 7.67 6.5 6.8c0-.83.67-1.3 1.5-1.3s1.5.47 1.5 1.3" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const ProductIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5L14 4.5V8c0 3.5-3 5.5-6 6-3-.5-6-2.5-6-6V4.5L8 1.5z" stroke="#6b7280" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M5.5 8l1.5 1.5L10.5 6" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LABELS = [
  { icon: <SalesIcon />, text: 'Sales engagement' },
  { icon: <EmailIcon />, text: 'Email & calendar' },
  { icon: <DataIcon />, text: 'Data warehouses' },
  { icon: <SupportIcon />, text: 'Customer support' },
  { icon: <BillingIcon />, text: 'Billing & invoicing' },
  { icon: <ProductIcon />, text: 'Product data' },
];

export default function ConnectDataSection() {
  return (
    <div className="cds-split">

      {/* ── LEFT ── */}
      <div className="cds-left">
        <div className="cds-left-top">
          <h2 className="cds-heading">Continuous context for everyone.</h2>
          <p className="cds-sub">
            Sales, success, finance, and every agent in the company,
            all running on the same live picture of the customer.
          </p>
          {/* Integration icon list */}
          <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {LABELS.map((l, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 12px',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.8rem', color: '#374151', fontWeight: 500,
              }}>
                {l.icon}
                {l.text}
              </div>
            ))}
          </div>
        </div>
        <a href="#explore" className="cds-link" style={{ marginTop: '24px' }}>Explore data →</a>
      </div>

      {/* ── CENTER — diagram matching the screenshot ── */}
      <div className="cds-center" style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Dot grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(#e0e0e0 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          pointerEvents: 'none',
        }} />

        {/* Diagram container — centred vertically */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ position: 'relative', width: '440px', height: '420px' }}>

            {/* SVG connectors — straight T-branch like the screenshot */}
            <svg viewBox="0 0 440 420" fill="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              {/* trunk: logo bottom → horizontal bar */}
              <path d="M220 76 L220 130" stroke="#d1d5db" strokeWidth="1.5" />
              {/* horizontal bar */}
              <path d="M90 130 L350 130" stroke="#d1d5db" strokeWidth="1.5" />
              {/* left leg → Workspace */}
              <path d="M90 130 L90 180" stroke="#d1d5db" strokeWidth="1.5" />
              {/* right leg → Company */}
              <path d="M350 130 L350 180" stroke="#d1d5db" strokeWidth="1.5" />
              {/* center down → Deal */}
              <path d="M220 130 L220 295" stroke="#d1d5db" strokeWidth="1.5" />
            </svg>

            {/* Logo node */}
            <div style={{
              position: 'absolute', top: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: '76px', height: '76px',
              background: '#fff',
              border: '1.5px solid #e5e7eb',
              borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
              zIndex: 4,
            }}>
              <WorkshopLogo />
            </div>

            {/* Workspace card — top left */}
            <div style={{
              position: 'absolute', top: '180px', left: '0',
              width: '190px',
              background: '#fff',
              border: '1px solid #e8e8e8',
              borderRadius: '16px',
              padding: '16px 18px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              zIndex: 4,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <WorkspaceIcon />
                <span className="cds-card-name">Workspace</span>
                <span className="cds-badge">Standard</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
                <strong style={{ color: '#374151', fontWeight: 600, fontSize: '0.95rem' }}>2,957</strong> Records
              </div>
            </div>

            {/* Company card — top right */}
            <div style={{
              position: 'absolute', top: '180px', right: '0',
              width: '190px',
              background: '#fff',
              border: '1px solid #e8e8e8',
              borderRadius: '16px',
              padding: '16px 18px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              zIndex: 4,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <CompanyIcon />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>Company</span>
                <span style={{
                  marginLeft: 'auto', fontSize: '0.65rem', color: '#9ca3af',
                  background: '#f3f4f6', border: '1px solid #e5e7eb',
                  padding: '2px 7px', borderRadius: '5px', whiteSpace: 'nowrap',
                }}>Standard</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
                <strong style={{ color: '#374151', fontWeight: 600, fontSize: '0.95rem' }}>3,144</strong> Records
              </div>
            </div>

            {/* Deal card — bottom center */}
            <div style={{
              position: 'absolute', top: '295px', left: '50%',
              transform: 'translateX(-50%)',
              width: '190px',
              background: '#fff',
              border: '1px solid #e8e8e8',
              borderRadius: '16px',
              padding: '16px 18px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              zIndex: 4,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <DealIcon />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>Deal</span>
                <span style={{
                  marginLeft: 'auto', fontSize: '0.65rem', color: '#9ca3af',
                  background: '#f3f4f6', border: '1px solid #e5e7eb',
                  padding: '2px 7px', borderRadius: '5px', whiteSpace: 'nowrap',
                }}>Standard</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
                <strong style={{ color: '#374151', fontWeight: 600, fontSize: '0.95rem' }}>5,575</strong> Records
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── RIGHT — integration icons ── */}
      <div className="cds-right" style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Dot background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(#d4d4d4 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          pointerEvents: 'none',
        }} />

        {/* 2-col icon grid */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '14px',
          zIndex: 2,
        }}>
          {INTEGRATIONS.map(({ logo, label }, i) => (
            <div key={i} style={{
              width: '64px', height: '64px',
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              transition: 'transform 0.18s, box-shadow 0.18s',
            }}
              title={label}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.06)' }}
            >
              {logo}
            </div>
          ))}
        </div>
      </div>

    </div >
  );
}