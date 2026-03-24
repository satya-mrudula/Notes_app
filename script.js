// REGISTER
function register() {
  let u = regUser.value;
  let p = regPass.value;

  if (!u || !p) return alert("Fill all fields");

  localStorage.setItem(u, p);
  alert("Account created");
  window.location.href = "login.html";
}

// LOGIN
function login() {
  let u = loginUser.value;
  let p = loginPass.value;

  if (localStorage.getItem(u) === p) {
    localStorage.setItem("currentUser", u);
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong credentials");
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// ADD NOTE
function addNote() {
  let user = localStorage.getItem("currentUser");
  let notes = JSON.parse(localStorage.getItem(user+"_notes")) || [];

  notes.push(noteInput.value);
  localStorage.setItem(user+"_notes", JSON.stringify(notes));
  noteInput.value = "";

  displayNotes();
}

// DISPLAY
function displayNotes() {
  let user = localStorage.getItem("currentUser");
  let notes = JSON.parse(localStorage.getItem(user+"_notes")) || [];

  notesContainer.innerHTML = "";

  notes.forEach((n, i) => {
    notesContainer.innerHTML += `
      <div class="note">
        ${n}
        <br>
        <button onclick="editNote(${i})">Edit</button>
        <button onclick="deleteNote(${i})">Delete</button>
        <button onclick="shareNote('${n}')">Share</button>
      </div>
    `;
  });
}

// DELETE
function deleteNote(i) {
  let user = localStorage.getItem("currentUser");
  let notes = JSON.parse(localStorage.getItem(user+"_notes"));

  notes.splice(i,1);
  localStorage.setItem(user+"_notes", JSON.stringify(notes));
  displayNotes();
}

// EDIT
function editNote(i) {
  let user = localStorage.getItem("currentUser");
  let notes = JSON.parse(localStorage.getItem(user+"_notes"));

  let updated = prompt("Edit:", notes[i]);
  notes[i] = updated;

  localStorage.setItem(user+"_notes", JSON.stringify(notes));
  displayNotes();
}

// SEARCH
function searchNotes() {
  let val = search.value.toLowerCase();
  document.querySelectorAll(".note").forEach(n=>{
    n.style.display = n.innerText.toLowerCase().includes(val) ? "block":"none";
  });
}

// SHARE
function shareNote(n) {
  navigator.clipboard.writeText(n);
  alert("Copied!");
}

// CLEAR ALL
function clearAll() {
  let user = localStorage.getItem("currentUser");
  localStorage.removeItem(user+"_notes");
  displayNotes();
}

// AUTO LOAD
if (window.location.pathname.includes("dashboard.html")) {
  displayNotes();
}
