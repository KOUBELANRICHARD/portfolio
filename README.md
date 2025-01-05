# Portfolio de Richard AKPAGNI

## 📋 À propos

Ce portfolio présente mon parcours professionnel, mes compétences et réalisations en tant que Technicien réseau et cloud.

## 🛠 Technologies utilisées

- HTML5
- CSS3
- JavaScript
- Git/GitHub
- Docker
- Apache

## 🚀 Installation et utilisation en local

1. Clonez le repository
   ```bash
   git clone https://github.com/KOUBELANRICHARD/portfolio.git
   ```

## 🐳 Installation avec Docker

1. Clonez le repository
   ```bash
   git clone https://github.com/KOUBELANRICHARD/portfolio.git
   cd portfolio
   ```
2. Construire l'image Docker

   ```bash
   docker build -t koubelanrichard/portfolio:1.0 .
   ```

3. Lancer le conteneur
   ```bash
   docker run -d -p 8080:80 koubelanrichard/portfolio:1.0
   ```
4. Accéder au portfolio
   '''Navigateur
   http://localhost:8080  
   '''

## 📦 Gestion Docker

# Lister les images

docker images

# Supprimer l'image

docker rmi koubelanrichard/portfolio:1.0

# Voir les conteneurs actifs

docker ps

# Voir tous les conteneurs

docker ps -a

# Arrêter le conteneur

docker stop <container_id>

# Supprimer le conteneur

docker rm <container_id>

# Voir les logs

docker logs <container_id>
