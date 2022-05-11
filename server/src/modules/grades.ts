import { Grade } from '@prisma/client';
import { prisma } from '../utils/shared';

export namespace Grades {
  export const getGrades = async (userId: string): Promise<Grade[]> => {
    return await prisma.grade.findMany({
      where: { userId },
    });
  };
}
