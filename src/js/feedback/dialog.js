import { User } from "./user";
import { isSVG } from "../common/utils";

// 获取 DOM 元素
const closeButton = document.querySelector('.close-button');
const modalOverlay = document.querySelector('.modal-overlay');
const cancelButton = document.getElementById('cancel');
const avatarUpload = document.getElementById('avatar-upload');
const username = document.getElementById('username');
const newNameInput = document.getElementById('input-name');
const inputHint = document.getElementById('input-hint');
const confirmButton = document.getElementById('confirm');
const userAvatar = document.getElementById('avatar-img');
const avatarImageInput = document.getElementById('avatar-img-input');

//输入框的值
let inputValue = "";
//提示信息
let tip = ""
//图片大小是否超出
let avatarIsOk = true
//输入的用户名是否超出
let userNameIsOk = true
//封装用户信息的对象
let u = new User();
//从本地存储获取用户信息
let userInfo
let ua
let un

// 显示弹窗
export function showDialog() {
    init()
    renderUserInfo();
    modalOverlay.style.display = 'flex';
}

// 渲染用户信息
function renderUserInfo() {
    userInfo = JSON.parse(localStorage.getItem('userInfo'))
    ua = userInfo.avatar
    un = userInfo.username
    u.setUsername(userInfo.username)
    u.setAvatar(userInfo.avatar)
    if (isSVG(userInfo.avatar)) {
        userAvatar.innerHTML = ua
    } else {
        userAvatar.innerHTML = ''; // 清空当前内容
        const av = document.createElement('img');
        av.src = ua
        userAvatar.appendChild(av);
    }
    username.innerHTML = `Hi, ${userInfo.username}`;
}

// 隐藏弹窗
function hideDialog() {
    modalOverlay.style.display = 'none';
}

// 更新提示信息
function updateTooltip(element, tooltip) {
    element.style.setProperty('--tooltip-content', `"${tooltip}"`);
}

// 处理用户名输入
function handleNameInput() {
    inputValue = newNameInput.value;
    if (!/^.{1,8}$/.test(inputValue) && inputValue.trim() !== "") {
        inputHint.innerHTML = "你用户名长度超过字符数限制啦!😡";
        inputHint.classList.add('blink1');
        userNameIsOk = false
    } else {
        inputHint.innerHTML = "用户名长度，字符数小于8个哈!🫰";
        inputHint.classList.remove('blink1');
        userNameIsOk = true
    }
}

// 处理头像上传
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;


    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        ua = img.src
        userAvatar.innerHTML = ''; // 清空原来的内容
        userAvatar.appendChild(img);
    };
    reader.readAsDataURL(file);

    const maxSizeInBytes = 3 * 1024 * 1024; // 3MB
    if (file.size > maxSizeInBytes) {
        avatarIsOk = false
        userAvatar.classList.add('blink2')
    } else {
        avatarIsOk = true
        userAvatar.classList.remove('blink2')
    }


    updateTooltip(avatarUpload, "点击修改头像🤓");
}


function init() {
    // 事件绑定
    //关闭弹窗按钮
    closeButton.addEventListener('click', hideDialog);
    //取消按钮
    cancelButton.addEventListener('click', hideDialog);
    //确认按钮
    confirmButton.addEventListener('click', () => {

        let isChangeAvatar = ua !== userInfo.avatar
        if (inputValue !== "") {
            u.setUsername(inputValue)
        }
        if (isChangeAvatar) {
            u.setAvatar(ua)
        }
        localStorage.setItem("userInfo", JSON.stringify(u));
        //更新聊天窗口所有的聊天的头像和用户名
        const allUserMessage = document.querySelectorAll('.chat-message.user')
        Array.from(allUserMessage).forEach(element => {
            const avatar = element.querySelector('.avatar')
            const username = element.querySelector('.name')
            console.log(avatar);
            console.log(username);
            username.textContent = u.getUsername()
            if (isChangeAvatar) {
                avatar.innerHTML = ""
                const i = document.createElement('img')
                i.src = u.getAvatar()
                avatar.appendChild(i)
            }

        })
        hideDialog()
        newNameInput.value = ""

    });
    //确认按钮悬浮监听

    confirmButton.addEventListener('mouseenter', () => {

        if (!userNameIsOk) {
            tip = "用户名长度超出,无法确认!😐"
            confirmButton.disabled = true
        } else if (!avatarIsOk) {
            tip = "你的头像超过3M啦,换下呀!😒"
            confirmButton.disabled = true
        } else if (inputValue !== "" && inputValue !== un && ua !== userInfo.avatar) {
            tip = "确认修改名称和头像请点击🥳";
            confirmButton.disabled = false
        } else if (inputValue !== "" && inputValue !== un) {
            tip = "确认修改用户名请点击!🤠";
            confirmButton.disabled = false
        } else if (ua !== userInfo.avatar) {
            tip = "确认修改头像请点击!🤠";
            confirmButton.disabled = false
        } else {
            tip = "你还没修改任何信息!🙄";
            confirmButton.disabled = true
        }
        // 更新提示内容
        updateTooltip(confirmButton, tip);
    })
    //上传头像按钮
    avatarUpload.addEventListener('click', () => avatarImageInput.click());
    //上传头像input
    avatarImageInput.addEventListener('change', handleImageUpload);
    //修改用户名输入框
    newNameInput.addEventListener('input', handleNameInput);

}