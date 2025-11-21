import { ref, watch, onMounted } from 'vue'

const isDark = ref(true) // 默认黑夜模式

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateTheme()
  }

  const updateTheme = () => {
    const html = document.documentElement
    
    if (isDark.value) {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }



  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    
    // 如果有保存的主题，使用保存的；否则默认黑夜模式
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = true
    }
    
    updateTheme()
  }

  return {
    isDark,
    toggleTheme,
    initTheme
  }
}

