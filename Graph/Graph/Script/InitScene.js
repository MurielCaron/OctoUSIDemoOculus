var KINECTBABY = KINECTBABY || {};

(function () {

	// Contructor
	KINECTBABY.inintScene = function (connectedCanvas) {
		this.connectedCanvas = connectedCanvas;
		var that = this;

		// Check support
		if (!BABYLON.Engine.isSupported()) {
			window.alert('Browser not supported');
		} else {
			// Babylon
			this.engine = new BABYLON.Engine(this.connectedCanvas, true);
			this.scene = new BABYLON.Scene(this.engine);

			//Adding Camera
			this.camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 0, 0), this.scene);
			//this.camera.angularSensibility = 0;
			//this.camera.attachControl(this.connectedCanvas, true);
			// BABYLON.Engine.ShadersRepository = "/Babylon/Shaders/";

			this.originCamera = this.scene.activeCamera;
			this.objCameraOculus = new BABYLON.OculusOrientedCamera.BuildOculusStereoCamera(this.scene, "Oculus", this.originCamera.minZ,
			this.originCamera.maxZ, this.originCamera.position,
			{ yaw: 3, pitch: 0, roll: 0 }, false, true, true);


			// Light
			this.light0 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), this.scene);
			this.light0.specular = new BABYLON.Color3(0, 0, 0);
			this.engine.runRenderLoop(function () {
				that.scene.render();
			});

		}

		//SKYBOX
		var skybox = BABYLON.Mesh.CreateBox("skyBox", 800, this.scene);
		skybox.isPickable = false;
		var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
		skyboxMaterial.backFaceCulling = false;
		skybox.material = skyboxMaterial;
		skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
		skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/Images/skybox/ciel", this.scene);
		skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	};

	KINECTBABY.inintScene.prototype.addBasicMesh = function (type, size, position) {
		object = null;
		switch (type) {
			case KINECTBABY.inintScene.OBJECTTYPE_BOX:
				object = new BABYLON.Mesh[type]("box", size, this.scene);
				object.position = position;
				break;
			case KINECTBABY.inintScene.OBJECTTYPE_SPHERE:
				object = new BABYLON.Mesh[type]("sphere", 35, size, this.scene);
				object.position = position;
				break;
		}
	};

	KINECTBABY.inintScene.prototype.addGrid = function () {
		this.map = BABYLON.Mesh.CreatePlane("map", 150, this.scene, true);

		var mapMaterial = new BABYLON.StandardMaterial("mapMaterial", this.scene);
		mapMaterial.diffuseTexture = new BABYLON.Texture("/Images/grille.png", this.scene);
		mapMaterial.diffuseTexture.uScale = 15.0;
		mapMaterial.diffuseTexture.vScale = 15.0;
		mapMaterial.backFaceCulling = true;
		mapMaterial.diffuseTexture.hasAlpha = true;
		this.map.material = mapMaterial;
		this.map.rotation.x = Math.PI / 2;
		this.map.position.y = -50;
	};

	KINECTBABY.inintScene.prototype.terre = function () {
		this.terre = BABYLON.Mesh.CreateSphere("skyBox", 200, 100, this.scene);
		var mapMaterial = new BABYLON.StandardMaterial("mapMaterial", this.scene);
		mapMaterial.diffuseTexture = new BABYLON.Texture("/Images/wTerre.jpg", this.scene);
		mapMaterial.backFaceCulling = true;
		mapMaterial.diffuseTexture.hasAlpha = true;
		this.terre.material = mapMaterial;

		this.terre.position.y = -50;
		this.terre.position.z = 50;
		this.terre.position.x = -200;

		this.terre.rotation.y = Math.PI / 2.5;
	};

	// STATIC
	KINECTBABY.inintScene.OBJECTTYPE_BOX = "CreateBox";
	KINECTBABY.inintScene.OBJECTTYPE_SPHERE = "CreateSphere";
	KINECTBABY.inintScene.OBJECTTYPE_CYLINDER = "CreateCylinder";
	KINECTBABY.inintScene.OBJECTTYPE_TORUS = "CreateTorus";
	KINECTBABY.inintScene.OBJECTTYPE_CYLINDERCONE = "CreateCylinderCone";
})();