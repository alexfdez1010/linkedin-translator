import type { Dictionary } from './en';

const es: Dictionary = {
  meta: {
    title:
      'Traductor de LinkedIn - Convierte texto normal en publicaciones insoportables',
    description:
      'Una herramienta sarcástica que convierte tu texto humano normal en las publicaciones exageradas y autocomplacientes de LinkedIn que todos adoramos (odiar).',
    ogTitle: 'Traductor de LinkedIn',
    ogDescription:
      'Convierte texto normal en publicaciones insoportables de LinkedIn. Porque cada café merece un discurso motivacional de 500 palabras.',
    twitterDescription:
      'Convierte texto normal en publicaciones insoportables de LinkedIn. ¿A que sí? 🚀',
  },
  header: {
    title: 'Traductor de LinkedIn',
    subtitle:
      'Convierte texto normal en publicaciones insoportables de LinkedIn',
  },
  input: {
    label: 'Texto humano normal',
    placeholder: 'Me he hecho un café esta mañana...',
    translateFull: '🚀 Traducir a LinkedIn',
    translateShort: '🚀 Traducir',
    translating: 'Traduciendo',
  },
  output: {
    label: 'Versión LinkedIn',
    placeholder:
      'Tu insoportable publicación de LinkedIn aparecerá aquí...',
    generating: 'Generando cringe...',
    copied: 'Copiado',
    copy: 'Copiar',
    share: 'Compartir',
    editHint: 'Haz clic para editar',
    dialogTitle: 'Compartir esta traducción',
    dialogDescription: 'Copia el enlace de abajo para compartir tu traducción de LinkedIn con cualquiera.',
    dialogCopy: 'Copiar enlace',
    dialogCopied: '¡Copiado!',
    dialogClose: 'Cerrar',
    shareError: 'Error al generar el enlace. Inténtalo de nuevo.',
    disclaimer:
      'Por favor, no publiquéis esto. O hacedlo. No juzgamos. (Sí que lo hacemos.)',
  },
  examples: {
    title: 'Prueba con estos',
    items: [
      'Hoy he comido en el escritorio',
      'He conseguido un curro nuevo',
      'Me he ido a dar un paseo',
      'Por fin me ha compilado el código',
      'Me he leído un libro este finde',
    ],
  },
  footer: {
    text: 'Hecho para dejar en evidencia lo absurdo de la cultura de LinkedIn.',
    openSource: 'Código Abierto',
    poweredBy: 'Impulsado por sarcasmo e IA',
  },
  share: {
    title: 'Traducción de LinkedIn compartida',
    originalLabel: 'Texto original',
    translatedLabel: 'Versión LinkedIn',
    cta: 'Pruébalo tú mismo',
    ctaDescription: 'Crea tu propia publicación insoportable de LinkedIn',
    sharedOn: 'Compartido el',
  },
  errors: {
    generic: 'Algo ha salido mal. Por favor, inténtalo de nuevo.',
    emptyText: 'Por favor, escribe algo para traducir',
    tooLong: 'El texto debe tener 2000 caracteres o menos',
    noApiKey: 'OPENROUTER_API_KEY no está configurado',
    translationFailed: 'La traducción ha fallado. Por favor, inténtalo de nuevo.',
    serviceFailed:
      'El servicio de traducción ha fallado. Por favor, inténtalo de nuevo.',
  },
};

export default es;
