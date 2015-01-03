var KINECTBABY = KINECTBABY || {};

(function () {

	// Contructor
	KINECTBABY.moveObj = function (scene) {
		this.scene = scene;
		var that = this;
		this.direcvtionMove = null;
		this.vecLeft = null;
		this.vecRight = null;
		this.pickedObj = null;
		this.interval = null;
		this.allowRightHand = true;
		this.oldPositionCamera = null;
		this.scene.animationCamera = false;
		this.animCam = new KINECTBABY.animCamera(this.scene);

		this.addObj(5);

		this.scene.registerBeforeRender(function () {
			//if (that.obj != null) {
			//	that.obj.rotation.z += 0.02;
			//	that.obj.rotation.y += 0.03;
			//}

			//if (that.direcvtionMove != null) {
			//	if (that.direcvtionMove == "top") {
			//		that.obj.position.y += 0.4;
			//		// that.scene.activeCamera.position = that.obj.position;
			//	}
			//	else if (that.direcvtionMove == "down") {
			//		that.obj.position.y -= 0.4;
			//		// that.scene.activeCamera.position = that.obj.position;

			//	}
			//	else if (that.direcvtionMove == "right") {
			//		that.obj.position.x += 0.4;
			//		// that.scene.activeCamera.position = that.obj.position;

			//	}
			//	else if (that.direcvtionMove == "left") {
			//		that.obj.position.x -= 0.4;
			//		// that.scene.activeCamera.position = that.obj.position;

			//	}
			//	// that.scene.activeCamera.lookAt(that.obj.position);
			//}
			if (that.vecLeft != null) {
				that.scene.activeCamera.position = new BABYLON.Vector3.Lerp(that.scene.activeCamera.position, that.vecLeft, 0.001);
			}
			// that.scene.activeCamera.setTarget(new BABYLON.Vector3(10, 0, 50));
			// that.scene.activeCamera._reset();
			//console.log(that.scene.activeCamera.cameraRotation);
			//console.log(that.scene.activeCamera.cameraRotation);

			if (that.vecRight != null && that.allowRightHand == true) {
				// that.scene.activeCamera.setTarget(new BABYLON.Vector3.Lerp(that.scene.activeCamera.getTarget(), that.vecRight, 0.001));
				//console.log(that.scene.activeCamera.getTarget());

				that.obj.position = that.vecRight;
				// console.log("vecright = " + that.vecRight);

				//var engine = that.scene._engine;
				//var projectMesh = BABYLON.Vector3.Unproject(
				//		new BABYLON.Vector3(that.vecRight.x, that.vecRight.y, that.vecRight.z),
				//		engine.getRenderWidth() * engine.getHardwareScalingLevel(),
				//		engine.getRenderHeight() * engine.getHardwareScalingLevel(),
				//		BABYLON.Matrix.Identity(),
				//		that.scene._viewMatrix,
				//		that.scene._projectionMatrix
				//		);
				//var projectMeshX = ((engine.getRenderWidth() * engine.getHardwareScalingLevel() / 2) / projectMesh.x) * projectMesh.x;
				//var projectMeshY = ((engine.getRenderHeight() * engine.getHardwareScalingLevel() / 2) / projectMesh.y) * projectMesh.y;

				//var test = BABYLON.Vector3.Project(that.vecRight, BABYLON.Matrix.Identity(), that.scene.getTransformMatrix(), that.scene.activeCamera.viewport);


				//console.log("X = " + test.x * window.innerWidth);
				//console.log("Y = " + test.y * window.innerHeight);

				// console.log(engine.getRenderWidth() * engine.getHardwareScalingLevel());

			}
		});
	};

	KINECTBABY.moveObj.prototype.addObj = function (userId) {
		this.obj = new BABYLON.Mesh.CreateBox(userId, 0.5, this.scene);
		this.obj.isPickable = false;

		this.objMaterial = new BABYLON.StandardMaterial("objMaterial", this.scene);
		this.objMaterial.alpha = 1;
		this.obj.material = this.objMaterial;

		//- - - Particle

		//this.particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
		//this.particleSystem.particleTexture = new BABYLON.Texture("../Images/particule.png", this.scene);
		//this.particleSystem.textureMask = new BABYLON.Color4(0.1, 0.8, 0.8, 1.0);
		//this.particleSystem.emitter = this.obj;

		//this.particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0);
		//this.particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0);

		//this.particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
		//this.particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
		//this.particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

		//this.particleSystem.minSize = 0.1;
		//this.particleSystem.maxSize = 0.5;

		////this.particleSystem.minLifeTime = 0.3;
		////this.particleSystem.maxLifeTime = 1.5;

		//this.particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
		//this.particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);

		//this.particleSystem.emitRate = 1000;

		//this.particleSystem.minAngularSpeed = 0;
		//this.particleSystem.maxAngularSpeed = Math.PI;
		//this.particleSystem.minEmitPower = 1;
		//this.particleSystem.maxEmitPower = 3;

		//this.particleSystem.updateSpeed = 0.005;
		//this.particleSystem.targetStopDuration = 5;

		//this.particleSystem.targetStopDuration = 5;


	};

	KINECTBABY.moveObj.prototype.deleteObj = function (userId) {
		this.obj.dispose(true);
		this.particleSystem.dispose(true);
		this.direcvtionMove = null;

	};

	KINECTBABY.moveObj.prototype.moveObj = function (userId) {
	};

	KINECTBABY.moveObj.prototype.changeColor = function () {
		this.objMaterialChancge = new BABYLON.StandardMaterial("objMaterial", this.scene);
		this.objMaterialChancge.diffuseColor = new BABYLON.Color3(0, 1, 0);
		this.obj.material = this.objMaterialChancge;
		this.direcvtionMove = null;


	};

	KINECTBABY.moveObj.prototype.resetColor = function () {
		this.objMaterialChancge = new BABYLON.StandardMaterial("objMaterial", this.scene);
		this.objMaterialChancge.diffuseColor = new BABYLON.Color3(1, 0, 0);
		this.obj.material = this.objMaterialChancge;
	};

	KINECTBABY.moveObj.prototype.moveTop = function () {
		this.direcvtionMove = "top";
	};

	KINECTBABY.moveObj.prototype.moveDown = function () {
		this.direcvtionMove = "down";

	};

	KINECTBABY.moveObj.prototype.moveLeft = function () {
		this.direcvtionMove = "left";

	};

	KINECTBABY.moveObj.prototype.moveRight = function () {
		this.direcvtionMove = "right";

	};

	KINECTBABY.moveObj.prototype.moveObjHandLeft = function (positionHandLeft) {
		//this.particleSystem.start();
		positionHandLeft[0] = positionHandLeft[0] / 4;
		positionHandLeft[1] = positionHandLeft[1] / 4;
		positionHandLeft[2] = (positionHandLeft[2] / 4);

		this.vecLeft = new BABYLON.Vector3(positionHandLeft[0], positionHandLeft[1], -(positionHandLeft[2]) + 350);
	};

	//KINECTBABY.moveObj.prototype.moveObjHandRight = function (positionRIghtHand) {

	//	positionRIghtHand[0] = positionRIghtHand[0] / 4;
	//	positionRIghtHand[1] = positionRIghtHand[1] / 4;
	//	positionRIghtHand[2] = (positionRIghtHand[2] / 4);

	//	this.vecRight = new BABYLON.Vector3(positionRIghtHand[0], positionRIghtHand[1], -(positionRIghtHand[2] - 450));
	//	// this.scene.activeCamera.setTarget(this.vecRight);

	//};

	//KINECTBABY.moveObj.prototype.moveObjHandRightClear = function () {
	//	this.vecRight = null;
	//	this.scene.activeCamera._reset();
	//};


	KINECTBABY.moveObj.prototype.moveObjHandRight = function (positionRIghtHand) {
		var that = this;
		this.mapMaterial = new BABYLON.StandardMaterial("mapMaterial", this.scene);
		this.mapMaterial.diffuseTexture = new BABYLON.Texture("/Images/wTerre.jpg", this.scene);
		this.mapMaterial.backFaceCulling = true;
		this.mapMaterial.diffuseTexture.hasAlpha = true;

		positionRIghtHand[0] = positionRIghtHand[0] / 15;
		positionRIghtHand[1] = positionRIghtHand[1] / 15;
		positionRIghtHand[2] = (positionRIghtHand[2] / 4);

		this.vecRight = new BABYLON.Vector3(positionRIghtHand[0], positionRIghtHand[1] - 20, this.scene.activeCamera.position.z + 20);

		var test = BABYLON.Vector3.Project(this.vecRight, BABYLON.Matrix.Identity(), this.scene.getTransformMatrix(), this.scene.activeCamera.viewport);

		var objX = test.x * window.innerWidth;
		var objY = test.y * window.innerHeight;

		pickResult = this.scene.pick(
		           objX,
		           objY,
		           function (mesh) {
		           	if (cutDataName("data", mesh.name) == "Data") {

		           		return true;
		           	}
		           	else {
		           		//console.log(cutDataName("data", mesh.name));
		           		return false;
		           	}
		           },
		           false);

		if (pickResult.hit) {
			// pickResult.pickedMesh.material = mapMaterial;

			if (this.pickedObj != pickResult.pickedMesh) {
				clearInterval(this.interval);
				this.pickedObj = pickResult.pickedMesh;
				this.interval = null;
			}
			else {
				if (this.interval == null) {
					this.interval = setInterval(function () {
						that.oldPositionCamera = that.scene.activeCamera.position;
						that.pickedObj.material = that.mapMaterial;
						clearInterval(that.interval);
						that.interval = null;
						that.allowRightHand = false;
						that.animCam.movaCam(that.pickedObj.position);

						// new KINECTBABY.animCamera(that.scene, that.pickedObj.position);
					}, 1000);
				}
			}
		}
		else {
			clearInterval(this.interval);
			this.interval = null;
		}

	};

	KINECTBABY.moveObj.prototype.allowRightHandf = function () {
		return this.allowRightHand;
	};

	KINECTBABY.moveObj.prototype.noHandRight = function () {
		//console.log("this.scene.animationCamera  =====   " + this.scene.animationCamera);
		//console.log("this.oldPositionCamera" + this.oldPositionCamera);

		if (this.oldPositionCamera != null && this.scene.animationCamera == false) {


			this.animCam.movaCam(this.oldPositionCamera);
			//new KINECTBABY.animCamera(this.scene, this.oldPositionCamera);
			this.oldPositionCamera = null;
			this.allowRightHand = true;



		}
	};


})();
