import { auth } from './firebase.js';
import {
  signInWithEmailAndPassword,
  updatePassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('changePasswordForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Grab form values
    const email = document.getElementById('username').value.trim();
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Grab error fields
    const usernameError = document.getElementById('usernameError');
    const currentPasswordError = document.getElementById('currentPasswordError');
    const newPasswordError = document.getElementById('newPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Clear previous errors
    usernameError.textContent = '';
    currentPasswordError.textContent = '';
    newPasswordError.textContent = '';
    confirmPasswordError.textContent = '';

    let isValid = true;

    // Validations
    if (!email) {
      usernameError.textContent = 'Email is required.';
      isValid = false;
    }

    if (!currentPassword) {
      currentPasswordError.textContent = 'Current password is required.';
      isValid = false;
    }

    if (newPassword.length < 8) {
      newPasswordError.textContent = 'New password must be at least 8 characters.';
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      confirmPasswordError.textContent = 'Passwords do not match.';
      isValid = false;
    }

    if (!isValid) return;

    try {
      // Re-authenticate the user
      const userCredential = await signInWithEmailAndPassword(auth, email, currentPassword);
      const user = userCredential.user;

      // Update the password
      await updatePassword(user, newPassword);

      alert("Password updated successfully!");
      window.location.href = "Home.html";

    } catch (error) {
      console.error("Error changing password:", error);

      switch (error.code) {
        case 'auth/user-not-found':
          usernameError.textContent = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          currentPasswordError.textContent = 'Incorrect current password.';
          break;
        case 'auth/too-many-requests':
          alert('Too many failed attempts. Please try again later.');
          break;
        case 'auth/weak-password':
          newPasswordError.textContent = 'Password is too weak.';
          break;
        default:
          alert('Password update failed. Please try again.');
      }
    }
  });
});
