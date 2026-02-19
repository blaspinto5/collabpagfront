import { memo } from "react";
import { Link } from "react-router-dom";
import { ILLUSTRATION_PRICE } from "../constants/illustrations";

const formatPrice = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  minimumFractionDigits: 0,
}).format;

const IllustrationCard = memo(({ to, number, image, title, price }) => {
  const Wrapper = to ? Link : 'div';
  const wrapperProps = to ? { to, className: 'block group' } : { className: 'block group' };

  const displayTitle = title || (number ? `Ilustración N° ${number}` : 'Ilustración');
  const displayPrice = price || ILLUSTRATION_PRICE;

  return (
    <Wrapper {...wrapperProps}>
      <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-gold/40">
        <div className="h-52 overflow-hidden">
          <img
            src={image}
            alt={displayTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-4 flex items-center justify-between">
          <h3 className="text-white text-lg font-semibold">
            {displayTitle}
          </h3>

          <span className="text-gold font-bold">
            {formatPrice(displayPrice)}
          </span>
        </div>
      </div>
    </Wrapper>
  );
});

export default IllustrationCard;
