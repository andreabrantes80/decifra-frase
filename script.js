// Banco de frases por nível
const frases = [
  "bom dia",
  "como voce esta",
  "vamos tomar um cafe",
  "preciso ir ao supermercado",
  "hoje esta muito quente",
  "vou assistir um filme a noite",
  "amanha tenho uma reuniao importante",
  "gosto de caminhar no parque",
  "preciso ligar para minha mae",
  "vamos pedir uma pizza para jantar",
  "o cachorro esta dormindo no sofa",
  "tenho que pagar as contas hoje",
  "vamos marcar um encontro no shopping",
  "adoro ouvir musica enquanto trabalho",
  "preciso comprar um presente de aniversario"
];

let nivel = 0;
let substituicao = {};
let mapaUsuario = {};
let mensagemOriginal = "";
let mensagemCriptografada = "";

// Função para gerar criptografia
function gerarCriptografia() {
  const letras = "abcdefghijklmnopqrstuvwxyz".split("");
  const embaralhadas = [...letras].sort(() => Math.random() - 0.5);
  substituicao = {};
  letras.forEach((c, i) => (substituicao[c] = embaralhadas[i]));
}

// Criptografar mensagem
function criptografarMensagem(mensagem) {
  return mensagem
    .split("")
    .map((c) => {
      if (/[a-z]/.test(c)) {
        return substituicao[c];
      } else {
        return c;
      }
    })
    .join("");
}

// Decifrar mensagem
function decifrarMensagem() {
  return mensagemCriptografada
    .split("")
    .map((c) => {
      if (/[a-z]/.test(c)) {
        return mapaUsuario[c] || "*";
      } else {
        return c;
      }
    })
    .join("");
}

// Iniciar nível
function iniciarNivel() {
  mapaUsuario = {};
  mensagemOriginal = frases[nivel];
  gerarCriptografia();
  mensagemCriptografada = criptografarMensagem(mensagemOriginal);

  document.getElementById("nivel").textContent = nivel + 1;
  document.getElementById("criptografada").textContent = mensagemCriptografada;
  document.getElementById("decifrada").textContent = decifrarMensagem();
  document.getElementById("mensagem").textContent = "";
}

// Jogador tenta decifrar
function tentarDecifrar() {
  const letraCripto = document
    .getElementById("letraCripto")
    .value.toLowerCase();
  const letraOriginal = document
    .getElementById("letraOriginal")
    .value.toLowerCase();

  if (substituicao[letraOriginal] === letraCripto) {
    mapaUsuario[letraCripto] = letraOriginal;
    document.getElementById("mensagem").textContent = "✅ Boa! Você acertou!";
  } else {
    document.getElementById("mensagem").textContent = "❌ Palpite errado!";
  }

  document.getElementById("decifrada").textContent = decifrarMensagem();

  if (!document.getElementById("decifrada").textContent.includes("*")) {
    document.getElementById("mensagem").textContent =
      "🎉 Parabéns! Você decifrou!";
    nivel++;
    if (nivel < frases.length) {
      setTimeout(iniciarNivel, 2000);
    } else {
      document.getElementById("mensagem").textContent =
        "🏆 Você venceu todos os níveis!";
    }
  }
}

// Exibe modal ao iniciar
window.onload = function () {
  const modal = document.getElementById("tutorial-modal");
  const fecharBtn = document.getElementById("fecharTutorial");

  modal.style.display = "flex"; // mostra modal

  fecharBtn.onclick = function () {
    modal.style.display = "none"; // fecha modal
    iniciarNivel(); // inicia o jogo
  };
};

// Inicia o jogo

iniciarNivel();
