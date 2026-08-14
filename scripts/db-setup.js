const path = require("path");
const fs = require("fs");
const { Client } = require("pg");
const { createClient } = require("@supabase/supabase-js");

// Load .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...vals] = trimmed.split("=");
      process.env[key.trim()] = vals.join("=").trim().replace(/^["']|["']$/g, "");
    }
  });
}

const directUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function setupDatabase() {
  console.log("==========================================");
  console.log("🚀 Quranijibon Database Setup & Migration");
  console.log("==========================================\n");

  // Step 1: Execute Schema SQL on PostgreSQL
  if (directUrl) {
    console.log("📡 Connecting to PostgreSQL via Direct/Pooler URL...");
    const client = new Client({
      connectionString: directUrl,
      ssl: { rejectUnauthorized: false },
    });

    try {
      await client.connect();
      console.log("✅ Connected to Postgres database!");

      const schemaSqlPath = path.join(process.cwd(), "supabase", "schema.sql");
      const sql = fs.readFileSync(schemaSqlPath, "utf8");

      console.log("📝 Running schema.sql migrations...");
      await client.query(sql);
      console.log("✅ Schema migration executed successfully!");
    } catch (err) {
      console.error("❌ Postgres SQL execution error:", err.message);
    } finally {
      await client.end();
    }
  } else {
    console.warn("⚠️ DIRECT_URL or DATABASE_URL not found in .env.local, skipping raw SQL migration.");
  }

  // Step 2: Seed Data using Supabase Client
  console.log("\n📦 Starting Data Seeding to Supabase...");
  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Supabase URL or Key missing!");
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const dataDir = path.join(process.cwd(), "src", "data");

  // 1. Seed Blogs
  try {
    const blogsPath = path.join(dataDir, "blogs.json");
    if (fs.existsSync(blogsPath)) {
      const blogsData = JSON.parse(fs.readFileSync(blogsPath, "utf8"));
      const posts = blogsData.posts || [];
      console.log(`- Seeding ${posts.length} blog posts...`);
      const dbPosts = posts.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        date: p.date,
        read_time: p.readTime,
        author: p.author,
        author_avatar: p.authorAvatar,
        author_role: p.authorRole,
        author_bio: p.authorBio,
        excerpt: p.excerpt,
        img: p.img,
        featured: p.featured || false,
        tags: p.tags || [],
        toc: p.toc || [],
        content: p.content || {},
      }));
      const { error } = await supabase.from("blogs").upsert(dbPosts, { onConflict: "id" });
      if (error) console.error("  ❌ Blogs Error:", error.message);
      else console.log("  ✅ Blogs seeded!");
    }
  } catch (err) {
    console.error("  ❌ Blogs exception:", err.message);
  }

  // 2. Seed FAQs
  try {
    const faqsPath = path.join(dataDir, "faqs.json");
    if (fs.existsSync(faqsPath)) {
      const faqsData = JSON.parse(fs.readFileSync(faqsPath, "utf8"));
      console.log(`- Seeding ${faqsData.length} FAQs...`);
      const dbFaqs = faqsData.map((f, i) => ({
        id: f.id || `faq-${i + 1}`,
        question: f.question,
        answer: f.answer,
        is_active: f.isActive !== false,
        sort_order: f.order !== undefined ? f.order : i + 1,
      }));
      const { error } = await supabase.from("faqs").upsert(dbFaqs, { onConflict: "id" });
      if (error) console.error("  ❌ FAQs Error:", error.message);
      else console.log("  ✅ FAQs seeded!");
    }
  } catch (err) {
    console.error("  ❌ FAQs exception:", err.message);
  }

  // 3. Seed Students
  try {
    const studentsPath = path.join(dataDir, "students.json");
    if (fs.existsSync(studentsPath)) {
      const studentsData = JSON.parse(fs.readFileSync(studentsPath, "utf8"));
      console.log(`- Seeding ${studentsData.length} students...`);
      const dbStudents = studentsData.map((s) => {
        let createdAt = new Date().toISOString();
        if (s.date && /^\d{4}-\d{2}-\d{2}$/.test(s.date)) {
          createdAt = `${s.date}T00:00:00.000Z`;
        }
        return {
          id: s.id,
          name: s.name,
          phone: s.phone,
          email: s.email || "",
          course: s.package || s.course || "",
          student_type: s.teacherPreference || s.student_type || "",
          preferred_time: s.schedule || s.preferred_time || "",
          notes: s.notes || "",
          status: s.status || "pending",
          created_at: createdAt,
        };
      });
      const { error } = await supabase.from("students").upsert(dbStudents, { onConflict: "id" });
      if (error) console.error("  ❌ Students Error:", error.message);
      else console.log("  ✅ Students seeded!");
    }
  } catch (err) {
    console.error("  ❌ Students exception:", err.message);
  }

  // 4. Seed Teachers
  try {
    const teachersPath = path.join(dataDir, "teachers.json");
    if (fs.existsSync(teachersPath)) {
      const teachersData = JSON.parse(fs.readFileSync(teachersPath, "utf8"));
      console.log(`- Seeding ${teachersData.length} teachers...`);
      const dbTeachers = teachersData.map((t) => ({
        id: t.id,
        name: t.name,
        gender: t.gender || "পুরুষ",
        phone: t.phone,
        email: t.email || "",
        specialization: t.specialization || "তাজবীদ ও কিরাত",
        experience: t.experience || "১-২ বছর",
        work_type: t.workType || "স্বল্প সম্মানী",
        active_students: t.activeStudents || 0,
        status: t.status || "সক্রিয়",
        notes: t.notes || "",
        created_at: new Date().toISOString(),
      }));
      const { error } = await supabase.from("teachers").upsert(dbTeachers, { onConflict: "id" });
      if (error) console.error("  ❌ Teachers Error:", error.message);
      else console.log("  ✅ Teachers seeded!");
    }
  } catch (err) {
    console.error("  ❌ Teachers exception:", err.message);
  }

  // 5. Seed Pages
  try {
    const pagesPath = path.join(dataDir, "pages.json");
    if (fs.existsSync(pagesPath)) {
      const pagesData = JSON.parse(fs.readFileSync(pagesPath, "utf8"));
      console.log(`- Seeding ${pagesData.length} dynamic pages...`);
      const dbPages = pagesData.map((pg) => ({
        id: pg.id,
        slug: pg.slug,
        title: pg.title,
        excerpt: pg.description || pg.excerpt || "",
        hero_image: pg.hero_image || "",
        content: JSON.stringify(pg),
        updated_at: new Date().toISOString(),
      }));
      const { error } = await supabase.from("pages").upsert(dbPages, { onConflict: "id" });
      if (error) console.error("  ❌ Pages Error:", error.message);
      else console.log("  ✅ Pages seeded!");
    }
  } catch (err) {
    console.error("  ❌ Pages exception:", err.message);
  }

  // 6. Seed Notifications
  try {
    const notifsPath = path.join(dataDir, "notifications.json");
    if (fs.existsSync(notifsPath)) {
      const notifsData = JSON.parse(fs.readFileSync(notifsPath, "utf8"));
      console.log(`- Seeding ${notifsData.length} notifications...`);
      const dbNotifs = notifsData.map((n) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        category: n.category || "general",
        link: n.link || "",
        read: n.read || false,
        created_at: new Date().toISOString(),
      }));
      const { error } = await supabase.from("notifications").upsert(dbNotifs, { onConflict: "id" });
      if (error) console.error("  ❌ Notifications Error:", error.message);
      else console.log("  ✅ Notifications seeded!");
    }
  } catch (err) {
    console.error("  ❌ Notifications exception:", err.message);
  }

  // 7. Seed Site Settings
  try {
    const settingsPath = path.join(dataDir, "siteSettings.json");
    if (fs.existsSync(settingsPath)) {
      const settingsData = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
      console.log(`- Seeding Site Settings...`);
      const { error } = await supabase.from("site_settings").upsert(
        [{ id: 1, settings: settingsData, updated_at: new Date().toISOString() }],
        { onConflict: "id" }
      );
      if (error) console.error("  ❌ Site Settings Error:", error.message);
      else console.log("  ✅ Site Settings seeded!");
    }
  } catch (err) {
    console.error("  ❌ Site Settings exception:", err.message);
  }

  // Step 3: Verification
  console.log("\n🔍 Verifying all tables in Supabase...");
  const tables = ["blogs", "faqs", "students", "teachers", "pages", "notifications", "site_settings"];
  for (const t of tables) {
    const { count, error } = await supabase.from(t).select("*", { count: "exact", head: true });
    if (error) {
      console.log(`  ❌ [${t}]: ${error.message}`);
    } else {
      console.log(`  ✅ [${t}]: ${count} records ready in DB`);
    }
  }

  console.log("\n🎉 Database setup & sync complete!");
}

setupDatabase().catch(console.error);
