// Firebase SDK importieren
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBolS5VlHPmiGkYPw_Xayywsur0fH9P1Sg",
  authDomain: "database001-8841d.firebaseapp.com",
  databaseURL: "https://database001-8841d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "database001-8841d",
  storageBucket: "database001-8841d.firebasestorage.app",
  messagingSenderId: "326018053620",
  appId: "1:326018053620:web:1fa8e15e5caf74c928b5a1",
  measurementId: "G-R70VZK42PF"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/* // Event-Listener für den Button
document.getElementById('startButton').addEventListener('click', function() {
  const overlay = document.getElementById('overlay');
  overlay.style.transition = 'opacity 0.5s ease'; // Weicher Übergang
  overlay.style.opacity = '0'; // Transparenz einstellen

  // Nach dem Übergang das Overlay vollständig entfernen
  setTimeout(() => {
      overlay.style.display = 'none';
  }, 500); // Timeout auf die gleiche Dauer wie die Transition setzen
}); */


// Funktion zur Generierung des Zeitstempels im Format YYYYMMDD_HHMMSS
function generateTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');  // Monat von 0-11, daher +1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

// Event-Listener für das Formular-Submit
document.getElementById('dataForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Verhindert das automatische Neuladen der Seite

  // Holen Sie sich die Werte der Felder
  const starRating = document.querySelector('input[name="rating"]:checked')?.value;
  const radioButtonValue1 = document.querySelector('input[name="category"]:checked')?.value;
  const dropdownValue1 = document.getElementById('dropdown').value;
  const dropdownValue2 = document.getElementById('dropdown2').value;
  const radioButtonValue2 = document.querySelector('input[name="additionalCategory"]:checked')?.value;
  const radioButtonValue3 = document.querySelector('input[name="category2"]:checked')?.value;
  const commentValue = document.getElementById('comment').value;
  const timestamp = generateTimestamp(); // Generiere den Zeitstempel

    // Sicherstellen, dass alle erforderlichen Felder ausgefüllt sind
    if (starRating && radioButtonValue1 && dropdownValue1 && dropdownValue2 && radioButtonValue2 && radioButtonValue3 && commentValue) {
      // Speichern der Daten in Firebase
      const newRef = ref(database, 'FormularDaten/' + timestamp);
      set(newRef, {
          GrundgedankeStars: starRating,
          vorne_hinten_beide: radioButtonValue1,
          laenge: dropdownValue1,
          dicke: dropdownValue2,
          offen_halten: radioButtonValue2,
          ganz_rein_raus: radioButtonValue3,
          Kommentar: commentValue,
          timestamp: timestamp,
      }).then(() => {
          showAlert("Daten erfolgreich gespeichert!", "success");
          document.getElementById('dataForm').reset(); // Formular zurücksetzen
      }).catch((error) => {
          showAlert("Fehler beim Speichern der Daten: " + error.message, "error");
      });
  } else {
      showAlert("Bitte füllen Sie alle Felder aus!", "error");
  }
});

// Funktion zur Anzeige der Alerts
function showAlert(message, type) {
  const alertContainer = document.getElementById('alert-container');
  const alertDiv = document.createElement('div');
  
  alertDiv.classList.add('alert');
  if (type === "success") {
    alertDiv.classList.add('success');
  }
  alertDiv.textContent = message;
  
  alertContainer.innerHTML = '';  // Alte Benachrichtigungen entfernen
  alertContainer.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.remove();  // Benachrichtigung nach 5 Sekunden entfernen
  }, 5000);
}



