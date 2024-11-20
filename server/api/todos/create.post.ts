import {TodoItem} from "~/types/todo";

export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const body = await readBody(event);



    console.log("Request Body:", body); // Log the incoming data for debugging

    const { title, isDone} = await readBody<TodoItem>(event);


    const validIsDone = isDone === 1 ? 1 : 0; // Convert to 1 or 0


    const {user} = await requireUserSession(event)

    if (!user?.id) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized: User ID is missing.",
        });
    }

    if (!title) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid input data. 'title' are required.",
        });
    }

    try {
        await db.sql`
        INSERT INTO Todos (title, isDone, userId)
        VALUES (${title}, ${validIsDone}, ${user.id});
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