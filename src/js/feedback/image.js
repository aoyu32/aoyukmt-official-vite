const imageUploadInput = document.getElementById('image-upload');
const previewContainer = document.getElementById('preview-container');

document.addEventListener("DOMContentLoaded", () => {
    // 处理图片选择和预览
    imageUploadInput.addEventListener('change', handleImageSelection);

    // 清空文件输入框，允许重复选择相同的图片
    imageUploadInput.value = '';

    // 监听粘贴事件（复制粘贴图片）
    document.getElementById('chat-input').addEventListener('paste', handlePaste);

    // 监听拖动事件（拖动图片到预览区）
    document.getElementById('main-content').addEventListener('dragover', handleDragOver);
    document.getElementById('main-content').addEventListener('drop', handleDrop);
});

/**
 * 处理用户选择图片的事件，支持多图片上传
 * @param {Event} event - 文件选择事件
 */
function handleImageSelection(event) {
    const files = event.target.files;

    // 遍历每个选中的文件
    Array.from(files).forEach((file) => {
        // 通过 FileReader API 读取文件内容
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('image-wrapper'); // 包裹图片和删除按钮

            const img = document.createElement('img');
            img.src = e.target.result; // 将文件转为图片地址

            // 图片加载完成后移除灰度和遮罩效果
            img.onload = () => {
                img.style.filter = 'grayscale(0%)'; // 加载完成后移除灰度效果
                img.style.maskImage = 'none'; // 移除渐变遮罩
            };

            // 创建删除按钮
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = '×'; // 删除按钮的内容
            deleteBtn.addEventListener('click', () => {
                imageWrapper.remove(); // 删除整个图片和按钮的容器
            });

            // 将图片和删除按钮添加到容器
            imageWrapper.appendChild(img);
            imageWrapper.appendChild(deleteBtn);

            // 将图片容器添加到预览区
            previewContainer.appendChild(imageWrapper);
        };
        reader.readAsDataURL(file); // 读取文件并生成预览
        chatInputArea.classList.add('focused')
    });
}

/**
 * 处理粘贴事件，将粘贴的图片显示在预览区
 * @param {Event} event - 粘贴事件
 */
function handlePaste(event) {
    const items = event.clipboardData.items;

    // 遍历粘贴的内容，查找是否包含图片
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile(); // 获取粘贴的图片文件
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageWrapper = document.createElement('div');
                imageWrapper.classList.add('image-wrapper'); // 包裹图片和删除按钮

                const img = document.createElement('img');
                img.src = e.target.result; // 将文件转为图片地址

                // 图片加载完成后移除灰度和遮罩效果
                img.onload = () => {
                    img.style.filter = 'grayscale(0%)';
                    img.style.maskImage = 'none';
                    img.style.webkitMaskImage = 'none';
                };

                // 创建删除按钮
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.textContent = '×'; // 删除按钮的内容
                deleteBtn.addEventListener('click', () => {
                    imageWrapper.remove(); // 删除整个图片和按钮的容器
                });

                // 将图片和删除按钮添加到容器
                imageWrapper.appendChild(img);
                imageWrapper.appendChild(deleteBtn);

                // 将图片容器添加到预览区
                previewContainer.appendChild(imageWrapper);
            };
            reader.readAsDataURL(file); // 读取文件并生成预览
        }
    }
}

/**
 * 处理拖动进入事件，允许拖拽图片到聊天框
 * @param {Event} event - 拖动进入事件
 */
function handleDragOver(event) {
    event.preventDefault(); // 阻止默认行为，以允许放下操作
}

/**
 * 处理拖放事件，将拖动的图片显示在预览区
 * @param {Event} event - 拖放事件
 */
function handleDrop(event) {
    event.preventDefault(); // 阻止默认行为，防止浏览器打开文件

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        // 如果有拖拽的文件，调用处理函数
        handleImageSelection({ target: { files } });
    }
}
