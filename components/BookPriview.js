class BookPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Add component-specific styles here */
      </style>
      <div class="book-preview">
        <img src="${this.getAttribute("image")}" alt="Book Image">
        <h3>${this.getAttribute("title")}</h3>
        <p>by ${this.getAttribute("author")}</p>
      </div>
    `;
  }
}

customElements.define("book-preview", BookPreview);
