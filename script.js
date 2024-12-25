const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const messages = document.getElementById('messages');

// Gérer l'envoi du message
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = userInput.value.trim();

  if (userMessage) {
    // Ajouter le message de l'utilisateur
    addMessage(userMessage, 'user');
    userInput.value = '';

    // Appeler l'API ChatGPT via un backend (exemple avec un placeholder)
    try {
      const botResponse = await getChatbotResponse(userMessage);
      addMessage(botResponse, 'bot');
    } catch (error) {
      addMessage("Erreur de connexion au chatbot.", 'bot');
    }
  }
});

// Ajouter un message au chat
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.textContent = text;
  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
}

// Simuler l'appel API (remplacer avec une vraie requête à votre backend)
async function getChatbotResponse(userMessage) {
  // Remplacez l'URL ci-dessous par l'adresse de votre backend
  const response = await fetch('https://votre-backend-url.com/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage })
  });

  if (!response.ok) {
    throw new Error('Erreur serveur');
  }

  const data = await response.json();
  return data.reply;
}
