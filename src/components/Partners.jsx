import React from 'react';

const Partners = () => {
    // Utilisez des chemins d'accès relatifs à la racine de votre dossier public (ex: public/images/logo1.png)
    const partners = [
        // REMPLACEZ LES CHEMINS D'ACCÈS CI-DESSOUS par les noms de fichiers réels de VOS logos dans le dossier public
        { name: 'AM', logo: '/cite_innovation.png' }, 
        { name: 'Domaines Zniber', logo: '/technopark.png' },
        { name: 'Providence Verti', logo: '/odc.png' },
        { name: 'MFRUITS', logo: '/technopark.png' },
        { name: 'ARIFRUIT', logo: '/cite_innovation.png' },
        { name: 'M', logo: '/odc.png' },
        { name: 'ASI', logo: '/technopark.png' },
    ];

    // Dupliquez les partenaires (au moins une fois) pour assurer la boucle de défilement CSS infini
    const duplicatedPartners = [...partners, ...partners];

    return (
        <section className="partners" id = "partners">
            <div className="container">
                <h2 className="partners-title">Nos Partenaires</h2>
                
                {/* Nouveau conteneur pour gérer l'overflow et les effets de fondu */}
                <div className="partners-carousel-wrapper"> 
                    {/* Conteneur qui sera animé pour le défilement */}
                    <div className="partners-grid">
                        {duplicatedPartners.map((partner, index) => (
                            <div key={index} className="partner-logo">
                                {/* L'attribut src pointe vers l'image dans le dossier public */}
                                <img src={partner.logo} alt={partner.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;