---
title: '[js]忽略JS错误'
date: 2020-01-30 14:40:00
tags: js
---


```js
window.onerror = function(){return true;};
```

在页面出现js执行错误时，返回最终执行结果，而不是中断JS的执行
