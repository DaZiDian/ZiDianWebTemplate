<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">
        留言管理
      </h2>
      <button 
        @click="refreshMessages"
        :disabled="isLoading"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
        :class="isDark 
          ? 'bg-tokyo-night-bg-highlight text-tokyo-night-cyan hover:bg-tokyo-night-blue' 
          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'"
      >
        {{ isLoading ? '刷新中...' : '🔄 刷新' }}
      </button>
    </div>

    <!-- 留言列表 -->
    <div v-if="isLoading && messages.length === 0" class="text-center py-12">
      <p class="transition-colors" :class="isDark ? 'text-gray-400' : 'text-gray-600'">加载中...</p>
    </div>
    <div v-else-if="messages.length === 0" class="text-center py-12">
      <p class="transition-colors" :class="isDark ? 'text-gray-400' : 'text-gray-600'">暂无留言</p>
    </div>
    <div 
      v-else
      v-for="message in messages" 
      :key="message.id"
      class="glass-effect rounded-2xl p-6"
    >
      <div class="flex items-start gap-4 mb-4">
        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-tokyo-night-blue to-tokyo-night-cyan flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden">
          <img v-if="message.avatar" :src="message.avatar" alt="avatar" class="w-full h-full object-cover" />
          <span v-else>{{ (message.nickname || '游客').charAt(0) }}</span>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-1">
            <span class="font-bold transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">
              {{ message.nickname || '游客' }}
            </span>
            <span v-if="message.gender" class="text-xs px-2 py-0.5 rounded"
                  :class="isDark ? 'bg-tokyo-night-bg-highlight' : 'bg-gray-100'">
              {{ message.gender }}
            </span>
          </div>
          <div class="flex items-center gap-4 text-xs transition-colors" 
               :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            <span v-if="message.email" class="flex items-center gap-1">
              📧 {{ message.email }}
            </span>
            <span v-if="message.birthday" class="flex items-center gap-1">
              🎂 {{ message.birthday }}
            </span>
            <span class="flex items-center gap-1">
              🕐 {{ formatDate(message.created_at) }}
            </span>
          </div>
        </div>
        <div class="flex gap-2">
          <button 
            @click="editMessage(message)"
            :disabled="isLoading"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
            :class="isDark 
              ? 'bg-tokyo-night-bg-highlight text-tokyo-night-cyan hover:bg-tokyo-night-blue' 
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'"
          >
            编辑
          </button>
          <button 
            @click="deleteMessage(message)"
            :disabled="isLoading"
            class="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-all disabled:opacity-50"
          >
            删除
          </button>
        </div>
      </div>
      <div class="pl-16">
        <p class="transition-colors whitespace-pre-wrap leading-relaxed" 
           :class="isDark ? 'text-gray-300' : 'text-gray-800'">
          {{ message.content }}
        </p>
      </div>
    </div>

    <!-- 编辑留言对话框 -->
    <div v-if="editingMessage" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="cancelEdit">
      <div class="glass-effect rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 class="text-xl font-bold mb-6 transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">
          编辑留言
        </h3>
        <form @submit.prevent="saveMessage" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2 transition-colors" 
                   :class="isDark ? 'text-white' : 'text-gray-800'">
              昵称
            </label>
            <input 
              type="text" 
              v-model="editForm.nickname"
              class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              :class="isDark 
                ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
                : 'bg-white border-gray-300 text-gray-900'"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2 transition-colors" 
                   :class="isDark ? 'text-white' : 'text-gray-800'">
              邮箱
            </label>
            <input 
              type="email" 
              v-model="editForm.email"
              class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              :class="isDark 
                ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
                : 'bg-white border-gray-300 text-gray-900'"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2 transition-colors" 
                   :class="isDark ? 'text-white' : 'text-gray-800'">
              留言内容 *
            </label>
            <textarea 
              v-model="editForm.content"
              rows="5"
              required
              class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              :class="isDark 
                ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
                : 'bg-white border-gray-300 text-gray-900'"
            ></textarea>
          </div>
          <div class="flex gap-2 justify-end">
            <button 
              type="button"
              @click="cancelEdit"
              class="px-4 py-2 rounded-lg border font-medium transition-all"
              :class="isDark 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
            >
              取消
            </button>
            <button 
              type="submit"
              :disabled="isSaving"
              class="px-4 py-2 rounded-lg font-medium text-white transition-all disabled:opacity-50"
              :class="isDark 
                ? 'bg-tokyo-night-blue hover:bg-tokyo-night-blue0' 
                : 'bg-blue-600 hover:bg-blue-700'"
            >
              {{ isSaving ? '保存中...' : '保存' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import axios from 'axios'

const { isDark } = useTheme()

const API_BASE = '/api'
const isLoading = ref(false)
const isSaving = ref(false)
const messages = ref([])
const editingMessage = ref(null)
const editForm = ref({
  nickname: '',
  email: '',
  content: ''
})

// 获取认证token
const getAuthToken = () => {
  return localStorage.getItem('blog_admin_token')
}

// 创建带认证头的axios实例
const createAuthHeaders = () => {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 加载留言列表
const fetchMessages = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`${API_BASE}/messages`)
    if (response.data.success) {
      messages.value = response.data.data || []
    }
  } catch (error) {
    console.error('加载留言失败:', error)
    alert('加载留言失败，请稍后重试')
  } finally {
    isLoading.value = false
  }
}

// 刷新留言
const refreshMessages = () => {
  fetchMessages()
}

// 编辑留言
const editMessage = (message) => {
  editingMessage.value = message
  editForm.value = {
    nickname: message.nickname || '',
    email: message.email || '',
    content: message.content || ''
  }
}

// 取消编辑
const cancelEdit = () => {
  editingMessage.value = null
  editForm.value = {
    nickname: '',
    email: '',
    content: ''
  }
}

// 保存留言
const saveMessage = async () => {
  try {
    isSaving.value = true
    const response = await axios.put(`${API_BASE}/messages`, {
      id: editingMessage.value.id,
      nickname: editForm.value.nickname,
      email: editForm.value.email,
      content: editForm.value.content
    }, {
      headers: createAuthHeaders()
    })
    
    if (response.data.success) {
      alert('留言更新成功！')
      await fetchMessages()
      cancelEdit()
      // 触发留言更新事件
      window.dispatchEvent(new CustomEvent('messages-updated'))
    } else {
      throw new Error(response.data.error || '更新失败')
    }
  } catch (error) {
    console.error('保存留言失败:', error)
    alert(error.response?.data?.error || error.message || '保存留言失败，请稍后重试')
  } finally {
    isSaving.value = false
  }
}

// 删除留言
const deleteMessage = async (message) => {
  if (!confirm('确定要删除这条留言吗？此操作不可撤销。')) {
    return
  }
  
  try {
    isLoading.value = true
    const response = await axios.delete(`${API_BASE}/messages?id=${message.id}`, {
      headers: createAuthHeaders()
    })
    
    if (response.data.success) {
      alert('留言已删除')
      await fetchMessages()
      // 触发留言更新事件
      window.dispatchEvent(new CustomEvent('messages-updated'))
    } else {
      throw new Error(response.data.error || '删除失败')
    }
  } catch (error) {
    console.error('删除留言失败:', error)
    alert(error.response?.data?.error || error.message || '删除留言失败，请稍后重试')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchMessages()
})
</script>

