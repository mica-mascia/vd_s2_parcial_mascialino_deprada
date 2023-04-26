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





Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

	let reclamosPorHora = data.map(function(d) {return d.hora_ingreso})

	reclamosPorHora.forEach((item, index, array) => {
		if(array[index]<'01:00:00'){
			array[index] = 0
		}else if(array[index]<'02:00:00'){
			array[index] = 1
		}else if(array[index]<'03:00:00'){
			array[index] = 2
		}else if(array[index]<'04:00:00'){
			array[index] = 3
		}else if(array[index]<'05:00:00'){
			array[index] = 4
		}else if(array[index]<'06:00:00'){
			array[index] = 5
		}else if(array[index]<'07:00:00'){
			array[index] = 6
		}else if(array[index]<'08:00:00'){
			array[index] = 7
		}else if(array[index]<'09:00:00'){
			array[index] = 8
		}else if(array[index]<'10:00:00'){
			array[index] = 9
		}else if(array[index]<'11:00:00'){
			array[index] = 10
		}else if(array[index]<'12:00:00'){
			array[index] = 11
		}else if(array[index]<'13:00:00'){
			array[index] = 12
		}else if(array[index]<'14:00:00'){
			array[index] = 13
		}else if(array[index]<'15:00:00'){
			array[index] = 14
		}else if(array[index]<'16:00:00'){
			array[index] = 15
		}else if(array[index]<'17:00:00'){
			array[index] = 16
		}else if(array[index]<'18:00:00'){
			array[index] = 17
		}else if(array[index]<'19:00:00'){
			array[index] = 18
		}else if(array[index]<'20:00:00'){
			array[index] = 19
		}else if(array[index]<'21:00:00'){
			array[index] = 20
		}else if(array[index]<'22:00:00'){
			array[index] = 21
		}else if(array[index]<'23:00:00'){
			array[index] = 22
		}else{
			array[index] = 23
		}
  })

  let dataviz_C = Plot.plot({
	x: {domain: [0, 23], interval: 1,},
	y: {label: "cantidad de reclamos", domain: [1,400]},
	width: 800,
	height: 500,
    line: true,
    nice: true,
    zero: true,
    grid: true,
    marks: [
		Plot.areaY(data,
			Plot.groupX(
				{ y: "sum",},
				{
					x: reclamosPorHora,
					curve: "natural",
					title: reclamosPorHora + ":00",
				},
			),
		),
		
    ],
	color: {
		gradient: 'linear',
		scheme: 'ylorbr',
	}

  })
  d3.select('#dataviz_C').append(() => dataviz_C)
})



Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

	let reclamosPorHora = data.map(function(d) {return d.hora_ingreso})

  	reclamosPorHora.forEach((item, index, array) => {
		if(array[index]<'06:00:00'){
			array[index] = "madrugada"
		}else if(array[index]<'12:00:00'){
			array[index] = "mañana"
		}else if(array[index]<'14:00:00'){
			array[index] = "mediodía"
		}else if(array[index]<'19:00:00'){
			array[index] = "tarde"
		}else if(array[index]<'23:59:59'){
			array[index] = "noche"
		}
  })

  let dataviz_D = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
	color: {
		type: 'categorical', 
		n: 5,
		range: ["blue", "red", "yellow", "green", "pink"],
		
		legend: true,
		marginLeft: 45
	  },
    marks: [
      Plot.geo(barrios, {
        stroke: '#bbb',
      }),
     Plot.dot(data, {
        x: 'lon',
        y: 'lat',
        r: 4,
        stroke: 'none',
        fill: reclamosPorHora,
		opacity: 0.4,
		//opacity: (d)=>(d.prestacion === "DESRATIZAR, DESINSECTAR Y DESINFECTAR EN VÍA PÚBLICA" ? 0.4 : 0.8),
      }),
    ],
    
  })

  d3.select('#dataviz_D').append(() => dataviz_D)
})



Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

	let establecimientos = data.map(function(d) {return d.prestacion})

	establecimientos.forEach((item, index, array) => {
		if(array[index] == "DESRATIZAR, DESINSECTAR Y DESINFECTAR EN VÍA PÚBLICA"){
			array[index] = "Vía pública"
		}else if(array[index] == "DESINFECCIÓN/DESINSECTACIÓN/DESRATIZACIÓN EN ESTABLECIMIENTO EDUCATIVO ESTATAL"){
			array[index] = "Escuela"
		}else if(array[index] == "NIVELACIÓN POR HUNDIMIENTO DEL PAVIMENTO"){
			array[index] = "Terreno baldío"
		}else{
			//casos CONSULTA TÉCNICA SOBRE TRÁMITE DE CERTIFICADO DE APTITUD AMBIENTAL - LAVADEROS - ANTENAS y HIGIENIZACIÓN, DESRATIZACIÓN, SANEAMIENTO DE TERRENO BALDÍO/CASA ABANDONADA
			array[index] = "Casa abandonada" //o terreno baldío?
		}
  })

  let dataviz_E = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
	color: {
		type: 'categorical', 
		n: 5,
		range: ["yellow", "red", "blue", "pink"],
		
		legend: true,
		marginLeft: 45
	  },
    marks: [
      Plot.geo(barrios, {
        stroke: '#bbb',
      }),
     Plot.dot(data, {
        x: 'lon',
        y: 'lat',
        r: 4,
        stroke: 'none',
        fill: establecimientos,
		opacity: (d)=>(d.prestacion === "DESRATIZAR, DESINSECTAR Y DESINFECTAR EN VÍA PÚBLICA" ? 0.4 : 0.8),
      }),
    ],
    
  })

  d3.select('#dataviz_E').append(() => dataviz_E)


})


d3.formatDefaultLocale(locale)
// La idea seria responder a la pregunta de en que epocas hay mas denuncias de ratas
// En el eje Y debe estar la cantidad de denuncias y en el x las fechas (tiempo)



d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType).then(data => {

    data.forEach(d => {
        d.fecha_ingreso = new Date(d.fecha_ingreso)
      })
    
        
        //console.log(data)
		let dataviz_B = Plot.plot({
			marks: [
				//Plot.axisX({tickFormat: "", labelAnchor: "center", anchor: "bottom", label: "Año" }),
				//Plot.axisY({anchor: "left", label: "Porcentaje"})

				Plot.areaY(data, {
					x: "fecha_ingreso",
					y: d3.group(data.filter(d=> d.categoria != "BARRIOS EMERGENTES"), d => d.fecha_ingreso),
					
					//curve: 'natural',
					//opacity: 0.5,
				}),

			],


			//x: {
			//	tickFormat: 'd',
			//},
			//y: {
			//	tickFormat: d3.format(',.0f'),
			//	grid: true,
			//},
			//color:{
			//	range: ["grey", "#EE6D2F"], 
			//	type: "categorical",
//legend: true,
			//	//marginLeft: 50,
			//},
			//line: true,
		})
		d3.select('#dataviz_B').append(() => dataviz_B)
	}
)
//#endregion