import { defineConfig } from 'vitepress'
import supPlugin from 'markdown-it-sup'
import navConfig from './configs/nav-config'
import postgresItems from './configs/postgres-config'
import mysqlItems from './configs/mysql-config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-cmn-Hans-CN',
  title: "JQM",
  titleTemplate: ':title - JQM',
  description: "JQM 文档便捷查询",
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }]],
  cleanUrls: true,
  srcDir: 'src',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      src: '/logo.svg',
      alt: 'JQM'
    },
    nav: navConfig,
    sidebar: {
      '/postgres/': {base: '/postgres/', items: postgresItems },
      '/mysql/': { base: '/mysql/', items: mysqlItems }
    },
    outline: {
      label: '本页目录',
      level: 'deep'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xujianqiangsky' }
    ],
    footer: {
      message: 'Released under the GPL-3.0 License.',
      copyright: 'Copyright © 2023-present Jianqiang Xu'
    },
    lastUpdated: {
      text: '最近更新时间',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
        timeZone: 'Asia/Shanghai'
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    returnToTopLabel: '返回顶部',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  },
  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(supPlugin)
    }
  }
})
