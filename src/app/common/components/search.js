import searchHtml from "./search.html";

// before add this, make sure there is a html element with class name search-holder. (this tells the location of the search bar)
export const searchModel = (placeholder, onInputFunction) => {
  const searchContainer = document.getElementsByClassName("search-holder")[0];
  searchContainer.innerHTML = searchHtml;
  const crossIcon = document.getElementsByClassName("search-cross-icon")[0];
  crossIcon.classList.add("opacity-0");

  const search = document.getElementById("internal-search");

  search.setAttribute("placeholder", placeholder);

  const handleCrossVisibility = (value) => {
    if (value.length > 0) {
      crossIcon.classList.remove("opacity-0");
    } else {
      crossIcon.classList.add("opacity-0");
    }
  };

  crossIcon.addEventListener("click", () => {
    search.value = "";
    handleCrossVisibility(search.value);
    onInputFunction(search.value);
  });
  let timeoutId;
  search.addEventListener("input", (e) => {
    const value = e.target.value;
    handleCrossVisibility(value);
    // onInputFunction(value);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      onInputFunction(value);
    }, 500);
  });
};
