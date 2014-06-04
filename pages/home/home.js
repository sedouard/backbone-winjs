(function () {
    "use strict";
    
    var data = [];
    window.Unread = new WinJS.Binding.List(data);
    
    data = [];
    window.All = new WinJS.Binding.List(data);

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready:function(element, emails){

            for(var i in emails.models){
                var model = emails.models[i];
                //once we add the model's attributes to the list,
                window.Unread.push(emails.models[i]);
            }
        }
    });

    
})();
