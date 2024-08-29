function toggleNavLinks() {
    const navLinks = document.querySelector('.nav-links');
    const mainContent = document.querySelector('.main-content');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        mainContent.style.zIndex = '1';
    } else {
        navLinks.style.display = 'flex';
        mainContent.style.zIndex = '-1';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const mainImage = document.querySelector('.main-image img');
    const slideImages = document.querySelectorAll('.image-slides img');
    const dotsContainer = document.querySelector('.dots');

    const mainImageSources = [
        'assets/review1.PNG',
        'assets/review2.PNG',
        'assets/review3.PNG',
        'assets/review4.PNG',
        'assets/review5.PNG'
    ];
    const slideImageSources = [
        'assets/review2.PNG',
        'assets/review3.PNG',
        'assets/review4.PNG',
        'assets/review5.PNG',
        'assets/review6.PNG'
    ];

    let currentIndex = 0;

    function createDots() {
        slideImageSources.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = index;
            if (index === currentIndex) {
                dot.classList.add('active');
            }
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dots span');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateImages() {
        if (currentIndex >= 0 && currentIndex < mainImageSources.length) {
            mainImage.classList.add('hidden');
            setTimeout(() => {
                mainImage.src = mainImageSources[currentIndex];
                mainImage.onload = () => {
                    mainImage.classList.remove('hidden');
                };
            }, 500);

            slideImages.forEach((img, index) => {
                const slideIndex = (currentIndex + index) % slideImageSources.length;
                img.src = slideImageSources[slideIndex];
            });

            updateDots();
            currentIndex = (currentIndex + 1) % mainImageSources.length;
        }
    }

    function handleDotClick(event) {
        if (event.target.classList.contains('dot')) {
            currentIndex = parseInt(event.target.dataset.index, 10);
            updateImages();
        }
    }

    function handleNavLinkClick() {
        const navLinks = document.querySelector('.nav-links');
        const mainContent = document.querySelector('.main-content');
        navLinks.style.display = 'none';
        mainContent.style.zIndex = '1';
    }

    createDots();
    updateImages();
    setInterval(updateImages, 3000);

    dotsContainer.addEventListener('click', handleDotClick);

    slideImages.forEach((img) => {
        img.addEventListener('click', () => {
            mainImage.classList.add('hidden');
            setTimeout(() => {
                mainImage.src = img.src;
                mainImage.onload = () => {
                    mainImage.classList.remove('hidden');
                };
            }, 500);

            const clickedIndex = slideImageSources.indexOf(img.src);
            if (clickedIndex !== -1) {
                currentIndex = clickedIndex;
                updateImages();
            }
        });
    });

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const animatedElements = document.querySelectorAll('.animate');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
