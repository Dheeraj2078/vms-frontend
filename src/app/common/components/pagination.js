import paginationHtml from "./pagination.html";

const addPaginationUtil = (dataSourceFn, renderDataFn, noFound, filter) => {
  let paginationDto = {
    cursor: 0,
    previousCursor: 0,
    hasNextPage: true,
    hasPreviousPage: false,
  };
  let size = 10;
  const input = document.getElementById("pagination-page-size");
  input.addEventListener("change", (e) => {
    size = e.target.value;
    console.log(size);
    const curs = paginationDto.previousCursor + 1;
    console.log("curs", curs);
    populateTable(curs, size, true, filter);
  });

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
    console.log("has next page???", paginationDto.hasNextPage);
    if (!paginationDto.hasNextPage) {
      paginationRight.classList.add("disabled-arrow");
    } else {
      paginationRight.classList.remove("disabled-arrow");
    }
    console.log("has previous page??", paginationDto.hasPreviousPage);
    if (!paginationDto.hasPreviousPage) {
      paginationLeft.classList.add("disabled-arrow");
    } else {
      paginationLeft.classList.remove("disabled-arrow");
    }
  }

  const loader = document.getElementById("loader");
  const content = document.getElementsByClassName("table-container")[0];

  loader.classList.remove("hidden");
  content.style.display = "none";

  async function populateTable(cursor, size, next, filter) {
    const response = await dataSourceFn(cursor, size, next, filter);
    console.log("NEW VENDOR 2", response);

    loader.classList.add("hidden");
    content.style.display = "block";

    paginationDto = response.data;

    if (paginationDto.pagenationData.length > 0) {
      renderDataFn(response.data.pagenationData);
    } else {
      const tableContainer =
        document.getElementsByClassName("table-container")[0];
      tableContainer.innerHTML = noFound;
    }
    showArrows();
  }
};

export const addPagination = (dataSourceFn, renderDataFn, noFound, value) => {
  console.log("LOADED");
  const pagination = document.getElementsByClassName("pagination")[0];
  pagination.innerHTML = paginationHtml;

  addPaginationUtil(dataSourceFn, renderDataFn, noFound, value);
};
