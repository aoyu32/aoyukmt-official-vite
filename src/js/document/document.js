// // 打字机效果
// document.addEventListener("DOMContentLoaded", () => {
//     const text = "DOCUMENT"; // 要显示的文本
//     initTypeEffect("logo-text", text, "|")
// });


// //header上导航栏响应式展开按钮
// document.getElementById('menu-toggle').addEventListener('click', function () {
//     const navLinks = document.getElementById('nav-links');
//     navLinks.classList.toggle('active');
// });

// const navLinks = document.querySelectorAll('.sidebar-nav a');
// const contentContainer = document.getElementById('document-content');

// // 设置默认加载的文档（可选）
// const defaultDoc = 'start';

// // 渲染 Markdown 文件内容
// function renderMarkdown(docName) {
//     fetch(`../docs/${docName}.md`)
//         .then(response => {
//             if (!response.ok) throw new Error(`Error loading document: ${response.statusText}`);
//             return response.text();
//         })
//         .then(markdown => {
//             // 使用 marked.js 将 Markdown 转换为 HTML
//             contentContainer.innerHTML = marked.parse(markdown);
//             // 初始化代码高亮（如果使用 highlight.js）
//             document.querySelectorAll('pre code').forEach((block) => {
//                 hljs.highlightElement(block);
//             });
//         })
//         .catch(error => {
//             contentContainer.innerHTML = `<p>无法加载文档内容：${error.message}</p>`;
//         });
// }

// // 初始化导航栏点击事件
// navLinks.forEach(link => {
//     link.addEventListener('click', event => {
//         event.preventDefault();
//         const docName = link.dataset.md; // 获取 data-md 的值
//         renderMarkdown(docName);
//     });
// });

// // 页面加载时默认加载文档
// document.addEventListener('DOMContentLoaded', () => {
//     renderMarkdown(defaultDoc);
// });


// // 侧边栏切换功能
// document.addEventListener('DOMContentLoaded', () => {
//     const sidebar = document.getElementById('sidebar');
//     const sidebarToggle = document.getElementById('sidebar-toggle');
//     const sidebarButton = document.getElementById('sidebar-button')

//     let b = 1
//     sidebarToggle.addEventListener('click', () => {
//         sidebar.classList.toggle('show');
//         if (b == 1) {
//             sidebarButton.classList.replace('icon-a-1you_right', 'icon-a-1zuo_left');
//             b = 0
//         } else {
//             sidebarButton.classList.replace('icon-a-1zuo_left', 'icon-a-1you_right');
//             b = 1
//         }
//     });

//     // 点击侧边栏链接时关闭侧边栏
//     const sidebarLinks = sidebar.querySelectorAll('a');
//     sidebarLinks.forEach(link => {
//         link.addEventListener('click', () => {
//             sidebar.classList.remove('show');
//             sidebarButton.classList.replace('icon-a-1zuo_left', 'icon-a-1you_right');
//         });
//     });

//     // 点击文档内容区域时关闭侧边栏
//     const documentContent = document.getElementById('document-content');
//     documentContent.addEventListener('click', () => {
//         sidebar.classList.remove('show');
//         sidebarButton.classList.replace('icon-a-1zuo_left', 'icon-a-1you_right');
//     });
// });


// document.addEventListener("DOMContentLoaded", function () {
//     const menuItems = document.querySelectorAll(".sidebar-nav ul li a");
//     const parentItems = document.querySelectorAll(".nav-menu li.has-submenu > a");

//     // 处理点击一级菜单事件
//     parentItems.forEach((item) => {
//         item.addEventListener("click", function (e) {
//             e.preventDefault(); // 阻止默认点击行为

//             // 清除其他一级菜单和二级菜单的 'active' 类
//             parentItems.forEach((link) => link.classList.remove("active"));
//             menuItems.forEach((link) => link.classList.remove("active"));

//             // 为当前点击的一级菜单添加 'active' 类，保持一级菜单红色
//             item.classList.add("active");

//             // 展开当前一级菜单下的二级菜单
//             const parentLi = item.parentElement;
//             parentLi.classList.toggle("open"); // 切换 'open' 类，展开或收起子菜单
//         });
//     });

//     // 处理点击二级菜单事件
//     menuItems.forEach((item) => {
//         item.addEventListener("click", function () {
//             // 清除所有一级菜单和二级菜单的 'active' 类
//             parentItems.forEach((link) => link.classList.remove("active"));
//             menuItems.forEach((link) => link.classList.remove("active"));

//             // 为当前点击的二级菜单项添加 'active' 类
//             item.classList.add("active");

//             // 为当前点击的二级菜单项的父级一级菜单添加 'active' 类
//             const parentLi = item.closest('li.has-submenu');
//             if (parentLi) {
//                 const parentMenuLink = parentLi.querySelector('a');
//                 if (parentMenuLink) {
//                     parentMenuLink.classList.add("active");
//                 }
//             }
//         });
//     });
// });


