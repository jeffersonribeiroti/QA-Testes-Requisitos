
// APLICAÇÃO: SauceDemo SwagLabs 
// REQUISITO US001-3 : Ao clicar no produto uma tela com as informações do produto deve ser apresentada 
// ALUNO: Jefferson Ribeiro dos Santos - FICR ADS.
import { test, expect } from '@playwright/test';
//=======================================================Caminho Feliz==================================================================================================================================

//Preciso fazer o login.
//Preciso clicar em algum item, ele deve apresentar uma tela com uma imagem um titulo e descrição detalhada
//Como verificar se deu certo ? Exemplo: Sauce Labs Bike Light
//Mudança de URL - >> https://www.saucedemo.com/inventory.html - >>> https://www.saucedemo.com/inventory-item.html?id=0

test('Ao clicar no produto, uma tela com as informações do produto deve ser apresentada.', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  
  // Preenche credenciais e reliza o login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Valida redirecionamento para a página de inventário
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Clique no produto
  await page.getByText('Sauce Labs Bike Light').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=0');

  await page.pause();
});

//=======================================================Caminho Triste==================================================================================================================================
//Preciso fazer o login
//Preciso clicar em algum item exemplo: (Sauce labs backpack), ao clicar no produto foi apresentado na descrição informações que não
//compoem o produto, dessa forma validando que o cominho triste do requisito -->> carry.allTheThings() <<--.
test('Ao clicar em um item (como o Sauce Labs Backpack), a tela de descrição apresentou informações incorretas, incluindo detalhes que não fazem parte do produto', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  // Preenche credenciais e loga
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  // Valida redirecionamento para a página de inventário
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  // Clique no produto
  await page.getByText('Sauce Labs Backpack').click();
  // Verifica se esse texto: "carry.allTheThings()" está inserido na descrição desse intem dessa forma validando que não faz parte das informações que deveriam ser mostradas! 
await expect(page.getByText('carry.allTheThings()')).toBeVisible();

  await page.pause();
});
