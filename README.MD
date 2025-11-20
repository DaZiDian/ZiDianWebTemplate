# Z1D1anWeb - DaZiDian的个人网站

这是一个使用 Vue 3 + Vite 构建的现代化个人网站，部署在 Vercel 上。

## 🚀 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: Vue Router
- **部署**: Vercel

## 📦 安装依赖

```bash
npm install
```

## 🛠️ 本地开发

```bash
npm run dev
```

开发服务器将在 http://localhost:5173 启动

## 🏗️ 生产构建

```bash
npm run build
```

构建产物将生成在 `dist` 目录

## 👀 预览生产构建

```bash
npm run preview
```

## 🌐 部署到 Vercel

### 方式一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 方式二：通过 Git 集成

1. 将代码推送到 GitHub
2. 在 Vercel 上导入项目
3. Vercel 会自动检测配置并部署

## 📁 项目结构

```
dazidian.github.io/
├── img/                    # 图片资源
├── src/
│   ├── components/        # Vue 组件
│   │   ├── NavBar.vue    # 导航栏
│   │   ├── Footer.vue    # 页脚
│   │   └── LoadingScreen.vue  # 加载动画
│   ├── views/            # 页面视图
│   │   ├── Home.vue      # 主页
│   │   ├── About.vue     # 关于我
│   │   ├── Blog.vue      # 文章
│   │   └── Guestbook.vue # 留言板
│   ├── router/           # 路由配置
│   ├── App.vue           # 根组件
│   ├── main.js           # 入口文件
│   └── style.css         # 全局样式
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── vercel.json           # Vercel 配置

```

## ✨ 功能特性

### 1. 主页
- 个人简介和签名
- 技能展示（操作系统、编程语言）
- GitHub 统计卡片
- 代表作品展示
- 开发工具展示
- 音乐播放器（待开发）

### 2. 关于我
- 国家/地区信息
- 个人基本信息
- 设备配置详情
- 诗歌展示
- 毛玻璃背景悬浮效果

### 3. 个人作品
- 自动跳转到 GitHub 主页

### 4. 文章
- Markdown 格式文章展示
- 发布时间和地点
- 分页功能
- 支持后台管理（待开发）

### 5. 留言板
- 用户可选填写头像、昵称、性别、生日、邮箱
- 必填留言内容
- Cookie 保存用户信息
- LocalStorage 保存留言记录
- 回到顶部按钮

## 🎨 设计特色

- **毛玻璃效果**: 现代化的毛玻璃背景（backdrop-filter）
- **流畅动画**: 页面加载、页面切换、悬浮交互等动画效果
- **响应式设计**: 完美适配桌面端、平板和移动端
- **渐变配色**: 紫色到粉色的渐变主题
- **交互反馈**: 丰富的鼠标悬浮和点击反馈

## ⚡ 性能优化

- Vite 快速构建和热更新
- 按需加载路由组件
- Tailwind CSS PurgeCSS 优化
- 图片懒加载
- 现代浏览器优化（backdrop-filter、transform）

## 🔗 社交链接

- QQ: [2489043224](http://wpa.qq.com/msgrd?v=3&uin=2489043224&site=qq&menu=yes)
- Bilibili: [@DaZiDian](https://space.bilibili.com/386254163)
- GitHub: [@DaZiDian](https://github.com/DaZiDian)
- YouTube: [@dazidian](https://www.youtube.com/@dazidian)
- Twitch: [@dazidian](https://www.twitch.tv/dazidian)
- X (Twitter): [@dazidian](https://x.com/dazidian)
- Steam: [DaZiDian](https://steamcommunity.com/id/DaZiDian)
- Email: [dz1d07@outlook.com](mailto:dz1d07@outlook.com)
- Discord: [daz1d1an](https://discordapp.com/users/daz1d1an)
- Telegram: [@daz1d1an](https://t.me/daz1d1an)

## 📝 License

Copyright © 2007-present DaZiDian & DSMCC. All Rights Reserved.

---

**春風若有憐花意，可否許我再少年？**

---

## 原始需求文档

我想开发一个名为Z1D1anWeb的个人网站（类似CMS系统），使用Vite打包，并使用Vue3构建，需要注意的是我需要将网站部署在Vercel上，因此对于网站的性能占用要求严苛。

首先，我希望我的页面有五个部分组成，每个页面必须出现顶部菜单栏以及底部信息栏，同时使用媒体适配+折叠菜单来适配不同设备访问情况。这五个部分分别为：主页、关于我、个人作品、文章以及留言板。

当页面加载进入时，使用毛玻璃背景+进度条来展示内容加载状况，当加载完成时使用向外展开动画，显示出内容。

对于顶部栏，我要你实现流畅的展开和关闭动画，当出现折叠菜单按钮时，鼠标点击按钮即向两侧展开内容，当鼠标放置于链接上时，在链接底部出现向两侧展开的横条动画，移走时则向内收。当我访问到该页面的时候，我希望在该页面对应的链接按钮下方出现连续展开收起的线性动画。

所有外部图片我都存放到了img路径下，如果你在优化SEO考虑时需要更改路径，请保留其中的内容，再做修改。

对于底部栏，我希望你使用毛玻璃状态的圆角矩形，大概布局为这样：

使用[]扩充起来的部分均为图标形式，LOGO的尺寸请你帮我设计一下

部分链接URL如下：

QQ：http://wpa.qq.com/msgrd?v=3&uin=2489043224&site=qq&menu=yes

Bilibili: https://space.bilibili.com/386254163

Github:https://github.com/DaZiDian

YT:https://www.youtube.com/channel/@dazidian

Twitch：https://www.twitch.tv/dazidian

X：https://x.com/dazidian

Steam: https://steamcommunity.com/id/DaZiDian

Email：mailto:dz1d07@outlook.com

Discord:https://discordapp.com/users/daz1d1an

Telegram:https://t.me/daz1d1an

微信和小红书由于无法设置推送链接，请你设置将鼠标置于链接上方时，浮现二维码图片。



————————————————————————————————————————————————————

[LOGO]																													联系我 | Contact Me

DaZiDian																												 [QQ]  [WX] [Bilibili] [Github]

DSMCC Corp.  CEO																								[小红书] [YT] [Twitch] [X(Twitter)] 

—— 春風若有憐花意，可否許我再少年？														   [Email] [Discord] [Steam] [Telegram]

DaZiDian & DSMCC ©2007-present   All Copyrights Reserved.				

————————————————————————————————————————————————————



主页大致内容(矩形内容展之间适当间隔开并媒体适配)：

————————————————————————————————————————————————————

[圆形    	Hello,I'm DaZiDian~(艺术签名，并实现鼠标交互动态效果)

LOGO] 	春風若有憐花意，可否許我再少年？



[圆角矩形内容展1]

关于我 ABOUT ME

专业信息安全，主攻渗透测试、数据恢复、服务器运维、大数据、人工智能方向

[ENG VER]

[CN FLAG] 中国山东省青岛市 | Qingdao,Shandong,China

[BitrhdayICO] 丁亥年二月初八 | 2007.03.26

[BookICO] SDCIT





[圆角矩形内容展2]

我的技能 | My Skills

### 操作系统 | OS



[![Windows](https://camo.githubusercontent.com/c66e4fd953bf53e48a43623eebe8b278aac56305a1550a7121fd4ea13f1aaf47/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f57696e646f77732d3030373844363f6c6f676f3d6d6963726f736f6674266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/c66e4fd953bf53e48a43623eebe8b278aac56305a1550a7121fd4ea13f1aaf47/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f57696e646f77732d3030373844363f6c6f676f3d6d6963726f736f6674266c6f676f436f6c6f723d7768697465) [![Linux](https://camo.githubusercontent.com/46afb0e87c45f04b59e69e1651ed89b82472c5dd8737a1d2b85e0af56f63231b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e75782d4643433632343f6c6f676f3d6c696e7578266c6f676f436f6c6f723d626c61636b)](https://camo.githubusercontent.com/46afb0e87c45f04b59e69e1651ed89b82472c5dd8737a1d2b85e0af56f63231b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e75782d4643433632343f6c6f676f3d6c696e7578266c6f676f436f6c6f723d626c61636b)

### 常用开发语言 | Common Programming Languages



[![Java](https://camo.githubusercontent.com/3811b7669bd7be57c92195e6cebfb165c511a1284884e1abeab410ffc907a518/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176612d4544384230303f6c6f676f3d6f70656e6a646b266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/3811b7669bd7be57c92195e6cebfb165c511a1284884e1abeab410ffc907a518/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176612d4544384230303f6c6f676f3d6f70656e6a646b266c6f676f436f6c6f723d7768697465) [![JavaScript](https://camo.githubusercontent.com/ca688c6572c8847fa631bf9d3b947d11e6099599ccdbd07359aeaf076f6afd40/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4637444631453f6c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b)](https://camo.githubusercontent.com/ca688c6572c8847fa631bf9d3b947d11e6099599ccdbd07359aeaf076f6afd40/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4637444631453f6c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b) [![C#](https://camo.githubusercontent.com/68da16d46f3c5e480cf3c5badc960bca9b9b72632f63de93d69298b9070af11d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f432532332d3233393132303f6c6f676f3d632d7368617270266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/68da16d46f3c5e480cf3c5badc960bca9b9b72632f63de93d69298b9070af11d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f432532332d3233393132303f6c6f676f3d632d7368617270266c6f676f436f6c6f723d7768697465) [![C++](https://camo.githubusercontent.com/031a05448ceff403e911c5a84d28dc7baadf1be459f4076faa4050ea61de34ec/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f432b2b2d3030353939433f6c6f676f3d63253242253242266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/031a05448ceff403e911c5a84d28dc7baadf1be459f4076faa4050ea61de34ec/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f432b2b2d3030353939433f6c6f676f3d63253242253242266c6f676f436f6c6f723d7768697465) [![Vue.js](https://camo.githubusercontent.com/d321854306922a9e01a3eb114c668bd3f025f09b43a7a782b33cbd16c9fa8fa4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5675652e6a732d3446433038443f6c6f676f3d7675652e6a73266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/d321854306922a9e01a3eb114c668bd3f025f09b43a7a782b33cbd16c9fa8fa4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5675652e6a732d3446433038443f6c6f676f3d7675652e6a73266c6f676f436f6c6f723d7768697465) [![Python](https://camo.githubusercontent.com/3eb7efb30158d13c568ff5b3760336477b8ee3e46b7ba0ff77ef1a20bda5bb22/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f507974686f6e2d3337373641423f6c6f676f3d707974686f6e266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/3eb7efb30158d13c568ff5b3760336477b8ee3e46b7ba0ff77ef1a20bda5bb22/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f507974686f6e2d3337373641423f6c6f676f3d707974686f6e266c6f676f436f6c6f723d7768697465) [![TypeScript](https://camo.githubusercontent.com/d2b19c56bf530067483d8d2756fac7800e0aef54ef4360460d778c23ccc3db2b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d3331373843363f6c6f676f3d74797065736372697074266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/d2b19c56bf530067483d8d2756fac7800e0aef54ef4360460d778c23ccc3db2b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d3331373843363f6c6f676f3d74797065736372697074266c6f676f436f6c6f723d7768697465) [![ArkTS](https://camo.githubusercontent.com/f68333150ff6330cd0b2041198cc7c7a67392495deadb551470b7c7e43c28953/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f41726b54532d4646303030303f6c6f676f3d687561776569266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/f68333150ff6330cd0b2041198cc7c7a67392495deadb551470b7c7e43c28953/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f41726b54532d4646303030303f6c6f676f3d687561776569266c6f676f436f6c6f723d7768697465)

https://camo.githubusercontent.com/d39f15396c588788d223342a4cf0c08da5d783a1bce93a40db501eb5da67c944/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170693f757365726e616d653d44615a694469616e26636f756e745f707269766174653d74727565266c6f63616c653d636e267468656d653d746f6b796f6e69676874

(Github Status资料卡)



[圆角矩形内容展3]

我的代表作品 | My products

![image-20251120164205668](C:\Users\DaZiDian\AppData\Roaming\Typora\typora-user-images\image-20251120164205668.png)

(类似这种排布，链接如下)

[DaZiDian/StarWave-Dark](https://github.com/DaZiDian/StarWave-Dark)

[DaZiDian/Z1D1anSFW at master](https://github.com/DaZiDian/Z1D1anSFW/tree/master)

[DaZiDian/getMinecraftPython: 一个可以通过解析 JSON 得到Minecraft 官方源的 Python 脚本。| A Python script that can parse JSON to get the official source of Minecraft.](https://github.com/DaZiDian/getMinecraftPython)

[DaZiDian/LinHexShell](https://github.com/DaZiDian/LinHexShell)

[DaZiDian/DFC: 一个将办公文档转换为其他任意格式的文档的工具 | A tool to convert office documents into any other format.](https://github.com/DaZiDian/DFC)

[DaZiDian/zh_CN_NeoForgeDocumentation: The repository containing Neo's documentation](https://github.com/DaZiDian/zh_CN_NeoForgeDocumentation)



在这三个大圆角矩形下方放这样的小展示台，用于展示我的开发工具

[圆角正方形小型展示台1]

ICO1  VS Code

ICO2  Cursor

ICO3  Intellij IDEA

ICO4  Jupyter

ICO5  PyCharm

在小展示台的右侧放一个音乐盒，调用在线音乐库（如果是Spotify最好）

[在线音乐盒]

————————————————————————

[ICON] Music Box~									[Search]

[Music ICON]					

歌名 - 作者 - 专辑

[进度条]														[音量条]

————————————————————————

主页到此为止。



接着是关于我页面。使用多个毛玻璃圆角矩形来展示一些简单的信息，请你根据信息量大小来规划每个圆角矩形的大小和尺寸，做到乱而不散。部分存在于矩形内的背景，当鼠标悬浮在上方时才缓缓出现，鼠标移走则慢慢消失。

————————————————————————————————

[关于我 | ABOUT ME]

[圆角1]（背景为Qingdao.png，适当调整透明度）

Country/Region

People's Republic of CHINA

Qingdao,Shandong



[圆角2]（背景为info personal.png，并适当调整透明度）

🎂 2007.3.26

🩸 O

😇 INTJ

👀 5.2 / 5.3



[圆角3] （背景为Devices.png,并适当调整透明度）

💻Lenovo Thinkbook 16+ 2025

- Intel® Core™ Ultra 9 285H
- NVIDIA GeForce RTX 5060 Laptop
- Samsung DDR5 16G*2 5600MHz
- UMIS RPJYJ1T24RLS1QWY + KINGSTON SNV2S1000G

📱Xiaomi 12S Ultra Black 12+256G

<img src="D:\DSMCC\dazidian.github.io\img\cloud-server.png" alt="cloud-server" style="zoom:10%;" /> Home Server

- AMD® Ryzen™ 7 5700X
- Thermalright AQUA ELITE 360 WHITE ARGB
- ADATA XPG 16G*4 DDR4 3600MHz
- NVIDIA Tesla T4 16GB
- WD Blue SSD 1TB + WD Blue HDD 4TB*2

⌨Royal Kludge R98 + Logitech G G502 SE HERO

🎧EDIFIER Fit900NB



[圆角4] 

我不会写肉麻的话，就送你一首诗吧。



所有的结局都已写好

所有的泪水也都已启程

却忽然忘了是怎么样的一个开始

在那个古老的不再回来的夏日

无论我如何地去追索

年轻的你只如云影掠过

而你微笑的面容极浅极淡

逐渐隐没在日落后的群岚

遂翻开那发黄的扉页

命运将它装订的极为拙劣

含着泪 我一读再读

却不得不承认

青春是一本太仓促的书



关于我页面就是这样



个人作品页面请直接跳转到https://github.com/DaZiDian



文章页面请你使用MD的格式进行排布，同样使用圆角矩形毛玻璃作为作品的背景

统一按照以下格式来展示，并且我在后台可以随时修改内容。：

————————————————————————————

|  【TITLE】																						|

|	【发布时间】																				|

|	[正文]																							 |

|																										   |

|	[发布时归属地]																			 |

————————————————————————————



最后是留言板，我想让用户发布留言时，可以选择编辑以下内容：

头像、昵称、性别、生日、电子邮件

必须上传的内容：正文

用户可以考虑使用Cookie来保存发布时使用的信息。



以上就是网站的大致构想，请你按照我的要求来帮我实现。

如果需要什么预设的信息请告诉我

以下是来自GPT的构想：

# Z1D1anWeb 网站页面结构与组件说明

## 首页

- 视觉风格：现代简洁风格，背景使用轻盈渐变或大图，辅以鲜明点缀色，整体明亮活泼。（Modern minimalist style with a light gradient or large image background, accented by vibrant highlight colors, overall bright and lively.）
- 布局：响应式一列布局，在大屏下顶部导航、横幅、内容卡片依次垂直排列；手机端下所有内容垂直堆叠，保证可阅读性。（Responsive single-column layout: on large screens, the top navigation, banner, and content cards are stacked vertically; on mobile, all content stacks vertically for readability.）
- 顶部导航栏：包含 Logo 和导航链接，背景透明。滚动时导航背景启用毛玻璃（backdrop-filter）模糊效果。链接文字带下划线动画（scaleX 扩展效果）并在悬停时变色。（Top navigation bar with logo and links, featuring a transparent background. On scroll, the nav background applies a backdrop-filter frosted effect. Link texts have an underline animation (scaleX expansion) and change color on hover.）
- 轮播横幅（Hero Banner）：首页首屏大图或渐变背景，中央显示标语和 CTA 按钮。背景可使用 clip-path 实现波浪或多边形切割形状。按钮和标语出现时应用缓动（ease-in）动画。（Hero banner: a full-screen image or gradient background with centered slogan and CTA button. The background may use clip-path for wave or polygon shapes. The button and slogan appear with an ease-in entrance animation.）
- 简介毛玻璃卡片：横幅下方放置带有 backdrop-filter 高斯模糊效果的介绍卡片，包含站点简介文字。卡片带圆角和微弱投影，悬停时整体轻微放大（scale）以增加互动感。（Frosted glass intro card: below the banner, a card with a backdrop-filter Gaussian blur effect containing site introduction text. The card has rounded corners and a subtle shadow, slightly scaling up on hover to increase interactivity.）
- 作品展示卡片：展示主要项目或文章入口，使用对称网格排列。卡片背景可为玻璃质感或深色半透明，上部为缩略图，下部为标题和简介。卡片带圆角和阴影，鼠标悬停时整体微放大（scale）并加深阴影，提供平滑过渡动画。（Project showcase cards: display main projects or blog entries in a symmetric grid. Cards can have a glassy or dark semi-transparent background, with a thumbnail on top and title/description below. Cards have rounded corners and shadows; on hover they slightly scale up and the shadow deepens, with a smooth transition.）
- 底部栏：深色背景，包含版权信息和社交图标链接。社交图标在悬停时平滑变色，底部栏在页面加载时淡入出现。（Footer: dark background with copyright info and social icon links. Social icons smoothly change color on hover, and the footer fades in on page load.）
- 二维码悬浮卡片：屏幕角落悬浮一个小卡片，展示微信或联系方式二维码。默认半透明显示，鼠标悬停时沿一个方向展开（scaleX 或 scaleY），展示完整二维码，背景带毛玻璃效果。（Floating QR code card: a small card floating in a corner displaying a WeChat/contact QR code. Normally semi-transparent, on hover it expands (scaleX or scaleY) to show the full QR code, with a frosted backdrop effect.）
- 动态加载动画：页面加载时使用简洁加载动效，如顶部进度条（使用 scaleX 动画）或旋转图标。内容区在滚动到可视区域时可淡入加载，提升视觉流畅度。（Loading animation: use a simple loader when the homepage loads or switches, such as a progress bar (scaleX) or a spinning icon. Content areas can also fade in when scrolled into view to enhance smoothness.）

## 关于我

- 视觉风格：个人化和温暖的设计风格，色调柔和、明亮。背景使用浅色或渐变色，排版简洁，重点突出头像和文字内容。（Personal and warm design style with soft, bright color tones. The background uses light colors or gradients, layout is clean, highlighting the avatar and text content.）
- 布局：采用两列布局或多块卡片布局，左侧显示个人头像和简介，右侧为详细文字介绍和经历时间轴。布局响应式，手机端切换为单列显示以保证可阅读性。（Layout: a two-column or multi-card layout, with the left side showing a personal avatar and summary, and the right side containing detailed text and a timeline of experience. The layout is responsive, switching to a single column on mobile for readability.）
- 圆形头像展示区：在页面顶部或左侧展示个人头像，使用圆形边框并带有轻微阴影。头像可在载入或悬停时轻微放大（scale）突出视觉效果。（Circular avatar display area: shows the personal photo in a circular frame with a subtle shadow. The avatar may slightly scale up on load or hover to emphasize visual impact.）
- 个人简介与时间轴：使用卡片或列表形式展示教育经历和工作经历时间轴。卡片背景柔和，可带毛玻璃质感，时间轴节点出现时使用动画（如内容渐显、连线绘制）来丰富视觉效果。（Personal bio and timeline: presented as cards or a list with soft backgrounds (possibly frosted) containing education and work timelines. Timeline nodes can appear with animations (such as fade-in content or line drawing) to enrich the visuals.）
- 技能卡片或标签：展示技能或技术标签，卡片可为毛玻璃或彩色背景，带圆角和微弱阴影。卡片出现时使用 scale-in 动画，悬停时略微提升（translateY 或 scale）以增强交互感。（Skill cards or tags: display skill or technology tags with frosted or colored backgrounds, cards have rounded corners and subtle shadow. Cards use a scale-in animation on entry, and slightly lift (translateY or scale) on hover to enhance interactivity.）
- 项目链接按钮：指向作品集或外部项目的按钮，使用醒目的按钮样式，悬停或点击时有下沉/弹起动画。按钮可使用渐变背景，点击时有轻微按压（如收缩 box-shadow）动画反馈。（Project link buttons: buttons linking to portfolio or external projects, with prominent styling and hover/click animations. Buttons may have a gradient background, and on click use a slight press animation (e.g., shrinking box-shadow).）
- 底部栏：与首页相同的深色简约底部，包含联系信息和社交链接。社交图标悬停时颜色平滑变换，底部栏可在页面加载完成后淡入出现。（Footer: similar to the home page's dark minimal footer, containing contact info and social links. Social icons change color smoothly on hover, and the footer can fade in after the page loads.）

## 个人作品

- 视觉风格：现代简洁或深色主题，突出展示作品图片。常使用网格背景或无缝网格布局保持页面整洁。（Visual style: modern and clean or dark-themed, highlighting project images. Often use grid backgrounds or seamless grid layouts for a tidy feel.）
- 布局：多列响应式网格布局，在大屏幕上显示 3-4 列项目卡片，移动端显示 1 列或使用轮播查看更多项目。页面垂直滚动，项目卡片间距统一。（Layout: responsive multi-column grid layout, showing 3-4 columns of project cards on large screens, and 1 column or a carousel scroll on mobile. The page scrolls vertically with consistent spacing between cards.）
- 项目卡片：每个项目使用卡片组件，背景可为玻璃质感或深色半透明，上部为项目缩略图，下部为项目标题和简介。卡片带圆角和阴影，鼠标悬停时整体微放大（scale）并加深阴影，提供平滑过渡动画。（Project cards: each project is a card component with a glassy or dark semi-transparent background, showing a project thumbnail on top and title/description below. Cards have rounded corners and shadows; on hover they slightly scale up and the shadow deepens, with a smooth transition.）
- 过滤标签/分类：页面顶部或侧边添加项目分类标签或筛选按钮，标签可水平滚动或多行排列。标签悬停或选中时添加高亮边框或下划线动画（scaleX），帮助用户快速筛选感兴趣的作品。（Filter tags/categories: add project category tags or filter buttons at the top or side, arranged in a horizontal scroll or multiple rows. When a tag is hovered or selected, highlight it with a border or underline animation (scaleX) to help users quickly filter projects of interest.）
- 二维码/链接卡片：为每个项目提供可展开的二维码或链接卡片，点击或悬停时显示项目的 GitHub、演示链接或二维码。卡片可使用毛玻璃背景，展开/收缩时配合平滑动画（如 clip-path 演示形状展开）。 （QR/link card: provide an expandable QR or link card for each project, which shows GitHub, demo links, or a QR code on click or hover. The card can have a frosted background and use smooth expand/contract animations (e.g., using clip-path for shape expansion).）
- 动态加载动画：项目内容加载时显示骨架屏或进度条动画。在滚动加载更多项目时，对未进入视口的项目使用懒加载和淡入动画，提高页面性能。（Loading animations: display skeleton screens or a progress bar while project content loads. When scrolling, use lazy-loading and fade-in animations for projects that enter the viewport to improve performance.）

## 文章

- 视觉风格：简洁、阅读友好，背景降低分散注意力的元素（如浅色或米色背景，深色正文）。标题和重点文字使用强调色。（Visual style: clean and reader-friendly, background tones minimize distractions (e.g. light or beige background, dark body text). Highlight colors are used for headings and important text.）
- 布局：通常为两列或单列布局。文章分类或标签列表可在侧边显示，主内容区列出文章卡片。卡片显示封面图、标题和摘要。移动端自动切换为单列布局，每篇文章独占一行。（Layout: usually a two-column or single-column layout. Article categories or tag lists may be displayed in a sidebar, with the main content area listing article cards. Each card shows a cover image, title, and summary. On mobile, automatically switch to a single column so each article occupies a full row.）
- 文章卡片：使用白色或浅色背景的卡片，带阴影和圆角。卡片顶部为封面图，底部为标题和概述。标题悬停时会出现下划线并略微放大（使用 scaleX 效果），卡片初次加载时做淡入动画。（Article cards: cards with a white or light background, shadows and rounded corners. The top of the card is the cover image, and the bottom has the title and summary. On hover, the title displays an underline and slightly enlarges (using a scaleX effect), and cards can fade in when they first load.）
- 侧边导航与搜索：双栏布局时在侧边加入文章分类、标签云或搜索框。侧边栏可固定或可折叠，标签云悬停时可缩放或变色提示可点击性。（Sidebar navigation and search: in a two-column layout, add article categories, a tag cloud or a search box on one side. The sidebar may be fixed or collapsible, and tag clouds can scale or change color on hover to indicate clickability.）
- 文章详情页：正文采用宽内容区和易读字体，图片与代码块自适应宽度。图片使用懒加载和淡入效果。可设置目录组件（TOC）为固定定位，滚动时自动高亮当前章节，帮助快速跳转。（Article detail page: use a wide layout and readable fonts. Images and code blocks adapt to the width. Images use lazy loading and fade-in effects. A table of contents (TOC) can be fixed with scrolling highlight to help quick navigation.）
- 动态加载动画：打开文章列表或详情页时使用加载动画，分页加载更多文章时显示骨架屏。页面过渡使用平滑缓动（ease）效果，避免性能消耗大的复杂动画。（Loading animations: use loader animations when opening the article list or detail. Show skeleton screens when paginating or loading more. Use smooth easing transitions and avoid performance-heavy animations.）

## 留言板

- 视觉风格：友好、互动感强，使用明亮背景和卡片风格展示留言。整体风格与其他页面保持一致，留言卡可使用稍浅的毛玻璃背景。（Visual style: friendly and interactive, using bright background colors and card-style message boxes. The overall style remains consistent with other pages, but the comment cards may use a slightly lighter frosted background.）
- 布局：单列垂直布局，上方为留言表单，下方依次列出留言卡片。表单和留言列表垂直排列；移动端保持单列排布。页面固定一个“回到顶部”按钮以提高易用性。（Layout: single-column vertical layout, with a message form at the top and user message cards listed below. The form and message list are stacked vertically; on mobile it remains a single column. A fixed "back to top" button is provided for usability.）
- 留言表单：包括用户名、联系方式（如邮箱）和留言内容输入框，以及提交按钮。输入框使用卡片式或浮动标签样式，获取焦点时边框高亮或轻微放大来突出交互。提交按钮带点击动画反馈，如轻微按下效果。（Message form: includes fields for name, contact (e.g. email), and message content, along with a submit button. Input fields use a card-style or floating label design; on focus the border highlights or slightly enlarges to emphasize interactivity. The submit button has click feedback, such as a slight press animation.）
- 留言卡片：每条留言使用卡片组件，带毛玻璃效果或浅色背景。卡片内含留言者信息和留言内容，带阴影和圆角。鼠标悬停时卡片整体略微放大（scale）并加深阴影。发布成功后可使用气泡提示或短暂动画确认。（Message cards: each message is a card component with a frosted or light background. The card contains the commenter’s info and message text, with shadows and rounded corners. On hover, the whole card slightly scales up and the shadow deepens. After successful posting, a tooltip or brief animation can confirm the submission.）
- 动态加载动画：加载留言列表时使用骨架屏动画，新留言加载时淡入显示；滚动时对旧留言使用懒加载。（Loading animations: use skeleton screens while loading the message list, fade in new messages when paginating, and lazy-load older messages on scroll.）

## README.md

### 技术栈：

- 核心：Vue 3 + Vite + Tailwind CSS，构建现代响应式单页应用。（Core: Vue 3 + Vite + Tailwind CSS for building a modern responsive SPA.）
- 部署：使用 Vercel 部署，享受自动化构建与 CDN 加速。（Deployment: use Vercel for deployment, taking advantage of automated builds and CDN acceleration.）
- 其他：可选集成 TypeScript、Pinia/Vuex 管理状态，使用 Vue Router 实现路由。（Others: optionally integrate TypeScript, Pinia/Vuex for state management, and Vue Router for routing.）

### 安装与部署步骤：

1. 克隆仓库并进入项目目录。（Clone the repository and navigate to the project directory.）
2. 安装依赖：运行 `npm install`。（Install dependencies: run `npm install`.)
3. 本地开发：执行 `npm run dev` 启动开发服务器进行实时调试。（Local development: run `npm run dev` to start the development server for live debugging.）
4. 生产构建：执行 `npm run build` 生成生产环境静态文件。（Production build: run `npm run build` to generate production static files.）
5. 部署：使用 `vercel deploy` 或连接 GitHub 并在 Vercel 上自动部署。（Deploy: use `vercel deploy` or connect the repo to Vercel for automated deployment.）

### 性能优化建议：

- **图片优化**：使用现代图片格式（如 WebP、AVIF）并按需裁剪尺寸。对大尺寸图片使用懒加载(`loading="lazy"`)减少初始加载时间。（Image optimization: use modern image formats (WebP, AVIF) and crop images to needed sizes. Use lazy loading (`loading="lazy"`) for large images to reduce initial load time.）
- **按需加载与代码分割**：利用 Vite 的代码分割功能，通过动态 `import` 按需加载页面或组件，避免一次性加载过多 JS。（On-demand loading & code splitting: leverage Vite’s code-splitting to dynamically import pages or components as needed, preventing too much JS from loading at once.）
- **动画性能**：优先使用 CSS `transform` 和 `opacity` 进行动画，避免布局（layout）类属性动画。对频繁动画元素启用 `will-change: transform` 或 GPU 加速。使用合适缓动（ease）和时长，避免复杂的 JS 动画。（Animation performance: use CSS `transform` and `opacity` for animations instead of layout-related properties. Enable `will-change: transform` or GPU acceleration for frequently animated elements. Use appropriate easing and durations, and avoid complex JavaScript animations.）
- **Tailwind 优化**：生产构建时开启 Purge 去除未使用的 CSS 类，减小样式体积。使用 `@apply` 合并常用样式，减少重复。（Tailwind optimization: enable Purge during production builds to remove unused CSS classes, reducing bundle size. Use `@apply` to combine common utility classes and reduce duplication.）
- **SEO 优化**：使用语义化 HTML 元素和 meta 标签，保证移动端友好。为重要页面添加描述和关键词。配置预渲染或 SSR 生成静态内容，生成 Sitemap 和 robots.txt 提升搜索引擎收录。（SEO tips: use semantic HTML and meta tags, ensure mobile friendliness. Add descriptions and keywords for important pages. Set up pre-rendering or SSR for static content, and generate a sitemap and robots.txt to improve search engine indexing.）