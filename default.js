chrome.windows.onCreated.addListener(() => {
  chrome.storage.local.get('default-tabs-links', function(links) {
    let urls = links['default-tabs-links'];
    urls.forEach((url) => {
      chrome.tabs.create({
        'active': true,
        'selected': false,
        'url': url
      })
    })
  });
});
