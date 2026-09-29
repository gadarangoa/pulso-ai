/*
 * noticias-semilla.js
 * Copia de data/noticias.json en forma de variable JavaScript.
 * ¿Por qué existe? Cuando abres el HTML con doble clic (protocolo file://),
 * el navegador bloquea fetch() hacia archivos locales por seguridad (CORS).
 * datos.js intenta primero leer el JSON y, si no puede, usa esta copia.
 * Si modificas data/noticias.json, actualiza también este archivo.
 */
const NOTICIAS_SEMILLA = [
  {
    "id": 1,
    "nombre": "Los modelos de razonamiento dominan la IA en 2026",
    "resumen": "Los modelos que piensan antes de responder desplazan a los sistemas de respuesta inmediata.",
    "contenido": [
      "La industria de la inteligencia artificial vive un cambio de paradigma. Los llamados modelos de razonamiento, capaces de dedicar tiempo a analizar un problema antes de emitir una respuesta, se han convertido en el estándar para tareas complejas como la programación, las matemáticas y el análisis de documentos extensos.",
      "A diferencia de los modelos tradicionales, que generan texto de forma inmediata, estos sistemas construyen cadenas internas de pensamiento: descomponen el problema, evalúan alternativas y verifican sus propias conclusiones antes de mostrar el resultado al usuario. El efecto es notable en la calidad de las respuestas, especialmente en preguntas con varios pasos lógicos.",
      "Las principales compañías del sector, como OpenAI, Anthropic y Google, han incorporado esta capacidad en sus modelos más recientes, permitiendo incluso regular cuánto esfuerzo de razonamiento se aplica a cada consulta. Para el usuario esto se traduce en un equilibrio ajustable entre velocidad y profundidad.",
      "Los analistas coinciden en que esta tendencia marcará los próximos años: la competencia ya no se centra únicamente en el tamaño de los modelos, sino en su capacidad de razonar de forma fiable y de explicar cómo llegaron a una conclusión."
    ],
    "imagen": "img/razonamiento.jpg",
    "categoria": "Tendencias",
    "autor": "Robinson David Galvis",
    "fecha": "2026-08-28",
    "destacada": true,
    "fuente": "MIT Technology Review",
    "urlFuente": "https://www.technologyreview.com"
  },
  {
    "id": 2,
    "nombre": "Claude, ChatGPT y Gemini: cuál elegir en 2026",
    "resumen": "Precio, capacidades y casos de uso de los tres asistentes más usados del mundo.",
    "contenido": [
      "Elegir un asistente de inteligencia artificial ya no es una decisión trivial. Claude, ChatGPT y Gemini concentran la mayor parte de los usuarios y, aunque los tres resuelven tareas similares, cada uno tiene fortalezas que conviene conocer antes de pagar una suscripción.",
      "Claude, de Anthropic, destaca en la escritura extensa, el análisis de documentos largos y la programación. ChatGPT, de OpenAI, ofrece el ecosistema más amplio de funciones: generación de imágenes, voz y una gran variedad de integraciones. Gemini, de Google, se integra de forma natural con Gmail, Docs y el resto de servicios de la compañía.",
      "Los tres cuentan con versiones gratuitas con límites de uso y planes de pago con acceso a sus modelos más avanzados. Para estudiantes y usuarios ocasionales, las versiones gratuitas suelen ser suficientes.",
      "La recomendación de los expertos es sencilla: probar los tres con las tareas del día a día y quedarse con el que mejor se adapte a la forma de trabajar de cada persona."
    ],
    "imagen": "img/comparativa-chatbots.jpg",
    "categoria": "Comparativas",
    "autor": "Carlos David Ramos Marquez",
    "fecha": "2026-08-25",
    "destacada": true,
    "fuente": "The Verge",
    "urlFuente": "https://www.theverge.com"
  },
  {
    "id": 3,
    "nombre": "La IA ya detecta enfermedades antes que los médicos",
    "resumen": "Sistemas de IA superan a especialistas en detección temprana en estudios clínicos.",
    "contenido": [
      "La medicina es uno de los campos donde la inteligencia artificial está mostrando resultados más tangibles. Diversos estudios clínicos han evaluado sistemas capaces de analizar imágenes médicas, como mamografías o radiografías de tórax, con una precisión comparable o superior a la de especialistas.",
      "La clave está en la detección temprana: los algoritmos identifican patrones sutiles que pueden pasar desapercibidos para el ojo humano, lo que permite iniciar tratamientos en etapas en las que las probabilidades de éxito son mayores.",
      "Los investigadores insisten, sin embargo, en que estas herramientas no reemplazan al médico. Su función es servir como una segunda opinión que reduce errores y agiliza la carga de trabajo de los profesionales de la salud.",
      "El reto ahora es llevar estos sistemas a hospitales con menos recursos, validar su funcionamiento en poblaciones diversas y definir quién responde cuando una herramienta se equivoca."
    ],
    "imagen": "img/ia-medicina.jpg",
    "categoria": "Aplicaciones",
    "autor": "Gustavo Adolfo Arango Angulo",
    "fecha": "2026-08-20",
    "destacada": true,
    "fuente": "Nature Medicine",
    "urlFuente": "https://www.nature.com/nm"
  },
  {
    "id": 4,
    "nombre": "Tutores de IA: la educación personalizada llega al aula",
    "resumen": "Plataformas con IA adaptan las lecciones al ritmo de cada estudiante.",
    "contenido": [
      "Durante décadas, la educación personalizada fue un ideal difícil de alcanzar: un solo docente no puede adaptar la clase al ritmo de treinta estudiantes. Los tutores basados en inteligencia artificial prometen cambiar esa realidad.",
      "Estas plataformas identifican en qué temas tiene dificultades cada estudiante, proponen ejercicios adicionales y explican los conceptos de distintas maneras hasta que el alumno los comprende. En lugar de dar la respuesta, los mejores tutores guían con preguntas.",
      "Organismos como la UNESCO han pedido acompañar esta adopción con formación docente y reglas claras sobre privacidad de los datos de los menores.",
      "El consenso entre educadores es que la IA funciona mejor como apoyo al docente y no como su reemplazo: libera tiempo de tareas repetitivas para dedicarlo a lo que ninguna máquina hace bien, acompañar a las personas."
    ],
    "imagen": "img/tutores-educacion.jpg",
    "categoria": "Aplicaciones",
    "autor": "Robinson David Galvis",
    "fecha": "2026-08-15",
    "destacada": false,
    "fuente": "UNESCO",
    "urlFuente": "https://www.unesco.org/es/artificial-intelligence"
  },
  {
    "id": 5,
    "nombre": "5 herramientas de IA gratuitas para estudiantes",
    "resumen": "Resumir lecturas, preparar exámenes y estudiar mejor, sin pagar un peso.",
    "contenido": [
      "La inteligencia artificial puede ser una gran aliada en la vida universitaria si se usa con criterio. Estas son cinco categorías de herramientas gratuitas que vale la pena conocer.",
      "Primero, los asistentes conversacionales como Claude, ChatGPT o Gemini, útiles para explicar conceptos difíciles. Segundo, NotebookLM, que permite subir tus propios apuntes y hacerles preguntas. Tercero, los generadores de tarjetas de estudio, que convierten un texto en preguntas de repaso.",
      "Cuarto, las herramientas de transcripción, que convierten una clase grabada en texto. Y quinto, los asistentes de programación integrados en editores de código, muy útiles para estudiantes de ingeniería.",
      "Una advertencia: estas herramientas pueden equivocarse. Verifica siempre la información importante y recuerda que el objetivo es aprender, no solo entregar."
    ],
    "imagen": "img/herramientas-estudiantes.jpg",
    "categoria": "Herramientas",
    "autor": "Carlos David Ramos Marquez",
    "fecha": "2026-08-10",
    "destacada": false,
    "fuente": "Xataka",
    "urlFuente": "https://www.xataka.com"
  },
  {
    "id": 6,
    "nombre": "Agentes de IA: los asistentes que ya ejecutan tareas por ti",
    "resumen": "La nueva generación de IA navega, programa y completa procesos de principio a fin.",
    "contenido": [
      "Si los chatbots respondían preguntas, los agentes de IA hacen el trabajo. Esta nueva generación de sistemas puede navegar por internet, llenar formularios, escribir y ejecutar código o coordinar varias herramientas para completar una tarea de principio a fin.",
      "La diferencia está en la autonomía: el usuario describe el objetivo y el agente planifica los pasos, los ejecuta y corrige el rumbo cuando algo falla. Empresas de todo el mundo ya los usan para automatizar procesos administrativos y de desarrollo de software.",
      "Esta autonomía también plantea preguntas nuevas: ¿qué permisos debe tener un agente?, ¿cómo se supervisan sus acciones?, ¿quién responde por sus errores? Los especialistas recomiendan mantener siempre a una persona en el circuito para las decisiones importantes.",
      "Todo indica que los agentes serán uno de los temas centrales de la IA en los próximos años."
    ],
    "imagen": "img/agentes-ia.jpg",
    "categoria": "Tendencias",
    "autor": "Gustavo Adolfo Arango Angulo",
    "fecha": "2026-08-05",
    "destacada": false,
    "fuente": "Wired",
    "urlFuente": "https://www.wired.com"
  },
  {
    "id": 7,
    "nombre": "América Latina acelera la regulación de la IA",
    "resumen": "Con la ley europea como referencia, la región avanza en marcos legales propios.",
    "contenido": [
      "La Ley de Inteligencia Artificial de la Unión Europea se ha convertido en el principal referente para los legisladores de todo el mundo, y América Latina no es la excepción. Varios países de la región discuten proyectos para regular el uso de estos sistemas.",
      "La mayoría de las propuestas siguen un enfoque basado en riesgos: cuanto mayor es el impacto de un sistema sobre los derechos de las personas, más exigentes son las obligaciones para quien lo desarrolla o lo usa.",
      "Los debates giran en torno a la protección de datos personales, la transparencia de los algoritmos y el uso de la IA en decisiones públicas, como la asignación de subsidios o la seguridad.",
      "El desafío para la región es encontrar un equilibrio: proteger a los ciudadanos sin frenar la innovación ni dejar a las empresas locales en desventaja frente a los grandes actores globales."
    ],
    "imagen": "img/regulacion-latam.jpg",
    "categoria": "Ética y Regulación",
    "autor": "Robinson David Galvis",
    "fecha": "2026-07-30",
    "destacada": false,
    "fuente": "El País",
    "urlFuente": "https://elpais.com/tecnologia"
  },
  {
    "id": 8,
    "nombre": "Generadores de imágenes con IA: los mejores de 2026",
    "resumen": "Midjourney, DALL·E y el código abierto compiten por el trono de la imagen.",
    "contenido": [
      "Generar una imagen a partir de una descripción en texto dejó de ser una curiosidad para convertirse en una herramienta de trabajo para diseñadores, publicistas y creadores de contenido.",
      "Midjourney mantiene su reputación por la calidad estética de sus resultados. Los generadores integrados en los grandes asistentes, como el de ChatGPT, destacan por su facilidad de uso y por seguir instrucciones detalladas. Por su parte, los modelos de código abierto permiten ejecutar la generación en un computador propio.",
      "La elección depende del uso: calidad artística, facilidad o control total sobre el proceso.",
      "El debate sobre los derechos de autor de las imágenes usadas para entrenar estos modelos sigue abierto y será clave para el futuro de la industria."
    ],
    "imagen": "img/generadores-imagenes.jpg",
    "categoria": "Comparativas",
    "autor": "Carlos David Ramos Marquez",
    "fecha": "2026-07-22",
    "destacada": false,
    "fuente": "The Verge",
    "urlFuente": "https://www.theverge.com"
  }
];
