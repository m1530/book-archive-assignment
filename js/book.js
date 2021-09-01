const searchField = document.getElementById('search-field');
const loadBook = () => {
    const searchText = searchField.value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data.docs));
}

const displayBook = data => {
    //console.log(data);
    data.forEach(book => {
        console.log(book);
        const searchResult = document.getElementById('search-result');
        const divCol = document.createElement('div');
        const imageUrl = `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`;
        divCol.classList.add('col');
        divCol.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h4>by: ${book.author_name[0]}</h4>
                    <h6>Publisher: ${book.publisher}</h6>
                    <p>First published in ${book.first_publish_year}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(divCol);
    });
}