<template>
  <div class="glass-effect rounded-3xl p-8 card-hover scroll-animate scroll-animate-delay-4">
    <h2 class="text-3xl font-bold mb-6">
      <span class="title-reveal">音乐盒</span>
      <span class="text-xl transition-colors ml-3" :class="isDark ? 'text-tokyo-night-dark5' : 'text-gray-500'">🎵 Music Box</span>
    </h2>
    
    <div class="space-y-4">
      <div class="rounded-xl overflow-hidden shadow-lg">
        <iframe
          title="Spotify Embed: Recommendation Playlist"
          :src="spotifyUrl"
          width="100%"
          height="360"
          :style="{ minHeight: '360px', border: 'none', borderRadius: '12px' }"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
      
      <div class="text-center">
        <p class="font-medium transition-colors" :class="isDark ? 'text-white' : 'text-gray-800'">
          我的精选歌单
        </p>
        <p class="text-sm transition-colors" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
          Powered by Spotify | 本站支持 Dolby ATMOS 杜比全景声
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const { isDark } = useTheme()

const playlistId = '3zQObGbAKtWcGXBYqf60MX'

// 根据主题动态切换Spotify主题
const spotifyUrl = computed(() => {
  const theme = isDark.value ? '0' : '1' // 0 = dark theme, 1 = light theme
  return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=${theme}`
})
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

iframe {
  border-radius: 12px;
}
</style>
