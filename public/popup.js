document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('summarizeButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
      const tabId = tabs[0].id;
      const tabUrl = tabs[0].url;

      try {
        fetch('http://localhost:8000/summarize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: tabUrl })
        })
        .then(response => response.json())
        .then(data => {
          console.log("show modal");
          chrome.tabs.sendMessage(tabId, { action: "SHOW_MODAL", text: data.summarized_text });
        })
        .catch(error => {
          console.error('Error:', error);
        });
      } catch (error) {
        console.error('Could not send message:', error);
      }
    });
  });
});
