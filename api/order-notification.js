const ALLOWED_ORIGINS = new Set([
    'https://next-level-gaming-arena.vercel.app',
    'http://localhost:5500',
    'http://localhost:5501',
    'http://localhost:8081',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:5501',
    'http://127.0.0.1:8081'
]);

function setCorsHeaders(req, res) {
    const origin = req.headers.origin;
    if (origin && ALLOWED_ORIGINS.has(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
}

module.exports = async function handler(req, res) {
    setCorsHeaders(req, res);
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

    const origin = req.headers.origin;
    if (origin && !ALLOWED_ORIGINS.has(origin)) {
        return res.status(403).json({ error: 'Origin not allowed.' });
    }

    const accessToken = req.headers.authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
    if (!accessToken) return res.status(401).json({ error: 'Authentication required.' });

    const { type, id } = req.body || {};
    if (!['booking', 'order'].includes(type) || typeof id !== 'string' ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
        return res.status(400).json({ error: 'A valid booking or order ID is required.' });
    }

    const {
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY,
        EMAILJS_PUBLIC_KEY,
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        EMAILJS_ORDER_TEMPLATE_ID,
        ACCOUNT_NOTIFICATION_EMAIL = 'rossluyanda717@gmail.com'
    } = process.env;

    if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
        console.error('Order notification is missing Supabase server configuration.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    const headers = {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${accessToken}`
    };
    let user;
    try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers });
        if (!response.ok) return res.status(401).json({ error: 'Invalid authentication session.' });
        user = await response.json();
    } catch (error) {
        console.error('Unable to verify user session for order email:', error);
        return res.status(502).json({ error: 'Could not verify user account.' });
    }

    const table = type === 'booking' ? 'bookings' : 'checkout_orders';
    const query = new URLSearchParams({ id: `eq.${id}`, user_id: `eq.${user.id}`, select: '*' });
    let record;
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, { headers });
        if (!response.ok) {
            const details = await response.text();
            console.error(`Unable to load ${type} for notification:`, response.status, details);
            return res.status(502).json({ error: 'Could not load the saved record for email.' });
        }
        const rows = await response.json();
        record = rows[0];
    } catch (error) {
        console.error(`Unable to load ${type} for notification:`, error);
        return res.status(502).json({ error: 'Could not load the saved record for email.' });
    }
    if (!record) return res.status(404).json({ error: 'Saved record not found for this account.' });

    let bookingRecord = record;
    if (type === 'order' && record.order_type === 'booking') {
        if (!record.booking_id) return res.status(409).json({ error: 'The booking order has no linked booking record.' });
        const bookingQuery = new URLSearchParams({
            id: `eq.${record.booking_id}`,
            user_id: `eq.${user.id}`,
            select: '*'
        });
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings?${bookingQuery}`, { headers });
            if (!response.ok) {
                console.error('Unable to load booking for order notification:', response.status, await response.text());
                return res.status(502).json({ error: 'Could not load the linked booking for email.' });
            }
            bookingRecord = (await response.json())[0];
        } catch (error) {
            console.error('Unable to load booking for order notification:', error);
            return res.status(502).json({ error: 'Could not load the linked booking for email.' });
        }
        if (!bookingRecord) return res.status(404).json({ error: 'Linked booking not found for this account.' });
    }

    const isBooking = type === 'booking' || record.order_type === 'booking';
    const templateId = isBooking
        ? EMAILJS_TEMPLATE_ID
        : EMAILJS_ORDER_TEMPLATE_ID;
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !templateId) {
        return res.status(503).json({
            error: isBooking
                ? 'Booking email is not configured on the server.'
                : 'Order email is not configured. Set EMAILJS_ORDER_TEMPLATE_ID on the server.'
        });
    }
    if (!user.email) return res.status(400).json({ error: 'Customer email is missing.' });

    const fullName = isBooking
        ? `${bookingRecord.first_name} ${bookingRecord.surname}`.trim()
        : String(user.user_metadata?.full_name || user.email);
    const extras = isBooking && Array.isArray(bookingRecord.extras)
        ? bookingRecord.extras.map((extra) => extra.name || '').filter(Boolean).join(', ') || 'None selected'
        : 'None';
    const reference = String(isBooking ? bookingRecord.booking_ref || bookingRecord.id : record.id).slice(0, 8);
    const commonParams = {
        record_type: isBooking ? 'Booking quotation request' : 'Membership/order request',
        order_item: isBooking ? `${bookingRecord.experience} gaming session` : record.item,
        order_status: record.status,
        order_reference: reference,
        booking_ref: reference,
        to_name: fullName,
        name: fullName,
        user_name: fullName,
        customer_email: user.email,
        user_email: user.email,
        email: user.email,
        customer_phone: isBooking ? bookingRecord.phone : 'Not provided',
        phone: isBooking ? bookingRecord.phone : 'Not provided',
        experience: isBooking ? bookingRecord.experience : record.item,
        players: isBooking ? bookingRecord.players : '',
        hours: isBooking ? bookingRecord.hours : '',
        extras,
        subtotal: isBooking ? `R ${Number(bookingRecord.subtotal).toFixed(2)}` : `R ${Number(record.amount).toFixed(2)}`,
        vat: isBooking ? `R ${Number(bookingRecord.vat).toFixed(2)}` : 'N/A',
        total: isBooking ? `R ${Number(bookingRecord.total).toFixed(2)}` : `R ${Number(record.amount).toFixed(2)}`,
        total_amount: isBooking ? `R ${Number(bookingRecord.total).toFixed(2)}` : `R ${Number(record.amount).toFixed(2)}`,
        billing_period: record.billing_period || '',
        preferred_date: isBooking ? bookingRecord.preferred_date || '' : '',
        preferred_time: isBooking ? bookingRecord.preferred_time || '' : '',
        special_request: isBooking ? bookingRecord.special_request || '' : '',
        reply_to: user.email
    };

    const sendEmail = async (toEmail, toName) => {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: EMAILJS_SERVICE_ID,
                template_id: templateId,
                user_id: EMAILJS_PUBLIC_KEY,
                template_params: { ...commonParams, to_email: toEmail, to_name: toName }
            })
        });
        if (!response.ok) {
            const details = await response.text();
            throw new Error(`EmailJS returned ${response.status}: ${details}`);
        }
    };

    const adminAddress = ACCOUNT_NOTIFICATION_EMAIL.trim();
    const shouldSendAdmin = adminAddress.toLowerCase() !== user.email.toLowerCase();
    const results = await Promise.allSettled([
        sendEmail(user.email, fullName),
        shouldSendAdmin ? sendEmail(adminAddress, `New ${type} from ${fullName}`) : Promise.resolve()
    ]);
    const customerSent = results[0].status === 'fulfilled';
    const adminSent = results[1].status === 'fulfilled';
    if (!customerSent) console.error(`${type} customer email failed:`, results[0].reason);
    if (shouldSendAdmin && !adminSent) console.error(`${type} venue email failed:`, results[1].reason);

    if (customerSent && adminSent) {
        return res.status(200).json({ ok: true, customerSent, adminSent: true });
    }
    return res.status(502).json({
        error: 'The record was saved, but one or more notification emails could not be sent.',
        customerSent,
        adminSent: shouldSendAdmin ? adminSent : null
    });
};
