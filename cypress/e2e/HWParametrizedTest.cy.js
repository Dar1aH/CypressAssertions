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
            icon: "email-outline",
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
    }
  ];
beforeEach('Access the page',()=>{
        cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com');
        cy.get('img[src="assets/images/corporate-theme.jpg"]').click();
        cy.get('a.ng-tns-c141-19 .ng-star-inserted').click();
        cy.get('a[title="Toastr"]').click();

})

tableTest.beforeEach(({args, expected})=>{
    it(`Parametrized test for toast position ${args.position} and type ${args.type}`, ()=>{
      
    })
})