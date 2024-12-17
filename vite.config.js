import { defineConfig } from 'vite';

export default defineConfig({
  // 项目根目录，默认为当前目录
  root: process.cwd(),
  // 构建输出目录
  build: {
    outDir: 'dist'
  },
  // 配置服务器选项
  server: {
    // 服务器端口号
    port: 3000,
    // 是否自动打开浏览器
    open: true
  }
});