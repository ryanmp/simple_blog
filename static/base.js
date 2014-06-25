//<![CDATA[ 

    $(window).load(function()
    {

      //save sidebar links to an array (for searching)
        var my_links = new Array();
        $('#sidebar ul li').each(function() { //looks through each element
            my_links[my_links.length] = $(this);                  
        });

        //global variables
        var isVisible = false;
        var hoverTriggered = false; 





//paste
        $("#search").keyup(function() {


            var tempText = $(this).val();

            if (tempText != ''){
                $('#sidebar h2').text('Search Results');

                 $('#sidebar ul').replaceWith(); //clears sidebar

                //$('#sidebar ul li a').each(function() { //looks through each element
                    //alert("test");
                    //var isFound = $(this).child().attr('href').search(tempText); //found search term?
                    
                    //alert($(this).attr('href'));
                    /*if (isFound!=-1){
                        $('#sidebar ul').append($(this));
                    }//*/
                //});


            } else{
                $('#sidebar h2').text('All Entries');
                $('#sidebar ul').replaceWith(); //clears sidebar
                var len = my_links.length;
                for (var i=0;i<len;i++){
                    //alert(my_links[i].);
                     //$('#sidebar ul').child().append(links1[i]);
                }

            }
 
        });

        $(function(){ $('.sidebar_butt').click(function(event){
                    event.preventDefault();
                    toggle_sidebar();
                    hoverTriggered=false;
            });
        });

        $(function(){ $('.canvAndDiv').mouseover(function(event){
                if (!isVisible){
                    hoverTriggered=true;
                    toggle_sidebar();
                }
            });
        });

        $(function(){$('#article').mouseover(function(event){

                    if(hoverTriggered==true){
                        toggle_sidebar();
                        hoverTriggered=false;
                    }
                    
                        
            });
        });


        $(function(){$('#article').click(function(event){

                /* right now all external links are surpressed in article. I should include the possibility of external
                links at some point. I could easily do this by changing the else below into another conditional, checking the target to see if it's some third kind of link (denoted for external links) and then
                not including a preventDefault for that condition*/


                if ($(event.target).is('.links2')){
                    
                    event.preventDefault();
                    
                    var temp = $(event.target);

                    $('.links').removeClass("active");

                   $( ".links" ).each(function( index ) {
                      //alert( index + ": " + $(this).text() );
                      if ($(temp).attr('href') == $(this).attr('href')) $(this).addClass("active");
                    });

                    $("#article").fadeOut(100, function () {
                        $("#article").load($(temp).attr('href'), {limit: 0}, function(){
                            $('body').scrollTop(0);
                            $("#article").fadeIn();
                        });
                    });         
                  
                } else{

                    if (isVisible){
                        event.preventDefault();
                        toggle_sidebar();
                    } else{
                        event.preventDefault();
                    }

                }
            });
        });


        function toggle_sidebar(){
            $('#sidebar').toggle('slide', { direction: 'left', easing: 'swing'}, 300);
             
            isVisible = !isVisible;
            if (isVisible) {
                $(".sidebar_butt").html("hide");
                
                 var wid = $("#article").width();
                wid -= 200;
                
                    $('#article').animate({
            right: '-=200',
            width: wid,
                        /* can i use some sort
                        of get width function to make this precise?*/
          }, 200, function() {
            // Animation complete.
          });
                
            } else {
                $(".sidebar_butt").html("more");
                
                    $('#article').animate({
            right: '+=200',
            width: '90%',
          }, 200, function() {
            // Animation complete.
          });
                
            }    
        }

        $(function(){$('.links').click(function(event){

                var temp = this;
                clicked = true;
                event.preventDefault();

                $('.links').removeClass("active");
                $(this).addClass("active");

                $("#article").load($(temp).attr('href'), {limit: 0}, function(){
                        $('body').scrollTop(0);
   
                    });

                //this is causing a bit of a glitch for some unknown reason.. so i disabled the fade for now
                /*$("#article").fadeOut(100, function () {
                    $("#article").load($(temp).attr('href'), {limit: 0}, function(){
                        $('body').scrollTop(0);
                        $("#article").fadeIn();
                    });
                });   */     
                
            });
        });






        /////
        //new code here?? will this void the rest of these function??
        /////


        $("#myCanvas").show();


window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */ callback, /* DOMElement */ element) {
        window.setTimeout(callback, 1000 / 15);
    };
})();

var w, h, mouseX, mouseY, startX, startY, circ_color;
var start_rad = 0; var clicked = false;

Init();
animate(); //our running loop for our program

function Init() {
    canvas = document.getElementById("myCanvas");
    document.body.addEventListener('mousemove', getMouseLoc, false);
     document.body.addEventListener('mousedown', ev_MouseDown, false);
    context = canvas.getContext('2d');
    document.body.appendChild(canvas);
     w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    canvas.width = 40;
}

function animate() {
    context.clearRect(0, 0, w, h); 
    requestAnimFrame(animate);
    Draw();
}

function Draw() {
        
    Draw_Grad();
    if (clicked){
        Draw_Circ(start_rad, startX, startY);
        start_rad+=1+start_rad*.1;
        
        if (start_rad>400){
             start_rad=0;
            clicked=false;
        }
        
    }
}


function Draw_Grad(){


    var thisX;

    //this weird bit of logic just scales the mouse horizontal position.. to ensure that we always see something on the left of the links when the mouse
    //is in the sidebar
    if (mouseX<120){
        thisX=120;
    }

    if (mouseX>120){ //max of 50...
        thisX=120+20*(mouseX-120)/120;
    }



    context.beginPath();
    context.arc(thisX, mouseY, 150, 0, 2 * Math.PI, false);
      var grd = context.createRadialGradient(thisX, mouseY, 0, thisX, mouseY, 150);
      grd.addColorStop(0, "rgba(0,136,136,1)");
      grd.addColorStop(1, "rgba(0,136,136,0)");
    context.fillStyle = grd;
    context.closePath();
    context.fill();
}

function Draw_Circ(r,sx,sy){
    sx=40;
    context.beginPath();
    context.arc(sx, sy, r, 0, 2 * Math.PI, false);
    context.strokeStyle = "#E36700";
    context.strokeStyle = ColorBuilder(227,103,0,1-r/400)
    //context.strokeStyle = ColorBuilder(circ_color[0],circ_color[1],circ_color[2],1-r/200);
    context.lineWidth = 1;
    context.stroke();
    context.closePath();
}    

function MyRange(min, max) { //my own random.range function
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function getMouseLoc(ev) {
    mouseX = ev.pageX;
    mouseY = ev.pageY - $("body").scrollTop();
}

function ev_MouseDown(ev) {
    start_rad = 0;
    startX = mouseX;
    startY = mouseY;

    circ_color = hslToRgb(Math.random(),1,.5);
    
}

function ColorBuilder(r, g, b, o) {
    return "rgba(" + r + "," + g + "," + b + "," + o + ")";
}

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}



        /////
        //end new code
        /////





    });//]]>  