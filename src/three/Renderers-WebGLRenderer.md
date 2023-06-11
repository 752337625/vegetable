---
prev: false
next: false
category:
  - ThreeJS
tag:
  - ThreeJS
---

# WebGLRenderer

```class
class WebGLRenderer {

}

```

## 属性

#### .shadowMap : WebGLShadowMap

如果使用，它包含阴影贴图的引用。

- enabled: 如果设置开启，允许在场景中使用阴影贴图。默认是 false。
- autoUpdate: 启用场景中的阴影自动更新。默认是 true
  如果不需要动态光照/阴影, 则可以在实例化渲染器时将之设为 false
- needsUpdate: 当被设为 true, 场景中的阴影贴图会在下次 render 调用时刷新。默认是 false
  如果你已经禁用了阴影贴图的自动更新(shadowMap.autoUpdate = false), 那么想要在下一次渲染时更新阴影的话就需要将此值设为 true
- type: 定义阴影贴图类型 (未过滤, 关闭部分过滤, 关闭部分双线性过滤), 可选值有:

> > THREE.BasicShadowMap
> > THREE.PCFShadowMap (默认)
> > THREE.PCFSoftShadowMap
> > THREE.VSMShadowMap

#### .toneMapping : Constant

默认是 NoToneMapping。查看 Renderer constants 以获取其它备选项

- THREE.NoToneMapping
- THREE.LinearToneMapping
- THREE.ReinhardToneMapping
- THREE.CineonToneMapping
- THREE.ACESFilmicToneMapping

#### .toneMappingExposure : Number

色调映射的曝光级别。默认是 1

## 方法

### .clear ( color : Boolean, depth : Boolean, stencil : Boolean ) : undefined

Tells the renderer to clear its color, depth or stencil drawing buffer(s). This method initializes the color buffer to the current clear color value.
Arguments default to true.

### .clearColor ( ) : undefined

Clear the color buffer. Equivalent to calling .clear( true, false, false ).

### .clearDepth ( ) : undefined

Clear the depth buffer. Equivalent to calling .clear( false, true, false ).
