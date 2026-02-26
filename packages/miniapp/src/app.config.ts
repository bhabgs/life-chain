export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/memory/index',
    'pages/chat/index',
    'pages/profile/index',
    'pages/login/index',
  ],
  subPackages: [
    {
      root: 'subpackages/capture',
      pages: ['text/index', 'voice/index', 'photo/index'],
    },
    {
      root: 'subpackages/review',
      pages: ['timeline/index', 'summary/index'],
    },
    {
      root: 'subpackages/share',
      pages: ['card/index', 'invite/index'],
    },
    {
      root: 'subpackages/detail',
      pages: ['memory-detail/index', 'settings/index'],
    },
  ],
  tabBar: {
    color: '#8C8C8C',
    selectedColor: '#FF8A5B',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/tab-icons/home.png',
        selectedIconPath: 'assets/tab-icons/home-active.png',
      },
      {
        pagePath: 'pages/memory/index',
        text: '记忆',
        iconPath: 'assets/tab-icons/memory.png',
        selectedIconPath: 'assets/tab-icons/memory-active.png',
      },
      {
        pagePath: 'pages/chat/index',
        text: '对话',
        iconPath: 'assets/tab-icons/chat.png',
        selectedIconPath: 'assets/tab-icons/chat-active.png',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/tab-icons/profile.png',
        selectedIconPath: 'assets/tab-icons/profile-active.png',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FF8A5B',
    navigationBarTitleText: '生命链',
    navigationBarTextStyle: 'white',
  },
})
