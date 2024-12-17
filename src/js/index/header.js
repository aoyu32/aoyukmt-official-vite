document.addEventListener("DOMContentLoaded", () => {
    const text = "AOYUKMT"; // 要显示的文本
    initTypeEffect("logo-text",text,"|")
});


document.getElementById('menu-toggle').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});

// 获取目标元素
const updatelogLink = document.querySelector('.updatelog-link');
// 保存原始文本和悬浮后的文本
const originalText = "🐋 更新日志";
const hoverText = "🐳 更新日志";

// 监听鼠标悬浮事件
updatelogLink.addEventListener('mouseover', function () {
    updatelogLink.textContent = hoverText;  // 更改为悬浮后的文本
});

// 监听鼠标离开事件
updatelogLink.addEventListener('mouseout', function () {
    updatelogLink.textContent = originalText;  // 恢复为原始文本
});
