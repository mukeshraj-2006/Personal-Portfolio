'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
});
