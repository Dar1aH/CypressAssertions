///<reference types="cypress"/>

describe('Querying Elements',()=>{
    it('Querying 1', () => {
        cy.visit('/commands/querying');
        cy.get('#query-btn', {timeout:1000}).should('contain','Button');
        cy.get('li.first:contains("apples")').should('contain', 'apples');
        cy.contains('apples').should('contain', 'apples');
        cy.contains('.fourth', 'apples').should('contain', 'apples');

        cy.get('#querying').contains('oranges').should('contain', 'oranges');

    // .within allows to work with blocks of different sizes 

        cy.get('.query-form').within(()=>{
            cy.get('#inputEmail').type('dfslfgjl');
            cy.root().then(el =>{
                cy.log(el);// displays html code of the element 
            })
        })


    cy.root().should('contain', 'oranges'); // <html>    
    
      })

   // cy.root get the root element <html> tag 
   
   it('Traversal', () => {
    cy.visit('http://localhost:8080/commands/traversal');
    cy.get('.traversal-breadcrumb.breadcrumb').children().should('have.length', '3');
    cy.get('.traversal-breadcrumb.breadcrumb').children('.active').should('have.text', 'Data');
    // .closest goes up the DOM 
    cy.contains('.traversal-badge', '54').closest('ul').should('have.class', 'list-group');

    cy.contains('John').closest('table').should('have.class', 'traversal-table');

    cy.get('.traversal-list li').eq(0).should('have.text','tabby'); 
    cy.get('.traversal-list li').eq(-1).should('have.text','burmese'); 

    cy.get('.traversal-nav.nav.nav-tabs li').filter('.active').should('have.text', 'About');

    cy.get('.pagination.traversal-pagination').find('span').should('have.length', 2 );

    cy.get('.traversal-ul').find('.second').next().should('have.text', 'bananas');

    cy.get('#eq').next().should('contain', 'To get a DOM element at a specific index, use the');

    cy.get('.traversal-next-all .second').next().should('have.length', 1);
    cy.get('.traversal-next-all .second').nextAll().should('have.length', 3)

    cy.get('#fruits').nextUntil('#veggies').should('contain', 'oranges');

    cy.get('.healthy-foods li:contains("apples")').nextUntil('.healthy-foods li:contains("corn")').should('have.length', 5);

    cy.get('.traversal-disabled button').not('[disabled]').should('be.enabled');

    cy.get('.traversal-mark').parent().should('contain', 'Morbi leo risus, porta ac consectetur ac, highlight vestibulum at eros.');
 
    cy.get('.traversal-cite').should('contain', 'Source Title').parents().find('footer')
    .should('contain', 'Someone famous in Source Title');

    cy.get('.nav.nav-pills .active').siblings().should('have.length', '2');

    // cy.wrap() is mostly used inside of then or other commands that change context

    cy.get('.birds.list-group').then(list =>{
        cy.log(list.text())
        cy.wrap(list).children('li').first().should('have.text', 'Cockatiels');
    })
})
  })


