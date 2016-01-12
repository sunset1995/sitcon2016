var ajax = require('superagent');

ajax.get('https://staff.sitcon.org/api/staffgroups/')
	.query({format: 'json'})
	.end(function(err, res) {
		console.log(res.text);
	});
