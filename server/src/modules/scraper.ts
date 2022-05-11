import { Login, User } from '@prisma/client';
import axios from 'axios';
import cheerio from 'cheerio';
import { prisma } from '../utils/shared';

interface PartialGrade {
  name: string;
  subject: string;
  date: string;
  grade: number;
}

export namespace Scraper {
  export const all = async () => {
    const logins = await prisma.login.findMany({
      include: { user: true },
    });

    for (const login of logins) {
      scrapeTarget(login);
    }
  };

  export const one = async (userId: string) => {
    const login = await prisma.login.findFirst({
      where: { user: { id: userId } },
      include: { user: true },
    });
    if (!login) throw new Error(`Found no associated login for user "${userId}"`);

    await scrapeTarget(login);
  };

  export const scrapeTarget = async (login: Login & { user: User | null }) => {
    const grades = await scrapeGrades(login.url, login.pin);

    await prisma.grade.deleteMany({
      where: { userId: login.user?.id },
    });

    await prisma.grade.createMany({
      data: grades.map((grade) => ({ ...grade, userId: login.user!.id })),
    });
  };

  export const scrapeGrades = async (url: string, pin: string): Promise<PartialGrade[]> => {
    const { data } = await axios.post(url, `pin=${pin}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const baseTable = cheerio.load(data)('tbody').html();
    if (!baseTable) throw new Error("This user doesn't have any grades");

    const rows = cheerio
      .load(baseTable)
      .text()
      .split(/\s*\n/g)
      .map((s) => s.trim())
      .filter((s) => s !== '');

    const grades: PartialGrade[] = [];
    for (let i = 0; i < rows.length / 4; i++) {
      const items = rows.slice(i * 4, i * 4 + 4);

      grades.push({
        subject: items[0],
        name: items[1],
        date: items[2],
        grade: parseFloat(items[3]),
      });
    }

    return grades;
  };
}
