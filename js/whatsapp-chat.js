// WhatsApp Chat Button
// Configuration
const WHATSAPP_CONFIG = {
    phoneNumber: '+919375727273', // Your WhatsApp number
    defaultMessage: 'Hello! I would like to book an appointment at Abhivyakt Homoeo Clinic.',
    businessHours: {
        start: 17, // 5:00 PM
        end: 20,   // 8:00 PM
        days: [1, 2, 3, 4, 5, 6] // Monday to Saturday (0 = Sunday, 1 = Monday, etc.)
    }
};

// Create WhatsApp chat button
function createWhatsAppButton() {
    // Check if button already exists
    if (document.querySelector('#whatsapp-chat-button')) {
        return;
    }

    const whatsappButton = document.createElement('div');
    whatsappButton.id = 'whatsapp-chat-button';
    whatsappButton.className = 'whatsapp-float';

    whatsappButton.innerHTML = `
        <div class="whatsapp-button" id="whatsappButton">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" fill="currentColor"/>
            </svg>
            <span class="whatsapp-text">Chat with us</span>
        </div>
        <div class="whatsapp-tooltip" id="whatsappTooltip">
            <div class="tooltip-content">
                <div class="tooltip-header">
                    <img src="images/logo.png" alt="Abhivyakt Homoeo Clinic" class="tooltip-logo">
                    <div>
                        <h4>Abhivyakt Homoeo Clinic</h4>
                        <p class="status" id="clinicStatus">Online</p>
                    </div>
                </div>
                <div class="tooltip-body">
                    <p>Hi there! 👋</p>
                    <p>How can we help you today?</p>
                    <div class="quick-actions">
                        <button class="quick-btn" data-appointment-modal>📅 Book Appointment</button>
                        <button class="quick-btn" data-message="I have a question about homeopathy treatment">❓ Ask Question</button>
                        <button class="quick-btn" data-message="I need information about your services">ℹ️ Services Info</button>
                    </div>
                </div>
                <div class="tooltip-footer">
                    <button class="start-chat-btn" id="startChatBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                        </svg>
                        Start Chat
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(whatsappButton);

    // Add event listeners
    addWhatsAppEventListeners();

    // Update status
    updateClinicStatus();

    console.log('WhatsApp chat button created');
}

// Add event listeners
function addWhatsAppEventListeners() {
    const whatsappButton = document.getElementById('whatsappButton');
    const whatsappTooltip = document.getElementById('whatsappTooltip');
    const startChatBtn = document.getElementById('startChatBtn');
    const quickBtns = document.querySelectorAll('.quick-btn');

    let selectedMessage = WHATSAPP_CONFIG.defaultMessage;

    // Toggle tooltip on button click
    whatsappButton.addEventListener('click', function (e) {
        e.stopPropagation();
        whatsappTooltip.classList.toggle('show');
    });

    // Close tooltip when clicking outside
    document.addEventListener('click', function (e) {
        if (!whatsappButton.contains(e.target) && !whatsappTooltip.contains(e.target)) {
            whatsappTooltip.classList.remove('show');
        }
    });

    // Quick action buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            selectedMessage = this.getAttribute('data-message');

            // Update visual state
            quickBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');

            // Update start chat button
            startChatBtn.textContent = 'Send: "' + selectedMessage.substring(0, 20) + '..."';
        });
    });

    // Start chat button
    startChatBtn.addEventListener('click', function () {
        openWhatsAppChat(selectedMessage);
    });

    // Direct click on main button (when tooltip is not shown)
    whatsappButton.addEventListener('dblclick', function () {
        openWhatsAppChat(WHATSAPP_CONFIG.defaultMessage);
    });
}

// Open WhatsApp chat
function openWhatsAppChat(message = WHATSAPP_CONFIG.defaultMessage) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber.replace('+', '')}?text=${encodedMessage}`;

    // Track the interaction (you can add analytics here)
    console.log('WhatsApp chat opened with message:', message);

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Close tooltip
    const tooltip = document.getElementById('whatsappTooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
    }
}

// Update clinic status based on business hours
function updateClinicStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();

    const statusElement = document.getElementById('clinicStatus');
    if (!statusElement) return;

    const isBusinessDay = WHATSAPP_CONFIG.businessHours.days.includes(currentDay);
    const isBusinessHour = currentHour >= WHATSAPP_CONFIG.businessHours.start &&
        currentHour < WHATSAPP_CONFIG.businessHours.end;

    if (isBusinessDay && isBusinessHour) {
        statusElement.textContent = 'Online';
        statusElement.className = 'status online';
    } else {
        statusElement.textContent = 'Offline';
        statusElement.className = 'status offline';

        // Show next available time
        const nextAvailable = getNextAvailableTime();
        if (nextAvailable) {
            statusElement.textContent = `Offline - Available ${nextAvailable}`;
        }
    }
}

// Get next available time
function getNextAvailableTime() {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();

    // If today is a business day and before business hours
    if (WHATSAPP_CONFIG.businessHours.days.includes(currentDay) &&
        currentHour < WHATSAPP_CONFIG.businessHours.start) {
        return 'today at 5:00 PM';
    }

    // Find next business day
    for (let i = 1; i <= 7; i++) {
        const nextDay = (currentDay + i) % 7;
        if (WHATSAPP_CONFIG.businessHours.days.includes(nextDay)) {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return `${dayNames[nextDay]} at 5:00 PM`;
        }
    }

    return 'Monday at 5:00 PM';
}

// Add WhatsApp button styles
function addWhatsAppStyles() {
    if (document.querySelector('#whatsapp-styles')) return;

    const style = document.createElement('style');
    style.id = 'whatsapp-styles';
    style.textContent = `
        .whatsapp-float {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .whatsapp-button {
            background: #25D366;
            color: white;
            border-radius: 50px;
            padding: 12px 20px;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
            user-select: none;
            font-weight: 500;
            font-size: 14px;
        }
        
        .whatsapp-button:hover {
            background: #128C7E;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
        }
        
        .whatsapp-button svg {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
        }
        
        .whatsapp-text {
            white-space: nowrap;
        }
        
        .whatsapp-tooltip {
            position: absolute;
            bottom: 70px;
            right: 0;
            width: 320px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.3s ease;
            border: 1px solid #e5e7eb;
        }
        
        .whatsapp-tooltip.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .tooltip-content {
            padding: 0;
        }
        
        .tooltip-header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            border-bottom: 1px solid #f1f3f4;
            background: #f8f9fa;
            border-radius: 12px 12px 0 0;
        }
        
        .tooltip-logo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .tooltip-header h4 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: #1a2340;
        }
        
        .status {
            font-size: 12px;
            margin: 2px 0 0 0;
            font-weight: 500;
        }
        
        .status.online {
            color: #25D366;
        }
        
        .status.offline {
            color: #6c757d;
        }
        
        .tooltip-body {
            padding: 16px;
        }
        
        .tooltip-body p {
            margin: 0 0 8px 0;
            color: #4a5568;
            font-size: 14px;
        }
        
        .quick-actions {
            margin-top: 12px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        
        .quick-btn {
            background: #f8f9fa;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 8px 12px;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 13px;
            color: #4a5568;
        }
        
        .quick-btn:hover {
            background: #e9ecef;
            border-color: #25D366;
        }
        
        .quick-btn.selected {
            background: #e8f5e8;
            border-color: #25D366;
            color: #25D366;
        }
        
        .tooltip-footer {
            padding: 16px;
            border-top: 1px solid #f1f3f4;
        }
        
        .start-chat-btn {
            width: 100%;
            background: #25D366;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .start-chat-btn:hover {
            background: #128C7E;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
            .whatsapp-float {
                bottom: 15px;
                right: 15px;
            }
            
            .whatsapp-button {
                padding: 10px 16px;
                font-size: 13px;
            }
            
            .whatsapp-text {
                display: none;
            }
            
            .whatsapp-tooltip {
                width: 280px;
                right: -10px;
            }
        }
        
        @media (max-width: 480px) {
            .whatsapp-tooltip {
                width: calc(100vw - 40px);
                right: -20px;
            }
        }
        
        /* Animation for entrance */
        @keyframes whatsappPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .whatsapp-button {
            animation: whatsappPulse 2s infinite;
        }
        
        .whatsapp-button:hover {
            animation: none;
        }
    `;

    document.head.appendChild(style);
}

// Initialize WhatsApp chat button
function initializeWhatsAppChat() {
    addWhatsAppStyles();
    createWhatsAppButton();

    // Update status every minute
    setInterval(updateClinicStatus, 60000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(initializeWhatsAppChat, 1000);
});

// Export for manual initialization
window.whatsappChat = {
    init: initializeWhatsAppChat,
    openChat: openWhatsAppChat,
    updateStatus: updateClinicStatus
};