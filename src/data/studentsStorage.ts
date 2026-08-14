import fs from "fs/promises";
import path from "path";
import { StudentRecord, INITIAL_STUDENTS } from "@/data/adminStore";
import { getSupabaseClient, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "students.json");

export async function getStudents(): Promise<StudentRecord[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: dbStudents, error } = await supabase
          .from("students")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(dbStudents)) {
          return dbStudents.map((s) => ({
            id: s.id,
            name: s.name,
            phone: s.phone,
            email: s.email || "",
            gender: s.gender || (s.student_type?.includes("মহিলা") || s.student_type?.includes("মেয়ে") ? "মহিলা" : "পুরুষ"),
            package: s.course || "সাধারন কোর্স",
            schedule: s.preferred_time || "সুবিধাজনক সময়",
            teacherPreference: s.student_type || "যে কোনটি",
            assignedTeacher: "নির্ধারিত নয়",
            status: s.status || "নতুন আবেদন",
            date: s.created_at ? s.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
            notes: s.notes || "",
          }));
        }
        if (error) {
          console.warn("Supabase students fetch error:", error.message);
        }
      }
    } catch (e) {
      console.warn("Supabase students fetch exception:", e);
    }
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    if (!fileContent || !fileContent.trim()) return INITIAL_STUDENTS;
    const data = JSON.parse(fileContent) as StudentRecord[];
    return Array.isArray(data) ? data : INITIAL_STUDENTS;
  } catch (error) {
    return INITIAL_STUDENTS;
  }
}

export async function saveStudents(data: StudentRecord[]): Promise<void> {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {}
}

export async function addStudent(
  data: Omit<StudentRecord, "id" | "date"> & { date?: string; id?: string; gender?: string }
): Promise<StudentRecord> {
  const safePhone = String(data.phone || "").trim();
  const safeEmail = data.email && String(data.email).trim()
    ? String(data.email).trim()
    : `${safePhone.replace(/\D/g, "") || "student"}@quranijibon.com`;

  const newStudent: StudentRecord = {
    id: data.id || `STU-${Date.now()}`,
    name: String(data.name || "").trim(),
    phone: safePhone,
    email: safeEmail,
    gender: data.gender || "পুরুষ",
    package: data.package || "বিনামূল্যে",
    schedule: data.schedule || "সুবিধাজনক সময়ে",
    teacherPreference: data.teacherPreference || (data.gender === "মহিলা" || data.gender === "মেয়ে শিশু" ? "মহিলা শিক্ষিকা" : "পুরুষ শিক্ষক"),
    assignedTeacher: data.assignedTeacher || "নির্ধারিত নয়",
    status: data.status || "নতুন আবেদন",
    date: data.date || new Date().toISOString().split("T")[0],
    notes: data.notes || "",
  };

  // 1. Persist to local JSON storage
  try {
    const students = await getStudents();
    const existingIndex = students.findIndex((s) => s.id === newStudent.id);
    if (existingIndex >= 0) {
      students[existingIndex] = newStudent;
    } else {
      students.unshift(newStudent);
    }
    await saveStudents(students);
  } catch (err) {
    console.warn("Failed to persist student to local file:", err);
  }

  // 2. Sync to Supabase if configured
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("students").insert([
          {
            id: newStudent.id,
            name: newStudent.name,
            phone: newStudent.phone,
            email: newStudent.email,
            course: newStudent.package,
            student_type: `${newStudent.gender || ""}${newStudent.teacherPreference ? ` (${newStudent.teacherPreference})` : ""}`,
            preferred_time: newStudent.schedule,
            notes: newStudent.notes || "",
            status: newStudent.status,
            created_at: new Date().toISOString(),
          },
        ]);
        if (error) {
          console.error("Supabase insert student error:", error.message);
        }
      }
    } catch (e) {
      console.warn("Supabase add student error:", e);
    }
  }

  return newStudent;
}

export async function updateStudentStatus(
  id: string,
  newStatus: StudentRecord["status"]
): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("students").update({ status: newStatus }).eq("id", id);
        if (!error) return true;
        console.error("Supabase update student status error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase update student status error:", e);
    }
  }

  const students = await getStudents();
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return false;
  students[index].status = newStatus;
  await saveStudents(students);
  return true;
}

export async function updateStudent(
  updatedStudent: StudentRecord
): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase
          .from("students")
          .update({
            name: updatedStudent.name,
            phone: updatedStudent.phone,
            email: updatedStudent.email,
            course: updatedStudent.package,
            student_type: updatedStudent.teacherPreference,
            preferred_time: updatedStudent.schedule,
            notes: updatedStudent.notes || "",
            status: updatedStudent.status,
          })
          .eq("id", updatedStudent.id);
        if (!error) return true;
        console.error("Supabase update student error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase update student error:", e);
    }
  }

  const students = await getStudents();
  const index = students.findIndex((s) => s.id === updatedStudent.id);
  if (index === -1) return false;
  students[index] = updatedStudent;
  await saveStudents(students);
  return true;
}

export async function deleteStudent(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("students").delete().eq("id", id);
        if (!error) return true;
      }
    } catch (e) {
      console.warn("Supabase delete student error:", e);
    }
  }

  const students = await getStudents();
  const filtered = students.filter((s) => s.id !== id);
  await saveStudents(filtered);
  return true;
}
