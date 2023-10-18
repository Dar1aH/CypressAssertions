/// <reference types="cypress"/>

const tableTest = [
  {
      args: {
          position: 'top-right',
          title: 'test title',
          content: 'test content',
          time: '1000',
          type: 'primary'
      },
      expected: {
          icon: 'email',
          color: 'rgb(51, 102, 255)',
          position: {
              justifyContent: "flex-end",
              alignItems: "flex-start"
          }
      }
  },
  {
      args: {
          position: 'bottom-left',
          title: 'test title',
          content: 'test content',
          time: '1000',
          type: 'success'
      },
      expected: {
          icon: 'checkmark',
          title: 'test title',
          content: 'test content',
          color: 'rgb(0, 214, 143)',
          position: {
              justifyContent: "flex-start",
              alignItems: "flex-end"
          }
      }
  }
];

beforeEach('Open page', () => {
  cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com/');

  cy.get('[src="assets/images/dark-theme.jpg"]').click();
  cy.get('[title="Modal & Overlays"]').click();
  cy.get('[title="Toastr"]').click();

})

tableTest.forEach(({args, expected}) => {
  it(`Toast test for position ${args.position}, and type ${args.type}`, () => {

      cy.get('ngx-toastr', {timeout: 15000}).should('be.visible');
      cy.get('div.col-md-6.col-sm-12  button.select-button').eq(0).click();
      cy.get(`nb-option[ng-reflect-value="${args.position}"]`).click();
      cy.get(`input[name="title"]`).clear().type(`${args.title}`);
      cy.get(`input[name="content"]`).clear().type(`${args.content}`);
      cy.get(`input[name="timeout"]`).clear().type(`${args.time}`);
      cy.get(`div.col-md-6.col-sm-12  button.select-button`).eq(1).click();
      cy.get(`nb-option[ng-reflect-value="${args.type}"]`).click();
      cy.contains('button', 'Show toast').click();
      cy.get('nb-toast[ng-reflect-toast]', {timeout: 1000}).then(toast => {
          cy.wrap(toast).should('contain', args.title)
              .and('contain', args.content)
              .and('have.css', 'background-color')
              .and('eq', expected.color);

          expect(toast).to.have.css('background-color', `${expected.color}`)
          cy.wrap(toast).find(`g[data-name="${expected.icon}"]`).should('exist');

          cy.wrap(toast).parents('.toastr-overlay-container').should('have.css', 'justify-content').and('eq', expected.position.justifyContent);
          cy.wrap(toast).parents('.toastr-overlay-container').should('have.css', 'align-items').and('eq', expected.position.alignItems);
      });

  })
})
