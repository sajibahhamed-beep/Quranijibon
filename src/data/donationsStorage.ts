import fs from "fs/promises";
import path from "path";
import { DonationRecord, INITIAL_DONATIONS } from "@/data/adminStore";
import { getSupabaseClient, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "donations.json");

export async function getDonations(): Promise<DonationRecord[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: dbDonations, error } = await supabase
          .from("donations")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(dbDonations)) {
          return dbDonations.map((d) => ({
            id: d.id,
            donorName: d.donor_name || d.name || "অজ্ঞাত অনুদানকারী",
            phone: d.phone || "",
            amount: Number(d.amount) || 0,
            type: d.type || "সাদাকা",
            date: d.created_at ? d.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
            sponsoredStudent: d.sponsored_student || undefined,
            paymentMethod: d.payment_method || "bKash",
            trxId: d.trx_id || "",
            status: d.status || "অপেক্ষমাণ",
          }));
        }
      }
    } catch (e) {
      console.warn("Supabase donations fetch exception:", e);
    }
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    if (!fileContent || !fileContent.trim()) return INITIAL_DONATIONS;
    const data = JSON.parse(fileContent) as DonationRecord[];
    return Array.isArray(data) ? data : INITIAL_DONATIONS;
  } catch (error) {
    return INITIAL_DONATIONS;
  }
}

export async function saveDonations(data: DonationRecord[]): Promise<void> {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {}
}

export async function addDonation(
  donationData: Omit<DonationRecord, "id" | "date">
): Promise<DonationRecord> {
  const currentDonations = await getDonations();
  const dateStr = new Date().toISOString().split("T")[0];
  const newId = `DON-${500 + currentDonations.length + 1}`;

  const newDonation: DonationRecord = {
    id: newId,
    donorName: donationData.donorName,
    phone: donationData.phone,
    amount: donationData.amount,
    type: donationData.type || "সাদাকা",
    sponsoredStudent: donationData.sponsoredStudent,
    paymentMethod: donationData.paymentMethod || "bKash",
    trxId: donationData.trxId || "",
    status: donationData.status || "অপেক্ষমাণ",
    date: dateStr,
  };

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("donations").insert([
          {
            id: newId,
            donor_name: newDonation.donorName,
            phone: newDonation.phone,
            amount: newDonation.amount,
            type: newDonation.type,
            sponsored_student: newDonation.sponsoredStudent || null,
            payment_method: newDonation.paymentMethod,
            trx_id: newDonation.trxId || null,
            status: newDonation.status,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (e) {
      console.warn("Supabase donation insert exception:", e);
    }
  }

  const updated = [newDonation, ...currentDonations];
  await saveDonations(updated);
  return newDonation;
}

export async function updateDonationStatus(id: string, newStatus: string): Promise<boolean> {
  const current = await getDonations();
  const updated = current.map((d) => (d.id === id ? { ...d, status: newStatus } : d));
  await saveDonations(updated);

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("donations").update({ status: newStatus }).eq("id", id);
      }
    } catch (e) {
      console.warn("Supabase update donation error:", e);
    }
  }

  return true;
}

export async function deleteDonation(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("donations").delete().eq("id", id);
      }
    } catch (e) {
      console.warn("Supabase delete donation error:", e);
    }
  }

  const current = await getDonations();
  const filtered = current.filter((d) => d.id !== id);
  await saveDonations(filtered);
  return true;
}
