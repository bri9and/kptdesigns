import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, business, website, services, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const submission = {
    name,
    email,
    phone: phone || "Not provided",
    business: business || "Not provided",
    website: website || "Not provided",
    services: (services && services.length > 0) ? services.join(", ") : "Not specified",
    message,
    timestamp: new Date().toISOString(),
  };

  // Log submission
  console.log("Contact form submission:", submission);

  // Send email via Resend (if configured)
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Notification email to business owner
      await resend.emails.send({
        from: "Ego Web Design <contact@egowebdesign.com>",
        to: "hello@egowebdesign.com",
        replyTo: email,
        subject: `New inquiry from ${name}${business ? ` (${business})` : ""}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1b1f22; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">EGO</h1>
              <p style="color: rgba(255,255,255,0.5); margin: 8px 0 0; font-size: 14px;">New Contact Form Submission</p>
            </div>
            <div style="padding: 24px; background: #ffffff;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #000000; width: 120px;">Name</td>
                  <td style="padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #000000;">Email</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #ffffff;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #000000;">Phone</td>
                  <td style="padding: 8px 0;">${phone || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #000000;">Business</td>
                  <td style="padding: 8px 0;">${business || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #000000;">Website</td>
                  <td style="padding: 8px 0;">${website || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #000000;">Interested In</td>
                  <td style="padding: 8px 0;">${(services && services.length > 0) ? services.join(", ") : "Not specified"}</td>
                </tr>
              </table>
              <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px; border: 1px solid #e5e5e5;">
                <p style="font-weight: bold; color: #000000; margin: 0 0 8px;">Message</p>
                <p style="margin: 0; line-height: 1.6; color: #333;">${message.replace(/\n/g, "<br>")}</p>
              </div>
              <p style="margin-top: 16px; font-size: 12px; color: #888;">
                Received ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET
              </p>
            </div>
            <div style="background: #1b1f22; padding: 12px; text-align: center;">
              <p style="color: rgba(255,255,255,0.4); margin: 0; font-size: 12px;">Ego Web Design</p>
            </div>
          </div>
        `,
      });

      // Auto-reply to the person who submitted
      await resend.emails.send({
        from: "Ego Web Design <contact@egowebdesign.com>",
        to: email,
        subject: `Thanks for reaching out, ${name.split(" ")[0]}!`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1b1f22; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 3px;">EGO</h1>
              <p style="color: rgba(255,255,255,0.5); margin: 8px 0 0; font-size: 14px;">Ego Web Design</p>
            </div>
            <div style="padding: 24px; background: #ffffff;">
              <p style="color: #000000; font-size: 18px; font-weight: bold; margin: 0 0 16px;">
                Hi ${name.split(" ")[0]},
              </p>
              <p style="line-height: 1.6; color: #333; margin: 0 0 16px;">
                Thanks for reaching out! We received your message and will get back to you within 24 hours with some initial thoughts.
              </p>
              <p style="line-height: 1.6; color: #333; margin: 0 0 16px;">
                In the meantime, feel free to check out our pricing at
                <a href="https://egowebdesign.com/pricing" style="color: #ffffff; font-weight: bold;">egowebdesign.com</a>.
              </p>
              <p style="line-height: 1.6; color: #333; margin: 0;">
                Talk soon,<br>
                <strong style="color: #000000;">The EGO Team</strong><br>
                <span style="font-size: 14px; color: #888;">Ego Web Design</span>
              </p>
            </div>
            <div style="background: #1b1f22; padding: 12px; text-align: center;">
              <p style="color: rgba(255,255,255,0.4); margin: 0; font-size: 12px;">
                hello@egowebdesign.com
              </p>
            </div>
          </div>
        `,
      });
    } catch (error) {
      console.error("Resend email error:", error);
      // Don't fail the request if email fails
    }
  }

  return NextResponse.json({ success: true });
}
