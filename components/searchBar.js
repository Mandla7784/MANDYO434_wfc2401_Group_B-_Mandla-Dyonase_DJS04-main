export class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
 
      <form id="search-form">
        <input type="text" placeholder="Search for books...">
        <button type="submit">Search</button>
      </form>
    `;
  }
}
