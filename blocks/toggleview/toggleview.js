export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
  const videoTutorial = document.getElementById('video-based-learning');
  const TextTutorial = document.getElementById('instruction-based-learning');
  const root = document.querySelector(':root');
  const rs = getComputedStyle(root);
  const videoTutorialSection = document.getElementsByClassName('video-tutorial')[0];
  const textTutorialSection = document.getElementsByClassName('instruction-tutorial')[0];
  videoTutorial.addEventListener('click', () => {
    videoTutorialSection.style.display = 'block';
    textTutorialSection.style.display = 'none';
    root.style.setProperty('--videobg', rs.getPropertyValue('--active'));
    root.style.setProperty('--tutorialbg', rs.getPropertyValue('--passive'));
  });
  TextTutorial.addEventListener('click', () => {
    videoTutorialSection.style.display = 'none';
    textTutorialSection.style.display = 'block';
    root.style.setProperty('--videobg', rs.getPropertyValue('--passive'));
    root.style.setProperty('--tutorialbg', rs.getPropertyValue('--active'));
  });
}
