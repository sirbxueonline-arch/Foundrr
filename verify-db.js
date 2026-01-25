
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyInsert() {
    const id = 'test_' + Math.random().toString(36).substring(7);
    console.log(`Attempting to insert test site: ${id}`);

    // Test Storage Upload
    const { error: storageError } = await supabase.storage
        .from('websites')
        .upload(`${id}/index.html`, '<html>Test</html>', {
            contentType: 'text/html',
            upsert: true,
        });

    if (storageError) {
        console.error('Storage upload failed:', storageError);
        return; // Stop if storage fails, as specific error is needed
    } else {
        console.log('Storage upload successful!');
    }

    const { data, error } = await supabase.from('websites').insert({
        id: id,
        user_id: '00000000-0000-0000-0000-000000000000', // Using valid UUID to query schema constraint
        html_path: `${id}/index.html`,
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
        await supabase.storage.from('websites').remove([`${id}/index.html`]);
    }
}

verifyInsert();
