# GUIDE D'INSTALLATION & PROTOCOLE D'USAGE · ATELIER COLLECTION (V5.2)

Bienvenue dans l'Atelier Collection. Ce kit transforme votre assistant IA (ChatGPT Plus/Team/Pro ou Gemini Advanced) en un véritable **Directeur de Collection de Mode**.

---

## 1. COMPRENDRE LES DEUX PIÈCES FOURNIES

1. **`CHARGEUR_ATELIER_COLLECTION.txt`** (< 8 000 caractères)
   - Contient la gouvernance, les règles de conduite, l'ordre imposé des étapes et les interdictions strictes.
   - **Destination :** Champ **Instructions** de votre GPT personnalisé (ou instructions système d'un Gem Gemini).

2. **`SYSTEME_ATELIER_COLLECTION.md`** (~ 50 000 caractères)
   - Contient l'intégralité des gabarits de prompts, les règles de rédaction R1 à R13, les tableaux de contrôle qualité et la composition des planches.
   - **Destination :** Section **Connaissances (Knowledge / Fichiers)** de votre GPT ou Gem.

---

## 2. INSTALLATION PAS À PAS DANS CHATGPT

1. Rendez-vous sur [chatgpt.com](https://chatgpt.com) → **Explorer les GPTs** → **+ Créer**.
2. Onglet **Configurer** :
   - **Nom :** Atelier Collection · Directeur de Collection
   - **Description :** Conçoit une collection complète de l'univers au lookbook en 6 étapes.
   - **Instructions :** Ouvrez le fichier `CHARGEUR_ATELIER_COLLECTION.txt`, copiez tout son contenu et collez-le dans ce champ.
   - **Connaissances (Knowledge) :** Cliquez sur *Importer des fichiers* et déposez `SYSTEME_ATELIER_COLLECTION.md`.
   - **Fonctionnalités :** Cochez impérativement :
     - ✓ **Génération d'images (DALL·E / GPT Image)**
     - ✓ **Interpréteur de code & Analyse de données (Code Interpreter / Python)**
3. Cliquez sur **Enregistrer** (Privé ou Partagé avec lien).

---

## 3. INSTALLATION DANS GEMINI (GEMS)

1. Rendez-vous sur Gemini Advanced → **Gestionnaire de Gems** → **Nouveau Gem**.
2. Collez le contenu de `CHARGEUR_ATELIER_COLLECTION.txt` dans les **Instructions**.
3. Importez `SYSTEME_ATELIER_COLLECTION.md` dans les documents de référence.
4. Enregistrez votre Gem.

---

## 4. QUEL MODE CHOISIR ?

| Critère | **Mode Direct** | **Mode Carnet** |
|---|---|---|
| **Qui génère** | L'assistant IA directement dans la conversation | Vous-même, dans votre outil favori (Midjourney, Seedream, etc.) |
| **Outils requis** | Assistant avec génération d'images + exécution Python | Assistant conversationnel + générateur d'images séparé |
| **Planches finales** | Composées automatiquement par Python (PNG & PDF) | Dimensions, ordre et textes fournis pour Canva / PowerPoint |
| **Recommandation** | Idéal si vous débutez ★ | Idéal si vous avez des outils et habitudes établis |

---

## 5. PROTOCOLE DE TEST EN 4 POINTS (À FAIRE DÈS L'OUVERTURE)

Testez votre assistant avec ces 4 requêtes pour vérifier que le chargeur est correctement actif :

1. **Test 1 — Fiche Collection d'abord :**  
   *Dites-lui :* « Crée directement la photo du premier look. »  
   *Comportement attendu :* L'assistant doit refuser et vous inviter à définir d'abord l'Étape 1 (Univers, ADN, Palette, Muse).

2. **Test 2 — Zéro texte dans les images :**  
   *Vérification :* Lorsqu'il prépare un prompt pour les planches ou prototypes, vérifiez qu'il n'insère aucun mot ni typographie dans la description de l'image.

3. **Test 3 — Respect du plafond de 5 références :**  
   *Vérification :* À l'étape 4 (prototypes), il doit vous lister précisément 5 images de référence maximum à joindre.

4. **Test 4 — Activation du carnet :**  
   *Vérification :* À chaque image ou étape validée, il doit afficher la ligne du carnet de bord : `[étape X · L1 v1 · images X/16]`.

---

## 6. SÉANCE HEBDOMADAIRE D'ACCOMPAGNEMENT
Vous bloquez sur une étape ou un dessin à plat ?  
Participez à la session d'atelier en direct du samedi pour faire relire votre dossier de collection : **WhatsApp (+225 07 57 51 29 59)**.
