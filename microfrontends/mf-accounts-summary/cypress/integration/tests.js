const formatIBAN = (account) => {
    return account.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
};

const NUM_ELEMENTS = 2;

describe('Micro Frontend Test Suite', function () {

    before(() => {
        cy.fixture('accounts-customer0001').then((data) => {
            this.data = data;
        });

        cy.server();
        cy.route('GET', '/api/config/accounts-summary-mf-config', 'fixture:accounts-summary-mf-config.json');
        cy.route('GET', '/api/accounts?customer=0001', 'fixture:accounts-customer0001.json');
    });

    it('should be up & running, including all the components', () => {
        cy.visit('/');
        cy.contains('Accounts', {includeShadowDom: true});
    });

    it('should contain 2 accounts items', () => {
        cy.get('.cards-container', {includeShadowDom: true}).find('.account-overview', {includeShadowDom: true}).should('have.length', NUM_ELEMENTS);
        cy.get('.cards-container', {includeShadowDom: true}).find('.account-overview', {includeShadowDom: true}).each(($el, index) => {
            //cy.wrap($el).find('account-overview').contains(formatIBAN(this.data[index]['number']));
            cy.wrap($el).contains(formatIBAN(this.data[index]['number']), {includeShadowDom: true});
            cy.wrap($el).contains(this.data[index]['name'], {includeShadowDom: true});
            cy.wrap($el).contains(this.data[index]['lastmovement'], {includeShadowDom: true});
            cy.wrap($el).contains(this.data[index]['newmovements'], {includeShadowDom: true});
            cy.wrap($el).contains(this.data[index]['amount'], {includeShadowDom: true});
        });
    });

});

