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
        layer.progress += layer.speed;
        if (layer.progress >= 100) layer.progress = 0;

        layer.element.style.transform = `translateX(-${layer.progress}%)`;
    });
    requestAnimationFrame(scrollBg);
}

scrollBg();