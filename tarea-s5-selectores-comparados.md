markdown
## Desafío 1: Link "Login" del menú
- **HTML del elemento**:
  ```html
  <a data-testid="nav-login" href="/login">Login</a>
  ```
- **Mi propuesta (Fase 1)**: `page.getByRole('link', { name: 'Login' })`
- **Lo que propuso Claude (Fase 2)**: 
1) page.getByRole('link', { name: 'Login' }) 
2) page.getByTestId('nav-login') 
3) page.getByText('Login')
- **¿Qué propuso Claude que NO se me había ocurrido?**: 
`page.getByTestId('nav-login')` — usar el atributo `data-testid` como selector dedicado para testing.
- **Mi elección final + por qué (Fase 3)**: 
`page.getByRole('link', { name: 'Login' })` — porque refleja cómo un usuario real encuentra el elemento (por su rol de enlace y su texto visible), es la estrategia que Playwright recomienda como primera opción, y además valida la accesibilidad del elemento.