import { books, BOOKS_PER_PAGE } from "./data.js";
import { createBookPreviewElement } from "./scripts.js";
let matches = books;
let page = 1;
//funtion to filter books when searching...
function filterBooks({ title, author, genre }) {
  return books.filter((book) => {
    const genreMatch = genre === "any" || book.genres.includes(genre);
    return (
      (title.trim() === "" ||
        book.title.toLowerCase().includes(title.toLowerCase())) &&
      (author === "any" || book.author === author) &&
      genreMatch
    );
  });
}

const searchBook = () => {
  document
    .querySelector("[data-search-form]")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const filters = Object.fromEntries(formData);
      matches = filterBooks(filters);
      page = 1;
      // updateShowMoreButton();
      const newItems = document.createDocumentFragment();
      matches
        .slice(0, BOOKS_PER_PAGE)
        .map(createBookPreviewElement)
        .forEach((element) => newItems.appendChild(element));
      const listItems = document.querySelector("[data-list-items]");
      listItems.innerHTML = "";
      listItems.appendChild(newItems);
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.querySelector("[data-search-overlay]").open = false;
    });
};
window.onload = searchBook();
