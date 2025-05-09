import { Button, Html, Text } from "@react-email/components";

type WelcomeEmailProps = {
  userName: string;
  actionUrl?: string;
};

export default function WelcomeEmail({
  userName,
  actionUrl,
}: WelcomeEmailProps) {
  return (
    <Html lang="en">
      <Text>Hi {userName},</Text>
      <Text>Thanks for joining us! Click below to get started:</Text>
      {actionUrl && <Button href={actionUrl}>Get Started</Button>}
    </Html>
  );
}
