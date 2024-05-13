export const formDetails = (formHeading, formInfo) => {
  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");

  const formHeader = document.createElement("div");
  formHeader.classList.add("form-header");

  const heading = document.createElement("div");
  heading.innerHTML = formHeading;

  const svg = document.createElement("svg");
  svg.id = "form-cross";
  const use = document.createElement("use");
  use.setAttribute("xlink:href", "/d7382643c7c2c21a765e.svg#cross");

  svg.appendChild(use);

  formHeader.appendChild(heading);
  formHeader.appendChild(svg);

  formContainer.appendChild(formHeader);

  console.log(formInfo);

  const formContent = document.createElement("div");
  const formContentHeader = document.createElement("div");
  formContentHeader.classList.add("form-heading");
  formContent.appendChild(formContentHeader);

  const formContentWrapper = document.createElement("div");
  formContentWrapper.classList.add("form-detail-wrapper");

  for (const property in formInfo) {
    const div = document.createElement("div");
    div.classList.add("form-detail-item");

    const key = document.createElement("div");
    key.innerHTML = property;

    const value = document.createElement("div");
    value.innerHTML = formInfo[property];

    div.appendChild(key);
    div.appendChild(value);

    formContentWrapper.appendChild(div);
  }

  formContent.appendChild(formContentWrapper);
  formContainer.appendChild(formContent);

  const formButton = document.createElement("div");
  formButton.classList.add("form-buttons");
  const button = document.createElement("button");
  button.innerHTML = "Cancel";
  button.classList.add("btn-light");
  button.classList.add("form-cancel");
  formButton.appendChild(button);

  formContainer.appendChild(formButton);

  return formContainer;
};
