import {TodoItem} from "~/types/todo";

export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const body = await readBody(event);

    console.log("Request Body:", body); // Log the incoming data for debugging

    const { title, isDone, userId } = await readBody<TodoItem>(event);


    const validIsDone = isDone === 1 ? 1 : 0; // Convert to 1 or 0


    if (!title || !userId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid input data. 'title' and 'userId' are required.",
        });
    }

    try {
        console.log("Inserting Todo:", { title, validIsDone, userId }); // Log the values
        await db.sql`
        INSERT INTO Todos (title, isDone, userId)
        VALUES (${title}, ${validIsDone}, ${userId});
    `;
        return { message: "Todo created successfully!" };
    } catch (error) {
        console.error("Database Error:", error.message, error.code);
        throw createError({
            statusCode: 500,
            statusMessage: "Database operation failed.",
        });
    }

});