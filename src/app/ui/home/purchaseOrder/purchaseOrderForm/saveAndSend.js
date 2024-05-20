export const createWord = () => {
  const boldBtn = document.getElementById("bold-btn");
  const italicBtn = document.getElementById("italic-btn");
  const underlineBtn = document.getElementById("underline-btn");
  const strikethroughBtn = document.getElementById("strikethrough-btn");
  boldBtn.addEventListener("click", (e) => {
    formatText("bold");
  });
  italicBtn.addEventListener("click", (e) => {
    formatText("italic");
  });
  underlineBtn.addEventListener("click", (e) => {
    formatText("underline");
  });
  strikethroughBtn.addEventListener("click", (e) => {
    formatText("strikethrough");
  });

  console.log("RRR");
  function formatText(command) {
    document.execCommand(command, false, null);
    updateActiveButtons();
  }

  function updateActiveButtons() {
    document
      .getElementById("bold-btn")
      .classList.toggle("active", document.queryCommandState("bold"));
    document
      .getElementById("italic-btn")
      .classList.toggle("active", document.queryCommandState("italic"));
    document
      .getElementById("underline-btn")
      .classList.toggle("active", document.queryCommandState("underline"));
    document
      .getElementById("strikethrough-btn")
      .classList.toggle("active", document.queryCommandState("strikethrough"));
  }

  document
    .querySelector(".editor")
    .addEventListener("keyup", updateActiveButtons);
  document
    .querySelector(".editor")
    .addEventListener("mouseup", updateActiveButtons);
};
