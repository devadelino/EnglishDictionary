const searchButton = document.getElementById('searchButton');
const wordInput = document.getElementById('wordInput');
const resultDiv = document.getElementById('result');

// Função para buscar informações da palavra
const fetchWordData = async (word) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error("Palavra não encontrada");
    }

    const data = await response.json();
    displayWordData(data[0]);
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
};

// Função para exibir informações da palavra
const displayWordData = (data) => {
  const { word, phonetics, meanings } = data;

  const phoneticText = phonetics[0]?.text || "N/A";
  const audioUrl = phonetics[0]?.audio || "";

  let meaningsHtml = "";
  meanings.forEach((meaning) => {
    meaningsHtml += `
      <div class="definition">
        <h3>${meaning.partOfSpeech}</h3>
        <p><strong>Definição:</strong> ${meaning.definitions[0]?.definition || "N/A"}</p>
        <p><strong>Exemplo:</strong> ${meaning.definitions[0]?.example || "N/A"}</p>
        <p><strong>Sinônimos:</strong> ${meaning.synonyms.join(", ") || "N/A"}</p>
      </div>
    `;
  });

  resultDiv.innerHTML = `
    <h2>${word}</h2>
    <p><strong>Pronúncia:</strong> ${phoneticText} ${
      audioUrl ? `<button onclick="playAudio('${audioUrl}')">Ouvir</button>` : ""
    }</p>
    ${meaningsHtml}
  `;
};

// Função para tocar o áudio da pronúncia
const playAudio = (url) => {
  const audio = new Audio(url);
  audio.play();
};

// Evento de clique no botão de busca
searchButton.addEventListener('click', () => {
  const word = wordInput.value.trim();
  if (word) {
    fetchWordData(word);
  }
});