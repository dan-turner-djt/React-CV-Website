describe('Login', () => {
  it('clicks the login button and navigates to the login page', () => {
    cy.visit('/');
    const loginButton = cy.get('[data-cy=login-button');
    loginButton.contains('Login');
    loginButton.click();
    cy.url().should('include', '/login');
  })
  describe('Attempt login', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('[data-cy=username-input]').clear();
      cy.get('[data-cy=password-input]').clear();
    })
    it('will not login with bad credentials', () => {
      cy.get('[data-cy=username-input]').type('username');
      cy.get('[data-cy=password-input]').type('password');
      cy.get('[data-cy=login-submit]').click();
  
      cy.wait(1000);
      cy.get('[data-cy=login-error-message]').should('be.visible');
    })
    it('will login with good credentials and navigate away', () => {
      cy.readFile("cypress/e2e/Credentials.json").then((creds) => {
        cy.get('[data-cy=username-input]').type(creds.username);
        cy.get('[data-cy=password-input]').type(creds.password);
      })
      cy.get('[data-cy=login-submit]').click();
  
      cy.wait(1000);
      cy.url().should('not.contain', '/login');
    })
  })
  describe('Logout', () => {
    it('will logout', () => {
      const logoutButton = cy.get('[data-cy=login-button');
      logoutButton.contains('Logout');
      logoutButton.click();
      logoutButton.contains('Login');
    })
  })
})