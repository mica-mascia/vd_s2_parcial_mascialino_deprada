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






// Pregunta a responder: Cuales son los barrios con mas problemas de ratas de la ciudad?

const mapaFetch = d3.json('data/barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  console.log(reclamosPorBarrio)
  /* A cada feature del mapa le agregamos la prop DENUNCIAS */
  barrios.features.forEach(d => {
    let nombreBarrio = d.properties.BARRIO
    let cantReclamos =  reclamosPorBarrio.get(nombreBarrio).length
    d.properties.DENUNCIAS = cantReclamos

    console.log(nombreBarrio + ': ' + cantReclamos)
  })


  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },

    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      n: 10,
      scheme: 'ylorbr',
      label: 'Cantidad de denuncias de ratas',
      legend: true,
    },

    marks: [
      Plot.geo(barrios, {
        fill: d => d.properties.DENUNCIAS,
        stroke: 'gray',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
      Plot.text(
        barrios.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO,
          fill: "currentColor",
          stroke: "white",
          textAnchor: "center",
          dx: 4,
          filter: (d) => d.properties.DENUNCIAS > 80
        })
      )
    ],
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#dataviz_A').append(() => chartMap)


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