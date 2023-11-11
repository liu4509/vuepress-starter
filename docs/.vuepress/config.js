import { defaultTheme } from "vuepress";
import { nprogressPlugin } from "@vuepress/plugin-nprogress";
export default {
  plugins: [nprogressPlugin()],
  // 站点配置
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    "/": {
      lang: "zh-CN",
      title: "刘治彬个人博客",
      description: "zsyghmz - 知识点总结",
    },
    "/US/": {
      lang: "en-US",
      title: "Liuzhibin Personal blog",
      description: "Summary of personal learning knowledge",
    },
  },
  // 默认主题配置
  theme: defaultTheme({
    locales: {
      "/": {
        selectLanguageName: "简体中文",
      },
      "/US/": {
        selectLanguageName: "English",
      },
    },
    home: "/",
    navbar: [
      // NavbarItem
      {
        text: "NodeJs",
        link: "/node/node/",
      },
      {
        text: "Java",
        link: "/java/java/",
      },
    ],
    // Public 文件路径
    logo: "/images/hero.png",
    // 如果你按照 `organization/repository` 的格式设置它
    // 我们会将它作为一个 GitHub 仓库
    repo: "https://github.com/liu4509",
    // repo 别名
    repoLabel: "GitHub",
    selectLanguageText: "选择语言",
    // 侧边栏配置
    // 侧边栏数组
    // 所有页面会使用相同的侧边栏
    sidebar: {
      // SidebarItem
      "/node/": [
        {
          text: "NodeJs",
          collapsible: true,
          children: ["/node/node/index.md"],
        },
        {
          text: "Express",
          collapsible: true,
          children: ["/node/express/index.md"],
        },
      ],
      "/java/": [
        {
          text: "Java",
          collapsible: true,
          children: ["/java/java/index.md"],
        },
      ],
    },
    // 设置根据页面标题自动生成的侧边栏的最大深度
    sidebarDepth: 2,
    //是否启用 编辑此页 链接
    editLink: true,
    // 编辑此页 链接的文字
    editLinkText: "编辑页面",
    // 是否启用 最近更新时间s戳
    lastUpdated: true,
    lastUpdatedText: "时间戳 ",
    tip: "tip",
  }),
};
