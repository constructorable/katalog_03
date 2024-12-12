// js001.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Firebase-Konfiguration
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

// Formular und UI-Elemente
const postForm = document.getElementById('postForm');
const postText = document.getElementById('postText');
const statusMessage = document.getElementById('statusMessage');

// Event Listener für das Hochladen eines Beitrags
postForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Verhindert das Standard-Submit-Verhalten

    const text = postText.value.trim(); // Text aus dem Textarea extrahieren

    if (text) {
        try {
            // Referenz zur Firebase-Datenbank
            const postsRef = ref(database, 'posts');

            // Einen neuen Beitrag mit push() hinzufügen
            const newPostRef = push(postsRef);

            // Text und Zeitstempel in Firebase speichern
            await set(newPostRef, {
                text: text,
                timestamp: new Date().toISOString() // Zeitstempel
            });

            // Erfolgreiche Nachricht
            statusMessage.style.color = 'green';
            statusMessage.textContent = 'Beitrag erfolgreich hochgeladen!';
            postText.value = ''; // Textfeld zurücksetzen

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

// Beiträge von Firebase laden
function loadPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = ''; // Vorherige Posts löschen

    const postsRef = ref(database, 'posts');
    get(postsRef).then(snapshot => {
        if (snapshot.exists()) {
            const posts = snapshot.val();
            for (let postId in posts) {
                const post = posts[postId];
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3>${post.text}</h3>
                    <p>Timestamp: ${post.timestamp}</p>
                    <button onclick="showMessage('Kommentar hinzufügen für: ${post.text}')">Kommentar hinzufügen</button>
                `;
                postsContainer.appendChild(postElement);
            }
        } else {
            postsContainer.innerHTML = '<p>Keine Beiträge gefunden.</p>';
        }
    }).catch(error => {
        console.error("Fehler beim Laden der Beiträge: ", error);
    });
}

// Beispiel für eine Funktion, die eine Nachricht anzeigt
function showMessage(message) {
    alert(message);
}

// Diese Funktion leitet zur User-Seite weiter
function redirectToUser() {
    window.location.href = 'https://constructorable.github.io/katalog_03/user.html';
}

// Diese Funktion leitet zur Admin-Seite weiter
function redirectToAdmin() {
    window.location.href = 'https://constructorable.github.io/katalog_03/admin.html';
}

// Diese Funktion zeigt Beiträge im Admin-Bereich an
function loadAdminPosts() {
    const adminPostsContainer = document.getElementById('admin-posts');
    adminPostsContainer.innerHTML = ''; // Vorherige Beiträge löschen

    const postsRef = ref(database, 'posts');
    get(postsRef).then(snapshot => {
        if (snapshot.exists()) {
            const posts = snapshot.val();
            for (let postId in posts) {
                const post = posts[postId];
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3>${post.text}</h3>
                    <p>Timestamp: ${post.timestamp}</p>
                    <button onclick="editPost('${postId}')">Bearbeiten</button>
                    <button onclick="deletePost('${postId}')">Löschen</button>
                `;
                adminPostsContainer.appendChild(postElement);
            }
        } else {
            adminPostsContainer.innerHTML = '<p>Keine Beiträge gefunden.</p>';
        }
    }).catch(error => {
        console.error("Fehler beim Laden der Admin-Beiträge: ", error);
    });
}

// Bearbeiten eines Beitrags
function editPost(postId) {
    showMessage(`Beitrag "${postId}" bearbeiten.`);
}

// Löschen eines Beitrags
function deletePost(postId) {
    const postRef = ref(database, 'posts/' + postId);
    set(postRef, null) // Löscht den Beitrag
        .then(() => {
            showMessage(`Beitrag "${postId}" wurde gelöscht.`);
            loadAdminPosts(); // Beiträge nach dem Löschen neu laden
        })
        .catch(error => {
            console.error("Fehler beim Löschen des Beitrags: ", error);
            showMessage(`Fehler beim Löschen des Beitrags: ${error.message}`);
        });
}

// Beiträge beim Laden der Seite anzeigen
window.onload = loadPosts;
