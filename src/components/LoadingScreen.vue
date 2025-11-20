<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center glass-effect-dark">
    <div class="text-center">
      <!-- Logo/标题 -->
      <div class="mb-8 animate-pulse">
        <h1 class="text-5xl font-bold text-white mb-2">DaZiDian</h1>
        <p class="text-lg text-gray-300">春風若有憐花意，可否許我再少年？</p>
      </div>
      
      <!-- 进度条 -->
      <div class="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      
      <!-- 加载文字 -->
      <p class="mt-4 text-gray-400">{{ Math.round(progress) }}%</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['loaded'])
const progress = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    progress.value += Math.random() * 15
    
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(interval)
      setTimeout(() => {
        emit('loaded')
      }, 300)
    }
  }, 150)
})
</script>

