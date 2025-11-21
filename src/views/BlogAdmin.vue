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
          <div v-if="isLoading && blogPosts.length === 0" class="text-center py-12">
            <p class="transition-colors" :class="isDark ? 'text-gray-400' : 'text-gray-600'">加载中...</p>
          </div>
          <div v-else-if="blogPosts.length === 0" class="text-center py-12">
            <p class="transition-colors" :class="isDark ? 'text-gray-400' : 'text-gray-600'">还没有文章，点击"写新文章"开始创作吧！</p>
          </div>
          <div 
            v-else
            v-for="post in blogPosts" 
            :key="post.id"
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
                <span>slug: {{ post.slug }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <button 
                @click="editPost(post)"
                :disabled="isLoading"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight text-tokyo-night-cyan hover:bg-tokyo-night-blue' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'"
              >
                编辑
              </button>
              <button 
                @click="deletePost(post)"
                :disabled="isLoading"
                class="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-all disabled:opacity-50"
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
          :is-saving="isSaving"
          @save="savePost"
          @cancel="showEditor = false; editingPost = null"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import BlogEditor from '../components/BlogEditor.vue'
import axios from 'axios'

const { isDark } = useTheme()

// API 基础路径
const API_BASE = '/api'

// 认证状态
const isAuthenticated = ref(false)
const password = ref('')
const authError = ref('')
const isLoading = ref(false)
const isSaving = ref(false)

// 编辑器状态
const showEditor = ref(false)
const editingPost = ref(null)

// 博客文章数据
const blogPosts = ref([])

// 加载文章列表
const fetchPosts = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`${API_BASE}/blog`)
    if (response.data.success) {
      blogPosts.value = response.data.data.map(post => ({
        ...post,
        date: post.created_at ? new Date(post.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        tags: Array.isArray(post.tags) ? post.tags : []
      }))
    }
  } catch (error) {
    console.error('加载文章失败:', error)
    alert('加载文章失败，请稍后重试')
  } finally {
    isLoading.value = false
  }
}

// 检查认证状态
onMounted(async () => {
  const authToken = localStorage.getItem('blog_admin_token')
  if (authToken) {
    // 验证token有效性
    isAuthenticated.value = true
    await fetchPosts()
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
      await fetchPosts()
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
  blogPosts.value = []
}

// 编辑文章
const editPost = async (post) => {
  try {
    isLoading.value = true
    // 获取完整文章内容
    const response = await axios.get(`${API_BASE}/blog?slug=${post.slug}`)
    if (response.data.success) {
      editingPost.value = {
        ...response.data.data,
        tags: Array.isArray(response.data.data.tags) ? response.data.data.tags : []
      }
      showEditor.value = true
    }
  } catch (error) {
    console.error('加载文章详情失败:', error)
    alert('加载文章详情失败')
  } finally {
    isLoading.value = false
  }
}

// 保存文章
const savePost = async (postData) => {
  try {
    isSaving.value = true
    
    if (editingPost.value && editingPost.value.id) {
      // 更新现有文章
      const response = await axios.put(`${API_BASE}/blog`, {
        id: editingPost.value.id,
        slug: postData.slug,
        title: postData.title,
        content: postData.content,
        tags: postData.tags,
        status: postData.status
      })
      
      if (response.data.success) {
        alert('文章更新成功！')
        await fetchPosts()
        // 触发博客更新事件，通知博客页面刷新
        window.dispatchEvent(new CustomEvent('blog-updated'))
      } else {
        throw new Error(response.data.error || '更新失败')
      }
    } else {
      // 创建新文章
      const response = await axios.post(`${API_BASE}/blog`, {
        slug: postData.slug,
        title: postData.title,
        content: postData.content,
        tags: postData.tags,
        status: postData.status
      })
      
      if (response.data.success) {
        alert('文章创建成功！')
        await fetchPosts()
        // 刷新博客页面以显示最新数据
        window.dispatchEvent(new CustomEvent('blog-updated'))
      } else {
        throw new Error(response.data.error || '创建失败')
      }
    }
    
    showEditor.value = false
    editingPost.value = null
  } catch (error) {
    console.error('保存文章失败:', error)
    alert(error.response?.data?.error || error.message || '保存文章失败，请稍后重试')
  } finally {
    isSaving.value = false
  }
}

// 删除文章
const deletePost = async (post) => {
  if (!confirm('确定要删除这篇文章吗？此操作不可撤销。')) {
    return
  }
  
  try {
    isLoading.value = true
    const response = await axios.delete(`${API_BASE}/blog?id=${post.id}`)
    
    if (response.data.success) {
      alert('文章已删除')
      await fetchPosts()
      // 刷新博客页面以显示最新数据
      window.dispatchEvent(new CustomEvent('blog-updated'))
    } else {
      throw new Error(response.data.error || '删除失败')
    }
  } catch (error) {
    console.error('删除文章失败:', error)
    alert(error.response?.data?.error || error.message || '删除文章失败，请稍后重试')
  } finally {
    isLoading.value = false
  }
}
</script>
