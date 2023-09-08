# LocalEmailClient

It can be tedious to apply to multiple jobs that require directly emailing the hiring manager.
This is why I created `LocalEmailClient`, to simplify life when applying to multiple jobs with the same profile.

# How it works

This client uses your own gmail account to automate and send emails. **Note**: Careful when using this. Excessive use could
lead to your account being blocked or labeled as a `spammer`. This is a free emailing option.

# How to run:

## Google account configuration

Make sure to have 2-factor-authentication enabled on your gmail account, then:

- Login to your google account.
- From the sidebar, click on security
- Scroll down to Signing in with google
- Click on App Passwords to Generate a new App Password

To execute this program create a `config.json` file in the `/src` directory of the project. It should look like the following:

```
{
    "appPassword": "your-16-digit-app-passowrd-generated-in-the-previous-step",
    "emailUser": "youremail@gmail.com",
    "baseFolder": "/home/Desktop/emailServer"
}
```

## 1st Step:

Create your own templates, and add them to the `email_templates` folder. They will have the following format:

```
{
    "subject": "{position} Application",
    "text": "Dear hiring manager, \n\nMy name is Mateo Naranjo and wish to apply to the position of {position} as seen on {jobBoard}. Attached is my resume. \n\nThank you.",
    "attachments": [
        {
            "filename": "MateoNaranjoGenResume.pdf",
            "path": "pathToFolder/assets/resumes/GenericRes.pdf"
        }
    ]
}
```

**Note**: The `attachments` property is optional. I recommend it if you want to attach a cover letter or resume to your email.

## 2nd Step:

Create as many templates as desired, for as many different types of positions being applied for.

Add a file called `template.ts` to the `email_templates/` folder with the following content:

```
export type TemplateType = "generic" | "software"; #specify which types you wish to see here.
import genericEmailTemplate from "./template_name.json";

export const templateTypes: any = {
    generic: genericEmailTemplate,
};
```

## 3rd Step:

Add a file with the following format to the `email/pending` folder. This is where the program will determine who to email.

```
[
    {
        "to": "someemail@gmail.com",
        "position": "Software Developer",
        "jobBoard": "Indeed",
        "from": "youremail@gmail.com",
        "templateType": "generic" <-- this specifies which template to use. It must have been delcared in the template.ts file above. -->
    }
]
```

## 4th Step:

Run `npm i` to install all node dependencies.

Run `npm run dev` to execute the program and send out the emails.

All emails successfully sent out will be logged to the `emails/sent` folder, similarly all undelivered emails to the the `emails/undelivered` folder.

# Contributors

@naragod - Mateo Naranjo
