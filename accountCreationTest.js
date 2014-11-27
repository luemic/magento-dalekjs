/**
 * @author      Stefan Schwan <schwan@stimme.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

YAML = require('dalekjs/node_modules/js-yaml');
var config = require('./config/rwd.yml');

// add timestamp to customerEmail to allow multiple creation
var now = new Date();
var customerEmail = config.account.customer.email+now.getTime()+'@example.com';

module.exports = {
    'open account page': function(test) {
        test
                .open(config.url)
                .assert.exists("#header-account", "Header Account link present")
                .assert.text("body > div > div.page > div.footer-container > div > div:nth-child(4) > ul > li.first > a", (config.account.label).toUpperCase(), "Footer Link present")
                .assert.attr('body > div > div.page > div.footer-container > div > div:nth-child(4) > ul > li.first > a', 'href', config.url+'/customer/account/', 'Link target correct')
                .open(config.url+'/customer/account/')
                .waitForElement('body',30000)
                .assert.text('h1', config.account.loginOrCreatePageHeadline, 'Page Header Correct')
                .assert.title(config.account.loginOrCreatePageTitle, "Page Title correct")

        test.done()
    },
    'open registration page': function(test) {
        test
                .click("#login-form div div.col-1.new-users div.buttons-set a")
                .waitForElement('body')
                .assert.title(config.account.registrationPageTitle)
                .assert.text('h1', config.account.registrationHeader)
                .wait()
        test.done();

    },
    /**
     * Checks if ommiting required inputs produces an advice message
     *
     * @param config.registrationRequiredFields
     */
    'check required inputs': function(test) {
        test
                .click("#form-validate > div.buttons-set > button")
                .waitForElement('body')
                .assert.title(config.account.registrationPageTitle)
                .assert.text('h1', config.account.registrationHeader)
                config.registrationRequiredFields.forEach(function (field) {
                    test
                            .assert.visible('#advice-required-entry-'+field, field+' requiered advice visible')
                });
        test.done()
    },
    'check password validation': function(test) {
        test
                .type('input#firstname', config.account.customer.firstname)
                .type('input#lastname', config.account.customer.lastname)
                .type('input#email_address', customerEmail)
                .type('input#password', "short")
                .type('input#confirmation', config.account.customer.password+"blub")
                .click('#form-validate div.buttons-set button')
                .waitForElement('body')
                .assert.visible('#advice-validate-password-password')
                .assert.text('#advice-validate-password-password', config.account.passwordMessage)
                .assert.visible('#advice-required-entry-confirmation')
                .assert.visible('#advice-required-entry-confirmation', config.account.passwordDontMatch)
        test.done()
    },
    'complete registration': function(test) {
        test
                .open(config.url+'/customer/account/create/')
                .type('input#firstname', config.account.customer.firstname)
                .type('input#lastname', config.account.customer.lastname)
                .type('input#email_address', customerEmail)
                .type('input#password', config.account.customer.password)
                .type('input#confirmation', config.account.customer.password)
                .click('#form-validate div.buttons-set button')
                .waitForElement('body', 30000)
                .assert.url(config.url+"/customer/account/index/", "Account Page Url")
                .assert.title(config.accountLabel, "Account Page Title")
                .assert.visible(".success-msg", "Registration Success")
        test.done();
    },
    'Logout': function(test) {
        test
                .click("#header > div > div.skip-links > a.skip-link.skip-account > span.label")
                .click("#header-account > div > ul > li.last > a")
                .waitForElement('body', 30000)
                .assert.url(config.url+"/customer/account/logoutSuccess/", "Logout Success")
        test.done();
    },
    'Logout': function(test) {
        test
                .click("#header > div > div.skip-links > a.skip-link.skip-account > span.label")
                .click("#header-account > div > ul > li.last > a")
                .waitForElement('body', 30000)
                .assert.url(config.url+"/customer/account/logoutSuccess/", "Logout Success")
        test.done();
    },
    'Re-Register same email adress': function(test){
        test
                .open(config.url+'/customer/account/create/')
                .type('input#firstname', config.account.customer.firstname)
                .type('input#lastname', config.account.customer.lastname)
                .type('input#email_address', customerEmail)
                .type('input#password', config.account.customer.password)
                .type('input#confirmation', config.account.customer.password)
                .click('#form-validate div.buttons-set button')
                .waitForElement('body', 30000)
                .assert.visible('.error-msg', "Error Message Visible")
        test.done();
    },
    'Login Account': function(test) {
        test
                .open(config.url+'/customer/account/')
                .type('input#email',customerEmail)
                .type('input#pass', config.account.customer.password)
                .click("#send2 > span > span")
                .waitForElement('body',30000)
                .assert.url(config.url+"/customer/account/index/", "Account Page Url")
                .assert.title(config.account.label, "Account Page Title")

        test.done();
    },
    'Add new address': function(test) {
        test
                .open("http://mogg.local/customer/address/new/")
                .assert.title(config.account.addNewAddressTitle)

                .type('input#telephone',config.account.customer.telephone)
                .type('input#street_1',config.account.customer.street)
                .type('input#city', config.account.customer.city)
                .type('input#zip', config.account.customer.zip)
                .execute(function() {
                             //TODO this is currently hardcoded - not working if filled with config.* values
                             //see  https://github.com/dalekjs/dalek/issues/118
                             jQuery('#country').val('DE');
                             jQuery('#region_id').val('2');
                         })
                .click("#form-validate div.buttons-set button")
                .waitForElement('body')
                .assert.visible('.success-msg', 'Success message visible')
        test.done()
    },
    'Customer present in admin backend': function(test) {
        test
                .open(config.url+'/'+config.admin.url)
                .type('input#username', config.admin.username)
                .type('input#login', config.admin.password)
                .click('#loginForm > div > div.form-buttons > input')
                .waitForElement('body')
                .click('#message-popup-window > div.message-popup-head > a > span')
                .click('#nav > li:nth-child(5) > a > span')
                .click("#nav > li:nth-child(5) > ul > li:nth-child(1) > a > span")
                .assert.text('#customerGrid_table > tbody > tr:nth-child(1) > td:nth-child(4)', customerEmail)
                //.execute(function(){
                //                     //TODO: Implement deletion of customer
                //         })
                //.click('#customerGrid_massaction-select')
                //.click('#customerGrid_massaction-select > option:nth-child(2)')
                //.click('#customerGrid_massaction-form > fieldset > span:nth-child(4) ')
        test.done()
    }


}