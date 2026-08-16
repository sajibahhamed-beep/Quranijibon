export interface StudentRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender?: "পুরুষ" | "মহিলা" | "ছেলে শিশু" | "মেয়ে শিশু" | string;
  package: "বিনামূল্যে" | "সাশ্রয়ী (৳৩২০)" | "কাস্টম প্রিমিয়াম" | string;
  schedule: string;
  teacherPreference: "মহিলা শিক্ষিকা" | "পুরুষ শিক্ষক" | "যে কোনটি" | string;
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
  status: "নতুন আবেদন" | "সক্রিয়" | "অপেক্ষমাণ" | "ছুটিতে";
  joinedDate: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  phone: string;
  amount: number;
  type: "সাদাকা" | "শিক্ষার্থী স্পন্সর" | "স্টুডেন্ট পেমেন্ট" | string;
  date: string;
  sponsoredStudent?: string;
  paymentMethod: string;
  trxId?: string;
  status?: "অনুমোদিত" | "অপেক্ষমাণ" | "বাতিল" | string;
}

export const INITIAL_STUDENTS: StudentRecord[] = [];

export const INITIAL_TEACHERS: TeacherRecord[] = [];

export const INITIAL_DONATIONS: DonationRecord[] = [];
