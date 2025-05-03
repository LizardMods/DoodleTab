window.addEventListener("DOMContentLoaded", () => {
  const quoteElement = document.querySelector("h1");
  const linksContainer = document.getElementById("quick-links");
  const doodleElement = document.getElementById("doodle");
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  
  if (searchButton) {
    // List of placeholder messages
    const emptySearchMessages = [
      "Please enter a search term.",
      "Nothing to find; enter a search term.",
      "Seriously, enter a search term.",
      "To get your basics and stuff, enter a search term.",
      "I sometimes search 'Fish' to see if the Internet's working."
    ];
    let messageIndex = 0; // Tracks which message to show next
  
    searchButton.addEventListener('click', () => {
      const query = searchInput.value;
      if (query) {
        chrome.search.query({ text: query });
      } else {
        searchInput.placeholder = emptySearchMessages[messageIndex];
        messageIndex = (messageIndex + 1) % emptySearchMessages.length; // Loops back to 0 when it hits the end
      }
    });
  }
  
  if (searchInput) {
    searchInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        const query = event.target.value;
        if (query) {
          chrome.search.query({ text: query });
        }
      }
    });
  }
  
  const defaultQuotes = [
    "Follow the white rabbit.",
    "I'm afraid I can't do that, Dave.",
    "Would you like to play a game?",
    "Your scientists were so preoccupied with whether or not they could, they didn’t stop to think if they should.",
    "Skynet has become self-aware.",
    "All your base are belong to us.",
    "It’s a UNIX system! I know this!",
    "The cake is a lie.",
    "You wouldn’t download a car.",
    "Don’t Panic.",
    "More human than human.",
    "My precious bandwidth!",
    "A strange game. The only winning move is not to play.",
    "Help me, Obi-Wan Kenobi. You’re my only hope.",
    "It’s over 9000!",
    "You are in a maze of twisty little passages, all alike.",
    "I am Groot.",
    "We are the Borg. Resistance is futile.",
    "Enhance!",
    "Achievement unlocked!",
    "The Spice must flow.",
    "I’ve seen things you people wouldn’t believe...",
    "42.",
    "It’s dangerous to go alone! Take this.",
    "Do a barrel roll!",
    "Press F to pay respects.",
    "Big Brother is watching you.",
    "Hello, World!",
    "One more thing...",
    "Basics and stuff"
  ];

  chrome.storage.local.get(
    {
      enableQuotes: true,
      quotes: defaultQuotes,
      enableQuickLinks: true,
      quickLinks: [
        { url: "https://www.youtube.com/", text: "YouTube" },
        { url: "https://x.com/home", text: "X" },
        { url: "https://chatgpt.com/", text: "ChatGPT" },
        { url: "https://www.twitch.tv/", text: "Twitch" },
        { url: "https://mail.yahoo.com/", text: "Yahoo" }
      ],
      quoteColor: "#c4ecf5",
      doodleImage: "images/my-doodle.gif",
      backgroundImage: "images/background.jpg",
      doodleSize: "50%",
      quoteFont: "Segoe UI",
      quoteFontSize: "24px"
    },
    (items) => {
      console.log('Applying quote font:', items.quoteFont, 'Size:', items.quoteFontSize); // Debug

      if (quoteElement) {
        if (items.enableQuotes) {
          const today = new Date();
          const dayOfMonth = today.getDate();
          const quoteIndex = (dayOfMonth - 1) % items.quotes.length;
          const quoteText = items.quotes[quoteIndex] || "";
          quoteElement.innerText = quoteText;
          quoteElement.style.color = items.quoteColor;
          quoteElement.style.fontFamily = `"${items.quoteFont}", sans-serif`;
          quoteElement.style.fontSize = items.quoteFontSize; // Apply font size
          quoteElement.style.display = quoteText ? "block" : "none";
        } else {
          quoteElement.style.display = "none";
        }
      }

      if (linksContainer) {
        linksContainer.innerHTML = "";
        if (items.enableQuickLinks) {
          items.quickLinks.forEach((link) => {
            const a = document.createElement("a");
            a.href = link.url;
            a.textContent = link.text;
            a.target = "_blank";
            linksContainer.appendChild(a);
          });
          linksContainer.style.display = "block";
        } else {
          linksContainer.style.display = "none";
        }
      }

      if (doodleElement) {
        if (items.doodleImage) {
          doodleElement.src = items.doodleImage;
          doodleElement.style.maxWidth = items.doodleSize;
          doodleElement.style.display = "block";
        } else {
          doodleElement.style.display = "none";
        }
      }

      if (items.backgroundImage) {
        document.body.style.backgroundImage = `url(${items.backgroundImage})`;
      } else {
        document.body.style.backgroundImage = "none";
      }
    }
  );
});