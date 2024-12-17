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
    const sidebarLinks = sidebar.querySelectorAll('.nav-menu li.has-submenu .nav-submenu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('show');
            sidebarButton.classList.replace('icon-a-1zuo_left', 'icon-a-1you_right');
        });
    });

    // 点击文档内容区域时关闭侧边栏
    const documentContent = document.getElementById('document-content');
    documentContent.addEventListener('click', () => {
        sidebar.classList.remove('show');
        sidebarButton.classList.replace('icon-a-1zuo_left', 'icon-a-1you_right');
    });
});

//侧边导航栏菜单项展开和收缩
document.addEventListener("DOMContentLoaded", function () {
    const parentItems = document.querySelectorAll(".nav-menu li.has-submenu > a");
    const submenuItems = document.querySelectorAll('.nav-menu li.has-submenu .nav-submenu a');

    //上一页文档的标题
    const prePageTitle = document.querySelector('.pre span')
    //下一页文档的标题
    const nextPageTitle = document.querySelector(".next span")

    // 默认展开前两个一级菜单
    const firstParentLi = parentItems[0]?.parentElement;
    const secondParentLi = parentItems[1]?.parentElement;
    if (firstParentLi) firstParentLi.classList.add("open");
    if (secondParentLi) secondParentLi.classList.add("open");




    // 处理点击一级菜单事件
    parentItems.forEach((item, index) => {
        item.addEventListener("click", function (e) {
            e.preventDefault(); // 阻止默认点击行为

            // 清除其他一级菜单和二级菜单的 'active' 类
            parentItems.forEach((link) => link.classList.remove("active"));
            submenuItems.forEach((link) => link.classList.remove("active"));

            // 为当前点击的一级菜单添加 'active' 类，保持一级菜单红色
            item.classList.add("active");

            // 展开当前一级菜单下的二级菜单
            const parentLi = item.parentElement;
            parentLi.classList.toggle("open"); // 切换 'open' 类，展开或收起子菜单

            // 获取箭头并根据父菜单展开状态来控制旋转
            const arrow = item.querySelector(".iconfont");
            if (arrow) {
                if (parentLi.classList.contains("open")) {
                    // 如果菜单展开，旋转箭头 90 度
                    arrow.classList.add("rotate");
                } else {
                    // 如果菜单收起，旋转回原位
                    arrow.classList.remove("rotate");
                }
            }

        });

    });
    // 处理点击二级菜单事件
    submenuItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            // 清除所有一级菜单和二级菜单的 'active' 类
            console.log("二级菜单的item=", item);
            parentItems.forEach((link) => link.classList.remove("active"));
            submenuItems.forEach((link) => link.classList.remove("active"));

            // 为当前点击的二级菜单项添加 'active' 类
            item.classList.add("active");

            // 为当前点击的二级菜单项的父级一级菜单添加 'active' 类
            const parentLi = item.closest('li.has-submenu');
            if (parentLi) {
                const parentMenuLink = parentLi.querySelector('a');
                if (parentMenuLink) {
                    parentMenuLink.classList.add("active");
                }
            }
            if (index >= 1) {
                // 将当前点击的菜单项的前一项的title渲染到prePageTitle
                prePageTitle.textContent = submenuItems[index - 1].innerText
            }
            if (index < submenuItems.length) {

                // 将当前点击的菜单项的前一项的title渲染到prePageTitle
                nextPageTitle.textContent = submenuItems[index + 1].innerText
            }
        });
    });

    // 模拟点击第一个一级菜单的第一个二级菜单
    const firstSubmenuItem = submenuItems[0];
    if (firstSubmenuItem) {
        firstSubmenuItem.click();
    }
    // 如果当前激活的二级菜单的一级菜单没有展开，则展开
    const activeSubmenuItem = document.querySelector('.nav-menu li.has-submenu .nav-submenu a.active');
    if (activeSubmenuItem) {
        const parentLi = activeSubmenuItem.closest('li.has-submenu');
        if (parentLi && !parentLi.classList.contains('open')) {
            parentLi.classList.add('open');
        }
    }

    // 在页面加载时旋转前两个菜单的箭头
    parentItems.forEach((item, index) => {
        const parentLi = item.parentElement;
        const arrow = item.querySelector(".iconfont");
        if (parentLi.classList.contains("open") && arrow) {
            arrow.classList.add("rotate");
        }
    });

});
