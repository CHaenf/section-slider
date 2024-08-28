"use strict";

const sections = document.querySelectorAll("section");
let currentSectionIndex = 0;
let isCooldown = false;
const cooldownTime = 1000; // Cooldown time in milliseconds (1 second)

function scrollSections(event) {
    if (isCooldown) return; // Prevent scrolling if cooldown is active

    if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        sections[currentSectionIndex].style.transform = "translateY(0)";
        sections[currentSectionIndex + 1].style.transform = "translateY(0)";
        currentSectionIndex++;
    } else if (event.deltaY < 0 && currentSectionIndex > 0) {
        sections[currentSectionIndex].style.transform = "translateY(100%)";
        sections[currentSectionIndex - 1].style.transform = "translateY(0)";
        currentSectionIndex--;
    }

    isCooldown = true;
    setTimeout(() => {
        isCooldown = false;
    }, cooldownTime);

}
window.addEventListener('wheel', scrollSections)

window.onload = () => {
    sections.forEach((section) => {
        section.style.transform = "translateY(100%)";

        document.querySelector(".section1").style.transform = "translateY(0)";
        setTimeout(() => {
            section.style.opacity = `1`;
        }, 600);
    });
};

function MoveSections() {
    if (isCooldown) return;
    let startY;
    let isDragging = false;
    document.addEventListener("touchstart", function (event) {
        startY = event.touches[0].clientY;
        isDragging = true;
    });
    document.addEventListener("touchmove", function (event) {
        if (isDragging) {
            const currentY = event.touches[0].clientY;
            const deltaY = currentY - startY;

            const nextSection = sections[currentSectionIndex + 1];

            if (deltaY < 0 && nextSection) {
                // currentSection.style.transform = `translateY(${deltaY}px)`;
                nextSection.style.transform = `translateY(calc(100% + ${deltaY}px))`;
                nextSection.style.transition = `transform 0s`;
            } else if (deltaY < 0 && nextSection) {
                nextSection.style.transform = `translateY(calc(100% - ${deltaY}px))`;
                nextSection.style.transition = `transform 0.3s ease-in`;
            }
        }
    });
    document.addEventListener("touchend", function (event) {
        const endY = event.changedTouches[0].clientY;

        if (startY > endY + 50 && currentSectionIndex < sections.length - 1) {
            sections[currentSectionIndex].style.transform = "translateY(0)";
            sections[currentSectionIndex + 1].style.transition = `transform 0.3s ease-in`;
            sections[currentSectionIndex + 1].style.transform = "translateY(0)";
            currentSectionIndex++;
        } else if (startY < endY + 50 && currentSectionIndex > 0) {
            sections[currentSectionIndex].style.transform = "translateY(100%)";
            sections[currentSectionIndex - 1].style.transform = "translateY(0)";
            currentSectionIndex--;
        }
    });
}
window.addEventListener("DOMContentLoaded", MoveSections);




