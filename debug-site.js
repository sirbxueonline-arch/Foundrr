
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSite() {
    console.log('Checking for site: 68xioei');

    const { data: site, error } = await supabase
        .from('websites')
        .select('*')
        .eq('id', 'sr3k633')
        .single();

    if (error) {
        console.error('Error fetching site:', error);
    } else {
        console.log('Site found:', site);
        console.log('User ID:', site.user_id);
    }
}

checkSite();
