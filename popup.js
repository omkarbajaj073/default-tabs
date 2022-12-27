
document.addEventListener("DOMContentLoaded", function(e) {
  // chrome.storage.local.clear();
  var elem = document.getElementById('add-link');
  elem.addEventListener('click', function () {
    let inp = document.getElementById('input-link');
    let url = inp.value;
    inp.value = '';

    chrome.storage.local.get("default-tabs-links", (links) => {
      let urls = links['default-tabs-links'];
      // console.log(urls);
      urls = [ url, ...urls ];
      chrome.storage.local.set({"default-tabs-links": urls});
    });
    window.location.reload();
  })


  chrome.storage.local.get("default-tabs-links", (links) => {
    let urls = links['default-tabs-links'];
    if (urls === undefined) {
      chrome.storage.local.set({"default-tabs-links": []})
      return;
    }
    console.log(urls);
    let cnt = 1;
    urls.forEach((url) => {
      let elem = document.createElement("div");
      elem.setAttribute("class", "link-content");
      elem.setAttribute("id", `urls-${cnt}`)
      elem.innerHTML = `
        <a href="${url}" target="_blank" id="url-link-${cnt}">${url}</a>
        <button id="url-button-${cnt}" class="remove-button">Remove</button>
      `;
      let parent = document.getElementById("parent");
      parent.appendChild(elem);
      cnt++;
    })

    for (let i = 1; i <= urls.length; i++) {
      let but = document.getElementById(`url-button-${i}`);
      but.addEventListener('click', () => {
        let url = document.getElementById(`url-link-${i}`).innerText;
        chrome.storage.local.get("default-tabs-links", (links) => {
          let urls = links['default-tabs-links'];
          let urls_update = urls.filter((link) => {
            return (link !== url);
          });
          chrome.storage.local.set({"default-tabs-links": urls_update});
        })
        let cur_elem = document.getElementById(`urls-${i}`)
        cur_elem.remove();
      })
    }
  })
})
