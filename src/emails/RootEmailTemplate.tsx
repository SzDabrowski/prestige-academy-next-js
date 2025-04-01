// RootEmailTemplate.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
} from "@react-email/components";

interface RootEmailTemplateProps {
  notificationTitle: string;
  year: number;
  children: React.ReactNode; // This is where specific content will be injected
}

const RootEmailTemplate = ({
  notificationTitle,
  year,
  children,
}: RootEmailTemplateProps) => {
  const baseURL = "https://www.prestige.stargard.pl";

  return (
    <Html lang="pl">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{notificationTitle}</title>
      </Head>
      <Body style={{ backgroundColor: "#dcd5dd", margin: 0, padding: 0 }}>
        <Container style={{ backgroundColor: "#dcd5dd", padding: "40px 0" }}>
          {/* Nagłówek */}
          <Container style={{ textAlign: "center", paddingBottom: "30px" }}>
            <Link
              href=""
              style={{ display: "inline-block", textDecoration: "none" }}
            >
              <Container
                style={{
                  backgroundColor: "#dcd5dd",
                  borderRadius: "6px",
                  display: "inline-block",
                  padding: "8px",
                }}
              >
                <img
                  src={`${baseURL}/assets/images/logo/PRESTIGE_logo_fullcolor_rgb.png`}
                  alt="Logo"
                  style={{
                    display: "block",
                    border: "0",
                    width: "50%",
                    height: "auto",
                    margin: "0 auto",
                  }}
                />
              </Container>
            </Link>
          </Container>

          {/* Dynamic Content Here */}
          <Container style={{ paddingBottom: "30px" }}>
            {children} {/* Render dynamic content passed as children */}
          </Container>

          {/* Stopka */}
          <Container style={{ paddingTop: "30px", textAlign: "center" }}>
            <Text style={{ fontSize: "12px", color: "#71717a" }}>
              © {year} Prestige akademia tańca. Wszelkie prawa zastrzeżone.
            </Text>
            <Text style={{ fontSize: "12px", color: "#71717a" }}>
              Korzystając z naszej usługi, akceptujesz nasze{" "}
              <Link
                href="https://example.com/terms"
                style={{ color: "#000000", textDecoration: "underline" }}
              >
                Warunki korzystania
              </Link>{" "}
              oraz{" "}
              <Link
                href="https://example.com/privacy"
                style={{ color: "#000000", textDecoration: "underline" }}
              >
                Politykę prywatności
              </Link>
              .
            </Text>
            <Text style={{ fontSize: "12px", color: "#71717a" }}>
              <Link
                href="https://example.com/unsubscribe"
                style={{ color: "#000000", textDecoration: "underline" }}
              >
                Wypisz się
              </Link>{" "}
              •{" "}
              <Link
                href="https://example.com/preferences"
                style={{ color: "#000000", textDecoration: "underline" }}
              >
                Ustawienia e-mail
              </Link>
            </Text>
          </Container>
        </Container>
      </Body>
    </Html>
  );
};

export default RootEmailTemplate;
