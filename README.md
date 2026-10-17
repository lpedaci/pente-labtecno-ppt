# De la prohibición del celular al laboratorio ampliado

Presentación de la **Actividad Obligatoria 4** de la materia **Prácticas en Tecnología Educativa** (Licenciatura en Tecnología Educativa, UTN), ciclo 2026.

Sistematiza la intervención tecnopedagógica diseñada para la enseñanza de Ciencias Naturales en una escuela secundaria técnica de gestión estatal. La escuela cuenta con laboratorios bien equipados, pero ante la dispersión del curso respondió prohibiendo el celular. La propuesta sostiene que el problema no es la carencia de recursos sino la ausencia de una estrategia didáctica que otorgue sentido pedagógico a la tecnología disponible, y propone integrar el celular, con funciones definidas y un protocolo de uso, como instrumento del laboratorio.

El trabajo se plantea como **ensayo simulado**: la planificación está completa, el diagnóstico se realizó en modo exploratorio a partir de un caso análogo, y la implementación y la evaluación quedan pendientes.

**Ver la presentación:** https://lpedaci.github.io/pente-labtecno-ppt/

## Equipo

**Grupo 3:** Clara Argüello, Silvia Costas y Lourdes Pedaci.

**Cátedra:** Dr. Dario Rodriguez (titular), Lic. Gastón Brito y Lic. Cintia Cliso (adjuntos).

## Versiones

| Etiqueta | Qué contiene |
|---|---|
| `PenTe-ppt-v1` | Primera versión: presentación en HTML, CSS y JavaScript estáticos |
| `PenTe-ppt-v2` | Versión actual: reconstruida en Astro a partir del documento final de la actividad, con motion graphics y gráficos animados |

## Contenido

| N.° | Diapositiva |
|---|---|
| 01 | Portada |
| 02 | Introducción: el problema no es la carencia de recursos |
| 03 | Objetivos general y específicos |
| 04 | Metodología: investigación acción participativa, TPACK y ADKAR |
| 05 | Marco político e institucional |
| 06 | Marco normativo |
| 07 | Cultura institucional |
| 08 | Estado de situación |
| 09 | Fases de la implementación e intervención del tecnólogo educativo |
| 10 | Roles y responsabilidades |
| 11 | Bitácora de campo |
| 12 | Los espacios del laboratorio (registro fotográfico) |
| 13 | Diagnóstico en números |
| 14 | Evidencias recolectadas |
| 15 | Hallazgo central (motion graphic) |
| 16 | Accesibilidad del laboratorio |
| 17 | Evaluación formativa (gráfico animado) |
| 18 | Instrumentos de evaluación |
| 19 | Sistematización y análisis |
| 20 | Reflexión final |
| 21 | Anexo III: cuestionario TPACK y rúbrica ADKAR |
| 22 | Referencias, anexos y declaración de uso de IA |
| 23 | Cierre |

## Cómo verla

**En computadora** se ve como una presentación 16:9:

| Tecla | Acción |
|---|---|
| `→` `Espacio` `Enter` | Diapositiva siguiente |
| `←` `Retroceso` | Diapositiva anterior |
| `Inicio` / `Fin` | Primera / última diapositiva |
| `G` | Vista de cuadrícula |
| `N` | Notas del orador |
| `F` | Pantalla completa |

Cada diapositiva tiene su propio enlace (`#s1` a `#s23`).

**En celular** pasa a lectura vertical; las animaciones y el video se acompañan de su versión en texto.

Las animaciones se detienen si el sistema tiene activada la opción de reducir el movimiento, y las que se repiten tienen botón de pausa.

## Desarrollo

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev
```

```bash
npm run build
```

Cada push a `main` compila el sitio y lo publica en GitHub Pages mediante el workflow `.github/workflows/deploy.yml`.

### Estructura

- `src/slides/`: una diapositiva por archivo. Los datos de las tablas (fases, evidencias, sistematización) están en archivos `.ts` aparte.
- `src/components/`: diapositiva base, portada compartida con el cierre e íconos.
- `src/layouts/Deck.astro`: estructura de la presentación y controles.
- `src/scripts/deck.ts`: navegación, cuadrícula, notas, foto ampliada y lectura vertical.
- `src/styles/`: paleta, tipografía y controles.
- `public/media/`: motion graphic de la diapositiva 15 y su póster.
- `videos/hallazgo-motion/`: composición de HyperFrames con la que se generó ese video.
