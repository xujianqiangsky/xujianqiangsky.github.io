export default {
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
        link: '/postgres/1-tutorial/index',
        collapsed: true,
        items: [
          { text: '1. 快速开始', link: '/postgres/1-tutorial/1-getting-started' },
          { text: '2. SQL 语言', link: '/postgres/1-tutorial/2-sql-language' },
          { text: '3. 高级特性', link: '/postgres/1-tutorial/3-advanced-features' },
        ]
      },
      {
        text: 'II. SQL 语言',
        link: '/postgres/2-sql-language/index',
        collapsed: true,
        items: [
          { text: '4. SQL 语法', link: '/postgres/2-sql-language/4-sql-syntax' }
        ]
      }
    ]
  }