import { createClient } from "@supabase/supabase-js";

// const { createClient } = supabase

export const supabaseClient = createClient(
  "https://c7dae225g6h5oik633m0.baseapi.memfiredb.com", // baseURL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzE3OTYzOTU3NSwiaWF0IjoxNjQxNzE5NTc1LCJpc3MiOiJzdXBhYmFzZSJ9.9bFL0ST5g62dh3Ch2qk-FyCOyuOVx6quY9S8ADCO5ls" // 公开的密钥（仅截取部分内容）
);
