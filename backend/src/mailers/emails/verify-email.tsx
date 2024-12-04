import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Text,
} from "@react-email/components";

interface VerifyEmailProps {
    url: string;
    brandColor?: string;
}

export const VerifyEmail = ({
    url,
    brandColor = "#2563EB",
}: VerifyEmailProps) => (
    <Html>
        <Head />
        <Preview>EduMoodUp hesabınızı doğrulayın</Preview>
        <Body style={main}>
            <Container style={container}>
                <div style={{ ...header, backgroundColor: brandColor }}>
                    <Text style={logo}>EduMoodUp</Text>
                </div>
                <div style={content}>
                    <Heading style={h1}>Email Adresinizi Doğrulayın</Heading>
                    <Text style={text}>
                        Kaydolduğunuz için teşekkürler! Hesabınızı onaylamak için aşağıdaki butona tıklayın.
                    </Text>
                    <Link href={url} style={{ ...button, backgroundColor: brandColor }}>
                        Hesabı Onayla
                    </Link>
                </div>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: "#f4f4f4",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "560px",
};

const header = {
    padding: "24px",
    borderRadius: "4px 4px 0 0",
    textAlign: "center" as const,
};

const logo = {
    color: "#FFF",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0",
};

const content = {
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "0 0 4px 4px",
};

const h1 = {
    margin: "0 0 16px",
    fontSize: "24px",
    fontWeight: "bold",
};

const text = {
    margin: "0 0 24px",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#666",
};

const button = {
    display: "block",
    padding: "16px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    textDecoration: "none",
    textAlign: "center" as const,
    borderRadius: "4px",
};

export default VerifyEmail; 