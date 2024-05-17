export class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <dialog class="overlay" data-search-overlay>
      <div class="overlay__content">
        <form class="overlay__form" data-search-form id="search">
          <label class="overlay__field">
            <div class="overlay__label">Title</div>
            <input class="overlay__input" data-search-title name="title" placeholder="Any"></input>
          </label>

          <label class="overlay__field">
            <div class="overlay__label">Genre</div>
            <select class="overlay__input overlay__input_select" data-search-genres name="genre"></select>
          </label>

          <label class="overlay__field">
            <div class="overlay__label">Author</div>
            <select class="overlay__input overlay__input_select" data-search-authors name="author">
            </select>
          </label>
        </form>

        <div class="overlay__row">
          <button class="overlay__button" data-search-cancel>Cancel</button>
          <button class="overlay__button overlay__button_primary" type="submit" form="search">Search</button>
        </div>
      </div>
    </dialog>
    `;
  }
}
