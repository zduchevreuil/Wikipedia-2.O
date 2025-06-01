function handleSubmit(event) {
    event.preventDefault();
    const searchQuery = document.querySelector('.js-search-input').value.trim();
    const searchResults = document.querySelector('.js-search-results');
    searchResults.innerHTML = "";

    const endPoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    
    fetch(endPoint)
    .then(response => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json()
    })
    .then(({query : {search : results}})=> {
        if(results.length === 0) {
            alert("Aucun résultat trouvé. Essayez ave d'autres mots-clé.");
            return;
        }
        results.forEach(result => {
            const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
            searchResults.insertAdjacentHTML(
                'beforeend', 
                `<div class="resluts-item">
            <h3 class="results-title">
                <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
            </h3>
            <a href="${url}" class="results-link" target="_blank" rel="noopener">${url}</a>
            <br>
            <span class="results-snippet">${result.snippet}</span>
        </div>`)
        })
    })
    .catch(err => {
        console.log(err);
        alert('echec de la recherche wikipedia')
    })
}

document.querySelector('.js-search-form').addEventListener('submit', handleSubmit); 