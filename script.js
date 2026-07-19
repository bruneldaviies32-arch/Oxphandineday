const TARGET_WORD = "OXPHANDINE";
const TARGET_CODE = "323266";
let currentInput = "";
let currentCodeInput = "";

// Le texte complet et structuré phrase par phrase
const phrases = [
  "Aujourd'hui est un jour béni.",
  "C'est le jour de ta naissance.",
  "C'est ma date préférée sur le calendrier.",
  "C’est le moment idéal pour faire une pause.",
  "C’est l’instant parfait pour célébrer la vie.",
  "Et surtout, pour célébrer ta vie.",
  "Je veux te dire à quel point tu es unique.",
  "Tu possèdes une lumière bien à toi.",
  "Ton entrée dans une pièce change l’ambiance.",
  "Ton sourire a le pouvoir d'effacer mes pires journées.",
  "Ton rire est ma mélodie favorite.",
  "Il résonne en moi comme un bonheur pur.",
  "Avec toi, tout devient plus simple.",
  "Les moments ordinaires deviennent magiques.",
  "Les dimanches pluvieux deviennent chaleureux.",
  "Tu transformes mon quotidien en un voyage merveilleux.",
  "Je regarde le chemin parcouru à tes côtés.",
  "Chaque jour est une chance.",
  "Chaque regard échangé est un cadeau.",
  "Tu m'apportes un équilibre parfait.",
  "Tu es ma force quand je doute.",
  "Tu es ma douceur quand le monde est trop dur.",
  "Ta bienveillance m’impressionne chaque jour.",
  "Ta générosité envers les autres est sans limite.",
  "Tu as un cœur d’or.",
  "Un cœur pur et vibrant.",
  "Je suis tellement fier de partager ta vie.",
  "Je suis tellement chanceux d'être celui qui t'accompagne.",
  "Pour cette nouvelle année, je te souhaite le meilleur.",
  "Je te souhaite une pluie de petits bonheurs.",
  "Des bonheurs simples mais profonds.",
  "Une bonne tasse de café le matin.",
  "Des éclats de rire avec tes proches.",
  "Des moments de paix totale.",
  "Je te souhaite aussi de grandes victoires.",
  "Que tes projets professionnels se concrétisent.",
  "Que tes passions s'épanouissent encore plus.",
  "Ne doute jamais de tes capacités.",
  "Tu es capable de décrocher la lune.",
  "Tu as une force incroyable en toi.",
  "Suis tes rêves sans hésiter.",
  "Je serai toujours juste derrière toi pour te soutenir.",
  "Je serai ton premier supporter, comme toujours.",
  "Imaginons maintenant notre avenir.",
  "Il est rempli de promesses.",
  "J'ai hâte de continuer ce voyage avec toi.",
  "Hâte de découvrir de nouveaux endroits à tes côtés.",
  "Hâte de partager des milliers d'autres repas.",
  "De discuter pendant des heures au milieu de la nuit.",
  "De refaire le monde sous les étoiles.",
  "Nous avons encore tant de souvenirs à construire.",
  "Tant d'histoires à écrire ensemble.",
  "Notre complicité est notre plus beau trésor.",
  "Prenons-en soin chaque jour.",
  "Aujourd'hui, c'est ta journée exclusive.",
  "Oublie toutes les petites contrariétés.",
  "Laisse de côté le stress et le travail.",
  "Pense uniquement à toi.",
  "Laisse-toi chouchouter par tout le monde.",
  "Laisse-toi submerger par les marques d'affection.",
  "Tu mérites toute l'attention de la Terre.",
  "Nous allons fêter cela dignement.",
  "Nous allons lever nos verres à ta santé.",
  "Nous allons rire, manger et chanter.",
  "Que cette journée soit douce et festive.",
  "Qu'elle soit entourée des gens que tu aimes.",
  "Merci d'exister, tout simplement.",
  "Merci d'être cette femme extraordinaire.",
  "Merci pour ton amour inconditionnel.",
  "Merci pour ta patience et ton soutien.",
  "Tu es mon repère, ma maison, mon amour.",
  "Je t'aime infiniment.",
  "Plus hier, mais bien moins que demain.",
  "Merveilleux et joyeux anniversaire, ma chérie."
];

const hangmanInterface = document.getElementById('hangman-interface');
const dashContainer = document.getElementById('dash-container');
const btnDelete = document.getElementById('btn-delete');
const keyboardContainer = document.getElementById('virtual-keyboard');

const verificationInterface = document.getElementById('verification-interface');
const typingTextEl = document.getElementById('typing-text');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const errorAlert = document.getElementById('error-alert');

const iphoneInterface = document.getElementById('iphone-interface');
const dots = document.querySelectorAll('.dot');

const bravoText = document.getElementById('bravo-text');
const btnAdventure = document.getElementById('btn-adventure');
const mainContainer = document.getElementById('main-container');
const finalScreen = document.getElementById('final-screen');
const storyText = document.getElementById('story-text');
const bgMusic = document.getElementById('adventure-music');

// --- LOGIQUE PENDU ---
for (let i = 0; i < TARGET_WORD.length; i++) {
  const slot = document.createElement('div');
  slot.classList.add('letter-slot');
  if (i === 0) slot.classList.add('active-slot');
  dashContainer.appendChild(slot);
}

const requiredLetters = Array.from(new Set(TARGET_WORD));
const alphabet = "BCFGJKLMQRSTUVWYZ";
let pool = [...requiredLetters];
while(pool.length < 15) {
  let randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  if(!pool.includes(randomLetter)) pool.push(randomLetter);
}
pool.sort(() => Math.random() - 0.5);

pool.forEach(letter => {
  const key = document.createElement('div');
  key.classList.add('key');
  key.textContent = letter;
  key.addEventListener('click', () => handleKeyPress(letter));
  keyboardContainer.appendChild(key);
});

function updateSlots() {
  const slots = document.querySelectorAll('.letter-slot');
  slots.forEach((slot, index) => {
    slot.textContent = currentInput[index] || "";
    slot.classList.remove('active-slot');
    if (index === currentInput.length) slot.classList.add('active-slot');
  });
}

function handleKeyPress(letter) {
  if (currentInput.length < TARGET_WORD.length) {
    currentInput += letter;
    updateSlots();
    if (currentInput === TARGET_WORD) {
      hangmanInterface.classList.add('hidden');
      startVerificationStage();
    }
  }
}

btnDelete.addEventListener('click', () => {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateSlots();
  }
});

function startVerificationStage() {
  verificationInterface.style.display = 'flex';
  const sentence = "Laissez-moi le temps de confirmer que vous êtes vraiment Houéfa";
  let charIndex = 0;

  function type() {
    if (charIndex < sentence.length) {
      typingTextEl.textContent += sentence.charAt(charIndex);
      charIndex++;
      setTimeout(type, 70);
    } else {
      startGaugeProgress();
    }
  }
  type();
}

function startGaugeProgress() {
  let progress = 0;
  function advance() {
    if (progress < 97) {
      progress += Math.floor(Math.random() * 3) + 1;
      if(progress > 97) progress = 97;
      progressFill.style.width = progress + '%';
      progressText.textContent = progress + '%';
      setTimeout(advance, Math.floor(Math.random() * 120) + 40);
    } else {
      errorAlert.style.display = 'block';
      setTimeout(() => { iphoneInterface.style.display = 'flex'; }, 800);
    }
  }
  advance();
}

window.pressNum = function(num) {
  if (currentCodeInput.length < 6) {
    currentCodeInput += num;
    dots[currentCodeInput.length - 1].classList.add('filled');
    if (currentCodeInput.length === 6) {
      if (currentCodeInput === TARGET_CODE) {
        verificationInterface.classList.add('hidden');
        iphoneInterface.classList.add('hidden');
        bravoText.style.display = 'block';
        setTimeout(() => { btnAdventure.style.display = 'block'; }, 5000);
      } else {
        setTimeout(() => {
          currentCodeInput = "";
          dots.forEach(d => d.classList.remove('filled'));
        }, 300);
      }
    }
  }
};

// --- DÉFILEMENT AUTOMATIQUE DU TEXTE DE L'AVENTURE ---
let phraseIndex = 0;

function displayNextPhrase() {
  if (phraseIndex < phrases.length) {
    storyText.style.opacity = 0;
    
    setTimeout(() => {
      storyText.textContent = phrases[phraseIndex];
      storyText.style.opacity = 1;
      phraseIndex++;
      
      // Les phrases restent visibles 3.5 secondes avant de s'estomper
      setTimeout(displayNextPhrase, 3500);
    }, 1000); 
  }
}

btnAdventure.addEventListener('click', () => {
  mainContainer.style.display = 'none';
  finalScreen.style.display = 'block';

  bgMusic.play().catch(() => {
    document.addEventListener('click', () => { bgMusic.play(); }, { once: true });
  });

  setTimeout(displayNextPhrase, 1000);
});

