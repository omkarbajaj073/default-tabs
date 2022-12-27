
document.addEventListener("DOMContentLoaded", function(e) {
  var elem = document.getElementById('add-link');
  elem.addEventListener('click', function () {
    let inp = document.getElementById('input-link');
    let url = inp.value;
    inp.value = '';

    chrome.storage.local.get("default-tabs-links", (links) => {
      let urls = links['default-tabs-links'];
      urls = [ url, ...urls ];
      console.log(urls);
      chrome.storage.local.set({"default-tabs-links": urls});
    })

    // refresh the popup
  })


  chrome.storage.local.get("default-tabs-links", (links) => {
    let urls = links['default-tabs-links'];
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
        // remove that url
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
