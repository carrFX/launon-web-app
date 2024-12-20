import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    type IUserData = {
        id: number;
        email: string;
        role: string;
    };

    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) throw "Token is empty";

        const verifiedToken = verify(token, process.env.JWT_SECRET || "sangat rahasia");
        req.user = verifiedToken as IUserData; 
        console.log(req.user)

        next();
    } catch (err) {
        res.status(400).send({
            status: "Error",
            msg: err,
        });
    }
};
