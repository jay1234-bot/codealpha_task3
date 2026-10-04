/**
 * PIXORA - Premium Responsive Image Gallery
 * Pure Vanilla JS Implementation
 */

// ==========================================================================
// 1. DATA
// ==========================================================================
const galleryData = [
    {
        id: 1,
        title: "Mountain Escape",
        category: "Nature",
        image: "https://picsum.photos/seed/pixora317/1200/800",
        wide: true
    },
    {
        id: 2,
        title: "Urban Canyon",
        category: "Architecture",
        image: "https://picsum.photos/seed/pixora384/1200/800",
        tall: true
    },
    {
        id: 3,
        title: "Vintage Classics",
        category: "Cars",
        image: "https://picsum.photos/seed/pixora526/1200/800"
    },
    {
        id: 4,
        title: "Wanderlust",
        category: "Travel",
        image: "https://picsum.photos/seed/pixora859/1200/800",
        wide: true
    },
    {
        id: 5,
        title: "Neon Streets",
        category: "People",
        image: "https://picsum.photos/seed/pixora277/1200/800",
        tall: true
    },
    {
        id: 6,
        title: "Forest Canopy",
        category: "Nature",
        image: "https://picsum.photos/seed/pixora666/1200/800"
    },
    {
        id: 7,
        title: "Steel Giants",
        category: "Architecture",
        image: "https://picsum.photos/seed/pixora202/1200/800",
        wide: true
    },
    {
        id: 8,
        title: "Speed Demon",
        category: "Cars",
        image: "https://picsum.photos/seed/pixora28/1200/800"
    },
    {
        id: 9,
        title: "Desert Roads",
        category: "Travel",
        image: "https://picsum.photos/seed/pixora483/1200/800",
        tall: true
    },
    {
        id: 10,
        title: "Quiet Moments",
        category: "People",
        image: "https://picsum.photos/seed/pixora17/1200/800"
    },
    {
        id: 11,
        title: "Ocean Breeze",
        category: "Nature",
        image: "https://picsum.photos/seed/pixora728/1200/800",
        wide: true
    },
    {
        id: 12,
        title: "Modern Minimal",
        category: "Architecture",
        image: "https://picsum.photos/seed/pixora278/1200/800"
    },
    {
        id: 13,
        title: "Autumn Road",
        category: "Nature",
        image: "https://picsum.photos/seed/pixora609/1200/800",
        tall: true
    },
    {
        id: 14,
        title: "Concrete Jungle",
        category: "Architecture",
        image: "https://picsum.photos/seed/pixora705/1200/800"
    },
    {
        id: 15,
        title: "Night Rider",
        category: "Cars",
        image: "https://picsum.photos/seed/pixora866/1200/800",
        wide: true
    },
    {
        id: 16,
        title: "Hidden Valley",
        category: "Travel",
        image: "https://picsum.photos/seed/pixora785/1200/800"
    },
    {
        id: 17,
        title: "Candid Smile",
        category: "People",
        image: "https://picsum.photos/seed/pixora921/1200/800",
        tall: true
    },
    {
        id: 18,
        title: "Glacier Peak",
        category: "Nature",
        image: "https://picsum.photos/seed/pixora699/1200/800",
        wide: true
    },
    {
        id: 19,
        title: "Golden Hour",
        category: "Travel",
        image: "https://picsum.photos/seed/pixora501/1200/800"
    },
    {
        id: 20,
        title: "Sleek Details",
        category: "Cars",
        image: "https://picsum.photos/seed/pixora359/1200/800"
    },
    {
        id: 21,
        title: "Urban Angles",
        category: "Architecture",
        image: "https://picsum.photos/seed/pixora720/1200/800",
        tall: true
    },
    {
        id: 22,
        title: "Street Style",
        category: "People",
        image: "https://picsum.photos/seed/pixora752/1200/800"
    },
    {
        id: 23,
        title: "Island Vibes",
        category: "Travel",
        image: "https://picsum.photos/seed/pixora0/1200/800",
        wide: true
    },
    {
        id: 24,
        title: "Foggy Woods",
        category: "Nature",
        image: "https://picsum.photos/seed/pixora326/1200/800",
        tall: true
    }
];

const categories = ["All", "Nature", "Architecture", "Cars", "Travel", "People"];

// ==========================================================================
// 2. STATE & ELEMENTS
// ==========================================================================
let currentCategory = "All";
let filteredImages = [...galleryData];
let currentLightboxIndex = 0;

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const categoriesContainer = document.getElementById('categories');

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxLoader = document.getElementById('lightboxLoader');

// Mobile Menu Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// ==========================================================================
// 3. INITIALIZATION
// ==========================================================================
function init() {
    renderCategories();
    renderGallery();
    bindEvents();
}

// ==========================================================================
// 4. RENDERING LOGIC
// ==========================================================================

/**
 * Render category filter buttons
 */
function renderCategories() {
    categoriesContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === currentCategory ? 'active' : ''}" data-category="${cat}">
            ${cat}
        </button>
    `).join('');
}

/**
 * Render gallery grid based on current filteredImages
 */
function renderGallery() {
    galleryGrid.innerHTML = filteredImages.map((img, index) => {
        let classes = 'gallery-item';
        if (img.wide) classes += ' wide';
        if (img.tall) classes += ' tall';
        
        return `
            <div class="${classes}" data-index="${index}" aria-label="View ${img.title}">
                <img src="${img.image}" alt="${img.title}" loading="lazy">
                <div class="gallery-item-overlay">
                    <div class="item-content">
                        <div class="item-category">${img.category}</div>
                        <h3 class="item-title">${img.title}</h3>
                        <div class="item-view">
                            <i class="ph ph-eye"></i> View
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================================================
// 5. FILTERING
// ==========================================================================
function filterGallery(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });

    // Update state
    if (category === "All") {
        filteredImages = [...galleryData];
    } else {
        filteredImages = galleryData.filter(img => img.category === category);
    }

    // Re-render
    renderGallery();
}

// ==========================================================================
// 6. LIGHTBOX LOGIC
// ==========================================================================

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Reset image slightly for next open
    setTimeout(() => {
        lightboxImg.src = '';
        lightboxImg.classList.remove('loaded');
    }, 300);
}

function updateLightbox() {
    const currentImgData = filteredImages[currentLightboxIndex];
    if (!currentImgData) return;

    // Show loader
    lightboxImg.classList.remove('loaded');
    lightboxLoader.classList.add('active');
    
    // Set text
    lightboxTitle.textContent = currentImgData.title;
    lightboxCategory.textContent = currentImgData.category;
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${filteredImages.length}`;
    
    // Set image and wait for load
    lightboxImg.src = currentImgData.image;
    lightboxImg.alt = currentImgData.title;
    
    lightboxImg.onload = () => {
        lightboxLoader.classList.remove('active');
        lightboxImg.classList.add('loaded');
    };
}

function showNextImage() {
    currentLightboxIndex++;
    if (currentLightboxIndex >= filteredImages.length) {
        currentLightboxIndex = 0; // Loop back
    }
    updateLightbox();
}

function showPreviousImage() {
    currentLightboxIndex--;
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = filteredImages.length - 1; // Loop to end
    }
    updateLightbox();
}

// ==========================================================================
// 7. EVENT LISTENERS
// ==========================================================================
function bindEvents() {
    // Category Filtering
    categoriesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            filterGallery(e.target.dataset.category);
        }
    });

    // Open Lightbox
    galleryGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            const index = parseInt(item.dataset.index, 10);
            openLightbox(index);
        }
    });

    // Lightbox Controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPreviousImage);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
        }
    });

    // Mobile Menu Controls
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileCloseBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Boot up
document.addEventListener('DOMContentLoaded', init);

// View Toggle Logic
const viewGridBtn = document.getElementById('viewGrid');
const viewCompactBtn = document.getElementById('viewCompact');

if (viewGridBtn && viewCompactBtn) {
    viewGridBtn.addEventListener('click', () => {
        galleryGrid.classList.remove('compact');
        viewGridBtn.classList.add('active');
        viewCompactBtn.classList.remove('active');
    });

    viewCompactBtn.addEventListener('click', () => {
        galleryGrid.classList.add('compact');
        viewCompactBtn.classList.add('active');
        viewGridBtn.classList.remove('active');
    });
}
