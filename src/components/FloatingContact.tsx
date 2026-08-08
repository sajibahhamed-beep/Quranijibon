import { getSiteSettings } from "@/data/siteSettingsStorage";

export default function FloatingContact() {
  const settings = getSiteSettings();
  const whatsappNumber = settings.whatsappNumber || "8801775551325";
  const displayText = settings.whatsappDisplayText || "সরাসরি কথা বলুন....";

  return (
    <div className="fixed bottom-6 right-0 z-50">
      <a
        href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center rounded-tl-full rounded-bl-full space-x-3 px-6 py-4 bg-[#00A89C] hover:bg-[#00897B] text-white font-extrabold text-base shadow-2xl shadow-[#00A89C]/40 hover:scale-105 active:scale-95 transition-all group border border-white/20"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/Whatsapp logo.png"
            alt="WhatsApp Logo"
            width={28}
            height={28}
            className="w-10 h-10 object-contain"
          />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-ping" />
        </div>
        <span className="tracking-wider">{displayText}</span>
      </a>
    </div>
  );
}
