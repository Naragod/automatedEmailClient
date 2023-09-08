import { emailUser, appPassword } from "./config.json";
import { verifyEmailServerConneciton, getEmailTransporter, getTransporterOptions, handleEmail } from "./emailService";
import { deleteFile, getAllPendingEmailFiles } from "./fileHandler";

const main = async () => {
    console.log("Initializing email client.");
    const auth = { user: emailUser, pass: appPassword };
    const transporter = await getEmailTransporter(auth);
    const succesfullyConnected = await verifyEmailServerConneciton(transporter);

    if (!succesfullyConnected) {
        const { host, port, user } = getTransporterOptions(transporter);
        console.log(`Failed to connect to SERVER: ${host}, PORT: ${port}, USER: ${user}`);
        return;
    }

    for (let { filePath, content } of getAllPendingEmailFiles()) {
        const bufferedFile: any = JSON.parse(<any>content);
        for (let email of bufferedFile) {
            await handleEmail(transporter, email);
        }
        deleteFile(filePath);
    }
};

main();
