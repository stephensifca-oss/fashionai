/* ============================================================
   fashionai.agency — helpers de mouvement interactif
   Version 1.0 · 26 août 2026

   Dépendance unique :  npm i motion
   Import mini uniquement — 2,6 ko.

   PÉRIMÈTRE STRICT : ce fichier ne couvre QUE ce que le CSS
   ne peut pas faire. Toute révélation au scroll passe par
   motion.css. Si vous êtes tenté d'ajouter une animation de
   scroll ici, c'est qu'une classe CSS manque.
   ============================================================ */

import { animate } from 'motion/mini'

/* --- Jetons, alignés sur motion.css --- */
const FAST = 0.18
const BASE = 0.6
const EASE_OUT: [number, number, number, number] = [0.2, 0.7, 0.3, 1]

/** Respecte le choix système de l'utilisateur. */
const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ------------------------------------------------------------
   1. MENU MOBILE
   Le panneau est monté dans le DOM et masqué par attribut,
   jamais détruit — pour que le focus reste gérable.
   ------------------------------------------------------------ */

export function openMenu(panel: HTMLElement, items: HTMLElement[]) {
  panel.hidden = false
  if (reduced()) return

  animate(panel, { opacity: [0, 1] }, { duration: FAST, ease: EASE_OUT })
  animate(
    items,
    { opacity: [0, 1], y: [8, 0] },
    { duration: BASE, ease: EASE_OUT, delay: (i: number) => i * 0.04 }
  )
}

export function closeMenu(panel: HTMLElement) {
  if (reduced()) {
    panel.hidden = true
    return
  }
  animate(panel, { opacity: [1, 0] }, { duration: FAST, ease: EASE_OUT })
    .then(() => { panel.hidden = true })
}

/* ------------------------------------------------------------
   2. FAÇADE VIDÉO
   L'iframe YouTube n'est JAMAIS dans le HTML initial —
   elle coûte environ 800 ko et détruit le LCP mobile.
   Elle est injectée au clic, et à ce moment seulement.
   ------------------------------------------------------------ */

export function mountVideo(facade: HTMLElement, youtubeId: string) {
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`
  iframe.title = 'Tutoriel vidéo'
  iframe.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture'
  iframe.allowFullscreen = true
  iframe.style.cssText = 'width:100%;aspect-ratio:16/9;border:0;display:block'

  facade.replaceChildren(iframe)
  if (!reduced()) {
    animate(iframe, { opacity: [0, 1] }, { duration: FAST, ease: EASE_OUT })
  }
}

/* ------------------------------------------------------------
   3. CHIPS DE QUALIFICATION
   Retour immédiat au doigt. La sélection doit être perçue
   avant même que l'utilisateur relève le doigt.
   ------------------------------------------------------------ */

export function pressChip(chip: HTMLElement) {
  if (reduced()) return
  animate(chip, { scale: [1, 0.97, 1] }, { duration: FAST, ease: EASE_OUT })
}

/* ------------------------------------------------------------
   4. ÉTAT DE SOUMISSION DU FORMULAIRE
   Le bouton dit ce qui se passe. Pas de spinner tournant :
   un libellé qui change est plus clair et coûte moins.
   ------------------------------------------------------------ */

export function setSubmitting(button: HTMLButtonElement, on: boolean) {
  button.disabled = on
  button.textContent = on ? 'Préparation du kit…' : 'Télécharger le kit'
  if (!reduced()) {
    animate(button, { opacity: on ? 0.6 : 1 }, { duration: FAST })
  }
}

/* ------------------------------------------------------------
   5. ERREUR DE CHAMP
   Une secousse latérale de 4 px, une seule fois. Le message
   d'erreur reste la source de vérité — l'animation ne fait
   que diriger le regard vers lui.
   ------------------------------------------------------------ */

export function shakeField(field: HTMLElement) {
  field.setAttribute('aria-invalid', 'true')
  if (reduced()) return
  animate(field, { x: [0, -4, 4, -2, 0] }, { duration: 0.32, ease: EASE_OUT })
}

/* ------------------------------------------------------------
   6. COMPTE À REBOURS DE LA SÉANCE
   Met à jour le texte de la prochaine date. Aucun compteur
   animé : les chiffres se remplacent, ils ne défilent pas.
   ------------------------------------------------------------ */

export function updateSessionDate(el: HTMLElement, nextDate: Date) {
  const label = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Africa/Abidjan',
  }).format(nextDate)

  el.textContent = label.charAt(0).toUpperCase() + label.slice(1)
  if (!reduced()) {
    animate(el, { opacity: [0, 1] }, { duration: FAST, ease: EASE_OUT })
  }
}
