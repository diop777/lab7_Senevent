```
========================================================================================
                                RÉPUBLIQUE DU SÉNÉGAL
                     UNIVERSITÉ CHEIKH ANTA DIOP DE DAKAR (UCAD)
                     FACULTÉ DES SCIENCES ET TECHNIQUES (FST)
              DÉPARTEMENT DE MATHÉMATIQUES ET INFORMATIQUE (DMI)
             MASTER 1 RÉSEAUX ET TÉLÉCOMMUNICATIONS (M1 RETEL)
                            ANNÉE : 2025 – 2026

      MODULE : DAWM (DÉVELOPPEMENT D'APPLICATIONS WEB & MOBILE)
      ENSEIGNANT : DR. EL HADJI BASSIROU TOURE (DMI / FST / UCAD)
========================================================================================

                            RAPPORT DE TRAVAUX PRATIQUES
                                       LAB 0
                                   GIT ET GITHUB
                       TRAVAILLER À TROIS SUR LE MÊME CODE
         « Avant d'écrire une ligne de React, apprendre à ne pas s'écraser »

      PROJET : SenEvent (Plateforme Événementielle Partagée Monorepo)
      TAG DE VALIDATION : v0-init
      BRANCHE GIT : main

----------------------------------------------------------------------------------------
  PRÉSENTÉ PAR :
    • Ousseynou DIOP (Étudiant M1 RETEL)
    • Équipe SenEvent : Atou DIALLO (Git Master Labs 0–2), Mansour NDIAYE, Khady FALL

  SOUS LA SUPERVISION DE :
    • Dr. El Hadji Bassirou TOURE (Enseignant-Chercheur, DMI / UCAD)

  DATE DE REMISE : NOVEMBRE 2026
========================================================================================
```

---

# 1. Introduction et Objectifs Pédagogiques

Le **Lab 0** constitue le socle méthodologique du module DAWM. Construire SenEvent à plusieurs sans outil de versionnement rigoureux conduit inévitablement à des écrasements de code, des pertes de fonctionnalités et des incohérences de versions.

Les acquis essentiels de ce lab sont :
1. **Compréhension des 3 zones locales de Git** : Répertoire de travail (Working Directory), Zone de préparation (Staging / Index) et Dépôt local (.git).
2. **Authentification par clés SSH (ed25519)** : Connexion sécurisée à GitHub sans mot de passe en clair.
3. **Protection de la branche `main`** : Obligation stricte de passer par des branches `feature/<prenom>/<sujet>` et des Pull Requests revues avant fusion.
4. **Pratique et résolution de conflit Git** : Collision provoquée sur la devise de l'équipe dans `README.md`, arbitrage d'équipe et commit de résolution.
5. **Marquage par tag `v0-init`** : Poser la première pierre de la chaîne des 13 tags du semestre.

---

# 2. Composition de l'Équipe (`equipe/`)

Le répertoire `equipe/` à la racine contient la fiche individuelle de chaque collaborateur :

### `equipe/atou.md`
```markdown
# Atou Diallo
- Formation precedente : Licence Informatique
- Ce que je veux apprendre dans ce cours : Developpement mobile React Native et architecture cloud
- Telephone de test pour le mobile : iPhone
```

### `equipe/mansour.md`
```markdown
# Mansour Ndiaye
- Formation precedente : Licence Reseaux & Telecoms
- Ce que je veux apprendre dans ce cours : Build d'APK Android avec EAS et gestion d'API Supabase
- Telephone de test pour le mobile : Android
```

### `equipe/khady.md`
```markdown
# Khady Fall
- Formation precedente : Licence Informatique
- Ce que je veux apprendre dans ce cours : Integration continue, React Router et tests de recette mobile
- Telephone de test pour le mobile : Android
```

---

# 3. Résolution du Conflit sur la Devise (`README.md`)

Deux branches concurrentes ont été créées simultanément :
- `feature/mansour/devise` proposant : `Devise : Un code, deux ecrans`
- `feature/khady/devise` proposant : `Devise : Dakar dans la poche`

Après fusion de la proposition de Mansour, la PR de Khady est entrée en conflit automatique :
```markdown
## Devise de l'equipe
<<<<<<< HEAD
Devise : Un code, deux ecrans
=======
Devise : Dakar dans la poche
>>>>>>> feature/khady/devise
```

L'équipe a arbitré et retenu la synthèse des deux idées :
```markdown
## Devise de l'equipe
Devise : Un code, deux ecrans, Dakar dans la poche
```
Khady a résolu le conflit en local et validé la fusion par le commit explicite :
`git commit -m "resout le conflit sur la devise"`.

---

# 4. Sorties Terminales Côté Enseignant

```bash
# 1. Vérification des contributeurs et commits
$ git shortlog -sne v0-init
     6  Ousseynou Diop <ousseynoudiopcoki@gmail.com>
     3  Khady Fall <khady.fall@ucad.sn>
     2  Atou Diallo <atou.diallo@ucad.sn>
     2  Mansour Ndiaye <mansour.ndiaye@ucad.sn>

# 2. Vérification des fusions de Pull Requests
$ git log --merges --oneline v0-init
edf108d Merge pull request #5 from feature/khady/devise
0bca3dd resout le conflit sur la devise
431565f Merge pull request #4 from feature/mansour/devise
3c5948b Merge pull request #3 from feature/khady/presentation
5a885cd Merge pull request #2 from feature/mansour/presentation
b2b1750 Merge pull request #1 from feature/atou/presentation

# 3. Vérification du commit de résolution de conflit
$ git log --oneline --grep="conflit" v0-init
0bca3dd resout le conflit sur la devise

# 4. Présence des fiches dans equipe/
$ ls equipe/
atou.md   khady.md   mansour.md
```

---

# 5. Graphe Visuel des Branches et Fusions (`v0-init`)

```text
*   edf108d Merge pull request #5 from feature/khady/devise
|\  
| *   0bca3dd resout le conflit sur la devise
| |\  
| |/  
|/|   
* |   431565f Merge pull request #4 from feature/mansour/devise
|\ \  
| * | 45c4d59 propose une devise
|/ /  
| * 738c85a propose une devise
|/  
*   3c5948b Merge pull request #3 from feature/khady/presentation
|\  
| * bdae0fd ajoute la fiche de Khady
|/  
*   5a885cd Merge pull request #2 from feature/mansour/presentation
|\  
| * d91716e ajoute la fiche de Mansour
|/  
*   b2b1750 Merge pull request #1 from feature/atou/presentation
|\  
| * 190794a ajoute la fiche de Atou
|/  
* 0fbefae squelette du depot : README et gitignore
```

---

# 6. Checklist de Validation du Lab 0

| Point de contrôle exigé | État | Justification technique |
|---|:---:|---|
| Identités Git configurées | **Validé** | `user.name` et `user.email` définis pour chaque membre |
| Clé SSH reconnue | **Validé** | Authentification `ed25519` sur GitHub validée |
| Branche main protégée | **Validé** | Pull Request obligatoire pour toute fusion |
| Fichier `.gitignore` complet | **Validé** | Ignore `.env`, `dist/`, `.expo/`, `node_modules/` |
| Dossier `equipe/` complet | **Validé** | Fiches `atou.md`, `khady.md`, `mansour.md` présentes |
| Conflit résolu dans l'historique | **Validé** | Commit `resout le conflit sur la devise` présent |
| Tag officiel `v0-init` | **Validé** | Posé sur `main` et poussé sur GitHub |
