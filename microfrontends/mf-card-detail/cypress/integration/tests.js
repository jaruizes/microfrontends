const formatNumber = (number) => {
    return number.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
};

const NUM_ELEMENTS = 5;
let generalChannel;

describe('Micro Frontend Test Suite', function () {

    before(() => {
        cy.fixture('card-1').then((data) => {
            this.data = data;
        });

        cy.server();
        cy.route('GET', '/api/config/card-detail-mf-config', 'fixture:card-detail-mf-config.json');
        cy.route('GET', '/api/cards/1', 'fixture:card-1.json');

        generalChannel = new BroadcastChannel("microfrontends");
    });

    it('should be up & running, including all the components', () => {
        cy.visit('/');
        cy.contains('Card Detail', {includeShadowDom: true});
        cy.contains('Card Number', {includeShadowDom: true});
        cy.contains('Holder', {includeShadowDom: true});
        cy.contains('Balance', {includeShadowDom: true});
        cy.contains('Movements', {includeShadowDom: true});
    });

    it('should contain card detail', () => {
        cy.contains(this.data['name'], {includeShadowDom: true});
        cy.contains(formatNumber(this.data['number']), {includeShadowDom: true});
        cy.contains(this.data['balance'], {includeShadowDom: true});

        cy.get('credit-card', {includeShadowDom: true}).contains(this.data['expires'], {includeShadowDom: true});
    });

    it('should contain 5 movements', () => {
        cy.contains('Movements', {includeShadowDom: true});

        cy.get('items-table', {includeShadowDom: true}).find('.item-row', {includeShadowDom: true}).should('have.length', NUM_ELEMENTS);

        cy.get('items-table', {includeShadowDom: true}).find('.item-row', {includeShadowDom: true}).each(($el, index) => {
            const movement = this.data['movements'][index];
            cy.wrap($el).contains(movement['date']);
            cy.wrap($el).contains(movement['subject']);
            cy.wrap($el).contains(movement['account']);
            cy.wrap($el).contains(movement['amount']);
        });
    });

    it('should be translated if a change locale event is sent', () => {
        generalChannel.postMessage({
            cmd: 'changeLocale',
            payload: {
                locale: 'es'
            }
        });

        cy.contains('Detalle de tarjeta', {includeShadowDom: true});
        cy.contains('Movimientos', {includeShadowDom: true});
        cy.contains('Titular', {includeShadowDom: true});
        cy.contains('Saldo', {includeShadowDom: true});
    });

});

