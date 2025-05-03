function saveOptions() {
  const enableQuickLinks = document.getElementById('enableQuickLinks').checked;
  const quickLinks = Array.from(linksContainer.querySelectorAll(".link-entry")).map((div, index) => ({
    url: document.getElementById(`linkUrl${index}`).value,
    text: document.getElementById(`linkText${index}`).value
  })).filter(link => link.url.trim() && link.text.trim());
  const enableQuotes = document.getElementById('enableQuotes').checked;
  const quotes = Array.from(quotesContainer.querySelectorAll("input[type='text']"))
    .map(input => input.value)
    .filter(quote => quote.trim() !== "");
  const doodleImageInput = document.getElementById('doodleImage').value;
  const backgroundImageInput = document.getElementById('backgroundImage').value;
  const doodleImage = doodleImageInput.trim() === "" ? "my-doodle.gif" : doodleImageInput;
  const backgroundImage = backgroundImageInput.trim() === "" ? "background.jpg" : backgroundImageInput;
  const quoteColor = document.getElementById('quoteColor').value;
  const doodleSize = document.getElementById('doodleSize').value + '%';
  const quoteFont = document.getElementById('quoteFont').value;
  const customQuoteFont = document.getElementById('customQuoteFont').value.trim();
  const finalQuoteFont = quoteFont === 'custom' ? customQuoteFont : quoteFont;
  const quoteFontSize = document.getElementById('quoteFontSize').value + 'px';

  console.log('Saving quote font:', finalQuoteFont, 'Size:', quoteFontSize); // Debug

  chrome.storage.local.set({
    enableQuickLinks,
    quickLinks,
    enableQuotes,
    quotes,
    doodleImage,
    backgroundImage,
    quoteColor,
    doodleSize,
    quoteFont: finalQuoteFont,
    quoteFontSize
  }, () => {
    alert('Options saved!');
    document.getElementById('doodleImage').value = doodleImage;
    document.getElementById('backgroundImage').value = backgroundImage;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const quotesContainer = document.getElementById("quotesContainer");
  const addQuoteBtn = document.getElementById("addQuoteBtn");
  const linksContainer = document.getElementById("linksContainer");
  const addLinkBtn = document.getElementById("addLinkBtn");

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

  const defaultLinks = [
    { url: "https://www.youtube.com/", text: "YouTube" },
    { url: "https://x.com/home", text: "X" },
    { url: "https://chatgpt.com/", text: "ChatGPT" },
    { url: "https://www.twitch.tv/", text: "Twitch" },
    { url: "https://mail.yahoo.com/", text: "Yahoo" }
  ];

  function restoreOptions() {
    chrome.storage.local.get({
      enableQuickLinks: true,
      quickLinks: [],
      enableQuotes: true,
      quotes: defaultQuotes,
      doodleImage: "images/my-doodle.gif",
      backgroundImage: "images/background.jpg",
      quoteColor: "#c4ecf5",
      doodleSize: "50%",
      quoteFont: "Segoe UI",
      quoteFontSize: "24px"
    }, (items) => {
      document.getElementById("enableQuickLinks").checked = items.enableQuickLinks;
      document.getElementById("enableQuotes").checked = items.enableQuotes;
      document.getElementById("doodleImage").value = items.doodleImage;
      document.getElementById("backgroundImage").value = items.backgroundImage;
      document.getElementById("quoteColor").value = items.quoteColor;
      document.getElementById("doodleSize").value = parseInt(items.doodleSize);
      const quoteFontSelect = document.getElementById("quoteFont");
      if (quoteFontSelect.options.namedItem(items.quoteFont)) {
        quoteFontSelect.value = items.quoteFont;
      } else {
        quoteFontSelect.value = "custom";
        document.getElementById("customQuoteFont").value = items.quoteFont;
      }
      document.getElementById("quoteFontSize").value = parseInt(items.quoteFontSize);

      console.log('Restored quote font:', items.quoteFont, 'Size:', items.quoteFontSize); // Debug

      linksContainer.innerHTML = "";
      if (items.quickLinks.length > 0) {
        items.quickLinks.forEach((link, index) => addLinkField(link.url, link.text, index));
      } else {
        addLinkField();
        addLinkField();
      }

      quotesContainer.innerHTML = "";
      if (items.quotes.length > 0) {
        items.quotes.forEach((quote, index) => addQuoteField(quote, index));
      } else {
        defaultQuotes.forEach((quote, index) => addQuoteField(quote, index));
      }
    });
  }

  function addLinkField(url = "", text = "", index = linksContainer.children.length) {
    const defaultLink = index < defaultLinks.length ? defaultLinks[index] : { url: "", text: "" };
    const div = document.createElement("div");
    div.className = "link-entry";
    div.innerHTML = `
      <input type="text" class="link-url" id="linkUrl${index}" placeholder="URL" value="${url || defaultLink.url}">
      <input type="text" class="link-text" id="linkText${index}" placeholder="Text" value="${text || defaultLink.text}">
      <button type="button" class="removeLinkBtn">Remove</button>
    `;
    linksContainer.appendChild(div);
    div.querySelector(".removeLinkBtn").addEventListener("click", () => div.remove());
  }

  function addQuoteField(value = null, index = quotesContainer.children.length) {
    const defaultValue = value !== null ? value : (index < defaultQuotes.length ? defaultQuotes[index] : "");
    const div = document.createElement("div");
    div.className = "quote-entry";
    div.innerHTML = `
      <input type="text" id="quoteText${index}" placeholder="Enter a quote" value="${defaultValue}">
      <button type="button" class="removeQuoteBtn">Remove</button>
    `;
    quotesContainer.appendChild(div);
    div.querySelector(".removeQuoteBtn").addEventListener("click", () => div.remove());
  }

  addQuoteBtn.addEventListener("click", () => addQuoteField());
  addLinkBtn.addEventListener("click", () => addLinkField());
  document.getElementById("saveBtn").addEventListener("click", saveOptions);
  restoreOptions();
});