//EXPLORACION DE GRAFICOS


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

/* 
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

 */





//LO PODRIAMOS DEJAR COMO PARTE DE LA EXPLORACION EN CASO DE QUE HAYA QUE PONERLA
Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
	/* Mapa Coroplético */
	let chartMap2 = Plot.plot({
	  // https://github.com/observablehq/plot#projection-options
	  projection: {
		type: 'mercator',
		domain: barrios, // Objeto GeoJson a encuadrar
	  },
	  color: {
		range: ["#e9dfd5", "#cec3ae", "#b8bb9c", "#BACF97", "#9EB47B"],
	  },
	  marks: [
		Plot.density(data, { x: 'lon', y: 'lat', fill: 'density',bandwidth: 15, thresholds: 30 }),
		Plot.geo(barrios, {
		  stroke: 'gray',
		  title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
		}),
	  ],
	})
  
	/* Agregamos al DOM la visualización chartMap */
	d3.select('#chart3').append(() => chartMap2)
  })
  





//***************************************************************************************************888 */


const locale = {
	decimal: ',',
	thousands: '.',
	grouping: [3],
}

d3.formatDefaultLocale(locale)

d3.csv('data/147_desratizacion.csv', d3.autoType).then(data => {

		let dataviz_2 = Plot.plot({
			marks: [
				Plot.axisX({tickFormat: "", labelAnchor: "center", anchor: "bottom", label: "Año" }),
				Plot.axisY({anchor: "left", label: "Porcentaje"}),
				Plot.areaY(newarr, {
					x: 'anio',
					y: 'porcentaje',
					fill: 'status',
					curve: 'natural',
					//opacity: 0.5,
				}),
				Plot.lineY(newarr, {
					x: 'anio',
					y: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
					curve: 'natural',
					opacity: 0.3,
				}),

			],
			x: {
				tickFormat: 'd',
			},
			y: {
				tickFormat: d3.format(',.0f'),
				grid: true,
			},
			color:{
				range: ["grey", "#EE6D2F"], 
				type: "categorical",
				legend: true,
				//marginLeft: 50,
			},
			line: true,
		})
		d3.select('#dataviz_2').append(() => dataviz_2)
	}
)
//#endregion