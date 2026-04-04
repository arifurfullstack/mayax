const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://tiyjrzczfxpspovnrqha.supabase.co';
const supabaseKey = 'sb_publishable_gYGQ63wCpSUSno7TIMupVQ_7SveNZF-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'normal@mayax.test',
    password: 'Password123!'
  });
  console.log('Login normal:', error ? error.message : data.user.id);
  
  const { error: err2 } = await supabase.auth.signInWithPassword({
    email: 'dealer@mayax.test',
    password: 'Password123!'
  });
  console.log('Login dealer:', err2 ? err2.message : 'success');
}
test();
