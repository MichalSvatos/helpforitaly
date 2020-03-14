// Ajax request for JSON data with vanilla JavaScript
// https://code-maven.com/ajax-request-for-json-data
// by Gabor Szabo
// edited

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

ajax_get('../data/institutions.json', function(data) {
	let html = '';

	for (let i=0; i < data['institutions'].length; i++) {
		html += `<a href="${data['institutions'][i]["url"]}" target="_blank" rel="noopener" class="institution__item">
					<span class="institution__title">${data['institutions'][i]["name"]}</span>
					<span class="institution__url">${data['institutions'][i]["url"]}</span>
					<span class="institution__desc">${data['institutions'][i]["desc"]}</span>
					<span class="institution__loc">
						<span class="loc">${data['institutions'][i]["location"]}</span>
					</span>
				</a>`;
	}

	document.getElementById("institutions").innerHTML = html;
});

ajax_get('../data/links.json', function (data) {
	let links = '';

	for (let i=0; i < data['links'].length; i++) {
		links += `<li><a href="${data['links'][i]}" target="_blank" rel="noopener">${data['links'][i]}</a></li>`
	}

	document.getElementById("links").innerHTML = links;
});

