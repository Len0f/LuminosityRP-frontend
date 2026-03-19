import { useEffect } from "react";
import styles from "../styles/Reglement.module.css";
import Image from "next/image";

export default function Annonces() {
  useEffect(() => {
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
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="Luminosity RP" width={250} height={250} />
        </div>
        <p className={styles.title}>Annonces</p>
      </header>

      <div style={{ fontFamily: "'Courier New', monospace", padding: "2rem 1rem" }}>
        <div style={{ border: "1px solid #2a2a2a", borderRadius: "6px", overflow: "hidden", maxWidth: "680px", margin: "0 auto", background: "#0d0d0d", boxShadow: "0 0 40px rgba(0,200,100,0.08)" }}>
          
          <div style={{ background: "#1a1a1a", padding: "8px 14px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #2a2a2a" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
            <span style={{ color: "#444", fontSize: 11, marginLeft: 8, letterSpacing: 1 }}>SECURE_CHANNEL_v2.1 — ENCRYPTED</span>
          </div>

          <div style={{ padding: "1.6rem 1.8rem", lineHeight: 2 }}>
            <div style={{ color: "#444"
