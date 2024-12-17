import { CozeAPI, ChatEventType, RoleType, COZE_CN_BASE_URL } from '@coze/api';
// 封装成函数，接收用户输入的消息内容作为参数
export function cozeChat(messageContent) {
    const token = "pat_gKDOYuwpPE5iZewGXen3uBywxlDNdwsN5dZzxERaGpZ86FYa7AzYKNjqZdoGZ9hX";
    const botId = "7448870100947566603";
    const baseURL = COZE_CN_BASE_URL;

    const client = new CozeAPI({
        baseURL,
        token,
        allowPersonalAccessTokenInBrowser: true
    });

    return client.chat.stream({
        bot_id: botId,
        additional_messages: [
            {
                role: RoleType.User,
                content: messageContent,
                content_type: 'text',
            },
        ],
    });
}

// 渲染消息到指定的元素中，带打字机效果
export function renderMessageStream(stream, targetElement) {
    // 如果没有传递目标元素，则返回
    if (!targetElement) return;

    let buffer = '';  // 用来存储接收到的流数据
    let index = 0;    // 当前字符的索引

    // 创建一个打字机效果的函数
    const typeWriterEffect = () => {
        // 如果还有字符未显示，继续追加字符
        if (index < buffer.length) {
            targetElement.textContent += buffer[index]; // 追加文本内容
            index++;  // 增加字符索引
            setTimeout(typeWriterEffect, 50); // 控制打字速度（每50毫秒显示一个字符）
        }
    };

    // 监听流数据并添加到buffer中
    (async () => {
        for await (const part of stream) {
            if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
                buffer += part.data.content; // 将流中的内容追加到buffer中
                
                // 在每次接收到数据时，都启动或重新启动打字机效果
                if (index === 0 || index === buffer.length - part.data.content.length) {
                    typeWriterEffect();  // 启动打字机效果
                }
            }
        }
    })();
}
