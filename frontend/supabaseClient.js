import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ftnwptykhrgxzkmtbgld.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bndwdHlraHJneHprbXRiZ2xkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MTc5NzksImV4cCI6MjA1ODk5Mzk3OX0.H846C4zZV2RL9YnWpWuT1RPQqYoKfJIRYLlfNHeI-Mw'

export const supabase = createClient(supabaseUrl, supabaseKey)