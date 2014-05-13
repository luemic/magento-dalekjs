magento-dalekjs
===============

Frontend tests using the dalekjs framework in order to perform crossbrowser-tests.

Test scenarios
==============

- placing an order in community edition 1.8 (may work with other community editions as well)
- log in to admin and check if the payment method Zero Subtotal Checkout is present

Usage
=====

- install dalekjs (http://dalekjs.com) and follow the installation instructions
- just run the tests, e.g. dalek checkoutTest.js
- configure the url for the Magento to tests

Known issues
============

- command type does not work in checkout
- config options can not be passed by a global configuration to the tests
- completeness of the tests




