
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSite() {
    const id = 'lwbxltp';
    console.log(`Checking for site: ${id}`);

    const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('id', id);

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Site found:', data);
    }
}

checkSite();
