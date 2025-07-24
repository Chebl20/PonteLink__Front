// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hqfeouafmbdmgzcicdkx.supabase.co'; // Cole sua URL aqui
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZmVvdWFmbWJkbWd6Y2ljZGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTY4NTgsImV4cCI6MjA2ODE5Mjg1OH0.z2ytfxKMr4jC67tjiHDB8c6sIZ7C2E3fH3KgZOXHfIk'; // Cole sua chave anon aqui

export const supabase = createClient(supabaseUrl, supabaseKey);
