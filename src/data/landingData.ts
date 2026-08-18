import { PainPoint, Pillar, MethodStep, Deliverable, MetricCounter, Testimonial, FaqItem } from '../types';

export const PAIN_POINTS: PainPoint[] = [
  {
    id: 'pain-1',
    icon: 'Compass',
    title: 'Entradas sin escenario definido',
    description: 'Entrás a operaciones sin tener un escenario completamente validado. Reaccionás a lo que ves en el segundo en lugar de esperar tu confirmación.',
    solution: 'Protocolo de validación previa en 3 pasos antes de tocar el botón de compra o venta.',
    stat: '84% de pérdidas evitables'
  },
  {
    id: 'pain-2',
    icon: 'Flame',
    title: 'Sobreoperar tras una pérdida',
    description: 'Te cuesta aceptar un stop loss y entrás inmediatamente a "recuperar" el dinero, destruyendo tu cuenta en minutos por revancha.',
    solution: 'Reglas de corte diario automatizadas y reconstrucción de la relación con el error.',
    stat: 'Revenge Trading eliminado'
  },
  {
    id: 'pain-3',
    icon: 'ShieldAlert',
    title: 'Falta de gestión y riesgo caótico',
    description: 'No sabés cuánto arriesgar en cada trade ni tenés un cálculo exacto de invalidación según tu capital.',
    solution: 'Fórmulas matemáticas de tamaño de posición institucional con R:R mínimo 1:2.5.',
    stat: 'Riesgo fijo ≤ 1% por trade'
  },
  {
    id: 'pain-4',
    icon: 'Shuffle',
    title: 'Síndrome del salto de estrategia',
    description: 'Cambiás de método cada semana: hoy Smart Money, mañana Indicadores, pasado Order Flow. Nunca acumulás muestra estadística.',
    solution: 'Un único sistema depurado con más de 100 backtests documentados paso a paso.',
    stat: '1 Solo Sistema Maestro'
  },
  {
    id: 'pain-5',
    icon: 'HelpCircle',
    title: 'Conocimiento sin consistencia',
    description: 'Sabés la teoría de memoria, pero cuando el gráfico se mueve en vivo dudás, entrás tarde o cerrás operaciones ganadoras antes de tiempo.',
    solution: 'Checklists mecánicos de ejecución en vivo que anulan la duda operativa.',
    stat: 'Criterio 100% objetivo'
  },
  {
    id: 'pain-6',
    icon: 'Radio',
    title: 'Soledad y contenido disperso',
    description: 'Consumís horas de videos en YouTube sin orden pedagógico y no tenés a quién consultarle por qué falló una operación real.',
    solution: 'Feedback 1 a 1 de tus diarios de trading y sesiones semanales en vivo de mercado real.',
    stat: 'Mentoring semanal directo'
  }
];

export const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'ESTRATEGIA',
    subtitle: 'Ventaja Estadística & Contexto',
    description: 'Aprendé a identificar escenarios de mercado de alta probabilidad, establecer criterios claros de entrada y reconocer cuándo existe —y cuándo NO— una ventaja estadística real.',
    details: [
      'Identificación de liquidez y bloques de órdenes institucionales',
      'Mapeo de fractales y estructura de mercado multitemporal',
      'Filtrado de zonas de baja probabilidad para no regalar comisiones',
      'Definición de modelos de entrada con edge cuantitativo medible'
    ],
    icon: 'Target',
    accentColor: 'lime'
  },
  {
    number: '02',
    title: 'GESTIÓN DE RIESGO',
    subtitle: 'La Armadura del Capital',
    description: 'Definí cuánto estás dispuesto a perder antes de entrar al mercado y aprendé a proteger tu capital como la parte más sagrada de todo el proceso.',
    details: [
      'Dimensionamiento exacto de lotes basado en volatilidad y ATR',
      'Ratio Riesgo/Beneficio asimétrico (mínimo 1:2.5 / 1:4)',
      'Límites innegociables de drawdown diario y semanal',
      'Estrategias de parciales y gestión dinámica de trailing stop'
    ],
    icon: 'ShieldCheck',
    accentColor: 'green'
  },
  {
    number: '03',
    title: 'EJECUCIÓN',
    subtitle: 'Precisión y Mecánica de Entrada',
    description: 'Entradas milimétricas, niveles de invalidación objetivos, gestión de posiciones abiertas y toma de decisiones sin titubear durante la sesión.',
    details: [
      'Trigger de confirmación en microestructuras',
      'Colocación precisa del Stop Loss en puntos de invalidación estructural',
      'Gestión activa sin sobre-microgestionar la posición',
      'Registro fotográfico y métrico de la ejecución en vivo'
    ],
    icon: 'Zap',
    accentColor: 'emerald'
  },
  {
    number: '04',
    title: 'PSICOLOGÍA',
    subtitle: 'Disciplina Bajo Presión',
    description: 'Control del FOMO, eliminación del revenge trading, paciencia para esperar el setup perfecto y neutralidad emocional frente a rachas negativas.',
    details: [
      'Reprogramación de la tolerancia a la incertidumbre y la pérdida',
      'Rutina pre-market y post-market para descompresión mental',
      'Eliminación de la euforia tras días verdes y del pánico tras días rojos',
      'Construcción de disciplina como hábito y no como motivación pasajera'
    ],
    icon: 'Brain',
    accentColor: 'cyan'
  }
];

export const METHOD_STEPS: MethodStep[] = [
  {
    number: '01',
    title: 'FUNDAMENTOS & AUDITORÍA',
    phase: 'Semana 1-2',
    description: 'Analizamos a fondo tu nivel actual, auditamos tu historial de trades anteriores, corregimos vicios conceptuales y construimos cimientos sólidos.',
    deliverables: [
      'Auditoría diagnóstica de tu operativa previa',
      'Alineación de conceptos institucionales',
      'Configuración profesional de tu TradingView y terminal'
    ],
    tag: 'Fase Inicial'
  },
  {
    number: '02',
    title: 'LECTURA DE MERCADO',
    phase: 'Semana 3-4',
    description: 'Aprendés a interpretar el contexto macro y la estructura antes de siquiera pensar en buscar una oportunidad operativa.',
    deliverables: [
      'Matriz de dirección diaria y semanal (HTF Context)',
      'Identificación de liquidez externa vs. liquidez interna',
      'Filtros de correlación intermercados'
    ],
    tag: 'Contexto'
  },
  {
    number: '03',
    title: 'EL SETUP KBJ',
    phase: 'Semana 5-6',
    description: 'Definimos exactamente qué condiciones específicas tienen que alinearse de forma inequívoca para considerar una entrada al mercado.',
    deliverables: [
      'Manual operativo con reglas mecánicas de entrada',
      'Checklist de confirmación paso a paso',
      'Plantilla de gatillos de alta probabilidad'
    ],
    tag: 'Edge Operativo'
  },
  {
    number: '04',
    title: 'EJECUCIÓN & RIESGO',
    phase: 'Semana 7-8',
    description: 'Planificamos entrada, punto de invalidación matemática, riesgo monetario y objetivos escalonados antes de abrir la posición.',
    deliverables: [
      'Calculadora de lotaje automatizada KBJ',
      'Protocolo de toma de parciales y gestión de breakeven',
      'Plan de contingencia ante alta volatilidad por noticias'
    ],
    tag: 'Blindaje'
  },
  {
    number: '05',
    title: 'REVISIÓN & JOURNALING',
    phase: 'Semana 9-10',
    description: 'Analizamos cada operación en sesiones 1 a 1 para identificar qué decisiones fueron correctas y cuáles requieren ajustes inmediatos.',
    deliverables: [
      'Trading Journal interactivo con métricas estadísticas avanzadas',
      'Revisión en video de tus ejecuciones semanales',
      'Identificación de fugas de capital y errores recurrentes'
    ],
    tag: 'Optimización'
  },
  {
    number: '06',
    title: 'INDEPENDENCIA TOTAL',
    phase: 'Continuo',
    description: 'El objetivo final no es que dependas de nadie: es que abras el gráfico cada mañana con calma y sepas con total certeza qué hacer por vos mismo.',
    deliverables: [
      'Plan de trading personalizado a tus horarios y estilo de vida',
      'Acceso vitalicio a la comunidad de traders graduados KBJ',
      'Capacidad de autodiagnóstico y crecimiento autónomo'
    ],
    tag: 'Maestría'
  }
];

export const DELIVERABLES: Deliverable[] = [
  {
    title: 'Formación Paso a Paso',
    description: 'Módulos estructurados desde cero hasta nivel institucional. Clases en vivo con interacción directa y acceso 24/7 a grabaciones en 4K.',
    tag: 'En vivo + On Demand',
    icon: 'GraduationCap',
    span: 'col-span-1 md:col-span-2'
  },
  {
    title: 'Sesiones de Mentoría & Q&A',
    description: 'Espacio dedicado para resolver dudas complejas, analizar casos puntuales y desbloquear cualquier obstáculo en tu operativa.',
    tag: '1 a 1 y Grupal',
    icon: 'Users',
    span: 'col-span-1'
  },
  {
    title: 'Análisis de Mercado Semanal',
    description: 'Proyecciones y preparación de escenarios en vivo para las sesiones de Londres y Nueva York en tiempo real.',
    tag: 'Pre-Market Live',
    icon: 'TrendingUp',
    span: 'col-span-1'
  },
  {
    title: 'Revisión de Operaciones Reales',
    description: 'Envías tus capturas y registros de trades. Analizamos tu toma de decisiones y te devolvemos feedback quirúrgico.',
    tag: 'Feedback Quirúrgico',
    icon: 'FileSearch',
    span: 'col-span-1 md:col-span-2',
    featured: true
  },
  {
    title: 'Plantillas y Material Exclusivo',
    description: 'Sistemas de backtesting, guías de confluencias y manuales operativos en PDF diseñados para tener en tu escritorio.',
    tag: 'Toolkits Listos',
    icon: 'FolderDown',
    span: 'col-span-1'
  },
  {
    title: 'Trading Journal & Métricas',
    description: 'Nuestra plantilla automatizada para registrar win rate, drawdown, ratio promedio y factores de beneficio sin fórmulas complejas.',
    tag: 'Software & Sheets',
    icon: 'BarChart3',
    span: 'col-span-1'
  },
  {
    title: 'Comunidad Privada KBJ',
    description: 'Canal exclusivo donde traders con tu misma visión debaten escenarios con respeto, disciplina y cero ruido de apuestas.',
    tag: 'Networking Serio',
    icon: 'MessageSquareShare',
    span: 'col-span-1'
  },
  {
    title: 'Soporte Continuo & Acompañamiento',
    description: 'No te dejamos solo tras la teoría. Tenés línea directa con el mentor para consultas prioritarias durante tu proceso.',
    tag: 'Asistencia Directa',
    icon: 'Headphones',
    span: 'col-span-1 md:col-span-2'
  }
];

export const MENTOR_METRICS: MetricCounter[] = [
  {
    value: 5,
    suffix: '+ AÑOS',
    label: 'Experiencia en Mercados',
    description: 'Operando activamente Forex, Índices y Commodities.'
  },
  {
    value: 300,
    suffix: '+ TRADERS',
    label: 'Alumnos Formados',
    description: 'Transformando su relación con el riesgo y la consistencia.'
  },
  {
    value: 10000,
    suffix: '+ HORAS',
    label: 'Análisis de Gráficos',
    description: 'Testeo exhaustivo de escenarios y ventaja estadística.'
  },
  {
    value: 1,
    suffix: ' MISIÓN',
    label: 'Propósito KBJ',
    description: 'Formar traders independientes y rentables sin atajos.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Martín Rodríguez',
    role: 'Trader de Futuros & NQ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'Antes entraba al mercado por pura intuición y ansiedad. Con KBJ aprendí a esperar mis escenarios con paciencia francotiradora y a gestionar mis riesgos correctamente. Pasé de quemar cuentas a tener meses en verde constante.',
    winRateImpact: 'Win Rate: 62%',
    riskManagement: 'R:R Promedio 1:3.2',
    timeframe: 'Alumno 2024'
  },
  {
    name: 'Ignacio Peralta',
    role: 'Trader de Forex (EURUSD / GBPUSD)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'Lo que más cambió fue mi mentalidad. Dejé de sobreoperar buscando revancha y empecé a tener un plan claro para cada sesión antes de que abra Nueva York. La mentoría pagó su valor en el primer mes.',
    winRateImpact: 'Eliminó el 100% del Revenge Trading',
    riskManagement: 'Drawdown Máx: 2.1%',
    timeframe: 'Alumno 2024'
  },
  {
    name: 'Lucas González',
    role: 'Trader de Cuentas Fondeadas',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    quote: 'Tenía mucha información de YouTube pero ninguna estructura. Estaba abrumado. KBJ me ayudó a ordenar todo, descartar lo que no sirve y pasar dos evaluaciones de fondeo de $100k con total calma.',
    winRateImpact: '2 Fondeos Aprobados ($200k)',
    riskManagement: 'Riesgo 0.5% por operación',
    timeframe: 'Alumno 2025'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: '¿Necesito experiencia previa en trading para ingresar a la mentoría?',
    answer: 'No es requisito obligatorio tener años de experiencia, pero sí haber abierto al menos una vez una plataforma como TradingView o MetaTrader y conocer los conceptos básicos. Si ya tenés experiencia previa pero no lográs consistencia, el programa está especialmente diseñado para desaprender malos hábitos y construir un sistema profesional.',
    category: 'Requisitos'
  },
  {
    question: '¿Cuánto tiempo dura el programa de mentoría?',
    answer: 'El programa principal intensivo dura 10 semanas con clases en vivo, revisiones 1 a 1 y seguimiento continuo. Tras finalizar las 10 semanas, mantendrás acceso permanente a la comunidad privada, al material actualizado y a las sesiones periódicas de actualización.',
    category: 'Estructura'
  },
  {
    question: '¿Cuál es la modalidad de cursada?',
    answer: 'Es 100% online y flexible. Combina clases en vivo por Zoom en horarios adaptados, material en alta definición en la plataforma de alumnos y sesiones individuales de revisión de trades con el mentor.',
    category: 'Modalidad'
  },
  {
    question: '¿Qué mercados se enseñan a operar en KBJ?',
    answer: 'La metodología de estructura institucional y gestión de riesgo aplica a cualquier mercado líquido: Forex (EUR/USD, GBP/USD, etc.), Índices Bursátiles (Nasdaq 100, S&P 500, Dow Jones), Criptomonedas de alta capitalización (BTC, ETH) y Commodities (Oro / XAUUSD). Vos elegís el activo que mejor se adapte a tu horario.',
    category: 'Mercados'
  },
  {
    question: '¿Cuánto capital necesito para empezar a operar?',
    answer: 'Durante la etapa de aprendizaje operarás en cuenta DEMO o con montos simbólicos. Nuestro enfoque principal te capacita tanto para gestionar tu propio capital de forma responsable como para postularte y superar pruebas de cuentas fondeadas (Prop Firms de $50k a $200k) sin arriesgar tus ahorros personales.',
    category: 'Capital'
  },
  {
    question: '¿Las clases quedan grabadas si no puedo asistir en vivo?',
    answer: 'Sí, todas las sesiones en vivo quedan grabadas en calidad 4K y se suben al portal exclusivo de estudiantes dentro de las 24 horas siguientes, con marcadores por tema para que puedas repasar cuando quieras.',
    category: 'Acceso'
  },
  {
    question: '¿La mentoría ofrece un canal de señales para copiar trades?',
    answer: 'Rotundamente NO. En KBJ estamos en contra de los canales de señales que generan dependencia y queman cuentas. Te enseñamos a pensar, analizar y ejecutar con criterio propio para que seas un trader libre e independiente.',
    category: 'Filosofía'
  },
  {
    question: '¿Cómo es el proceso de admisión a KBJ?',
    answer: 'Para mantener la máxima calidad y atención personalizada, los cupos son limitados por camada. Coordinamos una breve llamada de evaluación o intercambio por WhatsApp para entender tu situación actual y confirmar si la mentoría se alinea con tus metas.',
    category: 'Admisión'
  }
];
