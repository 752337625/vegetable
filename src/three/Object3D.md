---
prev: false
next: false
category:
  - ThreeJS
tag:
  - ThreeJS
---

# Object3D

```class
class Object3D {
  +name String
  +position  Vector3
  +children  Array
  +rotation  Euler
  +quaternion  Quaternion
  +scale  Vector3
  +up  Vector3
  +visible  Boolean
  +add ( object : Object3D, ... ) : this
  +remove ( object : Object3D, ... )  this
  +lookAt ( vector : Vector3 ) : undefined
  +lookAt ( x : Float, y : Float, z : Float ) : undefined
  +rotateOnAxis ( axis : Vector3, angle : Float )  this
  +translateOnAxis ( axis : Vector3, distance : Float )  this
  +rotateOnWorldAxis ( axis : Vector3, angle : Float)  this
  +rotateX( rad : Float )  this
  +rotateY ( rad : Float )  this
  +rotateZ ( rad : Float )  this
  +translateX ( distance : Float )  this
  +translateY ( distance : Float )  this
  +translateZ ( distance : Float )  this
  +traverse ( callback : Function ) : undefined
  +traverseVisible ( callback : Function ) : undefined
}

```

## clone ( recursive : Boolean ) : Object3D

recursive —— 如果值为 true，则该物体的后代也会被克隆。默认值为 true。

返回对象前物体的克隆（以及可选的所有后代）。

## copy ( object : Object3D, recursive : Boolean ) : this

recursive —— 如果值为 true，则该物体的后代也会被复制。默认值为 true。

复制给定的对象到这个对象中。 请注意，事件监听器和用户定义的回调函数（.onAfterRender 和 .onBeforeRender）不会被复制。

## rotateOnAxis ( axis : Vector3, angle : Float ) : this

axis —— 一个在局部空间中的标准化向量。
angle —— 角度，以弧度来表示。

在局部空间中绕着该物体的轴来旋转一个物体，假设这个轴已被标准化。

## rotateOnWorldAxis ( axis : Vector3, angle : Float ) : this

axis -- 一个在世界空间中的标准化向量。
angle -- 角度，以弧度来表示。

在世界空间中绕着该物体的轴来旋转一个物体，假设这个轴已被标准化。 方法假设该物体没有旋转过的父级。

## rotateX ( rad : Float ) : this

rad - 将要旋转的角度（以弧度来表示）。

绕局部空间的 X 轴旋转这个物体。

## rotateY ( rad : Float ) : this

rad - 将要旋转的角度（以弧度来表示）。

绕局部空间的 Y 轴旋转这个物体。

## rotateZ ( rad : Float ) : this

rad - 将要旋转的角度（以弧度来表示）。

绕局部空间的 Z 轴旋转这个物体。

## translateOnAxis ( axis : Vector3, distance : Float ) : this

axis -- 一个在局部空间中的标准化向量。
distance -- 将要平移的距离。

在局部空间中沿着一条轴来平移物体，假设轴已被标准化。

## translateX ( distance : Float ) : this

沿着 X 轴将平移 distance 个单位。

## translateY ( distance : Float ) : this

沿着 Y 轴将平移 distance 个单位。

## translateZ ( distance : Float ) : this

沿着 Z 轴将平移 distance 个单位。

## traverse ( callback : Function ) : undefined

callback - 以一个 object3D 对象作为第一个参数的函数。

在对象以及后代中执行的回调函数。

## traverseVisible ( callback : Function ) : undefined

callback - 以一个 object3D 对象作为第一个参数的函数。

类似 traverse 函数，但在这里，回调函数仅对可见的对象执行，不可见对象的后代将不遍历。
