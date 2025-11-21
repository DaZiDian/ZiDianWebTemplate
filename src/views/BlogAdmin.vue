<template>
  <div class="pt-20 pb-12" :class="isDark ? 'dark' : 'light'">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <!-- 未认证状态 - 显示登录表单 -->
      <div v-if="!isAuthenticated" class="max-w-md mx-auto">
        <div class="glass-effect rounded-3xl p-8 text-center">
          <h1 class="text-3xl font-bold mb-6 title-reveal">
            博客管理后台
          </h1>
          
          <form @submit.prevent="handleAuth" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2 text-left transition-colors" 
                     :class="isDark ? 'text-white' : 'text-gray-800'">
                管理员密码
              </label>
              <input 
                type="password" 
                v-model="password"
                required
                placeholder="请输入管理员密码"
                class="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
              />
            </div>
            
            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
              :class="isDark 
                ? 'bg-tokyo-night-blue hover:bg-tokyo-night-blue0 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'"
            >
              {{ isLoading ? '验证中...' : '登录管理后台' }}
            </button>
          </form>
          
          <p v-if="authError" class="mt-4 text-red-500 text-sm">
            {{ authError }}
          </p>
        </div>
      </div>

      <!-- 已认证状态 - 显示管理界面 -->
      <div v-else>
        <!-- 管理后台标题栏 -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold title-reveal">
            博客管理后台
          </h1>
          <div class="flex gap-4">
            <button 
              @click="showEditor = true; editingPost = null"
              class="px-6 py-2 rounded-lg font-medium transition-all duration-300"
              :class="isDark 
                ? 'bg-tokyo-night-blue hover:bg-tokyo-night-blue0 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'"
            >
              📝 写新文章
            </button>
            <button 
              @click="logout"
              class="px-6 py-2 rounded-lg font-medium border transition-all duration-300"
              :class="isDark 
                ? 'border-tokyo-night-blue text-tokyo-night-cyan hover:bg-tokyo-night-blue hover:text-white' 
                : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'"
            >
              退出登录
            </button>
          </div>
        </div>

        <!-- 文章列表 -->
        <div v-if="!showEditor" class="space-y-4">
          <div 
            v-for="(post, index) in blogPosts" 
            :key="index"
            class="glass-effect rounded-2xl p-6 flex justify-between items-center"
          >
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-2 transition-colors" 
                  :class="isDark ? 'text-white' : 'text-gray-800'">
                {{ post.title }}
              </h3>
              <div class="flex gap-4 text-sm transition-colors" 
                   :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                <span>{{ post.date }}</span>
                <span>{{ post.status === 'published' ? '已发布' : '草稿' }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <button 
                @click="editPost(post)"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight text-tokyo-night-cyan hover:bg-tokyo-night-blue' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'"
              >
                编辑
              </button>
              <button 
                @click="deletePost(index)"
                class="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-all"
              >
                删除
              </button>
            </div>
          </div>
        </div>

        <!-- 博客编辑器 -->
        <BlogEditor 
          v-if="showEditor"
          :post="editingPost"
          @save="savePost"
          @cancel="showEditor = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import BlogEditor from '../components/BlogEditor.vue'

const { isDark } = useTheme()

// 认证状态
const isAuthenticated = ref(false)
const password = ref('')
const authError = ref('')
const isLoading = ref(false)

// 编辑器状态
const showEditor = ref(false)
const editingPost = ref(null)

// 博客文章数据
const blogPosts = ref([
  {
    id: 'introduce-my-blog',
    title: '欢迎来到我的博客',
    slug: 'introduce-my-blog',
    date: '2024-11-21',
    status: 'published',
    content: `# 欢迎来到我的博客

这里是我分享技术见解、学习心得和生活感悟的地方...`,
    tags: ['博客', '个人网站', 'Vue3', '前端开发']
  }
])

// 检查认证状态
onMounted(() => {
  const authToken = localStorage.getItem('blog_admin_token')
  if (authToken) {
    // 验证token有效性
    isAuthenticated.value = true
  }
})

// 处理认证
const handleAuth = async () => {
  isLoading.value = true
  authError.value = ''
  
  try {
    // 简单的密码验证 - 实际项目中应该使用更安全的方式
    if (password.value === 'dazidian2024') {
      const token = 'auth_token_' + Date.now()
      localStorage.setItem('blog_admin_token', token)
      isAuthenticated.value = true
      password.value = ''
    } else {
      authError.value = '密码错误，请重试'
    }
  } catch (error) {
    authError.value = '认证失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

// 退出登录
const logout = () => {
  localStorage.removeItem('blog_admin_token')
  isAuthenticated.value = false
  showEditor.value = false
}

// 编辑文章
const editPost = (post) => {
  editingPost.value = { ...post }
  showEditor.value = true
}

// 保存文章
const savePost = (postData) => {
  if (editingPost.value) {
    // 更新现有文章
    const index = blogPosts.value.findIndex(p => p.id === editingPost.value.id)
    if (index !== -1) {
      blogPosts.value[index] = { ...postData }
    }
  } else {
    // 添加新文章
    const newPost = {
      ...postData,
      id: 'post_' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    }
    blogPosts.value.unshift(newPost)
  }
  
  showEditor.value = false
  editingPost.value = null
}

// 删除文章
const deletePost = (index) => {
  if (confirm('确定要删除这篇文章吗？此操作不可撤销。')) {
    blogPosts.value.splice(index, 1)
  }
}
</script>
