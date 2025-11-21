<template>
  <div class="pt-20 pb-12" :class="isDark ? 'dark' : 'light'">
    <div class="container mx-auto px-4 text-center">
      <div class="glass-effect rounded-3xl p-12 max-w-2xl mx-auto">
        <div class="text-6xl mb-6">🔍</div>
        <h1 class="text-4xl font-bold mb-4 title-reveal">
          页面未找到
        </h1>
        <p class="text-lg mb-8 transition-colors" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <div class="flex gap-4 justify-center">
          <router-link
            to="/"
            class="px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            :class="isDark 
              ? 'bg-tokyo-night-blue hover:bg-tokyo-night-blue0 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'"
          >
            返回主页
          </router-link>
          <router-link
            to="/blog"
            class="px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 border"
            :class="isDark 
              ? 'border-tokyo-night-blue text-tokyo-night-cyan hover:bg-tokyo-night-blue hover:text-white' 
              : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'"
          >
            浏览博客
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { isDark } = useTheme()
</script>
