/**
 * Rotate the inner-wheel of the wheel when user clicks and drag the inner-circle
 */
var innerCircle = document.getElementById('inner-wheel');

innerCircle.addEventListener('mousedown', startDrag);
innerCircle.addEventListener('touchstart', startDrag);

function startDrag(e) {
    e.preventDefault();
    let startAngle = getAngle(getEventX(e), getEventY(e));
    let startRotation = getRotation(innerCircle);
    let lastRotation = startRotation;

    function onMouseMove(e) {
        let angle = getAngle(getEventX(e), getEventY(e));
        let rotation = startRotation + angle - startAngle;
        lastRotation = rotation;
        innerCircle.style.transform = 'rotate(' + rotation + 'deg)';
    }

    function onMouseUp() {
        // Calculate the nearest multiple of 13.846deg
        let snappedRotation = Math.round(lastRotation / 13.846) * 13.846;
        innerCircle.style.transform = 'rotate(' + snappedRotation + 'deg)';

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('touchmove', onMouseMove);
        document.removeEventListener('touchend', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);
}

function getEventX(e) {
    return e.clientX || e.touches[0].clientX;
}

function getEventY(e) {
    return e.clientY || e.touches[0].clientY;
}

function getAngle(x, y) {
    var rect = innerCircle.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;
    return Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
}

function getRotation(element) {
    var transform = element.style.transform
    var match = transform.match(/rotate\(([^)]+)deg\)/);
    return match ? parseFloat(match[1]) : 0;
}
