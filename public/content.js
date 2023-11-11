chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  showModal(request.text);
  return true;
});

function createModal() {
  let modal = document.createElement('div');
  modal.id = 'summaryModal';
  modal.style = 'position: fixed; z-index: 10000; left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: rgba(0,0,0,0.5); padding: 20px; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); min-width: 300px; max-width: 600px; display: none;';

  let modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalContent.style = 'background: #fff; margin: 0 auto; padding: 20px; position: relative; overflow-y: auto; max-height: 80vh; box-sizing: border-box;';
  
  modalContent.appendChild(createCloseButton());
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  return modal;
}

function createCloseButton() {
  let closeButton = document.createElement('span');
  closeButton.className = 'modal-close';
  closeButton.innerHTML = '&times;';
  closeButton.style = 'position: absolute; top: 10px; right: 20px; cursor: pointer; font-size: 1.5em; line-height: 1;';
  closeButton.addEventListener('click', function() {
    document.getElementById('summaryModal').style.display = 'none';
  });
  return closeButton;
}

function showModal(summary) {
  let modal = document.getElementById('summaryModal') || createModal();
  let modalContent = modal.querySelector('.modal-content');

  modalContent.innerHTML = '';
  modalContent.appendChild(createCloseButton());

  let summaryText = document.createElement('p');
  summaryText.className = 'modal-text';
  summaryText.style = 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;';
  summaryText.textContent = summary;
  modalContent.appendChild(summaryText);

  modal.style.display = 'flex';
}
