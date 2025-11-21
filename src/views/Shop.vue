<template>
  <div class="pt-20 pb-12">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <section class="mb-12 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-4 signature-reveal">
          商铺
        </h1>
        <p class="text-xl italic transition-colors" :class="isDark ? 'text-white' : 'text-gray-700'">
          SHOP
        </p>
      </section>

      <!-- 四个并排的毛玻璃卡片 -->
      <section class="mb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- 办理流量卡 -->
          <div class="glass-effect rounded-3xl p-6 card-hover scroll-animate">
            <h2 class="text-2xl font-bold mb-4 transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">
              办理流量卡
            </h2>
            <p class="text-base mb-6 transition-colors" :class="isDark ? 'text-white' : 'text-gray-700'">
              提供优质流量卡办理服务
            </p>
            <a
              href="https://h5.gantanhao.com/jiJK"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full py-3 px-4 rounded-xl text-center font-medium transition-all duration-300"
              :class="isDark 
                ? 'bg-tokyo-night-blue hover:bg-tokyo-night-blue0 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'"
            >
              立即办理
            </a>
          </div>

          <!-- 电脑配置编写及电脑维修 -->
          <div class="glass-effect rounded-3xl p-6 card-hover scroll-animate scroll-animate-delay-1">
            <h2 class="text-2xl font-bold mb-4 transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">
              电脑配置编写及电脑维修
            </h2>
            <p class="text-base mb-6 transition-colors" :class="isDark ? 'text-white' : 'text-gray-700'">
              专业电脑配置方案与维修服务
            </p>
            <div class="flex flex-col gap-3">
              <!-- QQ联系按钮 -->
              <a
                href="tencent://message/?uin=2489043224&Site=&Menu=yes"
                class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight hover:bg-tokyo-night-blue0 border border-tokyo-night-blue' 
                  : 'bg-blue-50 hover:bg-blue-100 border border-blue-300'"
              >
                <svg class="w-5 h-5" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.64 6.12c-.15.42-.15.84-.15 1.26 0 2.86-2.17 6.14-6.14 6.14-1.22 0-2.35-.35-3.3-.96.17.02.34.03.52.03 1.02 0 2-.34 2.76-.93-.95-.02-1.76-.64-2.04-1.5.13.03.27.04.41.04.2 0 .39-.03.57-.08-1-.2-1.75-1.08-1.75-2.14v-.03c.3.17.64.27.99.28-.59-.39-.98-1.06-.98-1.82 0-.4.11-.78.3-1.11 1.07 1.31 2.67 2.17 4.47 2.26-.04-.17-.06-.35-.06-.53 0-1.28 1.04-2.32 2.32-2.32.67 0 1.27.28 1.69.73.53-.1 1.03-.3 1.48-.57-.17.53-.53.97-1 1.25.46-.05.89-.18 1.29-.36-.31.46-.7.86-1.15 1.19z"/>
                </svg>
                <span :class="isDark ? 'text-white' : 'text-gray-800'">QQ联系</span>
              </a>
              <!-- 邮箱联系按钮 -->
              <a
                href="mailto:dazidian@vip.qq.com"
                class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight hover:bg-tokyo-night-blue0 border border-tokyo-night-blue' 
                  : 'bg-blue-50 hover:bg-blue-100 border border-blue-300'"
              >
                <svg class="w-5 h-5" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span :class="isDark ? 'text-white' : 'text-gray-800'">邮箱联系</span>
              </a>
            </div>
          </div>

          <!-- 软件环境搭建及项目指导 -->
          <div class="glass-effect rounded-3xl p-6 card-hover scroll-animate scroll-animate-delay-2">
            <h2 class="text-2xl font-bold mb-4 transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">
              软件环境搭建及项目指导
            </h2>
            <p class="text-base mb-6 transition-colors" :class="isDark ? 'text-white' : 'text-gray-700'">
              专业软件开发环境配置与项目指导
            </p>
            <div class="flex flex-col gap-3">
              <!-- QQ联系按钮 -->
              <a
                href="tencent://message/?uin=2489043224&Site=&Menu=yes"
                class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight hover:bg-tokyo-night-blue0 border border-tokyo-night-blue' 
                  : 'bg-blue-50 hover:bg-blue-100 border border-blue-300'"
              >
                <svg class="w-5 h-5" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.64 6.12c-.15.42-.15.84-.15 1.26 0 2.86-2.17 6.14-6.14 6.14-1.22 0-2.35-.35-3.3-.96.17.02.34.03.52.03 1.02 0 2-.34 2.76-.93-.95-.02-1.76-.64-2.04-1.5.13.03.27.04.41.04.2 0 .39-.03.57-.08-1-.2-1.75-1.08-1.75-2.14v-.03c.3.17.64.27.99.28-.59-.39-.98-1.06-.98-1.82 0-.4.11-.78.3-1.11 1.07 1.31 2.67 2.17 4.47 2.26-.04-.17-.06-.35-.06-.53 0-1.28 1.04-2.32 2.32-2.32.67 0 1.27.28 1.69.73.53-.1 1.03-.3 1.48-.57-.17.53-.53.97-1 1.25.46-.05.89-.18 1.29-.36-.31.46-.7.86-1.15 1.19z"/>
                </svg>
                <span :class="isDark ? 'text-white' : 'text-gray-800'">QQ联系</span>
              </a>
              <!-- 邮箱联系按钮 -->
              <a
                href="mailto:dazidian@vip.qq.com"
                class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300"
                :class="isDark 
                  ? 'bg-tokyo-night-bg-highlight hover:bg-tokyo-night-blue0 border border-tokyo-night-blue' 
                  : 'bg-blue-50 hover:bg-blue-100 border border-blue-300'"
              >
                <svg class="w-5 h-5" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span :class="isDark ? 'text-white' : 'text-gray-800'">邮箱联系</span>
              </a>
            </div>
          </div>

          <!-- 数据恢复 -->
          <div class="glass-effect rounded-3xl p-6 card-hover scroll-animate scroll-animate-delay-3">
            <h2 class="text-2xl font-bold mb-4 transition-colors" :class="isDark ? 'text-tokyo-night-cyan' : 'text-blue-600'">
              数据恢复
            </h2>
            <p class="text-base mb-6 transition-colors" :class="isDark ? 'text-white' : 'text-gray-700'">
              专业数据恢复服务
            </p>
            <a
              href="https://qm.qq.com/q/xwSfZU52kE"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium transition-all duration-300"
              :class="isDark 
                ? 'bg-tokyo-night-blue hover:bg-tokyo-night-blue0 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.64 6.12c-.15.42-.15.84-.15 1.26 0 2.86-2.17 6.14-6.14 6.14-1.22 0-2.35-.35-3.3-.96.17.02.34.03.52.03 1.02 0 2-.34 2.76-.93-.95-.02-1.76-.64-2.04-1.5.13.03.27.04.41.04.2 0 .39-.03.57-.08-1-.2-1.75-1.08-1.75-2.14v-.03c.3.17.64.27.99.28-.59-.39-.98-1.06-.98-1.82 0-.4.11-.78.3-1.11 1.07 1.31 2.67 2.17 4.47 2.26-.04-.17-.06-.35-.06-.53 0-1.28 1.04-2.32 2.32-2.32.67 0 1.27.28 1.69.73.53-.1 1.03-.3 1.48-.57-.17.53-.53.97-1 1.25.46-.05.89-.18 1.29-.36-.31.46-.7.86-1.15 1.19z"/>
              </svg>
              <span>加入QQ群</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { isDark } = useTheme()
useScrollAnimation()
</script>

<style scoped>
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-8px);
}

.dark .card-hover:hover {
  box-shadow: 0 12px 40px rgba(122, 162, 247, 0.3);
}

.light .card-hover:hover {
  box-shadow: 0 12px 40px rgba(37, 99, 235, 0.2);
}
</style>


