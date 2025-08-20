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

interface ProjectInquiryProps {
  name: string;
  email: string;
  projectTitle: string;
  projectId: string;
  message: string;
}

export default function ProjectInquiry({
  name,
  email,
  projectTitle,
  projectId,
  message,
}: ProjectInquiryProps) {
  return (
    <Html>
      <Head />
      <Preview>New project inquiry from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Project Inquiry</Heading>
          
          <Section style={section}>
            <Text style={label}>Client Information:</Text>
            <Text style={value}>Name: {name}</Text>
            <Text style={value}>Email: {email}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Project of Interest:</Text>
            <Text style={value}>Title: {projectTitle}</Text>
            <Text style={value}>Project ID: {projectId}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This inquiry was sent from the Karni Interiors portfolio page.
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
  marginBottom: "10px",
  marginTop: "0",
};

const messageStyle = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "1.5",
  marginBottom: "0",
  marginTop: "0",
  whiteSpace: "pre-wrap" as const,
  backgroundColor: "#f9f9f9",
  padding: "15px",
  borderRadius: "4px",
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
