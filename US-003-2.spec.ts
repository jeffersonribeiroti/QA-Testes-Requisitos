import { test, expect } from '@playwright/test';

test("Verificar se ao selecionar um item , o contador será incremetado (+1)", async ({page}) => {

  await page.goto('https://www.saucedemo.com');
  
  test.step('login', async () => {
// Preenche os campos de login usando page.fill
await page.fill('[data-test="username"]', 'standard_user');
await page.fill('[data-test="password"]', 'secret_sauce');
await page.click('[data-test="login-button"]');
 })
await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

//Cria uma variável para receber o objeto e logo após verifica se está visível e acrescentou +1
const contador = page.locator('.shopping_cart_badge');
await expect(contador).toBeVisible();
await expect(contador).toHaveText('1');

//Pausar durante a execução do programa
await page.pause();
}
)
