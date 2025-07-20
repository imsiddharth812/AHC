// Appointment Popup Modal JavaScript
class AppointmentModal {
    constructor() {
        this.modal = null;
        this.isEmailVerified = false;
        this.generatedEmailOTP = '';
        this.emailOtpSent = false;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
        this.initEmailJS();
    }

    initEmailJS() {
        // Initialize EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init("GGmNcHnj97dlZ9AaE");
        }
    }

    createModal() {
        const modalHTML = `
            <div id="appointmentModal" class="appointment-modal">
                <div class="appointment-modal-content">
                    <div class="appointment-modal-header">
                        <button class="appointment-close" id="appointmentClose">×</button>
                        <h2><i class="bi bi-calendar-heart me-2"></i>Schedule Your Consultation</h2>
                        <p>Fill out the form below and we'll contact you within 24 hours to confirm your appointment</p>
                    </div>
                    <div class="appointment-modal-body">
                        <form class="appointment-form" id="appointmentForm">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="appointmentFirstName" class="form-label fw-semibold">First Name *</label>
                                    <input type="text" class="form-control" id="appointmentFirstName" name="firstName" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="appointmentLastName" class="form-label fw-semibold">Last Name *</label>
                                    <input type="text" class="form-control" id="appointmentLastName" name="lastName" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="appointmentEmail" class="form-label fw-semibold">Email Address *</label>
                                    <input type="email" class="form-control" id="appointmentEmail" name="email" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="appointmentPhone" class="form-label fw-semibold">Phone Number *</label>
                                    <input type="tel" class="form-control" id="appointmentPhone" name="phone" required pattern="[0-9]{10}" placeholder="Enter 10-digit mobile number">
                                </div>

                                <!-- Email OTP Section -->
                                <div class="col-12" id="appointmentSendEmailOtpSection" style="display: none;">
                                    <div class="appointment-otp-section">
                                        <button type="button" class="btn btn-success" id="appointmentSendEmailOtpBtn">
                                            <i class="bi bi-envelope me-2"></i>Send Email OTP
                                        </button>
                                        <small class="text-muted ms-3" id="appointmentOtpHelpText">We'll send a verification code to your email address</small>
                                    </div>
                                </div>
                                <div class="col-md-6" id="appointmentEmailOtpSection" style="display: none;">
                                    <label for="appointmentEmailOtp" class="form-label fw-semibold">Enter Email OTP *</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="appointmentEmailOtp" name="emailOtp" maxlength="6" placeholder="Enter 6-digit OTP">
                                        <button type="button" class="btn btn-outline-success" id="appointmentVerifyEmailOtpBtn">Verify</button>
                                    </div>
                                    <small class="text-muted">OTP sent to your email address</small>
                                </div>

                                <!-- OTP Messages Area -->
                                <div class="col-12" id="appointmentOtpMessages" style="display: none;"></div>

                                <!-- Appointment-specific fields -->
                                <div class="col-md-6">
                                    <label for="appointmentPreferredDate" class="form-label fw-semibold">Preferred Date *</label>
                                    <input type="date" class="form-control" id="appointmentPreferredDate" name="preferredDate" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="appointmentConsultationType" class="form-label fw-semibold">Consultation Type *</label>
                                    <select class="form-select" id="appointmentConsultationType" name="consultationType" required>
                                        <option value="">Select consultation type</option>
                                        <option value="Online">Online</option>
                                        <option value="In Person">In Person</option>
                                    </select>
                                </div>

                                <div class="col-12">
                                    <label for="appointmentMessage" class="form-label fw-semibold">Message</label>
                                    <textarea class="form-control" id="appointmentMessage" name="message" rows="4" placeholder="Please describe your health concerns, symptoms, or any additional information..."></textarea>
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="appointmentConsent" name="consent" required>
                                        <label class="form-check-label text-secondary" for="appointmentConsent">
                                            I consent to the collection and processing of my personal data for the purpose of responding to my inquiry. *
                                        </label>
                                    </div>
                                </div>
                                <div class="col-12 text-center">
                                    <button type="submit" class="btn btn-success btn-lg px-5 fw-semibold">
                                        <i class="bi bi-calendar-check me-2"></i>Book Appointment
                                    </button>
                                </div>
                            </div>
                        </form>

                        <!-- Success/Error Messages -->
                        <div id="appointmentFormMessages" class="mt-3"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('appointmentModal');
    }

    bindEvents() {
        // Open modal buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-appointment-modal]') || 
                e.target.closest('[data-appointment-modal]')) {
                e.preventDefault();
                this.openModal();
            }
        });

        // Close modal
        document.getElementById('appointmentClose').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });

        // Email validation and OTP trigger
        document.getElementById('appointmentEmail').addEventListener('input', (e) => {
            const email = e.target.value;
            const sendEmailOtpSection = document.getElementById('appointmentSendEmailOtpSection');

            if (email && email.includes('@') && email.includes('.')) {
                sendEmailOtpSection.style.display = 'block';
            } else {
                sendEmailOtpSection.style.display = 'none';
                document.getElementById('appointmentEmailOtpSection').style.display = 'none';
                this.isEmailVerified = false;
                this.emailOtpSent = false;
            }
        });

        // Send Email OTP
        document.getElementById('appointmentSendEmailOtpBtn').addEventListener('click', () => {
            this.sendEmailOTP();
        });

        // Verify Email OTP
        document.getElementById('appointmentVerifyEmailOtpBtn').addEventListener('click', () => {
            this.verifyEmailOTP();
        });

        // Form submission
        document.getElementById('appointmentForm').addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });

        // Set date constraints
        this.setDateConstraints();
    }

    setDateConstraints() {
        const dateInput = document.getElementById('appointmentPreferredDate');
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 30);

        const todayStr = today.toISOString().split('T')[0];
        const maxDateStr = maxDate.toISOString().split('T')[0];

        dateInput.min = todayStr;
        dateInput.max = maxDateStr;
    }

    openModal() {
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Reset form
        this.resetForm();
    }

    closeModal() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    resetForm() {
        document.getElementById('appointmentForm').reset();
        document.getElementById('appointmentSendEmailOtpSection').style.display = 'none';
        document.getElementById('appointmentEmailOtpSection').style.display = 'none';
        document.getElementById('appointmentOtpMessages').style.display = 'none';
        document.getElementById('appointmentFormMessages').innerHTML = '';
        this.isEmailVerified = false;
        this.emailOtpSent = false;
        this.generatedEmailOTP = '';
    }

    displayMessage(message, type = 'info', isOtpMessage = false) {
        const messagesDiv = isOtpMessage ? 
            document.getElementById('appointmentOtpMessages') : 
            document.getElementById('appointmentFormMessages');

        const iconMap = {
            'success': 'bi-check-circle',
            'danger': 'bi-x-circle',
            'warning': 'bi-exclamation-triangle',
            'info': 'bi-info-circle'
        };

        const icon = iconMap[type] || 'bi-info-circle';
        messagesDiv.innerHTML = `<div class="alert alert-${type} mb-2"><i class="bi ${icon} me-2"></i>${message}</div>`;

        if (isOtpMessage) {
            messagesDiv.style.display = 'block';
        }

        setTimeout(() => {
            messagesDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    sendEmailOTP() {
        const email = document.getElementById('appointmentEmail').value;
        const firstName = document.getElementById('appointmentFirstName').value || 'User';
        const sendBtn = document.getElementById('appointmentSendEmailOtpBtn');

        if (!email || !email.includes('@')) {
            this.displayMessage('Please enter a valid email address.', 'warning', true);
            return;
        }

        // Generate 6-digit OTP
        this.generatedEmailOTP = Math.floor(100000 + Math.random() * 900000).toString();

        // Show loading state
        sendBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending Email OTP...';
        sendBtn.disabled = true;

        // EmailJS template parameters
        const templateParams = {
            to_email: email,
            to_name: firstName,
            otp_code: this.generatedEmailOTP,
            clinic_name: 'Abhivyakt Homoeo Clinic'
        };

        // Send email using EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.send('service_ttj0b38', 'template_5aydwlh', templateParams)
                .then((response) => {
                    // Show OTP section
                    document.getElementById('appointmentEmailOtpSection').style.display = 'block';
                    this.emailOtpSent = true;

                    // Update button
                    sendBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Email OTP Sent';
                    sendBtn.classList.remove('btn-success');
                    sendBtn.classList.add('btn-outline-success');

                    // Hide help text
                    document.getElementById('appointmentOtpHelpText').style.display = 'none';

                    // Show success message
                    this.displayMessage(`Email OTP sent to ${email}. Please check your inbox.`, 'success', true);

                    // Enable resend after 30 seconds
                    setTimeout(() => {
                        sendBtn.disabled = false;
                        sendBtn.innerHTML = '<i class="bi bi-arrow-clockwise me-2"></i>Resend Email OTP';
                    }, 30000);
                }, (error) => {
                    this.displayMessage('Failed to send email OTP. Please try again.', 'danger', true);
                    sendBtn.innerHTML = '<i class="bi bi-envelope me-2"></i>Send Email OTP';
                    sendBtn.disabled = false;
                });
        } else {
            this.displayMessage('EmailJS not loaded. Please refresh the page and try again.', 'danger', true);
            sendBtn.innerHTML = '<i class="bi bi-envelope me-2"></i>Send Email OTP';
            sendBtn.disabled = false;
        }
    }

    verifyEmailOTP() {
        const enteredOTP = document.getElementById('appointmentEmailOtp').value;
        const verifyBtn = document.getElementById('appointmentVerifyEmailOtpBtn');

        if (!this.emailOtpSent) {
            this.displayMessage('Please send email OTP first.', 'warning', true);
            return;
        }

        if (!enteredOTP) {
            this.displayMessage('Please enter the OTP.', 'warning', true);
            return;
        }

        if (enteredOTP === this.generatedEmailOTP) {
            this.isEmailVerified = true;
            verifyBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Verified';
            verifyBtn.classList.remove('btn-outline-success');
            verifyBtn.classList.add('btn-success');
            verifyBtn.disabled = true;
            
            document.getElementById('appointmentEmailOtp').disabled = true;
            this.displayMessage('Email verified successfully!', 'success', true);
        } else {
            this.displayMessage('Invalid OTP. Please try again.', 'danger', true);
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();

        // Check if email is verified
        if (!this.isEmailVerified) {
            this.displayMessage('Please verify your email address before submitting.', 'warning');
            return;
        }

        const formData = new FormData(e.target);
        const submitBtn = e.target.querySelector('button[type="submit"]');

        // Show loading state
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Booking Appointment...';
        submitBtn.disabled = true;

        // Prepare form data for submission
        const appointmentData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            preferredDate: formData.get('preferredDate'),
            consultationType: formData.get('consultationType'),
            message: formData.get('message'),
            subject: 'Appointment Request',
            emailVerified: this.isEmailVerified
        };

        // Submit to Formspree
        fetch('https://formspree.io/f/mwpqpqqb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData)
        })
        .then(response => {
            if (response.ok) {
                this.displayMessage(
                    '<strong>Appointment Request Submitted Successfully!</strong><br>' +
                    'Thank you for booking with us. We will contact you within 24 hours to confirm your appointment details.',
                    'success'
                );
                
                // Reset form after success
                setTimeout(() => {
                    this.closeModal();
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            this.displayMessage(
                'There was an error submitting your appointment request. Please try again or contact us directly.',
                'danger'
            );
        })
        .finally(() => {
            // Reset button
            submitBtn.innerHTML = '<i class="bi bi-calendar-check me-2"></i>Book Appointment';
            submitBtn.disabled = false;
        });
    }
}

// Initialize the appointment modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AppointmentModal();
});