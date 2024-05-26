import { isValid } from "./utils";
import "./styles.css";
// document.addEventListener("DOMContentLoaded", () => { - ЗДЕСЬ НЕ НУЖЕН!!!!!!!!!!!!!!!!
const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const button = form.querySelector("#button");

form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", () => {
  button.disabled = !isValid(input.value);
});

function submitFormHandler(event) {
  event.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    button.disabled = true;
    // Async request to server to save question
    console.log("Question", question);

    input.value = "";
    input.className = "";
    button.disabled = false;
  }
  console.log(input.value);
}
