$(document).ready(function() {
    $('.all').addClass('active');
    $('.today').click(function() {
        $('.all').removeClass('active');
        $('.past').removeClass('active');
        $('.today').addClass('active');
    });
    $('.past').click(function() {
        $('.all').removeClass('active');
        $('.today').removeClass('active');
        $('.past').addClass('active');
    });
    $('.all').click(function() {
        $('.today').removeClass('active');
        $('.past').removeClass('active');
        $('.all').addClass('active');
    });

    $('.filter-button').click(function() {
        var value = $(this).attr('data-filter');

        if (value == 'all') {
            $('.filter').show('1000');
        } else {
            $('.filter').not('.' + value).hide('3000');
            $('.filter').filter('.' + value).show('3000');
        }
    });

    $.get('/data', function(data, status) {
        var currentDate = new Date().toString().split(' ')[2];

        for (var i = 0; i < data.length; i++) {
            var pic = data[i];
            var picDate = new Date(+ pic.time_stamp).toString().split(' ')[2];
            if (picDate === currentDate) {
                $('.gallery_product').addClass('new');
            } else if (picDate < currentDate) {
                $('.gallery_product').addClass('older');
            }
        };
    });
});
