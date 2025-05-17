// Kitabxana veb saytı üçün əsas JavaScript faylı
document.addEventListener('DOMContentLoaded', function () {
    // Səhifəyə uyğun funksiyaları çağır
    const currentPage = window.location.pathname.split('/').pop();

    // Ümumi tətbiq üçün eventlər
    setupNavigation();
    checkLoginStatus();

    // Səhifəyə uyğun funksiyaları çağır
    if (currentPage === 'index.html' || currentPage === '') {
        setupHomePage();
    } else if (currentPage === 'login.html') {
        setupLoginForm();
    } else if (currentPage === 'register.html') {
        setupRegisterForm();
    } else if (currentPage === 'books.html') {
        loadBooks();
        setupSearchFilter();
    } else if (currentPage === 'profile.html') {
        loadUserProfile();
        loadUserOrders();
    }
});

// Giriş statusunu yoxla və navbar-ı uyğunlaşdır
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userSection = document.querySelector('.user-actions');

    if (userSection) {
        if (isLoggedIn) {
            const username = localStorage.getItem('username');
            userSection.innerHTML = `
                <li><a href="profile.html">Profilim (${username})</a></li>
                <li><button id="logout-btn" class="btn-link">Çıxış</button></li>
            `;

            document.getElementById('logout-btn').addEventListener('click', function () {
                logout();
            });
        } else {
            userSection.innerHTML = `
                <li><a href="login.html">Giriş</a></li>
                <li><a href="register.html">Qeydiyyat</a></li>
            `;
        }
    }
}

// İstifadəçi çıxışı
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');

    // Ana səhifəyə yönləndir
    window.location.href = 'index.html';
}

// Naviqasiya funksiyası
function setupNavigation() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.nav-links');

    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }
}

// Ana səhifə funksiyaları
function setupHomePage() {
    loadFeaturedBooks();
    setupNewsletter();
}

// Populyar kitabları yüklə
function loadFeaturedBooks() {
    const featuredSection = document.querySelector('.featured-books');
    if (!featuredSection) return;

    // Burada əslində server tərəfindən məlumatlar gələcək
    // Mock data ilə nümunə göstəririk
    const featuredBooks = [
        {
            id: 1,
            title: 'Əli və Nino',
            author: 'Qurban Səid',
            cover: 'https://placeholder.com/book1.jpg',
            available: true
        },
        {
            id: 2,
            title: 'İçimizdəki şeytan',
            author: 'Sabahattin Ali',
            cover: 'https://placeholder.com/book2.jpg',
            available: true
        },
        {
            id: 3,
            title: '1984',
            author: 'George Orwell',
            cover: 'https://placeholder.com/book3.jpg',
            available: false
        },
        {
            id: 4,
            title: 'Xəmsə',
            author: 'Nizami Gəncəvi',
            cover: 'https://placeholder.com/book4.jpg',
            available: true
        }
    ];

    let booksHTML = '';
    featuredBooks.forEach(book => {
        booksHTML += `
            <div class="book-card">
                <div class="book-cover">
                    <img src="${book.cover}" alt="${book.title}" onerror="this.src='img/default-book.png'">
                </div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>Müəllif: ${book.author}</p>
                    <p class="availability ${book.available ? 'available' : 'unavailable'}">
                        ${book.available ? 'Mövcuddur' : 'Mövcud deyil'}
                    </p>
                    <a href="books.html?id=${book.id}" class="btn">Ətraflı</a>
                </div>
            </div>
        `;
    });

    featuredSection.innerHTML = booksHTML;
}

// Xəbər bülleteni abunəliyi
function setupNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('newsletter-email').value;
            // Burada e-poçt adresini bazaya göndəriləcək

            showNotification('Xəbər bülteni abunəliyiniz uğurla tamamlandı!', 'success');
            newsletterForm.reset();
        });
    }
}


