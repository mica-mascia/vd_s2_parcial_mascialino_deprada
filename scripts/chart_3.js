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
			)
		)
    ],

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