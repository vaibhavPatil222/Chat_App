
const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Listen for a connection to the WebSocket
io.on('connection', function (socket) {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chat-message', function (data) {
        // Broadcast the message to all connected clients
        io.emit('chat-message', data);
    });


    // Listen for disconnection
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});

// Function to add emoji support to the chat code
function addEmojiSupport() {
    // Additional code for emoji support
    const emojiButton = document.getElementById('emoji-button');
    const emojiPicker = document.getElementById('emoji-picker');

    emojiButton.addEventListener('click', function() {
        emojiPicker.classList.toggle('visible');
    });

    emojiPicker.addEventListener('click', function(event) {
        if (event.target.tagName === 'SPAN') {
            const selectedEmoji = event.target.innerText;
            messageInput.value += selectedEmoji;
            emojiPicker.classList.remove('visible');
        }
    });
}
