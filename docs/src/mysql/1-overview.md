# 1. 概览
## 1.1. 什么是 MySQL
MySQL 是最流行的开源 SQL 数据库管理系统，由 Oracle Corporation 开发、分发和支持。

[MySQL](http://www.mysql.com/) 网站提供有关 MySQL 软件的最新信息。

+ **MySQL是一个数据库管理系统。**

    数据库是结构化的数据集合。它可以是任何东西，从简单的购物清单到图片库或公司网络中的大量信息。要添加、访问和处理存储在计算机数据库中的数据，你需要一个数据库管理系统，例如 MySQL Server。由于计算机非常擅长处理大量数据，因此数据库管理系统在计算中发挥着核心作用，无论是作为独立的实用程序，还是作为其他应用程序的一部分。
+ **MySQL数据库是关系数据库。**

    关系数据库将数据存储在单独的表中，而不是将所有数据放在一个大仓库中。数据库结构被组织成针对速度而优化的物理文件。逻辑模型包含数据库、表、视图、行和列等对象，提供了灵活的编程环境。你可以设置管理不同数据字段之间关系的规则，例如一对一、一对多、唯一、必需或可选，以及不同表之间的“指针”。数据库强制执行这些规则，因此使用设计良好的数据库，应用程序永远不会看到不一致、重复、孤立、过期或缺失的数据。

    “MySQL”的 SQL 部分代表“结构化查询语言”。SQL 是访问数据库最常用的标准化语言。根据你的编程环境，你可以直接输入 SQL（例如，生成报告），将 SQL 语句嵌入到用其他语言编写的代码中，或者使用隐藏 SQL 语法的特定语言 API。

    SQL 由 ANSI/ISO SQL 标准定义。SQL 标准自 1986 年以来不断发展，目前已有多个版本。在本手册中，“SQL-92”指的是 1992 年发布的标准，“SQL:1999”指的是 1999 年发布的标准，而“SQL:2003”指的是标准的当前版本。我们使用“SQL 标准”一词是指 SQL 标准在任何时候的当前版本。

+ **MySQL软件是开源的。**

    开源意味着任何人都可以使用和修改该软件。任何人都可以从互联网上下载 MySQL 软件并使用它，而无需支付任何费用。如果你愿意，你可以研究源代码并对其进行更改以满足你的需求。MySQL 软件使用 GPL（[GNU](http://www.fsf.org/licenses/) 通用公共许可证），来定义在不同情况下可以使用该软件能做什么和不能做什么。如果你对 GPL 感到不适，或者需要将 MySQL 代码嵌入到商业应用程序中，你可以从我们这里购买商业许可版本。有关更多信息，请参阅 [MySQL 许可概述](http://www.mysql.com/company/legal/licensing/)。

+ **MySQL 数据库服务器非常快速、可靠、可扩展且易于使用。**

    如果这正是你想要的，你就应该试试。MySQL Server 可以在台式机或笔记本电脑上舒适地运行，也可以与其他应用程序，Web 服务器等一起运行，几乎不需要关注。如果将整台计算机专用于 MySQL，则可以调整设置以利用所有可用的内存、CPU 处理能力和 I/O 容量。MySQL 还可以扩展到联网的机器集群。

    MySQL Server 最初是为了比现有解决方案更快地处理大型数据库而开发的，并且已在要求苛刻的生产环境中成功使用了数年。尽管在不断发展中，但今天的 MySQL Server 提供了一组丰富而有用的功能。它的连接性、速度和安全性使 MySQL Server 非常适合访问 Internet 上的数据库。
+ **MySQL Server 在 client/server 或嵌入式系统中工作。**

    MySQL 数据库软件是一个 client/server 系统，由支持不同后端的多线程 SQL 服务器、多个不同的客户端程序和库、管理工具以及广泛的应用程序编程接口（API）组成。

    我们还提供 MySQL Server 作为一个嵌入式多线程库，你可以将其链接到你的应用程序中，以获得更小、更快、更易于管理的独立产品。
+ **有大量的 MySQL 软件可供使用。**

    MySQL 服务器拥有一套与用户密切合作开发的实用功能。你最喜爱的应用程序或语言很可能支持 MySQL 数据库服务器。
+ **MySQL HeatWave。**

    MySQL HeatWave 是一种完全托管的数据库服务，由 HeatWave 内存查询加速器提供支持。它是唯一一款将事务、跨数据仓库和数据湖的实时分析以及机器学习整合到一个 MySQL 数据库中的云服务，而无需 ETL duplication 的复杂性、延迟、风险和成本。它可在 OCI、AWS 和 Azure 上使用。如需了解更多信息，请访问：[https://www.oracle.com/mysql/](https://www.oracle.com/mysql/)。

“MySQL”的官方发音是“My Ess Que Ell”（不是“my sequel”），但我们不介意你将其发音为“my sequel”或其他本地化方式。

## 1.2. MySQL 的主要功能
本节描述了 MySQL 数据库软件的一些重要特性。在大多数方面，路线图适用于 MySQL 的所有版本。有关按系列引入 MySQL 的功能的信息，请参阅相应手册的“简述”部分：
+ MySQL 8.0：[第 1.3 节 “MySQL 8.0 中的新功能”](https://dev.mysql.com/doc/refman/8.0/en/mysql-nutshell.html)
+ MySQL 5.7：[MySQL 5.7 中的新功能](https://dev.mysql.com/doc/refman/5.7/en/mysql-nutshell.html)

### 1.2.1. 内部结构和可移植性
+ 用 C 和 C++ 编写。
+ 使用各种不同的编译器进行测试。
+ 可在多种不同平台上使用。请参阅 [https://www.mysql.com/support/supportedplatforms/database.html](https://www.mysql.com/support/supportedplatforms/database.html)。
+ 为了便于移植，使用 `CMake` 进行配置。
+ 使用 Purify（商用内存泄漏检测器）以及 GPL 工具 [Valgrind](https://valgrind.org/) 进行测试。
+ 采用独立模块的多层服务器设计。
+ 设计为使用内核线程的完全多线程，可轻松使用多个可用 CPU。
+ 提供事务性和非事务性存储引擎。
+ 使用带有索引压缩的非常快速的 B 树磁盘表（ MyISAM ）。
+ 旨在使添加其他存储引擎变得相对容易。如果要为内部数据库提供 SQL 接口，这将非常有用。
+ 使用基于线程的快速内存分配系统。
+ 使用优化的嵌套循环连接，执行极快的连接。
+ 实现内存中的哈希表，作为临时表使用。
+ 使用高度优化的类库执行 SQL 函数，速度应尽可能快。查询初始化后通常不分配内存。
+ 将服务器作为一个单独的程序，供 client/server 网络环境使用。

### 1.2.2. 数据类型
+ 多种数据类型：1、2、3、4 和 8 字节长的有符号/无符号整数，[FLOAT](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html)、[DOUBLE](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html)、[CHAR](https://dev.mysql.com/doc/refman/8.0/en/char.html)、[VARCHAR](https://dev.mysql.com/doc/refman/8.0/en/char.html)、[BINARY](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html)、[VARBINARY](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html)、[TEXT](https://dev.mysql.com/doc/refman/8.0/en/blob.html)、[BLOB](https://dev.mysql.com/doc/refman/8.0/en/blob.html)、[DATE](https://dev.mysql.com/doc/refman/8.0/en/datetime.html)、[TIME](https://dev.mysql.com/doc/refman/8.0/en/time.html)、[DATETIME](https://dev.mysql.com/doc/refman/8.0/en/datetime.html)、[TIMESTAMP](https://dev.mysql.com/doc/refman/8.0/en/datetime.html)、[YEAR](https://dev.mysql.com/doc/refman/8.0/en/year.html)、[SET](https://dev.mysql.com/doc/refman/8.0/en/set.html)、[ENUM](https://dev.mysql.com/doc/refman/8.0/en/enum.html) 和 OpenGIS 空间类型。请参阅 [第 11 章 数据类型](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)。
+ 定长和变长字符串类型。

### 1.2.3. 语句和函数
+ 在查询的 `SELECT` 列表和 `WHERE` 子句中全面支持运算符和函数。例如：
    ```sql
    SELECT CONCAT(first_name, ' ', last_name)
    FROM citizen
    WHERE income/dependents > 10000 AND age > 30;
    ```
+ 完全支持 SQL `GROUP BY` 和 `ORDER BY` 子句。支持分组函数（[COUNT()](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_count)、[AVG()](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_avg)、[STD()](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_std)、[SUM()](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_sum)、[MAX()](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_max)、[MIN()](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_min) 和 [GROUP_CONCAT()](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_group-concat)）。
+ 支持标准 SQL 和 ODBC 语法的 `LEFT OUTER JOIN` 和 `RIGHT OUTER JOIN`。
+ 根据标准 SQL 的要求，支持表和列上的别名。
+ 支持 [DELETE](https://dev.mysql.com/doc/refman/8.0/en/delete.html)、[INSERT](https://dev.mysql.com/doc/refman/8.0/en/insert.html)、[REPLACE](https://dev.mysql.com/doc/refman/8.0/en/replace.html) 和 [UPDATE](https://dev.mysql.com/doc/refman/8.0/en/update.html) 来返回被更改(受影响)的行数，或者通过在连接服务器时设置标志来返回匹配的行数。
+ 支持特定于 MySQL 的 [SHOW](https://dev.mysql.com/doc/refman/8.0/en/show.html) 语句，用于检索数据库、存储引擎、表和索引的信息。支持根据标准 SQL 实现的 INFORMATION_SCHEMA 数据库。
+ [EXPLAIN](https://dev.mysql.com/doc/refman/8.0/en/explain.html) 语句，用于显示优化器如何解析查询。
+ 函数名与表名或列名无关。例如，ABS 是一个有效的列名。唯一的限制是，对于函数调用，函数名和后面的“(”之间不允许有空格。请参阅 [第 9.3 节“关键字和保留字”](https://dev.mysql.com/doc/refman/8.0/en/keywords.html)。
+ 你可以在同一语句中引用来自不同数据库的表。

### 1.2.4. 安全
+ 一个非常灵活、安全的权限密码系统，并且支持基于主机的验证。
+ 通过对连接服务器时的所有密码流量进行加密，确保密码安全。

### 1.2.5. 可扩展性和限制
+ 支持大型数据库。我们使用的 MySQL Server 数据库包含 5000 万条记录。我们还知道有些用户使用的 MySQL Server 包含 200,000 个表和大约 5,000,000,000 行。
+ 每个表最多支持 64 个索引。每个索引可由 1 到 16 列或部分列组成。[InnoDB](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html) 表的最大索引宽度为 767 字节或 3072 字节。请参阅 [第 15.22 节“InnoDB 限制”](https://dev.mysql.com/doc/refman/8.0/en/innodb-limits.html)。[MyISAM](https://dev.mysql.com/doc/refman/8.0/en/myisam-storage-engine.html) 表的最大索引宽度为 1000 字节。请参阅 [第 16.2 节“MyISAM 存储引擎”](https://dev.mysql.com/doc/refman/8.0/en/myisam-storage-engine.html)。对于 [CHAR](https://dev.mysql.com/doc/refman/8.0/en/char.html)、[VARCHAR](https://dev.mysql.com/doc/refman/8.0/en/char.html)、[BLOB](https://dev.mysql.com/doc/refman/8.0/en/blob.html) 或 [TEXT](https://dev.mysql.com/doc/refman/8.0/en/blob.html) 列类型，可以索引列的前缀。

### 1.2.6. 连接
+ 客户端可以使用多种协议连接到 MySQL Server：
    + 客户端可以在任何平台上使用 TCP/IP 套接字进行连接。
    + 在 Windows 系统上，如果服务器在启动时启用了 named_pipe 系统变量，客户端就可以使用命名管道进行连接。如果启用了 shared_memory 系统变量，Windows 服务器还支持共享内存连接。客户端可以使用 --protocol=memory 选项通过共享内存进行连接。
    + 在 Unix 系统上，客户端可以使用 Unix 域套接字文件进行连接。
+ MySQL客户端程序可以用多种语言编写。用 C 编写的客户端库可用于 C 或 C++ 编写的客户端，或提供 C 绑定的任何语言。
+ 提供了 C、C++、Eiffel、Java、Perl、PHP、Python、Ruby 和 Tcl 的 API，使 MySQL 客户端可以用多种语言编写。请参阅 [第 29 章 “连接器和 API”](https://dev.mysql.com/doc/refman/8.0/en/connectors-apis.html)。
+ Connector/ODBC（MyODBC）接口为使用 ODBC（开放数据库连接）连接的客户端程序提供 MySQL 支持。例如，你可以使用 MS Access 连接到 MySQL 服务器。客户端可以在 Windows 或 Unix 上运行。提供 Connector/ODBC 源代码。支持所有 ODBC 2.5 函数，以及许多其他函数。请参阅 [MySQL Connector/ODBC 开发人员指南](https://dev.mysql.com/doc/connector-odbc/en/)。
+ Connector/J 接口为使用 JDBC 连接的 Java 客户程序提供 MySQL 支持。客户端程序可在 Windows 或 Unix 上运行。提供 Connector/J 源代码。请参阅 [MySQL Connector/J 8.0 开发人员指南](https://dev.mysql.com/doc/connector-j/8.0/en/)。
+ MySQL Connector/NET 使开发人员能够轻松创建需要与 MySQL 进行安全、高性能数据连接的 .NET 应用程序。它实现了所需的 ADO.NET 接口，并集成到 ADO.NET 感知工具中。开发人员可以使用自己选择的 .NET 语言构建应用程序。MySQL Connector/NET 是一个完全托管的 ADO.NET 驱动程序，使用 100% 纯 C# 编写。请参阅 [MySQL Connector/NET 开发人员指南](https://dev.mysql.com/doc/connector-net/en/)。

### 1.2.7. 本地化
+ 服务器可以向客户端提供多种语言的错误消息。请参见 [第 10.12 节“设置错误消息语言”](https://dev.mysql.com/doc/refman/8.0/en/error-message-language.html)。
+ 完全支持多个不同的字符集，包括 latin1 (cp1252)、german、big5、ujis 和多个 Unicode 字符集等等。例如，表格和列名中允许使用 Scandinavian 字符 "å"、"ä "和 "ö"。
+ 所有数据均以所选字符集保存。
+ 排序和比较是根据默认的字符集和排序规则进行的。可以在启动 MySQL 服务器时更改此设置（请参阅 [第 10.3.2 节“服务器字符集和排序规则”](https://dev.mysql.com/doc/refman/8.0/en/charset-server.html)）。要查看非常高级的排序示例，请查看 Czech 排序代码。MySQL Server 支持许多不同的字符集，可以在编译时和运行时指定。
+ 服务器时区可动态更改，单个客户端可指定自己的时区。请参阅 [第 5.1.15 节 "MySQL 服务器时区支持"](https://dev.mysql.com/doc/refman/8.0/en/time-zone-support.html)。

### 1.2.8. 客户端和工具
+ MySQL 包括几个客户端和实用程序。这些程序包括命令行程序（如 [mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) 和 [mysqladmin](https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html)）和图形程序（如 [MySQL Workbench](https://dev.mysql.com/doc/refman/8.0/en/workbench.html)）。
+ MySQL Server 内置了用于检查、优化和修复表的 SQL 语句支持。这些语句可通过 [mysqlcheck](https://dev.mysql.com/doc/refman/8.0/en/mysqlcheck.html) 客户端在命令行中使用。MySQL 还包含一个非常快速的命令行实用程序 [myisamchk](https://dev.mysql.com/doc/refman/8.0/en/myisamchk.html)，用于在 MyISAM 表上执行这些操作。请参阅 [第 4 章 MySQL 程序](https://dev.mysql.com/doc/refman/8.0/en/programs.html)。
+ 在调用 MySQL 程序时，可以使用 `--help` 或 `-?` 选项来获取在线帮助。

## 1.3. MySQL 的历史
我们一开始打算使用 mSQL 数据库系统，用我们自己的快速底层（ISAM）例程连接到我们的表。然而，经过一些测试后，我们得出结论，mSQL 的速度和灵活性都不足以满足我们的需求。因此，我们为数据库设计了一个新的 SQL 接口，但其 API 接口与 mSQL 几乎相同。这样设计的目的是为了使用 mSQL 编写的第三方代码能够轻松移植到 MySQL 中。

MySQL 是以联合创始人 Monty Wyndius 的女儿 My 命名的。

MySQL Dolphin（我们的徽标）的名字是“Sakila”，这是从我们的“Name the Dolphin“竞赛中用户推荐的众多名字中选出的。获奖者是来自 Eswatini（原 Swaziland）的开源软件开发人员 Ambrose Twebaze。
