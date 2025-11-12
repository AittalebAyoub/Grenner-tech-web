import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Ajouter la logique d'envoi ici
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contact" id = "contact">
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
                />
              </div>

              <div className="form-group full-width">
                <textarea
                  name="message"
                  placeholder="Message (Optionnel)"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                Envoyer la demande
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
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;