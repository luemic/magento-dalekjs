/**
 * @author      Stefan Schwan <schwan@stimme.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

YAML = require('dalekjs/node_modules/js-yaml');
var config = require('./config/rwd.yml');

module.exports = {

    'Page title is correct': function (test) {
        test
                .open(config.url)
                .assert.title().is('Madison Island', 'Website title tag')
                .done();
    },
    'Shop is a DemoStore': function (test) {
        test
                .open(config.url)
                .assert.exists('.demo-notice', 'The Demo Notice')
                .assert.visible('.demo-notice', 'The Demo Notice')
                .done();

    },
    'Main nav present and functional': function (test) {
        test
                .open(config.url)
                .assert.visible('#nav', 'Main navigation is visible')
        var categorys = config.categorys
        Object.keys(categorys).forEach(function (store) {
            test.open(config.url+"/?___store="+store)
            var categoryCount = 1
            Object.keys(categorys[store]).forEach(function (topCategory) {
                test
                    .waitForElement('#nav',30000)
                    .assert.text("#nav > ol > li.level0.nav-" + categoryCount + " > a", topCategory.toUpperCase(), "Store "+store+" Category " + topCategory + " link text is correct ")
                    // TODO links / category names are not l10n by default
                    // .assert.attr("#nav > ol > li.level0.nav-" + categoryCount + " > a", 'href', config.url + "/" + convertAmpersandCategoryNameToUrl(topCategory), "Store "+store+" Link target is correct")
                    // TODO There seems to be a problem with testing text on hidden Elements. Skipping the Subcategory check for now
                    //if ( categorys[topCategory] ) {
                    //        subcategoryCount = 1
                    //        categorys[topCategory].forEach(function (subCategory){
                    //            test.assert.text(".nav-1-1 > a", subCategory, "Subcategory " + subCategory + ' linktext text is correct')
                    //        });
                    //}
                    categoryCount++
            });
        });
        //Reset storeview to default before ending test
        test.open(config.url+"/?___store=default")
        test.done()

    },
    'Slideshow works': function (test){
        test
                .open(config.url)
                .assert.numberOfElements(".slideshow-container ul li")
                    .is.gt(1, "more than one slide avaiable")
                .assert.numberOfVisibleElements(".cycle-slide")
                    .is(1, "only one slide is visible")
        test.done();
    },
    'Search is operational': function(test){
        test
                .open(config.url)
                .type("input#search", config.searchTerm)
                .click("#search_mini_form div.input-box button")
                .waitForElement('body')
                .assert.text("h1",("Search results for '"+config.searchTerm+"'").toUpperCase(), 'h1 correct')
                .assert.title("Search results for: '"+config.searchTerm+"'", 'h1 correct')
                .assert.text(".count-container .amount strong", config.foundItemCount+" Item(s)", "Item count correct")
        test.done();
    },
    'Check CMS Page': function(test){
        test
                .open(config.url+'/'+config.cmsPage)
                .assert.exists("body.cms-"+config.cmsPage, "body."+config.cmsPage+" element exists")
                .assert.text('.page-head h3', config.cmsHeadline, "Headline correct")
                .assert.title(config.cmsTitle, "Pagetitle correct")
        test.done()
    }


}

/**
 * Convertes spaces and ampersands to minus and appends the html suffix
 *
 * @param categoryName
 * @return string
 */
function convertAmpersandCategoryNameToUrl(categoryName) {
    return categoryName.replace(' & ','-').toLowerCase()+'.html'

}



