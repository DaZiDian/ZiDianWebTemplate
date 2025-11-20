<template>
  <div class="pt-20 pb-12" :class="isDark ? 'dark' : 'light'">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-5xl font-bold mb-4 title-reveal">
          文章 | BLOG
        </h1>
        <p class="transition-colors" :class="isDark ? 'text-gray-300' : 'text-gray-600'">分享我的想法和经验</p>
      </div>

      <!-- 文章列表 -->
      <div class="max-w-4xl mx-auto space-y-6">
        <article 
          v-for="(article, index) in articles" 
          :key="index"
          class="glass-effect rounded-3xl p-8 card-hover scroll-animate"
          :class="`scroll-animate-delay-${Math.min(index + 1, 6)}`"
        >
          <!-- 标题 -->
          <h2 class="text-3xl font-bold mb-4 text-tokyo-night-cyan hover:text-tokyo-night-blue transition-colors cursor-pointer">
            {{ article.title }}
          </h2>
          
          <!-- 发布时间 -->
          <div class="flex items-center gap-4 mb-6 text-sm text-tokyo-night-dark5">
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
          </div>
          
          <!-- 正文预览 -->
          <div class="prose prose-lg max-w-none text-tokyo-night-fg leading-relaxed">
            <p>{{ article.content }}</p>
          </div>
          
          <!-- 阅读更多按钮 -->
          <div class="mt-6 flex justify-end">
            <button class="px-6 py-2 bg-gradient-to-r from-tokyo-night-blue to-tokyo-night-cyan text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
              阅读更多 →
            </button>
          </div>
        </article>

        <!-- 空状态 -->
        <div v-if="articles.length === 0" class="text-center py-20">
          <div class="text-6xl mb-4">📝</div>
          <p class="text-xl text-tokyo-night-fg">暂无文章</p>
          <p class="text-tokyo-night-fg-dark mt-2">敬请期待...</p>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="articles.length > 0" class="mt-12 flex justify-center gap-2">
        <button 
          v-for="page in totalPages" 
          :key="page"
          :class="{ 'bg-tokyo-night-blue text-white': currentPage === page, 'glass-effect text-tokyo-night-fg': currentPage !== page }"
          class="w-10 h-10 rounded-full hover:scale-110 transition-all duration-300 font-medium border border-tokyo-night-blue/30"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { useTheme } from '../composables/useTheme'

useScrollAnimation()
const { isDark } = useTheme()

const currentPage = ref(1)
const totalPages = ref(1)

// 示例文章数据 - 实际使用时可以从后端API获取
const articles = ref([
  {
    title: '示例文章标题',
    date: '2024-11-20',
    location: '中国 山东 青岛',
    content: '这是一篇示例文章。在实际使用时，您可以通过后台管理系统添加、编辑和删除文章。支持Markdown格式，可以插入图片、代码块等丰富内容。'
  },
  {
    title: '我的技术分享',
    date: '2024-11-15',
    location: '中国 山东 青岛',
    content: '在这里分享我在信息安全、渗透测试、数据恢复等方面的经验和心得。技术是不断进步的，让我们一起成长。'
  }
])
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}
</style>

