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

-- 3. Students Table (Registrations / Trial Applications)
CREATE TABLE IF NOT EXISTS public.students (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    course TEXT,
    student_type TEXT,
    preferred_time TEXT,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Dynamic Pages Table (CMS Pages)
CREATE TABLE IF NOT EXISTS public.pages (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    hero_image TEXT,
    content TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    link TEXT,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Site Settings Table
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
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for Public Access
CREATE POLICY "Public Read Blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Public Read FAQs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public Read Pages" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);

-- Allow Public Insert for Student Registrations & Notifications
CREATE POLICY "Public Insert Students" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies (Service Role / Auth users)
CREATE POLICY "Admin Full Blogs" ON public.blogs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full FAQs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Students" ON public.students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Pages" ON public.pages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Notifications" ON public.notifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
