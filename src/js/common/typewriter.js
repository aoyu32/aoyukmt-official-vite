function initTypeEffect(elementId, text,cursor) {
    const typingSpeed = 150; // 固定的打字速度
    const deletingSpeed = 100; // 固定的删除速度
    const pauseTime = 500; // 固定的停顿时间
    // const cursor = "|"; // 固定的光标符号

    const textElement = document.getElementById(elementId);
    if (!textElement) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }

    let index = 0;
    let isDeleting = false;

    function typeEffect() {
        const displayText = text.slice(0, index) + cursor;
        textElement.textContent = displayText;

        if (!isDeleting && index < text.length) {
            index++;
            setTimeout(typeEffect, typingSpeed);
        } else if (isDeleting && index > 0) {
            index--;
            setTimeout(typeEffect, deletingSpeed);
        } else {
            isDeleting = !isDeleting;
            setTimeout(typeEffect, pauseTime);
        }
    }

    typeEffect();
}
