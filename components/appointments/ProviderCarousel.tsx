import { motion } from "framer-motion";
import { User, Check } from "lucide-react";

interface Provider {
    id: string;
    name: string;
    specialty: string;
    image: string;
}

interface ProviderCarouselProps {
    providers: Provider[];
    selectedProviderId: string | null;
    onSelect: (id: string) => void;
}

export function ProviderCarousel({ providers, selectedProviderId, onSelect }: ProviderCarouselProps) {
    return (
        <div className="w-full overflow-x-auto pb-6 scrollbar-hide">
            <div className="flex gap-4 min-w-max px-1">
                {providers.map((provider) => {
                    const isSelected = selectedProviderId === provider.id;

                    return (
                        <motion.div
                            key={provider.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onSelect(provider.id)}
                            className={`
                relative flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all duration-300 w-48
                ${isSelected
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-2 ring-primary ring-offset-2"
                                    : "bg-white text-foreground shadow-sm hover:shadow-md border border-border"}
              `}
                        >
                            <div className={`
                w-20 h-20 rounded-full mb-4 flex items-center justify-center overflow-hidden
                ${isSelected ? "bg-white/20" : "bg-muted"}
              `}>
                                <User className={`w-8 h-8 ${isSelected ? "text-white" : "text-muted-foreground"}`} />
                            </div>

                            <h3 className="font-bold text-center text-sm mb-1">{provider.name}</h3>
                            <p className={`text-xs text-center ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>
                                {provider.specialty}
                            </p>

                            {isSelected && (
                                <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center text-primary">
                                    <Check className="w-4 h-4" />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
