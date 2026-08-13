import fs from "fs/promises";
import path from "path";
import { TeacherRecord, INITIAL_TEACHERS } from "@/data/adminStore";
import { getSupabaseClient, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export interface ExtendedTeacherRecord extends TeacherRecord {
  experience?: string;
  workType?: "স্বেচ্ছাসেবী" | "স্বল্প সম্মানী";
  notes?: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "teachers.json");

export async function getTeachers(): Promise<ExtendedTeacherRecord[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: dbTeachers, error } = await supabase.from("teachers").select("*").order("created_at", { ascending: false });
        if (!error && dbTeachers && dbTeachers.length > 0) {
          return dbTeachers.map((t) => ({
            id: t.id,
            name: t.name,
            gender: t.gender === "মহিলা" ? "মহিলা" : "পুরুষ",
            phone: t.phone,
            email: t.email || "",
            specialization: t.specialization || "তাজবীদ ও কিরাত স্পেশালিস্ট",
            activeStudents: t.active_students || 0,
            status: t.status || "নতুন আবেদন",
            joinedDate: t.created_at ? t.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
            experience: t.experience || "১-২ বছর",
            workType: t.work_type || "স্বল্প সম্মানী",
            notes: t.notes || "",
          }));
        }
      }
    } catch (e) {
      console.warn("Supabase teachers fetch error, falling back to local file:", e);
    }
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    if (!fileContent || !fileContent.trim()) return INITIAL_TEACHERS;
    const data = JSON.parse(fileContent) as ExtendedTeacherRecord[];
    return Array.isArray(data) ? data : INITIAL_TEACHERS;
  } catch (error) {
    console.warn("Error reading teachers.json, fallback to INITIAL_TEACHERS:", error);
    return INITIAL_TEACHERS;
  }
}

export async function saveTeachers(data: ExtendedTeacherRecord[]): Promise<void> {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function addTeacher(
  data: Partial<ExtendedTeacherRecord> & { name: string; phone: string }
): Promise<ExtendedTeacherRecord> {
  const teachers = await getTeachers();
  const newTeacher: ExtendedTeacherRecord = {
    id: data.id || `TCH-${100 + teachers.length + 1}`,
    name: data.name,
    gender: data.gender === "মহিলা" ? "মহিলা" : "পুরুষ",
    phone: data.phone,
    email: data.email || `${data.phone.replace(/\D/g, "")}@quranijibon.com`,
    specialization: data.specialization || "তাজবীদ ও কুরআন শিক্ষক",
    activeStudents: data.activeStudents || 0,
    status: data.status || "নতুন আবেদন",
    joinedDate: new Date().toISOString().split("T")[0],
    experience: data.experience || "১-২ বছর",
    workType: data.workType || "স্বল্প সম্মানী",
    notes: data.notes || "",
  };

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("teachers").insert([{
          id: newTeacher.id,
          name: newTeacher.name,
          gender: newTeacher.gender,
          phone: newTeacher.phone,
          email: newTeacher.email,
          specialization: newTeacher.specialization,
          experience: newTeacher.experience,
          work_type: newTeacher.workType,
          active_students: newTeacher.activeStudents,
          status: newTeacher.status,
          notes: newTeacher.notes,
          created_at: new Date().toISOString(),
        }]);
      }
    } catch (e) {
      console.warn("Supabase add teacher error:", e);
    }
  }

  const updated = [newTeacher, ...teachers];
  await saveTeachers(updated);
  return newTeacher;
}

export async function updateTeacherStatus(
  id: string,
  newStatus: TeacherRecord["status"]
): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("teachers").update({ status: newStatus }).eq("id", id);
      }
    } catch (e) {
      console.warn("Supabase update teacher status error:", e);
    }
  }

  const teachers = await getTeachers();
  const index = teachers.findIndex((t) => t.id === id);
  if (index === -1) return false;
  teachers[index].status = newStatus;
  await saveTeachers(teachers);
  return true;
}

export async function updateTeacher(
  updatedTeacher: ExtendedTeacherRecord
): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("teachers").update({
          name: updatedTeacher.name,
          gender: updatedTeacher.gender,
          phone: updatedTeacher.phone,
          email: updatedTeacher.email,
          specialization: updatedTeacher.specialization,
          experience: updatedTeacher.experience,
          work_type: updatedTeacher.workType,
          active_students: updatedTeacher.activeStudents,
          status: updatedTeacher.status,
          notes: updatedTeacher.notes || "",
        }).eq("id", updatedTeacher.id);
      }
    } catch (e) {
      console.warn("Supabase update teacher error:", e);
    }
  }

  const teachers = await getTeachers();
  const index = teachers.findIndex((t) => t.id === updatedTeacher.id);
  if (index === -1) return false;
  teachers[index] = updatedTeacher;
  await saveTeachers(teachers);
  return true;
}
