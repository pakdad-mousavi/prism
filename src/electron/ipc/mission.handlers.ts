import { ipcMain } from "electron";
// import { mission } from "../db/schema/mission.sql.js";
// import { getDb } from "../db/db.js";
import { validateSender } from "./validateSender.js";

export const registerMissionHandlers = () => {
  ipcMain.handle('mission:create', async (e) => {
    return validateSender(e.senderFrame);
  });
};