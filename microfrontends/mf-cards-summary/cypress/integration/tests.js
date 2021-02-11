const formatNumber = (number) => {
    return number.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
};

const NUM_ELEMENTS = 3;
let generalChannel;
let internalChannel;
let clickReceived = {};

describe('Micro Frontend Test Suite', function () {

    before(() => {
        cy.fixture('cards-customer0001').then((data) => {
            this.data = data;
        });

        cy.server();
        cy.route('GET', '/api/config/cards-summary-mf-config', 'fixture:cards-summary-mf-config.json');
        cy.route('GET', '/api/cards?customer=0001', 'fixture:cards-customer0001.json');

        generalChannel = new BroadcastChannel("microfrontends");
        internalChannel = new BroadcastChannel("internal");
        internalChannel.onmessage = function (ev) {
            clickReceived = ev.data;
        }
    });

    it('should be up & running, including all the components', () => {
        cy.visit('/');
        cy.contains('Cards', {includeShadowDom: true});
    });

    it('should contain 3 accounts items', () => {
        cy.get('card-overview', {includeShadowDom: true}).should('have.length', NUM_ELEMENTS);
        cy.get('card-overview', {includeShadowDom: true}).each(($el, index) => {
            const card = this.data[index];

            cy.wrap($el).contains(formatNumber(card['number']), {includeShadowDom: true});
            cy.wrap($el).contains(card['lastmovement'], {includeShadowDom: true});
            cy.wrap($el).contains(card['amount'], {includeShadowDom: true});

            if (card['type'] === 0) {
                cy.wrap($el).contains('Debit Card', {includeShadowDom: true});
            } else {
                cy.wrap($el).contains('Credit Card', {includeShadowDom: true});
                cy.wrap($el).contains('Credit limit', {includeShadowDom: true});
                cy.wrap($el).contains(card['limit'], {includeShadowDom: true});
            }
        });
    });

    it('should be translated if a change locale event is sent', () => {
        generalChannel.postMessage({
            cmd: 'changeLocale',
            payload: {
                locale: 'es'
            }
        });

        cy.contains('Tarjetas', {includeShadowDom: true});
        cy.get('card-overview', {includeShadowDom: true}).each(($el, index) => {
            const card = this.data[index];

            cy.wrap($el).contains('Último movimiento', {includeShadowDom: true});
            if (card['type'] === 0) {
                cy.wrap($el).contains('Tarjeta de Débito', {includeShadowDom: true});
            } else {
                cy.wrap($el).contains('Tarjeta de Crédito', {includeShadowDom: true});
                cy.wrap($el).contains('Límite de Crédito', {includeShadowDom: true});
            }
        });
    });

    it('should be received and event if a click is performed over an account', () => {
        cy.get('card-overview', {includeShadowDom: true}).each(($el, index) => {
            cy.wrap($el).click({force: true}).then(() => {
                expect(clickReceived.cmd).to.eql('cardClick');
                expect(clickReceived.payload.id).to.eql(this.data[index]['id']);
            });
        });
    });

});

