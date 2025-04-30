// script.js - Updated for Google Apps Script

// --- Paste your Deployed Google Apps Script Web App URL here ---
const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzXrqQTwUeHsqQLqvppERgMiZBlw-cvUtB9JBpVKobDO0ZXbJY_6BQB8wyV_oFbiLeX/exec';
// ---------------------------------------------------------------

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

async function handleSubmit(event) {
    event.preventDefault(); // Prevent default browser submission
    formStatus.textContent = 'Sending...'; // Provide feedback
    formStatus.className = 'mt-4 text-center text-sm text-gray-400'; // Reset classes

    const formData = new FormData(form);
    const data = {};
    // Convert FormData to a plain object expected by Apps Script JSON parsing
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Simple check for required fields (HTML5 required attribute handles most cases)
    if (!data.name || !data.email || !data.service_interest || !data.message) {
         formStatus.textContent = "Please fill out all required fields.";
         formStatus.className = 'mt-4 text-center text-sm error';
         return; // Stop submission if basic validation fails
    }

    try {
        const response = await fetch(googleScriptUrl, {
        method: 'POST',
        // Send data as a stringified JSON payload
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'text/plain;charset=utf-8', // Use text/plain for simple doPost parsing
        },
         mode: 'cors' // Ensure CORS is handled correctly if needed, often default works
        });

        // Check if response is ok (status 200-299)
        // Google Apps Script web apps might redirect on success, handle carefully
        // A simple check for ok status might suffice if script returns simple text
        // For JSON response, we need to parse it. Let's assume it might redirect or return JSON
        if (response.ok) {
             try {
                 // Try parsing JSON, maybe script returns {result: 'success'}
                 const result = await response.json();
                 if (result.result === 'success') {
                    formStatus.textContent = "Thanks for your message! We'll be in touch soon.";
                    formStatus.className = 'mt-4 text-center text-sm success';
                    form.reset();
                 } else {
                    // Got JSON but it indicates an error
                    console.error('Apps Script Error:', result.error);
                    formStatus.textContent = "Oops! There was a problem submitting your form (server error).";
                    formStatus.className = 'mt-4 text-center text-sm error';
                 }
             } catch (jsonError) {
                  // Response was ok, but not JSON (maybe redirect or simple text)
                  // Assume success in this case for simplicity with potential redirects
                 formStatus.textContent = "Thanks for your message! We'll be in touch soon.";
                 formStatus.className = 'mt-4 text-center text-sm success';
                 form.reset();
                 console.log("Response OK, but not JSON:", jsonError);
             }

        } else {
             // Handle HTTP errors (e.g., 404, 500)
            console.error('HTTP Error:', response.status, response.statusText);
            formStatus.textContent = `Oops! There was an HTTP problem: ${response.statusText}`;
            formStatus.className = 'mt-4 text-center text-sm error';
        }


    } catch (error) {
        // Handle network errors (e.g., no internet, DNS issues)
        console.error('Fetch Network Error:', error);
        formStatus.textContent = "Oops! There was a network problem submitting your form.";
        formStatus.className = 'mt-4 text-center text-sm error';
    }
}

// Attach the handler to the form's submit event
form.addEventListener("submit", handleSubmit);


// --- Optional: Smooth Scroll for Navigation Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});