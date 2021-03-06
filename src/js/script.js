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
					<span class="institution__tags">
						<span class="location"></span>
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
		let className = slugify(name);

		finalHtml += `<div class="instutitions__section institutions__section--${className}">
						<h4 class="institutions__region-title js-lazyload">${name}</h4>

						<div class="institution__region-wrapper">${html}</div>
					</div>`;
	}

	document.getElementById("institutions").innerHTML = finalHtml;
});


ajax_get('data/links.json?' + version, function (data) {
	let links = '';

	for (let i=0; i < data['links'].length; i++) {
		links += `<li><a href="${data['links'][i]["url"]}" target="_blank" rel="noopener">${data['links'][i]["title"]}</a></li>`
	}

	document.getElementById("links").innerHTML = links;
});


// Slugify string
function slugify(str) {
	str = str
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9 -]/g, "");

	return str;
}

// Thanks Filip Vitas
// https://medium.com/@filipvitas/lazy-load-images-with-zero-javascript-2c5bcb691274
function lazyLoad(){
	let titles =[...document.querySelectorAll('.js-lazyload')];
	
	function onIntersection(titleEntities) {
		titleEntities.forEach(title => {
			if (title.isIntersecting) {
				observer.unobserve(title.target);
				title.target.classList.add('is-loaded');
			}
		})
	}

	let observer = new IntersectionObserver(onIntersection);

	titles.forEach(title => observer.observe(title));
}

setTimeout(lazyLoad, 2000);