export class BookPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <dialog class="overlay" data-list-active>
        <div class="overlay__preview"><img class="overlay__blur" data-list-blur src="${
          bookData.image
        }"/><img class="overlay__image" data-list-image src="${
      bookData.image
    }"/></div>
        <div class="overlay__content">
          <h3 class="overlay__title" data-list-title>${bookData.title}</h3>
          <div class="overlay__data" data-list-subtitle>${
            authors[bookData.author]
          } (${new Date(bookData.published).getFullYear()})</div>
          <p class="overlay__data overlay__data_secondary" data-list-description>${
            bookData.description
          }</p>
        </div>
        <div class="overlay__row">
          <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
        </div>
      </dialog>
    `;
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".overlay__button")
      .addEventListener("click", () => {
        handleListItemClick();
      });
  }
}
