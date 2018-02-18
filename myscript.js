/**
 * Created by Danil on 11/4/2017.
 */

$( document ).ready(function() {

    $("#fieldSizeButton").click(function (event){
        console.log("Нажали кнопку");
        var fieldWidth = $("#fieldWidth")[0];
        var fieldHeight = $("#fieldHeight")[0];
        console.log(fieldWidth.value);
        console.log(fieldHeight.value);
        createField(fieldWidth.value, fieldHeight.value);
    });

    //Построения поля для Пентамино
    var field_width=5, field_height=5;
    var field = $(".field");
    var base_size = 50;
    var clickStatus = true;
    var zIndex = 1;

    function createField (newWidth, newHeight) {
        field.css({"width": base_size * newWidth + "px", "height": base_size * newHeight + "px"});
        field.empty();
        for (i = 0; i < newHeight; i++) {
            for (j = 0; j < newWidth; j++) {
                width = base_size * i;
                height = base_size * j;
                field.append('<div class="block' + i + j + ' fieldblock" style="top: ' + width + 'px; left: ' + height + 'px;"></div>');
            }
        }
    }
    createField(field_width, field_height);



    var dragFigure = {};


    $("body").click(function (event) {

        //console.log("выполняется");
        //console.log(event.pageX);
        //console.log(event.pageY);
        //console.log(event);
        //console.log(event.shiftKey);

    });


    $("body").mousedown(function (event){

        var figcont = $(event.target).closest('.figcont');
        if (!figcont) {
            return;
        }



        console.log(event);


        var baseblock = figcont.find(".baseblock");
        //console.log(baseblock);
        var clientRect = figcont.get(0).getBoundingClientRect();




        var posmouseX=event.pageX;
        var posmouseY=event.pageY;

        var kek = figcont.offset();
        //console.log(kek);
        //console.log(clientRect);
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
        //console.log(corX + " " + corY);

        figcont.css({"z-index":"1000"});
        //console.log(kek.left);
        //console.log(kek.top);



    });

    $("body").on("mousemove", function(e){

        if (!dragFigure.figcont) {
            return;
        }

        var difX = Math.abs(e.pageX - dragFigure.posmouseX);
        var difY = Math.abs(e.pageY - dragFigure.posmouseY);
        if ((difX > 3) || (difY > 3))
        {
            clickStatus = false;
            //console.log("Запретили clickStatus = "+ clickStatus);
        }

        var posLeft = e.pageX - dragFigure.deltaX - dragFigure.corX;
        var posTop = e.pageY - dragFigure.deltaY - dragFigure.corY;
        //console.log(e.pageX + " " + e.pageY);
        //console.log(dragFigure.deltaX + " " + dragFigure.deltaY);
        dragFigure.figcont.css({"left": posLeft, "top": posTop});
        //console.log(figcont.offset());

        var array = [];
        dragFigure.baseblock.each(function() {

            //console.log($(this));
            var light_xx = $(this).offset().left / base_size;
            var light_yy = $(this).offset().top / base_size;
            var Round_offset_left = Math.round(light_xx)*base_size;
            var Round_offset_top = Math.round(light_yy)*base_size;
            //console.log(Round_offset_left + " " + Round_offset_top);
            array.push([Round_offset_left, Round_offset_top]);

        });
        checkFieldBlock(array);

        function checkFieldBlock(array){
            var fieldBlock = field.find(".fieldblock");
            fieldBlock.each(function() {
                var fieldBlockOffsetLeft = $(this).offset().left;
                var fieldBlockOffsetTop = $(this).offset().top;
                var that = $(this);
                $(this).removeClass("highlight");
                array.forEach(function(item, i, array){
                    var Round_left = item[0];
                    var Round_top = item[1];
                    if ((fieldBlockOffsetLeft == Round_left) && (fieldBlockOffsetTop == Round_top)){
                        that.addClass("highlight");
                    }
                });
            });
        }
    });


    $("body").mouseup(function (event){

        var beginPageX = event.pageX;
        var beginPageY = event.pageY;
        var item = $(event.target).closest('.figcont');
        console.log("clickStatus = "+ clickStatus);

        if(clickStatus)
        {
            if (!event.shiftKey)
            {
                if (item.hasClass("rotate1"))
                {
                    console.log("поворот1");
                    item.removeClass("rotate1");
                    item.addClass("rotate2");
                }
                else if (item.hasClass("rotate2"))
                {
                    console.log("поворот2");
                    item.removeClass("rotate2");
                    item.addClass("rotate3");
                }
                else if (item.hasClass("rotate3"))
                {
                    item.removeClass("rotate3");
                    item.addClass("rotate4");
                }
                else if (item.hasClass("rotate4"))
                {
                    item.removeClass("rotate4");
                    item.addClass("rotate1");
                }
            }
            else
            {
                item.find(".mirrorcont").toggleClass("mirror");
            }
        }

        if (true)
        {
            console.log("Отпустили");
            //console.log(dragFigure.figcont.offset());
            var xx = (dragFigure.figcont.offset().left - dragFigure.corX) / base_size;
            var yy = (dragFigure.figcont.offset().top - dragFigure.corY) / base_size;
            var Round_offset_left = Math.round(xx) * base_size;
            var Round_offset_top = Math.round(yy) * base_size;
            //Ошибка вывода отступов при повороте.
            console.log(Round_offset_left + " " + Round_offset_top);
            //figcont.css({"left": Round_offset_left, "top": Round_offset_top});
            dragFigure.figcont.animate({
                left: Round_offset_left,
                top: Round_offset_top
            }, 400, "swing", function() {
                //console.log("end");
            });
        }

        dragFigure = {};
        clickStatus = true;
        item.css({"z-index":zIndex++});
    });


});