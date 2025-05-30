import { test, expect } from '@playwright/test';

test('Login com credenciais válidas leva à página de produtos', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Preenche os campos de login usando page.fill
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Verifica se foi redirecionado corretamente
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

// Teste de login inválido

test('Login com usuário ou senha inválidos, deve emitir uma mensagem de erro', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    // Preenche usuário e senha inválidos
  await page.fill('[data-test="username"]', 'usuario_invalido');
  await page.fill('[data-test="password"]', 'senha_invalida');
  await page.click('[data-test="login-button"]');

  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')

});

// Teste de login em branco

test('Login com usuário e senha em branco, deve emitir uma mensagem de erro', async ({ page }) => {
    // Preenche usuário e senha em branco
    await page.fill('[data-test="username"]', ''); //campo em branco(inválido)
    await page.fill('[data-test="password"]', ''); //campo em branco(inválido)
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required')
});

test('Login com usuário em branco, deve emitir uma mensagem de erro', async ({ page }) => {
    // Preenche usuário ou senha em branco
    await page.fill('[data-test="username"]', ''); //campo em branco(inválido)
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required')
});

test('Login com senha em branco, deve emitir uma mensagem de erro', async ({ page }) => {
    // Preenche usuário ou senha em branco
    await page.fill('[data-test="username"]', 'standard_user'); 
    await page.fill('[data-test="password"]', ''); //campo em branco(inválido)
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required')
});

