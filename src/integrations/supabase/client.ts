// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iqdbhujmjyviyvgymbvm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZGJodWptanl2aXl2Z3ltYnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzUwMjEsImV4cCI6MjA1MjUxMTAyMX0.g8OGAohOFhixy0Cz1MN183U98GgcAYyl8bsQDA1wcEA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);