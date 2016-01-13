loadPagePleaseWait = function() {
	var blockingPage = document.getElementById('loading-page');
	var percentageDOM = document.getElementById('loading-percentage');
	var waitNum=0, downloadNum=0;
	var pageStarted = false;

	var startPage = function() {
		if( pageStarted ) return;
		pageStarted = true;
		setTimeout(function() {
			document.getElementById('loading-page').style.display = 'none';
		}, 1000);
		blockingPage.style.opacity = '0';
	}

	// Init via hardcoded img tag
	var imgDOM = document.querySelectorAll('img');
	waitNum += imgDOM.length;
	downloadNum += imgDOM.length;
	imgDOM = null;

	window.onload = function() {
		percentageDOM.style.opacity = '1';
	}

	return {
		regist: function(dom) {
			waitNum++;
			dom.onload = function() {
				downloadNum++;
				if( downloadNum == waitNum )
					startPage();
				percentageDOM.innerHTML = parseInt(downloadNum*100 / waitNum, 10) + '%';
				dom.onload = null;
			}
		},
		forceStartPage: function() {
			startPage();
		}
	}
}();

setTimeout(loadPagePleaseWait.forceStartPage, 10000);
