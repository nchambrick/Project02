const apiKey = "PMB3EdRo9dsM7rBPmRlq1DXxTmoZnGg6";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=20&rating=g&lang=en`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayResults(data.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

function displayResults(gifs) {
    resultsContainer.innerHTML = "";
    if (gifs.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    gifs.forEach(gif => {
        const imgElement = document.createElement("img");
        imgElement.src = gif.images.fixed_height.url;
        imgElement.alt = gif.title;
        resultsContainer.appendChild(imgElement);
    });
}