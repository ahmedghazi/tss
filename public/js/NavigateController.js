/**********************
    insertPageHtml
**********************/
var timer;
(function($) {
    $.fn.insertPageHtml = function(options) {
        //the option is an array : {html:the ajax html, scripts: the scripts that already are in the html, customData:any data you associated to this state during navigate} 

if(window.location.href.indexOf("sort") != -1){
    feedUrl.push(window.location.href)
}
console.log(feedUrl)
        $(".modal_close").click();
        $(".morphsearch-close").click();
        
        $("body").attr("class", options.class);
        $("section").attr("class", $("section", options.html).attr("class"));

        $('head').html($("head", options.head).html());
        $('section').html($("section", options.html).html());

        $("body").removeClass("loading");
        $('section').removeClass("section_loading");

        $(this).trigger({type:"finishrefreshinsert"});
        
        clearTimeout(timer);
        timer = setTimeout(function(){
            if($("body").hasClass("video")){
                var id = $('section').find("article").attr("id");
                var url = window.location.href;
                var title = document.title;
                console.log(typeof disqusReset)
                if (typeof disqusReset == 'function') { 
                  disqusReset(id, url, title, '');
                }
                console.log("change url")
                au.postData("/api/view-count/"+id, {url:url}, function (response) { 
                    //console.log(response)
                });
                track(url)
            }
        },400);

    };
})(jQuery);

var NavigateController = function() {
	var _this		= this;
			
	this.init = function(){
		_this.bindEvents();

        if(window.location.hash){
            //$('html,body').animate({ scrollTop: $(window.location.hash).position().top }, 400);
            //console.log("hashchange : "+window.location.hash);
            
            clearTimeout(timer);
            timer = setTimeout(function(){

            },1000);
        }

        if($("body").hasClass("video")){
            var id = $("article").attr("id");
            au.postData("/api/view-count/"+id, {url:window.location.href});
        }
	};

    this.bindEvents = function(){
        //console.log("navigate")
        $.navigate.init({
            active:true,
            //ajaxLinks:'a:not(.btn_popup)[rel!="external"][target!="_blank"][data-role!="hash"], .ajaxLink',
            //ajaxLinks:'a:not(.btn_popup)[rel!="external"][target!="_blank"][data-role!="hash"]',
            ajaxLinks: 'a[rel="ajax"]',
            discreteLinks: '',
            defaultInsertFunction: 'insertPageHtml'
        });

        $(window).on( 'hashchange', function(){
            var hash = window.location.hash;
            //console.log("hashchange : "+window.location.hash);
            
            clearTimeout(timer);
            timer = setTimeout(function(){
                
            },400);
        });

        $("html").on("failrefresh", function(e){
            console.log(e)
        });
        
    };



};

