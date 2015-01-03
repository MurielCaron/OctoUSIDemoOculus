window.onload = function () {
	var radar = loaded();
	//var canvas = document.getElementById('canvasBox');
	//var aData = askBob;
	//var aDataKiff = dataKiff;


	//var Scene = new KINECTBABY.inintScene(canvas);
	//var object = new KINECTBABY.moveObj(Scene.scene);
	//new KINECTBABY.trueDataGenerate(Scene.scene, dataKiff);
	//new KINECTBABY.magicMouse(Scene.scene);


};

function loaded() {

	var radardiv = document.getElementById('radar');
	var canvas = document.getElementById('canvasBox');
	var aData = askBob;
	var aDataKiff = dataKiff;

	var Scene = new KINECTBABY.inintScene(canvas);
	var object = new KINECTBABY.moveObj(Scene.scene);
	new KINECTBABY.dataGenerate(Scene.scene, aData);
	// var animCam = new KINECTBABY.animCamera(Scene.scene);

	// detection d'un user (entre, sort, bouge)
	var radar = {
		onuserfound: function (user) {
			//object.addObj(user.id);
			var userdiv = document.createElement('div');
			userdiv.className = 'user';
			user.radarelement = userdiv; // add the radarelement property to the user object
			radardiv.appendChild(user.radarelement);
			//console.log(0)
		},
		onuserlost: function (user) {
			object.deleteObj();
			radardiv.removeChild(user.radarelement);
		},
		ondataupdate: function (zigdata) {
			for (var userid in zigdata.users) {
				var user = zigdata.users[userid];
				var pos = user.position;
				var el = user.radarelement;
				var parentElement = el.parentNode;
				var zrange = 4000;
				var xrange = 4000;
				var pixelwidth = parentElement.offsetWidth;
				var pixelheight = parentElement.offsetHeight;
				var heightscale = pixelheight / zrange;
				var widthscale = pixelwidth / xrange;
				el.style.left = (((pos[0] / xrange) + 0.5) * pixelwidth - (el.offsetWidth / 2)) + "px";
				el.style.top = ((pos[2] / zrange) * pixelheight - (el.offsetHeight / 2)) + "px";
			}
		}
	};
	zig.addListener(radar);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SKELETON 
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var engager = zig.EngageUsersWithSkeleton(1);
	engager.addEventListener('userengaged', function (user) {
		user.addEventListener('userupdate', function (user) {
			object.moveObjHandLeft(user.skeleton[zig.Joint.LeftHand].position);

			//if (object.allowRightHandf()) {
			if (user.skeleton[zig.Joint.RightHand].position[2] + 150 < user.skeleton[zig.Joint.Head].position[2]) {
				object.moveObjHandRight(user.skeleton[zig.Joint.RightHand].position);

			}
			if (user.skeleton[zig.Joint.RightHand].position[2] + 150 > user.skeleton[zig.Joint.Head].position[2]) {
				object.noHandRight();

			}
			// }

			//if (user.skeleton[zig.Joint.RightHand].position[2] + 150 > user.skeleton[zig.Joint.Head].position[2]) {
			//	object.moveObjHandRightClear();
			//}

		});
	});
	engager.addEventListener('userdisengaged', function (user) {
		console.log('User disengaged: ' + user.id);
	});
	zig.addListener(engager);


	//////////////////////////

	//// detection de la main (stable ou pas)
	//var steadyDetector = zig.controls.SteadyDetector();
	//steadyDetector.addEventListener('steady', function (sd) {
	//	object.changeColor();

	//});
	//steadyDetector.addEventListener('unsteady', function (sd) {
	//	console.log('SteadyDetector: Unsteady');
	//	object.resetColor();
	//});
	//zig.singleUserSession.addListener(steadyDetector);

	//// detection d'un mouvement de la main (bouge , droite , gauche, haut , bas)
	//// SwipeDetector
	//var swipeDetector = zig.controls.SwipeDetector();
	//swipeDetector.addEventListener('swipeup', function (pd) {
	//	object.moveTop();
	//});
	//swipeDetector.addEventListener('swipedown', function (pd) {
	//	object.moveDown();

	//});
	//swipeDetector.addEventListener('swipeleft', function (pd) {
	//	object.moveLeft();

	//});
	//swipeDetector.addEventListener('swiperight', function (pd) {
	//	object.moveRight();

	//});
	//swipeDetector.addEventListener('swipe', function (dir) {
	//	console.log('SwipeDetector: Swipe direction: ' + dir);
	//});
	//zig.singleUserSession.addListener(swipeDetector);

}

