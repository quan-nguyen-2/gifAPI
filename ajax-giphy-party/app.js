const search = document.getElementById("search");
const inputText = document.getElementById("inputText");
const getResContainer = document.getElementById("getres");
const remove = document.getElementById("remove");

search.addEventListener("click", async function() {
    const searchTerm = inputText.value;
    await appendSearchResult(searchTerm);
});

remove.addEventListener("click", function() {
    const deleteIMG = document.querySelectorAll("img");
    deleteIMG.forEach(function(img){
        img.remove();
    })
});

async function appendSearchResult(searchTerm) {
    try {
        const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
            params: {
                q: searchTerm,
                api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
            }
        });

        if (res.data.data.length === 0) {
            console.error("No results found for the search term:", searchTerm);
            return;
        }

        const gifUrl = res.data.data[0].images.original.url;

        const gifImage = document.createElement("img");
        gifImage.src = gifUrl;

        getResContainer.appendChild(gifImage);
    } catch (error) {
        console.error("Error fetching search result:", error);
    }
}

