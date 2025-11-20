<template>
  <footer class="mt-20 py-12 glass-effect-dark">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <!-- 左侧：Logo和信息 -->
        <div class="text-tokyo-night-fg">
          <div class="flex items-center space-x-4 mb-4">
            <img src="/img/LOGO.jpg" alt="Logo" class="w-16 h-16 rounded-full ring-2 ring-tokyo-night-blue" />
            <div>
              <h3 class="text-2xl font-bold text-tokyo-night-cyan">DaZiDian</h3>
              <p class="text-sm text-tokyo-night-fg-dark">DSMCC Corp. CEO</p>
            </div>
          </div>
          <p class="text-tokyo-night-fg-dark italic mb-4">
            —— 春風若有憐花意，可否許我再少年？
          </p>
          <p class="text-sm text-tokyo-night-dark5">
            DaZiDian & DSMCC ©2007-present All Copyrights Reserved.
          </p>
        </div>
        
        <!-- 右侧：联系方式 -->
        <div class="text-tokyo-night-fg">
          <h4 class="text-xl font-bold mb-6 text-tokyo-night-cyan">联系我 | Contact Me</h4>
          
          <!-- 社交链接网格 -->
          <div class="grid grid-cols-4 gap-3">
            <!-- QQ -->
            <a 
              :href="socialLinks.qq" 
              target="_blank"
              class="social-icon-link"
              title="QQ"
            >
              <div class="social-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39.595 39.595 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.835 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673z"/>
                </svg>
              </div>
            </a>
            
            <!-- 微信 -->
            <div 
              class="social-icon-link relative"
              @mouseenter="showQR('wechat')"
              @mouseleave="hideQR('wechat')"
              title="微信"
            >
              <div class="social-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.25 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.970-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .97.44.97.982a.976.976 0 0 1-.97.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                </svg>
              </div>
              <transition name="qr-fade">
                <div 
                  v-if="qrVisible.wechat" 
                  class="qr-popup"
                >
                  <img src="/img/wechat.png" alt="微信二维码" class="w-32 h-32 object-contain" />
                </div>
              </transition>
            </div>
            
            <!-- Bilibili -->
            <a 
              :href="socialLinks.bilibili" 
              target="_blank"
              class="social-icon-link"
              title="Bilibili"
            >
              <div class="social-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"/>
                </svg>
              </div>
            </a>
            
            <!-- GitHub -->
            <a 
              :href="socialLinks.github" 
              target="_blank"
              class="social-icon-link"
              title="GitHub"
            >
              <div class="social-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
            </a>
            
            <!-- 小红书 -->
            <div 
              class="social-icon-link relative"
              @mouseenter="showQR('xiaohongshu')"
              @mouseleave="hideQR('xiaohongshu')"
              title="小红书"
            >
              <div class="social-icon">
                <span class="text-sm font-bold">小红书</span>
              </div>
              <transition name="qr-fade">
                <div 
                  v-if="qrVisible.xiaohongshu" 
                  class="qr-popup"
                >
                  <img src="/img/小红书.jpg" alt="小红书二维码" class="w-32 h-32 object-contain" />
                </div>
              </transition>
            </div>
            
            <!-- YouTube -->
            <a 
              :href="socialLinks.youtube" 
              target="_blank"
              class="social-icon-link"
              title="YouTube"
            >
              <div class="social-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
            </a>
            
            <!-- Twitch -->
            <a 
              :href="socialLinks.twitch" 
              target="_blank"
              class="social-icon-link"
              title="Twitch"
            >
              <div class="social-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
              </div>
            </a>
            
            <!-- X (Twitter) -->
            <a 
              :href="socialLinks.x" 
              target="_blank"
              class="social-icon-link"
              title="X (Twitter)"
            >
              <div class="social-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
            </a>
            
            <!-- Email -->
            <a 
              :href="socialLinks.email" 
              class="social-icon-link"
              title="Email"
            >
              <div class="social-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
            </a>
            
            <!-- Discord -->
            <a 
              :href="socialLinks.discord" 
              target="_blank"
              class="social-icon-link"
              title="Discord"
            >
              <div class="social-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                </svg>
              </div>
            </a>
            
            <!-- Steam -->
            <a 
              :href="socialLinks.steam" 
              target="_blank"
              class="social-icon-link"
              title="Steam"
            >
              <div class="social-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
                </svg>
              </div>
            </a>
            
            <!-- Telegram -->
            <a 
              :href="socialLinks.telegram" 
              target="_blank"
              class="social-icon-link"
              title="Telegram"
            >
              <div class="social-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const socialLinks = {
  qq: 'http://wpa.qq.com/msgrd?v=3&uin=2489043224&site=qq&menu=yes',
  bilibili: 'https://space.bilibili.com/386254163',
  github: 'https://github.com/DaZiDian',
  youtube: 'https://www.youtube.com/@dazidian',
  twitch: 'https://www.twitch.tv/dazidian',
  x: 'https://x.com/dazidian',
  steam: 'https://steamcommunity.com/id/DaZiDian',
  email: 'mailto:dz1d07@outlook.com',
  discord: 'https://discordapp.com/users/daz1d1an',
  telegram: 'https://t.me/daz1d1an',
}

const qrVisible = ref({
  wechat: false,
  xiaohongshu: false,
})

const showQR = (platform) => {
  qrVisible.value[platform] = true
}

const hideQR = (platform) => {
  qrVisible.value[platform] = false
}
</script>

<style scoped>
/* Tokyo Night 风格社交图标 */
.social-icon-link {
  display: block;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.social-icon-link:hover {
  transform: translateY(-6px);
}

.social-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: rgba(122, 162, 247, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(122, 162, 247, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7aa2f7;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.social-icon:hover {
  background: rgba(122, 162, 247, 0.25);
  border-color: rgba(125, 207, 255, 0.4);
  color: #7dcfff;
  box-shadow: 0 8px 20px rgba(122, 162, 247, 0.3);
}

/* 二维码弹出框 */
.qr-popup {
  position: absolute;
  bottom: calc(100% + 0.75rem);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(41, 46, 66, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(122, 162, 247, 0.3);
  z-index: 50;
}

.qr-popup img {
  display: block;
  border-radius: 0.5rem;
}

/* 二维码动画 */
.qr-fade-enter-active {
  animation: qrFadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.qr-fade-leave-active {
  animation: qrFadeOut 0.2s ease-out;
}

@keyframes qrFadeIn {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes qrFadeOut {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.9);
  }
}
</style>

