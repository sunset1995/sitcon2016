Request = require('superagent');

Request.get('https://staff.sitcon.org/api/staffgroups/')
	.withCredentials()
	.end(function(err, res) {
		console.log(err)
		console.log(res)
	});
