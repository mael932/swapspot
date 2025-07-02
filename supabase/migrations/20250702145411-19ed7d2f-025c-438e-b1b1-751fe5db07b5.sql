-- Create chat rooms table for different exchange cities
CREATE TABLE public.chat_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table for chat functionality
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for chat rooms (public read, admin create)
CREATE POLICY "Anyone can view chat rooms" 
ON public.chat_rooms 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create chat rooms" 
ON public.chat_rooms 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create policies for chat messages
CREATE POLICY "Anyone can view messages" 
ON public.chat_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can send messages" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own messages" 
ON public.chat_messages 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own messages" 
ON public.chat_messages 
FOR DELETE 
USING (auth.uid() = user_id);

-- Insert default chat rooms for popular exchange cities
INSERT INTO public.chat_rooms (city, country, description) VALUES
('Paris', 'France', 'Connect with students heading to Paris for exchange'),
('London', 'UK', 'Chat with fellow students going to London'),
('Barcelona', 'Spain', 'Meet other students planning their Barcelona exchange'),
('Amsterdam', 'Netherlands', 'Connect with students going to Amsterdam'),
('Rome', 'Italy', 'Chat with students heading to the Eternal City'),
('Berlin', 'Germany', 'Connect with students going to Berlin'),
('Madrid', 'Spain', 'Meet fellow students heading to Madrid'),
('Vienna', 'Austria', 'Connect with students planning their Vienna exchange'),
('Prague', 'Czech Republic', 'Chat with students going to Prague'),
('Stockholm', 'Sweden', 'Connect with students heading to Stockholm');

-- Enable realtime for chat messages
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.chat_messages;