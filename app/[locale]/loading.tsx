import { Scissors } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        {/* Animated Icon */}
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 animate-pulse ring-1 ring-primary/20">
          <Scissors className="w-10 h-10 text-primary animate-bounce" />
        </div>
        
        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-black uppercase tracking-tighter">
            Gold<span className="text-primary italic">Tan</span>
          </h2>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
