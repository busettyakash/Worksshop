import React from 'react';
import './Landing.css';

/* ── Inline SVG logos for integrations ── */
const ZapierLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#FF4A00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5l-10 14M22 12H2" />
  </svg>
);
const SlackLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path fill="#E01E5A" d="M8.6 15.4a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2zm-2.6 0a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2z" />
    <path fill="#36C5F0" d="M8.6 8.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2zm2.6 0a2.6 2.6 0 1 0 5.2 0 2.6 2.6 0 0 0-5.2 0z" />
    <path fill="#2EB67D" d="M15.4 8.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2zm2.6 0a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2z" />
    <path fill="#ECB22E" d="M15.4 15.4a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2zm-2.6 0a2.6 2.6 0 1 0-5.2 0 2.6 2.6 0 0 0 5.2 0z" />
  </svg>
);
const GmailLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path fill="#4285F4" d="M2 6.5L12 13l10-6.5V18a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" />
    <path fill="#EA4335" d="M2 6.5L12 13l10-6.5L12 5 2 6.5z" />
  </svg>
);
const OutlookLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <rect x="2" y="4" width="10" height="16" rx="1.5" fill="#0078D4" />
    <rect x="12" y="6" width="10" height="12" rx="1.5" fill="#28A8EA" />
    <path d="M12 12h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const SegmentLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#49B882" strokeWidth="2" />
    <path d="M8 12h8M12 8v8" stroke="#49B882" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IntercomLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <rect x="3" y="4" width="18" height="13" rx="3" fill="#1F8DED" />
    <path d="M7 15l2-2 3 3 3-3 2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
const ClearbitLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#4B68FF">
    <path d="M12 2L22 12L12 22L2 12Z" />
    <circle cx="12" cy="12" r="4" fill="white" />
  </svg>
);
const MarketoLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#5C2D91">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" />
  </svg>
);

/* ── Label Icons ── */
const SalesIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" rx="2.5" stroke="#666" strokeWidth="1.2" />
    <path d="M4 11l2.5-3L9 10l2-2.5L13 5" stroke="#666" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const EmailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="3" width="14" height="10" rx="2" stroke="#666" strokeWidth="1.2" />
    <path d="M1 6l7 4.5L15 6" stroke="#666" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const DataIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <ellipse cx="8" cy="4" rx="6" ry="2" stroke="#666" strokeWidth="1.2" />
    <path d="M2 4v4c0 1.1 2.69 2 6 2s6-.9 6-2V4" stroke="#666" strokeWidth="1.2" />
    <path d="M2 8v4c0 1.1 2.69 2 6 2s6-.9 6-2V8" stroke="#666" strokeWidth="1.2" />
  </svg>
);
const SupportIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <circle cx="6" cy="5.5" r="2.5" stroke="#666" strokeWidth="1.2" />
    <path d="M1.5 14c0-3 2.46-4.5 4.5-4.5s4.5 1.5 4.5 4.5" stroke="#666" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="12.5" cy="5" r="1.8" stroke="#666" strokeWidth="1" />
  </svg>
);
const BillingIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="#666" strokeWidth="1.2" />
    <path d="M8 4.5v1M8 10v1.5M6.5 9.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1-1.5-1.2C7.17 8.1 6.5 7.67 6.5 6.8c0-.83.67-1.3 1.5-1.3s1.5.47 1.5 1.3" stroke="#666" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const ProductIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5L14 4.5V8c0 3.5-3 5.5-6 6-3-.5-6-2.5-6-6V4.5L8 1.5z" stroke="#666" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M5.5 8l1.5 1.5L10.5 6" stroke="#666" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Card Icons ── */
const WorkspaceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect width="20" height="20" rx="5" fill="#3B82F6" />
    <rect x="4" y="4" width="5.5" height="5.5" rx="1.2" fill="white" />
    <rect x="10.5" y="4" width="5.5" height="5.5" rx="1.2" fill="white" />
    <rect x="4" y="10.5" width="5.5" height="5.5" rx="1.2" fill="white" />
    <rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1.2" fill="white" />
  </svg>
);
const CompanyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect width="20" height="20" rx="5" fill="#3B82F6" />
    <circle cx="10" cy="6.8" r="2.8" fill="white" />
    <path d="M3.5 17.5c0-3.59 2.91-5.5 6.5-5.5s6.5 1.91 6.5 5.5" fill="white" />
  </svg>
);
const DealIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect width="20" height="20" rx="5" fill="#F97316" />
    <rect x="4.5" y="3" width="11" height="14" rx="1.5" fill="white" />
    <rect x="6.5" y="6" width="7" height="1.4" rx="0.7" fill="#F97316" />
    <rect x="6.5" y="9" width="7" height="1.4" rx="0.7" fill="#F97316" />
    <rect x="6.5" y="12" width="4.5" height="1.4" rx="0.7" fill="#F97316" />
  </svg>
);

/* ── Workshop Logo ── */
const WorkshopLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="9" fill="#f4f4f4" />
    <rect x="7" y="13" width="5" height="13" rx="2.5" fill="#1a1a1a" />
    <rect x="15.5" y="18" width="5" height="8" rx="2.5" fill="#1a1a1a" />
    <rect x="24" y="13" width="5" height="13" rx="2.5" fill="#1a1a1a" />
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

const INTEGRATIONS = [
  <ZapierLogo />, <SlackLogo />, <GmailLogo />, <OutlookLogo />,
  <SegmentLogo />, <IntercomLogo />, <ClearbitLogo />, <MarketoLogo />,
];

export default function ConnectDataSection() {
  return (
    <section className="cds-section">
      <div className="cds-inner">
        <div className="cds-split">

          {/* ── LEFT ── */}
          <div className="cds-left">
            <div className="cds-left-top">
              <h2 className="cds-heading">
                Continuous context<br />for everyone.
              </h2>
              <p className="cds-sub">
                Sales, success, finance, and every agent in the company,
                all running on the same live picture of the customer.
              </p>
            </div>
            <a href="#explore" className="cds-link">Explore data →</a>
          </div>

          {/* ── CENTER ── */}
          <div className="cds-center">
            <div className="cds-grid-bg" />

            {/* 2×3 label grid */}
            <div className="cds-labels-grid">
              {LABELS.map((l, i) => (
                <div key={i} className="cds-label-cell">
                  {l.icon}
                  <span>{l.text}</span>
                </div>
              ))}
            </div>

            {/* Graph + cards */}
            <div className="cds-graph-area">
              <div className="cds-graph">
                {/* SVG connector lines */}
                <svg className="cds-svg" viewBox="0 0 400 230" overflow="visible">
                  <path className="cds-line cds-line-1" d="M200 20 C200 80, 88 85, 88 155" />
                  <path className="cds-line cds-line-2" d="M200 20 C200 80, 312 85, 312 155" />
                  <path className="cds-line cds-line-3" d="M200 20 L200 195" />
                </svg>

                {/* Logo node */}
                <div className="cds-logo-node">
                  <div className="cds-pulse-ring" />
                  <WorkshopLogo />
                </div>

                {/* Workspace */}
                <div className="cds-card cds-card-l">
                  <div className="cds-card-head">
                    <WorkspaceIcon />
                    <span className="cds-card-name">Workspace</span>
                    <span className="cds-badge">Standard</span>
                  </div>
                  <div className="cds-card-count"><strong>3,690</strong> Records</div>
                </div>

                {/* Company */}
                <div className="cds-card cds-card-r">
                  <div className="cds-card-head">
                    <CompanyIcon />
                    <span className="cds-card-name">Company</span>
                    <span className="cds-badge">Standard</span>
                  </div>
                  <div className="cds-card-count"><strong>3,514</strong> Records</div>
                </div>

                {/* Deal */}
                <div className="cds-card cds-card-b">
                  <div className="cds-card-head">
                    <DealIcon />
                    <span className="cds-card-name">Deal</span>
                    <span className="cds-badge">Standard</span>
                  </div>
                  <div className="cds-card-count"><strong>6,101</strong> Records</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="cds-right">
            <div className="cds-dot-bg" />

            {/* Dashed grid lines */}
            <div className="cds-dash-wrap">
              <div className="cds-dash-v" />
              <div className="cds-dash-h" style={{ top: '17%' }} />
              <div className="cds-dash-h" style={{ top: '40%' }} />
              <div className="cds-dash-h" style={{ top: '63%' }} />
              <div className="cds-dash-h" style={{ top: '86%' }} />
            </div>

            {/* Integration icons */}
            <div className="cds-integrations">
              <div className="cds-int-grid">
                {INTEGRATIONS.map((logo, i) => (
                  <div key={i} className="cds-int-icon" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
                    {logo}
                  </div>
                ))}
              </div>
            </div>

            {/* Isometric cube */}
            <div className="cds-cube">
              <svg viewBox="0 0 100 100" width="78" height="78">
                <path d="M50 10 L85 30 L50 50 L15 30 Z" fill="none" stroke="#c4c4c4" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M15 30 L15 70 L50 90 L50 50 Z" fill="none" stroke="#c4c4c4" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M85 30 L85 70 L50 90 L50 50 Z" fill="none" stroke="#c4c4c4" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M32 42 L50 54 L68 42 L50 30 Z" fill="none" stroke="#ddd" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}