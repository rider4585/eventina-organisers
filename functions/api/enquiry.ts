interface Env {
  DB: D1Database;
}

interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  city: string;
  budget: string;
  services: string[];
  notes?: string;
  privacyConsent?: boolean;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data = (await context.request.json()) as Partial<EnquiryPayload>;

    // Validate mandatory fields
    if (!data.name || !data.phone || !data.email || !data.eventType || !data.eventDate || !data.city || !data.budget) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing mandatory fields: name, phone, email, eventType, eventDate, city, and budget are required.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const reference =
      'EVT-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

    const servicesJson = JSON.stringify(data.services || []);
    const notesText = data.notes || '';

    // Insert into Cloudflare D1 if binding exists
    if (context.env && context.env.DB) {
      await context.env.DB.prepare(
        `INSERT INTO enquiries (reference, name, phone, email, event_type, event_date, city, budget, services, notes, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
      )
        .bind(
          reference,
          data.name,
          data.phone,
          data.email,
          data.eventType,
          data.eventDate,
          data.city,
          data.budget,
          servicesJson,
          notesText
        )
        .run();
    }

    return new Response(
      JSON.stringify({
        success: true,
        reference,
        message: 'Your event enquiry has been successfully logged with our senior event directors.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || 'Internal server error processing enquiry.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
