import { successModal } from "../../../../common/components/successModal";
import { postevent } from "../../../../service/eventApi";
import goToExpenditure from "../expenditure";

export function handleCross() {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");

  goToExpenditure();
}

function removeBorder(column, error) {
  if (!error.classList.contains("hidden")) {
    error.classList.add("hidden");
  }
  if (column.classList.contains("empty-field-border")) {
    column.classList.remove("empty-field-border");
  }
}

let eventName_ = "";
let eventDate_ = "";
let eventExpenditure_ = "";
let eventDescription_ = "";

let eventNameError = document.getElementsByClassName("event-name-error")[0];
let eventDescError = document.getElementsByClassName(
  "event-description-error"
)[0];

let eventName = document.getElementById("event-name");
let eventDate = document.getElementById("event-date");
let eventExpenditure = document.getElementById("event-expenditure");
let eventDescription = document.getElementById("event-description");

export function handleDataChange() {
  eventName = document.getElementById("event-name");
  eventDescription = document.getElementById("event-description");
  eventNameError = document.getElementsByClassName("event-name-error")[0];
  eventDescError = document.getElementsByClassName(
    "event-description-error"
  )[0];

  eventName_ = eventName.value;
  eventName.addEventListener("input", (e) => {
    removeBorder(eventName, eventNameError);
    eventName_ = e.target.value;
    const alreadyExists = document.getElementsByClassName("already-exists")[0];
    if (!alreadyExists.classList.contains("hidden")) {
      alreadyExists.classList.add("hidden");
    }
  });

  eventDate_ = eventDate.value;
  eventDate.addEventListener("input", (e) => {
    removeBorder(eventDescription, eventDescError);
    eventDescription_ = e.target.value;
  });

  eventExpenditure_ = eventExpenditure.value;
  eventExpenditure.addEventListener("input", (e) => {
    removeBorder(eventDescription, eventDescError);
    eventExpenditure_ = e.target.value;
  });

  eventDescription_ = eventDescription.value;
  eventDescription.addEventListener("input", (e) => {
    removeBorder(eventDescription, eventDescError);
    eventDescription_ = e.target.value;
  });
}

export async function handleAddevent() {
  let eventNameError = document.getElementsByClassName("event-name-error")[0];
  let eventDescError = document.getElementsByClassName(
    "event-description-error"
  )[0];
  eventName_ = eventName_.trim();
  eventDescription_ = eventDescription_.trim();

  let allValuesProvided = true;
  if (eventName_ == "") {
    allValuesProvided = false;
    eventName.classList.add("empty-field-border");
    eventNameError.classList.remove("hidden");
  }

  if (eventDate_ == "") {
    allValuesProvided = false;
    eventDate.classList.add("empty-field-border");
    eventNameError.classList.remove("hidden");
  }

  if (eventExpenditure_ == "") {
    allValuesProvided = false;
    eventName.classList.add("empty-field-border");
    eventNameError.classList.remove("hidden");
  }
  if (eventDescription_ == "") {
    allValuesProvided = false;
    eventDescription.classList.add("empty-field-border");
    eventDescError.classList.remove("hidden");
  }

  if (allValuesProvided == false) {
    return;
  }

  const posteventData = {
    name: eventName_,
    description: eventDescription_,
  };

  try {
    // const res = await postevent(posteventData);
    // console.log("create event", res);
    // eventName_ = "";
    // eventDescription_ = "";
    // if (res.error == null) {
    //   successModal("event added", handleCross);
    // }
  } catch (error) {
    console.log(error);
    const alreadyExists = document.getElementsByClassName("already-exists")[0];
    alreadyExists.classList.remove("hidden");
  }

  console.log(posteventData);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleAddevent();
  }
});
