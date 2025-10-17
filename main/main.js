document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const timeEl = document.getElementById('time');
    const hurdleEl = document.getElementById('hurdle');
    const selectorEl = document.getElementById('exit');

    if (!addButton) return;

    addButton.addEventListener('click', () => {
        const time = Number(timeEl?.value) || 0;
        const hurdle = Number(hurdleEl?.value) || 0;
        const selector = Number(selectorEl?.value) || 0;
        const media = (time + hurdle + selector) / 3;
        console.log(`Média calculada: ${media}`);
        

    });
});
