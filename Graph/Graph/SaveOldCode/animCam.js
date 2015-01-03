var KINECTBABY = KINECTBABY || {};

(function () {

	KINECTBABY.animCamera = function (scene, position) {
		this.scene = scene;
		var that = this;
		this.newPosition = null;
		this.speed = 3;
		this.objDistance = 101;
		this.objDistanceY = 1;
		this.anime = false;
		//this.newPosition.z += this.objDistance;

		this.scene.registerBeforeRender(function () {
			that.anime = false;
			if (that.newPosition != null) {
				console.log("DISTANCE CAM => POSITION = " + BABYLON.Vector3.Distance(that.scene.activeCamera.position, that.newPosition));
				if (BABYLON.Vector3.Distance(that.scene.activeCamera.position, that.newPosition) > 13) {
					that.anime = true;
					that.scene.activeCamera.position = new BABYLON.Vector3.Lerp(that.scene.activeCamera.position, that.newPosition, 0.1);
				}
				else {
					that.anime = false;
					that.newPosition = null;

				}
			}


			/*if (BABYLON.Vector3.Distance(that.scene.activeCamera.position, that.newPosition) > 13) {
				if ((that.scene.activeCamera.position.x) < that.newPosition.x) {
					that.scene.activeCamera.position.x += that.speed;
					that.anime = true;
				}
				if ((that.scene.activeCamera.position.z + that.objDistance) < that.newPosition.z) {
					that.scene.activeCamera.position.z += that.speed;
					that.anime = true;
				}
				if ((that.scene.activeCamera.position.y - that.objDistanceY) < that.newPosition.y) {
					that.scene.activeCamera.position.y += that.speed;
					that.anime = true;
				}

				if ((that.scene.activeCamera.position.x) > that.newPosition.x) {
					that.scene.activeCamera.position.x -= that.speed;
					that.anime = true;
				}
				if ((that.scene.activeCamera.position.z + that.objDistance) > that.newPosition.z) {
					that.scene.activeCamera.position.z -= that.speed;
					that.anime = true;
				}
				if ((that.scene.activeCamera.position.y - that.objDistanceY) > that.newPosition.y) {
					that.scene.activeCamera.position.y -= that.speed;
					that.anime = true;
				}
			}*/
			that.scene.animationCamera = that.anime;

		});
	}

	KINECTBABY.animCamera.prototype.movaCam = function (position) {
		this.newPosition = position;
	};
	//KINECTBABY.animCamera.prototype.movaCamHand = function (position) {
	//	position[0] = position[0] / 10000;
	//	position[1] = position[1] / 10000;
	//	position[2] = ((position[2] ) / 10000);

	//	this.newPosition = new BABYLON.Vector3(position[0], position[1], position[2]);

	//	// console.log(this.newPosition);

	//};

})();