document.addEventListener("DOMContentLoaded", () => {
    const text = "DOWNLOAD"; // 要显示的文本
    initTypeEffect("logo-text",text,"|")
});

document.getElementById('menu-toggle').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});

// 获取目标元素
const documentLink = document.querySelector('.document-link');
// 保存原始文本和悬浮后的文本
const originalText = "📘 使用文档";
const hoverText = "📖 使用文档";

// 监听鼠标悬浮事件
documentLink.addEventListener('mouseover', function () {
    documentLink.textContent = hoverText;  // 更改为悬浮后的文本
});

// 监听鼠标离开事件
documentLink.addEventListener('mouseout', function () {
    documentLink.textContent = originalText;  // 恢复为原始文本
});


// 获取目标元素
const feedbackLink = document.querySelector('.feedback-link');
// 保存原始文本和悬浮后的文本
const originalText2 = "🤔 更新日志";
const hoverText2 = "😜 更新日志";

// 监听鼠标悬浮事件
feedbackLink.addEventListener('mouseover', function () {
    feedbackLink.textContent = hoverText2;  // 更改为悬浮后的文本
});

// 监听鼠标离开事件
feedbackLink.addEventListener('mouseout', function () {
    feedbackLink.textContent = originalText2;  // 恢复为原始文本
});