// Pregunta a responder: Cuales son los barrios con mas problemas de ratas de la ciudad?
// La idea seria filtrar los datos para que no se muestren lo de los barrios emergentes ya que esos son solicitudes de desobstruccion y no de ratas.

const mapaFetch = d3.json('data/barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  const reclamosPorBarrio = d3.group(data.filter(d=> d.categoria != "BARRIOS EMERGENTES"), d => d.domicilio_barrio)

  /* A cada feature del mapa le agregamos la prop DENUNCIAS */
  barrios.features.forEach(d => {
    let nombreBarrio = d.properties.BARRIO
    let cantReclamos =  reclamosPorBarrio.get(nombreBarrio).length
    d.properties.DENUNCIAS = cantReclamos
  })


  /* Mapa Coroplético */
  let dataviz_A = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },

    color: {
      type: 'quantize', 
      domain: [50,300],
      legend: true,
      range: ["#e9dfd5", "#cec3ae", "#b8bb9c", "#BACF97", "#9EB47B"],
      label: 'Cantidad de denuncias de ratas',
      
	    marginLeft: 45,
      
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

  d3.select('#dataviz_A').append(() => dataviz_A)


})
