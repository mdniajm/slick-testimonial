 // Slider Main Settings
    function onSliderAfterChange(event, slick, currentSlide) {
        $(event.target).data('current-slide', currentSlide);
    }

    function onSliderWheel(e) {
        var deltaY = e.originalEvent.deltaY,
        $currentSlider = $(e.currentTarget),
        currentSlickIndex = $currentSlider.data('current-slide') || 0;

        if (
        // check when you scroll up
        (deltaY < 0 && currentSlickIndex == 0) ||
        // check when you scroll down
        (deltaY > 0 && currentSlickIndex == $currentSlider.data('slider-length') - 1)
        ) {
            // $('.uyirinsights').removeClass('sticky');
            return;
        }

        e.preventDefault();

        if (e.originalEvent.deltaY < 0) {
            $currentSlider.slick('slickPrev');
            // $('.uyirinsights').addClass('sticky');
        } else {
            $currentSlider.slick('slickNext');
            // $('.uyirinsights').addClass('sticky');
        }
    }

    $slider.each(function(index, element) {
        var $element = $(element);
        // set the length of children in each loop
        // but the better way for performance is to set this data attribute on the div.slider in the markup
        $element.data('slider-length', $element.children().length);
    })
    .slick({
        dots: true,
        swipe: true,
        arrows: false,
        vertical: true,
        autoplay: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        verticalSwiping: true,
        customPaging: function(slider, i) { 
            return '<img src="'+$(slider.$slides[i]).attr('data-image')+'" class="img-fluid">';
        },
    })
    .on('afterChange', onSliderAfterChange)
    .on('wheel', onSliderWheel);
