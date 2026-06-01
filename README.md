# 🎭 SauceDemo Automation with Playwright & TypeScript

[![Playwright](https://img.shields.io/badge/Playwright-v1.44.0-green.svg?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.0-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js->=16-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Website](https://img.shields.io/badge/Tested%20Site-SauceDemo-orange.svg)](https://www.saucedemo.com/)

Este es un proyecto de automatización de pruebas de extremo a extremo (E2E) desarrollado con **Playwright** y **TypeScript** para el sitio web de práctica e-commerce **[SauceDemo](https://www.saucedemo.com/)**.

El objetivo del proyecto es simular y validar el flujo completo de compra de un producto, asegurando que todos los componentes clave de la tienda online funcionen de manera integrada y correcta..

---

## 🚀 Características del Proyecto

- **Estructura Moderna:** Configurado con TypeScript para un tipado estricto y seguro.
- **Selectores de Buenas Prácticas:** Implementa localizadores recomendados por Playwright (`getByPlaceholder`, `getByRole`, etc.) para una mayor robustez y menor susceptibilidad a cambios en el DOM.
- **Configuración Completa:** Generación automática de reportes HTML, capturas de pantalla (`screenshot`) en fallos, grabación de video y trazas (`traces`) detalladas.
- **Ejecución Flexible:** Soporte para ejecución en modo headless, headed y con la interfaz interactiva UI de Playwright.

---

## 📁 Estructura del Directorio

```bash
Dia 2/
├── tests/
│   └── saucedemo.spec.ts       # Suite de pruebas E2E principal
├── playwright.config.ts        # Configuración global de Playwright
├── package.json                # Scripts y dependencias del proyecto
└── README.md                   # Documentación del proyecto (este archivo)
```

---

## 🛠️ Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** (Versión 16 o superior recomendada)
- **npm** (Viene integrado con Node.js)

---

## 📥 Instalación

1. **Clonar o abrir el directorio del proyecto** en tu terminal.
2. **Instalar las dependencias de Node.js:**
   ```bash
   npm install
   ```
3. **Instalar los navegadores de Playwright:**
   ```bash
   npx playwright install chromium
   ```

---

## ⚙️ Configuración (`playwright.config.ts`)

El archivo de configuración principal de Playwright está optimizado para proporcionar la mejor experiencia de depuración y ejecución:

- **Navegador por Defecto:** Google Chrome (Chromium).
- **Paralelismo:** Ejecución completamente en paralelo (`fullyParallel: true`).
- **Base URL:** `https://www.saucedemo.com` (permite simplificar las navegaciones en los specs a `await page.goto('/')`).
- **Reportes:** Generador de reportes en HTML (`html`).
- **Depuración Automática:**
  - **Trazas (`trace`):** Se retienen si la prueba falla (`retain-on-failure`).
  - **Capturas (`screenshot`):** Se toma captura únicamente en caso de fallo (`only-on-failure`).
  - **Video:** Se graba el video de la prueba y se guarda si hay fallos (`retain-on-failure`).

---

## 📋 Detalle del Flujo de Pruebas (`saucedemo.spec.ts`)

La suite realiza un flujo completo **End-to-End (E2E)** que abarca los siguientes 10 pasos cruciales:

1. **Navegación:** Acceso al sitio web SauceDemo y validación del título de la página (`Swag Labs`).
2. **Autenticación (Login):** Ingreso con las credenciales estándar (`standard_user` y `secret_sauce`) y validación de acceso exitoso al inventario.
3. **Selección de Producto:** Búsqueda y adición del producto `Sauce Labs Backpack` al carrito de compras.
4. **Validación del Carrito (UI):** Comprobación de que el botón cambie a "Remove" y que el contador del carrito muestre exactamente `1`.
5. **Revisión del Carrito:** Navegación a la página del carrito y verificación de la correcta inclusión del producto y su precio (`$29.99`).
6. **Checkout (Inicio):** Inicio del proceso de pago ingresando a la pantalla de información personal.
7. **Información de Envío:** Completar los datos requeridos (Nombre: *Iris*, Apellido: *Moreno*, Código Postal: *12345*).
8. **Resumen de Compra (Overview):** Validación de que los datos de compra coincidan (Subtotal de `$29.99` antes de impuestos).
9. **Finalización:** Confirmación definitiva del pedido mediante clic en el botón *Finish*.
10. **Confirmación de Compra:** Validación de la pantalla de éxito con el mensaje `"Thank you for your order!"` y retorno seguro a la página principal de inventario.

---

## 🏃 Scripts de Ejecución

En el archivo `package.json` se han configurado diferentes comandos para facilitar la ejecución y análisis de los resultados:

### 1. Ejecución Estándar (Modo Headless)
Corre todas las pruebas en segundo plano (ideal para Integración Continua - CI):
```bash
npm run test
```

### 2. Ejecución con Interfaz Gráfica (Modo Headed)
Ejecuta las pruebas mostrando el navegador físico en pantalla para observar el flujo visual en tiempo real:
```bash
npm run test:headed
```

### 3. Modo Interactivo de Playwright (UI Mode)
Abre la excelente interfaz de usuario interactiva de Playwright que permite debugear, ver paso a paso la ejecución, inspeccionar selectores y viajar en el tiempo con la traza de los eventos:
```bash
npm run test:ui
```

### 4. Mostrar Reporte HTML
Abre el último reporte HTML generado por las pruebas para una revisión a fondo de los tiempos, capturas de pantalla, logs y videos resultantes:
```bash
npm run report
```

---

*Proyecto desarrollado con fines educativos y de QA Automation.*
