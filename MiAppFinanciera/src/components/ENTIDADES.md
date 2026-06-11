# Diccionario de Entidades y Propiedades

Este documento contiene la traducción y descripción de las propiedades utilizadas en las entidades del proyecto.

## 1. CreditCard (Tarjeta de Crédito)
| Propiedad | Traducción al Español | Descripción |
| :--- | :--- | :--- |
| `id` | Identificador | ID único de la tarjeta. |
| `bankName` | Nombre del Banco | Nombre de la entidad emisora. |
| `cardNumber` | Número de Tarjeta | Los 16 dígitos de la tarjeta (con o sin formato). |
| `cardHolder` | Titular | Nombre de la persona impreso en la tarjeta. |
| `expiryDate` | Fecha de Vencimiento | Fecha de expiración (MM/AA). |
| `cvv` | CVV / Código de Seguridad | Código de verificación de 3 o 4 dígitos. |
| `balance` | Saldo | Monto total adeudado o consumido. |
| `limit` | Límite de Crédito | Monto máximo permitido en la tarjeta. |
| `issuer` | Emisor | Marca de la tarjeta (Visa, MasterCard, etc.). |
| `points` | Puntos | Puntos de lealtad acumulados. |
| `miles` | Millas | Millas de viajero frecuente acumuladas. |
| `cashback` | Reembolso (Cashback) | Dinero devuelto por compras realizadas. |
| `pointsToLpsFactor` | Factor Puntos a Lps | Multiplicador para convertir puntos a moneda local. |
| `cashbackRate` | Tasa de Cashback | Porcentaje de devolución (ej. 0.07 para 7%). |
| `maxMonthlyCashback` | Límite Mensual de Cashback | Monto máximo de cashback permitido por mes. |
| `currentMonthCashback` | Cashback Mensual Acumulado | Cashback generado en el ciclo actual. |
| `merchantDiscounts` | Descuentos por Comercio | Lista de comercios con tasas, topes y días específicos de aplicación. |
| `cutoffDate` | Fecha de Corte | Día del mes en que cierra el ciclo de facturación. |
| `dueDate` | Fecha de Pago | Fecha límite para realizar el pago sin intereses. |

## 2. CardsState (Estado de Tarjetas - Redux)
| Propiedad | Traducción al Español | Descripción |
| :--- | :--- | :--- |
| `cards` | Tarjetas | Arreglo/Lista de objetos de tipo `CreditCard`. |

## 3. ScreenWrapperProps (Propiedades del Envoltorio de Pantalla)
| Propiedad | Traducción al Español | Descripción |
| :--- | :--- | :--- |
| `children` | Elementos Hijos | Contenido que se renderiza dentro del contenedor. |
| `style` | Estilos | Estilos de ViewStyle personalizados para el contenedor. |
| `backgroundColor` | Color de Fondo | Color de fondo de la pantalla (por defecto blanco). |
| `edges` | Bordes Seguros | Áreas de la pantalla a proteger (top, bottom, left, right). |

## 4. Validadores (Conceptos)
| Propiedad | Traducción al Español |
| :--- | :--- |
| `email` | Correo Electrónico |
| `phone` | Teléfono |
| `password` | Contraseña |
| `expiryDate` | Fecha de Expiración |