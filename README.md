magento-dalekjs
===============

Frontend tests using the dalekjs framework in order to perform crossbrowser-tests. Works with the RWD Theme of Magento 1.9

Test scenarios
==============

- Account Creation
    - Open Registration Page
    - check requiered inputs
    - check password validation
    - log out and log into account
    - check registration of the same email twice
    - add new address to account 
    - check account in backend
- Checkout
    - Put Simple Product into Cart
    - Checkout as Guest
    - Fill in the Billingform
    - Complete the Checkout
- Homepage
    - Open Storefront
    - Check Demostore label
    - Check Navigation
    - Check Slideshow
    - Check Search
    - Open CMS Page
    

Usage
=====

- install dalekjs (http://dalekjs.com) and follow the installation instructions
- adopt setting in rwd.yml (eg admin URL)
- run the tests, e.g. dalek checkoutTest.js


Todo
====

- Checkout as Member
- Remove Account User after Creation
- Include Tests for the responsive versions
- Include Subcategory Tests
- Test l18n

Known issues
============

- config options can not be passed by a global configuration to the tests
- completeness of the tests (contributions welcome!)




