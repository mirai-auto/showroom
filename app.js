// Translation data
const translations = {
  "en": {
    "hero_title": "Premium Used Cars",
    "hero_subtitle": "Quality Pre-Owned Vehicles You Can Trust",
    "phone": "Phone",
    "email": "Email",
    "get_started": "Get Started Today",
    "trusted_brands": "Trusted Automotive Brands",
    "about_title": "About Our Dealership",
    "about_description": "We are a trusted used car dealership committed to providing quality pre-owned vehicles to our customers. With years of experience in the automotive industry, we carefully inspect every vehicle to ensure reliability and customer satisfaction.",
    "leadership_title": "Our Leadership Team",
    "contact_title": "Contact Us",
    "contact_description": "Ready to find your perfect used car? Get in touch with us today!",
    "name": "Full Name",
    "your_email": "Your Email",
    "your_phone": "Your Phone",
    "message": "Message",
    "send_message": "Send Message",
    "services": ["Quality Used Cars", "Certified Pre-owned Vehicles", "Financing Options", "Trade-in Services", "Professional Inspection"]
  },
  "ar": {
    "hero_title": "سيارات مستعملة مميزة",
    "hero_subtitle": "مركبات مستعملة عالية الجودة يمكنك الوثوق بها",
    "phone": "الهاتف",
    "email": "البريد الإلكتروني",
    "get_started": "ابدأ اليوم",
    "trusted_brands": "علامات تجارية موثوقة للسيارات",
    "about_title": "حول وكالتنا",
    "about_description": "نحن وكالة سيارات مستعملة موثوقة ملتزمة بتوفير مركبات مستعملة عالية الجودة لعملائنا. مع سنوات من الخبرة في صناعة السيارات، نقوم بفحص كل مركبة بعناية لضمان الموثوقية ورضا العملاء.",
    "leadership_title": "فريق القيادة لدينا",
    "contact_title": "اتصل بنا",
    "contact_description": "مستعد للعثور على سيارتك المستعملة المثالية؟ تواصل معنا اليوم!",
    "name": "الاسم الكامل",
    "your_email": "بريدك الإلكتروني",
    "your_phone": "رقم هاتفك",
    "message": "الرسالة",
    "send_message": "إرسال الرسالة",
    "services": ["سيارات مستعملة عالية الجودة", "مركبات مستعملة معتمدة", "خيارات التمويل", "خدمات استبدال السيارات", "فحص مهني"]
  },
  "ja": {
    "hero_title": "プレミアム中古車",
    "hero_subtitle": "信頼できる高品質な中古車",
    "phone": "電話",
    "email": "メール",
    "get_started": "今すぐ始める",
    "trusted_brands": "信頼できる自動車ブランド",
    "about_title": "当社について",
    "about_description": "私たちは、お客様に高品質な中古車を提供することにコミットした信頼できる中古車販売店です。自動車業界での長年の経験により、信頼性とお客様の満足度を確保するために、すべての車両を慎重に検査しています。",
    "leadership_title": "リーダーシップチーム",
    "contact_title": "お問い合わせ",
    "contact_description": "完璧な中古車を見つける準備はできていますか？今すぐお問い合わせください！",
    "name": "お名前",
    "your_email": "メールアドレス",
    "your_phone": "電話番号",
    "message": "メッセージ",
    "send_message": "メッセージを送信",
    "services": ["高品質中古車", "認定中古車", "融資オプション", "下取りサービス", "専門検査"]
  }
};

// Current language state
let currentLanguage = 'en';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Multilingual App');
  
  // Load saved language preference
  loadLanguagePreference();
  
  // Initialize language switcher
  initLanguageSwitcher();
  
  // Initialize form handling
  initContactForm();
  
  // Initialize other features
  observeBrandItems();
  initAccessibility();
  
  // Initial translation
  updateContent(currentLanguage);
});

// Language switching functionality
function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');
  
  langButtons.forEach(button => {
    button.addEventListener('click', function() {
      const selectedLang = this.getAttribute('data-lang');
      switchLanguage(selectedLang);
    });
  });
}

function switchLanguage(lang) {
  if (lang === currentLanguage) return;
  
  console.log('Switching language to:', lang);
  
  // Add transition class
  document.body.classList.add('language-transitioning');
  
  // Update active button
  updateActiveLanguageButton(lang);
  
  // Update content after short delay for smooth transition
  setTimeout(() => {
    currentLanguage = lang;
    updateContent(lang);
    updateHTMLAttributes(lang);
    saveLanguagePreference(lang);
    
    // Remove transition class
    setTimeout(() => {
      document.body.classList.remove('language-transitioning');
    }, 100);
  }, 150);
}

function updateActiveLanguageButton(lang) {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });
}

function updateContent(lang) {
  const langData = translations[lang];
  if (!langData) {
    console.error('Language data not found for:', lang);
    return;
  }
  
  // Update all translatable elements
  const translatableElements = document.querySelectorAll('[data-translate]');
  translatableElements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (langData[key]) {
      element.textContent = langData[key];
    }
  });
  
  // Update services list
  updateServicesList(lang);
  
  // Update page title
  document.title = langData.hero_title;
  
  // Update form placeholder
  updateFormPlaceholder(lang);
  
  console.log('Content updated to language:', lang);
}

function updateServicesList(lang) {
  const services = translations[lang].services;
  const serviceItems = document.querySelectorAll('[data-service]');
  
  serviceItems.forEach((item, index) => {
    if (services[index]) {
      item.textContent = services[index];
    }
  });
}

function updateFormPlaceholder(lang) {
  const messageTextarea = document.getElementById('message');
  if (messageTextarea) {
    const placeholders = {
      'en': 'Tell us about the type of vehicle you\'re looking for...',
      'ar': 'أخبرنا عن نوع المركبة التي تبحث عنها...',
      'ja': 'お探しの車両のタイプについて教えてください...'
    };
    messageTextarea.placeholder = placeholders[lang] || placeholders['en'];
  }
}

function updateHTMLAttributes(lang) {
  const html = document.documentElement;
  const body = document.body;
  
  // Update language attribute
  html.setAttribute('lang', lang);
  
  // Handle RTL for Arabic
  if (lang === 'ar') {
    html.setAttribute('dir', 'rtl');
    body.setAttribute('dir', 'rtl');
  } else {
    html.setAttribute('dir', 'ltr');
    body.setAttribute('dir', 'ltr');
  }
  
  console.log('HTML attributes updated for language:', lang);
}

function loadLanguagePreference() {
  try {
    // Try to get from URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    if (urlLang && translations[urlLang]) {
      currentLanguage = urlLang;
      return;
    }
    
    // Fall back to browser language detection
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0];
    
    if (translations[shortLang]) {
      currentLanguage = shortLang;
    } else {
      currentLanguage = 'en'; // Default to English
    }
    
    console.log('Language preference loaded:', currentLanguage);
  } catch (error) {
    console.error('Error loading language preference:', error);
    currentLanguage = 'en';
  }
}

function saveLanguagePreference(lang) {
  try {
    // Note: localStorage is not available in this environment, so we'll skip saving
    // In a real application, you would use: localStorage.setItem('preferredLanguage', lang);
    console.log('Language preference would be saved:', lang);
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
}

// Smooth scroll to contact section
function scrollToContact() {
  console.log('scrollToContact called');
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

// Form handling
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted');
      handleFormSubmission();
    });
  }
}

// Handle contact form submission
function handleFormSubmission() {
  const form = document.getElementById('contactForm');
  const formData = new FormData(form);
  
  // Get form values
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const message = formData.get('message');
  
  console.log('Form data:', { name, email, phone, message });
  
  // Validate form
  const errors = validateForm(formData);
  if (errors.length > 0) {
    showMessage(errors.join(', '), 'error');
    return;
  }
  
  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  const loadingText = {
    'en': 'Sending...',
    'ar': 'جارٍ الإرسال...',
    'ja': '送信中...'
  };
  
  submitButton.textContent = loadingText[currentLanguage] || loadingText['en'];
  submitButton.disabled = true;
  
  // Simulate form submission
  setTimeout(() => {
    const successMessages = {
      'en': 'Thank you for your message! We will contact you soon.',
      'ar': 'شكراً لك على رسالتك! سنتواصل معك قريباً.',
      'ja': 'メッセージありがとうございます！間もなくご連絡いたします。'
    };
    
    // Show success message
    showMessage(successMessages[currentLanguage] || successMessages['en'], 'success');
    
    // Reset form
    form.reset();
    
    // Reset button
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    
    console.log('Form submission complete');
  }, 1500);
}

// Show success/error messages
function showMessage(message, type) {
  console.log('Showing message:', message, type);
  
  // Remove existing message if any
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message form-${type}`;
  messageDiv.textContent = message;
  
  // Insert message before the form
  const contactForm = document.getElementById('contactForm');
  const formContainer = contactForm.parentElement;
  formContainer.insertBefore(messageDiv, contactForm);
  
  // Remove message after 5 seconds
  setTimeout(() => {
    if (messageDiv && messageDiv.parentElement) {
      messageDiv.remove();
    }
  }, 5000);
}

// Enhanced form validation
function validateForm(formData) {
  const errors = [];
  
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  
  const errorMessages = {
    'en': {
      'name': 'Please enter a valid name (at least 2 characters)',
      'email_required': 'Email is required',
      'email_invalid': 'Please enter a valid email address',
      'phone_invalid': 'Please enter a valid phone number'
    },
    'ar': {
      'name': 'يرجى إدخال اسم صحيح (حرفان على الأقل)',
      'email_required': 'البريد الإلكتروني مطلوب',
      'email_invalid': 'يرجى إدخال عنوان بريد إلكتروني صحيح',
      'phone_invalid': 'يرجى إدخال رقم هاتف صحيح'
    },
    'ja': {
      'name': '有効な名前を入力してください（2文字以上）',
      'email_required': 'メールアドレスは必須です',
      'email_invalid': '有効なメールアドレスを入力してください',
      'phone_invalid': '有効な電話番号を入力してください'
    }
  };
  
  const messages = errorMessages[currentLanguage] || errorMessages['en'];
  
  if (!name || name.trim().length < 2) {
    errors.push(messages.name);
  }
  
  if (!email) {
    errors.push(messages.email_required);
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push(messages.email_invalid);
    }
  }
  
  if (phone && phone.length > 0) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      errors.push(messages.phone_invalid);
    }
  }
  
  return errors;
}

// Intersection Observer for brand items animation
function observeBrandItems() {
  const brandItems = document.querySelectorAll('.brand-item');
  
  if (brandItems.length === 0) {
    console.log('No brand items found');
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
      }
    });
  }, observerOptions);
  
  // Initially hide brand items and observe them
  brandItems.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
}

// Initialize accessibility features
function initAccessibility() {
  // Add focus management for better accessibility
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
  
  // Handle phone number clicks for better mobile experience
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  
  phoneLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (!navigator.userAgent.match(/mobile/i)) {
        // Optional: Add desktop handling here if needed
      }
    });
  });
}

// Smooth scroll for internal links
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

// Export functions for global access
window.scrollToContact = scrollToContact;
window.switchLanguage = switchLanguage;