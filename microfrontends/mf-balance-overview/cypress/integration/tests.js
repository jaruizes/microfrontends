describe('Micro Frontend Test Suite', function () {

    let incomes = 0;
    let expenses = 0;
    let generalChannel;

    before(() => {
        cy.fixture('customer0001').then((data) => {
            data.summary.incomes.forEach(income => incomes += income );
            data.summary.expenses.forEach(expense => expenses += expense );
        });

        cy.server();
        cy.route('GET', '/api/customers/0001', 'fixture:customer0001.json');

        generalChannel = new BroadcastChannel("microfrontends");
    });

    it('should be up & running, including all the components', () => {
        cy.visit('/');
        cy.contains('Summary', {includeShadowDom: true});
        cy.contains('Incomes', {includeShadowDom: true});
        cy.contains('Expenses', {includeShadowDom: true});
        cy.contains(incomes, {includeShadowDom: true});
        cy.contains(expenses, {includeShadowDom: true});
        cy.get('#modal-1').should('not.exist');
    });

    it('should be shown a graph if clicked in the component', () => {
        cy.get('.card').click();
        cy.get('#modal-1').should('have.css', 'display', 'block');
        cy.get('#modal-1').get('footer').get('.btn').click();
        cy.get('#modal-1').should('not.exist');
    });

    it('should be translated if a change locale event is sent', () => {
        generalChannel.postMessage({
            cmd: 'changeLocale',
            payload: {
                locale: 'es'
            }
        });

        cy.contains('Resumen', {includeShadowDom: true});
        cy.contains('Ingresos', {includeShadowDom: true});
        cy.contains('Gastos', {includeShadowDom: true});
    });

});

