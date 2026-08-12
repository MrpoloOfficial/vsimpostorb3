// already did this in css but i feel like this is better

var starLayers = [
    {
        element: document.getElementById('BgStars1'),
        progress: 0, speed: 0.004
    },
    {
        element: document.getElementById('BgStars2'),
        progress: 10, speed: 0.012
    }
];

function scrollBg()
{
    starLayers.forEach(layer =>
    {
        var isMobile = window.matchMedia('(max-width: 768px)').matches; // isSmallerDevice whatever
        var speedMult = isMobile ? 4 : 1;

        layer.progress += layer.speed * speedMult;
        if (layer.progress >= 100) layer.progress = 0;

        layer.element.style.transform = `translateX(-${layer.progress}%)`;
    });
    requestAnimationFrame(scrollBg);
}

scrollBg();