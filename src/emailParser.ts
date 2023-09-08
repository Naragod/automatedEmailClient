import { Attachment } from "nodemailer/lib/mailer";
import { TemplateType, templateTypes } from "./email_templates/template";

export interface IEmailTemplate {
  text: string;
  subject: string;
  attachments?: Attachment[];
}

export interface ITemplateValues {
  position: string;
  jobBoard: string;
}

export interface IEmailInputOptions extends ITemplateValues {
  to: string;
  from: string;
  templateType: TemplateType;
}

export interface IEmailOptions extends IEmailTemplate {
  to: string;
  from: string;
}

export const replaceEmailPlaceholders = (
  emailTemplate: IEmailTemplate,
  values: ITemplateValues
): IEmailTemplate => {
  const { position, jobBoard } = values;
  let stringEmail = JSON.stringify(emailTemplate);

  const posRegEx = new RegExp("{position}", "gi");
  const jobRegEx = new RegExp("{jobBoard}", "gi");
  stringEmail = stringEmail.replace(posRegEx, position);
  stringEmail = stringEmail.replace(jobRegEx, jobBoard);

  return JSON.parse(stringEmail);
};

export const getEmailOptions = (
  templateValues: IEmailInputOptions
): IEmailOptions => {
  const { from, to, templateType } = templateValues;
  const template = templateTypes[templateType];
  const updatedTemplate = replaceEmailPlaceholders(template, templateValues);
  return { from, to, ...updatedTemplate };
};
