// signin.js
import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.getElementById('registrationForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("pswd").value.trim();

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const userId = cred.user.uid;

    const userData = {
      firstName: document.getElementById("fname").value,
      lastName: document.getElementById("lname").value,
      parentGuardianName: document.getElementById("pgname").value,
      dob: document.getElementById("dob").value,
      country: document.getElementById("country").value,
      state: document.getElementById("state").value,
      city: document.getElementById("city").value,
      houseStreet: document.getElementById("hsno").value,
      phone: document.getElementById("phno").value,
      altPhone: document.getElementById("alno").value,
      email
    };

    await setDoc(doc(db, "users", userId), userData);
    alert("Registration successful!");
    window.location.href = "Login.html";
  } catch (err) {
    alert("Error: " + err.message);
  }
});
