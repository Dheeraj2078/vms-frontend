export const createTableHeader = (tableFieldsArr) => {
  const table = document.createElement("table");
  table.setAttribute("cellpadding", "0");
  table.setAttribute("cellspacing", "0");

  const header = document.createElement("tr");

  tableFieldsArr.map((field) => {
    let div = document.createElement("th");
    div.innerHTML = field;
    header.appendChild(div);
  });

  table.appendChild(header);

  return table;
};
