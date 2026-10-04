import { Category, Product } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'desinfectantes',
    name: 'Desinfectantes',
    titleWithAccent: 'Desinfectantes & Sanitizantes',
    countLabel: '42 Prod.',
    referenceCount: 42,
    badgeColor: 'red',
    imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&auto=format&fit=crop&q=80',
    description: 'Amonios cuaternarios, pino concentrado, hipoclorito y desinfectantes hospitalarios.',
    subcategories: ['Todos', 'Hospitalario', 'Pino Concentrado', 'Cloro / Hipoclorito', 'Multiuso Floral', 'Cítrico & Desengrasante']
  },
  {
    id: 'detergentes-lavanderia',
    name: 'Detergentes & Lavandería',
    titleWithAccent: 'Detergentes & Lavandería Industrial',
    countLabel: '36 Prod.',
    referenceCount: 36,
    badgeColor: 'gray',
    imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&auto=format&fit=crop&q=80',
    description: 'Detergentes líquidos concentrados, suavizantes textiles y blanqueadores oxigenados.',
    subcategories: ['Todos', 'Líquidos Concentrados', 'Suavizantes', 'Blanqueadores', 'Desmanchadores']
  },
  {
    id: 'lavavajillas-cocina',
    name: 'Lavavajillas & Cocina',
    titleWithAccent: 'Lavavajillas & Higiene de Cocina',
    countLabel: '28 Prod.',
    referenceCount: 28,
    badgeColor: 'red',
    imageUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&auto=format&fit=crop&q=80',
    description: 'Lavavajillas concentrados, desengrasantes pesados de hornos y desincrustantes.',
    subcategories: ['Todos', 'Lavavajillas Neutro', 'Desengrasantes Hornos', 'Desincrustantes Sarro', 'Grado Alimenticio']
  },
  {
    id: 'cuidado-pisos',
    name: 'Cuidado de Pisos',
    titleWithAccent: 'Cuidado de Pisos & Tratamientos',
    countLabel: '50 Prod.',
    referenceCount: 50,
    badgeColor: 'gray',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
    description: 'Ceras autobrillantes acrílicas, selladores poliméricos y removedores decapantes.',
    subcategories: ['Todos', 'Ceras Acrílicas', 'Selladores', 'Removedores Decapantes', 'Mantenedores']
  },
  {
    id: 'cuidado-institucional-manos',
    name: 'Cuidado Institucional & Manos',
    titleWithAccent: 'Cuidado Institucional & Manos',
    countLabel: '18 Prod.',
    referenceCount: 18,
    badgeColor: 'red',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    description: 'Jabones antibacteriales con glicerina, alcohol en gel y dispensadores institucionales.',
    subcategories: ['Todos', 'Jabones Líquidos', 'Alcohol en Gel', 'Jabón en Espuma', 'Dispensadores']
  },
  {
    id: 'limpiavidrios-superficies',
    name: 'Limpiavidrios & Superficies',
    titleWithAccent: 'Limpiavidrios & Superficies Múltiples',
    countLabel: '24 Prod.',
    referenceCount: 24,
    badgeColor: 'gray',
    imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80',
    description: 'Limpiavidrios antiempañantes, abrillantadores de acero inoxidable y lustramuebles.',
    subcategories: ['Todos', 'Limpiavidrios', 'Acero Inoxidable', 'Multisuperficies', 'Lustramuebles']
  }
];

export const PRODUCTS: Product[] = [
  // DESINFECTANTES (Matches Image 7.jpeg exact products)
  {
    id: 'prod-amo-501',
    sku: 'CÓD: PRO-AMO-501',
    name: 'Amonio Cuaternario 5ta Generación',
    shortDescription: 'Desinfección de quirófanos y áreas críticas hospitalarias.',
    categoryId: 'desinfectantes',
    brand: 'PROESA',
    imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: '1 Litro',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 32, wholesalePrice: 28 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 98, wholesalePrice: 85 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 440, wholesalePrice: 390 }
    ],
    price: 32,
    inStock: true,
    stockCount: 140,
    featured: true,
    technicalSheet: {
      activePrinciple: 'Cloruro de Didecil Dimetil Amonio + Alquil Dimetil Bencil Amonio (5ta Gen)',
      concentration: '10.5% p/v de amonio activo puro',
      ph: '7.0 ± 0.5 (Neutro no corrosivo)',
      dilution: 'Superficies críticas: 8 ml por Litro de agua. Sanitización general: 4 ml por Litro de agua.',
      applications: [
        'Quirófanos, áreas críticas y consultorios médicos',
        'Industria de alimentos y plantas embotelladoras',
        'Cabinas de desinfección y nebulización ambiental',
        'Pisos, paredes y mesones de preparación'
      ],
      precautions: [
        'Utilizar guantes de nitrilo durante la dilución concentrada',
        'No mezclar con jabones aniónicos o detergentes comunes',
        'Mantener en envase original sellado al resguardo del calor directo'
      ],
      certifications: ['Registro Sanitario SENASAG / DINAMED', 'Certificado de Análisis Microbiológico']
    }
  },
  {
    id: 'max-pin-0205',
    sku: 'CÓD: MAX-PIN-0205',
    name: 'Desinfectante Pino Concentrado Maxi Brill',
    shortDescription: 'Formulado con aceite de pino virgen para pisos de alto tránsito.',
    categoryId: 'desinfectantes',
    brand: 'MAXI BRILL',
    imageUrl: 'https://images.unsplash.com/photo-1585670270608-b404fb880c71?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: '1 Litro',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 20, wholesalePrice: 16 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 65, wholesalePrice: 54 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 280, wholesalePrice: 245 }
    ],
    price: 20,
    inStock: true,
    stockCount: 220,
    featured: true,
    technicalSheet: {
      activePrinciple: 'Aceite de Pino Virgen 85% + Tensioactivos Biodegradables',
      concentration: 'Fórmula emulsionable al contacto con agua',
      ph: '6.8 ± 0.4',
      dilution: '1:50 para trapeado diario con aroma perdurable. 1:20 para baños y contenedores.',
      applications: [
        'Pisos de cerámica, mosaico, cemento pulido y granito',
        'Servicios higiénicos, camarines y áreas de alto tránsito',
        'Neutralización instantánea de olores persistentes'
      ],
      precautions: [
        'No ingerir. Mantener fuera del alcance de niños',
        'En caso de contacto con ojos, enjuagar con abundante agua potable'
      ],
      certifications: ['Fórmula Registrada Maxi Brill', 'Biodegradabilidad 98%']
    }
  },
  {
    id: 'pro-clo-0310',
    sku: 'CÓD: PRO-CLO-0310',
    name: 'Hipoclorito de Sodio Industrial 8%',
    shortDescription: 'Desinfección profunda de superficies y tratamiento de agua.',
    categoryId: 'desinfectantes',
    brand: 'PROESA',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: '1 Litro',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 12, wholesalePrice: 9.5 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 38, wholesalePrice: 30 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 160, wholesalePrice: 135 }
    ],
    price: 12,
    inStock: true,
    stockCount: 310,
    technicalSheet: {
      activePrinciple: 'Hipoclorito de Sodio Estabilizado con Cloro Activo 80 g/L',
      concentration: '8.0% P/V cloro activo al envasar',
      ph: '11.5 - 12.5 (Alcalino protector)',
      dilution: '1000 ppm: 12.5 ml por Litro de agua. Desinfección hospitalaria 5000 ppm: 62.5 ml por Litro.',
      applications: [
        'Desinfección de sanitarios, azulejos y pisos hospitalarios',
        'Potabilización de tanques de agua y reservorios',
        'Blanqueo de ropa blanca en lavandería industrial'
      ],
      precautions: [
        'NUNCA mezclar con ácidos, amoníacos o desincrustantes (genera gases tóxicos)',
        'Usar protección ocular y guantes de caucho'
      ],
      certifications: ['Norma NB 512 de Calidad de Insumos Químicos']
    }
  },
  {
    id: 'pro-flo-0412',
    sku: 'CÓD: PRO-FLO-0412',
    name: 'Desinfectante Multiuso Floral',
    shortDescription: 'Limpieza y aromatización continua en oficinas, colegios y salones.',
    categoryId: 'desinfectantes',
    brand: 'PROESA',
    imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: '1 Litro',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 15, wholesalePrice: 12 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 48, wholesalePrice: 39 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 210, wholesalePrice: 180 }
    ],
    price: 15,
    inStock: true,
    stockCount: 190,
    technicalSheet: {
      activePrinciple: 'Bactericida de amplio espectro + Fragancias florales microencapsuladas',
      concentration: 'Formulación balanceada 2 en 1',
      ph: '7.2 ± 0.3',
      dilution: '1:30 para limpieza y aromatización de pisos. Puro en pulverizador para baños.',
      applications: [
        'Oficinas corporativas, bancos, recepciones y pasillos',
        'Aulas educativas, auditorios y centros culturales',
        'Pisos flotantes, porcelanatos y cerámicas esmaltadas'
      ],
      precautions: [
        'Almacenar en lugar fresco y seco alejado del sol'
      ]
    }
  },
  {
    id: 'cit-des-0520',
    sku: 'CÓD: CIT-DES-0520',
    name: 'Desengrasante & Desinfectante Cítrico',
    shortDescription: 'Remueve grasas pesadas mientras neutraliza gérmenes y bacterias.',
    categoryId: 'desinfectantes',
    brand: 'PROESA',
    imageUrl: 'https://images.unsplash.com/photo-1585670270608-b404fb880c71?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: '1 Litro',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 24, wholesalePrice: 19 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 78, wholesalePrice: 65 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 340, wholesalePrice: 295 }
    ],
    price: 24,
    inStock: true,
    stockCount: 160,
    technicalSheet: {
      activePrinciple: 'D-Limoneno Cítrico Natural + Tensoactivos no iónicos',
      concentration: 'Poder solvente desengrasante biodegradable',
      ph: '8.5 ± 0.5',
      dilution: 'Grasa pesada: aplicar puro o 1:3. Limpieza regular de pisos y mesones: 1:20.',
      applications: [
        'Cocinas industriales, parrillas y campanas extractoras',
        'Áreas de desposte y procesamiento cárnico',
        'Pisos de talleres y garajes con manchas aceitosas'
      ],
      precautions: [
        'No aplicar sobre superficies de aluminio sin enjuagar inmediatamente'
      ]
    }
  },
  {
    id: 'pro-alc-0115',
    sku: 'CÓD: PRO-ALC-0115',
    name: 'Alcohol Sanitizante 70% Spray',
    shortDescription: 'Sanitización instantánea sin enjuague para superficies y manos.',
    categoryId: 'desinfectantes',
    brand: 'PROESA',
    imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: '1 Litro',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 18, wholesalePrice: 14.5 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 58, wholesalePrice: 48 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 260, wholesalePrice: 220 }
    ],
    price: 18,
    inStock: true,
    stockCount: 240,
    technicalSheet: {
      activePrinciple: 'Alcohol Etílico Rectificado Grado 70° Gay-Lussac',
      concentration: '70% v/v (Concentración virucida óptima según OMS)',
      ph: 'Neutro 7.0',
      dilution: 'Uso directo sin diluir. Rápida evaporación sin residuos.',
      applications: ['Teclados, teléfonos, manijas y pupitres', 'Manos y calzados en puntos de acceso'],
      precautions: ['Producto inflamable. Mantener lejos de fuego o chispas']
    }
  },
  {
    id: 'max-clg-0340',
    sku: 'CÓD: MAX-CLG-0340',
    name: 'Maxi Brill Cloro Gel Activo',
    shortDescription: 'Mayor adherencia en superficies verticales, sanitización profunda.',
    categoryId: 'desinfectantes',
    brand: 'MAXI BRILL',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: '1 Litro',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 16, wholesalePrice: 13 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 52, wholesalePrice: 42 }
    ],
    price: 16,
    inStock: true,
    stockCount: 110,
    technicalSheet: {
      activePrinciple: 'Cloro Activo en matriz gelatinosa tixotrópica',
      concentration: '5.5% cloro activo formulado en gel denso',
      ph: '12.0',
      dilution: 'Aplicación directa sobre inodoros, lavamanos y juntas de cerámica.',
      applications: ['Inodoros y urinarios', 'Juntas con moho en duchas y tinas'],
      precautions: ['Usar guantes. No mezclar con otros limpiadores ácidos']
    }
  },

  // DETERGENTES & LAVANDERÍA
  {
    id: 'max-det-1100',
    sku: 'CÓD: MAX-DET-1100',
    name: 'Detergente Líquido Concentrado Maxi Brill',
    shortDescription: 'Alto poder desmanchador para prendas blancas y de color.',
    categoryId: 'detergentes-lavanderia',
    brand: 'MAXI BRILL',
    imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: 'Galón (3.8 Litros)',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 22, wholesalePrice: 18 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 68, wholesalePrice: 56 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 290, wholesalePrice: 250 }
    ],
    price: 68,
    inStock: true,
    stockCount: 175,
    featured: true,
    technicalSheet: {
      activePrinciple: 'Enzimas proteolíticas + Tensoactivos biodegradables',
      concentration: 'Fórmula ultra concentrada baja espuma para lavadoras industriales',
      ph: '8.0 ± 0.5',
      dilution: '60 ml por carga de 8 kg de ropa normal. 100 ml para ropa muy sucia.',
      applications: ['Lavanderías comerciales, hoteles y sanatorios', 'Prendas delicadas y toallas'],
      precautions: ['Evitar salpicaduras en los ojos']
    }
  },
  {
    id: 'pro-sua-1205',
    sku: 'CÓD: PRO-SUA-1205',
    name: 'Suavizante Textil Floral Proesa',
    shortDescription: 'Acondicionador de fibras para lavanderías hoteleras y clínicas.',
    categoryId: 'detergentes-lavanderia',
    brand: 'PROESA',
    imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: 'Galón (3.8 Litros)',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 18, wholesalePrice: 14 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 58, wholesalePrice: 48 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 250, wholesalePrice: 215 }
    ],
    price: 58,
    inStock: true,
    stockCount: 130,
    technicalSheet: {
      activePrinciple: 'Sales de amonio cuaternario catiónicas suavizantes',
      concentration: 'Facilita el planchado y previene la estática en sábanas',
      ph: '4.5 - 5.5',
      dilution: '50 ml por ciclo de enjuague',
      applications: ['Lencería hospitalaria, sábanas y toallas hoteleras'],
      precautions: ['No aplicar directamente concentrado sobre la tela']
    }
  },

  // LAVAVAJILLAS & COCINA
  {
    id: 'max-lav-2100',
    sku: 'CÓD: MAX-LAV-2100',
    name: 'Lavavajillas Concentrado Espumógeno Maxi Brill',
    shortDescription: 'Corta la grasa al instante con aroma limón y pH neutro hipoalergénico.',
    categoryId: 'lavavajillas-cocina',
    brand: 'MAXI BRILL',
    imageUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: '1 Litro',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 18, wholesalePrice: 14.5 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 58, wholesalePrice: 47 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 245, wholesalePrice: 210 }
    ],
    price: 18,
    inStock: true,
    stockCount: 210,
    featured: true,
    technicalSheet: {
      activePrinciple: 'Lauril éter sulfato sódico + Betaina de coco humectante',
      concentration: 'Alto poder de corte de grasas animales y vegetales',
      ph: '7.0 Neutro dermatológicamente probado',
      dilution: 'Unas gotas directamente en esponja o 15 ml por bacha de lavado.',
      applications: ['Platos, ollas, cristalería, cubiertos y utensilios gastronómicos'],
      precautions: ['Enjuagar con agua potable']
    }
  },
  {
    id: 'pro-deg-2201',
    sku: 'CÓD: PRO-DEG-2201',
    name: 'Desengrasante Alcalino Pesado Para Hornos',
    shortDescription: 'Elimina carbonilla y grasa requemada en cocinas industriales.',
    categoryId: 'lavavajillas-cocina',
    brand: 'PROESA',
    imageUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: '1 Litro',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 30, wholesalePrice: 25 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 95, wholesalePrice: 80 }
    ],
    price: 30,
    inStock: true,
    stockCount: 95,
    technicalSheet: {
      activePrinciple: 'Hidróxido de potasio + solventes polares de grasa',
      concentration: 'Fórmula ultra fuerte para grasa polimerizada',
      ph: '13.0',
      dilution: 'Puro o 1:2 sobre superficie tibia (50°C). Dejar actuar 10 minutos y retirar.',
      applications: ['Parrillas, freidoras, hornos rotativos y campanas'],
      precautions: ['Usar guantes de goma reforzada y gafas protectoras']
    }
  },

  // CUIDADO DE PISOS
  {
    id: 'max-cer-3100',
    sku: 'CÓD: MAX-CER-3100',
    name: 'Cera Acrílica Autobrillante Maxi Brill',
    shortDescription: 'Brillo espejo antideslizante de larga duración para alto tránsito.',
    categoryId: 'cuidado-pisos',
    brand: 'MAXI BRILL',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: 'Galón (3.8 Litros)',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 35, wholesalePrice: 29 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 115, wholesalePrice: 98 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 510, wholesalePrice: 450 }
    ],
    price: 115,
    inStock: true,
    stockCount: 88,
    featured: true,
    technicalSheet: {
      activePrinciple: 'Polímeros acrílicos metalizados de alta resistencia',
      concentration: '18% de sólidos totales',
      ph: '8.8',
      dilution: 'Uso directo con mopa aplicadora limpia. Aplicar 2 a 3 capas finas.',
      applications: ['Pisos de vinilo, baldosa, terrazo, granito y linóleo'],
      precautions: ['Dejar secar 45 min entre capa y capa. No pisar húmedo']
    }
  },
  {
    id: 'pro-rem-3205',
    sku: 'CÓD: PRO-REM-3205',
    name: 'Removedor de Cera y Selladores Heavy Duty',
    shortDescription: 'Acción rápida sin olor penetrante para decapado de pisos viejos.',
    categoryId: 'cuidado-pisos',
    brand: 'PROESA',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: 'Galón (3.8 Litros)',
    presentations: [
      { name: '1 Litro', volume: '1L', price: 28, wholesalePrice: 23 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 88, wholesalePrice: 75 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 390, wholesalePrice: 340 }
    ],
    price: 88,
    inStock: true,
    stockCount: 65,
    technicalSheet: {
      activePrinciple: 'Solventes polares penetrantes sin amoniaco agresivo',
      concentration: 'Disuelve hasta 10 capas acumuladas de cera en minutos',
      ph: '11.0',
      dilution: '1:4 en agua tibia para pisos muy encerados. 1:10 para mantenimiento.',
      applications: ['Decapado general previo al encerado nuevo'],
      precautions: ['Utilizar mopa húmeda y enjuagar con agua limpia']
    }
  },

  // CUIDADO INSTITUCIONAL & MANOS
  {
    id: 'pro-jab-4100',
    sku: 'CÓD: PRO-JAB-4100',
    name: 'Jabón Líquido Antibacterial con Glicerina',
    shortDescription: 'Higiene profunda con humectantes naturales para uso continuo.',
    categoryId: 'cuidado-institucional-manos',
    brand: 'PROESA',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: 'Galón (3.8 Litros)',
    presentations: [
      { name: '1 Litro con Dispensador', volume: '1L', price: 25, wholesalePrice: 20 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 65, wholesalePrice: 52 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 280, wholesalePrice: 235 }
    ],
    price: 65,
    inStock: true,
    stockCount: 140,
    featured: true,
    technicalSheet: {
      activePrinciple: 'Cloroxilenol 0.5% + Glicerina Pura USP',
      concentration: 'Elimina el 99.9% de bacterias cutáneas sin resecar la piel',
      ph: '5.5 (pH fisiológico de la piel)',
      dilution: 'Uso directo en dispensadores manuales o automáticos',
      applications: ['Baños de restaurantes, clínicas, colegios y empresas'],
      precautions: ['Uso externo exclusivamente']
    }
  },
  {
    id: 'max-gel-4205',
    sku: 'CÓD: MAX-GEL-4205',
    name: 'Alcohol en Gel Antiséptico 70° Maxi Brill',
    shortDescription: 'Secado rápido sin residuos pegajosos con dispensador dosificador.',
    categoryId: 'cuidado-institucional-manos',
    brand: 'MAXI BRILL',
    imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: '1 Litro',
    presentations: [
      { name: '1 Litro con Válvula', volume: '1L', price: 26, wholesalePrice: 21 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 75, wholesalePrice: 62 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 320, wholesalePrice: 275 }
    ],
    price: 26,
    inStock: true,
    stockCount: 180,
    technicalSheet: {
      activePrinciple: 'Etanol 70% v/v gelificado con Carbopol neutro',
      concentration: '70% alcohol con aloe vera protector dérmico',
      ph: '6.5',
      dilution: 'Uso directo sin diluir ni enjuagar',
      applications: ['Mesas de entrada, mostradores, salas de atención y oficinas'],
      precautions: ['Inflamable. Mantener cerrado']
    }
  },

  // LIMPIAVIDRIOS & SUPERFICIES
  {
    id: 'max-vid-5100',
    sku: 'CÓD: MAX-VID-5100',
    name: 'Limpiavidrios Antiempañante Maxi Brill',
    shortDescription: 'Cristales y espejos transparentes sin vetas ni reflejos.',
    categoryId: 'limpiavidrios-superficies',
    brand: 'MAXI BRILL',
    imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: '1 Litro',
    presentations: [
      { name: '1 Litro con Pistola Gatillo', volume: '1L', price: 20, wholesalePrice: 16 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 56, wholesalePrice: 45 },
      { name: 'Bidón (20 Litros)', volume: '20L', price: 240, wholesalePrice: 200 }
    ],
    price: 20,
    inStock: true,
    stockCount: 160,
    featured: true,
    technicalSheet: {
      activePrinciple: 'Isopropanol + Agentes antiestáticos hidrofóbicos',
      concentration: 'Secado instantáneo sin manchas ni rayas',
      ph: '7.5',
      dilution: 'Uso directo con atomizador y paño de microfibra limpio',
      applications: ['Vitrinas de locales comerciales, ventanas, mamparas y espejos'],
      precautions: ['No aplicar sobre pantallas antirreflejo especiales']
    }
  },
  {
    id: 'pro-mul-5205',
    sku: 'CÓD: PRO-MUL-5205',
    name: 'Limpiador Multisuperficies con Amonio',
    shortDescription: 'Eficaz en mesas, escritorios, melamina y acero inoxidable.',
    categoryId: 'limpiavidrios-superficies',
    brand: 'PROESA',
    imageUrl: 'https://images.unsplash.com/photo-1585670270608-b404fb880c71?w=500&auto=format&fit=crop&q=80',
    defaultPresentation: '1 Litro',
    presentations: [
      { name: '1 Litro con Gatillo', volume: '1L', price: 22, wholesalePrice: 17.5 },
      { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 62, wholesalePrice: 50 }
    ],
    price: 22,
    inStock: true,
    stockCount: 125,
    technicalSheet: {
      activePrinciple: 'Tensioactivo desengrasante + Cuaternario protector',
      concentration: 'Limpia, desengrasa y desodoriza en una sola pasada',
      ph: '7.0 Neutro',
      dilution: 'Puro para manchas difíciles. 1:5 para limpieza rutinaria de muebles.',
      applications: ['Mobiliario de oficina, mostradores, puertas y mesones'],
      precautions: ['Probar previamente en esquinas ocultas de madera virgen']
    }
  }
];

export const COMPANY_INFO = {
  name: 'PROESA Distribuidora',
  address: 'calle Ostria Reyes 432',
  city: 'Sucre, Bolivia',
  phones: ['72853351', '72873510'],
  primaryPhone: '72853351',
  whatsappUrl: (msg: string) => `https://wa.me/59172853351?text=${encodeURIComponent(msg)}`
};
