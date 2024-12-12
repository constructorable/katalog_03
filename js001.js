// js001.js

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
