import React, { useState, useEffect } from 'react';
import { SlArrowUp } from 'react-icons/sl';

const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`fixed bottom-10 right-10 ${isVisible ? '' : 'hidden'}`}>
            <button onClick={scrollToTop} className="bg-black dark:bg-white hover:opacity-25 text-white dark:text-black font-bold py-2 px-2 rounded-full">
                <SlArrowUp/>
            </button>
        </div>
    );
};

export default ScrollTop;