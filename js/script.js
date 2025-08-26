// Funcionalidades principales
document.addEventListener('DOMContentLoaded', function() {
    initializeToggles();
    initializeNewsFilter();
    initializeSmoothScrolling();
    initializeAnimations();
    loadExternalNews();
});

// Toggle mejorado para más información
function initializeToggles() {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.target);
            const isVisible = target.style.display === 'block';
            
            // Animación suave
            if (isVisible) {
                target.style.opacity = '0';
                setTimeout(() => {
                    target.style.display = 'none';
                }, 300);
            } else {
                target.style.display = 'block';
                setTimeout(() => {
                    target.style.opacity = '1';
                }, 10);
            }
            
            // Cambiar texto del botón
            btn.textContent = isVisible ? 'Más información' : 'Menos información';
        });
    });
}

// Filtro de noticias por categoría
function initializeNewsFilter() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'news-filter';
    filterContainer.innerHTML = `
        <h3>Filtrar por categoría:</h3>
        <div class="filter-buttons">
                    <button class="filter-btn active" data-category="all">Todas</button>
        <button class="filter-btn" data-category="pandemia">Pandemia</button>
        <button class="filter-btn" data-category="redes">Redes Sociales</button>
        </div>
    `;
    
    const newsSection = document.getElementById('noticias');
    newsSection.insertBefore(filterContainer, document.getElementById('news-list'));
    
    // Eventos de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            filterNews(category);
            
            // Actualizar botones activos
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// Función para filtrar noticias
function filterNews(category) {
    const newsItems = document.querySelectorAll('#news-list li');
    
    newsItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

// Navegación suave
function initializeSmoothScrolling() {
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animaciones al hacer scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Cargar noticias externas con más categorías
function loadExternalNews() {
    const newsList = document.getElementById('news-list');
    const noticias = [
        { 
            title: "OMS: Infodemia y COVID-19", 
            url: "https://www.who.int/health-topics/infodemic#tab=tab_1",
            category: "pandemia",
            description: "La OMS alerta sobre la infodemia y cómo combatir la desinformación durante la pandemia"
        },
        { 
            title: "MIT: Las noticias falsas se propagan más rápido", 
            url: "https://news.mit.edu/2018/study-twitter-false-news-travels-faster-true-stories-0308",
            category: "redes",
            description: "Estudio del MIT que demuestra que las fake news se propagan 6 veces más rápido"
        },
        { 
            title: "Chequeado: Fact-checking en español", 
            url: "https://chequeado.com",
            category: "redes",
            description: "Plataforma líder en verificación de noticias en español"
        },
        { 
            title: "BBC: Cómo identificar noticias falsas", 
            url: "https://www.bbc.com/mundo/noticias-45561204",
            category: "redes",
            description: "Guía práctica de la BBC para detectar desinformación"
        },
        { 
            title: "FactCheck.org: Verificación de noticias", 
            url: "https://www.factcheck.org",
            category: "redes",
            description: "Organización sin fines de lucro dedicada a verificar declaraciones públicas"
        }
    ];

    // Limpiar lista existente
    newsList.innerHTML = '';
    
    noticias.forEach(noticia => {
        const li = document.createElement('li');
        li.dataset.category = noticia.category;
        li.innerHTML = `
            <a href="${noticia.url}" target="_blank" class="news-title">${noticia.title}</a>
            <p class="news-description">${noticia.description}</p>
            <span class="news-category">${noticia.category}</span>
        `;
        newsList.appendChild(li);
    });
}

// Función para mostrar estadísticas en tiempo real
function showStats() {
    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats-container';
    statsContainer.innerHTML = `
        <h3>Estadísticas de Desinformación</h3>
        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-number">64%</span>
                <span class="stat-label">de usuarios comparten sin verificar (MIT, 2018)</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">6x</span>
                <span class="stat-label">más rápido se propagan las fake news (MIT, 2018)</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">70%</span>
                <span class="stat-label">de usuarios confían más en noticias que confirman sus creencias (Reuters, 2023)</span>
            </div>
        </div>
    `;
    
    const inicioSection = document.getElementById('inicio');
    inicioSection.appendChild(statsContainer);
}

// Llamar a las estadísticas después de un delay
setTimeout(showStats, 2000);
