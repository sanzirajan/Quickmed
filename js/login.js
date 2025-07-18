// login.js - Fixed version
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const usernameOrEmail = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Basic validation
  if (!usernameOrEmail || !password) {
    showError("Please fill in all fields.");
    return;
  }

  // Check if input looks like an email
  if (!usernameOrEmail.includes('@')) {
    showError("Please enter a valid email address.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, usernameOrEmail, password);
    alert("Login successful!");
    window.location.href = "Home.html"; // Fixed: should go to Home.html, not Book.html
  } catch (err) {
    console.error("Login error:", err);
    let errorMessage = "Login failed. Please check your credentials.";
    
    // Handle specific Firebase errors
    if (err.code === 'auth/user-not-found') {
      errorMessage = "No account found with this email address.";
    } else if (err.code === 'auth/wrong-password') {
      errorMessage = "Incorrect password.";
    } else if (err.code === 'auth/invalid-email') {
      errorMessage = "Please enter a valid email address.";
    } else if (err.code === 'auth/too-many-requests') {
      errorMessage = "Too many failed login attempts. Please try again later.";
    }
    
    showError(errorMessage);
  }
});

function showError(message) {
  const errBox = document.getElementById('loginErrorMessage');
  errBox.innerText = message;
  errBox.style.display = 'block';
  
  // Hide error after 5 seconds
  setTimeout(() => {
    errBox.style.display = 'none';
  }, 5000);
}