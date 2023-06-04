---
prev: false
next: false
category:
  - ThreeJS
tag:
  - ThreeJS
---

# OrbitControls

Orbit controls（轨道控制器）可以使得相机围绕目标进行轨道运动。

<!-- more -->

## 属性

### .autoRotate : Boolean

将其设为 true，以自动围绕目标旋转。
请注意，如果它被启用，你必须在你的动画循环里调用.update()。

### .autoRotateSpeed : Float

当.autoRotate 为 true 时，围绕目标旋转的速度将有多快，默认值为 2.0，相当于在 60fps 时每旋转一周需要 30 秒。
请注意，如果.autoRotate 被启用，你必须在你的动画循环里调用.update()。

### .enableDamping : Boolean

将其设置为 true 以启用阻尼（惯性），这将给控制器带来重量感。默认值为 false。
请注意，如果该值被启用，你将必须在你的动画循环里调用.update()。

### .dampingFactor : Float

当.enableDamping 设置为 true 的时候，阻尼惯性有多大。 Default is 0.05.
请注意，要使得这一值生效，你必须在你的动画循环里调用.update()。

### .enablePan : Boolean

启用或禁用摄像机平移，默认为 true。

### .enableRotate : Boolean

启用或禁用摄像机水平或垂直旋转。默认值为 true。
==请注意，可以通过将 polar angle 或者 azimuth angle 的 min 和 max 设置为相同的值来禁用单个轴， 这将使得水平旋转或垂直旋转固定为所设置的值。==

### .enableZoom : Boolean

启用或禁用摄像机的缩放。

### .maxAzimuthAngle : Float

你能够水平旋转的角度上限。如果设置，其有效值范围为[-2 * Math.PI，2 * Math.PI]，且旋转角度的上限和下限差值小于 2 \* Math.PI。默认值为无穷大。

### .maxDistance : Float

你能够将相机向外移动多少（仅适用于 PerspectiveCamera），其默认值为 Infinity。

### .maxPolarAngle : Float

你能够垂直旋转的角度的上限，范围是 0 到 Math.PI，其默认值为 Math.PI。

### .maxZoom : Float

你能够将相机缩小多少（仅适用于 OrthographicCamera），其默认值为 Infinity。

== 这个缩放仅适用于

### .minAzimuthAngle : Float

你能够水平旋转的角度下限。如果设置，其有效值范围为[-2 * Math.PI，2 * Math.PI]，且旋转角度的上限和下限差值小于 2 \* Math.PI。默认值为无穷大。

### .minDistance : Float

你能够将相机向内移动多少（仅适用于 PerspectiveCamera），其默认值为 0。

### .minPolarAngle : Float

你能够垂直旋转的角度的下限，范围是 0 到 Math.PI，其默认值为 0。

### .minZoom : Float

你能够将相机放大多少（仅适用于 OrthographicCamera），其默认值为 0。

### 待测试属性

- .object : Camera

正被控制的摄像机。

- .panSpeed : Float

位移的速度，其默认值为 1。

- .position0 : Vector3

由.saveState 和.reset 方法在内部使用。

- .rotateSpeed : Float

旋转的速度，其默认值为 1。

- .screenSpacePanning : Boolean

定义当平移的时候摄像机的位置将如何移动。如果为 true，摄像机将在屏幕空间内平移。 否则，摄像机将在与摄像机向上方向垂直的平面中平移。当使用 OrbitControls 时， 默认值为 true；当使用 MapControls 时，默认值为 false。

- .target0 : Vector3

由.saveState 和.reset 方法在内部使用。

- .target : Vector3

控制器的焦点，.object 的轨道围绕它运行。 它可以在任何时候被手动更新，以更改控制器的焦点。

- .zoom0 : Float

由.saveState 和.reset 方法在内部使用。

- .zoomSpeed : Float

摄像机缩放的速度，其默认值为 1。

## 方法

### .getAzimuthalAngle () : radians

获得当前的水平旋转，单位为弧度。

### .getPolarAngle () : radians

获得当前的垂直旋转，单位为弧度。

### .getDistance () : Float

Returns the distance from the camera to the target.

### .reset () : undefined

将控制器重置为上次调用.saveState 时的状态，或者初始状态。

### .saveState () : undefined

保存当前控制器的状态。这一状态可在之后由.reset 所恢复。

### .update () : Boolean

更新控制器。必须在摄像机的变换发生任何手动改变后调用， 或如果.autoRotate 或.enableDamping 被设置时，在 update 循环里调用。

### 待测试方法

- .dispose () : undefined

移除所有的事件监听。

- .listenToKeyEvents ( domElement : HTMLDOMElement ) : undefined

为指定的 DOM 元素添加按键监听。推荐将 window 作为指定的 DOM 元素。

- .stopListenToKeyEvents () : undefined

Removes the key event listener previously defined with .listenToKeyEvents().
