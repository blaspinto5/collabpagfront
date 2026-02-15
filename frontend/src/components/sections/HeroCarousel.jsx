/**
 * HeroCarousel Component
 * Clean, centered carousel with Swiper
 */

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'lucide-react';
import { Clock, ChevronRight } from 'lucide-react';


// Price formatter
const formatPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
}).format;

// Date formatter
const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'short'
    });

const dummyData = [
    {
        id: 1,
        ticketPrice: 2990,
        totalTickets: 100,
        ticketsSold: 45,
        endDate: "2026-03-14",
        prizeValue: 1299990
    },
    {
        id: 2,
        ticketPrice: 1990,
        totalTickets: 150,
        ticketsSold: 89,
        endDate: "2026-03-19",
        prizeValue: 599990
    },
     {
        id: 3,
        ticketPrice: 1990,
        totalTickets: 150,
        ticketsSold: 89,
        endDate: "2026-03-19",
        prizeValue: 599990
    },
     {
        id: 4,
        ticketPrice: 1990,
        totalTickets: 150,
        ticketsSold: 89,
        endDate: "2026-03-19",
        prizeValue: 599990
    },
     {
        id: 5,
        ticketPrice: 1990,
        totalTickets: 150,
        ticketsSold: 89,
        endDate: "2026-03-19",
        prizeValue: 599990
    },
     {
        id: 6,
        ticketPrice: 1990,
        totalTickets: 150,
        ticketsSold: 89,
        endDate: "2026-03-19",
        prizeValue: 599990
    },
     {
        id: 7,
        ticketPrice: 1990,
        totalTickets: 150,
        ticketsSold: 89,
        endDate: "2026-03-19",
        prizeValue: 599990
    },
     {
        id: 8,
        ticketPrice: 1990,
        totalTickets: 150,
        ticketsSold: 89,
        endDate: "2026-03-19",
        prizeValue: 599990
    },
    
];



const HeroCarousel = () => {

    return (
        <section className="py-16 md:py-24">

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <span className="inline-block px-5 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-lg font-bold uppercase tracking-widest mb-6">
                    Sorteos Activos
                </span>

                {/* <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">
                    Elige tu <span className="text-gold">Premio</span>
                </h1> */}
            </div>

            {/* GRID DE TARJETAS */}
            <div className="max-w-7xl mx-auto px-2">
                <div className="
                    grid 
                    gap-12
                    sm:grid-cols-1 
                    md:grid-cols-4 
                    lg:grid-cols-4
                ">
                    {dummyData.map((raffle, index) => (
                        <CarouselCard
                            key={raffle.id}
                            raffle={{
                                ...raffle,
                                image: `/images/img${(index % 8) + 1}.png`
                            }}
                        />
                    ))}


                </div>
            </div>
        </section>
    );
};


// Carousel Card - Premium Design
const CarouselCard = memo(({ raffle }) => {
    const { id, title, image, ticketPrice, totalTickets, ticketsSold, endDate, category } = raffle;
    const progress = (ticketsSold / totalTickets) * 100;
    const isHot = progress > 70;

    return (
        <Link to={`/sorteo/${id}`} className="block group">
            <div className="relative bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-gold/40 group-hover:shadow-[0_0_60px_rgba(255,215,0,0.15)]">

                {/* Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                    <img
                        src={image || '/placeholder.jpg'}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    {/* Category */}
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20">
                        {category}
                    </span>

                    {/* Hot Badge */}
                    {/* {isHot && (
                        <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center gap-1">
                            <Flame size={12} />
                            Hot
                        </span>
                    )} */}

                    {/* Prize Value */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        {/* <div className="flex items-center gap-2 text-gold font-bold text-xl">
                            <Trophy size={20} />
                            {formatPrice(prizeValue)}
                        </div> */}
                        <div className="flex items-center gap-1.5 text-white/80 text-sm">
                            <Clock size={14} />
                            {formatDate(endDate)}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                    <h3 className="text-xl sm:text-2xl  text-white mb-4 group-hover:text-gold transition-colors line-clamp-1">
                        Ilustración N° {id}

                    </h3>

                    {/* Progress */}
                    {/* <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">{ticketsSold} vendidos</span>
                            <span className="text-gold font-medium">{totalTickets - ticketsSold} disponibles</span>
                        </div>
                        <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div> */}

                    {/* CTA Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-cyan font-bold">
                            {/* <Ticket size={18} /> */}
                            <Image size={18} />
                            <span>{formatPrice(ticketPrice)}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-gold font-semibold text-sm group-hover:gap-2 transition-all">
                            Revisar
                            <ChevronRight size={16} />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
});

CarouselCard.displayName = 'CarouselCard';

// Loading Skeleton
const LoadingSkeleton = memo(() => (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
            <div className="h-6 w-32 bg-slate-700/50 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-12 w-80 bg-slate-700/50 rounded-lg mx-auto animate-pulse" />
        </div>
        <div className="max-w-4xl mx-auto px-4">
            <div className="h-96 bg-slate-800/50 rounded-3xl animate-pulse" />
        </div>
    </section>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

export default HeroCarousel;