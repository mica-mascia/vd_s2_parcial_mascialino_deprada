const locale = {
	decimal: ',',
	thousands: '.',
	grouping: [3],
}

d3.formatDefaultLocale(locale)
// La idea seria responder a la pregunta de en que epocas hay mas denuncias de ratas
// En el eje Y debe estar la cantidad de denuncias y en el x las fechas (tiempo)



d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType).then(data => {

    data.forEach(d => {
        d.fecha_ingreso = new Date(d.fecha_ingreso)
      })
    
        
        console.log(data)
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