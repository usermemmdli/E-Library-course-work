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

// Giriş forması üçün funksiyalar
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Burada əslində serverlə əlaqə quraraq giriş yoxlaması ediləcək
            // Demo məqsədlərilə sadə yoxlama edirik
            if (username && password) {
                // Giriş uğurlu (əslində server cavabı əsasında)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('userId', '123'); // Demo ID

                showNotification('Giriş uğurlu!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showNotification('İstifadəçi adı və ya şifrə yanlışdır!', 'error');
            }
        });
    }
}

// Qeydiyyat forması üçün funksiyalar
function setupRegisterForm() {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Şifrə yoxlaması
            if (password !== confirmPassword) {
                showNotification('Şifrələr uyğun gəlmir!', 'error');
                return;
            }

            // Burada əslində serverlə əlaqə quraraq qeydiyyat ediləcək
            // Demo məqsədlərilə uğurlu qeydiyyat etdiyimizi düşünək
            showNotification('Qeydiyyat uğurla tamamlandı!', 'success');

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
}

// Kitabları yüklə
function loadBooks() {
    const booksContainer = document.querySelector('.books-container');
    if (!booksContainer) return;

    // Burada əslində server tərəfindən məlumatlar gələcək
    // Mock data ilə nümunə göstəririk
    const books = [
        {
            id: 1,
            title: 'Əli və Nino',
            author: 'Qurban Səid',
            genre: 'Roman',
            year: 1937,
            cover: 'https://placeholder.com/book1.jpg',
            available: true,
            description: 'Azərbaycan ədəbiyyatının şah əsərlərindən biri, Bakıda keçən bir məhəbbət hekayəsi.'
        },
        {
            id: 2,
            title: 'İçimizdəki şeytan',
            author: 'Sabahattin Ali',
            genre: 'Roman',
            year: 1940,
            cover: 'https://placeholder.com/book2.jpg',
            available: true,
            description: 'İnsan xarakterini və cəmiyyəti kəskin tənqid edən bir əsər.'
        },
        {
            id: 3,
            title: '1984',
            author: 'George Orwell',
            genre: 'Distopiya',
            year: 1949,
            cover: 'https://placeholder.com/book3.jpg',
            available: false,
            description: 'Totalitar cəmiyyəti təsvir edən məşhur distopik roman.'
        },
        {
            id: 4,
            title: 'Xəmsə',
            author: 'Nizami Gəncəvi',
            genre: 'Poeziya',
            year: 1200,
            cover: 'https://placeholder.com/book4.jpg',
            available: true,
            description: 'Nizami Gəncəvinin beş məşhur poemasından ibarət əsəri.'
        },
        {
            id: 5,
            title: 'Dədə Qorqud',
            author: 'Naməlum',
            genre: 'Dastan',
            year: 1300,
            cover: 'https://placeholder.com/book5.jpg',
            available: true,
            description: 'Oğuz türklərinin məşhur dastanı.'
        },
        {
            id: 6,
            title: 'Cinayət və Cəza',
            author: 'Fyodor Dostoyevski',
            genre: 'Roman',
            year: 1866,
            cover: 'https://placeholder.com/book6.jpg',
            available: true,
            description: 'Psixoloji və fəlsəfi mövzuları işləyən məşhur roman.'
        }
    ];

    displayBooks(books, booksContainer);
}

// Kitabları göstər
function displayBooks(books, container) {
    let booksHTML = '';

    if (books.length === 0) {
        container.innerHTML = '<p class="no-results">Heç bir kitab tapılmadı</p>';
        return;
    }

    books.forEach(book => {
        booksHTML += `
            <div class="book-card" data-id="${book.id}">
                <div class="book-cover">
                    <img src="${book.cover}" alt="${book.title}" onerror="this.src='img/default-book.png'">
                </div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>Müəllif: ${book.author}</p>
                    <p>Janr: ${book.genre}</p>
                    <p>İl: ${book.year}</p>
                    <p class="availability ${book.available ? 'available' : 'unavailable'}">
                        ${book.available ? 'Mövcuddur' : 'Mövcud deyil'}
                    </p>
                    <p class="book-description">${book.description.substring(0, 100)}${book.description.length > 100 ? '...' : ''}</p>
                    <div class="book-actions">
                        <button class="btn view-details" data-id="${book.id}">Ətraflı</button>
                        ${book.available ? `<button class="btn order-book" data-id="${book.id}">Sifariş et</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = booksHTML;

    // Kitab detalları üçün hadisə dinləyicisi
    const viewButtons = document.querySelectorAll('.view-details');
    viewButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const bookId = this.getAttribute('data-id');
            showBookDetails(bookId);
        });
    });

    // Kitab sifarişi üçün hadisə dinləyicisi
    const orderButtons = document.querySelectorAll('.order-book');
    orderButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const bookId = this.getAttribute('data-id');
            orderBook(bookId);
        });
    });
}

// Kitab axtarışı və filtrləmə
function setupSearchFilter() {
    const searchForm = document.getElementById('search-form');
    const filterGenre = document.getElementById('filter-genre');
    const filterAvailability = document.getElementById('filter-availability');

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            filterBooks();
        });
    }

    if (filterGenre) {
        filterGenre.addEventListener('change', filterBooks);
    }

    if (filterAvailability) {
        filterAvailability.addEventListener('change', filterBooks);
    }
}

// Kitabların filtrləməsi
function filterBooks() {
    const searchTerm = document.getElementById('search-term').value.toLowerCase();
    const filterGenre = document.getElementById('filter-genre').value;
    const filterAvailability = document.getElementById('filter-availability').value;

    const booksContainer = document.querySelector('.books-container');

    // Burada əslində serverə sorğu göndəriləcək
    // Demo məqsədlərilə yenidən kitabları yükləyib filtrdən keçiririk

    // Əvvəlcə bütün kitabları alaraq
    const books = [
        // Eyni mock data yuxarıda olduğu kimi
        {
            id: 1,
            title: 'Əli və Nino',
            author: 'Qurban Səid',
            genre: 'Roman',
            year: 1937,
            cover: 'https://placeholder.com/book1.jpg',
            available: true,
            description: 'Azərbaycan ədəbiyyatının şah əsərlərindən biri, Bakıda keçən bir məhəbbət hekayəsi.'
        },
        {
            id: 2,
            title: 'İçimizdəki şeytan',
            author: 'Sabahattin Ali',
            genre: 'Roman',
            year: 1940,
            cover: 'https://placeholder.com/book2.jpg',
            available: true,
            description: 'İnsan xarakterini və cəmiyyəti kəskin tənqid edən bir əsər.'
        },
        {
            id: 3,
            title: '1984',
            author: 'George Orwell',
            genre: 'Distopiya',
            year: 1949,
            cover: 'https://placeholder.com/book3.jpg',
            available: false,
            description: 'Totalitar cəmiyyəti təsvir edən məşhur distopik roman.'
        },
        {
            id: 4,
            title: 'Xəmsə',
            author: 'Nizami Gəncəvi',
            genre: 'Poeziya',
            year: 1200,
            cover: 'https://placeholder.com/book4.jpg',
            available: true,
            description: 'Nizami Gəncəvinin beş məşhur poemasından ibarət əsəri.'
        },
        {
            id: 5,
            title: 'Dədə Qorqud',
            author: 'Naməlum',
            genre: 'Dastan',
            year: 1300,
            cover: 'https://placeholder.com/book5.jpg',
            available: true,
            description: 'Oğuz türklərinin məşhur dastanı.'
        },
        {
            id: 6,
            title: 'Cinayət və Cəza',
            author: 'Fyodor Dostoyevski',
            genre: 'Roman',
            year: 1866,
            cover: 'https://placeholder.com/book6.jpg',
            available: true,
            description: 'Psixoloji və fəlsəfi mövzuları işləyən məşhur roman.'
        }
    ];

    // Filtrləmə prosesi
    const filteredBooks = books.filter(book => {
        // Axtarış termini ilə yoxla
        const matchesSearch = searchTerm === '' ||
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.description.toLowerCase().includes(searchTerm);

        // Janr filtri ilə yoxla
        const matchesGenre = filterGenre === 'all' || book.genre === filterGenre;

        // Mövcudluq filtri ilə yoxla
        const matchesAvailability = filterAvailability === 'all' ||
            (filterAvailability === 'available' && book.available) ||
            (filterAvailability === 'unavailable' && !book.available);

        return matchesSearch && matchesGenre && matchesAvailability;
    });

    // Filtrələnmiş kitabları göstər
    displayBooks(filteredBooks, booksContainer);
}

// Kitab haqqında ətraflı məlumat göstər
function showBookDetails(bookId) {
    // Burada əslində server tərəfindən kitab haqqında ətraflı məlumat gətiriləcək
    // Demo məqsədilə mock data istifadə edirik
    const books = [
        // Eyni kitab nümunələri yuxarıda olduğu kimi
    ];

    const book = books.find(b => b.id == bookId) || {
        id: bookId,
        title: 'Kitab #' + bookId,
        author: 'Müəllif məlumatı',
        genre: 'Janr məlumatı',
        year: 2020,
        cover: 'https://placeholder.com/book' + bookId + '.jpg',
        available: true,
        description: 'Bu kitab haqqında ətraflı məlumat.'
    };

    // Modal pəncərə yarat
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="book-details">
                <div class="book-cover">
                    <img src="${book.cover}" alt="${book.title}" onerror="this.src='img/default-book.png'">
                </div>
                <div class="book-info">
                    <h2>${book.title}</h2>
                    <p><strong>Müəllif:</strong> ${book.author}</p>
                    <p><strong>Janr:</strong> ${book.genre}</p>
                    <p><strong>İl:</strong> ${book.year}</p>
                    <p class="availability ${book.available ? 'available' : 'unavailable'}">
                        <strong>Status:</strong> ${book.available ? 'Mövcuddur' : 'Mövcud deyil'}
                    </p>
                    <div class="book-description">
                        <h3>Haqqında:</h3>
                        <p>${book.description}</p>
                    </div>
                    ${book.available ? `<button class="btn order-book" data-id="${book.id}">Sifariş et</button>` : ''}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Modal bağlanması
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function () {
        document.body.removeChild(modal);
    });

    // Modal xaricində kliklə bağlanma
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Sifariş düyməsinə hadisə əlavə et
    const orderBtn = modal.querySelector('.order-book');
    if (orderBtn) {
        orderBtn.addEventListener('click', function () {
            const bookId = this.getAttribute('data-id');
            orderBook(bookId);
        });
    }
}

// Kitab sifarişi
function orderBook(bookId) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
        showNotification('Sifariş etmək üçün daxil olmalısınız!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }

    // Burada əslində serverə sifariş göndəriləcək
    // Demo məqsədilə uğurlu sifariş etdiyimizi düşünək

    showNotification('Kitab sifarişiniz qəbul edildi!', 'success');

    // Profil səhifəsinə yönləndir
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1500);
}

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

document.getElementById("searchBtn").addEventListener("click", function () {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const books = document.querySelectorAll(".book-item");

    books.forEach(book => {
        const title = book.querySelector("h3").textContent.toLowerCase();
        if (title.includes(input)) {
            book.style.display = "block";
        } else {
            book.style.display = "none";
        }
    });
});

// Enter düyməsi ilə də işləməsi üçün
document.getElementById("searchInput").addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        document.getElementById("searchBtn").click();
    }
});
