---
sidebar_position: 2

---

# signed disntance field

## 概念

中文名字叫有向距离场。

当然我们不需要那么深入去研究算法，这里大概理解为是一种可以用数学算法来表现2d图形，3d体块的方式。

比如2d的图像可以如下理解：

![sdf_2d](.\img\sdf_2d.png)

3d图形同样可以这么理解：

![](.\img\sdf_3d.png)

因为是算法生成的图形，基本上也会支持各种布尔运算，这就带来了很多可能性：

![](.\img\sdf_combination.png)

## 3D SDF Sources

![sdf_3d_1](.\img\sdf_3d_1.png)

![sdf_3d_2](.\img\sdf_3d_2.png)

![sdf_3d_3](.\img\sdf_3d_3.png)

但是以上这些更像是将这个场可视化出来，说到底还是一个场。所以并不知道是否真的可以将这些场作为模型来使用。
