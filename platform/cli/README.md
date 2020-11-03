# Nextply CLI

## Introducción

NextplyCLI es una utilidad para ayudar a los desarrolladores a trabajar con el nuevo entorno y la nueva arquitectura. 



## Requisitos

Se requiere tener instalado Node para poder instalar y ejecutar la herramienta



## Instalación

La instalación es muy sencilla. Basta con ejecutar:

````shell
npm install -g nextply-cli
````



## Uso

### Creación de un servicio

Para crear un servicio, simplemente ejecutamos:

````javascript
nextply
````

El sistema nos preguntará información acerca del servicio que queremos crear y lanzará la creación del servicio. En la siguiente imagen se puede ver el proceso:

![creacion_servicio](images/nextply-cli.gif)

# Implementación

La implementación del cliente es muy sencilla. Es un proyecto NodeJs que consta de:

- Fichero principal (main.js): que se encarga de recoger los datos
- Fichero de ejecución de comandos (servicebuild.js): que se encarga del ejecutar el comando Maven asociado a la creación del servicio



Realiza validaciones que no se pueden realizar utilizando directamente el comando Maven:

- ArtifactId en minúsculas y solo caracteres alfanuméricos
- GroupId en formato de paquete Java (xxx.yyy.zzz)
- Nombre de aplicación en Camel Case



## Publicación

La publicación de la librería se realiza mediante la ejecución del pipeline de Jenkins (contenido en el fichero Jenkinsfile)

