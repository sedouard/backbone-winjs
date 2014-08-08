(function () {
    "use strict";
    
    //bootstraping winjs objects
    var app = WinJS.Application;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    //MODELS
    var EmailModel = Backbone.Model.extend({
        defaults: {
            author: "Not specified",
            titleColor: "rgba(212, 14, 136, 1)",
            title: "Not specified",
            previewText: "Not specified",
            time: "Not specified",
            read: false
        },
        initialize: function(){
            console.log("initialized the email model");
        }
    });

    var EmailGroup = Backbone.Collection.extend({
        model: EmailModel
    });

    //Define home view
    var HomeView = Backbone.View.extend({
        initialize: function(){
            this.render();
        },
        render: function(){
            
            //get a constructor to the home page that was defined in home.js
            var HomePage = WinJS.UI.Pages.get('/pages/home/home.html');
            
            //create a data collection that will be used to back the WinJS view:
            //we use static data here, however you can easily use a REST api to attach the model to your server
            var email1 = new EmailModel({ author: "Michael Wilson", titleColor: "rgba(212, 14, 136, 1)", title: "QuickStart's and How To's", previewText: "More information on how to use WinJS controls", time: "1:17p", read: true });
            var email2 = new EmailModel({ author: "James Edouard", titleColor: "rgba(212, 14, 136, 1)", title: "Dinner?", previewText: "Where's dinner?", time: "12:28p" });
            var email3 = new EmailModel({ author: "Gary Paul", titleColor: "rgba(212, 14, 136, 1)", title: "Going out saturday", previewText: "Jean and I are leaving...", time: "12:28p" });
            
            var emailCollection = new EmailGroup([email1, email2, email3]);

            //use the Backbone.js 'el' property which reprsents the root DOM element of the view
            //as the element that this view should be placed in.
            //the second parameter will be passed as an argument to the 'ready' function of this page
            var hp = new HomePage(this.el, emailCollection);
            

            return this;
        }
    });

    //Define a new home route. This will get called when the browser calls your root url
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home'
        }
    });

    var router = new AppRouter();

    router.on('route:home', function(){
        console.log('Home route hit');
        //initialize our home view with with the the target div that it should go in
        var home_view = new HomeView({ el: $("#contenthost") });
    });
    
    app.addEventListener("ready", function (args) {
       
        //WinJS.UI.processAll() is what will 'compile' our html
        //to live WinJS UI controls
        ui.processAll().then(function() {
 
        }).then(function(){
            return sched.requestDrain(sched.Priority.aboveNormal + 1);
        }).then(function(){
            
            ui.enableAnimations();
            
            //Now that WinJS is fully ready, start the backbone router
            Backbone.history.start();
        });
    });
    
    //startup the app
    app.start();
})();