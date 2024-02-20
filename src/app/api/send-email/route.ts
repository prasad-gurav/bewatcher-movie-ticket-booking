import { transporter } from "../../../utils/mailer";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    let reqBody = await req.json()
    let { EmailId,movie_name,show,show_date,seats,movie_poster } = reqBody
    try {
 
      const info = await transporter.sendMail({
        from: "dev.psgurav@gmail.com",
        to: EmailId,
        subject: "Your Movie Ticket - BeWatcher",
        html: `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> </head> <body> <main class="movie-container" style="width: 25%; height: 600px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; padding-top: 6rem; background-color: #eee9e6; position: relative;"> <h1 class="movie-name" style="margin-top: 2rem; font-size: 2rem; text-transform: uppercase; font-weight: bold;">${movie_name}</h1> <img id="movie-poster" class='movie-poster' style="width: 200px;" src="https://image.tmdb.org/t/p/w500/${movie_poster}" alt="" /> <h2 class='seats-info' style="font-size: 2rem; text-transform: uppercase; padding-top: 2rem;">Seats : ${seats.join(', ')}</h2> <h4 class="audi-info" style="font-size: 1.5rem;">Audi : 1</h4> <h4 class="show-info" style="font-size: 1.5rem;">Show : ${show}</h4> <h4 class="date-info" style="font-size: 1.5rem;">Date : ${show_date}</h4> <h4 class="enjoy-message" style="font-size: 0.875rem; position: absolute; bottom: 0.5rem;">Enjoy your show 😇</h4> </main> </body> </html>`

      });
      console.log("Email sent:", info.messageId);
      return NextResponse.json({ status: 200, success: true, messageId: info.messageId });
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ status: 500, success: false, error: "Error sending email" });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" });
  }
}
