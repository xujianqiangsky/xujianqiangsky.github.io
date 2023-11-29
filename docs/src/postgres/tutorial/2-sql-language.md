# SQL 语言
## 介绍
本章概述了如何使用 SQL 执行简单的操作。本教程仅用于向您介绍，绝不是有关 SQL 的完整教程。关于 SQL 的书籍很多，包括 [melt93](https://www.postgresql.org/docs/16/biblio.html#MELT93) 和 [date97](https://www.postgresql.org/docs/16/biblio.html#DATE97)。您应该知道，某些 PostgreSQL 语言功能是对标准的扩展。

在下面的示例中，我们假设您已经创建了一个名为 `mydb` 的数据库，如上一章所述，并且已经能够启动 psql。

本手册中的示例也可以在目录中 `src/tutorial/` 的 PostgreSQL 源代码分发中找到。（PostgreSQL 的二进制发行版可能不提供这些文件）。要使用这些文件，请先切换到该目录并运行 make：
```bash
cd .../src/tutorial
make
```
这将创建脚本并编译包含用户定义函数和类型的 C 文件。然后，要开始本教程，请执行以下操作：
```bash
psql -s mydb

...

mydb=> \i basics.sql
```
该 `\i` 命令从指定文件中读入命令。`psql` 的 `-s` 选项将您置于单步模式，该模式在将每个语句发送到服务器之前暂停。本节中使用的命令位于文件 `basics.sql` 中。

## 概念
PostgreSQL 是一个关系型数据库管理系统 （RDBMS）。这意味着它是一个用于管理存储在关系中的数据的系统。关系本质上是表的数学术语。在表中存储数据的概念在今天是如此普遍，以至于它本身似乎是显而易见的，但还有许多其他组织数据库的方法。类 Unix 操作系统上的文件和目录构成了分层数据库的一个例子。更现代的发展是面向对象的数据库。

每个表都是行的命名集合。给定表的每一行都有相同的命名列集，并且每列都具有特定的数据类型。虽然列在每行中都有固定的顺序，但重要的是要记住，SQL 不能以任何方式保证表中行的顺序（尽管可以显式排序以显示它们）。

表被分组到数据库中，由单个 PostgreSQL 服务器实例管理的数据库集合构成一个数据库集群。

## 创建新表
您可以通过指定表名以及所有列名及其类型来创建新表：
```sql
CREATE TABLE weather (
    city            varchar(80),
    temp_lo         int,           -- low temperature
    temp_hi         int,           -- high temperature
    prcp            real,          -- precipitation
    date            date
);
```
您可以使用换行符将其输入 `psql`。 `psql` 将识别该命令直到分号才终止。

空格（即空格、制表符和换行符）可以在 SQL 命令中自由使用。这意味着您可以键入与上面对齐的命令，甚至可以在一行上键入所有命令。两个破折号（“ -- ”）引入注释。它们后面的任何内容都会被忽略，直到行的末尾。SQL 对关键字和标识符不区分大小写，除非标识符被双引号以保留大小写（上面没有这样做）。

`varchar(80)` 指定可以存储长度不超过 80 个字符的任意字符串的数据类型。`int` 是正常的整数类型。`real` 是用于存储单精度浮点数的类型。`date` 应该是不言自明的。（是的，类型 `date` 列也被命名为 date 。这可能很方便，也可能令人困惑——你可以选择。）

PostgreSQL 支持标准的 SQL 类型 `int`、`smallint`、`real`、`double precision`、`char(N)`、`varchar(N)`、`date`、`time`、`timestamp` 和 `interval`，以及其他类型的通用实用程序和一组丰富的几何类型。PostgreSQL 可以使用任意数量的用户定义的数据类型进行自定义。因此，类型名称在语法中不是关键字，除非需要支持 SQL 标准中的特殊情况。

第二个示例将存储城市及其关联的地理位置：
```sql
CREATE TABLE cities (
    name            varchar(80),
    location        point
);
```
该 `point` 类型是特定于 PostgreSQL 的数据类型的一个示例。

最后，应该提到的是，如果您不再需要表或想要以不同的方式重新创建它，则可以使用以下命令将其删除：
```sql
DROP TABLE tablename;
```
## 用行填充表
该 `INSERT` 语句用于用行填充表：
```sql
INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');
```
请注意，所有数据类型都使用相当明显的输入格式。非简单数值的常量通常必须用单引号 （ ' ） 括起来，如示例中所示。该 `date` 类型实际上在接受的内容上非常灵活，但在本教程中，我们将坚持此处所示的明确格式。

该 `point` 类型需要一个坐标对作为输入，如下所示：
```sql
INSERT INTO cities VALUES ('San Francisco', '(-194.0, 53.0)');
```
到目前为止使用的语法要求您记住列的顺序。另一种语法允许您显式列出列：
```sql
INSERT INTO weather (city, temp_lo, temp_hi, prcp, date)
    VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');
```
如果您愿意，您可以按不同的顺序列出列，甚至可以省略某些列，例如，如果降水量未知：
```sql
INSERT INTO weather (date, city, temp_hi, temp_lo)
    VALUES ('1994-11-29', 'Hayward', 54, 37);
```
许多开发人员认为显式指明列比隐式依赖列的顺序的风格更好。

请输入上面显示的所有命令，以便在以下部分中使用一些数据。

您还可以使用 `COPY` 纯文本文件加载大量数据。这通常更快，因为该 `COPY` 命令针对此应用程序进行了优化，同时允许的灵活性低于 `INSERT`。例如：
```sql
COPY weather FROM '/home/user/weather.txt';
```
其中，源文件的文件名必须在运行后端进程的计算机上可用，而不是在客户端上可用，因为后端进程直接读取文件。您可以在 [COPY](https://www.postgresql.org/docs/16/sql-copy.html) 中阅读有关该 `COPY` 命令的更多信息。

## 查询表
若要从表中检索数据，需要查询该表。SQL `SELECT` 语句用于执行此操作。该语句分为选择列表（列出要返回的列的部分）、表列表（列出要从中检索数据的表的部分）和可选限定条件（指定任何限制的部分）。例如，要检索表 weather 的所有行，请键入：
```sql
SELECT * FROM weather;
```
这是 * 是“所有列”的简写。**^[2]^** 因此，以下情况将产生相同的结果：
```sql
SELECT city, temp_lo, temp_hi, prcp, date FROM weather;
```
输出应为：
```sql
     city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
 San Francisco |      43 |      57 |    0 | 1994-11-29
 Hayward       |      37 |      54 |      | 1994-11-29
(3 rows)
```
您可以在选择列表中编写表达式，而不仅仅是简单的列引用。例如，您可以执行以下操作：
```sql
SELECT city, (temp_hi+temp_lo)/2 AS temp_avg, date FROM weather;
```
这应该提供：
```sql
     city      | temp_avg |    date
---------------+----------+------------
 San Francisco |       48 | 1994-11-27
 San Francisco |       50 | 1994-11-29
 Hayward       |       45 | 1994-11-29
(3 rows)
```
请注意如何使用该 `AS` 子句重新标记输出列。（该 `AS` 子句是可选的）。

可以通过添加 `WHERE` 子句指定需要哪些行来“限定”查询。该 `WHERE` 子句包含一个布尔值（真值）表达式，并且仅返回布尔表达式为 true 的行。限定中允许使用常用的布尔运算符（ `AND`、`OR` 和 `NOT`）。例如，以下检索旧金山在雨天的天气：
```sql
SELECT * FROM weather
    WHERE city = 'San Francisco' AND prcp > 0.0;
```
结果：
```sql
     city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
(1 row)
```
您可以请求按排序顺序返回查询结果：
```sql
SELECT * FROM weather
    ORDER BY city;
```
```sql
     city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 Hayward       |      37 |      54 |      | 1994-11-29
 San Francisco |      43 |      57 |    0 | 1994-11-29
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
```
在此示例中，未完全指定排序顺序，因此您可以按任一顺序获取旧金山行。但是，如果您这样做，您将始终获得上面显示的结果：
```sql
SELECT * FROM weather
    ORDER BY city, temp_lo;
```
您可以请求从查询结果中删除重复的行：
```sql
SELECT DISTINCT city
    FROM weather;
```
```sql
     city
---------------
 Hayward
 San Francisco
(2 rows)
```
同样，结果行顺序可能会有所不同。您可以通过结合使用 `DISTINCT` 和 `ORDER BY` 组合来确保一致的结果：**^[3]^**
```sql
SELECT DISTINCT city
    FROM weather
    ORDER BY city;
```
---
::: details 阐述
**^[2]^** 虽然 `SELECT *` 它对于即兴查询很有用，但它在生产代码中被广泛认为是不好的风格，因为向表中添加列会改变结果。

**^[3]^** 在某些数据库系统中，包括旧版本的 PostgreSQL，`DISTINCT` 具备自动对行进行排序的实现 `ORDER BY` 是不必要的。但这不是 SQL 标准所要求的，当前的 PostgreSQL 不保证会导致 `DISTINCT` 行被排序。
:::

## 表之间的连接
到目前为止，我们的查询一次只访问一个表。查询可以一次访问多个表，也可以以同时处理表的多行的方式访问同一表。一次访问多个表（或同一表的多个实例）的查询称为连接查询。它们将一个表中的行与另一个表中的行合并，并使用一个表达式指定要配对的行。例如，要返回所有天气记录以及关联城市的位置，数据库需要将 `cities` 表中每一行的 `city` 列与 `weather` 表中每一行的 `name` 列进行比较，并选择这些值匹配的行对。**^[4]^** 这将通过以下查询完成：
```sql
SELECT * FROM weather JOIN cities ON city = name;
```
```sql
     city      | temp_lo | temp_hi | prcp |    date    |     name      | location
---------------+---------+---------+------+------------+---------------+-----------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27 | San Francisco | (-194,53)
 San Francisco |      43 |      57 |    0 | 1994-11-29 | San Francisco | (-194,53)
(2 rows)
```
注意有关结果集的两件事：
+ Hayward 没有结果行。这是因为 Hayward 在 `cities` 表中没有匹配的条目，因此连接会忽略 `weather` 表中不匹配的行。我们很快就会看到如何解决这个问题。
+ 有两列包含城市名称。这是正确的，因为 `weather` 和 `cities` 表中的列是串联的。但是，在实践中，这是不可取的，因此您可能希望显式列出输出列，而不是使用 `*` ：
    ```sql
    SELECT city, temp_lo, temp_hi, prcp, date, location
        FROM weather JOIN cities ON city = name;
    ```
由于这些列都有不同的名称，因此解析器会自动找到它们所属的表。如果两个表中存在重复的列名，则需要限定列名以显示您指的是哪一个，如下所示：
```sql
SELECT weather.city, weather.temp_lo, weather.temp_hi,
       weather.prcp, weather.date, cities.location
    FROM weather JOIN cities ON weather.city = cities.name;
```
人们普遍认为，在连接查询中限定所有列名是一种很好的方法，这样，如果以后将重复的列名添加到其中一个表中，查询就不会失败。

到目前为止看到的那种连接查询也可以用这种形式编写：
```sql
SELECT *
    FROM weather, cities
    WHERE city = name;
```
此语法早于 SQL-92 中引入的 `JOIN/ON` 语法。这些表只是在 `FROM` 子句中列出，比较表达式添加到 `WHERE` 子句中。这个旧的隐式语法和新的显式 `JOIN/ON` 语法的结果是相同的。但是对于查询的读者来说，显式的语法使其含义更容易理解：连接条件由其自己的关键字引入，而以前该条件与其他条件一起混合到 `WHERE` 子句中。

现在我们将弄清楚如何恢复 Hayward 的记录。我们希望查询执行的是扫描 `weather` 表，并为每一行查找匹配 `cities` 的行。如果没有找到匹配的行，我们希望用一些“空值”来代替 `cities` 表的列。这种查询称为外连接。（到目前为止，我们看到的连接是内部连接）。该命令如下所示：
```sql
SELECT *
    FROM weather LEFT OUTER JOIN cities ON weather.city = cities.name;
```
```sql
     city      | temp_lo | temp_hi | prcp |    date    |     name      | location
---------------+---------+---------+------+------------+---------------+-----------
 Hayward       |      37 |      54 |      | 1994-11-29 |               |
 San Francisco |      46 |      50 | 0.25 | 1994-11-27 | San Francisco | (-194,53)
 San Francisco |      43 |      57 |    0 | 1994-11-29 | San Francisco | (-194,53)
(3 rows)
```
此查询称为左外连接，因为连接运算符左侧提到的表在输出中每行至少具有一次，而右侧的表将仅具有与左侧表的某些行匹配的行输出。输出没有右表匹配的左表行时，将用空 （null） 值替换右表列。

练习：还有右外连接和全外连接。试着找出它们的作用。

我们也可以将一个表与自身连接起来。这称为自连接。例如，假设我们希望找到所有在其他天气记录温度范围内的天气记录。因此，我们需要将每个天气行的 `temp_lo` 和 `temp_hi` 列与所有其他天气行的 `temp_lo` 和 `temp_hi` 列进行比较。我们可以通过以下查询来实现这一点：
```sql
SELECT w1.city, w1.temp_lo AS low, w1.temp_hi AS high,
       w2.city, w2.temp_lo AS low, w2.temp_hi AS high
    FROM weather w1 JOIN weather w2
        ON w1.temp_lo < w2.temp_lo AND w1.temp_hi > w2.temp_hi;
```
```sql
     city      | low | high |     city      | low | high
---------------+-----+------+---------------+-----+------
 San Francisco |  43 |   57 | San Francisco |  46 |   50
 Hayward       |  37 |   54 | San Francisco |  46 |   50
(2 rows)
```
在这里，我们将天气表重新标记为 `w1` 和 `w2` 能够区分连接的左侧和右侧。您还可以在其他查询中使用这些类型的别名来保存一些类型，例如：
```sql
SELECT *
    FROM weather w JOIN cities c ON w.city = c.name;
```
您会经常遇到这种缩写风格。

---
::: details 阐述
**^[4]^** 这只是一个概念模型。连接的执行方式通常比实际比较每对可能的行更有效，但这对用户是不可见的。
:::

## 聚合函数
与大多数其他关系数据库产品一样，PostgreSQL 支持聚合函数。聚合函数从多个输入行计算单个结果。例如，有一些聚合可以计算一组行的 `count`、`sum`、`avg`（平均值）、 `max`（最大值）和 `min`（最小值）。

例如，我们可以在任何地方找到最高的低温 reading：
```sql
SELECT max(temp_lo) FROM weather;
```
```sql
 max
-----
  46
(1 row)
```
如果我们想知道 reading 发生在哪个城市（或多个城市），我们可以尝试：
```sql
SELECT city FROM weather WHERE temp_lo = max(temp_lo);     WRONG
```
但这行不通，因为聚合 `max` 不能在 `WHERE` 子句中使用。（之所以存在此限制，是因为该 `WHERE` 子句确定聚合计算中将包含哪些行;因此，必须在计算聚合函数之前对其进行评估。但是，通常情况下，可以重述查询以完成所需的结果，此处使用子查询：
```sql
SELECT city FROM weather
    WHERE temp_lo = (SELECT max(temp_lo) FROM weather);
```
```sql
     city
---------------
 San Francisco
(1 row)
```
这是可以的，因为子查询是一个独立的计算，它独立于外部查询中发生的情况计算自己的聚合。

聚合与 `GROUP BY` 子句结合使用也非常有用。例如，我们可以通过以下方法获得每个城市观察到的 readings 数和最高低温：
```sql
SELECT city, count(*), max(temp_lo)
    FROM weather
    GROUP BY city;
```
```sql
     city      | count | max
---------------+-------+-----
 Hayward       |     1 |  37
 San Francisco |     2 |  46
(2 rows)
```
这为我们提供了每个城市一个输出行。每个聚合结果都是在与该城市匹配的表行上计算的。我们可以使用以下命令 `HAVING` 过滤这些分组行：
```sql
SELECT city, count(*), max(temp_lo)
    FROM weather
    GROUP BY city
    HAVING max(temp_lo) < 40;
```
```sql
  city   | count | max
---------+-------+-----
 Hayward |     1 |  37
(1 row)
```
这仅为我们提供了所有 `temp_lo` 值都低于 40 的城市结果。最后，如果我们只关心名称以“`S`”开头的城市，我们可能会这样做：
```sql
SELECT city, count(*), max(temp_lo)
    FROM weather
    WHERE city LIKE 'S%'            -- (1)
    GROUP BY city;
```
```sql
     city      | count | max
---------------+-------+-----
 San Francisco |     2 |  46
(1 row)
```
[(1)](https://www.postgresql.org/docs/16/tutorial-agg.html#co.tutorial-agg-like) `LIKE` 运算符执行模式匹配，并在[第 9.7 节](https://www.postgresql.org/docs/16/functions-matching.html)中进行了说明。

理解聚合与 SQL 的 WHERE 和 HAVING 子句之间的交互非常重要。WHERE 和 HAVING 之间的根本区别在于： WHERE 在计算分组和聚合之前选择输入行（因此，它控制哪些行进入聚合计算），而 HAVING 在计算分组和聚合之后选择分组行。因此，WHERE 子句不得包含聚合函数;尝试使用聚合来确定哪些行将作为聚合的输入是没有意义的。另一方面，HAVING 子句始终包含聚合函数。（严格来说，你可以写一个 `HAVING` 不使用聚合的子句，但它很少有用。在 `WHERE` 阶段可以更有效地使用相同的条件。）

在前面的示例中，我们可以在 `WHERE` 中应用城市名称限制，因为它不需要聚合。这比将限制添加到 `HAVING` 更有效，因为我们避免了对所有未通过 `WHERE` 检查的行进行分组和聚合计算。

选择进入聚合计算的行的另一种方法是使用 `FILTER`，这是每个聚合选项：
```sql
SELECT city, count(*) FILTER (WHERE temp_lo < 45), max(temp_lo)
    FROM weather
    GROUP BY city;
```
```sql
     city      | count | max
---------------+-------+-----
 Hayward       |     1 |  37
 San Francisco |     1 |  46
(2 rows)
```
`FILTER` 与 `WHERE` 非常相似 ，只是它仅从它所附加到的特定聚合函数的输入中删除行。在这里， `count` 聚合仅计算 `temp_lo` 低于 45 的行;但 `max` 聚合仍应用于所有行，因此它仍然会找到 46 的读数。

## 更新
您可以使用该 `UPDATE` 命令更新现有行。假设您发现温度读数在 11 月 28 日之后都下降了 2 度。您可以按如下方式更正数据：
```sql
UPDATE weather
    SET temp_hi = temp_hi - 2,  temp_lo = temp_lo - 2
    WHERE date > '1994-11-28';
```
查看数据的新状态：
```sql
SELECT * FROM weather;

     city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
 San Francisco |      41 |      55 |    0 | 1994-11-29
 Hayward       |      35 |      52 |      | 1994-11-29
(3 rows)
```

## 删除
可以使用该 `DELETE` 命令从表中删除行。假设您不再对 Hayward 的天气感兴趣。然后，您可以执行以下操作从表中删除这些行：
```sql
DELETE FROM weather WHERE city = 'Hayward';
```
属于 Hayward 的所有天气记录都将被删除。
```sql
SELECT * FROM weather;
```
```sql
     city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
 San Francisco |      41 |      55 |    0 | 1994-11-29
(2 rows)
```
人们应该警惕这种形式的陈述：
```sql
DELETE FROM tablename;
```
如果没有限定，将从给定表中删除所有行， `DELETE` 将其留空。在执行此操作之前，系统不会要求确认！