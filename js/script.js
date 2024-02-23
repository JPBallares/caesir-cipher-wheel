

/* Create the alphabet on the cipher wheel */
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const outerLetters = document.getElementById('outer-letters');
const innerLetters = document.getElementById('inner-letters');

letters.forEach(letter => {
    const div = document.createElement('div');
    div.className = 'letter';

    const span = document.createElement('span');
    span.textContent = letter;

    div.appendChild(span);
    outerLetters.appendChild(div);

    // Create the inner letters by duplicating the div
    const div2 = div.cloneNode(true);
    innerLetters.appendChild(div2);
});

/**
 * Rotate the inner-wheel of the wheel when user clicks and drag the inner-circle
 */
const ANGLE_PER_SHIFT = 360 / 26;
const innerCircle = document.getElementById('inner-wheel');
const shiftInput = document.getElementById('shift');

innerCircle.addEventListener('mousedown', startDrag);
innerCircle.addEventListener('touchstart', startDrag);
shiftInput.addEventListener('input', updateRotation);

function updateRotation() {
    const shift = shiftInput.value;
    const rotation = shift * ANGLE_PER_SHIFT;
    innerCircle.style.transform = 'rotate(' + rotation + 'deg)';
}

function startDrag(e) {
    e.preventDefault();
    const startAngle = getAngle(getEventX(e), getEventY(e));
    const startRotation = getRotation(innerCircle);
    let lastRotation = startRotation;

    function onMouseMove(e) {
        const angle = getAngle(getEventX(e), getEventY(e));
        const rotation = startRotation + angle - startAngle;
        lastRotation = rotation;
        innerCircle.style.transform = 'rotate(' + rotation + 'deg)';
    }

    function onMouseUp() {
        // Calculate the nearest multiple of ANGLE_PER_SHIFT
        const shift = Math.round(lastRotation / ANGLE_PER_SHIFT);
        const snappedRotation = shift * ANGLE_PER_SHIFT;
        innerCircle.style.transform = 'rotate(' + snappedRotation + 'deg)';

        // shiftInput.value = shift % 26;
        shiftInput.value = shift;

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
    const rect = innerCircle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
}

function getRotation(element) {
    const transform = element.style.transform
    const match = transform.match(/rotate\(([^)]+)deg\)/);
    return match ? parseFloat(match[1]) : 0;
}
