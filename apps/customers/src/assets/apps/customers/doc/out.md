# Micro Frontends

# MOTIVACION

## AUTONOMÍA

Se centran esfuerzos en conseguir arquitecturas demicroservicios\, con componentes independientes\, centradas enBackend, pero, en muchos casos, se continua con monolitos y trabajo centralizado en elFrontend, penalizando la autonomía real\.

## VALOR = FEATURES END-TO-END

Debemos tener siempre en mente que la entrega de valor al cliente se materializa en el momento en que se completa y despliega una feature end\-to\-end

<img src="img/microfrontends_202011.png" width=500px />

## REUTILIZACIÓN FUNCIONAL

A menudo, se proporcionan los servicios o APIs para que sean consumidos por aplicaciones frontales.

En muchas ocasiones, se re implementa en esas aplicaciones frontales la misma funcionalidad

<img src="img/microfrontends_202012.png" width=500px />



Por lo tanto, al no proporcionar una implementación end-to-end sino que se construye la misma funcionalidad pero con diferentes implementaciones, no podemos hablar de una funcionalidad exacta

## MUTABILIDAD

Al implementar las mismas vistas consumiendo datos de los mismos servicios pero en __diferentes__  __aplicaciones__, con  __diferentes__  __equipos__  __y owners__ , se puede caer en el problema de estar construyendo ”diferentes” funcionalidades o __funcionalidades__  __mutables__, dependiendo de la implementación de la vista

<img src="img/microfrontends_202013.png" width=500px />

# OBJETIVOS

## AUTONOMÍA END-TO-END Y VISIÓN DE PRODUCTO

El objetivo principal es poder construir y desplegar funcionalidadesend\-to\-end de forma independiente, con un __enfoque de PRODUCTO__



## EQUIPOS END-TO-END Y PRODUCTOS

Construir un producto consiste en dedicar un equipo a gobernar y satisfacer las necesidades, objetivos y entrega de valor con una visión end\-to\-end: __OWNERSHIP__

# FUNCIONALIDADES INMUTABLES

Consecuencia de un enfoque de PRODUCTO __es entregar funcionalidades__  __end__  __\-to\-__  __end__  __y por tanto inmutables__ \.

<img src="img/microfrontends_202023.png" width=500px />

## POLIGLOTISMO EN FRONT

Por norma general, se opta por un único framework de construcción en Front acoplando la evolución a dicho FW\. El objetivo es poder usar diferentes FWs según las necesidades03

# MICRO FRONTENDS



## MICRO FRONTENDS: ESTILO DE ARQUITECTURA

<img src="img/microfrontends_202032.png" width=500px />

## PRINCIPALES CARACTERÍSTICAS

Las principales características de los Micro Frontends son similares a las de los Microservicios:



