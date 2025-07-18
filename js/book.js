// book.js - Appointment Booking with Firebase
import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Check if user is authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // User is not logged in, redirect to login page
        alert("Please log in to book an appointment.");
        window.location.href = "login.html"; // Adjust path as needed
        return;
    }
    
    // User is logged in, initialize the booking form
    initializeBookingForm(user);
});

function initializeBookingForm(user) {
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    // Get the form element
    const appointmentForm = document.getElementById('appointmentForm');
    
    // Pre-fill user email if available
    const emailInput = document.getElementById('email');
    if (user.email) {
        emailInput.value = user.email;
    }
    
    // Add event listener for form submission
    appointmentForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form data
        const formData = new FormData(appointmentForm);
        const appointmentData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            date: formData.get('date'),
            time: formData.get('time')
        };
        
        // Basic validation
        if (!appointmentData.name || !appointmentData.email || !appointmentData.phone || 
            !appointmentData.date || !appointmentData.time) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(appointmentData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(appointmentData.phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Date validation - ensure date is not in the past
        const selectedDate = new Date(appointmentData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        
        if (selectedDate < today) {
            alert('Please select a future date.');
            return;
        }
        
        // Show loading state
        const submitButton = appointmentForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Booking...';
        submitButton.disabled = true;
        
        try {
            // Prepare data for Firestore
            const appointmentDoc = {
                userId: user.uid,
                userEmail: user.email,
                patientName: appointmentData.name,
                patientEmail: appointmentData.email,
                patientPhone: appointmentData.phone,
                appointmentDate: appointmentData.date,
                appointmentTime: appointmentData.time,
                status: 'pending', // Can be 'pending', 'confirmed', 'cancelled'
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };
            
            // Save to Firestore
            const docRef = await addDoc(collection(db, 'appointments'), appointmentDoc);
            
            console.log('Appointment booked with ID:', docRef.id);
            
            // Store appointment ID in sessionStorage for confirmation page
            sessionStorage.setItem('lastAppointmentId', docRef.id);
            
            // Redirect to success page
            window.location.href = 'Appointsuccess.html';
            
        } catch (error) {
            console.error('Error booking appointment:', error);
            
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show error message
            let errorMessage = 'Failed to book appointment. Please try again.';
            
            if (error.code === 'permission-denied') {
                errorMessage = 'You do not have permission to book appointments.';
            } else if (error.code === 'unavailable') {
                errorMessage = 'Service temporarily unavailable. Please try again later.';
            }
            
            alert(errorMessage);
        }
    });
}

// Add logout functionality (optional)
window.logoutUser = function() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
}