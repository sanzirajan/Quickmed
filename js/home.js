// // home.js

// /**
//  * Handles sending messages in the chatbox.
//  * Appends user's message and a predefined bot response to the chatbox.
//  */
// function sendMessage() {
//     const userInput = document.getElementById('userInput');
//     const chatboxBody = document.getElementById('chatbox-body');
//     const messageText = userInput.value.trim();

//     if (messageText) {
//         // Append user message
//         const userMessageDiv = document.createElement('div');
//         userMessageDiv.classList.add('message');
//         userMessageDiv.innerHTML = `<div class="user">${messageText}</div>`;
//         chatboxBody.appendChild(userMessageDiv);

//         // Simulate bot response
//         const botMessageDiv = document.createElement('div');
//         botMessageDiv.classList.add('message');
//         botMessageDiv.innerHTML = '<div class="bot">How can I assist you with your health journey today?</div>';
//         chatboxBody.appendChild(botMessageDiv);

//         // Scroll to the bottom of the chatbox
//         chatboxBody.scrollTop = chatboxBody.scrollHeight;

//         // Clear input field
//         userInput.value = '';
//     }
// }

// // Optional: Add event listener for Enter key to send messages
// document.addEventListener('DOMContentLoaded', () => {
//     const userInputField = document.getElementById('userInput');
//     if (userInputField) {
//         userInputField.addEventListener('keypress', (event) => {
//             if (event.key === 'Enter') {
//                 sendMessage();
//             }
//         });
//     }
// });

// home.js

/**
 * Handles sending messages in the chatbox.
 * Appends user's message and a predefined bot response to the chatbox.
 */
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatboxBody = document.getElementById('chatbox-body');
    const messageText = userInput.value.trim();

    if (messageText) {
        // Append user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('message');
        userMessageDiv.innerHTML = `<div class="user">${messageText}</div>`;
        chatboxBody.appendChild(userMessageDiv);

        // Simulate bot response
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('message');
        botMessageDiv.innerHTML = '<div class="bot">How can I assist you with your health journey today?</div>';
        chatboxBody.appendChild(botMessageDiv);

        // Scroll to the bottom of the chatbox
        chatboxBody.scrollTop = chatboxBody.scrollHeight;

        // Clear input field
        userInput.value = '';
    }
}

// Optional: Add event listener for Enter key to send messages
document.addEventListener('DOMContentLoaded', () => {
    const userInputField = document.getElementById('userInput');
    if (userInputField) {
        userInputField.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
    }
});