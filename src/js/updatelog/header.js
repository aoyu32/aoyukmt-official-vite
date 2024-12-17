document.addEventListener("DOMContentLoaded", () => {
    const text = "UPDATELOG"; // 要显示的文本
    initTypeEffect("logo-text",text,"|")
});

document.getElementById('menu-toggle').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});

// 获取目标元素
const downloadLink = document.querySelector('.download-link');
// 保存原始文本和悬浮后的文本
const originalText = "😎 下载安装";
const hoverText = "🫣 下载安装";

// 监听鼠标悬浮事件
downloadLink.addEventListener('mouseover', function () {
    downloadLink.textContent = hoverText;  // 更改为悬浮后的文本
    downloadLink.classList.add('hovered');
});

// 监听鼠标离开事件
downloadLink.addEventListener('mouseout', function () {
    downloadLink.textContent = originalText;  // 恢复为原始文本
     downloadLink.classList.remove('hovered');
});

// 获取目标元素
const feedbackLink = document.querySelector('.feedback-link');
// 保存原始文本和悬浮后的文本
const originalText2 = "👎 意见反馈";
const hoverText2 = "👍 意见反馈";

// 监听鼠标悬浮事件
feedbackLink.addEventListener('mouseover', function () {
    feedbackLink.textContent = hoverText2;  // 更改为悬浮后的文本
    console.log(hoverText)
});

// 监听鼠标离开事件
feedbackLink.addEventListener('mouseout', function () {
    feedbackLink.textContent = originalText2;  // 恢复为原始文本
});
