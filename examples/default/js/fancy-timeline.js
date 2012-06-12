/*!
 *	Fancy-TimeLine vALPHA.1.0
 *	
 *	Copyright (C) 2012 Juan Manuel Aguero (http://juanmaaguero.com.ar/sobre-mi)
 *	
 *	This file is part of Fancy-TimeLine.
 *	
 *	Fancy-TimeLine is free software: you can redistribute it and/or modify
 *	it under the terms of the GNU General Public License as published by
 *	the Free Software Foundation, either version 3 of the License, or
 *	(at your option) any later version.
 *	
 *	Fancy-TimeLine is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *	
 *	You should have received a copy of the GNU General Public License
 *	along with Fancy-TimeLine.  If not, see <http://www.gnu.org/licenses/>.
 *	
***/

actualPos = 0;
(function($) {  
    $.fn.fancyTimeline = function(params) {

        // default values
        var initPos = 0;
        var marginLeft = 20;
        var itemWidth = 350;
        var dateWidth = 50;
        
        // append html
        html = '<div id="timeline" class="timeline">';
        html+= '<div id="timeline-slider"></div>';
        html+= '<div id="middle">.</div>';
        html+= '<div>';
        html+= '    <div id="timeline-dates-line"></div>';
        html+= '    <div id="timeline-dates"></div>';
        html+= '</div>';
        html+= '<div id="backward" class="arrow" onclick="moveBackward();"><span>&lt;</span></div>';
        html+= '<div id="forward" class="arrow" onclick="moveForward();"><span>&gt;</span></div>';
        html+= '</div>';
        
        $(this).append(html);
        
        var dates = "";
        var pointers = "";
        
        var dataObjs = params.data;
        
        // Slider width calc
        var sliderLength = ((marginLeft + itemWidth) * (dataObjs.length+1));
        $("#timeline-slider").css("width", sliderLength);
    
        // Dates container width calc
        var datesLength = (dateWidth * (dataObjs.length+1));
        $("#timeline-dates").css("width", datesLength);
        var i=0;

        // Data input
        for (i=0; i<dataObjs.length; i++){
            var dateObj = dataObjs[i];
        
            var dateStr = "";
        
            if(dateObj.type == "default"){
                dateStr += '<div id="date-'+ i +'" class="timeline-item item-default" >';
                dateStr += 	'<div class="timeline-item-content" >';
                dateStr +=      '<span class="title"">' + dateObj.title + '</span>';
                dateStr +=      dateObj.content;
                dateStr +=  '</div>';
                dateStr += '</div>';
            }
        
            dates += dateStr;
        
            pointers += '<div class="date-container">';
            pointers +=     '<div class="pointer-date" id="pointer-date-'+ i +'" />';
            pointers +=     '<div class="pointer-date-separator" />';
            pointers +=     '<div class="pointer-date-separator" />';
            pointers +=     '<div class="pointer-date-separator" /><br/>';
            pointers +=     '<a class="date" id="pointer-'+ i +'">';
            pointers +=         dateObj.marker;
            pointers +=     '</a>';
            pointers += '</div>';
        }
        $('#timeline-slider').html(dates);
        $('#timeline-dates').html(pointers);
    
        $('.date').bind('click', function(){
            var position = $(this).attr('id').split('-');
            sliderTo(position[1]);
        });
    
        $('.timeline-item-i').bind('click', function(){
            $(this).next().toggle();
        });
    
        // Initial position
        sliderTo(initPos);
    };  
})(jQuery);

function positionTo(id){
    
    // get new position
    var middleOffset = $("#middle").offset();
    var dateOffset = $("#pointer-date-"+ id).offset();
	
    var diff = (dateOffset.left - middleOffset.left);
    var sliderOffset = $("#timeline-dates").offset();
    
    var newLeft = ((sliderOffset.left)-diff)-(window.innerWidth/7);

    // move to new position
    $("#timeline-dates").animate({
        left: newLeft
    }, 400);
}

function sliderTo(id){
    // back to default
    $('.timeline-item').removeClass("active");
    $(".pointer-date").animate({ height: 20 }, 100 );
    $(".date").animate({
        marginTop: 0, 
        marginLeft: -10
    }, 100 );
    $('.date').removeClass("date-focus");
    
    // get new position
    var middleOffset = $("#middle").offset();
    var dateOffset = $("#date-"+ id).offset();
	
    var diff = (dateOffset.left - middleOffset.left);
    var sliderOffset = $("#timeline-slider").offset();
    
    var newLeft = ((sliderOffset.left)-diff)-(window.innerWidth/5);
    
    positionTo(id);
    // move to new position
    $("#timeline-slider").animate({left: newLeft}, 800);
    $("#date-"+ id).toggleClass("active", 500);
    $("#pointer-date-"+ id).animate({
        height: 30
    }, 400 );
    $("#pointer-"+ id).animate({
        marginTop: 15, 
        marginLeft: -20
    }, 200 );
    $("#pointer-"+ id).toggleClass("date-focus", 200);

	// update the position
    actualPos = id;
}

function moveForward(){
    sliderTo( actualPos + 1 );
}

function moveBackward(){
    sliderTo( actualPos - 1 );
}
