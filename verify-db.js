
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyInsert() {
    const id = 'test_' + Math.random().toString(36).substring(7);
    console.log(`Attempting to insert test site: ${id}`);

    const { data, error } = await supabase.from('websites').insert({
        id: id,
        user_id: 'test_user', // This might fail if foreign key constraint exists, but error message will tell us
        html_path: 'test.html',
        paid: false,
        price: 49.99, // Testing this column
        name: 'Test Site',
        created_at: new Date().toISOString()
    });

    if (error) {
        console.error('Insert failed:', error);
    } else {
        console.log('Insert successful!');
        // Cleanup
        await supabase.from('websites').delete().eq('id', id);
    }
}

verifyInsert();
