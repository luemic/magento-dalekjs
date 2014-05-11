var url = 'http://mage-hackathon.dev/';
var waitAfterClick = 3000;
module.exports = {
    'Page title is correct': function (test) {
        test
            .open(url)
            .assert.title().is('Home page', 'It has title')
            .done();
    },
    'Magento Furniture' : function (test) {
        test
            .open(url)
            .waitForElement('.level-top')
            .click('.level-top span')
            .wait(waitAfterClick)
            .assert.title().is('Furniture', 'title')
            .screenshot('phantomjs.png')
            .done()
    },
    'Add Ottoman to cart and proceed with checkout' : function (test) {
        test.click('ul.products-grid li.item div.actions button.button')
            .click('div.col-main div.cart div.page-title ul.checkout-types li button.button')
            .execute(function() {$('login:guest').setValue(true);})
            .click('#onepage-guest-register-button')
            .wait(waitAfterClick)
//          set value does not work for some reason
//            .setValue('#billing:firstname', 'Firstname')
            .execute(function() {
                // workaround because setValue did not work properly
                type = 'billing';
                $(type +':firstname').setValue('Firstname');
                $(type +':lastname').setValue('Lastname');
                $(type +':email').setValue('test@test.com');
                $(type +':street1').setValue('Teststreet 1');
                $(type +':city').setValue('Testcity');
                $(type +':postcode').setValue('11111');
                $(type +':country_id').setValue('DE');
                billingRegionUpdater.update();
                $(type +':region_id').setValue(91);
                $(type +':telephone').setValue('1234567');
            })
            .click('#billing-buttons-container.buttons-set button.button')
            .wait(waitAfterClick)
            .click('#shipping-method-buttons-container.buttons-set button.button')
            .wait(waitAfterClick)
            .click('#p_method_checkmo')
            .click('#payment-buttons-container.buttons-set button.button')
            .wait(waitAfterClick)
            .click('#review-buttons-container.buttons-set button.button')
            .wait(waitAfterClick)
            .assert.text('div.page-title h1', 'Your order has been received.')
            .done();
    }
};