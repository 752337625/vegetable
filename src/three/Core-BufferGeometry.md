---
prev: false
next: false
category:
  - ThreeJS
tag:
  - ThreeJS
---

# BufferGeometry

```class
class BufferGeometry {
  +attributes  Object
  +index  BufferAttribute
  +translate ( x : Float, y : Float, z : Float ) : this
  +rotateX ( radians : Float )  this
  +rotateY ( radians : Float )  this
  +rotateZ ( radians : Float )  this
  +scale ( x : Float, y : Float, z : Float )  this
  +clone ()  BufferGeometry
  +copy ( bufferGeometry : BufferGeometry )  this
  +hasAttribute ( name : String )  Boolean
  +setAttribute ( name : String, attribute : BufferAttribute )  this
  +getAttribute ( name : String )  BufferAttribute
  +deleteAttribute ( name : String )  BufferAttribute
  +getIndex ()  BufferAttribute
  setIndex ( index : BufferAttribute ) : this
}
```

## 属性

### .attributes : Object

通过 hashmap 存储该几何体相关的属性，hashmap 的 id 是当前 attribute 的名称，值是相应的 buffer。 你可以通过 .setAttribute 和 .getAttribute 添加和访问与当前几何体有关的 attribute。

### .index : BufferAttribute

允许顶点在多个三角面片间可以重用。这样的顶点被称为"已索引的三角面片（indexed triangles)。 每个三角面片都和三个顶点的索引相关。该 attribute 因此所存储的是每个三角面片的三个顶点的索引。 如果该 attribute 没有设置过，则 renderer 假设每三个连续的位置代表一个三角面片。 默认值是 null。

## 方法

### .rotateX ( radians : Float ) : this

在 X 轴上旋转几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.rotation 实时旋转几何体。

### .rotateY ( radians : Float ) : this

在 Y 轴上旋转几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.rotation 实时旋转几何体。

### .rotateZ ( radians : Float ) : this

在 Z 轴上旋转几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.rotation 实时旋转几何体。

### .scale ( x : Float, y : Float, z : Float ) : this

缩放几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.scale 实时旋转几何体。
