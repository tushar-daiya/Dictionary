const searchBarEl = document.getElementById("searchBar");
const searchFormEl = document.getElementById("searchForm");
const result = document.querySelector(".searchResult");

searchFormEl.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  const searchValue = searchBarEl.value.trim();
  if (searchValue.length) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Word not found!");
        }
        return res.json();
      })
      .then((data) => {
        // Clear previous results
        result.innerHTML = "";

        // Display all meanings and definitions
        data.forEach((entry) => {
          const meanings = entry.meanings;
          meanings.forEach((meaning) => {
            const partOfSpeech = meaning.partOfSpeech || "N/A";
            const definition = meaning.definitions[0]?.definition || "N/A";
            const example = meaning.definitions[0]?.example || "N/A";

            // Create HTML elements for each meaning
            const meaningElement = document.createElement("div");
            meaningElement.classList.add("results");
            meaningElement.innerHTML = `
              <h1 class="word">${searchValue}</h1>
              <h4 class="phonetic">${partOfSpeech}</h4>
              <p class="meaning">${definition}</p>
              <p class="example">${example}</p>
            `;

            // Append the meaning to the search results
            result.appendChild(meaningElement);
          });
        });
      })
      .catch((error) => {
        result.innerHTML = `<p class="notFound">${error.message}</p>`;
      });
  } else {
    result.innerHTML = `<p class="notFound">Type in your word!</p>`;
  }
});
