// MIRAI Car Dealership Landing Page JavaScript with Trilingual Support

// Translations object
const translations = {
    en: {
        tagline: "Premium Used & New Car Dealership",
        "brands-title": "Our Trusted Brands",
        "about-title": "About Us",
        "about-text": "MIRAI is committed to providing high-quality new and used vehicles with exceptional customer service.",
        "leadership-title": "Our Leadership Team",
        "contact-info-title": "Contact Information",
        email: "Email"
    },
    ar: {
        tagline: "معرض سيارات جديدة ومستعملة ممتازة",
        "brands-title": "علاماتنا الموثوقة",
        "about-title": "من نحن",
        "about-text": "تلتزم MIRAI بتقديم سيارات جديدة ومستعملة عالية الجودة مع خدمة عملاء استثنائية.",
        "leadership-title": "فريق القيادة لدينا",
        "contact-info-title": "معلومات الاتصال",
        email: "البريد الإلكتروني"
    },
    ja: {
        tagline: "高品質な新車・中古車ディーラー",
        "brands-title": "信頼できる取扱ブランド",
        "about-title": "会社概要",
        "about-text": "MIRAIは高品質な新車・中古車と卓越したカスタマーサービスを提供します。",
        "leadership-title": "経営陣",
        "contact-info-title": "お問い合わせ情報",
        email: "メール"
    }
};

// Current language state
let currentLanguage = 'en';

// Language switching functionality
function switchLanguage(lang) {
    console.log('Switching to language:', lang);
    currentLanguage = lang;
    
    // Update document direction for RTL support
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-translate]');
    console.log('Found translatable elements:', translatableElements.length);
    
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        console.log('Translating key:', key, 'to:', lang);
        
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
            console.log('Updated text to:', translations[lang][key]);
        }
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Store language preference (with fallback for environments without localStorage)
    try {
        if (typeof Storage !== 'undefined') {
            localStorage.setItem('preferred-language', lang);
        }
    } catch (e) {
        console.log('Language preference stored in memory only');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing MIRAI application...');
    
    // Initialize language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log('Found language buttons:', langButtons.length);
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            switchLanguage(lang);
        });
    });
    
    // Load saved language preference or default to English
    let savedLanguage = 'en';
    try {
        if (typeof Storage !== 'undefined') {
            savedLanguage = localStorage.getItem('preferred-language') || 'en';
        }
    } catch (e) {
        console.log('Using default language');
    }
    
    if (['en', 'ar', 'ja'].includes(savedLanguage)) {
        switchLanguage(savedLanguage);
    } else {
        switchLanguage('en');
    }
    
    // Smooth scrolling for any anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effects for sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Initialize sections with fade-in effect
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Make hero section visible immediately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

    // Ensure brand logos are not clickable and add hover effect
    const brandLogos = document.querySelectorAll('.brand-logo');
    brandLogos.forEach(logo => {
        // Remove any potential click handlers and prevent navigation
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        
        // Ensure parent elements are also not clickable
        const parentBrandItem = logo.closest('.brand-item');
        if (parentBrandItem) {
            parentBrandItem.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }
        
        // Add image loading error handling
        logo.addEventListener('error', function() {
            this.alt = this.alt + ' (Logo unavailable)';
            this.style.opacity = '0.5';
        });
    });

    // Add loading animation for brand logos
    const brandItems = document.querySelectorAll('.brand-item');
    brandItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        
        // Stagger the animation
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Enhanced contact link interactions
    const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease-out';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            const rate = scrolled * -0.3;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            heroTitle.textContent += originalText[charIndex];
            charIndex++;
            
            if (charIndex >= originalText.length) {
                clearInterval(typingInterval);
                // Add cursor blink effect briefly
                heroTitle.style.borderRight = '3px solid white';
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }, 150);
    }

    // Console greeting message with multilingual support
    const greetings = {
        en: '🚗 Welcome to MIRAI Car Dealership! 🚗',
        ar: '🚗 أهلاً بكم في معرض سيارات MIRAI! 🚗',
        ja: '🚗 MIRAI自動車販売店へようこそ！ 🚗'
    };
    
    console.log(greetings[currentLanguage] || greetings.en);
    console.log('Premium Used & New Cars | Contact: miraiboeki@gmail.com');

    // Performance optimization: Lazy load images that are not initially visible
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Handle RTL layout adjustments
    const handleRTLLayout = () => {
        const isRTL = document.documentElement.dir === 'rtl';
        const languageSwitcher = document.querySelector('.language-switcher');
        
        if (isRTL && languageSwitcher) {
            languageSwitcher.style.left = 'var(--space-20)';
            languageSwitcher.style.right = 'auto';
        } else if (languageSwitcher) {
            languageSwitcher.style.right = 'var(--space-20)';
            languageSwitcher.style.left = 'auto';
        }
    };

    // Listen for language changes to update RTL layout
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
                handleRTLLayout();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['dir']
    });

    // Initialize RTL layout
    handleRTLLayout();
    
    console.log('MIRAI application initialized successfully');
});

// Utility function to handle any form submissions (if added later)
function handleFormSubmission(formData) {
    // This function can be extended later if contact forms are added
    console.log('Form submission handler ready');
}

// Error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        e.target.style.opacity = '0.5';
        e.target.alt = e.target.alt + ' (Loading error)';
    }
}, true);

// Export functions for potential external use
window.MiraiApp = {
    switchLanguage,
    getCurrentLanguage: () => currentLanguage,
    getAvailableLanguages: () => Object.keys(translations)
};