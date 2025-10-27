import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://vbafwbityuxbpnunfvej.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiYWZ3Yml0eXV4YnBudW5mdmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MTg4MzMsImV4cCI6MjA3NzA5NDgzM30.6ccvOzuHGLy4o5ITPj_k5ybO--rrEhfXfShYp__dez8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);