import {useDatabase} from "nitropack/runtime";

export default defineEventHandler(async () => {
    const db = useDatabase();
    await db.sql`
        CREATE TABLE IF NOT EXISTS Todos (
                                             "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                                             "title" TEXT,
                                             "isDone" INTEGER NOT NULL DEFAULT 0,
                                             "userId" TEXT
        );
    `;

    return 'Database and tables created successfully!!!';

});