(() => {
  const DEFAULT_CONFIG = {
    showCareersLink: false,
    cobots: {
      FR3: { status: "in_stock", priceText: "4 600 €", priceSubText: "HT · Livré en France" },
      "FR3-WML": { status: "on_demand", priceText: "PRIX SUR DEMANDE", priceSubText: "HT · Livré en France" },
      FR5: { status: "in_stock", priceText: "4 800 €", priceSubText: "HT · Livré en France" },
      "FR5-WML": { status: "arriving", priceText: "En cours d'arrivage", priceSubText: "" },
      FR10: { status: "in_stock", priceText: "10 500 €", priceSubText: "HT · Livré en France" },
      FR16: { status: "on_demand", priceText: "PRIX SUR DEMANDE", priceSubText: "HT · Livré en France" },
      FR20: { status: "on_demand", priceText: "PRIX SUR DEMANDE", priceSubText: "HT · Livré en France" },
      FR30: { status: "on_demand", priceText: "PRIX SUR DEMANDE", priceSubText: "HT · Livré en France" },
      FR30L: { status: "soon", priceText: "Disponible prochainement", priceSubText: "" }
    },
    eventPopup: {
      enabled: false,
      showOnlyOncePerSession: true,
      title: "FAIRINO France au salon Global Industrie",
      subtitle: "Retrouvez-nous sur notre stand pour des demos cobot en direct.",
      ctaText: "Voir les infos",
      ctaHref: "https://www.global-industrie.com/",
      imageUrl: "images/events/salon-banner.png"
    }
  };

  let runtimeConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function mergeConfig(base, override) {
    const merged = clone(base);
    if (!override || typeof override !== "object") return merged;

    if (typeof override.showCareersLink === "boolean") {
      merged.showCareersLink = override.showCareersLink;
    }

    if (override.cobots && typeof override.cobots === "object") {
      Object.keys(base.cobots).forEach((model) => {
        const incoming = override.cobots[model];
        if (incoming && typeof incoming === "object") {
          merged.cobots[model] = { ...merged.cobots[model], ...incoming };
        }
      });
    }

    if (override.eventPopup && typeof override.eventPopup === "object") {
      merged.eventPopup = { ...merged.eventPopup, ...override.eventPopup };
      if (typeof merged.eventPopup.enabled !== "boolean") merged.eventPopup.enabled = base.eventPopup.enabled;
      if (typeof merged.eventPopup.showOnlyOncePerSession !== "boolean") {
        merged.eventPopup.showOnlyOncePerSession = base.eventPopup.showOnlyOncePerSession;
      }
    }

    return merged;
  }

  function getSiteConfig() {
    return clone(runtimeConfig);
  }

  async function loadSiteConfig() {
    try {
      const res = await fetch(`site-config.json?v=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Config non accessible");
      const remote = await res.json();
      runtimeConfig = mergeConfig(DEFAULT_CONFIG, remote);
    } catch {
      runtimeConfig = clone(DEFAULT_CONFIG);
    }
    window.dispatchEvent(new CustomEvent("fairino:site-config-ready", { detail: getSiteConfig() }));
    return getSiteConfig();
  }

  window.FAIRINO_SITE_CONFIG_DEFAULTS = clone(DEFAULT_CONFIG);
  window.getSiteConfig = getSiteConfig;
  window.loadSiteConfig = loadSiteConfig;
  window.siteConfigReady = loadSiteConfig();
})();
