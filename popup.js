document.addEventListener("DOMContentLoaded", async () => {
  const hostnameElement = document.getElementById("hostname");
  const messageElement = document.getElementById("message");

  try {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const result = await browser.extension
      .getBackgroundPage()
      .copyHostname(tabs[0]);

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
    messageElement.textContent = browser.i18n.getMessage("unexpectedError");
    messageElement.className = "message error";
  }
});
