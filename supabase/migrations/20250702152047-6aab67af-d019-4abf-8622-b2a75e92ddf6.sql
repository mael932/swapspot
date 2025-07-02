-- Add nationality, languages, and interests to profiles table
ALTER TABLE public.profiles 
ADD COLUMN nationality text,
ADD COLUMN languages_spoken text[],
ADD COLUMN interests text;

-- Add member count tracking for chat rooms
ALTER TABLE public.chat_rooms 
ADD COLUMN member_count integer DEFAULT 0;

-- Create a function to update member count
CREATE OR REPLACE FUNCTION update_chat_room_member_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE chat_rooms 
    SET member_count = (
      SELECT COUNT(DISTINCT user_id) 
      FROM chat_messages 
      WHERE chat_room_id = NEW.chat_room_id 
      AND user_id IS NOT NULL
    )
    WHERE id = NEW.chat_room_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update member count
CREATE TRIGGER update_member_count_trigger
  AFTER INSERT ON chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_chat_room_member_count();