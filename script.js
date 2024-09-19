const apikey = '9920af36d56547c98e7db9612f2e2c84';

const blogcontainer = document.getElementById("blog-container");
const searchField =document.getElementById('search-input');
const searchButton =document.getElementById('search-button');


async function fetchRandomNews(){
    try{
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
    return data.articles;
    }catch(error){
    console.error("Error fetching random news",error);
    return [];
    }
}

searchButton.addEventListener("click" , async ()=>{
    const query = searchField.value.trim();
    if(query !==""){
        try{
        const articles = await fetchNewsQuery(query);
        displayBlogs(articles);
        }catch(error){
            console.log("Error fetching news by Query", error);
        }
    }
});

searchField.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        const query = searchField.value.trim();
        if(query !== ""){
            try{
                const articles = await fetchNewsQuery(query);
                displayBlogs(articles);
            }catch(error){
                console.log("Error fetching news by Query", error);
            }
        }
    }
});

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=40&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data);
        return data.articles;
        }catch(error){
        console.error("Error fetching news by Query",error);
        return [];
        }
}

// function displayBlogs(articles){
//     blogcontainer.innerHTML= "";
//     articles.forEach((article)=>{
//         const blogCard = document.createElement("div");
//         blogCard.classList.add("blog-card");
//         const img = document.createElement("img");
//         img.src = article.urlToImage;
//         img.alt = article.title;
//         const title = document.createElement("h2");
//         const truncatedTitle =article.title.length > 30
//         ? article.title.slice(0,30) + "...." 
//         : article.title;
//         title.textContent= truncatedTitle;
//         const description = document.createElement("p");
//         const truncateddesc =article.description.length > 120
//         ? article.description.slice(0,120) + "...." 
//         : article.description;
//         description.textContent= truncateddesc;
//         // description.textContent = article.description;

//         blogCard.appendChild(img);
//         blogCard.appendChild(title);
//         blogCard.appendChild(description);
//         blogCard.addEventListener('click' , ()=>{
//             window.open(article.url, "_blank")
//         })
//         blogcontainer.appendChild(blogCard);
//     });
// }

function displayBlogs(articles) {
    blogcontainer.innerHTML = "";
    articles.forEach((article) => {
        if (!article.urlToImage) {
            return;
        }

        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title || "News Image";
        blogCard.appendChild(img);

        const title = document.createElement("h2");
        const truncatedTitle = article.title && article.title.length > 30
            ? article.title.slice(0, 30) + "...."
            : article.title;
        title.textContent = truncatedTitle || "No title available";
        blogCard.appendChild(title);
        const description = document.createElement("p");
        const truncateddesc = article.description && article.description.length > 120
            ? article.description.slice(0, 120) + "...."
            : article.description;
        description.textContent = truncateddesc || "No description available";
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        blogcontainer.appendChild(blogCard);
    });
}


(async ()=>{
    try{
    const articles = await fetchRandomNews();
    displayBlogs(articles);
    }catch(error){
        console.error("Error fetching random news",error);
    }
})();