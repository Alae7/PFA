import React, { useState, useEffect } from 'react';
import "./scroll.model.css"


const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [bottomOffset, setBottomOffset] = useState(30);

    const toggleVisibility = () => {
        const footerHeight = document.querySelector('footer')?.clientHeight || 0;
        const windowHeight = window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }

        const distanceFromBottom = pageHeight - (scrollPosition + windowHeight);
        if (distanceFromBottom < footerHeight + 30) {
            setBottomOffset(footerHeight + 30 - distanceFromBottom);
        } else {
            setBottomOffset(30);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div
            className="scroll-to-top"
            style={{ bottom: `${bottomOffset}px` }}
        >
            {isVisible && (
                <div onClick={scrollToTop} className="scroll-button">
                    ↑
                </div>
            )}
        </div>
    );
};

export default ScrollTop;
