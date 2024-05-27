import { Question } from "./quesetion";
import { createModal, isValid } from "./utils";
import "./styles.css";
import { authWithEmailAndPassword, getAuthForm } from "./auth";
// document.addEventListener("DOMContentLoaded", () => { - ЗДЕСЬ НЕ НУЖЕН!!!!!!!!!!!!!!!!
const form = document.getElementById("form");
const modalBtn = document.getElementById("modal-btn");
const input = form.querySelector("#question-input");
const button = form.querySelector("#button");

window.addEventListener("load", Question.renderList);
form.addEventListener("submit", submitFormHandler);
modalBtn.addEventListener("click", openModal);
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
    // Question.create(question).then(() => {
    //   input.value = "";
    //   input.className = "";
    //   button.disabled = false;
    // });
    try {
      // Async request to server to save question
      Question.create(question);
    } catch (error) {
      console.error("An error occurred while saving the question:", error);
    } finally {
      input.value = "";
      input.className = "";
      button.disabled = false;
    }
    // console.log("Question", question);
  }
  //   console.log(input.value);
}

function openModal() {
  createModal("Авторизация", getAuthForm());
  document
    .getElementById("auth-form")
    .addEventListener("submit", authFormHandler, { once: true });
}

function authFormHandler(event) {
  event.preventDefault();

  const btn = event.target.querySelector("button");
  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;

  btn.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false));
}

function renderModalAfterAuth(content) {
  if (typeof content === "string") {
    createModal("Ошибка!", content)
  } else {
    createModal("Список вопросов!", Question.listToHTML(content));
  }
}
