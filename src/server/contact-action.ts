"use server";

import { Resend } from "resend";
import { z } from "zod";
import { ContactEmailTemplate } from "@/components/emails/ContactEmailTemplate";
import { contact } from "@/constants/contact";
import { verifyTurnstileToken } from "@/lib/turnstile";

const contactSchema = z.object({
  name: z
    .string()
    .min(contact.fields.name.min, "Name must be at least 2 characters")
    .max(contact.fields.name.max, "Name must be less than 100 characters"),
  email: z.email("Please enter a valid email address"),
  subject: z
    .string()
    .min(contact.fields.subject.min, "Subject must be at least 3 characters")
    .max(
      contact.fields.subject.max,
      "Subject must be less than 200 characters",
    ),
  message: z
    .string()
    .min(contact.fields.message.min, "Message must be at least 10 characters")
    .max(
      contact.fields.message.max,
      "Message must be less than 2000 characters",
    ),
  turnstileToken: z.string().min(1, "Please complete the security check"),
});

export interface ContactFormState {
  message: string;
  errors?: Record<string, string[]>;
  success?: boolean;
}

function resendUserMessage(error: unknown): string {
  const message =
    typeof error === "object" &&
    error &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
      ? (error as { message: string }).message
      : error instanceof Error
        ? error.message
        : "";

  const lower = message.toLowerCase();

  if (lower.includes("api key") || lower.includes("unauthorized")) {
    return "Email service API key is invalid. Update RESEND_API_KEY in Vercel and redeploy.";
  }
  if (lower.includes("domain") || lower.includes("from")) {
    return "Sender domain is not verified in Resend. Verify nisalk.dev or set RESEND_FROM to a verified address.";
  }
  if (message) {
    return `Email could not be sent: ${message}`;
  }
  return "Your message could not be sent. Please try again or email me directly.";
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    turnstileToken: formData.get("turnstileToken"),
  };

  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    const fieldErrors = z.flattenError(result.error);
    return {
      message: "Validation failed. Please correct the required fields.",
      success: false,
      errors: fieldErrors.fieldErrors,
    };
  }

  const isValidTurnstile = await verifyTurnstileToken(
    result.data.turnstileToken,
  );
  if (!isValidTurnstile) {
    return {
      message: "Security verification failed. Please try again.",
      success: false,
      errors: {
        turnstileToken: ["Security verification failed. Please try again."],
      },
    };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return {
      success: false,
      message: contact.form.unavailableMessage,
    };
  }

  const from = process.env.RESEND_FROM?.trim() || contact.email.from;
  const to = process.env.RESEND_TO?.trim() || contact.email.to;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `${contact.email.subject}: ${result.data.subject}`,
      replyTo: contact.email.replyToField ? result.data.email : undefined,
      react: ContactEmailTemplate({
        name: result.data.name,
        email: result.data.email,
        subject: result.data.subject,
        message: result.data.message,
      }),
    });

    if (error) {
      console.error("Contact email failed:", error);
      return {
        message: resendUserMessage(error),
        success: false,
      };
    }

    return {
      message: contact.form.successMessage,
      success: true,
    };
  } catch (error) {
    console.error("Contact form failed:", error);
    return {
      message: resendUserMessage(error),
      success: false,
    };
  }
}
