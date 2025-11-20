<template>
  <div class="pt-20 pb-12">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <section class="mb-16 text-center">
        <div class="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <!-- 圆形Logo -->
          <img src="/img/LOGO.jpg" alt="Logo" class="w-32 h-32 rounded-full ring-4 ring-tokyo-night-blue shadow-2xl animate-scale-in" />
          
          <div class="text-center md:text-left">
            <h1 class="text-5xl md:text-6xl font-bold mb-4 animate-fade-in signature-reveal">
              Hello, I'm DaZiDian~
            </h1>
            <p class="text-xl italic animate-fade-in transition-colors" :class="isDark ? 'text-white' : 'text-gray-700'">
              春風若有憐花意，可否許我再少年？
            </p>
          </div>
        </div>
      </section>

      <!-- 关于我卡片 -->
      <section class="mb-12">
        <div class="glass-effect rounded-3xl p-8 card-hover scroll-animate">
          <h2 class="text-4xl font-bold mb-6 flex items-center gap-3">
            <span class="title-reveal text-4xl">关于我</span>
            <span class="text-xl transition-colors" :class="isDark ? 'text-tokyo-night-dark5' : 'text-gray-500'">ABOUT ME</span>
          </h2>
          
          <p class="text-lg mb-6 transition-colors" :class="isDark ? 'text-white' : 'text-gray-700'">
            专业信息安全，主攻渗透测试、数据恢复、服务器运维、大数据、人工智能方向
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center gap-3 transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">
              <span class="text-2xl">🇨🇳</span>
              <span>中国山东省青岛市 | Qingdao, Shandong, China</span>
            </div>
            <div class="flex items-center gap-3 transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">
              <span class="text-2xl">🎂</span>
              <span>丁亥年二月初八 | 2007.03.26</span>
            </div>
            <div class="flex items-center gap-3 transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">
              <span class="text-2xl">📚</span>
              <span>SDCIT</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 我的技能卡片 -->
      <section class="mb-12">
        <div class="glass-effect rounded-3xl p-8 card-hover scroll-animate scroll-animate-delay-1">
          <h2 class="text-3xl font-bold mb-6">
            <span class="title-reveal">我的技能 | My Skills</span>
          </h2>
          
          <!-- 操作系统 -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold mb-4 transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">操作系统 | OS</h3>
            <div class="flex flex-wrap gap-3">
              <img src="https://img.shields.io/badge/Windows-0078D6?logo=microsoft&logoColor=white" alt="Windows" class="h-8" />
              <img src="https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black" alt="Linux" class="h-8" />
            </div>
          </div>
          
          <!-- 常用开发语言 -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold mb-4 transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">常用开发语言 | Common Programming Languages</h3>
            <div class="flex flex-wrap gap-3">
              <img src="https://img.shields.io/badge/Java-ED8B00?logo=openjdk&logoColor=white" alt="Java" class="h-8" />
              <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" class="h-8" />
              <img src="https://img.shields.io/badge/C%23-239120?logo=c-sharp&logoColor=white" alt="C#" class="h-8" />
              <img src="https://img.shields.io/badge/C++-00599C?logo=c%2B%2B&logoColor=white" alt="C++" class="h-8" />
              <img src="https://img.shields.io/badge/Vue.js-4FC08D?logo=vue.js&logoColor=white" alt="Vue.js" class="h-8" />
              <img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white" alt="Python" class="h-8" />
              <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" class="h-8" />
              <img src="https://img.shields.io/badge/ArkTS-FF0000?logo=huawei&logoColor=white" alt="ArkTS" class="h-8" />
            </div>
          </div>
          
          <!-- GitHub Stats -->
          <div class="mt-8">
            <img 
              src="https://github-readme-stats.vercel.app/api?username=DaZiDian&count_private=true&locale=cn&theme=tokyonight" 
              alt="GitHub Stats" 
              class="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <!-- 我的代表作品卡片 -->
      <section class="mb-12">
        <div class="glass-effect rounded-3xl p-8 card-hover scroll-animate scroll-animate-delay-2">
          <h2 class="text-3xl font-bold mb-6">
            <span class="title-reveal">我的代表作品 | My Products</span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a 
              v-for="project in projects" 
              :key="project.name"
              :href="project.url" 
              target="_blank"
              class="block p-6 glass-effect rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-xl border border-tokyo-night-blue/30"
            >
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-tokyo-night-blue to-tokyo-night-cyan flex items-center justify-center text-white font-bold">
                  {{ project.name[0] }}
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-bold mb-2 truncate transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">{{ project.name }}</h3>
                  <p class="text-sm line-clamp-2 transition-colors" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ project.description }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- 底部工具展示区域 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 开发工具展示台 -->
        <div class="lg:col-span-2 glass-effect rounded-3xl p-8 card-hover scroll-animate scroll-animate-delay-3">
          <h2 class="text-2xl font-bold mb-6 transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">开发工具 | Development Tools</h2>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div v-for="tool in devTools" :key="tool.name" class="text-center">
              <div class="w-16 h-16 mx-auto mb-3 rounded-xl glass-effect flex items-center justify-center text-3xl hover:scale-110 transition-transform border-theme">
                {{ tool.icon }}
              </div>
              <p class="text-sm font-medium transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">{{ tool.name }}</p>
            </div>
          </div>
        </div>

        <!-- 音乐盒 -->
        <div class="glass-effect rounded-3xl p-8 card-hover scroll-animate scroll-animate-delay-4">
          <h2 class="text-2xl font-bold mb-6 flex items-center justify-between transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">
            <span>🎵 Music Box</span>
          </h2>
          
          <div class="space-y-4">
            <div class="aspect-square rounded-xl flex items-center justify-center text-white text-6xl border-theme music-box-bg">
              🎵
            </div>
            
            <div class="text-center">
              <p class="font-medium transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">音乐播放器</p>
              <p class="text-sm transition-colors" :class="isDark ? 'text-gray-300' : 'text-gray-600'">Coming Soon...</p>
            </div>
            
            <div class="space-y-2">
              <div class="h-2 rounded-full overflow-hidden transition-colors" :class="isDark ? 'bg-tokyo-night-bg-highlight' : 'bg-gray-300'">
                <div class="h-full w-0 progress-bar"></div>
              </div>
              <div class="flex justify-between text-xs transition-colors" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                <span>0:00</span>
                <span>0:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { isDark } = useTheme()
useScrollAnimation()

const projects = ref([
  {
    name: 'StarWave-Dark',
    description: 'A beautiful dark theme',
    url: 'https://github.com/DaZiDian/StarWave-Dark'
  },
  {
    name: 'Z1D1anSFW',
    description: 'Software Framework',
    url: 'https://github.com/DaZiDian/Z1D1anSFW/tree/master'
  },
  {
    name: 'getMinecraftPython',
    description: 'Python脚本解析Minecraft官方源',
    url: 'https://github.com/DaZiDian/getMinecraftPython'
  },
  {
    name: 'LinHexShell',
    description: 'Linux Hex Shell',
    url: 'https://github.com/DaZiDian/LinHexShell'
  },
  {
    name: 'DFC',
    description: '文档格式转换工具',
    url: 'https://github.com/DaZiDian/DFC'
  },
  {
    name: 'zh_CN_NeoForgeDocumentation',
    description: 'Neo文档中文翻译',
    url: 'https://github.com/DaZiDian/zh_CN_NeoForgeDocumentation'
  }
])

const devTools = ref([
  { name: 'VS Code', icon: '💻' },
  { name: 'Cursor', icon: '✨' },
  { name: 'IDEA', icon: '🧠' },
  { name: 'Jupyter', icon: '📊' },
  { name: 'PyCharm', icon: '🐍' }
])
</script>

<style scoped>
/* 艺术签名 - 根据主题动态变色 */
.dark .signature-text {
  background: linear-gradient(135deg, #7aa2f7 0%, #bb9af7 50%, #7dcfff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #7aa2f7;
  animation: gradientShift 3s ease infinite;
  background-size: 200% 200%;
}

.light .signature-text {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #2563eb;
  animation: gradientShift 3s ease infinite;
  background-size: 200% 200%;
}

/* 区段标题样式 */
.dark .section-title {
  background: linear-gradient(90deg, #7aa2f7, #7dcfff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #7aa2f7;
}

.light .section-title {
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #2563eb;
}

.dark .section-title-alt {
  background: linear-gradient(90deg, #bb9af7, #9d7cd8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #bb9af7;
}

.light .section-title-alt {
  background: linear-gradient(90deg, #7c3aed, #6d28d9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #7c3aed;
}

.dark .section-title-orange {
  background: linear-gradient(90deg, #ff9e64, #e0af68);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #ff9e64;
}

.light .section-title-orange {
  background: linear-gradient(90deg, #f59e0b, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #f59e0b;
}

/* 音乐盒背景 */
.dark .music-box-bg {
  background: linear-gradient(135deg, #bb9af7, #9d7cd8);
}

.light .music-box-bg {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
}

/* 进度条 */
.dark .progress-bar {
  background: linear-gradient(90deg, #7aa2f7, #7dcfff);
}

.light .progress-bar {
  background: linear-gradient(90deg, #2563eb, #3b82f6);
}

/* 边框主题 */
.dark .border-theme {
  border-color: rgba(122, 162, 247, 0.3);
}

.light .border-theme {
  border-color: rgba(37, 99, 235, 0.3);
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>

