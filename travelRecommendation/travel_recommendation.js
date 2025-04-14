var keywordMap = {
  beaches: "beaches",
  beach: "beaches",
  country: "countries",
  countries: "countries",
  temple: "temples",
  temples: "temples",
};

function mapKeywordToSearchKeyword(keyword) {
  return keywordMap[keyword.toLowerCase()];
}

function fetchData(event) {
  event.preventDefault();
  var keyword = document.getElementById("place").value;
  keyword = mapKeywordToSearchKeyword(keyword);

  fetch("./travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      // Check if the keyword exists in the data
      if (data[keyword]) {
        const results = data[keyword];
        console.log("Results:", results);

        const placeInfo = document.getElementById("results");
        placeInfo.classList.remove("none");
        placeInfo.innerHTML = ""; // Clear previous results

        console.log("type of results:", typeof results);

        // Display each result
        results.forEach((item) => {
          // Create a container for each result
          const resultContainer = document.createElement("div");
          resultContainer.className = "result-item";

          // Add content to the container
          resultContainer.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" style="max-width: 100%;">
            <div class="result-details">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <button>Visit</button>
            </div>
          `;

          // Append to the results container
          placeInfo.appendChild(resultContainer);
        });
      } else {
        // No results found
        console.log("No data!");
        const placeInfo = document.getElementById("results");
        placeInfo.classList.remove("none");
        placeInfo.innerHTML = ""; // Clear previous results
        document.getElementById(
          "results"
        ).innerHTML = `<div class="result-error"><p>No results found for this keyword!</p></div>`;
      }
    })
    .catch((err) => {
      console.log("Error fetching: ", err);
      document.getElementById("results").innerHTML =
        "<p>Error loading data. Please try again.</p>";
    });
}

function clearSearch(event) {
  event.preventDefault();
  document.getElementById("place").value = ""; // Clear the input field
  const placeInfo = document.getElementById("results");
  placeInfo.innerHTML = ""; // Clear previous results
  placeInfo.classList.add("none");
}

// document.getElementById("search").addEventListener("submit", fetchData);

document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.querySelector(
    ".nav_search-buttons[type='submit']:nth-of-type(1)"
  );
  const clearBtn = document.querySelector(
    ".nav_search-buttons[type='submit']:nth-of-type(2)"
  );

  searchBtn.addEventListener("click", fetchData);
  clearBtn.addEventListener("click", clearSearch);
});
