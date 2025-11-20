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
        <h2 class="text-2xl font-bold transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">留言列表</h2>
        
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          class="glass-effect rounded-3xl p-6 card-hover scroll-animate"
          :class="`scroll-animate-delay-${Math.min(index + 1, 6)}`"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- 留言者信息 -->
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-tokyo-night-blue to-tokyo-night-cyan flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden">
              <img v-if="message.avatar" :src="message.avatar" alt="avatar" class="w-full h-full object-cover" />
              <span v-else>{{ message.nickname.charAt(0) }}</span>
            </div>
            
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-1">
                <span class="font-bold text-tokyo-night-cyan">{{ message.nickname }}</span>
                <span v-if="message.gender" class="text-sm">
                  {{ message.gender === 'male' ? '👨' : message.gender === 'female' ? '👩' : '🧑' }}
                </span>
              </div>
              
              <div class="flex items-center gap-4 text-xs text-tokyo-night-dark5">
                <span v-if="message.birthday">🎂 {{ message.birthday }}</span>
                <span v-if="message.email">📧 {{ message.email }}</span>
                <span>🕐 {{ message.timestamp }}</span>
              </div>
            </div>
          </div>
          
          <!-- 留言内容 -->
          <div class="pl-16">
            <p class="text-tokyo-night-fg leading-relaxed whitespace-pre-wrap">{{ message.content }}</p>
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

useScrollAnimation()
const { isDark } = useTheme()

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

// 留言列表 - 示例数据
const messages = ref([
  {
    avatar: '',
    nickname: 'DaZiDian',
    gender: 'male',
    birthday: '2007-03-26',
    email: 'dz1d07@outlook.com',
    content: '欢迎来到我的留言板！\n这里可以留下你的想法和建议~',
    timestamp: '2024-11-20 12:00'
  }
])

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
  
  // 从localStorage加载留言
  const savedMessages = localStorage.getItem('guestbook_messages')
  if (savedMessages) {
    try {
      messages.value = JSON.parse(savedMessages)
    } catch (e) {
      console.error('Failed to parse messages')
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 提交留言
const submitMessage = () => {
  if (!form.content.trim()) {
    alert('请输入留言内容')
    return
  }
  
  const newMessage = {
    avatar: form.avatar,
    nickname: form.nickname || '游客',
    gender: form.gender,
    birthday: form.birthday,
    email: form.email,
    content: form.content,
    timestamp: new Date().toLocaleString('zh-CN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  
  messages.value.unshift(newMessage)
  
  // 保存到localStorage
  localStorage.setItem('guestbook_messages', JSON.stringify(messages.value))
  
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
  
  // 显示成功提示
  alert('留言发布成功！')
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

