<template>
  <div class="pt-20 pb-12" :class="isDark ? 'dark' : 'light'">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- 返回博客列表按钮 -->
      <div class="mb-8">
        <router-link 
          to="/blog" 
          class="inline-flex items-center gap-2 text-sm transition-colors hover:scale-105"
          :class="isDark ? 'text-tokyo-night-cyan hover:text-tokyo-night-blue' : 'text-blue-600 hover:text-blue-700'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          返回博客列表
        </router-link>
      </div>

      <!-- 博客文章内容 -->
      <article class="glass-effect rounded-3xl p-8 scroll-animate">
        <!-- 文章标题 -->
        <header class="mb-8 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 title-reveal">
            {{ article.title }}
          </h1>
          
          <!-- 文章元信息 -->
          <div class="flex items-center justify-center gap-6 text-sm transition-colors" :class="isDark ? 'text-tokyo-night-dark5' : 'text-gray-500'">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
              {{ article.date }}
            </span>
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              {{ article.location }}
            </span>
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              阅读时间：{{ article.readTime }}
            </span>
          </div>
        </header>

        <!-- 文章正文 -->
        <div class="prose prose-lg max-w-none transition-colors" :class="isDark ? 'prose-invert' : ''">
          <div v-html="article.content"></div>
        </div>

        <!-- 文章标签 -->
        <div class="mt-8 pt-6 border-t transition-colors" :class="isDark ? 'border-tokyo-night-bg-highlight' : 'border-gray-200'">
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in article.tags" 
              :key="tag"
              class="px-3 py-1 rounded-full text-sm font-medium transition-all"
              :class="isDark 
                ? 'bg-tokyo-night-bg-highlight text-tokyo-night-cyan hover:bg-tokyo-night-blue hover:text-white' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </article>

      <!-- 相关推荐 -->
      <section class="mt-12">
        <h2 class="text-2xl font-bold mb-6 transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">
          相关文章推荐
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="(relatedPost, index) in relatedPosts" 
            :key="index"
            class="glass-effect rounded-2xl p-6 card-hover transition-all"
          >
            <h3 class="text-lg font-semibold mb-2 transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">
              {{ relatedPost.title }}
            </h3>
            <p class="text-sm transition-colors line-clamp-2" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
              {{ relatedPost.excerpt }}
            </p>
            <div class="mt-4">
              <span class="text-xs transition-colors" :class="isDark ? 'text-tokyo-night-dark5' : 'text-gray-400'">
                {{ relatedPost.date }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '../../composables/useTheme'
import { useScrollAnimation } from '../../composables/useScrollAnimation'

const { isDark } = useTheme()
useScrollAnimation()

// 文章数据
const article = ref({
  title: '欢迎来到我的博客',
  date: '2024年11月21日',
  location: '青岛，山东',
  readTime: '3分钟',
  tags: ['博客', '个人网站', 'Vue3', '前端开发'],
  content: `
    <h2>关于这个博客</h2>
    <p>欢迎来到我的个人博客！这里是我分享技术见解、学习心得和生活感悟的地方。</p>
    
    <h3>技术栈</h3>
    <p>这个博客网站使用了以下现代化技术栈：</p>
    <ul>
      <li><strong>Vue 3</strong> - 渐进式JavaScript框架</li>
      <li><strong>Vite</strong> - 快速的前端构建工具</li>
      <li><strong>Tailwind CSS</strong> - 实用优先的CSS框架</li>
      <li><strong>Vercel</strong> - 现代化的部署平台</li>
      <li><strong>CloudFlare D1</strong> - 边缘数据库</li>
    </ul>
    
    <h3>主要功能</h3>
    <p>网站包含了以下核心功能：</p>
    <ol>
      <li><strong>响应式设计</strong> - 完美适配各种设备</li>
      <li><strong>主题切换</strong> - 支持白昼/黑夜模式</li>
      <li><strong>音乐播放器</strong> - 集成Spotify播放列表</li>
      <li><strong>留言板</strong> - 与访客互动交流</li>
      <li><strong>博客系统</strong> - 支持Markdown编写</li>
      <li><strong>商铺页面</strong> - 展示提供的服务</li>
    </ol>
    
    <h3>设计理念</h3>
    <p>在设计这个网站时，我秉承了以下理念：</p>
    <blockquote>
      <p>简洁而不简单，美观且实用，快速而稳定。</p>
    </blockquote>
    
    <p>每一个动画效果、每一个交互细节都经过精心设计，力求为用户提供最佳的浏览体验。</p>
    
    <h3>Tokyo Night 主题</h3>
    <p>网站采用了深受开发者喜爱的 <strong>Tokyo Night</strong> 配色方案，这个主题不仅在代码编辑器中广受欢迎，在网页设计中同样能营造出优雅的视觉效果。</p>
    
    <h3>未来计划</h3>
    <p>接下来我计划在这里分享更多内容：</p>
    <ul>
      <li>前端开发技术文章</li>
      <li>信息安全学习笔记</li>
      <li>项目开发心得</li>
      <li>生活随笔和思考</li>
    </ul>
    
    <p>如果你对我的内容感兴趣，欢迎通过留言板与我交流，也可以通过邮箱 <code>dazidian@vip.qq.com</code> 联系我。</p>
    
    <p>让我们一起在技术的道路上不断成长！</p>
  `
})

// 相关文章推荐
const relatedPosts = ref([
  {
    title: 'Vue 3 Composition API 深度解析',
    excerpt: '详细介绍Vue 3 Composition API的使用方法和最佳实践...',
    date: '2024年11月15日'
  },
  {
    title: 'Tailwind CSS 实用技巧分享',
    excerpt: '分享在实际项目中使用Tailwind CSS的经验和技巧...',
    date: '2024年11月10日'
  }
])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
}

.dark .card-hover:hover {
  box-shadow: 0 8px 25px rgba(122, 162, 247, 0.3);
}

.light .card-hover:hover {
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.2);
}

/* 自定义prose样式 */
.prose h2 {
  @apply text-2xl font-bold mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-semibold mt-6 mb-3;
}

.prose p {
  @apply mb-4 leading-relaxed;
}

.prose ul, .prose ol {
  @apply mb-4 ml-6;
}

.prose li {
  @apply mb-2;
}

.prose blockquote {
  @apply border-l-4 pl-4 italic my-6;
}

.dark .prose blockquote {
  @apply border-tokyo-night-blue text-tokyo-night-fg;
}

.light .prose blockquote {
  @apply border-blue-400 text-gray-700;
}

.prose code {
  @apply px-1 py-0.5 rounded text-sm font-mono;
}

.dark .prose code {
  @apply bg-tokyo-night-bg-highlight text-tokyo-night-cyan;
}

.light .prose code {
  @apply bg-gray-100 text-blue-600;
}
</style>
