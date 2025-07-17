const questions = [];
const userAnswers = [];
const correctAnswers = [];
let currentQuestion = 0;
let timer;
let timeLeft = 5;

function generateQuestions() {
  for (let i = 0; i < 10; i++) {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    questions.push({ a, b });
    correctAnswers.push(a * b);
  }
}

function startSession() {
  questions.length = 0;
  userAnswers.length = 0;
  correctAnswers.length = 0;
  currentQuestion = 0;
  document.getElementById('game').innerHTML = '';
  generateQuestions();
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    return showResults();
  }

  const q = questions[currentQuestion];
  timeLeft = 5;

  document.getElementById('game').innerHTML = `
    <div id="question">Combien fait ${q.a} × ${q.b} ?</div>
    <div id="timer">Temps restant : ${timeLeft}s</div>
    <input type="number" id="answerInput" autofocus />
  `;

  const input = document.getElementById('answerInput');
  input.focus();

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      submitAnswer();
    }
  });

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `Temps restant : ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitAnswer(); // Auto-submit
    }
  }, 1000);
}

function submitAnswer() {
  clearInterval(timer);
  const input = document.getElementById('answerInput');
  const value = input ? parseInt(input.value) : NaN;
  userAnswers.push(isNaN(value) ? null : value);
  currentQuestion++;
  showQuestion();
}

function showResults() {
  let html = `<h2>Résultats</h2><table><tr><th>Question</th><th>Ta réponse</th><th>Bonne réponse</th></tr>`;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const user = userAnswers[i];
    const correct = correctAnswers[i];
    const isCorrect = user === correct;
    html += `<tr class="${isCorrect ? 'correct' : 'wrong'}">
      <td>${q.a} × ${q.b}</td>
      <td>${user !== null ? user : '(vide)'}</td>
      <td>${correct}</td>
    </tr>`;
  }
  html += `</table><button onclick="startSession()">Recommencer</button>`;
  document.getElementById('game').innerHTML = html;
}