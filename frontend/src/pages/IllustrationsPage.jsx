import { memo } from "react";
import IllustrationCard from "../components/illustrationCard";

const ILLUSTRATION_PRICE = 1990;

const illustrations = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  image: `/images/img${i + 1}.png`,
}));

const IllustrationsPage = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Todas las Ilustraciones
          </h1>
          <p className="text-slate-400 text-lg">
            Compra tu ilustración y participa automáticamente.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {illustrations.map((item) => (
            <IllustrationCard
              key={item.id}
              id={item.id}
              image={item.image}
              price={ILLUSTRATION_PRICE}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default memo(IllustrationsPage);
