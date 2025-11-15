import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToAnchor = () => {
    // Récupère l'objet location de react-router-dom
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // 1. Si un hash (ancre) est présent dans l'URL (ex: #about)
        if (hash) {
            // Retire le '#' pour obtenir le nom de l'ID (ex: "about")
            const id = hash.replace('#', ''); 
            
            // Tente de trouver l'élément dans le DOM
            const element = document.getElementById(id);
            
            if (element) {
                // Fait défiler jusqu'à cet élément avec un comportement fluide
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } 
        // 2. Si pas de hash, défile vers le haut de la page (comportement par défaut lors d'une navigation vers une nouvelle route)
        else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]); // Déclenche l'effet à chaque changement de chemin ou de hash

    return null; // Ce composant n'a pas de rendu visuel
};

export default ScrollToAnchor;