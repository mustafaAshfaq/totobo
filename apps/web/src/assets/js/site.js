$(document).ready(function () {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    $(".check").click(function () {
        $(".check").removeClass('active');
        $(this).addClass('active');
    });
    //$(".solmenu .list-group a").click(function () {
    //    console.log($($(this).data('href')).html().length);

    //});
    $(".solmenu .list-group i.tumunuSec").click(function () {
        var menuName = $(this).parent().parent().parent().data('href');
        console.log(menuName)
        if ($(menuName).html().length == 0) {
            console.log('menu')
            var menu = '';
            var count = 5;
            if (count > 0) {
                menu += '<ul class="list-group mb-0">';
                for (var i = 0; i < 5; i++) {
                    menu += '<li class="list-group-item bg-white color-dark"><label><input type="checkbox" checked="checked"> Bootply <span class="label label-default">14</span></label></li>';
                }
                menu += '</ul>'
                $(menuName).html(menu);
            }
        }
        $(menuName + ' input[type=checkbox]').prop('checked', 'checked');
    });
    $(".solmenu .list-group i.tumunuKaldir").click(function () {
        var menuName = $(this).parent().parent().parent().data('href') + ' input[type=checkbox]';
        $(menuName).prop('checked', null);
    });
    $(".solmenu .list-group a").mouseover(function () {
        $(this).find(".label").hide();
        $(this).find(".icons").show();
    });
    $(".solmenu .list-group a").mouseout(function () {
        $(this).find(".label").show();
        $(this).find(".icons").hide();
    });
    $("a.label").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass('active');
        }
        else {
            $(this).addClass('active');
        }
    });

    $(".bahiskutusu .btn-group button").click(function () {
        $('#bahisSistem button').removeClass('active');
        $(this).addClass('active');
    });
    widthcss();
});
$.fn.bootstrapDropdownHover();


function eniyibahisClose(v) {
    $($(v).parent().parent().parent().parent()).remove();
}
function oranSelect(v) {
    if ($(v).hasClass("active")) {
        $(v).removeClass('active');
    }
    else {
        $(v).addClass('active');
    }
}

function tooltipProgress(v, p1, p2, p3) {
    $(v).attr('data-toggle', 'tooltip');
    $(v).attr('data-html', 'true');
    $(v).attr('data-original-title', '<div class="row mt-5 w-200"><div class="col col-xs-12">Müşterilerimiz bu şekilde oynadı.</div></div><div class="row mt-5 w-200"><div class="col col-xs-4">1</div><div class="col col-xs-4">X</div><div class="col col-xs-4">2</div></div><div class="row w-200 mt-5 mb-5"><div class="col col-xs-4 text-left"><div class="progress"><div class="progress-bar progress-bar-success wd-' + p1 + '" role="progressbar" aria-valuenow="' + p1 + '" aria-valuemin="0" aria-valuemax="100"><span class="sr-only">' + p1 + '% Complete (success)</span></div></div></div><div class="col col-xs-4"><div class="progress"><div class="progress-bar progress-bar-success wd-' + p2 + '" role="progressbar" aria-valuenow="' + p2 + '" aria-valuemin="0" aria-valuemax="100"><span class="sr-only">' + p2 + '% Complete (success)</span></div></div></div><div class="col col-xs-4"><div class="progress"><div class="progress-bar progress-bar-success wd-' + p3 + '" role="progressbar" aria-valuenow="' + p3 + '" aria-valuemin="0" aria-valuemax="100"><span class="sr-only">' + p3 + '% Complete (success)</span></div></div></div></div></div>');
}
function tooltipAnalytics(v) {
    $(v).attr('data-toggle', 'tooltip');
    $(v).attr('data-html', 'true');
    $(v).attr('data-original-title', '<div class="row mt-5 w-300"><div class="col col-xs-6 text-left"><b>Üst/Alt sıklığı (2,5 gol)</b></div><div class="col col-xs-3"><b>2019-2020</b></div><div class="col col-xs-3"><b>2018-2019</b></div></div><div class="row mt-5"><div class="col col-xs-6 text-left">Lokomotiv Moscow</div><div class="col col-xs-3"><span class="label label-default">0</span><span class="label label-default">1</span></div><div class="col col-xs-3"><span class="label label-default">6</span><span class="label label-default">7</span></div></div><div class="row mt-5 mb-5"><div class="col col-xs-6 text-left">FC Tambov</div><div class="col col-xs-3"><span class="label label-default">1</span><span class="label label-default">0</span></div><div class="col col-xs-3"><span class="label label-default">0</span><span class="label label-default">0</span></div></div></div>');

}
function eniyibahisler() {
    var veri = '';
    for (var i = 1; i <= 5; i++) {
        veri += '' +
            '<div class="row">' +
            '    <div class="col-md-12">' +
            '        <div class="panel panel-default">' +
            '            <div class="panel-heading">Espanyol - Stjarnan <i class="fa fa-times cursor-pointer pull-right panelClose" onClick="eniyibahisClose(this);"></i></div>' +
            '            <div class="panel-body">' +
            '                <div class="row">' +
            '                    <div class="col-md-5 text-left">Tahmin</div>' +
            '                    <div class="col-md-7 pl-0 pr-20">' +
            '                        <div class="row">' +
            '                            <div class="col-md-4 plr-3">1</div>' +
            '                            <div class="col-md-4 plr-3">X</div>' +
            '                            <div class="col-md-4 plr-3">2</div>' +
            '                        </div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="row mt-5">' +
            '                    <div class="col-md-5 text-left">' +
            '                        <button type="button" class="btn btn-dark btn-xs" onmouseover="tooltipProgress(this,60,80,40);">' +
            '                            <i class="fas fa-user"></i>' +
            '                        </button>' +
            '                        <button type="button" class="btn btn-dark btn-xs" onmouseover="tooltipAnalytics(this);">' +
            '                            <i class="fas fa-chart-pie"></i>' +
            '                        </button>' +
            '                    </div>' +
            '                    <div class="col-md-7 pl-0 pr-20">' +
            '                        <div class="row pt-3">' +
            '                            <div class="col-md-4 plr-3"><a class="label label-default" onClick="oranSelect(this);">5.00</a></div>' +
            '                            <div class="col-md-4 plr-3"><a class="label label-default" onClick="oranSelect(this);">1.35</a></div>' +
            '                            <div class="col-md-4 plr-3"><a class="label label-default" onClick="oranSelect(this);">6.50</a></div>' +
            '                        </div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>';
    }
    $('.eniyibahisler').html(veri);
}
function widthcss() {
    css = '';
    for (var i = 1; i <= 100; i++) {
        css += '.wd-' + i + ' { width : ' + i + '% !important; }';
    }
    $("<style>" + css + "</style>").appendTo("head")
}