describe('template spec', () => {
  it('visits the page', () => {
    cy.visit('/');
  })
  it('checks the navbar', () => {
    cy.get('[data-cy=navbar]');
  })
})