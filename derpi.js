// Derpi.JS
// Library for accesing JSON API of http://derpibooru.org
// GitHub: https://github.com/ChristianSilvermoon/Derpi.js
// License: The Unlicense
// Version: v18.10.10

const FILTERS = {
	"DEFAULT"		: "100073",	//https://derpibooru.org/filters/100073
	"EVERYTHING"	: "56027",	//https://derpibooru.org/filters/56027
	"18+DARK"		: "37429",	//https://derpibooru.org/filters/37429
	"MAXSPOILERS"	: "37430",	//https://derpibooru.org/filters/37430
	"LEGACYDEFAULT"	: "37431",	//https://derpibooru.org/filters/37431
	"18+R34"		: "37432",	//https://derpibooru.org/filters/37432
}

function resolveFilter(id) {
	if ( FILTERS[id] ) {
		return FILTERS[id]; //set Filter using a preset name
	} else {
		return id;
	}
}

function fetchPromise( url ) {
	return new Promise( (resolve, reject) => {
		fetch( url ).then( response => {
			response.json().then( json => {
				resolve(json);
			}).catch( error => reject(error) )
		}).catch( error => reject(error) )
	});
}


export default class {
	constructor(apiKey = null) {
		this._filter	= FILTERS.DEFAULT;
		this.domain		= "https://derpibooru.org"
	}

	get filter() {
		return this._filter;
	}

	set filter(id) {
		this.filter_id = resolveFilter(id);
	}

	search(query, extraParams = {}) {
		const filter		= extraParams.filter? resolveFilter(extraParams.filter) : this._filter;
		const sortDir		= extraParams.sortDir? extraParams.sortDir : "desc";
		const sortBy		= extraParams.sortBy? extraParams.sortBy : "created_at";
		const perPage		= extraParams.perPage? extraParams.perPage : 19;
		const page			= extraParams.page? extraParams.page : 1;
		const sQuery		= encodeURIComponent(query);

		const searchURL		= `${this.domain}/search.json?` +
			`q=${sQuery}` +
			`&filter_id=${filter}` +
			`&sd=${sortDir}` +
			`&sf=${sortBy}`+
			`&perpage=${perPage}` +
			`&page=${page}`;

		return fetchPromise( searchURL );

	}

	favedBy(userID, extraParams = {}) {
		return this.search(`faved_by:${userID}`, extraParams);
	}

	post(id) {
		return fetchPromise(`${this.domain}/${id}.json`);
	}

	postOmbed(id, extraParams = {}) {
		let url = `${this.domain}/oembed.json?url=${this.domain}/${id}.json`;
		if ( extraParams.maxWidth ) {
			url += `&maxwidth=${extraParams.maxWidth}`;
		}

		if ( extraParams.maxHeight ) {
			url += `&maxheight=${extraParams.maxHeight}`;
		}

		return fetchPromise(url);
	}

	lists() {
		return fetchPromise(`${this.domain}/lists.json`);
	}
}
