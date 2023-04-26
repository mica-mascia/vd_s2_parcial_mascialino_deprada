const locale = {
	decimal: ',',
	thousands: '.',
	grouping: [3],
}

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

	var fecha_ingreso = data.map(function(d) {return d.fecha_ingreso});
	var fecha_cierre_contacto = data.map(function(d) {return d.fecha_cierre_contacto});
	const estado_del_contacto = data.map(function(d) {return d.estado_del_contacto});
	
	let max_tiempo = Array(12);
	max_tiempo.fill(0);
	let min_tiempo = Array(12);
	min_tiempo.fill(300);
	let promedio;
	let mes, fi, fcc;
	let contar=0;

	for(let i=0; i<estado_del_contacto.length;i++){
		if(estado_del_contacto[i] === "Cerrado"){
			if(fecha_ingreso[i][2] == '-'){
				mes = (d3.timeFormat('%m')(d3.timeParse('%d-%m-%Y')(fecha_ingreso[i])))-1;
				fi = d3.timeFormat('%j')(d3.timeParse('%d-%m-%Y')(fecha_ingreso[i]));
			}else{
				mes = (d3.timeFormat('%m')(d3.timeParse('%d/%m/%Y')(fecha_ingreso[i])))-1;
				fi = d3.timeFormat('%j')(d3.timeParse('%d/%m/%Y')(fecha_ingreso[i]));
			}
			
			if(fecha_cierre_contacto[i][2] == '-'){
				fcc = d3.timeFormat('%j')(d3.timeParse('%d-%m-%Y')(fecha_cierre_contacto[i]))
			}else{
				fcc = d3.timeFormat('%j')(d3.timeParse('%d/%m/%Y')(fecha_cierre_contacto[i]))
			}
			//duracion = (d3.timeFormat('%j')(d3.timeParse('%d/%m/%Y')(fecha_cierre_contacto[i]))) - (d3.timeFormat('%j')(d3.timeParse('%d/%m/%Y')(fecha_ingreso[i])));//+1;
			duracion = fcc-fi;
			//console.log(estado_del_contacto[i])

			//console.log("min del mes", mes+1,":", min_tiempo[mes], ". Este valor es", duracion)

			if(duracion > max_tiempo[mes]){
				max_tiempo[mes] = duracion
			}else if(duracion < min_tiempo[mes]){
				min_tiempo[mes] = duracion
			}

			if(typeof promedio === 'undefined'){
				promedio = duracion
				//console.log("new!")
			}else{
				promedio = (promedio + duracion)/2
				if(mes == 0){
					console.log("duración: ",duracion, "entre",fecha_ingreso[i],"y",fecha_cierre_contacto[i], "(caso",i,")")
				}
			}

			//console.log(promedio)
		}
	}

	console.log(max_tiempo)
	console.log(min_tiempo)
	console.log(contar);



  let dataviz_C = Plot.plot({
	marks: [
		Plot.axisX({labelAnchor: "center", anchor: "bottom", label: "Mes" }),
		Plot.axisY({label: "Espera para la resolución", marginTop: 20 }),
		Plot.areaY(data, {
			x: [1,2,3,4,5,6,7,8,9,10,11,12],//['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			y1: max_tiempo,
			y2: min_tiempo,
			dy: -16,
			//opacity: 0.5,
			curve: 'natural',
			fill: 'gray',
		}),
		Plot.line(data, {
			x: [1,2,3,4,5,6,7,8,9,10,11,12],//['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			y: 12,
			stroke: '#EE6C2F',
			curve: 'natural',
			dy: -16,
		}),
		Plot.text(12, {
			x: [12],//['Diciembre'],
			y: 12,
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
d3.select('#dataviz_C').append(() => dataviz_C)
})
