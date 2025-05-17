// İstifadəçi profili yüklə
function loadUserProfile() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    const username = localStorage.getItem('username');
    const profileInfo = document.querySelector('.profile-info');

    if (profileInfo) {
        // Demo məqsədilə istifadəçi məlumatları
        profileInfo.innerHTML = `
            <h2>Profilim</h2>
            <div class="profile-details">
                <p><strong>İstifadəçi adı:</strong> ${username}</p>
                <p><strong>E-poçt:</strong> ${username}@example.com</p>
                <p><strong>Üzvlük tarixi:</strong> 01.01.2023</p>
                <button id="edit-profile-btn" class="btn">Profili redaktə et</button>
            </div>
        `;

        // Profil redaktəsi düyməsi
        const editProfileBtn = document.getElementById('edit-profile-btn');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', function () {
                showProfileEditForm();
            });
        }
    }
}

// Profil redaktə formunu göstər
function showProfileEditForm() {
    const profileInfo = document.querySelector('.profile-info');
    const username = localStorage.getItem('username');

    const currentHTML = profileInfo.innerHTML;

    profileInfo.innerHTML = `
        <h2>Profilimi redaktə et</h2>
        <form id="edit-profile-form" class="profile-form">
            <div class="form-group">
                <label for="edit-fullname">Ad Soyad</label>
                <input type="text" id="edit-fullname" name="fullname" value="İstifadəçi" required>
            </div>
            <div class="form-group">
                <label for="edit-email">E-poçt</label>
                <input type="email" id="edit-email" name="email" value="${username}@example.com" required>
            </div>
            <div class="form-group">
                <label for="edit-password">Yeni şifrə (dəyişmək istəsəniz)</label>
                <input type="password" id="edit-password" name="password">
            </div>
            <div class="form-group">
                <label for="edit-confirm-password">Şifrəni təsdiq et</label>
                <input type="password" id="edit-confirm-password" name="confirm-password">
            </div>
            <div class="form-actions">
                <button type="submit" class="btn">Yadda saxla</button>
                <button type="button" id="cancel-edit" class="btn btn-secondary">Ləğv et</button>
            </div>
        </form>
    `;

    // Ləğv düyməsi
    const cancelEditBtn = document.getElementById('cancel-edit');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function () {
            profileInfo.innerHTML = currentHTML;

            // Redaktə düyməsini yenidən aktivləşdir
            const editProfileBtn = document.getElementById('edit-profile-btn');
            if (editProfileBtn) {
                editProfileBtn.addEventListener('click', function () {
                    showProfileEditForm();
                });
            }
        });
    }

    // Form təsdiqi
    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const password = document.getElementById('edit-password').value;
            const confirmPassword = document.getElementById('edit-confirm-password').value;

            // Şifrə yoxlaması
            if (password && password !== confirmPassword) {
                showNotification('Şifrələr uyğun gəlmir!', 'error');
                return;
            }

            // Burada əslində serverə sorğu göndəriləcək
            // Demo məqsədilə uğurlu yeniləmə etdiyimizi düşünək

            showNotification('Profil məlumatlarınız yeniləndi!', 'success');

            // Profil məlumatlarını yenidən göstər
            setTimeout(() => {
                loadUserProfile();
            }, 1000);
        });
    }
}

// İstifadəçinin sifarişlərini yüklə
function loadUserOrders() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    const ordersContainer = document.querySelector('.orders-container');

    if (ordersContainer) {
        // Demo məqsədilə sifarişlər
        const orders = [
            {
                id: 'ORD-2023-001',
                bookTitle: 'Əli və Nino',
                orderDate: '2023-05-15',
                returnDate: '2023-05-29',
                status: 'active'
            },
            {
                id: 'ORD-2023-002',
                bookTitle: 'Xəmsə',
                orderDate: '2023-04-10',
                returnDate: '2023-04-24',
                status: 'returned'
            },
            {
                id: 'ORD-2023-003',
                bookTitle: 'Cinayət və Cəza',
                orderDate: '2023-06-01',
                returnDate: '2023-06-15',
                status: 'active'
            }
        ];

        if (orders.length === 0) {
            ordersContainer.innerHTML = '<p class="no-results">Heç bir sifariş tapılmadı</p>';
            return;
        }

        let ordersHTML = `
            <h2>Sifarişlərim</h2>
            <table class="orders-table">
                <thead>
                    <tr>
                        <th>Sifariş №</th>
                        <th>Kitab</th>
                        <th>Sifariş tarixi</th>
                        <th>Qaytarma tarixi</th>
                        <th>Status</th>
                        <th>Əməliyyat</th>
                    </tr>
                </thead>
                <tbody>
        `;

        orders.forEach(order => {
            const statusClass = order.status === 'active' ? 'status-active' : 'status-returned';
            const statusText = order.status === 'active' ? 'Aktiv' : 'Qaytarılıb';

            ordersHTML += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.bookTitle}</td>
                    <td>${order.orderDate}</td>
                    <td>${order.returnDate}</td>
                    <td><span class="order-status ${statusClass}">${statusText}</span></td>
                    <td>
                        ${order.status === 'active' ?
                    `<button class="btn btn-sm return-book" data-id="${order.id}">Qaytar</button>` :
                    ''}
                    </td>
                </tr>
            `;
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    setupLoginForm();
    updateNavbarVisibility();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});