/**
 * Clever AI — Lennar Division Performance Dashboard
 * Built with Claude Code
 *
 * Real pilot results across 5 Lennar markets:
 * $40K spend → $119.5K savings → $122.5M pipeline → 3x ROI
 */

import { useState, useEffect } from "react";

const MARKETS = [
  {
    name: "Phoenix, AZ",
    status: "ACTIVE PILOT",
    statusType: "active",
    start: "2/10/26",
    spend: 18000,
    parcels: 90,
    dials: 709,
    sms: 253,
    hrsSaved: 35.7,
    savings: 9999,
    hot: 5,
    warm: 1,
  },
  {
    name: "Nashville, TN",
    status: "ACTIVE PILOT",
    statusType: "active",
    start: "1/26/26",
    spend: 18000,
    parcels: 98,
    dials: 2498,
    sms: 804,
    hrsSaved: 125.3,
    savings: 32132,
    hot: 3,
    warm: 5,
  },
  {
    name: "Indianapolis, IN",
    status: "ACTIVE PILOT",
    statusType: "active",
    start: "3/2/26",
    spend: 18000,
    parcels: 36,
    dials: 646,
    sms: 210,
    hrsSaved: 32.9,
    savings: 8321,
    hot: 1,
    warm: 1,
  },
  {
    name: "Andy — NY/NJ",
    status: "ANNUAL+PILOT",
    statusType: "annual",
    start: "1/7/26",
    spend: 5000,
    parcels: 333,
    dials: 3353,
    sms: 934,
    hrsSaved: 168.6,
    savings: 44216,
    hot: 18,
    warm: 7,
  },
  {
    name: "Jake — NY/NJ",
    status: "ANNUAL SUB",
    statusType: "annual",
    start: "1/7/26",
    spend: 5000,
    parcels: 233,
    dials: 1734,
    sms: 540,
    hrsSaved: 87.2,
    savings: 23979,
    hot: 6,
    warm: 2,
  },
];

const HOT_DEALS = [
  {
    address: "3727 Sulphur Springs Rd, Murfreesboro, TN",
    apn: "058-03200",
    acres: "31.35",
    zoning: "RM",
    county: "Rutherford Co.",
    value: "~$5.5M",
    note: "Owner connected with team. Motivated divorce sale. Actively moving forward.",
  },
  {
    address: "South Mountain Area, Phoenix, AZ",
    apn: "300-17026K",
    acres: "26",
    zoning: "R1-10",
    county: "20–21 lots",
    value: "~$11.9M",
    note: "Owner open to selling. Rezoning recommendations pending. High-density potential.",
  },
  {
    address: "1355 Auburn Rd, Woolwich Township, NJ",
    apn: "0824_2_10_QFARM",
    acres: "77",
    zoning: "SA Res",
    county: "Dev-ready",
    value: "$30–45K/acre",
    note: "6,500 SF lots. Dev-ready. Nearby comps $350–420/unit. Strong positive feedback.",
  },
];

const EXPANSION = [
  { city: "Atlanta, GA", status: "PENDING PILOT", type: "pending" },
  { city: "Philadelphia, PA", status: "PENDING", type: "pending" },
  { city: "Pensacola, FL", status: "PENDING", type: "pending" },
  { city: "Richmond, VA", status: "DEMO PHASE", type: "demo" },
  { city: "Palm Beach, FL", status: "DEMO PHASE", type: "demo" },
];

const fmt = (n) => n.toLocaleString();
const fmtUSD = (n) =>
  "$" + (n >= 1000000 ? (n / 1000000).toFixed(1) + "M" : n.toLocaleString());

function StatusBadge({ status, type }) {
  const styles = {
    active: {
      background: "#1a2e00",
      color: "#CCFF00",
      border: "1px solid #CCFF00",
    },
    annual: {
      background: "#1a1a00",
      color: "#ffe066",
      border: "1px solid #ffe066",
    },
    pending: {
      background: "#1a1a1a",
      color: "#888",
      border: "1px solid #444",
    },
    demo: {
      background: "#001a2e",
      color: "#66aaff",
      border: "1px solid #336699",
    },
  };
  return (
    <span
      style={{
        ...styles[type],
        padding: "2px 8px",
        fontSize: "9px",
        fontFamily: "monospace",
        letterSpacing: "0.05em",
        borderRadius: "2px",
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

export default function LennarDashboard() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const totals = MARKETS.reduce(
    (acc, m) => ({
      spend: acc.spend + m.spend,
      parcels: acc.parcels + m.parcels,
      dials: acc.dials + m.dials,
      sms: acc.sms + m.sms,
      hrsSaved: acc.hrsSaved + m.hrsSaved,
      savings: acc.savings + m.savings,
      hot: acc.hot + m.hot,
      warm: acc.warm + m.warm,
    }),
    { spend: 0, parcels: 0, dials: 0, sms: 0, hrsSaved: 0, savings: 0, hot: 0, warm: 0 }
  );

  const s = {
    wrap: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      background: "#0a0a0a",
      color: "#fff",
      padding: "20px",
      minHeight: "100vh",
    },
    mono: { fontFamily: "'IBM Plex Mono', monospace" },
    sectionLabel: {
      fontSize: "10px",
      color: "#555",
      fontFamily: "monospace",
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      marginBottom: "10px",
      paddingBottom: "6px",
      borderBottom: "1px solid #1a1a1a",
    },
    th: {
      fontFamily: "monospace",
      fontSize: "9px",
      color: "#444",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      padding: "6px 10px",
      borderBottom: "1px solid #1a1a1a",
      textAlign: "right",
      whiteSpace: "nowrap",
    },
    td: {
      padding: "8px 10px",
      textAlign: "right",
      borderBottom: "1px solid #111",
      fontFamily: "monospace",
      fontSize: "11px",
      color: "#ccc",
      whiteSpace: "nowrap",
    },
  };

  return (
    <div style={s.wrap}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid #1a1a1a",
          paddingBottom: "16px",
          marginBottom: "20px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "#CCFF00",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Clever AI
          </div>
          <div style={{ fontSize: "18px", fontWeight: 600, margin: "4px 0 2px" }}>
            Lennar Division Performance Dashboard
          </div>
          <div style={{ fontSize: "11px", color: "#555", fontFamily: "monospace" }}>
            Active Pilot Results & Deal Pipeline · Prepared for Lennar Division Leadership
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              border: "1px solid #333",
              padding: "2px 10px",
              fontSize: "10px",
              color: "#444",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
            }}
          >
            CONFIDENTIAL
          </div>
          <div style={{ fontSize: "10px", color: "#444", fontFamily: "monospace", marginTop: "6px" }}>
            {date}
          </div>
        </div>
      </div>

      {/* ROI Bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 20px 1fr 20px 1fr 20px 1fr",
          alignItems: "center",
          background: "#0f0f0f",
          border: "1px solid #1a1a1a",
          padding: "16px 20px",
          marginBottom: "20px",
          gap: "8px",
        }}
      >
        {[
          { label: "Platform Spend", value: "$40K", highlight: false },
          null,
          { label: "Combined Savings", value: "$119.5K", highlight: false },
          null,
          { label: "Pipeline Value", value: "$122.5M", highlight: false },
          null,
          { label: "ROI", value: "3.0×", highlight: true },
        ].map((item, i) =>
          item === null ? (
            <div key={i} style={{ color: "#CCFF00", fontSize: "16px", textAlign: "center" }}>
              →
            </div>
          ) : (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "10px",
                  color: "#555",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "4px",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  fontFamily: "monospace",
                  color: item.highlight ? "#CCFF00" : "#fff",
                }}
              >
                {item.value}
              </div>
            </div>
          )
        )}
      </div>

      {/* Market Scorecard */}
      <div style={s.sectionLabel}>Division & Market Scorecard</div>
      <div style={{ overflowX: "auto", marginBottom: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr>
              {["Market", "Status", "Start", "Spend", "Parcels", "AI Dials", "SMS", "Hrs Saved", "Savings", "Hot", "Warm"].map(
                (h, i) => (
                  <th
                    key={h}
                    style={{ ...s.th, textAlign: i < 2 ? "left" : "right" }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {MARKETS.map((m) => (
              <tr key={m.name}>
                <td style={{ ...s.td, textAlign: "left", color: "#fff", fontWeight: 500 }}>{m.name}</td>
                <td style={{ ...s.td, textAlign: "left" }}>
                  <StatusBadge status={m.status} type={m.statusType} />
                </td>
                <td style={s.td}>{m.start}</td>
                <td style={s.td}>${fmt(m.spend)}</td>
                <td style={s.td}>{m.parcels}</td>
                <td style={s.td}>{fmt(m.dials)}</td>
                <td style={s.td}>{m.sms}</td>
                <td style={s.td}>{m.hrsSaved}</td>
                <td style={s.td}>${fmt(m.savings)}</td>
                <td style={{ ...s.td, color: "#CCFF00", fontWeight: 600 }}>{m.hot}</td>
                <td style={{ ...s.td, color: "#ffe066" }}>{m.warm}</td>
              </tr>
            ))}
            <tr>
              {[
                "TOTALS", "", "",
                "$" + fmt(totals.spend),
                totals.parcels,
                fmt(totals.dials),
                fmt(totals.sms),
                totals.hrsSaved.toFixed(1),
                "$" + fmt(totals.savings),
                totals.hot,
                totals.warm,
              ].map((val, i) => (
                <td
                  key={i}
                  style={{
                    ...s.td,
                    textAlign: i < 2 ? "left" : "right",
                    borderTop: "1px solid #333",
                    color: i === 9 ? "#CCFF00" : i === 10 ? "#ffe066" : "#fff",
                    fontWeight: 600,
                    background: "#0f0f0f",
                  }}
                >
                  {val}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pipeline */}
      <div style={s.sectionLabel}>Pre-Offer Pipeline — 1,544 Acres Across 49 Deals</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
        {[
          { num: "33", color: "#CCFF00", label: "Hot Deals — seller engaged" },
          { num: "16", color: "#ffe066", label: "Warm Deals — interested" },
          { num: "$122.5M", color: "#CCFF00", label: "Est. Pipeline Land Value" },
        ].map((c) => (
          <div
            key={c.label}
            style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", padding: "16px 20px" }}
          >
            <div style={{ fontSize: "42px", fontWeight: 600, fontFamily: "monospace", lineHeight: 1, color: c.color }}>
              {c.num}
            </div>
            <div style={{ fontSize: "10px", color: "#555", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "4px" }}>
              {c.label}
            </div>
          </div>
        ))}
      </div>

      {/* Hot Deal Cards */}
      <div style={s.sectionLabel}>Featured Hot Deals</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginBottom: "20px" }}>
        {HOT_DEALS.map((d) => (
          <div
            key={d.apn}
            style={{
              background: "#0f0f0f",
              border: "1px solid #1a1a1a",
              borderLeft: "2px solid #CCFF00",
              padding: "14px",
            }}
          >
            <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px", lineHeight: 1.3 }}>
              {d.address}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
              {[`APN: ${d.apn}`, `${d.acres} acres`, `Zoning: ${d.zoning}`, d.county].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "9px",
                    fontFamily: "monospace",
                    color: "#666",
                    background: "#141414",
                    padding: "2px 6px",
                    border: "1px solid #222",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ fontSize: "16px", fontWeight: 600, fontFamily: "monospace", color: "#CCFF00", marginBottom: "4px" }}>
              {d.value}
            </div>
            <div style={{ fontSize: "10px", color: "#666", lineHeight: 1.4 }}>{d.note}</div>
          </div>
        ))}
      </div>

      {/* Expansion */}
      <div style={s.sectionLabel}>Expansion Pipeline — Pending & Demo-Phase Markets</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {EXPANSION.map((e) => (
          <div
            key={e.city}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              padding: "8px 12px",
              background: "#0f0f0f",
              border: "1px solid #1a1a1a",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: 500 }}>{e.city}</span>
            <StatusBadge status={e.status} type={e.type} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "24px",
          paddingTop: "12px",
          borderTop: "1px solid #111",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "10px",
          color: "#333",
          fontFamily: "monospace",
        }}
      >
        <span>Clever AI · cleverai.land · Confidential — Lennar Division Leadership Only</span>
        <span>Generated by Clever AI Platform</span>
      </div>
    </div>
  );
}
