import { useState, useEffect } from "react";
import api from "../utils/api";
import styles from "../styles/RulesEditor.module.css";

const COLORS = [
  { label: "Jaune", value: "yellow", hex: "#f1c40f" },
  { label: "Rouge", value: "red", hex: "#e74c3c" },
  { label: "Vert", value: "green", hex: "#2ecc71" },
  { label: "Bleu", value: "blue", hex: "#3498db" },
  { label: "Violet", value: "purple", hex: "#9b59b6" },
];

function Toolbar({ sectionId, cardId, content, onUpdate }) {
  const insert = (before, after) => {
    const el = document.querySelector(
      `[data-sid="${sectionId}"][data-cid="${cardId}"]`,
    );
    if (!el) return;
    el.focus();
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = content.substring(start, end);
    const beforeLen = before.length;
    const afterLen = after.length;
    const alreadyWrapped =
      content.substring(start - beforeLen, start) === before &&
      content.substring(end, end + afterLen) === after;

    if (alreadyWrapped) {
      el.setSelectionRange(start - beforeLen, end + afterLen);
      document.execCommand("insertText", false, selected);
    } else {
      document.execCommand("insertText", false, before + selected + after);
      el.setSelectionRange(start + beforeLen, end + beforeLen);
    }
  };

  return (
    <div className={styles.toolbar}>
      <button
        type="button"
        className={styles.toolBtn}
        onClick={() => insert("**", "**")}
        title="Gras"
      >
        <b>G</b>
      </button>
      <button
        type="button"
        className={styles.toolBtn}
        onClick={() => insert("*", "*")}
        title="Italique"
      >
        <i>I</i>
      </button>
      <button
        type="button"
        className={styles.toolBtn}
        onClick={() => insert("__", "__")}
        title="Souligné"
      >
        <u>U</u>
      </button>
      <button
        type="button"
        className={styles.toolBtn}
        onClick={() => insert("~~", "~~")}
        title="Barré"
      >
        <s>S</s>
      </button>
      <button
        type="button"
        className={styles.toolBtn}
        onClick={() => {
          const el = document.querySelector(
            `[data-sid="${sectionId}"][data-cid="${cardId}"]`,
          );
          if (!el) return;
          el.focus();
          const start = el.selectionStart;
          const end = el.selectionEnd;
          const selected = content.substring(start, end);
          const allBulleted = selected
            .split("\n")
            .every((l) => !l || l.startsWith("- "));
          const lined = selected
            .split("\n")
            .map((l) => {
              if (!l) return l;
              return allBulleted ? l.replace(/^- /, "") : `- ${l}`;
            })
            .join("\n");
          el.setSelectionRange(start, end);
          document.execCommand("insertText", false, lined);
          el.setSelectionRange(start, start + lined.length);
        }}
        title="Puce"
      >
        •
      </button>
      <div className={styles.colorPicker}>
        {COLORS.map((c) => (
          <button
            key={c.value}
            type="button"
            className={styles.colorBtn}
            style={{ background: c.hex }}
            title={c.label}
            onClick={() =>
              c.value === "default"
                ? insert("", "")
                : insert(`[color:${c.hex}]`, "[/color]")
            }
          />
        ))}
      </div>
    </div>
  );
}
export default function RulesEditor() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/rules").then((res) => {
      setTabs(res.data);
      if (res.data.length > 0) setActiveTab(res.data[0].key);
    });
  }, []);

  const currentTab = tabs.find((t) => t.key === activeTab);

  const updateTab = (updater) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.key !== activeTab ? tab : updater(tab))),
    );
  };

  const updateCard = (sectionId, cardId, field, value) => {
    updateTab((tab) => ({
      ...tab,
      sections: tab.sections.map((s) =>
        s._id !== sectionId
          ? s
          : {
              ...s,
              cards: s.cards.map((c) =>
                c._id !== cardId ? c : { ...c, [field]: value },
              ),
            },
      ),
    }));
  };

  const addCard = (sectionId) => {
    updateTab((tab) => ({
      ...tab,
      sections: tab.sections.map((s) =>
        s._id !== sectionId
          ? s
          : {
              ...s,
              cards: [
                ...s.cards,
                {
                  _id: "new_" + Date.now(),
                  icon: "📋",
                  title: "Nouvelle règle",
                  content: "",
                  order: s.cards.length,
                },
              ],
            },
      ),
    }));
  };

  const removeCard = (sectionId, cardId) => {
    updateTab((tab) => ({
      ...tab,
      sections: tab.sections.map((s) =>
        s._id !== sectionId
          ? s
          : {
              ...s,
              cards: s.cards.filter((c) => c._id !== cardId),
            },
      ),
    }));
  };

  const moveCard = (sectionId, cardId, direction) => {
    updateTab((tab) => ({
      ...tab,
      sections: tab.sections.map((s) => {
        if (s._id !== sectionId) return s;
        const idx = s.cards.findIndex((c) => c._id === cardId);
        const newIdx = idx + direction;
        if (newIdx < 0 || newIdx >= s.cards.length) return s;
        const cards = [...s.cards];
        [cards[idx], cards[newIdx]] = [cards[newIdx], cards[idx]];
        return { ...s, cards };
      }),
    }));
  };

  const addSection = () => {
    updateTab((tab) => ({
      ...tab,
      sections: [
        ...tab.sections,
        {
          _id: "new_" + Date.now(),
          title: "Nouvelle section",
          cards: [],
          order: tab.sections.length,
        },
      ],
    }));
  };

  const removeSection = (sectionId) => {
    updateTab((tab) => ({
      ...tab,
      sections: tab.sections.filter((s) => s._id !== sectionId),
    }));
  };

  const moveSection = (sectionId, direction) => {
    updateTab((tab) => {
      const idx = tab.sections.findIndex((s) => s._id === sectionId);
      const newIdx = idx + direction;
      if (newIdx < 0 || newIdx >= tab.sections.length) return tab;
      const sections = [...tab.sections];
      [sections[idx], sections[newIdx]] = [sections[newIdx], sections[idx]];
      return { ...tab, sections };
    });
  };

  const updateSectionTitle = (sectionId, value) => {
    updateTab((tab) => ({
      ...tab,
      sections: tab.sections.map((s) =>
        s._id !== sectionId ? s : { ...s, title: value },
      ),
    }));
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await api.put(`/rules/${activeTab}`, {
        sections: currentTab.sections,
      });
      setTabs((prev) =>
        prev.map((tab) => (tab.key !== activeTab ? tab : res.data)),
      );
      setMessage("✅ Sauvegardé avec succès !");
    } catch {
      setMessage("❌ Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (!currentTab) return <div className={styles.loading}>Chargement...</div>;

  return (
    <div className={styles.editor}>
      <div className={styles.topBar}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabBtn} ${activeTab === tab.key ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.actions}>
          {message && <span className={styles.message}>{message}</span>}
          <button className={styles.saveBtn} onClick={save} disabled={saving}>
            {saving ? "Sauvegarde..." : "SAUVEGARDER"}
          </button>
        </div>
      </div>

      <div className={styles.sections}>
        {currentTab.sections.map((section, sIdx) => (
          <div key={sIdx} className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.moveButtons}>
                <button
                  className={styles.moveBtn}
                  onClick={() => moveSection(section._id, -1)}
                  disabled={sIdx === 0}
                >
                  ↑
                </button>
                <button
                  className={styles.moveBtn}
                  onClick={() => moveSection(section._id, 1)}
                  disabled={sIdx === currentTab.sections.length - 1}
                >
                  ↓
                </button>
              </div>
              <input
                className={styles.sectionTitle}
                value={section.title}
                onChange={(e) =>
                  updateSectionTitle(section._id, e.target.value)
                }
              />
              <button
                className={styles.deleteBtn}
                onClick={() => removeSection(section._id)}
              >
                Supprimer section
              </button>
            </div>

            {section.cards.map((card, cIdx) => (
              <div key={cIdx} className={styles.card}>
                <div className={styles.cardRow}>
                  <div className={styles.moveButtons}>
                    <button
                      className={styles.moveBtn}
                      onClick={() => moveCard(section._id, card._id, -1)}
                      disabled={cIdx === 0}
                    >
                      ↑
                    </button>
                    <button
                      className={styles.moveBtn}
                      onClick={() => moveCard(section._id, card._id, 1)}
                      disabled={cIdx === section.cards.length - 1}
                    >
                      ↓
                    </button>
                  </div>
                  <input
                    className={styles.iconInput}
                    value={card.icon}
                    onChange={(e) =>
                      updateCard(section._id, card._id, "icon", e.target.value)
                    }
                    placeholder="🎯"
                  />
                  <input
                    className={styles.titleInput}
                    value={card.title}
                    onChange={(e) =>
                      updateCard(section._id, card._id, "title", e.target.value)
                    }
                    placeholder="Titre de la règle"
                  />
                  <button
                    className={styles.deleteBtn}
                    onClick={() => removeCard(section._id, card._id)}
                  >
                    ✕
                  </button>
                </div>
                <Toolbar
                  sectionId={section._id}
                  cardId={card._id}
                  content={card.content}
                  onUpdate={(val) =>
                    updateCard(section._id, card._id, "content", val)
                  }
                />
                <textarea
                  data-sid={section._id}
                  data-cid={card._id}
                  className={styles.contentInput}
                  value={card.content}
                  onChange={(e) =>
                    updateCard(section._id, card._id, "content", e.target.value)
                  }
                  placeholder="Contenu de la règle..."
                  rows={4}
                />
              </div>
            ))}

            <button
              className={styles.addBtn}
              onClick={() => addCard(section._id)}
            >
              + Ajouter une règle
            </button>
          </div>
        ))}

        <button className={styles.addSectionBtn} onClick={addSection}>
          + Ajouter une section
        </button>
      </div>
    </div>
  );
}
