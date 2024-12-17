import { User } from "../feedback/user";
// 生成用户名和头像
export function generateUsernameWithAvatar() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomStr = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        randomStr += chars[randomIndex];
    }

    const username = 'user-' + randomStr;
    let svgAvatar = multiavatar(username); // 假设 multiavatar() 已定义

    return new User(username, svgAvatar);
}

// 判断是否为 SVG 数据
export function isSVG(data) {
    // 去除空白字符后检查是否包含 <svg> 标签
    return /^<svg.*?>.*<\/svg>$/.test(data.trim());
}