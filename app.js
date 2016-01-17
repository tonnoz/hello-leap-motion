var controller = new Leap.Controller();
var box_div = document.getElementById('image');
var leap_left, leap_right, leap_top, leap_bottom;

function set_leap_ranges(frame) {
    var ib = frame.interactionBox;
    leap_left = -ib.width;
    leap_right = ib.width;
    leap_top = ib.height * 2;
    leap_bottom = 0;
}

controller.on('frame', function (frame) {
    if (!frame || !frame.valid) {
        return;
    }

    if (!leap_left) set_leap_ranges(frame);

    if (!frame.pointables.length) return;

    var pointable = frame.pointables[0];

    for (var i = 1; i < frame.pointables.length; ++i) {

        var p = frame.pointables[i];
        if (p.stabilizedTipPosition[2] < pointable.stabilizedTipPosition[2]) {
            pointable = p;
        };
    }

    var tip = pointable.stabilizedTipPosition;
    var percent_width = tip[0] - leap_left;
    percent_width /= (leap_right - leap_left);
    var left = percent_width * window.innerWidth;
    
    var percent_height = tip[1] - leap_top;
    percent_height /= (leap_top - leap_bottom);
    var top = Math.abs(percent_height) * window.innerHeight;
    
    box_div.style.left = left + 'px';
    box_div.style.top = top + 'px';
});

controller.connect();