// Login forması üçün funksiyalar 
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch("http://localhost:8080/api/v1/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                    credentials: "include"
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        localStorage.setItem('refreshToken', data.refreshToken);
                        showNotification("Login successful!");

                        setTimeout(() => {
                            window.location.href = "books.html"; // əsas səhifəyə yönləndir
                        }, 1000);
                    } else {
                        showNotification("Login uğursuz oldu", "error");
                    }
                } else {
                    showNotification("Login failed! Please try again.", "error");
                }
            } catch (error) {
                showNotification("Xəta baş verdi", "error");
                console.error(error);
            }
        });
    }
}

// Navbarda linkləri idarə et
function updateNavbarVisibility() {
    const token = localStorage.getItem('token');
    document.getElementById('login-link')?.classList.toggle('hidden', !!token);
    document.getElementById('register-link')?.classList.toggle('hidden', !!token);
    document.getElementById('account-link')?.classList.toggle('hidden', !token);
    document.getElementById('logout-link')?.classList.toggle('hidden', !token);
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
    setupLoginForm();
    updateNavbarVisibility();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
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

