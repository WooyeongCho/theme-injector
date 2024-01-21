chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.startsWith('https://playentry.org/ws')) {
    if (changeInfo.status === "loading") {
      inject("theme.css", "file");
    }
  }
})

function inject(path, type) {
  chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
    if(tabs[0].id) { 
      if(type == "file") {
        chrome.scripting.insertCSS({target: {tabId: tabs[0].id}, files: [path]});
      } else {
        chrome.scripting.insertCSS({css: path, target: {tabId: tabs[0].id}});
      }
    }
  })
}
