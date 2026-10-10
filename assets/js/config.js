// Parámetros de la presentación. Las medidas del escenario y los colores se leen de assets/css/tokens.css.
window.DECK_CONFIG = {
  // lectura vertical en pantallas angostas y en celulares en horizontal (poca altura + táctil)
  scrollMaxWidth: 760,
  scrollMaxHeight: 500,
  stageMargin: 32,      // aire total alrededor del escenario, en px
  swipeThreshold: 50,   // desplazamiento mínimo para cambiar de diapositiva, en px
  hashPrefix: 's',      // enlaces #s1, #s2...
  // Diagnóstico en números: 35 puntos; los primeros 20 en verde, los 15 restantes en rosa
  students: {
    total: 35,
    base: 20,
    perRow: 7,
    stepX: 48, stepY: 58, offsetX: 20, offsetY: 28, radius: 17,
    baseColor: '--leaf',
    extraColor: '--rose',
    firstDelay: 3,      // valor inicial de --i
    perDelay: 5         // puntos que comparten el mismo --i
  }
};
