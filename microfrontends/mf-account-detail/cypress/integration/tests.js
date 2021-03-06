const formatIBAN = (account) => {
    return account.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
};

const NUM_ELEMENTS = 4;
let generalChannel;

describe('Micro Frontend Test Suite', function () {

    before(() => {
        cy.fixture('account-1').then((data) => {
            this.data = data;
        });

        cy.server();
        cy.route('GET', '/api/config/account-detail-mf-config', 'fixture:account-detail-mf-config.json');
        cy.route('GET', '/api/accounts/1', 'fixture:account-1.json');

        generalChannel = new BroadcastChannel("microfrontends");
    });

    it('should be up & running, including all the components', () => {
        cy.visit('/');
        cy.contains('Account Detail', {includeShadowDom: true});
        cy.contains('Movements', {includeShadowDom: true});
        cy.contains('Nickname', {includeShadowDom: true});
        cy.contains('Holder', {includeShadowDom: true});
        cy.contains('IBAN', {includeShadowDom: true});
        cy.contains('Balance', {includeShadowDom: true});
    });

    it('should contain account detail', () => {
        cy.contains(this.data['holder'], {includeShadowDom: true});
        cy.contains(formatIBAN(this.data['number']), {includeShadowDom: true});
        cy.contains(this.data['name'], {includeShadowDom: true});
        cy.contains(this.data['balance'], {includeShadowDom: true});
    });

    it('should contain 4 movements', () => {
        cy.contains('Movements', {includeShadowDom: true});

        cy.get('items-table', {includeShadowDom: true}).find('.item-row', {includeShadowDom: true}).should('have.length', NUM_ELEMENTS);

        cy.get('items-table', {includeShadowDom: true}).find('.item-row', {includeShadowDom: true}).each(($el, index) => {
            cy.wrap($el).contains(this.data['movements'][index]['date']);
            cy.wrap($el).contains(this.data['movements'][index]['subject']);
            cy.wrap($el).contains(this.data['movements'][index]['account']);
            cy.wrap($el).contains(this.data['movements'][index]['amount']);
        });
    });

    it('should be translated if a change locale event is sent', () => {
        generalChannel.postMessage({
            cmd: 'changeLocale',
            payload: {
                locale: 'es'
            }
        });

        cy.contains('Detalle de cuenta', {includeShadowDom: true});
        cy.contains('Movimientos', {includeShadowDom: true});
        cy.contains('Alias', {includeShadowDom: true});
        cy.contains('Titular', {includeShadowDom: true});
        cy.contains('IBAN', {includeShadowDom: true});
        cy.contains('Saldo', {includeShadowDom: true});
    });

});

