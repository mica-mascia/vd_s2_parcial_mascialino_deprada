Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

	reclamosPorEstacion = data.map(function(d) {return d.fecha_ingreso})

	//x: d => d3.timeFormat('%a')(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso)),
	let test = d3.timeFormat('%j')(d3.timeParse('%d/%m/%Y')('21/12/2021'));
	console.log(test);
	console.log(test == 265)

  	reclamosPorEstacion.forEach((item, index, array) => {
		array[index] = d3.timeFormat('%j')(d3.timeParse('%d/%m/%Y')(array[index]))
		if(array[index]<79 || array[index]>355){
			array[index] = "verano"
		} else if(array[index]<172){
			array[index] = "otoño"
		}else if(array[index]<265){
			array[index] = "invierno"
		}else{
			array[index] = "primavera"
		}
  })

  let dataviz_F = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios,
    },
	style: {
		fontFamily: "Noto Sans",
		fontSize: "20px",
	  },
	marks: [
		Plot.density(data, {
			x: 'lon',
			y: 'lat',
			fill: 'density',
			bandwidth: 5,
			thresholds: 50
		}),
		
		Plot.geo(barrios, {
			stroke: 'gray',
		}),
	],
	facet: {
		data: data,
		x: reclamosPorEstacion,
	},
	fx: {
		domain: ['verano', 'otoño']
	},
	width: 1000,
	color: {
		type: "linear",
		scheme: 'greens',
      
	  },
  })

  d3.select('#dataviz_F').append(() => dataviz_F)

  let dataviz_FA = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
	style: {
		fontFamily: "Noto Sans",
		fontSize: "20px",
	  },
	marks: [
		Plot.density(data, {
			x: 'lon',
			y: 'lat',
			fill: 'density',
			bandwidth: 5,
			thresholds: 50
		}),
		Plot.geo(barrios, {
			stroke: 'gray',
		}),
	],
	facet: {
		data: data,
		x: reclamosPorEstacion,
	},
	fx: {
		domain: ['invierno', 'primavera']
	},
	width: 1000,
	color: {
		scheme: 'greens',
	  },
  
  })

  d3.select('#dataviz_FA').append(() => dataviz_FA)
})

