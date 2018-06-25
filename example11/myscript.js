/**
 * Created by Danil on 11/4/2017.
 */

$( document ).ready(function() {

    $("#fieldSizeButton").click(function (event){
        console.log("Нажали кнопку");
        var fieldWidth = $("#fieldWidth")[0];
        var fieldHeight = $("#fieldHeight")[0];
        var baseSize = $("#baseSize")[0];
		if(baseSize.value < 40 || baseSize.value > 80)
		{
			baseSize.value = 50;
		}	
		
		if(fieldHeight.value == 3)
		{
			fieldWidth.value = 20;
		}
		if(fieldHeight.value == 4)
		{
			fieldWidth.value = 15;
		}
		if(fieldHeight.value == 5)
		{
			fieldWidth.value = 12;
		}
		if(fieldHeight.value == 6)
		{
			fieldWidth.value = 10;
		}
		else if (fieldHeight.value < 3 || fieldHeight.value > 6)
		{
			fieldHeight.value = 5;
			fieldWidth.value = 12;
		}
		
        if(fieldWidth.value == 'X-file' || fieldHeight.value == 'X-file' || baseSize.value == 'X-file')
        {
            $(".fig1").animate({
                left: base_size*10,
                top: base_size*3
            }, 2000, "swing", function() {
                // console.log("end");
            });
            $(".fig2").animate({
                left: base_size*6,
                top: base_size*3
            }, 2000, "swing", function() {
                // console.log("end");
            });
            $(".fig3").animate({
                left: base_size*3,
                top: base_size*3
            }, 2000, "swing", function() {
                // console.log("end");
            });
            $(".fig4").animate({
                left: base_size*8,
                top: base_size*3
            }, 2000, "swing", function() {
                // console.log("end");
            });
            $(".fig5").animate({
                left: base_size,
                top: base_size
            }, 2000, "swing", function() {
                // console.log("end");
            });
            $(".fig6").animate({
                left: base_size*2,
                top: base_size
            }, 2000, "swing", function() {
                // console.log("end");
            });
            $(".fig7").animate({
                left: base_size*4-25,
                top: base_size-25
            }, 2000, "swing", function() {
                // console.log("end");
            });
            $(".fig8").animate({
                left: base_size*4,
                top: base_size*3
            }, 2000, "swing", function() {
                // console.log("end");
            }); 
            $(".fig9").animate({
                left: base_size*5,
                top: base_size
            }, 2000, "swing", function() {
                // console.log("end");
            });
            $(".fig10").animate({
                left: base_size*7,
                top: base_size
            }, 2000, "swing", function() {
                // console.log("end");
            });
            $(".fig11").animate({
                left: base_size*10,
                top: base_size*0
            }, 2000, "swing", function() {
                // console.log("end");
            });
            $(".fig12").animate({
                left: base_size*10,
                top: base_size*2
            }, 2000, "swing", function() {
                // console.log("end");
            });
                $(".page").addClass("hidden");
                $(".page-game").removeClass("hidden").removeClass("filter").addClass("current");
                $(".menu").addClass("hidden");
                $(".fig1").css({"transform": "rotate("+90+"deg)"});
                $(".fig2").css({"transform": "rotate("+180+"deg)"});
                $(".fig3").css({"transform": "rotate("+90+"deg)"});
                //$(".fig4").css({"top": base_size*3+"px", "left": base_size*8+"px"});
                //$(".fig5").css({"top": base_size+"px", "left": base_size+"px"});
                //$(".fig6").css({"top": base_size+"px", "left": base_size*2+"px"});
                $(".fig7").css({"transform": "rotate("+270+"deg)"});
                //$(".fig8").css({"top": base_size*3+"px", "left": base_size*4+"px"});
                $(".fig9").css({"transform": "rotate("+270+"deg)"});
                //$(".fig10").css({"top": base_size+"px", "left": base_size*7+"px"});
                $(".fig11").css({"transform": "rotate("+270+"deg)"});
                $(".fig12").css({"transform": "scale("+-1 +","+ 1+")"});
				messageBox.removeClass("hidden");
                return;

        }
        //X-file
        field_width = fieldWidth.value;
        field_height = fieldHeight.value;
        base_size = baseSize.value;
        offsetFieldTop = base_size;
        offsetFieldLeft = base_size;
        // console.log(fieldWidth.value);
        // console.log(fieldHeight.value);
        // console.log(baseSize.value);
        // console.log(base_size);
        createField(field_width, field_height);
        initFigures();
        createFigures(allFigures);
        $(".page").addClass("hidden");
        $(".page-game").removeClass("hidden").removeClass("filter").addClass("current");
        $(".menu").addClass("hidden");
    });

    //Построения поля для Пентамино
    var body = document.querySelector('body');
    var container = $(".page-game");
    var field = $(".field");
    var fieldBlock;
    var field_width=12, field_height=5;
    var base_size = 50;
    var offsetFieldTop = $(".field").offset().top;
    var offsetFieldLeft = $(".field").offset().left;
    var zIndex = 1;
    var fieldStatus = [];
    var globalWinStatus = 0;
    var messageBox = $('.message');
    var dragFigure = {};
    var tempDragFigure = {};
    var clickStatus = true;
    var mouseUpStatus = false;
    var mouseDownStatus = false;
    var transitionStatus = false;
    var allFigures = {};

    function setRotation() {
        setTimeout(function(){
            $(".figcont").on("transitionend", function(){
                generateHighlightArray($(this).find(".baseblock"));
                setHighlight(dragFigure.outArray);
                var clientRect = tempDragFigure.figcont.get(0).getBoundingClientRect();
                tempDragFigure.corX = (tempDragFigure.figcont.width() - clientRect.width)/2;
                tempDragFigure.corY = (tempDragFigure.figcont.height() - clientRect.height)/2;
                magnetoPosition(tempDragFigure);
                transitionStatus = false;
                // tempDragFigure.figcont.css({"left": "600px"});
            });
        },1000);
    }


    function createField (newWidth, newHeight) {
        // body.style.setProperty("--base", base_size + 'px');
        field.css({"width": base_size * newWidth + "px", "height": base_size * newHeight + "px"});
        field.empty();
        var fieldblockLeftOffset;
        var fieldblockHeightOffset;
        for (i = 0; i < newHeight; i++) {
            fieldStatus[i] = [];
            for (j = 0; j < newWidth; j++) {
                fieldStatus[i][j] = 0;
                fieldblockLeftOffset = base_size * i;
                fieldblockHeightOffset = base_size * j;
                field.append('<div class="block' + i + j + ' fieldblock" style="top: ' + fieldblockLeftOffset + 'px; left: ' + fieldblockHeightOffset + 'px;"></div>');
            }
        }
        fieldBlock = field.find(".fieldblock");
    }
    createField(field_width, field_height);

    function initFigures () {
        allFigures = [
            {
                left: base_size*1, top: base_size*8, width: base_size*3, height: base_size*3, color: "#8a00af",
                posBaseblocks: [[base_size*0, base_size*0], [base_size*1, base_size*0], [base_size*2, base_size*0], [base_size*2, base_size*1], [base_size*2, base_size*2]]
            },
            {
                left: base_size*5, top: base_size*8, width: base_size*3, height: base_size*3, color: "#df00de",
                posBaseblocks: [[base_size*0, base_size*0], [base_size*1, base_size*0], [base_size*2, base_size*0], [base_size*1, base_size*1], [base_size*1, base_size*2]]
            },
            {
                left: base_size*9, top: base_size*8, width: base_size*1, height: base_size*5, color: "#02d0ff",
                posBaseblocks: [[base_size*0, base_size*0], [base_size*0, base_size*1], [base_size*0, base_size*2], [base_size*0, base_size*3], [base_size*0, base_size*4]]
            },
            {
                left: base_size*11, top: base_size*8, width: base_size*3, height: base_size*3, color: "#060065",
                posBaseblocks: [[base_size*1, base_size*0], [base_size*2, base_size*0], [base_size*0, base_size*1], [base_size*1, base_size*1], [base_size*1, base_size*2]]
            },
            {
                left: base_size*15, top: base_size*8, width: base_size*2, height: base_size*4, color: "#540016",
                posBaseblocks: [[base_size*0, base_size*0], [base_size*0, base_size*1], [base_size*0, base_size*2], [base_size*0, base_size*3], [base_size*1, base_size*3]]
            },
            {
                left: base_size*18, top: base_size*8, width: base_size*2, height: base_size*4, color: "#fff801",
                posBaseblocks: [[base_size*0, base_size*0], [base_size*0, base_size*1], [base_size*0, base_size*2], [base_size*1, base_size*2], [base_size*1, base_size*3]]
            },
            {
                left: base_size*1, top: base_size*14, width: base_size*2, height: base_size*3, color: "#000aef",
                posBaseblocks: [[base_size*0, base_size*0], [base_size*1, base_size*0], [base_size*0, base_size*1], [base_size*1, base_size*1], [base_size*1, base_size*2]]
            },
            {
                left: base_size*4, top: base_size*14, width: base_size*3, height: base_size*2, color: "#15720b",
                posBaseblocks: [[base_size*0, base_size*0], [base_size*0, base_size*1], [base_size*1, base_size*1], [base_size*2, base_size*1], [base_size*2, base_size*0]]
            },
            {
                left: base_size*8, top: base_size*14, width: base_size*3, height: base_size*3, color: "#00ff00",
                posBaseblocks: [[base_size*0, base_size*0], [base_size*1, base_size*0], [base_size*1, base_size*1], [base_size*2, base_size*1], [base_size*2, base_size*2]]
            },
            {
                left: base_size*12, top: base_size*14, width: base_size*3, height: base_size*3, color: "#ff0000",
                posBaseblocks: [[base_size*1, base_size*0], [base_size*0, base_size*1], [base_size*1, base_size*1], [base_size*2, base_size*1], [base_size*1, base_size*2]]
            },
            {
                left: base_size*16, top: base_size*14, width: base_size*2, height: base_size*4, color: "#ffc822",
                posBaseblocks: [[base_size*1, base_size*0], [base_size*0, base_size*1], [base_size*1, base_size*1], [base_size*1, base_size*2], [base_size*1, base_size*3]]
            },
            {
                left: base_size*19, top: base_size*14, width: base_size*3, height: base_size*3, color: "#c661ff",
                posBaseblocks: [[base_size*0, base_size*0], [base_size*1, base_size*0], [base_size*1, base_size*1], [base_size*1, base_size*2], [base_size*2, base_size*2]]
            },
        ];
    }

    function createFigures (arr) {
        body.style.setProperty("--base", base_size + 'px');
        $(".figcont").remove();
        arr.forEach(function (item, i) {
            container.append('<div class="figcont fig'+(i+1)+' rotate1"><div class="mirrorcont"><div class="baseblock"></div>' +
                '<div class="baseblock"></div><div class="baseblock"></div><div class="baseblock"></div><div class="baseblock"></div></div></div>');
            var currentFigure = $('.fig'+(i+1));
            var currentFigureOptions = arr[i];
            currentFigure.css({"left": currentFigureOptions.left + "px","top": currentFigureOptions.top + "px", "width": currentFigureOptions.width + "px", "height": currentFigureOptions.height + "px"});
            currentFigure.find(".baseblock").css({"background-color": currentFigureOptions.color}).each(function(int) {
                $(this).css({"left": currentFigureOptions.posBaseblocks[int][0] + "px", "top": currentFigureOptions.posBaseblocks[int][1] + "px"});
            });
            



        });
        setRotation();
    }
    initFigures();
    createFigures(allFigures);


    //console.log(fieldStatus);

    function generateHighlightArray(obj){
        var array = [];
        obj.each(function() {

            //console.log($(this));
            var light_xx = $(this).offset().left / base_size;
            var light_yy = $(this).offset().top / base_size;
            var Round_offset_left = Math.round(light_xx)*base_size;
            var Round_offset_top = Math.round(light_yy)*base_size;
            //console.log(Round_offset_left + " " + Round_offset_top);
            array.push([Round_offset_left, Round_offset_top]);
        });

        dragFigure.outArray = array;
    }

    function setHighlight(array){
        fieldBlock.each(function() {
            var fieldBlockOffsetLeft = $(this).offset().left;
            var fieldBlockOffsetTop = $(this).offset().top;
            var that = $(this);
            $(this).removeClass("highlight");
            var ii = Math.round((fieldBlockOffsetTop - offsetFieldTop) / base_size);
            var jj = Math.round((fieldBlockOffsetLeft - offsetFieldLeft) / base_size);
            //console.log(ii + " " + jj);
            array.forEach(function(item, i, array){
                var Round_left = item[0];
                var Round_top = item[1];
                if ((fieldBlockOffsetLeft == Round_left) && (fieldBlockOffsetTop == Round_top)){
                    that.addClass("highlight");
                    // console.log(mouseUpStatus);
                    if (mouseUpStatus) {
                        fieldStatus[ii][jj] = 1;
                    }
                    if (mouseDownStatus) {
                        fieldStatus [ii][jj] = 0;

                    }
                }
            });
        });
    }

    $(".page-game").mousedown(function (event){
        //console.log('mousedown');
        if ($(this).hasClass("filter"))
        {
            return;
        }
        if (transitionStatus)
        {
            return;
        }
        mouseDownStatus = true;
        var figcont = $(event.target).closest('.figcont');

        if (!figcont.length) {
            mouseDownStatus = false;
            return;
        }
        //console.log(event);

        var baseblock = figcont.find(".baseblock");
        //console.log(baseblock);
        var clientRect = figcont.get(0).getBoundingClientRect();


        var posmouseX=event.pageX;
        var posmouseY=event.pageY;

        var kek = figcont.offset();
        //console.log(kek);
        // console.log(clientRect);
        var posfigureX=kek.left;
        var posfigureY=kek.top;

        var deltaX=posmouseX-posfigureX;
        var deltaY=posmouseY-posfigureY;
        var corX = (figcont.width() - clientRect.width)/2;
        var corY = (figcont.height() - clientRect.height)/2;


        dragFigure.figcont = figcont;
        dragFigure.posmouseX = posmouseX;
        dragFigure.posmouseY = posmouseY;
        dragFigure.deltaX = deltaX;
        dragFigure.deltaY = deltaY;
        dragFigure.corX = corX;
        dragFigure.corY = corY;
        dragFigure.baseblock = baseblock;
        // console.log(corX + " " + corY);

        figcont.css({"z-index":"10000"});
        //console.log(kek.left);
        //console.log(kek.top);
        generateHighlightArray(dragFigure.baseblock);
        setHighlight(dragFigure.outArray);
        mouseDownStatus = false;
    });

    $(".page-game").on("mousemove", function(e){

        if (!dragFigure.figcont) {
            return;
        }

        var difX = Math.abs(e.pageX - dragFigure.posmouseX);
        var difY = Math.abs(e.pageY - dragFigure.posmouseY);
        if ((difX > 3) || (difY > 3))
        {
            clickStatus = false;
        }

        var posLeft = e.pageX - dragFigure.deltaX - dragFigure.corX;
        var posTop = e.pageY - dragFigure.deltaY - dragFigure.corY;
        //console.log(e.pageX + " " + e.pageY);
        //console.log(dragFigure.deltaX + " " + dragFigure.deltaY);
        dragFigure.figcont.css({"left": posLeft, "top": posTop});
        //console.log(figcont.offset());

        generateHighlightArray(dragFigure.baseblock);
        setHighlight(dragFigure.outArray);
    });

    $(".page-game").on("mouseup", function (e){
        if (transitionStatus)
        {
            return;
        }
        var beginPageX = e.pageX;
        var beginPageY = e.pageY;
        var figcont = $(e.target).closest('.figcont');
        mouseUpStatus = true;

        if (!figcont.length) {
            mouseUpStatus = false;
            return;
        }

        if(clickStatus)
        {
            transitionStatus = true;
            if (!e.shiftKey)
            {
                if (figcont.hasClass("rotate1"))
                {
                    // console.log("поворот1");
                    figcont.removeClass("rotate1");
                    figcont.addClass("rotate2");
                }
                else if (figcont.hasClass("rotate2"))
                {
                    // console.log("поворот2");
                    figcont.removeClass("rotate2");
                    figcont.addClass("rotate3");
                }
                else if (figcont.hasClass("rotate3"))
                {
                    figcont.removeClass("rotate3");
                    figcont.addClass("rotate4");
                }
                else if (figcont.hasClass("rotate4"))
                {
                    figcont.removeClass("rotate4");
                    figcont.addClass("rotate1");
                }
            }
            else
            {
                figcont.find(".mirrorcont").toggleClass("mirror");
            }
        }
        magnetoPosition(dragFigure);
        setHighlight(dragFigure.outArray);


        if (true) {
            console.log(fieldStatus);
            tempDragFigure = dragFigure;
            clickStatus = true;
            dragFigure = {};
            figcont.css({"z-index":zIndex++});
            var winStatus = 1;

            for (i = 0; i < field_width; i++) {
                for (j = 0; j < field_height; j++) {
                    winStatus *= fieldStatus[j][i];
                }
            }
            // console.log(winStatus);
            globalWinStatus = 0;
            if (winStatus==1)
            {
                globalWinStatus = 1;
            }

            if (globalWinStatus==1)
            {
                messageBox.removeClass("hidden");
            }
        }

        mouseUpStatus = false;
    });

    function magnetoPosition(obj){
        var Round_offset_left;
        var Round_offset_top;

        if (Math.abs(obj.corX) == base_size/2)
        {
            var xx = (obj.figcont.offset().left - obj.corX) / base_size;
            var yy = (obj.figcont.offset().top - obj.corY) / base_size;
            Round_offset_left = (Math.floor(xx)+Math.floor(xx)+1)/2 * base_size;
            Round_offset_top = (Math.floor(yy)+Math.floor(yy)+1)/2 * base_size;
            // console.log('bad');
            // console.log(obj.figcont.offset().left);
            // console.log(xx);
            // console.log(Round_offset_left);
        }
        else
        {
            var xx = (obj.figcont.offset().left - obj.corX) / base_size;
            var yy = (obj.figcont.offset().top - obj.corY) / base_size;
            Round_offset_left = Math.round(xx) * base_size;
            Round_offset_top = Math.round(yy) * base_size;
            // console.log('good');
            // console.log(obj.figcont.offset().left);
            // console.log(xx);
            // console.log(Round_offset_left);
        }
        obj.figcont.animate({
            left: Round_offset_left,
            top: Round_offset_top
        }, 400, "swing", function() {
            // console.log("end");
        });
    }

    $(".close-button").on("click", function (event) {
        messageBox.addClass("hidden");
    });

    $(".logo").on("click", function (event){
        $(".page").toggleClass("filter");
        $(".menu").toggleClass("hidden");
    });

    $(".menu li").on("click", function (event){
       $(".page").addClass("hidden");
       console.log(event.currentTarget.classList.value);
       var namePage = event.currentTarget.classList.value;
       if(namePage == "menu-game")
       {
           $(".page-game").removeClass("hidden").removeClass("filter").addClass("current");
           $(".menu").addClass("hidden");
       }
       else if(namePage == "menu-option")
       {
           $(".page-option").removeClass("hidden").removeClass("filter").addClass("current");
           $(".menu").addClass("hidden");
       }
       else if(namePage == "menu-rules")
       {
           $(".page-rules").removeClass("hidden").removeClass("filter").addClass("current");
           $(".menu").addClass("hidden");
       }
       else if(namePage == "menu-authors")
       {
           $(".page-authors").removeClass("hidden").removeClass("filter").addClass("current");
           $(".menu").addClass("hidden");
       }
    });
});