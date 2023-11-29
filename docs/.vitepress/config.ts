import { defineConfig } from 'vitepress'
import supPlugin from 'markdown-it-sup'

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
    nav: [
      { text: '首页', link: '/' }
    ],
    sidebar: [
      {
        text: 'PostgreSQL',
        collapsed: true,
        items: [
          {
            text: '前言',
            collapsed: true,
            items: [
              { text: '1. 什么是 PostgreSQL', link: '/postgres/preface/1-what-is-postgresql' },
              { text: '2. PostgreSQL 简史', link: '/postgres/preface/2-postgresql-history' },
              { text: '3. 约定', link: '/postgres/preface/3-conventions' }
            ]
          },
          {
            text: 'I. 教程',
            collapsed: true,
            items: [
              { text: '1. 快速开始', link: '/postgres/tutorial/1-getting-started' },
              { text: '2. SQL 语言', link: '/postgres/tutorial/2-sql-language' },
              { text: '3. 高级特性', link: '/postgres/tutorial/3-advanced-features' },
            ]
          }
        ]
      }
    ],
    outline: {
      label: '目录'
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
              closeText: '退出'
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