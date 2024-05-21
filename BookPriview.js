import { books, authors } from "./data.js";
//excracted  the part that is responsible for book priview and imported modules

document
  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    const pathArray = Array.from(event.composedPath());
    const activeNode = pathArray.find((node) => node?.dataset?.preview);
    if (activeNode) {
      const active = books.find(
        (book) => book.id === activeNode.dataset.preview
      );
      if (active) {
        document.querySelector("[data-list-active]").open = true;
        document.querySelector("[data-list-blur]").src = active.image;
        document.querySelector("[data-list-image]").src = active.image;
        document.querySelector("[data-list-title]").innerText = active.title;
        document.querySelector("[data-list-subtitle]").innerText = `${
          authors[active.author]
        } (${new Date(active.published).getFullYear()})`;
        document.querySelector("[data-list-description]").innerText =
          active.description;
      }
    }
  });
