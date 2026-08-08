import { StudentRecord } from "@/data/adminStore";

export async function fetchStudentsAction(): Promise<StudentRecord[]> {
  try {
    const res = await fetch("/api/students", {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch students");
    const data = await res.json();
    return data.students || [];
  } catch (error) {
    console.error("Error in fetchStudentsAction:", error);
    return [];
  }
}

export async function registerStudentAction(params: {
  name: string;
  phone: string;
  email?: string;
  package?: StudentRecord["package"];
  schedule?: string;
  teacherPreference?: StudentRecord["teacherPreference"];
  notes?: string;
}): Promise<StudentRecord | null> {
  try {
    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!res.ok) throw new Error("Failed to register student");
    const data = await res.json();
    return data.student || null;
  } catch (error) {
    console.error("Error in registerStudentAction:", error);
    return null;
  }
}

export async function changeStudentStatusAction(
  id: string,
  status: StudentRecord["status"]
): Promise<boolean> {
  try {
    const res = await fetch(`/api/students/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch (error) {
    console.error("Error in changeStudentStatusAction:", error);
    return false;
  }
}

export async function saveStudentAction(student: StudentRecord): Promise<boolean> {
  try {
    const res = await fetch(`/api/students/${student.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student }),
    });
    return res.ok;
  } catch (error) {
    console.error("Error in saveStudentAction:", error);
    return false;
  }
}
