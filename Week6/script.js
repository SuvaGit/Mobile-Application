import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, set, ref, get, update, remove } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "mobile-19567.firebaseapp.com",
  projectId: "mobile-19567",
  storageBucket: "mobile-19567.firebasestorage.app",
  messagingSenderId: "19894918385",
  appId: "1:19894918385:web:2d39933bb17d7317c65d50",
  measurementId: "G-X9WYLMS5PJ"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
function getFormData() {
  return {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    country: document.getElementById("country").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
    date: document.getElementById("date").value
  };
}
function addContact() {
  const contactId = document.getElementById("contactId").value;

  set(ref(db, "contacts/" + contactId), getFormData())
    .then(() => {
      document.getElementById("result").innerText = "Contact added successfully";
    });
}
function readContact() {
  const contactId = document.getElementById("contactId").value;

  get(ref(db, "contacts/" + contactId)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      document.getElementById("name").value = data.name;
      document.getElementById("email").value = data.email;
      document.getElementById("phone").value = data.phone;
      document.getElementById("address").value = data.address;
      document.getElementById("city").value = data.city;
      document.getElementById("country").value = data.country;
      document.getElementById("subject").value = data.subject;
      document.getElementById("message").value = data.message;
      document.getElementById("date").value = data.date;

      document.getElementById("result").innerText = "Contact fetched successfully";
    } else {
      document.getElementById("result").innerText = "No contact found";
    }
  });
}

function updateContact() {
  const contactId = document.getElementById("contactId").value;

  update(ref(db, "contacts/" + contactId), getFormData())
    .then(() => {
      document.getElementById("result").innerText = "Contact updated successfully";
    });
}

function deleteContact() {
  const contactId = document.getElementById("contactId").value;

  remove(ref(db, "contacts/" + contactId))
    .then(() => {
      document.getElementById("result").innerText = "Contact deleted successfully";
    });
}

window.addContact = addContact;
window.readContact = readContact;
window.updateContact = updateContact;
window.deleteContact = deleteContact;