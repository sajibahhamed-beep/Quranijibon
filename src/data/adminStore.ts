export interface StudentRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  package: "বিনামূল্যে" | "সাশ্রয়ী (৳৩২০)" | "কাস্টম প্রিমিয়াম";
  schedule: string;
  teacherPreference: "মহিলা শিক্ষিকা" | "পুরুষ শিক্ষক" | "যে কোনটি";
  assignedTeacher?: string;
  status: "নতুন আবেদন" | "সক্রিয়" | "অপেক্ষমাণ" | "সম্পন্ন";
  date: string;
  notes?: string;
}

export interface TeacherRecord {
  id: string;
  name: string;
  gender: "মহিলা" | "পুরুষ";
  phone: string;
  email: string;
  specialization: string;
  activeStudents: number;
  status: "সক্রিয়" | "ছুটিতে";
  joinedDate: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  phone: string;
  amount: number;
  type: "সাদাকা" | "শিক্ষার্থী স্পন্সর" | "সাধারণ অনুদান";
  date: string;
  sponsoredStudent?: string;
  paymentMethod: "bKash" | "Nagad" | "Bank Transfer";
}

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: "STU-101",
    name: "মেহেদী হাসান",
    phone: "+880 1712-345678",
    email: "mehedi@example.com",
    package: "সাশ্রয়ী (৳৩২০)",
    schedule: "সপ্তাহে ৩ দিন (রাত ৮:০০)",
    teacherPreference: "পুরুষ শিক্ষক",
    assignedTeacher: "উস্তাদ রফিকুল ইসলাম",
    status: "সক্রিয়",
    date: "২০২৫-০৭-২৮",
  },
  {
    id: "STU-102",
    name: "ফাতেমা আক্তার",
    phone: "+880 1823-456789",
    email: "fatema@example.com",
    package: "কাস্টম প্রিমিয়াম",
    schedule: "সপ্তাহে ৫ দিন (সকাল ১০:০০)",
    teacherPreference: "মহিলা শিক্ষিকা",
    assignedTeacher: "নুসরাত জাহান",
    status: "সক্রিয়",
    date: "২০২৫-০৭-২৯",
  },
  {
    id: "STU-103",
    name: "আরিফুল ইসলাম",
    phone: "+880 1934-567890",
    email: "arif@example.com",
    package: "বিনামূল্যে",
    schedule: "সপ্তাহে ২ দিন (বিকাল ৪:০০)",
    teacherPreference: "পুরুষ শিক্ষক",
    assignedTeacher: "হাফেজ আব্দুল্লাহ",
    status: "নতুন আবেদন",
    date: "২০২৫-০৮-০১",
  },
  {
    id: "STU-104",
    name: "নুসরাত তাবাসসুম",
    phone: "+880 1645-678901",
    email: "tabassum@example.com",
    package: "সাশ্রয়ী (৳৩২০)",
    schedule: "সপ্তাহে ৩ দিন (সন্ধ্যা ৭:০০)",
    teacherPreference: "মহিলা শিক্ষিকা",
    assignedTeacher: "নুসরাত জাহান",
    status: "অপেক্ষমাণ",
    date: "২০২৫-০৮-০২",
  },
  {
    id: "STU-105",
    name: "কামরুল হাসান",
    phone: "+880 1756-789012",
    email: "kamrul@example.com",
    package: "কাস্টম প্রিমিয়াম",
    schedule: "সপ্তাহে ৬ দিন (রাত ৯:০০)",
    teacherPreference: "পুরুষ শিক্ষক",
    assignedTeacher: "উস্তাদ রফিকুল ইসলাম",
    status: "সক্রিয়",
    date: "২০২৫-০৮-০৩",
  },
];

export const INITIAL_TEACHERS: TeacherRecord[] = [
  {
    id: "TCH-01",
    name: "উস্তাদ রফিকুল ইসলাম",
    gender: "পুরুষ",
    phone: "+880 1700-112233",
    email: "rafiqul@quranijibon.com",
    specialization: "তাজবীদ ও মাখরাজ specialist",
    activeStudents: 24,
    status: "সক্রিয়",
    joinedDate: "২০২৪-০১-১৫",
  },
  {
    id: "TCH-02",
    name: "হাফেজ আব্দুল্লাহ",
    gender: "পুরুষ",
    phone: "+880 1800-223344",
    email: "abdullah@quranijibon.com",
    specialization: "হিফজ মেন্টরিং ও রিভিশন",
    activeStudents: 18,
    status: "সক্রিয়",
    joinedDate: "২০২৪-০৩-১০",
  },
  {
    id: "TCH-03",
    name: "নুসরাত জাহান",
    gender: "মহিলা",
    phone: "+880 1900-334455",
    email: "nusrat@quranijibon.com",
    specialization: "মহিলা শাখা তাজবীদ ও কিরাত",
    activeStudents: 32,
    status: "সক্রিয়",
    joinedDate: "২০২৪-০২-২০",
  },
  {
    id: "TCH-04",
    name: "মারিয়া সুলতানা",
    gender: "মহিলা",
    phone: "+880 1600-445566",
    email: "mariya@quranijibon.com",
    specialization: "শিশু ও নতুনদের হিফজ শিক্ষা",
    activeStudents: 15,
    status: "সক্রিয়",
    joinedDate: "২০২৪-০৫-১২",
  },
];

export const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: "DON-501",
    donorName: "আলহাজ্ব শফিকুল ইসলাম",
    phone: "+880 1711-998877",
    amount: 5000,
    type: "শিক্ষার্থী স্পন্সর",
    date: "২০২৫-০৮-০১",
    sponsoredStudent: "আরিফুল ইসলাম",
    paymentMethod: "bKash",
  },
  {
    id: "DON-502",
    donorName: "রহিম উদ্দিন",
    phone: "+880 1812-887766",
    amount: 2000,
    type: "সাদাকা",
    date: "২০২৫-০৮-০২",
    paymentMethod: "Nagad",
  },
  {
    id: "DON-503",
    donorName: "তাহমিনা বেগম",
    phone: "+880 1913-776655",
    amount: 3200,
    type: "শিক্ষার্থী স্পন্সর",
    date: "২০২৫-০৮-০৪",
    sponsoredStudent: "নুসরাত তাবাসসুম",
    paymentMethod: "Bank Transfer",
  },
];
