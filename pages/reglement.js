import { useState, useEffect } from "react";
import api from "../utils/api";
import styles from "../styles/Reglement.module.css";
import Image from "next/image";
import { parseContent } from "../utils/parseContent";

export default function Reglement() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/rules")
      .then((res) => {
        setTabs(res.data);
        if (res.data.length > 0) setActiveTab(res.data[0].key);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
     <a href="/annonces" className={styles.navBtn}>📢 Annonces</a>
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
        {currentTab?.sections.map((section) => (
          <div key={section._id} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.cards}>
              {section.cards.map((card) => (
                <RuleCard key={card._id} card={card} />
              ))}
            </div>
          </div>
        ))}
      </main>

      <footer className={styles.footer}>
        <a href="/login" className={styles.staffLink}>
          Espace staff
        </a>
      </footer>
    </div>
  );
}

function RuleCard({ card }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.card}>
      <button className={styles.cardHeader} onClick={() => setOpen(!open)}>
        <span>
          {card.icon} {card.title}
        </span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}>
          ▼
        </span>
      </button>
      <div className={`${styles.cardBody} ${open ? styles.cardBodyOpen : ""}`}>
        <p dangerouslySetInnerHTML={{ __html: parseContent(card.content) }} />
      </div>
    </div>
  );
}
