// Star Wars–themed chat data
const chatData = {
  general: [
    {
      sender: "Luke Skywalker",
      text: "May the Force be with you, everyone.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Always",
      fromSelf: true,
    },
    {
      sender: "Leia Organa",
      text: "Focus, team. We have a new transmission from Hoth Command.",
      fromSelf: false,
    },
  ],

  planning: [
    {
      sender: "Han Solo",
      text: "I've got a bad feeling about this mission...",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "It's just a quick hyperspace jump.",
      fromSelf: true,
    },
    {
      sender: "Chewbacca",
      text: "Rrrrghh!",
      fromSelf: false,
    },
    {
      sender: "Han Solo",
      text: "Chewie agrees. We should double-check the nav-computer.",
      fromSelf: false,
    },
  ],

  feedback: [
    {
      sender: "Obi-Wan Kenobi",
      text: "Remember: The Force will be with you, always.",
      fromSelf: false,
    },
    {
      sender: "Yoda",
      text: "Do or do not. There is no try.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Wise words",
      fromSelf: true,
    },
  ],
};

// Set the Global State
let currentChannel = "general";

// initialize post-load DOM
document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners();
  populateMessages(currentChannel);
});

// Channel Changer
function changeChannel(event) {
  const clicked = event.currentTarget;
  const selectedChannel = clicked.dataset.channel;

  // Remove "active" status from all
  document.querySelectorAll(".channel").forEach((btn) => {
    btn.classList.remove("active");
  });

  // add "active" status to most recently clicked channel
  clicked.classList.add("active");

  // Update header text
  document.getElementById("channel-title").textContent = clicked.textContent;

  // Change global current channel
  currentChannel = selectedChannel;

  // Refresh displayed messages
  populateMessages(selectedChannel);
}

// Populate our messages
function populateMessages(channelName) {
  const container = document.getElementById("chat-messages");
  const template = document.querySelector("template");

  // clear existing messages
  container.innerHTML = "";

  // loop through channel messages
  chatData[channelName].forEach((msg) => {
    const clone = template.content.cloneNode(true);
    const messageEl = clone.querySelector(".message");
    const senderEl = clone.querySelector(".sender");
    const textEl = clone.querySelector(".text");

    senderEl.textContent = `${msg.sender}:`;
    textEl.textContent = msg.text;

    // Check if message sent by user, and if so apply 'self' class
    if (msg.fromSelf) {
      messageEl.classList.add("self");
    }

    container.appendChild(clone);
  });

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

// Initialize Event Listeners
function initializeEventListeners() {
  // Call Channel Buttons
  document.querySelectorAll(".channel").forEach((btn) => {
    btn.addEventListener("click", changeChannel);
  });

  // Send button
  const sendBtn = document.querySelector("#chat-form button");
  sendBtn.addEventListener("click", sendMessage);

  // Press enter to send
  const input = document.getElementById("message-input");
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

// Extra Credit Option: Send Message
function sendMessage() {
  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if (!text) return; // Ignore empty messages

  // Create our new message object
  const newMessage = {
    sender: "You",
    text,
    fromSelf: true,
  };

  // add our new message to the chat data
  chatData[currentChannel].push(newMessage);

  // render our message immediately
  const container = document.getElementById("chat-messages");
  const template = document.querySelector("template");
  const clone = template.content.cloneNode(true);
  const messageEl = clone.querySelector(".message");
  const senderEl = clone.querySelector(".sender");
  const textEl = clone.querySelector(".text");

  senderEl.textContent = "You:";
  textEl.textContent = text;
  messageEl.classList.add("self");

  container.appendChild(clone);

  // Clear our input after sending message, and scroll to bottom
  input.value = "";
  container.scrollTop = container.scrollHeight;
}
