var KINECTBABY = KINECTBABY || {};

(function () {

	KINECTBABY.animCamera = function (scene) {
		this.scene = scene;
		var that = this;
		this.objectToMove = null;
		this.newPosition = null;
		//this.speed = 3;
		//this.objDistance = 101;
		//this.objDistanceY = 1;
		this.anime = false;
		//this.meshPosition = null;
		//this.newPosition.z += this.objDistance;

		this.scene.registerBeforeRender(function () {
			that.anime = false;
			if (that.objectToMove != null && that.newPosition != null) {

				if (BABYLON.Vector3.Distance(that.objectToMove.position, that.newPosition) > 13) {
					that.anime = true;
					that.objectToMove.position = new BABYLON.Vector3.Lerp(that.objectToMove.position, that.newPosition, 0.1);
				}
				else {
					that.anime = false;
					that.objectToMove = null;
				}
			}
			//else if (that.newPosition != null && that.meshPosition != null) {

			//	console.log(BABYLON.Vector3.Distance(that.newPosition.position, that.meshPosition));
			//	console.log("MESH POS = " + that.newPosition.position);
			//	console.log("VA VERS  = " + that.meshPosition);
			//	if (BABYLON.Vector3.Distance(that.newPosition.position, that.meshPosition) > 13) {

			//		that.anime = true;
			//		that.newPosition.position = new BABYLON.Vector3.Lerp(that.scene.activeCamera.position, that.meshPosition, 0.1);
					

			//	}
			//	else {
			//		that.anime = false;
			//		that.newPosition = null;
			//		that.meshPosition = null;
			//	}
			//}
			that.scene.animationCamera = that.anime;

		});








		//this.scene.registerBeforeRender(function () {
		//	that.anime = false;
		//	if (that.newPosition != null) {
		//		if (BABYLON.Vector3.Distance(that.scene.activeCamera.position, that.newPosition) > 13) {
		//			that.anime = true;
		//			that.scene.activeCamera.position = new BABYLON.Vector3.Lerp(that.scene.activeCamera.position, that.newPosition, 0.1);
		//		}
		//		else {
		//			that.anime = false;
		//			that.newPosition = null;
		//		}
		//	}
		//	that.scene.animationCamera = that.anime;

		//});
	}

	KINECTBABY.animCamera.prototype.movaCam = function (objectToMove, newPosition) {
		this.objectToMove = objectToMove;
		this.newPosition = newPosition;
	};
})();