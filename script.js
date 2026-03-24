// Register
function register() {
    let user = document.getElementById("regUser").value;
    let pass = document.getElementById("regPass").value;

    localStorage.setItem(user, pass);
    alert("Registered successfully");
}

// Login
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    if (localStorage.getItem(user) === pass) {
        localStorage.setItem("currentUser", user);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid login");
    }
}

// Add Note
function addNote() {
    let note = document.getElementById("noteInput").value;
    let user = localStorage.getItem("currentUser");

    let notes = JSON.parse(localStorage.getItem(user + "_notes")) || [];
    notes.push(note);

    localStorage.setItem(user + "_notes", JSON.stringify(notes));
    displayNotes();
}

// Display Notes
function displayNotes() {
    let user = localStorage.getItem("currentUser");
    let notes = JSON.parse(localStorage.getItem(user + "_notes")) || [];

    let container = document.getElementById("notesContainer");
    container.innerHTML = "";

    notes.forEach((n, index) => {
        container.innerHTML += `
            <div class="note">
                ${n}
                <br>
                <button onclick="deleteNote(${index})">Delete</button>
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="shareNote('${n}')">Share</button>
            </div>
        `;
    });
}

// Delete
function deleteNote(i) {
    let user = localStorage.getItem("currentUser");
    let notes = JSON.parse(localStorage.getItem(user + "_notes"));

    notes.splice(i, 1);
    localStorage.setItem(user + "_notes", JSON.stringify(notes));
    displayNotes();
}

// Edit
function editNote(i) {
    let user = localStorage.getItem("currentUser");
    let notes = JSON.parse(localStorage.getItem(user + "_notes"));

    let newNote = prompt("Edit note:", notes[i]);
    notes[i] = newNote;

    localStorage.setItem(user + "_notes", JSON.stringify(notes));
    displayNotes();
}

// Search
function searchNotes() {
    let input = document.getElementById("search").value.toLowerCase();
    let notes = document.querySelectorAll(".note");

    notes.forEach(n => {
        n.style.display = n.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}

// Share (simulate)
function shareNote(note) {
    navigator.clipboard.writeText(note);
    alert("Note copied to clipboard!");
}

// Load notes on dashboard
if (window.location.pathname.includes("dashboard.html")) {
    displayNotes();
}
