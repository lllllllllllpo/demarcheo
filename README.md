# Démarchéo — Site MVP

Service privé d'assistance aux démarches administratives. Site statique HTML/CSS/JS, prêt à déployer.

## 📂 Arborescence

```
demarcheo/
├── index.html                          # Homepage
├── styles.css                          # Design system mutualisé
├── script.js                           # Interactions + filtre FAQ
├── robots.txt                          # Indexation
├── sitemap.xml                         # Sitemap MVP
├── README.md                           # Ce fichier
│
├── acte-de-naissance/
│   ├── index.html                      # Money page (2055 mots)
│   └── copie-integrale/
│       └── index.html                  # Variante SEO (2107 mots)
│
├── comment-ca-marche/
│   └── index.html                      # Trust page (1854 mots)
│
└── faq/
    └── index.html                      # FAQ complète (36 questions)
```

## 🎨 Design

- **Direction visuelle** : Service public privé (vert sapin + accent or)
- **Couleurs principales** : `#1F4A3A` (brand) / `#C8A961` (accent) / `#FAFAF7` (background)
- **Typographies** : IBM Plex Sans (corps) + Source Serif Pro (titres) via Google Fonts
- **Responsive** : mobile-first, 2 breakpoints (900px et 560px)

## ✅ Pages livrées

| Page | URL | Mots | H2 | H3 | Schema.org |
|------|-----|------|----|----|------------|
| Homepage | `/` | ~600 | 6 | — | Organization + WebSite + Service |
| Acte de naissance | `/acte-de-naissance/` | 2055 | 10 | 18 | Article + Breadcrumb + FAQPage |
| Copie intégrale | `/acte-de-naissance/copie-integrale/` | 2107 | 10 | 22 | Article + Breadcrumb + FAQPage |
| Comment ça marche | `/comment-ca-marche/` | 1854 | 9 | 19 | HowTo + Breadcrumb + FAQPage |
| FAQ complète | `/faq/` | 2220 | 8 | — | Breadcrumb + FAQPage (12 Q) |

**Total : ~9 000 mots de contenu SEO** indexables.

## 🛡️ Garde-fous DGCCRF intégrés

1. ✅ Bandeau légal en haut de toutes les pages
2. ✅ Mention "Service privé indépendant de l'administration française"
3. ✅ Renvoi vers service-public.fr (30+ mentions sur le site)
4. ✅ Bloc transparence sur chaque page principale
5. ✅ Section "Ce que Démarchéo n'est pas" dans /comment-ca-marche/
6. ✅ FAQ dédiée à la légitimité dans /faq/
7. ✅ Footer disclaimer complet
8. ✅ Aucun bleu-blanc-rouge, aucune Marianne, typographie neutre

## 🚀 Déploiement

### Option 1 — GitHub Pages (recommandé)

```bash
cd demarcheo
git init
git add .
git commit -m "Initial commit : Démarchéo MVP"
git remote add origin git@github.com:VOTRE_USER/demarcheo.git
git push -u origin main
```

Puis : `Settings > Pages > Source: main > /` — URL en quelques minutes.

### Option 2 — Cloudflare Pages

1. Connecter le repo GitHub
2. Build command : *(vide, site statique)*
3. Output directory : `/`
4. Activer le domaine custom : `demarcheo.fr`

### Option 3 — Test local

```bash
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000
```

## ⚠️ À compléter avant la mise en ligne

### Critique (bloquant)
- [ ] Vérifier la disponibilité de `demarcheo.fr` sur l'AFNIC + INPI
- [ ] Créer la structure juridique (SASU recommandée) et récupérer SIRET
- [ ] Remplacer "X €" et "XXX XXX XXX 00000" dans les footers
- [ ] Mettre en place les pages manquantes : `/cgv/`, `/mentions-legales/`, `/politique-confidentialite/`, `/politique-cookies/`, `/a-propos/`, `/contact/`
- [ ] Brancher Stripe Checkout + Make.com webhook sur `/commande/`
- [ ] Bandeau cookies conforme CNIL (Axeptio, Tarteaucitron…)
- [ ] Faire relire les CGV par un avocat spécialisé

### Important (avant lancement campagne)
- [ ] Page `/acte-de-naissance/extrait/` (3e variante SEO)
- [ ] Stratégie tarifaire (prix dévoilé dans le tunnel /commande/)
- [ ] Plausible Analytics ou GA4
- [ ] Image OG personnalisée (`og-image.jpg` 1200x630)
- [ ] Favicon final (remplacer le SVG inline)
- [ ] Logo PNG/SVG pour `logo.png` référencé dans Schema.org

### Améliorations (post-MVP)
- [ ] Pages pSEO `/acte-de-naissance/[commune]/` (~35 000 pages)
- [ ] Dashboard de suivi client `/commande/suivi/[hash]/`
- [ ] Intégration Trustpilot (widget social proof)
- [ ] Blog avec 3 articles SEO long-tail
- [ ] Nouvelles démarches (acte de mariage, acte de décès…)

## 🔧 Stack technique

- **HTML5 sémantique** : `<section>`, `<article>`, `aria-labelledby`, `<details>` pour FAQ
- **CSS pur** : 16 tokens design system via variables CSS, mobile-first
- **JS vanilla** : zéro dépendance, ~140 lignes
- **Polices** : Google Fonts (preconnect optimisé)
- **Schema.org** : JSON-LD enrichi sur chaque page (Article, FAQPage, HowTo, Breadcrumb)

## 📐 SEO intégré

- Title + meta description optimisés par page
- Open Graph + Twitter Cards
- Canonical, robots, hreflang prêts
- Schema.org enrichi (rich snippets Google)
- Sitemap.xml + robots.txt
- Hiérarchie H1/H2/H3 propre
- Maillage interne stratégique

## 🎨 Composants UI réutilisables

- `legal-bar` — bandeau légal top
- `hero` / `page-hero` — sections de tête
- `breadcrumb` — fil d'Ariane
- `toc` — sommaire latéral sticky
- `timeline` — étapes verticales
- `compare-table` / `compare-with-without` — tableaux comparatifs
- `callout` (`callout-warning`) — encarts d'information
- `do-dont` — listes côte à côte transparence
- `guarantees` — cards de garanties
- `faq-item` — accordéon FAQ avec recherche/filtres
- `inline-cta` — CTA au milieu du contenu

## 📝 Maintenance

- **Update couleurs** : `styles.css` lignes 36-50 (variables CSS)
- **Update textes** : sections clairement délimitées dans chaque HTML
- **Update tracking** : `script.js` ligne 56 (hook Make.com webhook commenté)

## Licence

© 2026 Démarchéo — Tous droits réservés.
