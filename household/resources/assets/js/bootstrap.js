import jquery from 'jquery';

window.$ = window.jQuery = jquery;

window._ = require('lodash');

window.axios = require('axios')

console.log("Hello World!");

// import jquery from 'jquery';

// var $ = jquery;
// var jQuery = jquery;

$(document).ready(function() {
    console.log("Bundled instance of jQuery says Hello!")
})
