/**
 * DalekJs Testcase for the Magento Madison Island Theme
 * relevant tests for checkout and order creation
 *
 * @author      Stefan Schwan <schwan@stimme.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


YAML = require('dalekjs/node_modules/js-yaml');
var config = require('./config/rwd.yml');


module.exports = {
    'Item can be added to cart': function (test) {
        test
                .open(config.url + config.checkout.simpleProductToBuy)
                .click("#product_addtocart_form > div.add-to-cart-wrapper > div > div > div.add-to-cart-buttons > button")
                .waitForElement('body')
                .assert.exists('.messages li.success-msg')
                .assert.text("#header > div > div.skip-links > div > a > span.count").is('1')

            /*                .assert.attr('#shopping-cart-table > tbody > tr > td.product-cart-image > a',
             'href',
             config.url + config.simpleProductToBuy,
             'href of product in prouct table matches added product')*/

                .done();
    },
    'Checkout as Guest': function (test) {
        test
                .click("body > div > div.page > div.main-container.col1-layout > div > div > div.cart.display-single-price > div.page-title.title-buttons > ul > li > button.btn-proceed-checkout")
                .waitForElement('body')
                .click("#onepage-guest-register-button")
                .waitForElement('body')
                .done();
    },
    'Fill in Billingform': function (test) {
        test
                .type("#billing\\:firstname", config.checkout.guest.firstname)

                .type("#billing\\:lastname", config.checkout.guest.lastname)

                .type("#billing\\:company", config.checkout.guest.company)

                .type("#billing\\:email", config.checkout.guest.email)

                .type("#billing\\:street1", config.checkout.guest.street1)

                .type("#billing\\:street2", config.checkout.guest.street2)

                .type("#billing\\:city", config.checkout.guest.city)

                .type("#billing\\:postcode", config.checkout.guest.postcode)

                .type("#billing\\:telephone", config.checkout.guest.telephone)

                .type("#billing\\:fax", config.checkout.guest.fax)

                .execute(function() {
                             jQuery('#billing\\:region_id').val('1');
                         })

                .click('#billing-buttons-container > button')
                .waitFor(function () {
                             return !!jQuery('#checkout-step-shipping_method').is(':visible');
                         }, [], 60000)
                .assert.visible('#checkout-step-shipping_method', "Proceeded to shipping selection")
                .done();
    },
    'Complete Checkout': function(test) {
        test
                .execute(function(){
                             jQuery("#s_method_freeshipping_freeshipping").attr('checked', 'checked');
                         })
                .assert.attr('#s_method_freeshipping_freeshipping', 'checked', 'true', 'freeshipping checked')
                .click('#shipping-method-buttons-container > button')
                .waitFor(function () {
                             return !!jQuery('#checkout-step-payment').is(':visible');
                         }, [], 60000)
                .assert.visible('#checkout-step-payment', 'proceeded to payment selection')

                .click("#payment-buttons-container > button")
                .waitFor(function () {
                             return !!jQuery('#opc-review #checkout-step-review').is(':visible');
                         }, [], 90000)
                .assert.visible('#checkout-step-review', 'proceeded to review')
                .click("#review-buttons-container > button")
                .assert.visible('#review-please-wait', 'loading review accept')
                .wait(5000)
                .assert.text('div.page-title h1', 'Your order has been received.'.toUpperCase(), 'Order recieved')
                //.waitForElement("body")
                //.assert.text('div.page-title h1', 'Your order has been received.'.toUpperCase(), 'Order recieved')
                //
                //.assert.url("http://mogg.local/checkout/onepage/success/")
                .done();
    }

}