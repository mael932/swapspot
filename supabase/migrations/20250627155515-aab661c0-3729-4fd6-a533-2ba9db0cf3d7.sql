
-- Create a profiles table to store user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  university TEXT,
  exchange_university TEXT,
  program TEXT,
  start_date DATE,
  end_date DATE,
  current_location TEXT,
  current_address TEXT,
  budget TEXT,
  preferred_destinations TEXT[],
  apartment_description TEXT,
  verification_method TEXT CHECK (verification_method IN ('email', 'id')),
  university_email TEXT,
  additional_info TEXT,
  has_uploaded_proof BOOLEAN DEFAULT FALSE,
  gdpr_consent BOOLEAN DEFAULT FALSE,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, gdpr_consent)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    COALESCE((NEW.raw_user_meta_data ->> 'gdpr_consent')::boolean, false)
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile when user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
