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
      quoteContainer.innerText = `${quote.text}`;
      quoteContainer.classList.add("quote-container");
      const quoteAuthor = document.createElement("p");
      quoteAuthor.classList.add("author");
      quoteAuthor.classList.add("hide");
      if (quote.author) {
        quoteAuthor.innerText = `${quote.author}`;
      } else {
        quoteAuthor.innerText = "Anonymous";
      }
      // quoteContainer.appendChild(quoteText);
      quoteContainer.appendChild(quoteAuthor);
      mainContainer.insertBefore(quoteContainer, splashPage);
    });
}

getQuote();
