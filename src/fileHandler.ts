import { join } from "path";
import { unlinkSync, readFileSync, appendFileSync, readdirSync } from "fs";
import { baseFolder } from "./config.json";

export const deleteFile = (path: string) => unlinkSync(path);
export const appendToFile = (
  fileName: string,
  data: any,
  isSuccessfull: boolean
) => {
  if (!isSuccessfull) {
    console.log(`Email failed to send to ${data.to}`);
    appendFileSync(`${baseFolder}/src/emails/undelivered/${fileName}`, data);
    return;
  }

  console.log(`Succesfully sent email to :${data.to}`);
  appendFileSync(
    `${baseFolder}/src/emails/sent/${fileName}`,
    JSON.stringify(data)
  );
};

export const getAllPendingEmailFiles = () => {
  const pendingDirectory = `${baseFolder}/src/emails/pending`;
  const filePaths = readdirSync(pendingDirectory);
  return filePaths.map((path: string) => ({
    filePath: join(pendingDirectory, path),
    content: readFileSync(join(pendingDirectory, path)),
  }));
};
