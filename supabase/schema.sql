-- Quranijibon Supabase PostgreSQL Database Migration Schema

-- 1. Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    read_time TEXT,
    author TEXT NOT NULL,
    author_avatar TEXT,
    author_role TEXT,
    author_bio TEXT,
    excerpt TEXT,
    img TEXT,
    featured BOOLEAN DEFAULT false,
    tags JSONB DEFAULT '[]'::jsonb,
    toc JSONB DEFAULT '[]'::jsonb,
    content JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Students Table (Registrations / Admissions)
CREATE TABLE IF NOT EXISTS public.students (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    gender TEXT DEFAULT 'পুরুষ',
    phone TEXT NOT NULL,
    email TEXT,
    course TEXT,
    student_type TEXT,
    preferred_time TEXT,
    notes TEXT,
    status TEXT DEFAULT 'নতুন আবেদন',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Teachers Table (Applications & Instructor Directory)
CREATE TABLE IF NOT EXISTS public.teachers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    gender TEXT DEFAULT 'পুরুষ',
    phone TEXT NOT NULL,
    email TEXT,
    specialization TEXT,
    experience TEXT,
    work_type TEXT,
    active_students INT DEFAULT 0,
    status TEXT DEFAULT 'নতুন আবেদন',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Donations & Student Hadia Table
CREATE TABLE IF NOT EXISTS public.donations (
    id TEXT PRIMARY KEY,
    donor_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    type TEXT DEFAULT 'অনুদান প্রদান',
    sponsored_student TEXT,
    payment_method TEXT DEFAULT 'bKash',
    trx_id TEXT,
    status TEXT DEFAULT 'অপেক্ষমাণ',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Contact Messages & Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'নতুন',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Dynamic Pages Table (CMS Pages)
CREATE TABLE IF NOT EXISTS public.pages (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    hero_image TEXT,
    content TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    link TEXT,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INT PRIMARY KEY DEFAULT 1,
    settings JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Indexes for Faster Searching & Sorting
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON public.blogs(featured);
CREATE INDEX IF NOT EXISTS idx_faqs_active_order ON public.faqs(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_students_status ON public.students(status);
CREATE INDEX IF NOT EXISTS idx_teachers_status ON public.teachers(status);
CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations(status);
CREATE INDEX IF NOT EXISTS idx_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow full CRUD for anon and authenticated users across all tables
CREATE POLICY "Allow Full Access Blogs" ON public.blogs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow Full Access FAQs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow Full Access Students" ON public.students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow Full Access Teachers" ON public.teachers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow Full Access Donations" ON public.donations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow Full Access Messages" ON public.contact_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow Full Access Pages" ON public.pages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow Full Access Notifications" ON public.notifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow Full Access Settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
