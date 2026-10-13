"""Atelier Collection Compact (ChatGPT) — outils de découpe et de composition.

Charger dans l'outil Python de ChatGPT :
    exec(open('/chemin/vers/atelier_tools.py').read())
Toutes les fonctions lisent et écrivent dans /mnt/data par défaut.
Aucune dépendance autre que Pillow.
"""
import os, glob, zipfile
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

DOSSIER = "/mnt/data" if os.path.isdir("/mnt/data") else os.getcwd()


def _p(nom):
    return nom if os.path.isabs(nom) else os.path.join(DOSSIER, nom)


def _ouvre(nom):
    return Image.open(_p(nom)).convert("RGB")


def _sauve(img, nom):
    chemin = _p(nom if nom.lower().endswith((".png", ".jpg", ".pdf")) else nom + ".png")
    img.save(chemin)
    return chemin


def _rogne(img, marge=0.012):
    """Retire une fine marge (gouttières blanches) autour d'une case."""
    w, h = img.size
    mx, my = int(w * marge), int(h * marge)
    return img.crop((mx, my, w - mx, h - my))


# ---------------------------------------------------------------- polices
def trouve_police(serif=False, gras=False, taille=32):
    """Cherche un .ttf déposé dans /mnt/data, puis DejaVu / Liberation."""
    deposees = glob.glob(_p("*.ttf")) + glob.glob(_p("*.otf"))
    candidats = []
    if deposees:
        candidats += sorted(deposees)
    base = "Serif" if serif else "Sans"
    suffixe = "-Bold" if gras else ""
    candidats += [
        f"/usr/share/fonts/truetype/dejavu/DejaVu{base}{suffixe}.ttf",
        f"/usr/share/fonts/truetype/liberation/Liberation{'Serif' if serif else 'Sans'}{'-Bold' if gras else '-Regular'}.ttf",
    ]
    candidats += glob.glob("/usr/share/fonts/**/*.ttf", recursive=True)
    for c in candidats:
        try:
            return ImageFont.truetype(c, taille)
        except Exception:
            continue
    try:
        return ImageFont.load_default(size=taille)
    except TypeError:
        return ImageFont.load_default()


# ---------------------------------------------------------------- découpes
def decoupe_grille(nom, lignes=3, colonnes=3, prefixe="case"):
    """Découpe une grille régulière. Retourne la liste des chemins (ordre de lecture)."""
    img = _ouvre(nom)
    w, h = img.size
    chemins = []
    n = 1
    for r in range(lignes):
        for c in range(colonnes):
            box = (round(c * w / colonnes), round(r * h / lignes),
                   round((c + 1) * w / colonnes), round((r + 1) * h / lignes))
            chemins.append(_sauve(_rogne(img.crop(box)), f"{prefixe}_{n}"))
            n += 1
    return chemins


def decoupe_kit(nom, imprimes=1, noms_cases=None):
    """Planche kit 3x3.
    imprimes=1 : bloc 2x2 (cases 1-2-4-5) -> ref_I1, cases restantes 3,6,7,8,9.
    imprimes=2 : cases 1 et 2 -> ref_I1, ref_I2, cases restantes 3..9.
    noms_cases : liste de noms pour les cases restantes, dans l'ordre (ex. ['adn_D1','adn_D2','mat_lin']).
    """
    img = _ouvre(nom)
    w, h = img.size
    cw, ch = w / 3, h / 3
    def case(i):
        r, c = divmod(i - 1, 3)
        return _rogne(img.crop((round(c * cw), round(r * ch), round((c + 1) * cw), round((r + 1) * ch))))
    sorties = {}
    if imprimes == 1:
        bloc = img.crop((0, 0, round(2 * cw), round(2 * ch)))
        sorties["ref_I1"] = _sauve(_rogne(bloc, 0.008), "ref_I1")
        restantes = [3, 6, 7, 8, 9]
    else:
        sorties["ref_I1"] = _sauve(case(1), "ref_I1")
        sorties["ref_I2"] = _sauve(case(2), "ref_I2")
        restantes = [3, 4, 5, 6, 7, 8, 9]
    noms_cases = noms_cases or [f"case_{i}" for i in restantes]
    for i, nm in zip(restantes, noms_cases):
        sorties[nm] = _sauve(case(i), nm)
    return sorties


def decoupe_paire(nom, look_a="LA", look_b="LB"):
    """Dessin à plat d'une paire (3:2) -> moitié gauche L[a]_plat, moitié droite L[b]_plat."""
    img = _ouvre(nom)
    w, h = img.size
    a = _sauve(img.crop((0, 0, w // 2, h)), f"{look_a}_plat")
    b = _sauve(img.crop((w // 2, 0, w, h)), f"{look_b}_plat")
    return a, b


def decoupe_proto(nom, look="L1", parts=(0.35, 0.35, 0.30)):
    """Prototype 3:2 -> panneau A (face), B (dos), G1, G2, G3."""
    img = _ouvre(nom)
    w, h = img.size
    xa = round(w * parts[0]); xb = round(w * (parts[0] + parts[1]))
    sorties = {
        "A": _sauve(_rogne(img.crop((0, 0, xa, h)), 0.006), f"{look}_face"),
        "B": _sauve(_rogne(img.crop((xa, 0, xb, h)), 0.006), f"{look}_dos"),
    }
    for i in range(3):
        box = (xb, round(i * h / 3), w, round((i + 1) * h / 3))
        sorties[f"G{i+1}"] = _sauve(_rogne(img.crop(box), 0.01), f"{look}_G{i+1}")
    return sorties


def remplace_panneau(proto, panneau_img, zone="A", sortie=None, parts=(0.35, 0.35, 0.30)):
    """Remplace un panneau (A, B, G1, G2, G3) d'un prototype par une image régénérée seule."""
    img = _ouvre(proto)
    w, h = img.size
    xa = round(w * parts[0]); xb = round(w * (parts[0] + parts[1]))
    boxes = {"A": (0, 0, xa, h), "B": (xa, 0, xb, h)}
    for i in range(3):
        boxes[f"G{i+1}"] = (xb, round(i * h / 3), w, round((i + 1) * h / 3))
    x0, y0, x1, y1 = boxes[zone]
    g = 6
    neuf = ImageOps.fit(_ouvre(panneau_img), (x1 - x0 - 2 * g, y1 - y0 - 2 * g), Image.LANCZOS)
    ImageDraw.Draw(img).rectangle(boxes[zone], fill="white")
    img.paste(neuf, (x0 + g, y0 + g))
    return _sauve(img, sortie or os.path.splitext(os.path.basename(proto))[0] + f"_{zone}corrige")


# ---------------------------------------------------------------- assemblages sans texte
def assemble(noms, sortie, colonnes=None, cote=600, fond="#FFFFFF", gouttiere=12):
    """Assemble des tuiles en une grille sans texte (ref_adn, ref_matieres, L3_details, ref_muse)."""
    imgs = [ImageOps.fit(_ouvre(n), (cote, cote), Image.LANCZOS) for n in noms]
    colonnes = colonnes or min(len(imgs), 3)
    lignes = -(-len(imgs) // colonnes)
    W = colonnes * cote + (colonnes + 1) * gouttiere
    H = lignes * cote + (lignes + 1) * gouttiere
    toile = Image.new("RGB", (W, H), fond)
    for i, im in enumerate(imgs):
        r, c = divmod(i, colonnes)
        toile.paste(im, (gouttiere + c * (cote + gouttiere), gouttiere + r * (cote + gouttiere)))
    return _sauve(toile, sortie)


def ref_muse(visage, corps, sortie="ref_muse", hauteur=1200, fond="#E6E6E4"):
    """Gros plan visage + corps de face côte à côte, même hauteur, sans texte."""
    ims = []
    for n in (visage, corps):
        im = _ouvre(n)
        ims.append(im.resize((round(im.width * hauteur / im.height), hauteur), Image.LANCZOS))
    g = 16
    toile = Image.new("RGB", (sum(i.width for i in ims) + 3 * g, hauteur + 2 * g), fond)
    x = g
    for im in ims:
        toile.paste(im, (x, g)); x += im.width + g
    return _sauve(toile, sortie)


# ---------------------------------------------------------------- compositions avec texte
def _medaillon(tuile, diametre, liseré=6):
    t = ImageOps.fit(_ouvre(tuile), (diametre, diametre), Image.LANCZOS)
    masque = Image.new("L", (diametre, diametre), 0)
    ImageDraw.Draw(masque).ellipse((0, 0, diametre - 1, diametre - 1), fill=255)
    D = diametre + 2 * liseré
    m = Image.new("RGBA", (D + 12, D + 12), (0, 0, 0, 0))
    ombre = Image.new("L", (D + 12, D + 12), 0)
    ImageDraw.Draw(ombre).ellipse((6, 8, D + 6, D + 8), fill=90)
    m.putalpha(ombre.filter(ImageFilter.GaussianBlur(5)))
    m = Image.composite(Image.new("RGBA", m.size, (0, 0, 0, 255)), Image.new("RGBA", m.size, (0, 0, 0, 0)), m.split()[3])
    ImageDraw.Draw(m).ellipse((6, 6, D + 6, D + 6), fill=(255, 255, 255, 255))
    m.paste(t, (6 + liseré, 6 + liseré), masque)
    return m


def lineup(faces, legendes, sortie="lineup_v1", tuiles_adn=None, titre="", description="",
           couleur_bandeau="#2B211C", fond="#F4EFE6", hauteur=1400, gouttiere=8):
    """faces : panneaux A découpés ; legendes : [("LOOK 01 — NOM", "ligne de légende"), ...]."""
    ims = [_ouvre(f) for f in faces]
    ims = [i.resize((round(i.width * hauteur / i.height), hauteur), Image.LANCZOS) for i in ims]
    zone_leg = int(hauteur * 0.11)
    bandeau = int(hauteur * 0.13) if titre else 0
    W = sum(i.width for i in ims) + gouttiere * (len(ims) + 1)
    H = hauteur + zone_leg + bandeau + 2 * gouttiere
    toile = Image.new("RGB", (W, H), fond)
    d = ImageDraw.Draw(toile)
    f_titre = trouve_police(serif=True, gras=True, taille=int(hauteur * 0.035))
    f_nom = trouve_police(serif=True, gras=True, taille=int(hauteur * 0.022))
    f_leg = trouve_police(taille=int(hauteur * 0.017))
    x = gouttiere
    for k, im in enumerate(ims):
        toile.paste(im, (x, gouttiere))
        if tuiles_adn and k < len(tuiles_adn) and tuiles_adn[k]:
            dia = int(im.width * 0.28)
            med = _medaillon(tuiles_adn[k], dia)
            toile.paste(med, (x + int(im.width * 0.04), gouttiere + hauteur - med.height - int(hauteur * 0.03)), med)
        nom, leg = legendes[k] if k < len(legendes) else ("", "")
        cx = x + im.width // 2
        d.text((cx, gouttiere + hauteur + int(zone_leg * 0.22)), nom, font=f_nom, fill="#1E1A17", anchor="mt")
        d.text((cx, gouttiere + hauteur + int(zone_leg * 0.6)), leg, font=f_leg, fill="#5A524B", anchor="mt")
        x += im.width + gouttiere
    if titre:
        y0 = H - bandeau
        d.rectangle((0, y0, W, H), fill=couleur_bandeau)
        d.text((W // 2, y0 + bandeau * 0.38), titre.upper(), font=f_titre, fill="#F4EFE6", anchor="mm")
        d.text((W // 2, y0 + bandeau * 0.72), description, font=f_leg, fill="#E8DFD0", anchor="mm")
    png = _sauve(toile, sortie)
    toile.save(_p(sortie + ".pdf"), resolution=200)
    return png, _p(sortie + ".pdf")


def bandeau(proto, nom, description, sortie=None, fond="#F2EBDD", encre="#2B211C"):
    """Ajoute un bandeau écru sous un prototype : nom en capitales serif, description, filet."""
    im = _ouvre(proto)
    w, h = im.size
    hb = int(h * 0.14)
    toile = Image.new("RGB", (w, h + hb), fond)
    toile.paste(im, (0, 0))
    d = ImageDraw.Draw(toile)
    f_nom = trouve_police(serif=True, taille=int(hb * 0.30))
    f_desc = trouve_police(taille=int(hb * 0.16))
    titre = "  ".join(nom.upper())  # capitales espacées
    d.text((w // 2, h + hb * 0.34), titre, font=f_nom, fill=encre, anchor="mm")
    d.line((w * 0.42, h + hb * 0.58, w * 0.58, h + hb * 0.58), fill=encre, width=2)
    d.text((w // 2, h + hb * 0.76), description.upper(), font=f_desc, fill=encre, anchor="mm")
    return _sauve(toile, sortie or os.path.splitext(os.path.basename(proto))[0].replace("proto", "planche"))


def cote_a_cote(gauche, droite, sortie, gouttiere=24, fond="#FFFFFF"):
    """Présente deux planches côte à côte, même hauteur."""
    a, b = _ouvre(gauche), _ouvre(droite)
    h = min(a.height, b.height)
    a = a.resize((round(a.width * h / a.height), h)); b = b.resize((round(b.width * h / b.height), h))
    toile = Image.new("RGB", (a.width + b.width + 3 * gouttiere, h + 2 * gouttiere), fond)
    toile.paste(a, (gouttiere, gouttiere)); toile.paste(b, (2 * gouttiere + a.width, gouttiere))
    return _sauve(toile, sortie)


def recap_dessins(plats, legendes, sortie="recap_dessins_v1", hauteur=1000):
    """Récapitulatif des dessins : moitié gauche (vue FACE) de chaque L[n]_plat, alignées, légendées."""
    faces = []
    for p in plats:
        im = _ouvre(p)
        faces.append(_sauve(im.crop((0, 0, im.width // 2, im.height)), os.path.splitext(os.path.basename(p))[0] + "_face_tmp"))
    return lineup(faces, legendes, sortie=sortie, fond="#FAF8F4", hauteur=hauteur)


# ---------------------------------------------------------------- pack de reprise
def pack_reprise(nom_collection, version=1, motifs=("*.md", "*.png", "*.jpg")):
    """Zip des fiches .md et des fichiers validés présents dans /mnt/data."""
    sortie = _p(f"pack_{nom_collection}_v{version}.zip")
    with zipfile.ZipFile(sortie, "w", zipfile.ZIP_DEFLATED) as z:
        for m in motifs:
            for f in glob.glob(_p(m)):
                if not f.endswith("_tmp.png"):
                    z.write(f, os.path.basename(f))
    return sortie
