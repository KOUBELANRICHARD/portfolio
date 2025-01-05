# On utilise la version Ubuntu 22.04 LTS
# Je pouvais partir sur alpine mais l'idée est de partie sur un site web statique
# Ensuite arrivé à une application monolothique et afin aboutir aux microservices  
FROM ubuntu:22.04  

# Pour éviter les interactions pendant l'installation  
ENV DEBIAN_FRONTEND=noninteractive  

# Mise à jour du système et installation des paquets nécessaires  
RUN apt-get update && apt-get install -y \
    apache2 \
    php \
    libapache2-mod-php \
    php-mysql \
    git \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*  

# Activer le module Apache rewrite  
RUN a2enmod rewrite  

# Définir le répertoire de travail  
WORKDIR /var/www/html  

# Copier les fichiers du projet  
COPY . /var/www/html/  

# Définir les permissions  
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html  

# Exposer le port 80  
EXPOSE 80  

# Démarrer Apache  
CMD ["apache2ctl", "-D", "FOREGROUND"]