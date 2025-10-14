FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    git unzip libpng-dev libonig-dev libxml2-dev zip curl && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN a2enmod rewrite
COPY ./apache.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html
