// Fases de la implementación, tal como figuran en la tabla del documento.
export const months = ['Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'];

export interface Phase {
  n: number;
  name: string;
  goal: string;
  activities: string;
  resources: string[];
  status: string;
  te: string;
  /** versión breve de la intervención, para el cronograma */
  teShort: string;
  /** barras en la línea de tiempo: [mes inicial (0 = marzo), cantidad de meses, ensayo] */
  bars: [number, number, boolean?][];
}

export const phases: Phase[] = [
  {
    n: 1, name: 'Acuerdo institucional',
    teShort: 'Presenta la propuesta, negocia horas y aval, y propone un referente',
    goal: 'Obtener el aval institucional y definir las horas de trabajo',
    activities: 'Presentación de la propuesta al equipo directivo y al jefe de departamento. Firma del acuerdo de trabajo',
    resources: ['Propuesta escrita', 'Agenda de reunión'],
    status: 'Planificada, no ejecutada (marzo)',
    te: 'Presenta la propuesta, negocia horas y aval. Deja constancia de que la institución no tiene un tecnólogo educativo asignado y propone un referente.',
    bars: [[0, 1]],
  },
  {
    n: 2, name: 'Diagnóstico',
    teShort: 'Aplica entrevista, cuestionario TPACK y relevamiento; analiza AIC y PEI',
    goal: 'Construir la base del conocimiento tecnopedagógico docente y de las condiciones de uso del laboratorio (OE1)',
    activities: 'Entrevista diagnóstica (en modo exploratorio, actualmente nutrida del testimonio de docente colega), relevamiento de infraestructura y análisis documental',
    resources: ['Guion de entrevista', 'Cuaderno de campo', 'Cuestionario TPACK'],
    status: 'Planificada para abril y mayo. Ejecutada en modo ensayo (septiembre y octubre)',
    te: 'Aplica la entrevista, el cuestionario TPACK y el relevamiento (incluida la accesibilidad). Analiza el AIC y el PEI.',
    bars: [[1, 2], [6, 2, true]],
  },
  {
    n: 3, name: 'Devolución y sensibilización',
    teShort: 'Devuelve el diagnóstico y trabaja conciencia y deseo (ADKAR)',
    goal: 'Trabajar las etapas de conciencia y deseo del modelo ADKAR',
    activities: 'Jornada de devolución del diagnóstico y construcción compartida de la agenda de trabajo',
    resources: ['Informe de diagnóstico', 'Espacio institucional'],
    status: 'Planificada, no ejecutada (junio)',
    te: 'Devuelve el diagnóstico y trabaja conciencia y deseo, presentando el uso regulado como compatible con la cultura de seguridad.',
    bars: [[3, 1]],
  },
  {
    n: 4, name: 'Codiseño',
    teShort: 'Coordina los talleres de codiseño (ABP y DUA) y organiza el repositorio',
    goal: 'Codiseñar con el equipo docente secuencias de indagación con uso regulado de dispositivos (OE2)',
    activities: 'Dos talleres de codiseño y elaboración del repositorio institucional',
    resources: ['Laboratorio', 'Aplicaciones', 'Simuladores libres', 'Repositorio'],
    status: 'Planificada, no ejecutada (julio y agosto)',
    te: 'Coordina los talleres y diseña con los docentes las secuencias bajo ABP y DUA. Organiza el repositorio.',
    bars: [[4, 2]],
  },
  {
    n: 5, name: 'Implementación acompañada',
    teShort: 'Acompaña en el laboratorio, observa con la guía y registra en bitácora',
    goal: 'Acompañar la implementación de las secuencias codiseñadas, mediante observación situada y bitácora (OE3)',
    activities: 'Puesta en aula de dos secuencias por curso, con acompañamiento en el laboratorio y registro de observación. Reunión de intercambio entre pares',
    resources: ['Laboratorio', 'Dispositivos móviles regulados', 'Guía de observación', 'Bitácora'],
    status: 'Planificada, no ejecutada (septiembre y octubre)',
    te: 'Acompaña en el laboratorio, observa con la guía, registra en bitácora y coordina la reunión.',
    bars: [[6, 2]],
  },
  {
    n: 6, name: 'Evaluación y cierre',
    teShort: 'Aplica los instrumentos y redacta el informe final con la propuesta de institucionalización',
    goal: 'Valorar el impacto de la intervención sobre las prácticas de enseñanza',
    activities: 'Cuestionario TPACK posterior, rúbrica ADKAR, grupo focal e informe final',
    resources: ['Instrumentos de evaluación', 'Rúbricas'],
    status: 'Planificada, no ejecutada (noviembre)',
    te: 'Aplica los instrumentos, analiza los resultados y redacta el informe final con la propuesta de institucionalización.',
    bars: [[8, 1]],
  },
];
