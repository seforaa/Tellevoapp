# Tellevoapp

-- LISTA DE COMANDOS PARA LA CREACION DE EL USUARIO EN LA BASE DE DATOS

alter session set "_ORACLE_SCRIPT"=true;

CREATE USER nombre IDENTIFIED BY password;

GRANT CONNECT, RESOURCE TO nombre;

ALTER USER nombre DEFAULT TABLESPACE USERS QUOTA UNLIMITED ON USERS;

-- COMANDOS PARA DJANGO

pip install djangorestframework

pip install cx_oracle

pip install pillow

python -m pip install django-cors-headers

-- COMANDOS PARA CORRER EL SERVIDOR

python manage.py makemigrations pruebaApp

python manage.py migrate

python manage.py createsuperuser

-- COMANDOS PARA LA CREACION DE OBJETOS EN POSTMAN

CREACION DE USUARIO METODO POST

http://127.0.0.1:8000/lista_usuarios/ 

campos: user / password

CREACION DE AUTO METODO POST

http://127.0.0.1:8000/lista_autos/

campos: patente / duenno / destino / salida

-- COMANDOS INICIAR IONIC

npm install npm --force

ionic serve

npm install cordova-plugin-email-composer
