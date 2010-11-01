
function contains(items, item) {
	
	for (i in items) {

		if (items[i] == item) {

			return true;
		}
	}
   	return false;
}

function removeByValue(arr, val) {
	
	for(var i=0; i<arr.length; i++) {

		if(arr[i] == val) {

			arr.splice(i, 1);
			break;
		}
	}
}

function clearUl() {
	
	var div = document.getElementById('sites');
	var ul = div.getElementsByTagName('ul')[0];
	var li = ul.getElementsByTagName('li');
	var len = li.length;

	while (len--) {

		ul.removeChild(li[len]);
	}
}

function viewSites() {
	
	clearUl();
	
	var sites = JSON.parse(localStorage.getItem('sites'));
	
	for(var i in sites) {
		
		var container = document.getElementById('sitesList');
		var new_element = document.createElement('li');
		new_element.innerHTML = " <input type='checkbox' name='" + sites[i] + "' value='" + sites[i] + "' />&nbsp;" + sites[i];
		container.insertBefore(new_element, container.firstChild);
	}
}

function saveSite() {

	// Get sites from localStorage
	var sites = JSON.parse(localStorage.getItem('sites'));
	
	// Get entered url
	var site = document.getElementById("siteName").value;
	document.getElementById("siteName").value = "";
	
	if(null == site || site.length == 0) {

		return;
	}
	
	// Check if we already have the new site
	if(!contains(sites, site)) {
		
		// Add the site and save it back to localStorage
		sites[sites.length] =  site;
		localStorage.removeItem('sites');
		localStorage['sites'] = JSON.stringify(sites);
		document.getElementById('message').innerHTML = "Added " + site + " successfully";
	}
	else {

		document.getElementById('message').innerHTML = site + " is already protected";
	}
	
	viewSites();
}

function deleteSites() {
	
	var storedSites = JSON.parse(localStorage.getItem('sites'));
	var removedSites = [];
	var sites = document.getElementById('sitesList');

	for(var i in sites.childNodes) {

		var site = sites.childNodes[i];

		if("LI" == site.nodeName) {

			if(site.childNodes[1].checked) {

				var siteName = site.childNodes[1].name;
				console.log(siteName);
				removeByValue(storedSites, siteName);
				console.log(storedSites);
				removedSites[removedSites.length] = siteName;
			}
		}
	}
	
	localStorage.removeItem('sites');
	localStorage['sites'] = JSON.stringify(storedSites);
	
	if(removedSites.length > 0 ) {

		document.getElementById('message').innerHTML = "Removed the following site(s): " + removedSites;
	}
	
	viewSites();
}