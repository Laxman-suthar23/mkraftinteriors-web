import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export default function ContactFormEmail({
  name,
  email,
  phone,
  projectType,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>
          
          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Phone:</Text>
            <Text style={value}>{phone}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Project Type:</Text>
            <Text style={value}>{projectType}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from the Karni Interiors contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #eee",
  borderRadius: "5px",
  boxShadow: "0 5px 10px rgba(20,50,70,.2)",
  marginTop: "20px",
  maxWidth: "600px",
  padding: "68px 0 130px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingTop: "40px",
  paddingBottom: "20px",
};

const section = {
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingBottom: "20px",
};

const label = {
  color: "#666",
  fontSize: "14px",
  fontWeight: "bold",
  marginBottom: "5px",
};

const value = {
  color: "#333",
  fontSize: "16px",
  marginBottom: "0",
  marginTop: "0",
};

const messageStyle = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "1.5",
  marginBottom: "0",
  marginTop: "0",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingTop: "30px",
  borderTop: "1px solid #eee",
};

const footerText = {
  color: "#666",
  fontSize: "12px",
  lineHeight: "1.5",
};
