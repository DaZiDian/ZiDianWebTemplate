<template>
  <!-- 设置按钮 - 固定在右下角 -->
  <button
    @click="showPanel = !showPanel"
    class="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
    :class="isDark 
      ? 'bg-tokyo-night-blue text-white hover:bg-tokyo-night-cyan' 
      : 'bg-blue-600 text-white hover:bg-blue-700'"
    title="个性化设置"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  </button>

  <!-- 设置面板 -->
  <div
    v-if="showPanel"
    class="fixed bottom-24 right-6 z-50 w-96 max-h-[80vh] overflow-y-auto glass-effect rounded-2xl p-6 shadow-2xl"
    :class="isDark ? 'bg-tokyo-night-bg/95' : 'bg-white/95'"
  >
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">
        个性化设置
      </h3>
      <button
        @click="showPanel = false"
        class="text-gray-500 hover:text-gray-700 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="space-y-6">
      <!-- 字体设置 -->
      <div>
        <label class="block text-sm font-medium mb-3 transition-colors" 
               :class="isDark ? 'text-white' : 'text-gray-800'">
          字体选择
        </label>
        <select
          v-model="settings.fontFamily"
          @change="applySettings"
          class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          :class="isDark 
            ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
            : 'bg-white border-gray-300 text-gray-900'"
        >
          <option value="system">系统默认</option>
          <option value="serif">衬线字体 (Serif)</option>
          <option value="sans-serif">无衬线字体 (Sans-serif)</option>
          <option value="monospace">等宽字体 (Monospace)</option>
          <option value="custom">自定义字体</option>
        </select>
        <input
          v-if="settings.fontFamily === 'custom'"
          v-model="settings.customFont"
          @input="applySettings"
          placeholder="输入字体名称，如: 'Microsoft YaHei', Arial"
          class="w-full mt-2 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          :class="isDark 
            ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
            : 'bg-white border-gray-300 text-gray-900'"
        />
      </div>

      <!-- 颜色设置 -->
      <div>
        <label class="block text-sm font-medium mb-3 transition-colors" 
               :class="isDark ? 'text-white' : 'text-gray-800'">
          颜色主题
        </label>
        
        <!-- 颜色输入模式选择 -->
        <div class="flex gap-2 mb-3">
          <button
            v-for="mode in colorModes"
            :key="mode"
            @click="colorInputMode = mode"
            class="flex-1 px-3 py-1.5 rounded text-sm transition-all"
            :class="colorInputMode === mode
              ? (isDark ? 'bg-tokyo-night-blue text-white' : 'bg-blue-600 text-white')
              : (isDark ? 'bg-tokyo-night-bg-highlight text-gray-300' : 'bg-gray-100 text-gray-700')"
          >
            {{ mode }}
          </button>
        </div>

        <!-- 颜色选择器 -->
        <div class="space-y-4">
          <!-- 标题颜色 -->
          <div>
            <label class="block text-xs mb-2 transition-colors" 
                   :class="isDark ? 'text-gray-300' : 'text-gray-600'">
              标题颜色
            </label>
            <div class="flex gap-2">
              <input
                v-if="colorInputMode === 'Hex'"
                v-model="settings.colors.title"
                @input="applySettings"
                type="text"
                placeholder="#000000"
                pattern="^#[0-9A-Fa-f]{6}$"
                class="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
                  : 'bg-white border-gray-300 text-gray-900'"
              />
              <input
                v-else-if="colorInputMode === 'RGB'"
                v-model="settings.colors.title"
                @input="applySettings"
                type="text"
                placeholder="rgb(0, 0, 0)"
                class="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
                  : 'bg-white border-gray-300 text-gray-900'"
              />
              <input
                v-else
                v-model="settings.colors.title"
                @input="applySettings"
                type="color"
                class="h-10 w-20 rounded-lg border cursor-pointer"
                :class="isDark ? 'border-tokyo-night-blue' : 'border-gray-300'"
              />
            </div>
          </div>

          <!-- 正文颜色 -->
          <div>
            <label class="block text-xs mb-2 transition-colors" 
                   :class="isDark ? 'text-gray-300' : 'text-gray-600'">
              正文颜色
            </label>
            <div class="flex gap-2">
              <input
                v-if="colorInputMode === 'Hex'"
                v-model="settings.colors.body"
                @input="applySettings"
                type="text"
                placeholder="#333333"
                pattern="^#[0-9A-Fa-f]{6}$"
                class="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
                  : 'bg-white border-gray-300 text-gray-900'"
              />
              <input
                v-else-if="colorInputMode === 'RGB'"
                v-model="settings.colors.body"
                @input="applySettings"
                type="text"
                placeholder="rgb(51, 51, 51)"
                class="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
                  : 'bg-white border-gray-300 text-gray-900'"
              />
              <input
                v-else
                v-model="settings.colors.body"
                @input="applySettings"
                type="color"
                class="h-10 w-20 rounded-lg border cursor-pointer"
                :class="isDark ? 'border-tokyo-night-blue' : 'border-gray-300'"
              />
            </div>
          </div>

          <!-- 链接颜色 -->
          <div>
            <label class="block text-xs mb-2 transition-colors" 
                   :class="isDark ? 'text-gray-300' : 'text-gray-600'">
              链接颜色
            </label>
            <div class="flex gap-2">
              <input
                v-if="colorInputMode === 'Hex'"
                v-model="settings.colors.link"
                @input="applySettings"
                type="text"
                placeholder="#3b82f6"
                pattern="^#[0-9A-Fa-f]{6}$"
                class="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
                  : 'bg-white border-gray-300 text-gray-900'"
              />
              <input
                v-else-if="colorInputMode === 'RGB'"
                v-model="settings.colors.link"
                @input="applySettings"
                type="text"
                placeholder="rgb(59, 130, 246)"
                class="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
                  : 'bg-white border-gray-300 text-gray-900'"
              />
              <input
                v-else
                v-model="settings.colors.link"
                @input="applySettings"
                type="color"
                class="h-10 w-20 rounded-lg border cursor-pointer"
                :class="isDark ? 'border-tokyo-night-blue' : 'border-gray-300'"
              />
            </div>
          </div>

          <!-- 光效颜色 -->
          <div>
            <label class="block text-xs mb-2 transition-colors" 
                   :class="isDark ? 'text-gray-300' : 'text-gray-600'">
              光效颜色
            </label>
            <div class="flex gap-2">
              <input
                v-if="colorInputMode === 'Hex'"
                v-model="settings.colors.glow"
                @input="applySettings"
                type="text"
                placeholder="#7aa2f7"
                pattern="^#[0-9A-Fa-f]{6}$"
                class="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
                  : 'bg-white border-gray-300 text-gray-900'"
              />
              <input
                v-else-if="colorInputMode === 'RGB'"
                v-model="settings.colors.glow"
                @input="applySettings"
                type="text"
                placeholder="rgb(122, 162, 247)"
                class="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
                  : 'bg-white border-gray-300 text-gray-900'"
              />
              <input
                v-else
                v-model="settings.colors.glow"
                @input="applySettings"
                type="color"
                class="h-10 w-20 rounded-lg border cursor-pointer"
                :class="isDark ? 'border-tokyo-night-blue' : 'border-gray-300'"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 应用到黑夜模式 -->
      <div class="flex items-center gap-3">
        <input
          v-model="settings.applyToDark"
          @change="applySettings"
          type="checkbox"
          id="applyToDark"
          class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label for="applyToDark" class="text-sm transition-colors" 
               :class="isDark ? 'text-gray-300' : 'text-gray-700'">
          同时应用到黑夜模式
        </label>
      </div>

      <!-- 自定义CSS -->
      <div>
        <label class="block text-sm font-medium mb-3 transition-colors" 
               :class="isDark ? 'text-white' : 'text-gray-800'">
          自定义CSS
        </label>
        <textarea
          v-model="settings.customCSS"
          @input="applySettings"
          rows="4"
          placeholder="输入自定义CSS代码，例如：.title { color: red; }"
          class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
          :class="isDark 
            ? 'bg-tokyo-night-bg-highlight border-tokyo-night-blue text-white' 
            : 'bg-white border-gray-300 text-gray-900'"
        ></textarea>
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-3">
        <button
          @click="resetSettings"
          class="flex-1 px-4 py-2 rounded-lg border font-medium transition-all"
          :class="isDark 
            ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
        >
          重置
        </button>
        <button
          @click="saveSettings"
          class="flex-1 px-4 py-2 rounded-lg font-medium text-white transition-all"
          :class="isDark 
            ? 'bg-tokyo-night-blue hover:bg-tokyo-night-cyan' 
            : 'bg-blue-600 hover:bg-blue-700'"
        >
          保存
        </button>
      </div>
    </div>
  </div>

  <!-- 遮罩层 -->
  <div
    v-if="showPanel"
    @click="showPanel = false"
    class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
  ></div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useTheme } from '../composables/useTheme'

const { isDark } = useTheme()

const showPanel = ref(false)
const colorInputMode = ref('调色盘') // 调色盘, Hex, RGB
const colorModes = ['调色盘', 'Hex', 'RGB']

// 设置数据
const settings = reactive({
  fontFamily: 'system',
  customFont: '',
  colors: {
    title: '',
    body: '',
    link: '',
    glow: ''
  },
  applyToDark: false,
  customCSS: ''
})

// 默认设置
const defaultSettings = {
  fontFamily: 'system',
  customFont: '',
  colors: {
    title: '',
    body: '',
    link: '',
    glow: ''
  },
  applyToDark: false,
  customCSS: ''
}

// 加载设置
const loadSettings = () => {
  const saved = localStorage.getItem('themeCustomizer')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      Object.assign(settings, parsed)
      applySettings()
    } catch (e) {
      console.error('加载设置失败:', e)
    }
  }
}

// 应用设置
const applySettings = () => {
  const root = document.documentElement
  const styleId = 'theme-customizer-style'
  let styleEl = document.getElementById(styleId)
  
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = styleId
    document.head.appendChild(styleEl)
  }

  let css = ''

  // 应用字体
  if (settings.fontFamily === 'custom' && settings.customFont) {
    css += `* { font-family: ${settings.customFont}, sans-serif !important; }\n`
  } else if (settings.fontFamily !== 'system') {
    const fontMap = {
      'serif': 'Georgia, "Times New Roman", serif',
      'sans-serif': 'Arial, "Helvetica Neue", Helvetica, sans-serif',
      'monospace': '"Courier New", Courier, monospace'
    }
    css += `* { font-family: ${fontMap[settings.fontFamily]} !important; }\n`
  }

  // 应用颜色
  const colorSelectors = {
    title: 'h1, h2, h3, h4, h5, h6, .title-text',
    body: 'p, span, div, .content-text',
    link: 'a, .link-underline',
    glow: '.glass-effect, .card-hover, .title-reveal'
  }

  Object.keys(settings.colors).forEach(key => {
    if (settings.colors[key]) {
      const color = settings.colors[key]
      const selector = colorSelectors[key]
      
      if (settings.applyToDark || !isDark.value) {
        css += `${selector} { color: ${color} !important; }\n`
      }
      
      if (key === 'glow') {
        css += `${selector} { box-shadow: 0 0 20px ${color}40 !important; }\n`
      }
    }
  })

  // 应用自定义CSS
  if (settings.customCSS) {
    css += settings.customCSS + '\n'
  }

  styleEl.textContent = css

  // 添加平滑过渡
  root.style.setProperty('--transition-duration', '0.3s')
  root.style.setProperty('transition', 'color var(--transition-duration) ease, background-color var(--transition-duration) ease')
}

// 保存设置
const saveSettings = () => {
  localStorage.setItem('themeCustomizer', JSON.stringify(settings))
  alert('设置已保存！')
}

// 重置设置
const resetSettings = () => {
  if (confirm('确定要重置所有设置吗？')) {
    Object.assign(settings, defaultSettings)
    applySettings()
    localStorage.removeItem('themeCustomizer')
    alert('设置已重置！')
  }
}

// 监听主题变化
watch(() => isDark.value, () => {
  applySettings()
})

onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
/* 平滑过渡效果 */
* {
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}
</style>

