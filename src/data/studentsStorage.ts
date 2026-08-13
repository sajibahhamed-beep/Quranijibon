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
        const { data: dbStudents, error } = await supabase.from("students").select("*").order("created_at", { ascending: false });
        if (!error && dbStudents && dbStudents.length > 0) {
          return dbStudents.map((s) => ({
            id: s.id,
            name: s.name,
            phone: s.phone,
            email: s.email || "",
            package: s.course || "সাধারন কোর্স",
            schedule: s.preferred_time || "সুবিধাজনক সময়",
            teacherPreference: s.student_type || "যে কোনটি",
            assignedTeacher: "নির্ধারিত নয়",
            status: s.status || "নতুন আবেদন",
            date: s.created_at ? s.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
            notes: s.notes || "",
          }));
        }
      }
    } catch (e) {
      console.warn("Supabase students fetch error, falling back to local file:", e);
    }
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    if (!fileContent || !fileContent.trim()) return INITIAL_STUDENTS;
    const data = JSON.parse(fileContent) as StudentRecord[];
    return Array.isArray(data) ? data : INITIAL_STUDENTS;
  } catch (error) {
    console.warn("Error reading students.json, fallback to INITIAL_STUDENTS:", error);
    return INITIAL_STUDENTS;
  }
}

export async function saveStudents(data: StudentRecord[]): Promise<void> {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function addStudent(
  data: Omit<StudentRecord, "id" | "date"> & { date?: string; id?: string }
): Promise<StudentRecord> {
  const students = await getStudents();
  const newStudent: StudentRecord = {
    id: data.id || `STU-${100 + students.length + 1}`,
    name: data.name,
    phone: data.phone,
    email: data.email || `${data.phone.replace(/\D/g, "")}@example.com`,
    package: data.package,
    schedule: data.schedule,
    teacherPreference: data.teacherPreference || "যে কোনটি",
    assignedTeacher: data.assignedTeacher || "নির্ধারিত নয়",
    status: data.status || "নতুন আবেদন",
    date: data.date || new Date().toISOString().split("T")[0],
    notes: data.notes,
  };

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("students").insert([{
          id: newStudent.id,
          name: newStudent.name,
          phone: newStudent.phone,
          email: newStudent.email,
          course: newStudent.package,
          student_type: newStudent.teacherPreference,
          preferred_time: newStudent.schedule,
          notes: newStudent.notes || "",
          status: newStudent.status,
          created_at: new Date().toISOString(),
        }]);
      }
    } catch (e) {
      console.warn("Supabase add student error:", e);
    }
  }

  const updated = [newStudent, ...students];
  await saveStudents(updated);
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
        await supabase.from("students").update({ status: newStatus }).eq("id", id);
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
        await supabase.from("students").update({
          name: updatedStudent.name,
          phone: updatedStudent.phone,
          email: updatedStudent.email,
          course: updatedStudent.package,
          student_type: updatedStudent.teacherPreference,
          preferred_time: updatedStudent.schedule,
          notes: updatedStudent.notes || "",
          status: updatedStudent.status,
        }).eq("id", updatedStudent.id);
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
