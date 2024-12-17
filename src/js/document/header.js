//顶部打字机效果
document.addEventListener("DOMContentLoaded", () => {
    const text = "DOCUMENT"; // 要显示的文本
    initTypeEffect("logo-text", text, "|");
});


//顶部导航栏响应式展开按钮
document.getElementById('menu-toggle').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});

// 获取目标元素
const downloadLink = document.querySelector('.download-link');
// 保存原始文本和悬浮后的文本
const originalText = "🛬 下载安装";
const hoverText = "🛫 下载安装";

// 监听鼠标悬浮事件
downloadLink.addEventListener('mouseover', function () {
    downloadLink.textContent = hoverText;  // 更改为悬浮后的文本
});

// 监听鼠标离开事件
downloadLink.addEventListener('mouseout', function () {
    downloadLink.textContent = originalText;  // 恢复为原始文本
});

// 获取目标元素
const updatelogLink = document.querySelector('.updatelog-link');
// 保存原始文本和悬浮后的文本
const originalText2 = "🫠 更新日志";
const hoverText2 = "🥳 更新日志";

// 监听鼠标悬浮事件
updatelogLink.addEventListener('mouseover', function () {
    updatelogLink.textContent = hoverText2;  // 更改为悬浮后的文本
});

// 监听鼠标离开事件
updatelogLink.addEventListener('mouseout', function () {
    updatelogLink.textContent = originalText2;  // 恢复为原始文本
});