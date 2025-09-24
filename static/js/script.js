
class Carousel3D {
    constructor() {
        this.carousel = document.getElementById('carousel');
        this.leftArrow = document.getElementById('leftArrow');
        this.rightArrow = document.getElementById('rightArrow');
        this.sectionIndicator = document.getElementById('currentSection');
        this.sectionDots = document.getElementById('sectionDots');

        this.currentRotation = 0;
        this.sections = ['Home', 'Skills', 'Projects', 'Certifications', 'Contact'];
        this.currentIndex = 0;
        this.isAnimating = false;

        this.init();
        this.updateCarousel();
    }

    init() {
        this.leftArrow.addEventListener('click', () => this.rotateLeft());
        this.rightArrow.addEventListener('click', () => this.rotateRight());

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.rotateLeft();
            if (e.key === 'ArrowRight') this.rotateRight();
        });

        // Dot navigation
        const dots = this.sectionDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSection(index));
        });

        // Touch/swipe controls for mobile
        this.addTouchControls();
        
        // Handle window resize for responsive behavior
        window.addEventListener('resize', () => {
            this.updateCarousel();
        });
    }

    rotateRight() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentRotation -= 72; // 360/5 = 72 degrees per section
        this.currentIndex = (this.currentIndex + 1) % this.sections.length;
        this.updateCarousel();

        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }

    rotateLeft() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentRotation += 72;
        this.currentIndex = (this.currentIndex - 1 + this.sections.length) % this.sections.length;
        this.updateCarousel();

        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }

    goToSection(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        this.isAnimating = true;

        const difference = index - this.currentIndex;
        let rotationChange;

        if (Math.abs(difference) <= 2) {
            rotationChange = -difference * 72;
        } else {
            // Take the shorter path around the circle
            if (difference > 0) {
                rotationChange = -(difference - 5) * 72;
            } else {
                rotationChange = -(difference + 5) * 72;
            }
        }

        this.currentRotation += rotationChange;
        this.currentIndex = index;
        this.updateCarousel();

        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }

    updateCarousel() {
        const isMobile = window.innerWidth <= 480;
        
        if (isMobile) {
            // Mobile: Use simple positioning without 3D transforms
            const panels = document.querySelectorAll('.carousel-panel');
            panels.forEach((panel, index) => {
                if (index === this.currentIndex) {
                    panel.classList.add('front-panel');
                } else {
                    panel.classList.remove('front-panel');
                }
            });
        } else {
            // Desktop: Use 3D carousel
            this.carousel.style.transform = `translate(-50%, -50%) rotateY(${this.currentRotation}deg)`;
            
            // Update front panel styling - make active panel fully visible
            const panels = document.querySelectorAll('.carousel-panel');
            panels.forEach((panel, index) => {
                if (index === this.currentIndex) {
                    panel.classList.add('front-panel');
                } else {
                    panel.classList.remove('front-panel');
                }
            });

            // Add a subtle pulse effect to the active section on desktop
            panels.forEach(panel => panel.style.filter = 'brightness(0.8)');

            setTimeout(() => {
                panels[this.currentIndex].style.filter = 'brightness(1.2)';
                setTimeout(() => {
                    panels[this.currentIndex].style.filter = 'brightness(1)';
                }, 200);
            }, 100);
        }

        // Update section indicator and dots (hidden on mobile via CSS)
        if (this.sectionIndicator) {
            this.sectionIndicator.textContent = this.sections[this.currentIndex];
        }

        // Update dots
        if (this.sectionDots) {
            const dots = this.sectionDots.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
    }

    addTouchControls() {
        this.startX = 0;
        this.endX = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
            console.log('Touch start:', this.startX);
        });

        this.carousel.addEventListener('touchend', (e) => {
            this.endX = e.changedTouches[0].clientX;
            console.log('Touch end:', this.endX);
            this.handleSwipe();
        });

        // Mouse drag support - only on non-front panels
        let isMouseDown = false;
        let mouseStartX = 0;

        this.carousel.addEventListener('mousedown', (e) => {
            // Check if clicking on the front panel
            const frontPanel = document.querySelectorAll('.carousel-panel')[this.currentIndex];
            const rect = frontPanel.getBoundingClientRect();
            const clickX = e.clientX;
            const clickY = e.clientY;
            
            // If clicking on front panel area, don't start drag
            if (clickX >= rect.left && clickX <= rect.right && 
                clickY >= rect.top && clickY <= rect.bottom) {
                return;
            }
            
            isMouseDown = true;
            mouseStartX = e.clientX;
            this.carousel.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
        });

        document.addEventListener('mouseup', (e) => {
            if (!isMouseDown) return;
            isMouseDown = false;
            this.carousel.style.cursor = 'grab';

            const mouseEndX = e.clientX;
            const diff = mouseStartX - mouseEndX;

            if (Math.abs(diff) > 80) {
                if (diff > 0) {
                    this.rotateRight();
                } else {
                    this.rotateLeft();
                }
            }
        });
    }

    handleSwipe() {
        const diff = this.startX - this.endX;
        console.log('Swipe diff:', diff, 'startX:', this.startX, 'endX:', this.endX);
        
        if (Math.abs(diff) > 80) { // Minimum swipe distance
            console.log('Swipe detected!', diff > 0 ? 'Left swipe (next)' : 'Right swipe (prev)');
            if (diff > 0) {
                this.rotateRight(); // Swipe left, rotate right
            } else {
                this.rotateLeft(); // Swipe right, rotate left
            }
        } else {
            console.log('Swipe too short:', Math.abs(diff));
        }
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    new Carousel3D();
});