import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route for subscribing users to Customer.io
 * POST /api/subscribe
 *
 * This uses Customer.io Track API to create/update a customer profile
 * Requires CUSTOMER_IO_SITE_ID and CUSTOMER_IO_TRACK_API_KEY in .env.local
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const siteId = process.env.CUSTOMER_IO_SITE_ID;
    const trackApiKey = process.env.CUSTOMER_IO_TRACK_API_KEY;

    if (!siteId || !trackApiKey) {
      console.error('Customer.io credentials not configured');
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      );
    }

    // Use email as customer ID (or you can generate a unique ID)
    const customerId = email.toLowerCase().replace(/[^a-z0-9@._-]/g, '_');

    // Customer.io Track API endpoint to identify/create customer
    const customerioUrl = `https://track.customer.io/api/v1/customers/${encodeURIComponent(customerId)}`;

    // Basic auth with Site ID and Track API Key
    const authString = Buffer.from(`${siteId}:${trackApiKey}`).toString('base64');

    const response = await fetch(customerioUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        created_at: Math.floor(Date.now() / 1000),
        // Add custom attributes
        signup_source: 'early_access_website',
        signup_date: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Customer.io Track API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
