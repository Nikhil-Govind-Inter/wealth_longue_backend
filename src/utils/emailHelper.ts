import * as fs from "fs";
import * as path from "path";
import { sendEmail } from "./emailService";

/**
 * Loads an HTML template from src/emailTemplates/
 * and replaces all {{PLACEHOLDER}} tokens with provided values.
 */
export function loadEmailTemplate(
  templateName: string,
  replacements: Record<string, string>,
): string {
  let templatePath = path.join(
    __dirname, // src/utils/
    "..", // src/
    "emailTemplates",
    templateName,
  );

  if (!fs.existsSync(templatePath)) {
    const fallbackPath = path.join(
      process.cwd(),
      "src",
      "emailTemplates",
      templateName,
    );
    if (fs.existsSync(fallbackPath)) {
      templatePath = fallbackPath;
    }
  }

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Email template not found at: ${templatePath}`);
  }

  let html = fs.readFileSync(templatePath, "utf-8");

  for (const [key, value] of Object.entries(replacements)) {
    html = html.replace(new RegExp(`{{${key}}}`, "g"), value ?? "N/A");
  }

  return html;
}

export const safeSend = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    return await sendEmail(options);
  } catch (err) {
    console.error(`❌ Email sending failed to ${options.to}:`, err);
    return null;
  }
};
