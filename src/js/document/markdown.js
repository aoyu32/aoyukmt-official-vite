//侧边导航栏点击渲染文档
const navLinks = document.querySelectorAll('.nav-menu li.has-submenu .nav-submenu a');
const contentContainer = document.getElementById('document-content');

// 设置默认加载的文档和当前索引
const defaultDoc = 'start';
let currentIndex = 0; // 默认索引

// 初始化导航栏点击事件
navLinks.forEach((link, index) => {
    link.dataset.index = index; // 为每个链接设置索引
    link.addEventListener('click', (event) => {
        event.preventDefault();
        currentIndex = index; // 更新当前索引
        const docName = link.dataset.md; // 获取 data-md 的值
        renderMarkdown(docName);
        updateNavigationButtons(); // 更新按钮状态
    });
});


// 页面加载时默认加载文档
document.addEventListener('DOMContentLoaded', () => {
    renderMarkdown(defaultDoc);
    updateNavigationButtons(); // 更新按钮状态
});


// 渲染 Markdown 文件内容
function renderMarkdown(docName) {
    fetch(`../docs/${docName}.md`)
        .then(response => {
            if (!response.ok) throw new Error(`Error loading document: ${response.statusText}`);
            return response.text();
        })
        .then(markdown => {
            contentContainer.innerHTML = marked.parse(markdown);
            // 初始化代码高亮（如果使用 highlight.js）
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        })
        .catch(error => {
            contentContainer.innerHTML = `<p>无法加载文档内容：${error.message}</p>`;
        });
}

// 切换上一页或下一页文档
const prePage = document.getElementById('pre-page');
const nextPage = document.getElementById('next-page');

// 处理上一页切换
prePage.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= 1; // 更新索引
        const previousLink = navLinks[currentIndex];
        previousLink.click(); // 模拟点击
        openSidebar()
    }
});

// 处理下一页切换
nextPage.addEventListener('click', () => {
    if (currentIndex < navLinks.length - 1) {
        currentIndex += 1; // 更新索引
        const nextLink = navLinks[currentIndex];
        nextLink.click(); // 模拟点击
        openSidebar()
    }
});

//展开当前页面所在的导航栏菜单
function openSidebar() {
    // 如果当前激活的二级菜单的一级菜单没有展开，则展开
    const activeSubmenuItem = document.querySelector('.nav-menu li.has-submenu .nav-submenu a.active');
    if (activeSubmenuItem) {
        const parentLi = activeSubmenuItem.closest('li.has-submenu');
        if (parentLi && !parentLi.classList.contains('open')) {
            parentLi.classList.add('open');
        }
    }
    updateArrowRotation(); // 确保展开时箭头指向下
}

// 更新按钮状态
function updateNavigationButtons() {
    const prePage = document.getElementById('pre-page');
    const nextPage = document.getElementById('next-page');

    if (currentIndex === 0) {
        prePage.classList.add('hidden'); // 隐藏上一页按钮
    } else {
        prePage.classList.remove('hidden'); // 显示上一页按钮
    }

    if (currentIndex === navLinks.length - 1) {
        nextPage.classList.add('hidden'); // 隐藏下一页按钮
    } else {
        nextPage.classList.remove('hidden'); // 显示下一页按钮
    }
}

// 更新箭头旋转状态
function updateArrowRotation() {
    // 获取所有展开的二级菜单项
    const openedMenuItems = document.querySelectorAll('.nav-menu li.has-submenu.open > a');

    openedMenuItems.forEach((item) => {
        const arrow = item.querySelector('.iconfont');
        if (arrow) {
            arrow.classList.add('rotate'); // 展开时旋转箭头
        }
    });

    // 获取所有未展开的二级菜单项
    const closedMenuItems = document.querySelectorAll('.nav-menu li.has-submenu:not(.open) > a');

    closedMenuItems.forEach((item) => {
        const arrow = item.querySelector('.iconfont');
        if (arrow) {
            arrow.classList.remove('rotate'); // 收起时移除旋转效果
        }
    });
}