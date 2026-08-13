const path = require("path");
const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");

// Load .env.local if present
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...vals] = trimmed.split("=");
      process.env[key.trim()] = vals.join("=").trim();
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or ANON_KEY) must be defined in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("🚀 Starting Supabase Data Seeding for Quranijibon...\n");

  const dataDir = path.join(process.cwd(), "src", "data");

  // 1. Seed Blogs
  try {
    const blogsData = JSON.parse(fs.readFileSync(path.join(dataDir, "blogs.json"), "utf8"));
    const posts = blogsData.posts || [];
    console.log(`📦 Seeding ${posts.length} blog posts...`);
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
    if (error) console.error("❌ Blogs Seed Error:", error.message);
    else console.log("✅ Blogs Seeded Successfully!");
  } catch (err) {
    console.error("❌ Blogs Read Error:", err.message);
  }

  // 2. Seed FAQs
  try {
    const faqsData = JSON.parse(fs.readFileSync(path.join(dataDir, "faqs.json"), "utf8"));
    console.log(`\n📦 Seeding ${faqsData.length} FAQs...`);
    const dbFaqs = faqsData.map((f, i) => ({
      id: f.id || `faq-${i + 1}`,
      question: f.question,
      answer: f.answer,
      is_active: f.isActive !== false,
      sort_order: f.order !== undefined ? f.order : i + 1,
    }));
    const { error } = await supabase.from("faqs").upsert(dbFaqs, { onConflict: "id" });
    if (error) console.error("❌ FAQs Seed Error:", error.message);
    else console.log("✅ FAQs Seeded Successfully!");
  } catch (err) {
    console.error("❌ FAQs Read Error:", err.message);
  }

  // 3. Seed Students
  try {
    const studentsData = JSON.parse(fs.readFileSync(path.join(dataDir, "students.json"), "utf8"));
    console.log(`\n📦 Seeding ${studentsData.length} student records...`);
    const dbStudents = studentsData.map((s) => ({
      id: s.id,
      name: s.name,
      phone: s.phone,
      email: s.email || "",
      course: s.course || "",
      student_type: s.studentType || "",
      preferred_time: s.preferredTime || "",
      notes: s.notes || "",
      status: s.status || "pending",
      created_at: s.createdAt || new Date().toISOString(),
    }));
    const { error } = await supabase.from("students").upsert(dbStudents, { onConflict: "id" });
    if (error) console.error("❌ Students Seed Error:", error.message);
    else console.log("✅ Students Seeded Successfully!");
  } catch (err) {
    console.error("❌ Students Read Error:", err.message);
  }

  // 4. Seed Pages
  try {
    const pagesData = JSON.parse(fs.readFileSync(path.join(dataDir, "pages.json"), "utf8"));
    console.log(`\n📦 Seeding ${pagesData.length} dynamic pages...`);
    const dbPages = pagesData.map((pg) => ({
      id: pg.id,
      slug: pg.slug,
      title: pg.title,
      excerpt: pg.excerpt || "",
      hero_image: pg.heroImage || "",
      content: typeof pg.content === "string" ? pg.content : JSON.stringify(pg.content),
      updated_at: pg.updatedAt || new Date().toISOString(),
    }));
    const { error } = await supabase.from("pages").upsert(dbPages, { onConflict: "id" });
    if (error) console.error("❌ Pages Seed Error:", error.message);
    else console.log("✅ Pages Seeded Successfully!");
  } catch (err) {
    console.error("❌ Pages Read Error:", err.message);
  }

  // 5. Seed Notifications
  try {
    const notifsData = JSON.parse(fs.readFileSync(path.join(dataDir, "notifications.json"), "utf8"));
    console.log(`\n📦 Seeding ${notifsData.length} notifications...`);
    const dbNotifs = notifsData.map((n) => ({
      id: n.id,
      title: n.title,
      message: n.message,
      category: n.category || "general",
      link: n.link || "",
      read: n.read || false,
      created_at: n.createdAt || new Date().toISOString(),
    }));
    const { error } = await supabase.from("notifications").upsert(dbNotifs, { onConflict: "id" });
    if (error) console.error("❌ Notifications Seed Error:", error.message);
    else console.log("✅ Notifications Seeded Successfully!");
  } catch (err) {
    console.error("❌ Notifications Read Error:", err.message);
  }

  // 6. Seed Site Settings
  try {
    const settingsData = JSON.parse(fs.readFileSync(path.join(dataDir, "siteSettings.json"), "utf8"));
    console.log(`\n📦 Seeding Site Settings...`);
    const { error } = await supabase.from("site_settings").upsert(
      [{ id: 1, settings: settingsData, updated_at: new Date().toISOString() }],
      { onConflict: "id" }
    );
    if (error) console.error("❌ Site Settings Seed Error:", error.message);
    else console.log("✅ Site Settings Seeded Successfully!");
  } catch (err) {
    console.error("❌ Site Settings Read Error:", err.message);
  }

  console.log("\n🎉 All Data Seeding Operations Complete!");
}

seed().catch(console.error);
