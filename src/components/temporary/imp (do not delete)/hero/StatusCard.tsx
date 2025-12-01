import { Briefcase, Code2, ExternalLink, MapPin } from "lucide-react";

const StatusCard = () => (
  <div className="w-full h-full flex items-center justify-center bg-neutral-950 relative overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-tr from-indigo-950/30 to-purple-950/30 opacity-50 z-1" />

    <div className="relative z-10 flex flex-col gap-4 md:gap-6 p-5 md:p-10 max-w-lg w-full h-full md:h-auto justify-center md:justify-start">
      <div className="flex items-center gap-3 text-neutral-400 text-xs md:text-sm font-mono uppercase tracking-widest border-b border-neutral-800 pb-4">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        System Status: Online
      </div>

      <div className="space-y-4">
        <h3 className="text-xl md:text-3xl text-white font-space font-medium leading-tight">
          Currently building the future at{" "}
          <span className="text-indigo-400">TechCorp Inc.</span>
        </h3>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-4 pt-2">
          <div className="flex items-center gap-3 text-neutral-300">
            <Briefcase className="w-4 h-4 text-neutral-500 min-w-4" />
            <span className="text-sm">Senior Frontend Eng.</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-300">
            <MapPin className="w-4 h-4 text-neutral-500 min-w-4" />
            <span className="text-sm">San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-300 md:col-span-2">
            <Code2 className="w-4 h-4 text-neutral-500 min-w-4" />
            <span className="text-sm">Stack: Next.js 15, Rust, WebGL</span>
          </div>
        </div>
      </div>

      <button
        className="hover:cursor-pointer mt-2 md:mt-4 flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md w-fit transition-colors text-sm font-medium"
        onClick={() => {
          window.location.reload();
        }}
      >
        View Project Details <ExternalLink className="w-3 h-3" />
      </button>
    </div>
  </div>
);

export default StatusCard;
