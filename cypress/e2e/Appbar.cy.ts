describe('Appbar', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const testCorrectItemsShowInBar = ({links, loginButton, compactMenu}: {links: boolean, loginButton: boolean, compactMenu: boolean}) => {
    describe('Bar items', () => {
      if (links) {
        it ('shows the links', () => {
          cy.get('[data-cy=page-link]').should('be.visible');
        });
      } else {
        it ('does not show the links', () => {
          cy.get('[data-cy=page-link]').should('not.be.visible');
        });
      }
  
      if (loginButton) {
        it ('shows the login button', () => {
          cy.get('[data-cy=login-button]').should('be.visible');
        });
      } else {
        it ('does not show the login button', () => {
          cy.get('[data-cy=login-button]').should('not.exist');
        });
      }
  
      if (compactMenu) {
        it ('shows the compact menu', () => {
          cy.get('[data-cy=menu-button]').should('be.visible');
        });
      } else {
        it ('does not show the compact menu', () => {
          cy.get('[data-cy=menu-button]').should('not.be.visible');
        });
      }
    });
  }

  const testCorrectItemsShowInMenu = ({links, login}: {links: boolean, login: boolean}) => {
    describe('Menu items', () => {
      beforeEach(() => {
        cy.get('[data-cy=menu-button]').click();
      });

      if (links) {
        it ('shows the link menu items', () => {
          cy.get('[data-cy=link-menu-item]').should('be.visible');
        });
      } else {
        it ('does not show the link menu items', () => {
          cy.get('[data-cy=link-menu-item]').should('not.exist');
        });
      }

      if (login) {
        it ('shows the login menu item', () => {
          cy.get('[data-cy=login-menu-item]').should('be.visible');
        });
      } else {
        it ('does not show the login menu item', () => {
          cy.get('[data-cy=login-menu-item]').should('not.exist');
        });
      }
    });
  }

  describe('Large size', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
    });
    testCorrectItemsShowInBar({links: true, loginButton: true, compactMenu: false});
  });
  describe('Medium size', () => {
    beforeEach(() => {
      cy.viewport(1000, 1080);
    });
    testCorrectItemsShowInBar({links: false, loginButton: true, compactMenu: true});
    testCorrectItemsShowInMenu({links: true, login: false});
  });
  describe('Small size', () => {
    beforeEach(() => {
      cy.viewport(320, 1080);
    });
    testCorrectItemsShowInBar({links: false, loginButton: false, compactMenu: true});
    testCorrectItemsShowInMenu({links: true, login: true});
  });
});