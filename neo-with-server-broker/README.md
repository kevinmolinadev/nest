# NEO

## Descripción
NEO es un sistema de ventas de productos desarrollado con [NestJS](https://nestjs.com/), un framework progresivo de Node.js. Este proyecto utiliza una arquitectura de microservicios para garantizar una aplicación escalable y eficiente.

## Proyecto Actual
El sistema NEO se compone de los siguientes microservicios:
- **Gateway**: Puerta de enlace que conecta los microservicios y actúa como el punto de entrada al sistema NEO.
- **Order Service**: Gestiona las órdenes de compra. Utiliza una base de datos PostgreSQL.
- **Product Service**: Gestiona los productos. Utiliza una base de datos SQLite.

Actualmente, al momento de crear una orden, el Order Service verifica que los productos incluidos en la orden existen en el Product Service a través de una conexión TCP directa. Si bien esta implementación asegura la verificación en tiempo real, genera un fuerte acoplamiento entre los microservicios.

## Server Broker - Servidor Intermediario
Un servidor broker suele ser un software o servicio que gestiona y coordina las interacciones entre clientes y servidores, es un intermediario que facilita la comunicación entre diferentes componentes de un sistema distribuido. a menudo facilitando la comunicación, el equilibrio de carga, la gestión de recursos o la intermediación de solicitudes

## Server Brokers de Mensajería
Facilitan la comunicación entre diferentes partes de una aplicación o diferentes aplicaciones gestionando colas de mensajes. Aseguran que los mensajes se enrutan, almacenan y entregan correctamente. Algunos ejemplos de server brokers de mensajería son:
   - **RabbitMQ**: Soporta varios protocolos de mensajería. Es conocido por su robustez y flexibilidad.
   - **Kafka**: Un sistema de streaming distribuido diseñado para manejar grandes volúmenes de datos en tiempo real. Kafka es muy utilizado para la transmisión y procesamiento de eventos.
   - **NATS**: Ligero y de alto rendimiento que se centra en la simplicidad y la velocidad

### Selección de Server Broker para NEO
Para abordar los desafíos de acoplamiento y escalabilidad en el proyecto NEO, se ha decidido implementar un server broker de mensajería. Después de evaluar varias opciones, hemos optado por utilizar **NATS** debido a sus características de simplicidad, rendimiento y escalabilidad.

## Implementación con NATS
Con la introducción de NATS como nuestro server broker, la arquitectura del proyecto NEO se modifica de la siguiente manera:

### Nueva Arquitectura
- **Gateway**: Ahora se conecta a NATS para la transmisión y recepción de mensajes.
- **Order Service**: Se conecta a NATS para recibir mensajes de verificación de productos y para enviar mensajes de creación de órdenes.
- **Product Service**: Se conecta a NATS para recibir solicitudes de verificación de productos y para enviar respuestas de disponibilidad de productos.

### Ventajas de la Nueva Implementación
- **Desacoplamiento**: Los microservicios ya no dependen directamente unos de otros. La comunicación se realiza a través de NATS, lo que reduce la interdependencia.
- **Escalabilidad**: La introducción de nuevos microservicios es más sencilla y no requiere modificaciones en los servicios existentes.
- **Fiabilidad**: NATS proporciona alta disponibilidad y baja latencia, lo que mejora el rendimiento del sistema.
- **Flexibilidad**: Facilita la implementación de nuevas funcionalidades y la adaptación a cambios en los requisitos del negocio.