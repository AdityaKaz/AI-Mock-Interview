import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import {getRandomInterviewCover} from "@/lib/utils";
import {db} from "@/firebase/admin";




export async function POST(request: Request) {
    const { type, role, level, techstack, amount, userid } = await request.json();

    try {
        console.log("Received interview generation request with data:", { type, role, level, techstack, amount, userid });

        const { text: questions } = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
        });

        console.log("Raw questions string from generateText:", questions);

        let parsedQuestions = [];
        try {
            parsedQuestions = JSON.parse(questions);
        } catch (parseError) {
            console.error("Error parsing questions JSON:", parseError);
            return Response.json({ success: false, error: "Failed to parse questions" }, { status: 500 });
        }

        const interview = {
            role: role,
            type: type,
            level: level,
            techstack: techstack.split(","),
            questions: parsedQuestions,
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        };

        console.log("Saving interview to database:", interview);

        await db.collection("interviews").add(interview);

        console.log("Interview saved successfully");

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error during interview generation or saving:", error);
        return Response.json({ success: false, error: error }, { status: 500 });
    }
}

export async function GET() {
    return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
