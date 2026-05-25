-- 1. Drop the broken foreign key that incorrectly links feedbacks.id to events.id
ALTER TABLE public.feedbacks DROP CONSTRAINT IF EXISTS feedbacks_id_fkey;

-- 2. Create the correct foreign key linking feedbacks.event_id to events.id
ALTER TABLE public.feedbacks 
  ADD CONSTRAINT feedbacks_event_id_fkey 
  FOREIGN KEY (event_id) REFERENCES public.events (id) ON DELETE CASCADE;
