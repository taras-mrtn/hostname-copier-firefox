/**
 * Background script for Hostname Copier
 * Uses modern JS features with Manifest V2 compatibility
 */

/**
 * Copies the hostname from a given tab
 * @param {object} tab - Browser tab object containing URL
 * @returns {object} Result object with status and message
 */
async function copyHostname(tab) {
  try {
    if (!tab?.url) {
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

    const { hostname } = urlObject;

    if (!hostname) {
      return {
        message: browser.i18n.getMessage("noHostname"),
        error: true,
      };
    }

    try {
      await navigator.clipboard.writeText(hostname);
      return {
        hostname,
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

// Listen for messages from popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "copyHostname") {
    browser.tabs.query({ active: true, currentWindow: true })
      .then(tabs => {
        if (!tabs.length) {
          return { message: browser.i18n.getMessage("cannotAccessTab"), error: true };
        }
        return copyHostname(tabs[0]);
      })
      .then(result => sendResponse(result))
      .catch(error => {
        console.error("Error in message handler:", error);
        sendResponse({
          message: browser.i18n.getMessage("unexpectedError"),
          error: true
        });
      });
    
    // Must return true for async sendResponse
    return true;
  }
});

// Make function available to the popup for direct access (Manifest V2 compatibility)
window.copyHostname = copyHostname;
