const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tiyjrzczfxpspovnrqha.supabase.co';
const supabaseKey = 'sb_publishable_gYGQ63wCpSUSno7TIMupVQ_7SveNZF-';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const password = 'Password123!';

const users = [
  {
    email: 'normal@test.com',
    role: 'normal_user',
    profileTable: 'normal_user_profiles',
    profileData: { full_name: 'Normal Test User', email: 'normal@test.com' }
  },
  {
    email: 'dealer@test.com',
    role: 'dealer',
    profileTable: 'dealers',
    profileData: { 
      dealership_name: 'Test Dealership', 
      business_type: 'Independent Dealer', 
      business_address: '123 Dealer St', 
      province: 'Ontario', 
      contact_person: 'Dealer Contact',
      email: 'dealer@test.com',
      phone: '555-000-1111',
      approval_status: 'approved',
      subscription_tier: 'pro'
    }
  },
  {
    email: 'provider@test.com',
    role: 'provider',
    profileTable: 'provider_profiles',
    profileData: { 
      company_name: 'Test Provider Inc', 
      contact_person: 'Provider Contact',
      email: 'provider@test.com',
      approval_status: 'approved'
    }
  },
  {
    email: 'admin@test.com',
    role: 'admin',
    profileTable: null, // Admin doesn't have a specific profile table in the schema based on Register.tsx, except maybe normal user profile just in case? Let's just create user_roles.
    profileData: null
  }
];

async function seedUsers() {
  console.log("Starting user creation...");

  for (const user of users) {
    console.log(`\nCreating ${user.role}...`);
    // 1. Auth SignUp
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: user.email,
      password: password,
    });

    if (authError) {
      console.error(`  Error creating auth user: ${authError.message}`);
      if (authError.message.includes("already registered")) {
        console.log(`  User ${user.email} already exists. Attempting to sign in...`);
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: password
        });
        if (signInError) {
            console.error(`  Sign in failed: ${signInError.message}`);
            continue;
        }
        
        console.log("  Sign in successful, getting user...");
        if (signInData && signInData.user) {
           authData.user = signInData.user;
        } else {
           continue;
        }
      } else {
          continue;
      }
    } else {
      console.log(`  Auth user created: ${authData?.user?.id}`);
    }

    const userId = authData?.user?.id;
    if (!userId) continue;

    // 2. Set Role
    // Try doing it anyway, maybe it exists already so use upsert or just insert
    const { error: roleError } = await supabase.from('user_roles').upsert({ user_id: userId, role: user.role });
    if (roleError) {
      console.error(`  Error setting role: ${roleError.message}`);
    } else {
      console.log(`  Role set to ${user.role}`);
    }

    // 3. Set Profile
    if (user.profileTable && user.profileData) {
      const profileDataWithId = { id: userId, ...user.profileData };
      const { error: profileError } = await supabase.from(user.profileTable).upsert(profileDataWithId);
      if (profileError) {
         console.error(`  Error creating profile in ${user.profileTable}: ${profileError.message}`);
      } else {
         console.log(`  Profile created in ${user.profileTable}`);
      }
    }
    
    // Sign out to clean state for next user
    await supabase.auth.signOut();
  }
  
  console.log("\nDone! Credentials:");
  users.forEach(u => console.log(`${u.role}: ${u.email} / ${password}`));
}

seedUsers();
