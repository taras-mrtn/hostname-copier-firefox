async function copyHostname(tab) {
  try {
    if (!tab || !tab.url) {
      return {
        message: browser.i18n.getMessage("cannotAccessTab"),
        error: true,
      };
    }

    let urlObject;
    try {
      urlObject = new URL(tab.url);
    } catch (urlError) {
      return {
        message: browser.i18n.getMessage("invalidUrl"),
        error: true,
      };
    }

    if (urlObject.protocol !== "http:" && urlObject.protocol !== "https:") {
      return {
        message: browser.i18n.getMessage("httpOnly"),
        error: true,
      };
    }

    const hostname = urlObject.hostname;

    if (!hostname) {
      return {
        message: browser.i18n.getMessage("noHostname"),
        error: true,
      };
    }

    try {
      await navigator.clipboard.writeText(hostname);
      return {
        hostname: hostname,
        message: browser.i18n.getMessage("successMessage"),
        error: false,
      };
    } catch (clipboardError) {
      return {
        message: browser.i18n.getMessage("clipboardError"),
        error: true,
      };
    }
  } catch (error) {
    console.error("Extension error:", error);
    return {
      message: browser.i18n.getMessage("unexpectedError"),
      error: true,
    };
  }
}

window.copyHostname = copyHostname;
