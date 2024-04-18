document.addEventListener('DOMContentLoaded', function () {
    const socket = io();
    // DOM elements
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatOutput = document.getElementById('chat-output');

    // Event listener for sending messages
    sendButton.addEventListener('click', sendMessage);

    // Listen for messages from the server
    socket.on('chat-message', function (data) {
        displayMessage(data);
    });

    // Function to send a message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== '') {
            // Emit the message to the server
            socket.emit('chat-message', {
                user: 'You',
                message: message
            });
            // Clear the input field
            messageInput.value = '';
        }
    }

    // Function to handle server-side processing
    function serverFunction(message) {
        const keyword = ['price', 'display', 'ram', 'camera'];
        const newkeyword = message.toLowerCase().split(' '); // Split message into an array of words
        const l1 = keyword.length;
        const l2 = newkeyword.length;
        let ans = '';

        for (let i = 0; i < l1; i++) {
            console.log(keyword[i]);
            for (let j = 0; j < l2; j++) {
                console.log(newkeyword[j]);
                if (keyword[i] === newkeyword[j]) {
                    ans = 'price of the product is $100';
                } else {
                    ans = 'ask correct question';
                }
            }
        }
        return ans;
    }

    // Function to display a message in the chat
    function displayMessage(data) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
        chatOutput.appendChild(messageElement);
        // Scroll to the bottom of the chat
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});
