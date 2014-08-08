(function () {
    "use strict";
    
    
    window.Unread = new WinJS.Binding.List();
    
    window.All = new WinJS.Binding.List();

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready:function(element, emails){

            for(var i in emails.models){
                var model = emails.models[i];
                //once we add the model's attributes to the list,
                if(model.get("read") == false) window.Unread.push(model);
                window.All.push(model);
            }
        }
    });

    
})();
