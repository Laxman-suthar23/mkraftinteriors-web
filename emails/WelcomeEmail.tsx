import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Karni Interiors - Let's create something beautiful together</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src="https://karniinteriors.com/logo.png"
              width="200"
              height="80"
              alt="Karni Interiors"
              style={logo}
            />
          </Section>

          <Heading style={h1}>Welcome to Karni Interiors, {name}!</Heading>
          
          <Text style={text}>
            Thank you for your interest in our interior design services. We're excited to help you transform your space into something truly extraordinary.
          </Text>

          <Text style={text}>
            Our team of experienced designers is dedicated to creating beautiful, functional spaces that reflect your unique style and personality. Whether you're looking to redesign a single room or your entire home, we're here to bring your vision to life.
          </Text>

          <Section style={buttonSection}>
            <Link
              style={button}
              href="https://karniinteriors.com/portfolio"
            >
              View Our Portfolio
            </Link>
          </Section>

          <Text style={text}>
            Ready to get started? Schedule a consultation with our team:
          </Text>

          <Section style={contactSection}>
            <Text style={contactText}>
              📞 +1 (555) 123-4567<br />
              ✉️ info@karniinteriors.com<br />
              📍 123 Design District, Suite 456, Los Angeles, CA 90028
            </Text>
          </Section>

          <Text style={text}>
            Follow us on social media for design inspiration and behind-the-scenes content:
          </Text>

          <Section style={socialSection}>
            <Link href="https://instagram.com/karniinteriors" style={socialLink}>
              Instagram
            </Link>
            <Link href="https://facebook.com/karniinteriors" style={socialLink}>
              Facebook
            </Link>
            <Link href="https://linkedin.com/company/karniinteriors" style={socialLink}>
              LinkedIn
            </Link>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Best regards,<br />
              The Karni Interiors Team
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

const logoSection = {
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingTop: "40px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingTop: "20px",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "1.5",
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingBottom: "20px",
};

const buttonSection = {
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingBottom: "20px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const contactSection = {
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingBottom: "20px",
  backgroundColor: "#f9f9f9",
  margin: "20px 40px",
  borderRadius: "4px",
  padding: "20px",
};

const contactText = {
  color: "#333",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0",
};

const socialSection = {
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingBottom: "20px",
  textAlign: "center" as const,
};

const socialLink = {
  color: "#007ee6",
  fontSize: "14px",
  textDecoration: "none",
  margin: "0 10px",
};

const footer = {
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingTop: "30px",
  borderTop: "1px solid #eee",
};

const footerText = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "1.5",
};
