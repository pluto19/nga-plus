// 添加调试日志
function log(...args) {
    console.log('[NGA-Plus]', ...args);
}

// 定义链接处理函数
function handleLinks() {
    log('开始处理链接');

    // 使用多个选择器查找所有可能的帖子链接
    const links = document.querySelectorAll(`
        a[href*="/read.php?tid="],
        a[href*="thread.php?fid="],
        a.topic,
        a.urlincontent
    `);
    
    log(`找到 ${links.length} 个链接`);
    
    links.forEach((link, index) => {
        // 记录每个链接的信息
        log(`处理第 ${index + 1} 个链接:`, {
            href: link.href,
            classList: Array.from(link.classList),
            hasAttribute: link.hasAttribute('data-nga-plus')
        });

        // 已处理的链接跳过
        if (link.hasAttribute('data-nga-plus')) {
            log(`链接 ${index + 1} 已处理，跳过`);
            return;
        }

        try {
            // 标记为已处理
            link.setAttribute('data-nga-plus', 'true');
            
            // 强制设置target属性
            link.setAttribute('target', '_blank');

            // 添加点击事件监听器（用于调试）
            link.addEventListener('click', (e) => {
                log('链接被点击:', {
                    href: link.href,
                    target: link.target,
                    defaultPrevented: e.defaultPrevented
                });
            });
            
            // 克隆并替换链接元素，移除所有现有的事件监听器
            const clone = link.cloneNode(true);
            clone.setAttribute('target', '_blank');
            clone.setAttribute('data-nga-plus', 'true');
            
            // 为克隆的链接添加点击事件（用于调试）
            clone.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                log('克隆链接被点击:', {
                    href: clone.href,
                    target: clone.target,
                    defaultPrevented: e.defaultPrevented
                });
                window.open(clone.href, '_blank');
            });

            link.parentNode.replaceChild(clone, link);
            log(`链接 ${index + 1} 处理完成`);
        } catch (error) {
            log(`处理链接 ${index + 1} 时出错:`, error);
        }
    });
}

// 初始化
log('扩展开始初始化');

// 创建CSS样式
const style = document.createElement('style');
style.textContent = `
    a[href*="/read.php?tid="],
    a[href*="thread.php?fid="],
    a.topic,
    a.urlincontent {
        target: _blank !important;
    }
`;
document.head.appendChild(style);
log('添加了CSS规则');

// 在页面加载的不同阶段处理链接
document.addEventListener('DOMContentLoaded', () => {
    log('DOMContentLoaded 事件触发');
    handleLinks();

    // 创建MutationObserver来监视DOM变化
    const observer = new MutationObserver(mutations => {
        log('检测到DOM变化');
        mutations.forEach(mutation => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                log(`有 ${mutation.addedNodes.length} 个新节点被添加`);
                handleLinks();
            }
        });
    });

    // 开始观察文档变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    log('DOM观察器已启动');
});

// 页面完全加载后再次检查
window.addEventListener('load', () => {
    log('页面完全加载完成，再次检查链接');
    handleLinks();
});

// 立即执行一次
handleLinks();