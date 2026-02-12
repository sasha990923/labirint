// Создание частиц фона
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные начальные позиции
        const left = Math.random() * 100;
        const top = Math.random() * 100 + 100; // Начинаем ниже экрана
        const size = Math.random() * 3 + 2;
        const color = getRandomColor();
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Случайный пастельный цвет
function getRandomColor() {
    const colors = [
        'rgba(255, 184, 233, 0.3)',
        'rgba(138, 214, 255, 0.3)',
        'rgba(168, 255, 195, 0.3)',
        'rgba(255, 216, 168, 0.3)',
        'rgba(214, 168, 255, 0.3)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Создание предпросмотра лабиринта
function createMazePreview() {
    const mazePreview = document.getElementById('mazePreview');
    const size = 8;
    
    // Простой алгоритм лабиринта
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const cell = document.createElement('div');
            
            // Создаем границы и случайные стены
            if (x === 0 || y === 0 || x === size - 1 || y === size - 1) {
                cell.className = 'maze-cell wall';
            } else if (Math.random() > 0.7) {
                cell.className = 'maze-cell wall';
            } else {
                cell.className = 'maze-cell path';
            }
            
            // Старт и финиш
            if (x === 1 && y === 1) {
                cell.className = 'maze-cell start';
            } else if (x === size - 2 && y === size - 2) {
                cell.className = 'maze-cell finish';
            }
            
            mazePreview.appendChild(cell);
        }
    }
}

// Обработка навигации
function setupNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Управление попапом
function setupPopup() {
    const playButtons = [
        document.getElementById('playNowBtn'),
        ...document.querySelectorAll('.play-btn'),
        ...document.querySelectorAll('.nav-play-btn')
    ];
    
    const popup = document.getElementById('playPopup');
    const closePopup = document.getElementById('closePopup');
    
    // Открытие попапа
    playButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                popup.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    // Закрытие попапа
    closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Закрытие по клику вне попапа
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Анимации при скролле
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.feature-card, .highlight-box, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// Статистика с анимацией
function animateStats() {
    const stats = document.querySelectorAll('.stat-number, .stat-large');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue + (stat.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
            }
        }, stepTime);
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createMazePreview();
    setupNavigation();
    setupPopup();
    setupScrollAnimations();
    
    // Запуск анимации статистики после небольшой задержки
    setTimeout(animateStats, 500);
    
    // Анимация для галереи
    const galleryMazes = document.querySelectorAll('.gallery-maze');
    galleryMazes.forEach(maze => {
        const size = 5;
        
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const cell = document.createElement('div');
                cell.style.backgroundColor = Math.random() > 0.6 ? 'rgba(255, 255, 255, 0.3)' : 'transparent';
                cell.style.borderRadius = '2px';
                maze.appendChild(cell);
            }
        }
    });
});