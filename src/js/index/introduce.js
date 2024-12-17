const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const keys = [
    // 字母键
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',

    // 数字键
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',

    // 功能键
    'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',

    // 修饰键
    'RShift','LShift', 'RCtrl', 'LCtrl', 'RAlt','LAlt', 'Tab', 'Esc', 'Enter', 'CapsLock', 'Space',

    // 箭头键
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',

    // 符号键
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
    '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|',
    ';', ':', '\'', '"', ',', '.', '/', '<', '>', '?', '`', '~',
];


// 创建一个存储所有组合键的数组
let combos = [];

class ShortcutCombo {
    constructor(delay = 0) {
        this.delay = delay;
        this.active = false;
        this.width = 0;
        this.height = 35;
        this.reset();
    }

    reset() {
        this.key1 = keys[Math.floor(Math.random() * keys.length)];
        this.key2 = keys[Math.floor(Math.random() * keys.length)];
        this.opacity = 0;
        this.fadingIn = true;
        this.fadeSpeed = 0.02;
        
        // 随机移动方向和速度
        const angle = Math.random() * Math.PI * 2;
        this.dx = Math.cos(angle) * 0.5;
        this.dy = Math.sin(angle) * 0.5;
        
        // 计算组合键的总宽度
        ctx.font = 'bold 16px Arial';
        const key1Width = ctx.measureText(this.key1).width;
        const key2Width = ctx.measureText(this.key2).width;
        this.width = key1Width + key2Width + 50;

        this.findSafePosition();
    }

    findSafePosition() {
        let attempts = 0;
        let found = false;
        
        while (!found && attempts < 100) {
            this.x = Math.random() * (canvas.width - 200);
            this.y = Math.random() * (canvas.height - 50);
            
            // 检查与其他组合键的碰撞
            let collision = false;
            for (let other of combos) {
                if (other !== this && other.active) {
                    const dx = this.x - other.x;
                    const dy = this.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        collision = true;
                        break;
                    }
                }
            }
            
            if (!collision) {
                found = true;
            }
            attempts++;
        }
    }

    update() {
        if (this.delay > 0) {
            this.delay--;
            return;
        }

        this.active = true;

        if (this.fadingIn) {
            this.opacity += this.fadeSpeed;
            if (this.opacity >= 1) {
                this.opacity = 1;
                this.fadingIn = false;
            }
        } else {
            this.opacity -= this.fadeSpeed;
            if (this.opacity <= 0) {
                this.active = false;
                this.reset();
                this.delay = Math.random() * 100 + 50;
                this.fadingIn = true;
            }
        }

        // 移动位置
        if (this.opacity > 0) {
            this.x += this.dx;
            this.y += this.dy;

            // 边界检查
            if (this.x < 0 || this.x > canvas.width - this.width) this.dx *= -1;
            if (this.y < 0 || this.y > canvas.height - this.height) this.dy *= -1;
        }
    }

    draw() {
        if (!this.active || this.opacity <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // 阴影效果
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        const drawKey = (text, x, y, width) => {
            // 渐变背景
            const gradient = ctx.createLinearGradient(x, y, x, y + 35);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(1, '#f0f0f0');

            // 绘制按键背景
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.roundRect(x, y, width, 35, 8);
            ctx.fill();

            // 按键边框
            ctx.strokeStyle = '#ff3333';
            ctx.lineWidth = 2;
            ctx.stroke();

            // 按键文字
            ctx.fillStyle = '#ff0000';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, x + width/2, y + 35/2);

            return width;
        };

        // 计算每个按键的宽度
        const key1Width = Math.max(ctx.measureText(this.key1).width + 30, 40);
        const key2Width = Math.max(ctx.measureText(this.key2).width + 30, 40);

        // 绘制第一个按键
        drawKey(this.key1, this.x, this.y, key1Width);

        // 绘制加号
        ctx.fillStyle = '#ff0000';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('+', this.x + key1Width + 15, this.y + 35/2);

        // 绘制第二个按键
        drawKey(this.key2, this.x + key1Width + 30, this.y, key2Width);

        ctx.restore();
    }
}

// 创建多个快捷键组合，设置不同的延迟时间使其错开出现
combos = Array(6).fill().map((_, i) => new ShortcutCombo(i * 50));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    combos.forEach(combo => {
        combo.update();
        combo.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();