browser.webNavigation.onCompleted.addListener((details) => {
    // Ensure the frameId is 0, meaning it's the main frame, not an iframe
    if (details.frameId === 0) {
      // Inject the content script
      browser.tabs.executeScript(details.tabId, {
        file: 'main.js'
      });
    }
  }, {url: [{hostContains: "www.instagram.com"}]});