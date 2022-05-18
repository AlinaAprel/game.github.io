export class Popup {
  renderPopup(score) {
    const body = document.querySelector('body');

    const popup = `
      <div class="popup">
        <div class="popup__card">
          <h1 class="popup__title">your score: ${score}</h1>
          <p class="popup__description">press ENTER to restart the game</p>
        </div>
      </div>
    `;

    body.innerHTML = popup;
  }
}
