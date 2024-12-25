import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const handleLimitFileSize = ( err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ 
            status: "error", 
            message: "File size exceeds the limit of 1MB." 
        });
    }
    next(err);
};