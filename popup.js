document.addEventListener('DOMContentLoaded', async () => {
  const messageElement = document.getElementById('message');
  
  try {
    // Get the active tab
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    const result = await browser.extension.getBackgroundPage().copyHostname(tabs[0]);
    
    messageElement.textContent = result.message;
    messageElement.className = `message ${result.error ? 'error' : 'success'}`;
  } catch (error) {
    messageElement.textContent = 'Failed to copy hostname';
    messageElement.className = 'message error';
  }
}); 