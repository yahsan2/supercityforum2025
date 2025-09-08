/**
 * 共通コンポーネントローダー
 * ヘッダーとフッターを動的に読み込み、各ページに挿入します
 */

class ComponentLoader {
    constructor() {
        this.basePath = this.getBasePath();
    }
    
    /**
     * ベースパスを取得（開発環境と本番環境の切り替え）
     */
    getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/tiiki/toc/event/tocforum2025/')) {
            return '/tiiki/toc/event/tocforum2025';
        }
        return '.';
    }
    
    /**
     * コンポーネントを読み込む
     */
    async loadComponent(componentPath, targetId) {
        try {
            const response = await fetch(`${this.basePath}/${componentPath}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentPath}`);
            }
            
            const html = await response.text();
            const target = document.getElementById(targetId);
            
            if (target) {
                target.innerHTML = html;
                
                // コンポーネント内のスクリプトを実行
                this.executeScripts(target);
                
                // パスを調整
                this.adjustPaths(target);
                
                // 現在のページをアクティブに設定
                this.setActiveNavigation(target);
            } else {
                console.error(`Target element #${targetId} not found`);
            }
        } catch (error) {
            console.error(`Error loading component: ${error.message}`);
        }
    }
    
    /**
     * コンポーネント内のスクリプトを実行
     */
    executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            document.body.appendChild(newScript);
            script.remove();
        });
    }
    
    /**
     * 相対パスを調整
     */
    adjustPaths(container) {
        // リンクの調整
        const links = container.querySelectorAll('a[href^="./"]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http')) {
                link.setAttribute('href', `${this.basePath}/${href.substring(2)}`);
            }
        });
        
        // 画像パスの調整
        const images = container.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && src.startsWith('./')) {
                img.setAttribute('src', `${this.basePath}/${src.substring(2)}`);
            }
        });
    }
    
    /**
     * 現在のページに応じてナビゲーションをアクティブにする
     */
    setActiveNavigation(container) {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop() || 'index.html';
        
        // ナビゲーションリンクを取得
        const navLinks = container.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const linkFile = href.split('/').pop();
                if (linkFile === currentFile) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
        
        // パンくずリストの更新
        this.updateBreadcrumb(container, currentFile);
    }
    
    /**
     * パンくずリストを更新
     */
    updateBreadcrumb(container, currentFile) {
        const breadcrumbCurrent = container.querySelector('.breadcrumb-item.current');
        if (breadcrumbCurrent) {
            const pageNames = {
                'index.html': 'トップ',
                'program.html': 'プログラム',
                'networking.html': '参加者同士の交流',
                'registration.html': '申込情報',
                'access.html': 'アクセス'
            };
            
            const pageName = pageNames[currentFile] || 'デジタル田園健康特区フォーラム';
            breadcrumbCurrent.textContent = `${pageName} - デジタル田園健康特区フォーラム`;
        }
    }
    
    /**
     * ヘッダーとフッターを読み込む
     */
    async loadCommonComponents() {
        // ヘッダーを読み込む
        await this.loadComponent('components/header.html', 'header-container');
        
        // フッターを読み込む
        await this.loadComponent('components/footer.html', 'footer-container');
        
        // カスタムイベントを発火
        document.dispatchEvent(new Event('componentsLoaded'));
    }
}

// DOMContentLoadedで初期化
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ComponentLoader();
    loader.loadCommonComponents();
});

// エクスポート（必要に応じて）
window.ComponentLoader = ComponentLoader;