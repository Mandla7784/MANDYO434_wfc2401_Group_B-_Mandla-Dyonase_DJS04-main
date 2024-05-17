// Importing data from other modules
import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

const HTML = {
  fragments: {
    start: document.createDocumentFragment(),
    genres: document.createDocumentFragment(),
    authors: document.createDocumentFragment(),
    newItems: document.createDocumentFragment(),
    firstGenreElement: document.createElement("option"),
    element: document.createElement("button"),
    firstAuthorElement: document.createDocumentFragment(),
  },
};

const bookInfo = {
  page: 1,
  matches: books,
};

function renderBookElement(book) {
  const { element } = HTML.fragments;
  element.classList.add("preview");
  element.setAttribute("data-preview", book.id);
  element.innerHTML = `
    <img class="preview__image" src="${book.image}" />
    <div class="preview__info">
      <h3 class="preview__title">${book.title}</h3>
      <div class="preview__author">${authors[book.author]}</div>
    </div>
  `;
  return element.cloneNode(true);
}

function renderBookPreviews() {
  const { start } = HTML.fragments;
  const { matches } = bookInfo;
  for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = renderBookElement(book);
    start.appendChild(element);
  }
  const bookListItem = document.querySelector("[data-list-items]");
  bookListItem.appendChild(start.cloneNode(true));
}

function updateTheme(selectedTheme) {
  const darkColor = selectedTheme === "night" ? "255, 255, 255" : "10, 10, 20";
  const lightColor = selectedTheme === "night" ? "10, 10, 20" : "255, 255, 255";
  document.documentElement.style.setProperty("--color-dark", darkColor);
  document.documentElement.style.setProperty("--color-light", lightColor);
}

function updateListButtonState() {
  const listButton = document.querySelector("[data-list-button]");
  const remaining = Math.max(
    0,
    bookInfo.matches.length - bookInfo.page * BOOKS_PER_PAGE
  );
  listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining})</span>
  `;
  listButton.disabled = remaining === 0;
}

// Placeholder event handler functions
function handleThemeFormSubmit(event) {
  event.preventDefault();
  // Implement your logic here
}

function handleSearchFormSubmit(event) {
  event.preventDefault();
  // Implement your logic here
}

function handleListButtonClick() {
  // Implement your logic here
}

function handleBookPreviewClick(event) {
  // Implement your logic here
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  renderBookPreviews();
  updateTheme(document.querySelector("[data-settings-theme]").value);
  updateListButtonState();
});

document.querySelector("[data-settings-theme]").value =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "night"
    : "day";

document.querySelector("[data-search-cancel]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = false;
});

document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = false;
  });

document.querySelector("[data-header-search]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = true;
  document.querySelector("[data-search-title]").focus();
});

document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = true;
  });

document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false;
});

document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", handleThemeFormSubmit);

document
  .querySelector("[data-search-form]")
  .addEventListener("submit", handleSearchFormSubmit);

document
  .querySelector("[data-list-button]")
  .addEventListener("click", handleListButtonClick);

document
  .querySelector("[data-list-items]")
  .addEventListener("click", handleBookPreviewClick);
