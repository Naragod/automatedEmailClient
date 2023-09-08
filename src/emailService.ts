import { appendToFile } from "./fileHandler";
import { createTransport, Transporter } from "nodemailer";
import { getEmailOptions, IEmailInputOptions } from "./emailParser";

export interface ITransporterAuth {
  user: string;
  pass: string;
}

export interface ITransportOptions {
  host: string;
  port: number;
  user: string;
  pass?: string;
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getEmailTransporter = async (auth: ITransporterAuth) => {
  return createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: auth,
  });
};

export const getTransporterOptions = (
  transporter: Transporter,
  showSecrets = false
): ITransportOptions => {
  try {
    const { host, port, auth } = (transporter.transporter as any).options;
    const { user, pass } = auth;
    const result: ITransportOptions = { host, port, user };

    if (showSecrets) {
      result["pass"] = pass;
    }
    return result;
  } catch (err) {
    console.error(
      `Could not get transporter options for trasporter: ${transporter}`
    );
    throw err;
  }
};

export const verifyEmailServerConneciton = async (
  transporter: Transporter
): Promise<boolean> => {
  try {
    return await transporter.verify();
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const handleEmail = async (
  transporter: Transporter,
  email: IEmailInputOptions
) => {
  const { to, position, templateType } = email;
  console.log(`Emailing: ${email.to}, about Position: ${position}`);
  const emailOptions = getEmailOptions(<IEmailInputOptions>email);
  const fileName = `${to}_${position}.json`;

  const succesfullySentEmail = await transporter.sendMail(emailOptions);
  console.log(`Successfuly emailed: ${to}, template: ${templateType}`);
  // delay calls to avoid being labeled as a spammer or being blocked
  await sleep(1000);

  appendToFile(fileName, email, succesfullySentEmail);
};
