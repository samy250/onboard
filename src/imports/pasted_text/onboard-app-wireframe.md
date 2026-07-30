<<<<<<< HEAD
=======
<<<<<<< HEAD
# PROMPT FIGMA MAKE — Maquette ONBOARD

Crée une maquette (wireframe haute-fidélité) complète pour une application web de formation appelée "ONBOARD", destinée à former les employés d'agences de voyage à l'utilisation du logiciel Airbooks. L'application a 3 types d'utilisateurs : Agent (Comptable/Accountant ou Booking Staff), Manager/Owner (patron d'agence), et Administrateur (équipe Neema).

## CHARTE GRAPHIQUE À RESPECTER STRICTEMENT
- Fond dominant : BLANC partout (la majorité de l'interface)
- BLEU : couleur principale — boutons d'action, barre de navigation, liens, éléments actifs
- VERT : uniquement pour signifier succès/validé (module terminé, quiz réussi)
- ROUGE : uniquement pour signifier erreur/bloqué (accès expiré, quiz échoué)
- JAUNE : uniquement pour signifier avertissement/en cours (module en cours, alerte)
- Ne jamais utiliser rouge/vert/jaune de façon décorative — toujours avec cette signification précise
- Style épuré, simple, guidé — l'application doit être facile à utiliser même pour des utilisateurs peu à l'aise avec la technologie (public peu autodidacte)

## IMPORTANT — ÉDITABILITÉ
Structure chaque écran avec des calques/éléments bien séparés et nommés clairement (textes, boutons, champs, images, cartes distincts), afin que je puisse facilement sélectionner et modifier individuellement chaque élément après la génération (couleur, texte, position, taille). Évite de fusionner plusieurs éléments en une seule image ou un seul bloc non détaillé.

---

## ÉCRAN 1 — Page de bienvenue (Landing)
- Logo en haut à gauche
- Menu de navigation en haut : "Accueil", "Contact", et bouton "Se connecter" à droite
  (PAS de lien "À propos" dans le menu de navigation)
- Titre principal centré : "Application de formation à Airbooks avec ONBOARD"
- Juste en dessous : un paragraphe descriptif (2-3 phrases) présentant l'application ONBOARD — ce texte constitue la section "à propos", intégré directement dans la page, pas un lien séparé
- Bouton principal "S'inscrire" (fond bleu, texte blanc)
- Lien secondaire discret "Déjà un compte ? Se connecter"

## ÉCRAN 2 — Inscription
- Logo en haut à gauche
- Titre : "Commencez votre formation sur Airbooks avec ONBOARD"
- Formulaire à droite avec les champs : Nom, Prénom, Mot de passe, Email, Nom de l'agence
- Bouton "S'inscrire" (bleu)
- En bas : texte "Déjà un compte ?" + lien "Se connecter"

## ÉCRAN 3 — Connexion
- Titre : "Bon retour sur ONBOARD — entrez vos informations"
- Champ Email
- Champ Mot de passe
- Case à cocher "Se souvenir de moi pendant 30 jours" + lien "Mot de passe oublié ?"
- Bouton "Se connecter" (bleu)
- En bas : "Pas de compte ? S'inscrire"
- Prévoir un état alternatif de cet écran (variante) affichant un message d'alerte en rouge sous le formulaire : "⚠️ Votre accès a expiré après 6 mois d'inactivité. Veuillez contacter votre administrateur pour le renouveler."

## ÉCRAN 4 — Accueil utilisateur (vue Agent : Comptable ou Booking Staff)
- Barre de navigation en haut avec logo, sélecteur de langue "Français", icône profil
- Message de bienvenue personnalisé
- Liste des modules de formation correspondant au profil connecté de l'utilisateur, sous forme de cartes, chaque carte affichant :
  - Nom du module
  - Statut visuel : "Terminé" (vert), "En cours" (jaune), "Verrouillé" (gris avec icône cadenas — non cliquable tant que le module précédent n'est pas validé)
  - Bouton "Consulter" actif uniquement si le module est déverrouillé

## ÉCRAN 5 — Visionnage d'un module (leçon vidéo)
- Barre de navigation en haut (logo, langue, profil)
- Colonne de gauche : liste des modules et sous-liste des leçons de chaque module (ex: Module 1 > Leçon 1, Leçon 2, Leçon 3...)
- Zone centrale : lecteur vidéo avec barre de progression et minuteur (ex: 0:00 / 15:00)
- Sous la vidéo : titre de la leçon en cours et bouton "Leçon suivante"

## ÉCRAN 6 — Quiz (questions)
- Titre "Quiz"
- Liste de questions Q1, Q2, Q3, Q4 (chacune avec un espace pour choix de réponse à cocher, style QCM)
- Bouton "Envoyer" (bleu) en bas

## ÉCRAN 7 — Résultats du quiz
- Titre "Résultats du Quiz"
- Pour chaque question (Q1, Q2...) : indication réponse correcte + courte explication
- Si quiz réussi : message en vert "Quiz réussi, allez on avance !" + bouton "Cours suivant"
- Si quiz échoué : bouton "Recommencer" (rouge ou orange)

## ÉCRAN 8 — Tableau de bord Manager/Owner
- Barre de navigation en haut : logo, "Accueil", "Tableau de bord", icône profil (badge "Manager"), sélecteur de langue
- Filtre déroulant en haut de la page : sélection du profil à afficher ("Accountant / Comptable" ou "Booking Staff")
- **Section 1 — Progression individuelle (se met à jour selon le filtre) :**
  Une ligne par employé du profil sélectionné, affichant :
  - Nom de l'employé
  - Module actuellement en cours
  - Une série de puces représentant les leçons du module en cours : ● pour leçon validée, ○ pour leçon restante
  - Une légende visible une fois en haut de cette section : "● Leçon validée   ○ Leçon restante"
- **Section 2 — Taux de complétion moyen par module (se met à jour selon le filtre) :**
  Un diagramme à barres horizontales, un module par ligne (Module 1 à Module 5), chaque barre affichant le pourcentage moyen de l'équipe filtrée ayant complété ce module, avec le pourcentage affiché au-dessus de chaque barre

## ÉCRAN 9 — Administration : gestion des modules
- Barre de navigation en haut : logo, sélecteur de langue, icône profil (badge "Admin")
- Colonne de gauche : navigation "Modules" / "Suivi d'activité"
- Zone principale : liste des Modules (communs à toutes les agences), chaque ligne affichant :
  - Nom du module
  - Icône "Modifier" (crayon)
  - Icône "Supprimer" (corbeille)
- Bouton "+" pour ajouter un nouveau module
- Chaque module, une fois cliqué, doit permettre d'accéder à la gestion de ses Leçons (liste des leçons avec les mêmes actions modifier/supprimer/ajouter)

## ÉCRAN 10 — Administration : suivi d'activité global
- Même barre de navigation que l'écran 9
- Tableau listant TOUS les utilisateurs de TOUTES les agences confondues, avec les colonnes :
  - Nom
  - Agence
  - Statut (Actif / Complété)
  - Dernière action effectuée
  - Date et heure de cette dernière action

---

## COHÉRENCE GÉNÉRALE À RESPECTER SUR TOUS LES ÉCRANS
- Même barre de navigation (logo, position, style) répétée sur tous les écrans internes (4 à 10)
- Même style de boutons partout (coins arrondis, couleur bleue pour actions principales)
- Respect strict des couleurs et de leur signification définie plus haut
=======
>>>>>>> main
# PROMPT FIGMA MAKE — Maquette ONBOARD

Crée une maquette (wireframe haute-fidélité) complète pour une application web de formation appelée "ONBOARD", destinée à former les employés d'agences de voyage à l'utilisation du logiciel Airbooks. L'application a 3 types d'utilisateurs : Agent (Comptable/Accountant ou Booking Staff), Manager/Owner (patron d'agence), et Administrateur (équipe Neema).

## CHARTE GRAPHIQUE À RESPECTER STRICTEMENT
- Fond dominant : BLANC partout (la majorité de l'interface)
- BLEU : couleur principale — boutons d'action, barre de navigation, liens, éléments actifs
- VERT : uniquement pour signifier succès/validé (module terminé, quiz réussi)
- ROUGE : uniquement pour signifier erreur/bloqué (accès expiré, quiz échoué)
- JAUNE : uniquement pour signifier avertissement/en cours (module en cours, alerte)
- Ne jamais utiliser rouge/vert/jaune de façon décorative — toujours avec cette signification précise
- Style épuré, simple, guidé — l'application doit être facile à utiliser même pour des utilisateurs peu à l'aise avec la technologie (public peu autodidacte)

## IMPORTANT — ÉDITABILITÉ
Structure chaque écran avec des calques/éléments bien séparés et nommés clairement (textes, boutons, champs, images, cartes distincts), afin que je puisse facilement sélectionner et modifier individuellement chaque élément après la génération (couleur, texte, position, taille). Évite de fusionner plusieurs éléments en une seule image ou un seul bloc non détaillé.

---

## ÉCRAN 1 — Page de bienvenue (Landing)
- Logo en haut à gauche
- Menu de navigation en haut : "Accueil", "Contact", et bouton "Se connecter" à droite
  (PAS de lien "À propos" dans le menu de navigation)
- Titre principal centré : "Application de formation à Airbooks avec ONBOARD"
- Juste en dessous : un paragraphe descriptif (2-3 phrases) présentant l'application ONBOARD — ce texte constitue la section "à propos", intégré directement dans la page, pas un lien séparé
- Bouton principal "S'inscrire" (fond bleu, texte blanc)
- Lien secondaire discret "Déjà un compte ? Se connecter"

## ÉCRAN 2 — Inscription
- Logo en haut à gauche
- Titre : "Commencez votre formation sur Airbooks avec ONBOARD"
- Formulaire à droite avec les champs : Nom, Prénom, Mot de passe, Email, Nom de l'agence
- Bouton "S'inscrire" (bleu)
- En bas : texte "Déjà un compte ?" + lien "Se connecter"

## ÉCRAN 3 — Connexion
- Titre : "Bon retour sur ONBOARD — entrez vos informations"
- Champ Email
- Champ Mot de passe
- Case à cocher "Se souvenir de moi pendant 30 jours" + lien "Mot de passe oublié ?"
- Bouton "Se connecter" (bleu)
- En bas : "Pas de compte ? S'inscrire"
- Prévoir un état alternatif de cet écran (variante) affichant un message d'alerte en rouge sous le formulaire : "⚠️ Votre accès a expiré après 6 mois d'inactivité. Veuillez contacter votre administrateur pour le renouveler."

## ÉCRAN 4 — Accueil utilisateur (vue Agent : Comptable ou Booking Staff)
- Barre de navigation en haut avec logo, sélecteur de langue "Français", icône profil
- Message de bienvenue personnalisé
- Liste des modules de formation correspondant au profil connecté de l'utilisateur, sous forme de cartes, chaque carte affichant :
  - Nom du module
  - Statut visuel : "Terminé" (vert), "En cours" (jaune), "Verrouillé" (gris avec icône cadenas — non cliquable tant que le module précédent n'est pas validé)
  - Bouton "Consulter" actif uniquement si le module est déverrouillé

## ÉCRAN 5 — Visionnage d'un module (leçon vidéo)
- Barre de navigation en haut (logo, langue, profil)
- Colonne de gauche : liste des modules et sous-liste des leçons de chaque module (ex: Module 1 > Leçon 1, Leçon 2, Leçon 3...)
- Zone centrale : lecteur vidéo avec barre de progression et minuteur (ex: 0:00 / 15:00)
- Sous la vidéo : titre de la leçon en cours et bouton "Leçon suivante"

## ÉCRAN 6 — Quiz (questions)
- Titre "Quiz"
- Liste de questions Q1, Q2, Q3, Q4 (chacune avec un espace pour choix de réponse à cocher, style QCM)
- Bouton "Envoyer" (bleu) en bas

## ÉCRAN 7 — Résultats du quiz
- Titre "Résultats du Quiz"
- Pour chaque question (Q1, Q2...) : indication réponse correcte + courte explication
- Si quiz réussi : message en vert "Quiz réussi, allez on avance !" + bouton "Cours suivant"
- Si quiz échoué : bouton "Recommencer" (rouge ou orange)

## ÉCRAN 8 — Tableau de bord Manager/Owner
- Barre de navigation en haut : logo, "Accueil", "Tableau de bord", icône profil (badge "Manager"), sélecteur de langue
- Filtre déroulant en haut de la page : sélection du profil à afficher ("Accountant / Comptable" ou "Booking Staff")
- **Section 1 — Progression individuelle (se met à jour selon le filtre) :**
  Une ligne par employé du profil sélectionné, affichant :
  - Nom de l'employé
  - Module actuellement en cours
  - Une série de puces représentant les leçons du module en cours : ● pour leçon validée, ○ pour leçon restante
  - Une légende visible une fois en haut de cette section : "● Leçon validée   ○ Leçon restante"
- **Section 2 — Taux de complétion moyen par module (se met à jour selon le filtre) :**
  Un diagramme à barres horizontales, un module par ligne (Module 1 à Module 5), chaque barre affichant le pourcentage moyen de l'équipe filtrée ayant complété ce module, avec le pourcentage affiché au-dessus de chaque barre

## ÉCRAN 9 — Administration : gestion des modules
- Barre de navigation en haut : logo, sélecteur de langue, icône profil (badge "Admin")
- Colonne de gauche : navigation "Modules" / "Suivi d'activité"
- Zone principale : liste des Modules (communs à toutes les agences), chaque ligne affichant :
  - Nom du module
  - Icône "Modifier" (crayon)
  - Icône "Supprimer" (corbeille)
- Bouton "+" pour ajouter un nouveau module
- Chaque module, une fois cliqué, doit permettre d'accéder à la gestion de ses Leçons (liste des leçons avec les mêmes actions modifier/supprimer/ajouter)

## ÉCRAN 10 — Administration : suivi d'activité global
- Même barre de navigation que l'écran 9
- Tableau listant TOUS les utilisateurs de TOUTES les agences confondues, avec les colonnes :
  - Nom
  - Agence
  - Statut (Actif / Complété)
  - Dernière action effectuée
  - Date et heure de cette dernière action

---

## COHÉRENCE GÉNÉRALE À RESPECTER SUR TOUS LES ÉCRANS
- Même barre de navigation (logo, position, style) répétée sur tous les écrans internes (4 à 10)
- Même style de boutons partout (coins arrondis, couleur bleue pour actions principales)
- Respect strict des couleurs et de leur signification définie plus haut
<<<<<<< HEAD
=======
>>>>>>> main
>>>>>>> main
- Design simple, aéré, avec beaucoup d'espace blanc, adapté à des utilisateurs non-experts en informatique