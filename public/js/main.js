requirejs.config({    
  paths: {
    'jquery':              'libs/jquery-1.7.2',
    'underscore':          'libs/underscore-1.3.3-amd',
    'Backbone':            'libs/backbone-0.9.2-amd',
    'Backbone.Marionette': 'libs/backbone.marionette-0.8.4',
  
    // Require.js plugins
    // 'text':  './libs/requirejs/text-1.0.8.min',
    // 'order': './libs/requirejs/order-1.0.5.min',
  }
});


require (
  ['jquery'],
  function ($) {
    console.log('running');
  }
);
