<template>
  <div class="pt-20 pb-12" :class="isDark ? 'dark' : 'light'">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="text-center mb-12 animate-fade-in">
        <div class="flex justify-between items-center mb-8">
          <div class="flex-1"></div>
          <div class="text-center">
            <h1 class="text-5xl font-bold mb-4 title-reveal">
              文章 | BLOG
            </h1>
            <p class="transition-colors" :class="isDark ? 'text-gray-300' : 'text-gray-600'">分享我的想法和经验</p>
          </div>
          <div class="flex-1 flex justify-end">
            <router-link 
              to="/admin/blog"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
              :class="isDark 
                ? 'bg-tokyo-night-bg-highlight text-tokyo-night-cyan border border-tokyo-night-blue hover:bg-tokyo-night-blue hover:text-white' 
                : 'bg-blue-100 text-blue-600 border border-blue-300 hover:bg-blue-600 hover:text-white'"
            >
              📝 管理
            </router-link>
          </div>
        </div>
      </div>

      <!-- 文章列表 -->
      <div class="max-w-4xl mx-auto space-y-6">
        <div v-if="isLoading" class="text-center py-12">
          <p class="transition-colors" :class="isDark ? 'text-gray-400' : 'text-gray-600'">加载中...</p>
        </div>
        <article 
          v-else
          v-for="(article, index) in articles" 
          :key="article.id || article.slug || index"
          class="glass-effect rounded-3xl p-8 card-hover scroll-animate"
          :class="`scroll-animate-delay-${Math.min(index + 1, 6)}`"
        >
          <!-- 标题 -->
          <router-link 
            :to="`/blog/${article.slug}`" 
            class="block"
          >
            <h2 class="text-3xl font-bold mb-4 transition-colors cursor-pointer hover:scale-105 transform"
                :class="isDark ? 'text-tokyo-night-cyan hover:text-tokyo-night-blue' : 'text-blue-600 hover:text-blue-700'">
              {{ article.title }}
            </h2>
          </router-link>
          
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
            <router-link 
              :to="`/blog/${article.slug}`"
              class="inline-block px-6 py-2 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              :class="isDark 
                ? 'bg-gradient-to-r from-tokyo-night-blue to-tokyo-night-cyan' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700'"
            >
              阅读更多 →
            </router-link>
          </div>
        </article>

        <!-- 空状态 -->
        <div v-if="!isLoading && articles.length === 0" class="text-center py-20">
          <div class="text-6xl mb-4">📝</div>
          <p class="text-xl transition-colors" :class="isDark ? 'text-tokyo-night-fg' : 'text-gray-800'">暂无文章</p>
          <p class="transition-colors mt-2" :class="isDark ? 'text-tokyo-night-fg-dark' : 'text-gray-600'">敬请期待...</p>
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

// 博客文章数据 - 包含已发布的文章
const articles = ref([
  {
    title: '欢迎来到我的博客',
    slug: 'introduce-my-blog',
    date: '2024-11-21',
    location: '中国 山东 青岛',
    content: '欢迎来到我的个人博客！这里是我分享技术见解、学习心得和生活感悟的地方。本篇文章将介绍这个博客网站的技术栈、主要功能和设计理念。',
    tags: ['博客', '个人网站', 'Vue3', '前端开发']
  },
  {
    title: '即将推出更多内容',
    slug: 'coming-soon',
    date: '2024-11-20',
    location: '中国 山东 青岛',
    content: '正在准备更多精彩的技术文章和学习笔记，包括前端开发、信息安全、数据恢复等方面的内容。敬请期待！',
    tags: ['预告', '技术分享']
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

