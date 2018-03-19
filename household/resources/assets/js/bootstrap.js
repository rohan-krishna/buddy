import jquery from 'jquery';

window.$ = window.jQuery = jquery;

window._ = require('lodash');

window.axios = require('axios')

console.log("Hello World!");

// import jquery from 'jquery';

// var $ = jquery;
// var jQuery = jquery;

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

window.axios.defaults.headers.common['X-CSRFTOKEN'] = csrftoken;