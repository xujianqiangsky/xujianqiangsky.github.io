# 高级特性
## 介绍
在上一章中，我们介绍了使用 SQL 在 PostgreSQL 中存储和访问数据的基础知识。现在，我们将讨论 SQL 的一些更高级的功能，这些功能可简化管理并防止数据丢失或损坏。最后，我们将看看一些 PostgreSQL 扩展。

本章有时会引用 [第 2 章](/postgres/tutorial/2-sql-language) 中的示例来更改或改进它们，因此阅读该章会很有用。本章中的一些示例也可以在 `advanced.sql` 教程目录中找到。此文件还包含一些要加载的示例数据，此处不再赘述。（有关如何使用该文件，请参阅 [第 2.1 节](/postgres/tutorial/2-sql-language#概念)。）

## 视图
请参考 [第 2.6 节](/postgres/tutorial/2-sql-language#表之间的连接) 中的查询。假设天气记录和城市位置的组合列表对您的应用程序特别重要，但您不想每次需要时都键入查询。您可以创建查询视图，该视图为查询提供一个名称，您可以像普通表一样引用该名称：
```sql
CREATE VIEW myview AS
    SELECT name, temp_lo, temp_hi, prcp, date, location
        FROM weather, cities
        WHERE city = name;

SELECT * FROM myview;
```
自由使用视图是良好 SQL 数据库设计的一个关键方面。视图允许您封装表结构的详细信息，这些详细信息可能会随着应用程序的发展而更改，隐藏在一致的接口后面。

视图几乎可以在实际表的任何地方使用。在其他视图上建立视图并不少见。

## 外键
回想一下 [第 2 章](/postgres/tutorial/2-sql-language) 中的 `weather` 和 `cities` 表。请考虑以下问题：您希望确保任何人都不能在 `weather` 表中插入 `cities` 表中没有匹配条目的行。这称为维护数据的引用完整性。在简单的数据库系统中，这将通过查看 `cities` 表以检查是否存在匹配的记录，然后插入或拒绝新 `weather` 记录来实现（如果有的话）。这种方法有很多问题，而且非常不方便，所以 PostgreSQL 可以为你做这件事。

表的新声明如下所示：
```sql
CREATE TABLE cities (
        name     varchar(80) primary key,
        location point
);

CREATE TABLE weather (
        city      varchar(80) references cities(name),
        temp_lo   int,
        temp_hi   int,
        prcp      real,
        date      date
);
```
现在尝试插入无效记录：
```sql
INSERT INTO weather VALUES ('Berkeley', 45, 53, 0.0, '1994-11-28');
```
```sql
ERROR:  insert or update on table "weather" violates foreign key constraint "weather_city_fkey"
DETAIL:  Key (city)=(Berkeley) is not present in table "cities".
```
外键的行为可以根据您的应用程序进行微调。在本教程中，我们不会超出这个简单的示例，您可以参考 [第 5 章](#) 以获取更多信息。正确使用外键肯定会提高数据库应用程序的质量，因此强烈建议您了解它们。

## 事务
事务是所有数据库系统的基本概念。事务的要点是它将多个步骤捆绑到一个单一的、全有或全无的操作中。步骤之间的中间状态对其他并发事务不可见，如果发生某些故障而阻止事务完成，则这些步骤都不会影响数据库。

例如，考虑一个银行数据库，其中包含各种客户帐户的余额，以及分支机构的总存款余额。假设我们想记录从 Alice 的账户到 Bob 的账户的 100.00 美元的付款。用于此的 SQL 命令可能如下所示：
```sql
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
UPDATE branches SET balance = balance - 100.00
    WHERE name = (SELECT branch_name FROM accounts WHERE name = 'Alice');
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Bob';
UPDATE branches SET balance = balance + 100.00
    WHERE name = (SELECT branch_name FROM accounts WHERE name = 'Bob');
```
这些命令的细节在这里并不重要;重要的一点是，要完成这个相当简单的操作，需要几个单独的更新。我们银行的官员希望得到保证，要么所有这些更新都会发生，要么都不会发生。如果系统故障导致 Bob 收到 100.00 美元，而这笔钱没有从 Alice 那里扣除，这肯定是行不通的。如果 Alice 在没有记入 Bob 的情况下被扣款，她也不会长期保持快乐。我们需要保证，如果在操作过程中出现问题，到目前为止执行的任何步骤都不会生效。将更新分组到事务中为我们提供了这种保证。交易被称为原子：从其他交易的角度来看，它要么完全发生，要么根本不发生。

我们还希望得到保证，一旦交易完成并被数据库系统确认，它确实已被永久记录，即使此后不久发生崩溃也不会丢失。例如，如果我们记录了 Bob 的现金提取，我们不希望他账户的借方在他走出银行门后立即崩溃消失。事务数据库保证在报告事务完成之前，事务所做的所有更新都记录在永久存储（即磁盘上）中。

事务数据库的另一个重要属性与原子更新的概念密切相关：当多个事务同时运行时，每个事务都不应该看到其他人所做的不完整更改。例如，如果一个交易正忙于汇总所有分行余额，则它不会包括 Alice 分行的借方，但不包括 Bob 分行的贷方，反之亦然。因此，事务必须要么全有，要么全无，这不仅取决于它们对数据库的永久影响，还取决于它们发生时的可见性。到目前为止，打开的事务所做的更新对其他事务不可见，直到事务完成，因此所有更新同时可见。

在 PostgreSQL 中，事务是通过在事务的 SQL 命令周围加上 BEGIN 和 COMMIT 命令来建立的。所以我们的银行交易实际上是这样的：
```sql
BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
-- etc etc
COMMIT;
```
如果在交易进行到一半时，我们决定不想提交（也许我们刚刚注意到 Alice 的余额变为负数），我们可以发出命令 `ROLLBACK` 而不是 `COMMIT`，到目前为止，我们所有的更新都将被取消。

PostgreSQL 实际上将每个 SQL 语句视为在事务中执行。如果不发出 `BEGIN` 命令，则每个单独的语句都有一个隐式的 `BEGIN` 和 `COMMIT`。由 `BEGIN` 和 `COMMIT` 包围的一组语句有时称为事务块。

> **注意：** 某些客户端库会自动发出 `BEGIN` 和 `COMMIT` 命令，因此您可以在不询问的情况下获得事务块的效果。查看您正在使用的接口文档。

可以通过使用保存点以更细粒度的方式控制事务中的语句。保存点允许您有选择地丢弃事务的某些部分，同时提交其余部分。使用 `SAVEPOINT` 定义保存点后，如果需要，可以使用 `ROLLBACK TO` 回滚到保存点。在定义保存点和回滚到保存点之间，事务的所有数据库更改都将被丢弃，但保存点之前的更改将被保留。

回滚到保存点后，它将继续被定义，因此您可以多次回滚到它。相反，如果您确定不需要再次回滚到特定的保存点，则可以释放该保存点，这样系统就可以释放一些资源。请记住，释放或回滚到保存点将自动释放在它之后定义的所有保存点。

所有这些都发生在事务块内，因此对其他数据库会话不可见。当您提交事务块时，已提交的操作将作为一个单元对其他会话可见，而回滚的操作则永远不可见。

记住银行数据库，假设我们从 Alice 的账户中借记 100 美元，贷记 Bob 的账户，但后来发现我们应该贷记 Wally 的账户。我们可以这样使用保存点：
```sql
BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
SAVEPOINT my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Bob';
-- oops ... forget that and use Wally's account
ROLLBACK TO my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Wally';
COMMIT;
```
当然，这个例子过于简化了，但是通过使用保存点，在事务块中可以进行很多控制。此外，`ROLLBACK TO` 是重新获得对由于错误而被系统置于中止状态的事务块的控制的唯一方法，而不是完全回滚并重新开始。

## 窗口函数
窗口函数在一组与当前行有某种关系的表行之间执行计算。这与可以用聚合函数完成的计算类型相当。但是，窗口函数不会像非窗口聚合调用那样将行分组到单个输出行中。相反，行保留其单独的标识。在后台，窗口函数能够访问的不仅仅是查询结果的当前行。

下面是一个例子，展示了如何将每个员工的工资与他或她所在部门的平均工资进行比较：
```sql
SELECT depname, empno, salary, avg(salary) OVER (PARTITION BY depname) FROM empsalary;
```
```sql
  depname  | empno | salary |          avg
-----------+-------+--------+-----------------------
 develop   |    11 |   5200 | 5020.0000000000000000
 develop   |     7 |   4200 | 5020.0000000000000000
 develop   |     9 |   4500 | 5020.0000000000000000
 develop   |     8 |   6000 | 5020.0000000000000000
 develop   |    10 |   5200 | 5020.0000000000000000
 personnel |     5 |   3500 | 3700.0000000000000000
 personnel |     2 |   3900 | 3700.0000000000000000
 sales     |     3 |   4800 | 4866.6666666666666667
 sales     |     1 |   5000 | 4866.6666666666666667
 sales     |     4 |   4800 | 4866.6666666666666667
(10 rows)
```
前三个输出列直接来自表 `empsalary`，并且中的每一行都有一个输出行。第四列表示与当前行具有相同 `depname` 值的所有表行的平均值。（这实际上是与非窗口函数 `avg` 聚合函数相同，但 `OVER` 子句使其被视为窗口函数并跨窗口框架计算。）

窗口函数调用始终包含紧跟窗口函数名称和参数的 `OVER` 子句。这就是它在语法上与普通函数或非窗口聚合的区别。该 `OVER` 子句确切地确定如何拆分查询的行以供窗口函数处理。`OVER` 中的 `PARTITION BY` 子句将行划分为组或分区，这些组或分区共享 `PARTITION BY` 相同的表达式值。对于每一行，将跨与当前行属于同一分区的行计算窗口函数。

您还可以使用 `OVER` 中的 `ORDER BY` 控制窗口函数处理行的顺序。（窗口 `ORDER BY` 甚至不必与行的输出顺序匹配。）下面是一个示例：
```sql
SELECT depname, empno, salary,
       rank() OVER (PARTITION BY depname ORDER BY salary DESC)
FROM empsalary;
```
```sql
  depname  | empno | salary | rank
-----------+-------+--------+------
 develop   |     8 |   6000 |    1
 develop   |    10 |   5200 |    2
 develop   |    11 |   5200 |    2
 develop   |     9 |   4500 |    4
 develop   |     7 |   4200 |    5
 personnel |     2 |   3900 |    1
 personnel |     5 |   3500 |    2
 sales     |     1 |   5000 |    1
 sales     |     4 |   4800 |    2
 sales     |     3 |   4800 |    2
(10 rows)
```
如此处所示，该 `rank` 函数使用 `ORDER BY` 子句定义的顺序为当前行分区中的每个非重复 `ORDER BY` 值生成数字排名。 `rank` 不需要显式参数，因为它的行为完全由 `OVER` 子句决定。

窗口函数所考虑的行是由查询的 `FROM` 子句产生的“虚拟表”中的行，这些表由查询的 `WHERE`、`GROUP BY` 和 `HAVING` 子句（如果有的话）过滤。例如，由于不满足 `WHERE` 条件而被删除的行不会被任何窗口函数看到。一个查询可以包含多个窗口函数，这些函数使用不同的 `OVER` 子句以不同的方式分割数据，但它们都作用于这个虚拟表定义的同一行集合。

还有一个与窗口函数相关的重要概念：对于每一行，在其分区内有一组行，称为其窗口框架。某些窗口函数只作用于窗口框架的行，而不是整个分区。默认情况下，如果提供了 `ORDER BY`，则框架由从分区开始到当前行的所有行以及根据 `ORDER BY` 子句等于当前行的任何后续行组成。如果忽略 `ORDER BY`，默认框架由分区中的所有行组成。**^[5]^** 下面是一个使用 `sum` 的例子：
```sql
SELECT salary, sum(salary) OVER () FROM empsalary;
```
```sql
 salary |  sum
--------+-------
   5200 | 47100
   5000 | 47100
   3500 | 47100
   4800 | 47100
   3900 | 47100
   4200 | 47100
   4500 | 47100
   4800 | 47100
   6000 | 47100
   5200 | 47100
(10 rows)
```

如上所述，由于 `OVER` 子句中没有 `ORDER BY`，因此窗口框架与分区相同，缺少分区 `PARTITION BY` 是整个表;换句话说，每个总和都取在整个表上，因此我们对每个输出行得到相同的结果。但是如果我们添加一个 `ORDER BY` 子句，我们会得到非常不同的结果：
```sql
SELECT salary, sum(salary) OVER (ORDER BY salary) FROM empsalary;
```
```sql
 salary |  sum
--------+-------
   3500 |  3500
   3900 |  7400
   4200 | 11600
   4500 | 16100
   4800 | 25700
   4800 | 25700
   5000 | 30700
   5200 | 41100
   5200 | 41100
   6000 | 47100
(10 rows)
```
这里的总和是从第一份（最低）工资到当前工资，包括当前工资的任何重复项（注意重复工资的结果）。

窗口函数只允许在查询的 `SELECT` 列表和 `ORDER BY` 子句中使用。它们在其他地方是被禁止的，例如 `GROUP BY`, `HAVING` 和 `WHERE` 子句。这是因为它们在处理这些子句后逻辑上执行。此外，窗口函数在非窗口聚合函数之后执行。这意味着在窗口函数的参数中包含聚合函数调用是有效的，反之则无效。

如果需要在执行窗口计算后对行进行筛选或分组，则可以使用子选择。例如：
```sql
SELECT depname, empno, salary, enroll_date
FROM
  (SELECT depname, empno, salary, enroll_date,
          rank() OVER (PARTITION BY depname ORDER BY salary DESC, empno) AS pos
     FROM empsalary
  ) AS ss
WHERE pos < 3;
```
上面的查询仅显示内部查询中 `rank` 少于 3 的行。

当查询涉及多个窗口函数时，可以使用单独的 OVER 子句写出每个窗口函数，但如果多个函数需要相同的窗口行为，则这是重复且容易出错的。相反，可以在 WINDOW 子句中命名每个窗口行为，然后在 `OVER` 中引用。例如：
```sql
SELECT sum(salary) OVER w, avg(salary) OVER w
  FROM empsalary
  WINDOW w AS (PARTITION BY depname ORDER BY salary DESC);
```

有关窗口函数的更多详细信息，请参见 [第 4.2.8 节](#)、[第 9.22 节](#)、[第 7.2.5 节](#) 和 [SELECT](https://www.postgresql.org/docs/16/sql-select.html) 参考页。

---
::: details 阐述
**^[5]^*** 有一些选项可以通过其他方式定义窗口框架，但本教程不涉及它们。有关详细信息，请参见 [第 4.2.8 节](#)。
:::

## 继承
继承是面向对象数据库的一个概念。它为数据库设计开辟了有趣的可能性。

让我们创建两个表：`cities` 和 `capitals` 。当然，首都也是城市，因此在列出所有城市时，您需要某种方式隐式显示首都。如果你真的很聪明，你可能会发明一些这样的方案：
```sql
CREATE TABLE capitals (
  name       text,
  population real,
  elevation  int,    -- (in ft)
  state      char(2)
);

CREATE TABLE non_capitals (
  name       text,
  population real,
  elevation  int     -- (in ft)
);

CREATE VIEW cities AS
  SELECT name, population, elevation FROM capitals
    UNION
  SELECT name, population, elevation FROM non_capitals;
```
就查询而言，这工作正常，但是当您需要更新几行时，它会变得丑陋。

更好的解决方案是这样的：
```sql
CREATE TABLE cities (
  name       text,
  population real,
  elevation  int     -- (in ft)
);

CREATE TABLE capitals (
  state      char(2) UNIQUE NOT NULL
) INHERITS (cities);
```

在本例中，`capitals` 从其父级 `cities` 继承所有列（`name`、 `population` 和 `elevation`）。列 `name` 的类型是 `text`，用于可变长度字符串的原生 PostgreSQL 类型。该 `capitals` 表有一个附加列，`state` 显示其状态缩写。在 PostgreSQL 中，一个表可以从零个或多个其他表继承。

例如，以下查询查找海拔超过 500 英尺的所有城市（包括州首府）的名称：
```sql
SELECT name, elevation
  FROM cities
  WHERE elevation > 500;
```
返回：
```sql
   name    | elevation
-----------+-----------
 Las Vegas |      2174
 Mariposa  |      1953
 Madison   |       845
(3 rows)
```
另一方面，以下查询查找所有不是州首府且位于海拔超过 500 英尺的城市：
```sql
SELECT name, elevation
    FROM ONLY cities
    WHERE elevation > 500;
```
```sql
   name    | elevation
-----------+-----------
 Las Vegas |      2174
 Mariposa  |      1953
(2 rows)
```
此处在 `cities` 表之前的 `ONLY` 表示查询应仅针对 `cities` 表运行，而不应在继承层次结构中 `cities` 以下的表上运行。我们已经讨论过的许多命令 `UPDATE`、`DELETE` 和 `SELECT` 都支持这种 `ONLY` 表示法。

::: tip 注意
尽管继承通常很有用，但它尚未与唯一约束或外键集成，这限制了它的有用性。有关详细信息，请参见 [第 5.10 节](#)。
:::

## 结论
PostgreSQL 有许多本教程介绍中未涉及的功能，这些功能面向 SQL 的新用户。本书的其余部分将更详细地讨论这些功能。

如果您觉得需要更多介绍性材料，请访问 [PostgreSQL 网站](https://www.postgresql.org/) 以获取更多资源的链接。