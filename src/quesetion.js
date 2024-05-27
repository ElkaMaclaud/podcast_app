export class Question {
  static async create(question) {
    const response = await fetch(
      "https://podcast-f2bba-default-rtdb.asia-southeast1.firebasedatabase.app/questions.json",
      {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const data = await response.json()
      question.id = data.name;
      addToLocalStorage(question);
      Question.renderList();
      return question;
  }

  static async fetch(token) {
    if (!token) {
      return Promise.resolve("<p class='error'>У вас нет токена</p>");
    }
    const response = await fetch(
      `https://podcast-f2bba-default-rtdb.asia-southeast1.firebasedatabase.app/questions.json?auth=${token}`
    )
      const data = await response.json()
        if (data && data.error) {
          return `<p class='error'>${data.error}</p>`;
        }

        return data
          ? Object.keys(data).map((key) => ({ ...data[key], id: key }))
          : [];
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage();

    const html = questions.length
      ? questions.map(toCard).join("")
      : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`;

    const list = document.getElementById("list");
    list.innerHTML = html;
  }

  static listToHTML(questions) {
    return questions.length
      ? `<ol>${questions.map((q) => `<li>${q.text}</li>`).join("")}</ol>`
      : `<p>Вопросов пока нет</p>`;
  }
}

function addToLocalStorage(question) {
  const all = getQuestionsFromLocalStorage();
  all.push(question);
  localStorage.setItem("questions", JSON.stringify(all));
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}

function toCard(question) {
  return `<div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
          </div>
          <div>
            ${question.text}
          </div>
          <br>`;
}
