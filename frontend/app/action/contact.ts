"use server";
import transporter from "@/lib/nodemailer";

export async function contactAction(formData: any) {
  const { name, email, message } = formData;

  const mail = await transporter.sendMail({
    from: "EduMoodUp <edumoodup@gmail.com>",
    to: "edumoodup@gmail.com",
    subject: `${name} isimli kullanıcı bir mesajı var`,
    html: `
    <div>
        <h1>Name: ${name}</h1>
        <p>Message: ${message}</p>
        <h6>Email: ${email}</h6>
    </div>
    `,
  });

  return mail;
}
