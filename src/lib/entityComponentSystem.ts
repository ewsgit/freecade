import * as THREE from "three";

export default class Entity {
  x: number = 0;
  y: number = 0;
  z: number = 0;
  mesh: THREE.Mesh;
  material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  });
  geometry: THREE.BufferGeometry = new THREE.BoxGeometry(10, 10, 10);

  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  render() {}
}

export class EntityComponentSystem {
  entities: Entity[];
  renderer: THREE.WebGLRenderer;

  constructor() {}
}
