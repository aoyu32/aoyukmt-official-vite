import { cozeChat, renderMessageStream } from "./coze";
import { User } from "./user";
import { generateUsernameWithAvatar, isSVG } from "../common/utils";
import { showDialog } from "./dialog";

const chatWindow = document.getElementById('chat-window');
let user = new User();

// 官方自动回复
autoReplay();
// 获取用户信息
user = getUserInfo();

//监听发送快捷键
document.addEventListener('keydown', function (event) {
    // 判断是否按下了 shift + Enter
    if (event.code === 'Enter' && event.shiftKey) {
        event.preventDefault(); // 阻止输入框中插入换行符    
        // 获取按钮并触发点击事件
        sendButton.click();
    }

});

// 给用户头像添加点击事件
chatWindow.addEventListener('click', function (event) {

    // 判断点击的元素是否是用户消息的头像，并且点击的是头像的容器
    const avatar = event.target.closest('.avatar');

    if (avatar && avatar.closest('.chat-message.user')) {
        // 执行头像点击事件
        showDialog(); // 你可以在这里调用显示对话框的函数
    }
});

// 发送按钮点击事件
sendButton.addEventListener('click', function () {
    const input = document.getElementById('chat-input');
    const imageWrapper = document.getElementsByClassName('image-wrapper'); // 获取预览图片

    // 判断是否输入内容或上传图片
    if (!input.value.trim() && imageWrapper.length === 0) {
        showChatTip("不输入内容休想发送消息! 😛");
        sendButton.disabled = true;
        return;
    }

    //获取用户信息
    user = getUserInfo()
    // 判断是否有预览图片
    if (imageWrapper.length !== 0) {
        const img = document.querySelectorAll('.image-wrapper img'); // 获取所有预览图片
        const imgArray = Array.from(img);
        appendUserMessage(chatWindow, input, imgArray); // 构造带图片的消息
    } else {
        appendUserMessage(chatWindow, input, []); // 构造不带图片的消息
    }

    // 重置输入框高度
    adjustHeight();
    // 移除图片预览
    removeImagePreView();
    // 移除输入框阴影
    chatInputArea.classList.remove('focused');
});

// 自动回复消息
function autoReplay() {
    const msg1 = "你好";
    setTimeout(() => appendOfficialReply(msg1), 700);
}

// 获取用户信息
function getUserInfo() {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
        return userInforInit();
    } else {
        const parsedUserInfo = JSON.parse(userInfo);
        // 确保返回的是 User 实例
        return new User(parsedUserInfo.username, parsedUserInfo.avatar);
    }
}

// 初始化随机用户信息
function userInforInit() {
    const user = generateUsernameWithAvatar();
    localStorage.setItem('userInfo', JSON.stringify(user)); // 保存用户信息到LocalStorage
    return user;
}

// 移除图片预览
function removeImagePreView() {
    const imagePreView = document.querySelectorAll('.image-wrapper');
    imagePreView.forEach(element => {
        element.remove();
    });
}

// 发送官方消息回复
function appendOfficialReply(message) {
    //构建官方消息气泡
    //消息主体
    const msg = document.createElement('div');
    msg.className = 'chat-message ' + 'official';

    //头像盒子
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    //头像图片
    const officialAvatar = document.createElement('img');
    officialAvatar.src = '\\src\\assets\\avatar\\aoyukmt-avatar.svg';
    avatar.appendChild(officialAvatar);

    //消息内容盒子
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'message-wrapper';

    //名称
    const nameElement = document.createElement('div');
    nameElement.className = 'name';
    nameElement.textContent = 'AOYUKMT官方📬'

    //消息本体
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-content';
    const textMessage = document.createElement('span');
    textMessage.style.justifyContent = 'center';
    messageContainer.appendChild(textMessage)

    //发送日期
    const date = new Date();
    const currentTime = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const timeElement = document.createElement('div');
    timeElement.className = 'time';
    timeElement.textContent = currentTime;

    //构建消息
    messageWrapper.appendChild(nameElement);
    messageWrapper.appendChild(messageContainer);
    messageWrapper.appendChild(timeElement);

    msg.appendChild(avatar);
    msg.appendChild(messageWrapper);

    //渲染消息内容到消息气泡
    startChat(message, textMessage)

    //发送消息到窗口
    setTimeout(() => {
        chatWindow.appendChild(msg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1000);



}

// 用户消息回复
function appendUserMessage(chatWindow, input, imgArray) {
    const messageContent = input.value;
    CreateMessageBox(chatWindow, user.getUsername(), messageContent, 'user', imgArray);
    // 自动回复消息
    appendOfficialReply(input.value)
    input.value = ''; // 重置输入框
}


// 构建消息盒子
function CreateMessageBox(chatWindow, sender, message, type, imgArray) {
    const msg = document.createElement('div');
    msg.className = 'chat-message ' + type;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';

    if (type === 'user') {
        if (isSVG(user.getAvatar())) {
            avatar.innerHTML = user.getAvatar();
        } else {
            const av = document.createElement('img');
            av.src = user.getAvatar();
            avatar.appendChild(av);
        }
    } else {
        const officialAvatar = document.createElement('img');
        officialAvatar.src = '\\src\\assets\\avatar\\aoyukmt-avatar.svg';
        avatar.appendChild(officialAvatar);
    }

    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'message-wrapper';

    const nameElement = document.createElement('div');
    nameElement.className = 'name';
    if (type === "user") {
        nameElement.textContent = '🪶' + sender;
    } else {
        nameElement.textContent = sender + '📬';
    }

    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-content';
    messageContainer.id = 'message-content'

    const textMessage = document.createElement('span');
    textMessage.style.justifyContent = 'center';

    if (imgArray.length !== 0) {
        textMessage.style.padding = "0 10px 10px 10px";

        const imgContainer = document.createElement('div');
        imgContainer.className = 'message-content-img';

        imgArray.forEach(imgItem => {
            const image = document.createElement('img');
            image.src = imgItem.src;
            imgContainer.appendChild(image);
        });

        messageContainer.appendChild(imgContainer);
        textMessage.style.justifyContent = '';
    }



    if (message !== "") {
        textMessage.textContent = message;
        messageContainer.appendChild(textMessage);
    }
    const date = new Date();
    const currentTime = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const timeElement = document.createElement('div');
    timeElement.className = 'time';
    timeElement.textContent = currentTime;

    messageWrapper.appendChild(nameElement);
    messageWrapper.appendChild(messageContainer);
    messageWrapper.appendChild(timeElement);

    msg.appendChild(avatar);
    msg.appendChild(messageWrapper);

    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


async function startChat(messageContent, element) {
    const stream = await cozeChat(messageContent);
    renderMessageStream(stream, element);
}