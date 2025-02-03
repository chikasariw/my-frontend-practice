// Function to generate unique ID for each book using timestamp
function generateID() {
    return +new Date();
}

function addBook() {
    const titleInput = document.getElementById('inputBookTitle');
    const authorInput = document.getElementById('inputBookAuthor');
    const yearInput = document.getElementById('inputBookYear');
    const statusInput = document.querySelector('input[name="status"]:checked');

    const title = titleInput.value;
    const author = authorInput.value;
    const year = parseInt(yearInput.value); // Mengubah tipe data year menjadi number
    const status = statusInput.value === 'option1' ? true : false;

    const book = {
        id: generateID(),
        title: title,
        author: author,
        year: year, // Properti year sudah dalam tipe data number
        isComplete: status
    };

    const shelf = status ? document.getElementById('rakBukuSudahdiBaca') : document.getElementById('rakBukuBelumdiBaca');

    const row = shelf.querySelector('tbody').insertRow();
    row.innerHTML = `
        <td>${title}</td>
        <td>${year}</td>
        <td>${author}</td>
        <td>
            <button class="btn btn-sm ${status ? 'btn-dark' : 'btn-outline-dark'} rounded-pill btn-icon toggle-status" data-toggle="tooltip" title="${status ? 'Belum dibaca' : 'Sudah dibaca'}"><i class="bi bi-${status ? 'arrow-clockwise' : 'check'} fs-6"></i></button>
            <button class="btn btn-sm btn-outline-secondary rounded-pill btn-icon delete-book" data-toggle="tooltip" title="Hapus Buku"><i class="bi bi-trash3-fill fs-7"></i></button>
        </td>
    `;

    // Save the book to localStorage
    saveBookToLocalStorage(book);

    // Clear input fields
    titleInput.value = '';
    authorInput.value = '';
    yearInput.value = '';
    statusInput.checked = true;
}


// save book
function saveBookToLocalStorage(book) {
    let books = localStorage.getItem('books');
    books = books ? JSON.parse(books) : [];

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function loadBooks() {
    let books = localStorage.getItem('books');
    books = books ? JSON.parse(books) : [];

    books.forEach(book => {
        const shelf = book.isComplete ? document.getElementById('rakBukuSudahdiBaca') : document.getElementById('rakBukuBelumdiBaca');

        const row = shelf.querySelector('tbody').insertRow();
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.year}</td>
            <td>${book.author}</td>
            <td>
                <button class="btn btn-sm ${book.isComplete ? 'btn-dark' : 'btn-outline-dark'} rounded-pill btn-icon toggle-status" data-toggle="tooltip" title="${book.isComplete ? 'Belum dibaca' : 'Sudah dibaca'}"><i class="bi bi-${book.isComplete ? 'arrow-clockwise' : 'check'} fs-6"></i></button>
                <button class="btn btn-sm btn-outline-secondary rounded-pill btn-icon delete-book" data-toggle="tooltip" title="Hapus Buku"><i class="bi bi-trash3-fill fs-7"></i></button>
            </td>
        `;
    });
}

// move book
function moveBook(event) {
    const button = event.target.closest('.toggle-status');
    if (!button) return;

    const row = button.closest('tr');
    const title = row.cells[0].innerText;
    const currentShelf = button.closest('.col-md-6');
    const targetShelf = currentShelf.id === 'rakBukuBelumdiBaca' ? document.getElementById('rakBukuSudahdiBaca') : document.getElementById('rakBukuBelumdiBaca');

    row.remove();
    targetShelf.querySelector('tbody').appendChild(row);

    const status = currentShelf.id === 'rakBukuBelumdiBaca' ? true : false;
    button.dataset.status = status;

    const iconClass = status ? 'bi-arrow-clockwise' : 'bi-check' ;
    button.innerHTML = `<i class="bi ${iconClass} fs-6"></i>`;

    button.removeAttribute('title');
    button.setAttribute('data-bs-toggle', 'tooltip');

    // Update status buku di localStorage
    updateBookStatus(title, status);
}

document.querySelectorAll('.toggle-status').forEach(button => {
    button.addEventListener('click', moveBook);
});

// update
function updateBookStatus(title, status) {
    let books = localStorage.getItem('books');
    books = books ? JSON.parse(books) : [];

    const index = books.findIndex(book => book.title === title);
    if (index !== -1) {
        books[index].isComplete = status;
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// delete
function deleteBook(event) {
    const button = event.target.closest('.delete-book');
    if (!button) return;

    const row = button.closest('tr');
    const title = row.cells[0].innerText;

    row.remove();
    deleteBookFromLocalStorage(title);
}

function deleteBookFromLocalStorage(title) {
    let books = localStorage.getItem('books');
    books = books ? JSON.parse(books) : [];

    const index = books.findIndex(book => book.title === title);
    if (index !== -1) {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// event listener
document.getElementById('inputBook').addEventListener('submit', function(event) {
    event.preventDefault();
    addBook();
});
document.getElementById('rakBuku').addEventListener('click', function(event) {
    moveBook(event);
});
document.getElementById('rakBuku').addEventListener('click', function(event) {
    deleteBook(event);
});
window.addEventListener('load', function() {
    loadBooks();
});

// search
function filterBooks(query) {
    const allRows = document.querySelectorAll('#rakBuku tbody tr');
    allRows.forEach(row => {
        const title = row.cells[0].innerText.toLowerCase();
        if (title.includes(query.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none'; 
        }
    });
}

document.getElementById('searchInput').addEventListener('input', function(event) {
    const query = event.target.value.trim();
    filterBooks(query);
});
