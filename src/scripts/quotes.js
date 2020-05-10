const mainContainer = document.querySelector(".main-container");
const splashPage = document.querySelector(".splash-page");

function getQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let quote = data[Math.floor(Math.random() * data.length)];
      const quoteContainer = document.createElement("div");
      quoteContainer.classList.add("quote-container");
      const quoteText = document.createElement("p");
      const quoteAuthor = document.createElement("p");
      quoteText.classList.add("quote");
      quoteAuthor.classList.add("author");
      quoteAuthor.classList.add("hide");
      quoteText.innerText = `"${quote.text}"`;
      if (quote.author) {
        quoteAuthor.innerText = `${quote.author}`;
      } else {
        quoteAuthor.innerText = "Anonymous";
      }
      quoteContainer.appendChild(quoteText);
      quoteContainer.appendChild(quoteAuthor);
      mainContainer.insertBefore(quoteContainer, splashPage);
    });
}
getQuote();
