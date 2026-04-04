-- Insert the bucket if it doesn't already exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('branding', 'branding', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies if any to ensure idempotency
DROP POLICY IF EXISTS "Public access for branding" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload branding assets" ON storage.objects;

-- Allow public read access to the bucket
CREATE POLICY "Public access for branding" ON storage.objects
FOR SELECT
USING (bucket_id = 'branding');

-- Allow authenticated users (like admin) to upload
CREATE POLICY "Authenticated users can upload branding assets" ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'branding');
