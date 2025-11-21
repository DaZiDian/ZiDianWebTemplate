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
            <h2 class="text-3xl font-bold mb-4 transition-colors cursor-pointer hover:scale-105 transform title-text"
              {{ article.title }}
            </h2>
          </router-link>
          
          <!-- 发布时间和标签 -->
          <div class="flex items-center gap-4 mb-6 text-sm secondary-text">
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
            <!-- 显示标签 -->
            <div v-if="article.tags && article.tags.length > 0" class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs">{{ article.tags.slice(0, 2).join(', ') }}</span>
            </div>
          </div>
          
          <!-- 正文预览 -->
          <div class="prose prose-lg max-w-none leading-relaxed mb-4">
            <p v-if="article.content" class="text-base content-text">{{ article.content }}</p>
            <p v-else class="text-sm italic opacity-75 secondary-text">暂无内容预览...</p>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { useTheme } from '../composables/useTheme'
import axios from 'axios'

useScrollAnimation()
const { isDark } = useTheme()

const API_BASE = '/api'
const currentPage = ref(1)
const totalPages = ref(1)
const isLoading = ref(false)

// 文章数据
const articles = ref([])

// 从API加载文章
const fetchArticles = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`${API_BASE}/blog`)
    console.log('博客API响应:', response.data) // 调试信息
    if (response.data.success && Array.isArray(response.data.data)) {
      // 显示所有文章的状态信息用于调试
      response.data.data.forEach(post => {
        console.log(`文章: ${post.title}, 状态: "${post.status}", ID: ${post.id}`)
      })
      
      // 显示所有文章，包括草稿（管理员可以看到）
      const allArticles = response.data.data
        .filter(post => post.status === 'published') // 只显示已发布的文章
        .map(post => {
          // 解析tags（可能是JSONB格式）
          let parsedTags = [];
          try {
            if (typeof post.tags === 'string') {
              parsedTags = JSON.parse(post.tags);
            } else if (Array.isArray(post.tags)) {
              parsedTags = post.tags;
            }
          } catch (e) {
            console.warn('解析tags失败:', e);
            parsedTags = [];
          }
          
          return {
            ...post,
            tags: parsedTags,
            slug: post.slug,
            title: post.title,
            date: post.created_at ? new Date(post.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            location: '中国 山东 青岛',
            content: post.content ? (post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content) : ''
          };
        })
        .sort((a, b) => {
          // 按更新时间倒序排序
          const dateA = new Date(a.updated_at || a.created_at || 0)
          const dateB = new Date(b.updated_at || b.created_at || 0)
          return dateB - dateA
        })
      
      articles.value = allArticles
      console.log(`最终显示的文章数量: ${articles.value.length}`, articles.value)
      
      // 计算分页
      totalPages.value = Math.ceil(articles.value.length / 10) || 1
    } else {
      console.warn('API返回数据格式错误或为空')
      articles.value = []
    }
  } catch (error) {
    console.error('加载文章失败:', error)
    console.error('错误详情:', error.response?.data || error.message)
    // 保持现有文章，不要清空（如果是网络错误）
    if (!error.response || error.response.status >= 500) {
      console.log('网络错误或服务器错误，保持现有数据')
    } else {
      articles.value = []
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchArticles()
  
  // 监听博客更新事件，自动刷新文章列表
  window.addEventListener('blog-updated', fetchArticles)
})

onUnmounted(() => {
  // 清理事件监听器
  window.removeEventListener('blog-updated', fetchArticles)
})
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

