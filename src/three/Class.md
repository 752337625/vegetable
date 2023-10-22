---
article: false
prev: false
next: false
category:
  - ThreeJS
tag:
  - ThreeJS
---

# ThreeJS 类关系图

<!-- more -->

```class
Object3D --|> Camera
Object3D --|> CubeCamera
Camera --|> PerspectiveCamera
Camera --|> OrthographicCamera
class Object3D {
}
note "Camera"
class Camera {
}
class OrthographicCamera {
}
class PerspectiveCamera {
}
```

```class
note "Math"
class Euler {
}
class Quaternion {
}
class Vector3 {
}
```

```class
OrbitControls --|> MapControls
note "Controls"
class OrbitControls{
}
class MapControls{
}
class FlyControls{
}
```

```class
note "Core"
class BufferGeometry {
}
class BufferAttribute {
}
```
