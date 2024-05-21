import paginationHtml from "./pagination.html";

const addPaginationUtil = (dataSourceFn, renderDataFn, filter) => {
  let paginationDto = {
    cursor: 0,
    previousCursor: 0,
    hasNextPage: true,
    hasPreviousPage: false,
  };
  // let lastEntryCursor = 0;
  let size = 10;
  const input = document.getElementById("pagination-page-size");
  input.addEventListener("change", (e) => {
    size = e.target.value;
    console.log(size);
    const curs = paginationDto.previousCursor + 1;
    // console.log(lastEntryCursor);
    console.log("curs", curs);
    populateTable(curs, size, true, filter);
  });
  //   input.addEventListener("change", (e) => {
  //     sz = e.target.value;
  //   });
  // const allRowSizes = document.getElementsByClassName("option-page-size");
  // const allRowSizesArr = [...allRowSizes];
  // console.log(allRowSizesArr, "**************************************");
  // allRowSizesArr.map((row) => {
  //   // console.log("ROW", row);
  //   row.addEventListener("click", (e) => {
  //     console.log("*****(((", e, ")))*****");
  //     size = e.target.value;
  //     console.log(size);
  //   });
  // });
  // const res = await getAllCategories(cursor, size, next);

  const paginationLeft = document.getElementById("pagination-left");
  paginationLeft.addEventListener("click", () => {
    populateTable(paginationDto.previousCursor, size, false, filter);
  });
  const paginationRight = document.getElementById("pagination-right");
  paginationRight.addEventListener("click", () =>
    populateTable(paginationDto.cursor, size, true, filter)
  );

  showArrows();
  populateTable(0, size, true, filter);

  function showArrows() {
    console.log(paginationDto);
    if (!paginationDto.hasNextPage) {
      paginationRight.classList.add("disabled-arrow");
    } else {
      paginationRight.classList.remove("disabled-arrow");
    }
    if (!paginationDto.hasPreviousPage) {
      paginationLeft.classList.add("disabled-arrow");
    } else {
      paginationLeft.classList.remove("disabled-arrow");
    }
  }

  async function populateTable(cursor, size, next, filter) {
    const response = await dataSourceFn(cursor, size, next, filter);
    console.log("NEW VENDOR 2", response);
    paginationDto = response.data;
    renderDataFn(response.data.pagenationData);
    showArrows();
  }
};

// function(next: bool, size: number)
export const addPagination = (dataSourceFn, renderDataFn, value) => {
  console.log("LOADED");
  const pagination = document.getElementsByClassName("pagination")[0];
  // console.log("pagination", pagination);
  pagination.innerHTML = paginationHtml;

  addPaginationUtil(dataSourceFn, renderDataFn, value);
};
