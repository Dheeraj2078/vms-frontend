import { successModal } from "../../../../common/components/successModal";
import { postEvent } from "../../../../service/expenditureApi";
import goToExpenditure from "../expenditure";

export function handleCross() {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");

  goToExpenditure();
}

function removeBorder(column) {
  if (column.classList.contains("empty-field-border")) {
    column.classList.remove("empty-field-border");
  }
}

let eventName_ = "";
let eventDate_ = "";
let eventExpenditure_ = "";
let eventDescription_ = "";
let eventMemory_ = "";

let eventName = document.getElementById("event-name");
let eventDate = document.getElementById("event-date");
let eventExpenditure = document.getElementById("event-expenditure");
let eventDescription = document.getElementById("event-description");
let eventMemory = document.getElementById("event-memory");

export function handleDataChange() {
  eventName = document.getElementById("event-name");
  eventDescription = document.getElementById("event-description");
  eventDate = document.getElementById("event-date");
  eventExpenditure = document.getElementById("event-expenditure");
  eventMemory = document.getElementById("event-memory");

  eventName_ = eventName.value;
  eventName.addEventListener("input", (e) => {
    document.getElementById("event-name-error").classList.add("hidden");
    removeBorder(eventName);
    eventName_ = e.target.value;
  });

  eventDate_ = eventDate.value;
  eventDate.addEventListener("input", (e) => {
    document.getElementById("event-date-error").classList.add("hidden");
    removeBorder(eventDate);
    eventDate_ = e.target.value;
  });

  eventExpenditure_ = eventExpenditure.value;
  eventExpenditure.addEventListener("input", (e) => {
    document.getElementById("event-expenditure-error").classList.add("hidden");
    removeBorder(eventExpenditure);
    eventExpenditure_ = e.target.value;
  });

  eventDescription_ = eventDescription.value;
  eventDescription.addEventListener("input", (e) => {
    eventDescription_ = e.target.value;
  });

  eventMemory_ = eventMemory.value;
  eventMemory.addEventListener("input", (e) => {
    eventMemory_ = e.target.value;
  });
}

export async function handleAddEvent() {
  eventName_ = eventName_.trim();
  eventDescription_ = eventDescription_.trim();

  if (!checkFieldValues()) {
    return;
  }

  const posteventData = {
    name: eventName_,
    budget: parseFloat(eventExpenditure_),
    date: eventDate_,
    description: eventDescription_,
    link: eventMemory_,
  };

  try {
    const res = await postEvent(posteventData);
    if (res.error == null) {
      successModal("Event added", handleCross);
    }
  } catch (error) {
    console.log(error);
  }
}

const checkFieldValues = () => {
  let checkResult = true;
  if (isNullOrEmpty(eventName_)) {
    const error_element = document.getElementById("event-name-error");
    showErrorMessage(error_element, "Please enter event name");
    eventName.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(eventExpenditure_)) {
    const error_element = document.getElementById("event-expenditure-error");
    showErrorMessage(error_element, "Please enter event expenditure");
    eventExpenditure.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(eventDate_)) {
    const error_element = document.getElementById("event-date-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter event date");
    eventDate.classList.add("empty-field-border");
    checkResult = false;
  }

  return checkResult;
};

const isNullOrEmpty = (value) => {
  if (
    typeof value === "string" &&
    (value === null || value.trim().length === 0)
  ) {
    return true;
  }
  return value === null;
};

const showErrorMessage = (error_element, text) => {
  if (error_element) {
    error_element.innerHTML = text;
    error_element.classList.remove("hidden");
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleAddEvent();
  }
});
