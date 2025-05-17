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
