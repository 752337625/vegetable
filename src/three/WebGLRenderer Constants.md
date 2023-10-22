---
article: false
prev: false
next: false
category:
  - ThreeJS
tag:
  - ThreeJS
  - Light
---

# WebGL 渲染器常量（WebGLRenderer Constants）

面剔除模式

> > THREE.CullFaceNone
> > THREE.CullFaceBack
> > THREE.CullFaceFront
> > THREE.CullFaceFrontBack

- CullFaceNone 禁用面剔除。
- CullFaceBack 为默认值，剔除背面。
- CullFaceFront 剔除正面。
- CullFaceFrontBack 剔除正面和背面。

阴影类型

> > THREE.BasicShadowMap
> > THREE.PCFShadowMap
> > THREE.PCFSoftShadowMap
> > THREE.VSMShadowMap

这些常量定义了 WebGLRenderer 中 shadowMap.type 的属性。

- BasicShadowMap 能够给出没有经过过滤的阴影映射 —— 速度最快，但质量最差。
- PCFShadowMap 为默认值，使用 Percentage-Closer Filtering (PCF)算法来过滤阴影映射。
- PCFSoftShadowMap 和 PCFShadowMap 一样使用 Percentage-Closer Filtering (PCF) 算法过滤阴影映射，但在使用低分辨率阴影图时具有更好的软阴影。
- VSMShadowMap 使用 Variance Shadow Map (VSM)算法来过滤阴影映射。当使用 VSMShadowMap 时，所有阴影接收者也将会投射阴影。

色调映射

> > THREE.NoToneMapping
> > THREE.LinearToneMapping
> > THREE.ReinhardToneMapping
> > THREE.CineonToneMapping
> > THREE.ACESFilmicToneMapping

这些常量定义了 WebGLRenderer 中 toneMapping 的属性。 这个属性用于在普通计算机显示器或者移动设备屏幕等低动态范围介质上，模拟、逼近高动态范围（HDR）效果。
