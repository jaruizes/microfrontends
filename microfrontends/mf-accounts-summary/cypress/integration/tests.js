const formatIBAN = (account) => {
    return account.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
};

const NUM_ELEMENTS = 2;
let generalChannel;
let internalChannel;
let clickReceived = {};

describe('Micro Frontend Test Suite', function () {

    before(() => {
        cy.fixture('accounts-customer0001').then((data) => {
            this.data = data;
        });

        cy.server();
        cy.route('GET', '/api/config/accounts-summary-mf-config', 'fixture:accounts-summary-mf-config.json');
        cy.route('GET', '/api/accounts?customer=0001', 'fixture:accounts-customer0001.json');

        generalChannel = new BroadcastChannel("microfrontends");
        internalChannel = new BroadcastChannel("internal");
        internalChannel.onmessage = function (ev) {
            clickReceived = ev.data;
        }
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

    it('should be translated if a change locale event is sent', () => {
        generalChannel.postMessage({
            cmd: 'changeLocale',
            payload: {
                locale: 'es'
            }
        });

        cy.contains('Cuentas', {includeShadowDom: true});
        cy.get('.cards-container', {includeShadowDom: true}).find('.account-overview', {includeShadowDom: true}).each(($el, index) => {
            cy.wrap($el).contains('Nuevos movimientos', {includeShadowDom: true});
            cy.wrap($el).contains('Último movimiento', {includeShadowDom: true});
            cy.wrap($el).contains('Saldo', {includeShadowDom: true});
        });
    });

    it('should be received and event if a click is performed over an account', () => {
        cy.get('account-overview', {includeShadowDom: true}).each(($el, index) => {
            cy.wrap($el).click({force: true}).then(() => {
                expect(clickReceived.cmd).to.eql('accountClick');
                expect(clickReceived.payload.id).to.eql(this.data[index]['id']);
                expect(clickReceived.payload.detail.name).to.eql(this.data[index]['name']);
                expect(clickReceived.payload.detail.lastmovement).to.eql(this.data[index]['lastmovement']);
                expect(clickReceived.payload.detail.number).to.eql(this.data[index]['number']);
                expect(clickReceived.payload.detail.newmovements).to.eql(this.data[index]['newmovements']);
                expect(clickReceived.payload.detail.amount).to.eql(this.data[index]['amount']);
            });
        });
    });

});

