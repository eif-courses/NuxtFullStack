import {TodoItem} from "~/types/todo";

export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const { isDone } = await readBody<TodoItem>(event);

    const validIsDone = isDone === 1 ? 1 : 0; // Convert to 1 or 0


    const {user} = await requireUserSession(event)

    if (!user?.id) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized: User ID is missing.",
        });
    }

    await db.sql`
        UPDATE Todos SET isDone = ${validIsDone} WHERE id = ${user.id}
    `;

    return { ok: true, message: 'Todo updated successfully' };
});