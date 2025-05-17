// Qeydiyyat forması üçün funksiyalar 
function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault(); 

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const address = document.getElementById('address').value;


            // Şifrə yoxlaması
            if (password !== confirmPassword) {
                showNotification('Password does not match!', 'error');
                return;
            }

            const response = await fetch("http://localhost:8080/api/v1/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, phoneNumber, password, address }),
                credentials: "include"
            });

            if (response.ok) {
                showNotification("Sign up successful! You can now log in.");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                showNotification("Sign up failed! Please try again.", 'error');
            }

        });
    }
}
document.addEventListener("DOMContentLoaded", function () {
    setupRegisterForm();
});

function showNotification(message, type = 'success') {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
    messageBox.className = type; // "success" və ya "error"
    messageBox.style.display = 'block';

    // Əgər əvvəlki timeout varsa, onu təmizlə (message sürətli dəyişərsə)
    if (messageBox.timeoutId) {
        clearTimeout(messageBox.timeoutId);
    }

    messageBox.timeoutId = setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}



