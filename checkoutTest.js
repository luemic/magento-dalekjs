/**
 * @author      Michael Lühr <michael.luehr@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

YAML = require('dalekjs/node_modules/js-yaml');
var config = require('./config/ce-18.yml');

/**
* tests that adding a product to the cart, process a guest checkout and finally places an order
*/
module.exports = {

    'Page title is correct': function (test) {
        test
            .open(config.url)
            .assert.title().is('Home page', 'It has title')
            .done();
    },
    'Magento Furniture' : function (test) {
        test
            .open(config.url)
            .waitForElement('.level-top')
            .click('.level-top span')
            .wait(config.waitForClick)
            .assert.title().is('Furniture', 'title')
            .screenshot('phantomjs.png')
            .done()
    },
    'Add Ottoman to cart and proceed with checkout' : function (test) {
        test.click('ul.products-grid li.item div.actions button.button')
            .click('div.col-main div.cart div.page-title ul.checkout-types li button.button')
            .execute(function() {$('login:guest').setValue(true);})
            .click('#onepage-guest-register-button')
            .wait(config.waitForClick)
            // for some reason dalekjs doesn't work with the billing:* ids
            .type('#billing-new-address-form input[name*=firstname]', 'Firstname')
            .type('#billing-new-address-form input[name*=lastname]', 'Lastname')
            .type('#billing-new-address-form input[name*=email]', 'test@test.com')
            .type('#billing-new-address-form input[id*=street1]', 'teststreet 1')
            .type('#billing-new-address-form input[id*=city]', 'Testcity')
            .type('#billing-new-address-form input[id*=postcode]', '1111')
            .type('#billing-new-address-form select[id*=country_id]', 'Deutsch')
            .type('#billing-new-address-form select[id*=region_id]', 'Sachsen')
            .type('#billing-new-address-form input[id*=telephone]', '123456789')
            .click('#billing-buttons-container.buttons-set button.button')
            .wait(config.waitForClick)
            .click('#shipping-method-buttons-container.buttons-set button.button')
            .wait(config.waitForClick)
            .click('#p_method_checkmo')
            .click('#payment-buttons-container.buttons-set button.button')
            .wait(config.waitForClick)
            .click('#review-buttons-container.buttons-set button.button')
            .wait(config.waitForClick)
            .assert.text('div.page-title h1', 'Your order has been received.')
            .done();
    }
};