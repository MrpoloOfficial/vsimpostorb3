var sections = document.querySelectorAll('section');
var links = document.querySelectorAll('a[href^="#"]');

// soo vsimpostor.com like woah!!!!!!

function update(id)
{
    var target = document.getElementById(id) || document.getElementById('home');

    sections.forEach(s => s.classList.toggle('active', s === target));
    links.forEach(l => l.classList.toggle('active', l.hash === '#' + id));

    if(location.hash !== '#' + id) 
        history.pushState(null, '', '#' + id);

    if(document.activeElement)
        document.activeElement.blur();

    setTimeout(function() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, 1);
}

links.forEach(l => l.addEventListener('click', e => {
    e.preventDefault();
    update(l.hash.slice(1));
}));

addEventListener('hashchange', () => update(location.hash.slice(1) || 'home'));
update(location.hash.slice(1) || 'home');