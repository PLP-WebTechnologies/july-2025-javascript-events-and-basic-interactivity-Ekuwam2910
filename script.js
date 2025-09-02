// Update slider value display
const sliderInput = document.getElementById('sliderInput');
const sliderValue = document.getElementById('sliderValue');

sliderInput.addEventListener('input', () => {
    sliderValue.textContent = sliderInput.value;
});

// Button click counter feature
const clickButton = document.getElementById('clickButton');
const clickCountDisplay = document.getElementById('clickCount');
let clickCount = 0;

clickButton.addEventListener('click', () => {
    clickCount++;
    clickCountDisplay.textContent = clickCount;
});

// Custom form validation logic
const form = document.getElementById('registrationForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Clear previous errors and messages
    clearErrors();
    document.getElementById('formMessages').textContent = '';

    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    let isValid = true;

    // Username validation: required and length
    if (username.length < 3 || username.length > 15) {
        showError('usernameError', 'Username must be between 3 and 15 characters.');
        isValid = false;
    }

    // Simple email format validation
    if (!validateEmail(email)) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
    }

    // Password validation: minimum 8 chars, at least 1 number, 1 uppercase, 1 lowercase
    if (!validatePassword(password)) {
        showError('passwordError', 'Password must be at least 8 characters, include a number, uppercase and lowercase letter.');
        isValid = false;
    }

    // Confirm password matches password
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match.');
        isValid = false;
    }

    if (isValid) {
        document.getElementById('formMessages').textContent = 'Registration successful!';
        document.getElementById('formMessages').style.color = 'green';
        // Here you could send the form data via AJAX or reset the form, etc.
        form.reset();
        sliderValue.textContent = sliderInput.value; // reset slider display if used elsewhere
        clickCount = 0;
        clickCountDisplay.textContent = clickCount;
    } else {
        document.getElementById('formMessages').textContent = 'Please fix the errors above.';
        document.getElementById('formMessages').style.color = 'red';
    }
});

// Helpers

// Show error message in specified element
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
}

// Clear all error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.textContent = '');
}

// Email validation function with basic regex
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Password validation function
function validatePassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
}
