console.log("Chatbot chargé !");

class ChatHistory { 
    constructor() { 
        this.messages = [];
     } addMessage(message, sender) { 
        this.messages.push({ message, sender }); 
    } getHistory() { 
        return this.messages; 
    } 
} 
let historyMessages = new ChatHistory();

function saveMessages() {
        console.log('Saving chat history...');
        console.log(historyMessages.getHistory());
        sessionStorage.setItem('chatHistory', 
        JSON.stringify(historyMessages.getHistory().map(msg => msg.message))
    );
}
window.addEventListener('beforeunload', saveMessages);

function loadMessages() {
        const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
        if (chatHistory && chatHistory.length > 0) {
            showMessage("Bienvenue vous êtes de retour ! Voici votre historique de chat :", "bot", true);
                chatHistory.forEach(message => {
                        showMessage(message, "bot", true);
                        historyMessages.addMessage(message, "bot");
                });
        }
}
window.addEventListener('load', loadMessages);

function fetchJSON(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Object.keys(data).length === 0 && data.constructor === Object) {
                throw new Error('Empty JSON or malformed JSON');
            }

                console.log(data);
                sendMessage(data.intents);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            }) ;
}

function sendMessage(intents) {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    showMessage(userInput, "user");
    let botReponse = processMessage(intents, userInput);
    showMessage(botReponse, "bot");
    document.getElementById("user-input").value = "";
}

function showMessage(message, type, restored = false) {
    let chatBox = document.getElementById("chat-box");

    let container = document.createElement("div"); 
    container.classList.add("msg-container");

    if (restored) { 
        container.classList.add("restored"); 
    }

    let msg = document.createElement("p");
    msg.textContent = message;

    if (type === "user") {
        msg.classList.add("user-msg");
    } else {
        msg.classList.add("bot-msg");
    }
    
    let time = document.createElement("span");
    time.classList.add("timestamp");

    let now = new Date();
    time.textContent = now.toLocaleString("fr-FR");
        
    container.appendChild(msg);
    container.appendChild(time);

    chatBox.appendChild(container);
    chatBox.scrollTop = chatBox.scrollHeight;

    historyMessages.addMessage(message, type);
}

    
function processMessage(intents, message) {
    let response = "Je suis désolé, je ne suis pas sûr de comprendre.";
    intents.forEach(intent => {
        intent.patterns.forEach(pattern => {
            if (message.toLowerCase().includes(pattern.toLowerCase())) {
            response = intent.responses[
                Math.floor(Math.random() * intent.responses.length)
            ];
        }
        });
    });

    return response;
}




