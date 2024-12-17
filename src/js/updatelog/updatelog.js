//侧边导航栏响应式显示和隐藏
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarButton = document.getElementById('sidebar-button');

    let b = 1;
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
        if (b === 1) {
            sidebarButton.classList.replace('icon-a-1you_right', 'icon-a-1zuo_left');
            b = 0;
        } else {
            sidebarButton.classList.replace('icon-a-1zuo_left', 'icon-a-1you_right');
            b = 1;
        }
    });

    // 点击侧边栏链接时关闭侧边栏
    const sidebarLinks = sidebar.querySelectorAll('.updatelog-nav a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('show');
            sidebarButton.classList.replace('icon-a-1zuo_left', 'icon-a-1you_right');
        });
    });

    // 点击文档内容区域时关闭侧边栏
    const documentContent = document.getElementById('updatelog-content');
    documentContent.addEventListener('click', () => {
        sidebar.classList.remove('show');
        sidebarButton.classList.replace('icon-a-1zuo_left', 'icon-a-1you_right');
    });
});