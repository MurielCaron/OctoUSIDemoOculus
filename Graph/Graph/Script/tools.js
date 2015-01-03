function cutDataName(type, name) {
	var str = "";
	if (name.length > 4 && name.substring(0, 4) == "Data") {

		if (type == "data") {
			str = name.substring(0, 4);
		}
		else if (type == "trigramme") {
			str = name.substring(5, 8);
		}
	}

	return str;
}