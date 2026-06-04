const {
    GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const askGemini = async (prompt) => {

    for (let i = 0; i < 3; i++) {

        try {

            const model =
                genAI.getGenerativeModel({
                    model: "gemini-2.5-flash",
                });

            const result =
                await model.generateContent(
                    prompt
                );

            return result.response.text();

        } catch (error) {

            if (
                error.status === 503 &&
                i < 2
            ) {

                console.log(
                    `Retry ${i + 1}...`
                );

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            3000
                        )
                );

                continue;
            }

            throw error;
        }
    }
};

module.exports = askGemini;