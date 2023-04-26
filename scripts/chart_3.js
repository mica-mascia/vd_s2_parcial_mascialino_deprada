const locale = {
	decimal: ',',
	thousands: '.',
	grouping: [3],
}

d3.formatDefaultLocale(locale)

d3.csv('astronautas.csv', d3.autoType).then(data => {

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


	let dataviz_4 = Plot.plot({
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
	d3.select('#dataviz_4').append(() => dataviz_4)
})
//#endregion