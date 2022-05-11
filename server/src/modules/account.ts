import { Login } from '@prisma/client';
import { HttpError } from '../types/error';
import { prisma } from '../utils/shared';

export namespace Account {
  export const findUser = async (userId: string) => {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: { login: true },
    });

    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    return user;
  };

  export const getLogin = async (userId: string): Promise<Login | null> => {
    return await prisma.login.findFirst({
      where: { user: { id: userId } },
    });
  };

  export const setLogin = async (userId: string, url: string, pin: string) => {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: { login: true },
    });

    if (user) {
      await prisma.login.update({
        where: { id: user.login?.id },
        data: { url, pin },
      });
    } else {
      await prisma.user.create({
        data: {
          id: userId,
          login: {
            create: { url, pin },
          },
        },
      });
    }
  };
}
