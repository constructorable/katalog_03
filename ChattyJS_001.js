        // Firebase-Dienste importieren
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
        import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
        import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

        // Firebase-Konfiguration
    const _0x7a91 = ["AIzaSyDpsXkabP5ZqwQKKo8TtKpVDNpkn0e0JJg", "chatty001-d105c.firebaseapp.com", "https://chatty001-d105c-default-rtdb.europe-west1.firebasedatabase.app", "chatty001-d105c", "chatty001-d105c.firebasestorage.app", "819043103543", "1:819043103543:web:e93fadc09274a84970e0b2"];

    const _0x7a91 = {
        apiKey: _0x7a91[0],  // apiKey direkt zugewiesen, ohne Manipulation
        authDomain: _0x7a91[1],
        databaseURL: _0x7a91[2],
        projectId: _0x7a91[3],
        storageBucket: _0x7a91[4],
        messagingSenderId: _0x7a91[5],
        appId: _0x7a91[6]
    };

        // Firebase initialisieren
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        const storage = getStorage(app);
        const chatRef = ref(database, "chat");

        // Benutzername aus dem localStorage laden oder festlegen
        let username = localStorage.getItem("username") || "Anonymer Besucher";
        if (!username) {
            username = prompt("Ihr Name:", "Benutzer") || "Anonym";
            localStorage.setItem("username", username);
        }

        // Cookie-Wert auslesen
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
            return null;
        }

        // Nachricht beim Laden der Seite senden
        async function sendVisitMessage() {
            const timestamp = new Date().toISOString();
            let ipAddress = "Unbekannt";

            // IP-Adresse abrufen
            try {
                const response = await fetch("https://api.ipify.org?format=json");
                const data = await response.json();
                ipAddress = data.ip;
            } catch (error) {
                console.error("IP-Adresse konnte nicht abgerufen werden:", error);
            }

            // Benutzername aus Cookie lesen
            let username = getCookie("username");
            if (!username) {
                username = "Unbekannter Benutzer";
            }

        }

        // Nachricht senden, wenn die Seite geladen wird
        window.addEventListener("load", () => {
            sendVisitMessage();
        });




        // DOM-Elemente
        const messagesDiv = document.getElementById("messages");
        const messageInput = document.getElementById("messageInput");
        const sendMessageButton = document.getElementById("sendMessage");
        const changeUsernameButton = document.getElementById("changeUsername");
        const imageInput = document.getElementById("imageInput");
        const uploadImageButton = document.getElementById("uploadImage");


        // Passwortabfrage
        const passwordContainer = document.getElementById("passwordContainer");
        const chatContainer = document.getElementById("chatContainer");
        const passwordInput = document.getElementById("passwordInput");
        const passwordButton = document.getElementById("passwordButton");
        const correctPassword = "123";

        // Passwortabfrage
        passwordButton.addEventListener("click", () => {
            const password = passwordInput.value;
            if (password === correctPassword) {
                passwordContainer.style.display = "none";  // Passwortbereich ausblenden
                chatContainer.style.display = "flex";      // Chat anzeigen

                // Kleine Verzögerung, um sicherzustellen, dass der gesamte Chat geladen wurde
                setTimeout(scrollToBottom, 300);  // Warten Sie 300ms, bevor Sie zum neuesten Eintrag scrollen
            } else {
                alert("Falsches Passwort. Bitte versuchen Sie es erneut.");
                passwordInput.value = "";  // Eingabefeld leeren
            }
        });

        // Nachricht senden
        sendMessageButton.addEventListener("click", () => {
            const message = messageInput.value.trim();
            if (message && username) {
                push(chatRef, {
                    text: message,
                    username: username,
                    timestamp: new Date().toISOString()
                });
                messageInput.value = ""; // Eingabefeld leeren
            } else {
                alert("Nachricht und Benutzername erforderlich.");
            }
        });

        // Bild hochladen
        uploadImageButton.addEventListener("click", () => {
            const file = imageInput.files[0];
            if (file) {
                const imageRef = storageRef(storage, `images/${Date.now()}_${file.name}`);
                uploadBytes(imageRef, file).then(snapshot => {
                    return getDownloadURL(snapshot.ref);
                }).then(url => {
                    // Bild-URL als Nachricht in die Datenbank schreiben
                    push(chatRef, {
                        text: `<img src='${url}' alt='Hochgeladenes Bild' style='max-width: 200px;'>`,
                        username: username,
                        timestamp: new Date().toISOString()
                    });
                    /* alert("Bild erfolgreich hochgeladen."); */
                }).catch(error => {
                    console.error("Fehler beim Hochladen des Bildes:", error);
                });
            } else {
                alert("Bitte wählen Sie ein Bild aus.");
            }
        });

        // Benutzernamen ändern
        changeUsernameButton.addEventListener("click", () => {
            const newUsername = prompt("Neuen Namen eingeben:", username);
            if (newUsername) {
                username = newUsername;
                localStorage.setItem("username", username);
                alert(`Ihr Benutzername wurde zu "${username}" geändert.`);
            }
        });

        // Beim Hinzufügen der Nachricht den Klick-Handler für Bilder hinzufügen
        onChildAdded(chatRef, (snapshot) => {
            const data = snapshot.val();
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");

            const time = new Date(data.timestamp).toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit"
            });

            // Prüfen, ob es sich um ein Bild handelt
            if (data.text.includes('<img')) {
                // Bild anzeigen und Klick-Event für das Bild hinzufügen
                const imageUrl = data.text.match(/src='(.*?)'/)[1];
                messageDiv.innerHTML = `<span>${data.username} (${time}):</span> <span class="chat-image"><img src="${imageUrl}" alt="Bild" style="max-width: 200px;"></span>`;

                // Event-Listener hinzufügen, um das Modal zu öffnen
                messageDiv.querySelector("img").addEventListener("click", () => openModal(imageUrl));
            } else {
                messageDiv.innerHTML = `<span>${data.username} (${time}):</span> ${data.text}`;
            }

            messagesDiv.appendChild(messageDiv);

            // Scrollen zum letzten Eintrag
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });


        // Sofort beim Laden zum letzten Eintrag scrollen
        window.addEventListener('load', () => {
            setTimeout(scrollToBottom, 500);
        });


        // Funktion, um zum neuesten Chat-Eintrag zu scrollen
        function scrollToBottom() {
            const messagesDiv = document.getElementById("messages");
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        // Modal öffnen
        function openModal(imageUrl) {
            const modal = document.getElementById("imageModal");
            const modalImage = document.getElementById("modalImage");
            modal.style.display = "flex"; // Modal sichtbar machen
            modalImage.src = imageUrl; // Bild im Modal setzen
        }

        // Modal schließen
        const closeModalButton = document.getElementById("closeModal");
        closeModalButton.addEventListener("click", () => {
            const modal = document.getElementById("imageModal");
            modal.style.display = "none"; // Modal schließen
        });

        // Wenn man außerhalb des Bildes klickt, Modal schließen
        window.addEventListener("click", (event) => {
            const modal = document.getElementById("imageModal");
            if (event.target === modal) {
                modal.style.display = "none"; // Modal schließen
            }
        });

        // Dynamische Größenanpassung bei Eingabe
        const textarea = document.getElementById("messageInput");

        textarea.addEventListener("input", () => {
            textarea.style.height = "auto"; // Zurücksetzen der Höhe, um die korrekte Höhe zu berechnen
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Höhe anpassen, aber max. 200px
        });
