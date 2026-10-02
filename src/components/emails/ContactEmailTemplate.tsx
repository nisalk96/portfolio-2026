import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactEmailTemplate({
  name,
  email,
  subject,
  message,
}: ContactEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#eef2f6",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          padding: "40px 20px",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Section
            style={{
              backgroundColor: "#0f172a",
              padding: "28px 30px",
            }}
          >
            <Text
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#ffffff",
                margin: "0",
              }}
            >
              New message
            </Text>
            <Text
              style={{
                fontSize: "13px",
                color: "#94a3b8",
                margin: "8px 0 0 0",
              }}
            >
              From nisalk.dev contact form
            </Text>
          </Section>

          <Section style={{ padding: "28px 30px" }}>
            <Section
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "18px",
                marginBottom: "20px",
              }}
            >
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "#64748b",
                  margin: "0 0 10px 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Contact details
              </Text>
              <Text
                style={{
                  fontSize: "15px",
                  color: "#0f172a",
                  margin: "0 0 8px 0",
                }}
              >
                <strong>Name:</strong> {name}
              </Text>
              <Text
                style={{
                  fontSize: "15px",
                  color: "#0f172a",
                  margin: "0 0 8px 0",
                }}
              >
                <strong>Email:</strong> {email}
              </Text>
              <Text style={{ fontSize: "15px", color: "#0f172a", margin: "0" }}>
                <strong>Subject:</strong> {subject}
              </Text>
            </Section>

            <Hr style={{ borderColor: "#e2e8f0", margin: "8px 0 20px" }} />

            <Text
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#64748b",
                margin: "0 0 10px 0",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Message
            </Text>
            <Section
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "18px",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#334155",
                  margin: "0",
                  whiteSpace: "pre-wrap",
                }}
              >
                {message}
              </Text>
            </Section>
          </Section>

          <Section
            style={{
              backgroundColor: "#f8fafc",
              padding: "16px 30px",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <Text style={{ fontSize: "12px", color: "#94a3b8", margin: "0" }}>
              Sent via nisalk.dev · {new Date().toLocaleDateString()}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactEmailTemplate;
