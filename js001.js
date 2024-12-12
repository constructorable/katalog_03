// js001.js

 <script type="module">
         
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
        import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
        import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";
      

        const firebaseConfig = {
            apiKey: "AIzaSyB3f-7rNLiqLvDJ0GZY3rkNd34oxLuAg90",
            authDomain: "simom002.firebaseapp.com",
            databaseURL: "https://simom002-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "simom002",
            storageBucket: "simom002.firebasestorage.app",
            messagingSenderId: "174254147862",
            appId: "1:174254147862:web:3506bdbcf8a0d4d8d96837"
        };

        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app);
        const database = getDatabase(app);

        // Formular zum Hochladen eines Beitrags
        const postForm = document.getElementById('postForm');
        const postText = document.getElementById('postText');
        const statusMessage = document.getElementById('statusMessage');

// Event Listener für das Formular
    postForm.addEventListener('submit', async (event) => {
        event.preventDefault();  // Verhindert das normale Absenden des Formulars

        const text = postText.value.trim();  // Text aus dem Textarea extrahieren

        if (text) {
            try {
                // Referenz auf den "posts"-Knoten in der Firebase-Datenbank
                const postsRef = ref(database, 'posts');

                // Einen neuen Beitrag mit push() hinzufügen
                const newPostRef = push(postsRef);
                
                // Den Text und den Zeitstempel setzen
                await set(newPostRef, {
                    text: text,
                    timestamp: new Date().toISOString()  // Zeitstempel für den Beitrag
                });

                // Erfolgsnachricht
                statusMessage.style.color = 'green';
                statusMessage.textContent = 'Beitrag erfolgreich hochgeladen!';
                postText.value = '';  // Textfeld zurücksetzen

            } catch (error) {
                console.error("Fehler beim Hochladen des Beitrags: ", error);
                statusMessage.style.color = 'red';
                statusMessage.textContent = `Fehler: ${error.message}`;
            }
        } else {
            statusMessage.style.color = 'red';
            statusMessage.textContent = 'Bitte geben Sie einen Text ein!';
        }
    });


// Diese Funktion leitet zur User-Seite weiter
function redirectToUser() {
  window.location.href = 'https://constructorable.github.io/katalog_03/user.html';
}

// Diese Funktion leitet zur Admin-Seite weiter
function redirectToAdmin() {
  window.location.href = 'https://constructorable.github.io/katalog_03/admin.html';
}

// Diese Funktion zeigt eine Nachricht an (z.B. als Alert für User)
function showMessage(message) {
  alert(message);
}

// Diese Funktion zeigt Beiträge dynamisch an (dies könnte später mit Firebase oder einer API ergänzt werden)
function loadPosts() {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';  // Vorherige Posts löschen

  // Beispiel-Daten (diese Daten können später dynamisch geladen werden)
  const posts = [
    { title: "Erster Beitrag", content: "Dies ist der erste Beitrag." },
    { title: "Zweiter Beitrag", content: "Dies ist der zweite Beitrag." },
    { title: "Dritter Beitrag", content: "Dies ist der dritte Beitrag." }
  ];

  // Beiträge dynamisch hinzufügen
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="showMessage('Kommentar hinzufügen für: ${post.title}')">Kommentar hinzufügen</button>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Diese Funktion lädt Beiträge für den Admin-Bereich
function loadAdminPosts() {
  const adminPostsContainer = document.getElementById('admin-posts');
  adminPostsContainer.innerHTML = '';  // Vorherige Beiträge löschen

  // Beispiel-Daten (dies könnte später durch eine API oder Firebase ersetzt werden)
  const adminPosts = [
    { title: "Admin Beitrag 1", content: "Verwaltung der Beiträge." },
    { title: "Admin Beitrag 2", content: "Admin-Features hier." }
  ];

  // Admin Beiträge dynamisch hinzufügen
  adminPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="editPost('${post.title}')">Bearbeiten</button>
      <button onclick="deletePost('${post.title}')">Löschen</button>
    `;
    adminPostsContainer.appendChild(postElement);
  });
}

// Diese Funktion wird aufgerufen, um einen Beitrag zu bearbeiten
function editPost(postTitle) {
  showMessage(`Beitrag "${postTitle}" bearbeiten.`);
}

// Diese Funktion wird aufgerufen, um einen Beitrag zu löschen
function deletePost(postTitle) {
  showMessage(`Beitrag "${postTitle}" gelöscht.`);
}

// Hier können zusätzliche Funktionen für Kommentare, Formulare und Validierungen hinzugefügt werden
<script>
