/**
 * @author      Michael Lühr <michael.luehr@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var url = 'http://mage-hackathon.dev/admin';
var waitAfterClick = 3000;
var adminUser = 'admin';
var adminLogin = 'password';
/**
 * test that opens Magento backend, goes to system -> configuration -> payment methods
 * and checks for zero subtotal checkout
 */
module.exports = {
    'Zero Subtotal Checkout is present': function (test) {
        test
            .open(url)
            .assert.title().is('Log into Magento Admin Page', 'It has title')
            .type('#username', adminUser)
            .type('#login', adminLogin)
            .click('#loginForm div.login-form div.form-buttons input.form-button')
            .wait(waitAfterClick)
            .click('#message-popup-window.message-popup div.message-popup-head a span')
            .wait(waitAfterClick)
            .click('.level0:nth-child(10) > a > span')
            .wait(waitAfterClick)
            .click('a[href*="system_config"]:nth-child(1) span:nth-child(1)')
            .click('a[href*="section/payment"]:nth-child(1)')
            .assert.exists('#payment_free-head')
            .done();
    }
}