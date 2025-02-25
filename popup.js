/**
 * Hostname Copier - Popup Script
 * Updated with modern JS features
 * Supports both direct background page access and message passing
 */

/**
 * Helper to determine if a color is dark
 * @param {string|object} color - Color in hex, rgb string or object format
 * @returns {boolean} True if the color is considered dark
 */
const isColorDark = (color) => {
  // Extract RGB components
  let r, g, b;
  
  if (typeof color === 'string') {
    // Handle hex or rgb string
    const match = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (match) {
      [, r, g, b] = match.map(Number);
    } else if (color.startsWith('#')) {
      const hex = color.substring(1);
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  } else if (color?.r !== undefined) {
    // Handle color object
    ({ r, g, b } = color);
  }
  
  // Calculate perceived brightness using the formula
  // (0.299*R + 0.587*G + 0.114*B)
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
  return brightness < 128; // If less than 128, considered dark
};

/**
 * Apply theme based on browser theme or system preference
 */
const applyTheme = () => {
  browser.theme.getCurrent().then((theme) => {
    // Check theme based on browser theme
    let isDark = false;
    
    if (theme.colors?.popup) {
      // Apply dark mode if browser theme has dark popup
      isDark = isColorDark(theme.colors.popup);
    } else {
      // Check system preference if no theme colors
      isDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    }
    
    // Remove initial dark mode class
    document.documentElement.classList.remove('initial-dark');
    
    if (isDark) {
      // Apply dark theme to body
      document.body.classList.add('dark-theme');
    } else {
      // Explicitly set light mode
      document.documentElement.classList.add('light-mode-confirmed');
    }
  });
};

/**
 * Get hostname using the background page
 * @returns {Promise<object>} Result with hostname and status
 */
const getHostname = async () => {
  try {
    // Try background page direct access first (Manifest V2)
    const backgroundPage = browser.extension.getBackgroundPage();
    if (backgroundPage?.copyHostname) {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      return await backgroundPage.copyHostname(tabs[0]);
    } else {
      // Fallback to message passing
      return await browser.runtime.sendMessage({ action: "copyHostname" });
    }
  } catch (error) {
    console.error("Error getting hostname:", error);
    return {
      message: browser.i18n.getMessage("unexpectedError"),
      error: true
    };
  }
};

/**
 * Initialize popup and request hostname copying
 */
const initPopup = async () => {
  const hostnameElement = document.getElementById("hostname");
  const messageElement = document.getElementById("message");
  const shortcutElement = document.getElementById("shortcut");
  
  // Apply theme
  applyTheme();
  
  // Listen for theme changes
  browser.theme.onUpdated.addListener(applyTheme);

  // Display keyboard shortcut info
  shortcutElement.textContent = browser.i18n.getMessage("keyboardShortcut");

  try {
    // Get hostname from background
    const result = await getHostname();

    if (!result.error) {
      hostnameElement.textContent = result.hostname;
    }

    messageElement.textContent = result.message;
    messageElement.className = `message ${result.error ? "error" : "success"}`;

    // Close popup after 2 seconds if operation was successful
    if (!result.error) {
      setTimeout(() => {
        window.close();
      }, 2000);
    }
  } catch (error) {
    console.error("Error in popup:", error);
    messageElement.textContent = browser.i18n.getMessage("unexpectedError");
    messageElement.className = "message error";
  }
};

// Initialize popup when DOM is ready
document.addEventListener("DOMContentLoaded", initPopup);
