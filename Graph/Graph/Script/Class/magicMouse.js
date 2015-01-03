var KINECTBABY = KINECTBABY || {};

(function () {

	KINECTBABY.magicMouse = function (scene) {
		this.scene = scene;

		var that = this;

		this.particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
		this.particleSystem.particleTexture = new BABYLON.Texture("../Images/particule.png", this.scene);
		this.particleSystem.textureMask = new BABYLON.Color4(0.1, 0.8, 0.8, 1.0);
		this.particleSystem.emitter = this.obj;

		this.particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0);
		this.particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0);

		this.particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
		this.particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
		this.particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

		this.particleSystem.minSize = 0.1;
		this.particleSystem.maxSize = 0.5;

		this.particleSystem.minLifeTime = 0.3;
		this.particleSystem.maxLifeTime = 1.5;

		this.particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
		this.particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);

		this.particleSystem.emitRate = 1000;

		this.particleSystem.minAngularSpeed = 0;
		this.particleSystem.maxAngularSpeed = Math.PI;
		this.particleSystem.minEmitPower = 1;
		this.particleSystem.maxEmitPower = 3;

		this.particleSystem.updateSpeed = 0.005;
		this.particleSystem.targetStopDuration = 5;

		this.particleSystem.targetStopDuration = 5;

		this.particleSystem.start();

		document.body.addEventListener("mousemove", function () {

		})
	}

})();