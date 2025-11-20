import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  let observer = null

  const initScrollAnimation = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // 元素至少有 10% 可见时触发
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 元素进入视口时添加动画类
          entry.target.classList.add('is-visible')
        } else {
          // 元素离开视口时移除动画类，实现下浮效果
          entry.target.classList.remove('is-visible')
        }
      })
    }, options)

    // 观察所有带有 scroll-animate 类的元素
    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observer.observe(el))
  }

  const destroyScrollAnimation = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    // 延迟初始化，确保 DOM 已渲染
    setTimeout(() => {
      initScrollAnimation()
    }, 100)
  })

  onUnmounted(() => {
    destroyScrollAnimation()
  })

  return {
    initScrollAnimation,
    destroyScrollAnimation
  }
}

