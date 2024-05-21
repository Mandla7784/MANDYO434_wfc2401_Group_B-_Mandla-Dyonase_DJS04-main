import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

let page = 1;
let matches = books;

export function createBookPreviewElement({ author, id, image, title }) {
  const element = document.createElement("button");
  element.classList.add("preview");
  element.setAttribute("data-preview", id);
  element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;
  return element;
}

function createSelectOptions(options, defaultOption, targetElement) {
  const fragment = document.createDocumentFragment();
  const defaultElement = document.createElement("option");
  defaultElement.value = "any";
  defaultElement.innerText = defaultOption;
  fragment.appendChild(defaultElement);

  for (const [id, name] of Object.entries(options)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    fragment.appendChild(element);
  }

  targetElement.appendChild(fragment);
}

function applyTheme(theme) {
  const darkColor = theme === "night" ? "255, 255, 255" : "10, 10, 20";
  const lightColor = theme === "night" ? "10, 10, 20" : "255, 255, 255";
  document.documentElement.style.setProperty("--color-dark", darkColor);
  document.documentElement.style.setProperty("--color-light", lightColor);
}

function initializeBookList() {
  const startingFragment = document.createDocumentFragment();
  matches
    .slice(0, BOOKS_PER_PAGE)
    .map(createBookPreviewElement)
    .forEach((element) => startingFragment.appendChild(element));
  document.querySelector("[data-list-items]").appendChild(startingFragment);
}

function initializeSelectOptions() {
  createSelectOptions(
    genres,
    "All Genres",
    document.querySelector("[data-search-genres]")
  );
  createSelectOptions(
    authors,
    "All Authors",
    document.querySelector("[data-search-authors]")
  );
}

function initializeTheme() {
  const preferredTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "night"
      : "day";
  document.querySelector("[data-settings-theme]").value = preferredTheme;
  applyTheme(preferredTheme);
}

function updateShowMoreButton() {
  const remaining = Math.max(matches.length - page * BOOKS_PER_PAGE, 0);
  const showMoreButton = document.querySelector("[data-list-button]");
  showMoreButton.disabled = remaining < 1;
  showMoreButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining})</span>
  `;
}

function setupEventListeners() {
  document
    .querySelector("[data-search-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-search-overlay]").open = false;
    });

  document
    .querySelector("[data-settings-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-settings-overlay]").open = false;
    });

  document
    .querySelector("[data-header-search]")
    .addEventListener("click", () => {
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
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const { theme } = Object.fromEntries(formData);
      applyTheme(theme);
      document.querySelector("[data-settings-overlay]").open = false;
    });

  document.querySelector("[data-list-button]").addEventListener("click", () => {
    const fragment = document.createDocumentFragment();
    matches
      .slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)
      .map(createBookPreviewElement)
      .forEach((element) => fragment.appendChild(element));
    document.querySelector("[data-list-items]").appendChild(fragment);
    page += 1;
    updateShowMoreButton();
  });
}

function init() {
  initializeBookList();
  initializeSelectOptions();
  initializeTheme();
  updateShowMoreButton();
  setupEventListeners();
}

init();
