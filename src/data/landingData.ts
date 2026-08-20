import {
  PainPoint,
  Pillar,
  MethodStep,
  Deliverable,
  MetricCounter,
  Testimonial,
  FaqItem
} from '../types';

export const PAIN_POINTS: PainPoint[] = [
  {
    id: 'friccion-01',
    icon: 'Flame',
    title: 'OPERAR POR IMPULSO',
    description: 'Entrás al mercado porque ves una vela grande moviéndose rápido, sentís que te estás perdiendo el movimiento (FOMO) y cuando entrás, el precio se da vuelta instantáneamente.',
    solution: 'Protocolo de confirmación previo a cualquier orden. Si no cumple todas las reglas, no hay trade.',
    stat: 'Causa #1 de liquidación de cuentas'
  },
  {
    id: 'friccion-02',
    icon: 'TrendingDown',
    title: 'SOBREOPERAR & REVENGE TRADING',
    description: 'Tuviste un trade negativo y en lugar de cerrar la plataforma, abrís tres operaciones más en la misma sesión para recuperar la pérdida, destruyendo la cuenta.',
    solution: 'Reglas estrictas de Stop Operativo Diario. Límite máximo de pérdidas por sesión no negociable.',
    stat: '90% del capital se pierde en trades impulsivos'
  },
  {
    id: 'friccion-03',
    icon: 'Shuffle',
    title: 'CAMBIAR DE ESTRATEGIA CONSTANTEMENTE',
    description: 'Probás un indicador nuevo cada semana: cruce de medias, Smart Money, ondas de Elliott, soporte y resistencia. Nunca le das tiempo a un método de madurar estadísticamente.',
    solution: 'Especialización en un único modelo de alta probabilidad con ventaja matemática documentada.',
    stat: 'El trading sin proceso no tiene ventaja estadística'
  },
  {
    id: 'friccion-04',
    icon: 'AlertTriangle',
    title: 'NO TENER UN PLAN DE RIESGO MATEMÁTICO',
    description: 'Arriesgás el 1% en un trade, el 5% en el siguiente porque estás "seguro" de que se va a dar, y cuando falla, borrás las ganancias de todo un mes en 20 minutos.',
    solution: 'Calculadora y dimensionamiento mecánico de lotaje según porcentaje fijo de riesgo por operación.',
    stat: 'Sin gestión de riesgo no hay supervivencia'
  },
  {
    id: 'friccion-05',
    icon: 'EyeOff',
    title: 'FALTA DE CRITERIO PROPIO Y DEPENDENCIA',
    description: 'Buscás canales de señales o grupos de alertas esperando que alguien te diga cuándo comprar y cuándo vender, sin entender por qué se toma la decisión ni cuándo invalidarla.',
    solution: 'Desarrollo de lectura de mercado independiente y análisis institucional autónomo.',
    stat: 'El 98% de los canales de señales son insostenibles'
  },
  {
    id: 'friccion-06',
    icon: 'Clock',
    title: 'NO LLEVAR REGISTRO NI ESTADÍSTICAS',
    description: 'Cerrás la sesión y no sabés cuál es tu win rate real, cuál es tu ratio riesgo-beneficio promedio ni en qué días u horarios sos rentable.',
    solution: 'Journaling cuantitativo y auditoría continua de métricas para optimizar tu toma de decisiones.',
    stat: 'Lo que no se mide no se puede mejorar'
  }
];

export const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'ESTRUCTURA',
    subtitle: 'Flujo de Órdenes & Liquidez Institucional',
    description: 'Entender cómo se posicionan los grandes participantes del mercado. Identificar zonas de liquidez, desequilibrios (Fair Value Gaps) y cambios de estructura real frente a trampas inducidas a traders minoristas.',
    details: [
      'Identificación de liquidez interna y externa',
      'Desequilibrios y zonas de entrega de precio eficiente',
      'Filtrado de rupturas falsas e inducciones minoristas',
      'Mapeo de estructura en temporalidades mayores (HTF)'
    ],
    icon: 'Layers',
    accentColor: 'lime'
  },
  {
    number: '02',
    title: 'CRITERIO',
    subtitle: 'Análisis Contextual & Asimetría',
    description: 'Saber qué buscar, pero sobre todo, cuándo NO operar. El 70% de la consistencia consiste en mantenerse al margen en condiciones de baja probabilidad y esperar los escenarios donde la probabilidad está de tu lado.',
    details: [
      'Filtrado contextual por sesiones (Londres / Nueva York)',
      'Confluencia de factores macro y niveles clave',
      'Reglas mecánicas de invalidación de escenario',
      'Gestión de expectativas ante noticias de alto impacto'
    ],
    icon: 'Compass',
    accentColor: 'green'
  },
  {
    number: '03',
    title: 'GESTIÓN',
    subtitle: 'Matemática del Riesgo & Asimetría R:R',
    description: 'Un sistema rentable no necesita acertar el 90% de las veces. Con una relación riesgo-beneficio mínima de 1:3 y un riesgo controlado por operación, la matemática juega a tu favor sesión tras sesión.',
    details: [
      'Riesgo fijo por operación (0.5% - 1.0%)',
      'Dimensionamiento exacto de lotaje antes de ingresar',
      'Estrategias de toma de parciales y protección de capital',
      'Control de Drawdown diario y semanal no negociable'
    ],
    icon: 'ShieldCheck',
    accentColor: 'emerald'
  },
  {
    number: '04',
    title: 'PSICOLOGÍA',
    subtitle: 'Disciplina Operativa & Control Emocional',
    description: 'El mercado es un espejo de tus impulsos. Aprender a ejecutar con frialdad, aceptar las pérdidas como un costo operativo de negocio y eliminar el miedo a perder y la codicia por ganar de más.',
    details: [
      'Eliminación del FOMO y el Revenge Trading',
      'Desapego del resultado individual trade por trade',
      'Rutina previa a la sesión de trading para enfoque mental',
      'Journaling emocional y auditoría de decisiones'
    ],
    icon: 'Brain',
    accentColor: 'cyan'
  }
];

export const METHOD_STEPS: MethodStep[] = [
  {
    number: '01',
    title: 'DIAGNÓSTICO & AUDITORÍA',
    phase: 'Semana 1-2',
    description: 'Revisamos tu historial operativo previo, identificamos tus sesgos emocionales y corregimos los errores que te están haciendo perder capital.',
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
    tag: 'Consistencia'
  }
];

export const DELIVERABLES: Deliverable[] = [
  {
    title: 'Mentoría Personalizada 1 a 1',
    description: 'Sesiones individuales directas con el mentor para analizar tu operativa, corregir fallas en vivo y acelerar tu curva de aprendizaje.',
    tag: 'Acompañamiento Directo',
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
    name: 'Luisina Sanchi',
    location: 'Córdoba, Argentina',
    role: 'Alumna de Mentoría KBJ',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    quote: 'La verdad que aprendí trading gracias a vos Tobi, a ver cómo se mueve el mercado, la acción de precio, me enseñaste una estrategia que hoy me permite tradear sola, cuando antes tenía muchos miedo.\n\nMe cambias la forma de pensar y no solo en el trading sino en la vida, en cada aspecto de la vida me hiciste mejorar con tu psicología.\n\nGracias como te digo siempre! Gracias por abrirme los ojos y pensé en positivo, en confiar en mí misma y enseñarme a tener amor propio. Vamos por más 💪 Esto recién empieza',
    winRateImpact: 'Estrategia para operar sola',
    riskManagement: 'Confianza y psicología aplicada'
  },
  {
    name: 'Matías Bessio',
    location: 'Rosario, Argentina',
    role: 'Alumno de Mentoría KBJ',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    quote: 'Hermano, te quería decir que la verdad las cosas que estoy logrando últimamente es increíble. 🤯\n\nAntes para mí retirar de una cuenta de fondeo me parecía imposible, y hoy ya retiré varias veces, crecí cuenta de capital propio y sigo pasando challeng como si nada 🤯📈💯.\n\nTodo gracias a vos hermano gracias al lavado de mente que me hiciste en lo mental y en, capacitar en aprender tremenda habilidad 🥹💯 Simplemente GRACIAS 🫶',
    winRateImpact: 'Múltiples retiros de fondeo & Challenges pasados',
    riskManagement: 'Crecimiento de capital propio'
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
    question: '¿Cómo son las sesiones 1 a 1?',
    answer: 'Nos conectamos por videollamada de forma privada para auditar tus operaciones, revisar tu journal, detectar fugas de capital y ajustar el plan a tus horarios y perfil de riesgo específico.',
    category: 'Acompañamiento'
  },
  {
    question: '¿Se dan señales de trading en el programa?',
    answer: 'No. No somos un canal de señales. El objetivo es que aprendas a leer el mercado y tomar tus propias decisiones con criterio técnico e independencia absoluta.',
    category: 'Metodología'
  },
  {
    question: '¿Qué capital necesito para empezar a operar?',
    answer: 'Durante la etapa de aprendizaje operarás en cuenta demo para validar tu ventaja matemática sin arriesgar dinero real. Una vez demostrada tu consistencia en números, te enseñamos a gestionar cuentas de capital propio o aplicar a evaluaciones de cuentas de fondeo institucionales.',
    category: 'Capital'
  },
  {
    question: '¿Tengo garantía de resultados?',
    answer: 'El trading conlleva riesgo de capital. Ningún profesional honesto puede garantizar retornos económicos fijos. Lo que garantizamos es un método estructurado paso a paso, acompañamiento personalizado y todas las herramientas para que construyas un proceso profesional.',
    category: 'Garantía'
  }
];
