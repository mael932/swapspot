
-- Create a storage bucket for accommodation photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('accommodation-photos', 'accommodation-photos', true);

-- Create RLS policies for the bucket
CREATE POLICY "Anyone can view accommodation photos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'accommodation-photos');

CREATE POLICY "Authenticated users can upload accommodation photos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'accommodation-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own accommodation photos" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'accommodation-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own accommodation photos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'accommodation-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
