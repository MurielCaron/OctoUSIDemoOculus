var KINECTBABY = KINECTBABY || {};

(function () {

	// Class qui prend une scene et un tableau multi-dim

	KINECTBABY.dataGenerate = function (scene, aData) {
		this.scene = scene;
		this.aData = aData;
		this.distance = 25;
		this.height = 0;
		this.line = 0;
		var that = this;

		this._arrayParcourt(this.aData);
		this._link();

		this.scene.registerBeforeRender(function () {
			that._lookCam();
		});

	}

	KINECTBABY.dataGenerate.prototype._arrayParcourt = function (aArray) {
		var distx = 0;
		var disty = 0;
		var distz = 0;

		for (var i = 0; i < aArray.items.length  ; i++) {

			var test = aArray.items[i];
			var obj = this._objDataStyle(test.nickname);

			obj.DataName = test.first_name;
			obj.DataLastName = test.last_name;

			distx = this._randomObj();
			disty = this._randomObj();
			distz = this._randomObj();

			obj.position.x = distx;
			obj.position.y = disty;
			obj.position.z = distz;
		}

	}

	KINECTBABY.dataGenerate.prototype._randomObj = function (max, min) {
		var rando = Math.random() * (100 - (-100)) + (-100);
		while (rando > -25 && rando < 25) {
			rando = Math.random() * (100 - (-100)) + (-100);
		}

		return rando;
	}

	KINECTBABY.dataGenerate.prototype._link = function () {
		this.scene;
		var arrObjData = this._countobjData();

		for (var i = 0; i < arrObjData.length; i++) {
			var randEntreObj = Math.floor(Math.random() * (arrObjData.length - 1 + 1) + 1);
			if (randEntreObj % 2 == 1) {
				this._linkCreate(this.scene.meshes[arrObjData[i]].position, this.scene.meshes[arrObjData[randEntreObj - 1]].position);
			}
		}


		this._linkCreate(this.scene.meshes[1].position, this.scene.meshes[2].position);

	};

	KINECTBABY.dataGenerate.prototype._countobjData = function () {
		var count = 0;
		var arr = [];

		for (var i = 0; i < this.scene.meshes.length; i++) {
			if (this.scene.meshes[i].name == "aData") {
				arr.push(i);
			}
		}

		return arr;
	}

	KINECTBABY.dataGenerate.prototype._linkCreate = function (vectorStart, vectorStop) {
		var a = vectorStart;
		var b = vectorStop;

		var millieuX = (a.x + b.x) / 2;
		var millieuY = (a.y + b.y) / 2;
		var millieuZ = (a.z + b.z) / 2;

		var millieu = new BABYLON.Vector3(millieuX, millieuY, millieuZ);

		var taille = BABYLON.Vector3.Distance(a, b);

		var vdir = a.subtract(b);

		var line = this._linkStyle(taille);
		line.position = millieu;

		line.rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1);
		line.lookAt(b, 0, Math.PI / 2, 0);

	};

	KINECTBABY.dataGenerate.prototype._linkStyle = function (taille) {
		var line = new BABYLON.Mesh.CreateCylinder("cylinder", taille, 0.2, 0.2, 4, this.scene, false);

		var lineMaterial = new BABYLON.StandardMaterial("lineMaterial", this.scene);
		lineMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
		lineMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		lineMaterial.specularPower = 32;
		lineMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);
		lineMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
		lineMaterial.alpha = 0.5;
		line.material = lineMaterial;

		return line;
	};

	KINECTBABY.dataGenerate.prototype._objDataStyle = function (nikename) {
		var objData = BABYLON.Mesh.CreatePlane("Data_" + nikename, 10, this.scene);
		console.log(objData.name);
		var mapMaterial = new BABYLON.StandardMaterial("mapMaterial", this.scene);
		mapMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
		mapMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
		mapMaterial.ambientColor = new BABYLON.Color3(1, 1, 1);
		mapMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
		// mapMaterial.diffuseTexture = new BABYLON.Texture("/Images/VGU.jpg", this.scene);
		mapMaterial.diffuseTexture = new BABYLON.Texture("/Images/octoCarte/" + nikename  + ".png", this.scene);

		mapMaterial.backFaceCulling = false;
		mapMaterial.diffuseTexture.hasAlpha = true;

		objData.material = mapMaterial;
		/////////////////////////////////////////////////////////////////////////////////

		//var objDataBox = BABYLON.Mesh.CreateSphere("aData", 10, 20, this.scene);

		//var mapMaterialBox = new BABYLON.StandardMaterial("mapMaterial", this.scene);
		//mapMaterialBox.alpha = 0.5;

		//objDataBox.material = mapMaterialBox;

		//objDataBox.parent = objData;


		return objData;
	};

	KINECTBABY.dataGenerate.prototype._lookCam = function () {
		var arrObjData = this._countobjData();
		for (var i = 0; i < arrObjData.length; i++) {
			this.scene.meshes[arrObjData[i]].rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1);
			this.scene.meshes[arrObjData[i]].lookAt(this.scene.activeCamera.position);
		}
	};
})();