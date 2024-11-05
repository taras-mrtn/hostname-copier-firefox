async function copyHostname(tab) {
  try {
    // Check if tab exists
    if (!tab || !tab.url) {
      return {
        message: '❌ Cannot access current tab',
        error: true
      };
    }

    let urlObject;
    try {
      urlObject = new URL(tab.url);
    } catch (urlError) {
      return {
        message: '❌ Invalid URL format',
        error: true
      };
    }
    
    // Check if protocol is http or https
    if (urlObject.protocol !== 'http:' && urlObject.protocol !== 'https:') {
      return {
        message: '⚠️ Can only copy hostnames from HTTP/HTTPS URLs',
        error: true
      };
    }

    const hostname = urlObject.hostname;
    
    // Check if hostname exists
    if (!hostname) {
      return {
        message: '⚠️ No hostname found in URL',
        error: true
      };
    }

    try {
      await navigator.clipboard.writeText(hostname);
      return {
        message: `✅ Hostname "${hostname}" copied!`,
        error: false
      };
    } catch (clipboardError) {
      return {
        message: '❌ Failed to copy to clipboard',
        error: true
      };
    }
  } catch (error) {
    console.error('Extension error:', error);
    return {
      message: '❌ Unexpected error occurred',
      error: true
    };
  }
}

// Export for popup.js to use
window.copyHostname = copyHostname;