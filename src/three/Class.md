---
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
OrbitControls --|> MapControls
class Object3D {
}
note "Math"
class Euler {
}
class Quaternion {
}
class Vector3 {
}
note "Camera"
class Camera {
}
class OrthographicCamera {
}
class PerspectiveCamera {
}
note "Controls"
class OrbitControls{
}
class MapControls{
}
class FlyControls{
}
note "Core"
class BufferGeometry {
}
```
