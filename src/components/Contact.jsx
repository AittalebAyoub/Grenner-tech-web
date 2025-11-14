import React, { useState } from 'react';
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Contact = () => {
    // URL de base de l'API
    const API_URL = process.env.REACT_APP_STRAPI_API_URL;
    const ENDPOINT = '/contacts';

    // 1. États du formulaire et des données
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '', // Garde le champ subject
        message: ''
    });

    // 2. États pour le retour utilisateur
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', ou null
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!API_URL) {
            setErrorMessage("L'URL de l'API (REACT_APP_STRAPI_API_URL) n'est pas définie.");
            setSubmitStatus('error');
            return;
        }

        // Réinitialiser les états avant la soumission
        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage('');

        // Construction du message combiné (incluant le sujet)
        // C'est la solution choisie car l'API n'a pas de champ "sujet" séparé dans le payload.
        const combinedMessage = `Sujet: ${formData.subject || 'Pas de sujet'}\n\n--- Corps du message ---\n\n${formData.message}`;

        // Mappage des données du formulaire au format Strapi attendu
        const payload = {
            data: {
                // Mappage: form.name -> API.nom_complet
                nom_complet: formData.name, 
                // Mappage: form.email -> API.email
                email: formData.email, 
                // Mappage: form.message + subject -> API.message
                message: combinedMessage, 
            }
        };

        try {
            const response = await fetch(`${API_URL}${ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Succès
                setSubmitStatus('success');
                // Réinitialiser le formulaire après un succès
                setFormData({ name: '', email: '', subject: '', message: '' });
                console.log('Demande de contact envoyée avec succès.');
            } else {
                // Erreur de l'API (ex: 400 Bad Request, 500 Server Error)
                const errorData = await response.json();
                setSubmitStatus('error');
                setErrorMessage(errorData.error?.message || `Erreur de soumission: ${response.status} ${response.statusText}`);
                console.error('Erreur lors de l\'envoi:', errorData);
            }

        } catch (error) {
            // Erreur réseau ou de connexion
            setSubmitStatus('error');
            setErrorMessage(`Erreur réseau: Impossible de se connecter à l'API. ${error.message}`);
            console.error('Erreur réseau:', error);
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
                                        disabled={isSubmitting} // Désactiver pendant l'envoi
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
                                        disabled={isSubmitting} // Désactiver pendant l'envoi
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
                                    disabled={isSubmitting} // Désactiver pendant l'envoi
                                />
                            </div>

                            <div className="form-group full-width">
                                <textarea
                                    name="message"
                                    placeholder="Message (Optionnel)"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    disabled={isSubmitting} // Désactiver pendant l'envoi
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting} // Empêche le double-clic
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
