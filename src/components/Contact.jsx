import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
    const { locale } = useLanguage();

    const SERVICE_ID = 'service_jnc6n98'; 
    const TEMPLATE_ID = 'template_wiief4b'; 
    const PUBLIC_KEY = 'qzbd5Xhalz7bRHjUC';

    const translations = {
        fr: {
            title: 'Contactez',
            titleSpan: 'nous',
            description: 'Remplissez le formulaire ci-dessous pour contacter notre équipe. Nous vous aiderons à trouver la solution agricole adaptée à vos besoins.',
            namePlaceholder: 'Nom Complet *',
            emailPlaceholder: 'Adresse Email *',
            subjectPlaceholder: 'Sujet',
            messagePlaceholder: 'Message (Optionnel)',
            sendButton: 'Envoyer la demande',
            sending: 'Envoi...',
            successMessage: 'Votre demande a été envoyée avec succès ! Nous vous répondrons bientôt.',
            errorMessage: 'Échec de l\'envoi:',
            authError: 'Échec d\'authentification Gmail. Veuillez re-lier votre service dans EmailJS.',
            networkError: 'Erreur réseau: Impossible d\'envoyer l\'email.'
        },
        en: {
            title: 'Contact',
            titleSpan: 'us',
            description: 'Fill out the form below to contact our team. We will help you find the agricultural solution adapted to your needs.',
            namePlaceholder: 'Full Name *',
            emailPlaceholder: 'Email Address *',
            subjectPlaceholder: 'Subject',
            messagePlaceholder: 'Message (Optional)',
            sendButton: 'Send Request',
            sending: 'Sending...',
            successMessage: 'Your request has been sent successfully! We will respond to you soon.',
            errorMessage: 'Sending failed:',
            authError: 'Gmail authentication failed. Please re-link your service in EmailJS.',
            networkError: 'Network error: Unable to send email.'
        },
        ar: {
            title: 'اتصل',
            titleSpan: 'بنا',
            description: 'املأ النموذج أدناه للاتصال بفريقنا. سنساعدك في العثور على الحل الزراعي المناسب لاحتياجاتك.',
            namePlaceholder: 'الاسم الكامل *',
            emailPlaceholder: 'عنوان البريد الإلكتروني *',
            subjectPlaceholder: 'الموضوع',
            messagePlaceholder: 'الرسالة (اختياري)',
            sendButton: 'إرسال الطلب',
            sending: 'جاري الإرسال...',
            successMessage: 'تم إرسال طلبك بنجاح! سنرد عليك قريباً.',
            errorMessage: 'فشل الإرسال:',
            authError: 'فشل المصادقة على Gmail. يرجى إعادة ربط الخدمة في EmailJS.',
            networkError: 'خطأ في الشبكة: تعذر إرسال البريد الإلكتروني.'
        }
    };

    const t = translations[locale];
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '', 
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (submitStatus) {
            const timer = setTimeout(() => {
                setSubmitStatus(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submitStatus]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage('');

        const templateParams = {
            title: formData.subject,    
            name: formData.name,        
            email: formData.email,      
            message: formData.message,  
            time: new Date().toLocaleTimeString(),
        };

        try {
            const response = await emailjs.send(
                SERVICE_ID, 
                TEMPLATE_ID, 
                templateParams, 
                PUBLIC_KEY 
            );

            if (response.status === 200) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' }); 
                console.log('Email envoyé avec succès par EmailJS.');
            } else {
                setSubmitStatus('error');
                setErrorMessage(`${t.errorMessage} ${response.status}`);
            }

        } catch (error) {
            setSubmitStatus('error');
            const msg = error.text && error.text.includes('insufficient authentication scopes') 
                ? t.authError
                : `${t.networkError} ${error.text || error.message}`;
            setErrorMessage(msg);
            console.error('Erreur réseau/EmailJS:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStatusMessage = () => {
        if (!submitStatus) return null;

        const isSuccess = submitStatus === 'success';
        const Icon = isSuccess ? FaCheckCircle : FaTimesCircle;
        const className = isSuccess ? 'status-success' : 'status-error';
        const message = isSuccess 
            ? t.successMessage
            : `${t.errorMessage} ${errorMessage}`;

        return (
            <div className={`form-status-message ${className}`}>
                <Icon className="status-icon" />
                <p>{message}</p>
            </div>
        );
    };

    return (
        <section className={`contact ${locale === 'ar' ? 'rtl' : ''}`} id="contact">
            <div className="container">
                <div className="contact-header">
                    <h2 className="contact-title">
                        {t.title} <span>{t.titleSpan}</span>
                    </h2>
                    <p className="contact-description">
                        {t.description}
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-form-wrapper">
                        {renderStatusMessage()}
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={t.namePlaceholder}
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={t.emailPlaceholder}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder={t.subjectPlaceholder}
                                    value={formData.subject}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group full-width">
                                <textarea
                                    name="message"
                                    placeholder={t.messagePlaceholder}
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting} 
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="spin" /> {t.sending}
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane /> {t.sendButton}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="contact-map-wrapper">
                        <iframe
                            src="https://maps.google.com/maps?q=Cité+d'Innovation+d'Agadir&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: '8px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Emplacement sur Google Maps"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;