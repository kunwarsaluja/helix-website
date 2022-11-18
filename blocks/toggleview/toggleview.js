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
  TextTutorial.style.backgroundColor = '#808080';
  videoTutorial.style.backgroundColor = '#000000';
  const videoTutorialSection = document.getElementsByClassName('video-tutorial')[0];
  const textTutorialSection = document.getElementsByClassName('instruction-tutorial')[0];
  videoTutorial.addEventListener('click', () => {
    videoTutorialSection.style.display = 'block';
    textTutorialSection.style.display = 'none';
    videoTutorial.style.backgroundColor = '#000000';
    TextTutorial.style.backgroundColor = '#808080';
  });
  TextTutorial.addEventListener('click', () => {
    videoTutorialSection.style.display = 'none';
    textTutorialSection.style.display = 'block';
    TextTutorial.style.backgroundColor = '#000000';
    videoTutorial.style.backgroundColor = '#808080';
  });
}
