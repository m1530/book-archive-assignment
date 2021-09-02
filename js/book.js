//take value from input field
const searchBook = () => {
    const searchText = document.getElementById('search-field').value;

    //validation for empty value
    if (searchText === '') {
        document.getElementById('error-message').innerText = `
            Search field cann't empty.
        `;
        displaySpinner('none');
        toggleSearchResult('none');
        getInnerText('total-found');
        getInnerText('show');
    } else {
        // display spinner
        displaySpinner('block');
        toggleSearchResult('none');
        loadBooks(searchText);
        document.getElementById('search-field').value = '';
        getInnerText('error-message');
        getInnerText('total-found');
        getInnerText('show');
    }
}
// function for common empty innertext 
const getInnerText = id => {
    document.getElementById(id).innerText = '';
}
//show spinner function
const displaySpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// function for toggle search result
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

//lood books from url
const loadBooks = searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayBooks(data.docs);
            document.getElementById('total-found').innerText = `Out of ${data.numFound}`;
        })
}
//display book 
const displayBooks = books => {
    //console.log(books);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    //validation for not finding book
    if (books.length === 0) {
        document.getElementById('error-message').innerText = `
        No result found. please search valid book name!!
    `;
    }
    //make slice and show 35 books
    const lessBook = books.slice(0, 35);
    document.getElementById('show').innerText = `Shown ${lessBook.length}`;
    lessBook?.forEach(book => {
        //console.log(book)
        book.cover_i ? cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : cover = `image/1.jpg`;
        //console.log(book);
        const divCol = document.createElement('div');
        divCol.classList.add('col');
        divCol.innerHTML = `
            <div class="card h-100">
                <img src="${cover}" class="card-img-top" alt="Image not found">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${book.title ? book.title : 'N/A'}</h5>
                    <h6>by: ${book.author_name ? book.author_name[0] : 'N/A'}</h6>
                    <h6>Publisher: ${book.publisher ? book.publisher[0] : 'N/A'}</h6>
                    <p>First published in: ${book.first_publish_year ? book.first_publish_year : ''}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(divCol);
    });
    displaySpinner('none');
    toggleSearchResult('flex');
}
