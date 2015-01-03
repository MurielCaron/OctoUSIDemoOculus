var KINECTBABY = KINECTBABY || {};

(function () {

	// Contructor
	KINECTBABY.moveObj = function (scene, objCameraOculus) {
		this.scene = scene;
		this.objCameraOculus = objCameraOculus;
		var that = this;
		this.direcvtionMove = null;
		this.vecLeft = null;
		this.vecRight = null;
		this.pickedObj = null;
		this.interval = null;
		this.allowRightHand = true;
		this.oldPositionCamera = null;
		this.oldName = null;
		this.oldMaterial = null;
		this.addObj();

		this.scene.animationCamera = false;
		this.animCam = new KINECTBABY.animCamera(this.scene);

		this.scene.registerBeforeRender(function () {
			if (that.vecLeft != null && that.allowRightHand == true) {
				//that.scene.activeCamera.position = new BABYLON.Vector3.Lerp(that.scene.activeCamera.position, that.vecLeft, 0.01);
				that.scene.activeCameras[0].position = new BABYLON.Vector3.Lerp(that.scene.activeCameras[0].position, that.vecLeft, 0.01);
				that.scene.activeCameras[1].position = new BABYLON.Vector3.Lerp(that.scene.activeCameras[1].position, that.vecLeft, 0.01);
				//that.objCameraOculus.moveRelative(that.vecLeft);
			}

			if (that.vecRight != null && that.allowRightHand == true) {
				that.obj.position = that.vecRight;

			}
		});
	};

	KINECTBABY.moveObj.prototype.addObj = function () {
		this.obj = BABYLON.Mesh.CreatePlane("cursor", 2, this.scene);

		var mapMaterialCurosr = new BABYLON.StandardMaterial("mapMaterial", this.scene);
		mapMaterialCurosr.diffuseColor = new BABYLON.Color3(1, 1, 1);
		mapMaterialCurosr.specularColor = new BABYLON.Color3(1, 1, 1);
		mapMaterialCurosr.ambientColor = new BABYLON.Color3(1, 1, 1);
		mapMaterialCurosr.emissiveColor = new BABYLON.Color3(1, 1, 1);
		mapMaterialCurosr.diffuseTexture = new BABYLON.Texture("/Images/Finger-pointing-icon.png", this.scene);
		mapMaterialCurosr.backFaceCulling = false;
		mapMaterialCurosr.diffuseTexture.hasAlpha = true;

		this.obj.material = mapMaterialCurosr;
	};

	KINECTBABY.moveObj.prototype.deleteObj = function (userId) {
		this.obj.dispose(true);

	};

	KINECTBABY.moveObj.prototype.moveObjHandLeft = function (positionHandLeft) {
		positionHandLeft[0] = (positionHandLeft[0] / 4) ;
		positionHandLeft[1] = (positionHandLeft[1] / 4) ;
		positionHandLeft[2] = (positionHandLeft[2] / 4);

		this.vecLeft = new BABYLON.Vector3(positionHandLeft[0] * -1, positionHandLeft[1] * -1, (-(positionHandLeft[2]) + 350) * -1);
	};

	KINECTBABY.moveObj.prototype.moveObjHandRight = function (positionRIghtHand) {
		var that = this;

		positionRIghtHand[0] = positionRIghtHand[0] / 15;
		positionRIghtHand[1] = positionRIghtHand[1] / 15;
		positionRIghtHand[2] = (positionRIghtHand[2] / 4);

		this.vecRight = new BABYLON.Vector3(positionRIghtHand[0], positionRIghtHand[1] - 20, this.scene.activeCamera.position.z + 20);
		this.vecRight = this.scene.activeCamera.position.add(this.vecRight);
		this.vecRight.z = that.scene.activeCamera.position.z + 20;

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
		           		return false;
		           	}
		           },
		           false);

		if (pickResult.hit) {
			// Hit sur object different du précédent
			if (this.pickedObj != pickResult.pickedMesh) {
				clearInterval(this.interval);
				this.pickedObj = pickResult.pickedMesh;

				this.interval = setInterval(function () {
					clearInterval(that.interval);
					that.oldPositionCamera = that.pickedObj.position;
					that.oldName = that.pickedObj.name;
					that.oldMaterial = that.pickedObj.material;
					var mapMaterial = new BABYLON.StandardMaterial("mapMaterial", that.scene);
					mapMaterial.diffuseTexture = new BABYLON.Texture("/Images/VGU_PLUS.png", that.scene);
					mapMaterial.backFaceCulling = true;
					mapMaterial.diffuseTexture.hasAlpha = true;
					that.pickedObj.material = mapMaterial;

					that.interval = null;
					that.allowRightHand = false;
					// MODIF PASSE LE MESH A LA PLACE DE LA POSITION DU MESH
					that.animCam.movaCam(that.pickedObj, that.scene.activeCamera.position);
				}, 1000);
			}
				// Hit sur un nouvel object ||  l'object précédent
			else {

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


		if (this.oldPositionCamera != null && this.scene.animationCamera == false) {
			for (var i = 0; i < this.scene.meshes.length; i++) {
				if (this.scene.meshes[i].name == this.oldName) {
					this.animCam.movaCam(this.scene.meshes[i], this.oldPositionCamera);
					this.scene.meshes[i].material = this.oldMaterial
					break;
				}
			}
			this.oldPositionCamera = null;
			this.allowRightHand = true;
		}

		if (this.vecRight != null) {
			this.vecRight = null;
		}
	};

})();
