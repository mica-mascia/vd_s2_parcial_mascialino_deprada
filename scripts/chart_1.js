/* d3.select('#dataviz_1').append(() =>
	Plot.geo('../data/147_desratizacion.csv', {fill: (d) => d.properties.unemployment}).plot({
		projection: "urn:ogc:def:crs:OGC:1.3:CRS84",
		color: {
			type: "quantile",
			n: 8,
			scheme: "blues",
			label: "Reclamos",
			legend: true
		}
	})
) */


d3.csv('data/147_desratizacion.csv', d3.autoType).then(data => {

	var datos = data.map(function(d) {return d});

	for(let i=0; i<10;i++){
		console.log(datos[i])
	}
	let dataviz_1 = Plot.plot({
		line: true,
		nice: true,
		zero: true,
		grid: true,
		marks: [
			Plot.dot(data, {
				x: 'lat',
				y: 'lon',
				fillOpacity: 0.6,
				symbol: 'square',
			}),
		],
	})
	d3.select('#dataviz_1').append(() => dataviz_1)
})