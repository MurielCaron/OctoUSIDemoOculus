window.onload = function () {
	 var radar = loaded();
	//var canvas = document.getElementById('canvasBox');
	//var aData = askBob;
	//var aDataKiff = dataKiff;


	//var Scene = new KINECTBABY.inintScene(canvas);
	//var object = new KINECTBABY.moveObj(Scene.scene);
	//new KINECTBABY.trueDataGenerate(Scene.scene, dataKiff);
	//new KINECTBABY.magicMouse(Scene.scene);
	// Kinect.connect("http://localhost", 52906);


	// var defaultSensor = Kinect.sensor(Kinect.DEFAULT_SENSOR_NAME);

	//defaultSensor.addStreamFrameHandler(function (frame) {

	//	switch (frame.stream) {
	//		case Kinect.SKELETON_STREAM_NAME:
	//			for (var iSkeleton = 0; iSkeleton < frame.skeletons.length; ++iSkeleton) {
	//				var skeleton = frame.skeletons[iSkeleton];

	//				skeleton.trackingId;
	//				skeleton.trackingState;
	//				skeleton.position;

	//				for (var iJoint = 0; iJoint < skeleton.joints.length; ++iJoint) {
	//					var joint = skeleton.joints[iJoint];
	//					joint.jointType;
	//					joint.trackingState;
	//					joint.position;
	//				}
	//			}

	//			break;
	//	}
	//});

};

function loaded() {

	var radardiv = document.getElementById('radar');
	var canvas = document.getElementById('canvasBox');
	var aData = askBob;
	var aDataKiff = dataKiff;

	var Scene = new KINECTBABY.inintScene(canvas);
	var object = new KINECTBABY.moveObj(Scene.scene, Scene.objCameraOculus);
	new KINECTBABY.trueDataGenerate(Scene.scene, aData);
	var animCam = new KINECTBABY.animCamera(Scene.scene);

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

			if (user.skeleton[zig.Joint.RightHand].position[2] + 150 < user.skeleton[zig.Joint.Head].position[2]) {
				object.moveObjHandRight(user.skeleton[zig.Joint.RightHand].position);

			}
			if (user.skeleton[zig.Joint.RightHand].position[2] + 150 > user.skeleton[zig.Joint.Head].position[2]) {
				object.noHandRight();

			}

		});
	});
	engager.addEventListener('userdisengaged', function (user) {
		console.log('User disengaged: ' + user.id);
	});
	zig.addListener(engager);
}

