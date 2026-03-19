import { useState, useEffect } from "react";
import api from "../utils/api";
import styles from "../styles/Reglement.module.css";
import Image from "next/image";
import { parseContent } from "../utils/parseContent";

export default function Reglement() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("annonces");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/rules")
      .then((res) => {
        setTabs(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeTab === "annonces") {
      window.decoded = false;
      window.decode = function () {
        if (window.decoded) return;
        window.decoded = true;
        const btn = document.getElementById("decodeBtn");
        btn.textContent = "[ ACCÈS ACCORDÉ... ]";
        btn.style.color = "#ffbd2e";
        btn.style.borderColor = "#ffbd2e";
        let i = 0;
        const crypto = document.getElementById("crypto");
        const chars = "01アイウエオ∅∑∂∇░▒▓";
        const scramble = setInterval(() => {
          if (i >= 14) {
            clearInterval(scramble);
            crypto.style.display = "none";
            btn.style.display = "none";
            document.getElementById("msg").style.display = "block";
            const codes = ["■ F-4X-K9-22 ■", "■ N-7Z-QR-00 ■", "■ P-3C-VV-12 ■"];
            document.getElementById("code").textContent =
              codes[Math.floor(Math.random() * codes.length)];
            return;
          }
          crypto.innerHTML = Array.from({ length: 5 }, () =>
            Array.from({ length: 17 }, () =>
              chars[Math.floor(Math.random() * chars.length)]
            ).join(" ")
          ).join("<br>");
          i++;
        }, 80);
      };
    }
  }, [activeTab]);

  const currentTab = tabs.find((t) => t.key === activeTab);

  if (loading) return <div className={styles.loading}>Chargement...</div>;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="Luminosity RP" width={400} height={400} />
        </div>
        <p className={styles.title}>Règlement</p>
      </header>

      <nav className={styles.nav}>
        <button
          className={`${styles.navBtn} ${activeTab === "annonces" ? styles.active : ""}`}
          onClick={() => setActiveTab("annonces")}
        >
          📢 Annonces
        </button>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.navBtn} ${activeTab === tab.key ? styles.active : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </nav>

      <main className={styles.main}>
        {activeTab === "annonces" ? (
          <div style={{ fontFamily: "'Courier New', monospace", padding: "2rem 1rem" }}>
            <div style={{ border: "1px solid #2a2a2a", borderRadius: "6px", overflow: "hidden", maxWidth: "680px", margin: "0 auto", background: "#0d0d0d", boxShadow: "0 0 40px rgba(0,200,100,0.08)" }}>
              <div style={{ background: "#1a1a1a", padding: "8px 14px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #2a2a2a" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
                <span style={{ color: "#444", fontSize: 11, marginLeft: 8, letterSpacing: 1 }}>SECURE_CHANNEL_v2.1 — ENCRYPTED</span>
              </div>
              <div style={{ padding: "1.6rem 1.8rem", lineHeight: 2 }}>
                <div style={{ color: "#444", fontSize: 11, letterSpacing: 2, marginBottom: "1.2rem" }}>
                  [SYS] &gt; INCOMING TRANSMISSION — ██:██:██ — ORIGIN: UNKNOWN
                </div>
                <div id="crypto" style={{ color: "#1f7a3c", fontSize: 12, letterSpacing: 2, wordBreak: "break-all", lineHeight: 1.8, marginBottom: "1.6rem" }}>
                  4C-61-20-4E-75-69-74-20-74-6F-6D-62-65-2E-20-4C-61<br />
                  20-50-61-6E-74-68-E8-72-65-20-72-C0-64-65-2E-20-4C<br />
                  65-73-20-6F-75-69-73-65-61-75-78-20-6E-65-20-63-68<br />
                  61-6E-74-65-6E-74-20-70-6C-75-73-2E-20-56-6F-75-73<br />
                  20-73-61-76-65-7A-20-6F-F9-20-61-6C-6C-65-72-2E
                </div>
                <div style={{ marginBottom: "1.6rem" }}>
                  <button id="decodeBtn" onClick={() => window.decode()} style={{ background: "transparent", border: "1px solid #1f7a3c", color: "#1f7a3c", padding: "6px 20px", fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 2, cursor: "pointer", borderRadius: 3 }}>
                    [ DÉCRYPTER ]
                  </button>
                </div>
                <div id="msg" style={{ display: "none" }}>
                  <div style={{ borderTop: "1px solid #1f7a3c22", paddingTop: "1.4rem", marginTop: ".4rem" }}>
                    <div style={{ color: "#555", fontSize: 10, letterSpacing: 3, marginBottom: "1rem" }}>✦ MESSAGE DÉCHIFFRÉ — NIVEAU D'ACCÈS : ILLÉGALE ✦</div>
                    <div style={{ color: "#c8ffd4", fontSize: 13, letterSpacing: 1.5, lineHeight: 2.2 }}>
                      <span style={{ color: "#1f7a3c" }}>&gt;&gt;</span> À tous les membres de <span style={{ color: "#5fffaa", fontWeight: "bold" }}>L'ILLÉGALE</span>
                    </div>
                    <div style={{ margin: "1rem 0", padding: "1rem 1.2rem", borderLeft: "2px solid #1f7a3c", background: "#0a1a0e" }}>
                      <p style={{ color: "#aaa", fontSize: 12, letterSpacing: 1, margin: "0 0 .6rem" }}><span style={{ color: "#1f7a3c" }}>|</span> La nuit vous appartient.</p>
                      <p style={{ color: "#aaa", fontSize: 12, letterSpacing: 1, margin: "0 0 .6rem" }}><span style={{ color: "#1f7a3c" }}>|</span> Le rendez-vous est fixé.</p>
                      <p style={{ color: "#aaa", fontSize: 12, letterSpacing: 1, margin: "0 0 .6rem" }}><span style={{ color: "#1f7a3c" }}>|</span> Pas de bruit. Pas de trace. Juste vous.</p>
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse", margin: "1rem 0", fontSize: 12, letterSpacing: 1 }}>
                      <tbody>
                        <tr><td style={{ color: "#555", padding: "4px 0" }}>HEURE</td><td style={{ color: "#5fffaa", fontWeight: "bold", padding: "4px 0" }}>22:00</td></tr>
                        <tr><td style={{ color: "#555", padding: "4px 0" }}>POINT DE CHUTE</td><td style={{ color: "#5fffaa", fontWeight: "bold", padding: "4px 0" }}>AÉROPORT</td></tr>
                        <tr><td style={{ color: "#555", padding: "4px 0" }}>STATUT</td><td style={{ color: "#ffbd2e", fontWeight: "bold", padding: "4px 0" }}>OBLIGATOIRE — AUCUNE EXCUSE</td></tr>
                        <tr><td style={{ color: "#555", padding: "4px 0" }}>CODE D'ACCÈS</td><td style={{ color: "#5fffaa", padding: "4px 0", fontSize: 11, letterSpacing: 2 }}><span id="code">...en attente...</span></td></tr>
                      </tbody>
                    </table>
                    <div style={{ color: "#555", fontSize: 11, letterSpacing: 2, marginTop: "1.4rem", lineHeight: 2 }}>
                      <span style={{ color: "#1f7a3c" }}>$</span> Si tu lis ces lignes, tu sais déjà ce que tu dois faire.<br />
                      <span style={{ color: "#1f7a3c" }}>$</span> Efface ce message. N'en parle à personne.<br />
                      <span style={{ color: "#1f7a3c" }}>$</span> La Panthère voit tout.
                    </div>
                    <div style={{ marginTop: "1.8rem", textAlign: "right" }}>
                      <div style={{ display: "inline-block", border: "1px solid #1f7a3c44", padding: ".8rem 1.4rem", borderRadius: 4, background: "#0a1a0e" }}>
                        <div style={{ color: "#444", fontSize: 10, letterSpacing: 3, marginBottom: ".4rem" }}>SIGNÉ PAR</div>
                        <div style={{ color: "#5fffaa", fontSize: 15, letterSpacing: 4, fontStyle: "italic" }}>— La Panthère de Cayo —</div>
                        <div style={{ color: "#1f7a3c", fontSize: 10, letterSpacing: 2, marginTop: ".4rem" }}>🐾 &nbsp; VÉRIFICATION : ██████ ✓</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ color: "#2a2a2a", fontSize: 10, letterSpacing: 1, marginTop: "1.6rem", borderTop: "1px solid #1a1a1a", paddingTop: ".8rem" }}>
                  [SYS] Ce message s'autodétruira. Ne laissez aucune trace.
                </div>
              </div>
            </div>
          </div>
        ) : (
          currentTab?.sections.map((section) => (
            <div key={section._id} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <div className={styles.cards}>
                {section.cards.map((card) => (
                  <RuleCard key={card._id} card={card} />
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      <footer className={styles.footer}>
        <a href="/login" className={styles.staffLink}>Espace staff</a>
      </footer>
    </div>
  );
}

function RuleCard({ card }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.card}>
      <button className={styles.cardHeader} onClick={() => setOpen(!open)}>
        <span>{card.icon} {card.title}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}>▼</span>
      </button>
      <div className={`${styles.cardBody} ${open ? styles.cardBodyOpen : ""}`}>
        <p dangerouslySetInnerHTML={{ __html: parseContent(card.content) }} />
      </div>
    </div>
  );
}
