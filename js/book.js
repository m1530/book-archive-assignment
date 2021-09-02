//take value from input field
const searchBook = () => {
    const searchText = document.getElementById('search-field').value;

    //validation for empty value
    if (searchText === '') {
        document.getElementById('error-message').innerText = `
            Search field cann't empty. please write something
        `;
        displaySpinner('none');
        toggleSearchResult('none');
        //document.getElementById('total-found').innerText = '';
        getInnerText('total-found');
    } else {
        // display spinner
        displaySpinner('block');
        toggleSearchResult('none');
        loadBooks(searchText);
        document.getElementById('search-field').value = '';
        /*   document.getElementById('error-message').innerText = '';
          document.getElementById('total-found').innerText = ''; */
        getInnerText('error-message');
        getInnerText('total-found');
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
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayBooks(data.docs);
            document.getElementById('total-found').innerText = `${data.numFound}`;
        })
}
//display book 
const displayBooks = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    //validation for not finding book
    if (books.length === 0) {
        document.getElementById('error-message').innerText = `
        Not found. please search valid book name!!
    `;
    }
    books?.forEach(book => {

        let author;
        //check author and display one author name
        if (book.author_name) {
            author = book.author_name[0];
        }
        //console.log(book);
        const divCol = document.createElement('div');
        divCol.classList.add('col');
        divCol.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h4>by: ${author}</h4>
                    <h6>Publisher: ${book.publisher}</h6>
                    <p>First published in ${book.first_publish_year}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(divCol);
    });
    displaySpinner('none');
    toggleSearchResult('flex');
}
