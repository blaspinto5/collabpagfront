import { memo, useEffect, useState } from "react";
import IllustrationCard from "../components/illustrationCard";
import { cardsService } from "../services/cardsService";
import { buildCardAssetUrl } from "../utils/assets";

const ILLUSTRATION_PRICE = 1990;

const IllustrationsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const { cards: list } = await cardsService.listAll(1, 32);
        if (!mounted) return;
        setCards(list || []);
      } catch (err) {
        if (!mounted) return;
        setError(err?.message || 'Error cargando ilustraciones');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Todas las Ilustraciones</h1>
          <p className="text-slate-400 text-lg">Compra tu ilustración y participa automáticamente.</p>
        </div>

        {loading && <div className="py-8">Cargando ilustraciones...</div>}
        {error && <div className="py-8 text-red-400">{error}</div>}

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {(cards || []).map((card) => (
            <div key={card.id}>
              {card.sorteoId ? (
                <IllustrationCard
                  to={`/sorteo/${card.sorteoId}`}
                  image={buildCardAssetUrl(card.image)}
                  title={card.title}
                  price={card.metadata?.precio}
                />
              ) : (
                <IllustrationCard
                  image={buildCardAssetUrl(card.image)}
                  title={card.title}
                  price={card.metadata?.precio}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(IllustrationsPage);
