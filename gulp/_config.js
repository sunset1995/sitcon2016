module.exports = {
	html: {
		src: 'app/index.html',
		dst: 'build/',
		watch: ['app/index.html', 'app/html/**/*']
	},
	js: {
		src: 'app/js/main.js',
		dst: 'build/',
		watch: 'app/js/**/*',
		include_paths: ['app/js/lib', __dirname + '/../node_modules']
	},
	scss: {
		src: 'app/scss/main.scss',
		dst: 'build/',
		watch: 'app/scss/**/*'
	},
	image: {
		src: 'app/image/**/*',
		dst: 'build/image/',
		watch: 'app/image/**/*'
	},
	favicon: {
		src: 'app/favicon*',
		dst: 'build/',
		watch: 'app/favicon*'
	},
	json: {
		src: 'app/json/*',
		dst: 'build/',
		watch: 'app/json/*'
	},
	cfp: {
		scss: {
			src: ['app/cfp/landingpage.scss', 'app/cfp/CFP.scss'],
			dst: 'build/cfp/'
		},
		allOthers: {
			src: 'app/cfp/allOthers/**',
			dst: 'build/cfp/'
		},
		watch: 'app/cfp/**/*'
	}
};
