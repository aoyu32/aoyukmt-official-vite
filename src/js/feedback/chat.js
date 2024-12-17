const textarea = document.getElementById('chat-input');
const chatInputArea = document.getElementById('chat-input-area')

textarea.addEventListener('focus', () => {
    chatInputArea.classList.add('focused')
});

textarea.addEventListener('blur', () => {
    chatInputArea.classList.remove('focused')
});


// 动态调整高度和滚动条
function adjustHeight() {
    const lines = textarea.value.split('\n').length; // 获取当前行数

    // 如果是单行，设置行高为40px
    if (lines === 1) {
        textarea.style.lineHeight = '40px'; // 单行时设置行高为40px
    } else {
        textarea.style.lineHeight = ''; // 多行时移除行高样式，恢复默认
    }

    // 重置高度，并根据内容调整高度
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    // 控制是否显示滚动条
    textarea.style.overflowY = textarea.scrollHeight > textarea.clientHeight ? 'auto' : 'hidden';
}

// 绑定输入事件
textarea.addEventListener('input', adjustHeight);

// 初始化高度（包括清空内容时的处理）
adjustHeight();

// 获取目标元素
const uploadIocn = document.querySelector('.upload-icon');
// 保存原始文本和悬浮后的文本
const original = "🔗";
const hover = "🖼️";
// const hover = "🌅";
// const hover = "🌄";
// 监听鼠标悬浮事件
uploadIocn.addEventListener('mouseover', function () {
    uploadIocn.textContent = hover;  // 更改为悬浮后的文本
});

// 监听鼠标离开事件
uploadIocn.addEventListener('mouseout', function () {
    uploadIocn.textContent = original;  // 恢复为原始文本
});

// 获取目标元素
const sendButton = document.getElementById('send-button');
// 保存原始文本和悬浮后的文本
const original1 = "🍥";
const hover1 = "👍";
sendButton.addEventListener('mouseover', function () {
    sendButton.textContent = hover1;  // 更改为悬浮后的文本
});

// 监听鼠标离开事件
sendButton.addEventListener('mouseout', function () {
    sendButton.textContent = original1;  // 恢复为原始文本
});



const chatTip = document.querySelector('.chat-tip');
// 显示提示框
function showChatTip(message) {
    chatTip.textContent = message;
    chatTip.classList.add('show');
    chatTip.classList.remove('hide');

    // 设置延时后自动收回提示框
    setTimeout(() => {
        hideChatTip();
    }, 2000); // 3秒后收回
}

// 隐藏提示框
function hideChatTip() {
    sendButton.disabled = false;
    chatTip.classList.add('hide');
    chatTip.classList.remove('show');
}

