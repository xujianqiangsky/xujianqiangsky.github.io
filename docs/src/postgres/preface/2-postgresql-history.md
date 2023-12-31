# 2. PostgreSQL 简史
对象关系数据库管理系统现在称为 PostgreSQL，它源自加州大学伯克利分校编写的 POSTGRES 包。经过数十年的发展，PostgreSQL 现在是世界上最先进的开源数据库。

## 2.1 伯克利 POSTGRES 项目
POSTGRES项目由 Michael Stonebraker 教授领导，由国防高级研究计划局（DARPA）、陆军研究办公室（ARO）、美国国家科学基金会（NSF）和 ESL,Inc 赞助。POSTGRES 的实施始于 1986 年。系统的初始概念在 [[ston86]](https://www.postgresql.org/docs/16/biblio.html#STON86) 中提出，初始数据模型的定义出现在 [[rowe87]](https://www.postgresql.org/docs/16/biblio.html#ROWE87) 中。当时的规则系统设计在 [[ston87a]](https://www.postgresql.org/docs/16/biblio.html#STON87A) 中进行了描述。存储管理器的基本原理和体系结构详见 [[ston87b]]。

从那时起，POSTGRES 经历了几个主要版本。第一个“演示软件”系统于 1987 年投入使用，并在 1988 年的 ACM-SIGMOD 会议上展出。版本 1 在 [[ston90a]](https://www.postgresql.org/docs/16/biblio.html#STON90A) 中描述，于 1989 年 6 月发布给一些外部用户。为了回应对第一个规则系统（[[ston89]](https://www.postgresql.org/docs/16/biblio.html#STON89)）的批评，规则系统被重新设计（[[ston90b]](https://www.postgresql.org/docs/16/biblio.html#STON90B)），并于1990年6月发布了第2版，其中包含新的规则系统。版本 3 出现在 1991 年，增加了对多个存储管理器的支持、改进的查询执行器和重写的规则系统。在大多数情况下，Postgres95 之前的后续版本（见下文）都侧重于可移植性和可靠性。

POSTGRES 已被用于实现许多不同的研究和生产应用程序。其中包括：财务数据分析系统、喷气发动机性能监测包、小行星跟踪数据库、医疗信息数据库和多个地理信息系统。POSTGRES 也被几所大学用作教育工具。最后，Illustra Information Technologies（后来并入 [Informix](https://www.ibm.com/analytics/informix)，现在归 [IBM](https://www.ibm.com/) 所有）获得了代码并将其商业化。1992 年末，POSTGRES 成为 [Sequoia 2000 科学计算项目](http://meteora.ucsd.edu/s2k/s2k_home.html) 的主要数据管理器。

1993 年，外部用户群体的规模几乎翻了一番。越来越明显的是，原型代码的维护和支持占用了本应用于数据库研究的大量时间。为了减轻这种支持负担，Berkeley POSTGRES 项目在 4.2 版正式结束。

## 2.2 Postgres95 
1994 年，Andrew Yu 和 Jolly Chen 向 POSTGRES 添加了一个 SQL 语言解释器。Postgres95 随后以新名称发布到网络上，作为原始 POSTGRES Berkeley 代码的开源后代在世界上找到了自己的方式。

Postgres95 代码完全是 ANSI C，大小缩小了 25%。许多内部更改提高了性能和可维护性。与 POSTGRES 版本 4.2 相比，Postgres95 版本 1.0.x 在威斯康星基准测试中的运行速度提高了约 30-50%。除了错误修复外，以下是主要增强功能：
+ 查询语言 PostQUEL 已替换为 SQL（在服务器中实现）。（接口库 libpq 以 PostQUEL 命名）。在 PostgreSQL 之前不支持子查询（见下文），但可以在 Postgres95 中使用用户定义的 SQL 函数来模仿它们。重新实现了聚合函数。还添加了对 GROUP BY 查询子句的支持。
+ 为交互式 SQL 查询提供了一个新程序 （psql），它使用了 GNU Readline。这在很大程度上取代了旧的监视器程序。
+ 新的前端库 ， libpgtcl 支持基于 Tcl 的客户端。示例 shell pgtclsh 提供了新的 Tcl 命令，用于将 Tcl 程序与 Postgres95 服务器连接起来。
+ 对大型对象界面进行了大修。反转大型对象是存储大型对象的唯一机制。（删除了反转文件系统）。
+ 删除了实例级规则系统。规则仍可作为重写规则使用。
+ 一个简短的教程介绍了常规 SQL 功能以及 Postgres95 的功能，并随源代码一起分发。
+ GNU make（而不是 BSD make）用于构建。此外，Postgres95 可以使用未修补的 GCC 进行编译（双精度的数据对齐已修复）。

## 2.3 PostgreSQL
到 1996 年，很明显“Postgres95”这个名字经不起时间的考验。我们选择了一个新名称 PostgreSQL，以反映原始 POSTGRES 与具有 SQL 功能的最新版本之间的关系。同时，我们将版本编号设置为从 6.0 开始，将数字放回最初由 Berkeley POSTGRES 项目开始的序列中。

许多人继续将 PostgreSQL 称为“Postgres”（现在很少全部大写），因为传统或因为它更容易发音。这种用法被广泛接受为昵称或别名。

Postgres95 开发过程中的重点是识别和理解服务器代码中存在的问题。在 PostgreSQL 中，重点已经转移到增强特性和功能上，尽管所有领域的工作仍在继续。

从那时起，PostgreSQL中发生的事情的细节可以在 [附录E](https://www.postgresql.org/docs/16/release.html) 中找到。