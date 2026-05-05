export default function UsageRecommendations() {
  const recommendations = [
    'Recorta el pabilo antes de cada uso (0.5–1 cm)',
    'No dejar encendida más de 2–3 horas seguidas',
    'Evitar corrientes de aire para una combustión uniforme',
    'Usar sobre superficies resistentes al calor',
    'Evitar la exposición directa al sol o altas temperaturas',
    'Mantener fuera del alcance de niños y mascotas',
  ];

  return (
    <div className="mt-12 pt-8 border-t border-charcoal/10">
      <h3 className="font-display text-xl font-bold text-charcoal mb-4">
        Recomendaciones de uso
      </h3>
      <ul className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-guayaba mt-2 flex-shrink-0"></span>
            <span className="font-body text-charcoal/70 text-base leading-relaxed">
              {recommendation}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
