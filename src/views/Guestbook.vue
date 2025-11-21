<template>
  <div class="pt-20 pb-12" :class="isDark ? 'dark' : 'light'">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- 页面标题 -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-5xl font-bold mb-4 title-reveal">
          留言板 | GUESTBOOK
        </h1>
        <p class="transition-colors" :class="isDark ? 'text-gray-300' : 'text-gray-600'">留下你的足迹吧~</p>
      </div>

      <!-- 留言表单 -->
      <div class="glass-effect rounded-3xl p-8 mb-8 card-hover scroll-animate">
        <h2 class="text-2xl font-bold mb-6 transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">发表留言</h2>
        
        <form @submit.prevent="submitMessage" class="space-y-6">
          <!-- 头像上传 -->
          <div>
            <label class="block text-sm font-medium mb-2 transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">头像 (可选)</label>
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-tokyo-night-blue to-tokyo-night-cyan flex items-center justify-center text-2xl text-white overflow-hidden">
                <img v-if="form.avatar" :src="form.avatar" alt="avatar" class="w-full h-full object-cover" />
                <span v-else>{{ form.nickname.charAt(0) || '?' }}</span>
              </div>
              <input 
                type="url" 
                v-model="form.avatar"
                placeholder="输入头像图片URL"
                class="flex-1 px-4 py-2 rounded-lg focus:ring-2 outline-none transition-all guestbook-input bg-transparent border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- 昵称和性别 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2 transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">昵称 (可选)</label>
              <input 
                type="text" 
                v-model="form.nickname"
                placeholder="你的昵称"
                class="w-full px-4 py-2 rounded-lg focus:ring-2 outline-none transition-all guestbook-input bg-transparent border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2 transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">性别 (可选)</label>
              <select 
                v-model="form.gender"
                class="w-full px-4 py-2 rounded-lg focus:ring-2 outline-none transition-all guestbook-input bg-transparent border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">请选择</option>
                <option value="male">男</option>
                <option value="female">女</option>
                <option value="other">其他</option>
              </select>
            </div>
          </div>

          <!-- 生日和邮箱 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2 transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">生日 (可选)</label>
              <input 
                type="date" 
                v-model="form.birthday"
                class="w-full px-4 py-2 rounded-lg focus:ring-2 outline-none transition-all guestbook-input bg-transparent border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2 transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">电子邮件 (可选)</label>
              <input 
                type="email" 
                v-model="form.email"
                placeholder="your@email.com"
                class="w-full px-4 py-2 rounded-lg focus:ring-2 outline-none transition-all guestbook-input bg-transparent border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- 留言内容 -->
          <div>
            <label class="block text-sm font-medium mb-2 transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">留言内容 *</label>
            <textarea 
              v-model="form.content"
              required
              rows="5"
              placeholder="写下你想说的话..."
              class="w-full px-4 py-2 rounded-lg focus:ring-2 outline-none transition-all resize-none guestbook-input bg-transparent border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <!-- Cookie提示和提交按钮 -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="saveCookie"
                v-model="saveCookie"
                class="w-4 h-4 rounded text-tokyo-night-cyan focus:ring-tokyo-night-blue"
              />
              <label for="saveCookie" class="text-sm transition-colors" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
                记住我的信息
              </label>
            </div>
            
            <button 
              type="submit"
              class="px-8 py-3 bg-gradient-to-r from-tokyo-night-blue to-tokyo-night-cyan text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
            >
              发布留言
            </button>
          </div>
        </form>
      </div>

      <!-- 留言列表 -->
      <div class="space-y-6">
        <h2 class="text-2xl font-bold title-text">留言列表</h2>
        
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          class="guestbook-message-card rounded-2xl p-6 card-hover scroll-animate relative"
          :class="`scroll-animate-delay-${Math.min(index + 1, 6)}`"
          :style="{ animationDelay: `${index * 0.1}s`, zIndex: 1 }"
        >
          <div class="flex items-start gap-4">
            <!-- 头像 -->
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-tokyo-night-blue to-tokyo-night-cyan flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden shadow-lg">
              <img v-if="message.avatar" :src="message.avatar" alt="avatar" class="w-full h-full object-cover" />
              <span v-else class="text-sm">{{ (message.nickname || '游').charAt(0) }}</span>
            </div>
            
            <!-- 留言内容 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="guestbook-nickname">{{ message.nickname || '游客' }}</span>
                <span v-if="message.gender" class="text-xs">
                  {{ message.gender === 'male' ? '👨' : message.gender === 'female' ? '👩' : '🧑' }}
                </span>
                <span class="guestbook-timestamp">{{ message.timestamp }}</span>
              </div>
              
              <div class="mt-2">
                <p class="guestbook-content">{{ message.content }}</p>
              </div>
              
              <!-- 额外信息（可选显示） -->
              <div v-if="message.birthday || message.email" class="guestbook-extra flex items-center gap-3">
                <span v-if="message.birthday">🎂 {{ message.birthday }}</span>
                <span v-if="message.email">📧 {{ message.email }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="messages.length === 0" class="text-center py-20 glass-effect rounded-3xl">
          <div class="text-6xl mb-4">💬</div>
          <p class="text-xl text-tokyo-night-fg">还没有留言</p>
          <p class="text-tokyo-night-fg-dark mt-2">快来做第一个留言的人吧！</p>
        </div>
      </div>

      <!-- 回到顶部按钮 -->
      <transition name="fade">
        <button 
          v-if="showBackToTop"
          @click="scrollToTop"
          class="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-tokyo-night-blue to-tokyo-night-cyan text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center z-30"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
          </svg>
        </button>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { useTheme } from '../composables/useTheme'
import axios from 'axios'

useScrollAnimation()
const { isDark } = useTheme()

// API 基础路径
const API_BASE = '/api'

// 表单数据
const form = reactive({
  avatar: '',
  nickname: '游客',
  gender: '',
  birthday: '',
  email: '',
  content: ''
})

const saveCookie = ref(false)
const showBackToTop = ref(false)
const isLoading = ref(false)

// 留言列表
const messages = ref([])

// 获取留言列表
const fetchMessages = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`${API_BASE}/messages`)
    console.log('留言API响应:', response.data) // 调试信息
    if (response.data.success && Array.isArray(response.data.data)) {
      // 按创建时间倒序排序，显示最新的留言
      const processedMessages = response.data.data
        .map(msg => ({
          ...msg,
          nickname: msg.nickname || '游客',
          timestamp: new Date(msg.created_at).toLocaleString('zh-CN')
        }))
        .sort((a, b) => {
          // 按创建时间倒序排序
          const dateA = new Date(a.created_at || 0)
          const dateB = new Date(b.created_at || 0)
          return dateB - dateA
        })
      
      messages.value = processedMessages
      console.log(`成功加载留言数量: ${messages.value.length}`)
    } else {
      console.warn('留言API返回数据格式错误:', response.data)
      // 如果API返回格式错误但不是网络错误，保持现有数据
      if (messages.value.length === 0) {
        messages.value = []
      }
    }
  } catch (error) {
    console.error('获取留言失败:', error)
    console.error('错误状态码:', error.response?.status)
    console.error('错误详情:', error.response?.data || error.message)
    
    // 根据错误类型决定是否清空数据
    if (error.response?.status === 404) {
      console.error('留言API端点未找到 (404)')
    } else if (!error.response || error.response.status >= 500) {
      console.log('网络错误或服务器错误，保持现有留言数据')
    }
  } finally {
    isLoading.value = false
  }
}

// 从Cookie加载用户信息
onMounted(() => {
  const savedData = getCookie('guestbook_user')
  if (savedData) {
    try {
      const userData = JSON.parse(savedData)
      Object.assign(form, userData)
      saveCookie.value = true
    } catch (e) {
      console.error('Failed to parse cookie data')
    }
  }
  
  window.addEventListener('scroll', handleScroll)
  
  // 监听留言更新事件，自动刷新留言列表
  window.addEventListener('messages-updated', fetchMessages)
  
  // 加载留言列表
  fetchMessages()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  // 清理留言更新事件监听器
  window.removeEventListener('messages-updated', fetchMessages)
})

// 提交留言
const submitMessage = async () => {
  if (!form.content.trim()) {
    alert('请输入留言内容')
    return
  }
  
  try {
    isLoading.value = true
    
    const response = await axios.post(`${API_BASE}/messages`, {
      avatar: form.avatar || '',
      nickname: form.nickname || '游客',
      gender: form.gender || '',
      birthday: form.birthday || null,
      email: form.email || '',
      content: form.content
    })
    
    if (response.data.success) {
      // 保存用户信息到Cookie
      if (saveCookie.value) {
        const userData = {
          avatar: form.avatar,
          nickname: form.nickname,
          gender: form.gender,
          birthday: form.birthday,
          email: form.email
        }
        setCookie('guestbook_user', JSON.stringify(userData), 365)
      } else {
        deleteCookie('guestbook_user')
      }
      
      // 清空留言内容
      form.content = ''
      
      // 重新加载留言列表
      await fetchMessages()
      
      // 触发留言更新事件，通知其他页面刷新
      window.dispatchEvent(new CustomEvent('messages-updated'))
      
      // 显示成功提示
      alert('留言发布成功！')
    } else {
      alert('留言提交失败: ' + (response.data.error || '未知错误'))
    }
  } catch (error) {
    console.error('提交留言失败:', error)
    alert('留言提交失败，请稍后再试。\n错误: ' + error.message)
  } finally {
    isLoading.value = false
  }
}

// Cookie操作函数
const setCookie = (name, value, days) => {
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  const expires = "expires=" + date.toUTCString()
  document.cookie = name + "=" + value + ";" + expires + ";path=/"
}

const getCookie = (name) => {
  const nameEQ = name + "="
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

// 滚动处理
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

