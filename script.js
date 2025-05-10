// Selectors for DOM elements
const bookForm = document.getElementById("book-form");
const borrowForm = document.getElementById("borrow-form");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("filter-category");
const bookList = document.getElementById("book-list");
const borrowingHistory = document.getElementById("borrowing-history");
const borrowBookSelect = document.getElementById("borrow-book");

// Event listeners
bookForm.addEventListener("submit", addBook);
borrowForm.addEventListener("submit", borrowBook);
searchInput.addEventListener("input", filterBooks);
categoryFilter.addEventListener("change", filterBooks);
bookList.addEventListener("click", handleBookActions);

// Function to add a new book
function addBook(e) {
  e.preventDefault();

  // Get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const category = document.getElementById("category").value;

  // Create a new list item
  const li = createBookListItem(title, author, year, category);

  // Append the new list item to the book list
  bookList.appendChild(li);

  // Update the borrow book select list
  updateBorrowBookSelect();

  // Clear form fields
  clearBookForm();
}

// Function to create a new book list item
function createBookListItem(title, author, year, category) {
  const li = document.createElement("li");
  li.classList.add("book-item");
  li.dataset.category = category;

  li.innerHTML = `
        <div class="details">
            <span class="book-title">${title}</span>
            <span class="book-author">${author}</span>
            <span class="book-year">${year}</span>
            <span class="book-category">${category}</span>
        </div>
        <button class="action-btn delete-btn">
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25 21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/><path d="M16.5 11.25H12.75V7.5h-1.5v3.75H7.5v1.5h3.75V16.5h1.5v-3.75H16.5z"/></svg>
        </button>
    `;

  return li;
}

// Function to update the borrow book select list
function updateBorrowBookSelect() {
  borrowBookSelect.innerHTML =
    '<option value="" disabled selected>Select Book to Borrow</option>';
  const bookTitles = Array.from(bookList.querySelectorAll(".book-title")).map(
    (title) => title.textContent
  );

  bookTitles.forEach((title) => {
    const option = document.createElement("option");
    option.value = title;
    option.textContent = title;
    borrowBookSelect.appendChild(option);
  });
}

// Function to clear the book form fields
function clearBookForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("year").value = "";
  document.getElementById("category").value = "";
}

// Function to handle borrowing a book
function borrowBook(e) {
  e.preventDefault();

  const bookTitle = borrowBookSelect.value;
  const borrower = document.getElementById("borrower").value;
  const date = new Date().toLocaleDateString();

  // Create a new list item for the borrowing history
  const li = document.createElement("li");
  li.textContent = `${bookTitle} borrowed by ${borrower} on ${date}`;

  // Append the new list item to the borrowing history
  borrowingHistory.appendChild(li);

  // Clear form fields
  borrowBookSelect.value = "";
  document.getElementById("borrower").value = "";
}

// Function to handle actions on book list (e.g., delete book)
function handleBookActions(e) {
  if (e.target.classList.contains("delete-btn")) {
    const bookItem = e.target.closest(".book-item");
    bookItem.remove();
    updateBorrowBookSelect(); // Update borrow book select after deleting a book
  }
}

// Function to filter books based on search and category
function filterBooks() {
  const query = searchInput.value.trim().toLowerCase();
  const filterCategory = categoryFilter.value;
  const books = Array.from(bookList.children);

  books.forEach((book) => {
    const title = book.querySelector(".book-title").textContent.toLowerCase();
    const category = book.dataset.category.toLowerCase();

    const matchTitle = title.includes(query);
    const matchCategory =
      filterCategory === "" || category === filterCategory.toLowerCase();

    if (matchTitle && matchCategory) {
      book.style.display = "";
    } else {
      book.style.display = "none";
    }
  });
}
