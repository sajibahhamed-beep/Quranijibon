import Image from "next/image";
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
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white pl-2 pr-3 sm:pr-4 py-1.5 rounded-l-full shadow-lg transition-all duration-300 hover:scale-105 group border-y border-l border-white/20"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative flex items-center justify-center">
          <Image
            src="/assets/whatsapp-logo.png"
            alt="হোয়াটসঅ্যাপে যোগাযোগ করুন"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-ping" />
        </div>
        <span className="tracking-wider">{displayText}</span>
      </a>
    </div>
  );
}
