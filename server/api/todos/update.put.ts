import {TodoItem} from "~/types/todo";

export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const { id, isDone } = await readBody<TodoItem>(event);

    const validIsDone = isDone === 1 ? 1 : 0; // Convert to 1 or 0

    await db.sql`
        UPDATE Todos SET isDone = ${validIsDone} WHERE id = ${id}
    `;

    return { ok: true, message: 'Todo updated successfully' };
});