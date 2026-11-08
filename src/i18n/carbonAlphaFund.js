// Content for the EU Carbon Alpha Fund project page (EN + ES).
// Shared by src/pages/CarbonAlphaFund.jsx and scripts/prerender.mjs.
const content = {
  en: {
    nav: 'EU Carbon Alpha Fund',
    meta: {
      title: 'EU Carbon Alpha Fund',
      description:
        'EU Carbon Alpha Fund: a discretionary EUA futures strategy led by Alberto Perez, seeking EUR 10m of seed capital from professional investors.',
    },
    hero: {
      label: 'Project · For professional investors',
      heading: 'EU Carbon Alpha',
      headingAccent: 'Fund',
      description:
        'A discretionary EU carbon allowance (EUA) futures strategy, led by Alberto Perez. Seed capital round for professional investors.',
      stats: [
        { value: 'EUA futures', label: 'Single-asset mandate' },
        { value: '20+ years', label: 'Energy & carbon markets' },
        { value: '6', label: 'Fundamental drivers' },
        { value: '€10m', label: 'Seed capital target' },
      ],
    },
    strategy: {
      label: 'The strategy',
      heading: 'One instrument, a disciplined process',
      p1: 'The fund has a single-asset mandate: ICE Endex EUA futures (December contracts). It is long-biased with tactical short positions, and it trades no other commodities.',
      p2: 'Decisions are discretionary, informed by policy developments, the auction calendar and price trend.',
    },
    market: {
      label: 'The market',
      heading: 'A deep, liquid and policy-driven market',
      description:
        'EU Allowances (EUAs) are traded under the EU Emissions Trading System, the world’s largest carbon market by traded value. Each allowance confers the right to emit one tonne of CO2e.',
      items: [
        {
          title: 'Broad coverage',
          desc: 'Power and heat, energy-intensive industry, and intra-EEA aviation and maritime (since 2024).',
        },
        {
          title: 'Deep and liquid',
          desc: 'In 2024, 13.7bn tonnes were traded (+35% y/y) and auctions raised €38.8bn.',
        },
        {
          title: 'Policy-driven supply',
          desc: 'The cap falls by a linear reduction factor of 4.3% (2024–27), rising to 4.4% from 2028.',
        },
      ],
    },
    drivers: {
      label: 'The process',
      heading: 'Six fundamental drivers frame every trade',
      note: 'How the inputs are combined, including weightings, thresholds and timing rules, is proprietary and not disclosed.',
      items: [
        {
          title: 'Supply',
          desc: 'Auction calendar and volumes, free allocation, market stability reserve (MSR) withdrawals.',
        },
        {
          title: 'Compliance',
          desc: 'Verified emissions versus consensus, and utility forward hedging.',
        },
        {
          title: 'Policy',
          desc: 'ETS review, MSR rules, CBAM free-allocation phase-out and ETS2.',
        },
        {
          title: 'Energy',
          desc: 'Gas–coal switching, clean dark and spark spreads, and the German power curve.',
        },
        {
          title: 'Weather',
          desc: 'Temperature, wind, solar and hydro, plus summer heat and low rivers that raise fossil burn.',
        },
        {
          title: 'Positioning',
          desc: 'Fund positioning, auction cover ratios and options open interest.',
        },
      ],
    },
    founder: {
      label: 'The team',
      heading: 'Founder and portfolio manager',
      name: 'Alberto Perez',
      role: 'Founder & Portfolio Manager · Madrid',
      intro: 'More than 20 years in energy and carbon markets.',
      details: [
        {
          label: 'Recent roles',
          value:
            'Managing Director, Grupo Tradama, and Management Committee member, SDCL Iberia (2020–2026); CEO, Grupo Futura (2016–2017).',
        },
        {
          label: 'Energy background',
          value: 'Energy Director, CM Capital, Madrid and São Paulo (2006–2015).',
        },
        { label: 'Education', value: 'Universidad de Oviedo.' },
      ],
    },
    opportunity: {
      label: 'Founding investor opportunity',
      heading: 'Seeking €10m of seed capital',
      description:
        'The fund is looking for founding investors among professional investors. Terms are indicative, for discussion, and subject to legal structuring and final documentation. This is not an offer.',
      cta: 'Request the investor deck',
    },
    disclaimer: {
      label: 'Important information',
      text: 'For professional clients (MiFID II) and professional investors (AIFMD) only. For information and discussion; not an offer or solicitation. Futures are leveraged and losses may exceed margin posted. EUA prices are highly sensitive to policy and regulatory change. Past performance is not a reliable indicator of future results.',
    },
    backHome: 'Back to home',
  },

  es: {
    nav: 'EU Carbon Alpha Fund',
    meta: {
      title: 'EU Carbon Alpha Fund',
      description:
        'EU Carbon Alpha Fund: una estrategia discrecional de futuros de EUA dirigida por Alberto Perez, que busca 10 M€ de capital semilla de inversores profesionales.',
    },
    hero: {
      label: 'Proyecto · Para inversores profesionales',
      heading: 'EU Carbon Alpha',
      headingAccent: 'Fund',
      description:
        'Una estrategia discrecional de futuros de derechos de emisión de la UE (EUA), dirigida por Alberto Perez. Ronda de capital semilla para inversores profesionales.',
      stats: [
        { value: 'Futuros EUA', label: 'Mandato de un solo activo' },
        { value: '+20 años', label: 'Mercados de energía y carbono' },
        { value: '6', label: 'Factores fundamentales' },
        { value: '10 M€', label: 'Objetivo de capital semilla' },
      ],
    },
    strategy: {
      label: 'La estrategia',
      heading: 'Un solo instrumento, un proceso disciplinado',
      p1: 'El fondo tiene un mandato de un solo activo: futuros EUA de ICE Endex (contratos de diciembre). Tiene sesgo comprador con posiciones vendedoras tácticas y no opera ninguna otra materia prima.',
      p2: 'Las decisiones son discrecionales y se apoyan en la evolución de la política regulatoria, el calendario de subastas y la tendencia de precios.',
    },
    market: {
      label: 'El mercado',
      heading: 'Un mercado profundo, líquido y marcado por la política',
      description:
        'Los derechos de emisión de la UE (EUA) se negocian en el Sistema de Comercio de Derechos de Emisión de la UE, el mayor mercado de carbono del mundo por valor negociado. Cada derecho otorga la facultad de emitir una tonelada de CO2e.',
      items: [
        {
          title: 'Amplia cobertura',
          desc: 'Electricidad y calor, industria intensiva en energía, y aviación y transporte marítimo intra-EEE (desde 2024).',
        },
        {
          title: 'Profundo y líquido',
          desc: 'En 2024 se negociaron 13.700 millones de toneladas (+35 % interanual) y las subastas recaudaron 38.800 M€.',
        },
        {
          title: 'Oferta determinada por la política',
          desc: 'El límite de emisiones baja con un factor de reducción lineal del 4,3 % (2024–27), que pasa al 4,4 % desde 2028.',
        },
      ],
    },
    drivers: {
      label: 'El proceso',
      heading: 'Seis factores fundamentales enmarcan cada operación',
      note: 'La forma de combinar los factores, incluidas ponderaciones, umbrales y reglas de timing, es propia y no se divulga.',
      items: [
        {
          title: 'Oferta',
          desc: 'Calendario y volúmenes de subastas, asignación gratuita, retiradas de la reserva de estabilidad del mercado (MSR).',
        },
        {
          title: 'Cumplimiento',
          desc: 'Emisiones verificadas frente al consenso y coberturas a plazo de las eléctricas.',
        },
        {
          title: 'Política',
          desc: 'Revisión del ETS, reglas de la MSR, eliminación gradual de la asignación gratuita (CBAM) y ETS2.',
        },
        {
          title: 'Energía',
          desc: 'Cambio gas–carbón, márgenes clean dark y spark, y la curva de la electricidad alemana.',
        },
        {
          title: 'Clima',
          desc: 'Temperatura, viento, solar e hidráulica, además del calor estival y los ríos bajos que aumentan el consumo de combustibles fósiles.',
        },
        {
          title: 'Posicionamiento',
          desc: 'Posicionamiento de los fondos, ratios de cobertura de las subastas e interés abierto en opciones.',
        },
      ],
    },
    founder: {
      label: 'El equipo',
      heading: 'Fundador y gestor de cartera',
      name: 'Alberto Perez',
      role: 'Fundador y Gestor de Cartera · Madrid',
      intro: 'Más de 20 años en los mercados de energía y carbono.',
      details: [
        {
          label: 'Cargos recientes',
          value:
            'Director General de Grupo Tradama y miembro del Comité de Dirección de SDCL Iberia (2020–2026); CEO de Grupo Futura (2016–2017).',
        },
        {
          label: 'Trayectoria en energía',
          value: 'Director de Energía en CM Capital, Madrid y São Paulo (2006–2015).',
        },
        { label: 'Formación', value: 'Universidad de Oviedo.' },
      ],
    },
    opportunity: {
      label: 'Oportunidad para inversores fundadores',
      heading: 'Buscamos 10 M€ de capital semilla',
      description:
        'El fondo busca inversores fundadores entre inversores profesionales. Las condiciones son indicativas, están sujetas a conversación y a la estructuración jurídica y la documentación final. Esto no constituye una oferta.',
      cta: 'Solicitar la presentación para inversores',
    },
    disclaimer: {
      label: 'Información importante',
      text: 'Solo para clientes profesionales (MiFID II) e inversores profesionales (AIFMD). Con fines informativos y de debate; no constituye una oferta ni una solicitud. Los futuros están apalancados y las pérdidas pueden superar el margen depositado. Los precios de los EUA son muy sensibles a los cambios políticos y regulatorios. La rentabilidad pasada no es un indicador fiable de resultados futuros.',
    },
    backHome: 'Volver al inicio',
  },
}

export default content
