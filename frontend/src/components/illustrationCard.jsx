import { memo } from "react";
import { Link } from "react-router-dom";
import { ILLUSTRATION_PRICE } from "../constants/illustrations";

const formatPrice = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  minimumFractionDigits: 0,
}).format;

const IllustrationCard = memo(({ number, image }) => {
  return (
    <Link to={`/sorteo/${number}`} className="block group">
      <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-gold/40">

        <div className="h-52 overflow-hidden">
          <img
            src={image}
            alt={`Ilustración ${number}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-4 flex items-center justify-between">
          <h3 className="text-white text-lg font-semibold">
            Ilustración N° {number}
          </h3>

          <span className="text-gold font-bold">
            {formatPrice(ILLUSTRATION_PRICE)}
          </span>
        </div>
      </div>
    </Link>
  );
});

export default IllustrationCard;
