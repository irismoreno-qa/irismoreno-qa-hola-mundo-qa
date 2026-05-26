import { test, expect } from '@playwright/test';

test.describe('SauceDemo E2E E-commerce Flow', () => {

  test('should successfully purchase a product', async ({ page }) => {
    // 1. Navegar a la página de inicio (utiliza la baseURL del archivo de configuración)
    await page.goto('/');
    
    // Verificar que el título de la página sea el esperado
    await expect(page).toHaveTitle(/Swag Labs/);

    // 2. Iniciar sesión
    // Usamos selectores modernos recomendados por Playwright (getByPlaceholder, getByRole)
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Validar que se ha iniciado sesión correctamente verificando la cabecera principal y la URL
    await expect(page).toHaveURL(/inventory.html/);
    const titleSpan = page.locator('.title');
    await expect(titleSpan).toHaveText('Products');

    // 3. Agregar un producto al carrito (ej. Sauce Labs Backpack)
    // Buscamos el elemento contenedor del producto por su nombre y hacemos clic en el botón de agregar
    const backpackContainer = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    const productButton = backpackContainer.getByRole('button');
    await expect(productButton).toHaveText('Add to cart', { ignoreCase: true });
    await productButton.click();

    // 4. Validar que el botón cambie a "Remove" y que el contador del carrito muestre 1
    await expect(productButton).toHaveText('Remove', { ignoreCase: true });
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

    // 5. Ir al carrito de compras
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator('.title')).toHaveText('Your Cart');

    // Validar que el producto agregado esté en el carrito
    const cartItem = page.locator('.cart_item');
    await expect(cartItem).toContainText('Sauce Labs Backpack');
    await expect(cartItem.locator('.inventory_item_price')).toHaveText('$29.99');

    // 6. Proceder al checkout
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');

    // 7. Completar la información del cliente
    await page.getByPlaceholder('First Name').fill('Iris');
    await page.getByPlaceholder('Last Name').fill('Moreno');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();

    // 8. Verificar la descripción general del checkout
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
    
    // Validar el precio total aproximado (Subtotal: $29.99 + Impuestos)
    const subtotalLabel = page.locator('.summary_subtotal_label');
    await expect(subtotalLabel).toContainText('$29.99');

    // 9. Finalizar la compra
    await page.getByRole('button', { name: 'Finish' }).click();

    // 10. Validar la pantalla de éxito
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
    
    const completeHeader = page.locator('.complete-header');
    await expect(completeHeader).toHaveText('Thank you for your order!');
    
    const completeText = page.locator('.complete-text');
    await expect(completeText).toContainText('Your order has been dispatched');

    // Regresar a la página de productos
    await page.getByRole('button', { name: 'Back Home' }).click();
    await expect(page).toHaveURL(/inventory.html/);
  });

});
