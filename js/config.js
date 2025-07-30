// Configuration file for API keys and sensitive data
// In production, these should be loaded from environment variables
const CONFIG = {
    // EmailJS Configuration
    emailjs: {
        publicKey: 'GGmNcHnj97dlZ9AaE', // This should be moved to environment variables
        serviceId: 'service_ttj0b38',
        templateId: 'template_5aydwlh'
    },
    
    // Contact Information
    contact: {
        phone: '+919429327672',
        email: 'abhivyaktclinic@gmail.com',
        address: '157, 1st Floor, Suyash Solitaire, Nr. Podar International School, Kudasan, Gandhinagar - 382421'
    },
    
    // Business Hours
    businessHours: {
        start: 17, // 5:00 PM
        end: 20,   // 8:00 PM
        days: [1, 2, 3, 4, 5, 6], // Monday to Saturday
        timezone: 'Asia/Kolkata'
    },
    
    // Form Endpoints
    forms: {
        appointment: 'https://formspree.io/f/mwpqpqqb'
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}