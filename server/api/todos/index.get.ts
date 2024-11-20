import {TodoItem} from "~/types/todo";

export default defineEventHandler(async (event) => {
    const db = useDatabase();


    const {user} = await requireUserSession(event)

    if (!user?.id) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized: User ID is missing.",
        });
    }

    // If user ID exists, proceed with the query
    const result = await db.sql<{ rows: TodoItem[] }>`
        SELECT * FROM Todos WHERE userId = ${user.id}
    `;

    const todos: TodoItem[] = result.rows || [];

    return { todos };
});