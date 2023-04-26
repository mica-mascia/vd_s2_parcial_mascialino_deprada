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




const mapaFetch = d3.json('data/barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

	var edad_mision = data.map(function(d) {return d.edad_mision});
	var anio_mision = data.map(function(d) {return d.anio_mision});
	
	let max_edad_mision = Array(10);
	max_edad_mision.fill(0);
	let min_edad_mision = Array(10);
	min_edad_mision.fill(100);
	let avg_edad_mision = Array(10);
	avg_edad_mision.fill(0);
		
	for(let anio=2010;anio<=2023;anio++){
		for(let i=0;i<edad_mision.length;i++){
			if(anio_mision[i] == anio){
				
				if(edad_mision[i] > max_edad_mision[anio-2010]){
					max_edad_mision[anio-2010] = edad_mision[i];
				}else if (edad_mision[i] < min_edad_mision[anio-2010]){
					min_edad_mision[anio-2010] = edad_mision[i];
				}
				avg_edad_mision[anio-2010] = (avg_edad_mision[anio-2010] + edad_mision[i])/2;
			}
		}
	}


	let dataviz_3 = Plot.plot({
		marks: [
			Plot.axisX({tickFormat: "", labelAnchor: "center", anchor: "bottom", label: "Año" }),
			Plot.axisY({label: "Edades", marginTop: 20 }),
			Plot.areaY(data, {
				x: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
				y1: max_edad_mision,
				y2: min_edad_mision,
				dy: -16,
				//opacity: 0.5,
				curve: 'natural',
				fill: 'gray',
			}),
			Plot.line(data, {
				x: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
				y: avg_edad_mision,
				stroke: '#EE6C2F',
				curve: 'natural',
				dy: -16,
			}),
			Plot.dot(data, {
				x: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
				y: avg_edad_mision,
				stroke: '#EE6C2F',
				dy: -16,
			}),
			Plot.text(avg_edad_mision.slice(9), {
				x: [2019],
				y: avg_edad_mision[9],
				text: ["Promedio"],
				fill: "#EE6C2F",
				fontWeight: "bold",
				dx: 40,
				dy: -15,
				fontSize: "13px",
			}),
		],
		x: {
			tickFormat: 'd',
			grid: true,
		},
		y: {
			tickFormat: d3.format(',.0f'),
			grid: true,
		},
		color:{
			legend: true,
		},
		marginLeft: 70,
		marginRight: 70,
		insetTop: 15,
		line: true,
	})
	d3.select('#dataviz_3').append(() => dataviz_3)
})
//#endregion