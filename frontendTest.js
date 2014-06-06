/**
 * This is a stripped Version - just modify it to your needs ;)
 * 
 * @author: Chrispoh Fischer and Tobias Hille
 */

//variable definitions
var url = 'http://my-site.tld/';
var sec_url = 'https://my-site.tld/';
var waitAfterClick = 5000; //default amount of time to wait

//definition of payment methods
var PAYMENT_CHECKMO = 0;
var PAYMENT_CC = 1;
var PAYMENT_PP = 2;
var PAYMENT_PPE = 3;
var PAYMENT_CASHONDELIVERY = 4;

//select the payment method by changing this var
// 	choose Payment method by random: MAX VALUE             MIN VALUE                    MIN VALUE
// from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
var payment = Math.floor(Math.random() * (PAYMENT_CASHONDELIVERY - PAYMENT_CHECKMO + 1));

//account information for register and login
var email = 'tester@domain.url';
var password = 'topSecret';
var firstname = 'Firstname';
var lastname = 'Lastname';
//var gender = 'female/male';
var country_id = 'Germany';
var postcode = '01234';
var city = 'Oxford';
var street = 'Musterstreet';
var street_nr = '42';
var telephone = '5-23-42';

//modify if billing adress is not the shipping adress
var sh_firstname = firstname;
var sh_lastname = lastname;
var sh_postcode = postcode;
var sh_city = city;
var sh_street = street;
var sh_street_nr = street_nr;

//array for cms-page test
var cmspages = new Array('payment', 'url1', 'url2');

//array for category test - both array neet to have the same length
var categorypages = new Array('myCat1.html', 'myCat2.html');
var categorytitle = new Array('Welcome to the BEST category ever!', 'Category 2');

//for search
var searchkey = 'my product';

//begin test
module.exports = {
    'cmspages test' : function (test)
    {
        //test.resize({width: 1024, height: 700});
//        openHomepage(test);
//        openCmsPages(test);
        test.done();
    }
//    'checkout test' : function (test)
//    {
//        //test.resize({width: 1024, height: 700});
//        openHomepage(test);
//        openCategory(test);
//        openProductView(test);
//        addToCart(test);
//        goThroughCheckout(test);
//        test.done();
//    },
//    'customeraccount test' : function (test)
//    {
//        //test.resize({width: 1024, height: 700});
//        openHomepage(test);
//        logintest(test);
//        goThroughCustomerAccount(test);
//        logouttest(test);
//        test.done();
//    },
//    'search test' : function (test)
//    {
//        //test.resize({width: 1024, height: 700});
//        openHomepage(test);
//        searchtest(test);
//        test.done();
//    }
};

function openHomepage(test) {
    test
        .open(url)
        .waitForElement('body.cms-index-index.cms-home', waitAfterClick)
	//Fill in the title of your homepage
        .assert.title().to.contain('My impressive Magento shop', "Website title correct")
        .screenshot('screenshots/:browser/:datetime_homepage.png')
}

function openCmsPages(test) {
    for (var i = 0; i < cmspages.length; i++){
	test
	    .assert.exists('.footer a[href="' + url + cmspages[i] + '/"]', 'url to cmspage "' + cmspages[i] + '" exists')
	    .click('.footer a[href="' + url + cmspages[i] + '/"]')
	    .waitForElement('body.cms-' + cmspages[i], waitAfterClick)
	    .assert.exists('body.cms-' + cmspages[i], 'cmspage "' + cmspages[i] + '" exists')
	    .screenshot('screenshots/:browser/:datetime_cmspage_' + cmspages[i] + '.png')
    }
    //test for page "contacts"
    /*
    test
        .assert.exists('.footer ul li a[href="' + url + 'contacts/"]', 'link to page "contacts" exists')
        .click('.footer a[href="' + url + 'contacts/"]')
        .waitForElement('body.contacts-index-index', waitAfterClick)
        .assert.exists('body.contacts-index-index', 'page "contacts" exists')
        .screenshot('screenshots/:browser/:datetime_cmspage_contacts.png')
    */
}
//
//function logintest(test) {
//    test
//        .assert.exists('a[href="' + sec_url + 'customer/account/login/"]', 'url for login exists')
//        .click('a[href="' + sec_url + 'customer/account/login/"]')
//        .screenshot('screenshots/:browser/:datetime_login.png')
//        .click('') //Fill in your Continue-Button - yes, without data at first!
//        .wait(waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_login_empty.png')
//        .type('input#email', email)
//        .type('input#password', password)
//        .click('') //Fill in your Continue-Button - this time with data
//        .wait(waitAfterClick)
//        .assert.exists('a[href="' + url + 'customer/account/"]', 'url to customeraccount exists')
//        .screenshot('screenshots/:browser/:datetime_login_success.png')
//}
//
//function registertest(test) {
//    test
//        .assert.exists('a[href="' + sec_url + 'customer/account/login/"]', 'url for login exists')
//        .click('a[href="' + sec_url + 'customer/account/login/"]')
//        .screenshot('screenshots/:browser/:datetime_login.png')
//        .click('a[href="' + sec_url + 'customer/account/create/"]')
//        .waitForElement('body', waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_register.png')
//        .click('') //Fill in your Register-Button on customer/account/register again: empty test
//        .wait(waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_register_empty.png')
//        //.type('select[id*=gender]', gender)
//        .type('input[name*=firstname]', firstname)
//        .type('input[name*=lastname]', lastname)
//        .type('input[name*=email]', email)
//        .type('input[id*=telephone]', telephone)
//        .type('input#password', password)
//        .type('input#passwordconfirm', password)
//        .screenshot('screenshots/:browser/:datetime_register_filled.png')
//        .click('') //Fill in your Register-Button on customer/account/register
//        .wait(waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_register_success.png')
//}
//
//function logouttest(test) {
//    test
//        .assert.exists('a[href="' + sec_url + 'customer/account/logout/"]', 'url for logout exists')
//        .click('a[href="' + sec_url + 'customer/account/logout/"]')
//        .waitForElement('body', waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_logout.png')
//}
//
//function goThroughCustomerAccount(test) {
//    test
//        .assert.exists('a[href="' + url + 'customer/account/"]', 'url to customeraccount exists')
//        .click('a[href="' + url + 'customer/account/"]')
//        .waitForElement('body', waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_customeraccount.png')
//
//        .assert.exists('a[href="' + url + 'customer/account/edit/"]', 'url to customer edit exists')
//        .click('a[href="' + sec_url + 'customer/account/edit/"]')
//        .waitForElement('body', waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_customeraccount_edit.png')
//
//        .assert.exists('a[href="' + url + 'customer/address/"]', 'url to customer address exists')
//        .click('a[href="' + sec_url + 'customer/address/"]')
//        .waitForElement('body', waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_customeraccount_address.png')
//
//        .assert.exists('a[href="' + url + 'button.button[title="Add new address"]"]', 'Button to "Add new address" exists')
//        .click('button.button[title="Add new address"]')
//        .waitForElement('body', waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_customeraccount_address_new.png')
//
//        .assert.exists('a[href="' + url + 'sales/order/history/"]', 'url to sales history exists')
//        .click('a[href="' + sec_url + 'sales/order/history/"]')
//        .waitForElement('body', waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_customeraccount_orders.png')
//
//        .assert.exists('a[href="' + url + 'newsletter/manage/"]', 'url to newsletter manage exists')
//        .click('a[href="' + sec_url + 'newsletter/manage/"]')
//        .waitForElement('body', waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_customeraccount_newsletter.png')
//}
//
//function searchtest(test) {
//    test
//        .type('input#search', searchkey + '\uE006') //type and hit return
//        .wait(waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_search.png')
//}
//
//function openCategory(test) {
//    for (var i = 0; i < categorypages.length; i++)
//    {
//	test
//	    .click('a[href="' + url + categorypages[i] + '] span')
//	    .waitForElement('body', waitAfterClick)
//	    .assert.title().to.contain(categorytitle[i], 'title "' + categorytitle[i] + '" correct')
//	    .screenshot('screenshots/:browser/:datetime_category_home.png')
//    }
//}
//
//function openProductView(test) {
//    //a bit Hacky: find the first available Product and set Window URL to it > will change page
//    // this assumes that you have a div.available in the catalog on the product-tile
//
//    //if this is to much for you - just pick the first product and click on it ;)
//    test
//        .execute(function () { //           find available,           select product tile,          switch to image,     find url
//            window.location=jQuery(jQuery("div.available")[0]).parent("div.product-tile").children("a.product-image").attr("href");
//        })
//        .waitForElement('body', waitAfterClick)
//        .assert.exists('.product-view .product-name','productname exists')
//        .screenshot('screenshots/:browser/:datetime_product_view.png')
//}
//
//function addToCart(test) {
//    test
//	.click('button.btn-cart')
//        .waitForElement('body', waitAfterClick)
//        .assert.exists('li.success-msg', 'product successfully added to cart')
//        .screenshot('screenshots/:browser/:datetime_addtocart.png')
//}
//
//function goThroughCheckout(test) {
//
//    checkoutRegister(test);
//    checkoutShippingAdress(test);
//    checkoutShippingMethod(test);
//    checkoutPayment(test);
//
//    test
//        .screenshot('screenshots/:browser/:datetime_checkoutStep6.png')
//        .click('') //Order - button
//        .waitForElement('body.checkout-onepage-success', waitAfterClick*4) //scince it may take a bit larger to place the order - we will wait longer
//        .screenshot('screenshots/:browser/:datetime_checkout_success.png')
//}
//
//function checkoutRegister(test) {
//    //we assume we are in cart here
//    test
//        .click('button.checkout-onepage-link')
//        .waitForElement('body', waitAfterClick)
//        .assert.exists('button.next', 'guest checkout enabled')
//        .screenshot('screenshots/:browser/:datetime_checkoutStep1.png')
//
//        .click('button.next')
//        .wait(waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_checkoutStep2_before.png')
//
//        .click('#billing-buttons-container') //edit NEXT-Button on billing
//        .wait(waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_checkoutStep2_empty.png')
//
//        /* dalekjs doesn't work with the billing:* ids */
//        //.type('#select[id*=gender]', gender)
//        .type('#input[name*=firstname]', firstname)
//        .type('#input[name*=lastname]', lastname)
//        .type('#select[id*=country_id]', country_id)
//        .type('#input[id*=postcode]', postcode)
//        .type('#input[id*=city]', city)
//        .type('#input[id*=street1]', street)
//        .type('#input[id*=street2]', street_nr)
//        .type('#input[id*=telephone]', telephone)
//        .type('#input[name*=email]', email)
//        .click('input[id*=use_for_shipping_no]')
//        .screenshot('screenshots/:browser/:datetime_checkoutStep2_filled.png')
//        .click('#billing-buttons-container') //edit NEXT-Button on billing
//        .wait(waitAfterClick)
//}
//
//function checkoutShippingAdress(test) {
//    test
//        .screenshot('screenshots/:browser/:datetime_checkoutStep3_before.png')
//        .click('#shipping-buttons-container') //edit NEXT-Button on shipping
//        .wait(waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_checkoutStep3_empty.png')
//
//        /* dalekjs doesn't work with the shipping:* ids */
//        .type('input[name*=firstname]', sh_firstname)
//        .type('input[name*=lastname]', sh_lastname)
//        .type('input[id*=postcode]', sh_postcode)
//        .type('input[id*=city]', sh_city)
//        .type('input[id*=street1]', sh_street)
//        .type('input[id*=street2]', sh_street_nr)
//        .screenshot('screenshots/:browser/:datetime_checkoutStep3_filled.png')
//        .click('#shipping-buttons-container') //edit NEXT-Button on shipping
//        .wait(waitAfterClick)
//}
//
//function checkoutShippingMethod(test) {
//    test
//        .screenshot('screenshots/:browser/:datetime_checkoutStep4.png')
//	//if you have multiple shippingoptions - just fill them in here
//	//hint: do it as random as in payment (see in the top)
//        .click('#shipping-method-buttons-container') //edit NEXT-Button on shippingmethod
//        .wait(waitAfterClick)
//}
//
//function checkoutPayment(test) {
//        switch (payment) {
//            case PAYMENT_CHECKMO:
//                checkoutPaymentCheckmo(test);
//                break;
//            case PAYMENT_CC:
//                checkoutPaymentCreditcard(test);
//                break;
//            case PAYMENT_PP:
//                checkoutPaymentPaypal(test);
//                break;
//            case PAYMENT_PPE:
//                checkoutPaymentPaypalExpress(test);
//                break;
//            case PAYMENT_CASHONDELIVERY:
//                checkoutPaymentCashondelivery(test);
//                break;
//            default:
//                checkoutPaymentCheckmo(test);
//                break;
//        }
//    test
//        .click('#payment-buttons-container') //edit NEXT-Button on payment
//        .wait(waitAfterClick)
//}
//
//function checkoutPaymentCheckmo(test) {
//    test
//        .screenshot('screenshots/:browser/:datetime_checkoutStep5.png')
//        .click('input#p_method_checkmo')
//        .wait(waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_checkoutStep5_checkmo.png')
//}
//
//function checkoutPaymentCreditcard(test) {
//    test
//        .screenshot('screenshots/:browser/:datetime_checkoutStep5.png')
//        .click('input#cc_saved') //fill in your cc payment provider
//        .wait(waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_checkoutStep5_cc.png')
//}
//
//function checkoutPaymentPaypal(test) {
//    test
//        .screenshot('screenshots/:browser/:datetime_checkoutStep5.png')
//        .click('input#p_method_paypal_standard')
//        .wait(waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_checkoutStep5_pps.png')
//}
//
//function checkoutPaymentPaypalExpress(test) {
//    test
//        .screenshot('screenshots/:browser/:datetime_checkoutStep5.png')
//        .click('input#p_method_paypal_express')
//        .wait(waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_checkoutStep5_ppe.png')
//}
//
//function checkoutPaymentCashondelivery(test) { //assumes phoenix_cashondelivery Module
//    test
//        .screenshot('screenshots/:browser/:datetime_checkoutStep5.png')
//        .click('input#p_method_cashondelivery')
//        .wait(waitAfterClick)
//        .screenshot('screenshots/:browser/:datetime_checkoutStep5_cod.png')
//}
