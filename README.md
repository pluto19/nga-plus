# NGA-Plus Chrome 插件

在新标签页打开NGA论坛的帖子链接的Chrome插件。

## 功能特性

- 自动将帖子链接设置为在新标签页打开
- 支持动态加载的内容
- 完整的错误处理和日志记录

## 开发流程

本项目使用标准的 Git 工作流进行开发和发布。

### 初始化开发环境

1. 克隆仓库：
```bash
git clone [你的仓库URL]
cd nga-plus
```

2. 创建新分支进行开发：
```bash
git checkout -b feature-name
```

### 版本发布流程

1. 确保代码已合并到主分支：
```bash
git checkout main
git merge feature-name
```

2. 创建新的版本标签：
```bash
git tag -a v1.0.1 -m "版本 1.0.1"
git push origin v1.0.1
```

GitHub Actions 将自动执行：
- 验证版本号
- 打包扩展文件
- 创建 GitHub Release
- 发布到 Chrome Web Store

## 配置自动发布

1. 在 GitHub 仓库设置中添加以下 Secrets：
   - `CHROME_EXTENSION_ID`: Chrome Web Store 中的插件 ID
   - `CHROME_CLIENT_ID`: Chrome Web Store API 客户端 ID
   - `CHROME_CLIENT_SECRET`: Chrome Web Store API 客户端密钥
   - `CHROME_REFRESH_TOKEN`: Chrome Web Store API 刷新令牌

2. 获取 Chrome Web Store API 凭据：
   - 访问 [Google Cloud Console](https://console.cloud.google.com/)
   - 创建新项目或选择现有项目
   - 启用 Chrome Web Store API
   - 创建 OAuth 2.0 凭据
   - 获取刷新令牌

## 注意事项

- 版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范
- 确保在发布前完成充分测试
- manifest.json 中的版本号会在发布时自动更新
- 每次发布需要创建新的版本标签（tag）

## 开发提示

1. 创建功能分支：
```bash
git checkout -b feature-name
```

2. 提交更改：
```bash
git add .
git commit -m "描述你的更改"
```

3. 合并到主分支：
```bash
git checkout main
git merge feature-name
```

4. 创建发布标签：
```bash
git tag -a v1.0.1 -m "版本 1.0.1"
git push origin v1.0.1
```

自动发布流程会在检测到新标签时触发。