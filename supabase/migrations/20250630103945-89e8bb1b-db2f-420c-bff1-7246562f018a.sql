
-- Update storage policies to allow unauthenticated uploads
DROP POLICY IF EXISTS "Authenticated users can upload accommodation photos" ON storage.objects;

CREATE POLICY "Anyone can upload accommodation photos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'accommodation-photos');
