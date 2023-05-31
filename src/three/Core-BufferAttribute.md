---
prev: false
next: false
category:
  - ThreeJS
tag:
  - ThreeJS
---

# BufferAttribute

```class
class BufferAttribute {
  +array  TypedArray
  +count  Integer
  +itemSize  Integer
  +normalized  Boolean
  +clone ()  BufferAttribute
  +set ( value : Array, offset : Integer )  this

}
```

## 属性

### .array : TypedArray

在 array 中保存着缓存中的数据。

### .count : Integer

保存 array.length / itemSize 之后的大小。

### .itemSize : Integer

保存在 array 中矢量(注意：分量 1-4)的长度。

若缓存存储三元组（例如顶点位置、法向量、颜色值），则该值应等于队列中三元组的个数。

### .normalized : Boolean

指明缓存中数据在转化为 GLSL 着色器代码中数据时是否需要被归一化。详见构造函数中的说明。

## 方法

### .clone () : BufferAttribute

返回该 BufferAttribute 的拷贝。

### .set ( value : Array, offset : Integer ) : this

value -- 被拷贝的 Array 或 TypedArray 类型的数据。
offset -- (可选) array 中开始拷贝的位置索引。

对 array，调用 TypedArray.set( value, offset ) 方法。

特别的, 对将 value 转为 TypedArray 的要求详见上述链接。
