import {TodoItem} from "~/types/todo";

export default defineEventHandler(async (event) => {
    const db = useDatabase();

    const query = getQuery(event);
    const userId = query.userId as string;

    if (!userId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid User id parameter. It must be a non-empty string.",
        });
    }

    const result = await db.sql<{rows: TodoItem[]}>`
        SELECT * FROM Todos where userId = ${userId}
    `;

    const todos: TodoItem[] = result.rows || [];

    return { todos };
});