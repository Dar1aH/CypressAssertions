/// <reference types="cypress"/>

const tableTest = [
    {
        args: {
            position: "top-right",
            title: "Hello World:)",
            content: "You are awesome!",
            time: "1000",
            type: "primary"
        },
        expected: {
            icon: "email",
            title: "Hello World:)",
            content: "You are awesome!",
            color: "rgb(51, 102, 255)",
            position: {
                justifyContent: "flex-end",
                alignItems: "flex-start"
            }
        }
    },
    {
        args: {
            position: "bottom-left",
            title: "Success",
            content: "You did great!",
            time: "1000",
            type: "success"
        },
        expected: {
            icon: "checkmark",
            title: "Success",
            content: "You did great!",
            color: "rgb(0, 214, 143)",
            position: {
                justifyContent: "flex-start",
                alignItems: "flex-end"
            }
        }
    },
    {
        args: {
            position: "top-left",
            title: "Information",
            content: "How can I help?",
            time: "1000",
            type: "info"
        },
        expected: {
            icon: "question-mark",
            title: "Information",
            content: "How can I help?",
            color: "rgb(0, 149, 255)",
            position: {
                justifyContent: "flex-start",
                alignItems: "flex-start"
            }
        }
    },
    {
        args: {
            position: "bottom-right",
            title: "Warning",
            content: "This is against the rules!",
            time: "1000",
            type: "warning"
        },
        expected: {
            icon: "alert-triangle",
            title: "Warning",
            content: "This is against the rules!",
            color: "rgb(255, 170, 0)",
            position: {
                justifyContent: "flex-end",
                alignItems: "flex-end"
            }
        }
    },
    {
        args: {
            position: "bottom-start",
            title: "Danger",
            content: "This can be dangerous!",
            time: "1000",
            type: "danger"
        },
        expected: {
            icon: "flash",
            title: "Danger",
            content: "This can be dangerous!",
            color: "rgb(255, 61, 113)",
            position: {
                justifyContent: "flex-start",
                alignItems: "flex-end"
            }
        }
    }
  ];
  describe('Test Toast Notifications', () => {
    beforeEach('Access the page', () => {
      cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com');
      cy.get('img[src="assets/images/corporate-theme.jpg"]').click();
      cy.get('a[title="Modal & Overlays"]').click();
      cy.get('a[title="Toastr"]').click();
    });
  
    tableTest.forEach(({ args, expected }) => {
      it(`Parametrized test for toast position ${args.position} and type ${args.type}`, () => {
        cy.get('nb-card-header').should('include.text', 'Toaster configuration');
        cy.get('div.form-group button.select-button:contains("top-right")').click();
        cy.get(`nb-option[ng-reflect-value="${args.position}"]`).click();
        cy.get('input[name="title"]').clear().type(`${args.title}`);
        cy.get('input[name="content"]').clear().type(`${args.content}`);
        cy.get('input[name="timeout"]').clear().type(`${args.time}`);
        cy.get('div.form-group button.select-button:contains("primary")').click();
        cy.get(`nb-option[ng-reflect-value="${args.type}"]`).click();
        cy.get('nb-card-footer button:contains("Show toast")').click();
        cy.get('nb-toast[ng-reflect-toast="[object Object]"]',{timeout:1000})
          .then(toast =>{ 
        cy.wrap(toast).should('contain', args.title).and('contain', args.content)
          .and('have.css', 'background-color', expected.color);  
        expect(toast).to.have.css('background-color', `${expected.color}`); 
        cy.wrap(toast).find(`g[data-name=${expected.icon}]`).should('exist');  
        cy.wrap(toast).parents('.toastr-overlay-container')
          .should('have.css', 'justify-content').and('eq', expected.position.justifyContent);
        cy.wrap(toast).parents('.toastr-overlay-container')
          .should('have.css','align-items').and('eq', expected.position.alignItems);  
      
          })

      });
    });
  });