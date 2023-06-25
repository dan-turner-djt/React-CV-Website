const page: string = "/projects";

describe('Edit page', () => {
  before(() => {
    cy.visit('/login');
    cy.readFile("cypress/e2e/Credentials.json").then((creds) => {
      cy.get('[data-cy=username-input]').type(creds.username);
      cy.get('[data-cy=password-input]').type(creds.password);
    })
    cy.get('[data-cy=login-submit]').click();
    cy.wait(500);
  })
  beforeEach(() => {
    cy.visit(page);
  })
  it ('can add entries', () => {
    const editPageButton = cy.get('[data-cy=edit-page-button]');
    editPageButton.click();
    cy.get('[data-cy=form-legend]').contains("New");

    const submitFormButton = cy.get('[data-cy=submit-edit-form-button]');

    cy.get('[data-cy=name-input]').type("Entry1");
    cy.get('[data-cy=body-text-area]').type("Body1");
    submitFormButton.click();

    cy.get('[data-cy=name-input]').type("Entry2");
    cy.get('[data-cy=body-text-area]').type("Body2");
    submitFormButton.click();

    cy.get('[data-cy=name-input]').type("Entry3");
    cy.get('[data-cy=body-text-area]').type("Body3");
    submitFormButton.click();

    cy.get('[data-cy=name-input]').type("Entry4");
    cy.get('[data-cy=body-text-area]').type("Body4");
    submitFormButton.click();

    cy.wait(1000);
    editPageButton.click();
    cy.wait(1000);
    cy.visit(page);
    cy.wait(1000);

    cy.get('[data-cy=Entry1]').should('exist');
    cy.get('[data-cy=Entry2]').should('exist');
    cy.get('[data-cy=Entry3]').should('exist');
    cy.get('[data-cy=Entry4]').should('exist');
  })
  it ('can edit entries', () => {
    const editPageButton = cy.get('[data-cy=edit-page-button]');
    editPageButton.click();

    cy.get('[data-cy=Entry1-edit-button]').click();
    cy.get('[data-cy=form-legend]').contains("Edit");

    const submitFormButton = cy.get('[data-cy=submit-edit-form-button]');
    submitFormButton.contains("Save");

    const input = cy.get('[data-cy=name-input]');
    input.clear();
    input.type("EditedEntry1");
    cy.get('[data-cy=submit-edit-form-button]').click();

    cy.wait(1000);
    editPageButton.click();
    cy.wait(1000);
    cy.visit(page);
    cy.wait(1000);

    cy.get('[data-cy=EditedEntry1]').should('exist');
    
  })
  it ('can reorder entries', () => {
    const editPageButton = cy.get('[data-cy=edit-page-button]');
    editPageButton.click();

    cy.get('[data-cy=EditedEntry1-move-down-button]').click();
    cy.get('[data-cy=Entry3-delete-button]').click();
    cy.get('[data-cy=Entry4-move-up-button]').click();

    //Expected order: 2,4,1

    cy.wait(1000);
    editPageButton.click();
    cy.wait(1000);
    cy.visit(page);
    cy.wait(1000);

    cy.get('[data-cy=Entry3]').should('not.exist');
    cy.get('[data-cy=list-item]').then((items) => {
      const list = Array.from(items);
      // Because this tests a page with other real entries on it we have to actively ignore those
      const otherItemsLength = list.length - 3;
      assert(list[otherItemsLength + 0].innerText.includes("Entry2"));
      assert(list[otherItemsLength + 1].innerText.includes("Entry4"));
      assert(list[otherItemsLength + 2].innerText.includes("Entry1"));
    })
  })
  it ('can delete all entries', () => {
    const editPageButton = cy.get('[data-cy=edit-page-button]');
    editPageButton.click();

    cy.get('[data-cy=EditedEntry1-delete-button]').click();
    cy.get('[data-cy=Entry2-delete-button]').click();
    cy.get('[data-cy=Entry4-delete-button]').click();

    cy.wait(1000);
    editPageButton.click();
    cy.wait(1000);
    cy.visit(page);
    cy.wait(1000);

    cy.get('[data-cy=EditedEntry1]').should('not.exist');
    cy.get('[data-cy=Entry2]').should('not.exist');
    cy.get('[data-cy=Entry3]').should('not.exist');
    cy.get('[data-cy=Entry4]').should('not.exist');
  })
  after(() => {
    const logoutButton = cy.get('[data-cy=login-button');
    logoutButton.contains('Logout');
    logoutButton.click();
  })
})