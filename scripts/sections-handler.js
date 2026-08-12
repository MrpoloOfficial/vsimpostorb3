

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
        var targetId = id || 'home';

        document.querySelectorAll('section[data-section]').forEach(section => {
            var isActive = (section.dataset.section === targetId);
            section.classList.toggle('active', isActive);
        });

        document.querySelectorAll('a[href^="#"]').forEach(link => { // GRAHHHHHH
            var isActive = (link.hash === '#' + targetId);
            link.classList.toggle('active', isActive);
        });
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