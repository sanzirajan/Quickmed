// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard loaded successfully!');
    // You can add more JavaScript functionality here later,
    // e.g., fetching user data, dynamic content updates, charts, etc.

    // Example: Display a welcome message with a fetched username (placeholder)
    const userName = "QuickMed User"; // In a real app, this would come from the server after login
    const welcomeMessage = document.querySelector('.dashboard-container h2');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${userName}!`;
    }
});