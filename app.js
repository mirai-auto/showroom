// Language switching functionality
const translations = {
  en: {
    hero_title: "MIRAI Premium Vehicles",
    hero_subtitle: "Quality Used Cars, New Vehicles, and More You Can Trust",
    phone: "Phone",
    email: "Email",
    get_started: "Get Started Today",
    trusted_brands: "Trusted Automotive Brands",
    about_title: "About MIRAI Dealership",
    about_description: "We are MIRAI, a trusted dealership committed to providing quality vehicles and machinery to our customers. With years of experience in the automotive industry, we carefully inspect every vehicle to ensure reliability and customer satisfaction.",
    leadership_title: "Our Leadership Team",
    contact_title: "Contact Information",
    contact_description: "Get in touch with MIRAI for quality vehicles and professional service.",
    our_services: "Our Services",
    ceo_title: "Chief Executive Officer",
    email_contact: "Email Contact",
    services: [
      "Quality Used Cars",
      "Certified Pre-owned Vehicles", 
      "New Cars",
      "Bikes",
      "Bicycles", 
      "Heavy Machinery",
      "Financing Options"
    ]
  },
  ar: {
    hero_title: "ميراي للمركبات المميزة",
    hero_subtitle: "سيارات مستعملة عالية الجودة ومركبات جديدة والمزيد يمكنك الوثوق به",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    get_started: "ابدأ اليوم",
    trusted_brands: "علامات تجارية موثوقة للسيارات",
    about_title: "حول وكالة ميراي",
    about_description: "نحن ميراي، وكالة موثوقة ملتزمة بتوفير مركبات وآلات عالية الجودة لعملائنا. مع سنوات من الخبرة في صناعة السيارات، نقوم بفحص كل مركبة بعناية لضمان الموثوقية ورضا العملاء.",
    leadership_title: "فريق القيادة لدينا",
    contact_title: "معلومات الاتصال",
    contact_description: "تواصل مع ميراي للحصول على مركبات عالية الجودة وخدمة مهنية.",
    our_services: "خدماتنا",
    ceo_title: "الرئيس التنفيذي",
    email_contact: "الاتصال عبر البريد الإلكتروني",
    services: [
      "سيارات مستعملة عالية الجودة",
      "مركبات مستعملة معتمدة",
      "سيارات جديدة", 
      "دراجات نارية",
      "دراجات هوائية",
      "آلات ثقيلة",
      "خيارات التمويل"
    ]
  },
  ja: {
    hero_title: "MIRAI プレミアム車両",
    hero_subtitle: "信頼できる高品質な中古車、新車など",
    phone: "電話",
    email: "メール",
    get_started: "今すぐ始める",
    trusted_brands: "信頼できる自動車ブランド",
    about_title: "MIRAIディーラーについて",
    about_description: "私たちMIRAIは、お客様に高品質な車両と機械を提供することにコミットした信頼できるディーラーです。自動車業界での長年の経験により、信頼性とお客様の満足度を確保するために、すべての車両を慎重に検査しています。",
    leadership_title: "リーダーシップチーム",
    contact_title: "お問い合わせ先",
    contact_description: "高品質な車両とプロフェッショナルなサービスについては、MIRAIまでお気軽にお問い合わせください。",
    our_services: "私たちのサービス",
    ceo_title: "最高経営責任者",
    email_contact: "メール連絡先",
    services: [
      "高品質中古車",
      "認定中古車",
      "新車",
      "バイク", 
      "自転車",
      "重機",
      "融資オプション"
    ]
  }
};

let currentLanguage = 'en';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('MIRAI Dealership App Initialized');
  
  // Setup language switching
  setupLanguageSwitching();
  
  // Setup smooth scrolling
  setupSmoothScrolling();
  
  // Add brand logo animations
  observeBrandLogos();
  
  // Setup accessibility features
  setupAccessibility();
  
  // Setup logo interaction
  setupLogoInteraction();
  
  // Initialize with English
  currentLanguage = 'en';
  updateActiveLanguageButton('en');
  
  console.log('All systems initialized successfully');
});

// Language switching setup
function setupLanguageSwitching() {
  const langButtons = document.querySelectorAll('.lang-btn');
  
  langButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const newLang = this.getAttribute('data-lang');
      console.log('Language button clicked:', newLang);
      if (newLang && newLang !== currentLanguage) {
        switchLanguage(newLang);
      }
    });
  });
}

// Switch language function
function switchLanguage(lang) {
  if (!translations[lang]) {
    console.error('Translation not found for language:', lang);
    return;
  }
  
  console.log('Switching to language:', lang);
  currentLanguage = lang;
  
  // Update HTML attributes
  updateHTMLAttributes(lang);
  
  // Update all translatable elements
  updateTranslatableContent(lang);
  
  // Update active language button
  updateActiveLanguageButton(lang);
  
  // Update document title
  updateDocumentTitle(lang);
  
  console.log('Language switch completed:', lang);
}

// Update HTML attributes for language and direction
function updateHTMLAttributes(lang) {
  const html = document.documentElement;
  const body = document.body;
  
  html.setAttribute('lang', lang);
  body.setAttribute('data-lang', lang);
  
  if (lang === 'ar') {
    html.setAttribute('dir', 'rtl');
    body.classList.add('rtl');
  } else {
    html.setAttribute('dir', 'ltr');
    body.classList.remove('rtl');
  }
}

// Update all translatable content
function updateTranslatableContent(lang) {
  const elements = document.querySelectorAll(`[data-en], [data-ar], [data-ja]`);
  
  elements.forEach(element => {
    const translationKey = element.getAttribute(`data-${lang}`);
    if (translationKey) {
      element.textContent = translationKey;
    }
  });
  
  // Update services list
  updateServicesList(lang);
  
  // Update CEO names visibility
  updateCEONames(lang);
}

// Update CEO names display based on language
function updateCEONames(lang) {
  const nameEnElements = document.querySelectorAll('.name-en');
  const nameArElements = document.querySelectorAll('.name-ar');
  
  if (lang === 'ar') {
    nameEnElements.forEach(el => el.style.display = 'none');
    nameArElements.forEach(el => el.style.display = 'block');
  } else {
    nameEnElements.forEach(el => el.style.display = 'block');
    nameArElements.forEach(el => el.style.display = 'none');
  }
}

// Update services list specifically
function updateServicesList(lang) {
  const serviceItems = document.querySelectorAll('.services-ul li');
  const services = translations[lang].services;
  
  serviceItems.forEach((item, index) => {
    if (services[index]) {
      item.textContent = services[index];
    }
  });
}

// Update active language button
function updateActiveLanguageButton(lang) {
  const langButtons = document.querySelectorAll('.lang-btn');
  
  langButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });
}

// Update document title
function updateDocumentTitle(lang) {
  const titleElement = document.querySelector('title');
  if (titleElement) {
    const newTitle = titleElement.getAttribute(`data-${lang}`);
    if (newTitle) {
      titleElement.textContent = newTitle;
    }
  }
}

// Smooth scroll to contact section
function scrollToContact() {
  console.log('Scrolling to contact section');
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    console.error('Contact section not found');
  }
}

// Setup smooth scrolling for all internal links
function setupSmoothScrolling() {
  // Add global scroll function to window for onclick handlers
  window.scrollToContact = scrollToContact;
  
  // Handle any future internal links
  document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
}

// Intersection Observer for brand logos animation
function observeBrandLogos() {
  const brandItems = document.querySelectorAll('.brand-item');
  
  if (brandItems.length === 0) {
    console.log('No brand items found for animation');
    return;
  }
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Initially hide brand items and observe them
  brandItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(item);
  });
}

// Setup logo interaction
function setupLogoInteraction() {
  const logo = document.querySelector('.mirai-logo');
  if (logo) {
    logo.addEventListener('click', function() {
      // Add a small easter egg - pulse effect
      this.style.animation = 'pulse 0.6s ease-in-out';
      setTimeout(() => {
        this.style.animation = '';
      }, 600);
    });
  }
}

// CSS for pulse animation (injected via JS)
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;
document.head.appendChild(style);

// Setup accessibility features
function setupAccessibility() {
  // Enhanced focus management
  const focusableElements = document.querySelectorAll('button, input, textarea, select, a[href]');
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.style.outline = '2px solid #D32F2F';
      this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  });
  
  // Keyboard navigation for language switcher
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach((btn, index) => {
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const direction = e.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (index + direction + langButtons.length) % langButtons.length;
        langButtons[nextIndex].focus();
      }
    });
  });
}

// Handle phone number clicks for better mobile experience
document.addEventListener('DOMContentLoaded', function() {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  
  phoneLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      console.log('Phone link clicked:', this.href);
    });
  });
});

// Handle email links
document.addEventListener('DOMContentLoaded', function() {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      console.log('Email link clicked:', this.href);
    });
  });
});

// Brand logo error handling
document.addEventListener('DOMContentLoaded', function() {
  const brandLogos = document.querySelectorAll('.brand-logo');
  
  brandLogos.forEach((img, index) => {
    img.addEventListener('error', function() {
      console.error(`Failed to load brand logo ${index + 1}:`, this.src);
      // Keep the image element but show a fallback
      this.style.opacity = '0.5';
      this.style.filter = 'grayscale(100%)';
      this.alt = `Brand Logo ${index + 1}`;
    });
    
    img.addEventListener('load', function() {
      console.log(`Successfully loaded brand logo ${index + 1}`);
      this.style.opacity = '1';
      this.style.filter = 'contrast(1.1) brightness(1.05)';
    });
  });
});

// MIRAI logo error handling
document.addEventListener('DOMContentLoaded', function() {
  const miraiLogo = document.querySelector('.mirai-logo');
  if (miraiLogo) {
    miraiLogo.addEventListener('error', function() {
      console.error('Failed to load MIRAI logo');
      // Fallback to text logo
      const logoContainer = this.parentElement;
      this.style.display = 'none';
      logoContainer.innerHTML = '<div class="text-logo">MIRAI</div>';
      
      // Add styles for text logo
      const textLogo = logoContainer.querySelector('.text-logo');
      if (textLogo) {
        textLogo.style.fontSize = '3rem';
        textLogo.style.fontWeight = 'bold';
        textLogo.style.color = '#FFC107';
        textLogo.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
        textLogo.style.cursor = 'pointer';
      }
    });
    
    miraiLogo.addEventListener('load', function() {
      console.log('MIRAI logo loaded successfully');
    });
  }
});

// Scroll effects
let isScrolling = false;

window.addEventListener('scroll', function() {
  if (!isScrolling) {
    window.requestAnimationFrame(function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add scroll effects to language switcher
      const langSwitcher = document.querySelector('.language-switcher');
      if (langSwitcher) {
        if (scrollTop > 100) {
          langSwitcher.style.background = 'rgba(255, 255, 255, 0.98)';
          langSwitcher.style.backdropFilter = 'blur(15px)';
        } else {
          langSwitcher.style.background = 'rgba(255, 255, 255, 0.95)';
          langSwitcher.style.backdropFilter = 'blur(10px)';
        }
      }
      
      isScrolling = false;
    });
    
    isScrolling = true;
  }
});

console.log('MIRAI Dealership JavaScript loaded successfully');