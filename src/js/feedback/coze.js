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

export function renderMessageStream(stream, targetElement, chatWindow) {
    // 如果没有传递目标元素，则返回一个已拒绝的 Promise
    if (!targetElement) {
        return Promise.reject('Target element is required');
    }

    let buffer = '';  // 用来存储接收到的流数据
    let index = 0;    // 当前字符的索引

    // 创建一个打字机效果的函数
    const typeWriterEffect = () => {
        // 如果还有字符未显示，继续追加字符
        if (index < buffer.length) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
            targetElement.textContent += buffer[index]; // 追加文本内容
            index++;  // 增加字符索引
            setTimeout(typeWriterEffect, 50); // 控制打字速度（每70毫秒显示一个字符）
        }
    };

    // 返回一个 Promise，告知函数调用者消息何时返回
    return new Promise((resolve, reject) => {
        // 监听流数据并添加到 buffer 中
        (async () => {
            let messageReceived = false; // 用于标记是否收到消息流的第一部分
            try {
                for await (const part of stream) {
                    if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
                        // 发送消息到窗口
                        console.log(part.data.content);
                        buffer += part.data.content; // 将流中的内容追加到 buffer 中

                        // 在收到流的第一部分时通知调用者
                        if (!messageReceived) {
                            messageReceived = true;
                            resolve('Message stream started');  // 通知调用者有流消息返回
                        }

                        // 启动或重新启动打字机效果
                        if (messageReceived && index === 0 || index === buffer.length - part.data.content.length) {
                            typeWriterEffect();  // 启动打字机效果

                        }
                    }

                }
            } catch (error) {
                reject('Error receiving message: ' + error);
            }
        })();
    });
}
