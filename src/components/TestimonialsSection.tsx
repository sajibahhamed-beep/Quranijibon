"use client";

import { Star, Check, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const stats = [
    { number: "৫,০০০+", label: "সন্তুষ্ট শিক্ষার্থী" },
    { number: "৯৮%", label: "সফলতার হার" },
    { number: "৫০+", label: "অভিজ্ঞ শিক্ষক" },
    { number: "৪.৯ / ৫", label: "গড় রেটিং" },
  ];

  const testimonials = [
    {
      initial: "ফ",
      name: "ফাতেমা বেগম",
      location: "ঢাকা",
      packageTag: "৩ মাস যাবৎ শিখছেন",
      quote:
        "আলহামদুলিল্লাহ! আমি ছোটবেলা থেকে কুরআন শিখতে চেয়েছিলাম কিন্তু সুযোগ হয়নি। এখানে One-to-One ক্লাসের কারণে লজ্জা ছাড়াই প্রশ্ন করতে পারি। আমার শিক্ষিকা অত্যন্ত ধৈর্যশীল ও যত্নশীল।",
      highlight: "লজ্জা ছাড়াই শিখতে পারছি",
      highlighted: false,
    },
    {
      initial: "র",
      name: "মোঃ রাকিবুল হাসান",
      location: "চট্টগ্রাম",
      packageTag: "৬ মাস যাবৎ শিখছেন",
      quote:
        "অফিসের পরে সময় বের করা কঠিন ছিল। এখানে নিজের সময়মতো ক্লাস নিতে পারি। তাজবীদ সহ শুদ্ধভাবে কুরআন পড়তে শিখেছি। পরিবারকেও এখন শুনিয়ে পড়তে পারি।",
      highlight: "নিজের সময়মতো ক্লাস",
      highlighted: false,
    },
    {
      initial: "স",
      name: "সুমাইয়া আক্তার",
      location: "সিলেট",
      packageTag: "আমার মেয়ের জন্য",
      quote:
        "আমার ৮ বছরের মেয়ে এখন নিজে নিজে সুরা পড়তে পারে। শিক্ষিকা খুবই আন্তরিক, বাচ্চাদের সাথে কীভাবে কথা বলতে হয় তা ভালো জানেন। প্রতিটি ক্লাসের পর মেয়ে উৎসাহিত থাকে।",
      highlight: "বাচ্চাদের জন্য আদর্শ",
      highlighted: false,
    },
    {
      initial: "আ",
      name: "আবু বকর সিদ্দিক",
      location: "রাজশাহী",
      packageTag: "প্রিমিয়াম প্যাকেজে আছেন",
      quote:
        "বিনামূল্যে প্যাকেজ নিয়ে শুরু করেছিলাম, এখন প্রিমিয়ামে আছি। কাস্টম সময়সূচির সুবিধা অসাধারণ। প্রতিদিন ফজরের পরে ক্লাস করি — জীবনটাই বদলে গেছে।",
      highlight: "জীবন বদলে দেওয়া অভিজ্ঞতা",
      highlighted: true, // Dark teal card
    },
    {
      initial: "ন",
      name: "নাজমা খানম",
      location: "ময়মনসিংহ",
      packageTag: "৬ বছর ছাত্র শিখছেন",
      quote:
        "শুরুতে ভেবেছিলাম অনলাইনে ঠিকমতো শেখা হবে না। কিন্তু সম্পূর্ণ ভুল ছিলাম। সরাসরি শিক্ষকের কাছে শেখার চেয়ে কোনো অংশে কম না। এখন পুরো সুরা মূলক মুখস্থ হয়ে গেছে।",
      highlight: "৬ বছর সুরা মূলক মুখস্থ",
      highlighted: false,
    },
    {
      initial: "শ",
      name: "মোঃ শাহরিয়ার কবির",
      location: "খুলনা",
      packageTag: "সাশ্রয়ী প্যাকেজে আছেন",
      quote:
        "মূল্যের দিক থেকে অত্যন্ত সাশ্রয়ী অথচ মানের কোনো আপোষ নেই। আমার ওস্তাদ আমার ভুলগুলো ধরিয়ে দেন এবং সংশোধন করতে সাহায্য করেন। আন্তরিকভাবে সুপারিশ করছি।",
      highlight: "সাশ্রয়ী মূল্যে সর্বোচ্চ মান",
      highlighted: false,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-[#FAFBFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-emerald-700 font-bold text-xs sm:text-sm tracking-wide uppercase bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 inline-block">
            শিক্ষার্থীদের অভিজ্ঞতা
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black text-slate-900 tracking-tight">
            তারা বললেন যা আমরা বলতে পারি না
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            হাজারো শিক্ষার্থী আমাদের সাথে কুরআন শিক্ষার সফর শুরু করেছেন। তাদের কথা শুনুন।
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16 py-6 border-y border-slate-200/80">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center space-y-1 ${
                i !== stats.length - 1 ? "md:border-r border-slate-200/80" : ""
              }`}
            >
              <div className="text-3xl sm:text-4xl font-black text-[#00796B]">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 6 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative shadow-sm hover:shadow-xl ${
                t.highlighted
                  ? "bg-[#00695C] text-white shadow-xl scale-102 border border-[#004D40]"
                  : "bg-white text-slate-800 border border-slate-200 hover:border-emerald-300"
              }`}
            >
              <div>
                {/* User Header Info & Rating */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-full font-bold text-lg flex items-center justify-center flex-shrink-0 ${
                        t.highlighted
                          ? "bg-white/20 text-white border border-white/30"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <h3
                        className={`font-black text-lg leading-tight ${
                          t.highlighted ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {t.name}
                      </h3>
                      <p
                        className={`text-xs ${
                          t.highlighted ? "text-emerald-100" : "text-slate-500"
                        }`}
                      >
                        {t.location}
                      </p>
                    </div>
                  </div>

                  {/* 5 Stars Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-4 h-4 fill-amber-400 text-amber-400`}
                      />
                    ))}
                  </div>
                </div>

                {/* Package Pill Tag */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      t.highlighted
                        ? "bg-white/20 text-emerald-50 border border-white/20"
                        : "bg-emerald-50 text-emerald-800 border border-emerald-200/80"
                    }`}
                  >
                    {t.packageTag}
                  </span>
                </div>

                {/* Quote Content */}
                <p
                  className={`text-sm leading-relaxed mb-6 font-medium ${
                    t.highlighted ? "text-emerald-50" : "text-slate-600"
                  }`}
                >
                  "{t.quote}"
                </p>
              </div>

              {/* Bottom Highlighted Point */}
              <div
                className={`pt-4 border-t text-xs font-bold flex items-center space-x-2 ${
                  t.highlighted
                    ? "border-emerald-500/50 text-emerald-100"
                    : "border-slate-100 text-emerald-700"
                }`}
              >
                <Check
                  className={`w-4 h-4 flex-shrink-0 ${
                    t.highlighted ? "text-emerald-200" : "text-emerald-600"
                  }`}
                />
                <span>{t.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Average Rating Banner */}
        <div className="mt-16 text-center flex items-center justify-center space-x-2 text-sm font-bold text-slate-700">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>৫,০০০+ শিক্ষার্থীর গড় রেটিং <strong className="text-slate-900 font-extrabold">৪.৯/৫</strong></span>
        </div>
      </div>
    </section>
  );
}
