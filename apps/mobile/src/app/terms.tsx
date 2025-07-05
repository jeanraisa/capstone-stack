import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function TermsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Terms & Conditions" }} />
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.title}>Terms and Conditions</Text>

        <Text style={styles.effectiveDate}>Effective Date: [Insert Date]</Text>

        <Text style={styles.section}>
          Welcome to our Maternal Health Monitoring App. Please read these Terms
          and Conditions carefully before using this application. By creating an
          account or using the app, you agree to be bound by these terms.
        </Text>

        <Text style={styles.heading}>1. Purpose of the App</Text>
        <Text style={styles.section}>
          This mobile application is designed to help pregnant women monitor
          their personal health data and receive AI-powered insights based on
          metrics such as blood pressure, blood glucose, heart rate, and body
          temperature. It is intended for informational and educational use only
          and is not a substitute for professional medical advice, diagnosis, or
          treatment.
        </Text>

        <Text style={styles.heading}>2. User Eligibility</Text>
        <Text style={styles.section}>
          This application is intended for use by pregnant individuals who are
          18 years or older. By using the app, you confirm that you meet this
          requirement.
        </Text>

        <Text style={styles.heading}>3. Health Disclaimer</Text>
        <Text style={styles.section}>
          The information provided by the app is generated through machine
          learning algorithms and is intended to support— not replace—advice
          from qualified healthcare professionals. Always consult a doctor or
          healthcare provider if you experience unusual symptoms or have
          questions about your health.
        </Text>

        <Text style={styles.heading}>4. User Responsibilities</Text>
        <Text style={styles.section}>
          Users are responsible for:
          {"\n"}• Ensuring accuracy when entering personal health data.
          {"\n"}• Using the app for lawful and ethical purposes.
          {"\n"}• Not sharing account access with others.
        </Text>

        <Text style={styles.heading}>5. Data Privacy and Security</Text>
        <Text style={styles.section}>
          All user data entered into the app is stored securely and will not be
          sold or shared with third parties without user consent. The app
          complies with applicable data protection laws and uses encryption and
          secure storage practices to protect personal health information.
        </Text>

        <Text style={styles.heading}>6. App Updates and Availability</Text>
        <Text style={styles.section}>
          We may update the app periodically to enhance features, fix bugs, or
          improve performance. The app may experience occasional downtime for
          maintenance. We are not liable for any damages resulting from service
          interruptions.
        </Text>

        <Text style={styles.heading}>7. Intellectual Property</Text>
        <Text style={styles.section}>
          All content, logos, software code, and related materials are the
          property of [Your Institution/Developer Name] and are protected by
          applicable copyright and intellectual property laws.
        </Text>

        <Text style={styles.heading}>8. Termination of Use</Text>
        <Text style={styles.section}>
          Users may stop using the app at any time. We reserve the right to
          suspend or terminate access to the app if a user violates these terms
          or misuses the platform.
        </Text>

        <Text style={styles.heading}>9. Limitation of Liability</Text>
        <Text style={styles.section}>
          We are not liable for any indirect, incidental, or consequential
          damages resulting from the use or inability to use the application or
          reliance on any information provided.
        </Text>

        <Text style={styles.heading}>10. Changes to the Terms</Text>
        <Text style={styles.section}>
          These terms may be updated occasionally. Users will be notified of
          significant changes via in-app notification or email. Continued use of
          the app after updates constitutes agreement to the revised terms.
        </Text>

        <Text style={styles.heading}>11. Contact Information</Text>
        <Text style={styles.section}>
          For support or questions regarding these Terms & Conditions, please
          contact us at:
          {"\n"}📧 irakozeraissa6@gmail.com
          {"\n"}📱 +25070004968
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  effectiveDate: {
    fontStyle: "italic",
    marginBottom: 15,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  section: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 22,
  },
});
