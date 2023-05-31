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

## 方法

### .clear ( color : Boolean, depth : Boolean, stencil : Boolean ) : undefined

Tells the renderer to clear its color, depth or stencil drawing buffer(s). This method initializes the color buffer to the current clear color value.
Arguments default to true.

### .clearColor ( ) : undefined

Clear the color buffer. Equivalent to calling .clear( true, false, false ).

### .clearDepth ( ) : undefined

Clear the depth buffer. Equivalent to calling .clear( false, true, false ).
