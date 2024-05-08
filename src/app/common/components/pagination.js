import paginationHtml from "./pagination.html";

const addPaginationUtil = (goToFn, cursor) => {
  const input = document.getElementById("pagination-page-size");
  let sz = 0;

  //   input.addEventListener("change", (e) => {
  //     sz = e.target.value;
  //   });
  const allRowSizes = document.getElementsByClassName("option-page-size");
  const allRowSizesArr = [...allRowSizes];
  allRowSizesArr.map((row) => {
    console.log("ROW", row);
    row.addEventListener("click", (e) => {
      sz = e.target.value;
    });
  });

  const paginationLeft = document.getElementById("pagination-left");
  paginationLeft.addEventListener("click", () => goToFn(cursor, sz, false));
  const paginationRight = document.getElementById("pagination-right");
  paginationRight.addEventListener("click", () => goToFn(cursor, sz, true));
};

export const addPagination = (goToFn, cursor) => {
  console.log("LOADED");
  const pagination = document.getElementsByClassName("pagination")[0];
  console.log("pagination", pagination);
  pagination.innerHTML = paginationHtml;

  addPaginationUtil(goToFn, cursor);
};
