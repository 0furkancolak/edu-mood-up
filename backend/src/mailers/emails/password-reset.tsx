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
import { getTranslation, Language, replaceVariables } from "../utils/i18n";

interface PasswordResetProps {
    lang: Language;
    url: string;
    brandColor?: string;
}

const translations = {
    en: {
        subject: "Reset Your Password",
        text: "To reset your password, please click the following link: {url}",
        button: "Reset Password",
        footer: "If you did not request this, please ignore this email.",
    },
    tr: {
        subject: "Şifrenizi Sıfırlayın",
        text: "Şifrenizi sıfırlamak için aşağıdaki butona tıklayın: {url}",
        button: "Şifreyi Sıfırla",
        footer: "Eğer bu isteği siz yapmadıysanız, bu e-postayı göz ardı edebilirsiniz.",
    },
};

export const PasswordReset = ({
    lang,
    url,
    brandColor = "#2563EB",
}: PasswordResetProps) => {
    const t = getTranslation(translations, lang);

    return (
        <Html>
            <Head />
            <Preview>{t.subject}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <div style={{ ...header, backgroundColor: brandColor }}>
                        <Text style={logo}>EduMoodUp</Text>
                    </div>
                    <div style={content}>
                        <Heading style={h1}>{t.subject}</Heading>
                        <Text style={text}>
                            {replaceVariables(t.text, { url })}
                        </Text>
                        <Link href={url} style={{ ...button, backgroundColor: brandColor }}>
                            {t.button}
                        </Link>
                        <Text style={footer}>
                            {replaceVariables(t.footer, { url })}
                        </Text>
                    </div>
                </Container>
            </Body>
        </Html>
    );
};

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

const footer = {
    fontSize: "14px",
    color: "#999",
    marginTop: "24px",
    textAlign: "center" as const,
};

export default PasswordReset; 