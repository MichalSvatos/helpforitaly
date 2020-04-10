// Ajax request for JSON data with vanilla JavaScript
// https://code-maven.com/ajax-request-for-json-data
// by Gabor Szabo
// edited

let version = Math.floor((Math.random() * 100) + 1);

function ajax_get(url, callback) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			try {
				var data = JSON.parse(xmlhttp.responseText);

			} catch(err) {
				return;

			}
			callback(data);
		}
	};

	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

ajax_get('data/institutions.json?' + version, function(data) {
	let locations = [];
	let html = '';
	let finalHtml = '';

	// ... with the help from Petr Kinc :)
	for (let i = 0; i < data['institutions'].length; i++) {

		let location = data['institutions'][i]["location"];
		let hasLocationGroup = locations.find(o => o.name === location);
		// let payments = data['institutions'][i]["payment"];

		let html =  `<a href="${data['institutions'][i]["url"]}" target="_blank" rel="noopener" class="institution__item">
					<span class="institution__title">${data['institutions'][i]["name"]}</span>
					<span class="institution__url">${data['institutions'][i]["url"]}</span>
					<span class="institution__desc">${data['institutions'][i]["desc"]}</span>
					<span class="institution__pay">
						<span class="payment"></span>
					</span>
				</a>`;

		if (hasLocationGroup) {
			let index = locations.findIndex(x => x.name === location);
			locations[index].html += html;

		} else {
			let locationObj = {
				name : location,
				html : html
			};

			locations.push(locationObj);
		}
	}

	for (let i = 0; i < locations.length; i++) {
		let name = locations[i].name;
		let html = locations[i].html;

		finalHtml += `<div class="instutitions__section">
						<h4 class="institutions__region-title">${name}</h4>

						<div class="institution__region-wrapper">${html}</div>
					</div>`;
	}

	document.getElementById("institutions").innerHTML = finalHtml;

});


ajax_get('data/links.json?' + version, function (data) {
	let links = '';
	console.log(data);

	for (let i=0; i < data['links'].length; i++) {
		links += `<li><a href="${data['links'][i]["url"]}" target="_blank" rel="noopener">${data['links'][i]["title"]}</a></li>`
	}

	document.getElementById("links").innerHTML = links;
});

