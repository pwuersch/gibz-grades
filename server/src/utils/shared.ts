import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
export const prisma = new PrismaClient();

export const routerFactory = () =>
  Router({
    caseSensitive: false,
    mergeParams: true,
    strict: false,
  });
