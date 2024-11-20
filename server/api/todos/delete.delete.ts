import {useDatabase} from "nitropack/runtime";

export default defineEventHandler(async () => {
    const db = useDatabase();
});