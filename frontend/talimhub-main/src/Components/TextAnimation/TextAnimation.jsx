import { useEffect } from 'react';
import anime from 'animejs';

const TextAnimation = ({ text }) => {
    useEffect(() => {
        const textWrapper = document.querySelector('.ml3');
        textWrapper.innerHTML = textWrapper.textContent.replace(
            /\S/g,
            "<span class='letter'>$&</span>"
        );
        anime.timeline({ loop: false })
            .add({
                targets: '.ml3 .letter',
                opacity: [0, 1],
                easing: "easeInOutQuad",
                duration: 1000,
                delay: (el, i) => 50 * (i + 1),
                loopComplete: true,
            })
            .add({
                targets: '.ml3',
                opacity: 0,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 500
            });
    }, []);

    return (
        <h1 className="ml3">{text}</h1>
    );
};

export default TextAnimation;
