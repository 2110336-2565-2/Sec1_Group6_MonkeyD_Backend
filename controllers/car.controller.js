import express from "express";
import mongoose from "mongoose";

export const getCars = (req, res, next) => {
  res.send("get cars");
};
