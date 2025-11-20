<template>
  <div id="app" class="min-h-screen theme-transition" :class="isDark ? 'dark tokyo-night-bg' : 'light-bg'">
    <!-- 加载动画 -->
    <LoadingScreen v-if="loading" @loaded="onLoaded" />
    
    <!-- 主内容 -->
    <transition name="page-fade" mode="out-in">
      <div v-if="!loading" class="animate-expand">
        <!-- 顶部导航栏 -->
        <NavBar />
        
        <!-- 页面内容 -->
        <main class="min-h-screen">
          <router-view v-slot="{ Component }">
            <transition name="page-transition" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
        
        <!-- 底部信息栏 -->
        <Footer />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import { useTheme } from './composables/useTheme'

const loading = ref(true)
const { isDark, initTheme } = useTheme()

const onLoaded = () => {
  loading.value = false
}

onMounted(() => {
  // 初始化主题
  initTheme()
  
  // 模拟加载时间
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
</script>

<style scoped>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.5s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* 向外展开动画 */
.animate-expand {
  animation: expandOut 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes expandOut {
  0% {
    opacity: 0;
    transform: scale(0.8);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.4s ease;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>

