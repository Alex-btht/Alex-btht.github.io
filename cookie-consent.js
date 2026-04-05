(() => {
  const CONSENT_KEY = "fairino_cookie_consent_v1";
  const ACCEPTED = "accepted";
  const REFUSED = "refused";

  if (window.__fairinoCookieBannerLoaded) return;
  window.__fairinoCookieBannerLoaded = true;

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    window.dispatchEvent(new CustomEvent("fairino:cookie-consent", { detail: { value } }));
  }

  function canUseNonEssentialCookies() {
    return getConsent() === ACCEPTED;
  }

  // Helper global for future scripts (analytics, pixels, etc.)
  window.canUseNonEssentialCookies = canUseNonEssentialCookies;

  const style = document.createElement("style");
  style.textContent = `
    #cookieBanner {
      position: fixed;
      left: 16px;
      right: 16px;
      bottom: 16px;
      z-index: 500;
      background: #0f1012;
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 14px;
      box-shadow: 0 16px 45px rgba(0,0,0,0.4);
      padding: 14px;
      color: #f3f3f3;
      font-family: Barlow, sans-serif;
      display: none;
      max-width: 920px;
      margin: 0 auto;
    }
    #cookieBanner.show { display: block; }
    #cookieBanner .cookie-title {
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 11px;
      margin-bottom: 6px;
      color: #f56400;
    }
    #cookieBanner .cookie-text {
      font-size: 13px;
      line-height: 1.6;
      color: rgba(255,255,255,0.84);
      margin-bottom: 12px;
    }
    #cookieBanner .cookie-text a {
      color: #f7a66f;
      text-decoration: none;
      border-bottom: 1px solid rgba(247,166,111,0.4);
    }
    #cookieBanner .cookie-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    #cookieBanner button {
      border: none;
      border-radius: 8px;
      padding: 9px 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      cursor: pointer;
      font-family: Barlow, sans-serif;
    }
    #cookieAccept {
      background: #f56400;
      color: #fff;
    }
    #cookieAccept:hover { background: #ff7a1a; }
    #cookieRefuse {
      background: transparent;
      color: rgba(255,255,255,0.85);
      border: 1px solid rgba(255,255,255,0.22);
    }
    #cookieRefuse:hover { border-color: rgba(255,255,255,0.4); }
    @media (max-width: 640px) {
      #cookieBanner { left: 10px; right: 10px; bottom: 10px; padding: 12px; }
      #cookieBanner .cookie-text { font-size: 12px; }
      #cookieBanner button { width: 100%; }
    }
  `;
  document.head.appendChild(style);

  const banner = document.createElement("div");
  banner.id = "cookieBanner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-live", "polite");
  banner.innerHTML = `
    <div class="cookie-title">Gestion des cookies</div>
    <div class="cookie-text">
      Nous utilisons des cookies strictement nécessaires et, avec votre accord, des cookies optionnels pour les statistiques.
      Vous pouvez accepter ou refuser. Voir les <a href="mentions-legales.html" target="_blank" rel="noopener">mentions légales</a>.
    </div>
    <div class="cookie-actions">
      <button id="cookieAccept" type="button">Accepter</button>
      <button id="cookieRefuse" type="button">Refuser</button>
    </div>
  `;
  document.body.appendChild(banner);

  const consent = getConsent();
  if (consent !== ACCEPTED && consent !== REFUSED) {
    banner.classList.add("show");
  }

  banner.querySelector("#cookieAccept")?.addEventListener("click", () => {
    setConsent(ACCEPTED);
    banner.classList.remove("show");
  });

  banner.querySelector("#cookieRefuse")?.addEventListener("click", () => {
    setConsent(REFUSED);
    banner.classList.remove("show");
  });
})();
