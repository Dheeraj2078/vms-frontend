export const noDataAdded = (main, addBtn) => {
  const image = "/dist/8dfc083c3d9a4638843c5c81b8333d04.png"; // TEMP
  const div = document.createElement("div");
  div.classList.add("notFoundWrapper");

  const notFoundImage = document.createElement("div");
  notFoundImage.innerHTML = `<img src=${image} />`;

  const notFoundText = document.createElement("div");
  notFoundText.innerHTML = `No ${main} has been added yet`;
  notFoundText.classList.add("no-text");

  div.appendChild(notFoundImage);
  div.appendChild(notFoundText);
  div.appendChild(addBtn);

  const mainDiv = document.createElement("div");
  const firstDiv = document.createElement("div");

  firstDiv.innerHTML = main;
  firstDiv.classList.add("top-heading");

  mainDiv.classList.add("container");
  mainDiv.appendChild(firstDiv);
  mainDiv.appendChild(div);

  return mainDiv;
};
