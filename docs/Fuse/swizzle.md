---
sidebar_position: 1
---

# Swizzle

对于GPU编程以及同时又想要可视化编程，一个重要的点是如何获取一个vector中的单个通道的数据（x,y,z,w也好，或者是r,g,b,a也好）。

因而fuse提供了可以操作单个通道的一系列节点：

![swizzle](./img/swizzle.png)

