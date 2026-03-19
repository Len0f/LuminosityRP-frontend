import styles from "../styles/Reglement.module.css";
import Image from "next/image";

export default function Annonces() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="Luminosity RP" width={250} height={250} />
        </div>
        <p className={styles.title}>Annonces</p>
      </header>

      <div dangerouslySetInnerHTML={{ __html: `
        <div style="font-family: 'Courier New', monospace; padding: 2rem 1rem; background: transparent;">
          <div style="border: 1px solid #2a2a2a; border-radius: 6px; overflow: hidden; max-width: 680px; margin: 0 auto; background: #0d0d0d; box-shadow: 0 0 40px rgba(0,200,100,0.08);">
            <div style="background: #1a1a1a; padding: 8px 14px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #2a2a2a;">
              <span style="width:10px;height:10px;border-radius:50%;background:#ff5f56;display:inline-block;"></span>
              <span style="width:10px;height:10px;border-radius:50%;background:#ffbd2e;display:inline-block;"></span>
              <span style="width:10px;height:10px;border-radius:50%;background:#27c93f;display:inline-block;"></span>
              <span style="color:#444;font-size:11px;margin-left:8px;letter-spacing:1px;">SECURE_CHANNEL_v2.1 — ENCRYPTED</span>
            </div>
            <div style="padding: 1.6rem 1.8rem; line-height: 2;">
              <div style="color:#444;font-size:11px;letter-spacing:2px;margin-bottom:1.2rem;">[SYS] &gt; INCOMING TRANSMISSION — ██:██:██ — ORIGIN: UNKNOWN</div>
              <div id="crypto" style="color:#1f7a3c;font-size:12px;letter-spacing:2px;word-break:break-all;line-height:1.8;margin-bottom:1.6rem;">
                4C-61-20-4E-75-69-74-20-74-6F-6D-62-65-2E-20-4C-61<br>
                20-50-61-6E-74-68-E8-72-65-20-72-C0-64-65-2E-20-4C<br>
                65-73-20-6F-75-69-73-65-61-75-78-20-6E-65-20-63-68<br>
                61-6E-74-65-6E-74-20-70-6C-75-73-2E-20-56-6F-75-73<br>
                20-73-61-76-65-7A-20-6F-F9-20-61-6C-6C-65-72-2E
              </div>
              <div style="margin-bottom:1.6rem;">
                <button id="decodeBtn" onclick="decode()" style="background:transparent;border:1px solid #1f7a3c;color:#1f7a3c;padding:6px 20px;font-family:'Courier New',monospace;font-size:12px;letter-spacing:2px;cursor:pointer;border-radius:3px;">[ DÉCRYPTER ]</button>
              </div>
              <div id="msg" style="display:none;">
                <div style="border-top:1px solid #1f7a3c22;padding-top:1.4rem;margin-top:.4rem;">
                  <div style="color:#555;font-size:10px;letter-spacing:3px;margin-bottom:1rem;">✦ MESSAGE DÉCHIFFRÉ — NIVEAU D'ACCÈS : ILLÉGALE ✦</div>
                  <div style="color:#c8ffd4;font-size:13px;letter-spacing:1.5px;line-height:2.2;"><span style="color:#1f7a3c;">&gt;&gt;</span> À tous les membres de <span style="color:#5fffaa;font-weight:bold;">L'ILLÉGALE</span></div>
                  <div style="margin: 1rem 0; padding: 1rem 1.2rem; border-left: 2px solid #1f7a3c; background: #0a1a0e;">
                    <p style="color:#aaa;font-size:12px;letter-spacing:1px;margin:0 0 .6rem;"><span style="color:#1f7a3c;">|</span> La nuit vous appartient.</p>
                    <p style="color:#aaa;font-size:12px;letter-spacing:1px;margin:0 0 .6rem;"><span style="color:#1f7a3c;">|</span> Le rendez-vous est fixé.</p>
                    <p style="color:#aaa;font-size:12px;letter-spacing:1px;margin:0 0 .6rem;"><span style="color:#1f7a3c;">|</span> Pas de bruit. Pas de trace. Juste vous.</p>
                  </div>
                  <table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:12px;letter-spacing:1px;">
                    <tr><td style="color:#555;padding:4px 0;">HEURE</td><td style="color:#5fffaa;font-weight:bold;padding:4px 0;">22:00</td></tr>
                    <tr><td style="color:#555;padding:4px 0;">POINT DE CHUTE</td><td style="color:#5fffaa;font-weight:bold;padding:4px 0;">AÉROPORT</td></tr>
                    <tr><td style="color:#555;padding:4px 0;">STATUT</td><td style="color:#ffbd2e;font-weight:bold;padding:4px 0;">OBLIGATOIRE — AUCUNE EXCUSE</td></tr>
                    <tr><td style="color:#555;padding:4px 0;">CODE D'ACCÈS</td><td style="color:#5fffaa;padding:4px 0;font-size:11px;letter-spacing:2px;"><span id="code">...en attente...</span></td></tr>
                  </table>
                  <div style="color:#555;font-size:11px;letter-spacing:2px;margin-top:1.4rem;line-height:2;">
                    <span style="color:#1f7a3c;">$</span> Si tu lis ces lignes, tu sais déjà ce que tu dois faire.<br>
                    <span style="color:#1f7a3c;">$</span> Efface ce message. N'en parle à personne.<br>
                    <span style="color:#1f7a3c;">$</span> La Panthère voit tout.
                  </div>
                  <div style="margin-top:1.8rem;text-align:right;">
                    <div style="display:inline-block;border:1px solid #1f7a3c44;padding:.8rem 1.4rem;border-radius:4px;background:#0a1a0e;">
                      <div style="color:#444;font-size:10px;letter-spacing:3px;margin-bottom:.4rem;">SIGNÉ PAR</div>
                      <div style="color:#5fffaa;font-size:15px;letter-spacing:4px;font-style:italic;">— La Panthère de Cayo —</div>
                      <div style="color:#1f7a3c;font-size:10px;letter-spacing:2px;margin-top:.4rem;">🐾 &nbsp; VÉRIFICATION : ██████ ✓</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="color:#2a2a2a;font-size:10px;letter-spacing:1px;margin-top:1.6rem;border-top:1px solid #1a1a1a;padding-top:.8rem;">[SYS] Ce message s'autodétruira. Ne laissez aucune trace.</div>
            </div>
          </div>
        </div>

        <style>
          #decodeBtn:hover { background:#1f7a3c22; box-shadow: 0 0 12px #1f7a3c44; }
        </style>

        <script>
          let decoded = false;
          const codes = ['■ F-4X-K9-22 ■', '■ N-7Z-QR-00 ■', '■ P-3C-VV-12 ■'];
          function decode() {
            if (decoded) return;
            decoded = true;
            const btn = document.getElementById('decodeBtn');
            btn.textContent = '[ ACCÈS ACCORDÉ... ]';
            btn.style.color = '#ffbd2e';
            btn.style.borderColor = '#ffbd2e';
            let i = 0;
            const crypto = document.getElementById('crypto');
            const chars = '01アイウエオ∅∑∂∇░▒▓';
            const scramble = setInterval(() => {
              if (i >= 14) {
                clearInterval(scramble);
                crypto.style.display = 'none';
                btn.style.display = 'none';
                document.getElementById('msg').style.display = 'block';
                document.getElementById('code').textContent = codes[Math.floor(Math.random() * codes.length)];
                return;
              }
              crypto.innerHTML = Array.from({length: 5}, () =>
                Array.from({length: 17}, () =>
                  chars[Math.floor(Math.random() * chars.length)]
                ).join(' ')
              ).join('<br>');
              i++;
            }, 80);
          }
        </script>
      `}} />

      <footer className={styles.footer}>
        <a href="/login" className={styles.staffLink}>Espace staff</a>
      </footer>
    </div>
  );
}
