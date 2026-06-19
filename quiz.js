const questions = [
  {
    question: "Planet terbesar dalam tata surya adalah?",
    answers: ["Saturnus", "Jupiter", "Mars", "Venus", "Bumi"],
    correct: 1,
    explanation:
      "Jupiter adalah planet terbesar dalam tata surya dengan diameter sekitar 139.820 km. Planet ini merupakan raksasa gas dan memiliki badai besar yang dikenal sebagai Great Red Spot.",
  },

  {
    question: "Planet yang memiliki cincin paling terkenal adalah?",
    answers: ["Neptunus", "Bumi", "Saturnus", "Merkurius", "Mars"],
    correct: 2,
    explanation:
      "Saturnus terkenal karena sistem cincinnya yang sangat besar dan indah. Cincin tersebut tersusun dari es, debu, dan pecahan batuan yang mengorbit planet.",
  },

  {
    question: "Planet terdekat dari Matahari adalah?",
    answers: ["Venus", "Mars", "Merkurius", "Jupiter", "Bumi"],
    correct: 2,
    explanation:
      "Merkurius adalah planet terdekat dari Matahari dengan jarak rata-rata sekitar 57,9 juta kilometer. Planet ini juga merupakan planet terkecil dalam tata surya.",
  },

  {
    question: "Planet yang dikenal sebagai Planet Merah adalah?",
    answers: ["Venus", "Mars", "Saturnus", "Uranus", "Neptunus"],
    correct: 1,
    explanation:
      "Mars dijuluki Planet Merah karena permukaannya mengandung banyak oksida besi (karat) yang memberikan warna kemerahan.",
  },

  {
    question: "Pusat tata surya adalah?",
    answers: ["Jupiter", "Matahari", "Bumi", "Saturnus", "Mars"],
    correct: 1,
    explanation:
      "Matahari merupakan pusat tata surya. Semua planet, asteroid, komet, dan benda langit lainnya mengorbit Matahari karena gaya gravitasinya yang sangat besar.",
  },

  {
    question: "Planet yang memiliki kehidupan adalah?",
    answers: ["Mars", "Venus", "Bumi", "Neptunus", "Jupiter"],
    correct: 2,
    explanation:
      "Bumi adalah satu-satunya planet yang diketahui memiliki kehidupan karena memiliki air dalam bentuk cair, atmosfer yang mendukung, dan suhu yang sesuai untuk makhluk hidup.",
  },

  {
    question: "Planet terjauh dari Matahari adalah?",
    answers: ["Neptunus", "Saturnus", "Uranus", "Mars", "Jupiter"],
    correct: 0,
    explanation:
      "Neptunus adalah planet kedelapan dan terjauh dari Matahari dengan jarak sekitar 4,5 miliar kilometer dari pusat tata surya.",
  },

  {
    question: "Planet dengan angin tercepat adalah?",
    answers: ["Jupiter", "Neptunus", "Bumi", "Merkurius", "Venus"],
    correct: 1,
    explanation:
      "Neptunus memiliki angin tercepat di tata surya yang dapat mencapai lebih dari 2.000 km/jam, jauh lebih cepat dibandingkan badai di Bumi.",
  },

  {
    question: "Planet yang berputar miring sekitar 98° adalah?",
    answers: ["Uranus", "Mars", "Venus", "Jupiter", "Saturnus"],
    correct: 0,
    explanation:
      "Uranus memiliki kemiringan sumbu rotasi sekitar 98 derajat sehingga tampak berputar menyamping dibandingkan planet-planet lainnya.",
  },

  {
    question: "Matahari termasuk jenis?",
    answers: ["Planet", "Satelit", "Bintang", "Asteroid", "Komet"],
    correct: 2,
    explanation:
      "Matahari adalah sebuah bintang yang menghasilkan cahaya dan energi melalui reaksi fusi nuklir di intinya. Matahari merupakan sumber energi utama bagi kehidupan di Bumi.",
  },
];

let current = 0;
let score = 0;
let lives = 3;

const questionEl = document.getElementById("question");

const answersEl = document.getElementById("answers");

const scoreEl = document.getElementById("score");

const livesEl = document.getElementById("lives");

const rocket = document.getElementById("rocket");

const resultEl = document.getElementById("result");

const progressBar = document.getElementById("progressBar");

function updateUI() {
  scoreEl.innerHTML = `⭐ ${score}`;

  livesEl.innerHTML = "❤️".repeat(lives);

  progressBar.style.width = `${(current / questions.length) * 100}%`;
}

function loadQuestion() {
  if (current >= questions.length) {
    finishGame();
    return;
  }

  const q = questions[current];

  questionEl.innerHTML = q.question;

  answersEl.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");

    btn.className = "answer-btn";

    btn.innerHTML = answer;

    btn.onclick = () => selectAnswer(index, btn);

    answersEl.appendChild(btn);
  });

  updateUI();
}

function selectAnswer(index, btn) {
  const correct = questions[current].correct;

  const feedback = document.getElementById("feedback");

  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((b) => (b.disabled = true));

  if (index === correct) {
    btn.classList.add("correct");

    score += 10;

    rocket.style.transform = "translateY(-40px)";

    feedback.style.display = "block";

    feedback.className = "feedback-correct";

    feedback.innerHTML = `
            ✅ Jawaban Benar!
            <br><br>
            ${questions[current].explanation}
        `;
  } else {
    btn.classList.add("wrong");

    buttons[correct].classList.add("correct");

    lives--;

    feedback.style.display = "block";
    setTimeout(() => {
      feedback.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);

    feedback.className = "feedback-wrong";

    feedback.innerHTML = `
            ❌ Jawaban Salah
            <br><br>

            Jawaban yang benar:
            <b>
            ${questions[current].answers[correct]}
            </b>

            <br><br>

            ${questions[current].explanation}
        `;

    rocket.classList.add("shake");

    setTimeout(() => {
      rocket.classList.remove("shake");
    }, 400);
  }

  updateUI();

  setTimeout(() => {
    feedback.style.display = "none";

    rocket.style.transform = "translateY(0)";

    current++;

    if (lives <= 0) {
      gameOver();
    } else {
      loadQuestion();
    }
  }, 4000);
}

function gameOver() {
  questionEl.innerHTML = "💥 MISI GAGAL";

  answersEl.innerHTML = "";

  resultEl.innerHTML = `
    <h2>
    Skor Akhir :
    ${score}
    </h2>

    <button onclick="location.reload()">
    🔄 Coba Lagi
    </button>
    `;
}

function finishGame() {
  questionEl.innerHTML = "🏆 MISI SELESAI";

  answersEl.innerHTML = "";

  let badge = "";

  if (score >= 90) {
    badge = "👨‍🚀 Astronot Hebat";
  } else if (score >= 70) {
    badge = "🛰️ Penjelajah Tata Surya";
  } else {
    badge = "🌎 Cadet Luar Angkasa";
  }

  resultEl.innerHTML = `
    <h2>${badge}</h2>

    <h3>Skor : ${score}</h3>

    <button class="play-again-btn"onclick="location.reload()">
        🚀 Main Lagi
    </button>
    `;
}

loadQuestion();
