---
prev: false
next: false
category:
  - ThreeJS
tag:
  - ThreeJS
---

# Camera

创建一个新的 Camera（摄像机）。注意：这个类并不是被直接调用的；你所想要的或许是一个 PerspectiveCamera（透视摄像机）或者 OrthographicCamera（正交摄像机）。

<!-- more -->

```class
class Camera {
  +matrixWorldInverse : Matrix4
  +projectionMatrix : Matri
  +projectionMatrixInverse : Matrix4
  +clone ( )  Camera
  +copy ( source : Camera, recursive : Boolean )  this

}

```

## 属性

### .matrixWorldInverse : Matrix4

这是 matrixWorld 矩阵的逆矩阵。 MatrixWorld 包含了相机的世界变换矩阵。

### .projectionMatrix : Matrix4

这是投影变换矩阵。

### .projectionMatrixInverse : Matrix4

这是投影变换矩阵的逆矩阵。

## 方法

### .clone ( ) : Camera 【本继承 Object3D 后重写该方法】

返回一个具有和当前相机的属性一样的新的相机。

### .copy ( source : Camera, recursive : Boolean ) : this 【本继承 Object3D 后重写该方法】

将源摄像机的属性复制到新摄像机中。
