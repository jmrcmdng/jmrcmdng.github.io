
var proj_data = ``;
$.each(projects, function (index, item) {
    proj_data += `<div class="col-lg-6 col-md-6 p-item">
                    <a href="javascript:void(0)" class="p-wrap" proj_id="${item.id}">
                    <img src="${item.image}" class="img-fluid" alt="">
                    <div class="p-info">
                        <h4>${item.title}</h4>
                        <p>${item.year}</p>
                    </div>
                    </a>
                </div>`;
});
$('.project-box').html(proj_data);

$('.project-box').on('click', '.p-wrap', function () {
    var proj_id = $(this).attr('proj_id');
    var proj = projects.filter(x => x.id == proj_id)[0];

    $('.project-name').html(proj.title + ` - <i>${proj.year}</i>`);
    $('.project-summary').html(proj.description);

    $('.project-url').hide();
    if (proj.url != '') {
        $('.project-url').show().find('p').html(`<a href="${proj.url}" target="_blank"><b>${proj.url}</b></a>`);
    }
    var proj_images = ``;
    $.each(proj.images, function (index, image) {
        proj_images += `<img class="carousel-img" src="${image}" alt="img" draggable="false">`;
    });
    $('.project-carousel').html(proj_images);

    var proj_features = ``;
    $.each(proj.features, function (index, feature) {
        proj_features += `<li><b>${feature.title}:</b> ${feature.content}</li>`;
    });
    $('.project-features').html(proj_features);

    $('#project-detail').modal('show');
    setTimeout(sliderInit, 500)
});

$('.p-detail .close').on('click', function () {
    $('#project-detail').modal('hide');
});

$('.project-carousel').on('click', '.carousel-img', function () {
    var src = $(this).attr('src');
    $('<div class="full-image-panel">').css({
        background: 'rgba(0,0,0,.5) url(' + src + ') no-repeat center',
        backgroundSize: 'contain',
    }).click(function () {
        $(this).remove();
    }).append('<i class="bi bi-x-lg">').appendTo('body');
});
