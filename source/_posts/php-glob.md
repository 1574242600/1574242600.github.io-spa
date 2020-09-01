---
title: '[php]glob函数'
date: 2019-07-25 16:57:00
tags: php
---

## 定义和用法
glob() 函数返回匹配指定模式的文件名或目录。

该函数返回一个包含有匹配文件 / 目录的数组。如果出错返回 false。
<!--more-->

### 语法
```php
glob(pattern,flags)

```

--------------------------------------------

## 例子 1

```php
<?php
print_r(glob("*.txt"));
?>
```

输出类似:
```php
Array
(
[0] => target.txt
[1] => source.txt
[2] => test.txt
[3] => test2.txt
)
```