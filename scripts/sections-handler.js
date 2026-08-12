// Some help from: https://stackoverflow.com/questions/67682845/javascript-pause-video-when-changing-to-another-tab-on-the-same-page

document.addEventListener('DOMContentLoaded', function()
{
    var sectionIDs = ['home', 'downloads', 'characters', 'credits', 'devlog', 'devlogs/devlog1', '404'];
    var container = document.getElementById('sections-container');

    var loadedCount = 0;

    sectionIDs.forEach(id =>
    {
        fetch(`sections/${id}.html`)
            .then(response => response.text())
            .then(html =>
            {
                container.insertAdjacentHTML('beforeend', html);
                loadedCount++;

                if(loadedCount === sectionIDs.length)
                    setupSectionSwitcher();
            })
            .catch(err => console.warn('Failed to load section:', id)); // shouldn't happen unless you're... STUPID
    });
});

function setupSectionSwitcher()
{
    function showSection(id)
    {
        updateAllMedia();
        scrollUp();

        var targetId = id || 'home';

        document.querySelectorAll('section[data-section]').forEach(section => {
            var isActive = (section.dataset.section === targetId);
            section.classList.toggle('active', isActive);
        });

        document.querySelectorAll('a[href^="#"]').forEach(link => { // GRAHHHHHH
            var isActive = (link.hash === '#' + targetId);
            link.classList.toggle('active', isActive);
        });

        fixYoutubeIframe(targetId);
    }

    showSection(window.location.hash.slice(1) || 'home');
    window.addEventListener('hashchange', function() {
        showSection(window.location.hash.slice(1) || 'home');
    });
}

function scrollUp()
{
    window.scrollTo(0, 0);
}

function updateAllMedia()
{
    document.querySelectorAll('video').forEach(v => v.pause());
    document.querySelectorAll('audio').forEach(a => a.pause());
    document.querySelectorAll('iframe[src*="youtube"]').forEach(iframe =>
    {
        var section = iframe.closest('section[data-section]');
        if(!section) return;

        if(!iframe.dataset.originalSrc) 
            iframe.dataset.originalSrc = iframe.src;

        iframe.dataset.sectionId = section.dataset.section;
        iframe.src = 'about:blank';
    });
}

function fixYoutubeIframe(sectionId) // im tired and this is stuuuuupppppppiiiiiiiid
{
    var activeSection = document.querySelector(`section[data-section="${sectionId}"]`);
    if(!activeSection) return;

    var iframes = activeSection.querySelectorAll('iframe[src="about:blank"][data-original-src]');
    iframes.forEach(iframe => iframe.src = iframe.dataset.originalSrc);
}