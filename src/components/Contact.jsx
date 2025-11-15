import React, { useState, useEffect } from 'react'; // 👈 N'oubliez pas d'importer useEffect
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import emailjs from '@emailjs/browser'; 

const Contact = () => {

    // VOS IDENTIFIANTS EMAILJS (fournis par vous)
    const SERVICE_ID = 'service_jnc6n98'; 
    const TEMPLATE_ID = 'template_wiief4b'; 
    const PUBLIC_KEY = 'qzbd5Xhalz7bRHjUC'; 
    
    // 1. États du formulaire
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '', 
        message: ''
    });

    // 2. États pour le retour utilisateur
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', ou null
    const [errorMessage, setErrorMessage] = useState('');

    // ==========================================================
    // ✅ HOOK POUR GÉRER LA DISPARITION DU MESSAGE
    // ==========================================================
    useEffect(() => {
        // Déclenche la minuterie uniquement en cas de succès ou d'erreur
        if (submitStatus) {
            // Définit une minuterie de 5 secondes (5000ms)
            const timer = setTimeout(() => {
                // Réinitialise le statut pour masquer le message (le div disparaît car submitStatus devient null)
                setSubmitStatus(null);
            }, 3000); // Temps d'affichage : 5 secondes

            // Fonction de nettoyage : Annule la minuterie si le composant est démonté ou si submitStatus change.
            return () => clearTimeout(timer);
        }
    }, [submitStatus]); // S'exécute à chaque fois que submitStatus est mis à jour


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
                setErrorMessage(`Erreur lors de l'envoi de l'email. Statut: ${response.status}`);
            }

        } catch (error) {
            setSubmitStatus('error');
            const msg = error.text && error.text.includes('insufficient authentication scopes') 
                ? "Échec d'authentification Gmail. Veuillez re-lier votre service dans EmailJS."
                : `Erreur réseau: Impossible d'envoyer l'email. ${error.text || error.message}`;
            setErrorMessage(msg);
            console.error('Erreur réseau/EmailJS:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fonction de rendu du message de statut
    const renderStatusMessage = () => {
        if (!submitStatus) return null;

        const isSuccess = submitStatus === 'success';
        const Icon = isSuccess ? FaCheckCircle : FaTimesCircle;
        const className = isSuccess ? 'status-success' : 'status-error';
        const message = isSuccess 
            ? 'Votre demande a été envoyée avec succès ! Nous vous répondrons bientôt.'
            : `Échec de l'envoi: ${errorMessage}`;

        return (
            <div className={`form-status-message ${className}`}>
                <Icon className="status-icon" />
                <p>{message}</p>
            </div>
        );
    };

    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="contact-header">
                    <h2 className="contact-title">
                        Contactez <span>nous</span>
                    </h2>
                    <p className="contact-description">
                        Remplissez le formulaire ci-dessous pour contacter notre équipe. Nous vous aiderons à 
                        trouver la solution agricole adaptée à vos besoins.
                    </p>
                </div>

                <div className="contact-content">
                    {/* Form Section */}
                    <div className="contact-form-wrapper">
                        {renderStatusMessage()} {/* Affiche le message de statut */}
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nom Complet *"
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
                                        placeholder="Adresse Email *"
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
                                    placeholder="Sujet"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group full-width">
                                <textarea
                                    name="message"
                                    placeholder="Message (Optionnel)"
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
                                        <FaSpinner className="spin" /> Envoi...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane /> Envoyer la demande
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Map Section */}
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