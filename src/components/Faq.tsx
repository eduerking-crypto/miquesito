import { Plus } from "lucide-react";
import { faq } from "../data/site";

export function Faq({ limite }: { limite?: number }) {
  const items = limite ? faq.slice(0, limite) : faq;
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details key={item.pregunta} className="faq-item">
          <summary>
            <span>{item.pregunta}</span>
            <Plus className="faq-icon h-5 w-5" aria-hidden="true" />
          </summary>
          <p className="faq-body">{item.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
