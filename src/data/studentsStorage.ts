import fs from "fs/promises";
import path from "path";
import { StudentRecord, INITIAL_STUDENTS } from "@/data/adminStore";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "students.json");

export async function getStudents(): Promise<StudentRecord[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent) as StudentRecord[];
    return Array.isArray(data) ? data : INITIAL_STUDENTS;
  } catch (error) {
    console.error("Error reading students.json, fallback to initial", error);
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
  const updated = [newStudent, ...students];
  await saveStudents(updated);
  return newStudent;
}

export async function updateStudentStatus(
  id: string,
  newStatus: StudentRecord["status"]
): Promise<boolean> {
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
  const students = await getStudents();
  const index = students.findIndex((s) => s.id === updatedStudent.id);
  if (index === -1) return false;
  students[index] = updatedStudent;
  await saveStudents(students);
  return true;
}
