const formatNumber = (number) => {
    return number.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
};

const NUM_ACCOUNTS = 2;
const NUM_CARDS = 3;
const NUM_MOVEMENTS = 5;
let generalChannel;
let internalChannel;
let clickReceived = {};

describe('Micro Frontend Test Suite', function () {

    before(() => {
        cy.fixture('customers-0001').then((data) => {
            this.data = data;
        });

        cy.fixture('accounts-customer0001').then((data) => {
            this.accountsData = data;
        });

        cy.fixture('cards-customer0001').then((data) => {
            this.cardsData = data;
        });

        cy.server();
        cy.route('GET', '/api/config/cards-summary-mf-config', 'fixture:cards-summary-mf-config.json');
        cy.route('GET', '/api/cards?customer=0001', 'fixture:cards-customer0001.json');
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
        cy.contains('Cards', {includeShadowDom: true});
        cy.contains('Summary', {includeShadowDom: true});
        cy.contains('Last Movements', {includeShadowDom: true});
    });

    it('should contain 2 accounts items', () => {
        cy.get('account-overview', {includeShadowDom: true}).should('have.length', NUM_ACCOUNTS);
    });

    it('should contain 2 cards items', () => {
        cy.get('card-overview', {includeShadowDom: true}).should('have.length', NUM_CARDS);
    });

    it('should contain 5 movements', () => {
        cy.get('items-table', {includeShadowDom: true}).find('.item-row', {includeShadowDom: true}).should('have.length', NUM_MOVEMENTS);
    });

    it('should be translated if a change locale event is sent', () => {
        generalChannel.postMessage({
            cmd: 'changeLocale',
            payload: {
                locale: 'es'
            }
        });

        cy.contains('Cuentas', {includeShadowDom: true});
        cy.contains('Tarjetas', {includeShadowDom: true});
        cy.contains('Resumen', {includeShadowDom: true});
        cy.contains('Últimos movimientos', {includeShadowDom: true});

    });

    it('should be received and event if a click is performed over an account', () => {
        cy.get('account-overview', {includeShadowDom: true}).each(($el, index) => {
            cy.wrap($el).click({force: true}).then(() => {
                console.log(clickReceived);
                expect(clickReceived.cmd).to.eql('accountClick');
                expect(clickReceived.payload.id).to.eql(this.accountsData[index]['id']);
            });
        });
    });

    it('should be received and event if a click is performed over a card', () => {
        cy.get('card-overview', {includeShadowDom: true}).each(($el, index) => {
            cy.wrap($el).click({force: true}).then(() => {
                expect(clickReceived.cmd).to.eql('cardClick');
                expect(clickReceived.payload.id).to.eql(this.cardsData[index]['id']);
            });
        });
    });

});

