
-- Step 1: Drop existing conflicting policies
DROP POLICY IF EXISTS "Service role can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Step 2: Create a more permissive insert policy
CREATE POLICY "Allow profile creation" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (
    auth.uid() = user_id OR auth.uid() IS NULL
  );

-- Step 3: Update the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, gdpr_consent)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE((NEW.raw_user_meta_data ->> 'gdpr_consent')::boolean, false)
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;
