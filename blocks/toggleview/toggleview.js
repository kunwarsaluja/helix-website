export default function decorate(block) {
    const ul = document.createElement('ul');
    [...block.children].forEach((row) => {
        const li = document.createElement('li');
        li.innerHTML = row.innerHTML;
        ul.append(li);
    });
    block.textContent = '';
    block.append(ul);
    var videoTutorial = document.getElementById('video-based-learning');
    var TextTutorial = document.getElementById('instruction-based-learning');

    var videoTutorialSection = document.getElementsByClassName("video-tutorial")[0];
    var textTutorialSection = document.getElementsByClassName("instruction-tutorial")[0];

    videoTutorial.addEventListener("click", function () {
        videoTutorialSection.style.display = 'block';
        textTutorialSection.style.display = 'none';

    });

    TextTutorial.addEventListener("click", function () {
        videoTutorialSection.style.display = 'none';
        textTutorialSection.style.display = 'block';


    });

}