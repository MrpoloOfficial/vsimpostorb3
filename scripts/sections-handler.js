var sections = document.querySelectorAll('section');
var links = document.querySelectorAll('a[href^="#"]');

// soo vsimpostor.com like woah!!!!!!

function update(id)
{
    var target = document.querySelector('section[data-section="' + (id || 'home') + '"]')
        || document.querySelector('section[data-section="home"]');

    sections.forEach(s => s.classList.toggle('active', s === target));
    links.forEach(l => l.classList.toggle('active', l.hash === '#' + (id || 'home')));

    if(location.hash !== '#' + (id || 'home')) 
        history.pushState(null, '', '#' + (id || 'home'));
}

function goHome()
{
    update('home');
    window.scrollTo(0, 0);
}

links.forEach(l => l.addEventListener('click', e => {
    e.preventDefault();
    update(l.hash.slice(1));
}));

addEventListener('hashchange', () => update(location.hash.slice(1) || 'home'));
update(location.hash.slice(1) || 'home');
