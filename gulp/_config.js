module.exports = {
	image: {
		src: 'app/image/**/*',
		dst: 'build/image/',
		watch: 'app/image/**/*'
	},
	sass: {
		src: 'app/scss/hackgen.scss',
		dst: 'build/',
		watch: 'app/scss/**/*'
	},
	js: {
		src: 'app/js/hackgen.js',
		dst: 'build',
		watch: 'app/js/**/**'
	},
	html: {
		src: 'app/index.html',
		dst: 'build',
		watch: ['app/index.html','app/pages/*']
	},
	cfp: {
		src: ['app/cfp/landingpage.scss', 'app/cfp/CFP.scss'],
		dst: 'build/cfp/',
		watch: ['app/cfp/landingpage.scss', 'app/cfp/CFP.scss']
	}
};
