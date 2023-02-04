# FCEngine Todo List

```ts
    let engine = new Engine()
    let scene1 = engine.createScene()
    engine.loadScene(scene1)
    let entity = engine.createEntity()
    scene1.addEntity(entity)
    engine.onKey("a", () => {
      entity.position.x.changeBy(-2)
      entity.position.y.set(20)
    })
```