document.addEventListener('DOMContentLoaded', function () {
    let lastSentMessage = null;


    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.textContent = 'Ryuk is typing...';
    typingIndicator.classList.add('typing-animation');
    typingIndicator.style.visibility = 'hidden';

    function autoReceiveMessage() {
        typingIndicator.style.visibility = 'visible';
        setTimeout(function () {
            typingIndicator.style.visibility = 'hidden';
            appendMessage('received', 'hey! I want more apples.');
        }, 3000);
    }

    function startAutoReceiveMessage() {
        setInterval(function () {
            autoReceiveMessage();
        }, 20000);
    }

    startAutoReceiveMessage();

    sendBtn.addEventListener('click', function () {
        const message = messageInput.value.trim();
        if (message !== '') {
            const messageDiv = appendMessage('sent', message);
            const sentTick = appendTick('grey', messageDiv);
            setTimeout(function () {
                sentTick.style.color = 'black'; 
                setTimeout(function () {
                    sentTick.style.color = 'green'; 
                }, 1000);
            }, 2000);

            lastSentMessage = messageDiv;

            setTimeout(function () {
                typingIndicator.style.visibility = 'visible';
                //typingIndicator.textContent = 'Ryuk is typing...';
                //typingIndicator.classList.add('typing-animation');
            }, 3000);

            setTimeout(function () {
                typingIndicator.style.visibility = 'hidden';
                appendMessage('received', 'Thanks for your message but I want more apples!');
            }, 7000);

            messageInput.value = '';
        }
    });

    function appendMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message ' + type;
        const profilePicContainer = document.createElement('div');
        if (type === 'sent') {
            profilePicContainer.className = 'profile-pic ' + 'SenderProfilePic';
        } else {
            profilePicContainer.className = 'profile-pic ' + 'ReceiverProfilePic';
        }


        const profilePicImg = document.createElement('img');
        if (type === 'sent') {
            profilePicImg.src = 'img.png';
        } else {
            profilePicImg.src = 'img2.png';
        }

        profilePicImg.alt = 'Profile Picture';
        profilePicImg.className = 'profile-pic-img';


        //profilePicContainer.appendChild(profilePicImg);


        const contentContainer = document.createElement('div');
        //contentContainer.style.backgroundColor = 'green';
        //contentContainer.className = 'message-content';


        const senderNameSpan = document.createElement('span');
        senderNameSpan.className = 'sender-name'
        senderNameSpan.textContent = 'Ryuk';
        if (type === 'sent') {
            contentContainer.className = 'message-content ' + 'SenderMsgContent';

            senderNameSpan.textContent = 'Light';
        } else {
            contentContainer.className = 'message-content ' + 'ReceiverMsgContent';

            senderNameSpan.textContent = 'Ryuk';
        }



        const messageTextSpan = document.createElement('span');
        messageTextSpan.textContent = content;
        messageTextSpan.style.paddingLeft = '78px';


        //contentContainer.appendChild(senderNameSpan);

        profilePicContainer.appendChild(profilePicImg);
        profilePicContainer.appendChild(senderNameSpan);


        profilePicContainer.appendChild(senderNameSpan);
        contentContainer.appendChild(messageTextSpan);


        messageDiv.appendChild(profilePicContainer);
        messageDiv.appendChild(contentContainer);


        if (type === 'sent' && lastSentMessage) {
            const lastSentProfilePicContainer = lastSentMessage.querySelector('.profile-pic-img');
            if (lastSentProfilePicContainer) {
                lastSentProfilePicContainer.remove();
            }
        }

        chatMessages.prepend(messageDiv);
        chatMessages.scrollTop = 0;


        if (type === 'sent') {
            lastSentMessage = messageDiv;
        }

        return messageDiv;
    }
    function appendTick(color, messageDiv) {
        const tickSpan = document.createElement('span');
        tickSpan.className = 'tick-mark';
        tickSpan.textContent = '✔';
        tickSpan.style.color = color;
        messageDiv.appendChild(tickSpan);
        return tickSpan;
    }
});
